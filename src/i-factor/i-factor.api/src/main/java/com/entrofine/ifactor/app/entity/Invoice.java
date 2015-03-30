package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.format.annotation.DateTimeFormat;

import com.entrofine.ifactor.jpa.InvoiceEntity;

@Entity
@Table(name = Invoice.TABLE)
public class Invoice extends InvoiceEntity implements Serializable {

	private static final long serialVersionUID = -5296044506763637920L;

	private Long sellerId;
	private String sellerLoginName;
	private String sellerCompanyName;
	private String sellerRepresentedByTitle;
	private String sellerRepresentedByName;
	private String debtorName;
	private String debtorAddress;
	private String district;
	private String city;
	private String region;
	private String country;
	private String postCode;
	private String debtorBizRegNo;
	private String debtorTaxCode;
	private String finStickerId;
	private String serialNumInvoice;
	private String finVatInvNo;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date finInvIssDate;
	private BigDecimal finInvAmount;
	private String finObjOfInv;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date finDueDateAccToCont;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date finExpPmtDate;
	private Long finRmngMatTerm;
	private BigDecimal readyToSellAdv;
	private BigDecimal readyToSellInt;
	private Integer rating;
	private Integer status;

	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date releasedDate;

	private Long reDaysStillDelisting;

	private BigDecimal bestBuyerAdv;
	private BigDecimal bestBuyerInt;
	private Long buyerId;
	// 用于线下和发票申请、拍卖建立关系
	private Long buyerApplyId;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "biz")
	@OrderBy("dispOrder")
	private List<InvoiceDoc> documents = new ArrayList<InvoiceDoc>();

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "invoice")
	@OrderBy("updateTime desc")
	private List<Auction> autions = new ArrayList<Auction>();

	private String flowStatus;
	private String flowOpinion;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date startDate;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date endDate;

	private BigDecimal advance;
	private BigDecimal interest;
	private String auctionStatus;

	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date submissionDate;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date savedDate;

	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date biddingDate;

	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date delistingDate;

	private Integer noOfOffers;
	@Transient
	private double curBestOffrInt;

	@Transient
	private double curBestOfferOfcurrUser;

	public double getCurBestOfferOfcurrUser() {
		return curBestOfferOfcurrUser;
	}

	public void setCurBestOfferOfcurrUser(double curBestOfferOfcurrUser) {
		this.curBestOfferOfcurrUser = curBestOfferOfcurrUser;
	}

	private BigDecimal limitMin;
	private BigDecimal limitMax;
	private BigDecimal limitBalance;

	private Long sellerIdKey;

	/*
	 * SELLER INFORMATION - Name of your company
	 */
	public String getSellerCompanyName() {
		return sellerCompanyName;
	}

	public void setSellerCompanyName(String sellerCompanyName) {
		this.sellerCompanyName = sellerCompanyName;
	}

	/*
	 * SELLER INFORMATION - Represented by (Title)
	 */
	public String getSellerRepresentedByTitle() {
		return sellerRepresentedByTitle;
	}

	public void setSellerRepresentedByTitle(String sellerRepresentedByTitle) {
		this.sellerRepresentedByTitle = sellerRepresentedByTitle;
	}

	/*
	 * SELLER INFORMATION - Represented by (Name)
	 */
	public String getSellerRepresentedByName() {
		return sellerRepresentedByName;
	}

	public void setSellerRepresentedByName(String sellerRepresentedByName) {
		this.sellerRepresentedByName = sellerRepresentedByName;
	}

	public String getDebtorName() {
		return debtorName;
	}

	public void setDebtorName(String debtorName) {
		this.debtorName = debtorName;
	}

	public String getDebtorAddress() {
		return debtorAddress;
	}

	public void setDebtorAddress(String debtorAddress) {
		this.debtorAddress = debtorAddress;
	}

	public String getDebtorBizRegNo() {
		return debtorBizRegNo;
	}

	public void setDebtorBizRegNo(String debtorBizRegNo) {
		this.debtorBizRegNo = debtorBizRegNo;
	}

	public String getDebtorTaxCode() {
		return debtorTaxCode;
	}

	public void setDebtorTaxCode(String debtorTaxCode) {
		this.debtorTaxCode = debtorTaxCode;
	}

	public String getFinStickerId() {
		return finStickerId;
	}

	public void setFinStickerId(String finStickerId) {
		this.finStickerId = finStickerId;
	}

	public String getFinVatInvNo() {
		return finVatInvNo;
	}

	public void setFinVatInvNo(String finVatInvNo) {
		this.finVatInvNo = finVatInvNo;
	}

	public Date getFinInvIssDate() {
		return finInvIssDate;
	}

	public void setFinInvIssDate(Date finInvIssDate) {
		this.finInvIssDate = finInvIssDate;
	}

	public BigDecimal getFinInvAmount() {
		return finInvAmount;
	}

	public void setFinInvAmount(BigDecimal finInvAmount) {
		this.finInvAmount = finInvAmount;
	}

	public String getFinObjOfInv() {
		return finObjOfInv;
	}

	public void setFinObjOfInv(String finObjOfInv) {
		this.finObjOfInv = finObjOfInv;
	}

	public Date getFinDueDateAccToCont() {
		return finDueDateAccToCont;
	}

	public void setFinDueDateAccToCont(Date finDueDateAccToCont) {
		this.finDueDateAccToCont = finDueDateAccToCont;
	}

	public Date getFinExpPmtDate() {
		return finExpPmtDate;
	}

	public void setFinExpPmtDate(Date finExpPmtDate) {
		this.finExpPmtDate = finExpPmtDate;
	}

	public Long getFinRmngMatTerm() {
		return finRmngMatTerm;
	}

	public void setFinRmngMatTerm(Long finRmngMatTerm) {
		this.finRmngMatTerm = finRmngMatTerm;
	}

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}

	public String getSellerLoginName() {
		return sellerLoginName;
	}

	public void setSellerLoginName(String sellerLoginName) {
		this.sellerLoginName = sellerLoginName;
	}

	public Integer getNoOfOffers() {
		return noOfOffers;
	}

	public void setNoOfOffers(Integer noOfOffers) {
		this.noOfOffers = noOfOffers;
	}

	public double getCurBestOffrInt() {
		return curBestOffrInt;
	}

	public void setCurBestOffrInt(double curBestOffrInt) {
		this.curBestOffrInt = curBestOffrInt;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
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

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public List<InvoiceDoc> getDocuments() {
		return documents;
	}

	public void setDocuments(List<InvoiceDoc> documents) {
		this.documents = documents;
	}

	public String getFlowStatus() {
		return flowStatus;
	}

	public void setFlowStatus(String flowStatus) {
		this.flowStatus = flowStatus;
	}

	public String getFlowOpinion() {
		return flowOpinion;
	}

	public void setFlowOpinion(String flowOpinion) {
		this.flowOpinion = flowOpinion;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public BigDecimal getAdvance() {
		return advance;
	}

	public void setAdvance(BigDecimal advance) {
		this.advance = advance;
	}

	public BigDecimal getInterest() {
		return interest;
	}

	public void setInterest(BigDecimal interest) {
		this.interest = interest;
	}

	public String getAuctionStatus() {
		return auctionStatus;
	}

	public void setAuctionStatus(String auctionStatus) {
		this.auctionStatus = auctionStatus;
	}

	public BigDecimal getBestBuyerAdv() {
		return bestBuyerAdv;
	}

	public void setBestBuyerAdv(BigDecimal bestBuyerAdv) {
		this.bestBuyerAdv = bestBuyerAdv;
	}

	public BigDecimal getBestBuyerInt() {
		return bestBuyerInt;
	}

	public void setBestBuyerInt(BigDecimal bestBuyerInt) {
		this.bestBuyerInt = bestBuyerInt;
	}

	public Long getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(Long buyerId) {
		this.buyerId = buyerId;
	}

	public Long getBuyerApplyId() {
		return buyerApplyId;
	}

	public void setBuyerApplyId(Long buyerApplyId) {
		this.buyerApplyId = buyerApplyId;
	}

	public List<Auction> getAutions() {
		return autions;
	}

	public void setAutions(List<Auction> autions) {
		this.autions = autions;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPostCode() {
		return postCode;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public String getSerialNumInvoice() {
		return serialNumInvoice;
	}

	public void setSerialNumInvoice(String serialNumInvoice) {
		this.serialNumInvoice = serialNumInvoice;
	}

	public BigDecimal getLimitMin() {
		return limitMin;
	}

	public void setLimitMin(BigDecimal limitMin) {
		this.limitMin = limitMin;
	}

	public BigDecimal getLimitMax() {
		return limitMax;
	}

	public void setLimitMax(BigDecimal limitMax) {
		this.limitMax = limitMax;
	}

	public BigDecimal getLimitBalance() {
		return limitBalance;
	}

	public void setLimitBalance(BigDecimal limitBalance) {
		this.limitBalance = limitBalance;
	}

	public Long getSellerIdKey() {
		return sellerIdKey;
	}

	public void setSellerIdKey(Long sellerIdKey) {
		this.sellerIdKey = sellerIdKey;
	}

	public Date getReleasedDate() {
		return releasedDate;
	}

	public void setReleasedDate(Date releasedDate) {
		this.releasedDate = releasedDate;
	}

	public Long getReDaysStillDelisting() {
		return reDaysStillDelisting;
	}

	public void setReDaysStillDelisting(Long reDaysStillDelisting) {
		this.reDaysStillDelisting = reDaysStillDelisting;
	}

	public Date getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(Date submissionDate) {
		this.submissionDate = submissionDate;
	}

	public Date getDelistingDate() {
		return delistingDate;
	}

	public void setDelistingDate(Date delistingDate) {
		this.delistingDate = delistingDate;
	}

	public Date getSavedDate() {
		return savedDate;
	}

	public void setSavedDate(Date savedDate) {
		this.savedDate = savedDate;
	}

	public Date getBiddingDate() {
		return biddingDate;
	}

	public void setBiddingDate(Date biddingDate) {
		this.biddingDate = biddingDate;
	}

}
