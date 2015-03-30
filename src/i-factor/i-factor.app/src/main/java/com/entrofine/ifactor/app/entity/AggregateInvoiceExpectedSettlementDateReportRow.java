package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.math.BigDecimal;

public class AggregateInvoiceExpectedSettlementDateReportRow implements
		Serializable {

	private static final long serialVersionUID = -3856619804659205966L;

	private String expectedSettlementDate;
	private Long noUploaded;
	private BigDecimal amtUploaded;
	private Long noInProcessing;
	private BigDecimal amtInProcessing;
	private Long noRejected;
	private BigDecimal amtRejected;
	private Long noAccepted;
	private BigDecimal amtAccepted;
	private Long noInAuctionBidded;
	private BigDecimal amtInAuctionBidded;
	private Long noInAuctionUnbidded;
	private BigDecimal amtInAuctionUnbidded;
	private Long noDelisted;
	private BigDecimal amtDelisted;
	private Long noDealed;
	private BigDecimal amtDealed;
	private Long noUnsuccessfullyDisbursed;
	private BigDecimal amtUnsuccessfullyDisbursed;
	private Long noDisbursed;
	private BigDecimal amtDisbursed;
	private Long noSettled;
	private BigDecimal amtSettled;
	private Long noOverdue;
	private BigDecimal amtOverdue = new BigDecimal(0);

	public AggregateInvoiceExpectedSettlementDateReportRow() {
		setExpectedSettlementDate("");
		setNoUploaded(0L);
		setAmtUploaded(new BigDecimal(0));
		setNoInProcessing(0L);
		setAmtInProcessing(new BigDecimal(0));
		setNoRejected(0L);
		setAmtRejected(new BigDecimal(0));
		setNoAccepted(0L);
		setAmtAccepted(new BigDecimal(0));
		setNoInAuctionBidded(0L);
		setAmtInAuctionBidded(new BigDecimal(0));
		setNoInAuctionUnbidded(0L);
		setAmtInAuctionUnbidded(new BigDecimal(0));
		setNoDelisted(0L);
		setAmtDelisted(new BigDecimal(0));
		setNoDealed(0L);
		setAmtDealed(new BigDecimal(0));
		setNoUnsuccessfullyDisbursed(0L);
		setAmtUnsuccessfullyDisbursed(new BigDecimal(0));
		setNoDisbursed(0L);
		setAmtDisbursed(new BigDecimal(0));
		setNoSettled(0L);
		setAmtSettled(new BigDecimal(0));
		setNoOverdue(0L);
		setAmtOverdue(new BigDecimal(0));
	}

	public String getExpectedSettlementDate() {
		return expectedSettlementDate;
	}

	public void setExpectedSettlementDate(String expectedSettlementDate) {
		this.expectedSettlementDate = expectedSettlementDate;
	}

	public Long getNoUploaded() {
		return noUploaded;
	}

	public void setNoUploaded(Long noUploaded) {
		this.noUploaded = noUploaded;
	}

	public BigDecimal getAmtUploaded() {
		return amtUploaded;
	}

	public void setAmtUploaded(BigDecimal amtUploaded) {
		this.amtUploaded = amtUploaded;
	}

	public Long getNoInProcessing() {
		return noInProcessing;
	}

	public void setNoInProcessing(Long noInProcessing) {
		this.noInProcessing = noInProcessing;
	}

	public BigDecimal getAmtInProcessing() {
		return amtInProcessing;
	}

	public void setAmtInProcessing(BigDecimal amtInProcessing) {
		this.amtInProcessing = amtInProcessing;
	}

	public Long getNoRejected() {
		return noRejected;
	}

	public void setNoRejected(Long noRejected) {
		this.noRejected = noRejected;
	}

	public BigDecimal getAmtRejected() {
		return amtRejected;
	}

	public void setAmtRejected(BigDecimal amtRejected) {
		this.amtRejected = amtRejected;
	}

	public Long getNoAccepted() {
		return noAccepted;
	}

	public void setNoAccepted(Long noAccepted) {
		this.noAccepted = noAccepted;
	}

	public BigDecimal getAmtAccepted() {
		return amtAccepted;
	}

	public void setAmtAccepted(BigDecimal amtAccepted) {
		this.amtAccepted = amtAccepted;
	}

	public Long getNoInAuctionBidded() {
		return noInAuctionBidded;
	}

	public void setNoInAuctionBidded(Long noInAuctionBidded) {
		this.noInAuctionBidded = noInAuctionBidded;
	}

	public BigDecimal getAmtInAuctionBidded() {
		return amtInAuctionBidded;
	}

	public void setAmtInAuctionBidded(BigDecimal amtInAuctionBidded) {
		this.amtInAuctionBidded = amtInAuctionBidded;
	}

	public Long getNoInAuctionUnbidded() {
		return noInAuctionUnbidded;
	}

	public void setNoInAuctionUnbidded(Long noInAuctionUnbidded) {
		this.noInAuctionUnbidded = noInAuctionUnbidded;
	}

	public BigDecimal getAmtInAuctionUnbidded() {
		return amtInAuctionUnbidded;
	}

	public void setAmtInAuctionUnbidded(BigDecimal amtInAuctionUnbidded) {
		this.amtInAuctionUnbidded = amtInAuctionUnbidded;
	}

	public Long getNoDelisted() {
		return noDelisted;
	}

	public void setNoDelisted(Long noDelisted) {
		this.noDelisted = noDelisted;
	}

	public BigDecimal getAmtDelisted() {
		return amtDelisted;
	}

	public void setAmtDelisted(BigDecimal amtDelisted) {
		this.amtDelisted = amtDelisted;
	}

	public Long getNoDealed() {
		return noDealed;
	}

	public void setNoDealed(Long noDealed) {
		this.noDealed = noDealed;
	}

	public BigDecimal getAmtDealed() {
		return amtDealed;
	}

	public void setAmtDealed(BigDecimal amtDealed) {
		this.amtDealed = amtDealed;
	}

	public Long getNoUnsuccessfullyDisbursed() {
		return noUnsuccessfullyDisbursed;
	}

	public void setNoUnsuccessfullyDisbursed(Long noUnsuccessfullyDisbursed) {
		this.noUnsuccessfullyDisbursed = noUnsuccessfullyDisbursed;
	}

	public BigDecimal getAmtUnsuccessfullyDisbursed() {
		return amtUnsuccessfullyDisbursed;
	}

	public void setAmtUnsuccessfullyDisbursed(
			BigDecimal amtUnsuccessfullyDisbursed) {
		this.amtUnsuccessfullyDisbursed = amtUnsuccessfullyDisbursed;
	}

	public Long getNoDisbursed() {
		return noDisbursed;
	}

	public void setNoDisbursed(Long noDisbursed) {
		this.noDisbursed = noDisbursed;
	}

	public BigDecimal getAmtDisbursed() {
		return amtDisbursed;
	}

	public void setAmtDisbursed(BigDecimal amtDisbursed) {
		this.amtDisbursed = amtDisbursed;
	}

	public Long getNoSettled() {
		return noSettled;
	}

	public void setNoSettled(Long noSettled) {
		this.noSettled = noSettled;
	}

	public BigDecimal getAmtSettled() {
		return amtSettled;
	}

	public void setAmtSettled(BigDecimal amtSettled) {
		this.amtSettled = amtSettled;
	}

	public Long getNoOverdue() {
		return noOverdue;
	}

	public void setNoOverdue(Long noOverdue) {
		this.noOverdue = noOverdue;
	}

	public BigDecimal getAmtOverdue() {
		return amtOverdue;
	}

	public void setAmtOverdue(BigDecimal amtOverdue) {
		this.amtOverdue = amtOverdue;
	}
}
