<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="idTypeList"
	expression="@catalogService.findIdType().children" />
<spring:eval var="comDurationList"
	expression="@catalogService.findComDurationInVt().children" />
<spring:eval var="comTypeList"
	expression="@catalogService.findComType().children" />
<spring:eval var="comIndustryList"
	expression="@catalogService.findComIndustry().children" />
<spring:eval var="businessFromList"
	expression="@catalogService.findBusinessFrom().children" />
<spring:eval var="positionList"
	expression="@catalogService.findPosition().children" />
<spring:eval var="titleList"
	expression="@catalogService.findTitle().children" />
<spring:eval var="genderList"
	expression="@catalogService.findGender().children" />
<spring:eval var="countryList"
	expression="@catalogService.findCountry().children" />
<spring:eval var="isComVietnamList"
	expression="@catalogService.findIsComVietnam().children" />
<spring:eval var="haveTradingOtherList"  
    expression="@catalogService.findHaveTradingOther().children" />
<spring:eval var="whatIsAssetList" 
    expression="@catalogService.findWhatIsAsset().children" />

<c:set target="${self}" property="docBiztypePrefix"><%=com.entrofine.ifactor.app.service.BuyerApplyDocService.BIZTYPE_PREFIX%></c:set>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
	<link rel="stylesheet"
		href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload.css">
	<link rel="stylesheet"
		href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload-ui.css">
	<link href="${base}/static/libs/date-time/css/datepicker.css"
		rel="stylesheet">
	<style type="text/css">
</style>
</c:set>


<c:set target="${self.js}" property="main">
	<script type="text/javascript"
		src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
	<script type="text/javascript"
		src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
	<script type="text/javascript"
		src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
	<script type="text/javascript"
		src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-process.js"></script>
	<script type="text/javascript"
		src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-validate.js"></script>
	<script type="text/javascript"
		src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.js"></script>
	<script type="text/javascript"
		src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>
	<script type="text/javascript"
		src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
	<script type="text/javascript"
		src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script>
	<script type="text/javascript"
		src="${base}/static/themes/default/js/common.js"></script>

	<script type="text/javascript" 
		src="${base}/static/themes/default/js/jquery.validate.custom.js"></script>
	<script type="text/javascript">
		var app = {
			base : '${base}',
			version : '${version.app}',
			loginName : '${loginUser.loginName}',
			selfUrl : '${self.url}',
			errorMsg : {
				question0 : "<fmt:message key='buyer.apply.form.field.question0.required'/>",
				question1 : "<fmt:message key='buyer.apply.form.field.question1.required'/>",
				question2 : "<fmt:message key='buyer.apply.form.field.question2.required'/>",
				question3 : "<fmt:message key='buyer.apply.form.field.question3.required'/>",
				question4 : "<fmt:message key='buyer.apply.form.field.question4.required'/>",
				question5 : "<fmt:message key='buyer.apply.form.field.question5.required'/>",
				question6 : "<fmt:message key='buyer.apply.form.field.question6.required'/>",
				question7 : "<fmt:message key='buyer.apply.form.field.question7.required'/>",
				question8 : "<fmt:message key='buyer.apply.form.field.question8.required'/>",
				question9 : "<fmt:message key='buyer.apply.form.field.question9.required'/>",
				question10 : "<fmt:message key='buyer.apply.form.field.question10.required'/>",
				question11 : "<fmt:message key='buyer.apply.form.field.question11.required'/>",
				question12 : "<fmt:message key='buyer.apply.form.field.question12.required'/>",
				question13 : "<fmt:message key='buyer.apply.form.field.question13.required'/>",
				question14 : "<fmt:message key='buyer.apply.form.field.question14.required'/>",
				question15 : "<fmt:message key='buyer.apply.form.field.question15.required'/>",
				mailAddress : "<fmt:message key='buyer.apply.form.field.address.required'/>",
				comDistrict2 : "<fmt:message key='buyer.apply.form.field.comDistrict2.required'/>",
				comRegion2 : "<fmt:message key='buyer.apply.form.field.comRegion2.required'/>",
				comCity2 : "<fmt:message key='buyer.apply.form.field.comCity2.required'/>",
				comCountry2 : "<fmt:message key='buyer.apply.form.field.comCountry2.required'/>",
				comPostcode2 : "<fmt:message key='buyer.apply.form.field.comPostcode2.required'/>"
			},

			successSavedMsg : "<fmt:message key='buyer.apply.message.successSaved'/>",
			successUpdatedMsg : "<fmt:message key='buyer.apply.message.successUpdated'/>",
			successSubmittedMsg : "<fmt:message key='buyer.apply.message.successSubmitted'/>",
			successRedirectMsg : "<fmt:message key='buyer.apply.message.successRedirectMsg'/>"
		};
	</script>
	<script type="text/javascript"
		src="${base}/static/themes/default/js/buyer/account/apply-as-buyer.js"></script>
</c:set>

<c:set target="${self.content}" property="main">
	<!--  <div class="form-title">Apply as Seller</div> -->
	<div class="form-content">
		<div class="tab-header clearfix">
			<div class="tab-header-title">
				<i></i> <span><fmt:message key='buyer.apply.panel.applyhead' /></span>
			</div>
			<ul class="nav nav-tabs pull-right" id="form-tab-header">
				<li class="active"><a href="#tab-personal-info"
					data-toggle="tab"><fmt:message key='buyer.apply.tab.personal' /></a></li>
				<li><a href="#tab-further-details" data-toggle="tab"><fmt:message
							key='buyer.apply.tab.further' /></a></li>
				<li><a href="#tab-documents" data-toggle="tab"><fmt:message
							key='buyer.apply.tab.documents' /></a></li>
				<li><a href="#tab-terms-conditions" data-toggle="tab"><fmt:message
							key='buyer.apply.tab.terms' /></a></li>
			</ul>
		</div>

		<div class="tab-content">
			<div class="tab-pane active" id="tab-personal-info">
				<form class="form-horizontal" id="form-personal-info" method="post"
					enctype="multipart/form-data">
					<div class="form-group">
						<div class="col-sm-4 control-label">
							<h4>
								<fmt:message key='buyer.apply.tab.personal' />
							</h4>
						</div>
						<div class="col-sm-6"></div>
					</div>

					<div class="form-group">
						<label for="Title" class="col-sm-4 control-label"><fmt:message
								key='buyer.register.form.field.title' />: *</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="title" name="title"
								value="${user.title}" readonly />
						</div>
					</div>

					<div class="form-group">
						<label for="firstName" class="col-sm-4 control-label"><fmt:message
								key='buyer.register.form.field.firstName' />: *</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="firstName"
								name="firstName" value="${user.firstName}" readonly>
						</div>
					</div>

					<div class="form-group">
						<label for="lastName" class="col-sm-4 control-label"><fmt:message
								key='buyer.register.form.field.lastName' />: *</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="lastName"
								name="lastName" value="${user.lastName}" readonly>
						</div>
					</div>

					<div class="form-group">
						<label for="email" class="col-sm-4 control-label"><fmt:message
								key='buyer.register.form.field.email' />: *</label>
						<div class="col-sm-6">
							<input type="email" class="form-control" id="email" name="email"
								value="${user.email}" readonly>
						</div>
					</div>

					<div class="form-group">
						<label for="investAs" class="col-sm-4 control-label"><fmt:message
								key='buyer.register.form.field.investAs' />: *</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="investAs"
								name="investAs" value="${user.investAs}" readonly>
						</div>
					</div>

					<div class="form-group">
						<label for="gender" class="col-sm-4 control-label"><fmt:message
								key='buyer.apply.form.field.gender' />: *</label>
						<div class="col-sm-6">
							<select id="gender" name="gender" data-rule-required="true"
								data-msg-required="<fmt:message key='buyer.apply.form.field.gender.required'/>">
								<option value="">Please select...</option>
								<c:forEach var="item" items="${genderList}" varStatus="status">
									<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
								</c:forEach>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label for="dob" class="col-sm-4 control-label"><fmt:message
								key='buyer.apply.form.field.dob' />: *</label>
						<div class="col-sm-6">
							<div style="width: 100%;">
								<div class="input-group">
									<input type="text" class="form-control" id="dob" name="dob"
										placeholder="dateOfBirth" autocomplete="off"
										data-rule-required="true"
										data-msg-required="<fmt:message key='buyer.apply.form.field.dob.required'/>"
										data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$"
										data-msg-pattern="<fmt:message key='buyer.apply.form.field.dob.pattern'/>"
										data-rule-isBeforeToday="true"  
										data-msg-isBeforeToday="<fmt:message key='buyer.apply.form.field.dob.isBeforeToday'/>"
								        data-rule-isAdult="true"  
										data-msg-isAdult="<fmt:message key='buyer.apply.form.field.dob.isAdult'/>"
										readonly /> <span class="input-group-addon"> <i
										class="icon-calendar"></i>
									</span>
								</div>
								<div id="error-dob"></div>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="nationality" class="col-sm-4 control-label"><fmt:message
								key='buyer.apply.form.field.nationality' />: *</label>
						<div class="col-sm-6">
							<select id="nationality" name="nationality"
								data-rule-required="true"
								data-msg-required="<fmt:message key='buyer.apply.form.field.nationality.required'/>">
								<option value="">Please select...</option>
								<c:forEach var="item" items="${countryList}" varStatus="status">
									<%-- <option value="${item.code}">${item.name}</option> --%>
									<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
								</c:forEach>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label for="residenceCountry" class="col-sm-4 control-label"><fmt:message
								key='buyer.apply.form.field.residenceCountry' />: *</label>
						<div class="col-sm-6">
							<select id="residenceCountry" name="residenceCountry"
								data-rule-required="true"
								data-msg-required="<fmt:message key='buyer.apply.form.field.residenceCountry.required'/>">
								<option value="">Please select...</option>
								<c:forEach var="item" items="${countryList}" varStatus="status">
									<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
								</c:forEach>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label for="idType" class="col-sm-4 control-label"><fmt:message
								key='buyer.apply.form.field.idType' />: *</label>
						<div class="col-sm-6">
							<select id="idType" name="idType" data-rule-required="true"
								data-msg-required="<fmt:message key='buyer.apply.form.field.idType.required'/>">
								<option value="">Please select...</option>
								<c:forEach var="item" items="${idTypeList}" varStatus="status">
									<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
								</c:forEach>
							</select>
						</div>
					</div>

					<div class="form-group">
						<label for="idNumber" class="col-sm-4 control-label"><fmt:message
								key='buyer.apply.form.field.idNumber' />: *</label>
						<div class="col-sm-6">
							<input type="text" class="form-control" id="idNumber"
								name="idNumber" placeholder="idNumber" data-rule-required="true"
								data-msg-required="<fmt:message key='buyer.apply.form.field.idNumber.required'/>"
								data-rule-pattern="^[0-9a-zA-Z]{7,12}$"
								data-msg-pattern="<fmt:message key='buyer.apply.form.field.idNumber.pattern'/>">
						</div>
					</div>

					<div class="form-group">
					
						<label for="phone" class="col-sm-4 control-label"><fmt:message	key='buyer.apply.form.field.workPhone' />: </label>
						<div class="col-sm-6">
							<input type="text" style="width: 20%" id="workCountryCode"
								name="workCountryCode" value="${user.workCountryCode}"   data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='buyer.apply.form.field.workCountryCode.pattern'/>"
								<c:if test="${not empty user.workPhone}"> readonly</c:if> />  <input
								type="tel" style="width: 79%" id="phone" name="phone"
								value="${user.workPhone}" data-rule-required="false"
								data-rule-number="true"
								data-rule-pattern="^[0-9]{5,15}$"
								data-msg-pattern="<fmt:message key='buyer.apply.form.field.workPhone.pattern'/>"
								<c:if test="${not empty user.workPhone}"> readonly</c:if> />
						     <div id="error-workCountryCode"></div>
							<div
								style="font-size: 9px; font-weight: bold; font-style: oblique;">
								<fmt:message key='buyer.apply.form.field.workPhone.tipmsg' />
							</div>
						</div>
					</div>

					<div class="form-group">
						<label for="mobilePhone" class="col-sm-4 control-label"><fmt:message
								key='buyer.register.form.field.mobilePhone' />: *</label>
						<div class="col-sm-6">
							<input type="text" style="width: 20%" id="mobileCountryCode"
								name="mobileCountryCode" value="${user.mobileCountryCode}" readonly>
							<input type="tel" style="width: 79%" id="mobilePhone"
								name="mobilePhone" value="${user.mobilePhone}" readonly>
					        <div id="error-mobileCountryCode"></div>
						</div>
					</div>
				</form>
			</div>


			<div class="tab-pane" id="tab-further-details">
				<form class="form-horizontal" id="form-further-details"
					method="post" enctype="multipart/form-data">

					<c:if test="${user.investAs == 'Private investor' }">
						<div class="form-group">
							<div class="col-sm-4 control-label">
								<h4>
									<fmt:message key='buyer.apply.form.tab.further.investAsPrivate' />
								</h4>
							</div>
							<div class="col-sm-6"></div>
						</div>

						<div class="form-group">
							<label for="residenceAddress" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.residenceAddress' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="residenceAddress"
									maxlength="255" name="residenceAddress"
									placeholder="<fmt:message key='buyer.apply.form.field.residenceAddress.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.residenceAddress.required'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="district" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.district' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="district"
									name="district" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.district.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.district.required'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="city" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.city' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="city" name="city"
									maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.city.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.city.required'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="region" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.region' />: </label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="region"
									name="region" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.region.placeholder'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="country" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.country' />: *</label>
							<div class="col-sm-6">
								<select id="country" name="country" data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.country.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${countryList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>


						<div class="form-group">
							<label for="employer" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.employer' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="employer"
									name="employer" maxlength="255" placeholder="employer"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.employer.required'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="employerName" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.employerName' />: </label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="employerName"
									maxlength="255" name="employerName"
									placeholder="<fmt:message key='buyer.apply.form.field.employerName.placeholder'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="priIndustry" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comIndustry' />: *</label>
							<div class="col-sm-6">
								<select id="priIndustry" name="priIndustry"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comIndustry.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${comIndustryList}"
										varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
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
                                     data-msg-required="<fmt:message key='buyer.apply.form.field.haveEverTradingOther.required'/>">
                                 <option value="">Please select...</option>
                                 <c:forEach var="item" items="${haveTradingOtherList}"
                                         varStatus="status">
                                         <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
                                 </c:forEach>
                             </select>
                            </div>
                       </div>
                                            
                       <div class="form-group" id="whatIsAssetDiv" style="display: none;">
                         <label for="whatIsAsset" class="col-sm-4 control-label"><fmt:message  key='buyer.apply.form.field.whatIsAsset' />: *</label>
                           <div class="col-sm-6">
                              <select id="whatIsAsset" name="whatIsAsset"
                                    data-rule-required="true"
                                    data-msg-required="<fmt:message key='buyer.apply.form.field.whatIsAsset.required'/>">
                                <option value="">Please select...</option>
                                <c:forEach var="item" items="${whatIsAssetList}"
                                        varStatus="status">
                                        <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
                                </c:forEach>
                              </select>
                            </div>
                        </div>

						<c:forEach var="question" items="${questions}" varStatus="status">
							<c:set var="idx" value="${status.index}" />
							<div class="form-group">
								<label for="" class="col-sm-4 control-label">${question[self.i18n.question_qtext]}
									*</label> <input type="hidden" name="questions[${idx}].qid"
									value="${question.id}" /> <input type="hidden"
									name="questions[${idx}].qname" value="${question.qname}" />
								<c:if test="${question.atype == 'text' }">
									<div class="col-sm-6">
										<input type="text" class="form-control"  
											name="questions[${idx}].atext" data-rule-required="true">
									</div>
								</c:if>
								<c:if test="${question.atype == 'select' }">
									<div class="col-sm-6">
										<select name="questions[${idx}].atext" class="questions1"  id="question${idx}">
											<option value="">Please select...</option>
											<c:forEach var="questionOption" items="${question.options}">
												<%-- <option value="${questionOption.atext}">${questionOption.atext}</option> --%>
												<option value="${questionOption[self.i18n.question_atext]}">${questionOption[self.i18n.question_atext]}</option>
											</c:forEach>
										</select>
									</div>
								</c:if>
							</div>
						</c:forEach>

						<c:if
							test="${user.fromChannels == 'Introduced from VPBank staff' }">
							<div class="form-group">
								<label for="whichBusFrom" class="col-sm-4 control-label"><fmt:message
										key='buyer.apply.form.field.whichBusFrom' />: *</label>
								<div class="col-sm-6">
									<select id="whichBusFrom" name="whichBusFrom"
										data-rule-required="true"
										data-msg-required="<fmt:message key='buyer.apply.form.field.whichBusFrom.required'/>">
										<option value="">Please select...</option>
										<c:forEach var="item" items="${businessFromList}"
											varStatus="status">
											<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
										</c:forEach>
									</select>
								</div>
							</div>
						</c:if>
					</c:if>

					<c:if test="${user.investAs == 'Company/Institution' }">
						<div class="form-group">
							<div class="col-sm-4 control-label">
								<h4>
									<fmt:message key='buyer.apply.form.tab.further.invertAsCompany' />
								</h4>
							</div>
							<div class="col-sm-6"></div>
						</div>

						<div class="form-group">
							<label for="companyName" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.companyName' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="companyName"
									name="companyName" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.companyName.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.companyName.required'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="isComVietnam" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.isComVietnam' />: *</label>
							<div class="col-sm-6">
								<select id="isComVietnam" name="isComVietnam"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.isComVietnam.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${isComVietnamList}"
										varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>


						<div class="form-group" id="comRegisteredCountryDiv" style="display: none;">
							<label for="comRegisteredCountry" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comRegisteredCountry' />: *</label>
							<div class="col-sm-6">
								<select id="comRegisteredCountry" name="comRegisteredCountry"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comRegisteredCountry.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${countryList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="comRegistrationNumber" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comRegistrationNumber' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control"
									id="comRegistrationNumber" name="comRegistrationNumber"
									placeholder="<fmt:message key='buyer.apply.form.field.comRegistrationNumber.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comRegistrationNumber.required'/>"
									data-rule-pattern="^[0-9a-zA-Z]{8,12}$"
									data-msg-pattern="<fmt:message key='buyer.apply.form.field.comRegistrationNumber.pattern'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="comTaxCode" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comTaxCode' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="comTaxCode"
									name="comTaxCode"
									placeholder="<fmt:message key='buyer.apply.form.field.comTaxCode.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comTaxCode.required'/>"
									data-rule-pattern="^[0-9a-zA-Z]{8,12}$"
									data-msg-pattern="<fmt:message key='buyer.apply.form.field.comTaxCode.pattern'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="companyEstablishmentDate"
								class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comEstablishmentDate' />: *</label>
							<div class="col-sm-6">
								<div style="width: 100%;">
									<div class="input-group">
										<input type="text" class="form-control"
											id="comEstablishmentDate" name="comEstablishmentDate"
											autocomplete="off" data-rule-required="true"
											data-msg-required="<fmt:message key='buyer.apply.form.field.comEstablishmentDate.required'/>"
											data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$"
											data-msg-pattern="<fmt:message key='buyer.apply.form.field.comEstablishmentDate.pattern'/>"
											data-rule-isBeforeToday="true"
											data-msg-isBeforeToday="<fmt:message key='buyer.apply.form.field.comEstablishmentDate.isBeforeToday'/>"
											readonly /> <span class="input-group-addon"> <i
											class="icon-calendar"></i>
										</span>
									</div>
									<div id="error-comEstablishmentDate"></div>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="comDurationInVt" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comDurationInVt' />: *</label>
							<div class="col-sm-6">
								<select id="comDurationInVt" name="comDurationInVt"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comDurationInVt.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${comDurationList}"
										varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>




						<div class="form-group">
							<label for="comAddress" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comAddress' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="comAddress"
									name="comAddress" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.comAddress.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comAddress.required'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="comDistrict" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comDistrict' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="comDistrict"
									name="comDistrict" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.comDistrict.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comDistrict.required'/>">
							</div>
						</div>


						<div class="form-group">
							<label for="comCity" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comCity' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="comCity"
									name="comCity" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.comCity.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comCity.required'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="comRegion" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comRegion' />: </label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="comRegion"
									name="comRegion" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.comRegion.placeholder'/>">
							</div>
						</div>

						<div class="form-group">
							<label for="comCountry" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comCountry' />: *</label>
							<div class="col-sm-6">
								<select id="comCountry" name="comCountry"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comCountry.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${countryList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="comPostcode" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comPostcode' />: </label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="comPostcode"
									name="comPostcode"
									placeholder="<fmt:message key='buyer.apply.form.field.comPostcode.placeholder'/>"
									data-rule-required="false"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comPostcode.required'/>"
									data-rule-pattern="^.{4,8}$"
									data-msg-pattern="<fmt:message key='buyer.apply.form.field.comPostcode.pattern'/>">
							</div>
						</div>

						<div class="form-group">
							<label class="col-sm-4 control-label" for="isComAddress2"><fmt:message
									key='buyer.apply.form.field.isComAddress2' />:</label>
							<div class="col-sm-6">
								<input type="checkbox" class="form-control ifactor-checkbox"
									id="isComAddress2" name="isComAddress2" /> <input
									type="hidden" id="address2" name="address2" />
							</div>
						</div>

						<div id="addressDiv" class="form-group" style="display: none;">
							<label for="address" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.address' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="address"
									name="address" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.address.placeholder'/>"
									data-rule-required="false"
									data-msg-required="<fmt:message key='buyer.apply.form.field.address.required'/>">
							</div>
						</div>

						<div id="districtDiv" class="form-group" style="display: none;">
							<label for="district2" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.district2' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="district2"
									name="district2" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.district2.placeholder'/>"
									data-rule-required="false"
									data-msg-required="<fmt:message key='buyer.apply.form.field.district2.required'/>">
							</div>
						</div>

						<div id="cityDiv" class="form-group" style="display: none;">
							<label for="city2" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.city2' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="city2" name="city2"
									maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.city2.placeholder'/>"
									data-rule-required="false"
									data-msg-required="<fmt:message key='buyer.apply.form.field.city2.required'/>">
							</div>
						</div>

						<div id="regionDiv" class="form-group" style="display: none;">
							<label for="region2" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.region2' />: </label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="region2"
									name="region2" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.region2.placeholder'/>">
							</div>
						</div>

						<div id="countryDiv" class="form-group" style="display: none;">
							<label for="country2" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.country2' />: *</label>
							<div class="col-sm-6">
								<select id="country2" name="country2" data-rule-required="false"
									data-msg-required="<fmt:message key='buyer.apply.form.field.country2.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${countryList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div id="postcodeDiv" class="form-group" style="display: none;">
							<label for="postcode" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.postcode' />: </label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="postcode"
									name="postcode"
									placeholder="<fmt:message key='buyer.apply.form.field.postcode.placeholder'/>"
									data-rule-required="false"
									data-msg-required="<fmt:message key='buyer.apply.form.field.postcode.required'/>"
									data-rule-pattern="^.{4,8}$"
									data-msg-pattern="<fmt:message key='buyer.apply.form.field.comPostcode.pattern'/>">
							</div>
						</div>



						<div class="form-group">
							<label for="comType" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comType' />: *</label>
							<div class="col-sm-6">
								<select id="comType" name="comType" data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comType.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${comTypeList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="comIndustry" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.comIndustry' />: *</label>
							<div class="col-sm-6">
								<select id="comIndustry" name="comIndustry"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.comIndustry.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${comIndustryList}"
										varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<c:forEach var="question" items="${questions2}" varStatus="status">
							<c:set var="idx" value="${status.index+fn:length(questions)}" />
							<div class="form-group">
								<label for="" class="col-sm-4 control-label">${question[self.i18n.question_qtext]}
									*</label> <input type="hidden" name="questions[${idx}].qid"
									value="${question.id}" /> <input type="hidden"
									name="questions[${idx}].qname" value="${question.qname}" />
								<c:if test="${question.atype == 'text' }">
									<div class="col-sm-6">
										<input type="text" class="form-control"
											name="questions[${idx}].atext" data-rule-required="true">
									</div>
								</c:if>
								<c:if test="${question.atype == 'select' }">
									<div class="col-sm-6">
										<select name="questions[${idx}].atext"  class="questions2" id="question${idx}">
											<option value="">Please select...</option>
											<c:forEach var="questionOption" items="${question.options}">
												<option value="${questionOption[self.i18n.question_atext]}">${questionOption[self.i18n.question_atext]}</option>
											</c:forEach>
										</select>
									</div>
								</c:if>
							</div>
						</c:forEach>


						<c:if test="${user.fromChannels == 'Introduced from VPBank staff' }">
							<div class="form-group">
								<label for="comWhichBusFrom" class="col-sm-4 control-label"><fmt:message
										key='buyer.apply.form.field.whichBusFrom' />: *</label>
								<div class="col-sm-6">
									<select id="comWhichBusFrom" name="comWhichBusFrom"
										data-rule-required="true"
										data-msg-required="<fmt:message key='buyer.apply.form.field.whichBusFrom.required'/>">
										<option value="">Please select...</option>
										<c:forEach var="item" items="${businessFromList}"
											varStatus="status">
											<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
										</c:forEach>
									</select>
								</div>
							</div>
						</c:if>

						<div class="form-group">
							<label for="position" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.position' />: *</label>
							<div class="col-sm-6">
								<select id="position" name="position" data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.position.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${positionList}"
										varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="areAuthorizedPerson" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.areAuthorizedPerson' />: *</label>
							<div class="col-sm-6">
								<select id="areAuthorizedPerson" name="areAuthorizedPerson"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.areAuthorizedPerson.required'/>">
									<option value="">Please select...</option>
									<option value="Yes" checked>Yes</option>
									<option value="No">No</option>
								</select>
								<div
									style="font-size: 9px; font-weight: bold; font-style: oblique;">
									<fmt:message
										key='buyer.apply.form.field.ifNoSpecifyPersonalInfo.tipmsg' />
								</div>
							</div>
						</div>


						<div id="authzTitleDiv" class="form-group" style="display: none;">
							<label for="title" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzTitle' />: *</label>
							<div class="col-sm-6">
								<select id="authzTitle" name="authzTitle"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzTitle.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${titleList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div id="authzFirstNameDiv" class="form-group"
							style="display: none;">
							<label for="authzFirstName" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzFirstName' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="authzFirstName"
									name="authzFirstName" maxlength="50"
									placeholder="<fmt:message key='buyer.apply.form.field.authzFirstName.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzFirstName.required'/>">
							</div>
						</div>


						<div id="authzLastNameDiv" class="form-group"
							style="display: none;">
							<label for="authzLastName" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzLastName' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="authzLastName"
									name="authzLastName" maxlength="50"
									placeholder="<fmt:message key='buyer.apply.form.field.authzLastName.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzLastName.required'/>">
							</div>
						</div>

						<div id="authzEmailDiv" class="form-group" style="display: none;">
							<label for="email" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzEmail' />: *</label>
							<div class="col-sm-6">
								<input type="email" class="form-control" id="authzEmail"
									name="authzEmail" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.authzEmail.placeholder'/>"
									data-rule-required="true" data-rule-email="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzEmail.required'/>">
							</div>
						</div>

						<div id="authzPositonDiv" class="form-group"
							style="display: none;">
							<label for="authzPositon" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzPositon' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="authzPositon"
									name="authzPositon" maxlength="255"
									placeholder="<fmt:message key='buyer.apply.form.field.authzPositon.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzPositon.required'/>">
							</div>
						</div>

						<div id="authzGenderDiv" class="form-group" style="display: none;">
							<label for="authzGender" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzGender' />: *</label>
							<div class="col-sm-6">
								<select id="authzGender" name="authzGender"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzGender.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${genderList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div id="authzDobDiv" class="form-group" style="display: none;">
							<label for="authzDob" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzDob' />: *</label>
							<div class="col-sm-6">
								<div style="width: 100%">
									<div class="input-group">
										<input type="text" class="form-control" id="authzDob"
											name="authzDob"
											placeholder="<fmt:message key='buyer.apply.form.field.authzDob.placeholder'/>"
											autocomplete="off" data-rule-required="true"
											data-msg-required="<fmt:message key='buyer.apply.form.field.authzDob.required'/>"
											data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$"
											data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzDob.pattern'/>"
											data-rule-isBeforeToday="true"
											data-msg-isBeforeToday="<fmt:message key='buyer.apply.form.field.authzDob.isBeforeToday'/>"
											data-rule-isAdult="true"  
										    data-msg-isAdult="<fmt:message key='buyer.apply.form.field.authzDob.isAdult'/>"
											readonly /> <span class="input-group-addon"> <i
											class="icon-calendar"></i>
										</span>
									</div>
									<div id="error-authzDob"></div>
								</div>
							</div>
						</div>

						<div id="authzNationalityDiv" class="form-group"
							style="display: none;">
							<label for="authzNationality" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzNationality' />: *</label>
							<div class="col-sm-6">
								<select id="authzNationality" name="authzNationality"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzNationality.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${countryList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div id="authzResidenceCountryDiv" class="form-group"
							style="display: none;">
							<label for="authzResidenceCountry" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzResidenceCountry' />: *</label>
							<div class="col-sm-6">
								<select id="authzResidenceCountry" name="authzResidenceCountry"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzResidenceCountry.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${countryList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div id="authzIdTypeDiv" class="form-group" style="display: none;">
							<label for="authzIdType" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzIdType' />: *</label>
							<div class="col-sm-6">
								<select id="authzIdType" name="authzIdType"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzIdType.required'/>">
									<option value="">Please select...</option>
									<c:forEach var="item" items="${idTypeList}" varStatus="status">
										<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									</c:forEach>
								</select>
							</div>
						</div>

						<div id="authzIdNumberDiv" class="form-group"
							style="display: none;">
							<label for="authzIdNumber" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzIdNumber' />: *</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="authzIdNumber"
									name="authzIdNumber"
									placeholder="<fmt:message key='buyer.apply.form.field.authzIdNumber.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzIdNumber.required'/>"
									data-rule-pattern="^[0-9a-zA-Z]{7,12}$"
									data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzIdNumber.pattern'/>">
							</div>
						</div>

						<div id="authzPhoneDiv" class="form-group" style="display: none;">
							<label for="authzPhone" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzPhone' />: </label>
							<div class="col-sm-6">
								<input type="text" style="width: 20%" id="auPhCountryCode"
									name="auPhCountryCode" value="+84"  data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='buyer.apply.form.field.auPhCountryCode.pattern'/>"> <input type="text"
									style="width: 79%" id="authzPhone" name="authzPhone"
									placeholder="<fmt:message key='buyer.apply.form.field.authzPhone.placeholder'/>"
									data-rule-required="false"
									data-rule-pattern="^[0-9]{5,15}$"
									data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzPhone.pattern'/>">
								<div id="error-auPhCountryCode"></div>
								<div
									style="font-size: 9px; font-weight: bold; font-style: oblique;">
									<fmt:message key='buyer.apply.form.field.authzPhone.tipmsg' />
								</div>
							</div>
						</div>

						<div id="authzMobilePhoneDiv" class="form-group"
							style="display: none;">
							<label for="authzMobilePhone" class="col-sm-4 control-label"><fmt:message
									key='buyer.apply.form.field.authzMobilePhone' />: *</label>
							<div class="col-sm-6">
								<input type="text" style="width: 20%" id="auMoCountryCode"
									name="auMoCountryCode" value="+84"  data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='buyer.apply.form.field.auMoCountryCode.pattern'/>"> <input type="text"
									style="width: 79%" id="authzMobilePhone"
									name="authzMobilePhone"
									placeholder="<fmt:message key='buyer.apply.form.field.authzMobilePhone.placeholder'/>"
									data-rule-required="true"
									data-msg-required="<fmt:message key='buyer.apply.form.field.authzMobilePhone.required'/>"
									data-rule-pattern="^[0-9]{5,15}$"
									data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzMobilePhone.pattern'/>">
									<div id="error-auMoCountryCode"></div>
							</div>
						</div>
					</c:if>
				</form>
			</div>

			<div class="tab-pane" id="tab-documents">
				<c:if test="${user.investAs == 'Private investor' }">
					<form class="form-horizontal" id="form-applicatntfile-info"
						method="POST" enctype="multipart/form-data">
						<div class="form-group">
							<label class="col-sm-7 control-label" for="applicatntFile"><fmt:message
									key='buyer.apply.form.field.applicatntFile' />: *</label>
							<div class="col-sm-3">
								<span class="btn btn-success fileinput-button"> <i
									class="icon-plus icon-white"></i> <span><fmt:message
											key='buyer.apply.form.button.addFile' /></span> <input type="file"
									id="applicatntFile" name="file" multiple> <input
									type="hidden" id="file-type-applicatntFile" name="fileType"
									value="${self.docBiztypePrefix}idcard_applicant" />
								</span>
								<!-- 进度�?-->
								<div id="progress-applicatntFile"
									class="progress progress-success progress-striped">
									<div class="bar" style="width: 100%; background: #f00;"></div>
								</div>
								<!-- 已经上传的文�?-->
								<div id="file-link-applicatntFile"></div>
								<div id="error-applicatntFileId"></div>
							</div>
						</div>
					</form>
				</c:if>

				<c:if test="${user.investAs == 'Company/Institution' }">
					<form class="form-horizontal" method="POST"
						id="form-authorizedfile-info" enctype="multipart/form-data">
						<div class="form-group">
							<label class="col-sm-7 control-label" for="fsFileLastYear">
								<fmt:message key='buyer.apply.form.field.authorizedFile' />: *
							</label>
							<div class="col-sm-3">
								<span class="btn btn-success fileinput-button"> <i
									class="icon-plus icon-white"></i> <span><fmt:message
											key='buyer.apply.form.button.addFile' /></span> <input type="file"
									id="authorizedFile" name="file" multiple> <input
									type="hidden" id="file-type-authorizedFile" name="fileType"
									value="${self.docBiztypePrefix}idcard_authorizedPerson" />
								</span>
								<!-- 进度�?-->
								<div id="progress-authorizedFile"
									class="progress progress-success progress-striped">
									<div class="bar"></div>
								</div>
								<!-- 已经上传的文�?-->
								<div id="file-link-authorizedFile"></div>
								<div id="error-authorizedFileId"></div>
							</div>
						</div>
					</form>

					<form class="form-horizontal" method="POST"
						id="form-signedfile-info" enctype="multipart/form-data">
						<div class="form-group">
							<label class="col-sm-7 control-label" for="signedLetterFile">
								<fmt:message key='buyer.apply.form.field.signedLetterFile' />: *
							</label>
							<div class="col-sm-3">
								<span class="btn btn-success fileinput-button"> <i
									class="icon-plus icon-white"></i> <span><fmt:message
											key='buyer.apply.form.button.addFile' /></span> <input type="file"
									id="signedLetterFile" name="file" multiple> <input
									type="hidden" id="file-type-signedLetterFile" name="fileType"
									value="${self.docBiztypePrefix}signed_signedLegal" />
								</span>
								<!-- 进度�?-->
								<div id="progress-signedLetterFile"
									class="progress progress-success progress-striped">
									<div class="bar"></div>
								</div>
								<!-- 已经上传的文�?-->
								<div id="file-link-signedLetterFile"></div>
								<div id="error-signedLetterFileId"></div>
							</div>
						</div>
					</form>

					<form class="form-horizontal" id="form-taxcodefile-info"
						method="POST" enctype="multipart/form-data">
						<div class="form-group">
							<label class="col-sm-7 control-label" for="taxCodeFile">
								<fmt:message key='buyer.apply.form.field.taxCodeFile' />: *
							</label>
							<div class="col-sm-3">
								<span class="btn btn-success fileinput-button"> <i
									class="icon-plus icon-white"></i> <span><fmt:message
											key='buyer.apply.form.button.addFile' /></span> <input type="file"
									id="taxCodeFile" name="file" multiple> <input
									type="hidden" id="file-type-taxCodeFile" name="fileType"
									value="${self.docBiztypePrefix}taxcode_companyTaxCode" />
								</span>
								<!-- 进度�?-->
								<div id="progress-taxCodeFile"
									class="progress progress-success progress-striped">
									<div class="bar"></div>
								</div>
								<!-- 已经上传的文�?-->
								<div id="file-link-taxCodeFile"></div>
								<div id="error-taxCodeFileId"></div>
							</div>
						</div>
					</form>

					<form class="form-horizontal" method="POST"
						id="form-cmplicensefile-info" enctype="multipart/form-data">
						<div class="form-group">
							<label class="col-sm-7 control-label" for="companyLicenseFile">
								<fmt:message key='buyer.apply.form.field.companyLicenseFile' />:
								*
							</label>
							<div class="col-sm-3">
								<span class="btn btn-success fileinput-button"> <i
									class="icon-plus icon-white"></i> <span><fmt:message
											key='buyer.apply.form.button.addFile' /></span> <input type="file"
									id="companyLicenseFile" name="file" multiple> <input
									type="hidden" id="file-type-companyLicenseFile" name="fileType"
									value="${self.docBiztypePrefix}license_companyLicense" />
								</span>
								<!-- 进度�?-->
								<div id="progress-companyLicenseFile"
									class="progress progress-success progress-striped">
									<div class="bar"></div>
								</div>
								<!-- 已经上传的文�?-->
								<div id="file-link-companyLicenseFile"></div>
								<div id="error-companyLicenseFileId"></div>
							</div>
						</div>
					</form>

				</c:if>

				<form style="display: none;" id="form-file-hidden">
					<c:if test="${user.investAs == 'Private investor' }">
						<input type="hidden" name="documents[0].id" id="applicatntFileId"
							data-rule-required="true"
							data-msg-required="<fmt:message key='buyer.apply.form.field.applicatntFileId.required'/>">
						<input type="hidden" name="documents[0].dispOrder" value="1">
					</c:if>

					<c:if test="${user.investAs == 'Company/Institution' }">
						<input type="hidden" name="documents[1].id" id="authorizedFileId"
							data-rule-required="true"
							data-msg-required="<fmt:message key='buyer.apply.form.field.authorizedFileId.required'/>">
						<input type="hidden" name="documents[1].dispOrder" value="2">

						<input type="hidden" name="documents[2].id"
							id="signedLetterFileId" data-rule-required="true"
							data-msg-required="<fmt:message key='buyer.apply.form.field.signedLetterFileId.required'/>">
						<input type="hidden" name="documents[2].dispOrder" value="3">

						<input type="hidden" name="documents[3].id"
							id="companyLicenseFileId" data-rule-required="true"
							data-msg-required="<fmt:message key='buyer.apply.form.field.companyLicenseFileId.required'/>">
						<input type="hidden" name="documents[3].dispOrder" value="4">

						<input type="hidden" name="documents[4].id" id="taxCodeFileId"
							data-rule-required="true"
							data-msg-required="<fmt:message key='buyer.apply.form.field.taxCodeFileId.required'/>">
						<input type="hidden" name="documents[4].dispOrder" value="5">

					</c:if>
				</form>
			</div>

			<div class="tab-pane" id="tab-terms-conditions">
				<form class="form-horizontal" id="form-terms-conditions"
					method="POST" enctype="multipart/form-data">
					<div style="width: 99%; margin: 0 auto;">
						<div
							style="height: 220px; max-height: 220px; overflow: auto; padding: 10px 0px; background: white;">
							<fmt:message key='buyer.apply.form.terms.content' />
						</div>
					</div>

					<div style="width: 99%; margin: 10px auto;">
						<div class="form-group">
							<div class="col-sm-10">
								<input type="checkbox" id="checkbox-accept"
									class="ifactor-checkbox" /> <label for="checkbox-accept"><fmt:message
										key='buyer.apply.form.terms.check.accept' /></label>
							</div>
						</div>
					</div>

				</form>
			</div>
		</div>

		<div style="text-align: center; margin-top: 5px;">
			<button class="btn" id="saveApplication" type="button">
				<fmt:message key='buyer.apply.form.button.save' />
			</button>
			<button class="btn" id="submitApplication" type="button" disabled>
				<fmt:message key='buyer.apply.form.button.submit' />
			</button>
		</div>
	</div>

</c:set>

<c:set target="${self.content}" property="free">
	<!-- Modal -->
	<div class="modal fade" id="modal_success" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<!--  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
					<h4 class="modal-title" id="H1"></h4>
				</div>
				<div class="modal-cup"></div>
				<div class="modal-hline"></div>
				<div class="modal-body">
					<div style="text-align: center; font-weight: bold;">
						<fmt:message key='buyer.apply.message.congratulation' />
					</div>
					<div style="text-align: center; font-size: 20px;"
						id="modal-success-body">
						<fmt:message key='${message}' />
					</div>
					<div style="text-align: center; font-size: 14px;"
						id="modal-timetips"></div>
				</div>
				<div class="modal-footer"></div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->

	<!-- Modal -->
	<div class="modal fade" id="modal_failed" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
					<h4 class="modal-title" id="H1"></h4>
				</div>
				<div class="modal-cup"></div>
				<div class="modal-hline"></div>
				<div class="modal-body">
					<div style="text-align: center; font-weight: bold;">
						<fmt:message key='buyer.apply.message.failed' />
					</div>
					<div style="text-align: center; font-size: 20px;"
						id="modal-failed-body">
						<fmt:message key='buyer.apply.message.failedMsg' />
					</div>
				</div>
				<div class="modal-footer"></div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
