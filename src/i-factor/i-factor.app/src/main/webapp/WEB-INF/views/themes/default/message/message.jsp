<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
    <!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-ui.css">
    <!-- CSS adjustments for browsers with JavaScript disabled -->
    <noscript><link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-noscript.css"></noscript>
    <noscript><link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-ui-noscript.css"></noscript>
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
<script type="text/javascript" src="${base}/static/themes/default/js/seller/account/apply-as-seller.js"></script>
</c:set>

<c:set target="${self.content}" property="sidemenu">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Invoice in the market</a>
                    </h4>
                  </div>
                  <div id="collapseOne" class="panel-collapse collapse">
                    <div class="panel-body">
                      <a href="${base }/seller/market-invoices">Invoice in the market</a>
                    </div>        
                  </div>
                </div>
                 
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">My Invoices</a>
                    </h4>
                  </div>
                  <div id="collapseTwo" class="panel-collapse collapse">
                    <div class="panel-body">
                      <a href="${base}/seller/my-invoices/submit">Sumbit new invoice</a>
                    </div>
                    <div class="panel-body">
                      <a href="${base}/seller/my-invoices/under-approval/list"<c:if test="${page_state=='under-approval'}"> class="active"</c:if>>Invoices under Approval</a>
                    </div>
                    <div class="panel-body">
                      <a href="${base}/seller/my-invoices/in-auction/list"<c:if test="${page_state=='in-auction'}"> class="active"</c:if>>Invoices in Auction</a>
                    </div>
                    <div class="panel-body">
                      <a href="${base}/seller/my-invoices/after-auction/list"<c:if test="${page_state=='after-auction'}"> class="active"</c:if>>Invoices after Auction</a>
                    </div>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">Account Management</a>
                    </h4>
                  </div>
                  <div id="collapseThree" class="panel-collapse collapse in">
                    <div class="panel-body">
                      <a href="${base}/seller/account/change-password">Change Password</a>
                    </div>
                    <div class="panel-body">
                      <a href="${base}/seller/account/my-profile">My Profie</a>
                    </div>
                    <div class="panel-body">
                      <a href="${base}/seller/account/update-profile">Update Profie</a>
                    </div>
                    <div class="panel-body">
                      <a href="${base}/seller/account/apply-as-seller" class="active">Apply as Seller</a>
                    </div>
                  </div>
                </div>
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
