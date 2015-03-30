package com.ddshell.framework.app.service;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.ddshell.framework.app.entity.User;
import com.ddshell.framework.app.repository.UserRepository;
import com.ddshell.framework.app.service.support.GenericCrudService;
import com.ddshell.framework.app.service.support.GlobalVars;
import com.ddshell.framework.app.shiro.entity.ShiroUser;
import com.ddshell.framework.app.shiro.service.ShiroUserService;

@Component("shiroUserService")
@DependsOn("userRepository")
@Transactional(readOnly = true)
public class UserService extends GenericCrudService<User, Long> implements
		ShiroUserService {

	private static final String LOGIN_USER = UserService.class.getName()
			+ ".loginUser";

	@Autowired
	private GlobalVars globalVars;
	@Autowired
	private UserRepository userRep;

	public User findByLoginName(String loginName) {
		return userRep.findByLoginName(loginName);
	}

	@Override
	public byte[] getSaltBytes(ShiroUser user) {
		String salt = user.getSalt();
		if (salt == null) {
			return null;
		}

		try {
			return Hex.decodeHex(salt.toCharArray());
		} catch (DecoderException e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	@Transactional
	@Override
	public <S extends User> S save(S user) {
		String plainPassword = user.getPlainPassword();
		if (!StringUtils.isEmpty(plainPassword)) {
			user.setPassword(encodeUserPassword(plainPassword, user));
		}
		return super.save(user);
	}

	@Transactional
	public boolean changeLoginUserPassword(String plainOldPassword,
			String plainNewPassword) {
		if (StringUtils.isEmpty(plainOldPassword)
				|| StringUtils.isEmpty(plainNewPassword)) {
			return false;
		}

		User loginUser = getLoginUser();

		if (!encodeUserPassword(plainOldPassword, loginUser).equalsIgnoreCase(
				loginUser.getPassword())) {
			return false;
		}

		User user = findOne(loginUser.getId());
		user.setPlainPassword(plainNewPassword);
		user = save(user);

		loginUser.setPassword(user.getPassword());

		return true;
	}

	public User getLoginUser() {
		Subject subject = SecurityUtils.getSubject();

		if (!subject.isAuthenticated()) {
			return null;
		}

		Session session = subject.getSession(true);
		if (session == null) {
			return null;
		}

		User loginUser = (User) session.getAttribute(LOGIN_USER);
		if (loginUser == null) {
			loginUser = findByLoginName((String) subject.getPrincipal());
			session.setAttribute(LOGIN_USER, loginUser);
		}

		return loginUser;
	}

	public void setLoginUser(User loginUser) {
		Subject subject = SecurityUtils.getSubject();

		Session session = subject.getSession(true);
		if (session == null) {
			return;
		}

		session.setAttribute(LOGIN_USER, loginUser);
	}

	@Override
	protected JpaRepository<User, Long> getRepository() {
		return userRep;
	}

	private String encodeUserPassword(String plainPassword, User user) {
		SimpleHash hash = new SimpleHash(globalVars.hashAlgorithmName,
				plainPassword, getSaltBytes(user), globalVars.hashIterations);
		return hash.toString();
	}

}
