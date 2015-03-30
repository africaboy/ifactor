<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="genderList" expression="@catalogService.findGender().children" />
<spring:eval var="titleList" expression="@catalogService.findTitle().children" />
<c:set target="${self}" property="title">Update Profile</c:set>
<c:set target="${self.css}" property="main">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script> 
    <script type="text/javascript">
    $(function () {
      //$('.selectpicker').selectpicker();
    	$(".form-content .form-group select").select2({
            containerCssClass: 'form-select-container',
            dropdownCssClass: 'form-select-dropdown',
        });
        
        $(".form-content .form-group select").on("change select2-blur", function(e) {
    		var target = $(e.target);
    		//alert(target.attr('id') + ' '  +e.val);
    		target.focusout();  // 失焦触发验证
    	});
        
        $('#dob').datepicker({
    		format: 'yyyy-mm-dd',
    		weekStart: 1,
    		autoclose: true,
    		showOtherMonths: true,
    		selectOtherMonths: false
    	}).css({
    		'background-color': '#fff',
    		'background-image': 'none',
    		'border': '1px solid #ccc'
    	}); 
    });
   </script>
</c:set>
<c:set target="${self.content}" property="main">
                <div class="tab-header clearfix">
                  <div class="tab-header-title">
                    <i></i> 
                    <span><fmt:message key='seller.profile.updatePage.title'/></span>
                  </div>
                </div>
                
                <div id="form-content" class="form-content">
		            <form class="form-horizontal" action="${baser}/seller/profile/update" method="post">
		              <input type="hidden" class="form-control" id="id"   name="id" value="${loginUser.id }" />
			            <div class="form-group">
                          <label class="col-sm-4 control-label" for="title" ><fmt:message key="seller.register.form.field.title"/> </label>
                          <div class="col-sm-6">
                            <select id="title" name="title" data-rule-required="true" data-msg-required="<fmt:message key='seller.register.form.field.title.required'/>">
                              <option value="">Please select...</option>
                              <c:forEach var="item" items="${titleList}" varStatus="status"> 
                              <option value="${item.code}"<c:if test="${loginUser.title==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                              </c:forEach>
                            </select>
                          </div>
	                    </div>
			            <div class="form-group">
			              <label class="col-sm-4 control-label" for="first_name"><fmt:message key="seller.register.form.field.firstName"/></label>
			              <div class="col-sm-6">
			                <input type="text" class="form-control" id="firstName" name="firstName" value="${loginUser.firstName }" data-rule-required="true" data-msg-required="<fmt:message key='seller.register.form.field.firstName.required'/>"/>
			              </div>
			            </div>
			
			            <div class="form-group">
			              <label class="col-sm-4 control-label" for="last_name"><fmt:message key="seller.register.form.field.lastName"/></label>
			              <div class="col-sm-6">
			                <input type="text" class="form-control" id="lastName"  name="lastName" value="${loginUser.lastName}" data-rule-required="true" data-msg-required="<fmt:message key='seller.register.form.field.lastName.required'/>" />
			              </div>
			            </div>
			
			            <div class="form-group">
			              <label class="col-sm-4 control-label" for="function"><fmt:message key='seller.apply.form.field.gender'/></label>
			              <div class="col-sm-6">
			                <select id="gender" name="gender" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.gender.required'/>">
                              <option value="">Please select...</option>
                              <c:forEach var="item" items="${genderList}" varStatus="status"> 
                              <option value="${item.code}"<c:if test="${loginUser.gender==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                              </c:forEach>
					        </select>
			              </div>
			            </div>
			            
			            <div class="form-group">
			              <label class="col-sm-4 control-label" for="function"><fmt:message key='seller.apply.form.field.dob'/></label>
			              <div class="col-sm-6">
			                <%-- <input type="text" class="form-control" id="dob" name="dob"  value="${loginUser.dob }" /> --%>
			                <div class="input-group">
			                  <input type="text" class="form-control" id="dob" name="dob" value="<fmt:formatDate value='${loginUser.dob }' pattern='yyyy-MM-dd'/>" placeholder="dateOfBirth" autocomplete="off" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.dob.required'/>" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="<fmt:message key='buyer.apply.form.field.dob.pattern'/>" readonly/>
			                  <span class="input-group-addon">
			                    <i class="icon-calendar"></i>
			                  </span>
			                </div>
			              </div>
			            </div>
			
			            <div class="form-group">
			              <label class="col-sm-4 control-label" for="work_phone"><fmt:message key="seller.register.form.field.workPhone"/></label>
			              <div class="col-sm-6">
			                <input type="text" class="form-control" id="workPhone"  name="workPhone" value="${loginUser.workPhone}" data-rule-required="false"  data-rule-number="true" data-rule-pattern="^((0)|(84))[0-9]{4,13}$"  data-msg-pattern="<fmt:message key='seller.apply.form.field.workPhone.pattern'/>" />
			              </div>
			            </div>
			
			            <div class="form-group">
			              <label class="col-sm-4 control-label" for="mobile_phone"><fmt:message key='seller.register.form.field.mobilePhone'/></label>
			              <div class="col-sm-6">
			                <input type="text" class="form-control" id="mobilePhone" name="mobilePhone"  value="${loginUser.mobilePhone }" data-rule-required="true"  data-msg-required="<fmt:message key='seller.register.form.field.mobilePhone.required'/>" data-rule-number="true"   data-rule-pattern="^((0)|(84))[0-9]{4,13}$"  data-msg-pattern="<fmt:message key='seller.register.form.field.mobilePhone.required'/>" />
			              </div>
			            </div>
			
			            <div class="form-group">
			              <label class="col-sm-4 control-label" for="email"><fmt:message key="seller.register.form.field.email"/></label>
			              <div class="col-sm-6">
			                <input type="text" class="form-control" id="email"  name="email" value="${loginUser.email }" data-rule-required="true" data-rule-email="true" data-msg-required="<fmt:message key='seller.register.form.field.email.required'/>"/>
			              </div>
			            </div>
			            
                        <div style="text-align: center; margin-top:5px;">
                          <button class="btn" type="submit"><fmt:message key='seller.profile.updateButton.submit'/></button>
                        </div>
                        
	                  </form>
                    </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
