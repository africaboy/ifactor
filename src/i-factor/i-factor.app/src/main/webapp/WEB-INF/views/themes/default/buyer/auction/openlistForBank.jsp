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
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
    
    <script type="text/javascript" src="${base}/static/themes/default/js/buyer/auction/openlistForBank.js"></script>
</c:set>
<c:set target="${self.content}" property="main">
                <div id="form-div">
                <div id="form-title">Open Auction</div>
                <div id="form-main">
		          <div>
		            <form class="form-inline" action="${base}/buyer/auction/openListForVpbank"  id="formQuery" name="formQuery"  method="post" role="form">
		              <div class="form-group" style="width:100%">
	                  	<div style="width:150px;float:left;">
	                      <label class="control-label"><fmt:message key='auction.list.queryForm.field.status'/>:</label>
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
	                  
	                  <div class="row">
	                    <div class="col-sm-12">
                          <div class="col-sm-3">
                            <label class="control-label" for="inputSuccess"><fmt:message key='auction.list.queryForm.field.interest_rate'/>:</label>
                          </div>
                          <div class="col-sm-2">
                            <input type="text" class="form-control input-sm" id="interestFrom"  name="interestFrom" placeholder="0.00">
                          </div>
                          <div class="col-sm-1">
                            <label class="control-label" for="inputSuccess">-</label>
                          </div>
                          <div class="col-sm-2">
                            <input type="text" class="form-control input-sm" id="interestTo"  name="interestTo"  placeholder="100.00">
                          </div>
                          <div class="col-sm-1">
                            <button type="submit" class="btn btn-default"><fmt:message key='auction.list.queryForm.button.query'/></button>
                          </div>
	                    </div>
	                  </div>
	                    
                      <div  class="clearfix row" style="margin-top:10px;">
                        <div class="col-sm-12">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th></th>
                                <th><fmt:message key='auction.list.thead.no'/></th>
                                <th><fmt:message key='auction.list.thead.invoiceId'/></th>
                                <th><fmt:message key='auction.list.thead.sellerCompanyName'/></th>
                                <th><fmt:message key='auction.list.thead.debtorName'/></th>
                                <th><fmt:message key='auction.list.thead.invoiceAmt'/></th>
                                <th><fmt:message key='auction.list.thead.bestAdv'/></th>
                                <th><fmt:message key='auction.list.thead.bestInt'/></th>
                                <th id="th-cboi"><a data-placement="top" rel="tooltip" href="#" title="<fmt:message key='auction.list.thead.cboi.tooltip'/>"><fmt:message key='auction.list.thead.cboi'/></a></th>
                                <th><fmt:message key='auction.list.thead.rating'/></th>
                                <th><fmt:message key='auction.list.thead.status'/></th>
                                
                              </tr>
                            </thead>
                            <tbody>
                            <c:if test="${not empty page.content}">
                             <c:forEach var="item" items="${page.content}" varStatus="status">  
                              <tr>
	                            <td>
	                              <a href="/buyer/openauction/openDetail/${item.id}" class="btn btn-default" target="main-iframe">Detail</a>
	                              <!-- <button type="button" class="btn btn-primary" id="invoice_detail_1">Detail</button>-->
	                            </td>
	                            <td>${status.index + 1}</td>  
	                            <td>${item.id}</td>
	                            <td>${item.sellerCompanyName }</td>
	                            <td>${item.debtorName }</td>
	                            <td>${item.finInvAmount }</td>
	                            <td>${item.bestBuyerAdv }</td>
	                            <td>${item.bestBuyerInt }</td>
	                            <td>${item.readyToSellInt }</td>
	                            <td>${item.rating}</td>
	                            <td>${item.flowStatus}</td>
                              </tr>
                            </c:forEach>
                          </c:if>
                         </tbody>
                         <tfoot>
                           <tr>
                             <td colspan="11">
                               <input type="hidden" name="pageNumber" value="${page.number}" />
                               <input type="hidden" name="pageSize" value="${page.size}" />
                               <%@ include file="/WEB-INF/views/themes/metronic/include/pagination.jsp"%>
                             </td>
                           </tr>
                         </tfoot>
                       </table>
                      </div>
                      </div>
	                </form>
		          </div>
		        </div>
	          </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
