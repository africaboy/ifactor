<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="idTypeList" expression="@catalogService.findIdType().children" />
<spring:eval var="nearestSMECenterList" expression="@catalogService.findNearestSmeCenter().children" />
<spring:eval var="invAvgAmtOptList" expression="@catalogService.findInvoiceAvgAmountOption().children" />
<spring:eval var="genderList" expression="@catalogService.findGender().children" />
<spring:eval var="countryList" expression="@catalogService.findCountry().children" />
<spring:eval var="industryList" expression="@catalogService.findIndustry().children" />
<spring:eval var="isComVietnamList" expression="@catalogService.findIsComVietnam().children" />

<c:forEach var="doc" items="${sellerApplyDocs}" varStatus="status">
  <c:set target="${self}" property="doc${doc.dispOrder}" value="${doc.id}" />
  <c:set target="${self}" property="doc${doc.dispOrder}Link">
  <a href="${base}/fileDownload/${doc.bizType}/${doc.id}<c:if test="${not empty doc.extension}">.</c:if>${doc.extension}">${doc.originalName}</a>
  </c:set>
</c:forEach>
<c:set target="${self}" property="title"><fmt:message key='seller.apply.viewPage.title'/></c:set>
<c:set target="${self.css}" property="main">
    <!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-ui.css">
    <!-- CSS adjustments for browsers with JavaScript disabled -->
    <noscript><link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-noscript.css"></noscript>
    <noscript><link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-ui-noscript.css"></noscript>
    
    <%-- <link href="${base}/static/libs/iCheck-master/demo/css/custom.css?v=1.0.2" rel="stylesheet"> --%>
    <link href="${base}/static/libs/date-time/css/datepicker.css" rel="stylesheet">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">   
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
   <%--  <script type="text/javascript" src="${base}/static/libs/iCheck-master/demo/js/custom.min.js?v=1.0.2"></script> --%>
        <script type="text/javascript" src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/silviomoreto-bootstrap-select/bootstrap-select.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/seller/account/apply-view.js"></script>
</c:set>

<c:set target="${self.content}" property="main">
             <!--  <div class="form-title">Apply as Seller</div> -->
              <div class="form-content">
                <div class="tab-header clearfix">
                  <div class="tab-header-title">
                    <i></i> 
                    <span><fmt:message key='seller.apply.viewPage.tabsTitle'/></span>
                  </div>
                  <ul class="nav nav-tabs pull-right" id="form-tab-header">
                    <li class="active"><a href="#tab-personal-info" data-toggle="tab"><fmt:message key='seller.apply.tab.personalInfo'/></a></li>
                    <li><a href="#tab-company-info" data-toggle="tab"><fmt:message key='seller.apply.tab.companyInfo'/></a></li>
                    <li><a href="#tab-further-details" data-toggle="tab"><fmt:message key='seller.apply.tab.furtherDetails'/></a></li>
                    <li><a href="#tab-documents" data-toggle="tab"><fmt:message key='seller.apply.tab.documents'/></a></li>
                    <li><a href="#tab-terms-conditions" data-toggle="tab"><fmt:message key='seller.apply.tab.terms'/></a></li>
                  </ul>
                </div>
                
                <div class="tab-content">
                  <div class="tab-pane active" id="tab-personal-info">
                  
                    <form class="form-horizontal" id="form-personal-info" method="POST" enctype="multipart/form-data">  
                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4><fmt:message key='seller.apply.tab.personalInfo'/></h4>
                        </div>
                        <div class="col-sm-6">
                          <input type="hidden" name="id" value="${sellerApply.id }" />
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="title"><fmt:message key='seller.register.form.field.title'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="title" name="title" value="${sellerApply.title}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="firstName"><fmt:message key='seller.register.form.field.firstName'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="firstName" name="firstName" value="${sellerApply.firstName}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="lastName"><fmt:message key='seller.register.form.field.lastName'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="lastName" name="lastName" value="${sellerApply.lastName}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="email"><fmt:message key='seller.register.form.field.email'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="email" name="email" value="${sellerApply.email}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="gender"><fmt:message key='seller.apply.form.field.gender'/>: *</label>
                        <div class="col-sm-6">
                          <select  id="gender" name="gender" disabled>
                            <option value="">Please select...</option>
                            <c:forEach var="item" items="${genderList}" varStatus="status"> 
                            <option value="${item.code}"<c:if test="${sellerApply.gender==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="dob"><fmt:message key='seller.apply.form.field.dob'/>: *</label>
                        <div class="col-sm-6">
					      <div class="input-group">
                            <input type="text" class="form-control" id="dob" name="dob" value="<fmt:formatDate value='${sellerApply.dob}' pattern='yyyy-MM-dd'/>" autocomplete="off" readonly />
							<span class="input-group-addon">
							  <i class="icon-calendar"></i>
							</span>
						  </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="gender"><fmt:message key='seller.apply.form.field.nationality'/>: *</label>   
                        <div class="col-sm-6">
                          <select id="nationality" name="nationality" disabled>
                            <option value="">Please select...</option>
                            <c:forEach var="item" items = "${countryList}" varStatus = "status">
                            <option value="${item.code}"<c:if test="${item.code==sellerApply.nationality}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="countryOfResidence"><fmt:message key='seller.apply.form.field.countryOfResidence'/>: </label>
                        <div class="col-sm-6">
                          <select id="countryOfResidence" name="countryOfResidence" disabled>
                            <option value="">Please select...</option>
                            <c:forEach var="item" items = "${countryList}" varStatus = "status">
                            <option value="${item.code}"<c:if test="${item.code==sellerApply.countryOfResidence}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="idType"><fmt:message key='seller.apply.form.field.idType'/>: *</label>
                        <div class="col-sm-6">
                          <select id="idType" name="idType" disabled>
                            <option value="">Please select...</option>
                            <c:forEach var="item" items="${idTypeList}" varStatus="status"> 
                            <option value="${item.code}"<c:if test="${sellerApply.idType==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="idNumber"><fmt:message key='seller.apply.form.field.idNumber'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="idNumber" name="idNumber" value="${sellerApply.idNumber}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="workPhone"><fmt:message key='seller.register.form.field.workPhone'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text"  style="width:20%" id="workCountryCode" name="workCountryCode"  value="${sellerApply.workCountryCode}" readonly  />
                          <input type="text"  style="width:79%" id="workPhone" name="workPhone" value="${sellerApply.workPhone}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="mobilePhone"><fmt:message key='seller.register.form.field.mobilePhone'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text"  style="width:20%"  id="mobileCountryCode" name="mobileCountryCode" value="${sellerApply.mobileCountryCode}" readonly>
                          <input type="text"  style="width:79%"  id="mobilePhone" name="mobilePhone" value="${sellerApply.mobilePhone}" readonly /> 
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="position"><fmt:message key='seller.register.form.field.position'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="position" name="position" value="${sellerApply.position}" readonly />
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-company-info">
                    <form class="form-horizontal" id="form-company-info" method="POST" enctype="multipart/form-data">

                      <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4><fmt:message key='seller.apply.tab.companyInfo'/></h4>
                        </div>
                        <div class="col-sm-6"></div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="companyName"><fmt:message key='seller.apply.form.field.companyName'/>: *</label>
                        <div class="col-sm-6">                         
                          <input type="text" class="form-control" id="companyName" name="companyName" value="${sellerApply.companyName}" readonly />
                        </div>
                      </div>
                      
                      
                      <div class="form-group">
				        <label for="isComVietnam" class="col-sm-4 control-label"><fmt:message key='seller.apply.form.field.isComVietnam' />: *</label>
						<div class="col-sm-6">
							<select id="isComVietnam" name="isComVietnam"  disabled data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.isComVietnam.required'/>">
							  <option value="">Please select...</option>
							  <c:forEach var="item" items="${isComVietnamList}" varStatus="status">
							  <option value="${item.code}"<c:if test="${item.code==sellerApply.isComVietnam}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
						      </c:forEach>
							</select>
						</div>
						</div>

						<div class="form-group" id="comRegisteredCountryDiv"    <c:if test="${sellerApply.isComVietnam=='No'}"> style="display:block;"</c:if><c:if test="${sellerApply.isComVietnam=='Yes'}"> style="display:none;"</c:if> /> 
							<label for="comRegisteredCountry" class="col-sm-4 control-label"><fmt:message key='seller.apply.form.field.comRegisteredCountry' />: *</label>
							<div class="col-sm-6">
							  <select id="comRegisteredCountry" name="comRegisteredCountry"  disabled   data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comRegisteredCountry.required'/>">
								<option value="">Please select...</option>
								<c:forEach var="item" items="${countryList}" varStatus="status">
							    <option value="${item.code}"<c:if test="${item.code==sellerApply.comRegisteredCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								</c:forEach>
							</select>
							</div>
						</div>

				       <div class="form-group">
					     <label for="comRegistrationNumber" class="col-sm-4 control-label"><fmt:message	key='seller.apply.form.field.comRegistrationNumber' />: *</label>
					     <div class="col-sm-6">
					       <input type="text" class="form-control" id="comRegistrationNumber" name="comRegistrationNumber" value="${sellerApply.comRegistrationNumber}" readonly />
					      </div>
					   </div>

				     <div class="form-group">
						<label for="comTaxCode" class="col-sm-4 control-label"><fmt:message key='seller.apply.form.field.comTaxCode' />: *</label>
						<div class="col-sm-6">
						  <input type="text" class="form-control"  id="comTaxCode" name="comTaxCode" value="${sellerApply.comTaxCode}" readonly />
						</div>
					  </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comEstablishmentDate"><fmt:message key='seller.apply.form.field.comEstablishmentDate'/>: *</label>
                        <div class="col-sm-6">
                          <div class="input-group">
                            <input type="text" class="form-control" id="comEstablishmentDate" name="comEstablishmentDate" value="<fmt:formatDate value='${sellerApply.comEstablishmentDate}' pattern='yyyy-MM-dd'/>" autocomplete="off" readonly />
							<span class="input-group-addon">
							  <i class="icon-calendar"></i>
							</span>
						  </div>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comRegisterNo"><fmt:message key='seller.apply.form.field.comIndustrySector'/>: *</label>
                        <div class="col-sm-6">
                          <select id="comIndustrySector" name="comIndustrySector" data-rule-required="true" disabled>
                            <option value="">Please select...</option>
                            <c:forEach var="item" items="${industryList}"> 
                            <option value="${item.code}" class="option1" disabled <c:if test="${item.code==sellerApply.comIndustrySector}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                              <c:forEach var="item2" items="${item.children}"> 
                              <option value="${item2.code}" class="option2" disabled  <c:if test="${item2.code==sellerApply.comIndustrySector}"> selected</c:if>>${item2[self.i18n.catalog_name]}</option>
                                <c:forEach var="item3" items="${item2.children}"> 
	                            <option value="${item3.code}"  class="option3"  <c:if test="${item3.code==sellerApply.comIndustrySector}"> selected</c:if>>${item3[self.i18n.catalog_name]}</option>
	                            </c:forEach>
                              </c:forEach>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comAddress"><fmt:message key='seller.apply.form.field.comAddress'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comAddress" name="comAddress" value="${sellerApply.comAddress}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comDistrict"><fmt:message key='seller.apply.form.field.comDistrict'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comDistrict" name="comDistrict" value="${sellerApply.comDistrict}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comCity"><fmt:message key='seller.apply.form.field.comCity'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comCity" name="comCity" value="${sellerApply.comCity}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comRegion"><fmt:message key='seller.apply.form.field.comRegion'/>: </label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comRegion" name="comRegion" value="${sellerApply.comRegion}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comCountry"><fmt:message key='seller.apply.form.field.comCountry'/>: *</label>
                        <div class="col-sm-6">
                          <select id="comCountry" name="comCountry" disabled>
                            <option value="">Please select...</option>
                            <c:forEach var="item" items = "${countryList}" varStatus = "status">
                            <option value="${item.code}"<c:if test="${item.code==sellerApply.comCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comPostcode"><fmt:message key='seller.apply.form.field.comPostcode'/>: </label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comPostcode" name="comPostcode" value="${sellerApply.comPostcode}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="isComAddress2"><fmt:message key='seller.apply.form.field.isComAddress2'/>:</label>
                        <div class="col-sm-6">
                          <input type="checkbox" class="form-control ifactor-checkbox" id="isComAddress2" name="isComAddress2"<c:if test="${not empty sellerApply.comAddress2}"> checked</c:if> disabled />
                          <input type="hidden" id="comAddress2" name="comAddress2" value="${sellerApply.comAddress2}" />
                        </div>
                      </div>
                      
                      <div id="addressDiv" class="form-group" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
					    <label for="address" class="col-sm-4 control-label"><fmt:message key='seller.apply.form.field.address'/>: *</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" id="address"   name="address"   value="${sellerApply.address}" readonly />
					    </div>
					  </div>
                            
                      <div   id="comDistrictDiv"  class="form-group"  <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
                        <label class="col-sm-4 control-label" for="comDistrict2"><fmt:message key='seller.apply.form.field.comDistrict2'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comDistrict2" name="comDistrict2" value="${sellerApply.comDistrict2}" readonly />
                        </div>
                      </div>
                      
                      <div  id="comRegionDiv"  class="form-group" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
                        <label class="col-sm-4 control-label" for="comRegion2"><fmt:message key='seller.apply.form.field.comRegion2'/>: </label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comRegion2" name="comRegion2"   value="${sellerApply.comRegion2}" readonly />
                        </div>
                      </div>
                      
                      <div  id="comCityDiv" class="form-group" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
                        <label class="col-sm-4 control-label" for="comCity2"><fmt:message key='seller.apply.form.field.comCity2'/>: *</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comCity2" name="comCity2" value="${sellerApply.comCity2}" readonly />
                        </div>
                      </div>
                      
                      <div  id="comCountryDiv"  class="form-group" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
                        <label class="col-sm-4 control-label" for="comCountry2"><fmt:message key='seller.apply.form.field.comCountry2'/>: *</label>
                        <div class="col-sm-6">
                          <select id="comCountry2" name="comCountry2" disabled>
                            <option value="">Please select...</option>
                            <c:forEach var="item" items = "${countryList}" varStatus = "status">
                            <option value="${item.code}"<c:if test="${item.code==sellerApply.comCountry2}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      
                      <div  id="comPostcodeDiv"  class="form-group"  <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
                        <label class="col-sm-4 control-label" for="comPostcode2"><fmt:message key='seller.apply.form.field.comPostcode2'/>: </label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control"  id="comPostcode2" name="comPostcode2" value="${sellerApply.comPostcode2}" readonly />
                        </div>
                      </div>
                      
                      
                      <div class="form-group">
                        <label class="col-sm-4 control-label" for="comNearestCenter"><fmt:message key='seller.apply.form.field.comNearestCenter'/>: *</label>
                        <div class="col-sm-6">
                          <select  id="comNearestCenter" name="comNearestCenter" disabled>
                            <option value="">Please select...</option>
                            <c:forEach var="item" items="${nearestSMECenterList}" varStatus="status"> 
                            <option value="${item.code}"<c:if test="${sellerApply.comNearestCenter==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                    
                  <div class="tab-pane" id="tab-further-details">
                    <form class="form-horizontal" id="form-further-details" method="POST" enctype="multipart/form-data">

                      <div class="form-group">
                        <div class="col-sm-5 control-label">
                          <h4><fmt:message key='seller.apply.tab.furtherDetails'/>:</h4>
                        </div>
                        <div class="col-sm-5"></div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-7 control-label">
                          <fmt:message key='seller.apply.form.label.choose5MainDebtors'/>:
                        </label>
                        <div class="col-sm-3">
                          <input type="hidden" id="debtorA1Id" name="debtorA1Id" value="${sellerApply.debtorA1Id}" />
                          <input type="text" class="form-control" id="debtorA1Name" name="debtorA1Name" value="${sellerApply.debtorA1Name}" readonly />
                          <input type="hidden" id="debtorA2Id" name="debtorA2Id" value="${sellerApply.debtorA2Id}" />
                          <input type="text" class="form-control" id="debtorA2Name" name="debtorA2Name" value="${sellerApply.debtorA2Name}" readonly />
                          <input type="hidden" id="debtorA3Id" name="debtorA3Id" value="${sellerApply.debtorA3Id}" />
                          <input type="text" class="form-control" id="debtorA3Name" name="debtorA3Name" value="${sellerApply.debtorA3Name}" readonly />
                          <input type="hidden" id="debtorA4Id" name="debtorA4Id" value="${sellerApply.debtorA4Id}" />
                          <input type="text" class="form-control" id="debtorA4Name" name="debtorA4Name" value="${sellerApply.debtorA4Name}" readonly />
                          <input type="hidden" id="debtorA5Id" name="debtorA5Id" value="${sellerApply.debtorA5Id}" />
                          <input type="text" class="form-control" id="debtorA5Name" name="debtorA5Name" value="${sellerApply.debtorA5Name}" readonly />
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-7 control-label">
                          <fmt:message key='seller.apply.form.label.choose5OtherDebtors'/>:
                        </label>
                        <div class="col-sm-3">
                          <input type="hidden" id="debtorB1Id" name="debtorB1Id" value="${sellerApply.debtorB1Id}" />
                          <input type="text" class="form-control" id="debtorB1Name" name="debtorB1Name" value="${sellerApply.debtorB1Name}" readonly />
                          <input type="hidden" id="debtorB2Id" name="debtorB2Id" value="${sellerApply.debtorB2Id}" />
                          <input type="text" class="form-control" id="debtorB2Name" name="debtorB2Name" value="${sellerApply.debtorB2Name}" readonly />
                          <input type="hidden" id="debtorB3Id" name="debtorB3Id" value="${sellerApply.debtorB3Id}" />
                          <input type="text" class="form-control" id="debtorB3Name" name="debtorB3Name" value="${sellerApply.debtorB3Name}" readonly />
                          <input type="hidden" id="debtorB4Id" name="debtorB4Id" value="${sellerApply.debtorB4Id}" />
                          <input type="text" class="form-control" id="debtorB4Name" name="debtorB4Name" value="${sellerApply.debtorB4Name}" readonly />
                          <input type="hidden" id="debtorB5Id" name="debtorB5Id" value="${sellerApply.debtorB5Id}" />
                          <input type="text" class="form-control" id="debtorB5Name" name="debtorB5Name" value="${sellerApply.debtorB5Name}" readonly />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="invoiceAvgAmountCode">
                          <fmt:message key='seller.apply.form.field.invoiceAvgAmountCode'/>: *
                        </label>
                        <div class="col-sm-3">
                          <select  id="invoiceAvgAmountCode" name="invoiceAvgAmountCode" disabled>
                            <option value="">Please select..</option>
                            <c:forEach var="item" items = "${invAvgAmtOptList}" varStatus = "status">
                            <option value="${item.code}"<c:if test="${item.code==sellerApply.invoiceAvgAmountCode}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                            </c:forEach>
                          </select>
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="esignatureSN">
                          <fmt:message key='seller.apply.form.field.esignatureSN'/>: 
                        </label>
                        <div class="col-sm-3">
                          <input type="text" class="form-control"  id="esignatureSN" name="esignatureSN" value="${sellerApply.esignatureSN}"   readonly />
                        </div>
                      </div>
                    </form>
                  </div>
                    
                    
                  <div class="tab-pane" id="tab-documents">
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="identificationFile">
                          <fmt:message key='seller.apply.form.field.identificationFile'/>: *
                        </label>
                        <div class="col-sm-3" id="div-IdentificationFile">
                          <div id="file-link-identificationFile">  
                            ${self.doc1Link}
                          </div>
                        </div>
                      </div>
                      

                    </form>
                                        
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="signedFile">
                          <fmt:message key='seller.apply.form.field.signedFile'/>: *
                        </label>
                        <div class="col-sm-3" id="div-signedFile">   
                          <!-- 已经上传的文件 -->
                          <div id="file-link-signedFile">
                            ${self.doc2Link}
                          </div>
                        </div>
                      </div>
                    </form>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">  
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="licenseFile">
                          <fmt:message key='seller.apply.form.field.licenseFile'/>: *
                        </label>
                        <div class="col-sm-3">       
                          <!-- 已经上传的文件 -->
                          <div id="file-link-licenseFile">
                            ${self.doc3Link}
                          </div>
                        </div>
                      </div>
                    </form>
                      
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="taxCodeFile">
                          <fmt:message key='seller.apply.form.field.taxCodeFile'/>: *
                        </label>
                        <div class="col-sm-3">
                          <!-- 已经上传的文件 -->
                          <div id="file-link-taxCodeFile">
                            ${self.doc4Link}
                          </div>
                        </div>
                      </div>
                    </form>
                      
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="fsFileLastYear">
                          <fmt:message key='seller.apply.form.field.fsFileLastYear'/>: *
                        </label>
                        <div class="col-sm-3"> 
                          <!-- 已经上传的文件 -->
                          <div id="file-link-fsFileLastYear">
                            ${self.doc5Link}
                          </div>
                        </div>
                      </div>
                    </form>
                      
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="fsFileLast2Year">
                          <fmt:message key='seller.apply.form.field.fsFileLast2Year'/>: *
                        </label>
                        <div class="col-sm-3">
                          <!-- 已经上传的文件 -->
                          <div id="file-link-fsFileLast2Year">
                            ${self.doc6Link}
                          </div>
                        </div>
                      </div>
                    </form>
                      
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="invoiceFile1">
                          <fmt:message key='seller.apply.form.field.invoiceFile'/>: *
                        </label>
                        <div class="col-sm-3">
                          <!-- 已经上传的文件 -->
                          <div id="file-link-invoiceFile1">
                            ${self.doc7Link}
                          </div>
                        </div>
                      </div>
                    </form>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="invoiceFile2">
                          &nbsp;&nbsp;
                        </label>
                        <div class="col-sm-3">
                          <!-- 已经上传的文件 -->
                          <div id="file-link-invoiceFile2">
                            ${self.doc8Link}
                          </div>
                        </div>
                      </div>
                    </form>
                    
                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                      <div class="form-group">
                        <label class="col-sm-7 control-label" for="invoiceFile3">
                          &nbsp;&nbsp;
                        </label>
                        <div class="col-sm-3">
                          <!-- 已经上传的文件 -->
                          <div id="file-link-invoiceFile2">
                            ${self.doc9Link}
                          </div>
                        </div>
                      </div>
                    </form>

                    <form style="display:none;" id="form-documents-hidden">                     
                      <input type="hidden" name="documents[0].id" id="identificationFileId" value="${self.doc1}">
                      <input type="hidden" name="documents[0].dispOrder" value="1">
                      
                      <input type="hidden" name="documents[1].id" id="signedFileId" value="${self.doc2}">
                      <input type="hidden" name="documents[1].dispOrder" value="2">
                      
                      <input type="hidden" name="documents[2].id" id="licenseFileId" value="${self.doc3}">
                      <input type="hidden" name="documents[2].dispOrder" value="3">
                     
                      <input type="hidden" name="documents[3].id" id="taxCodeFileId" value="${self.doc4}">
                      <input type="hidden" name="documents[3].dispOrder" value="4">
                      
                      <input type="hidden" name="documents[4].id" id="fsFileLastYearId" value="${self.doc5}">
                      <input type="hidden" name="documents[4].dispOrder" value="5">
                     
                      <input type="hidden" name="documents[5].id" id="fsFileLast2YearId" value="${self.doc6}">
                      <input type="hidden" name="documents[5].dispOrder" value="6">
                      
                      <input type="hidden" name="documents[6].id" id="invoiceFile1Id" value="${self.doc7}">
                      <input type="hidden" name="documents[6].dispOrder" value="7">
                      
                      <input type="hidden" name="documents[7].id" id="invoiceFile2Id" value="${self.doc8}">
                      <input type="hidden" name="documents[7].dispOrder" value="8">
                      
                      <input type="hidden" name="documents[8].id" id="invoiceFile3Id" value="${self.doc9}">
                      <input type="hidden" name="documents[8].dispOrder" value="9">
                               
                    </form>
                  </div>
                  
                  <div class="tab-pane" id="tab-terms-conditions">
                    <form class="form-horizontal" id="form-terms-conditions" method="POST" enctype="multipart/form-data">
                      <div style="width:99%; margin:0 auto;">
                        <div style="height:220px; max-height: 220px; overflow: auto;padding:10px 0px; background: white;">
                          <fmt:message key='seller.apply.form.terms.content'/>   
                        </div>
                      </div>
                      
                    </form>
                  </div>
                </div>
                
              </div>
</c:set>


<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
