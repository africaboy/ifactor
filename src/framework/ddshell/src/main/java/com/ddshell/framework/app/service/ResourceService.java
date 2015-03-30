package com.ddshell.framework.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.entity.Resource;
import com.ddshell.framework.app.repository.ResourceRepository;
import com.ddshell.framework.app.service.support.GenericCrudService;
import com.ddshell.framework.app.shiro.service.ShiroResourceService;

@Component
@Transactional(readOnly = true)
public class ResourceService extends GenericCrudService<Resource, Long>
		implements ShiroResourceService {

	@Autowired
	private ResourceRepository resourceRep;

	@Override
	protected JpaRepository<Resource, Long> getRepository() {
		return resourceRep;
	}

}
