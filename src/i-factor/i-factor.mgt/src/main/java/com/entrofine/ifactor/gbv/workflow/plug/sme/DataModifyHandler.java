package com.entrofine.ifactor.gbv.workflow.plug.sme;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.mine.DateTrimmer;

/**
 * data modify intro handler
 * 
 * @author mido
 * 
 */
public class DataModifyHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		// opinion from last step
		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());

		if (opinionInfo == null) {
			throw new WorkflowException(
					"There cant not find opinion in current activity!");
		}

		boolean rnt = "Modify".equals(opinionInfo.get("OPINION"));

		if (rnt) {
			CommonBean4HSQ cbh = (CommonBean4HSQ) bean.getResource().get("CBH");
			// 设置超时时间
			cbh.getResource()
					.put("altime", DateTrimmer.getAppointDate(null, 3));

			// send email
		}

		return rnt;
	}
}
