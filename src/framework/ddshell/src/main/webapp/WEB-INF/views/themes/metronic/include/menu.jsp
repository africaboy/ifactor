<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglibs.jsp"%>
<c:if test="${empty self.nav.menu.children}">
  <c:set target="${self.nav}" property="url" value="${base}${self.nav.menu.url}" />
  <c:if test="${self.url == self.nav.menu.url}">
    <c:set target="${self.nav}" property="className" value="active" />
  </c:if>
  <c:if test="${self.url != self.nav.menu.url}">
    <c:set target="${self.nav}" property="className" value="" />
  </c:if>
</c:if>
<c:if test="${not empty self.nav.menu.children}">
  <c:set target="${self.nav}" property="indent2" value="    ${self.nav.indent}" />
  <c:set target="${self.nav}" property="url" value="#" />
  <c:set target="${self.nav}" property="className" value="treeview" />
  <c:forEach var="menu" items="${self.nav.menu.children}">
    <c:if test="${self.url == menu.url}">
      <c:set target="${self.nav}" property="className" value="treeview active" />
    </c:if>
  </c:forEach>
</c:if>
<c:if test="${empty self.nav.menu.styles}">
  <c:set target="${self.nav}" property="style" value="angle-double-right" />
  <c:set target="${self.nav}" property="styleX" value="" />
  <c:set target="${self.nav}" property="badgeText" value="" />
  <c:set target="${self.nav}" property="badgeColor" value="" />
</c:if>
<c:if test="${not empty self.nav.menu.styles}">
  <c:set target="${self.nav}" property="style" value="${self.nav.menu.styles[0]}" />
  <c:set target="${self.nav}" property="styleX" value="${self.nav.menu.styles[1]}" />
  <c:set target="${self.nav}" property="badgeText" value="${self.nav.menu.styles[2]}" />
  <c:set target="${self.nav}" property="badgeColor" value="${self.nav.menu.styles[3]}" />
</c:if>

${self.nav.indent}            <li<c:if test="${not empty self.nav.className}"> class="${self.nav.className}"</c:if>>
${self.nav.indent}              <a href="${self.nav.url}">
${self.nav.indent}                <i class="fa fa-${self.nav.style}"></i>
${self.nav.indent}                <span>${self.nav.menu.text}</span>
<c:if test="${self.nav.styleX == 'badge'}">
${self.nav.indent}                <small class="badge pull-right bg-${self.nav.badgeColor}">${self.nav.badgeText}</small>
</c:if>
<c:if test="${not empty self.nav.menu.children}">
${self.nav.indent}                <i class="fa fa-angle-left pull-right"></i>
</c:if>
${self.nav.indent}              </a>
<c:if test="${not empty self.nav.menu.children}">
${self.nav.indent}              <ul class="treeview-menu">
  <c:forEach var="menu" items="${self.nav.menu.children}">
    <c:set target="${self.nav}" property="menu" value="${menu}" />
    <c:set target="${self.nav}" property="indent" value="${self.nav.indent2}" />
    <c:import url="/WEB-INF/views/themes/default/include/menu.jsp" />
  </c:forEach>
${self.nav.indent}              </ul>
</c:if>
${self.nav.indent}            </li>
<c:if test="${not empty self.nav.indent}">
  <c:set target="${self.nav}" property="indent" value="${fn:substring(self.nav.indent,4,100)}" />
</c:if>
