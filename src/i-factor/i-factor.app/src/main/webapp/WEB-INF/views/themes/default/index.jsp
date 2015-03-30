<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<shiro:guest>
  <%@ include file="/WEB-INF/views/themes/default/home.jsp" %>
</shiro:guest>

<shiro:hasRole name="PRE_BUYER">
  <c:if test="${user.investAs == 'Private investor' }">
    <c:redirect url="${base}/buyer/account/applyprivate"/>
  </c:if>
  <c:else>
    <c:redirect url="${base}/buyer/account/applycompany"/>
  </c:else>
</shiro:hasRole>
<shiro:hasRole name="PRE_BUYER_VIEW">
  <c:redirect url="${base}/buyer/account/view"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_BUYER_UPDATE">
  <c:redirect url="${base}/buyer/account/update"/>
</shiro:hasRole>

<shiro:hasRole name="PRE_SELLER">
  <c:redirect url="${base}/seller/account/apply"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_SELLER_VIEW">
  <c:redirect url="${base}/seller/account/view"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_SELLER_UPDATE">
  <c:redirect url="${base}/seller/account/update"/>
</shiro:hasRole>

<shiro:hasRole name="BUYER">
  <c:redirect url="${base}/buyer/bid/open"/>
</shiro:hasRole>
<shiro:hasRole name="VPBANK">
  <c:redirect url="${base}/buyer/bid/open"/>
</shiro:hasRole>
<shiro:hasRole name="SELLER">
  <c:redirect url="${base}/seller/invoice/in-auction"/>
</shiro:hasRole>
