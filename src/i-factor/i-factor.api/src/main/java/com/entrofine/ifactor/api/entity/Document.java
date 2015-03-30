package com.entrofine.ifactor.api.entity;

public interface Document {

	public Long getId();

	public void setId(Long id);

	public String getOriginalName();

	public void setOriginalName(String originalName);

	public String getTargetName();

	public void setTargetName(String targetName);

	public String getExtension();

	public void setExtension(String extension);

	public String getLoginName();

	public void setLoginName(String loginName);

	public String getBizType();

	public void setBizType(String bizType);

	public Integer getDispOrder();

	public void setDispOrder(Integer dispOrder);

}
