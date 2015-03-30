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
 * verify ID and sign document intro handler
 * 
 * @author mido
 * 
 */
public class VerifySignHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		// opinion from map score step
		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());

		if (opinionInfo == null) {
			throw new WorkflowException(
					"There cant not find opinion in current activity!");
		}
		if ("VerifyAgain".equals(opinionInfo.get("OPINION"))) {
			String pkId = wim.getInstanceRelationObject(
					theActivity.instance().id(),
					theActivity.instance().iflow().iobject()
							.itableView("if_cp_apply_add"));
			String sql = "UPDATE IF_MGT_CP_APPLY SET REMIND = ? WHERE PK_ID = ?";

			DataTrimmerI trimmer = new DataTrimmerI(conn);

			if (!trimmer.execute(sql, "Not call", pkId)) {
				throw new WorkflowException("apply-status-intro-handler error.");
			}
		}
		// from map-score or visit-field or double-check-verify back
		boolean rnt = ("Confirmed".equals(opinionInfo.get("OPINION"))
				|| "NotRequired".equals(opinionInfo.get("OPINION"))
				|| "VerifyAgain".equals(opinionInfo.get("OPINION")) || "Accept"
				.equals(opinionInfo.get("OPINION")));
		return rnt;
	}

}
