<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="genderList" expression="@catalogService.findGender().children" />
<spring:eval var="titleList" expression="@catalogService.findTitle().children" />
<c:set target="${self}" property="title">My Profile</c:set>
<c:set target="${self.css}" property="main">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript">
    $(function () {
        $("#form-content select").select2({
            containerCssClass: 'form-select-container',
            dropdownCssClass: 'form-select-dropdown',   
        })
    });
   </script>
</c:set>
<c:set target="${self.content}" property="main">
<div class="tab-header clearfix">
                <div class="tab-header clearfix">
                  <div class="tab-header-title">
                    <i></i> 
                    <span><fmt:message key="seller.profile.viewPage.title"/></span>
                  </div>
                </div>
			   
			    <div id="form-content">
			      <form class="form-horizontal">
		            <div class="form-group">
                      <label class="col-sm-4 control-label" for="title"><fmt:message key="seller.register.form.field.title"/>: </label>
                      <div class="col-sm-6">
                        <%-- <input type="text" class="form-control" id="title" readonly="true" value="${loginUser.title }"/> --%>
                        <select  id="title" name="title" disabled>
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
		                <input type="text" class="form-control" id="first_name" readonly="true" value="${loginUser.firstName }"/>
		              </div>
		            </div>
		
		            <div class="form-group">
		              <label class="col-sm-4 control-label" for="last_name"><fmt:message key="seller.register.form.field.lastName"/></label>
		              <div class="col-sm-6">
		                <input type="text" class="form-control" id="last_name" readonly="true" value="${loginUser.lastName}" />
		              </div>
		            </div>
		
		            <div class="form-group">
		              <label class="col-sm-4 control-label" for="function"><fmt:message key="seller.apply.form.field.gender"/></label>
		              <div class="col-sm-6">
		                <%-- <input type="text" class="form-control" id="gender" readonly="true" value="${loginUser.gender}" /> --%>
		                <select  id="gender" name="gender" disabled>
                          <option value="">Please select...</option>
                          <c:forEach var="item" items="${genderList}" varStatus="status"> 
                          <option value="${item.code}"<c:if test="${loginUser.gender==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
                          </c:forEach>
                        </select>
		              </div>
		            </div>
		            
		            <div class="form-group">
		              <label class="col-sm-4 control-label" for="function"><fmt:message key="seller.apply.form.field.dob"/></label>
		              <div class="col-sm-6">
		                <input type="text" class="form-control" id="function" readonly="true" value="<fmt:formatDate value='${loginUser.dob }' pattern='yyyy-MM-dd'/>" />
		              </div>
		            </div>
		
		            <div class="form-group">
		              <label class="col-sm-4 control-label" for="work_phone"><fmt:message key="seller.register.form.field.workPhone"/></label>
		              <div class="col-sm-6">
		                <input type="text" class="form-control" id="work_phone" readonly="true" value="${loginUser.workPhone}" />
		              </div>
		            </div>
		
		            <div class="form-group">
		              <label class="col-sm-4 control-label" for="mobile_phone"><fmt:message key="seller.register.form.field.mobilePhone"/></label>
		              <div class="col-sm-6">
		                <input type="text" class="form-control" id="mobile_phone" readonly="true" value="${loginUser.mobilePhone }" />
		              </div>
		            </div>
		
		            <div class="form-group">
		              <label class="col-sm-4 control-label" for="email"><fmt:message key="seller.register.form.field.email"/></label>
		              <div class="col-sm-6">
		                <input type="text" class="form-control" id="email" readonly="true" value="${loginUser.email }" />
		              </div>
		            </div>
			      </form>
			    </div>               
</c:set>
<c:set target="${self.content}" property="free">
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
