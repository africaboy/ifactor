package com.entrofine.ifactor.gbv.workflow.plug.sme;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;

/**
 * double check completeness and correctness intro handler
 * 
 * @author mido
 * 
 */
public class DoubleCheckHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		// opinion from first check step
		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());

		if (opinionInfo == null) {
			throw new WorkflowException(
					"There cant not find opinion in current activity!");
		}

		return "Confirmed".equals(opinionInfo.get("OPINION"));
	}

}
