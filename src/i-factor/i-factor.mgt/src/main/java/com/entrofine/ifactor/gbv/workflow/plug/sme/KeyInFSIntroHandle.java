package com.entrofine.ifactor.gbv.workflow.plug.sme;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;

public class KeyInFSIntroHandle extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings({ "rawtypes" })
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());

		if (opinionInfo == null) {
			throw new WorkflowException(
					"There cant not find opinion in current activity!");
		}
		if (theActivity.istep().ikey().equals("KJtCGqzGmT")) {
			return "FSModify".equals(opinionInfo.get("OPINION"));
		}
		return "Confirmed".equals(opinionInfo.get("OPINION"));
	}
}
