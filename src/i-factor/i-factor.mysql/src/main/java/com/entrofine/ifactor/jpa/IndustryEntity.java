package com.entrofine.ifactor.jpa;

import javax.persistence.MappedSuperclass;

import com.ddshell.framework.jpa.mysql.SimpleEntity;

@MappedSuperclass
public abstract class IndustryEntity extends SimpleEntity {

	public static final String TABLE = Schema.T_INDUSTRY;

}
