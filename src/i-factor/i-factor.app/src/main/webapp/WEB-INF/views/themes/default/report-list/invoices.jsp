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
                  <li><a href="/report/invoice/region"><fmt:message key='report.aggregateInvoiceReportByRegion' /></a></li>
                  <li><a href="/report/invoice/debtor"><fmt:message key='report.aggregateInvoiceReportByDebtor' /></a></li>
                  <li><a href="/report/invoice/maturity-date"><fmt:message key='report.aggregateInvoiceReportByMaturityDate' /></a></li>
                  <li><a href="/report/invoice/sme-segment"><fmt:message key='report.aggregateInvoiceReportBySMESegment' /></a></li>
                  <li><a href="/report/invoice/seller"><fmt:message key='report.aggregateInvoiceReportBySeller' /></a></li>
                  <li><a href="/report/invoice/invoice-rating"><fmt:message key='report.aggregateInvoiceReportByInvoiceRating' /></a></li>
                  <li><a href="/report/invoice/remaining31days"><fmt:message key='report.aggregateInvoiceReportByRemaining31Days' /></a></li>
                  <li><a href="/report/invoice/remaining21days"><fmt:message key='report.aggregateInvoiceReportByRemaining21Days' /></a></li>
                </ul>
              </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>

