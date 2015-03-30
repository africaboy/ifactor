package com.entrofine.ifactor.app.script.init;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.entity.Resource;
import com.ddshell.framework.app.repository.ResourceRepository;
import com.ddshell.framework.app.script.DbInitScript;

@Transactional(readOnly = true)
@Component
public class ResourceInitScript extends DbInitScript {

	@Autowired
	private ResourceRepository resourceRep;

	public static void main(String[] args) throws Exception {
		init(ResourceInitScript.class);
	}

	@Transactional
	@Override
	public void init(File datafile) throws Exception {
		resourceRep.deleteAllInBatch();

		resourceRep.save(load(datafile, Resource.class));
	}

}
