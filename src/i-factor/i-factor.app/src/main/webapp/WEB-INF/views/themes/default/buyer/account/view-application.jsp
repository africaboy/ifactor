<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="idTypeList" expression="@catalogService.findIdType().children" />
<spring:eval var="comDurationList" expression="@catalogService.findComDurationInVt().children" />
<spring:eval var="comTypeList" expression="@catalogService.findComType().children" />
<spring:eval var="comIndustryList" expression="@catalogService.findComIndustry().children" />
<spring:eval var="businessFromList" expression="@catalogService.findBusinessFrom().children" />
<spring:eval var="positionList" expression="@catalogService.findPosition().children" />
<spring:eval var="titleList" expression="@catalogService.findTitle().children" />
<spring:eval var="genderList" expression="@catalogService.findGender().children" />
<spring:eval var="countryList" expression="@catalogService.findCountry().children" />
<spring:eval var="isComVietnamList" expression="@catalogService.findIsComVietnam().children" />
<spring:eval var="haveTradingOtherList" expression="@catalogService.findHaveTradingOther().children" />
<spring:eval var="whatIsAssetList"  expression="@catalogService.findWhatIsAsset().children" />


<c:set target="${self}" property="docBiztypePrefix"><%= com.entrofine.ifactor.app.service.BuyerApplyDocService.BIZTYPE_PREFIX%></c:set>
<c:forEach var="doc" items="${buyerApplyDoc}" varStatus="status">
  <c:set target="${self}" property="doc${doc.dispOrder}" value="${doc.id}" />
  <c:set target="${self}" property="doc${doc.dispOrder}Link">
  <a href="${base}/fileDownload/${doc.bizType}/${doc.id}<c:if test="${not empty doc.extension}">.</c:if>${doc.extension}">${doc.originalName}</a>
  </c:set>
</c:forEach>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
   <!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-ui.css">
    <!-- CSS adjustments for browsers with JavaScript disabled -->
    <noscript><link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-noscript.css"></noscript>
    <noscript><link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/9.5.7/css/jquery.fileupload-ui-noscript.css"></noscript>
    
    <%-- <link href="${base}/static/libs/iCheck-master/demo/css/custom.css?v=1.0.2" rel="stylesheet"> --%>
    <link href="${base}/static/libs/iCheck-master/skins/all.css?v=1.0.2" rel="stylesheet">
    <link href="${base}/static/libs/date-time/css/datepicker.css" rel="stylesheet">
    <style type="text/css">
    </style>
</c:set>


<c:set target="${self.js}" property="main">
  <script type="text/javascript">
  </script>

  <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
  <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
  <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
  <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.min.js"></script>
  <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
  <script type="text/javascript" src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script> 
  <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
  <script type="text/javascript" src="${base}/static/themes/default/js/buyer/account/view-application.js"></script>
  <script type="text/javascript">
    window.onload = function() {
    	$('#btnGoToHome').on('click', function () {
        	$('#modal_success').modal('hide');
        	location.href= app.base + '/';
        });
        $('#btnCloseWindow').on('click', function () {
            $('#modal_success').modal('hide');
            window.close();
        });
        $('#btnFailedClose').on('click', function () {
            $('#modal_failed').modal('hide');
        });
    	
    }
  </script>
</c:set>

<c:set target="${self.content}" property="main">

              <!--  <div class="form-title">Apply as Seller</div> -->
              <div class="form-content">
                <div class="tab-header clearfix">
                  <div class="tab-header-title">
                    <i></i> 
                    <span><fmt:message key='buyer.apply.panel.applyhead'/></span>
                  </div>
                  <ul class="nav nav-tabs pull-right" id="form-tab-header">
                    <li class="active"><a href="#tab-personal-info" data-toggle="tab"><fmt:message key='buyer.apply.tab.personal'/></a></li>
                    <li><a href="#tab-further-details" data-toggle="tab"><fmt:message key='buyer.apply.tab.further'/></a></li>
                    <li><a href="#tab-documents" data-toggle="tab"><fmt:message key='buyer.apply.tab.documents'/></a></li>
                    <li><a href="#tab-terms-conditions" data-toggle="tab"><fmt:message key='buyer.apply.tab.terms'/></a></li>
                  </ul>
                </div>
                
			   <div class="tab-content">
                 <div class="tab-pane active" id="tab-personal-info">
				   <form class="form-horizontal" id="form-personal-info"  method="post" enctype="multipart/form-data">
  				     <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4><fmt:message key='buyer.apply.tab.personal'/></h4>
                        </div>
                        <div class="col-sm-6"></div>
                    </div>
				    
				    <div class="form-group">
                      <label for="Title" class="col-sm-4 control-label"><fmt:message key='buyer.register.form.field.title'/>: *</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" id="title" name="title" value="${buyerApply.title}" readonly=true />
                      </div>
                    </div>
                      
					
					<div class="form-group">
				      <label for="firstName" class="col-sm-4 control-label"><fmt:message key='buyer.register.form.field.firstName'/>: *</label>
				      <div class="col-sm-6">
					    <input type="text" class="form-control" id="firstName" name="firstName"  value="${buyerApply.firstName}" readonly=true>
					  </div>
					</div>
				
					<div class="form-group">
			          <label for="lastName" class="col-sm-4 control-label"><fmt:message key='buyer.register.form.field.lastName'/>: *</label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="lastName" name="lastName"   value="${buyerApply.lastName}" readonly=true>
					  </div>
					</div>						  
						  
					<div class="form-group">
				      <label for="email" class="col-sm-4 control-label"><fmt:message key='buyer.register.form.field.email'/>: *</label>
				      <div class="col-sm-6">
					    <input type="email" class="form-control" id="email" name="email"   value="${buyerApply.email}" readonly = true>
					  </div>
					</div>
					  
					<div class="form-group">
					  <label for="investAs" class="col-sm-4 control-label"><fmt:message key='buyer.register.form.field.investAs'/>: *</label>
					  <div class="col-sm-6">
				        <input type="text" class="form-control" id="investAs"  name="investAs"   value="${buyerApply.investAs}"  readonly = true >
					  </div>
					</div>
					  
					<div class="form-group">
			          <label for="gender" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.gender'/>: *</label>
				      <div class="col-sm-6">
				        <select id="gender" name="gender" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.gender.required'/>" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${genderList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.gender}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
					    </select>
			          </div>
					</div>
					  
			        <div class="form-group">
					  <label for="dateOfBirth" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.dob'/>: *</label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="dateOfBirth" name="dateOfBirth"   data-rule-required="true"   readonly = true  value="<fmt:formatDate value='${buyerApply.dob}' pattern='yyyy-MM-dd'/>" data-msg-required="Please enter DOB">
					  </div>
			        </div>
				  
					<div class="form-group">
				      <label for="nationality" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.nationality'/>: *</label>
					  <div class="col-sm-6">
					    <select id="nationality" name="nationality" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.nationality.required'/>" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${countryList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.nationality}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
					    </select>
					  </div>
					</div>
				 		 
					<div class="form-group">
					  <label for="residenceCountry" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.residenceCountry'/>: *</label>
					  <div class="col-sm-6">
					     <select id="residenceCountry" name="residenceCountry" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.residenceCountry.required'/>" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${countryList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.residenceCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
					    </select>
					  </div>
					</div>
						  
					<div class="form-group">
					  <label for="idType" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.idType'/>: *</label>
					  <div class="col-sm-6">
					     <select id="idType" name="idType" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.idType.required'/>" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${idTypeList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.idType}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
					    </select>
					  </div>
					</div>					 
					 
					<div class="form-group">
				      <label for="idNumber" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.idNumber'/>: *</label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="idNumber" name="idNumber"   data-rule-required="true"   readonly = true  value="${buyerApply.idNumber}" data-msg-required="<fmt:message key='buyer.apply.form.field.idNumber.required'/>">
					  </div>
					</div>
					 
				    <div class="form-group">
			          <label for="phone" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.workPhone'/>: </label>
				      <div class="col-sm-6">
				        <input type="text"  style="width:20%" id="workCountryCode" name="workCountryCode"  value="${buyerApply.workCountryCode}" >
				        <input type="tel"   style="width:79%" id="phone" name="phone" data-rule-required="true"   readonly = true  value="${buyerApply.phone}">
				      </div>
				    </div>			
				
					<div class="form-group">
			          <label for="mobilePhone" class="col-sm-4 control-label"><fmt:message key='buyer.register.form.field.mobilePhone'/>: *</label>
					  <div class="col-sm-6">
	                    <input type="text"  style="width:20%"  id="mobileCountryCode" name="mobileCountryCode" value="${buyerApply.mobileCountryCode}" readonly>
					    <input type="tel"   style="width:79%"  id="mobilePhone" name="mobilePhone"  data-rule-required="true"   readonly = true  value="${buyerApply.mobilePhone}">
					  </div>
					</div>  				  
				   </form>
				  </div>
				   
				  <div class="tab-pane" id="tab-further-details">
				   <form class="form-horizontal" id="form-further-details"  method="post" enctype="multipart/form-data">
				     <c:if test="${user.investAs == 'Private investor' }"> 
  				     <div class="form-group">
                        <div class="col-sm-4 control-label">
                          <h4><fmt:message key='buyer.apply.form.tab.further.investAsPrivate'/></h4>
                        </div>
                        <div class="col-sm-6"></div>
                     </div>
					 
					<div class="form-group">
				      <label for="residenceAddress" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.residenceAddress'/>: *</label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="residenceAddress" name="residenceAddress"   data-rule-required="true"   readonly = true  value="${buyerApply.residenceAddress}" data-msg-required="<fmt:message key='buyer.apply.form.field.residenceAddress.required'/>">
					  </div>
					</div>  				  
							  
					<div class="form-group">
			          <label for="district" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.district'/>: *</label>
			          <div class="col-sm-6">
				        <input type="text" class="form-control" id="district" name="district"  data-rule-required="true"   readonly = true  value="${buyerApply.district}" data-msg-required="<fmt:message key='buyer.apply.form.field.district.required'/>">
			          </div>
					</div>
				    
				    <div class="form-group">
				      <label for="city" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.city'/>: *</label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="city" name="city"    data-rule-required="true"   readonly = true  value="${buyerApply.city}" data-msg-required="<fmt:message key='buyer.apply.form.field.required'/>">
					  </div>
					</div>
					
					<div class="form-group">
				      <label for="region" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.region'/>: </label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="region" name="region"    data-rule-required="true"   readonly = true  value="${buyerApply.region}">
					  </div>
					</div>
				  
					<div class="form-group">
					  <label for="country" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.country'/>: *</label>
					  <div class="col-sm-6">
					    <select id="country" name="country" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.country.required'/>" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${countryList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.country}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
					    </select>
					  </div>
					</div>
					  
				  
					<div class="form-group">
				      <label for="employer" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.employer'/>: *</label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="employer"  name="employer"   data-rule-required="true"   readonly = true  value="${buyerApply.employer}" data-msg-required="<fmt:message key='buyer.apply.form.field.employer.required'/>">
				      </div>
					</div>
					  					  	  
				    <div class="form-group">
				      <label for="employerName" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.employerName'/>: </label>
				      <div class="col-sm-6">
				        <input type="text" class="form-control" id="employerName" name="employerName"   data-rule-required="true"   readonly = true  value="${buyerApply.employerName}" data-msg-required="<fmt:message key='buyer.apply.form.field.employerName.placeholder'/>">
				      </div>
				    </div>					  
				   
				   
				   	<div class="form-group">
					  <label for="priIndustry" class="col-sm-4 control-label"><fmt:message
							key='buyer.apply.form.field.comIndustry' />: *</label>
					  <div class="col-sm-6">
						<select id="priIndustry" name="priIndustry" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.comIndustry.required'/>" disabled>
							<option value="">Please select...</option>
							<c:forEach var="item" items="${comIndustryList}" varStatus="status">
							  <option value="${item.code}"
								<c:if test="${item.code==buyerApply.priIndustry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
							</c:forEach>
						</select>
					  </div>
					</div>
				   
				   
				   			
				   <div class="form-group">
				     <label for="haveEverTradingOther" class="col-sm-4 control-label"><fmt:message
							key='buyer.apply.form.field.haveEverTradingOther' />: *</label>
					 <div class="col-sm-6">
						<select id="haveEverTradingOther" name="haveEverTradingOther"
							data-rule-required="true"
							data-msg-required="<fmt:message key='buyer.apply.form.field.haveEverTradingOther.required'/>" disabled>
							<option value="">Please select...</option>
							<c:forEach var="item" items="${haveTradingOtherList}" varStatus="status">
								<option value="${item.code}" 
								<c:if test="${item.code==buyerApply.haveEverTradingOther}"> selected</c:if>> ${item[self.i18n.catalog_name]}</option>
							</c:forEach>
						</select>
					  </div>
				    </div>
				    
				   <div class="form-group"  id="whatIsAssetDiv" <c:if test="${buyerApply.haveEverTradingOther=='Yes'}"> style="display:block;"</c:if>
				         <c:if test="${buyerApply.haveEverTradingOther=='No'}"> style="display:none;"</c:if> />
				     <label for="whatIsAsset" class="col-sm-4 control-label"><fmt:message
							key='buyer.apply.form.field.whatIsAsset' />: *</label>
					 <div class="col-sm-6">
						<select id="whatIsAsset" name="whatIsAsset"
							data-rule-required="true"
							data-msg-required="<fmt:message key='buyer.apply.form.field.whatIsAsset.required'/>" disabled>
							<option value="">Please select...</option>
							<c:forEach var="item" items="${whatIsAssetList}" varStatus="status">
								<option value="${item.code}"
								<c:if test="${item.code==buyerApply.whatIsAsset}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
							</c:forEach>
						</select>
					  </div>
				    </div>
				    
				     <c:forEach var="question" items="${questions}" varStatus="status">
				     <c:set var="idx" value="${status.index}"/>
                       <div class="form-group">
                         <label for="" class="col-sm-4 control-label">${question[self.i18n.question_qtext]} *</label>
                         <div class="col-sm-6">
                           <input type="text" class="form-control" value="${buyerApply.questions[idx][self.i18n.question_atext]}" disabled>
                         </div>
                       </div>
                       
                     </c:forEach>
                     
                   <c:if test="${user.fromChannels == 'Introduced from VPBank staff' }">  
                      <div class="form-group">
			            <label for="whichBusFrom" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.whichBusFrom'/>: *</label>
			            <div class="col-sm-6">
			              <select id="whichBusFrom" name="whichBusFrom" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.whichBusFrom.required'/>" disabled>
		                    <option value="">Please select...</option>
		                    <c:forEach var="item" items="${businessFromList}" varStatus="status"> 
	                        <option value="${item.code}"
					        <c:if test="${item.code==buyerApply.whichBusFrom}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
						    </c:forEach>
			             </select>
			           </div>
                     </div>
					 </c:if>
			      </c:if>
			          
			      <c:if test="${user.investAs == 'Company/Institution' }"> 
                   <div class="form-group">
                       <div class="col-sm-4 control-label">
                         <h4><fmt:message key='buyer.apply.form.tab.further.invertAsCompany'/></h4>
                       </div>
                       <div class="col-sm-6"></div>
                    </div>	
					 
				   <div class="form-group">
				     <label for="companyName" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.companyName'/>: *</label>
					 <div class="col-sm-6">
					   <input type="text" class="form-control" id="companyName" name="companyName"    data-rule-required="true"   readonly = true  value="${buyerApply.companyName}" data-msg-required="<fmt:message key='buyer.apply.form.field.companyName.required'/>">
					 </div>
				   </div>  
				   
				   <div class="form-group">
				    <label for="isComVietnam" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.isComVietnam'/>: *</label>
				    <div class="col-sm-6">
				      <select id="isComVietnam" name="isComVietnam" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.isComVietnam.required'/>" disabled>
                        <option value="">Please select...</option>
                        <c:forEach var="item" items = "${isComVietnamList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.isComVietnam}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                        </c:forEach>
				      </select>
				    </div>
				  </div>
					  
				  <div class="form-group" <c:if test="${buyerApply.isComVietnam=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.isComVietnam=='Yes'}"> style="display:none;"</c:if> /> 
				    <label for="comRegisteredCountry" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comRegisteredCountry'/>: *</label>
				    <div class="col-sm-6">
				      <select id="comRegisteredCountry" name="comRegisteredCountry" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.comRegisteredCountry.required'/>" disabled>
                        <option value="">Please select...</option>
                        <c:forEach var="item" items = "${countryList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.comRegisteredCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                        </c:forEach>
				      </select>
				    </div>
				  </div>
				  
				  <div class="form-group">
				    <label for="comRegistrationNumber" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comRegistrationNumber'/>: *</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="comRegistrationNumber" name="comRegistrationNumber"    data-rule-required="true"   readonly = true  value="${buyerApply.comRegistrationNumber}" data-msg-required="<fmt:message key='buyer.apply.form.field.comRegistrationNumber.required'/>">
				    </div>
				  </div>
					  
				  <div class="form-group">
				    <label for="comTaxCode" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comTaxCode'/>: *</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="comTaxCode" name="comTaxCode"   data-rule-required="true"   readonly = true  value="${buyerApply.comTaxCode}" data-msg-required="<fmt:message key='buyer.apply.form.field.comTaxCode.required'/>">
				    </div>
				  </div>
				  
				  <div class="form-group">
				    <label for="comEstablishmentDate" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comEstablishmentDate'/>: *</label>
				    <div class="col-sm-6">
				     <input type="text" class="form-control" id="comEstablishmentDate" name="comEstablishmentDate"   data-rule-required="true"   readonly = true  value="${buyerApply.comEstablishmentDate}" data-msg-required="<fmt:message key='buyer.apply.form.field.comEstablishmentDate.required'/>">
				    </div>
				  </div>
				  
				  <div class="form-group">
				    <label for="comDurationInVt" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comDurationInVt'/>: *</label>
				    <div class="col-sm-6">
				       <select id="comDurationInVt" name="comDurationInVt" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.comDurationInVt.required'/>" disabled>
                        <option value="">Please select...</option>
				        <c:forEach var="item" items = "${comDurationList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.comDurationInVt}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                        </c:forEach>
				      </select>
				    </div>
				  </div>
					  
						  
				  
				  <div class="form-group">
				    <label for="comAddress" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comAddress'/>: *</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="comAddress" name="comAddress"  data-rule-required="true"   readonly = true  value="${buyerApply.comAddress}" data-msg-required="<fmt:message key='buyer.apply.form.field.comAddress.required'/>">
				    </div>
				  </div>
				  
				  <div class="form-group">
				    <label for="comDistrict" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comDistrict'/>: *</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="comDistrict" name="comDistrict"   data-rule-required="true"   readonly = true  value="${buyerApply.comDistrict}" data-msg-required="<fmt:message key='buyer.apply.form.field.comDistrict.required'/>">
				    </div>
				  </div>
				  
					  
			      <div class="form-group">
			        <label for="comCity" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comCity'/>: *</label>
					<div class="col-sm-6">
					  <input type="text" class="form-control" id="comCity" name="comCity"   data-rule-required="true"   readonly = true  value="${buyerApply.comCity}" data-msg-required="<fmt:message key='buyer.apply.form.field.comCity.required'/>">
					</div>
				  </div>
				  
				  <div class="form-group">
					<label for="comRegion" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comRegion'/>: </label>
					<div class="col-sm-6">
					  <input type="text" class="form-control" id="comRegion" name="comRegion" data-rule-required="true" readonly = true  value="${buyerApply.comRegion}">
					</div>
				  </div>
					  
				  <div class="form-group">
				    <label for="comCountry" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comCountry'/>: *</label>
				    <div class="col-sm-6">
				     <select id="comCountry" name="comCountry" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.comCountry.required'/>" disabled>
                        <option value="">Please select...</option>
                        <c:forEach var="item" items = "${countryList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.comCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                        </c:forEach>
					  </select>
				    </div>
				  </div>
				  
				  <div class="form-group">
				    <label for="comPostcode" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comPostcode'/>: </label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="comPostcode" name="comPostcode"    data-rule-required="true"   readonly = true  value="${buyerApply.comPostcode}" data-msg-required="<fmt:message key='buyer.apply.form.field.comPostcode.required'/>">
				    </div>
				  </div>
				  
			      <div class="form-group">
                    <label class="col-sm-4 control-label" for="isComAddress2"><fmt:message key='buyer.apply.form.field.isComAddress2'/>:</label>
                    <div class="col-sm-6">
                      <input type="checkbox" class="form-control ifactor-checkbox" id="isComAddress2" name="isComAddress2"<c:if test="${not empty buyerApply.address2}"> checked</c:if> disabled />
                      <input type="hidden" id="address2" name="address2" value="${buyerApply.address2}" />
                    </div>
                  </div>
			
                  <div id="addressDiv" class="form-group" <c:if test="${empty buyerApply.address2}"> style="display:none;"</c:if> /> 
				    <label for="address" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.address'/>: *</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="address" name="address"   data-rule-required="false"   readonly = true data-rule-email="true"   value="${buyerApply.address}" data-msg-required="<fmt:message key='buyer.apply.form.field.address.required'/>">
				    </div>
				  </div>
				   
				  <div  id="districtDiv" class="form-group"  <c:if test="${empty buyerApply.address2}"> style="display:none;"</c:if> /> 
				    <label for="district2" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.district2'/>: *</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="district2" name="district2"    data-rule-required="false" readonly = true  value="${buyerApply.district2}" data-msg-required="<fmt:message key='buyer.apply.form.field.district2.required'/>">
				    </div>
				  </div>
				  				  
			      <div  id="cityDiv" class="form-group"  <c:if test="${empty buyerApply.address2}"> style="display:none;"</c:if> /> 
				    <label for="city2" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.city2'/>: *</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="city2" name="city2" data-rule-required="false" value="${buyerApply.city2}"  readonly = true data-msg-required="<fmt:message key='buyer.apply.form.field.city2.required'/>">
				    </div>
				  </div>
					  					  	  
				  <div  id="regionDiv" class="form-group"  <c:if test="${empty buyerApply.address2}"> style="display:none;"</c:if> /> 
				    <label for="region2" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.region2'/>: </label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="region2" name="region2"   readonly = true value="${buyerApply.region2}" >
				    </div>
				  </div>
				  
				  <div  id="countryDiv" class="form-group"  <c:if test="${empty buyerApply.address2}"> style="display:none;"</c:if> /> 
				    <label for="country2" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.country2'/>: *</label>
				    <div class="col-sm-6">
				      <select id="country2" name="country2" data-rule-required="false" data-msg-required="<fmt:message key='buyer.apply.form.field.country2.required'/>" disabled>
                        <option value="">Please select...</option>
                        <c:forEach var="item" items = "${countryList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.country2}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                        </c:forEach>
				      </select>
				    </div>
				  </div>
				  
			      <div  id="postcodeDiv" class="form-group"  <c:if test="${empty buyerApply.address2}"> style="display:none;"</c:if> /> 
				    <label for="postcode" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.postcode'/>: </label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control" id="postcode" name="postcode"   readonly = true data-rule-required="false"   value="${buyerApply.postcode}" data-msg-required="<fmt:message key='buyer.apply.form.field.postcode.required'/>">
				    </div>
				  </div>
					  
		  
				  <div class="form-group">
				    <label for="comType" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comType'/>: *</label>
				    <div class="col-sm-6">
				     <select id="comType" name="comType" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.comType.required'/>" disabled>
                        <option value="">Please select...</option>
				        <c:forEach var="item" items = "${comTypeList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.comType}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                        </c:forEach>
                      </select>
				    </div>
				  </div>
				  
				  <div class="form-group">
				    <label for="comIndustry" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.comIndustry'/>: *</label>
				    <div class="col-sm-6">
				     <select id="comIndustry" name="comIndustry" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.comIndustry.required'/>" disabled>
                        <option value="">Please select...</option>
				        <c:forEach var="item" items = "${comIndustryList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.comIndustry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                        </c:forEach>
				      </select>
				    </div>
				  </div>
				  		
				  <c:forEach var="question" items="${questions2}" varStatus="status">
                    <c:set var="idx" value="${status.index+fn:length(questions)}"/>
		            <div class="form-group">
		              <label for="" class="col-sm-4 control-label">${question[self.i18n.question_qtext]} *</label>
		                <div class="col-sm-6">
		                  <input type="text" class="form-control" value="${buyerApply.questions[idx][self.i18n.question_atext]}" disabled>
		                </div>
		            </div>
                  </c:forEach>
                  
			      
			        <c:if test="${user.fromChannels == 'Introduced from VPBank staff' }">  
                      <div class="form-group">
			            <label for="comWhichBusFrom" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.whichBusFrom'/>: *</label>
			            <div class="col-sm-6">
			              <select id="comWhichBusFrom" name="comWhichBusFrom" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.whichBusFrom.required'/>" disabled>
		                    <option value="">Please select...</option>
		                    <c:forEach var="item" items="${businessFromList}" varStatus="status"> 
	                        <option value="${item.code}"
					        <c:if test="${item.code==buyerApply.comWhichBusFrom}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
						    </c:forEach>
			             </select>
			           </div>
                     </div>
					 </c:if>
          
		          <div class="form-group">
		            <label for="position" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.position'/>: *</label>
		            <div class="col-sm-6">
		              <select id="position" name="position" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.position.required'/>" disabled>
                        <option value="">Please select...</option>
	                    <c:forEach var="item" items = "${positionList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.position}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                      </c:forEach>
	                </select>
		            </div>
		          </div>
						  
				
				  <div class="form-group">
				    <label for="areAuthorizedPerson" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.areAuthorizedPerson'/>: *</label>
				    <div class="col-sm-6">
				     <select id="areAuthorizedPerson" name="areAuthorizedPerson" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.areAuthorizedPerson.required'/>"  disabled>
                      <option value="">Please select...</option>
				      <option value="Yes"<c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> selected</c:if>>Yes</option>
				      <option value="No"<c:if test="${buyerApply.areAuthorizedPerson=='No'}"> selected</c:if>>No</option>
			        </select>
			        <div style="font-size:9px;font-weight:bold;font-style:oblique;">
                      <fmt:message key='buyer.apply.form.field.ifNoSpecifyPersonalInfo.tipmsg'/>
                    </div>
				    </div>
				  </div>
				  
				  
				  <div  id="authzTitleDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
		            <label for="title" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzTitle'/>: *</label>
			        <div class="col-sm-6">
			          <select id="authzTitle" name="authzTitle" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.authzTitle.required'/>" disabled>
                        <option value="">Please select...</option>
                        <c:forEach var="item" items = "${titleList}" varStatus = "status">
                        <option value="${item.code}"<c:if test="${item.code==buyerApply.authzTitle}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                        </c:forEach>
				      </select>
			        </div>
		           </div>
				      
			       <div  id="authzFirstNameDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
				      <label for="authzFirstName" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzFirstName'/>: *</label>
				      <div class="col-sm-6">
					    <input type="text" class="form-control" id="authzFirstName" name="authzFirstName"  data-rule-required="true"    readonly = true  value="${buyerApply.authzFirstName}"  data-msg-required="<fmt:message key='buyer.apply.form.field.authzFirstName.required'/>">
					  </div>
					</div>
		
					
				    <div  id="authzLastNameDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
			          <label for="authzLastName" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzLastName'/>: *</label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="authzLastName" name="authzLastName"  data-rule-required="true"   readonly = true  value="${buyerApply.authzLastName}" data-msg-required="<fmt:message key='buyer.apply.form.field.authzLastName.required'/>">
					  </div>
					</div>						  
						  
				    <div  id="authzEmailDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
				      <label for="email" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzEmail'/>: *</label>
				      <div class="col-sm-6">
					    <input type="email" class="form-control" id="authzEmail" name="authzEmail" data-rule-required="true"    readonly = true  value="${buyerApply.authzEmail}" data-rule-email="true"  data-msg-required="<fmt:message key='buyer.apply.form.field.authzEmail.required'/>">
					  </div>
					</div>
					  
				    <div  id="authzPositonDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
					  <label for="authzPositon" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzPositon'/>: *</label>
					  <div class="col-sm-6">
				        <input type="text" class="form-control" id="authzPositon" name="authzPositon"   data-rule-required="true"   readonly = true  value="${buyerApply.authzPositon}" data-msg-required="<fmt:message key='buyer.apply.form.field.authzPositon.required'/>">
					  </div>
					</div>
					  
				    <div  id="authzGenderDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
			          <label for="authzGender" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzGender'/>: *</label>
				      <div class="col-sm-6">
				        <select id="authzGender" name="authzGender" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.authzGender.required'/>" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${genderList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.authzGender}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
					    </select>
			          </div>
					</div>
					  
			       <div  id="authzDobDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
					  <label for="authzDob" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzDob'/>: *</label>
					  <div class="col-sm-6">
					    <div class="input-group">
                          <input type="text" class="form-control" id="authzDob" name="authzDob"   onchange="validtorAuthzDob()"   readonly = true  value="<fmt:formatDate value='${buyerApply.authzDob}' pattern='yyyy-MM-dd'/>" autocomplete="off" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.authzDob.required'/>" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzDob.pattern'/>" readonly/>
				          <span class="input-group-addon">
				            <i class="icon-calendar"></i>
				          </span>
			            </div>
					  </div>
			        </div>
				  
				    <div  id="authzNationalityDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
				      <label for="authzNationality" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzNationality'/>: *</label>
					  <div class="col-sm-6">
					    <select id="authzNationality" name="authzNationality" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.authzNationality.required'/>" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${countryList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.authzNationality}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
				        </select>
					  </div>
					</div>
				 		 
					<div  id="authzResidenceCountryDiv" class="form-group"  <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> />  
					  <label for="authzResidenceCountry" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzResidenceCountry'/>: *</label>
					  <div class="col-sm-6">
					    <select id="authzResidenceCountry" name="authzResidenceCountry" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.authzResidenceCountry.required'/>" disabled> 
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${countryList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.authzResidenceCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
				        </select>
					  </div>
					</div>
						  
			        <div  id="authzIdTypeDiv" class="form-group" <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
				      <label for="authzIdType" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzIdType'/>: *</label>
					  <div class="col-sm-6">
					    <select id="authzIdType" name="authzIdType" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.authzIdType.required'/>" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items = "${idTypeList}" varStatus = "status">
                          <option value="${item.code}"<c:if test="${item.code==buyerApply.authzIdType}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
					    </select>
					  </div>
					</div>					 
					 
			        <div  id="authzIdNumberDiv" class="form-group"  <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
				      <label for="authzIdNumber" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzIdNumber'/>: *</label>
					  <div class="col-sm-6">
					    <input type="text" class="form-control" id="authzIdNumber" name="authzIdNumber"   data-rule-required="true"   readonly = true  value="${buyerApply.authzIdNumber}" data-msg-required="<fmt:message key='buyer.apply.form.field.authzIdNumber.required'/>">
					  </div>
					</div>
					 
				    <div  id="authzPhoneDiv" class="form-group"  <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
		              <label for="authzPhone" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzPhone'/>: </label>
		              <div class="col-sm-6">
		                <input type="text"  style="width:20%" id="auPhCountryCode" name="auPhCountryCode" value="${buyerApply.auPhCountryCode}" readonly = true >
		                <input type="text"  style="width:79%" id="authzPhone" name="authzPhone"  placeholder="authzPhone"    readonly = true  data-rule-required="false"    value="${buyerApply.authzPhone}"   data-rule-number="true"   data-rule-pattern="^((0)|(84))[0-9]{9,13}$"  data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzPhone.pattern'/>">
		                <div style="font-size:9px;font-weight:bold;font-style:oblique;">
                          <fmt:message key='buyer.apply.form.field.authzPhone.tipmsg'/>
                        </div>
		              </div>
		            </div>      
        
		           	<div  id="authzMobilePhoneDiv" class="form-group"  <c:if test="${buyerApply.areAuthorizedPerson=='No'}"> style="display:block;"</c:if><c:if test="${buyerApply.areAuthorizedPerson=='Yes'}"> style="display:none;"</c:if> /> 
		              <label for="authzMobilePhone" class="col-sm-4 control-label"><fmt:message key='buyer.apply.form.field.authzMobilePhone'/>: *</label>
		              <div class="col-sm-6">
		                <input type="text"  style="width:20%"  id="auMoCountryCode" name="auMoCountryCode" value="${buyerApply.auMoCountryCode}" readonly = true >
		                <input type="text"  style="width:79%"  id="authzMobilePhone" name="authzMobilePhone"  placeholder="authorizedMobilePhone"   readonly = true  data-rule-required="true" value="${buyerApply.authzMobilePhone}"    data-msg-required="<fmt:message key='buyer.apply.form.field.authzMobilePhone.required'/>"  data-rule-number="true"   data-rule-pattern="^((0)|(84))[0-9]{9,13}$"  data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzMobilePhone.pattern'/>">
		              </div>
		            </div>
				 
					</c:if>
			    </form>	 
			  </div>
			  
			  
		      <div class="tab-pane" id="tab-documents">
		       <c:if test="${user.investAs == 'Private investor' }"> 
                <form  class="form-horizontal" id="form-applicatntfile-info" method="POST" enctype="multipart/form-data"> 
                   <div class="form-group">	                
	                 <label class="col-sm-7 control-label" for="taxCodeFile">
	                   <fmt:message key='buyer.apply.form.field.applicatntFile'/>: *
	                 </label>
                    <div class="col-sm-3">
                      <div id="file-link-applicatntFile">  
                        ${self.doc1Link}
                      </div>
                    </div>
                  </div>
                </form>
               </c:if>
               	  
			   <c:if test="${user.investAs == 'Company/Institution' }"> 
                <form  class="form-horizontal" method="POST" id="form-authorizedfile-info" enctype="multipart/form-data">
                  <div class="form-group">
                    <label class="col-sm-7 control-label" for="fsFileLastYear">
                      <fmt:message key='buyer.apply.form.field.authorizedFile'/>
                    </label>
                    <div class="col-sm-3"> 
                      <!-- 已经上传的文�?-->
                      <div id="file-link-authorizedFile">  
                        ${self.doc2Link}
                      </div>
                    </div>
                  </div>
                </form>
			     
			     
			     
		        <form class="form-horizontal" method="POST"   id="form-signedfile-info"  enctype="multipart/form-data">
                  <div class="form-group">
                    <label class="col-sm-7 control-label" for="fsFileLastYear">
                      <fmt:message key='buyer.apply.form.field.signedLetterFile'/>
                    </label>
                    <div class="col-sm-3"> 
                      <!-- 已经上传的文�?-->
                      <div id="file-link-signedLetterFile">  
                        ${self.doc3Link}
                      </div>
                    </div>
                  </div>
                </form>
                
                <form class="form-horizontal"  id="form-taxcodefile-info" method="POST" enctype="multipart/form-data">
                  <div class="form-group">
                    <label class="col-sm-7 control-label" for="fsFileLastYear">
                      <fmt:message key='buyer.apply.form.field.taxCodeFile'/>
                    </label>
                    <div class="col-sm-3"> 
                      <!-- 已经上传的文�?-->
                      <div id="file-link-taxCodeFile">
                        ${self.doc4Link}
                      </div>
                    </div>
                  </div>
                </form>
                    
                <form  class="form-horizontal" method="POST" id="form-cmplicensefile-info" enctype="multipart/form-data">
                  <div class="form-group">
                    <label class="col-sm-7 control-label" for="fsFileLastYear">
                      <fmt:message key='buyer.apply.form.field.companyLicenseFile'/>
                    </label>
                    <div class="col-sm-3"> 
                      <!-- 已经上传的文�?-->
                      <div id="file-link-companyLicenseFile">
                        ${self.doc5Link}
                      </div>
                    </div>
                  </div>
                </form>
                </c:if>


				<form style="display:none;" id="form-file-hidden">
				  <input type="hidden" name="documents[0].id" id="applicatntFileId" value="${self.doc1}">
				  <input type="hidden" name="documents[0].dispOrder" value="1">

				  <input type="hidden" name="documents[1].id" id="authorizedFileId" value="${self.doc2}">
				  <input type="hidden" name="documents[1].dispOrder" value="2">
				
				  <input type="hidden" name="documents[2].id" id="signedLetterFileId" value="${self.doc3}">
				  <input type="hidden" name="documents[2].dispOrder" value="3">
				  
				  <input type="hidden" name="documents[3].id" id="companyLicenseFileId" value="${self.doc4}">
				  <input type="hidden" name="documents[3].dispOrder" value="4">
				  
				  <input type="hidden" name="documents[4].id" id="taxCodeFileId" value="${self.doc5}">
				  <input type="hidden" name="documents[4].dispOrder" value="5">
                </form>
			     
              </div>
                  
              <div class="tab-pane" id="tab-terms-conditions">
                 <form class="form-horizontal" id="form-terms-conditions" method="POST" enctype="multipart/form-data">
                   <div style="width:99%; margin:0 auto;">
                     <div style="height:220px; max-height: 220px; overflow: auto;padding:10px 0px; background: white;">
                       <fmt:message key='buyer.apply.form.terms.content'/>
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
          <button type="button" class="btn btn-primary" id="btnGoToHome" data-dismiss="modal">Go to home page</button>
          <button type="button" class="btn btn-primary" id="btnCloseWindow" data-dismiss="modal">Close Window</button>
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
        <div class="modal-body" id="modal-failed-body">
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
