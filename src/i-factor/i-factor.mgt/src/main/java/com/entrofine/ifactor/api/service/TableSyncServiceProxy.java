package com.entrofine.ifactor.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ddshell.framework.api.service.RestService;
import com.entrofine.ifactor.api.API;
import com.entrofine.ifactor.api.AppVars;
import com.entrofine.ifactor.api.entity.TableSyncEvent;

@Component
public class TableSyncServiceProxy implements TableSyncService {

	@Autowired
	private AppVars appVars;
	@Autowired
	private RestService rest;

	@Override
	public void execute(List<TableSyncEvent> events) {
		rest.post(RestService.SESSION_NO,
				appVars.appServer + API.APP_TABLESYNC, events, String.class);
	}

}
