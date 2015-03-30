package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;

import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.limp.mine.StringTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.api.service.TableSyncService;

/**
 * update invoice remaining term
 * 
 * @author hezhch
 * 
 */
@Lazy(false)
@Component
public class InvoiceRemainingTermScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private TableSyncService tableSyncService;

	@SuppressWarnings("rawtypes")
	// @Scheduled(cron = "0 0 0 * * ?")
	@Scheduled(cron = "0 */30 * * * ?")
	public void updateRemainingTerm() {
		logger.debug("update remaining term is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String sql = "SELECT A.IIDA_PK_ID,A.IDA_STATUS_VAL,A.APP_PK_ID,B.IIDFI_PK_ID,B.EXPECTED_PAYMENT_DATE,B.REMAINING_TERM FROM IF_MGT_INVOICE_APPLY A LEFT JOIN IF_MGT_INVOICE_FINANC B ON A.IIDA_PK_ID = B.IIDA_PK_ID WHERE"
					+ " A.IDA_STATUS <> 'bquDuCwisW_dSHAvdyhfW' AND A.IDA_STATUS <> 'vBdcCEIXvk_dSHAvdyhfW' AND A.IDA_STATUS <> 'OHMcXwKBdZ_dSHAvdyhfW_0' AND A.IDA_STATUS <> 'RyXlLYLUHF_dSHAvdyhfW'";
			List applyList = trimmerI.searchMultiData(sql);
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
			Date date = new Date();
			List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();
			for (int i = 0; i < applyList.size(); i++) {
				Map applyData = (Map) applyList.get(i);
				String pkid = StringTool.checkString(applyData
						.get("IIDA_PK_ID"));
				String fpkid = StringTool.checkString(applyData
						.get("IIDFI_PK_ID"));
				String settlementDate = StringTool.checkString(applyData
						.get("EXPECTED_PAYMENT_DATE"));
				String remaintermDaysStr = StringTool.checkString(applyData
						.get("REMAINING_TERM"));
				String appPkId = StringTool.checkString(applyData
						.get("APP_PK_ID"));
				if (!settlementDate.equals("") && !remaintermDaysStr.equals("")) {
					Date dd = df.parse(settlementDate);
					long days = DateTrimmer.getDateMargin(date, dd);
					long remaintermDays = Long.parseLong(remaintermDaysStr);
					String updateSql = "UPDATE IF_MGT_INVOICE_FINANC SET REMAINING_TERM = ? WHERE IIDFI_PK_ID = ?";
					if (days < remaintermDays) {
						String status = StringTool.checkString(applyData
								.get("IDA_STATUS_VAL"));
						if (status.equals("OHMcXwKBdZ_dSHAvdyhfW")) {
							String auctionSql = "SELECT T.AUCTION_STATUS FROM IF_MGT_INVOICE_AUCTION T WHERE T.IIDA_PK_ID = ? "
									+ "AND (T.AUCTION_STATUS = 'IAS_01' OR T.AUCTION_STATUS = 'IAS_02' OR T.AUCTION_STATUS = 'IAS_03')";
							Map map = trimmerI.searchSingleData(auctionSql,
									pkid);
							if (map != null) {
								trimmerI.execute(updateSql, days, fpkid);
							}
						} else {
							trimmerI.execute(updateSql, days, fpkid);
						}
						events.add(new TableSyncEvent("IF_MGT_INVOICE_FINANC",
								appPkId, "REMAINING_TERM", String.valueOf(days)));
					}
				}
			}
			if (!CollectionUtils.isEmpty(events)) {
				tableSyncService.execute(events);
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
