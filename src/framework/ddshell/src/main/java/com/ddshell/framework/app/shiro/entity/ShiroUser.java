package com.ddshell.framework.app.shiro.entity;

import java.io.Serializable;
import java.util.Collection;

public interface ShiroUser extends Serializable {

	public boolean isDisabled();

	public String getLoginName();

	public String getPassword();

	public Collection<String> getRoleNames();

	public Collection<String> getPermissionNames();

	public String getSalt();

}
