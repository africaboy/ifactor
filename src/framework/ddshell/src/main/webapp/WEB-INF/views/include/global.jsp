<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglibs.jsp"%>
<c:if test="${empty INCLUDE_GLOBAL_JSP}">
  <c:set scope="request" var="INCLUDE_GLOBAL_JSP" value="INCLUDE_GLOBAL_JSP" />
  <c:set scope="request" var="base" value="<%= request.getContextPath()%>" />
  <c:set scope="request" var="version" value="<%= new java.util.HashMap()%>" />
  <c:set scope="request" var="self" value="<%= new java.util.HashMap()%>" />
  
  <c:set target="${version}" property="app">1.0</c:set>
  <c:set target="${version}" property="AdminLTE">1.2</c:set>
  <c:set target="${version}" property="html5shiv">3.7.0</c:set>
  <c:set target="${version}" property="respondjs">1.4.2</c:set>
  <c:set target="${version}" property="jquery">1.10.2</c:set>
  <c:set target="${version}" property="jquery-ui">1.10.4</c:set>
  <c:set target="${version}" property="jquery.fileupload">9.5.7</c:set>
  <c:set target="${version}" property="jquery.Jcrop">0.9.12</c:set>
  <c:set target="${version}" property="jquery.validation">1.12.0</c:set>
  <c:set target="${version}" property="bootstrap">3.0.3</c:set>
  <c:set target="${version}" property="handlebarsjs">1.3.0</c:set>
  <c:set target="${version}" property="metronic">3.3.0</c:set>

  <c:set target="${self}" property="locale"><%= org.springframework.web.servlet.support.RequestContextUtils.getLocale(request)%></c:set>
  <c:set target="${self}" property="theme"><spring:eval expression="@globalVars.theme" /></c:set>
  <c:set target="${self}" property="url"><%= request.getAttribute("javax.servlet.forward.request_uri")%></c:set>
  <c:set target="${self}" property="css" value="<%= new java.util.HashMap()%>" />
  <c:set target="${self}" property="js" value="<%= new java.util.HashMap()%>" />
  <c:set target="${self}" property="content" value="<%= new java.util.HashMap()%>" />
  <c:set target="${self}" property="nav" value="<%= new java.util.HashMap()%>" />
  
  <c:import url="/WEB-INF/views/include/ddshell-adapter.jsp" />
</c:if>