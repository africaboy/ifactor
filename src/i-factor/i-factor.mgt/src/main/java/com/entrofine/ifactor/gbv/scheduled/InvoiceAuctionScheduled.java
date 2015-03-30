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
 * unfunded and disbursed invoice report
 * 
 * @author hezhch
 * 
 */
// @Lazy(false)
// @Component
public class InvoiceAuctionScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Scheduled(cron = "0 */3 * * * ?")
	public void invoiceAuctionReport() {
		logger.debug("invoice auction reprot is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String auctionSql = "SELECT A.*,I.IDA_ADVANCE,I.IDA_INTEREST,I.IDA_CYCLESTART,I.IDA_CYCLEEND,I.IDA_DATE"
					+ ",I.SME_APP_PK_ID,D.DEBTOR,F.INVOICE_ISSUANCE_DATE,F.INVOICE_AMOUNT,F.DUE_DATE,F.EXPECTED_PAYMENT_DATE,"
					+ "S.CPREIZON,R.RISKLEVELLABEL,R.RATING FROM IF_MGT_INVOICE_AUCTION A "
					+ "LEFT JOIN IF_MGT_INVOICE_APPLY I ON A.IIDA_PK_ID = I.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_DEBTOR D ON I.IIDA_PK_ID = D.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_FINANC F ON I.IIDA_PK_ID = F.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_CP_APPLY S ON I.SME_APP_PK_ID = S.APP_PK_ID "
					+ "LEFT JOIN IF_MGT_SCORING_RESULT R ON S.PK_ID = R.APPLY_ID "
					+ "WHERE (A.AUCTION_STATUS = 'IAS_06' OR A.AUCTION_STATUS = 'IAS_08' "
					+ "OR A.AUCTION_STATUS = 'IAS_12')";
			List<Map> invoiceAuctionInfo = trimmerI.searchMultiData(auctionSql);
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			Table unfundedTable = center.findTable("IF_MGT_UNFUNDED_REPORT");
			Table disbursedTable = center.findTable("IF_MGT_DISBURSED_REPORT");
			BaseworkUtil util = new BaseworkUtil();
			for (Map map : invoiceAuctionInfo) {
				SimpleBean bean = new SimpleBeanImpl();
				String invoiceId = StringTool.checkString(map.get("APP_PK_ID"));
				float invoiceAmount = Getter.f(map.get("INVOICE_AMOUNT"));
				String sellerId = StringTool.checkString(map
						.get("SME_APP_PK_ID"));
				String riskLabel = StringTool.checkString(map
						.get("RISKLEVELLABEL"));
				String rating = StringTool.checkString(map.get("RATING"));
				String region = StringTool.checkString(map.get("CPREIZON"));
				String debor = StringTool.checkString(map.get("DEBTOR"));
				String dateVIP = StringTool.checkString(map.get("VIP_DATE"));
				String datePublic = StringTool.checkString(map
						.get("PUBLIC_DATE"));
				String closeDate = StringTool
						.checkString(map.get("CLOSE_DATE"));
				String settlementDate = StringTool.checkString(map
						.get("EXPECTED_PAYMENT_DATE"));
				String delistingDate = StringTool.checkString(map
						.get("IDA_CYCLEEND"));
				float readyAdvance = Getter.f(map.get("IDA_ADVANCE"));
				float readyInterest = Getter.f(map.get("IDA_INTEREST"));
				String auctionStatus = StringTool.checkString(map
						.get("AUCTION_STATUS"));
				long pduration = DateTrimmer.getDateMargin(datePublic,
						closeDate);
				long tduration = DateTrimmer.getDateMargin(dateVIP, closeDate);
				long termVipDays = DateTrimmer.getDateMargin(dateVIP,
						settlementDate);
				long termPublicDays = DateTrimmer.getDateMargin(datePublic,
						settlementDate);
				long termCloseDays = DateTrimmer.getDateMargin(closeDate,
						settlementDate);
				Map reportMap = new HashMap();
				reportMap.put("INVOICEID", invoiceId);
				reportMap.put("INVOICE_AMMOUNT", invoiceAmount);
				reportMap.put("SELLERID", sellerId);
				reportMap.put("SELLER_RATING", rating);
				reportMap.put("SELLER_RISK", riskLabel);
				reportMap.put("REGION", region);
				reportMap.put("DEBTOR", debor);
				reportMap.put("VIP_DATE", dateVIP);
				reportMap.put("PUBLIC_DATE", datePublic);
				reportMap.put("CLOSE_DATE", closeDate);
				reportMap.put("DELISTING_DATE", delistingDate);
				reportMap.put("SETTLEMENT_DATE", settlementDate);
				reportMap.put("READY_ADVANCE", readyAdvance);
				reportMap.put("READY_INTEREST", readyInterest);
				reportMap.put("PDURATION_DAYS", pduration);
				reportMap.put("TDURATION_DAYS", tduration);
				String totalBidsSql = "SELECT COUNT(IABD_PK_ID) AS COUNT FROM IF_MGT_INVOICE_DETAIL_AUCTION WHERE APP_PK_ID = ?";
				Map totalBidsMap = trimmerI.searchSingleData(totalBidsSql,
						invoiceId);
				long totalBids = Getter.l(totalBidsMap.get("COUNT"));
				reportMap.put("TOTAL_BIDS", totalBids);
				reportMap.put("TERMVIP_DAYS", termVipDays);
				reportMap.put("TERMPUBLIC_DAYS", termPublicDays);
				reportMap.put("TERMCLOSE_DAYS", termCloseDays);
				String uploadDate = StringTool.checkString(map.get("IDA_DATE"));
				uploadDate = uploadDate.substring(0, 8) + "000000";
				reportMap.put("UPLOADDATE", uploadDate);
				String reportDate = DateTrimmer.getYMD();
				reportMap.put("REPORTDATE", reportDate);
				float bestAdvance = Getter.f(map.get("BEST_ADVANCE"));
				float bestInterest = Getter.f(map.get("BEST_INTEREST"));
				if (auctionStatus.equals("IAS_08")) {
					String buyerId = StringTool.checkString(map.get("BUYERID"));
					reportMap.put("BUYERID", buyerId);
					String disbursmentDate = StringTool.checkString(map
							.get("DISBURSED_DATE"));
					reportMap.put("DISBURSEMENT_DATE", disbursmentDate);
					long disbursementDays = DateTrimmer.getDateMargin(
							disbursmentDate, settlementDate);
					reportMap.put("DISBURSED_DAYS", disbursementDays);
					long delistedDays = DateTrimmer.getDateMargin(
							delistingDate, closeDate);
					reportMap.put("DAYSDELISTING", delistedDays);
					reportMap.put("ACCEPT_ADVANCE", bestAdvance);
					reportMap.put("ACCEPT_INTEREST", bestInterest);
					float buyerBankFees = Getter.f(map.get("BANK_BUYERFEE"));
					float buyerIfactorFees = Getter.f(map
							.get("IFACTOR_BUYERFEE"));
					float sellerBankFees = Getter.f(map.get("BANK_SELLERFEE"));
					float sellerIfactorFees = Getter.f(map
							.get("IFACTOR_SELLERFEE"));
					float sellerFees = sellerBankFees + sellerIfactorFees;
					float buyerFees = buyerBankFees + buyerIfactorFees;
					float sellerAmount = invoiceAmount * (bestAdvance / 100)
							- sellerFees;
					reportMap.put("SELLER_AMOUNT", sellerAmount);
					reportMap.put("SELLER_FEES", sellerFees);
					float buyerAmount = invoiceAmount * (bestAdvance / 100)
							+ buyerFees;
					reportMap.put("BUYER_AMOUNT", buyerAmount);
					reportMap.put("BUYER_FEES", buyerFees);
					float interest = disbursementDays / 360
							* (bestInterest / 100) * invoiceAmount
							* (bestAdvance / 100);
					float returnBuyer = interest - buyerFees;
					reportMap.put("BUYER_RETURN", returnBuyer);
					bean.reload(reportMap);
					util.manualSave(disbursedTable, bean, conn);
				} else {
					if (bestAdvance == 0 || bestInterest == 0) {
						String bidDetailSql = "SELECT BID_ADVANCE,BID_INTEREST FROM IF_MGT_INVOICE_DETAIL_AUCTION WHERE ROWNUM=1 AND APP_PK_ID = ?";
						Map bidDetailsMap = trimmerI.searchSingleData(
								bidDetailSql, invoiceId);
						bestAdvance = Getter
								.f(bidDetailsMap.get("BID_ADVANCE"));
						bestInterest = Getter.f(bidDetailsMap
								.get("BID_INTEREST"));
					}
					reportMap.put("ACCEPT_ADVANCE", bestAdvance);
					reportMap.put("ACCEPT_INTEREST", bestInterest);
					bean.reload(reportMap);
					util.manualSave(unfundedTable, bean, conn);
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
