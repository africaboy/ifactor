package com.entrofine.ifactor.app.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.entrofine.ifactor.api.entity.Document;
import com.entrofine.ifactor.jpa.InvoiceDocEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = InvoiceDoc.TABLE)
public class InvoiceDoc extends InvoiceDocEntity implements Serializable,
		Document {

	private static final long serialVersionUID = -869770483013430536L;

	@ManyToOne
	@JoinColumn(name = "BIZ_ID")
	@JsonIgnore
	private Invoice biz;

	public Invoice getBiz() {
		return biz;
	}

	public void setBiz(Invoice biz) {
		this.biz = biz;
	}
}
