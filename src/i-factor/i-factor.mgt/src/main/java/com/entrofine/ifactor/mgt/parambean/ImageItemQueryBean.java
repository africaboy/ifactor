package com.entrofine.ifactor.mgt.parambean;

public class ImageItemQueryBean {

	int start = 0;
	int limit = 20;
	/**
	 * 进件编号
	 */
	private String loanId;
	/**
	 * 影像类别编码
	 */
	private String itemCode;
	/**
	 * 影像类别名称
	 */
	private String itemName;
	/**
	 * 查询影像项
	 */
	private String queryItemCode;

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getLoanId() {
		return loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getQueryItemCode() {
		return queryItemCode;
	}

	public void setQueryItemCode(String queryItemCode) {
		this.queryItemCode = queryItemCode;
	}

}
