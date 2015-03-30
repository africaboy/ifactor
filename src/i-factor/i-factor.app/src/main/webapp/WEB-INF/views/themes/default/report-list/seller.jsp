<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/seller/my-invoices/in-auction-detail.js"></script>
</c:set>
           
<c:set target="${self.content}" property="main">
              <div class="form-content">
                <ul>
                  <li><a href="/report/seller/detail"><fmt:message key='report.sellerDetailedReport' /></a></li>
                  <li><a href="/report/seller/region"><fmt:message key='report.aggregateSellersReportByRegion' /></a></li>
                  <!-- <li><a href="/report/seller/debtor"><fmt:message key='report.aggregateSellersReportByCategoryOfDebtors' /></a></li> -->
                  <li><a href="/report/seller/sme-segment"><fmt:message key='report.aggregateSellersReportBySMESegments' /></a></li>
                  <!-- <li><a href="/report/seller/seller-rating"><fmt:message key='report.aggregateSellersReportBySellerRating' /></a></li> -->
                  <!-- <li><a href="/report/seller/debtor-rating"><fmt:message key='report.aggregateSellersReportByDebtorRating' /></a></li>
                  <li><a href="/report/seller/invoice-rating"><fmt:message key='report.aggregateSellersReportByInvoiceRating' /></a></li> -->
                </ul>
              </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>

