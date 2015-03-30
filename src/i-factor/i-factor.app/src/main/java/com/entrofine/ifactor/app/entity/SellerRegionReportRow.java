package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.math.BigDecimal;

public class SellerRegionReportRow implements Serializable {
	private static final long serialVersionUID = -4986363804624622437L;

	private String region;
	private Long applied;
	private Long accepted;
	private Long financed;
	private BigDecimal weightedAvgAdv;
	private BigDecimal weightedAvgInt;
	private Long fraudBlacklisted;
	private Long cancellationBlacklisted;

	public SellerRegionReportRow(String region) {
		setRegion(region);
		setApplied(0L);
		setAccepted(0L);
		setFinanced(0L);
		setWeightedAvgAdv(new BigDecimal(0));
		setWeightedAvgInt(new BigDecimal(0));
		setFraudBlacklisted(0L);
		setCancellationBlacklisted(0L);
	}

	public SellerRegionReportRow(String region, Long applied, Long accepted,
			Long invested, BigDecimal weightedAvgAdv,
			BigDecimal weightedAvgInt, Long fraudBlacklisted,
			Long cancellationBlacklisted) {
		setRegion(region);
		setApplied(applied);
		setAccepted(accepted);
		setFinanced(invested);
		setWeightedAvgAdv(weightedAvgAdv);
		setWeightedAvgInt(weightedAvgInt);
		setFraudBlacklisted(fraudBlacklisted);
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

	public Long getFinanced() {
		return financed;
	}

	public void setFinanced(Long financed) {
		this.financed = financed;
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

	public Long getFraudBlacklisted() {
		return fraudBlacklisted;
	}

	public void setFraudBlacklisted(Long fraudBlacklisted) {
		this.fraudBlacklisted = fraudBlacklisted;
	}

	public Long getCancellationBlacklisted() {
		return cancellationBlacklisted;
	}

	public void setCancellationBlacklisted(Long cancellationBlacklisted) {
		this.cancellationBlacklisted = cancellationBlacklisted;
	}
}
