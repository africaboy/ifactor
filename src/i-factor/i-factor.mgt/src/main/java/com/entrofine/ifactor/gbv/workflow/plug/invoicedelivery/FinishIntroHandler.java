package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import jt.classic.system.wordbook.WordBookUtil;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WStep;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.MachiningException;
import org.limp.basework.ProcessorException;
import org.limp.basework.SimpleBean;
import org.limp.basework.SimpleBean4Table;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.basework.impl.SimpleBean4TableImpl;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.limp.mine.StringTool;
import org.springframework.beans.factory.annotation.Autowired;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.api.service.TableSyncService;
import com.entrofine.ifactor.gbv.common.FlowStep;
import com.entrofine.ifactor.gbv.init.ParamSettingCenter;
import com.entrofine.ifactor.gbv.manager.InvoiceDeliveryApplyManager;
import com.entrofine.ifactor.gbv.utils.Getter;
import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

/**
 * handler event for invoice delivery data modify start
 * 
 * @author wangweifeng
 * 
 */
public class FinishIntroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@Autowired
	private TableSyncService tableSyncService;

	@SuppressWarnings({ "rawtypes" })
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");
		WStep nextStep = (WStep) bean.getResource().get("nextStep");
		String apprState = theActivity.istep().ikey();
		WInstanceManager wim = new WInstanceManager(conn);
		boolean isConfirm = false;
		if (theActivity.istep().ikey()
				.equals(FlowStep.invoiceDelivery_step09.getKey())) {
			CommonBean4HSQ cbh = (CommonBean4HSQ) bean.getResource().get("CBH");
			String yesorno = Getter.string(cbh.getResource().get("yesorno"));
			if (yesorno.equals("yes")) {
				apprState += "_" + nextStep.ikey();
				isConfirm = true;
			} else {
				apprState += "_" + nextStep.ikey() + "_0";
			}
			// Map opinionInfo =
			// wim.getActivityOpinionContent(theActivity.id());
			//
			// if (opinionInfo == null) {
			// throw new WorkflowException(
			// "There cant not find opinion in current activity!");
			// }
			// if (nextStep != null &&
			// "Accept".equals(opinionInfo.get("OPINION"))
			// && "Accept".equals(opinionInfo.get("CHECK_RESULT"))) {
			// apprState += "_" + nextStep.ikey();
			// isConfirm = true;
			// } else {
			// apprState += "_" + nextStep.ikey() + "_0";
			// }
		} else if (nextStep != null) {
			apprState += "_" + nextStep.ikey();
		}

		String insId = theActivity.instance().id();
		String ibaPkId = wim.getInstanceRelationObject(insId,
				"ifactor_invoice_delivery_apply");
		String apprStateVal = WordBookUtil.getWordBookItemName("ida_stauts",
				apprState);
		// update apply form status
		DataTrimmerI trimmerI = new DataTrimmerI(conn);

		InvoiceDeliveryApplyManager.updateInvoiceDeliveryApplyStatus(apprState,
				apprStateVal, ibaPkId, trimmerI);
		Map map = wim.getInstanceContent(insId, theActivity.instance().iflow()
				.iobject().itableView("ifactor_invoice_delivery_apply"));
		String id = WorkflowProxy.getAppPkId(map);
		List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();
		if (isConfirm) {
			String releaseDate = DateTrimmer.getYMD() + "000000";
			SimpleBean sb = new SimpleBeanImpl();
			BaseworkUtil util = new BaseworkUtil();
			sb.getResource().putAll(map);
			sb.getResource().put("RELEASE_DATE", releaseDate);
			try {
				util.manualUpdate("IF_MGT_INVOICE_APPLY", sb, conn);
			} catch (ProcessorException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			events.add(new TableSyncEvent("IF_MGT_INVOICE_APPLY", id,
					"RELEASE_DATE", releaseDate));
			String startDate = StringTool
					.checkString(map.get("IDA_CYCLESTART"));
			events.add(new TableSyncEvent("IF_MGT_INVOICE_APPLY", id,
					"IDA_CYCLESTART", startDate));
			String endDate = StringTool.checkString(map.get("IDA_CYCLEEND"));
			events.add(new TableSyncEvent("IF_MGT_INVOICE_APPLY", id,
					"IDA_CYCLEEND", endDate));
			events.add(generateInvoiceAuctionInfo(map, bean, conn, startDate,
					endDate));
		} else {
			String sql = "UPDATE IF_MGT_INVOICE_ORIVER SET ISACCEPTED = ? WHERE APP_PK_ID=?";
			trimmerI.execute(sql, "2");
			events.add(new TableSyncEvent("IF_MGT_INVOICE_APPLY", id,
					"IDA_STATUS", apprState));
		}
		WorkflowProxy.syncFlowTable(bean, events);
		return true;
	}

	/**
	 * insert invoice action info
	 * 
	 * @param iidaPkId
	 * @param conn
	 * @throws MachiningException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private TableSyncEvent generateInvoiceAuctionInfo(Map invoiceApplyInfo,
			SimpleBean simplebean, Connection conn, String startDate,
			String endDate) throws WorkflowException {

		SimpleBean4Table bean = new SimpleBean4TableImpl(
				"IF_MGT_INVOICE_AUCTION");

		bean.getResource()
				.put("IIDA_PK_ID", invoiceApplyInfo.get("IIDA_PK_ID"));
		bean.getResource().put("IDA_CODE", invoiceApplyInfo.get("IDA_CODE"));
		bean.getResource().put("INVOICE_ID",
				invoiceApplyInfo.get("INVOICE_NUMBER"));
		bean.getResource().put("APP_PK_ID", invoiceApplyInfo.get("APP_PK_ID"));
		bean.getResource().put("AUCTION_STATUS", "IAS_01");
		bean.getResource().put("AUCTION_STATUS_VAL",
				WordBookUtil.getWordBookItemName("auction_status", "IAS_03"));
		bean.getResource().put("START_TIME", startDate);
		bean.getResource().put("CLOSE_DATE", endDate);
		// 同步auction状态
		TableSyncEvent tableSyncEvent = new TableSyncEvent(
				"IF_MGT_INVOICE_AUCTION", Getter.string(invoiceApplyInfo
						.get("APP_PK_ID")), "AUCTION_STATUS", "IAS_03");
		// bean.getResource().put("TIMEOUT_TIME", endDate);
		// 计算超时时间，如果不考滤工作日的问题
		// TODO 如果需要考滤工作日的话另行计算

		ParamSettingCenter psCenter = ParamSettingCenter.getInsance();

		int timeOutHours = Getter.i(psCenter.get("IPS0001"));

		Calendar now = Calendar.getInstance();
		now.add(Calendar.HOUR_OF_DAY, timeOutHours);

		bean.getResource().put("TIMEOUT_TIME",
				new SimpleDateFormat("yyyyMMddHHmmss").format(now.getTime()));

		BaseworkUtil bu = new BaseworkUtil();

		try {
			bu.manualSave1(bean, conn);
		} catch (ProcessorException e) {
			throw new WorkflowException("auto generate invoice auction error!");
		}
		return tableSyncEvent;
	}
}
