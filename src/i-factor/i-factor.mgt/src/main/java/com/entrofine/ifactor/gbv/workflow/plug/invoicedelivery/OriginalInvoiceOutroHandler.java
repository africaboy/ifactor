package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

import java.sql.Connection;

import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.CommonBean4HSQ;

import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * handle invoice delivery double manual check event
 * 
 * @author wangweifeng
 * 
 */
public class OriginalInvoiceOutroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings("rawtypes")
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		// WActivity theActivity = (WActivity) bean.getResource().get(
		// "theActivity");
		//
		// WInstanceManager wim = new WInstanceManager(conn);
		//
		// Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());
		//
		// if (opinionInfo != null) {
		// if (!("Accept".equals(opinionInfo.get("OPINION")) && "Accept"
		// .equals(opinionInfo.get("CHECK_RESULT")))) {
		// // refuse it
		// theActivity.instance().iyesorno("no");
		// }
		// }
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");
		CommonBean4HSQ cbh = (CommonBean4HSQ) bean.getResource().get("CBH");
		String yesorno = Getter.string(cbh.getResource().get("yesorno"));
		if (yesorno.equals("yes")) {
			theActivity.instance().iyesorno("yes");
		} else {
			theActivity.instance().iyesorno("no");
		}
		return true;
	}
}
