package com.entrofine.ifactor.gbv.machining;

import java.sql.Connection;
import java.util.Map;

import jt.classic.system.context.ISystemContext;
import jt.classic.system.user.IUser;

import org.limp.basework.MachiningException;
import org.limp.basework.SimpleBean;
import org.limp.basework.SimpleBeanMachining;
import org.limp.basework.Table;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;

/**
 * image file preview log handler
 * 
 * @author fengjj
 * 
 */
public class ImagePreviewLogMachining implements SimpleBeanMachining {

	public SimpleBean machining(SimpleBean bean, Table table,
			CommonBean4HSQ cbh, Connection conn, int type)
			throws MachiningException {

		if (type == -4) {
			IUser user = ISystemContext.getSessionUser(cbh.getRequest());

			if (user == null) {
				throw new MachiningException(
						"session is invalid, can't log image preview trace.");
			} else {
				Map param = cbh.getResource();

				String sql = "SELECT TRACE_ID FROM IF_MGT_IMAGE_TRACE WHERE ANNEX_ID = ? AND ACT_ID = ? AND USER_ID = ?";

				DataTrimmerI trimmer = new DataTrimmerI(conn);

				Map info = trimmer.searchSingleData(sql, param.get("ANNEX_ID"),
						param.get("ACT_ID"), user.id());

				if (info != null) {
					bean.getResource().put("TRACE_TIME",
							DateTrimmer.getYMDHMS());
					bean.getResource().put("TRACE_ID", info.get("TRACE_ID"));
				} else {

					bean.getResource().put("TRACE_TIME",
							DateTrimmer.getYMDHMS());
					bean.getResource().put("USER_ID", user.id());
					bean.getResource().put("USER_NAME", user.iname());
				}

			}

		}

		return null;
	}

}
