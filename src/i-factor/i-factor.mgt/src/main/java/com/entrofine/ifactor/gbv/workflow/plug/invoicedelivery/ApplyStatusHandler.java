package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import jt.classic.system.wordbook.WordBookUtil;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WStep;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.mine.DataTrimmerI;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.gbv.manager.InvoiceDeliveryApplyManager;
import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

/**
 * handle invoice apply status event
 * 
 * @author fengjj
 * 
 */
public class ApplyStatusHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings("rawtypes")
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WStep nextStep = (WStep) bean.getResource().get("nextStep");

		WInstanceManager wim = new WInstanceManager(conn);

		String apprState = theActivity.istep().ikey();

		if (nextStep != null) {
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
		if (apprState.equals("mVolpvvEFY_RyXlLYLUHF")) {
			Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());
			if (opinionInfo == null) {
				throw new WorkflowException(
						"There cant not find opinion in current activity!");
			}
			if ("Modify".equals(opinionInfo.get("OPINION"))) {
				String imageRemark = (String) opinionInfo.get("IMAGE_REMARK");
				events.add(new TableSyncEvent("IF_MGT_INVOICE_OPINION", id,
						"IMAGE_REMARK", imageRemark));
			}
		}
		events.add(new TableSyncEvent("IF_MGT_INVOICE_APPLY", id, "IDA_STATUS",
				apprState));
		WorkflowProxy.syncFlowTable(bean, events);
		return true;
	}
}
