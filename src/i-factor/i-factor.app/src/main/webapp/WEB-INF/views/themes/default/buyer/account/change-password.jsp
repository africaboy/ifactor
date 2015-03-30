<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
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

  <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
  <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
  <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
  <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.min.js"></script>
  <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>
  <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
  <script type="text/javascript" src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script> 
  <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
    
  <script type="text/javascript">
    $(function (){
	  $('#myForm').validate();
    });
   </script>
</c:set>
<c:set target="${self.content}" property="main">
                 <div class="tab-header clearfix">
                  <div class="tab-header-title">
                    <i></i> 
                    <span><fmt:message key='buyer.password.page.title'/></span>
                  </div>
                </div>
               
			    <div id="form-content">
			      <form class="form-horizontal" id="myForm" name="myForm" method="post" action="${base}/buyer/password/update" onsubmit="return onSubmit()">
		            <input type="hidden" class="input-sm" id="id"   name="id" value="${user.id }" />
			        <div class="form-group">
			          <label class="col-sm-5 control-label" for="oldpwd"><fmt:message key='buyer.password.form.oldpwd'/>: * </label>
			          <div class="col-sm-3">
			            <input type="password" class="form-control" id="oldpwd" name="oldpwd" data-rule-required="true" data-msg-required="<fmt:message key='buyer.password.form.oldpwd.required'/>" />
			          </div>
			        </div>
			        
			        <div class="form-group">
			          <label class="col-sm-5 control-label" for="newpwd"><fmt:message key='buyer.password.form.newpwd'/>: *</label>
			          <div class="col-sm-3">
			            <input type="password" class="form-control" id="newpwd" name="newpwd" data-rule-required="true" data-msg-required="<fmt:message key='buyer.password.form.newpwd'/>" data-rule-pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!$#%@\-_.]{8,}$" data-msg-pattern="<fmt:message key='buyer.password.form.newpwd.pattern'/>">
			          </div>
			        </div>
			
		            <div class="form-group">
		              <label class="col-sm-5 control-label" for="confirmpwd"><fmt:message key='buyer.password.form.confirmpwd'/>: *</label>
		              <div class="col-sm-3">
		                <input type="password" class="form-control" id="confirmpwd" name="confirmpwd" data-rule-required="true"  data-msg-required="<fmt:message key='buyer.password.form.confirmpwd.required'/>" data-rule-equalTo="#newpwd" data-msg-equalTo="<fmt:message key='buyer.password.form.confirmpwd.equalTo'/>">
		              </div>
		            </div>
		
		            <div class="form-group">
		              <div class="col-sm-6">
		                 &nbsp;
		              </div>
		            </div>
		            
		            <div style="text-align: center; margin-top:5px;">
                      <button class="btn" type="submit"><fmt:message key='buyer.password.button.submit'/></button>
                    </div>	
                    
			      </form>
			    </div>
    </c:set>
  <c:set target="${self.content}" property="free">
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
