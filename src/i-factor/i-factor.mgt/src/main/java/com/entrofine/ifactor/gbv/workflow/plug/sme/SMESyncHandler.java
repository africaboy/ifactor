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
 * Sync SME Apply To Web, end-step outro handler
 * 
 * @author mido
 * 
 */
public class SMESyncHandler extends AbstractSimpleBean implements WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		Map content = wim.getInstanceContent(theActivity.instance().id(),
				theActivity.instance().iflow().iobject().itableView(
						"if_cp_apply_add"));
		
		// 调用同步接口

		return false;
	}

}
