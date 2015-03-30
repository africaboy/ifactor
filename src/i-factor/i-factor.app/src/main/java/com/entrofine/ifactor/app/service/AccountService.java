package com.entrofine.ifactor.app.service;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.ddshell.framework.app.entity.Role;
import com.ddshell.framework.app.entity.User;
import com.ddshell.framework.app.service.MimeMailService;
import com.ddshell.framework.app.service.RoleService;
import com.ddshell.framework.app.service.UserService;
import com.ddshell.framework.app.shiro.ShiroDbRealm;
import com.entrofine.ifactor.api.AppVars;
import com.entrofine.ifactor.app.entity.AppRole;

@Component
public class AccountService extends UserService {

	@Autowired
	private ShiroDbRealm shiroRealm;
	@Autowired
	private RoleService roleService;
	@Autowired
	private MimeMailService mailService;
	@Autowired
	private AppVars appVars;

	@Transactional
	public User registerBuyer(User user) {
		return registerUser(user, "buyer-account-activate");
	}

	@Transactional
	public User registerSeller(User user) {
		return registerUser(user, "sme-account-activate");
	}

	@Transactional
	public boolean activeBuyer(String loginName, String mailActiveCode) {
		return activeRegister(loginName, AppRole.PRE_BUYER.toString(),
				mailActiveCode);
	}

	@Transactional
	public boolean activeSeller(String loginName, String mailActiveCode) {
		return activeRegister(loginName, AppRole.PRE_SELLER.toString(),
				mailActiveCode);
	}

	@Transactional
	public User saveAs(Long userId, String roleName) {
		User user = findOne(userId);
		shiroRealm.clearCachedAuthorizationInfo(user.getLoginName());

		Role role = roleService.findByName(roleName);
		user.getRoles().clear();
		user.getRoles().add(role);

		return save(user);
	}

	@Transactional
	public boolean forgetPassword(String loginName) {
		User user = findByLoginName(loginName);
		if (user == null) {
			return false;
		}

		user.setDisabled(true);
		user.setResetPasswordCode(UUID.randomUUID().toString());
		save(user);

		Map<String, Object> context = new HashMap<String, Object>();
		context.put("base", appVars.appServer);
		context.put("user", user);

		sendMessage(user, "forget-password", context);

		return true;
	}

	@Transactional
	public boolean resetPasswotd(Long userId, String plainNewPassword) {
		User user = findOne(userId);
		user.setDisabled(false);
		user.setPlainPassword(plainNewPassword);
		user.setResetPasswordCode(null);
		user = save(user);
		return true;
	}

	public boolean verifyResetPwd(String loginName, String restPasswordCode) {
		User user = findByLoginName(loginName);
		if (user == null) {
			return false;
		}
		if (restPasswordCode == null
				|| !restPasswordCode.equals(user.getResetPasswordCode())) {
			return false;
		}
		return true;
	}

	public boolean isEmailRegistered(User user) {
		return findByLoginName(user.getEmail()) != null;
	}

	public void sendMessage(Long userId, String messageId, Object context) {
		sendMessage(findOne(userId), messageId, context);
	}

	public void sendWorkflowMessage(Long userId, String messageId, Object apply) {
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("base", appVars.appServer);
		context.put("apply", apply);
		sendMessage(findOne(userId), messageId, context);
	}

	public void sendMessage(User user, String messageId, Object context) {
		String[] to = { user.getEmail() };
		Locale locale = getLocale(user);

		mailService.send(to, messageId, context, locale, "EntroAuction");
	}

	private Locale getLocale(User user) {
		String defaultLocale = user.getDefaultLocale();
		if (StringUtils.isEmpty(defaultLocale)) {
			return null;
		}

		String[] a = defaultLocale.split("_");

		if (a.length == 1) {
			return new Locale(a[0]);
		}

		return new Locale(a[0], a[1]);
	}

	private User registerUser(User user, String messageId) {
		user.setDisabled(true);
		user.setLoginName(user.getEmail());
		user.setPlainPassword(user.getPassword());
		user.setMailActiveCode(UUID.randomUUID().toString());
		save(user);

		Map<String, Object> context = new HashMap<String, Object>();
		context.put("base", appVars.appServer);
		context.put("user", user);

		sendMessage(user, messageId, context);

		return user;
	}

	private boolean activeRegister(String loginName, String roleName,
			String mailActiveCode) {
		User user = findByLoginName(loginName);
		if (user == null) {
			return false;
		}

		if (!user.getRoleNames().isEmpty()) {
			return true;
		}

		if (mailActiveCode == null
				|| !mailActiveCode.equals(user.getMailActiveCode())) {
			return false;
		}

		Role role = roleService.findByName(roleName);
		user.getRoles().clear();
		user.getRoles().add(role);
		user.setDisabled(false);
		user.setMailActiveCode(null);
		user = save(user);

		return true;
	}

}
