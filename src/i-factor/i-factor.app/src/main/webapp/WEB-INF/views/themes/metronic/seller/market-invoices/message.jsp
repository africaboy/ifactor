<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">EntroAuction</c:set>
<c:set target="${self.css}" property="main">
    <style type="text/css">
    </style>
</c:set>

<c:set target="${self.content}" property="main">
              <div id="form-title">Message</div>
              <div id="form-main">
                <div style="text-align: center;">
                	${message}
                </div>
              </div>
              
</c:set>
<c:set target="${self.content}" property="free">
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
