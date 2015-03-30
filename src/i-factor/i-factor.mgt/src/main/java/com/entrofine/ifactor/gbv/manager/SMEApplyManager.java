package com.entrofine.ifactor.gbv.manager;

import org.limp.mine.DataTrimmerI;

public class SMEApplyManager {

	/**
	 * update sme apply status
	 * 
	 * @param baStatus
	 * @param baStatusVal
	 * @param ibaPkId
	 * @param trimmerI
	 */
	public static void updateSMEApplyStatus(String cpStatus,
			String cpStatusVal, String pkId, DataTrimmerI trimmerI) {

		trimmerI.execute(
				"UPDATE IF_MGT_CP_APPLY SET CPSTATUS = ?, CPSTATUS_VAL = ? WHERE PK_ID = ?",
				cpStatus, cpStatusVal, pkId);

	}
}
