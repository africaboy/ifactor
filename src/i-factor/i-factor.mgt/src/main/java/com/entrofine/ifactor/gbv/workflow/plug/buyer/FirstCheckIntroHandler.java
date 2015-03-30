package com.entrofine.ifactor.gbv.workflow.plug.buyer;

import java.sql.Connection;

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
public class FirstCheckIntroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		return true;
	}

}
