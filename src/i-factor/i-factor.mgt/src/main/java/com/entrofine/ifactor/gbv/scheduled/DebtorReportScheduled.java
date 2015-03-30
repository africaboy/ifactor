package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;

import org.limp.basework.SimpleBean;
import org.limp.basework.Table;
import org.limp.basework.analyzer.TableRegisterCenter;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.limp.mine.StringTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * Debtor report
 * 
 * @author hezhch
 * 
 */
@Lazy(false)
@Component
public class DebtorReportScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Scheduled(cron = "0 0 0 * * ?")
	public void debtorReport() {
		logger.debug("Debtor report is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String deborSql = "SELECT A.IDA_STATUS,A.IDA_ADVANCE,A.IDA_INTEREST,A.IDA_CYCLESTART,A.IDA_CYCLEEND,A.IDA_DATE,D.DEBTOR,"
					+ "F.INVOICE_ISSUANCE_DATE,F.INVOICE_AMOUNT,F.DUE_DATE,F.EXPECTED_PAYMENT_DATE,U.* FROM IF_MGT_INVOICE_APPLY A "
					+ "LEFT JOIN IF_MGT_INVOICE_DEBTOR D ON A.IIDA_PK_ID = D.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_FINANC F ON A.IIDA_PK_ID = F.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_AUCTION U ON A.IIDA_PK_ID = U.IIDA_PK_ID";
			List<Map> deborApplyInfo = trimmerI.searchMultiData(deborSql);
			Map<String, Map> reportInfoMap = new HashMap<String, Map>();
			for (Map map : deborApplyInfo) {
				String uploadDate = StringTool.checkString(map.get("IDA_DATE"));
				uploadDate = uploadDate.substring(0, 8);
				String debtorName = Getter.string(map.get("DEBTOR"));
				long uploaded = 1;
				String idaStatus = Getter.string(map.get("IDA_STATUS"));
				long accepted = 0;
				if (idaStatus.equals("OHMcXwKBdZ_dSHAvdyhfW")) {
					accepted = 1;
				}
				long disbursedNo = 0;
				float disbursedAmount = 0;
				float invoiceAmount = 0;
				long overdueNo = 0;
				float overdueAmount = 0;
				long overThirtyNo = 0;
				float overThirtyAmount = 0;
				long overdueDays = 0;
				float aveOverDueDays = 0;
				long settled = 0;
				float settledAmount = 0;
				long settleMentDays = 0;
				float aveCPayment = 0;
				float aveSPayment = 0;
				if (accepted == 1) {
					String auctionStatus = Getter.string(map
							.get("AUCTION_STATUS"));
					if (auctionStatus.equals("IAS_08")) {
						disbursedNo = 1;
						invoiceAmount = Getter.f(map.get("INVOICE_AMOUNT"));
						disbursedAmount = invoiceAmount;
						String dueDate = Getter.string(map.get("DUE_DATE"));
						String currentDateStr = DateTrimmer.getYMD() + "000000";
						if (currentDateStr.compareTo(dueDate) < 0) {
							overdueNo = 1;
							overdueAmount = invoiceAmount;
						}
						String paidDate = Getter.string(map.get("PAID_DATE"));
						if (!paidDate.equals("")) {
							overdueDays = DateTrimmer.getDateMargin(dueDate,
									paidDate);
						} else {
							overdueDays = DateTrimmer.getDateMargin(dueDate,
									currentDateStr);
							if (overdueDays < 0) {
								overdueDays = 0;
							}
						}
						if (overdueDays > 30) {
							overThirtyNo = 1;
							overThirtyAmount = invoiceAmount;
						}
						String sellerReturn = Getter.string(map
								.get("SELLER_RETURNS"));
						if (!sellerReturn.equals("")) {
							settled = 1;
							settledAmount = invoiceAmount;
						}
						String settmentDate = Getter.string(map
								.get("EXPECTED_PAYMENT_DATE"));
						settleMentDays = DateTrimmer.getDateMargin(
								settmentDate, currentDateStr);
						if (settleMentDays < 0) {
							settleMentDays = 0;
						}
					}
				}
				String reportDate = DateTrimmer.getYMD();
				if (reportInfoMap.containsKey(uploadDate)) {
					Map reportMap = reportInfoMap.get(uploadDate);
					reportMap.put("DEBTORNAME", debtorName);
					reportMap.put("UPLOADED_NO",
							Getter.l(reportMap.get("UPLOADED_NO")) + uploaded);
					reportMap.put("ACCEPTED_NO",
							Getter.l(reportMap.get("ACCEPTED_NO")) + accepted);
					reportMap.put("DISBURSED_NO",
							Getter.l(reportMap.get("DISBURSED_NO"))
									+ disbursedNo);
					reportMap.put("DISBURSED_AMOUNT",
							Getter.f(reportMap.get("DISBURSED_AMOUNT"))
									+ disbursedAmount);
					reportMap.put("OVERDUE_NO",
							Getter.l(reportMap.get("OVERDUE_NO")) + overdueNo);
					reportMap.put("OVERDUE_AMOUNT",
							Getter.f(reportMap.get("OVERDUE_AMOUNT"))
									+ overdueAmount);
					reportMap.put("OVERDUE_DAYS",
							Getter.l(reportMap.get("OVERDUE_DAYS"))
									+ overdueDays);
					reportMap.put("OVER_THIRTYNO",
							Getter.l(reportMap.get("OVER_THIRTYNO"))
									+ overThirtyNo);
					reportMap.put("OVER_THIRTYAMOUNT",
							Getter.f(reportMap.get("OVER_THIRTYAMOUNT"))
									+ overThirtyAmount);
					reportMap.put("OVER_AVERAGEDAYS",
							Getter.l(reportMap.get("OVER_AVERAGEDAYS"))
									+ aveOverDueDays);
					reportMap.put("SETTLED_NO",
							Getter.l(reportMap.get("SETTLED_NO")) + settled);
					reportMap.put("SETTLED_AMOUNT",
							Getter.f(reportMap.get("SETTLED_AMOUNT"))
									+ settledAmount);
					reportMap.put("SETTLEMENT_DAYS",
							Getter.l(reportMap.get("SETTLEMENT_DAYS"))
									+ settleMentDays);
					reportMap.put("AVERAGE_CPAYMENT",
							Getter.f(reportMap.get("AVERAGE_CPAYMENT"))
									+ aveCPayment);
					reportMap.put("AVERAGE_SPAYMENT",
							Getter.f(reportMap.get("AVERAGE_SPAYMENT"))
									+ aveSPayment);
					reportMap.put("UPLOADDATE", uploadDate);
					reportMap.put("REPORTDATE", reportDate);
				} else {
					Map reportMap = new HashMap();
					reportMap.put("DEBTORNAME", debtorName);
					reportMap.put("UPLOADED_NO", uploaded);
					reportMap.put("ACCEPTED_NO", accepted);
					reportMap.put("DISBURSED_NO", disbursedNo);
					reportMap.put("DISBURSED_AMOUNT", disbursedAmount);
					reportMap.put("OVERDUE_NO", overdueNo);
					reportMap.put("OVERDUE_AMOUNT", overdueAmount);
					reportMap.put("OVERDUE_DAYS", overdueDays);
					reportMap.put("OVER_THIRTYNO", overThirtyNo);
					reportMap.put("OVER_THIRTYAMOUNT", overThirtyAmount);
					reportMap.put("OVER_AVERAGEDAYS", aveOverDueDays);
					reportMap.put("SETTLED_NO", settled);
					reportMap.put("SETTLED_AMOUNT", settledAmount);
					reportMap.put("SETTLEMENT_DAYS", settleMentDays);
					reportMap.put("AVERAGE_CPAYMENT", aveCPayment);
					reportMap.put("AVERAGE_SPAYMENT", aveSPayment);
					reportMap.put("UPLOADDATE", uploadDate);
					reportMap.put("REPORTDATE", reportDate);
					reportInfoMap.put(uploadDate, reportMap);
				}
			}
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			Table table = center.findTable("IF_MGT_DEBTOR_REPORT");
			BaseworkUtil util = new BaseworkUtil();
			Iterator it = reportInfoMap.keySet().iterator();
			while (it.hasNext()) {
				String keyValue = (String) it.next();
				Map reportMap = reportInfoMap.get(keyValue);
				SimpleBean bean = new SimpleBeanImpl();
				bean.reload(reportMap);
				util.manualSave(table, bean, conn);
			}
		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}
}
