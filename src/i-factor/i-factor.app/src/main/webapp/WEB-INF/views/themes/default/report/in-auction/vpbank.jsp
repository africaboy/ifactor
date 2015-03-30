<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title"><fmt:message key='report.linkTextInAuctionForVPBank'/></c:set>
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
                      <div style="width:100%;overflow-x:auto;">
                      <table class="table table-bordered">
                        <thead>
                          <tr style="background:#bdd6ee;">
                            <th><fmt:message key='report.inAuction.thead.no'/></th>
                            <th><fmt:message key='report.inAuction.thead.releasedDateForVPBank'/></th>
                            <th><fmt:message key='report.inAuction.thead.invoiceId'/></th>
                            <th><fmt:message key='report.inAuction.thead.invoiceAmount'/></th>
                            <th><fmt:message key='report.inAuction.thead.sellerId'/></th>
                            <th><fmt:message key='report.inAuction.thead.sellerRating'/></th>
                            <th><fmt:message key='report.inAuction.thead.debtorId'/></th>
                            <th><fmt:message key='report.inAuction.thead.expectedSettlementDate'/></th>
                            <th><fmt:message key='report.inAuction.thead.remainingTerm'/></th>
                            <th><fmt:message key='report.inAuction.thead.delistingDate'/></th>
                            <th><fmt:message key='report.inAuction.thead.remainingDaysTillDelisting'/></th>
                            <th><fmt:message key='report.inAuction.thead.noOfBids'/></th>
                            <th><fmt:message key='report.inAuction.thead.readyToSellAdv'/></th>
                            <th><fmt:message key='report.inAuction.thead.readyToSellInt'/></th>
                            <th><fmt:message key='report.inAuction.thead.cboa'/></th>
                            <th><fmt:message key='report.inAuction.thead.cboi'/></th>
                          </tr>
                        </thead>
                        <tbody>
                        <c:if test="${not empty details}">
                        <c:forEach var="detail" items="${details}" varStatus="status">
                        <tr>
                          <td><c:out value="${status.index+1}"/></td>
                          <td>${detail.releasedDate}</td>
                          <td>${detail.invoiceId}</td>
                          <td>${detail.invoiceAmount}</td>
                          <td>${detail.sellerId}</td>
                          <td>${detail.sellerRating}</td>
                          <td>${detail.debtorId}</td>
                          <td>${detail.expectedSettlementDate}</td>
                          <td>${detail.remainingTerm}</td>
                          <td>${detail.delistingDate}</td>     
                          <td>${detail.remainingDaysTillDelisting}</td>   
                          <td>${detail.noOfBids}</td>   
                          <td>${detail.readyToSellAdv}</td>    
                          <td>${detail.readyToSellInt}</td>  
                          <td>${detail.cboa}</td>  
                          <td>${detail.cboi}</td>                 
                        </tr>
                        </c:forEach>
                        </c:if>
                        </tbody>
                        <tfoot>
                        <tr>
                          <td><fmt:message key='report.footer.total'/></td>
                          <td></td>
                          <td></td>
                          <td>${detailsSum["sumInvoiceAmount"]}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>     
                          <td></td>   
                          <td>${detailsSum["sumNoOfBids"]}</td>   
                          <td></td>    
                          <td></td>  
                          <td></td>  
                          <td></td>
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
