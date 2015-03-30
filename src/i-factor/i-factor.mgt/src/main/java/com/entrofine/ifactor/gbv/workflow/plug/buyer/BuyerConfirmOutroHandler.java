package com.entrofine.ifactor.gbv.workflow.plug.buyer;

import java.sql.Connection;

import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WStep;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;

import com.entrofine.ifactor.gbv.common.FlowStep;

/**
 * handle event for buyer confirm end
 * 
 * 
 * @author wangweifeng
 * 
 */
public class BuyerConfirmOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WStep nextStep = (WStep) bean.getResource().get("nextStep");

		if (nextStep.ikey().equals(FlowStep.buyer_step10.getKey())) {
			// UnConfirmed
			// TODO send email/ SMS

		}

		return true;
	}
}
