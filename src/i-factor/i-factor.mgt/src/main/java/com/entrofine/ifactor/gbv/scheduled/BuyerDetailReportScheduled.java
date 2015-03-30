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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;

import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * buyer detail report
 * 
 * @author hezhch
 * 
 */
// @Lazy(false)
// @Component
public class BuyerDetailReportScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked", "static-access" })
	@Scheduled(cron = "0 */3 * * * ?")
	public void buyerDetailReport() {
		logger.debug("buyer detail reprot is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String buyerSql = "SELECT B.APP_PK_ID,B.BA_APPLY_DATE,I.INVEST_AS,I.INVEST_AS_PRIVATE,C.COMPANY_REGION,P.REGION FROM IF_MGT_BUYER_APPLY B "
					+ "LEFT JOIN IF_MGT_BUYER_BASIC_INFO I ON B.IBA_PK_ID = I.IBA_PK_ID "
					+ "LEFT JOIN IF_MGT_BUYER_COMPANY_INFO C ON B.IBA_PK_ID = C.IBA_PK_ID "
					+ "LEFT JOIN IF_MGT_BUYER_PRIVATE_INFO P ON B.IBA_PK_ID = P.IBA_PK_ID "
					+ "WHERE B.BA_STATUS = 'PBwYjzcgYL_ANAzqfzpXu'";
			List<Map> buyerApplyInfo = trimmerI.searchMultiData(buyerSql);
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			Table table = center.findTable("IF_MGT_BUYER_DETAIL_REPORT");
			BaseworkUtil util = new BaseworkUtil();
			String reportDate = DateTrimmer.getYMD();
			for (Map map : buyerApplyInfo) {
				String buyerLineID = Getter.string(map.get("APP_PK_ID"));
				String investor = Getter.string(map.get("INVEST_AS"));
				String investPrivate = Getter.string(map
						.get("INVEST_AS_PRIVATE"));
				String region = "";
				if (investPrivate.equals("1")) {
					region = Getter.string(map.get("REGION"));
				} else {
					region = Getter.string(map.get("COMPANY_REGION"));
				}

				String invoiceSql = "SELECT * FROM IF_MGT_INVOICE_AUCTION U "
						+ "LEFT JOIN IF_MGT_INVOICE_APPLY A ON A.IIDA_PK_ID = U.IIDA_PK_ID "
						+ "LEFT JOIN IF_MGT_INVOICE_FINANC F ON A.IIDA_PK_ID = F.IIDA_PK_ID WHERE U.BUYERID = ?";
				List<Map> auctionInfo = trimmerI.searchMultiData(invoiceSql,
						buyerLineID);
				String uploadDate = Getter.string(map.get("BA_APPLY_DATE"));
				uploadDate = uploadDate.substring(0, 8);
				long placedBid = this.getPlaceBidNum(buyerLineID, conn,
						trimmerI);
				long acceptBid = auctionInfo.size();
				long successBid = 0;
				if (placedBid != 0) {
					successBid = (acceptBid / placedBid) * 100;
				}
				long notSign = 0;
				long cancellation = 0;
				long financedNumber = 0;
				float financedAmount = 0;
				float invoiceAmount = 0;
				float totalReturn = 0;
				float acceptAdvance = 0;
				float acceptInterest = 0;
				if (auctionInfo.size() > 0) {
					for (Map auctionMap : auctionInfo) {
						float invoiceAmount1 = Getter.f(auctionMap
								.get("INVOICE_AMOUNT"));
						float bestAdvance = Getter.f(auctionMap
								.get("BEST_ADVANCE"));
						float bestInterest = Getter.f(auctionMap
								.get("BEST_INTEREST"));
						String auctionStatus = Getter.string(auctionMap
								.get("AUCTION_STATUS"));
						if (auctionStatus.equals("IAS_10")) {
							notSign = notSign + 1;
						} else if (auctionStatus.equals("IAS_07")) {
							cancellation = cancellation + 1;
						} else if (auctionStatus.equals("IAS_08")) {
							financedNumber = financedNumber + 1;
							financedAmount = financedAmount + invoiceAmount1
									* bestAdvance;
						}
						invoiceAmount = invoiceAmount + invoiceAmount1;
						totalReturn = totalReturn + bestInterest;
						acceptAdvance = acceptAdvance + bestAdvance;
						acceptInterest = acceptInterest + bestInterest;
					}
					Map reportMap = new HashMap();
					reportMap.put("BUYER_ID", buyerLineID);
					reportMap.put("INVESTOR", investor);
					reportMap.put("REGION", region);
					reportMap.put("BIDS_PLACED", placedBid);
					reportMap.put("BIDS_ACCEPTED", acceptBid);
					reportMap.put("BIDS_SUCCESSFUL", successBid);
					reportMap.put("NOTSIGNED", notSign);
					reportMap.put("CANCELLSUCCESS", cancellation);
					reportMap.put("FINANCED", financedNumber);
					reportMap.put("FINANCEDAMOUNT", financedAmount);
					reportMap.put("INVOICEAMOUNT", invoiceAmount);
					reportMap.put("TOTALRETURN", totalReturn);
					if (acceptBid != 0) {
						reportMap.put("ADVANCE", acceptAdvance / acceptBid);
						reportMap.put("INTEREST", acceptInterest / acceptBid);
					} else {
						reportMap.put("ADVANCE", acceptAdvance);
						reportMap.put("INTEREST", acceptInterest);
					}
					reportMap.put("UPLOADDATE", uploadDate + "000000");
					reportMap.put("REPORTDATE", reportDate);
					SimpleBean bean = new SimpleBeanImpl();
					bean.reload(reportMap);
					util.manualSave(table, bean, conn);
				} else {
					Map reportMap = new HashMap();
					reportMap.put("BUYER_ID", buyerLineID);
					reportMap.put("INVESTOR", investor);
					reportMap.put("REGION", region);
					reportMap.put("BIDS_PLACED", placedBid);
					reportMap.put("BIDS_ACCEPTED", acceptBid);
					reportMap.put("BIDS_SUCCESSFUL", successBid);
					reportMap.put("NOTSIGNED", notSign);
					reportMap.put("CANCELLSUCCESS", cancellation);
					reportMap.put("FINANCED", financedNumber);
					reportMap.put("FINANCEDAMOUNT", financedAmount);
					reportMap.put("INVOICEAMOUNT", invoiceAmount);
					reportMap.put("TOTALRETURN", totalReturn);
					reportMap.put("ADVANCE", acceptAdvance);
					reportMap.put("INTEREST", acceptInterest);
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

	@SuppressWarnings({ "rawtypes" })
	private static long getPlaceBidNum(String buyerId, Connection conn,
			DataTrimmerI trimmer) {
		String sql = "SELECT COUNT(BUYER_ID) AS COUNT FROM IF_MGT_INVOICE_DETAIL_AUCTION WHERE BUYER_ID = ?";
		Map map = trimmer.searchSingleData(sql, buyerId);
		long placebid = Getter.l(map.get("COUNT"));
		return placebid;
	}
}
