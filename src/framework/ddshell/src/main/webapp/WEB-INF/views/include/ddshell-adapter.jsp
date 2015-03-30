<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglibs.jsp"%>
<spring:eval scope="request" var="loginUser" expression="@shiroUserService.getLoginUser()" />
<c:if test="${loginUser != null}">
  <spring:eval scope="request" var="menus" expression="@menuService.findLevel1Menus()" />
</c:if>