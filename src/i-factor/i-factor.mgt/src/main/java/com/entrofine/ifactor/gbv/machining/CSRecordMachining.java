package com.entrofine.ifactor.gbv.machining;

import java.sql.Connection;

import org.limp.basework.MachiningException;
import org.limp.basework.SimpleBean;
import org.limp.basework.SimpleBeanMachining;
import org.limp.basework.Table;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.basework.impl.SimpleBeanImpl;
import org.limp.basework.tools.BaseworkUtil;
import org.limp.mine.DateTrimmer;

/**
 * CS tel-record data handle
 * 
 * @author fengjj
 * 
 */
public class CSRecordMachining implements SimpleBeanMachining {

	public SimpleBean machining(SimpleBean bean, Table table,
			CommonBean4HSQ cbh, Connection conn, int type)
			throws MachiningException {

		if (type == 13) {
			String actId = (String) cbh.getResource().get("actId");

			String insId = (String) cbh.getResource().get("insId");

			SimpleBean sb = new SimpleBeanImpl();

			sb.getResource().put("aid", actId);

			String nextDate = DateTrimmer.getAppointDate(null, 7);

			// data modify delay 7 days
			sb.getResource().put("altime", nextDate + "240000");

			BaseworkUtil util = new BaseworkUtil();

			try {
				util.manualUpdate("WF_ACTIVITY", sb, conn);
			} catch (Exception ex) {
				throw new MachiningException("OpinionMachining error.", ex);
			}

		}

		return null;
	}

}
