package com.entrofine.ifactor.app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.entity.Role;
import com.ddshell.framework.app.entity.User;
import com.ddshell.framework.app.service.RoleService;
import com.ddshell.framework.app.service.UserService;
import com.entrofine.ifactor.api.service.VPBankService;
import com.entrofine.ifactor.app.entity.AppRole;

@Component
public class VPBankServiceImpl extends UserService implements VPBankService {

	@Autowired
	private RoleService roleService;

	@Transactional
	@Override
	public void saveVPBankUsers(List<User> users) {
		Role role = roleService.findByName(AppRole.VPBANK.toString());

		for (User user : users) {
			user.getRoles().clear();
			user.getRoles().add(role);
			super.save(user);
		}
	}

}
