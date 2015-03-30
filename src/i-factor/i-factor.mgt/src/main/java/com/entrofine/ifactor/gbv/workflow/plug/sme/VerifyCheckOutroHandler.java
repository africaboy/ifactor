package com.entrofine.ifactor.gbv.workflow.plug.sme;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.ProcessorException;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;

public class VerifyCheckOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		// create profile
		Map content = wim.getInstanceContent(
				theActivity.instance().id(),
				theActivity.instance().iflow().iobject()
						.itableView("if_cp_apply_add"));
		String pkid = (String) content.get("PK_ID");

		String sql = "SELECT PRO_PK_ID FROM IF_MGT_CP_PROFILE WHERE APPLY_ID = ?";

		DataTrimmerI trimmer = new DataTrimmerI(conn);
		Map profileMap = trimmer.searchSingleData(sql, pkid);
		SimpleBean sb = new SimpleBeanImpl();
		BaseworkUtil util = new BaseworkUtil();
		sb.getResource().putAll(profileMap);
		sb.getResource().put("CREATETIME", DateTrimmer.getYMDHMS());
		try {
			util.manualUpdate("IF_MGT_CP_PROFILE", sb, conn);
		} catch (ProcessorException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
}
