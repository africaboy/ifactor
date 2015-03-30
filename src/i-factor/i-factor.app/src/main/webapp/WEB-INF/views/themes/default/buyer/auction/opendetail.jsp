<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
    <link href="${base}/static/libs/date-time/css/datepicker.css" rel="stylesheet">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload-ui.css">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-process.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-validate.js"></script>
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/buyer/auction/opendetail.js"></script>
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
		        <div id="form-title">Open Auction Detail</div>
		        <div id="form-main">
		            <div>
		                    <div class="row">
		                        <div class="col-sm-12">
		                            <div class="col-sm-2">
		
		                              <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_details');">Invoice</a>
		
		                              <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_debtor');">Debtor</a>
		
		                              <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_status');">Status</a>
		
		                            </div>
		                          
		                          <form  class="form-horizontal" id="form-invoice-info"   method="post">
		                          
		                              <input type="hidden" class="form-control input-sm" id="invoiceId"           name="invoiceId"            value="${invoice.id}">
								      <input type="hidden" class="form-control input-sm" id="companyName"         name="companyName"          value="${invoice.sellerCompanyName}">
								      <input type="hidden" class="form-control input-sm" id="debtorName"          name="debtorName"           value="${invoice.debtorName}">
								      <input type="hidden" class="form-control input-sm" id="address"             name="address"              value="${invoice.debtorAddress}">
								      <input type="hidden" class="form-control input-sm" id="invoiceIssuanceDate" name="invoiceIssuanceDate"  value="${invoice.finInvIssDate}">
								      <input type="hidden" class="form-control input-sm" id="objectOfInvoice"     name="objectOfInvoice"      value="${invoice.finObjOfInv}">
								      <input type="hidden" class="form-control input-sm" id="dueDate"             name="dueDate"              value="${invoice.finDueDateAccToCont}">
								      <input type="hidden" class="form-control input-sm" id="status"              name="status"               value="${invoice.status}">
		                              <input type="hidden" class="form-control input-sm" id="rating"              name="rating"               value="${invoice.rating}">
		                             
		                             
		                             <div class="col-sm-10" id="invoice_details" style="display: none;">
		                              <div class="col-sm-10">
		                                <h4>Invoice details</h4>
		                              </div>
		                              <div>
		                                <div class="col-sm-6">
		                                    Invoice amount:
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm" id="invoiceAmount" name="invoiceAmount" readonly="true" value="${invoice.finInvAmount}">
		                                </div>
		                              </div>
		                              <div>
		                                <div class="col-sm-6">
		                                    Desired minimum advance (%):
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id="discount"  name="discount" value="${invoice.readyToSellAdv}">
		                                </div>
		                              </div>
		                              <div>
		                                <div class="col-sm-6">
		                                   Desired maximum interest (%):
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id="interest"  name="interest" value="${invoice.readyToSellInt}">
		                                </div>
		                              </div>
		
		                              <div>
		                                <div class="col-sm-6">
		                                    Expected runing time (days):
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm disabled" readonly="true" id="expected_runing_time"  value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='yyyy-MM-dd'/>"
											readonly>
		                                </div>
		                              </div>
		                              
		                              <div>
		                                <div class="col-sm-6">
		                                    Enable 'buy now':
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="checkbox" class="checkbox disabled"  id="enable_buy_now" checked  disabled>
		                                </div>
		                              </div>
		                              
		                              <div>
								        <div class="col-sm-10">
                                          <button type="button" id="buyeNow" class="btn btn-default">Buy now</button>
                                        </div>
								      </div>
								    </form>
								    
								    <form  class="form-horizontal"  id="form-bid-info"  method="post" enctype="multipart/form-data">
								      <input type="hidden"   class="form-control input-sm"   id="invoiceId"           name="invoiceId"            value="${invoice.id}">
								      <input type="hidden"   class="form-control input-sm"   id="invoiceAmount"       name="invoiceAmount"        value="${invoice.finInvAmount}">
								      <input type="hidden"   class="form-control input-sm"   id="companyName"         name="companyName"          value="${invoice.sellerCompanyName}">
								      <input type="hidden"   class="form-control input-sm"   id="debtorName"          name="debtorName"           value="${invoice.debtorName}">
								      <input type="hidden"   class="form-control input-sm"   id="address"             name="address"              value="${invoice.debtorAddress}">
								      <input type="hidden"   class="form-control input-sm"   id="invoiceIssuanceDate" name="invoiceIssuanceDate"  value="${invoice.finInvIssDate}">
								      <input type="hidden"   class="form-control input-sm"   id="objectOfInvoice"     name="objectOfInvoice"      value="${invoice.finObjOfInv}">
								      <input type="hidden"   class="form-control input-sm"   id="dueDate"             name="dueDate"              value="${invoice.finDueDateAccToCont}">
								      <input type="hidden"   class="form-control input-sm"   id="status"              name="status"               value="${invoice.status}">
		                              <input type="hidden"   class="form-control input-sm"   id="rating"              name="rating"               value="${invoice.rating}">
		                              <input type="hidden"   class="form-control input-sm"   id="bestBuyerAdv"        name="bestBuyerAdv"         value="${invoice.bestBuyerAdv}">
		                              <input type="hidden"   class="form-control input-sm"   id="bestBuyerInt"        name="bestBuyerInt"         value="${invoice.bestBuyerInt}">
		                              <input type="hidden"   class="form-control input-sm"   id="readyToSellAdv"      value="${invoice.advance}">
		                              <input type="hidden"   class="form-control input-sm"   id="readyToSellInt"      value="${invoice.interest}">
		                               
		                              <div class="col-sm-10">
		                                <h4>Buy now:</h4>
		                              </div>
		                              <div>
		                                <div class="col-sm-6">
		                                    Advance will be accepted directly (%):
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm disabled"  id="discout" name="discount" placeholder="0.00%"  data-rule-required="true" data-msg-required="<fmt:message key='auction.submit.form.field.advance.required'/>"  data-rule-range=[0,100]  data-msg-range="<fmt:message key='auction.submit.form.field.advance.range'/>"   data-rule-pattern="^[0-9]+(.[0-9]{2})?$"  data-msg-pattern="<fmt:message key='auction.submit.form.field.advance.pattern'/>" >
		                                 
		                                </div>
		                              </div>
		                              <div>
		                                <div class="col-sm-6">
		                                    Interest that will be accepted directly (% per 30 days):
		                                </div>
		                                <div class="col-sm-4">
		                                  <input type="text" class="form-control input-sm disabled"  id="interet"  name="interest"  placeholder="0.00%"  data-rule-required="true" data-msg-required="<fmt:message key='auction.submit.form.field.interest.required'/>"   data-rule-range=[0,100]  data-msg-range="<fmt:message key='auction.submit.form.field.interest.range'/>"   data-rule-pattern="^[0-9]+(.[0-9]{2})?$"  data-msg-pattern="<fmt:message key='auction.submit.form.field.interest.pattern'/>" >
		                                </div>
		                              </div>
		
		                              <div>
								        <div class="col-sm-10">
                                          <button type="button" id="makeOffer" class="btn btn-default">Make offer</button>
                                        </div>
								      </div>
								      
		                              <div class="col-sm-10">
		                                <div class="col-sm-5">
		                                  Rating associated with the invoice *:
		                                </div>
		                                <div class="col-sm-5">
		                                  <a href="#" class="btn btn-default">1</a>
		                                  <a href="#" class="btn btn-default">2</a>
		                                  <a href="#" class="btn btn-default">3</a>
		                                  <a href="#" class="btn btn-default">4</a>
		                                  <a href="#" class="btn btn-default">5</a>
		                                </div>
		                              </div>
		                             </div>
		                            </form>
		                           
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
		                                <label class="label label-success">${invoice.flowStatus}</label>
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
  <!-- Modal -->
  <div class="modal fade" id="modal_success" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
         <!--  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
          <h4 class="modal-title" id="H1">Message</h4>
        </div>
        <div class="modal-body">
          <div style="text-align: center; font-weight:bold;"> 
            Congratulation!
          </div>
          <div style="text-align:center; font-size:20px;" id="modal-success-body">
            ${message}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" id="btnGoToHome" data-dismiss="modal">Go to home page</button>
          <button type="button" class="btn btn-default" id="btnCloseWindow" data-dismiss="modal">Close Window</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
  
  <!-- Modal -->
  <div class="modal fade" id="modal_failed" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
          <h4 class="modal-title" id="H1">Message</h4>
        </div>
        <div class="modal-body">
          <div style="text-align: center; font-weight:bold;"> 
            Operation failed!
          </div>
          <div style="text-align:center; font-size:20px;" id="modal-failed-body">
            Please check the information.
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" id="btnFailedClose" data-dismiss="modal">Close</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>

