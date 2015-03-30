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
    <script type="text/javascript">
    $(function () {
      //$('.selectpicker').selectpicker();
      $('.dropmenu').dropdown('toggle');
    });
    
    window.onload = function () {
        showdiv('invoice_details');
    }

    function showdiv(divid) {
        $('#invoice_details').hide();
        $('#invoice_debtor').hide();
        $('#invoice_documents').hide();
        $('#invoice_status').hide();
        $('#' + divid).show();
    }
   </script>
</c:set>
<c:set target="${self.content}" property="main">
				<div id="form-div">
		        <div id="form-title">Closed Auction Detail</div>
		        <div id="form-main">
		            <div>
		                    <div class="row">
		                        <div class="col-sm-12">
		                            <div class="col-sm-2">
		
		                              <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_details');">Invoice</a>
		
		                              <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_debtor');">Debtor</a>
		
		                              <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_documents');">Documents</a>
		
		                              <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_status');">Status</a>
		
		                            </div>
		                          
		                             
		                             <div class="col-sm-10" id="invoice_details" style="display: none;">
		                              <div class="col-sm-10">
		                                <h4>Invoice details</h4>
		                              </div>
		                              <div>
		                                <div class="col-sm-6">
		                                    Invoice amount:
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm" id="invoice_amout" readonly="true" value="${invoice.finInvAmount}">
		                                </div>
		                              </div>
		                              <div>
		                                <div class="col-sm-6">
		                                    Desired minimum advance (%):
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id="desired_min_advance" value="${invoice.readyToSellAdv}">
		                                </div>
		                              </div>
		                              <div>
		                                <div class="col-sm-6">
		                                   Desired maximum interest (%):
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id="desired_max_interest" value="${invoice.readyToSellInt}">
		                                </div>
		                              </div>
		
		                              <div>
		                                <div class="col-sm-6">
		                                    Expected runing time (days):
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id="expected_runing_time" value="${invoice.finExpPmtDate}">
		                                </div>
		                              </div>
		                              
		                              <div>
		                                <div class="col-sm-6">
		                                    Enable 'buy now':
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="checkbox" class="checkbox disabled"  id="enable_buy_now" checked>
		                                </div>
		                              </div>
								      </div>
								      
		                            <div class="col-sm-10" id="invoice_debtor" style="display: none;">
		                              <div class="col-sm-10">
		                                <h4>Debtor details:</h4>
		                              </div>
		                              <div>
		                                <div class="col-sm-5">
		                                   Debtor name:
		                                </div>
		                                <div class="col-sm-5">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id="debtorName" value="${invoice.debtorName}">
		                                </div>
		                              </div>
		                              <div>
		                                <div class="col-sm-5">
		                                   Debtor KvK number:
		                                </div>
		                                <div class="col-sm-5">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id=debtorKvkNumber value="${invoice.debtorTaxCode}">
		                                </div>
		                              </div>
		                              
		                              <div>
		                                <div class="col-sm-5">
		                                    Debtor is governmental:
		                                </div>
		                                <div class="col-sm-1">Yes:</div>
		                                <div class="col-sm-1">
		                                  <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
		                                </div>
		                                <div class="col-sm-1">No:</div>
		                                <div class="col-sm-1">
		                                  <input type="radio" class="radio disabled" disabled="disabled" />
		                                </div>
		                                <div class="col-sm-1"></div>
		                              </div>
		
		
		                              <div>
		                                <div class="col-sm-5">
		                                  Debtor is semi-governmental:
		                                </div>
		                                <div class="col-sm-1">Yes:</div>
		                                <div class="col-sm-1">
		                                  <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
		                                </div>
		                                <div class="col-sm-1">No:</div>
		                                <div class="col-sm-1">
		                                  <input type="radio" class="radio disabled" disabled="disabled" />
		                                </div>
		                                <div class="col-sm-1"></div>
		                              </div>
		
		                              <div>
		                                <div class="col-sm-5">
		                                  Debtor has accepted invoice:
		                                </div>
		                                <div class="col-sm-1">Yes:</div>
		                                <div class="col-sm-1">
		                                  <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
		                                </div>
		                                <div class="col-sm-1">No:</div>
		                                <div class="col-sm-1">
		                                  <input type="radio" class="radio disabled" disabled="disabled" />
		                                </div>
		                                <div class="col-sm-1"></div>
		                              </div>
		
		                              <div>
		                                <div class="col-sm-5">
		                                  Debtor has agreed to pay:
		                                </div>
		                                <div class="col-sm-1">Yes:</div>
		                                <div class="col-sm-1">
		                                  <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
		                                </div>
		                                <div class="col-sm-1">No:</div>
		                                <div class="col-sm-1">
		                                  <input type="radio" class="radio disabled" disabled="disabled" />
		                                </div>
		                                <div class="col-sm-1"></div>
		                              </div>
		                              <div>
		                                <div class="col-sm-5">
		                                  No of years that debtor is a client:
		                                </div>
		                                <div class="col-sm-5">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id="Text1" value="123">
		                                </div>
		                              </div>
		                            </div>
		                            
		                            <div class="col-sm-10" id="invoice_documents">
		                              <table class="table table-bordered">
		                                <thead>
		                                  <tr>
		                                    <th></th>
		                                    <th>Description</th>
		                                    <th>Status</th>
		                                  </tr>
		                                </thead>
		                                <tbody>
		                                </tbody>
		                              </table>
		                            </div>
		                           
		                            <div class="col-sm-10" id="invoice_status">
		                              <div class="col-sm-2">Invoice state:</div>
		                              <div class="col-sm-2">
		                                <label class="label label-success">${invoice.status}</label>
		                              </div>
		                              <div class="col-sm-6"></div>
		                            </div>
		                          </div>
		                        </div>
		                      </div>
		                    </div>
		                   </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
