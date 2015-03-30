package com.entrofine.ifactor.gbv.workflow.plug.buyer;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WStep;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.ProcessorException;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;

import com.entrofine.ifactor.gbv.common.FlowStep;

/**
 * handle event for document double check end
 * 
 * @author wangweifeng
 * 
 */
public class DocumentCheckOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WStep nextStep = (WStep) bean.getResource().get("nextStep");

		if (nextStep.ikey().equals(FlowStep.buyer_step10.getKey())) {
			// TODO Auto-generated method stub
			WActivity theActivity = (WActivity) bean.getResource().get(
					"theActivity");

			WInstanceManager wim = new WInstanceManager(conn);

			// create profile
			Map content = wim.getInstanceContent(
					theActivity.instance().id(),
					theActivity.instance().iflow().iobject()
							.itableView("ifactor_buyer_apply"));
			String pkid = (String) content.get("IBA_PK_ID");

			String sql = "SELECT PK_ID FROM IF_MGT_BUYER_PROFILE WHERE APPLY_ID = ?";

			DataTrimmerI trimmer = new DataTrimmerI(conn);
			Map profileMap = trimmer.searchSingleData(sql, pkid);
			SimpleBean sb = new SimpleBeanImpl();
			BaseworkUtil util = new BaseworkUtil();
			sb.getResource().putAll(profileMap);
			sb.getResource().put("RELEASETIME", DateTrimmer.getYMDHMS());
			try {
				util.manualUpdate("IF_MGT_BUYER_PROFILE", sb, conn);
			} catch (ProcessorException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return true;
	}
}
