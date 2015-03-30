package com.entrofine.ifactor.gbv.utils;

import java.sql.Connection;

import org.limp.mine.DataTrimmerI;

/**
 * blacklist helper
 * 
 * @author hezhch
 */
public class BlacklistHelper {

	/**
	 * checkout blacklist
	 * 
	 * @param pkid
	 * @param conn
	 * @return
	 */
	public static boolean checkBlacklist(String cpnumber, String bltype,
			String flowType, Connection conn) {
		DataTrimmerI trimmer = new DataTrimmerI(conn);
		boolean info = false;
		StringBuffer str = new StringBuffer();
		str.append("SELECT BLSTATUS FROM IF_MGT_BLACKLIST WHERE CPNUMBER=? "
				+ "AND BLSTATUS=0 AND FLOWTYPE = ?");
		if (bltype != null && !bltype.equals("")) {
			str.append(" AND BLTYPEID=?");
			info = trimmer.haveMoreData(str.toString(), cpnumber, flowType,
					bltype);
		} else {
			info = trimmer.haveMoreData(str.toString(), cpnumber, flowType);
		}
		return info;
	}
}
