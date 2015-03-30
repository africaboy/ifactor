package com.entrofine.ifactor.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ddshell.framework.api.service.RestService;
import com.entrofine.ifactor.api.API;
import com.entrofine.ifactor.api.AppVars;
import com.entrofine.ifactor.app.entity.Inbox;

@Component
public class InboxServiceProxy implements InboxSyncService {
	@Autowired
	private AppVars appVars;
	@Autowired
	private RestService rest;

	@Override
	public void saveInbox(Inbox inbox) {
		rest.post(RestService.SESSION_NO, appVars.appServer + API.APP_INBOX,
				inbox, String.class);
	}

}
