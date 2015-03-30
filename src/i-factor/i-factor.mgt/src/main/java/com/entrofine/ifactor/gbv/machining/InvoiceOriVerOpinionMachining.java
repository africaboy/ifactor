package com.entrofine.ifactor.gbv.machining;

import java.sql.Connection;

import jt.classic.system.workflow.WInstanceManager;
import jt.classic.system.workflow.WorkflowException;

import org.limp.basework.MachiningException;
import org.limp.basework.SimpleBean;
import org.limp.basework.SimpleBeanMachining;
import org.limp.basework.Table;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.mine.StringTool;

/**
 * original invoice verification flow opinion data handle
 * 
 * @author hezhichao
 * 
 */
public class InvoiceOriVerOpinionMachining implements SimpleBeanMachining {

	public SimpleBean machining(SimpleBean bean, Table table,
			CommonBean4HSQ cbh, Connection conn, int type)
			throws MachiningException {

		if (type == 13) {

			String actId = (String) cbh.getResource().get("actId");

			String opinionKeyValue = StringTool.checkString(cbh.getResource()
					.get("IOVF_PK_ID"));

			if (opinionKeyValue.equals("")) {
				throw new MachiningException(
						"OpinionMachining error, can't bind activity(" + actId
								+ ") opinion.");
			}

			WInstanceManager wim = new WInstanceManager(conn);
			try {

				wim.bindActivityOpinion(actId, opinionKeyValue);

			} catch (WorkflowException ex) {
				throw new MachiningException("OpinionMachining error.", ex);
			}
		}

		return null;
	}

}
