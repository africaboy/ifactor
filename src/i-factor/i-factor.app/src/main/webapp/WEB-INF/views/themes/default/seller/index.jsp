<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript">
    $(function () {
      //$('.selectpicker').selectpicker();
      $('.dropmenu').dropdown('toggle');
    });
   </script>
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
                      <a href="/seller/market-invoices" class="active">Invoice in the market</a>
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
                      <a href="/seller/my-invoices/submit">Sumbit new invoice</a>
                    </div>
                    <div class="panel-body">
                      <a href="/seller/my-invoices/under-approval/list">Invoices under Approval</a>
                    </div>
                    <div class="panel-body">
                      <a href="/seller/my-invoices/in-auction/list">Invoices in Auction</a>
                    </div>
                    <div class="panel-body">
                      <a href="/seller/my-invoices/after-auction/list">Invoices after Auction</a>
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
                      <a href="/seller/account/change-password">Change Password</a>
                    </div>
                    <div class="panel-body">
                      <a href="/seller/account/my-profile">My Profie</a>
                    </div>
                    <div class="panel-body">
                      <a href="/seller/account/update-profile">Update Profie</a>
                    </div>
                    <div class="panel-body">
                      <a href="/seller/account/apply-as-seller" class="active">Apply As Seller</a>
                    </div>
                    <div class="panel-body">
                      <a href="src/main/webapp/WEB-INF/views/themes/default/seller/index.jsp" class="active">calculator</a>
                    </div>
                  </div>
                </div>
</c:set> 
           

<c:set target="${self.content}" property="main">
</c:set>
<c:set target="${self.content}" property="free">
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
