package com.entrofine.ifactor.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ddshell.framework.api.entity.RemoteMessage;
import com.ddshell.framework.api.service.MessageService;
import com.ddshell.framework.api.service.RestService;
import com.entrofine.ifactor.api.API;
import com.entrofine.ifactor.api.service.InboxSyncService;
import com.entrofine.ifactor.app.entity.Inbox;

@Controller
public class InboxSyncController {
	@Autowired
	private RestService rest;
	@Autowired
	private InboxSyncService inboxSyncService;

	@RequestMapping(value = API.APP_INBOX, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage save(@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				inboxSyncService.saveInbox((Inbox) request);
				return RemoteMessage.SUCCESS;
			}
		}, Inbox.class);
	}
}
