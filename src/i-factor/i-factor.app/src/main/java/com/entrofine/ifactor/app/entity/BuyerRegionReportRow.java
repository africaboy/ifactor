package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.math.BigDecimal;

public class BuyerRegionReportRow implements Serializable {
	private static final long serialVersionUID = -4986363804624622437L;

	private String region;
	private Long applied;
	private Long accepted;
	private Long invested;
	private BigDecimal weightedAvgAdv;
	private BigDecimal weightedAvgInt;
	private Long regulatoryBlacklisted;
	private Long cancellationBlacklisted;

	public BuyerRegionReportRow(String region) {
		setRegion(region);
		setApplied(0L);
		setAccepted(0L);
		setInvested(0L);
		setWeightedAvgAdv(new BigDecimal(0));
		setWeightedAvgInt(new BigDecimal(0));
		setRegulatoryBlacklisted(0L);
		setCancellationBlacklisted(0L);
	}

	public BuyerRegionReportRow(String region, Long applied, Long accepted,
			Long invested, BigDecimal weightedAvgAdv,
			BigDecimal weightedAvgInt, Long regulatoryBlacklisted,
			Long cancellationBlacklisted) {
		setRegion(region);
		setApplied(applied);
		setAccepted(accepted);
		setInvested(invested);
		setWeightedAvgAdv(weightedAvgAdv);
		setWeightedAvgInt(weightedAvgInt);
		setRegulatoryBlacklisted(regulatoryBlacklisted);
		setCancellationBlacklisted(cancellationBlacklisted);
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public Long getApplied() {
		return applied;
	}

	public void setApplied(Long applied) {
		this.applied = applied;
	}

	public Long getAccepted() {
		return accepted;
	}

	public void setAccepted(Long accepted) {
		this.accepted = accepted;
	}

	public Long getInvested() {
		return invested;
	}

	public void setInvested(Long invested) {
		this.invested = invested;
	}

	public BigDecimal getWeightedAvgAdv() {
		return weightedAvgAdv;
	}

	public void setWeightedAvgAdv(BigDecimal weightedAvgAdv) {
		this.weightedAvgAdv = weightedAvgAdv;
	}

	public BigDecimal getWeightedAvgInt() {
		return weightedAvgInt;
	}

	public void setWeightedAvgInt(BigDecimal weightedAvgInt) {
		this.weightedAvgInt = weightedAvgInt;
	}

	public Long getRegulatoryBlacklisted() {
		return regulatoryBlacklisted;
	}

	public void setRegulatoryBlacklisted(Long regulatoryBlacklisted) {
		this.regulatoryBlacklisted = regulatoryBlacklisted;
	}

	public Long getCancellationBlacklisted() {
		return cancellationBlacklisted;
	}

	public void setCancellationBlacklisted(Long cancellationBlacklisted) {
		this.cancellationBlacklisted = cancellationBlacklisted;
	}
}
