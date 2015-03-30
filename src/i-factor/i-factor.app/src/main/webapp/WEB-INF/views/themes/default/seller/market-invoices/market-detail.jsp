<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="docBiztypePrefix"><%= com.entrofine.ifactor.app.service.InvoiceDocService.BIZTYPE_PREFIX%></c:set>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload-ui.css">
    <link rel="stylesheet" href="${base}/static/libs/date-time/css/datepicker.css">
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
        <script type="text/javascript" src="${base}/static/themes/default/js/seller/my-invoices/after-auction-detail.js"></script>
    <script type="text/javascript">

    </script>
</c:set>
           
<c:set target="${self.content}" property="main">
              <div class="form-content">
                <div class="tab-header clearfix">
                  <div class="tab-header-title">
                    <i></i> 
                    <span>Invoice Detail</span>
                  </div>
                  <ul class="nav nav-tabs pull-right" id="form-tab-header">
                    <li class="active"><a href="#tab-seller-info" data-toggle="tab">Seller Info</a></li>
                    <li><a href="#tab-debtor-info" data-toggle="tab">Debtor Info</a></li>
                    <li><a href="#tab-financing-info" data-toggle="tab">Finance Info</a></li>
                    <li><a href="#tab-readytosell-info" data-toggle="tab">Ready To Sell</a></li>
                    <li><a href="#tab-documents" data-toggle="tab">Documents</a></li>
                    <li><a href="#tab-conditions" data-toggle="tab">Conditions</a></li>
                  </ul>
                </div>
                
                <div class="tab-content">
                  <div class="tab-pane active" id="tab-seller-info">
                    <form class="form-horizontal" id="form-seller-info" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4>SELLER INFORMATION</h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="sellerCompanyName">Name of your company: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="sellerCompanyName" name="sellerCompanyName" value="${sellerCompanyName}" readonly="readonly" />                        
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label">Represented by: *</label>
                        <div class="col-sm-3">
                          <select  id="sellerRepresentedByTitle" name="sellerRepresentedByTitle" disabled>
                            <option value="Undefined">Undefined</option>
                            <option value="Mr"<c:if test="${user.title=='Mr'}"> selected</c:if>>Mr</option>
                            <option value="Ms"<c:if test="${user.title=='Ms'}"> selected</c:if>>Ms</option>
                          </select>
                        </div>
                        <div class="col-sm-3">
                          <input type="text" class="form-control" id="sellerRepresentedByName" name="sellerRepresentedByName" value="${user.lastName}" readonly />
                        </div>
                      </div> 
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-debtor-info">
                    <form class="form-horizontal" id="form-debtor-info" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4>DEBTOR INFORMATION</h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorName">Debtor name: *</label>
                        <div class="col-sm-6">                   
                          <input type="text" class="form-control" id="debtorName" name="debtorName" value="${invoice.debtorName}" readonly data-rule-required="true" data-msg-required="Please enter Debtor Name" />                        
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="idNumber">Address: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorAddress" name="debtorAddress" value="${invoice.debtorAddress}" readonly data-rule-required="true" data-msg-required="Please enter Debtor Address" />
                        </div>
                      </div> 
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorBizRegNo">Business registration no: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorBizRegNo" name="debtorBizRegNo" value="${invoice.debtorBizRegNo}" readonly data-rule-required="true" data-msg-required="Please enter Business registration no" />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorTaxCode">Tax code: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorTaxCode" name="debtorTaxCode" value="${invoice.debtorTaxCode}" readonly data-rule-required="true" data-msg-required="Please enter Tax Code" />
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-financing-info">
                    <form class="form-horizontal" id="form-financing-info" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4>FINANCING INFORMATION</h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finStickerId">Sticker ID: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="finStickerId" name="finStickerId" value="${invoice.finStickerId}" readonly data-rule-required="true" data-msg-required="Please enter Sticker ID" />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finVatInvNo">VAT Invoice Number: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="finVatInvNo" name="finVatInvNo" value="${invoice.finVatInvNo}" readonly data-rule-required="true" data-msg-required="Please enter VAT Invoice number" />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finInvIssDate">Invoice issuance date: *</label>       
                        <div class="col-sm-6">
                          <div class="input-group">
                            <input type="text" class="form-control" id="finInvIssDate" name="finInvIssDate" value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='yyyy-MM-dd'/>" readonly autocomplete="off" data-rule-required="true" data-msg-required="Please enter Invoice issuance date" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="please input date formatted as '2000-01-01'" />
							<span class="input-group-addon">
							  <i class="icon-calendar"></i>
							</span>
						  </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finInvAmount">Invoice amount: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="finInvAmount" name="finInvAmount" value="${invoice.finInvAmount}" readonly data-rule-required="true" data-msg-required="Please enter Invoice amount" />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finObjOfInv">Object of invoice: *</label>       
                        <div class="col-sm-6">
                          <%-- <select class="form-control selectpicker" id="finObjOfInv" name="finObjOfInv" value="${invoice.finObjOfInv}" readonly data-rule-required="true" data-msg-required="Please select Object of invoice">
                            <option value="">Please select...</option>
                            <option value="TBD Recommendation">TBD Recommendation</option>
                            <option value="Services delivery">Services delivery</option>
                            <option value="Goods delivery - perishable">Goods delivery - perishable</option>
                            <option value="Goods delivery - nonperishable">Goods delivery - nonperishable</option>
                          </select> --%>
                          <input type="text" class="form-control" id="finObjOfInv" name="finObjOfInv" value="${invoice.finObjOfInv}" readonly />
                        
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finDueDateAccToCont">Due date according to the contract: *</label>       
                        <div class="col-sm-6">
                          <div class="input-group">
                            <input type="text" class="form-control" id="finDueDateAccToCont" name="finDueDateAccToCont" value="<fmt:formatDate value='${invoice.finDueDateAccToCont}' pattern='yyyy-MM-dd'/>" readonly autocomplete="off" data-rule-required="true" data-msg-required="Please enter due date according to the contract" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="please input date formatted as '2000-01-01'" />
                            <span class="input-group-addon">
							  <i class="icon-calendar"></i>
							</span>
						  </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finExpPmtDate">Expected Payment Date: *</label>       
                        <div class="col-sm-6">
                          <div class="input-group">
                            <input type="text" class="form-control" id="finExpPmtDate" name="finExpPmtDate" value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='yyyy-MM-dd'/>" readonly autocomplete="off" data-rule-required="true" data-msg-required="Please enter Expected Payment Date" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="please input date formatted as '2000-01-01'" />                        
                            <span class="input-group-addon">
							  <i class="icon-calendar"></i>
							</span>
						  </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finRmngMatTerm">Remaining maturity term: *</label>       
                        <div class="col-sm-6">
                         <input type="text" class="form-control" id="finRmngMatTerm" name="finRmngMatTerm" value="${invoice.finRmngMatTerm}" readonly data-rule-required="true" data-msg-required="Please enter Remaining maturity term" >
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-readytosell-info">
                    <form class="form-horizontal" id="form-readytosell-info" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4>READY TO SELL</h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="readyToSellAdv">Advance: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="readyToSellAdv" name="readyToSellAdv" value="${invoice.readyToSellAdv}" readonly data-rule-required="true" data-msg-required="Please enter Advance for ready to sell" >
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="readyToSellInt">Interest: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="readyToSellInt" name="readyToSellInt" value="${invoice.readyToSellInt}" readonly data-rule-required="true" data-msg-required="Please enter Interest for ready to sell" >
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-documents">
                    <div class="form-group">
                      <div class="col-sm-10">
                        <h4>Please scan and upload the necessary documents. The following documents are mandatory:</h4>
                      </div>
                    </div>
                    <div class="form-group">
                      <div style="width: 98%; height:110px; overflow: auto;">
                        <ul>
                          <li>invoice;</li>
                          <li>underlying constract, offer, or assignment;</li>
                          <li>delivery conditions that apply to the invoice;</li>
                          <li>debtor statement that the goods or services are received, such as a delivery confirmation (because you indicated on the previous page that the debtor has accepted the invoice);</li>
                          <li>debtor statement that the goods or services will be paid (because you indicated on the previous page that the debtor has agreed to pay);</li>
                        </ul>
                      </div>
                    </div>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="docScanOfInv">
                          Scan of invoice (Mandatory): *
                        </label>
                        <div class="col-sm-3">
                          <div id="file-link-docScanOfInv">
                          <c:forEach var="item" items="${invoiceDocs}" varStatus="status">
                          <c:if test="${item.dispOrder == 1}">
                            <a href="${base}/fileDownload/${self.docBiztypePrefix}docScanOfInv/${item.id}"> ${item.originalName}</a>
                          </c:if>
                          </c:forEach>
                          </div>
                        </div>
                      </div>
                    </form>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="docScanOfCont">
                          Scan of contract (Mandatory): *
                        </label>
                        <div class="col-sm-3">
                          <!-- 已经上传的文件 -->
                          <div id="file-link-docScanOfCont">
                          <c:forEach var="item" items="${invoiceDocs}" varStatus="status">
                          <c:if test="${item.dispOrder == 2}">
                            <a href="${base}/fileDownload/${self.docBiztypePrefix}docScanOfCont/${item.id}"> ${item.originalName}</a>
                          </c:if>
                          </c:forEach>
                          </div>
                        </div>
                      </div>
                    </form>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="docDlvryCnfm">
                          Delivery confirmation (Mandatory): *
                        </label>
                        <div class="col-sm-3">
                          <!-- 已经上传的文件 -->
                          <div id="file-link-docDlvryCnfm">
                          <c:forEach var="item" items="${invoiceDocs}" varStatus="status">
                          <c:if test="${item.dispOrder == 3}">
                            <a href="${base}/fileDownload/${self.docBiztypePrefix}docDlvryCnfm/${item.id}"> ${item.originalName}</a>
                          </c:if>
                          </c:forEach>
                          </div>
                        </div>
                      </div>
                    </form>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="docDebtorAckmt">
                          The acknowledgement from the debtor (Mandatory for high-risk sellers, but not for other sellers, so the invoice submission form for high-risk invoice sellers always have one more required document): *
                        </label>
                        <div class="col-sm-3">
                          <!-- 已经上传的文件 -->
                          <div id="file-link-docDebtorAckmt">
                          <c:forEach var="item" items="${invoiceDocs}" varStatus="status">
                          <c:if test="${item.dispOrder == 4}">
                            <a href="${base}/fileDownload/${self.docBiztypePrefix}docDebtorAckmt/${item.id}"> ${item.originalName}</a>
                          </c:if>
                          </c:forEach>
                          </div>
                        </div>
                      </div>
                    </form>
                    
                    <c:forEach var="doc" items="${invoiceDocs}" varStatus="status">
                      <c:if test="${doc.dispOrder==1}">
                        <c:set target="${self}" property="doc1" value="${doc.id}" />
                      </c:if>
                      <c:if test="${doc.dispOrder==2}">
                        <c:set target="${self}" property="doc2" value="${doc.id}" />
                      </c:if>
                      <c:if test="${doc.dispOrder==3}">
                        <c:set target="${self}" property="doc3" value="${doc.id}" />
                      </c:if>
                      <c:if test="${doc.dispOrder==4}">
                        <c:set target="${self}" property="doc4" value="${doc.id}" />
                      </c:if>
                    </c:forEach>
                    <form style="display:none;" id="form-documents-hidden">
                      <input type="hidden" name="documents[0].id" id="docScanOfInvId" value="${self.doc1}">
                      <input type="hidden" name="documents[0].dispOrder" value="1">
                     
                      <input type="hidden" name="documents[1].id" id="docScanOfContId" value="${self.doc2}">
                      <input type="hidden" name="documents[1].dispOrder" value="2"> 
                      
                      <input type="hidden" name="documents[2].id" id="docDlvryCnfmId" value="${self.doc3}">
                      <input type="hidden" name="documents[2].dispOrder" value="3">
                      
                      <input type="hidden" name="documents[3].id" id="docDebtorAckmtId" value="${self.doc4}">
                      <input type="hidden" name="documents[3].dispOrder" value="4"> 
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-conditions">
                    <form class="form-horizontal" id="form-conditions" method="POST" enctype="multipart/form-data">
                      <div style="width:99%; margin:0 auto;">
                        <div style="height:220px; max-height: 220px; overflow: auto;padding:10px 0px; background: white;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo turpis sodales, elementum leo at, fermentum nisi. Morbi id est congue felis congue interdum. Aliquam placerat, dui sed feugiat egestas, velit massa gravida augue, quis egestas felis diam a dui. Vestibulum a sapien est. Cras at est non mauris tempor faucibus. Suspendisse pretium massa ac tortor dictum, et aliquet risus luctus. Sed nec orci iaculis, pellentesque diam ac, iaculis nulla. Integer sed bibendum lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris quis nibh mi. Aliquam scelerisque arcu justo, eu tempus arcu venenatis consectetur. Nunc at sem ultrices, mollis enim vitae, accumsan urna. Aenean bibendum risus id bibendum laoreet. Nunc eleifend dui non ipsum eleifend semper. Donec faucibus, urna ut rhoncus malesuada, diam magna fermentum nulla, viverra euismod leo tortor quis enim. Phasellus ultrices ante in mauris tincidunt tristique. 
                    Donec vitae feugiat nibh. Duis sit amet nisl vitae tellus condimentum consequat. Mauris gravida ornare aliquet. Praesent diam metus, hendrerit sed euismod id, malesuada sit amet elit. Suspendisse magna urna, congue at venenatis vitae, tempor at tellus. Donec id suscipit velit. Cras dignissim non ligula a luctus. Maecenas cursus felis ut purus hendrerit tincidunt. Cras rhoncus diam eget sapien malesuada, non fringilla odio tempus. Aliquam lacus nibh, facilisis id iaculis sit amet, consectetur id lacus. 
                    Vivamus vel nunc lectus. Mauris aliquam est eget mauris tempor sagittis. Vivamus dictum justo at porta sollicitudin. Etiam non rutrum velit. Nam molestie arcu sed arcu volutpat tristique. Praesent tempor, nunc vitae consectetur auctor, est nulla consequat tortor, at vestibulum justo magna a sapien. Morbi aliquam turpis neque, eu lacinia odio egestas eu. Etiam placerat at enim ac tristique. Suspendisse sodales eros in dictum ultrices. Mauris molestie egestas tortor at scelerisque. Nulla luctus vehicula lacus non pretium.
                        </div>
                      </div>
                      
                      <div style="width:99%; margin:10px auto;">
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree1" checked disabled>
                            <label for="checkbox-agree1">
                              I agree with the terms and conditions
                            </label>
                          </div>
                        </div>
                        
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree2" checked disabled>
                            <label for="checkbox-agree2">
                              The invoice to which this information pertains has not been sold, mortgaged, factored, or advanced otherwise:
                            </label>
                          </div>
                        </div>
                        
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree3" checked disabled>
                            <label for="checkbox-agree3">
                              At this time, no complaint has been filed for the goods or services to which this information pertains:
                            </label>
                          </div>
                        </div>
                      
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree4" checked disabled>
                            <label for="checkbox-agree4">
                              The information I have provided is true and correct:
                            </label>
                          </div>
                        </div>
                      </div>
                    </form> 
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
        　　　　Operation successful!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btnContinueSubmit" data-dismiss="modal">Go to submit new invoice</button>
          <button type="button" class="btn btn-primary" id="btnGoToList" data-dismiss="modal">Go to invoice list</button>
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
        Operation failed!<br/>
        Please check the information.<br/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btnFailedClose" data-dismiss="modal">Close</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>

