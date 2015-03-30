package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;

import org.limp.basework.SimpleBean4Table;
import org.limp.basework.impl.SimpleBean4TableImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

//@Lazy(false)
//@Component
public class DebtorPayHistoryScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings("rawtypes")
	@Scheduled(cron = "0 */3 * * * ?")
	public void sellerReport() {
		logger.debug("debtor payment history is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();

			List<Map> resultLit = findAllDisbursedInvoice(conn);

			generateDebtorPayHistory(conn, resultLit);

			conn.commit();
		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	/**
	 * 生成债务人支付历史
	 * 
	 * @param conn
	 * @param resultList
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void generateDebtorPayHistory(Connection conn, List<Map> resultList)
			throws Exception {

		if (resultList != null && !resultList.isEmpty()) {
			BaseworkUtil bu = new BaseworkUtil();
			for (Map result : resultList) {
				Map report = new HashMap();
				report.put("INV_NO", result.get("INVOICE_ID"));
				report.put("BUYER_ID", result.get("BUYERID"));
				report.put("SETTLE_DATE", result.get("PAID_DATE"));

				boolean isNeed = completeReportData(conn, report, result);

				if (!isNeed)
					continue;

				SimpleBean4Table bean = new SimpleBean4TableImpl(
						"IF_MGT_DEBTOR_PAY_REPORT");
				bean.reload(report);
				bu.manualSave1(bean, conn);
			}
		}
	}

	/**
	 * 补全记录数据 TODO payment amount 没有处理
	 * 
	 * @param conn
	 * @param report
	 * @param result
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public boolean completeReportData(Connection conn, Map report, Map result) {
		boolean isNeed = true;
		String sql = "SELECT A.DEBTOR,B.IIDST_USER,C.INVOICE_AMOUNT,C.EXPECTED_PAYMENT_DATE  "
				+ "FROM IF_MGT_INVOICE_SELLER A LEFT JOIN IF_MGT_INVOICE_DEBTOR B ON A.IIDA_PK_ID=B.IIDA_PK_ID "
				+ "LEFT JOIN IF_MGT_INVOICE_FINANC C ON A.IIDA_PK_ID = C.IIDA_PK_ID "
				+ "WHERE A.IIDA_PK_ID=?";
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		Map crdMap = trimmerI.searchSingleData(sql, result.get("IIDA_PK_ID"));
		if (crdMap != null) {

			Map needMap = findByInvoiceAndDebtor(conn,
					(String) result.get("INVOICE_ID"),
					(String) result.get("DEBTOR"));

			if (needMap != null) {
				isNeed = false;
				return isNeed;
			}

			report.put("SELLER_ID", crdMap.get("IIDST_USER"));
			report.put("DEBTOR_NAME", crdMap.get("DEBTOR"));
			report.put("EXP_SETTLE_DATE", crdMap.get("EXPECTED_PAYMENT_DATE"));
			report.put("INV_AMOUNT", crdMap.get("INVOICE_AMOUNT"));
		}

		return isNeed;
	}

	/**
	 * 查询debto相应的支付记录是否已经存在
	 * 
	 * @param conn
	 * @param invoiceId
	 * @param buyerID
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public Map findByInvoiceAndDebtor(Connection conn, String invoiceId,
			String debtorName) {
		String sql = "SELECT * FROM IF_MGT_DEBTOR_PAY_REPORT WHERE INV_NO=? AND DEBTOR_NAME=?";
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		return trimmerI.searchSingleData(sql, invoiceId, debtorName);
	}

	/**
	 * 查询所有已成功支付的发票
	 * 
	 * @param conn
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Map> findAllDisbursedInvoice(Connection conn) {
		String sql = "SELECT * FROM IF_MGT_INVOICE_AUCTION WHERE AUCTION_STATUS=?";
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		return trimmerI.searchMultiData(sql, "IAS_08");
	}

}
