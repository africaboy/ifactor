package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
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
import com.entrofine.ifactor.gbv.utils.Getter;

@Lazy(false)
@Component
public class TakeOriginalInvoiceScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private TableSyncService tableSyncService;

	@SuppressWarnings("rawtypes")
	@Scheduled(cron = "0 0 0 * * ?")
	public void auctionOverdue() {
		logger.debug("take original invoice is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String sql = "SELECT T.* FROM IF_MGT_INVOICE_APPLY T WHERE T.IDA_STATUS = 'YCcCAeFtUg_xhLGTcqzFh'";
			List invoiceInLastStepList = trimmerI.searchMultiData(sql);
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
			Date date = new Date();
			List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();
			for (int i = 0; i < invoiceInLastStepList.size(); i++) {
				Map map = (Map) invoiceInLastStepList.get(i);
				String delistDate = Getter.string(map.get("IDA_CYCLEEND"));
				Date dd = df.parse(delistDate);
				long days = DateTrimmer.getDateMargin(date, dd);
				if (days < 10) {
					String appPkId = Getter.string(map.get("APP_PK_ID"));
					String originalInvoiceSql = "SELECT T.IOV_PK_ID FROM IF_MGT_INVOICE_ORIVER T WHERE T.ISACCEPTED <> ? AND T.APP_PK_ID = ?";
					Map orginalMapInfo = trimmerI.searchSingleData(
							originalInvoiceSql, "2", appPkId);
					if (orginalMapInfo != null) {
						String iovPkId = Getter.string(orginalMapInfo
								.get("IOV_PK_ID"));
						String iovStatus = "CbPtGRnrkJ_NDZjnDzKSP_0";
						String ovStatusVal = WordBookUtil.getWordBookItemName(
								"iov_stauts", iovStatus);
						String updateOrignalInvoiceSql = "UPDATE IF_MGT_INVOICE_ORIVER T SET T.ISACCEPTED = ?,T.IOV_STATUS = ?,T.IOV_STATUS_VAL = ? WHERE T.IOV_PK_ID = ?";
						trimmerI.execute(updateOrignalInvoiceSql, "2",
								iovStatus, ovStatusVal, iovPkId);

						String idaStatus = "RyXlLYLUHF_dSHAvdyhfW";
						String idaStatusVal = WordBookUtil.getWordBookItemName(
								"ida_stauts", idaStatus);
						String iidaPkId = Getter.string(map.get("IIDA_PK_ID"));
						String updateInvoiceSql = "UPDATE IF_MGT_INVOICE_APPLY T SET T.ISVERIFICATION = ?,T.IDA_STATUS = ?,T.IDA_STATUS_VAL = ? WHERE T.IIDA_PK_ID = ?";
						trimmerI.execute(updateInvoiceSql, "1", idaStatus,
								idaStatusVal, iidaPkId);
						events.add(new TableSyncEvent("IF_MGT_INVOICE_APPLY",
								appPkId, "IDA_STATUS", idaStatus));
					}
				}
			}
			tableSyncService.execute(events);
			conn.commit();
		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}
}
