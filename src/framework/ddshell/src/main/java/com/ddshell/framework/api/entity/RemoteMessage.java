package com.ddshell.framework.api.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RemoteMessage implements Serializable {

	private static final long serialVersionUID = -679311466885233601L;

	private String statusCode;
	private String statusMessage;
	private String sessionId;
	private String content;
	private String mac;

	public static final String SUCCESS = "success";
	public static final String FAIL = "fail";

	public RemoteMessage() {
	}

	public RemoteMessage(String sessionId, String content, String mac) {
		this.sessionId = sessionId;
		this.content = content;
		this.mac = mac;
	}

	public RemoteMessage(String statusCode, String statusMessage,
			String sessionId, String content, String mac) {
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
		this.sessionId = sessionId;
		this.content = content;
		this.mac = mac;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatusMessage() {
		return statusMessage;
	}

	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

}