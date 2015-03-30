<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title"><fmt:message key='report.aggregateBuyerersReportByRegion'/></c:set>
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
                            <th><fmt:message key='report.buyer.thead.region'/></th>
                            <th><fmt:message key='report.buyer.thead.applied'/></th>
                            <th><fmt:message key='report.buyer.thead.accepted'/></th>
                            <th><fmt:message key='report.buyer.thead.invested'/></th>
                            <th><fmt:message key='report.buyer.thead.weightedAverageAdvance'/></th>
                            <th><fmt:message key='report.buyer.thead.weightedAverageInterest'/></th>
                            <th><fmt:message key='report.buyer.thead.regulatoryBlacklisted'/></th>
                            <th><fmt:message key='report.buyer.thead.cancellationBlacklisted'/></th>
                          </tr>
                        </thead>
                        <tbody>
                        <c:if test="${not empty details}">
                        <c:forEach var="item" items="${details}" varStatus="status"> 
                        <tr>
                          <td>${item.region}</td>
                          <td>${item.applied}</td>
                          <td>${item.accepted}</td>
                          <td>${item.invested}</td>
                          <td>${item.weightedAvgAdv}</td>
                          <td>${item.weightedAvgInt}</td>
                          <td>${item.regulatoryBlacklisted}</td>
                          <td>${item.cancellationBlacklisted}</td>
                        </tr>
                        </c:forEach>
                        </c:if>
                        </tbody>
                        <tfoot>
                        <tr>
                          <td><fmt:message key='report.footer.total'/></td>
                          <td>${detailsSum["sumApplied"]}</td>
                          <td>${detailsSum["sumAccepted"]}</td>
                          <td>${detailsSum["sumInvested"]}</td>
                          <td></td>
                          <td></td>
                          <td>${detailsSum["sumRegulatoryBlacklisted"]}</td>
                          <td>${detailsSum["sumCancellationBlacklisted"]}</td>
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
