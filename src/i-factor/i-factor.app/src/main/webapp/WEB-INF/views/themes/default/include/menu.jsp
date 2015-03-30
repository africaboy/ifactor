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
  <c:set target="${self.nav}" property="next_indent" value="    ${self.nav.indent}" />
  <c:set target="${self.nav}" property="url" value="#" />
  <c:set target="${self.nav}" property="className" value="open" />
  <c:forEach var="menu" items="${self.nav.menu.children}">
    <c:if test="${self.url == menu.url}">
      <c:set target="${self.nav}" property="className" value="open active" />
    </c:if>
  </c:forEach>
</c:if>
<c:if test="${empty self.nav.menu.styles}">
  <c:set target="${self.nav}" property="style" value="angle-double-right" />
</c:if>
<c:if test="${not empty self.nav.menu.styles}">
  <c:set target="${self.nav}" property="style" value="${self.nav.menu.styles[0]}" />
</c:if>

${self.nav.indent}<li<c:if test="${not empty self.nav.className}"> class="${self.nav.className}"</c:if>>
${self.nav.indent}  <a href="${self.nav.url}">
${self.nav.indent}    <i class="${self.nav.style}"></i>
${self.nav.indent}    <span>${self.nav.menu[self.i18n.menu_text]}</span>
${self.nav.indent}  </a>
<c:if test="${not empty self.nav.menu.children}">
${self.nav.indent}  <ul class="submenu">
  <c:forEach var="menu" items="${self.nav.menu.children}">
    <c:set target="${self.nav}" property="menu" value="${menu}" />
    <c:set target="${self.nav}" property="indent" value="${self.nav.next_indent}" />
    <c:import url="/WEB-INF/views/themes/default/include/menu.jsp" />
  </c:forEach>
${self.nav.indent}  </ul>
</c:if>
${self.nav.indent}</li>
<c:if test="${not empty self.nav.indent}">
  <c:set target="${self.nav}" property="indent" value="${fn:substring(self.nav.indent,4,100)}" />
</c:if>
