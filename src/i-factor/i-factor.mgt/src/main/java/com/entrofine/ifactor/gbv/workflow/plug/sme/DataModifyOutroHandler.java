package com.entrofine.ifactor.gbv.workflow.plug.sme;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.mine.DataTrimmerI;

/**
 * data modify outro handler
 * 
 * @author mido
 * 
 */
public class DataModifyOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		Map content = wim.getInstanceContent(
				theActivity.instance().id(),
				theActivity.instance().iflow().iobject()
						.itableView("if_cp_apply_add"));

		String pkId = (String) content.get("PK_ID");

		String sql = "UPDATE IF_MGT_CP_APPLY SET DATAMODIFY = 1 WHERE PK_ID = ?";

		DataTrimmerI trimmer = new DataTrimmerI(conn);

		if (trimmer.execute(sql, pkId) == false) {
			throw new WorkflowException("data-modify step outro handler errro.");
		}

		return false;
	}

}
