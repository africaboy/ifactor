<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   String msg = (String)request.getAttribute("msg");
   
   if(msg == null){
       msg = "操作成功";   
   }
%>	
<html>
<body>
<form name="form1" method="post" action="">
<h3>操作成功</h3>
<%=msg%>
</form>
</body>
</html>