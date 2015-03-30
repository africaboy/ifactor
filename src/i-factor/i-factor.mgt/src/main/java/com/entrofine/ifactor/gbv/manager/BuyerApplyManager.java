package com.entrofine.ifactor.gbv.manager;

import org.limp.mine.DataTrimmerI;

public class BuyerApplyManager {

	/**
	 * update buyer apply status
	 * 
	 * @param baStatus
	 * @param baStatusVal
	 * @param ibaPkId
	 * @param trimmerI
	 */
	public static void updateBuyerApplyStatus(String baStatus,
			String baStatusVal, String ibaPkId, DataTrimmerI trimmerI) {

		trimmerI.execute(
				"UPDATE IF_MGT_BUYER_APPLY SET BA_STATUS=?,BA_STATUS_VAL=? WHERE IBA_PK_ID=?",
				baStatus, baStatusVal, ibaPkId);

	}
}
