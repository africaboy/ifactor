package com.entrofine.ifactor.workflow.plug.invoiceOriVer;

import java.sql.Connection;
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

import com.entrofine.ifactor.gbv.manager.OriVerInvoiceManager;
import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

public class FinishIntroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");
		WStep nextStep = (WStep) bean.getResource().get("nextStep");
		String ovStatus = theActivity.istep().ikey();
		WInstanceManager wim = new WInstanceManager(conn);
		boolean isConfirm = false;
		Map opinionInfo = wim.getActivityOpinionContent(theActivity.id());
		if (opinionInfo == null) {
			throw new WorkflowException(
					"There cant not find opinion in current activity!");
		}
		if (nextStep != null && "Accept".equals(opinionInfo.get("OPINION"))) {
			ovStatus += "_" + nextStep.ikey();
			isConfirm = true;
		} else {
			ovStatus += "_" + nextStep.ikey() + "_0";
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
		if (isConfirm) {
			Map map = wim.getInstanceContent(insId, theActivity.instance()
					.iflow().iobject().itableView("ifactor_invoice_oriver"));
			String appPkId = WorkflowProxy.getAppPkId(map);
			String sql = "UPDATE IF_MGT_INVOICE_APPLY SET ISVERIFICATION = ? WHERE APP_PK_ID=?";
			trimmerI.execute(sql, "1", appPkId);
		}
		return true;
	}

}
