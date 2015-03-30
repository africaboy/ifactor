package com.entrofine.ifactor.app.entity;

public enum InvoicePageState {
	UnderApproval("In processing", 0), InSettlement("In Settlement", 1), AfterAuction(
			"After Auction", 2);
	// 成员变量
	private Integer pageState;
	private String description;

	// 构造方法
	private InvoicePageState(String description, Integer pageState) {
		this.setDescription(description);
		this.setPageState(pageState);
	}

	public Integer getPageState() {
		return pageState;
	}

	public void setPageState(Integer pageState) {
		this.pageState = pageState;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
