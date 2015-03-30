package com.ddshell.framework.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.entity.Role;
import com.ddshell.framework.app.repository.RoleRepository;
import com.ddshell.framework.app.service.support.GenericCrudService;

@Component
@Transactional(readOnly = true)
public class RoleService extends GenericCrudService<Role, Long> {

	@Autowired
	private RoleRepository roleRep;

	public Role findByName(String name) {
		return roleRep.findByName(name);
	}

	@Override
	protected JpaRepository<Role, Long> getRepository() {
		return roleRep;
	}

}
