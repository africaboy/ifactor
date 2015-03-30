<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.limp.mine.Label"%>
<%@ page import="org.limp.mine.Controller"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.object.IObject"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.objectquery.ObjectQuery"%>
<%@ page import="jt.classic.system.objectquery.ObjectQueryRegister"%>
<%@ page import="jt.classic.system.objectquery.ObjectQueryItem"%>
<%@ page import="jt.classic.system.objectquery.ObjectARGTool"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

    /*通用查询唯一标识*/
    String querykey = StringTool.checkString(request.getParameter("querykey"));
    
    ObjectQuery objectQuery = ObjectQueryRegister.getInstance().get(querykey);
    
    WObject object = objectQuery.iobject();

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>数据查询列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script
	src="<%=context%>/application/<%=object.ikey()%>/js/<%=object.ikey()%>.js"></script>
<link rel="StyleSheet"
	href="<%=context %>/application/<%=object.ikey()%>/css/<%=object.ikey()%>.css"
	type="text/css" />
<link rel="StyleSheet"
	href="<%=context %>/system/object/css/objectmanage.css"
	type="text/css" />	
<script language="javascript" src="<%=context %>/system/object/js/objectarglist.js"></script>
<body onload="javascript:initObjectARGListInPage('<%=querykey %>');">
</body>
</html>
