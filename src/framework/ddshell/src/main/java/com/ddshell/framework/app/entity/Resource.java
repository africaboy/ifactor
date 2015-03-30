package com.ddshell.framework.app.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.ddshell.framework.app.shiro.entity.ShiroResource;
import com.ddshell.framework.jpa.ResourceEntity;

@Entity
@Table(name = Resource.TABLE)
public class Resource extends ResourceEntity implements ShiroResource {

	private static final long serialVersionUID = 3128388338392622348L;

	private String text;
	private String pattern;
	private String permission;

	public Resource() {
		super();
	}

	public Resource(String pattern, String permission) {
		super();
		this.pattern = pattern;
		this.permission = permission;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}
}