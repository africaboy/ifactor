package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

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

import com.entrofine.ifactor.gbv.utils.Getter;
import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

public class OriginalInvoiceIntroHandler extends AbstractSimpleBean implements
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
			String insId = theActivity.instance().id();
			Map map = wim.getInstanceContent(
					insId,
					theActivity.instance().iflow().iobject()
							.itableView("ifactor_invoice_delivery_apply"));
			String appPkId = WorkflowProxy.getAppPkId(map);
			String releaseDate = DateTrimmer.getYMD() + "000000";
			String startDate = Getter.string(map.get("IDA_CYCLESTART"));
			String endDate = Getter.string(map.get("IDA_CYCLEEND"));
			String sql = "UPDATE IF_MGT_INVOICE_ORIVER SET ISACCEPTED = ?,RELEASE_DATE=?,IOV_CYCLESTART=?,IOV_CYCLEEND=? WHERE APP_PK_ID=?";
			DataTrimmerI trimmerI = new DataTrimmerI(conn);
			trimmerI.execute(sql, "1", releaseDate, startDate, endDate, appPkId);

			SimpleBean sb = new SimpleBeanImpl();
			BaseworkUtil util = new BaseworkUtil();
			sb.getResource().putAll(map);
			sb.getResource().put("ISVERIFICATION", "1");
			try {
				util.manualUpdate("IF_MGT_INVOICE_APPLY", sb, conn);
			} catch (ProcessorException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return true;
		}

		return false;
	}

}
