package com.entrofine.ifactor.app.script.init;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.entity.Role;
import com.ddshell.framework.app.entity.User;
import com.ddshell.framework.app.repository.RoleRepository;
import com.ddshell.framework.app.repository.UserRepository;
import com.ddshell.framework.app.script.DbInitScript;

@Transactional(readOnly = true)
@Component
@DependsOn("roleInitScript")
public class UserInitScript extends DbInitScript {

	@Autowired
	private UserRepository userRep;
	@Autowired
	private RoleRepository roleRep;

	public static void main(String[] args) throws Exception {
		init(UserInitScript.class);
	}

	@Transactional
	@Override
	public void init(File datafile) throws Exception {
		userRep.deleteAllInBatch();

		List<User> values = load(datafile, User.class);
		for (User user : values) {
			user = userRep.save(user);
			for (String roleName : user.getRoleNames()) {
				Role role = roleRep.findByName(roleName);
				if (role != null) {
					user.getRoles().add(role);
					userRep.save(user);
				}
			}
		}

	}
}
