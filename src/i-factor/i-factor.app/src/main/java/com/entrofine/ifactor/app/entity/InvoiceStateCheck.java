package com.entrofine.ifactor.app.entity;

public class InvoiceStateCheck {
	InvoiceState invoiceState;
	Boolean isChecked;

	public InvoiceStateCheck(InvoiceState invoiceState, Boolean isChecked) {
		this.setInvoiceState(invoiceState);
		this.setIsChecked(isChecked);
	}

	public InvoiceState getInvoiceState() {
		return invoiceState;
	}

	public void setInvoiceState(InvoiceState invoiceState) {
		this.invoiceState = invoiceState;
	}

	public Boolean getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(Boolean isChecked) {
		this.isChecked = isChecked;
	}
}
