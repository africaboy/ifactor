package com.entrofine.ifactor.gbv.workflow.plug.buyer;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;

import com.entrofine.ifactor.gbv.common.FlowStep;

/**
 * finish event for buyer flow
 * 
 * @author wangweifeng
 * 
 */
public class FinishIntroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings({ "rawtypes" })
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());

		if (opinionInfo == null) {
			return true;
		}
		// document check
		else if (theActivity.istep().ikey()
				.equals(FlowStep.buyer_step08.getKey())
				&& "Modify".equals(opinionInfo.get("OPINION"))) {

			return false;

		}
		return true;
	}
}
