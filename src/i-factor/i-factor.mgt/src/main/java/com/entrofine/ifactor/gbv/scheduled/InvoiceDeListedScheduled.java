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
import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * invoice delisted
 * 
 * @author wangweifeng
 * 
 */
@Lazy(false)
@Component
public class InvoiceDeListedScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private TableSyncService tableSyncService;

	@SuppressWarnings({ "rawtypes" })
	@Scheduled(cron = "0 0 0 * * ?")
	public void updateRemainingTerm() {
		logger.debug("invoice delisted is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();

			List invoiceDelist = getInvoiceDelist(conn);

			handleInvoiceDelist(invoiceDelist, conn);

			conn.commit();
		} catch (Exception e) {
			e.printStackTrace();
			SystemDataSource.rollbackConnection(conn);
		} finally {
			SystemDataSource.closeConnection(conn);
		}

	}

	/**
	 * get all invoice will timeout
	 * 
	 * @param conn
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public List getInvoiceDelist(Connection conn) {
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		String currentDateStr = DateTrimmer.getYMD() + "000000";
		String sql = "SELECT A.IIDAT_PK_ID,A.APP_PK_ID "
				+ "FROM IF_MGT_INVOICE_AUCTION A "
				+ "WHERE A.AUCTION_STATUS=? AND A.AUCTION_STATUS=? AND A.AUCTION_STATUS=? "
				+ "AND A.CLOSE_DATE<=?";
		return trimmerI.searchMultiData(sql, "IAS_01", "IAS_02", "IAS_03",
				currentDateStr);
	}

	/**
	 * handle invoice delist
	 * 
	 * @param invoiceDelist
	 * @param conn
	 */
	@SuppressWarnings("rawtypes")
	public void handleInvoiceDelist(List invoiceDelist, Connection conn) {
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();
		if (invoiceDelist != null && !invoiceDelist.isEmpty()) {
			for (int i = 0; i < invoiceDelist.size(); i++) {
				Map delist = (Map) invoiceDelist.get(i);
				String statusText = WordBookUtil.getWordBookItemName(
						"auction_status", "IAS_06");
				trimmerI.execute(
						"UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=? WHERE IIDAT_PK_ID=?",
						"IAS_06", statusText, delist.get("IIDAT_PK_ID"));

				events.add(new TableSyncEvent("IF_MGT_INVOICE_AUCTION", Getter
						.string(delist.get("APP_PK_ID")), "AUCTION_STATUS",
						"IAS_06"));
			}

			tableSyncService.execute(events);
		}
	}
}
