package com.ddshell.framework.jpa;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.SequenceGenerator;

import com.entrofine.ifactor.jpa.AppMenu;
import com.entrofine.ifactor.jpa.Schema;

@MappedSuperclass
public abstract class MenuEntity extends AppMenu {

	public static final String TABLE = Schema.T_MENU;
	public static final String SEQUENCE = TABLE + Schema.SEQ_SUFFIX;

	@SequenceGenerator(name = SEQUENCE, sequenceName = SEQUENCE)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE)
	@Id
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
