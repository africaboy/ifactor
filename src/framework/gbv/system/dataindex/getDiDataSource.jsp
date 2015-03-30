<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="jt.classic.system.databook.DataIndexScriptManager"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	DataIndexScriptManager dataIndexScriptManager = DataIndexScriptManager.getInstance();
	String script = dataIndexScriptManager.getDataScript();
%>
<%= script%>