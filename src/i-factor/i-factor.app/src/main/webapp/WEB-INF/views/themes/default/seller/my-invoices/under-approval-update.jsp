<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="finObjOfInvList" expression="@catalogService.findFinObjOfInv().children" />
<spring:eval var="countryList"  expression="@catalogService.findCountry().children" />
<spring:eval var="readyToAdvList" expression="@catalogService.findReadyToAdv().children" />
<spring:eval var="readyToIntList" expression="@catalogService.findReadyToInt().children" />




<c:set target="${self}" property="docBiztypePrefix"><%= com.entrofine.ifactor.app.service.InvoiceDocService.BIZTYPE_PREFIX%></c:set>
<c:forEach var="doc" items="${invoiceDocs}" varStatus="status">
	<c:set target="${self}" property="doc${doc.dispOrder}"
		value="${doc.id}" />
	<c:set target="${self}" property="doc${doc.dispOrder}Link">
		<a	href="${base}/fileDownload/${doc.bizType}/${doc.id}<c:if test="${not empty doc.extension}">.</c:if>${doc.extension}">${doc.originalName}</a>
	</c:set>
</c:forEach>

<c:set target="${self}" property="title"><fmt:message key='invoice.submit.submitPage.title'/></c:set>
<c:set target="${self.css}" property="main">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload-ui.css">
    <link href="${base}/static/libs/date-time/css/datepicker.css" rel="stylesheet">
    <style type="text/css">
	body,h2{margin:0 ; padding:0;}

    #BgDiv{background-color:#202020; position:absolute; z-index:99; left:0; top:0; display:none; width:100%; height:1000px;opacity:0.5;filter: alpha(opacity=50);-moz-opacity: 0.5;}

    #DialogDiv{position:absolute;width:400px; left:50%; top:50%; margin-left:-200px; height:auto; z-index:100;background-color:#fff; border:1px #8FA4F5 solid; padding:1px;}

	#DialogDiv h2{ height:25px; font-size:14px; background-color:#8FA4F5; position:relative; padding-left:10px; line-height:25px;}

	#DialogDiv h2 a{position:absolute; right:5px; font-size:12px; color:#000000}

	#DialogDiv .form{padding:10px;}
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
    <script type="text/javascript">
    var app = {
      base: '${base}', 
      version: '${version.app}', 
      loginName: '${loginUser.loginName}',
      selfUrl:'${self.url}',

      successSavedMsg:"<fmt:message key='invoice.submit.message.successSaved'/>",
      successUpdatedMsg:"<fmt:message key='invoice.submit.message.successUpdated'/>",
      successSubmittedMsg:"<fmt:message key='invoice.submit.message.successSubmitted'/>",
      successRedirectMsg:"<fmt:message key='invoice.submit.message.successRedirectMsg'/>"
    };
    </script>
    <script type="text/javascript" src="${base}/static/themes/default/js/seller/my-invoices/under-approval-update.js"></script>
</c:set>

           
<c:set target="${self.content}" property="main">
              <div class="form-content">
                <div class="tab-header clearfix">
                  <div class="tab-header-title">
                    <i></i> 
                    <span><fmt:message key='invoice.submit.submitPage.tabsTitle'/></span>
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
                        <div class="col-sm-6">
                          <input type="hidden" class="form-control" id="id" name="id" value="${invoice.id}" readonly="readonly" />
                          <input type="hidden" class="form-control" id="limitMin"   name="limitMin" value="${invoice.limitMin}" readonly /> 
                          <input type="hidden" class="form-control" id="limitMax" name="limitMax"   value="${invoice.limitMax}" readonly /> 
                          <input type="hidden" class="form-control" id="limitBalance" name="limitBalance" value="${invoice.limitBalance}" readonly />
						</div>
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
                          <input type="text" class="form-control" id="sellerRepresentedByTitle" name="sellerRepresentedByTitle" value="${user.title}" readonly />
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
                          <input type="text" class="form-control" id="debtorName" name="debtorName"   value="${invoice.debtorName}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.debtorName.required'/>"  <c:if test="${not fn:contains(modifyFields,'debtorName') && isModifyStatus}">readonly</c:if>/>                        
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorAddress"><fmt:message key='invoice.submit.form.field.debtorAddress'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorAddress"   maxlength="255"  name="debtorAddress"  value="${invoice.debtorAddress}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.debtorAddress.required'/>"  <c:if test="${not fn:contains(modifyFields,'debtorAddress') && isModifyStatus}">readonly</c:if>/>
                        </div>
                      </div> 
                      
                      
                      <div class="form-group">
						<label for="district" class="col-sm-4 control-label"><fmt:message 	key='invoice.submit.form.field.district' />: *</label>
						<div class="col-sm-6">
					      <input type="text" class="form-control" id="district" name="district" maxlength="255" data-rule-required="true"  value="${invoice.district}"
							 data-msg-required="<fmt:message key='invoice.submit.form.field.district.required'/>"  <c:if test="${not fn:contains(modifyFields,'district') && isModifyStatus}">readonly</c:if>/>
						</div>
					</div>

					<div class="form-group">
						<label for="city" class="col-sm-4 control-label"><fmt:message
								key='invoice.submit.form.field.city' />: *</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="city" name="city"  maxlength="255"  data-rule-required="true"   value="${invoice.city}" data-msg-required="<fmt:message key='invoice.submit.form.field.city.required'/>"  <c:if test="${not fn:contains(modifyFields,'city') && isModifyStatus}">readonly</c:if>/>
						</div>
					</div>

					<div class="form-group">
						<label for="region" class="col-sm-4 control-label"><fmt:message
								key='invoice.submit.form.field.region' />: </label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="region" name="region"  maxlength="255"  value="${invoice.region}" 	<c:if test="${not fn:contains(modifyFields,'region') && isModifyStatus}">readonly</c:if>/>
						</div>
					</div>

					<div class="form-group">
						<label for="country" class="col-sm-4 control-label"><fmt:message
								key='invoice.submit.form.field.country' />: *</label>
						<div class="col-sm-6">
							<select id="country" name="country" data-rule-required="true"
								data-msg-required="<fmt:message key='invoice.submit.form.field.country.required'/>"
									<c:if test="${not fn:contains(modifyFields,'country') && isModifyStatus}">disabled=true</c:if>>
								<option value="">Please select...</option>
								<c:forEach var="item" items="${countryList}" varStatus="status">
									<option value="${item.code}" 
									<c:if test="${item.code==invoice.country}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								</c:forEach>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label class="col-sm-4 control-label" for="postCode"><fmt:message
								key='invoice.submit.form.field.postCode' />: </label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="postCode"  name="postCode" data-rule-required="false"  value="${invoice.postCode}"	data-msg-required="<fmt:message key='seller.apply.form.field.comPostcode.required'/>"
								data-rule-pattern="^.{4,8}$"  data-msg-pattern="<fmt:message key='invoice.submit.form.field.postCode.pattern'/>"  <c:if test="${not fn:contains(modifyFields,'postCode') && isModifyStatus}">readonly</c:if>/>
						</div>
					</div>
                      
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorBizRegNo"><fmt:message key='invoice.submit.form.field.debtorBizRegNo'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorBizRegNo" name="debtorBizRegNo" value="${invoice.debtorBizRegNo}" 	  data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.debtorBizRegNo.required'/>"  data-rule-pattern="^[0-9a-zA-Z]{8,12}$"
								data-msg-pattern="<fmt:message key='invoice.submit.form.field.debtorBizRegNo.pattern'/>" <c:if test="${not fn:contains(modifyFields,'debtorBizRegNo') && isModifyStatus}">readonly</c:if>/>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="debtorTaxCode"><fmt:message key='invoice.submit.form.field.debtorTaxCode'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="debtorTaxCode" name="debtorTaxCode" value="${invoice.debtorTaxCode}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.debtorTaxCode.required'/>"  data-rule-pattern="^[0-9a-zA-Z]{8,12}$"
								data-msg-pattern="<fmt:message key='invoice.submit.form.field.debtorTaxCode.pattern'/>" <c:if test="${not fn:contains(modifyFields,'debtorTaxCode') && isModifyStatus}">readonly</c:if>/>
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
                          <input type="text" class="form-control" id="finStickerId" name="finStickerId"   maxlength="6"	 value="${invoice.finStickerId}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finStickerId.required'/>" 	data-rule-pattern="^[0-9a-zA-Z]{6}$"
								data-msg-pattern="<fmt:message key='invoice.submit.form.field.finStickerId.pattern'/>" <c:if test="${not fn:contains(modifyFields,'finStickerId') && isModifyStatus}">readonly</c:if>/>
                        </div>
                      </div>
                      
                      <div class="form-group">
						<label class="col-sm-4 control-label" for="serialNumInvoice"><fmt:message
								key='invoice.submit.form.field.serialNumInvoice' />: *</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="serialNumInvoice"  name="serialNumInvoice" data-rule-required="true" minlength="3"  value="${invoice.serialNumInvoice}"
								maxlength="12"  data-msg-required="<fmt:message key='invoice.submit.form.field.serialNumInvoice.required'/>" <c:if test="${not fn:contains(modifyFields,'serialNumInvoice') && isModifyStatus}">readonly</c:if>/>
					    </div>
					  </div>
					
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finVatInvNo"><fmt:message key='invoice.submit.form.field.finVatInvNo'/>: *</label>       
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="finVatInvNo" name="finVatInvNo" value="${invoice.finVatInvNo}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finVatInvNo.required'/>" data-rule-pattern="^[0-9]{5,12}$"
								data-msg-pattern="<fmt:message key='invoice.submit.form.field.finVatInvNo.pattern'/>"  <c:if test="${not fn:contains(modifyFields,'finVatInvNo') && isModifyStatus}">readonly</c:if>/>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finInvIssDate"><fmt:message key='invoice.submit.form.field.finInvIssDate'/>: *</label>       
                        <div class="col-sm-6">
                        <c:choose>
								<c:when test="${not fn:contains(modifyFields,'finInvIssDate') && isModifyStatus}">
									<input type="text" class="form-control" id="finInvIssDateRead" name="finInvIssDateRead"     value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='yyyy-MM-dd'/>"   >
								</c:when>
								<c:otherwise>
		                          <div class="input-group">
		                            <input type="text" class="form-control" id="finInvIssDate" autocomplete="off" name="finInvIssDate" value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='yyyy-MM-dd'/>"  autocomplete="off"  data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finInvIssDate.required'/>" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="<fmt:message key='invoice.submit.form.field.finInvIssDate.pattern'/>"   data-rule-isBeforeToday="true"
									data-msg-isBeforeToday="<fmt:message key='invoice.submit.form.field.finInvIssDate.isBeforeToday'/>"  />
									<span class="input-group-addon">
									  <i class="icon-calendar"></i>
									</span>
								  </div>
						  	</c:otherwise>
							</c:choose>
                        </div>
                      </div>
                      
                     <div class="form-group">
						<label class="col-sm-4 control-label" for="finInvAmount"><fmt:message
								key='invoice.submit.form.field.finInvAmount' />: *</label>
						<div class="col-sm-5">
							<input type="text" class="form-control" id="finInvAmount"
								name="finInvAmount" data-rule-required="true"   maxlength="10"	 value="${invoice.finInvAmount}" data-msg-required="<fmt:message key='invoice.submit.form.field.finInvAmount.required'/>"
								data-rule-pattern="^[0-9]{0,9}$" data-msg-pattern="<fmt:message key='invoice.submit.form.field.finInvAmount.pattern'/>" <c:if test="${not fn:contains(modifyFields,'finInvAmount') && isModifyStatus}">readonly</c:if>>
					    </div>
					   
					  <button type="button"  id="qry"  class="btn">Query</button>
					   
			            <div id="DialogDiv"  class="form-control" style="display:none;font-size: 15px; font-weight: bold; font-style: oblique;">
		         	      <h2><a href="#" id="btnClose">Close</a></h2>
			              <div>
			                <div><fmt:message  key='invoice.submit.form.field.limitMin'/>:${invoice.limitMin}</div> 
						    <div><fmt:message key='invoice.submit.form.field.limitMax'/>:${invoice.limitMax}</div>
						    <div><fmt:message key='invoice.submit.form.field.limitBalance'/>:${invoice.limitBalance}</div> 
			              </div>
				        </div>
                       
					</div>
                     
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finObjOfInv"><fmt:message key='invoice.submit.form.field.finObjOfInv'/>: *</label>       
                        <div class="col-sm-6">
                          <select id="finObjOfInv" name="finObjOfInv" data-rule-required="true"  data-msg-required="<fmt:message key='invoice.submit.form.field.finObjOfInv.required'/>" <c:if test="${not fn:contains(modifyFields,'finObjOfInv') && isModifyStatus}">disabled=true</c:if>>
						 	<option value="">Please select...</option>
							<c:forEach var="item" items="${finObjOfInvList}" varStatus="status">
								<option value="${item.code}"
									<c:if test="${item.code==invoice.finObjOfInv}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
							</c:forEach>
							</select>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finDueDateAccToCont"><fmt:message key='invoice.submit.form.field.finDueDateAccToCont'/>: *</label>       
                        <div class="col-sm-6">
                          <c:choose>
								<c:when test="${not fn:contains(modifyFields,'finDueDateAccToCont') && isModifyStatus}">
									<input type="text" class="form-control" id="finDueDateAccToContRead" name="finDueDateAccToContRead"     value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='yyyy-MM-dd'/>"   >
								</c:when>
								<c:otherwise>
		                          <div class="input-group">
		                            <input type="text" class="form-control" id="finDueDateAccToCont" name="finDueDateAccToCont" value="<fmt:formatDate value='${invoice.finDueDateAccToCont}' pattern='yyyy-MM-dd'/>"  autocomplete="off" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finDueDateAccToCont.required'/>" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="<fmt:message key='invoice.submit.form.field.finDueDateAccToCont.pattern'/>"  	data-rule-isAfterToday="true"
									data-msg-isAfterToday="<fmt:message key='invoice.submit.form.field.finDueDateAccToCont.isAfterToday'/>" readonly />
		                            <span class="input-group-addon">
									  <i class="icon-calendar"></i>
									</span>
								  </div>
						  	</c:otherwise>
							</c:choose>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finExpPmtDate"><fmt:message key='invoice.submit.form.field.finExpPmtDate'/>: *</label>       
                        <div class="col-sm-6">
                         <c:choose>
								<c:when test="${not fn:contains(modifyFields,'finExpPmtDate') && isModifyStatus}">
									<input type="text" class="form-control" id="finExpPmtDateRead" name="finExpPmtDateRead"     value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='yyyy-MM-dd'/>"   >
								</c:when>
								<c:otherwise>
		                          <div class="input-group">
		                            <input type="text" class="form-control" id="finExpPmtDate" name="finExpPmtDate"  value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='yyyy-MM-dd'/>" readonly  autocomplete="off" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finExpPmtDate.required'/>" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="<fmt:message key='invoice.submit.form.field.finExpPmtDate.pattern'/>"   data-rule-isAfterDueDate="true"
									data-msg-isAfterDueDate="<fmt:message key='invoice.submit.form.field.finExpPmtDate.isAfterDueDate'/>"  readonly />                        
		                            <span class="input-group-addon">
									  <i class="icon-calendar"></i>
									</span>
								  </div>
						  	</c:otherwise>
							</c:choose>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="finRmngMatTerm"><fmt:message key='invoice.submit.form.field.finRmngMatTerm'/>: *</label>       
                        <div class="col-sm-6">
                         <input type="text" class="form-control" id="finRmngMatTerm" name="finRmngMatTerm" data-rule-required="true"  value="${invoice.finRmngMatTerm}"  data-msg-required="<fmt:message key='invoice.submit.form.field.finRmngMatTerm.required'/>" data-rule-range="[25,120]" readonly   data-msg-range="<fmt:message key='invoice.submit.form.field.finRmngMatTerm.pattern'/>"  <c:if test="${not fn:contains(modifyFields,'finRmngMatTerm') && isModifyStatus}">readonly</c:if>>
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
						<label for="readyToSellAdv" class="col-sm-4 control-label"><fmt:message
								key='invoice.submit.form.field.readyToSellAdv' />: *</label>
						<div class="col-sm-6">
							<select id="readyToSellAdv" name="readyToSellAdv"
								data-rule-required="true"
								data-msg-required="<fmt:message key='invoice.submit.form.field.readyToSellAdv.required'/>"
									<c:if test="${not fn:contains(modifyFields,'readyToSellAdv') && isModifyStatus}">disabled=true</c:if>>
								<option value="">Please select...</option>
								<c:forEach var="item" items="${readyToAdvList}"
									varStatus="status">
									<c:if test="${item.code==invoice.readyToSellAdv}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					
					
                      <div class="form-group">
						<label for="readyToSellInt" class="col-sm-4 control-label"><fmt:message
								key='invoice.submit.form.field.readyToSellInt' />: *</label>
						<div class="col-sm-6">
							<select id="readyToSellInt" name="readyToSellInt"
								data-rule-required="true"
								data-msg-required="<fmt:message key='invoice.submit.form.field.readyToSellInt.required'/>"
								<c:if test="${not fn:contains(modifyFields,'readyToSellInt') && isModifyStatus}">disabled=true</c:if>>
								<option value="">Please select...</option>
								<c:forEach var="item" items="${readyToIntList}"
									varStatus="status">
								  <c:if test="${item.code==invoice.readyToSellInt}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								</c:forEach>
							</select>
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
                          <c:if test="${fn:contains(modifyFields,'invoice_firstInvoice') || not isModifyStatus}">
                          <span class="btn btn-success fileinput-button">
                            <i class="icon-plus icon-white"></i>
                            <span><fmt:message key='invoice.submit.form.button.addFile'/></span>                            
                            <input type="file" id="docScanOfInv" name="file" multiple>
                            <input type="hidden" id="file-type-docScanOfInv" name="fileType" value="${self.docBiztypePrefix}invoice_firstInvoice" />
                          </span>
                          <!-- 进度条 -->
                          <div id="progress-docScanOfInv" class="progress progress-success progress-striped">
                            <div class="bar"></div>
                          </div>
                          </c:if>
                          <!-- 已经上传的文件 -->
                          <div id="file-link-docScanOfInv">${self.doc1Link}</div>
                          <div id="error-docScanOfInvId"></div>
                        </div>
                      </div>
                    </form>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="docScanOfCont">
                          <fmt:message key='invoice.submit.form.field.docScanOfCont'/>: *
                        </label>
                        <div class="col-sm-3">
                        <c:if test="${fn:contains(modifyFields,'invoice_secondInvoice') || not isModifyStatus}">
                          <span class="btn btn-success fileinput-button">
                            <i class="icon-plus icon-white"></i>
                            <span><fmt:message key='invoice.submit.form.button.addFile'/></span>
                            <input type="file" id="docScanOfCont" name="file" multiple>
                            <input type="hidden" id="file-type-docScanOfCont" name="fileType" value="${self.docBiztypePrefix}invoice_secondInvoice" />
                          </span>
                          
                          <!-- 进度条 -->
                          <div id="progress-docScanOfCont" class="progress progress-success progress-striped">
                            <div class="bar"></div>
                          </div>
                          </c:if>
                          <!-- 已经上传的文件 -->
                          <div id="file-link-docScanOfCont">${self.doc2Link}</div>
                          <div id="error-docScanOfContId"></div>
                        </div>
                      </div>
                    </form>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="docDlvryCnfm">
                          <fmt:message key='invoice.submit.form.field.docDlvryCnfm'/>: *
                        </label>
                        <div class="col-sm-3">
                        <c:if test="${fn:contains(modifyFields,'invoice_thirdInvoice') || not isModifyStatus}">
                          <span class="btn btn-success fileinput-button">
                            <i class="icon-plus icon-white"></i>
                            <span><fmt:message key='invoice.submit.form.button.addFile'/></span>                            
                            <input type="file" id="docDlvryCnfm" name="file" multiple>
                            <input type="hidden" id="file-type-docDlvryCnfm" name="fileType" value="${self.docBiztypePrefix}invoice_thirdInvoice" />
                          </span>
                          <!-- 进度条 -->
                          <div id="progress-docDlvryCnfm" class="progress progress-success progress-striped">
                            <div class="bar"></div>
                          </div>
                          </c:if>
                          <!-- 已经上传的文件 -->
                          <div id="file-link-docDlvryCnfm">${self.doc3Link}</div>
                          <div id="error-docDlvryCnfmId"></div>
                        </div>
                      </div>
                    </form>
                    
                   <c:if test="${debtorAckReq == 'required' }">   
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="docDebtorAckmt">
                          <fmt:message key='invoice.submit.form.field.docDebtorAckmt'/>  
                        </label>
                        <div class="col-sm-3">
                        <c:if test="${fn:contains(modifyFields,'taxcode_deliveryConfirm') || not isModifyStatus}">
                          <span class="btn btn-success fileinput-button">
                            <i class="icon-plus icon-white"></i>
                            <span><fmt:message key='invoice.submit.form.button.addFile'/></span> 
                            <input type="file" id="docDebtorAckmt" name="file" multiple>
                            <input type="hidden" id="file-type-docDebtorAckmt" name="fileType" value="${self.docBiztypePrefix}taxcode_deliveryConfirm" />
                          </span>
                          
                          <!-- 进度条 -->
                          <div id="progress-docDebtorAckmt" class="progress progress-success progress-striped">
                            <div class="bar"></div>
                          </div>
                          </c:if>
                          <!-- 已经上传的文件 -->
                          <div id="file-link-docDebtorAckmt">${self.doc4Link}</div>
                          <div id="error-docDebtorAckmtId"></div>
                        </div>
                      </div>
                    </form>
                    </c:if>
                    
                    <form style="display:none;" id="form-documents-hidden">
                      <input type="hidden" name="documents[0].id" id="docScanOfInvId"  value="${self.doc1}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.docScanOfInvId.required'/>">
                      <input type="hidden" name="documents[0].dispOrder" value="1">
                      
                      <input type="hidden" name="documents[1].id" id="docScanOfContId"  value="${self.doc2}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.docScanOfContId.required'/>">
                      <input type="hidden" name="documents[1].dispOrder" value="2">
                      
                      <input type="hidden" name="documents[2].id" id="docDlvryCnfmId"   value="${self.doc3}"  data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.docDlvryCnfmId.required'/>">
                      <input type="hidden" name="documents[2].dispOrder" value="3">
                      <c:if test="${debtorAckReq == 'required' }">
                        <input type="hidden" name="documents[3].id" id="docDebtorAckmtId"  value="${self.doc4}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.docDebtorAckmtId.required'/>">
                        <input type="hidden" name="documents[3].dispOrder" value="4">
                      </c:if>
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
                            <input type="checkbox" class="checkbox" id="checkbox-agree1">
                            <label for="checkbox-agree1">
                              <fmt:message key='invoice.submit.form.terms.check.agree1'/>
                            </label>
                          </div>
                        </div>
                      
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree2">
                            <label for="checkbox-agree2">
                              <fmt:message key='invoice.submit.form.terms.check.agree2'/>
                            </label>
                          </div>
                        </div>
                      
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree3">
                            <label for="checkbox-agree3">
                              <fmt:message key='invoice.submit.form.terms.check.agree3'/>
                            </label>
                          </div>
                        </div>
                      
                        <div class="form-group">
                          <div class="col-sm-10">
                            <input type="checkbox" class="checkbox" id="checkbox-agree4">
                            <label for="checkbox-agree4">
                              <fmt:message key='invoice.submit.form.terms.check.agree4'/>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form> 
                  </div>
                </div>
                <div style="text-align: center; margin-top: 5px;">
				<!--   <button class="btn" id="save-invoice" type="button">
					<fmt:message key='buyer.apply.form.button.save' />
				  </button> -->
				  <button class="btn" id="submit-invoice" type="button" disabled>
					<fmt:message key='buyer.apply.form.button.submit' />
				  </button>
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
          <h4 class="modal-title" id="H1"></h4>
        </div>
        <div class="modal-cup"></div>
        <div class="modal-hline"></div>
        <div class="modal-body">
          <div style="text-align: center; font-weight:bold;"> 
            <fmt:message key='invoice.submit.message.congratulation' />
          </div>
          <div style="text-align:center; font-size:20px;" id="modal-success-body">
            <fmt:message key='${message}' />
          </div>
          <div style="text-align:center; font-size:14px;" id="modal-timetips">
          </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
  
  <!-- Modal -->
  <div class="modal fade" id="modal_failed" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
          <h4 class="modal-title" id="H1"></h4>
        </div>
        <div class="modal-cup"></div>
        <div class="modal-hline"></div>
        <div class="modal-body">
          <div style="text-align: center; font-weight:bold;"> 
            <fmt:message key='invoice.submit.message.failed' />
          </div>
          <div style="text-align:center; font-size:20px;" id="modal-failed-body">
            <fmt:message key='invoice.submit.message.failedMsg' />
          </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>

