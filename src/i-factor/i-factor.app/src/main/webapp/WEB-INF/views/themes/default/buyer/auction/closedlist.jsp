<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
    <link href="${base}/static/libs/iCheck-master/skins/all.css?v=1.0.2" rel="stylesheet">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
     <script type="text/javascript" src="${base}/static/themes/default/js/buyer/auction/closedlist.js"></script>
    
    <script type="text/javascript">
    $(function () {
      //$('.selectpicker').selectpicker();
      $('.dropmenu').dropdown('toggle');
    });
   </script>
</c:set>
<c:set target="${self.content}" property="main">
                <div id="form-div">
                <div id="form-title">Open Auction</div>
                <div id="form-main">
		          <div>
		            <form class="form-inline" action="${base}/buyer/auction/closedList"  id="formQuery" name="formQuery"  method="post" role="form">
	                  <div class="form-group" style="width:100%">
	                  	<div style="width:150px;float:left;">
	                      <label class="control-label">Status:</label>
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
                            <label class="control-label" for="inputSuccess">Interest rate:</label>
                          </div>
                          <div class="col-sm-2">
                            <input type="text" class="form-control input-sm"  id="interestFrom"  name="interestFrom" placeholder="0.00">
                          </div>
                          <div class="col-sm-1">
                            <label class="control-label" for="inputSuccess">-</label>
                          </div>
                          <div class="col-sm-2">
                            <input type="text" class="form-control input-sm" id="interestTo"  name="interestTo" placeholder="100.00">
                          </div>
                          <div class="col-sm-1">
                            <button type="submit" class="btn btn-default">Query</button>
                          </div>
	                    </div>
	                  </div>
	                    
                      <div class="row">
                        <div class="col-sm-12">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th></th>
                                <th>No.</th>
                                <th>Invoice Id</th>
                                <th>Seller Company name</th>
                                <th>Debtor name</th>
                                <th>Invoice amount</th>
                                <th>Advance(%)</th>
                                <th>Interest(% per a year)</th>
                                <th>Invoice state</th>
                                <th>Current best interest(% per a year)</th>
                                <th>Rating</th>
                              </tr>
                            </thead>
                            <tbody>
                            <c:if test="${not empty page.content}">
                             <c:forEach var="item" items="${page.content}" varStatus="status">  
                              <tr>
	                            <td>
	                              <a href="/buyer/closedauction/closedAuctionDetail/${item.id}" class="btn btn-primary" target="main-iframe">Detail</a>
	                              <!-- <button type="button" class="btn btn-primary" id="invoice_detail_1">Detail</button>-->
	                            </td>
	                            <td>${status.index + 1}</td>  
	                            <td>${item.id}</td>
	                            <td>${item.sellerCompanyName }</td>
	                            <td>${item.debtorName }</td>
	                            <td>${item.finInvAmount }</td>
	                            <td>${item.readyToSellAdv }</td>
	                            <td>${item.readyToSellInt }</td>
	                            <td>${item.status }</td>
	                            <td>${item.readyToSellInt }</td>
	                            <td>${item.rating}</td>
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
