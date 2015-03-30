package com.ddshell.framework.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ddshell.framework.app.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByLoginName(String loginName);

}
