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
    
    function onSubmit() {    	
    	var newpwd = document.getElementById("newpwd").value;
        var confirmpwd = document.getElementById("confirmpwd").value;
  	    if(newpwd!=confirmpwd){
		   alert("您输入的新密码与确认密码不一致");
		   return false;
	    }
  	  
    }
    
   </script>
</c:set>
<c:set target="${self.content}" property="main">
                <div id="form-title">Change Password</div>
			    <div id="form-main">
			      <form class="form-horizontal" id="myForm" name="myForm" method="post" action="${base}/buyer/password/update" onsubmit="return onSubmit()">
			        <input type="hidden" class="input-sm" id="id"   name="id" value="${user.id }" />
			        <fieldset>
			          <legend><fmt:message key='buyer.resetPassword.page.title'/></legend>
				        <div class="control-group">
				          <label class="control-label" for="amountInvset"><fmt:message key='buyer.password.form.oldpwd'/></label>
				            <div class="controls">
				              <input type="password" class="input-sm" id="oldpwd"  name="oldpwd"  data-rule-required="true"  data-msg-required="<fmt:message key='buyer.password.form.oldpwd.required'/>" />
				            </div>
				        </div>
				        <div class="control-group">
				          <label class="control-label" for="yearsInvest"><fmt:message key='buyer.password.form.newpwd'/></label>
				          <div class="controls">
				            <input type="password" class="input-sm"  id="newpwd"   name="newpwd"  data-rule-required="true" data-msg-required="<fmt:message key='buyer.password.form.newpwd'/>" data-rule-pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!$#%@\-_.]{8,}$" data-msg-pattern="<fmt:message key='buyer.password.form.newpwd.pattern'/>">
				          </div>
				        </div>
				
			            <div class="control-group">
			              <label class="control-label" for="yearsInvest"><fmt:message key='buyer.password.form.confirmpwd'/></label>
			              <div class="controls">
			                <input type="password" class="input-sm" id="confirmpwd" name="confirmpwd" data-rule-required="true"  data-msg-required="<fmt:message key='buyer.password.form.confirmpwd.required'/>" data-rule-equalTo="#newpwd" data-msg-equalTo="<fmt:message key='buyer.password.form.confirmpwd.equalTo'/>">
			              </div>
			            </div>
			
			            <div class="control-group">
			              <div class="controls">
			                 &nbsp;
			              </div>
			            </div>
			            
			            <div class="control-group">
			              <div class="controls">
			                <button class="btn btn-primary" type="submit" id="changePwdSubmit" ><fmt:message key='buyer.restPassword.button.submit'/></button>
			              </div>
			            </div>
			          </fieldset>
			        </form>
			      </div>
    </c:set>
  <c:set target="${self.content}" property="free">
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
