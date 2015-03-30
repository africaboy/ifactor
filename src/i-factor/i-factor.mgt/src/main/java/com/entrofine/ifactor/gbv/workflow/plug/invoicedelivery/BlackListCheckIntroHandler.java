package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

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
 * handler event for invoice delivery blacklist check start
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
			Map content = wim.getInstanceContent(
					theActivity.instance().id(),
					theActivity.instance().iflow().iobject()
							.itableView("ifactor_invoice_delivery_apply"));
			String pkid = (String) content.get("IIDA_PK_ID");
			String cpnumber = (String) content.get("REGIST_NO");

			// TODO Blacklist automatically checks
			boolean internal = BlacklistHelper.checkBlacklist(cpnumber, "05",
					"invoice", conn);
			if (internal) {
				SimpleBean sb = new SimpleBeanImpl();
				sb.getResource().put("PKID", pkid);
				String typevalue = WordBookUtil.getWordBookItemName("bltype",
						"05");
				sb.getResource().put("DUPTYPE", typevalue);
				sb.getResource().put("DUPTYPEID", "05");
				BaseworkUtil util = new BaseworkUtil();
				try {
					util.manualSave("IF_MGT_BLACKLIST_RESULT", sb, conn);
				} catch (Exception ex) {
					throw new WorkflowException("blacklist check error.", ex);
				}
			}

			boolean badpayment = BlacklistHelper.checkBlacklist(cpnumber, "06",
					"invoice", conn);
			if (badpayment) {
				SimpleBean sb = new SimpleBeanImpl();
				sb.getResource().put("PKID", pkid);
				String typevalue = WordBookUtil.getWordBookItemName("bltype",
						"06");
				sb.getResource().put("DUPTYPE", typevalue);
				sb.getResource().put("DUPTYPEID", "06");
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
