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
 * invoice report timer
 * 
 * @author hezhch
 * 
 */
// @Lazy(false)
// @Component
public class InvoiceReportScheduled {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@SuppressWarnings({ "rawtypes", "unchecked", "static-access" })
	@Scheduled(cron = "0 */3 * * * ?")
	public void invoiceReport() {
		logger.debug("invoice reprot is running...");
		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			String invoiceSql = "SELECT * FROM IF_MGT_INVOICE_APPLY A LEFT JOIN IF_MGT_INVOICE_FINANC F ON A.IIDA_PK_ID = F.IIDA_PK_ID "
					+ "LEFT JOIN IF_MGT_INVOICE_AUCTION U ON A.IIDA_PK_ID = U.IIDA_PK_ID ";
			List<Map> invoiceApplyInfo = trimmerI.searchMultiData(invoiceSql);
			Map<String, Map> smeInfoMap = new HashMap<String, Map>();
			Map<String, List<Map>> reportInfoMap = new HashMap<String, List<Map>>();
			List<String> reportInfoMapKey = new ArrayList<String>();
			for (Map map : invoiceApplyInfo) {
				String smeLineID = StringTool.checkString(map
						.get("SME_APP_PK_ID"));
				Map smeMap = null;
				if (smeInfoMap.containsKey(smeLineID)) {
					smeMap = smeInfoMap.get(smeLineID);
				} else {
					String smeSql = "SELECT A.*,S.RATING FROM IF_MGT_CP_APPLY A LEFT JOIN IF_MGT_SCORING_RESULT S "
							+ "ON A.PK_ID = S.APPLY_ID WHERE A.APP_PK_ID = ?";
					smeMap = trimmerI.searchSingleData(smeSql, smeLineID);
					smeInfoMap.put(smeLineID, smeMap);
				}
				String uploadDate = StringTool.checkString(map.get("IDA_DATE"));
				String region = StringTool.checkString(smeMap.get("CPREIZON"));
				String sme = StringTool.checkString(smeMap
						.get("COMPANIESTYPEID"));
				String rating = StringTool.checkString(smeMap.get("RATING"));
				long uploadno = 1;
				float amount = Long.parseLong(StringTool.checkString(map
						.get("INVOICE_AMOUNT")));
				// long advance = Long.parseLong(StringTool.checkString(map
				// .get("IDA_ADVANCE")));
				float uploadAmount = amount;
				String invoiceStatus = StringTool.checkString(map
						.get("IDA_STATUS"));
				long inprono = 0;
				float inproAmount = 0;
				long rejectedno = 0;
				float rejectedAmount = 0;
				long acceptedno = 0;
				float acceptedAmount = 0;
				if (invoiceStatus.equals("bquDuCwisW_dSHAvdyhfW")
						|| invoiceStatus.equals("vBdcCEIXvk_dSHAvdyhfW")
						|| invoiceStatus.equals("OHMcXwKBdZ_dSHAvdyhfW_0")
						|| invoiceStatus.equals("RyXlLYLUHF_dSHAvdyhfW")) {
					rejectedno = 1;
					inproAmount = uploadAmount;
				} else if (invoiceStatus.equals("OHMcXwKBdZ_dSHAvdyhfW")) {
					acceptedno = 1;
					acceptedAmount = uploadAmount;
				} else {
					inprono = 1;
					inproAmount = uploadAmount;
				}
				String auctionStatus = StringTool.checkString(map
						.get("AUCTION_STATUS"));
				long reopenno = 0;
				float reopenAmount = 0;
				long inaucbidno = 0;
				float inaucbidAmount = 0;
				long inaucunbidno = 0;
				float inaucunbidAmount = 0;
				long delistedno = 0;
				float delistedAmount = 0;
				long dealedno = 0;
				float dealedAmount = 0;
				long undealedno = 0;
				float undealedAmount = 0;
				long undisbursedno = 0;
				float undisbursedAmount = 0;
				long disbursedno = 0;
				float disbursedAmount = 0;
				long settledno = 0;
				float settledAmount = 0;
				long overdueno = 0;
				float overdueAmount = 0;
				if (auctionStatus.equals("IAS_07")
						|| auctionStatus.equals("IAS_10")) {
					reopenno = 1;
					reopenAmount = uploadAmount;
				}
				if (auctionStatus.equals("IAS_05")) {
					inaucbidno = 1;
					inaucbidAmount = uploadAmount;
				}
				if (auctionStatus.equals("IAS_01")
						|| auctionStatus.equals("IAS_02")
						|| auctionStatus.equals("IAS_03")) {
					inaucunbidno = 1;
					inaucunbidAmount = uploadAmount;
				}
				if (auctionStatus.equals("IAS_06")) {
					delistedno = 1;
					delistedAmount = uploadAmount;
				}
				if (auctionStatus.equals("IAS_04")) {
					dealedno = 1;
					dealedAmount = uploadAmount;
				}
				if (auctionStatus.equals("IAS_10")) {
					undealedno = 1;
					undealedAmount = uploadAmount;
				}
				if (auctionStatus.equals("IAS_07")) {
					undisbursedno = 1;
					undisbursedAmount = uploadAmount;
				}
				if (auctionStatus.equals("IAS_08")) {
					disbursedno = 1;
					disbursedAmount = uploadAmount;
					settledno = 1;
					settledAmount = uploadAmount;
				}
				if (auctionStatus.equals("IAS_09")) {
					overdueno = 1;
					overdueAmount = uploadAmount;
				}
				Map reportMap = new HashMap();
				reportMap.put("UPLOADED_NO", uploadno);
				reportMap.put("UPLOADED_AMOUNT", uploadAmount);
				reportMap.put("INPRO_NO", inprono);
				reportMap.put("INPRO_AMOUNT", inproAmount);
				reportMap.put("REJECTED_NO", rejectedno);
				reportMap.put("REJECTED_AMOUNT", rejectedAmount);
				reportMap.put("ACCEPTED_NO", acceptedno);
				reportMap.put("ACCEPTED_AMOUNT", acceptedAmount);
				reportMap.put("REOPEN_NO", reopenno);
				reportMap.put("REOPEN_AMOUNT", reopenAmount);
				reportMap.put("INAUCBID_NO", inaucbidno);
				reportMap.put("INAUCBID_AMOUNT", inaucbidAmount);
				reportMap.put("INAUCUNBID_NO", inaucunbidno);
				reportMap.put("INAUCUNBID_AMOUNT", inaucunbidAmount);
				reportMap.put("DELISTED_NO", delistedno);
				reportMap.put("DELISTED_AMOUNT", delistedAmount);
				reportMap.put("DEALED_NO", dealedno);
				reportMap.put("DEALED_AMOUNT", dealedAmount);
				reportMap.put("UNDEALED_NO", undealedno);
				reportMap.put("UNDEALED_AMOUNT", undealedAmount);
				reportMap.put("UNDISBURSED_NO", undisbursedno);
				reportMap.put("UNDISBURSED_AMOUNT", undisbursedAmount);
				reportMap.put("DISBURSED_NO", disbursedno);
				reportMap.put("DISBURSED_AMOUNT", disbursedAmount);
				reportMap.put("SETTLEDED_NO", settledno);
				reportMap.put("SETTLEDED_AMOUNT", settledAmount);
				reportMap.put("OVERDUE_NO", overdueno);
				reportMap.put("OVERDUE_AMOUNT", overdueAmount);
				reportMap.put("date", uploadDate);
				reportMap.put("region", region);
				reportMap.put("cptype", sme);
				reportMap.put("rating", rating);
				reportMap.put("auctionStatus", auctionStatus);
				String key = uploadDate.substring(0, 8);
				List<Map> reportMapList = new ArrayList<Map>();
				if (!reportInfoMapKey.contains(key)) {
					reportInfoMapKey.add(key);
				} else {
					reportMapList = reportInfoMap.get(key);
				}
				reportMapList.add(reportMap);
				reportInfoMap.put(key, reportMapList);
			}
			String reportDate = DateTrimmer.getYMD();
			// String reportSql =
			// "SELECT RPT_PK_ID FROM IF_MGT_INVOICE_REPORT WHERE REPORTDATE = ? AND REPORTTYPE = ? AND REPORTBYTYPE = ?";
			for (String key : reportInfoMapKey) {
				List<Map> reprotInfoListMap = reportInfoMap.get(key);
				long uploadno = 0;
				float uploadAmount = 0;
				long inprono = 0;
				float inproAmount = 0;
				long rejectedno = 0;
				float rejectedAmount = 0;
				long acceptedno = 0;
				float acceptedAmount = 0;
				long reopenno = 0;
				float reopenAmount = 0;
				long inaucbidno = 0;
				float inaucbidAmount = 0;
				long inaucunbidno = 0;
				float inaucunbidAmount = 0;
				long delistedno = 0;
				float delistedAmount = 0;
				long dealedno = 0;
				float dealedAmount = 0;
				long undealedno = 0;
				float undealedAmount = 0;
				long undisbursedno = 0;
				float undisbursedAmount = 0;
				long disbursedno = 0;
				float disbursedAmount = 0;
				long settledno = 0;
				float settledAmount = 0;
				long overdueno = 0;
				float overdueAmount = 0;
				String uploaddate = "";
				String region = "";
				String cptype = "";
				String rating = "";
				Map totalMap = new HashMap();
				Map<String, Map> regionMap = new HashMap<String, Map>();
				Map<String, Map> cptypeMap = new HashMap<String, Map>();
				Map<String, Map> ratingMap = new HashMap<String, Map>();
				for (Map reportMap : reprotInfoListMap) {
					uploaddate = StringTool.checkString(reportMap.get("date"));
					uploaddate = uploaddate.substring(0, 8) + "000000";
					region = StringTool.checkString(reportMap.get("region"));
					cptype = StringTool.checkString(reportMap.get("cptype"));
					rating = StringTool.checkString(reportMap.get("rating"));
					if (region.equals("Hanoi")) {
						Map map = new HashMap();
						if (regionMap.containsKey("Hanoi")) {
							map = this.getMapResult(regionMap.get("Hanoi"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "Hanoi");
						map.put("REPORTTYPENUM", "1");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						regionMap.put("Hanoi", map);
					} else if (region.equals("Ho Chi Minh")) {
						Map map = new HashMap();
						if (regionMap.containsKey("HoChiMinh")) {
							map = this.getMapResult(regionMap.get("HoChiMinh"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "Ho Chi Minh");
						map.put("REPORTTYPENUM", "2");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						regionMap.put("HoChiMinh", map);
					} else if (region.equals("Hai Phong")) {
						Map map = new HashMap();
						if (regionMap.containsKey("HaiPhong")) {
							map = this.getMapResult(regionMap.get("HaiPhong"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "Hai Phong");
						map.put("REPORTTYPENUM", "3");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						regionMap.put("HaiPhong", map);
					} else if (region.equals("Da Nang")) {
						Map map = new HashMap();
						if (regionMap.containsKey("DaNang")) {
							map = this.getMapResult(regionMap.get("DaNang"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "Da Nang");
						map.put("REPORTTYPENUM", "4");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						regionMap.put("DaNang", map);
					} else if (region.equals("Can Tho")) {
						Map map = new HashMap();
						if (regionMap.containsKey("CanTho")) {
							map = this.getMapResult(regionMap.get("CanTho"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "Can Tho");
						map.put("REPORTTYPENUM", "5");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						regionMap.put("CanTho", map);
					} else {
						Map map = new HashMap();
						if (regionMap.containsKey("Others")) {
							map = this.getMapResult(regionMap.get("Others"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "Others");
						map.put("REPORTTYPENUM", "6");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "01"));
						regionMap.put("Others", map);
					}

					if (cptype.equals("01")) {
						Map map = new HashMap();
						if (cptypeMap.containsKey("SME")) {
							map = this.getMapResult(cptypeMap.get("SME"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", WordBookUtil.getWordBookItemName(
								"enterprise-type", "01"));
						map.put("REPORTTYPENUM", "1");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						cptypeMap.put("SME", map);
					} else if (cptype.equals("02")) {
						Map map = new HashMap();
						if (cptypeMap.containsKey("MSME")) {
							map = this.getMapResult(cptypeMap.get("MSME"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", WordBookUtil.getWordBookItemName(
								"enterprise-type", "02"));
						map.put("REPORTTYPENUM", "2");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						cptypeMap.put("MSME", map);
					} else {
						Map map = new HashMap();
						if (cptypeMap.containsKey("MICROSME")) {
							map = this.getMapResult(cptypeMap.get("MICROSME"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", WordBookUtil.getWordBookItemName(
								"enterprise-type", "03"));
						map.put("REPORTTYPENUM", "3");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "02"));
						cptypeMap.put("MICROSME", map);
					}

					if (rating.equals("1.1")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("1.1")) {
							map = this.getMapResult(ratingMap.get("1.1"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "1.1");
						map.put("REPORTTYPENUM", "1");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("1.1", map);
					} else if (rating.equals("1.2")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("1.2")) {
							map = this.getMapResult(ratingMap.get("1.2"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "1.2");
						map.put("REPORTTYPENUM", "2");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("1.2", map);
					} else if (rating.equals("2.1")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("2.1")) {
							map = this.getMapResult(ratingMap.get("2.1"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "2.1");
						map.put("REPORTTYPENUM", "3");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("2.1", map);
					} else if (rating.equals("2.2")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("2.2")) {
							map = this.getMapResult(ratingMap.get("2.2"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "2.2");
						map.put("REPORTTYPENUM", "4");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("2.2", map);
					} else if (rating.equals("3.1")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("3.1")) {
							map = this.getMapResult(ratingMap.get("3.1"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "3.1");
						map.put("REPORTTYPENUM", "5");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("3.1", map);
					} else if (rating.equals("3.2")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("3.2")) {
							map = this.getMapResult(ratingMap.get("3.2"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "3.2");
						map.put("REPORTTYPENUM", "6");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("3.2", map);
					} else if (rating.equals("4.1")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("4.1")) {
							map = this.getMapResult(ratingMap.get("4.1"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "4.1");
						map.put("REPORTTYPENUM", "7");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("4.1", map);
					} else if (rating.equals("4.2")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("4.2")) {
							map = this.getMapResult(ratingMap.get("4.2"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "4.2");
						map.put("REPORTTYPENUM", "8");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("4.2", map);
					} else if (rating.equals("5.1")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("5.1")) {
							map = this.getMapResult(ratingMap.get("5.1"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "5.1");
						map.put("REPORTTYPENUM", "9");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("5.1", map);
					} else if (rating.equals("5.2")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("5.2")) {
							map = this.getMapResult(ratingMap.get("5.2"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "5.2");
						map.put("REPORTTYPENUM", "10");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("5.2", map);
					} else if (rating.equals("6.1")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("6.1")) {
							map = this.getMapResult(ratingMap.get("6.1"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "6.1");
						map.put("REPORTTYPENUM", "11");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("6.1", map);
					} else if (rating.equals("6.2")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("6.2")) {
							map = this.getMapResult(ratingMap.get("6.2"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "6.2");
						map.put("REPORTTYPENUM", "12");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("6.2", map);
					} else if (rating.equals("7.1")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("7.1")) {
							map = this.getMapResult(ratingMap.get("7.1"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "7.1");
						map.put("REPORTTYPENUM", "13");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("7.1", map);
					} else if (rating.equals("7.2")) {
						Map map = new HashMap();
						if (ratingMap.containsKey("7.2")) {
							map = this.getMapResult(ratingMap.get("7.2"),
									reportMap);
						} else {
							map = Tools.cloneMap(reportMap, map);
						}
						map.put("REPORTTYPE", "7.2");
						map.put("REPORTTYPENUM", "14");
						map.put("REPORTDATE", reportDate);
						map.put("UPLOADDATE", uploaddate);
						map.put("REPORTBYTYPE", WordBookUtil
								.getWordBookItemName("invoiceReport", "03"));
						ratingMap.put("7.2", map);
					}
					uploadno = uploadno
							+ Getter.l(StringTool.checkString(reportMap
									.get("UPLOADED_NO")));
					uploadAmount = uploadAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("UPLOADED_AMOUNT")));
					inprono = inprono
							+ Getter.l(StringTool.checkString(reportMap
									.get("INPRO_NO")));
					inproAmount = inproAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("INPRO_AMOUNT")));
					rejectedno = rejectedno
							+ Getter.l(StringTool.checkString(reportMap
									.get("REJECTED_NO")));
					rejectedAmount = rejectedAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("REJECTED_AMOUNT")));
					acceptedno = acceptedno
							+ Getter.l(StringTool.checkString(reportMap
									.get("ACCEPTED_NO")));
					acceptedAmount = acceptedAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("ACCEPTED_AMOUNT")));
					reopenno = reopenno
							+ Getter.l(StringTool.checkString(reportMap
									.get("REOPEN_NO")));
					reopenAmount = reopenAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("REOPEN_AMOUNT")));
					inaucbidno = inaucbidno
							+ Getter.l(StringTool.checkString(reportMap
									.get("INAUCBID_NO")));
					inaucbidAmount = inaucbidAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("INAUCBID_AMOUNT")));
					inaucunbidno = inaucunbidno
							+ Getter.l(StringTool.checkString(reportMap
									.get("INAUCUNBID_NO")));
					inaucunbidAmount = inaucunbidAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("INAUCUNBID_AMOUNT")));
					delistedno = delistedno
							+ Getter.l(StringTool.checkString(reportMap
									.get("DELISTED_NO")));
					delistedAmount = delistedAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("DELISTED_AMOUNT")));
					dealedno = dealedno
							+ Getter.l(StringTool.checkString(reportMap
									.get("DEALED_NO")));
					dealedAmount = dealedAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("DEALED_AMOUNT")));
					undealedno = undealedno
							+ Getter.l(StringTool.checkString(reportMap
									.get("UNDEALED_NO")));
					undealedAmount = undealedAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("UNDEALED_AMOUNT")));
					undisbursedno = undisbursedno
							+ Getter.l(StringTool.checkString(reportMap
									.get("UNDISBURSED_NO")));
					undisbursedAmount = undisbursedAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("UNDISBURSED_AMOUNT")));
					disbursedno = disbursedno
							+ Getter.l(StringTool.checkString(reportMap
									.get("DISBURSED_NO")));
					disbursedAmount = disbursedAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("DISBURSED_AMOUNT")));
					settledno = settledno
							+ Getter.l(StringTool.checkString(reportMap
									.get("SETTLEDED_NO")));
					settledAmount = settledAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("SETTLEDED_AMOUNT")));
					overdueno = overdueno
							+ Getter.l(StringTool.checkString(reportMap
									.get("OVERDUE_NO")));
					overdueAmount = overdueAmount
							+ Getter.f(StringTool.checkString(reportMap
									.get("OVERDUE_AMOUNT")));
					totalMap.put("UPLOADED_NO", uploadno);
					totalMap.put("UPLOADED_AMOUNT", uploadAmount);
					totalMap.put("INPRO_NO", inprono);
					totalMap.put("INPRO_AMOUNT", inproAmount);
					totalMap.put("REJECTED_NO", rejectedno);
					totalMap.put("REJECTED_AMOUNT", rejectedAmount);
					totalMap.put("ACCEPTED_NO", acceptedno);
					totalMap.put("ACCEPTED_AMOUNT", acceptedAmount);
					totalMap.put("REOPEN_NO", reopenno);
					totalMap.put("REOPEN_AMOUNT", reopenAmount);
					totalMap.put("INAUCBID_NO", inaucbidno);
					totalMap.put("INAUCBID_AMOUNT", inaucbidAmount);
					totalMap.put("INAUCUNBID_NO", inaucunbidno);
					totalMap.put("INAUCUNBID_AMOUNT", inaucunbidAmount);
					totalMap.put("DELISTED_NO", delistedno);
					totalMap.put("DELISTED_AMOUNT", delistedAmount);
					totalMap.put("DEALED_NO", dealedno);
					totalMap.put("DEALED_AMOUNT", dealedAmount);
					totalMap.put("UNDEALED_NO", undealedno);
					totalMap.put("UNDEALED_AMOUNT", undealedAmount);
					totalMap.put("UNDISBURSED_NO", undisbursedno);
					totalMap.put("UNDISBURSED_AMOUNT", undisbursedAmount);
					totalMap.put("DISBURSED_NO", disbursedno);
					totalMap.put("DISBURSED_AMOUNT", disbursedAmount);
					totalMap.put("SETTLEDED_NO", settledno);
					totalMap.put("SETTLEDED_AMOUNT", settledAmount);
					totalMap.put("OVERDUE_NO", overdueno);
					totalMap.put("OVERDUE_AMOUNT", overdueAmount);
					totalMap.put("REPORTTYPE", "Total");
					totalMap.put("REPORTTYPENUM", "66");
					totalMap.put("REPORTDATE", reportDate);
					totalMap.put("UPLOADDATE", uploaddate);
				}
				// regionMap
				// cptypeMap
				// ratingMap
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("invoiceReport", "01"));
				regionMap.put("Total", totalMap);
				this.saveReportInfo(regionMap, conn, trimmerI);
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("invoiceReport", "02"));
				cptypeMap.put("Total", totalMap);
				this.saveReportInfo(cptypeMap, conn, trimmerI);
				totalMap.put("REPORTBYTYPE",
						WordBookUtil.getWordBookItemName("invoiceReport", "03"));
				ratingMap.put("Total", totalMap);
				this.saveReportInfo(ratingMap, conn, trimmerI);
			}
			conn.commit();
		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static Map getMapResult(Map map1, Map map2) {
		Map mapResult = new HashMap();
		mapResult.put(
				"UPLOADED_NO",
				Getter.l(map1.get("UPLOADED_NO"))
						+ Getter.f(map2.get("UPLOADED_NO")));
		mapResult.put("UPLOADED_AMOUNT", Getter.f(map1.get("UPLOADED_AMOUNT"))
				+ Getter.f(map2.get("UPLOADED_AMOUNT")));
		mapResult
				.put("INPRO_NO",
						Getter.l(map1.get("INPRO_NO"))
								+ Getter.l(map2.get("INPRO_NO")));
		mapResult.put("INPRO_AMOUNT", Getter.f(map1.get("INPRO_AMOUNT"))
				+ Getter.f(map2.get("INPRO_AMOUNT")));
		mapResult.put(
				"REJECTED_NO",
				Getter.l(map1.get("REJECTED_NO"))
						+ Getter.l(map2.get("REJECTED_NO")));
		mapResult.put("REJECTED_AMOUNT", Getter.f(map1.get("REJECTED_AMOUNT"))
				+ Getter.f(map2.get("REJECTED_AMOUNT")));
		mapResult.put(
				"ACCEPTED_NO",
				Getter.l(map1.get("ACCEPTED_NO"))
						+ Getter.l(map2.get("ACCEPTED_NO")));
		mapResult.put("ACCEPTED_AMOUNT", Getter.f(map1.get("ACCEPTED_AMOUNT"))
				+ Getter.f(map2.get("ACCEPTED_AMOUNT")));
		mapResult.put(
				"REOPEN_NO",
				Getter.l(map1.get("REOPEN_NO"))
						+ Getter.l(map2.get("REOPEN_NO")));
		mapResult.put("REOPEN_AMOUNT", Getter.f(map1.get("REOPEN_AMOUNT"))
				+ Getter.f(map2.get("REOPEN_AMOUNT")));
		mapResult.put(
				"INAUCBID_NO",
				Getter.l(map1.get("INAUCBID_NO"))
						+ Getter.l(map2.get("INAUCBID_NO")));
		mapResult.put("INAUCBID_AMOUNT", Getter.f(map1.get("INAUCBID_AMOUNT"))
				+ Getter.f(map2.get("INAUCBID_AMOUNT")));
		mapResult.put("INAUCUNBID_NO", Getter.l(map1.get("INAUCUNBID_NO"))
				+ Getter.l(map2.get("INAUCUNBID_NO")));
		mapResult.put(
				"INAUCUNBID_AMOUNT",
				Getter.f(map1.get("INAUCUNBID_AMOUNT"))
						+ Getter.f(map2.get("INAUCUNBID_AMOUNT")));
		mapResult.put(
				"DELISTED_NO",
				Getter.l(map1.get("DELISTED_NO"))
						+ Getter.l(map2.get("DELISTED_NO")));
		mapResult.put("DELISTED_AMOUNT", Getter.f(map1.get("DELISTED_AMOUNT"))
				+ Getter.f(map2.get("DELISTED_AMOUNT")));
		mapResult.put(
				"DEALED_NO",
				Getter.l(map1.get("DEALED_NO"))
						+ Getter.l(map2.get("DEALED_NO")));
		mapResult.put("DEALED_AMOUNT", Getter.f(map1.get("DEALED_AMOUNT"))
				+ Getter.f(map2.get("DEALED_AMOUNT")));
		mapResult.put(
				"UNDEALED_NO",
				Getter.l(map1.get("UNDEALED_NO"))
						+ Getter.l(map2.get("UNDEALED_NO")));
		mapResult.put("UNDEALED_AMOUNT", Getter.f(map1.get("UNDEALED_AMOUNT"))
				+ Getter.f(map2.get("UNDEALED_AMOUNT")));
		mapResult.put("UNDISBURSED_NO", Getter.l(map1.get("UNDISBURSED_NO"))
				+ Getter.l(map2.get("UNDISBURSED_NO")));
		mapResult.put(
				"UNDISBURSED_AMOUNT",
				Getter.f(map1.get("UNDISBURSED_AMOUNT"))
						+ Getter.f(map2.get("UNDISBURSED_AMOUNT")));
		mapResult.put("DISBURSED_NO", Getter.l(map1.get("DISBURSED_NO"))
				+ Getter.l(map2.get("DISBURSED_NO")));
		mapResult.put(
				"DISBURSED_AMOUNT",
				Getter.f(map1.get("DISBURSED_AMOUNT"))
						+ Getter.f(map2.get("DISBURSED_AMOUNT")));
		mapResult.put("SETTLEDED_NO", Getter.l(map1.get("SETTLEDED_NO"))
				+ Getter.l(map2.get("SETTLEDED_NO")));
		mapResult.put(
				"SETTLEDED_AMOUNT",
				Getter.f(map1.get("SETTLEDED_AMOUNT"))
						+ Getter.f(map2.get("SETTLEDED_AMOUNT")));
		mapResult.put(
				"OVERDUE_NO",
				Getter.l(map1.get("OVERDUE_NO"))
						+ Getter.l(map2.get("OVERDUE_NO")));
		mapResult.put("OVERDUE_AMOUNT", Getter.f(map1.get("OVERDUE_AMOUNT"))
				+ Getter.f(map2.get("OVERDUE_AMOUNT")));
		return mapResult;
	}

	@SuppressWarnings({ "rawtypes" })
	private static void saveReportInfo(Map<String, Map> reportmap,
			Connection conn, DataTrimmerI trimmerI) {
		try {
			Iterator it = reportmap.keySet().iterator();
			while (it.hasNext()) {
				TableRegisterCenter center = TableRegisterCenter.getInstance();
				Table table = center.findTable("IF_MGT_INVOICE_REPORT");
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
}
