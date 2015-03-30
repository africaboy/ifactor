<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.objectquery.ObjectQuery"%>
<%@ page import="jt.classic.system.objectquery.ObjectQueryItem"%>
<%@ page import="jt.classic.system.objectquery.ObjectQueryRegister"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	String queryKey = StringTool.checkString(request.getParameter("queryKey"));
	
	String orderby = StringTool.checkString(request.getParameter("orderby"));
	
	String orderbyKey = StringTool.checkString(request.getParameter("orderbykey"));

	ObjectQueryRegister register = ObjectQueryRegister.getInstance();
	
	ObjectQuery query = register.get(queryKey);
	
	if(query != null){
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">
<title>General Query List Page</title>
<jsp:include page="../../system/head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/objquery/css/querylist4ext.css" />
<script src="<%=context %>/system/objquery/js/querylist4ext.js"></script>
<%
	if(!StringTool.checkString(query.iCssUrl()).equals("")){
%>
<link rel="stylesheet" type="text/css" href="<%=context + query.iCssUrl()%>" />
<%
	}
%>
<%
	if(!StringTool.checkString(query.iJsUrl()).equals("")){
%>
<script src="<%=context + query.iJsUrl()%>"></script>
<%
	}
%>
</head>
<!-- addMeMix 为查询自定义函数,用以在grid中添加自定义的组件,例如:toolbar,menu等 -->
<body onload="javascript:initQueryList('<%=queryKey %>', function(){addMeMix('<%=queryKey %>');}, '<%=orderby %>', '<%=orderbyKey %>');">
<form name="form1"></form>
</body>
</html>
<%}else{ %>
<p><font color="red">General Query <b>'<%=queryKey%>'</b> Not Yet Defined</font></p>
<%} %>
