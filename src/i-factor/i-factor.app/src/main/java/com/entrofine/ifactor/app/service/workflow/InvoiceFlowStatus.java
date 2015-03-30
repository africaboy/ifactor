package com.entrofine.ifactor.app.service.workflow;

public enum InvoiceFlowStatus {

	MODIFY("mVolpvvEFY_RyXlLYLUHF", "invoice-modification"),

	MANUAL_REJECTED("bquDuCwisW_dSHAvdyhfW", "invoice-rejection"),

	BLACKLIST_REJECTED("vBdcCEIXvk_dSHAvdyhfW", "invoice-rejection"),

	DOUBLEMANUAL_REJECTED("OHMcXwKBdZ_dSHAvdyhfW_0", "invoice-rejection"),

	CLOSED("RyXlLYLUHF_dSHAvdyhfW", "invoice-submission-closed"),

	RELEASE("OHMcXwKBdZ_dSHAvdyhfW", "invoice-accepted");

	public static boolean isModify(String status) {
		return MODIFY.status.equals(status);
	}

	public static InvoiceFlowStatus findByStatus(String status) {
		for (InvoiceFlowStatus value : values()) {
			if (value.status.equalsIgnoreCase(status)) {
				return value;
			}
		}
		return null;
	}

	private String status;
	private String messageId;

	private InvoiceFlowStatus(String status, String messageId) {
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
