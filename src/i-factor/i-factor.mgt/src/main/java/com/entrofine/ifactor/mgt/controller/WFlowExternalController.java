package com.entrofine.ifactor.mgt.controller;

import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;

import jt.classic.system.ISystem;
import jt.classic.system.database.SystemDataSource;
import jt.classic.system.tableview.TableView;
import jt.classic.system.tableview.TableViewCenter;
import jt.classic.system.workflow.WActivity;
import jt.classic.system.workflow.WInstance;
import jt.classic.system.workflow.WInstanceManager;

import org.limp.basework.impl.CommonBean4HSQ;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * workflow external controller
 * 
 * @author fengjj
 */
@Controller
@RequestMapping(value = "/flowexternal")
public class WFlowExternalController {
	/**
	 * import blacklist data
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "findInstance", method = RequestMethod.POST)
	@ResponseBody
	public Object getInstanceByObject(HttpServletRequest request)
			throws Exception {
		CommonBean4HSQ cbh = new CommonBean4HSQ(request);

		String id = (String) cbh.getResource().get("id");
		String tv = (String) cbh.getResource().get("tv");

		TableView view = TableViewCenter.getInstance().getTableView(tv);

		Connection conn = null;
		try {
			conn = SystemDataSource.getInstance().getConnection();

			WInstanceManager wim = new WInstanceManager(conn);

			WInstance instance = wim.getInstanceByObjectData(view
					.iprimarytable().getName(), id);

			WActivity activity = instance.imaxactivity();

			request.setAttribute("result", "{success: true, data:{insId : '"
					+ instance.id() + "', actId : '" + activity.id() + "'}}");
		} catch (Exception e) {
			request.setAttribute("result", "{success: false}");
			ISystem.catchException(this, e);
		} finally {
			SystemDataSource.closeConnection(conn);
		}
		return new ModelAndView("result");
	}
}