package com.ddshell.framework.app.shiro.service;

import com.ddshell.framework.app.shiro.entity.ShiroUser;

public interface ShiroUserService {

	public ShiroUser findByLoginName(String loginName);

	public byte[] getSaltBytes(ShiroUser user);

}
