package com.entrofine.ifactor.app.script.exp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.entity.Role;
import com.ddshell.framework.app.repository.RoleRepository;
import com.ddshell.framework.app.script.DbExportScript;

@Transactional(readOnly = true)
@Component
public class RoleExportScript extends DbExportScript {

	@Autowired
	private RoleRepository roleRep;

	public static void main(String[] args) throws Exception {
		export(RoleExportScript.class);
	}

	@Override
	public void export() throws Exception {
		export(roleRep.findAll(), Role.class);
	}

}
