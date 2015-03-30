package com.entrofine.ifactor.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ddshell.framework.api.service.RestService;
import com.ddshell.framework.app.entity.User;
import com.entrofine.ifactor.api.API;
import com.entrofine.ifactor.api.AppVars;

@Component
public class VPBankServiceProxy implements VPBankService {

	@Autowired
	private AppVars appVars;
	@Autowired
	private RestService rest;

	@Override
	public void saveVPBankUsers(List<User> users) {
		rest.post(RestService.SESSION_NO, appVars.appServer + API.APP_VPBANK,
				users, String.class);
	}

}
