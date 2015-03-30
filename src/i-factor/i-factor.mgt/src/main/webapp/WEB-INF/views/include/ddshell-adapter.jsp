<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.*,
                 jt.classic.system.user.IUser,
                 jt.classic.system.context.ISystemContext"%>
<%
IUser user = ISystemContext.getSessionUser(request);
HashMap<String, Object> loginUser = new HashMap<String, Object>();
loginUser.put("id", user.id());
loginUser.put("name", user.iname());
loginUser.put("loginName", user.ilogid());
%>
<%@ include file="/WEB-INF/views/include/taglibs.jsp"%>
<c:set scope="request" var="loginUser" value="<%= loginUser %>" />
