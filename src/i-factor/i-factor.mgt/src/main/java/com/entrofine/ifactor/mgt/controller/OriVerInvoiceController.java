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

import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * original invoice controller
 * 
 * @author hezhch
 */
@Controller
@RequestMapping(value = "/oriver")
public class OriVerInvoiceController {
	@RequestMapping(value = "getCheckResult")
	@ResponseBody
	public Object getCheckResult(
			@RequestParam(value = "appPkId", required = true) String appPkId) {
		Connection conn = null;
		Map<String, Object> resultMap = new HashMap<String, Object>();
		boolean info = false;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmer = new DataTrimmerI(conn);
			String sql = "SELECT ISVERIFICATION FROM IF_MGT_INVOICE_ORIVER WHERE APP_PK_ID=?";
			Map infoMap = trimmer.searchSingleData(sql, appPkId);
			if (infoMap != null) {
				String isVerification = Getter.string(infoMap
						.get("ISVERIFICATION"));
				if (isVerification.equals("1")) {
					info = true;
				}
			}
			Map map = new HashMap();
			map.put("info", info);
			resultMap.put("data", map);
			resultMap.put("success", true);
		} catch (Exception e) {
			resultMap.put("success", false);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return resultMap;
	}
}
