<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="docBiztypePrefix"><%= com.entrofine.ifactor.app.service.InvoiceDocService.BIZTYPE_PREFIX%></c:set>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
    <!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-ui.css">
    <!-- CSS adjustments for browsers with JavaScript disabled -->
    <noscript><link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-noscript.css"></noscript>
    <noscript><link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-ui-noscript.css"></noscript>
    <link href="${base}/static/libs/date-time/css/datepicker.css" rel="stylesheet">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/seller/my-invoices/after-auction-detail.js"></script>
</c:set>
           
<c:set target="${self.content}" property="main">
              <div class="form-content">
                <div class="tab-header clearfix">
                  <div class="tab-header-title">
                    <i></i> 
                    <span><fmt:message key='myInvoice.afterAuction.detail.tabs.title'/></span>
                  </div>
                  <ul class="nav nav-tabs pull-right" id="form-tab-header">
                    <li class="active"><a href="#tab-seller-info" data-toggle="tab"><fmt:message key='invoice.submit.submitPage.tabSellerInfo.title'/></a></li>
                    <li><a href="#tab-debtor-info" data-toggle="tab"><fmt:message key='invoice.submit.submitPage.tabDebtorInfo.title'/></a></li>
                    <li><a href="#tab-financing-info" data-toggle="tab"><fmt:message key='invoice.submit.submitPage.tabFinanceInfo.title'/></a></li>
                    <li><a href="#tab-readytosell-info" data-toggle="tab"><fmt:message key='invoice.submit.submitPage.tabReadyToSeller.title'/></a></li>
                    <li><a href="#tab-documents" data-toggle="tab"><fmt:message key='invoice.submit.submitPage.tabDocuments.title'/></a></li>
                    <li><a href="#tab-conditions" data-toggle="tab"><fmt:message key='invoice.submit.submitPage.tabTerms.title'/></a></li>
                  </ul>
                </div>
                
                <div class="tab-content">
                  <div class="tab-pane active" id="tab-seller-info">
                    <form class="form-horizontal" id="form-seller-info" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4><fmt:message key='invoice.submit.submitPage.tabSellerInfo.header'/></h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="sellerCompanyName"><fmt:message key='invoice.submit.form.field.sellerCompanyName'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="sellerCompanyName" name="sellerCompanyName" value="${sellerCompanyName}" readonly="readonly" />                        
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label"><fmt:message key='invoice.submit.form.field.sellerRepresentedBy'/>: *</label>
                        <div class="col-sm-3">
                          <select id="sellerRepresentedByTitle" name="sellerRepresentedByTitle" disabled>
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
                          <h4><fmt:message key='invoice.submit.submitPage.tabDebtorInfo.header'/></h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorName"><fmt:message key='invoice.submit.form.field.debtorName'/>: *</label>
                        <div class="col-sm-6">                   
                          <input type="text" class="form-control" id="debtorName" name="debtorName" value="${invoice.debtorName}" readonly />                        
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="idNumber"><fmt:message key='invoice.submit.form.field.debtorAddress'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorAddress" name="debtorAddress" value="${invoice.debtorAddress}" readonlyd />
                        </div>
                      </div> 
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorBizRegNo"><fmt:message key='invoice.submit.form.field.debtorBizRegNo'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorBizRegNo" name="debtorBizRegNo" value="${invoice.debtorBizRegNo}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorTaxCode"><fmt:message key='invoice.submit.form.field.debtorTaxCode'/> *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorTaxCode" name="debtorTaxCode" value="${invoice.debtorTaxCode}" readonly  />
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-financing-info">
                    <form class="form-horizontal" id="form-financing-info" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4><fmt:message key='invoice.submit.submitPage.tabFinanceInfo.header'/></h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finStickerId"><fmt:message key='invoice.submit.form.field.finStickerId'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="finStickerId" name="finStickerId" value="${invoice.finStickerId}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finVatInvNo"><fmt:message key='invoice.submit.form.field.finVatInvNo'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="finVatInvNo" name="finVatInvNo" value="${invoice.finVatInvNo}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finInvIssDate"><fmt:message key='invoice.submit.form.field.finInvIssDate'/>: *</label>       
                        <div class="col-sm-6">
                          <div class="input-group">
                            <input type="text" class="form-control" id="finInvIssDate" name="finInvIssDate" value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='yyyy-MM-dd'/>" readonly autocomplete="off" />
							<span class="input-group-addon">
							  <i class="icon-calendar"></i>
							</span>
						  </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finInvAmount"><fmt:message key='invoice.submit.form.field.finInvAmount'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="finInvAmount" name="finInvAmount" value="${invoice.finInvAmount}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finObjOfInv"><fmt:message key='invoice.submit.form.field.finObjOfInv'/>: *</label>       
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
                        <label class="col-sm-4 control-label" for="finDueDateAccToCont"><fmt:message key='invoice.submit.form.field.finDueDateAccToCont'/>: *</label>       
                        <div class="col-sm-6">
                          <div class="input-group">
                            <input type="text" class="form-control" id="finDueDateAccToCont" name="finDueDateAccToCont" value="<fmt:formatDate value='${invoice.finDueDateAccToCont}' pattern='yyyy-MM-dd'/>" readonly autocomplete="off" />
                            <span class="input-group-addon">
							  <i class="icon-calendar"></i>
							</span>
						  </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finExpPmtDate"><fmt:message key='invoice.submit.form.field.finExpPmtDate'/>: *</label>       
                        <div class="col-sm-6">
                          <div class="input-group">
                            <input type="text" class="form-control" id="finExpPmtDate" name="finExpPmtDate" value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='yyyy-MM-dd'/>" readonly autocomplete="off" />                        
                            <span class="input-group-addon">
							  <i class="icon-calendar"></i>
							</span>
						  </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finRmngMatTerm"><fmt:message key='invoice.submit.form.field.finRmngMatTerm'/>: *</label>       
                        <div class="col-sm-6">
                         <input type="text" class="form-control" id="finRmngMatTerm" name="finRmngMatTerm" value="${invoice.finRmngMatTerm}" readonly />
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-readytosell-info">
                    <form class="form-horizontal" id="form-readytosell-info" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4><fmt:message key='invoice.submit.submitPage.tabReadyToSell.header'/></h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="readyToSellAdv"><fmt:message key='invoice.submit.form.field.readyToSellAdv'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="readyToSellAdv" name="readyToSellAdv" value="${invoice.readyToSellAdv}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="readyToSellInt"><fmt:message key='invoice.submit.form.field.readyToSellInt'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="readyToSellInt" name="readyToSellInt" value="${invoice.readyToSellInt}" readonly />
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-documents">
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="docScanOfInv">
                          <fmt:message key='invoice.submit.form.field.docScanOfInv'/>: *
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
                          <fmt:message key='invoice.submit.form.field.docScanOfCont'/>: *
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
                          <fmt:message key='invoice.submit.form.field.docDlvryCnfm'/>: *
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
                          <fmt:message key='invoice.submit.form.field.docDebtorAckmt'/>: *
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
                          <fmt:message key='invoice.submit.form.terms.content'/>
                        </div>
                      </div>
                      
                      <div style="width:99%; margin:10px auto;">
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree1" checked disabled>
                            <label for="checkbox-agree1">
                              <fmt:message key='invoice.submit.form.terms.check.agree1'/>
                            </label>
                          </div>
                        </div>
                        
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree2" checked disabled>
                            <label for="checkbox-agree2">
                              <fmt:message key='invoice.submit.form.terms.check.agree2'/>
                            </label>
                          </div>
                        </div>
                        
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree3" checked disabled>
                            <label for="checkbox-agree3">
                              <fmt:message key='invoice.submit.form.terms.check.agree3'/>
                            </label>
                          </div>
                        </div>
                      
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree4" checked disabled>
                            <label for="checkbox-agree4">
                              <fmt:message key='invoice.submit.form.terms.check.agree4'/>
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

