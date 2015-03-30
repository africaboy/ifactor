package com.entrofine.ifactor.gbv.workflow.plug.buyer;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.wordbook.WordBookUtil;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WPlugHandler;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.AbstractSimpleBean;
import org.limp.basework.SimpleBean;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.limp.mine.SequenceGenerator;
import org.limp.mine.StringTool;

import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

/**
 * handler event for buyer apply start
 * 
 * @author wangweifeng
 * 
 */
public class ApplyRegistIntroHandler extends AbstractSimpleBean implements
		WPlugHandler {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public boolean participate(Connection conn, SimpleBean bean)
			throws WorkflowException {

		CommonBean4HSQ cbh = (CommonBean4HSQ) bean.getResource().get("CBH");
		WActivity theActivity = (WActivity) bean.getResource().get(
				"theActivity");

		// primary key of buyer apply form
		String ibaPkId = StringTool.checkString(cbh.getResource().get(
				"IBA_PK_ID"));

		String prefix = "BA" + DateTrimmer.getYMD();

		// initialize buyer apply
		if (ibaPkId.equals("")) {

			cbh.getResource().put("BA_APPLY_DATE", DateTrimmer.getYMDHMS());
			cbh.getResource().put("BA_STATUS", theActivity.istep().ikey());
			cbh.getResource().put(
					"BA_STATUS_VAL",
					WordBookUtil.getWordBookItemName("ba_stauts", theActivity
							.istep().ikey()));

			// initialize BA_APPLY_CODE
			DataTrimmerI trimmer = new DataTrimmerI(conn);

			String sql = "SELECT MAX(BA_APPLY_CODE) AS BA_APPLY_CODE FROM IF_MGT_BUYER_APPLY WHERE BA_APPLY_CODE LIKE ? ORDER BY BA_APPLY_CODE DESC";

			Map info = trimmer.searchSingleData(sql, prefix + "%");

			String baApplyCode = null;

			if (info != null && !info.get("BA_APPLY_CODE").equals("")) {

				String maxBaApplyCode = (String) info.get("BA_APPLY_CODE");

				SequenceGenerator sg = new SequenceGenerator(maxBaApplyCode);

				sg.setNumberList(SequenceGenerator.numberListSimple);

				baApplyCode = sg.nextSequence();
			} else {
				baApplyCode = prefix + "001";
			}

			cbh.getResource().put("BA_APPLY_CODE", baApplyCode);

			String id = WorkflowProxy.getAppPkId(cbh.getResource());
			String fieldValue = WordBookUtil.getWordBookItemName("ba_stauts",
					theActivity.istep().ikey());

			WorkflowProxy.syncFlowTable(bean, "IF_MGT_BUYER_APPLY", id,
					"BA_STATUS_VAL", fieldValue);
		}
		return true;
	}
}
