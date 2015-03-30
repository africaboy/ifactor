package com.entrofine.ifactor.gbv.workflow.plug.invoicedelivery;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.wordbook.WordBookUtil;
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

		// primary key of buyer apply form
		String ibaPkId = StringTool.checkString(cbh.getResource().get(
				"IIDA_PK_ID"));

		String prefix = "IDA" + DateTrimmer.getYMD();

		// initialize buyer apply
		if (ibaPkId.equals("")) {

			cbh.getResource().put("IDA_DATE", DateTrimmer.getYMDHMS());
			cbh.getResource().put("IDA_STATUS", "szIeAMROkl");
			cbh.getResource().put(
					"IDA_STATUS_VAL",
					WordBookUtil
							.getWordBookItemName("ida_stauts", "szIeAMROkl"));

			// initialize BA_APPLY_CODE
			DataTrimmerI trimmer = new DataTrimmerI(conn);

			String sql = "SELECT MAX(IDA_CODE) AS IDA_CODE FROM IF_MGT_INVOICE_APPLY WHERE IDA_CODE LIKE ? ORDER BY IDA_CODE DESC";

			Map info = trimmer.searchSingleData(sql, prefix + "%");

			String idaCode = null;

			if (info != null && !info.get("IDA_CODE").equals("")) {

				String maxIdaCode = (String) info.get("IDA_CODE");

				SequenceGenerator sg = new SequenceGenerator(maxIdaCode);

				sg.setNumberList(SequenceGenerator.numberListSimple);

				idaCode = sg.nextSequence();
			} else {
				idaCode = prefix + "001";
			}

			cbh.getResource().put("IDA_CODE", idaCode);

			String id = WorkflowProxy.getAppPkId(cbh.getResource());
			String fieldValue = WordBookUtil.getWordBookItemName("ida_stauts",
					"szIeAMROkl");

			WorkflowProxy.syncFlowTable(bean, "IF_MGT_INVOICE_APPLY", id,
					"IDA_STATUS_VAL", fieldValue);
		}

		return true;
	}

}
