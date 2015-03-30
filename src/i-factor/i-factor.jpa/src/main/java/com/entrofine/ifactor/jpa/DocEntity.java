package com.entrofine.ifactor.jpa;

import java.util.Date;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@MappedSuperclass
public abstract class DocEntity {

	public static final String BIZTYPE_SEP = "_";

	private String originalName;
	private String targetName;
	private String extension;
	private String loginName;
	private String bizType;
	private Integer dispOrder;
	private Date createTime;
	private Date updateTime;

	public String getOriginalName() {
		return originalName;
	}

	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}

	public String getTargetName() {
		return targetName;
	}

	public void setTargetName(String targetName) {
		int dotIndex = targetName.lastIndexOf('.');
		this.extension = (dotIndex == -1) ? "" : targetName
				.substring(dotIndex + 1);
		this.targetName = targetName;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getBizType() {
		return bizType;
	}

	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	public Integer getDispOrder() {
		return dispOrder;
	}

	public void setDispOrder(Integer dispOrder) {
		this.dispOrder = dispOrder;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@PrePersist
	public void prePersist() {
		this.createTime = new Date();
		this.updateTime = new Date();
	}

	@PreUpdate
	public void preUpdate() {
		this.updateTime = new Date();
	}

}
