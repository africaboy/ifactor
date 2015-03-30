<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>   
<%
    String context = jt.classic.system.context.ISystemContext.getContextPath();
    String e = StringTool.checkString(request.getParameter("e"));
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>错误页面</title>
</head>
<link rel="StyleSheet" href="<%=context %>/resources/common/css/mystyle.css" type="text/css" />
<body>
<table class="tab-noborder" width="100%">
  <tr>
  <td valign="top">&nbsp;
  <%if(e.equals("logerror")){%>
       错误的用户名或密码，请重新<a href="<%=context%>/system/console/login.jsp">登录</a>
  <%}else if(e.equals("matcherror")){%>
       当前帐号没有系统管理员权限，请使用具有系统管理员权限的帐号<a href="<%=context%>/system/console/login.jsp">登录</a>
  <%}%>
  </td>
  </tr>
</table>  
</body>
</html>