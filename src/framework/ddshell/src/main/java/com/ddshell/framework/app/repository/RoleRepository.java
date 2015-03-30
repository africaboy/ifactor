package com.ddshell.framework.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ddshell.framework.app.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

	public Role findByName(String name);

}
