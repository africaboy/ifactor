<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WFlow"%>
<%@ page import="jt.classic.system.workflow.WStep"%>
<%@ page import="jt.classic.system.workflow.WTrend"%>
<%@ page import="jt.classic.system.workflow.WHandle"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%
    String context = jt.classic.system.context.ISystemContext.getContextPath();
    
    WFlow flow = (WFlow)request.getAttribute("flow");
    WObject obj = flow.iobject();  
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><%=obj.iname()%></title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<jsp:include page="initial4classic.jsp"></jsp:include>
<script src="<%=context%>/application/<%=obj.ikey()%>/js/<%=obj.ikey()%>.js"></script>
<link rel="StyleSheet" href="<%=context %>/application/<%=obj.ikey()%>/css/<%=obj.ikey()%>.css" type="text/css" />
<body>
<form id="form1" name="form1" method="post" enctype="multipart/form-data" action="">
<p>&nbsp;</p>
<table width="90%" align="center"><tr><td align="left">
<div id="flowToolbarArea"></div>
</td></tr></table>
<p>&nbsp;</p>
<div class="shadow">
    <div class="con">
	<%=obj.iview4new()%>
	</div>
</div>
</form>
<p>&nbsp;</p>
<p>&nbsp;</p>
</body>
</html>
<script>initwindow();</script>