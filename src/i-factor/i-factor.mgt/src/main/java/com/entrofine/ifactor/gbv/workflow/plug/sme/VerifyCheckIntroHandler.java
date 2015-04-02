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
import org.limp.basework.ProcessorException;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.limp.mine.RandomUtil;
import org.limp.mine.StringTool;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.gbv.init.ParamSettingCenter;
import com.entrofine.ifactor.gbv.manager.SMEApplyManager;
import com.entrofine.ifactor.gbv.utils.Getter;
import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

public class VerifyCheckIntroHandler extends AbstractSimpleBean implements
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

		// create profile
		Map content = wim.getInstanceContent(
				theActivity.instance().id(),
				theActivity.instance().iflow().iobject()
						.itableView("if_cp_apply_add"));
		String id = WorkflowProxy.getAppPkId(content);
		List<TableSyncEvent> events = new ArrayList<TableSyncEvent>();
		// 银行卡号
		String bankAccount = Getter.string(opinionInfo.get("BANKACCOUNT"));
		events.add(new TableSyncEvent("IF_MGT_SME_FLOW_OPINION", id,
				"BANKACCOUNT", bankAccount));
		String pkid = (String) content.get("PK_ID");

		String sql = "SELECT PRO_PK_ID FROM IF_MGT_CP_PROFILE WHERE APPLY_ID = ?";

		DataTrimmerI trimmer = new DataTrimmerI(conn);
		Map profileMap = trimmer.searchSingleData(sql, pkid);
		SimpleBean sb = new SimpleBeanImpl();
		BaseworkUtil util = new BaseworkUtil();
		sb.getResource().put("BANKACCOUNT", opinionInfo.get("BANKACCOUNT"));
		if (profileMap == null) {
			// prepare for creating profile
			Map scoreContent = wim.getInstanceContent(
					theActivity.instance().id(),
					theActivity.instance().iflow().iobject()
							.itableView("if_scoring_result"));

			if (scoreContent == null) {
				throw new WorkflowException(
						"There cant not find score content in current activity!");
			}

			String riskLevelid = Getter.string(scoreContent.get("RISKLEVELID"));
			String appPkId = StringTool.checkString(content.get("APP_PK_ID"));
			sb.getResource().put("APPLY_ID", pkid);
			sb.getResource().put("PROFILE_APP_ID", appPkId);
			sb.getResource().put("CINUMBER", RandomUtil.getRandomString(20));
			sb.getResource().put("COMPANY", content.get("CPNAME"));
			sb.getResource().put("COMPANYCDATE", content.get("CPDATE"));
			sb.getResource().put("COMPANYRNUMBER", content.get("CPNUMBER"));
			sb.getResource().put("COMPANYTAXCODE", content.get("CPTAXCODE"));
			sb.getResource().put("COMPANYOIN", content.get("CPSECTOR"));
			sb.getResource().put("COMPANIESTYPE", content.get("COMPANIESTYPE"));
			sb.getResource().put(
					"COMPANYADDRESS",
					content.get("CPCOUNTRY") + " " + content.get("CPREIZON")
							+ " " + content.get("CPCITY") + " "
							+ content.get("CPDISTRICT") + " "
							+ content.get("CPADDRESS"));
			sb.getResource().put("COMPANYREGISTRATION",
					content.get("MYCOUNTRY"));
			sb.getResource().put("SMECENTERSIGN", content.get("NEARESTSIGN"));
			sb.getResource().put("ISDFCPADDRESS", content.get("ISDFCPADDRESS"));
			sb.getResource().put("DFCPADDRESS", content.get("DFCPADDRESS"));
			sb.getResource().put("DFCPDISTRICT", content.get("DFCPDISTRICT"));
			sb.getResource().put("DFCPCITY", content.get("DFCPCITY"));
			sb.getResource().put("DFCPREIZON", content.get("DFCPREIZON"));
			sb.getResource().put("DFCPCOUNTRY", content.get("DFCPCOUNTRY"));
			sb.getResource().put("DFCPPOSTCODE", content.get("DFCPPOSTCODE"));
			String dar = "";
			String darid = "";
			if (riskLevelid.equals("02")) {
				dar = WordBookUtil.getWordBookItemName("dar", "01");
				darid = "01";
			} else {
				dar = WordBookUtil.getWordBookItemName("dar", "02");
				darid = "02";
			}
			ParamSettingCenter psCenter = ParamSettingCenter.getInsance();
			String ifSystemCheck = Getter.string(psCenter.get("IPS0006"));
			if (!ifSystemCheck.equals("yes")) {
				dar = WordBookUtil.getWordBookItemName("dar", "01");
				darid = "01";
			}
			sb.getResource().put("DAR", dar);
			sb.getResource().put("DARID", darid);
			sb.getResource().put("RATING",
					Getter.string(scoreContent.get("RATING")));
			sb.getResource().put("RISKLEVEL",
					Getter.string(scoreContent.get("RISKLEVELLABEL")));
			sb.getResource().put("RISKLEVELID",
					Getter.string(scoreContent.get("RISKLEVELID")));
			sb.getResource().put("OILIMIT", 0);
			String enterprise = StringTool.checkString(content
					.get("COMPANIESTYPEID"));
			String minamount = WordBookUtil.getWordBookItemName("invoiceLimit",
					"minimum");
			sb.getResource().put("MIAMOUNT", minamount);
			String maxamount = "";
			String invoiceLimit = "";
			if (enterprise.equals("03")) {
				enterprise = "MSME";
				invoiceLimit = WordBookUtil.getWordBookItemName("invoiceLimit",
						"resolvemsme");
			} else {
				enterprise = "SME";
				invoiceLimit = WordBookUtil.getWordBookItemName("invoiceLimit",
						"resolvesme");
			}
			if (enterprise.equals("MSME") && riskLevelid.equals("02")) {
				maxamount = WordBookUtil.getWordBookItemName("invoiceLimit",
						"msmehmax");
			} else if (enterprise.equals("MSME") && riskLevelid.equals("01")) {
				maxamount = WordBookUtil.getWordBookItemName("invoiceLimit",
						"msmelmax");
			} else if (enterprise.equals("SME") && riskLevelid.equals("02")) {
				maxamount = WordBookUtil.getWordBookItemName("invoiceLimit",
						"smehmax");
			} else if (enterprise.equals("SME") && riskLevelid.equals("01")) {
				maxamount = WordBookUtil.getWordBookItemName("invoiceLimit",
						"smelmax");
			}
			if (!ifSystemCheck.equals("yes")) {
				if (enterprise.equals("MSME")) {
					maxamount = WordBookUtil.getWordBookItemName(
							"invoiceLimit", "msmelmax");
				} else {
					maxamount = WordBookUtil.getWordBookItemName(
							"invoiceLimit", "smelmax");
				}
			}
			sb.getResource().put("MAAMOUNT", maxamount);
			sb.getResource().put("INVOICELIMIT", invoiceLimit);
			sb.getResource().put("LIMITBALANCE", invoiceLimit);
			sb.getResource().put("DEBTORS1", content.get("DEBTORS1"));
			sb.getResource().put("DEBTORS2", content.get("DEBTORS2"));
			sb.getResource().put("DEBTORS3", content.get("DEBTORS3"));
			sb.getResource().put("DEBTORS4", content.get("DEBTORS4"));
			sb.getResource().put("DEBTORS5", content.get("DEBTORS5"));
			sb.getResource().put("INVOICEAMMOUNT",
					content.get("INVOICEAMMOUNT"));
			sb.getResource().put("SERIALNUM", content.get("SERIALNUM"));
			sb.getResource().put("MYTITLE", content.get("MYTITLE"));
			sb.getResource().put("MYFNAME", content.get("MYFNAME"));
			sb.getResource().put("MYLNAME", content.get("MYLNAME"));
			sb.getResource().put("MYGENDER", content.get("MYGENDER"));
			sb.getResource().put("MYDOB", content.get("MYDOB"));
			sb.getResource().put("MYNATIONALITY", content.get("MYNATIONALITY"));
			sb.getResource().put("MYCOUNTRY", content.get("MYCOUNTRY"));
			sb.getResource().put("MYIDTYPE", content.get("MYIDTYPE"));
			sb.getResource().put("MYIDNUMBER", content.get("MYIDNUMBER"));
			sb.getResource().put("MYPOSITION", content.get("MYPOSITION"));
			sb.getResource().put("WLOCALCODE", content.get("WLOCALCODE"));
			sb.getResource().put("MYWPHONE", content.get("MYWPHONE"));
			sb.getResource().put("MLOCALCODE", content.get("MLOCALCODE"));
			sb.getResource().put("MYMPHONE", content.get("MYMPHONE"));
			sb.getResource().put("MYEMAIL", content.get("MYEMAIL"));
			sb.getResource().put("STATUS", "0");
			sb.getResource().put("CREATETIME", DateTrimmer.getYMDHMS());
			try {
				// create profile
				util.manualSave("IF_MGT_CP_PROFILE", sb, conn);
				// limit min
				events.add(new TableSyncEvent("IF_MGT_CP_PROFILE", appPkId,
						"MIAMOUNT", minamount));
				// limit max
				events.add(new TableSyncEvent("IF_MGT_CP_PROFILE", appPkId,
						"MAAMOUNT", maxamount));
				// limit balance
				events.add(new TableSyncEvent("IF_MGT_CP_PROFILE", appPkId,
						"LIMITBALANCE", invoiceLimit));
				// Debtor acknowledgement requirement
				events.add(new TableSyncEvent("IF_MGT_CP_PROFILE", appPkId,
						"DAR", darid));
			} catch (Exception ex) {
				throw new WorkflowException("verify and sign error.", ex);
			}
		} else {
			sb.getResource().putAll(profileMap);
			try {
				util.manualUpdate("IF_MGT_CP_PROFILE", sb, conn);
			} catch (ProcessorException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		String appStatus = theActivity.istep().ikey();
		WStep nextStep = (WStep) bean.getResource().get("nextStep");
		if (nextStep != null) {
			appStatus += "_" + nextStep.ikey();
		}
		String apprStateVal = WordBookUtil.getWordBookItemName(
				"smeapplystatus", appStatus);
		SMEApplyManager.updateSMEApplyStatus(appStatus, apprStateVal, pkid,
				trimmer);
		events.add(new TableSyncEvent("IF_MGT_CP_APPLY", id, "CPSTATUS",
				appStatus));
		WorkflowProxy.syncFlowTable(bean, events);
		return true;
	}
}
