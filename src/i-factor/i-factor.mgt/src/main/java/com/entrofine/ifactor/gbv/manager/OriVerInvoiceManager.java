package com.entrofine.ifactor.gbv.manager;

import org.limp.mine.DataTrimmerI;

public class OriVerInvoiceManager {

	/**
	 * update original verificational status
	 * 
	 * @param ovStatus
	 * @param ovStatusVal
	 * @param iovPkId
	 * @param trimmerI
	 */
	public static void updateOriVerInvoiceStatus(String ovStatus,
			String ovStatusVal, String iovPkId, DataTrimmerI trimmerI) {

		trimmerI.execute(
				"UPDATE IF_MGT_INVOICE_ORIVER SET IOV_STATUS=?,IOV_STATUS_VAL=? WHERE IOV_PK_ID=?",
				ovStatus, ovStatusVal, iovPkId);

	}
}
