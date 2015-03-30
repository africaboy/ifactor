package com.ddshell.framework.jpa.mysql;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * 数字主键实体基类
 * 
 * @author DUAN
 * 
 */
@MappedSuperclass
public abstract class NIdEntity {

	@Id
	@GeneratedValue
	protected Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
