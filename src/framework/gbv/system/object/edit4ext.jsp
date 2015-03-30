<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool" %>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%
	WObject obj = (WObject)request.getAttribute("obj");
	
	
	String result = null;

	if (obj == null) {
		result = "{success: false, errorCode : -1}";
	} else if (!obj.iview4diy()) {
		result = "{success: false, errorCode : -2}";
	}else{
		result = "{success: true, data:{oname:'" + obj.iname()
		+ "', okey:'" + obj.ikey() + "',ohandle:'"
		+ StringTool.checkString(obj.ieventhandler()) + "',system:'" + (obj.isupport() != null ? obj.isupport().ikey() : "")
		+ "',system1:'"+(obj.isupport() != null ? obj.isupport().iname() : "")+"', ocontent:'" + obj.iview4new().replaceAll("&acute;", "'") + "'}}";
	}

	request.setAttribute("result", result);
	
	SystemTool.returnJson(request, response);
%>