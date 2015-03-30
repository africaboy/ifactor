package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;
import jt.classic.system.wordbook.WordBookUtil;

import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.api.service.TableSyncService;
import com.entrofine.ifactor.gbv.manager.InvoiceDeliveryApplyManager;
import com.entrofine.ifactor.gbv.utils.Getter;

public class AuctionOverdueScheduled {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private TableSyncService tableSyncService;

	@SuppressWarnings("rawtypes")
	@Scheduled(cron = "0 0 0 * * ?")
	public void auctionOverdue() {

		logger.debug("auction overdue is running...");

		Connection conn = null;
		try {

			conn = SystemDataSource.getInstance().getConnection();

			List overdueAuctionRecords = getOverdueAuctionRecords(conn);

			handleOverdueAuctionRecords(overdueAuctionRecords, conn);

			conn.commit();

		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	/**
	 * handle all overdue auction records
	 * 
	 * @param overdueAuctionRecords
	 * @param conn
	 */
	@SuppressWarnings("rawtypes")
	private void handleOverdueAuctionRecords(List overdueAuctionRecords,
			Connection conn) {

		DataTrimmerI trimmerI = new DataTrimmerI(conn);

		List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();

		if (overdueAuctionRecords != null && !overdueAuctionRecords.isEmpty()) {
			for (int i = 0; i < overdueAuctionRecords.size(); i++) {

				Map auctionRecord = (Map) overdueAuctionRecords.get(i);

				String statusText = WordBookUtil.getWordBookItemName(
						"auction_status", "IAS_09");
				InvoiceDeliveryApplyManager.updateInvoiceAuctionStatus(
						"IAS_09", statusText,
						Getter.string(auctionRecord.get("IIDAT_PK_ID")),
						trimmerI);

				events.add(new TableSyncEvent("IF_MGT_INVOICE_AUCTION", Getter
						.string(auctionRecord.get("APP_PK_ID")),
						"AUCTION_STATUS", "IAS_09"));

			}

			tableSyncService.execute(events);
		}

	}

	/**
	 * get all overdue auction records
	 * 
	 * @param conn
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private List getOverdueAuctionRecords(Connection conn) {
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		String currentDateStr = DateTrimmer.getYMD() + "000000";
		String sql = "SELECT A.IIDAT_PK_ID,A.APP_PK_ID FROM IF_MGT_INVOICE_AUCTION A "
				+ "LEFT JOIN IF_MGT_INVOICE_FINANC F ON A.IIDA_PK_ID = F.IIDA_PK_ID "
				+ "WHERE A.AUCTION_STATUS=? AND A.AUCTION_STATUS=? AND "
				+ "F.EXPECTED_PAYMENT_DATE>?";
		return trimmerI
				.searchMultiData(sql, "IAS_08", "IAS_14", currentDateStr);

	}
}
