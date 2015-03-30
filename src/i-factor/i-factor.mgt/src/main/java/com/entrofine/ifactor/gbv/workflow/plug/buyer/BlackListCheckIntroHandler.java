package com.entrofine.ifactor.gbv.workflow.plug.buyer;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.wordbook.WordBookUtil;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;

import com.entrofine.ifactor.gbv.utils.BlacklistHelper;

/**
 * handler event for buyer blacklist check start
 * 
 * @author wangweifeng
 * 
 */
public class BlackListCheckIntroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings({ "rawtypes" })
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WInstanceManager wim = new WInstanceManager(conn);

		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());

		if (opinionInfo == null) {
			throw new WorkflowException(
					"There cant not find opinion in current activity!");
		}

		if ("Confirmed".equals(opinionInfo.get("OPINION"))) {

			// TODO Blacklist automatically checks
			Map content = wim.getInstanceContent(
					theActivity.instance().id(),
					theActivity.instance().iflow().iobject()
							.itableView("ifactor_buyer_apply"));
			String pkid = (String) content.get("IBA_PK_ID");
			String cpnumber = (String) content.get("ID_NUMBER");

			// TODO Blacklist automatically checks
			boolean cancellation = BlacklistHelper.checkBlacklist(cpnumber,
					"01", "buyer", conn);
			if (cancellation) {
				SimpleBean sb = new SimpleBeanImpl();
				sb.getResource().put("PKID", pkid);
				String typevalue = WordBookUtil.getWordBookItemName("bltype",
						"01");
				sb.getResource().put("DUPTYPE", typevalue);
				sb.getResource().put("DUPTYPEID", "01");
				BaseworkUtil util = new BaseworkUtil();
				try {
					util.manualSave("IF_MGT_BLACKLIST_RESULT", sb, conn);
				} catch (Exception ex) {
					throw new WorkflowException("blacklist check error.", ex);
				}
			}

			boolean regulatory = BlacklistHelper.checkBlacklist(cpnumber, "04",
					"buyer", conn);
			if (regulatory) {
				SimpleBean sb = new SimpleBeanImpl();
				sb.getResource().put("PKID", pkid);
				String typevalue = WordBookUtil.getWordBookItemName("bltype",
						"04");
				sb.getResource().put("DUPTYPE", typevalue);
				sb.getResource().put("DUPTYPEID", "04");
				BaseworkUtil util = new BaseworkUtil();
				try {
					util.manualSave("IF_MGT_BLACKLIST_RESULT", sb, conn);
				} catch (Exception ex) {
					throw new WorkflowException("blacklist check error.", ex);
				}
			}

			return true;
		}

		return false;
	}

}
