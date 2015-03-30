package com.entrofine.ifactor.app.entity;

public enum InvoiceState {

	InProcessing(
			"In processing",
			"szIeAMROkl,szIeAMROkl_mVolpvvEFY,mVolpvvEFY_RyXlLYLUHF_0,mVolpvvEFY_RyXlLYLUHF_1,mVolpvvEFY_bquDuCwisW,bquDuCwisW_ibvYshlyGv,ibvYshlyGv_vBdcCEIXvk,ibvYshlyGv_mVolpvvEFY,RyXlLYLUHF_mVolpvvEFY,RyXlLYLUHF_ibvYshlyGv,vBdcCEIXvk_YCcCAeFtUg,YCcCAeFtUg_xhLGTcqzFh",
			0, InvoicePageState.UnderApproval), RequestforModification(
			"Request for modification", "mVolpvvEFY_RyXlLYLUHF", 1,
			InvoicePageState.UnderApproval), Rejected(
			"Rejected",
			"bquDuCwisW_dSHAvdyhfW,vBdcCEIXvk_dSHAvdyhfW,YCcCAeFtUg_dSHAvdyhfW,xhLGTcqzFh_dSHAvdyhfW_0",
			2, InvoicePageState.UnderApproval), Closed("Closed",
			"RyXlLYLUHF_dSHAvdyhfW", 3, InvoicePageState.UnderApproval), FullySettled(
			"Fully settled", "IAS_13", 4, InvoicePageState.InSettlement), PartiallySettled(
			"Partially settled", "IAS_14", 4, InvoicePageState.InSettlement), Overdue(
			"Overdue", "IAS_09", 4, InvoicePageState.InSettlement);
	// 成员变量
	private Integer status;
	private String name;
	private String description;
	private InvoicePageState pageState;
	private Boolean isChecked;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	// 构造方法
	private InvoiceState(String description, String name, int status,
			InvoicePageState pageState) {
		this.setStatus(status);
		this.setName(name);
		this.setDescription(description);
		this.setPageState(pageState);
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public InvoicePageState getPageState() {
		return pageState;
	}

	public void setPageState(InvoicePageState pageState) {
		this.pageState = pageState;
	}

	public Boolean getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(Boolean isChecked) {
		this.isChecked = isChecked;
	}
}
