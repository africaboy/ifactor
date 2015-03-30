<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.RandomUtil"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.workflow.WSupport"%>
<%@ page import="jt.classic.system.workflow.WSupportCeneter"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	WSupportCeneter center = WSupportCeneter.getInstance();

	WSupport suport = WSupportCeneter.getDefaultSupport();

	List list = center.getSupportList();

	list.add(suport);

	String str = "";
	if (list != null && !list.isEmpty()) {
		for (int i = 0; i < list.size(); i++) {
			WSupport support = (WSupport) list.get(i);
			str += "['" + support.iname() + "', '" + support.ikey() + "'],";
		}
	}

	if (!str.equals("")) {
		str = str.substring(0, str.length() - 1);
	}

	request.setAttribute("result", "[" + str + "]");

	SystemTool.returnJson(request, response);
%>
