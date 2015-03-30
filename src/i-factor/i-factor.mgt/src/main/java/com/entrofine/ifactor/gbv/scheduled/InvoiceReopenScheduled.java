package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import com.entrofine.ifactor.gbv.init.ParamSettingCenter;
import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * invoice reopen
 * 
 * @author wangweifeng
 * 
 */
@Lazy(false)
@Component
public class InvoiceReopenScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private TableSyncService tableSyncService;

	@SuppressWarnings({ "rawtypes" })
	@Scheduled(cron = "0 0 0 * * ?")
	public void updateRemainingTerm() {
		logger.debug("invoice reopen is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();

			List invoiceReopenList = getInvoiceReopenList(conn);

			handleInvoiceReopenList(invoiceReopenList, conn);

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
	public List getInvoiceReopenList(Connection conn) {
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		// String sql =
		// "SELECT A.IIDAT_PK_ID,B.IDA_CYCLEEND,B.IIDA_PK_ID,B.APP_PK_ID "
		// + "FROM IF_MGT_INVOICE_AUCTION A "
		// + "LEFT JOIN IF_MGT_INVOICE_APPLY B ON A.IIDA_PK_ID=B.IIDA_PK_ID "
		// + "WHERE A.AUCTION_STATUS=? AND A.AUCTION_STATUS=?  ";
		// trimmerI.searchMultiData(sql, "IAS_07", "IAS_10");
		String sql = "SELECT A.IIDAT_PK_ID,A.APP_PK_ID,A.CLOSE_DATE,A.ACCEPT_TIME,A.SIGNED_DATE,A.AUCTION_STATUS "
				+ "FROM IF_MGT_INVOICE_AUCTION A WHERE A.AUCTION_STATUS=? AND A.AUCTION_STATUS=?";
		return trimmerI.searchMultiData(sql, "IAS_04", "IAS_05");
	}

	/**
	 * handle invoice delist
	 * 
	 * @param invoiceDelist
	 * @param conn
	 * @throws ParseException
	 */
	@SuppressWarnings("rawtypes")
	public void handleInvoiceReopenList(List invoiceReopenList, Connection conn)
			throws ParseException {

		ParamSettingCenter psCenter = ParamSettingCenter.getInsance();
		// 等待签约的天数
		int signDays = Getter.i(psCenter.get("IPS0004")) + 1;
		// 等待支付的天数
		int disbursedDays = Getter.i(psCenter.get("IPS0005")) + 1;
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();
		String currentDateStr = DateTrimmer.getYMD() + "000000";
		Date date = new Date();
		if (invoiceReopenList != null && !invoiceReopenList.isEmpty()) {
			for (int i = 0; i < invoiceReopenList.size(); i++) {
				Map reopen = (Map) invoiceReopenList.get(i);
				String nowStatus = Getter.string(reopen.get("AUCTION_STATUS"));
				if (nowStatus.equals("IAS_05")) {
					String acceptedDate = Getter.string(reopen
							.get("ACCEPT_TIME"));
					if (!acceptedDate.equals("")) {
						Date acceptedDate1 = format.parse(acceptedDate);
						long nowSignDays = DateTrimmer.getDateMargin(
								acceptedDate1, date);
						if (nowSignDays >= signDays) {
							String auctionStatus = "";
							if (currentDateStr.compareTo((String) reopen
									.get("CLOSE_DATE")) > 0) {
								auctionStatus = "IAS_11";
							} else {
								auctionStatus = "IAS_12";
							}
							String statusText = WordBookUtil
									.getWordBookItemName("auction_status",
											auctionStatus);
							String reason = "IAS_10";
							String reasonText = WordBookUtil
									.getWordBookItemName("auction_status",
											reason);
							trimmerI.execute(
									"UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=?,AUCTION_REASON=?,AUCTION_REASON_VAL=? WHERE IIDAT_PK_ID=?",
									auctionStatus, statusText, reason,
									reasonText, reopen.get("IIDAT_PK_ID"));

							events.add(new TableSyncEvent(
									"IF_MGT_INVOICE_AUCTION", Getter
											.string(reopen.get("APP_PK_ID")),
									"AUCTION_STATUS", auctionStatus));
						}
					}
				} else if (nowStatus.equals("IAS_04")) {
					String signdDate = Getter.string(reopen.get("SIGNED_DATE"));
					if (!signdDate.equals("")) {
						Date signedDate1 = format.parse(signdDate);
						long nowDisbursedDays = DateTrimmer.getDateMargin(
								signedDate1, date);
						if (nowDisbursedDays >= disbursedDays) {
							String auctionStatus = "";
							if (currentDateStr.compareTo((String) reopen
									.get("CLOSE_DATE")) > 0) {
								auctionStatus = "IAS_11";
							} else {
								auctionStatus = "IAS_12";
							}
							String statusText = WordBookUtil
									.getWordBookItemName("auction_status",
											auctionStatus);
							String reason = "IAS_07";
							String reasonText = WordBookUtil
									.getWordBookItemName("auction_status",
											reason);
							trimmerI.execute(
									"UPDATE IF_MGT_INVOICE_AUCTION SET AUCTION_STATUS=?,AUCTION_STATUS_VAL=?,AUCTION_REASON=?,AUCTION_REASON_VAL=? WHERE IIDAT_PK_ID=?",
									auctionStatus, statusText, reason,
									reasonText, reopen.get("IIDAT_PK_ID"));

							events.add(new TableSyncEvent(
									"IF_MGT_INVOICE_AUCTION", Getter
											.string(reopen.get("APP_PK_ID")),
									"AUCTION_STATUS", auctionStatus));
						}
					}
				}
			}

			tableSyncService.execute(events);
		}
	}
}
