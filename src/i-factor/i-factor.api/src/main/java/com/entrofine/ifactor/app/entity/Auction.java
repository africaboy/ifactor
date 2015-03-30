package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.entrofine.ifactor.jpa.AuctionEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = Auction.TABLE)
public class Auction extends AuctionEntity implements Serializable {

	private static final long serialVersionUID = 4276055928247418488L;

	private String delivered;
	private BigDecimal discount;
	private BigDecimal interest;
	private Long buyerId;
	// 用于线下和发票申请、拍卖建立关系
	private Long buyerApplyId;

	private String buyerLoginName;
	private String status;

	private String flowStatus;
	private String flowOpinion;

	@ManyToOne
	@JoinColumn(name = "INVOICE_ID")
	@JsonIgnore
	private Invoice invoice;

	/**
	 * 服务或商品是否交付
	 * 
	 * @return
	 */
	public String getDelivered() {
		return delivered;
	}

	public void setDelivered(String delivered) {
		this.delivered = delivered;
	}

	/**
	 * 折扣率
	 * 
	 * @return
	 */
	public BigDecimal getDiscount() {
		return discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	/**
	 * 支付利息
	 * 
	 * @return
	 */
	public BigDecimal getInterest() {
		return interest;
	}

	public void setInterest(BigDecimal interest) {
		this.interest = interest;
	}

	/**
	 * 发票状态
	 * 
	 * @return
	 */
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBuyerLoginName() {
		return buyerLoginName;
	}

	public void setBuyerLoginName(String buyerLoginName) {
		this.buyerLoginName = buyerLoginName;
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

	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}
}
