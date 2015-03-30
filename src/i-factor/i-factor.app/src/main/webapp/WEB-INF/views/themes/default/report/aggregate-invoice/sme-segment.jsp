<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title"><fmt:message key='report.textAggregateInvoiceReportBySmeSegment'/></c:set>
<c:set target="${self.css}" property="main">
    <style type="text/css">
    .table-bordered,
    .table-bordered>thead>tr>th, 
    .table-bordered>tbody>tr>th, 
    .table-bordered>tfoot>tr>th, 
    .table-bordered>thead>tr>td, 
    .table-bordered>tbody>tr>td, 
    .table-bordered>tfoot>tr>td {
      border: 1px solid #000;
    }
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript">
    </script>
</c:set>

<c:set target="${self.content}" property="main">
              <div id="form-title"><c:out value="${form_title}" /></div>
              <div id="form-main">
                
                  <div class="clearfix row" style="margin-top:10px;">
                    <div class="col-sm-12">
                      <div style="width:100%; overflow-x:auto;"> 
                      <table class="table table-bordered">
                        <thead>
                          <tr style="background:#bdd6ee;">
                            <th><fmt:message key='report.aggregateInvoice.thead.smeSegment'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.uploaded'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.inProcessing'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.rejected'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.accepted'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.inAuctionBidded'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.inAuctionUnbidded'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.delisted'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.dealed'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.unsuccessfullyDisbursed'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.disbursed'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.settled'/></th>
                            <th colspan="2"><fmt:message key='report.aggregateInvoice.thead.overdue'/></th>
                          </tr>
                        </thead>
                        <tbody>
                        <c:if test="${not empty details}">
                          <c:forEach var="item" items="${details}" varStatus="status">    
                          <tr>
                            <td>${item.smeSegment }</td>
                            <td>${item.noUploaded}</td><td>${item.amtUploaded}</td>
                            <td>${item.noInProcessing}</td><td>${item.amtInProcessing}</td>
                            <td>${item.noRejected}</td><td>${item.amtRejected}</td>
                            <td>${item.noAccepted}</td><td>${item.amtAccepted}</td>
                            <td>${item.noInAuctionBidded}</td><td>${item.amtInAuctionBidded}</td>
                            <td>${item.noInAuctionUnbidded}</td><td>${item.amtInAuctionUnbidded}</td>
                            <td>${item.noDelisted}</td> <td>${item.amtDelisted}</td>
                            <td>${item.noDealed}</td><td>${item.amtDealed}</td>
                            <td>${item.noUnsuccessfullyDisbursed}</td><td>${item.amtUnsuccessfullyDisbursed}</td>
                            <td>${item.noDisbursed}</td><td>${item.amtDisbursed}</td>
                            <td>${item.noSettled}</td><td>${item.amtSettled}</td>
                            <td>${item.noOverdue}</td><td>${item.amtOverdue}</td>
                          </tr>
                          </c:forEach>
                        </c:if>
                        
                        </tbody>
                        <tfoot>
                        <tr>
                          <td><fmt:message key='report.footer.total'/></td>
                          <td>${detailsSum["sumNoUploaded"]}</td><td>${detailsSum["sumAmtUploaded"]}</td>
                          <td>${detailsSum["sumNoInProcessing"]}</td><td>${detailsSum["sumAmtInProcessing"]}</td>
                          <td>${detailsSum["sumNoRejected"]}</td><td>${detailsSum["sumAmtRejected"]}</td>
                          <td>${detailsSum["sumNoAccepted"]}</td><td>${detailsSum["sumAmtAccepted"]}</td>
                          <td>${detailsSum["sumNoInAuctionBidded"]}</td><td>${detailsSum["sumAmtInAuctionBidded"]}</td>
                          <td>${detailsSum["sumNoInAuctionUnbidded"]}</td><td>${detailsSum["sumAmtInAuctionUnbidded"]}</td>
                          <td>${detailsSum["sumNoDelisted"]}</td> <td>${detailsSum["sumAmtDelisted"]}</td>
                          <td>${detailsSum["sumNoDealed"]}</td><td>${detailsSum["sumAmtDealed"]}</td>
                          <td>${detailsSum["sumNoUnsuccessfullyDisbursed"]}</td><td>${detailsSum["sumAmtUnsuccessfullyDisbursed"]}</td>
                          <td>${detailsSum["sumNoDisbursed"]}</td><td>${detailsSum["sumAmtDisbursed"]}</td>
                          <td>${detailsSum["sumNoSettled"]}</td><td>${detailsSum["sumAmtSettled"]}</td>
                          <td>${detailsSum["sumNoOverdue"]}</td><td>${detailsSum["sumAmtOverdue"]}</td>
                        </tr>
                        </tfoot>
                      </table>
                      </div>
                    </div>
                </div>
              </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
