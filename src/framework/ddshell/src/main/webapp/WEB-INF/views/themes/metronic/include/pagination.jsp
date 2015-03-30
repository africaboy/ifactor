<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# 分页片段
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
              <c:if test="${not empty page.content}">
              <div class="box-footer clearfix">
                <ul class="pagination pagination-sm no-margin pull-right">
                  <c:if test="${page.firstPage}">
                  <li class="disabled"><a href="#">&laquo;</a></li>
                  </c:if>
                  <c:if test="${!page.firstPage}">
                  <li><a href="#" data-page-number="${page.number-1}">&laquo;</a></li>
                  </c:if>
                  <spring:eval var="pageNumberStart" expression="@pageableSupport.getPageNumberStart(page)" />
                  <spring:eval var="pageNumberEnd" expression="@pageableSupport.getPageNumberEnd(page)" />
                  <c:forEach var="p" begin="${pageNumberStart}" end="${pageNumberEnd}">
                  <li<c:if test="${page.number==p}"> class="active"</c:if>><a href="#" data-page-number="${p}">${p+1}</a></li>
                  </c:forEach>
                  <c:if test="${page.lastPage}">
                  <li class="disabled"><a href="#">&raquo;</a></li>
                  </c:if>
                  <c:if test="${!page.lastPage}">
                  <li><a href="#" data-page-number="${page.number+1}">&raquo;</a></li>
                  </c:if>     
                </ul>
              </div>
              </c:if>
