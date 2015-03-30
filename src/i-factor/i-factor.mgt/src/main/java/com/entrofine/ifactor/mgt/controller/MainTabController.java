package com.entrofine.ifactor.mgt.controller;

import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jt.classic.system.context.ISystemContext;
import jt.classic.system.database.SystemDataSource;
import jt.classic.system.user.IUser;

import org.limp.mine.DataTrimmer;
import org.limp.mine.QueryJack;
import org.limp.mine.QueryJackFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entrofine.ifactor.gbv.common.FlowStep;
import com.entrofine.ifactor.gbv.common.Role;

/**
 * my tab to do list
 * 
 * @author wangweifeng
 * 
 */
@Controller
@RequestMapping(value = "/maintab")
public class MainTabController {

	/**
	 * get all flow type for current user
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "getUserTodoList", method = RequestMethod.POST)
	@ResponseBody
	public Object getUserTodoList(HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		IUser iuser = ISystemContext.getSessionUser(request);

		StringBuilder sqlBaseBuilder = new StringBuilder();
		sqlBaseBuilder
				.append("SELECT DISTINCT(A.INS_OBJECT) ")
				.append("FROM  WF_INSTANCE A LEFT JOIN WF_ACTIVITY B ON A.INS_ID = B.INS_ID ")
				.append("LEFT JOIN WF_STEP C ON C.S_ID = B.S_ID ")
				.append("WHERE A.INS_STATE=0 ").append("AND (");

		// add basic todo restrict
		sqlBaseBuilder
				.append("((B.A_STATE = 0 OR B.A_STATE = 1) AND B.USER_ID='")
				.append(iuser.id()).append("')");

		// add buyer flow first check
		if (iuser.irole(Role.role_002.getKey()) != null) {
			sqlBaseBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step02.getKey()).append("')");
		}

		// add invoice delivery flow first check
		if (iuser.irole(Role.role_002.getKey()) != null) {
			sqlBaseBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.invoiceDelivery_step02.getKey())
					.append("')");
		}

		// add buyer flow double check
		if (iuser.irole(Role.role_003.getKey()) != null) {
			sqlBaseBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step04.getKey()).append("')");
		}

		// add invoice delivery flow double check
		if (iuser.irole(Role.role_003.getKey()) != null) {
			sqlBaseBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.invoiceDelivery_step06.getKey())
					.append("')");
		}

		// add buyer flow document sign
		if (iuser.irole(Role.role_004.getKey()) != null) {
			sqlBaseBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step07.getKey()).append("')");
		}

		sqlBaseBuilder.append(")");

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();
			DataTrimmer trimmer = new DataTrimmer(conn);
			List resultList = trimmer
					.searchMultiData(sqlBaseBuilder.toString());
			resultMap.put("success", true);
			resultMap.put("userTodoList", resultList);
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
	 * buyer apply to do list
	 * 
	 * @param start
	 * @param limit
	 * @param request
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "buyerApplyTodoList", method = RequestMethod.POST)
	@ResponseBody
	public Object buyerApplyTodoList(
			@RequestParam(value = "start", required = true) int start,
			@RequestParam(value = "limit", required = true) int limit,
			HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		IUser iuser = ISystemContext.getSessionUser(request);

		StringBuilder baseCountSqlBuilder = new StringBuilder();
		baseCountSqlBuilder
				.append("SELECT COUNT(*)  AS COUNT ")
				.append("FROM (SELECT * FROM WF_INSTANCE WHERE INS_STATE=0 AND INS_OBJECT='buyerApplyObject') A ")
				.append("LEFT JOIN WF_ACTIVITY B ON A.INS_ID = B.INS_ID ")
				.append("LEFT JOIN WF_STEP C ON C.S_ID = B.S_ID ")
				.append("LEFT JOIN (SELECT * FROM WF_INSTANCE_OBJ WHERE TABLENAME = 'IF_MGT_BUYER_APPLY') D ON D.INS_ID = A.INS_ID ")
				.append("LEFT JOIN IF_MGT_BUYER_APPLY E ON D.KEYVALUE= E.IBA_PK_ID ")
				.append("WHERE 1=1 ").append("AND (");

		StringBuilder baseSqlBuilder = new StringBuilder();
		baseSqlBuilder
				.append("SELECT B.A_ID,B.A_STIME,B.A_LASTEXECUTOR,E.IBA_PK_ID,E.BA_APPLY_CODE,E.BA_STATUS_VAL ")
				.append("FROM (SELECT * FROM WF_INSTANCE WHERE INS_STATE=0 AND INS_OBJECT='buyerApplyObject') A ")
				.append("LEFT JOIN WF_ACTIVITY B ON A.INS_ID = B.INS_ID ")
				.append("LEFT JOIN WF_STEP C ON C.S_ID = B.S_ID ")
				.append("LEFT JOIN (SELECT * FROM WF_INSTANCE_OBJ WHERE TABLENAME = 'IF_MGT_BUYER_APPLY') D ON D.INS_ID = A.INS_ID ")
				.append("LEFT JOIN IF_MGT_BUYER_APPLY E ON D.KEYVALUE= E.IBA_PK_ID ")
				.append("WHERE 1=1 ").append("AND (");

		// add basic todo restrict
		baseCountSqlBuilder
				.append("((B.A_STATE = 0 OR B.A_STATE = 1) AND B.USER_ID='")
				.append(iuser.id()).append("')");
		baseSqlBuilder
				.append("((B.A_STATE = 0 OR B.A_STATE = 1) AND B.USER_ID='")
				.append(iuser.id()).append("')");

		// add buyer flow first check
		if (iuser.irole(Role.role_002.getKey()) != null) {
			baseCountSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step02.getKey()).append("')");
			baseSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step02.getKey()).append("')");
		}

		// add buyer flow double check
		if (iuser.irole(Role.role_003.getKey()) != null) {
			baseCountSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step04.getKey()).append("')");
			baseSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step04.getKey()).append("')");
		}

		// add buyer flow document sign
		if (iuser.irole(Role.role_004.getKey()) != null) {
			baseCountSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step07.getKey()).append("')");
			baseSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.buyer_step07.getKey()).append("')");
		}

		baseCountSqlBuilder.append(")");
		baseSqlBuilder.append(") 	ORDER BY B.A_STIME DESC ");

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();

			QueryJack plus = QueryJackFactory.getInstance().createQueryJack(
					false);
			int pageNO = start / limit;

			plus.setParameter(QueryJackFactory.PAGINATION_SQL1,
					baseCountSqlBuilder.toString());
			plus.setParameter(QueryJackFactory.PAGINATION_SQL2,
					baseSqlBuilder.toString());
			plus.setParameter(QueryJackFactory.DATABASE_CONNECTION, conn);
			plus.setParameter(QueryJackFactory.PAGINATION_LINKSTRING, "");
			plus.setParameter(QueryJackFactory.PAGINATION_COUNT, limit);
			plus.setParameter(QueryJackFactory.PAGINATION_PAGENO, pageNO);

			List resultList = plus.work();

			resultMap.put("success", true);
			resultMap.put("totalCount", plus.getLabel().totaldata());
			resultMap.put("buyerApplyTodoList", resultList);
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
	 * invoice delivery apply to do list
	 * 
	 * @param start
	 * @param limit
	 * @param request
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "invoiceDeliveryApplyTodoList", method = RequestMethod.POST)
	@ResponseBody
	public Object invoiceDeliveryApplyTodoList(
			@RequestParam(value = "start", required = true) int start,
			@RequestParam(value = "limit", required = true) int limit,
			HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		IUser iuser = ISystemContext.getSessionUser(request);

		StringBuilder baseCountSqlBuilder = new StringBuilder();
		baseCountSqlBuilder
				.append("SELECT COUNT(*)  AS COUNT ")
				.append("FROM (SELECT * FROM WF_INSTANCE WHERE INS_STATE=0 AND INS_OBJECT='invoiceDeliveryObject') A ")
				.append("LEFT JOIN WF_ACTIVITY B ON A.INS_ID = B.INS_ID ")
				.append("LEFT JOIN WF_STEP C ON C.S_ID = B.S_ID ")
				.append("LEFT JOIN (SELECT * FROM WF_INSTANCE_OBJ WHERE TABLENAME = 'IF_MGT_INVOICE_APPLY') D ON D.INS_ID = A.INS_ID ")
				.append("LEFT JOIN IF_MGT_INVOICE_APPLY E ON D.KEYVALUE= E.IIDA_PK_ID ")
				.append("WHERE 1=1 ").append("AND (");

		StringBuilder baseSqlBuilder = new StringBuilder();
		baseSqlBuilder
				.append("SELECT B.A_ID,B.A_STIME,B.A_LASTEXECUTOR,E.IIDA_PK_ID,E.IDA_CODE,E.IDA_STATUS_VAL ")
				.append("FROM (SELECT * FROM WF_INSTANCE WHERE INS_STATE=0 AND INS_OBJECT='invoiceDeliveryObject') A ")
				.append("LEFT JOIN WF_ACTIVITY B ON A.INS_ID = B.INS_ID ")
				.append("LEFT JOIN WF_STEP C ON C.S_ID = B.S_ID ")
				.append("LEFT JOIN (SELECT * FROM WF_INSTANCE_OBJ WHERE TABLENAME = 'IF_MGT_INVOICE_APPLY') D ON D.INS_ID = A.INS_ID ")
				.append("LEFT JOIN IF_MGT_INVOICE_APPLY E ON D.KEYVALUE= E.IIDA_PK_ID ")
				.append("WHERE 1=1 ").append("AND (");

		// add basic todo restrict
		baseCountSqlBuilder
				.append("((B.A_STATE = 0 OR B.A_STATE = 1) AND B.USER_ID='")
				.append(iuser.id()).append("')");
		baseSqlBuilder
				.append("((B.A_STATE = 0 OR B.A_STATE = 1) AND B.USER_ID='")
				.append(iuser.id()).append("')");

		// add invoice delivery flow first check
		if (iuser.irole(Role.role_002.getKey()) != null) {
			baseCountSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.invoiceDelivery_step02.getKey())
					.append("')");
			baseSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.invoiceDelivery_step02.getKey())
					.append("')");
		}

		// add invoice delivery flow double check
		if (iuser.irole(Role.role_003.getKey()) != null) {
			baseCountSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.invoiceDelivery_step06.getKey())
					.append("')");
			baseSqlBuilder
					.append(" OR (B.A_STATE = 0 AND B.USER_ID='-1' AND C.S_KEY='")
					.append(FlowStep.invoiceDelivery_step06.getKey())
					.append("')");
		}

		baseCountSqlBuilder.append(")");
		baseSqlBuilder.append(") 	ORDER BY B.A_STIME DESC ");

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();

			QueryJack plus = QueryJackFactory.getInstance().createQueryJack(
					false);
			int pageNO = start / limit;

			plus.setParameter(QueryJackFactory.PAGINATION_SQL1,
					baseCountSqlBuilder.toString());
			plus.setParameter(QueryJackFactory.PAGINATION_SQL2,
					baseSqlBuilder.toString());
			plus.setParameter(QueryJackFactory.DATABASE_CONNECTION, conn);
			plus.setParameter(QueryJackFactory.PAGINATION_LINKSTRING, "");
			plus.setParameter(QueryJackFactory.PAGINATION_COUNT, limit);
			plus.setParameter(QueryJackFactory.PAGINATION_PAGENO, pageNO);

			List resultList = plus.work();

			resultMap.put("success", true);
			resultMap.put("totalCount", plus.getLabel().totaldata());
			resultMap.put("invoiceDeliveryApplyTodoList", resultList);
		} catch (Exception e) {
			resultMap.put("success", false);
			SystemDataSource.rollbackConnection(conn);
			e.printStackTrace();
		} finally {
			SystemDataSource.closeConnection(conn);
		}

		return resultMap;
	}

}
