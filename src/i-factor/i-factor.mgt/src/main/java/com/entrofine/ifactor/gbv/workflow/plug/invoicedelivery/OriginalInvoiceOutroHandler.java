package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;

/**
 * handle invoice delivery double manual check event
 * 
 * @author wangweifeng
 * 
 */
public class OriginalInvoiceOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings("rawtypes")
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());

		if (opinionInfo != null) {
			if (!("Accept".equals(opinionInfo.get("OPINION")) && "Accept"
					.equals(opinionInfo.get("CHECK_RESULT")))) {
				// refuse it
				theActivity.instance().iyesorno("no");
			}
		}
		return true;
	}
}
