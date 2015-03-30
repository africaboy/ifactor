package com.entrofine.ifactor.api.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.api.service.TableSyncService;

@Controller
public class TableSyncController {

	@Autowired
	private RestService rest;
	@Autowired
	private TableSyncService tableSyncService;

	@RequestMapping(value = API.APP_TABLESYNC, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage execute(@RequestBody RemoteMessage message) {
		return rest.serviceEx(message, new MessageService() {
			@SuppressWarnings("unchecked")
			@Override
			public Object execute(Object request) {
				tableSyncService.execute((List<TableSyncEvent>) request);
				return RemoteMessage.SUCCESS;
			}
		}, ArrayList.class, TableSyncEvent.class);
	}

}
