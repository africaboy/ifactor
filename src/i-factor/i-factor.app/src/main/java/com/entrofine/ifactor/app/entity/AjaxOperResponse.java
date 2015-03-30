package com.entrofine.ifactor.app.entity;

import java.io.Serializable;

public class AjaxOperResponse implements Serializable {
	private static final long serialVersionUID = 4642292476325625497L;

	private Boolean success;
	private String message;

	public AjaxOperResponse(Boolean success, String message) {
		setSuccess(success);
		setMessage(message);
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
