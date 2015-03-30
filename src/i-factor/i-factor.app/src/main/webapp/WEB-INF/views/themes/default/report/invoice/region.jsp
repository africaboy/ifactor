<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title"><fmt:message key='report.aggregateInvoiceReportByRegion'/></c:set>
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
                      <table class="table table-bordered">
                        <thead>
                          <tr style="background:#bdd6ee;">
                            <th><fmt:message key='report.invoice.thead.region'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.submitted'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.processing'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.rejected'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.accepted'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.inAuctionOfBidded'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.inAuctionOfUnbidded'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.delisted'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.sold'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.disbursed'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.settled'/></th>
                            <th colspan="2"><fmt:message key='report.invoice.thead.overdue'/></th>
                          </tr>
                          <tr>
                            <th></th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                            <th>#</th><th>$</th>
                          </tr>
                        </thead>
                        <tbody>
                        <%-- <c:if test="${not empty page.content}">
                          <c:forEach var="item" items="${page.content}" varStatus="status">    
                          <tr>
                            <td>${item.sellerCompanyName }</td>
                            <td>${item.debtorName }</td>
                            <td>${item.finInvAmount }</td>
                            <td>${item.noOfOffers }</td>
                            <td>${item.curBestOffrInt }</td>
                            <td>${item.bestBuyerAdv }</td>
                            <td>${item.bestBuyerInt }</td>
                            <td>${item.rating}</td>
                            <td>${item.flowStatus }</td>
                            <td>${item.bestBuyerInt }</td>
                            <td>${item.rating}</td>
                            <td>${item.flowStatus }</td>
                          </tr>
                          </c:forEach>
                        </c:if> --%>
                        <tr>
                          <td>HN</td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                        </tr>
                        <tr>
                          <td>HCMC</td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                          <td>Total</td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                          <td></td><td></td>
                        </tr>
                        </tfoot>
                      </table>
                    </div>
                </div>
              </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
