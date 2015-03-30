package com.entrofine.ifactor.gbv.utils;

import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import jt.classic.system.database.SystemDataSource;
import jt.classic.system.user.IUser;
import jt.classic.system.user.UserManager;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WFlow;
import jt.classic.system.workflow.WInstance;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WorkflowException;
import jt.classic.system.workflow.WorkflowManager;
import jt.classic.system.workflow.engine.GrooveWorkflowEngine;

import org.limp.basework.SimpleBean;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.StringTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.api.service.InboxSyncService;
import com.entrofine.ifactor.api.service.TableSyncService;
import com.entrofine.ifactor.app.entity.Inbox;
import com.google.common.collect.Lists;

public enum WorkflowProxy {
	buyerApplyFlow, smeApplyFlow, invoiceDeliveryFlow, oriVerInvoiceFlow;

	private static final Logger LOG = LoggerFactory
			.getLogger(WorkflowProxy.class);
	private static final String APP_PK_ID = "APP_PK_ID";
	private static IUser user;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void flowHandle(Map<String, Object> context,
			HttpServletRequest request, String handleType) throws Exception {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss");

		CommonBean4HSQ cbh = new CommonBean4HSQ(request);
		Map resource = cbh.getResource();
		for (Entry<String, Object> entry : context.entrySet()) {
			Object value = entry.getValue();
			if (value == null) {
				continue;
			}

			String key = entry.getKey();
			if (value instanceof Date) {
				resource.put(key, format.format(value));
			} else {
				resource.put(key, value.toString());
			}
		}

		Connection conn = SystemDataSource.getInstance().getConnection();
		try {
			GrooveWorkflowEngine gwe = new GrooveWorkflowEngine(conn);
			if (handleType.equals("start")) {
				WorkflowManager wm = new WorkflowManager(conn);
				WFlow flow = wm.getWFlowByKey(name());
				gwe.catapult(flow, getUser(conn), cbh);
			} else if (handleType.equals("dataModify")) {
				WInstance ins = null;
				String appPkId = getAppPkId(resource);
				String pkId = "";
				if (name().equals("buyerApplyFlow")) {
					pkId = getPrimaryKeyVal(APP_PK_ID, appPkId,
							"IF_MGT_BUYER_APPLY", "IBA_PK_ID", conn);
					ins = getWInstance(pkId, "IF_MGT_BUYER_APPLY", conn);
					updateDataModifyStatus("buyerApplyFlow", appPkId, conn);
					updateBuyerFlowData(resource, pkId, conn);
				} else if (name().equals("smeApplyFlow")) {
					pkId = getPrimaryKeyVal(APP_PK_ID, appPkId,
							"IF_MGT_CP_APPLY", "PK_ID", conn);
					ins = getWInstance(pkId, "IF_MGT_CP_APPLY", conn);
					updateDataModifyStatus("smeApplyFlow", appPkId, conn);
					updateSellerFlowData(resource, pkId, conn);
				} else if (name().equals("invoiceDeliveryFlow")) {
					pkId = getPrimaryKeyVal(APP_PK_ID, appPkId,
							"IF_MGT_INVOICE_APPLY", "IIDA_PK_ID", conn);
					ins = getWInstance(pkId, "IF_MGT_INVOICE_APPLY", conn);
					updateDataModifyStatus("invoiceDeliveryFlow", appPkId, conn);
					updateInvoiceFlowData(resource, pkId, conn);
				} else if (name().equals("oriVerInvoiceFlow")) {
					pkId = getPrimaryKeyVal(APP_PK_ID, appPkId,
							"IF_MGT_INVOICE_ORIVER", "IOV_PK_ID", conn);
					ins = getWInstance(pkId, "IF_MGT_INVOICE_ORIVER", conn);
					updateInvoiceOriVerFlowData(resource, pkId, conn);
				}
				WActivity activity = ins.imaxactivity();
				IUser user = ins.icreator();
				gwe.run(activity, user, null, null, cbh);
			}
			SystemDataSource.commitConnection(conn);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			SystemDataSource.rollbackConnection(conn);
		} finally {
			SystemDataSource.closeConnection(conn);
		}
	}

	public static void syncFlowTable(SimpleBean bean, String tableName,
			String id, String fieldName, String fieldValue) {
		CommonBean4HSQ cbh = (CommonBean4HSQ) bean.getResource().get("CBH");
		ServletContext servletContext = cbh.getRequest().getSession()
				.getServletContext();
		ApplicationContext context = WebApplicationContextUtils
				.getWebApplicationContext(servletContext);

		context.getBean(TableSyncService.class).execute(
				Lists.newArrayList(new TableSyncEvent(tableName, id, fieldName,
						fieldValue)));
	}

	public static void syncFlowTable(SimpleBean bean, List<TableSyncEvent> list) {
		CommonBean4HSQ cbh = (CommonBean4HSQ) bean.getResource().get("CBH");
		ServletContext servletContext = cbh.getRequest().getSession()
				.getServletContext();
		ApplicationContext context = WebApplicationContextUtils
				.getWebApplicationContext(servletContext);

		context.getBean(TableSyncService.class).execute(list);
	}

	public static void syncInbox(SimpleBean bean, long applyId, String title,
			String content, String status) {
		CommonBean4HSQ cbh = (CommonBean4HSQ) bean.getResource().get("CBH");
		ServletContext servletContext = cbh.getRequest().getSession()
				.getServletContext();
		ApplicationContext context = WebApplicationContextUtils
				.getWebApplicationContext(servletContext);
		Inbox inbox = new Inbox();
		inbox.setApplyId(applyId);
		inbox.setTitle(title);
		inbox.setContent(content);
		inbox.setStatus(status);
		context.getBean(InboxSyncService.class).saveInbox(inbox);
	}

	@SuppressWarnings("rawtypes")
	public static String getAppPkId(Map context) {
		return StringTool.checkString(context.get(APP_PK_ID));
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void setAppPkId(Map context, Object id) {
		context.put(APP_PK_ID, id);
	}

	private static IUser getUser(Connection conn) {
		if (user == null) {
			user = new UserManager(conn)
					.getUserByLogID("user_from_ifactor_app");
		}
		return user;
	}

	private static void updateDataModifyStatus(String workFlow, String appPkId,
			Connection conn) {
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		trimmerI.execute(
				"UPDATE IF_MGT_DMODIFY_RECORD SET STATUS=? WHERE WORK_FLOW=? AND APP_PK_ID=? AND STATUS=?",
				"2", workFlow, appPkId, "1");
	}

	private static WInstance getWInstance(String pkId, String tableName,
			Connection conn) throws WorkflowException {
		WInstanceManager wim = new WInstanceManager(conn);
		WInstance ins = wim.getInstanceByObjectData(tableName, pkId);
		return ins;
	}

	@SuppressWarnings("rawtypes")
	private static String getPrimaryKeyVal(String foreignKey,
			String foreignKeyVal, String tableName, String pkField,
			Connection conn) {
		DataTrimmerI trimmer = new DataTrimmerI(conn);
		String sql = "SELECT " + pkField + " FROM " + tableName + " WHERE "
				+ foreignKey + "=?";
		Map info = trimmer.searchSingleData(sql, foreignKeyVal);
		String pkId = Getter.string(info.get(pkField));
		return pkId;
	}

	@SuppressWarnings({ "unchecked" })
	private static void updateBuyerFlowData(Map<String, String> dataMap,
			String pkId, Connection conn) throws Exception {
		SimpleBean sb = new SimpleBeanImpl();
		dataMap.put("IBA_PK_ID", pkId);
		sb.getResource().putAll(dataMap);
		BaseworkUtil util = new BaseworkUtil();
		util.manualUpdate("IF_MGT_BUYER_APPLY", sb, conn);

		String ibbipkid = getPrimaryKeyVal("IBA_PK_ID", pkId,
				"IF_MGT_BUYER_BASIC_INFO", "IBBI_PK_ID", conn);
		sb.getResource().put("IBBI_PK_ID", ibbipkid);
		util.manualUpdate("IF_MGT_BUYER_BASIC_INFO", sb, conn);

		String ibpipkid = getPrimaryKeyVal("IBA_PK_ID", pkId,
				"IF_MGT_BUYER_PRIVATE_INFO", "IBPI_PK_ID", conn);
		sb.getResource().put("IBPI_PK_ID", ibpipkid);
		util.manualUpdate("IF_MGT_BUYER_PRIVATE_INFO", sb, conn);

		String ibcipkid = getPrimaryKeyVal("IBA_PK_ID", pkId,
				"IF_MGT_BUYER_COMPANY_INFO", "IBCI_PK_ID", conn);
		sb.getResource().put("IBCI_PK_ID", ibcipkid);
		util.manualUpdate("IF_MGT_BUYER_COMPANY_INFO", sb, conn);
	}

	@SuppressWarnings({ "unchecked" })
	private static void updateSellerFlowData(Map<String, String> dataMap,
			String pkId, Connection conn) throws Exception {
		SimpleBean sb = new SimpleBeanImpl();
		dataMap.put("PK_ID", pkId);
		sb.getResource().putAll(dataMap);
		BaseworkUtil util = new BaseworkUtil();
		util.manualUpdate("IF_MGT_CP_APPLY", sb, conn);
	}

	@SuppressWarnings({ "unchecked" })
	private static void updateInvoiceFlowData(Map<String, String> dataMap,
			String pkId, Connection conn) throws Exception {
		SimpleBean sb = new SimpleBeanImpl();
		dataMap.put("IIDA_PK_ID", pkId);
		sb.getResource().putAll(dataMap);
		BaseworkUtil util = new BaseworkUtil();
		util.manualUpdate("IF_MGT_INVOICE_APPLY", sb, conn);

		String iidsipkid = getPrimaryKeyVal("IIDA_PK_ID", pkId,
				"IF_MGT_INVOICE_SELLER", "IIDSI_PK_ID", conn);
		sb.getResource().put("IIDSI_PK_ID", iidsipkid);
		util.manualUpdate("IF_MGT_INVOICE_SELLER", sb, conn);

		String iiddipkid = getPrimaryKeyVal("IIDA_PK_ID", pkId,
				"IF_MGT_INVOICE_DEBTOR", "IIDDI_PK_ID", conn);
		sb.getResource().put("IIDDI_PK_ID", iiddipkid);
		util.manualUpdate("IF_MGT_INVOICE_DEBTOR", sb, conn);

		String iidfipkid = getPrimaryKeyVal("IIDA_PK_ID", pkId,
				"IF_MGT_INVOICE_FINANC", "IIDFI_PK_ID", conn);
		sb.getResource().put("IIDFI_PK_ID", iidfipkid);
		util.manualUpdate("IF_MGT_INVOICE_FINANC", sb, conn);
	}

	@SuppressWarnings({ "unchecked" })
	private static void updateInvoiceOriVerFlowData(
			Map<String, String> dataMap, String pkId, Connection conn)
			throws Exception {
		SimpleBean sb = new SimpleBeanImpl();
		dataMap.put("IOV_PK_ID", pkId);
		sb.getResource().putAll(dataMap);
		BaseworkUtil util = new BaseworkUtil();
		util.manualUpdate("IF_MGT_INVOICE_ORIVER", sb, conn);

		String iidsipkid = getPrimaryKeyVal("IOV_PK_ID", pkId,
				"IF_MGT_INVOICE_ORIVER_SELLER", "IOVS_PK_ID", conn);
		sb.getResource().put("IOVS_PK_ID", iidsipkid);
		util.manualUpdate("IF_MGT_INVOICE_ORIVER_SELLER", sb, conn);

		String iiddipkid = getPrimaryKeyVal("IOV_PK_ID", pkId,
				"IF_MGT_INVOICE_ORIVER_DEBTOR", "IOVD_PK_ID", conn);
		sb.getResource().put("IOVD_PK_ID", iiddipkid);
		util.manualUpdate("IF_MGT_INVOICE_ORIVER_DEBTOR", sb, conn);

		String iidfipkid = getPrimaryKeyVal("IOV_PK_ID", pkId,
				"IF_MGT_INVOICE_ORIVER_FINANC", "IIDFI_PK_ID", conn);
		sb.getResource().put("IIDFI_PK_ID", iidfipkid);
		util.manualUpdate("IF_MGT_INVOICE_ORIVER_FINANC", sb, conn);
	}
}
