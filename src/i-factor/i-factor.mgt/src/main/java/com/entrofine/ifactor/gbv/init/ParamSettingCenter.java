package com.entrofine.ifactor.gbv.init;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import jt.classic.system.database.SystemDataSource;

import org.limp.mine.DataTrimmer;

/**
 * 参数管理中心
 * 
 * @author wangweifeng
 * 
 */
public class ParamSettingCenter {

	private static ParamSettingCenter paramSettingCenter;

	private Map<String, Object> paramSettingMap;

	public ParamSettingCenter() {

		paramSettingMap = new HashMap<String, Object>();

	}

	public synchronized static ParamSettingCenter getInsance() {

		if (paramSettingCenter == null) {

			paramSettingCenter = new ParamSettingCenter();

		}

		return paramSettingCenter;

	}

	/**
	 * 初始化参数注册中心
	 */
	@SuppressWarnings("unchecked")
	public synchronized void init() {

		if (!paramSettingMap.isEmpty()) {

			paramSettingMap.clear();

		}

		String sql = "SELECT PARAM_CODE,PARAM_VALUE FROM IF_MGT_PARAM_SETTING";

		Connection conn = null;

		try {

			conn = SystemDataSource.getInstance().getConnection();

			DataTrimmer trimmer = new DataTrimmer(conn);

			paramSettingMap.putAll(trimmer.searchSymmetricalData(sql,
					"PARAM_CODE", "PARAM_VALUE"));

		} catch (Exception e) {
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	/**
	 * 获取参数
	 * 
	 * @param key
	 * @return
	 */
	public Object get(String key) {

		return paramSettingMap.get(key);

	}

	/**
	 * 设置参数
	 * 
	 * @param key
	 * @param value
	 */
	public void set(String key, Object value) {

		paramSettingMap.put(key, value);

	}

}
