package com.entrofine.ifactor.app.service.workflow;

public enum BuyerFlowStatus {

	MODIFY("frTGUAcenq_AyrbNcfEYW", "buyer-application-modification"),

	REJECTED("yjoUTSRriH_ANAzqfzpXu", "buyer-application-rejected"),

	CLOSED("IumoNgdgWo_ANAzqfzpXu", "buyer-application-closed"),

	CLOSED1("AyrbNcfEYW_ANAzqfzpXu", "buyer-application-closed"),

	RELEASE("PBwYjzcgYL_ANAzqfzpXu", "buyer-application-accepted");

	public static boolean isModify(String status) {
		return MODIFY.status.equals(status);
	}

	public static BuyerFlowStatus findByStatus(String status) {
		for (BuyerFlowStatus value : values()) {
			if (value.status.equalsIgnoreCase(status)) {
				return value;
			}
		}
		return null;
	}

	private String status;
	private String messageId;

	private BuyerFlowStatus(String status, String messageId) {
		this.status = status;
		this.messageId = messageId;
	}

	public String getStatus() {
		return status;
	}

	public String getMessageId() {
		return messageId;
	}

}
