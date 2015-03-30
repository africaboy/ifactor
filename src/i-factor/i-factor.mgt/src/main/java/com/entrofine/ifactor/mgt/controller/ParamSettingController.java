package com.entrofine.ifactor.mgt.controller;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;

import org.limp.basework.SimpleBean4Table;
import org.limp.basework.impl.SimpleBean4TableImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.SequenceGenerator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * ifactor param setting
 * 
 * @author wangweifeng
 * 
 */
@Controller
@RequestMapping(value = "ips")
public class ParamSettingController {

	/**
	 * add param setting to initialize
	 * 
	 * @return
	 */
	@RequestMapping(value = "add", method = RequestMethod.POST)
	@ResponseBody
	public Object addParamSetting() {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		Connection conn = null;

		try {

			conn = SystemDataSource.getInstance().getConnection();

			String ipsPkId = initNewParamSetting(conn);

			conn.commit();

			resultMap.put("success", true);
			resultMap.put("ipsPkId", ipsPkId);

		} catch (Exception e) {
			resultMap.put("success", false);
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}

		return resultMap;

	}

	/**
	 * initialize a new param setting
	 * 
	 * @param conn
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	private String initNewParamSetting(Connection conn) throws Exception {

		SimpleBean4Table bean = new SimpleBean4TableImpl(
				"IF_MGT_PARAM_SETTING");

		bean.getResource().put("PARAM_CODE", autoGenerateParamCode(conn));

		BaseworkUtil bu = new BaseworkUtil();

		bu.manualSave1(bean, conn);

		return Getter.string(bean.getResource().get("IPS_PK_ID"));

	}

	/**
	 * auto generate a param code
	 * 
	 * @param conn
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	private String autoGenerateParamCode(Connection conn) {

		String sql = "SELECT MAX(PARAM_CODE) AS PARAM_CODE FROM IF_MGT_PARAM_SETTING  ORDER BY PARAM_CODE DESC";

		DataTrimmerI trimmerI = new DataTrimmerI(conn);

		Map info = trimmerI.searchSingleData(sql);

		String paramCode = null;

		if (info != null && !info.get("PARAM_CODE").equals("")) {

			String maxParamCode = (String) info.get("PARAM_CODE");

			SequenceGenerator sg = new SequenceGenerator(maxParamCode, 7);

			sg.setNumberList(SequenceGenerator.numberListSimple);

			paramCode = sg.nextSequence();

		} else {

			paramCode = "IPS0001";

		}

		return paramCode;

	}

}
