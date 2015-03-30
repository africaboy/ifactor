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
 * buyer by type report
 * 
 * @author Administrator
 * 
 */
// @Lazy(false)
// @Component
public class BuyerRportScheduled {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked", "static-access" })
	@Scheduled(cron = "0 */3 * * * ?")
	public void buyerReport() {
		logger.debug("buyer reprot by type is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String buyerSql = "SELECT B.IBA_PK_ID,B.APP_PK_ID,B.BA_APPLY_DATE,B.BA_STATUS,I.INVEST_AS,C.COMPANY_REGION,C.CPINDUSTRY,P.REGION,P.COMPANY_INDUSTRY FROM IF_MGT_BUYER_APPLY B "
					+ "LEFT JOIN IF_MGT_BUYER_BASIC_INFO I ON B.IBA_PK_ID = I.IBA_PK_ID "
					+ "LEFT JOIN IF_MGT_BUYER_COMPANY_INFO C ON B.IBA_PK_ID = C.IBA_PK_ID "
					+ "LEFT JOIN IF_MGT_BUYER_PRIVATE_INFO P ON B.IBA_PK_ID = P.IBA_PK_ID";
			List<Map> buyerApplyInfo = trimmerI.searchMultiData(buyerSql);
			Map<String, List<Map>> reportInfoMap = new HashMap<String, List<Map>>();
			for (Map map : buyerApplyInfo) {
				String buyerLineID = StringTool.checkString(map
						.get("APP_PK_ID"));
				String investor = Getter.string(map.get("INVEST_AS"));
				String investPrivate = Getter.string(map
						.get("INVEST_AS_PRIVATE"));
				String region = "";
				String industry = "";
				if (investPrivate.equals("1")) {
					region = Getter.string(map.get("REGION"));
					industry = Getter.string(map.get("COMPANY_INDUSTRY"));
				} else {
					region = Getter.string(map.get("COMPANY_REGION"));
					industry = Getter.string(map.get("CPINDUSTRY"));
				}
				String uploadDate = StringTool.checkString(map
						.get("BA_APPLY_DATE"));
				uploadDate = uploadDate.substring(0, 8);
				String blackListSql = "SELECT DUPTYPEID FROM IF_MGT_BLACKLIST_RESULT WHERE PKID = ?";
				List<Map> blacklistInfo = trimmerI.searchMultiData(
						blackListSql, map.get("IBA_PK_ID"));
				long regulatory = 0;
				long cancellation = 0;
				for (Map balckListMap : blacklistInfo) {
					String duptype = StringTool.checkString(balckListMap
							.get("DUPTYPEID"));
					if (duptype.equals("04")) {
						regulatory = 1;
					} else if (duptype.equals("01")) {
						cancellation = 1;
					}
				}
				String auctionSql = "SELECT U.BEST_ADVANCE,F.INVOICE_AMOUNT FROM IF_MGT_INVOICE_AUCTION U "
						+ "LEFT JOIN IF_MGT_INVOICE_FINANC F ON U.IIDA_PK_ID = F.IIDA_PK_ID WHERE U.BUYERID = ?";
				List<Map> auctionInfo = trimmerI.searchMultiData(auctionSql,
						buyerLineID);
				long applied = 1;
				long accepted = 0;
				float approvalRate = 0;
				float financed = 0;
				String buyerStatus = StringTool.checkString(map
						.get("BA_STATUS"));
				if (buyerStatus.equals("PBwYjzcgYL_ANAzqfzpXu")) {
					accepted = 1;
				}
				if (auctionInfo.size() > 0) {
					for (Map auctionMap : auctionInfo) {
						String auctionStatus = StringTool.checkString(map
								.get("AUCTION_STATUS"));
						if (auctionStatus.equals("IAS_08")) {
							float advance = Getter.f(auctionMap
									.get("BEST_ADVANCE"));
							float invoiceAmount = Getter.f(auctionMap
									.get("INVOICE_AMOUNT"));
							financed = financed + advance * invoiceAmount;
						}
					}
					Map reportMap = new HashMap();
					reportMap.put("APPLIED", applied);
					reportMap.put("ACCEPTED", accepted);
					reportMap.put("APPROVAL_RATE", approvalRate);
					reportMap.put("INVESTED", financed);
					reportMap.put("REGULATORY_BLACKLIST", regulatory);
					reportMap.put("CANCELL_BLACKLIST", cancellation);
					reportMap.put("UPLOADDATE", uploadDate);
					reportMap.put("region", region);
					reportMap.put("investor", investor);
					reportMap.put("industry", industry);
					List<Map> reportMapList = new ArrayList<Map>();
					if (reportInfoMap.containsKey(uploadDate)) {
						reportMapList = reportInfoMap.get(uploadDate);
					}
					reportMapList.add(reportMap);
					reportInfoMap.put(uploadDate, reportMapList);
				} else {
					Map reportMap = new HashMap();
					reportMap.put("APPLIED", applied);
					reportMap.put("ACCEPTED", accepted);
					reportMap.put("APPROVAL_RATE", approvalRate);
					reportMap.put("INVESTED", financed);
					reportMap.put("REGULATORY_BLACKLIST", regulatory);
					reportMap.put("CANCELL_BLACKLIST", cancellation);
					reportMap.put("UPLOADDATE", uploadDate);
					reportMap.put("region", region);
					reportMap.put("investor", investor);
					reportMap.put("industry", industry);
					List<Map> reportMapList = new ArrayList<Map>();
					if (reportInfoMap.containsKey(uploadDate)) {
						reportMapList = reportInfoMap.get(uploadDate);
					}
					reportMapList.add(reportMap);
					reportInfoMap.put(uploadDate, reportMapList);
				}
			}
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			Table table = center.findTable("IF_MGT_BUYER_REPORT");
			String reportDate = DateTrimmer.getYMD();
			Iterator it = reportInfoMap.keySet().iterator();
			while (it.hasNext()) {
				String keyValue = (String) it.next();
				List<Map> reportInfoList = reportInfoMap.get(keyValue);
				String uploadDate = keyValue + "000000";
				Map totalMap = new HashMap();
				Map<String, Map> regionMap = new HashMap<String, Map>();
				Map<String, Map> investorMap = new HashMap<String, Map>();
				Map<String, Map> industryMap = new HashMap<String, Map>();
				for (Map map : reportInfoList) {
					if (totalMap.size() == 0) {
						totalMap = Tools.cloneMap(map, totalMap);
					} else {
						totalMap = this.getMapResult(totalMap, map);
					}
					String region = StringTool.checkString(map.get("region"));
					String investor = StringTool.checkString(map
							.get("investor"));
					String industry = StringTool.checkString(map
							.get("industry"));
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
								.getWordBookItemName("buyerReport", "01"));
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
								.getWordBookItemName("buyerReport", "01"));
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
								.getWordBookItemName("buyerReport", "01"));
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
								.getWordBookItemName("buyerReport", "01"));
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
								.getWordBookItemName("buyerReport", "01"));
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
								.getWordBookItemName("buyerReport", "01"));
						regionMap.put("Others", byTypemap);
					}

					if (investor.equals(WordBookUtil.getWordBookItemName(
							"investor", "01"))) {
						Map byTypemap = new HashMap();
						if (investorMap.containsKey("private")) {
							byTypemap = this.getMapResult(
									investorMap.get("private"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", investor);
						byTypemap.put("REPORTTYPENUM", "1");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("buyerReport", "02"));
						investorMap.put("private", byTypemap);
					} else {
						Map byTypemap = new HashMap();
						if (investorMap.containsKey("company")) {
							byTypemap = this.getMapResult(
									investorMap.get("company"), map);
						} else {
							byTypemap = Tools.cloneMap(map, byTypemap);
						}
						byTypemap.put("REPORTTYPE", investor);
						byTypemap.put("REPORTTYPENUM", "2");
						byTypemap.put("REPORTDATE", reportDate);
						byTypemap.put("UPLOADDATE", uploadDate);
						byTypemap.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("buyerReport", "02"));
						investorMap.put("company", byTypemap);
					}

					Map byITypemap = new HashMap();
					if (industryMap.containsKey(industry)) {
						byITypemap = this.getMapResult(
								industryMap.get(industry), map);
					} else {
						byITypemap = Tools.cloneMap(map, byITypemap);
					}
					byITypemap.put("REPORTTYPE", industry);
					byITypemap.put("REPORTTYPENUM", industryMap.size() + 1);
					byITypemap.put("REPORTDATE", reportDate);
					byITypemap.put("UPLOADDATE", uploadDate);
					byITypemap.put("REPORTBYTYPE", WordBookUtil
							.getWordBookItemName("buyerReport", "03"));
					industryMap.put(industry, byITypemap);
				}
				totalMap.put("REPORTTYPE", "Total");
				totalMap.put("REPORTTYPENUM", "999999999");
				totalMap.put("REPORTDATE", reportDate);
				totalMap.put("UPLOADDATE", uploadDate);
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("buyerReport", "01"));
				regionMap.put("Total", totalMap);
				this.saveReportInfo(regionMap, conn, trimmerI, table);
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("buyerReport", "02"));
				investorMap.put("Total", totalMap);
				this.saveReportInfo(investorMap, conn, trimmerI, table);
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("buyerReport", "03"));
				industryMap.put("Total", totalMap);
				this.saveReportInfo(industryMap, conn, trimmerI, table);
			}
			conn.commit();
		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static void saveReportInfo(Map<String, Map> reportmap,
			Connection conn, DataTrimmerI trimmerI, Table table) {
		try {
			Iterator it = reportmap.keySet().iterator();
			while (it.hasNext()) {
				BaseworkUtil util = new BaseworkUtil();
				SimpleBean bean = new SimpleBeanImpl();
				String keyValue = (String) it.next();
				Map value = reportmap.get(keyValue);
				float applied = Getter.f(value.get("APPLIED"));
				float accepted = Getter.f(value.get("ACCEPTED"));
				if (applied != 0) {
					value.put("APPROVAL_RATE", accepted / applied);
				}
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
		mapResult.put("APPLIED",
				Getter.l(map1.get("APPLIED")) + Getter.l(map2.get("APPLIED")));
		mapResult
				.put("ACCEPTED",
						Getter.l(map1.get("ACCEPTED"))
								+ Getter.l(map2.get("ACCEPTED")));
		mapResult.put("APPROVAL_RATE", Getter.f(map1.get("APPROVAL_RATE"))
				+ Getter.f(map2.get("APPROVAL_RATE")));
		mapResult
				.put("INVESTED",
						Getter.f(map1.get("INVESTED"))
								+ Getter.f(map2.get("INVESTED")));
		mapResult.put(
				"REGULATORY_BLACKLIST",
				Getter.l(map1.get("REGULATORY_BLACKLIST"))
						+ Getter.l(map2.get("REGULATORY_BLACKLIST")));
		mapResult.put(
				"CANCELL_BLACKLIST",
				Getter.l(map1.get("CANCELL_BLACKLIST"))
						+ Getter.l(map2.get("CANCELL_BLACKLIST")));
		return mapResult;
	}
}
