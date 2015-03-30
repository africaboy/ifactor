package com.entrofine.ifactor.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.app.entity.Inbox;
import com.entrofine.ifactor.app.repository.InboxRepository;

@Component
public class InboxService extends GenericCrudService<Inbox, Long> {

	@Autowired
	InboxRepository inboxRepository;

	@Override
	protected JpaRepository<Inbox, Long> getRepository() {
		return inboxRepository;
	}

}
