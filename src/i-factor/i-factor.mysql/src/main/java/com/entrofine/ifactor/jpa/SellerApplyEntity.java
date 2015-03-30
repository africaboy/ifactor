package com.entrofine.ifactor.jpa;

import javax.persistence.MappedSuperclass;

import com.ddshell.framework.jpa.mysql.SimpleEntity;

@MappedSuperclass
public abstract class SellerApplyEntity extends SimpleEntity {

	public static final String TABLE = Schema.T_BUYER_APPLY;

}
