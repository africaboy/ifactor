package com.entrofine.ifactor.gbv.machining;

import java.sql.Connection;

import org.limp.basework.MachiningException;
import org.limp.basework.SimpleBean;
import org.limp.basework.SimpleBeanMachining;
import org.limp.basework.Table;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.mine.StringTool;

import com.entrofine.ifactor.gbv.utils.WorkflowProxy;

public class SysVarsMachining implements SimpleBeanMachining {

	public SimpleBean machining(SimpleBean bean, Table table,
			CommonBean4HSQ cbh, Connection conn, int type)
			throws MachiningException {
		if (type == 13) {
			String sysVarsPkId = StringTool.checkString(cbh.getResource().get(
					"SYSVARS_PK_ID"));
			if (sysVarsPkId.equals("")) {
				throw new MachiningException("SysVarsMachining error");
			}
			String sysVarsCode = StringTool.checkString(cbh.getResource().get(
					"CODE"));
			String sysVarsValue = StringTool.checkString(cbh.getResource().get(
					"VALUE"));
			bean.getResource().put("CBH", cbh);
			// advanceStart auction advance start
			// advanceStep auction advance step
			// interestMin auction interest min
			// interestStep auction interest step
			WorkflowProxy.syncFlowTable(bean, "IF_MGT_SYSVARS", sysVarsCode,
					"VALUE", sysVarsValue);
		}

		return null;
	}

}
