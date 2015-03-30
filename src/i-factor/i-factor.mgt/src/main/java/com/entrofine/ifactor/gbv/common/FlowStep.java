package com.entrofine.ifactor.gbv.common;

/**
 * Process step definition
 * 
 * @author wangweifeng
 * 
 */
public enum FlowStep {
	/**
	 * apply registration
	 * */
	buyer_step01("FTDaNkdaIp"),
	/**
	 * first check
	 */
	buyer_step02("frTGUAcenq"),
	/**
	 * data modify
	 */
	buyer_step03("AyrbNcfEYW"),
	/**
	 * double check
	 */
	buyer_step04("xzaEBsKadm"),
	/**
	 * blacklist check
	 */
	buyer_step05("yjoUTSRriH"),
	/**
	 * buyer confirm
	 */
	buyer_step06("ZgoGbrkOWm"),
	/**
	 * doment sign
	 */
	buyer_step07("wqeytIZGJg"),
	/**
	 * document check
	 */
	buyer_step08("PBwYjzcgYL"),
	/**
	 * close buyer
	 */
	buyer_step09("IumoNgdgWo"),
	/**
	 * finish
	 */
	buyer_step10("ANAzqfzpXu"),
	/**
	 * Invoice Regist
	 */
	invoiceDelivery_step01("szIeAMROkl"),
	/**
	 * Invoice First Check
	 */
	invoiceDelivery_step02("mVolpvvEFY"),
	/**
	 * Invoice Data Modify
	 */
	invoiceDelivery_step03("RyXlLYLUHF"),
	/**
	 * Manual Progress
	 */
	invoiceDelivery_step04("bquDuCwisW"),
	/**
	 * Finish
	 */
	invoiceDelivery_step05("dSHAvdyhfW"),
	/**
	 * Double Check
	 */
	invoiceDelivery_step06("ibvYshlyGv"),
	/**
	 * BlackList Check
	 */
	invoiceDelivery_step07("vBdcCEIXvk"),
	/**
	 * Double Manual Check
	 */
	invoiceDelivery_step08("YCcCAeFtUg"),
	/**
	 * Original invoice verification
	 */
	invoiceDelivery_step09("xhLGTcqzFh");

	private String key;

	public String getKey() {
		return key;
	}

	FlowStep(String _key) {
		key = _key;
	}
}
