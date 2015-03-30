package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;
import jt.classic.system.user.UserManager;
import jt.classic.system.wordbook.WordBookUtil;
import jt.classic.system.workflow.engine.GrooveWorkflowEngine;

import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.entrofine.ifactor.gbv.manager.BuyerApplyManager;
import com.entrofine.ifactor.gbv.manager.InvoiceDeliveryApplyManager;
import com.entrofine.ifactor.gbv.manager.SMEApplyManager;
import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * 流程运转超时处理
 * 
 * @author wangweifeng
 * 
 */
@Lazy(false)
@Component
public class WorkFlowTimeOutScheduled {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Scheduled(cron = "0 */10 * * * ?")
	public void workFlowTimeOut() {
		logger.debug("workflow timeout is running...");

		Connection conn = null;

		try {

			conn = SystemDataSource.getInstance().getConnection();

			// 获取需要超时处理的流转记录
			List activityList = getTimeOutActivitys(conn);

			// 处理超时记录
			handleTimeOutActivitys(conn, activityList);

			conn.commit();

		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}

	}

	/**
	 * all need timeout activity record
	 * 
	 * @param conn
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private List getTimeOutActivitys(Connection conn) {

		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder
				.append("SELECT A_ID,INS_ID  ")
				.append("FROM WF_ACTIVITY A 	")
				.append("WHERE (A_STATE=? OR A_STATE=?) AND A_LTIME !=? AND A_LTIME<=?");

		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		return trimmerI.searchMultiData(sqlBuilder.toString(), "0", "1", "-1",
				DateTrimmer.getYMDHMS());
	}

	/**
	 * 处理超时记录
	 * 
	 * @param conn
	 * @param activityList
	 * @throws Exception
	 */
	private void handleTimeOutActivitys(Connection conn,
			List<Map<String, Object>> activityList) throws Exception {

		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		GrooveWorkflowEngine gwe = new GrooveWorkflowEngine(conn);

		if (activityList != null && !activityList.isEmpty()) {
			logger.debug("Need timeout activity records:{}",
					activityList.size());
			for (int i = 0; i < activityList.size(); i++) {

				Map<String, Object> activityMap = activityList.get(i);
				Map<String, Object> insMap = getInstanceMap(trimmerI,
						Getter.string(activityMap.get("INS_ID")));

				String insObj = Getter.string(insMap.get("INS_OBJECT"));

				if ("buyerApplyObject".equals(insObj)) {

					handleBuyerActivityTimeOut(gwe, trimmerI,
							Getter.string(activityMap.get("INS_ID")),
							Getter.string(activityMap.get("A_ID")));

				} else if ("invoiceDeliveryObject".equals(insObj)) {

					handleInvoiceActivityTimeOut(gwe, trimmerI,
							Getter.string(activityMap.get("INS_ID")),
							Getter.string(activityMap.get("A_ID")));

				} else if ("smeApplyObject".equals(insObj)) {

					handleSmeActivityTimeOut(gwe, trimmerI,
							Getter.string(activityMap.get("INS_ID")),
							Getter.string(activityMap.get("A_ID")));

				}

			}
		}
	}

	/**
	 * 处理buyer apply timeout
	 * 
	 * @param gwe
	 * @param trimmerI
	 * @param insId
	 * @param aId
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	private void handleBuyerActivityTimeOut(GrooveWorkflowEngine gwe,
			DataTrimmerI trimmerI, String insId, String aId) throws Exception {

		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder
				.append("SELECT IBA_PK_ID,BA_STATUS,BA_STATUS_VAL,BA_APPLY_CODE  ")
				.append("FROM IF_MGT_BUYER_APPLY ")
				.append("WHERE IBA_PK_ID=")
				.append("(SELECT KEYVALUE FROM WF_INSTANCE_OBJ WHERE INS_ID=? AND TABLEVIEW=?)");

		Map applyMap = trimmerI.searchSingleData(sqlBuilder.toString(), insId,
				"ifactor_buyer_apply");

		if (applyMap != null) {

			if ("xzaEBsKadm_AyrbNcfEYW".equals(applyMap.get("BA_STATUS"))) {
				// if data modify is in not over cs record time
				logger.debug("Timing handle buyer apply [{}] to status [{}]",
						applyMap.get("BA_APPLY_CODE"),
						"Pending for CS to Contact");

				String updateStatus = "xzaEBsKadm_AyrbNcfEYW_0";
				BuyerApplyManager.updateBuyerApplyStatus(updateStatus,
						WordBookUtil.getWordBookItemName("ba_stauts",
								updateStatus), Getter.string(applyMap
								.get("IBA_PK_ID")), trimmerI);

				updateAltime(trimmerI, aId);

				// TODO send notification to CS?? which CS??

			} else if ("xzaEBsKadm_AyrbNcfEYW_1".equals(applyMap
					.get("BA_STATUS"))) {
				// if have contracted by CS,finish buyer apply;
				logger.debug("Timing handle buyer apply [{}] to status [{}]",
						applyMap.get("BA_APPLY_CODE"), "Application closed");

				gwe.cancelInstance(insId, UserManager.createGuestUser());

				String updateStatus = "AyrbNcfEYW_ANAzqfzpXu";
				BuyerApplyManager.updateBuyerApplyStatus(updateStatus,
						WordBookUtil.getWordBookItemName("ba_stauts",
								updateStatus), Getter.string(applyMap
								.get("IBA_PK_ID")), trimmerI);

				updateAltime(trimmerI, aId);

				// TODO send notification to buyer

			}

		}

	}

	/**
	 * 处理invoice apply timeout
	 * 
	 * @param gwe
	 * @param trimmerI
	 * @param insId
	 * @param aId
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	private void handleInvoiceActivityTimeOut(GrooveWorkflowEngine gwe,
			DataTrimmerI trimmerI, String insId, String aId) throws Exception {

		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder
				.append("SELECT IIDA_PK_ID,IDA_STATUS,IDA_STATUS_VAL,IDA_CODE  ")
				.append("FROM IF_MGT_INVOICE_APPLY ")
				.append("WHERE IIDA_PK_ID=")
				.append("(SELECT KEYVALUE FROM WF_INSTANCE_OBJ WHERE INS_ID=? AND TABLEVIEW=?)");

		Map applyMap = trimmerI.searchSingleData(sqlBuilder.toString(), insId,
				"ifactor_invoice_delivery_apply");

		if (applyMap != null) {

			if ("mVolpvvEFY_RyXlLYLUHF".equals(applyMap.get("IDA_STATUS"))) {
				// if data modify is in not over cs record time
				logger.debug("Timing handle invoice apply [{}] to status [{}]",
						applyMap.get("IDA_CODE"), "Pending for CS to Contact");

				String updateStatus = "mVolpvvEFY_RyXlLYLUHF_0";

				InvoiceDeliveryApplyManager.updateInvoiceDeliveryApplyStatus(
						updateStatus, WordBookUtil.getWordBookItemName(
								"ida_stauts", updateStatus), Getter
								.string(applyMap.get("IIDA_PK_ID")), trimmerI);

				updateAltime(trimmerI, aId);

				// TODO send notification to CS?? which CS??

			} else if ("mVolpvvEFY_RyXlLYLUHF_1".equals(applyMap
					.get("IDA_STATUS"))) {
				// if have contracted by CS,finish invoice apply;
				logger.debug("Timing handle invoice apply [{}] to status [{}]",
						applyMap.get("IDA_CODE"), "Application closed");

				gwe.cancelInstance(insId, UserManager.createGuestUser());

				String updateStatus = "RyXlLYLUHF_dSHAvdyhfW";
				InvoiceDeliveryApplyManager.updateInvoiceDeliveryApplyStatus(
						updateStatus, WordBookUtil.getWordBookItemName(
								"IDA_STATUS", updateStatus), Getter
								.string(applyMap.get("IIDA_PK_ID")), trimmerI);

				updateAltime(trimmerI, aId);

				// TODO send notification to invoice

			}

		}

	}

	/**
	 * 处理sme apply timeout
	 * 
	 * @param gwe
	 * @param trimmerI
	 * @param insId
	 * @param aId
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	private void handleSmeActivityTimeOut(GrooveWorkflowEngine gwe,
			DataTrimmerI trimmerI, String insId, String aId) throws Exception {

		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder
				.append("SELECT PK_ID,CPSTATUS,CPSTATUS_VAL  ")
				.append("FROM IF_MGT_CP_APPLY ")
				.append("WHERE PK_ID=")
				.append("(SELECT KEYVALUE FROM WF_INSTANCE_OBJ WHERE INS_ID=? AND TABLEVIEW=?)");

		Map applyMap = trimmerI.searchSingleData(sqlBuilder.toString(), insId,
				"if_cp_apply_add");

		if (applyMap != null) {

			if ("FUoVuacHWV_cMxzCQLUrF".equals(applyMap.get("CPSTATUS"))) {
				// if data modify is in not over cs record time

				String updateStatus = "FUoVuacHWV_cMxzCQLUrF_0";

				SMEApplyManager.updateSMEApplyStatus(updateStatus, WordBookUtil
						.getWordBookItemName("smeapplystatus", updateStatus),
						Getter.string(applyMap.get("PK_ID")), trimmerI);

				updateAltime(trimmerI, aId);

				// TODO send notification to CS?? which CS??

			} else if ("FUoVuacHWV_cMxzCQLUrF_1".equals(applyMap
					.get("CPSTATUS"))) {
				// if have contracted by CS,finish sme apply;

				gwe.cancelInstance(insId, UserManager.createGuestUser());

				String updateStatus = "cMxzCQLUrF_oQfYjWhRHs";
				BuyerApplyManager.updateBuyerApplyStatus(updateStatus,
						WordBookUtil.getWordBookItemName("smeapplystatus",
								updateStatus), Getter.string(applyMap
								.get("PK_ID")), trimmerI);

				updateAltime(trimmerI, aId);

				// TODO send notification to SME

			}

		}

	}

	/**
	 * 获取流程对象
	 * 
	 * @param trimmerI
	 * @param insId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private Map<String, Object> getInstanceMap(DataTrimmerI trimmerI,
			String insId) {

		String sql = "	SELECT INS_OBJECT FROM WF_INSTANCE WHERE INS_ID=?";

		return trimmerI.searchSingleData(sql, insId);

	}

	private void updateAltime(DataTrimmerI trimmerI, String aid) {

		trimmerI.execute("UPDATE WF_ACTIVITY SET A_LTIME=? WHERE A_ID=?", "-1",
				aid);
	}
}
