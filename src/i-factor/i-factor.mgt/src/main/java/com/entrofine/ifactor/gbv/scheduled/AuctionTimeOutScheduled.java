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
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.api.service.TableSyncService;
import com.entrofine.ifactor.gbv.manager.InvoiceDeliveryApplyManager;
import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * auction time out scheduled
 * 
 * @author wangweifeng
 * 
 */
@Lazy(false)
@Component
public class AuctionTimeOutScheduled {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private TableSyncService tableSyncService;

	@SuppressWarnings("rawtypes")
	@Scheduled(cron = "0 */10 * * * ?")
	public void auctionTimeOut() {

		logger.debug("auction timeout is running...");

		Connection conn = null;
		try {

			conn = SystemDataSource.getInstance().getConnection();

			List timeOutAuctionRecords = getTimeOutAuctionRecords(conn);

			handleTimeOutAuctionRecords(timeOutAuctionRecords, conn);

			conn.commit();

		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	/**
	 * handle all timeout auction records
	 * 
	 * @param timeOutAuctionRecords
	 * @param conn
	 */
	@SuppressWarnings("rawtypes")
	private void handleTimeOutAuctionRecords(List timeOutAuctionRecords,
			Connection conn) {

		DataTrimmerI trimmerI = new DataTrimmerI(conn);

		List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();

		if (timeOutAuctionRecords != null && !timeOutAuctionRecords.isEmpty()) {
			for (int i = 0; i < timeOutAuctionRecords.size(); i++) {

				Map auctionRecord = (Map) timeOutAuctionRecords.get(i);

				String statusText = WordBookUtil.getWordBookItemName(
						"auction_status", "IAS_03");
				InvoiceDeliveryApplyManager.updateInvoiceAuctionStatus(
						"IAS_03", statusText,
						Getter.string(auctionRecord.get("IIDAT_PK_ID")),
						trimmerI);

				events.add(new TableSyncEvent("IF_MGT_INVOICE_AUCTION", Getter
						.string(auctionRecord.get("APP_PK_ID")),
						"AUCTION_STATUS", "IAS_03"));

			}

			tableSyncService.execute(events);
		}

	}

	/**
	 * get all timeout auction records
	 * 
	 * @param conn
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private List getTimeOutAuctionRecords(Connection conn) {

		String sql = "SELECT * FROM IF_MGT_INVOICE_AUCTION WHERE TIMEOUT_TIME<=? AND AUCTION_STATUS=?";

		DataTrimmerI trimmerI = new DataTrimmerI(conn);

		return trimmerI.searchMultiData(sql, DateTrimmer.getYMDHMS(), "IAS_02");

	}

}
