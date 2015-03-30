<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title"><fmt:message key='report.sellerDetailedReport'/></c:set>
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
                            <th><fmt:message key='report.seller.detail.thead.no'/></th>
                            <th><fmt:message key='report.seller.detail.thead.sellerId'/></th>
                            <th><fmt:message key='report.seller.detail.thead.sellerRating'/></th>
                            <th><fmt:message key='report.seller.detail.thead.region'/></th>
                            <th><fmt:message key='report.seller.detail.thead.noOfInvoicesSubmitted'/></th>
                            <th><fmt:message key='report.seller.detail.thead.noOfInvoicesAccepted'/></th>
                            <th><fmt:message key='report.seller.detail.thead.accpetedInvoicesAmount'/></th>
                            <th><fmt:message key='report.seller.detail.thead.noOfInvoicesDisbursed'/></th>
                            <th><fmt:message key='report.seller.detail.thead.disbursedInvoicesAmount'/></th>
                            <th><fmt:message key='report.seller.detail.thead.weightedAveragePercentFinancing'/></th>
                            <th><fmt:message key='report.seller.detail.thead.weightedAverageInterestRate'/></th>
                            <th><fmt:message key='report.seller.detail.thead.noOfCancellations'/></th>
                          </tr>
                        </thead>
                        <tbody>
                        <c:if test="${not empty details}">
                        <c:forEach var="detail" items="${details}" varStatus="status">
                        <tr>
                          <td><c:out value="${status.index+1}"/></td>
                          <td>${detail[0]}</td>
                          <td>${detail[1]}</td>
                          <td>${detail[2]}</td>
                          <td>${detail[3]}</td>
                          <td>${detail[4]}</td>
                          <td>${detail[5]}</td>
                          <td>${detail[6]}</td>
                          <td>${detail[7]}</td>     
                          <td>${detail[8]}</td>   
                          <td>${detail[9]}</td>   
                          <td>${detail[10]}</td>                   
                        </tr>
                        </c:forEach>
                        </c:if>
                        </tbody>
                        <tfoot>
                        <tr>
                          <td><fmt:message key='report.footer.total'/></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>${detailsSum["sumNoOfInvSubmitted"]}</td>
                          <td>${detailsSum["sumNoOfInvAccepted"]}</td>
                          <td>${detailsSum["sumAmountOfInvAccepted"]}</td>
                          <td>${detailsSum["sumNoOfInvDisbursed"]}</td>
                          <td>${detailsSum["sumAmountOfInvDisbursed"]}</td>
                          <td></td>
                          <td></td>
                          <td>${detailsSum["sumAmountOfInvDisbursed"]}</td>
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
