package com.entrofine.ifactor.app.service.impl;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.entrofine.ifactor.api.service.InboxSyncService;
import com.entrofine.ifactor.app.entity.Inbox;
import com.entrofine.ifactor.app.service.InboxService;

@Component
public class InboxServiceImpl extends InboxService implements InboxSyncService {

	@Transactional
	@Override
	public void saveInbox(Inbox inbox) {
		super.save(inbox);
	}

}
