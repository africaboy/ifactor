package com.entrofine.ifactor.workflow.plug.invoiceOriVer;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;

public class VerificationOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings("rawtypes")
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");
		WInstanceManager wim = new WInstanceManager(conn);
		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());
		if (opinionInfo != null) {
			if ("Reject".equals(opinionInfo.get("OPINION"))) {
				// refuse it
				theActivity.instance().iyesorno("no");
			}
		}
		return true;
	}
}
