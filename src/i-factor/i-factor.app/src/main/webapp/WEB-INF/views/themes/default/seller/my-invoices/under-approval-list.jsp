<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self}" property="title"><fmt:message key='myInvoice.underApproval.list.page.title'/></c:set>
<c:set target="${self.css}" property="main">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/seller/my-invoices/under-approval-list.js"></script>
    <script type="text/javascript">
    </script>
</c:set>

<c:set target="${self.content}" property="main">
              <div id="form-title"><c:out value="${form_title}" /></div>
              <div id="form-main">
                <form class="form-inline" id="formQuery" method="post" role="form">
                  <div class="form-group" style="width:100%">
                  	<div style="width:150px;float:left;">
                      <label class="control-label"><fmt:message key='invoice.list.queryForm.field.status'/>:</label>
                    </div>
                    <div style="width:650px;float:left;">
                      <c:forEach var="item" items="${stateChecks}" varStatus="status"> 
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" id="checkbox_${item.invoiceState.name}" name="status" value="${item.invoiceState.name}"<c:if test="${item.isChecked==true}"> checked</c:if> />
                          ${item.invoiceState.description}
                        </label>
                      </div>
                      </c:forEach>
                    </div>
                  </div> 
                
                  <div class="form-group" style="width:100%;">
                    <div style="width:150px;float:left;">
                      <label for="interest_rate_from" class="control-label" style="width:100px;"><fmt:message key='invoice.list.queryForm.field.interest_rate'/>:</label>
                    </div>
                    <div style="width:650px;float:left;">
                      <input type="text" class="form-inline" id="interest_rate_from" placeholder="0.00">
                      <label for="interest_rate_to">-</label>
                      <input type="text" class="form-inline" id="interest_rate_to" placeholder="100.00">
                      <button type="submit" class="btn btn-default btn-sm"><fmt:message key='invoice.list.queryForm.button.query'/></button>
                    </div>
                  </div>
                
                  <div class="clearfix row" style="margin-top:10px;">
                    <div class="col-sm-12">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th></th>
                            <th><fmt:message key='invoice.list.thead.sellerName'/></th>
                            <th><fmt:message key='invoice.list.thead.debtorName'/></th>
                            <th><fmt:message key='invoice.list.thead.invoiceAmt'/></th>
                            <th><fmt:message key='invoice.list.thead.readyToSellAdv'/></th>
                            <th><fmt:message key='invoice.list.thead.readyToSellInt'/></th>
                            <th><fmt:message key='invoice.list.thead.noOfOffers'/></th>
                            <th id="th-cboi"><a data-placement="top" rel="tooltip" href="#" title="<fmt:message key='invoice.list.thead.cboi.tooltip'/>"><fmt:message key='invoice.list.thead.cboi'/></a></th>
                            <th><fmt:message key='invoice.list.thead.rating'/></th>
                            <th><fmt:message key='invoice.list.thead.status'/></th>
                          </tr>
                        </thead>
                        <tbody>
                        <c:if test="${not empty page.content}">
                          <c:forEach var="item" items="${page.content}" varStatus="status">    
                          <tr>
                            <td width="20%">
                              <a href="${base}/seller/invoice/under-approval/detail/${item.id }" class="btn btn-default" target="main-iframe"><fmt:message key='invoice.list.tbody.button.detail'/></a>
                              <c:if test="${item.flowStatus=='Pending for data modify'}"> <a href="${base}/seller/invoice/under-approval/update/${item.id }" class="btn btn-default" target="main-iframe"><fmt:message key='invoice.list.tbody.button.update'/></a></c:if>
                            </td>
                            <td>${item.sellerCompanyName }</td>
                            <td>${item.debtorName }</td>
                            <td>${item.finInvAmount }</td>
                            <td>${item.readyToSellAdv }</td>
                            <td>${item.readyToSellInt }</td>
                            <td>${item.noOfOffers }</td>
                            <td>${item.curBestOffrInt }</td>
                            <td>${item.rating}</td>
                            <td>${item.flowStatus }</td>
                          </tr>
                          </c:forEach>
                        </c:if>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colspan="10">
                              <input type="hidden" name="pageNumber" value="${page.number}" />
                              <input type="hidden" name="pageSize" value="${page.size}" />
                              <%@ include file="/WEB-INF/views/themes/metronic/include/pagination.jsp"%>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
