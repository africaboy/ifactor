package com.entrofine.ifactor.gbv.utils;

import java.sql.Connection;
import java.util.Map;

import org.limp.mine.DataTrimmerI;

import jt.classic.system.user.IUser;
import jt.classic.system.user.UserManager;

/**
 * 流程操作助手
 * 
 * @author wangweifeng
 * 
 */
public class FlowHelper {

	/**
	 * 获取流程环节步骤最后执行用户
	 * 
	 * @param insId
	 * @param stepKey
	 * @param conn
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static IUser getMaxActivityUser(String insId, String stepKey,
			Connection conn) {

		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder
				.append("SELECT A.USER_ID ")
				.append("FROM WF_ACTIVITY A LEFT JOIN WF_STEP B ON A.S_ID = B.S_ID ")
				.append("WHERE A.INS_ID=? AND B.S_KEY=? ORDER BY A.A_ID DESC ");

		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		Map result = trimmerI.searchSingleData(sqlBuilder.toString(), insId,
				stepKey);

		IUser iuser = null;

		if (result != null && !"".equals(Getter.string(result.get("USER_ID")))) {

			UserManager um = new UserManager(conn);

			iuser = um.getUserById(Getter.string(result.get("USER_ID")));

		}

		return iuser;

	}

}
