package com.entrofine.ifactor.gbv.workflow.plug.sme;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import jt.classic.system.wordbook.WordBookUtil;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WStep;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.mine.DataTrimmerI;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.gbv.utils.Getter;
import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

/**
 * sme apply status
 * 
 * @author mido
 * 
 */
public class ApplyStatusHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings("rawtypes")
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		String appStatus = theActivity.istep().ikey();

		WStep nextStep = (WStep) bean.getResource().get("nextStep");

		if (nextStep != null) {
			appStatus += "_" + nextStep.ikey();
		}

		WInstanceManager wim = new WInstanceManager(conn);

		String pkId = wim.getInstanceRelationObject(
				theActivity.instance().id(), theActivity.instance().iflow()
						.iobject().itableView("if_cp_apply_add"));

		String sql = "UPDATE IF_MGT_CP_APPLY SET CPSTATUS = ?, CPSTATUS_VAL = ? WHERE PK_ID = ?";

		String apprStateVal = WordBookUtil.getWordBookItemName(
				"smeapplystatus", appStatus);

		DataTrimmerI trimmer = new DataTrimmerI(conn);

		if (!trimmer.execute(sql, appStatus, apprStateVal, pkId)) {
			throw new WorkflowException("apply-status-intro-handler error.");
		}
		Map map = wim.getInstanceContent(
				theActivity.instance().id(),
				theActivity.instance().iflow().iobject()
						.itableView("if_cp_apply_add"));
		String id = WorkflowProxy.getAppPkId(map);

		List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();
		if (appStatus.equals("FUoVuacHWV_cMxzCQLUrF")) {
			Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());
			if (opinionInfo == null) {
				throw new WorkflowException(
						"There cant not find opinion in current activity!");
			}
			if ("Modify".equals(opinionInfo.get("OPINION"))) {
				String imageRemark = (String) opinionInfo.get("IMAGE_REMARK");
				events.add(new TableSyncEvent("IF_MGT_SME_FLOW_OPINION", id,
						"IMAGE_REMARK", imageRemark));
			}
		} else if (appStatus.equals("pvPsOAQpXx_KJtCGqzGmT")) {
			String eCategory = Getter.string(map.get("COMPANIESTYPEID"));
			events.add(new TableSyncEvent("IF_MGT_CP_APPLY", id,
					"COMPANIESTYPEID", eCategory));
		}
		events.add(new TableSyncEvent("IF_MGT_CP_APPLY", id, "CPSTATUS",
				appStatus));
		WorkflowProxy.syncFlowTable(bean, events);

		String messageTit = Getter.string(WordBookUtil.getWordBookItemName(
				"smeInbox", appStatus + "_TIT"));
		if (!messageTit.equals("")) {
			String message = Getter.string(WordBookUtil.getWordBookItemName(
					"smeInbox", appStatus + "_CON"));
			long applyId = Getter.l(id);
			WorkflowProxy.syncInbox(bean, applyId, messageTit, message, "0");
		}
		return true;
	}

}
