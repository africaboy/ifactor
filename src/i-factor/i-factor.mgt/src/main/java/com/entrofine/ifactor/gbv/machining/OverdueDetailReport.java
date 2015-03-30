package com.entrofine.ifactor.gbv.machining;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * overdue detail report
 * 
 * @author hezhch
 * 
 */
// @Lazy(false)
// @Component
public class OverdueDetailReport {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Scheduled(cron = "0 0 0 * * ?")
	public void overdueDetailReport() {
		logger.debug("Overdue detail report is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String overdueSql = "SELECT U.APP_PK_ID,U.BUYERID,A.SME_APP_PK_ID,A.IDA_DATE,D.DEBTOR,F.INVOICE_AMOUNT,F.EXPECTED_PAYMENT_DATE,R.RATING FROM IF_MGT_INVOICE_AUCTION U "
					+ "LEFT JOIN IF_MGT_INVOICE_APPLY A ON U.IIDA_PK_ID = U.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_DEBTOR D ON U.IIDA_PK_ID = D.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_FINANC F ON U.IIDA_PK_ID = F.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_CP_APPLY S ON A.SME_APP_PK_ID = S.APP_PK_ID "
					+ "LEFT JOIN IF_MGT_SCORING_RESULT R ON S.PK_ID = R.APPLY_ID "
					+ "WHERE U.AUCTION_STATUS = 'IAS_09'";
			List<Map> overdueInfo = trimmerI.searchMultiData(overdueSql);
			String currentDate = DateTrimmer.getYMD() + "000000";
			String reportDate = DateTrimmer.getYMD();
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			Table table = center.findTable("IF_MGT_OVERDUE_DETAIL_REPORT");
			BaseworkUtil util = new BaseworkUtil();
			for (Map map : overdueInfo) {
				String invoiceId = Getter.string(map.get("APP_PK_ID"));
				float invoiceAmount = Getter.f(map.get("INVOICE_AMOUNT"));
				String settlementDate = Getter.string(map
						.get("EXPECTED_PAYMENT_DATE"));
				long overdueDays = DateTrimmer.getDateMargin(settlementDate,
						currentDate);
				String sellerId = Getter.string(map.get("SME_APP_PK_ID"));
				String sellerRating = Getter.string(map.get("RATING"));
				String buyerId = Getter.string(map.get("BUYERID"));
				String debtor = Getter.string(map.get("DEBTOR"));
				String uploadDate = Getter.string(map.get("IDA_DATE"));
				Map reportMap = new HashMap();
				reportMap.put("INVOICE_ID", invoiceId);
				reportMap.put("INVOICE_AMOUNT", invoiceAmount);
				reportMap.put("SETTLEMENT_DATE", settlementDate);
				reportMap.put("OVERDUE_DAYS", overdueDays);
				reportMap.put("SELLER_ID", sellerId);
				reportMap.put("SELLER_RATING", sellerRating);
				reportMap.put("BUYER_ID", buyerId);
				reportMap.put("DEBTOR", debtor);
				reportMap.put("UPLOADDATE", uploadDate);
				reportMap.put("REPORTDATE", reportDate);

				SimpleBean bean = new SimpleBeanImpl();
				bean.reload(reportMap);
				util.manualSave(table, bean, conn);
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
