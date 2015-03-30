package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

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
 * handler event for invoice delivery data modify start
 * 
 * @author wangweifeng
 * 
 */
public class FinishOutroHandler extends AbstractSimpleBean implements
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

		if (theActivity.istep().ikey()
				.equals(FlowStep.invoiceDelivery_step09.getKey())
				&& "Reject".equals(opinionInfo.get("OPINION"))) {
			theActivity.instance().iyesorno("no");
		}

		return true;
	}
}
