<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool" %>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
    String queryKey = StringTool.checkString(request.getParameter("queryKey"));
    String expType = StringTool.checkString(request.getParameter("expType"));
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8"/>
<title>通用查询数据导出页面</title>
<jsp:include page="../../system/head.jsp"></jsp:include>
<script src="<%=context %>/system/tablequery/js/querylist4export.js"></script>
<body onload="javascript:initQueryList4Export('<%=queryKey %>', '<%=expType %>');">
<form name="form1" method="post">
</form>
</body>
</html>