package com.entrofine.ifactor.mgt.service.impl;

import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;
import jt.classic.system.wordbook.WordBookUtil;

import org.limp.basework.SimpleBean;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.entrofine.ifactor.api.AppVars;
import com.entrofine.ifactor.api.entity.InvoiceAuction;
import com.entrofine.ifactor.api.service.InvoiceAuctionService;
import com.entrofine.ifactor.api.service.TableSyncService;
import com.entrofine.ifactor.app.entity.Auction;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.gbv.utils.Getter;
import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

@Component
public class InvoiceAuctionServiceImpl implements InvoiceAuctionService {

	private static final Logger LOG = LoggerFactory
			.getLogger(InvoiceAuctionServiceImpl.class);

	@Autowired
	private AppVars appVars;

	@Autowired
	private TableSyncService tableSyncService;

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void saveMakeOfferInfo(InvoiceAuction invoiceAuction) {
		LOG.info("auction bid start!");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			BaseworkUtil util = new BaseworkUtil();
			SimpleBean bean = new SimpleBeanImpl();
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss");
			Map bidInfoMap = new HashMap();
			Auction auction = invoiceAuction.getAuction();
			String invoiceId = invoiceAuction.getInvoiceId();
			bidInfoMap.put("APP_PK_ID", invoiceId);
			bidInfoMap.put("BUYER_ID", auction.getBuyerApplyId());
			bidInfoMap.put("BID_ADVANCE", auction.getDiscount());
			bidInfoMap.put("BID_INTEREST", auction.getInterest());
			bidInfoMap.put("BID_DATE", format.format(auction.getCreateTime()));
			bean.reload(bidInfoMap);
			util.manualSave("IF_MGT_INVOICE_DETAIL_AUCTION", bean, conn);
			boolean isAccepted = invoiceAuction.isAccepted();
			if (isAccepted) {
				String sql = "SELECT * FROM IF_MGT_INVOICE_AUCTION A WHERE A.APP_PK_ID = ?";
				Map map = trimmerI.searchSingleData(sql, invoiceId);
				if (map != null) {
					map.put("ACCEPT_TIME",
							format.format(auction.getCreateTime()));
					map.put("BUYERID", auction.getBuyerApplyId());
					map.put("BEST_ADVANCE", auction.getDiscount());
					map.put("BEST_INTEREST", auction.getInterest());
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", "IAS_05"));
					bean = new SimpleBeanImpl();
					bean.getResource().putAll(map);
					util.manualUpdate("IF_MGT_INVOICE_AUCTION", bean, conn);
				}
			}
			conn.commit();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void updateAuctionStatus(Invoice invoice) {
		// TODO Auto-generated method stub
		LOG.info("auction status update start!");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			BaseworkUtil util = new BaseworkUtil();
			SimpleBean bean = new SimpleBeanImpl();
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss");
			String invoiceId = Getter.string(invoice.getId());
			String statusId = Getter.string(invoice.getFlowStatus());
			String sql = "SELECT * FROM IF_MGT_INVOICE_AUCTION A WHERE A.APP_PK_ID = ?";
			Map map = trimmerI.searchSingleData(sql, invoiceId);
			if (map != null) {
				if (statusId.equals("IAS_05")) {
					map.put("ACCEPT_TIME",
							format.format(invoice.getUpdateTime()));
					map.put("BUYERID", invoice.getBuyerApplyId());
					map.put("BEST_ADVANCE", invoice.getBestBuyerAdv());
					map.put("BEST_INTEREST", invoice.getBestBuyerInt());
					map.put("AUCTION_STATUS", "IAS_05");
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", "IAS_05"));
				} else if (statusId.equals("IAS_04")) {
					map.put("AUCTION_STATUS", "IAS_04");
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", "IAS_04"));
				} else if (statusId.equals("IAS_08")) {
					map.put("DISBURSED_DATE",
							format.format(invoice.getUpdateTime()));
					map.put("AUCTION_STATUS", "IAS_08");
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", "IAS_08"));
				} else if (statusId.equals("IAS_07")) {
					map.put("AUCTION_STATUS", "IAS_07");
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", "IAS_07"));
				} else if (statusId.equals("IAS_10")) {
					map.put("AUCTION_STATUS", "IAS_10");
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", "IAS_10"));
				} else if (statusId.equals("IAS_13")) {
					map.put("PAID_DATE", format.format(invoice.getUpdateTime()));
					map.put("AUCTION_STATUS", "IAS_13");
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", "IAS_13"));
				} else if (statusId.equals("IAS_14")) {
					map.put("PAID_DATE", format.format(invoice.getUpdateTime()));
					map.put("AUCTION_STATUS", "IAS_14");
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", "IAS_14"));
				} else if (statusId.equals("IAS_11")) {
					String currentDateStr = DateTrimmer.getYMD() + "000000";
					if (currentDateStr.compareTo(Getter.string(map
							.get("CLOSE_DATE"))) > 0) {
						statusId = "IAS_11";
					} else {
						statusId = "IAS_12";
					}
					String reason = "IAS_10";
					map.put("AUCTION_STATUS", statusId);
					map.put("AUCTION_STATUS_VAL", WordBookUtil
							.getWordBookItemName("auction_status", statusId));
					map.put("AUCTION_REASON", reason);
					map.put("AUCTION_REASON_VAL", WordBookUtil
							.getWordBookItemName("auction_status", reason));
					WorkflowProxy.syncFlowTable(bean, "IF_MGT_INVOICE_AUCTION",
							Getter.string(map.get("APP_PK_ID")),
							"AUCTION_STATUS", statusId);
				}
				bean.getResource().putAll(map);
				util.manualUpdate("IF_MGT_INVOICE_AUCTION", bean, conn);
			}
			conn.commit();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}
}
