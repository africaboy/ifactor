package com.entrofine.ifactor.gbv.utils;

import java.sql.Connection;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.limp.mine.DataTrimmerI;
import org.limp.mine.StringTool;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

/**
 * scoring helper
 * 
 * @author hezhch
 * 
 * @2014年7月12日
 */
public class ScoringHelper {

	/**
	 * get score results
	 * 
	 * @param conn
	 * @param brnumber
	 *            Business registration number
	 * @param enterprise
	 *            enterprise(SME OR MSEME)
	 * @return return scoringresult map info
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map<String, String> getScoreResults(Connection conn,
			String brnumber, String enterprise, String ratingValue) {
		if (enterprise.equals("03")) {
			enterprise = "sc_msme";
		} else {
			enterprise = "sc_sme";
		}
		DataTrimmerI trimmer = new DataTrimmerI(conn);
		String fssql = "SELECT * FROM IF_MGT_CP_FS FS"
				+ " LEFT JOIN IF_MGT_CP_FSASSET ASSET ON FS.FSID = ASSET.FSID"
				+ " LEFT JOIN IF_MGT_CP_FSEL FSEL ON FS.FSID = FSEL.FSID"
				+ " LEFT JOIN IF_MGT_CP_FSOR FSOR ON FS.FSID = FSOR.FSID"
				+ " WHERE FS.BRNUMBER=? AND FS.YEARTYPE=1";
		// get fs N-1 info
		Map fsnMap = trimmer.searchSingleData(fssql, brnumber);
		fsnMap.put("LENDERSNUMBER", ratingValue.equals("") ? "0" : ratingValue);
		List itemsList = trimmer.searchMultiData(
				"SELECT * FROM IF_MGT_SCORING_ITEMS WHERE CP_TYPE = ?",
				enterprise);
		// 所有code对应的值放到map中
		Map<String, Object> codeVal = new HashMap<String, Object>();
		// 将所有的type类型为function的放到map中，key为code,value为code对应map数据
		Map<String, Map> itemsMap = new HashMap<String, Map>();
		// 将所有不是常量的值放进list
		List<Map> functionList = new ArrayList<Map>();
		for (int i = 0; i < itemsList.size(); i++) {
			Map map = (Map) itemsList.get(i);
			String itemCode = StringTool.checkString(map.get("ITEM_CODE"));
			String itemType = StringTool.checkString(map.get("ITEM_TYPE"));
			if (itemType.equals("1")) {
				String constantVal = StringTool.checkString(map
						.get("ITEM_VALUE"));
				if (!constantVal.equals("")) {
					codeVal.put(itemCode, constantVal);
				} else {
					codeVal.put(itemCode, null);
				}
			} else {
				functionList.add(map);
				itemsMap.put(itemCode, map);
			}
		}
		ExpressionParser parser = new SpelExpressionParser();
		StandardEvaluationContext context = new StandardEvaluationContext();
		try {
			context.registerFunction("Ln", Math.class.getDeclaredMethod("log",
					new Class[] { double.class }));
		} catch (Exception e) {
			e.printStackTrace();
		}
		for (Map map : functionList) {
			String itemCode = StringTool.checkString(map.get("ITEM_CODE"));
			if (!codeVal.containsKey(itemCode)) {
				codeVal = getCodeValue(codeVal, itemsMap, fsnMap, parser,
						itemCode, false, context);
			}
		}

		List ratingList = trimmer.searchMultiData(
				"SELECT * FROM IF_MGT_SCORING_RATING WHERE CP_TYPE = ?",
				enterprise.equals("sc_sme") ? "01" : "02");
		double pd = 0;
		if (enterprise.equals("sc_sme")) {
			pd = Double.valueOf(StringTool.checkString(codeVal.get("C22"))) * 100;
		} else {
			pd = Double.valueOf(StringTool.checkString(codeVal.get("C23"))) * 100;
		}
		for (int i = 0; i < ratingList.size(); i++) {
			Map ratingMap = (Map) ratingList.get(i);
			String pdLow = StringTool.checkString(ratingMap.get("PDLOW"));
			String pdHigh = StringTool.checkString(ratingMap.get("PDHIGH"));
			if (pdLow.equals(pdHigh)) {
				String ratingResult = StringTool.checkString(ratingMap
						.get("RATING_LEVEL_VAL"));
				codeVal.put("risklevel", ratingResult.substring(0, 1));
				codeVal.put("risklevellabel", ratingResult);
				break;
			} else {
				boolean rating = parser.parseExpression(
						pd + ">=" + pdLow + "&&" + pd + "<" + pdHigh).getValue(
						context, boolean.class);
				if (rating) {
					String ratingResult = StringTool.checkString(ratingMap
							.get("RATING_LEVEL_VAL"));
					codeVal.put("risklevel", ratingResult.substring(0, 1));
					codeVal.put("risklevelid",
							Getter.string(ratingMap.get("RATING_LEVEL")));
					codeVal.put("risklevellabel", ratingResult);
					codeVal.put("rating", ratingMap.get("RATING"));
					break;
				}
			}
		}
		Map<String, String> scoreMap = new HashMap<String, String>();
		// NumberFormat nf = NumberFormat.getNumberInstance();
		// nf.setMaximumFractionDigits(4);
		DecimalFormat df = new DecimalFormat(".0000");
		scoreMap.put("CATEGORY1", df.format(codeVal.get("Y5")));
		scoreMap.put("CATEGORY2", df.format(codeVal.get("Y6")));
		scoreMap.put("CATEGORY3", df.format(codeVal.get("Y7")));
		scoreMap.put("CATEGORY4", df.format(codeVal.get("Y8")));
		scoreMap.put("CATEGORY5", df.format(codeVal.get("Y9")));
		scoreMap.put("CATEGORY6", df.format(codeVal.get("Y10")));
		scoreMap.put("RISKLEVEL",
				StringTool.checkString(codeVal.get("risklevel")));
		scoreMap.put("RISKLEVELID",
				StringTool.checkString(codeVal.get("risklevelid")));
		scoreMap.put("RISKLEVELLABEL",
				StringTool.checkString(codeVal.get("risklevellabel")));
		scoreMap.put("RATING", StringTool.checkString(codeVal.get("rating")));
		if (enterprise.equals("sc_msme")) {
			scoreMap.put("CATEGORY7", df.format(codeVal.get("Y11")));
			scoreMap.put("LENDERSNUMBER", df.format(codeVal.get("Y12")));
			scoreMap.put("RESULT", df.format(codeVal.get("C19")));
		} else {
			scoreMap.put("LENDERSNUMBER", df.format(codeVal.get("Y11")));
			scoreMap.put("RESULT", df.format(codeVal.get("C18")));
		}
		return scoreMap;
	}

	@SuppressWarnings("rawtypes")
	private static Map<String, Object> getCodeValue(
			Map<String, Object> codeVal, Map<String, Map> itemsMap, Map fsnMap,
			ExpressionParser parser, String code, boolean isIcode,
			StandardEvaluationContext context) {
		if (!codeVal.containsKey(code)) {
			Map map = itemsMap.get(code);
			// System.out.println(map == null ? "12345" + code : code);
			String codenames = StringTool.checkString(map.get("CODE_NAME"));
			String fieldnames = StringTool.checkString(map.get("FIELD_NAME"));
			String function = StringTool.checkString(map.get("ITEM_FUNC"));
			if (!fieldnames.equals("")) {
				String fieldnameArr[] = fieldnames.split(",");
				for (String fieldname : fieldnameArr) {
					// System.out.println(fieldname);
					String fieldValue = StringTool.checkString(fsnMap
							.get(fieldname));
					if (fieldValue.equals("")) {
						fieldValue = "null";
					} else {
						fieldValue = fieldValue + "F";
					}
					function = function.replaceAll(fieldname, fieldValue);
				}
			}
			if (!code.substring(0, 1).equals("E")
					&& !code.substring(0, 1).equals("I")) {
				if (!codenames.equals("")) {
					// System.out.println(function);
					function = getFunction(function, codenames, codeVal,
							itemsMap, fsnMap, parser, false, context);
				}
				// System.out.println(function + "00000");
				Object value = parser.parseExpression(function).getValue(
						context, Object.class);
				codeVal.put(code, value);
			} else {
				if (code.substring(0, 1).equals("E")) {
					String icode = "I" + code.substring(1);
					if ((!itemsMap.containsKey(icode)
							&& !codeVal.containsKey(icode) && !codenames
								.equals("")) || (isIcode)) {
						function = getFunction(function, codenames, codeVal,
								itemsMap, fsnMap, parser, true, context);
					}
					// System.out.println(function + "111111");
					Object value = parser.parseExpression(function).getValue(
							context, Object.class);
					codeVal.put(code, value);
				} else if (code.substring(0, 1).equals("I")) {
					String ecode = "E" + code.substring(1);
					String functionArr[] = function.split(";");
					for (String func : functionArr) {
						if (func.indexOf("?") != -1) {
							int index1 = func.indexOf("?");
							int index2 = func.indexOf(":");
							String func1 = func.substring(0, index1);
							if (!codenames.equals("")) {
								func1 = getFunction(func1, codenames, codeVal,
										itemsMap, fsnMap, parser, false,
										context);
							}
							// System.out.println(func1 + "2222222");
							boolean value = parser.parseExpression(func1)
									.getValue(context, Boolean.class);
							if (value) {
								String func2 = func.substring(index1 + 1,
										index2);
								if (func2.equals("null")) {
									codeVal.put(code, "null");
								} else {
									func2 = getFunction(func2, codenames,
											codeVal, itemsMap, fsnMap, parser,
											false, context);
									// System.out.println(func2 + "33333333");
									Object value1 = parser.parseExpression(
											func2).getValue(context,
											Object.class);
									codeVal.put(code, value1);
								}
								codeVal.put(ecode, "null");
								break;
							} else {
								String func3 = func.substring(index2 + 1);
								if (!func3.equals("null")) {
									func3 = getFunction(func3, codenames,
											codeVal, itemsMap, fsnMap, parser,
											true, context);
									// System.out.println(func3 + "444444444");
									Object value1 = parser.parseExpression(
											func3).getValue(context,
											Object.class);
									codeVal.put(code, value1);
									codeVal.put(ecode, value1);
								}
							}
						} else {
							func = getFunction(func, codenames, codeVal,
									itemsMap, fsnMap, parser, true, context);
							// System.out.println(func);
							Object value1 = parser.parseExpression(func)
									.getValue(context, Object.class);
							codeVal.put(code, value1);
							codeVal.put(ecode, value1);
							break;
						}
					}
				}
			}
		}
		return codeVal;
	}

	private static String getFunction(String function, String codenames,
			Map<String, Object> codeVal, Map<String, Map> itemsMap, Map fsnMap,
			ExpressionParser parser, boolean isIcode,
			StandardEvaluationContext context) {
		String codenameArr[] = codenames.split(",");
		for (String codename : codenameArr) {
			if (!codeVal.containsKey(codename)) {
				codeVal = getCodeValue(codeVal, itemsMap, fsnMap, parser,
						codename, isIcode, context);
			}
			String codevalue = StringTool.checkString(codeVal.get(codename));
			if (codevalue.equals("") || codevalue.equals("null")) {
				codevalue = "null";
			} else {
				codevalue = codevalue + "F";
			}
			function = function.replaceAll(codename, codevalue);
		}
		return function;
	}
}
