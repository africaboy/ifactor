package com.entrofine.ifactor.app.script.init;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.script.DbInitScript;
import com.entrofine.ifactor.app.entity.Catalog;
import com.entrofine.ifactor.app.repository.CatalogRepository;

@Transactional(readOnly = true)
@Component
public class CatalogInitScript extends DbInitScript {

	@Autowired
	private CatalogRepository catalogRep;

	public static void main(String[] args) throws Exception {
		init(CatalogInitScript.class);
	}

	@Transactional
	@Override
	public void init(File datafile) throws Exception {
		catalogRep.deleteAllInBatch();

		List<Catalog> values = load(datafile, Catalog.class);
		for (Catalog catalog : values) {
			setParent(catalog);
		}
		catalogRep.save(values);
	}

	private void setParent(Catalog catalog) {
		for (Catalog child : catalog.getChildren()) {
			child.setParent(catalog);
			setParent(child);
		}
	}

}
