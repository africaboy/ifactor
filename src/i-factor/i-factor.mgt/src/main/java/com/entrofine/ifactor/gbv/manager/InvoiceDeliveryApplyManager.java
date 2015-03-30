package com.entrofine.ifactor.gbv.manager;

import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;

public class InvoiceDeliveryApplyManager {

	/**
	 * update invoice delivery apply status
	 * 
	 * @param idaStatus
	 * @param idaStatusVal
	 * @param iidaPkId
	 * @param trimmerI
	 */
	public static void updateInvoiceDeliveryApplyStatus(String idaStatus,
			String idaStatusVal, String iidaPkId, DataTrimmerI trimmerI) {

		trimmerI.execute(
				"UPDATE IF_MGT_INVOICE_APPLY SET IDA_STATUS=?,IDA_STATUS_VAL=? WHERE IIDA_PK_ID=?",
				idaStatus, idaStatusVal, iidaPkId);

	}

	/**
	 * update invoice auction status
	 * 
	 * @param iaStatus
	 * @param iaStatusVal
	 * @param iiatPkId
	 * @param trimmerI
	 */
	public static void updateInvoiceAuctionStatus(String iaStatus,
			String iaStatusVal, String iiatPkId, DataTrimmerI trimmerI) {
		String sql = "";
		String nowDate = DateTrimmer.getYMDHMS();
		if (iaStatus.equals("IAS_02")) {
			sql = "UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=?,VIP_DATE=? WHERE IIDAT_PK_ID=?";
			trimmerI.execute(sql, iaStatus, iaStatusVal, nowDate, iiatPkId);
		} else if (iaStatus.equals("IAS_03")) {
			sql = "UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=?,PUBLIC_DATE=? WHERE IIDAT_PK_ID=?";
			trimmerI.execute(sql, iaStatus, iaStatusVal, nowDate, iiatPkId);
		} else if (iaStatus.equals("IAS_04")) {
			sql = "UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=?,SIGNED_DATE=? WHERE IIDAT_PK_ID=?";
			trimmerI.execute(sql, iaStatus, iaStatusVal, nowDate, iiatPkId);
		} else {
			trimmerI.execute(
					"UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=? WHERE IIDAT_PK_ID=?",
					iaStatus, iaStatusVal, iiatPkId);
		}

	}
}
