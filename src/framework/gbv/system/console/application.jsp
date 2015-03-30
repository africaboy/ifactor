<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="jt.classic.system.IApplication"%>
<%
	StringBuffer result = new StringBuffer();

	result.append("{success: true, data:{");

	result.append(IApplication.COPYRIGHT + ": '"
			+ IApplication.D(IApplication.COPYRIGHT) + "',");
	result.append(IApplication.INDEX + ": '"
			+ IApplication.D(IApplication.INDEX) + "',");
	result.append(IApplication.DESKTOP + ": '"
			+ IApplication.D(IApplication.DESKTOP) + "',");
	result.append(IApplication.LOGIN + ": '"
			+ IApplication.D(IApplication.LOGIN) + "',");
	result.append(IApplication.NAME + ": '"
			+ IApplication.D(IApplication.NAME) + "',");
	result.append(IApplication.PRODUCER + ": '"
			+ IApplication.D(IApplication.PRODUCER) + "',");
	result.append(IApplication.TITLE + ": '"
			+ IApplication.D(IApplication.TITLE) + "',");
	result.append(IApplication.VERSION + ": '"
			+ IApplication.D(IApplication.VERSION) + "',");
	result.append(IApplication.WELCOME + ": '"
			+ IApplication.D(IApplication.WELCOME) + "',");
	result.append(IApplication.THUMB + ": '"
			+ IApplication.D(IApplication.THUMB) + "',");
	result.append(IApplication.ICON + ": '"
			+ IApplication.D(IApplication.ICON) + "'");

	result.append("}");

	result.append("}");

	boolean scriptTag = false;

	String cb = request.getParameter("callback");

	if (cb != null) {
		scriptTag = true;
		response.setContentType("text/javascript");
	} else {
		response.setContentType("application/x-json");
	}

	if (scriptTag) {
		out.write(cb + "(");
	}
	//System.out.println(result.toString());
	out.print(result.toString());
	if (scriptTag) {
		out.write(");");
	}
%>
