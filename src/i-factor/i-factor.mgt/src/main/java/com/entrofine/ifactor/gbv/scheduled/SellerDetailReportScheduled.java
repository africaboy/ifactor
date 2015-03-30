package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
import java.util.HashMap;
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
import org.springframework.scheduling.annotation.Scheduled;

import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * seller detail report
 * 
 * @author hezhch
 * 
 */
// @Lazy(false)
// @Component
public class SellerDetailReportScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Scheduled(cron = "0 */3 * * * ?")
	public void sellerDetailReport() {
		logger.debug("seller detail reprot is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String smeSql = "SELECT A.CPREIZON,A.APP_PK_ID,A.CPCTIME,S.RATING FROM IF_MGT_CP_APPLY A LEFT JOIN IF_MGT_SCORING_RESULT S "
					+ "ON A.PK_ID = S.APPLY_ID WHERE A.CPSTATUS = 'cPjfdskOtZ_oQfYjWhRHs'";
			List<Map> smeApplyInfo = trimmerI.searchMultiData(smeSql);
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			Table table = center.findTable("IF_MGT_DETAIL_SELLER_REPORT");
			BaseworkUtil util = new BaseworkUtil();
			String reportDate = DateTrimmer.getYMD();
			for (Map map : smeApplyInfo) {
				String smeLineID = StringTool.checkString(map.get("APP_PK_ID"));
				String region = StringTool.checkString(map.get("CPREIZON"));
				String rating = StringTool.checkString(map.get("RATING"));
				String invoiceSql = "SELECT * FROM IF_MGT_INVOICE_APPLY A LEFT JOIN IF_MGT_INVOICE_FINANC F ON A.IIDA_PK_ID = F.IIDA_PK_ID "
						+ "LEFT JOIN IF_MGT_INVOICE_AUCTION U ON A.IIDA_PK_ID = U.IIDA_PK_ID WHERE A.SME_APP_PK_ID = ?";
				List<Map> invoiceInfo = trimmerI.searchMultiData(invoiceSql,
						smeLineID);
				String uploadDate = Getter.string(map.get("CPCTIME"));
				uploadDate = uploadDate.substring(0, 8);
				float amount = 0;
				float advance = 0;
				float interest = 0;
				long submitted = 0;
				long accecpted = 0;
				float acceptAmount = 0;
				long disbursed = 0;
				float disbursedAmount = 0;
				long cancellation = 0;
				if (invoiceInfo.size() > 0) {
					for (Map invoiceMap : invoiceInfo) {
						amount = amount
								+ Getter.f(invoiceMap.get("INVOICE_AMOUNT"));
						advance = advance
								+ Getter.f(invoiceMap.get("IDA_ADVANCE"));
						interest = interest
								+ Getter.f(invoiceMap.get("IDA_INTEREST"));
						submitted = submitted + 1;
						String invoiceStatus = StringTool
								.checkString(invoiceMap.get("IDA_STATUS"));
						if (invoiceStatus.equals("OHMcXwKBdZ_dSHAvdyhfW")) {
							accecpted = accecpted + 1;
							acceptAmount = acceptAmount + amount;
						}
						String auctionStatus = StringTool
								.checkString(invoiceMap.get("AUCTION_STATUS"));
						if (auctionStatus.equals("IAS_08")) {
							disbursed = disbursed + 1;
							disbursedAmount = disbursedAmount + amount;
						}
						if (auctionStatus.equals("IAS_07")
								|| auctionStatus.equals("IAS_10")) {
							cancellation = cancellation + 1;
						}
					}
					Map reportMap = new HashMap();
					reportMap.put("SELLER_ID", smeLineID);
					reportMap.put("SELLER_RATING", rating);
					reportMap.put("REGION", region);
					reportMap.put("SUBMITTED", submitted);
					reportMap.put("ACCEPTED_NO", accecpted);
					reportMap.put("ACCEPTED_AMOUNT", acceptAmount);
					reportMap.put("DISBURSED_NO", disbursed);
					reportMap.put("DISBURSED_AMOUNT", disbursedAmount);
					if (accecpted != 0) {
						reportMap.put("AVERAGE_ADVANCE", advance / accecpted);
						reportMap.put("AVERAGE_INTEREST", interest / accecpted);
					} else {
						reportMap.put("AVERAGE_ADVANCE", advance);
						reportMap.put("AVERAGE_INTEREST", interest);
					}
					reportMap.put("CANCELLATION", cancellation);
					reportMap.put("UPLOADDATE", uploadDate + "000000");
					reportMap.put("REPORTDATE", reportDate);
					SimpleBean bean = new SimpleBeanImpl();
					bean.reload(reportMap);
					util.manualSave(table, bean, conn);
				} else {
					Map reportMap = new HashMap();
					reportMap.put("SELLER_ID", smeLineID);
					reportMap.put("SELLER_RATING", rating);
					reportMap.put("REGION", region);
					reportMap.put("SUBMITTED", submitted);
					reportMap.put("ACCEPTED_NO", accecpted);
					reportMap.put("ACCEPTED_AMOUNT", acceptAmount);
					reportMap.put("DISBURSED_NO", disbursed);
					reportMap.put("DISBURSED_AMOUNT", disbursedAmount);
					reportMap.put("AVERAGE_ADVANCE", advance);
					reportMap.put("AVERAGE_INTEREST", interest);
					reportMap.put("CANCELLATION", cancellation);
					reportMap.put("UPLOADDATE", uploadDate + "000000");
					reportMap.put("REPORTDATE", reportDate);
					SimpleBean bean = new SimpleBeanImpl();
					bean.reload(reportMap);
					util.manualSave(table, bean, conn);
				}
			}
			conn.commit();
		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}
}
