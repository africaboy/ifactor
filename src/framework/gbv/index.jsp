<%@ page contentType="text/html;charset=UTF-8"%>
<%
String context = jt.classic.system.context.ISystemContext.getContextPath();    
response.sendRedirect(context + "/system/console");
%>