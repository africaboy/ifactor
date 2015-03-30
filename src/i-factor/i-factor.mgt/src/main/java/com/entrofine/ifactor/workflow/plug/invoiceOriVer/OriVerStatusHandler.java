package com.entrofine.ifactor.workflow.plug.invoiceOriVer;

import java.sql.Connection;

import jt.classic.system.wordbook.WordBookUtil;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WStep;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.mine.DataTrimmerI;

import com.entrofine.ifactor.gbv.manager.OriVerInvoiceManager;

/**
 * handle buyer apply status event
 * 
 * @author hezhichao
 * 
 */
public class OriVerStatusHandler extends AbstractSimpleBean implements
		WPlugHandler {

	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		WStep nextStep = (WStep) bean.getResource().get("nextStep");

		WInstanceManager wim = new WInstanceManager(conn);

		String ovStatus = theActivity.istep().ikey();

		if (nextStep != null) {
			ovStatus += "_" + nextStep.ikey();
		}

		String insId = theActivity.instance().id();

		String iovPkId = wim.getInstanceRelationObject(insId,
				"ifactor_invoice_oriver");

		String ovStatusVal = WordBookUtil.getWordBookItemName("iov_stauts",
				ovStatus);
		// update apply form status
		DataTrimmerI trimmerI = new DataTrimmerI(conn);
		OriVerInvoiceManager.updateOriVerInvoiceStatus(ovStatus, ovStatusVal,
				iovPkId, trimmerI);
		return true;
	}
}
