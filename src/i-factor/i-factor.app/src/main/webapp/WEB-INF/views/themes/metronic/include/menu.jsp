<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglibs.jsp"%>
<c:forEach var="menu" items="${menus}">
        <li class="heading">
          <span class="badge badge-round badge-danger"></span>
          <h3 class="uppercase">${menu[self.i18n.menu_text]}</h3>
       
    <c:forEach var="menu2" items="${menu.children}">
    
        <li class="last<c:if test="${self.url == menu2.url}"> active open</c:if>">
          <a href="${base}${menu2.url}"  <c:if test="${not empty menu2.children}"> onclick="window.location='/seller/invoice/upload'"  </c:if>>
            <i class="${menu2.style}"></i>
            <span class="title">${menu2[self.i18n.menu_text]} </span>
          </a>
          <c:if test="${not empty menu2.children}"> 
           <ul class="sub-menu">
           
           <c:forEach var="menu3" items="${menu2.children}">
           
            <c:if test="${self.url == '/seller/invoice/apply'}">
             <li class="active">
            </c:if>
            <c:if test="${self.url != '/seller/invoice/apply'}">
            <li class="last<c:if test="${self.url == menu3.url}"> active open</c:if>">
            </c:if>
            
           
            <a href="${base}${menu3.url}">
              <i class="${menu3.style}"></i>
              <span class="title">${menu3[self.i18n.menu_text]}</span>
            </a>
           </li>
          </c:forEach>
           </ul>
          </c:if>
        </li>
  </c:forEach>
   </li>
</c:forEach>