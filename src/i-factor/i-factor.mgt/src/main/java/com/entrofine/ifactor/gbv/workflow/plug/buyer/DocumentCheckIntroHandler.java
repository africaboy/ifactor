package com.entrofine.ifactor.gbv.workflow.plug.buyer;

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
import org.limp.mine.RandomUtil;
import org.limp.mine.StringTool;

import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * 进入文件签署核查前处理逻辑
 * 
 * @author wangweifeng
 * 
 */
public class DocumentCheckIntroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings({ "rawtypes", "unchecked" })
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
						.itableView("ifactor_buyer_apply"));
		// 银行卡号
		String bankAccount = Getter.string(opinionInfo.get("BANKACCOUNT"));

		String pkid = (String) content.get("IBA_PK_ID");

		String sql = "SELECT PK_ID FROM IF_MGT_BUYER_PROFILE WHERE APPLY_ID = ?";

		DataTrimmerI trimmer = new DataTrimmerI(conn);
		Map profileMap = trimmer.searchSingleData(sql, pkid);
		SimpleBean sb = new SimpleBeanImpl();
		BaseworkUtil util = new BaseworkUtil();
		sb.getResource().put("BANKACCOUNT", bankAccount);
		if (profileMap == null) {
			String appPkId = StringTool.checkString(content.get("APP_PK_ID"));
			String investAsPrivate = StringTool.checkString(content
					.get("INVEST_AS_PRIVATE"));
			sb.getResource().put("APPLY_ID", pkid);
			sb.getResource().put("PROFILE_APP_ID", appPkId);
			sb.getResource().put("CINUMBER", RandomUtil.getRandomString(20));
			sb.getResource().put("STATUS", "0");
			sb.getResource().put("RELEASETIME", DateTrimmer.getYMDHMS());
			String isCpoperate = StringTool.checkString(content
					.get("ISCPOPERATE"));
			if (investAsPrivate.equals("1") || isCpoperate.equals("Yes")) {
				sb.getResource().put("TITLE", content.get("TITLE"));
				sb.getResource().put("FIRST_NAME", content.get("FIRST_NAME"));
				sb.getResource().put("LAST_NAME", content.get("LAST_NAME"));
				sb.getResource().put("GENDER", content.get("GENDER"));
				sb.getResource().put("BIRTH_DATE", content.get("BIRTH_DATE"));
				sb.getResource().put("NATIONALITY", content.get("NATIONALITY"));
				sb.getResource().put("RESIDENCE_COUNTRY",
						content.get("RESIDENCE_COUNTRY"));
				sb.getResource().put("ID_TYPE", content.get("ID_TYPE"));
				sb.getResource().put("ID_NUMBER", content.get("ID_NUMBER"));
				sb.getResource().put("PHONE", content.get("PHONE"));
				sb.getResource().put("MOBILE_PHONE",
						content.get("MOBILE_PHONE"));
				sb.getResource().put("EMAIL", content.get("EMAIL"));
			}
			if (investAsPrivate.equals("1")) {
				sb.getResource().put("ISINVEST", "0");
				sb.getResource().put("INVEST", "Private investor");
				sb.getResource().put(
						"ADDRESS",
						content.get("COUNTRY") + " " + content.get("REGION")
								+ " " + content.get("CITY") + " "
								+ content.get("DISTRICT") + " "
								+ content.get("RESIDENCE_ADDRESS"));

				sb.getResource().put("OCCUPATION", content.get("OCCUPATION"));
				sb.getResource().put("EMPLOYER_NAME",
						content.get("EMPLOYER_NAME"));
				sb.getResource().put("COMPANY_INDUSTRY",
						content.get("COMPANY_INDUSTRY"));
				sb.getResource().put(
						"EMPLOYER_ADDRESS",
						content.get("COUNTRY") + " " + content.get("REGION")
								+ " " + content.get("CITY") + " "
								+ content.get("DISTRICT") + " "
								+ content.get("RESIDENCE_ADDRESS"));

				sb.getResource().put("TRADEPLATFORM",
						content.get("TRADEPLATFORM"));
				sb.getResource().put("ASSET", content.get("ASSET"));
				sb.getResource().put("YEARSINVESTOR",
						content.get("YEARSINVESTOR"));
				sb.getResource().put("ISFACTORING", content.get("ISFACTORING"));
				sb.getResource().put("ISAUCTION", content.get("ISAUCTION"));
				sb.getResource().put("ISPROVIDER", content.get("ISPROVIDER"));
				sb.getResource().put("ISASSET", content.get("ISASSET"));
				sb.getResource().put("MAJOR", content.get("MAJOR"));
				sb.getResource().put("EALAST", content.get("EALAST"));
				sb.getResource().put("EATHIS", content.get("EATHIS"));
				sb.getResource().put("PLATFORM", content.get("PLATFORM"));
				sb.getResource().put("BUSINESSFROM",
						content.get("BUSINESSFROM"));
			} else {
				sb.getResource().put("ISINVEST", "1");
				sb.getResource().put("INVEST", "Institution");
				sb.getResource().put("ISASSET", content.get("ISASSET"));
				sb.getResource().put("COMPANY", content.get("COMPANY_NAME"));
				sb.getResource().put("COMPANYCDATE",
						content.get("ESTABLISH_DATE"));
				sb.getResource().put("COMPANYRNUMBER",
						content.get("REGIST_NUMBER"));
				sb.getResource().put("COMPANYTAXCODE", content.get("TAX_CODE"));
				sb.getResource().put("TYPECOMPANY", content.get("TYPECOMPANY"));
				sb.getResource().put("COMPANYOIN", content.get("CPINDUSTRY"));
				sb.getResource().put(
						"COMPANYADDRESS",
						content.get("COMPANY_COUNTRY") + " "
								+ content.get("COMPANY_REGION") + " "
								+ content.get("COMPANY_CITY") + " "
								+ content.get("COMPANY_DISTRICT") + " "
								+ content.get("COMPANY_ADDRESS"));
				sb.getResource().put("REGIST_COUNTRY",
						content.get("REGIST_COUNTRY"));
				String isDefAddress = StringTool.checkString(content
						.get("ISDFCPADDRESS"));
				if (isDefAddress.equals("1")) {
					sb.getResource().put("ISDFCPADDRESS",
							content.get("ISDFCPADDRESS"));
					sb.getResource().put("DFCOMPANY_ADDRESS",
							content.get("DFCOMPANY_ADDRESS"));
					sb.getResource().put("DFCOMPANY_DISTRICT",
							content.get("DFCOMPANY_DISTRICT"));
					sb.getResource().put("DFCOMPANY_CITY",
							content.get("DFCOMPANY_CITY"));
					sb.getResource().put("DFCOMPANY_REGION",
							content.get("DFCOMPANY_REGION"));
					sb.getResource().put("DFCOMPANY_COUNTRY",
							content.get("DFCOMPANY_COUNTRY"));
					sb.getResource().put("DFPOST_CODE",
							content.get("DFPOST_CODE"));
				}

				if (isCpoperate.equals("No")) {
					sb.getResource().put("TITLE", content.get("CPTITLE"));
					sb.getResource().put("FIRST_NAME", content.get("CPFNAME"));
					sb.getResource().put("LAST_NAME", content.get("CPLNAME"));
					sb.getResource().put("GENDER", content.get("CPGENDER"));
					sb.getResource().put("BIRTH_DATE", content.get("CPDOB"));
					sb.getResource().put("NATIONALITY",
							content.get("CPNATIONALITY"));
					sb.getResource().put("RESIDENCE_COUNTRY",
							content.get("CPRESIDENCE"));
					sb.getResource().put("ID_TYPE", content.get("CPIDTYPE"));
					sb.getResource()
							.put("ID_NUMBER", content.get("CPIDNUMBER"));
					sb.getResource().put("PHONE", content.get("CPWPHONE"));
					sb.getResource().put("MOBILE_PHONE",
							content.get("CPMPHONE"));
					sb.getResource()
							.put("POSITION", content.get("CPPOSITION1"));
					sb.getResource().put("EMAIL", content.get("CPEMAIL"));
				} else {
					sb.getResource().put("POSITION", content.get("CPPOSITION"));
				}

				sb.getResource().put("CPTURNOVER", content.get("CPTURNOVER"));
				sb.getResource().put("ISCPENGAGED", content.get("ISCPENGAGED"));
				sb.getResource().put("ISCPASSET", content.get("ISCPASSET"));
				sb.getResource().put("CPASSET", content.get("CPASSET"));
				sb.getResource().put("CPINVESTMENT",
						content.get("CPINVESTMENT"));
				sb.getResource().put("CPAVERAGE", content.get("CPAVERAGE"));
				sb.getResource().put("CPAVERAGEPER",
						content.get("CPAVERAGEPER"));
				sb.getResource().put("CPBUSINESSFROM",
						content.get("CPBUSINESSFROM"));
			}

			try {
				// create profile
				util.manualSave("IF_MGT_BUYER_PROFILE", sb, conn);
			} catch (Exception ex) {
				throw new WorkflowException("verify and sign error.", ex);
			}
		} else {
			sb.getResource().putAll(profileMap);
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