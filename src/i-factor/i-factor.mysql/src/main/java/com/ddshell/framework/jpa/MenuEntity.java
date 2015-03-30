package com.ddshell.framework.jpa;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import com.entrofine.ifactor.jpa.AppMenu;
import com.entrofine.ifactor.jpa.Schema;

@MappedSuperclass
public abstract class MenuEntity extends AppMenu {

	public static final String TABLE = Schema.T_MENU;

	@GeneratedValue
	@Id
	protected Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
