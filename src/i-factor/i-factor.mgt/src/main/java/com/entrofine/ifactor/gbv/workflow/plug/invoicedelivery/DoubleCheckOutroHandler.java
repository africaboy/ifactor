package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.mine.DataTrimmerI;

public class DoubleCheckOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings("rawtypes")
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");
		WInstanceManager wim = new WInstanceManager(conn);
		Map content = wim.getInstanceContent(
				theActivity.instance().id(),
				theActivity.instance().iflow().iobject()
						.itableView("ifactor_invoice_delivery_apply"));
		// 更新修改字段的状态
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		trimmerI.execute(
				"UPDATE IF_MGT_DMODIFY_RECORD SET STATUS=? WHERE APP_PK_ID=? AND WORK_FLOW=? AND STATUS=?",
				3, content.get("APP_PK_ID"), "invoiceDeliveryFlow", 2);

		return true;
	}
}
