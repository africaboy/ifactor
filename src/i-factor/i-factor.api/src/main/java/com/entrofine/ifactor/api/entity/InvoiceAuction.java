package com.entrofine.ifactor.api.entity;

import com.entrofine.ifactor.app.entity.Auction;

public class InvoiceAuction {
	private Auction auction;
	private String invoiceId;
	private boolean isAccepted;

	public Auction getAuction() {
		return auction;
	}

	public void setAuction(Auction auction) {
		this.auction = auction;
	}

	public String getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
	}

	public boolean isAccepted() {
		return isAccepted;
	}

	public void setAccepted(boolean isAccepted) {
		this.isAccepted = isAccepted;
	}

}
