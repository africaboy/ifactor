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

//@Lazy(false)
//@Component
public class SellerReportScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked", "static-access" })
	@Scheduled(cron = "0 */3 * * * ?")
	public void sellerReport() {
		logger.debug("seller reprot by type is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String smeSql = "SELECT A.PK_ID,A.COMPANIESTYPEID,A.CPREIZON,A.APP_PK_ID,A.CPSTATUS,A.CPCTIME,S.RATING FROM IF_MGT_CP_APPLY A LEFT JOIN IF_MGT_SCORING_RESULT S "
					+ "ON A.PK_ID = S.APPLY_ID";
			List<Map> smeApplyInfo = trimmerI.searchMultiData(smeSql);
			Map<String, List<Map>> reportInfoMap = new HashMap<String, List<Map>>();
			for (Map map : smeApplyInfo) {
				String smeLineID = StringTool.checkString(map.get("APP_PK_ID"));
				String sme = StringTool.checkString(map.get("COMPANIESTYPEID"));
				String region = StringTool.checkString(map.get("CPREIZON"));
				String rating = StringTool.checkString(map.get("RATING"));
				String uploadDate = StringTool.checkString(map.get("CPCTIME"));
				uploadDate = uploadDate.substring(0, 8);
				String blackListSql = "SELECT DUPTYPEID FROM IF_MGT_BLACKLIST_RESULT WHERE PKID = ?";
				List<Map> blacklistInfo = trimmerI.searchMultiData(
						blackListSql, map.get("PK_ID"));
				long fraud = 0;
				long cancellation = 0;
				for (Map balckListMap : blacklistInfo) {
					String duptype = StringTool.checkString(balckListMap
							.get("DUPTYPEID"));
					if (duptype.equals("02")) {
						fraud = 1;
					} else if (duptype.equals("01")) {
						cancellation = 1;
					}
				}
				String invoiceSql = "SELECT * FROM IF_MGT_INVOICE_APPLY A "
						+ "LEFT JOIN IF_MGT_INVOICE_AUCTION U ON A.IIDA_PK_ID = U.IIDA_PK_ID WHERE A.SME_APP_PK_ID = ?";
				List<Map> invoiceInfo = trimmerI.searchMultiData(invoiceSql,
						smeLineID);
				float advance = 0;
				float interest = 0;
				long financed = 0;
				long applied = 1;
				long accepted = 0;
				String sellerStatus = StringTool.checkString(map
						.get("CPSTATUS"));
				if (sellerStatus.equals("cPjfdskOtZ_oQfYjWhRHs")) {
					accepted = 1;
				}
				if (invoiceInfo.size() > 0) {
					for (Map invoiceMap : invoiceInfo) {
						advance = advance
								+ Getter.l(invoiceMap.get("IDA_ADVANCE"));
						interest = interest
								+ Getter.l(invoiceMap.get("IDA_INTEREST"));
						String auctionStatus = StringTool.checkString(map
								.get("AUCTION_STATUS"));
						if (auctionStatus.equals("IAS_08")) {
							financed = financed + 1;
						}
					}
					Map reportMap = new HashMap();
					reportMap.put("APPLIED", applied);
					reportMap.put("ACCEPTED", accepted);
					reportMap.put("FINANCED", financed);
					reportMap.put("FRAUD_BLACKLIST", fraud);
					reportMap.put("CANCELL_BLACKLIST", cancellation);
					reportMap.put("AVERAGE_ADVANCE", advance);
					reportMap.put("AVERAGE_INTEREST", interest);
					reportMap.put("UPLOADDATE", uploadDate);
					reportMap.put("region", region);
					reportMap.put("rating", rating);
					reportMap.put("cptype", sme);
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
					reportMap.put("FINANCED", financed);
					reportMap.put("FRAUD_BLACKLIST", fraud);
					reportMap.put("CANCELL_BLACKLIST", cancellation);
					reportMap.put("AVERAGE_ADVANCE", advance);
					reportMap.put("AVERAGE_INTEREST", interest);
					reportMap.put("region", region);
					reportMap.put("rating", rating);
					reportMap.put("cptype", sme);
					reportMap.put("UPLOADDATE", uploadDate);
					List<Map> reportMapList = new ArrayList<Map>();
					if (reportInfoMap.containsKey(uploadDate)) {
						reportMapList = reportInfoMap.get(uploadDate);
					}
					reportMapList.add(reportMap);
					reportInfoMap.put(uploadDate, reportMapList);
				}
			}
			TableRegisterCenter center = TableRegisterCenter.getInstance();
			Table table = center.findTable("IF_MGT_SELLER_REPORT");
			String reportDate = DateTrimmer.getYMD();
			Iterator it = reportInfoMap.keySet().iterator();
			while (it.hasNext()) {
				String keyValue = (String) it.next();
				List<Map> reportInfoList = reportInfoMap.get(keyValue);
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
						ratingMap.put("7.2", byTypemap);
					}
				}
				totalMap.put("REPORTTYPE", "Total");
				totalMap.put("REPORTTYPENUM", "66");
				totalMap.put("REPORTDATE", reportDate);
				totalMap.put("UPLOADDATE", uploadDate);
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("invoiceReport", "01"));
				regionMap.put("Total", totalMap);
				this.saveReportInfo(regionMap, conn, trimmerI, table);
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("invoiceReport", "02"));
				cptypeMap.put("Total", totalMap);
				this.saveReportInfo(cptypeMap, conn, trimmerI, table);
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("invoiceReport", "03"));
				ratingMap.put("Total", totalMap);
				this.saveReportInfo(ratingMap, conn, trimmerI, table);
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
	private static void saveReportInfo(Map<String, Map> reportmap,
			Connection conn, DataTrimmerI trimmerI, Table table) {
		try {
			Iterator it = reportmap.keySet().iterator();
			while (it.hasNext()) {
				BaseworkUtil util = new BaseworkUtil();
				SimpleBean bean = new SimpleBeanImpl();
				String keyValue = (String) it.next();
				Map value = reportmap.get(keyValue);
				// long advance = Long.valueOf(StringTool.checkString(value
				// .get("AVERAGE_ADVANCE")));
				// long interest = Long.valueOf(StringTool.checkString(value
				// .get("AVERAGE_INTEREST")));
				// long accepted = Long.valueOf(StringTool.checkString(value
				// .get("ACCEPTED")));
				// if (accepted != 0) {
				// value.put("AVERAGE_ADVANCE", advance / accepted);
				// value.put("AVERAGE_INTEREST", interest / accepted);
				// } else {
				// value.put("AVERAGE_ADVANCE", advance);
				// value.put("AVERAGE_INTEREST", interest);
				// }
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
		mapResult
				.put("FINANCED",
						Getter.l(map1.get("FINANCED"))
								+ Getter.l(map2.get("FINANCED")));
		mapResult.put("FRAUD_BLACKLIST", Getter.l(map1.get("FRAUD_BLACKLIST"))
				+ Getter.l(map2.get("FRAUD_BLACKLIST")));
		mapResult.put(
				"CANCELL_BLACKLIST",
				Getter.l(map1.get("CANCELL_BLACKLIST"))
						+ Getter.l(map2.get("CANCELL_BLACKLIST")));
		mapResult.put("AVERAGE_ADVANCE", Getter.f(map1.get("AVERAGE_ADVANCE"))
				+ Getter.f(map2.get("AVERAGE_ADVANCE")));
		mapResult.put(
				"AVERAGE_INTEREST",
				Getter.f(map1.get("AVERAGE_INTEREST"))
						+ Getter.f(map2.get("AVERAGE_INTEREST")));
		return mapResult;
	}
}
