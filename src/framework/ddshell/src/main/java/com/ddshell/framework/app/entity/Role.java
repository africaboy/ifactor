package com.ddshell.framework.app.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.ddshell.framework.jpa.RoleEntity;

@Entity
@Table(name = Role.TABLE)
public class Role extends RoleEntity implements Serializable {

	private static final long serialVersionUID = -4002009873204022088L;

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}