package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.entrofine.ifactor.jpa.CatalogEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = Catalog.TABLE)
public class Catalog extends CatalogEntity implements Serializable {

	private static final long serialVersionUID = -6921317408594989626L;

	private String name;
	private String code;
	private Integer dispOrder = 9999;

	private String nameViVn;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "parent")
	@OrderBy("dispOrder")
	private List<Catalog> children = new ArrayList<Catalog>();

	@ManyToOne
	@JoinColumn(name = "parentId")
	@JsonIgnore
	private Catalog parent;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<Catalog> getChildren() {
		return children;
	}

	public void setChildren(List<Catalog> children) {
		this.children = children;
	}

	public Catalog getParent() {
		return parent;
	}

	public void setParent(Catalog parent) {
		this.parent = parent;
	}

	public Integer getDispOrder() {
		return dispOrder;
	}

	public void setDispOrder(Integer dispOrder) {
		this.dispOrder = dispOrder;
	}

	public String getNameViVn() {
		return nameViVn;
	}

	public void setNameViVn(String nameViVn) {
		this.nameViVn = nameViVn;
	}

}
