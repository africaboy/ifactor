package com.entrofine.ifactor.mgt.controller;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jt.classic.system.ISystem;
import jt.classic.system.database.SystemDataSource;

import org.limp.basework.SimpleBean;
import org.limp.basework.Table;
import org.limp.basework.analyzer.TableRegisterCenter;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.StringTool;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * cs view record controller
 * 
 * @author hezhichao
 * 
 */
@Controller
@RequestMapping(value = "/csMonitorRecord")
public class CsMonitorController {
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "addMonitorRecord", method = RequestMethod.POST)
	@ResponseBody
	public Object insertCsMonitor(HttpServletRequest request,
			@RequestParam("flowType") String flowType,
			@RequestParam("pkId") String pkId,
			@RequestParam("userId") String userId) throws Exception {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append("SELECT * FROM");
		TableRegisterCenter center = TableRegisterCenter.getInstance();
		Table table = null;
		if (flowType.equals("seller")) {
			table = center.findTable("IF_MGT_CP_APPLY");
			sqlBuilder.append(" IF_MGT_CP_APPLY WHERE PK_ID = ?");
		} else if (flowType.equals("buyer")) {
			table = center.findTable("IF_MGT_BUYER_APPLY");
			sqlBuilder.append(" IF_MGT_BUYER_APPLY WHERE IBA_PK_ID = ?");
		} else if (flowType.equals("invoice")) {
			table = center.findTable("IF_MGT_INVOICE_APPLY");
			sqlBuilder.append(" IF_MGT_INVOICE_APPLY WHERE IIDA_PK_ID = ?");
		}
		Connection conn = null;
		BaseworkUtil util = new BaseworkUtil();
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			SimpleBean bean = new SimpleBeanImpl();
			Map info = trimmerI.searchSingleData(sqlBuilder.toString(), pkId);
			String userId1 = StringTool.checkString(info.get("USERID"));
			if (userId1.equals("")) {
				info.put("USERID", userId);
				bean.reload(info);
				util.manualUpdate(table, bean, conn);
				conn.commit();
			}
			request.setAttribute("result", "{success: true}");
		} catch (Exception e) {
			try {
				conn.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			request.setAttribute("result", "{success: false}");
			ISystem.catchException(this, e);
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return new ModelAndView("result");
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "updateRemindStatus", method = RequestMethod.POST)
	@ResponseBody
	public Object updateRemindStatus(HttpServletRequest request,
			@RequestParam("pkId") String pkId) throws Exception {
		String sql = "SELECT *　FROM IF_MGT_CP_APPLY WHERE PK_ID = ?";
		TableRegisterCenter center = TableRegisterCenter.getInstance();
		Table table = center.findTable("IF_MGT_CP_APPLY");
		Connection conn = null;
		BaseworkUtil util = new BaseworkUtil();
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			SimpleBean bean = new SimpleBeanImpl();
			Map info = trimmerI.searchSingleData(sql, pkId);
			info.put("REMIND", "called");
			bean.reload(info);
			util.manualUpdate(table, bean, conn);
			conn.commit();
			request.setAttribute("result", "{success: true}");
		} catch (Exception e) {
			try {
				conn.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			request.setAttribute("result", "{success: false}");
			ISystem.catchException(this, e);
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return new ModelAndView("result");
	}
}
