package com.entrofine.ifactor.app.service.workflow;

public enum SmeFlowStatus {
	MODIFY("FUoVuacHWV_cMxzCQLUrF", "sme-application-modification"),

	LICENSE_REJECTED("zIeeUKnBZF_oQfYjWhRHs", "sme-application-rejected"),

	BLACKLIST_REJECTED("zXusSDxdAs_oQfYjWhRHs", "sme-application-rejected"),

	CIC_REJECTED("wVbebSTCKW_oQfYjWhRHs", "sme-application-rejected"),

	ELIGIBILITY_REJECTED("VmnUSmpded_oQfYjWhRHs", "sme-application-rejected"),

	SCORE_REJECTED("ulccaPXdZe_oQfYjWhRHs", "sme-application-rejected"),

	ASSESS_REJECTED("mKISSmbTdc_oQfYjWhRHs", "sme-application-rejected"),

	RELEASE("cPjfdskOtZ_oQfYjWhRHs", "sme-application-accepted"),

	CLOSED("cMxzCQLUrF_oQfYjWhRHs", "sme-application-closed");

	public static boolean isModify(String status) {
		return MODIFY.status.equals(status);
	}

	public static SmeFlowStatus findByStatus(String status) {
		for (SmeFlowStatus value : values()) {
			if (value.status.equalsIgnoreCase(status)) {
				return value;
			}
		}
		return null;
	}

	private String status;
	private String messageId;

	private SmeFlowStatus(String status, String messageId) {
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
