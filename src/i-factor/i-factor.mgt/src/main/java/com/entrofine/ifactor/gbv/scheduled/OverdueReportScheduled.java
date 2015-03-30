package com.entrofine.ifactor.gbv.scheduled;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;
import jt.classic.system.wordbook.WordBookUtil;

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
import com.entrofine.ifactor.gbv.utils.Tools;

/**
 * overdue report
 * 
 * @author hezhch
 * 
 */
// @Lazy(false)
// @Component
public class OverdueReportScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked", "static-access" })
	@Scheduled(cron = "0 0 0 * * ?")
	public void overdueReport() {
		logger.debug("Overdue report is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String auctionSql = "SELECT U.AUCTION_STATUS,A.IDA_DATE,D.DEBTOR,F.INVOICE_AMOUNT,F.DUE_DATE,F.EXPECTED_PAYMENT_DATE,S.CPREIZON,S.COMPANIESTYPEID,R.RATING FROM IF_MGT_INVOICE_AUCTION U "
					+ "LEFT JOIN IF_MGT_INVOICE_APPLY A ON U.IIDA_PK_ID = A.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_DEBTOR D ON U.IIDA_PK_ID = D.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_FINANC F ON U.IIDA_PK_ID = F.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_CP_APPLY S ON A.SME_APP_PK_ID = S.APP_PK_ID "
					+ "LEFT JOIN IF_MGT_SCORING_RESULT R ON S.PK_ID = R.SR_PK_ID "
					+ "WHERE (U.SELLER_RETURNS IS NOT NULL OR U.AUCTION_STATUS = 'IAS_09')";
			List<Map> auctionInfo = trimmerI.searchMultiData(auctionSql);
			Map<String, List<Map>> reportInfoByUploadedMap = new HashMap<String, List<Map>>();
			Map<String, List<Map>> reportInfoBySettlementMap = new HashMap<String, List<Map>>();
			for (Map map : auctionInfo) {
				String auctionStatus = Getter.string(map.get("AUCTION_STATUS"));
				long nooverdueNo = 0;
				float nooverdueAmount = 0;
				long lThirtyNo = 0;
				float lThirtyAmount = 0;
				long gThirtyNo = 0;
				float gThirtyAmount = 0;
				float amount = Getter.f(map.get("INVOICE_AMOUNT"));
				String uploadDate = Getter.string(map.get("IDA_DATE"));
				uploadDate = uploadDate.substring(0, 8) + "000000";
				String settlementDate = Getter.string(map
						.get("EXPECTED_PAYMENT_DATE"));
				settlementDate = settlementDate.substring(0, 8) + "000000";
				String region = Getter.string(map.get("CPREIZON"));
				String cptype = Getter.string(map.get("COMPANIESTYPEID"));
				String rating = Getter.string(map.get("RATING"));
				String debtor = Getter.string(map.get("DEBTOR"));
				Map reportMap = new HashMap();
				reportMap.put("region", region);
				reportMap.put("cptype", cptype);
				reportMap.put("rating", rating);
				reportMap.put("uploadDate", uploadDate);
				reportMap.put("settlementDate", settlementDate);
				reportMap.put("DEBTOR", debtor);
				if (auctionStatus.equals("IAS_09")) {
					String currentDateStr = DateTrimmer.getYMD() + "000000";
					long overdueDays = DateTrimmer.getDateMargin(
							settlementDate, currentDateStr);
					if (overdueDays <= 30) {
						lThirtyNo = 1;
						lThirtyAmount = amount;
					} else {
						gThirtyNo = 1;
						gThirtyAmount = amount;
					}
				} else {
					nooverdueNo = 1;
					nooverdueAmount = amount;
				}
				reportMap.put("NOOVERDUE_NO", nooverdueNo);
				reportMap.put("NOOVERDUE_AMOUNT", nooverdueAmount);
				reportMap.put("LTHIRTY_NO", lThirtyNo);
				reportMap.put("LTHIRTY_AMOUNT", lThirtyAmount);
				reportMap.put("GTHIRTY_NO", gThirtyNo);
				reportMap.put("GTHIRTY_AMOUNT", gThirtyAmount);
				List<Map> reportMapList = new ArrayList<Map>();
				if (reportInfoByUploadedMap.containsKey(uploadDate)) {
					reportMapList = reportInfoByUploadedMap.get(uploadDate);
				}
				reportMapList.add(reportMap);
				reportInfoByUploadedMap.put(uploadDate, reportMapList);

				reportMapList = new ArrayList<Map>();
				if (reportInfoBySettlementMap.containsKey(settlementDate)) {
					reportMapList = reportInfoBySettlementMap
							.get(settlementDate);
				}
				reportMapList.add(reportMap);
				reportInfoBySettlementMap.put(settlementDate, reportMapList);
			}
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			Table table = center.findTable("IF_MGT_SELLER_REPORT");
			String reportDate = DateTrimmer.getYMD();
			// 循环保存uploadeddate数据
			Iterator it = reportInfoByUploadedMap.keySet().iterator();
			while (it.hasNext()) {
				String keyValue = (String) it.next();
				List<Map> reportInfoList = reportInfoByUploadedMap
						.get(keyValue);
				String uploadDate = keyValue + "000000";
				Map totalMap = new HashMap();
				Map<String, Map> regionMap = new HashMap<String, Map>();
				Map<String, Map> cptypeMap = new HashMap<String, Map>();
				Map<String, Map> ratingMap = new HashMap<String, Map>();
				for (Map map : reportInfoList) {
					if (totalMap.size() == 0) {
						totalMap = Tools.cloneMap(map, totalMap);
					} else {
						totalMap = this.getMapResult(totalMap, map);
					}
					String region = StringTool.checkString(map.get("region"));
					String cptype = StringTool.checkString(map.get("cptype"));
					String rating = StringTool.checkString(map.get("rating"));
					if (region.equals("Hanoi")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("Hanoi")) {
							byTypemap = this.getMapResult(
									regionMap.get("Hanoi"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Hanoi");
						byTypemap.put("REPORTTYPENUM", "1");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						regionMap.put("Hanoi", byTypemap);
					} else if (region.equals("Ho Chi Minh")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("HoChiMinh")) {
							byTypemap = this.getMapResult(
									regionMap.get("HoChiMinh"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Ho Chi Minh");
						byTypemap.put("REPORTTYPENUM", "2");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						regionMap.put("HoChiMinh", byTypemap);
					} else if (region.equals("Hai Phong")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("HaiPhong")) {
							byTypemap = this.getMapResult(
									regionMap.get("HaiPhong"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Hai Phong");
						byTypemap.put("REPORTTYPENUM", "3");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						regionMap.put("HaiPhong", byTypemap);
					} else if (region.equals("Da Nang")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("DaNang")) {
							byTypemap = this.getMapResult(
									regionMap.get("DaNang"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Da Nang");
						byTypemap.put("REPORTTYPENUM", "4");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						regionMap.put("DaNang", byTypemap);
					} else if (region.equals("Can Tho")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("CanTho")) {
							byTypemap = this.getMapResult(
									regionMap.get("CanTho"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Can Tho");
						byTypemap.put("REPORTTYPENUM", "5");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						regionMap.put("CanTho", byTypemap);
					} else {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("Others")) {
							byTypemap = this.getMapResult(
									regionMap.get("Others"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Others");
						byTypemap.put("REPORTTYPENUM", "6");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						regionMap.put("Others", byTypemap);
					}
					if (cptype.equals("01")) {
						Map byTypemap = new HashMap();
						if (cptypeMap.containsKey("SME")) {
							byTypemap = this.getMapResult(cptypeMap.get("SME"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", WordBookUtil
								.getWordBookItemName("enterprise-type", "01"));
						byTypemap.put("REPORTTYPENUM", "1");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						cptypeMap.put("SME", byTypemap);
					} else if (cptype.equals("02")) {
						Map byTypemap = new HashMap();
						if (cptypeMap.containsKey("MSME")) {
							byTypemap = this.getMapResult(
									cptypeMap.get("MSME"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", WordBookUtil
								.getWordBookItemName("enterprise-type", "02"));
						byTypemap.put("REPORTTYPENUM", "2");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						cptypeMap.put("MSME", byTypemap);
					} else {
						Map byTypemap = new HashMap();
						if (cptypeMap.containsKey("MICROSME")) {
							byTypemap = this.getMapResult(
									cptypeMap.get("MICROSME"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", WordBookUtil
								.getWordBookItemName("enterprise-type", "03"));
						byTypemap.put("REPORTTYPENUM", "3");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						cptypeMap.put("MICROSME", byTypemap);
					}

					if (rating.equals("1.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("1.1")) {
							byTypemap = this.getMapResult(ratingMap.get("1.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "1.1");
						byTypemap.put("REPORTTYPENUM", "1");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("1.1", byTypemap);
					} else if (rating.equals("1.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("1.2")) {
							byTypemap = this.getMapResult(ratingMap.get("1.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "1.2");
						byTypemap.put("REPORTTYPENUM", "2");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("1.2", byTypemap);
					} else if (rating.equals("2.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("2.1")) {
							byTypemap = this.getMapResult(ratingMap.get("2.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "2.1");
						byTypemap.put("REPORTTYPENUM", "3");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("2.1", byTypemap);
					} else if (rating.equals("2.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("2.2")) {
							byTypemap = this.getMapResult(ratingMap.get("2.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "2.2");
						byTypemap.put("REPORTTYPENUM", "4");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("2.2", byTypemap);
					} else if (rating.equals("3.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("3.1")) {
							byTypemap = this.getMapResult(ratingMap.get("3.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "3.1");
						byTypemap.put("REPORTTYPENUM", "5");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("3.1", byTypemap);
					} else if (rating.equals("3.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("3.2")) {
							byTypemap = this.getMapResult(ratingMap.get("3.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "3.2");
						byTypemap.put("REPORTTYPENUM", "6");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("3.2", byTypemap);
					} else if (rating.equals("4.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("4.1")) {
							byTypemap = this.getMapResult(ratingMap.get("4.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "4.1");
						byTypemap.put("REPORTTYPENUM", "7");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("4.1", byTypemap);
					} else if (rating.equals("4.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("4.2")) {
							byTypemap = this.getMapResult(ratingMap.get("4.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "4.2");
						byTypemap.put("REPORTTYPENUM", "8");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("4.2", byTypemap);
					} else if (rating.equals("5.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("5.1")) {
							byTypemap = this.getMapResult(ratingMap.get("5.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "5.1");
						byTypemap.put("REPORTTYPENUM", "9");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("5.1", byTypemap);
					} else if (rating.equals("5.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("5.2")) {
							byTypemap = this.getMapResult(ratingMap.get("5.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "5.2");
						byTypemap.put("REPORTTYPENUM", "10");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("5.2", byTypemap);
					} else if (rating.equals("6.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("6.1")) {
							byTypemap = this.getMapResult(ratingMap.get("6.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "6.1");
						byTypemap.put("REPORTTYPENUM", "11");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("6.1", byTypemap);
					} else if (rating.equals("6.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("6.2")) {
							byTypemap = this.getMapResult(ratingMap.get("6.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "6.2");
						byTypemap.put("REPORTTYPENUM", "12");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("6.2", byTypemap);
					} else if (rating.equals("7.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("7.1")) {
							byTypemap = this.getMapResult(ratingMap.get("7.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "7.1");
						byTypemap.put("REPORTTYPENUM", "13");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("7.1", byTypemap);
					} else if (rating.equals("7.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("7.2")) {
							byTypemap = this.getMapResult(ratingMap.get("7.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "7.2");
						byTypemap.put("REPORTTYPENUM", "14");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Uploaded");
						ratingMap.put("7.2", byTypemap);
					}
					totalMap.put("REPORTTYPE", "Total");
					totalMap.put("REPORTTYPENUM", "66");
					totalMap.put("REPORTDATE", reportDate);
					totalMap.put("UPLOADDATE", uploadDate);
					totalMap.put("REPORTBYTYPE", WordBookUtil
							.getWordBookItemName("invoiceReport", "01"));
					totalMap.put("QUERYCONDITION", "Uploaded");
					regionMap.put("Total", totalMap);
					this.saveReportInfo(regionMap, conn, trimmerI, table);
					totalMap.put("REPORTBYTYPE", WordBookUtil
							.getWordBookItemName("invoiceReport", "02"));
					cptypeMap.put("Total", totalMap);
					this.saveReportInfo(cptypeMap, conn, trimmerI, table);
					totalMap.put("REPORTBYTYPE", WordBookUtil
							.getWordBookItemName("invoiceReport", "03"));
					ratingMap.put("Total", totalMap);
					this.saveReportInfo(ratingMap, conn, trimmerI, table);
				}
			}
			// 循环保存 settlemendate
			it = reportInfoBySettlementMap.keySet().iterator();
			while (it.hasNext()) {
				String keyValue = (String) it.next();
				List<Map> reportInfoList = reportInfoBySettlementMap
						.get(keyValue);
				String settlementDate = keyValue + "000000";
				Map totalMap = new HashMap();
				Map<String, Map> regionMap = new HashMap<String, Map>();
				Map<String, Map> cptypeMap = new HashMap<String, Map>();
				Map<String, Map> ratingMap = new HashMap<String, Map>();
				Map<String, Map> debtorMap = new HashMap<String, Map>();
				for (Map map : reportInfoList) {
					String debtor = Getter.string(map.get("DEBTOR"));
					if (debtorMap.containsKey(debtor)) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey(debtor)) {
							byTypemap = this.getMapResult(
									regionMap.get(debtor), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("QUERYCONDITION", "Debtor");
						regionMap.put(debtor, byTypemap);
					}
					if (totalMap.size() == 0) {
						totalMap = Tools.cloneMap(map, totalMap);
					} else {
						totalMap = this.getMapResult(totalMap, map);
					}
					String region = StringTool.checkString(map.get("region"));
					String cptype = StringTool.checkString(map.get("cptype"));
					String rating = StringTool.checkString(map.get("rating"));
					if (region.equals("Hanoi")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("Hanoi")) {
							byTypemap = this.getMapResult(
									regionMap.get("Hanoi"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Hanoi");
						byTypemap.put("REPORTTYPENUM", "1");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						regionMap.put("Hanoi", byTypemap);
					} else if (region.equals("Ho Chi Minh")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("HoChiMinh")) {
							byTypemap = this.getMapResult(
									regionMap.get("HoChiMinh"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Ho Chi Minh");
						byTypemap.put("REPORTTYPENUM", "2");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						regionMap.put("HoChiMinh", byTypemap);
					} else if (region.equals("Hai Phong")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("HaiPhong")) {
							byTypemap = this.getMapResult(
									regionMap.get("HaiPhong"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Hai Phong");
						byTypemap.put("REPORTTYPENUM", "3");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						regionMap.put("HaiPhong", byTypemap);
					} else if (region.equals("Da Nang")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("DaNang")) {
							byTypemap = this.getMapResult(
									regionMap.get("DaNang"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Da Nang");
						byTypemap.put("REPORTTYPENUM", "4");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						regionMap.put("DaNang", byTypemap);
					} else if (region.equals("Can Tho")) {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("CanTho")) {
							byTypemap = this.getMapResult(
									regionMap.get("CanTho"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Can Tho");
						byTypemap.put("REPORTTYPENUM", "5");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						regionMap.put("CanTho", byTypemap);
					} else {
						Map byTypemap = new HashMap();
						if (regionMap.containsKey("Others")) {
							byTypemap = this.getMapResult(
									regionMap.get("Others"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "Others");
						byTypemap.put("REPORTTYPENUM", "6");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						regionMap.put("Others", byTypemap);
					}
					if (cptype.equals("01")) {
						Map byTypemap = new HashMap();
						if (cptypeMap.containsKey("SME")) {
							byTypemap = this.getMapResult(cptypeMap.get("SME"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", WordBookUtil
								.getWordBookItemName("enterprise-type", "01"));
						byTypemap.put("REPORTTYPENUM", "1");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						cptypeMap.put("SME", byTypemap);
					} else if (cptype.equals("02")) {
						Map byTypemap = new HashMap();
						if (cptypeMap.containsKey("MSME")) {
							byTypemap = this.getMapResult(
									cptypeMap.get("MSME"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", WordBookUtil
								.getWordBookItemName("enterprise-type", "02"));
						byTypemap.put("REPORTTYPENUM", "2");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						cptypeMap.put("MSME", byTypemap);
					} else {
						Map byTypemap = new HashMap();
						if (cptypeMap.containsKey("MICROSME")) {
							byTypemap = this.getMapResult(
									cptypeMap.get("MICROSME"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", WordBookUtil
								.getWordBookItemName("enterprise-type", "03"));
						byTypemap.put("REPORTTYPENUM", "3");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						cptypeMap.put("MICROSME", byTypemap);
					}

					if (rating.equals("1.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("1.1")) {
							byTypemap = this.getMapResult(ratingMap.get("1.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "1.1");
						byTypemap.put("REPORTTYPENUM", "1");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("1.1", byTypemap);
					} else if (rating.equals("1.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("1.2")) {
							byTypemap = this.getMapResult(ratingMap.get("1.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "1.2");
						byTypemap.put("REPORTTYPENUM", "2");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("1.2", byTypemap);
					} else if (rating.equals("2.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("2.1")) {
							byTypemap = this.getMapResult(ratingMap.get("2.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "2.1");
						byTypemap.put("REPORTTYPENUM", "3");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("2.1", byTypemap);
					} else if (rating.equals("2.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("2.2")) {
							byTypemap = this.getMapResult(ratingMap.get("2.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "2.2");
						byTypemap.put("REPORTTYPENUM", "4");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("2.2", byTypemap);
					} else if (rating.equals("3.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("3.1")) {
							byTypemap = this.getMapResult(ratingMap.get("3.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "3.1");
						byTypemap.put("REPORTTYPENUM", "5");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("3.1", byTypemap);
					} else if (rating.equals("3.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("3.2")) {
							byTypemap = this.getMapResult(ratingMap.get("3.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "3.2");
						byTypemap.put("REPORTTYPENUM", "6");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("3.2", byTypemap);
					} else if (rating.equals("4.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("4.1")) {
							byTypemap = this.getMapResult(ratingMap.get("4.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "4.1");
						byTypemap.put("REPORTTYPENUM", "7");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("4.1", byTypemap);
					} else if (rating.equals("4.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("4.2")) {
							byTypemap = this.getMapResult(ratingMap.get("4.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "4.2");
						byTypemap.put("REPORTTYPENUM", "8");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("4.2", byTypemap);
					} else if (rating.equals("5.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("5.1")) {
							byTypemap = this.getMapResult(ratingMap.get("5.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "5.1");
						byTypemap.put("REPORTTYPENUM", "9");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("5.1", byTypemap);
					} else if (rating.equals("5.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("5.2")) {
							byTypemap = this.getMapResult(ratingMap.get("5.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "5.2");
						byTypemap.put("REPORTTYPENUM", "10");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("5.2", byTypemap);
					} else if (rating.equals("6.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("6.1")) {
							byTypemap = this.getMapResult(ratingMap.get("6.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "6.1");
						byTypemap.put("REPORTTYPENUM", "11");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("6.1", byTypemap);
					} else if (rating.equals("6.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("6.2")) {
							byTypemap = this.getMapResult(ratingMap.get("6.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "6.2");
						byTypemap.put("REPORTTYPENUM", "12");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("6.2", byTypemap);
					} else if (rating.equals("7.1")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("7.1")) {
							byTypemap = this.getMapResult(ratingMap.get("7.1"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "7.1");
						byTypemap.put("REPORTTYPENUM", "13");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("7.1", byTypemap);
					} else if (rating.equals("7.2")) {
						Map byTypemap = new HashMap();
						if (ratingMap.containsKey("7.2")) {
							byTypemap = this.getMapResult(ratingMap.get("7.2"),
									map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", "7.2");
						byTypemap.put("REPORTTYPENUM", "14");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("SETTLEMENTDATE", settlementDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						byTypemap.put("QUERYCONDITION", "Settlement");
						ratingMap.put("7.2", byTypemap);
					}
					totalMap.put("REPORTTYPE", "Total");
					totalMap.put("REPORTTYPENUM", "66");
					totalMap.put("REPORTDATE", reportDate);
					totalMap.put("SETTLEMENTDATE", settlementDate);
					totalMap.put("REPORTBYTYPE", WordBookUtil
							.getWordBookItemName("invoiceReport", "01"));
					totalMap.put("QUERYCONDITION", "Uploaded");
					regionMap.put("Total", totalMap);
					this.saveReportInfo(regionMap, conn, trimmerI, table);
					totalMap.put("REPORTBYTYPE", WordBookUtil
							.getWordBookItemName("invoiceReport", "02"));
					cptypeMap.put("Total", totalMap);
					this.saveReportInfo(cptypeMap, conn, trimmerI, table);
					totalMap.put("REPORTBYTYPE", WordBookUtil
							.getWordBookItemName("invoiceReport", "03"));
					ratingMap.put("Total", totalMap);
					this.saveReportInfo(ratingMap, conn, trimmerI, table);
					this.saveReportInfo(debtorMap, conn, trimmerI, table);
				}
			}
		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	@SuppressWarnings({ "rawtypes" })
	private static void saveReportInfo(Map<String, Map> reportmap,
			Connection conn, DataTrimmerI trimmerI, Table table) {
		try {
			Iterator it = reportmap.keySet().iterator();
			while (it.hasNext()) {
				BaseworkUtil util = new BaseworkUtil();
				SimpleBean bean = new SimpleBeanImpl();
				String keyValue = (String) it.next();
				Map value = reportmap.get(keyValue);
				bean.reload(value);
				util.manualSave(table, bean, conn);
			}
		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static Map getMapResult(Map map1, Map map2) {
		Map mapResult = new HashMap();
		mapResult.put("NOOVERDUE_NO", Getter.l(map1.get("NOOVERDUE_NO"))
				+ Getter.l(map2.get("NOOVERDUE_NO")));
		mapResult.put(
				"NOOVERDUE_AMOUNT",
				Getter.f(map1.get("NOOVERDUE_AMOUNT"))
						+ Getter.f(map2.get("NOOVERDUE_AMOUNT")));
		mapResult.put(
				"LTHIRTY_NO",
				Getter.l(map1.get("LTHIRTY_NO"))
						+ Getter.l(map2.get("LTHIRTY_NO")));
		mapResult.put("LTHIRTY_AMOUNT", Getter.f(map1.get("LTHIRTY_AMOUNT"))
				+ Getter.f(map2.get("LTHIRTY_AMOUNT")));
		mapResult.put(
				"GTHIRTY_NO",
				Getter.l(map1.get("GTHIRTY_NO"))
						+ Getter.l(map2.get("GTHIRTY_NO")));
		mapResult.put("GTHIRTY_AMOUNT", Getter.f(map1.get("GTHIRTY_AMOUNT"))
				+ Getter.f(map2.get("GTHIRTY_AMOUNT")));
		return mapResult;
	}
}
