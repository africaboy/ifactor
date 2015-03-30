package com.ddshell.framework.jpa;

import javax.persistence.MappedSuperclass;

import com.ddshell.framework.jpa.mysql.SimpleEntity;
import com.entrofine.ifactor.jpa.Schema;

@MappedSuperclass
public abstract class ResourceEntity extends SimpleEntity {

	public static final String TABLE = Schema.T_RESOURCE;

}
