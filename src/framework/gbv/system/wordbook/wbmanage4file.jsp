<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%@ page import="org.limp.mine.StringTool"%>	
<%
    String context = ISystemContext.getContextPath();

    String fileName = StringTool.checkString(request.getParameter("fileName"));
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>wordbook manager</title>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/wordbook/css/wbmanage.css" />
<script type="text/javascript" src="<%=context %>/system/wordbook/js/wbmanage4file.js"></script>
</head>
<body onload="javascript:initWordbookGrid('<%=fileName %>');">
</body>
</html>
