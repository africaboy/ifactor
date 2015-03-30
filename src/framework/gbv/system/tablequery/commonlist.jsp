<%@ page contentType="text/html;charset=UTF-8"%>

<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.tablequery.TableQuery"%>
<%@ page import="jt.classic.system.tablequery.TableQueryCenter"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	String size = StringTool.checkString(request.getParameter("size"));
	
	if(size.equals("")){
		size = "20";
	}

	String queryKey = StringTool.checkString(request.getParameter("queryKey"));
	
    String orderby = StringTool.checkString(request.getParameter("orderby"));
	
	String orderbyKey = StringTool.checkString(request.getParameter("orderbykey"));

	TableQueryCenter register = TableQueryCenter.getInstance();
	
	TableQuery query = register.getTableQuery(queryKey);
	
	if(query != null){
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8"/>
<title>通用查询列表页面</title>
<jsp:include page="../../system/head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/tablequery/css/querylist4ext.css" />
<script src="<%=context %>/system/tablequery/js/querylist4ext.js"></script>
<%
	if(!StringTool.checkString(query.icssurl()).equals("")){
%>
<link rel="stylesheet" type="text/css" href="<%=context + query.icssurl()%>" />
<%
	}
%>
<%
	if(!StringTool.checkString(query.ijsurl()).equals("")){
%>
<script src="<%=context + query.ijsurl()%>"></script>
<%
	}
%>
</head>
<!-- addMeMix 为查询自定义函数,用以在grid中添加自定义的组件,例如:toolbar,menu等 -->
<body onload="javascript:initTQExtList('<%=queryKey %>', function(){addMeMix('<%=queryKey %>');}, '<%=orderby %>', '<%=orderbyKey %>', '<%=size %>');">
<form id="form1" name="form1" method="post">
<div id="divstr" style="width:800px;600px;"></div>
</form>
</body>
</html>
<%}else{ %>
<p><font color="red">表数据通用查询 <b>'<%=queryKey%>'</b> 尚未定义</font></p>
<%} %>
