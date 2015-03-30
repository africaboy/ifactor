package com.entrofine.ifactor.gbv.workflow.plug.buyer;

import java.sql.Connection;

import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;

/**
 * handle event for buyer apply end
 * 
 * @author wangweifeng
 * 
 */
public class ApplyRegistOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		// TODO something after buyer apply step finish

		return true;
	}
}
