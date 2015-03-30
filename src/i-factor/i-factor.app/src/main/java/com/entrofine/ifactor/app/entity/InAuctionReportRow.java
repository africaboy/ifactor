package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class InAuctionReportRow implements Serializable {

	private static final long serialVersionUID = -3856619804659205966L;

	private Date releaseDate;
	private Long invoiceId;
	private BigDecimal invoiceAmount;
	private Long sellerId;
	private BigDecimal sellerRating;
	private Long debtorId;
	private String debtorName;
	private Date expectedSettlementDate;
	private Long remainingTerm;
	private Date delistingDate;
	private Long remainingDaysTillDelisting;
	private Long noOfBids;
	private BigDecimal readyToSellAdv;
	private BigDecimal readyToSellInt;
	private BigDecimal cboa;
	private BigDecimal cboi;

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	public Long getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}

	public BigDecimal getInvoiceAmount() {
		return invoiceAmount;
	}

	public void setInvoiceAmount(BigDecimal invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}

	public BigDecimal getSellerRating() {
		return sellerRating;
	}

	public void setSellerRating(BigDecimal sellerRating) {
		this.sellerRating = sellerRating;
	}

	public Long getDebtorId() {
		return debtorId;
	}

	public void setDebtorId(Long debtorId) {
		this.debtorId = debtorId;
	}

	public Date getExpectedSettlementDate() {
		return expectedSettlementDate;
	}

	public void setExpectedSettlementDate(Date expectedSettlementDate) {
		this.expectedSettlementDate = expectedSettlementDate;
	}

	public Long getRemainingTerm() {
		return remainingTerm;
	}

	public void setRemainingTerm(Long remainingTerm) {
		this.remainingTerm = remainingTerm;
	}

	public Date getDelistingDate() {
		return delistingDate;
	}

	public void setDelistingDate(Date delistingDate) {
		this.delistingDate = delistingDate;
	}

	public Long getRemainingDaysTillDelisting() {
		return remainingDaysTillDelisting;
	}

	public void setRemainingDaysTillDelisting(Long remainingDaysTillDelisting) {
		this.remainingDaysTillDelisting = remainingDaysTillDelisting;
	}

	public Long getNoOfBids() {
		return noOfBids;
	}

	public void setNoOfBids(Long noOfBids) {
		this.noOfBids = noOfBids;
	}

	public BigDecimal getReadyToSellAdv() {
		return readyToSellAdv;
	}

	public void setReadyToSellAdv(BigDecimal readyToSellAdv) {
		this.readyToSellAdv = readyToSellAdv;
	}

	public BigDecimal getReadyToSellInt() {
		return readyToSellInt;
	}

	public void setReadyToSellInt(BigDecimal readyToSellInt) {
		this.readyToSellInt = readyToSellInt;
	}

	public BigDecimal getCboa() {
		return cboa;
	}

	public void setCboa(BigDecimal cboa) {
		this.cboa = cboa;
	}

	public BigDecimal getCboi() {
		return cboi;
	}

	public void setCboi(BigDecimal cboi) {
		this.cboi = cboi;
	}

	public String getDebtorName() {
		return debtorName;
	}

	public void setDebtorName(String debtorName) {
		this.debtorName = debtorName;
	}

}
