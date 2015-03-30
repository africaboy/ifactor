<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
    <link href="${base}/static/libs/iCheck-master/skins/all.css?v=1.0.2" rel="stylesheet">
    <link rel="stylesheet" href="${base}/static/themes/default/css/form.css?ver=${version.app}">
    
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
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
		             <form class="form-inline" action="${base}/seller/invoice/confirmSave/${invoice.id}"  id="formQuery" name="formQuery"  method="post" role="form">
                      <div class="clearfix row" style="margin-top:10px;">
                        <div class="col-sm-12">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Invoice Id</th>
                                <th>Company name</th>
                                <th>Debtor name</th>
                                <th>Invoice amount</th>
                                <th>BestAdvance(%)</th>
                                <th>BestInterest(%)</th>
                                <th>Rating</th>
                                <th>Aution Time</th>
                                <th>Invoice state</th>
                              </tr>
                            </thead>
                            <tbody>
                             <c:forEach var="item" items="${invoice.autions}" varStatus="status">  
                               <tr>
	                            <td>${status.index + 1}</td>  
	                            <td>${item.invoice.id }</td>
	                            <td>${item.companyName }</td>
	                            <td>${item.debtorName }</td>
	                            <td>${item.invoiceAmount }</td>
	                            <td>${item.discount }</td>
	                            <td>${item.interest }</td>
	                            <td>${item.rating }</td>
	                            <td><fmt:formatDate value='${item.updateTime}' pattern='yyyy-MM-dd HH:mm:ss'/></td>
	                            <td>${item.flowStatus }</td>
                              </tr>
                            </c:forEach>
                          </tbody>
                           <tfoot>
                           <tr>
                             <td colspan="11">
                             </td>
                           </tr>
                         </tfoot>
                        </table>
                        </div>
                      </div>
                       
          	            <div style="text-align: center; margin-top:5px;">
          	              <c:if test="${empty invoice.autions}"> 
  		                    <button class="btn btn-default" id="submitApplication"  type="submit" disabled><fmt:message key="seller.register.form.submit"/></button>
  		                  </c:if>
  		                  <c:if test="${not empty invoice.autions}"> 
  		                    <button class="btn btn-default" id="submitApplication"  type="submit"><fmt:message key="seller.register.form.submit"/></button>
  		                  </c:if>
  		                </div>
                      
	                </form>
		          </div>
		        </div>
	          </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
