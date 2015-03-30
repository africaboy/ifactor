package com.entrofine.ifactor.jpa;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class SellerApplyDocEntity extends DocEntity {

	public static final String TABLE = Schema.T_SELLER_APPLY_DOC;

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
