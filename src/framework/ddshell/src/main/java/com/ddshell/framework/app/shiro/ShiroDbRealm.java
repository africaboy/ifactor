package com.ddshell.framework.app.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.ddshell.framework.app.shiro.entity.ShiroUser;
import com.ddshell.framework.app.shiro.service.ShiroUserService;

@Component
public class ShiroDbRealm extends AuthorizingRealm {

	@Autowired
	@Qualifier("shiroUserService")
	private ShiroUserService shiroUserService;

	@Autowired(required = false)
	@Override
	public void setCredentialsMatcher(CredentialsMatcher credentialsMatcher) {
		super.setCredentialsMatcher(credentialsMatcher);
	}

	public void clearCachedAuthorizationInfo(Object principal) {
		clearCachedAuthorizationInfo(new SimplePrincipalCollection(principal,
				getName()));
	}

	public void clearAllCachedAuthorizationInfo() {
		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
		if (cache != null) {
			cache.clear();
		}
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {

		String loginName = ((UsernamePasswordToken) authcToken).getUsername();

		ShiroUser loginUser = shiroUserService.findByLoginName(loginName);

		if (loginUser == null) {
			throw new UnknownAccountException();
		}

		if (loginUser.isDisabled()) {
			throw new DisabledAccountException();
		}

		ByteSource salt = ByteSource.Util.bytes(shiroUserService
				.getSaltBytes(loginUser));

		return new SimpleAuthenticationInfo(loginName, loginUser.getPassword(),
				salt, getName());

	}

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {

		String loginName = (String) principals.getPrimaryPrincipal();

		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

		ShiroUser loginUser = shiroUserService.findByLoginName(loginName);

		if (loginUser.getRoleNames() != null) {
			info.addRoles(loginUser.getRoleNames());
		}

		if (loginUser.getPermissionNames() != null) {
			info.addStringPermissions(loginUser.getPermissionNames());
		}

		return info;
	}

}
