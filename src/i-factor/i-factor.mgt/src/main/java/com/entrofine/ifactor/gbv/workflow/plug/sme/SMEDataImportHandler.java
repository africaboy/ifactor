package com.entrofine.ifactor.gbv.workflow.plug.sme;

import java.sql.Connection;

import jt.classic.system.wordbook.WordBookUtil;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.CommonBean4HSQ;

import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

/**
 * import apply info
 * 
 * @author mido
 * 
 */
public class SMEDataImportHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings("unchecked")
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		// TODO Auto-generated method stub

		CommonBean4HSQ cbh = (CommonBean4HSQ) bean.getResource().get("CBH");
		//
		// cbh.getResource().put("MYTITLE", RandomUtil.getRandomString(10));
		// cbh.getResource().put("CPCTIME", DateTrimmer.getYMDHMS());
		// cbh.getResource().put("CPNUMBER", RandomUtil.getRandomString(10));
		cbh.getResource().put("CPSTATUS", "UHQvMFrkXQ");
		cbh.getResource().put(
				"CPSTATUS_VAL",
				WordBookUtil
						.getWordBookItemName("smeapplystatus", "UHQvMFrkXQ"));

		String id = WorkflowProxy.getAppPkId(cbh.getResource());
		String fieldValue = WordBookUtil.getWordBookItemName("smeapplystatus",
				"UHQvMFrkXQ");

		WorkflowProxy.syncFlowTable(bean, "IF_MGT_CP_APPLY", id,
				"CPSTATUS_VAL", fieldValue);
		return true;
	}

}
