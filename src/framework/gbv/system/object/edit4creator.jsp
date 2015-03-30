<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.object.IObject"%>
<%
    String context = jt.classic.system.context.ISystemContext.getContextPath();

    WObject obj = (WObject)request.getAttribute("wobject");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><%=obj.iname()%></title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<jsp:include page="initial4object.jsp"></jsp:include>
<script src="<%=context%>/application/<%=obj.ikey()%>/js/<%=obj.ikey()%>.js"></script>
<link rel="StyleSheet" href="<%=context %>/application/<%=obj.ikey()%>/css/<%=obj.ikey()%>.css" type="text/css" />
<body>
<form id="form1" name="form1" method="post" enctype="multipart/form-data">
<!--startprint1--><%=obj.iview4new().replaceAll("&acute;", "'")%><!--endprint1-->
</form>
</body>
</html>
<script>init4window();</script>