package com.entrofine.ifactor.app.entity;

public class InvoiceAvgAmountOption {
	private String code;
	private String text;

	public InvoiceAvgAmountOption(String code, String text) {
		setCode(code);
		setText(text);
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
