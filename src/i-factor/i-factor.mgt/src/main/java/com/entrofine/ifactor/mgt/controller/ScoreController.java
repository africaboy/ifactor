package com.entrofine.ifactor.mgt.controller;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;

import org.limp.mine.DataTrimmerI;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entrofine.ifactor.gbv.init.ParamSettingCenter;
import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * 评分处理
 * 
 * @author wangweifeng
 * 
 */
@Controller
@RequestMapping(value = "score")
public class ScoreController {

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "loadItem")
	@ResponseBody
	public Object loadExitedItem(
			@RequestParam(value = "itemCode", required = true) String itemCode,
			@RequestParam(value = "cpTypeVal", required = true) String cpTypeVal) {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);

			Map result = trimmerI
					.searchSingleData(
							"SELECT * FROM IF_MGT_SCORING_ITEMS WHERE ITEM_CODE=? AND CP_TYPE_VAL = ?",
							itemCode, cpTypeVal);

			if (result == null) {
				result = new HashMap();
			}

			resultMap.put("success", true);
			resultMap.put("data", result);

		} catch (Exception e) {
			resultMap.put("success", false);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}

		return resultMap;

	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "isSystemCalculate")
	@ResponseBody
	public Object isSystemCalculate() {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		try {
			ParamSettingCenter psCenter = ParamSettingCenter.getInsance();
			String ifSystemCheck = Getter.string(psCenter.get("IPS0006"));
			Map result = new HashMap();
			result.put("ifSystemCheck", ifSystemCheck);
			resultMap.put("success", true);
			resultMap.put("data", result);

		} catch (Exception e) {
			resultMap.put("success", false);
			e.printStackTrace();
		}
		return resultMap;

	}
}
