package com.entrofine.ifactor.gbv.workflow.plug.buyer;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;

/**
 * handler event for buyer first check start
 * 
 * @author wangweifeng
 * 
 */
public class DoubleCheckIntroHandler extends AbstractSimpleBean implements
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

		if ("Confirmed".equals(opinionInfo.get("OPINION"))) {
			// find last double check person
			/*
			 * IUser iuser =
			 * FlowHelper.getMaxActivityUser(theActivity.instance() .id(),
			 * FlowStep.buyer_step04.getKey(), conn);
			 * 
			 * if (iuser != null) {
			 * 
			 * Object[] receiver = (Object[]) bean.getResource().get(
			 * "receiver"); if (receiver[0] == null) { receiver = new Object[2];
			 * receiver[0] = iuser; receiver[1] = iuser.igroup(); } }
			 */

			return true;
		}

		return false;
	}

}
