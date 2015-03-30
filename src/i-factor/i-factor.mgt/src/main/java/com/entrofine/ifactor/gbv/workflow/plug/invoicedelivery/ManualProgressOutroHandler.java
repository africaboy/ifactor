package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WStep;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.entrofine.ifactor.gbv.common.FlowStep;

/**
 * handle event for first check end
 * 
 * @author wangweifeng
 * 
 */
public class ManualProgressOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	private Logger logger = LoggerFactory
			.getLogger(ManualProgressOutroHandler.class);

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WStep nextStep = (WStep) bean.getResource().get("nextStep");

		if (nextStep.ikey().equals(FlowStep.invoiceDelivery_step05.getKey())) {
			// reject
			WActivity theActivity = (WActivity) bean.getResource().get(
					"theActivity");

			WInstanceManager wim = new WInstanceManager(conn);

			Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());

			if (opinionInfo != null) {
				String reason = (String)opinionInfo.get("REJECT_RESON_VAL");
				String remark = (String)opinionInfo.get("OPINION_TXT");
				
				logger.debug("Send Email or SMS to SME to notice!!");
			}

			logger.debug("Send Email or SMS to SME to notice!!");
			// TODO send email or SMS

		}

		return true;
	}
}
