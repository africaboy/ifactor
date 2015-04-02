package com.entrofine.ifactor.gbv.workflow.plug.sme;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;
import jt.classic.system.workflow.engine.GrooveWorkflowEngine;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.StringTool;

import com.entrofine.ifactor.gbv.init.ParamSettingCenter;
import com.entrofine.ifactor.gbv.utils.Getter;
import com.entrofine.ifactor.gbv.utils.ScoringHelper;

/**
 * license check intro handler
 * 
 * @author mido
 * 
 */
public class MapScoreHandler extends AbstractSimpleBean implements WPlugHandler {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");
		WInstanceManager wim = new WInstanceManager(conn);
		// opinion from first check step
		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());
		if (opinionInfo == null) {
			throw new WorkflowException(
					"There cant not find opinion in current activity!");
		}
		boolean rnt = "Confirmed".equals(opinionInfo.get("OPINION"));
		if (rnt) {
			// 评分
			ParamSettingCenter psCenter = ParamSettingCenter.getInsance();
			String ifSystemCheck = Getter.string(psCenter.get("IPS0006"));
			SimpleBean sb = new SimpleBeanImpl();
			if (ifSystemCheck.equals("yes")) {
				Map content = wim.getInstanceContent(theActivity.instance()
						.id(), theActivity.instance().iflow().iobject()
						.itableView("if_cp_apply_add"));
				Map cicContent = wim.getInstanceContent(theActivity.instance()
						.id(), theActivity.instance().iflow().iobject()
						.itableView("if_cp_cic"));
				String ratingValue = StringTool.checkString(cicContent
						.get("TSTATEMENT"));
				String pkid = (String) content.get("PK_ID");
				String brnumber = (String) content.get("CPNUMBER");
				String enterprise = StringTool.checkString(content
						.get("COMPANIESTYPEID"));

				Map<String, String> scoreResultMap = ScoringHelper
						.getScoreResults(conn, brnumber, enterprise,
								ratingValue);

				sb.getResource().put("APPLY_ID", pkid);
				sb.getResource().put("CATEGORY1",
						scoreResultMap.get("CATEGORY1"));
				sb.getResource().put("CATEGORY2",
						scoreResultMap.get("CATEGORY2"));
				sb.getResource().put("CATEGORY3",
						scoreResultMap.get("CATEGORY3"));
				sb.getResource().put("CATEGORY4",
						scoreResultMap.get("CATEGORY4"));
				sb.getResource().put("CATEGORY5",
						scoreResultMap.get("CATEGORY5"));
				sb.getResource().put("CATEGORY6",
						scoreResultMap.get("CATEGORY6"));
				if (enterprise.equals("03")) {
					sb.getResource().put("CATEGORY7",
							scoreResultMap.get("CATEGORY7"));
				}
				sb.getResource().put("LENDERSNUMBER",
						scoreResultMap.get("LENDERSNUMBER"));
				sb.getResource().put("RESULT", scoreResultMap.get("RESULT"));
				sb.getResource().put("RATING", scoreResultMap.get("RATING"));
				sb.getResource().put("RISKLEVEL",
						scoreResultMap.get("RISKLEVEL"));
				sb.getResource().put("RISKLEVELID",
						scoreResultMap.get("RISKLEVELID"));
				sb.getResource().put("RISKLEVELLABEL",
						scoreResultMap.get("RISKLEVELLABEL"));
			}
			BaseworkUtil util = new BaseworkUtil();
			try {
				Map result = util.manualSave("IF_MGT_SCORING_RESULT", sb, conn);

				GrooveWorkflowEngine gwe = (GrooveWorkflowEngine) bean
						.getResource().get("GWE");

				gwe.createInstanceObject(theActivity.instance().id(),
						theActivity.instance().iflow().iobject().ikey(),
						"IF_MGT_SCORING_RESULT",
						(String) result.get("SR_PK_ID"), "if_scoring_result");
			} catch (Exception ex) {
				throw new WorkflowException("apply rating error.", ex);
			}
		}

		return rnt;
	}

}
