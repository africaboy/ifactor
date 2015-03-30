<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="titleList" expression="@catalogService.findTitle().children" />
<spring:eval var="investAsList" expression="@catalogService.findInvestAs().children" />
<spring:eval var="fromChannelsList" expression="@catalogService.findFromChannels().children" />
<c:set target="${self}" property="title"><fmt:message key='buyer.register.page.title'/></c:set>
<!doctype html>
<!--[if lt IE 7]> <html class="ie6 oldie bg-black"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 oldie bg-black"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 oldie bg-black"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="">
<!--<![endif]-->
  <head>
    <meta charset="UTF-8">
    <title>${self.title}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css">
    <link rel="stylesheet" href="${base}/static/libs/select2-3.5.1/select2.css?ver=${version.app}">
    <link rel="stylesheet" href="${base}/static/libs/silviomoreto-bootstrap-select/bootstrap-select.min.css">
    <link rel="stylesheet" href="${base}/static/themes/default/css/registration.css?ver=${version.app}">
    <link rel="stylesheet" href="${base}/static/themes/default/css/topnav.css?ver=${version.app}">
    <link rel="stylesheet" href="${base}/static/themes/default/css/form.css?ver=${version.app}">
    <c:if test="${not empty self.css.main}">
    <!-- 页面css -->
    ${self.css.main}
    </c:if>
    <!--[if lt IE 9]>
    <script src="${base}/static/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="${base}/static/libs/respondjs/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body style="margin: 0; padding: 0;background:#515151">
    <div class="container" style="width:1200px;padding:0;margin-top:0;">
      <div class="logo-container" id="logo-container-div">
         <div class="logo1-container" id="logo1-container">
           <a style="text-decoration:none;" href="${base}/">
           <img src="${base}/static/themes/default/img/logo1.png" />
           </a>
         </div>
         <div class="logo2-container" id="logo2-container">
           <img src="${base}/static/themes/default/img/logo2.png" />
         </div>
         
         <div class="pull-right">
           <div style="margin: 20px;font-size:18px;"> 
             <span><fmt:message key="common.theme.title"/>: </span>
             <a href="#" id="defaultTheme" style="color:#11a2af"><fmt:message key="common.theme.default"/></a> | 
             <a href="#" id="blueTheme" style="color:#1150af"><fmt:message key="common.theme.blue"/></a>
           </div>>
         </div>
      </div>
      
      <div class="navbar navbar-default" id="navbar">
        <div class="navbar-container" id="navbar-container">
          <div class="navbar-header pull-left">
            <a href="#" class="navbar-brand">
            </a>
          </div>
          <div class="navbar-header pull-right">
            <select id="lang-select" style="width: 120px" class="populate select2-offscreen" tabindex="-1" title="Templating">
              <optgroup label="">
                <option value="EN"<c:if test="${self.locale=='en_US'}"> selected</c:if>><fmt:message key="common.lang.en"/></option>
                <option value="VN"<c:if test="${self.locale=='vi_VN'}"> selected</c:if>><fmt:message key="common.lang.vi"/></option>
              </optgroup>
            </select>
          </div>
          <div class="navbar-header pull-right">
             <div style="width:66px">&nbsp;</div>
          </div>
          
          <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ifactor-nav">
              <li class="open">
                <a href="${base}/home/help">
                  <i class="icon-homehelp"></i>
                  <span class=""><fmt:message key="common.topnav.help"/></span>
                </a>
              </li>
              
              <li>
                <a href="${base}/home/contact-us">
                  <i class="icon-homecontactus"></i>
                  <span class=""><fmt:message key="common.topnav.contactus"/></span>
                </a>
              </li>
              
              <li>
                <a href="${base}/login">
                  <i class="icon-logout"></i>
                  <span class=""><fmt:message key="common.topnav.login"/></span>
                </a>
              </li>
            </ul>
          </div>       
          
        </div>
      </div>
      
      <div class="registration-container" id="registration-container">
        <div class="form-div" id="reg-form-div">
          <form class="form-horizontal"  action="${base}/buyer/register" id="form-main-info"  method="post" role="form">     
  		   <div class="panel panel-default">
             <div class="panel-heading"><fmt:message key="buyer.register.panel.head"/></div>
             <div class="panel-body">
  		
  		       <div class="reg-form-column"> 			    
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.title"/>: *</label></div>
  		           <div class="reg-form-control">
                     <select id="title" name="title" data-rule-required="true" data-msg-required="<fmt:message key='buyer.register.form.field.title.required'/>">
                       <option value="">Please select...</option>
                       <c:forEach var="item" items="${titleList}" varStatus="status"> 
                       <%-- <option value="${item.code}">${item.name}</option> --%>
                       <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
                       </c:forEach>
                     </select>
  		           </div>
  		         </div>
  		    
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.firstName"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <input type="text" class="form-control" id="firstName" name="firstName"  maxlength="50" placeholder="<fmt:message key='buyer.register.form.field.firstName.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='buyer.register.form.field.firstName.required'/>">
  		           </div>
  		         </div>
  		      
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.lastName"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <input type="text" class="form-control" id="lastName" name="lastName"   maxlength="50" placeholder="<fmt:message key='buyer.register.form.field.lastName.placeholder'/>" data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.lastName.required'/>">
  		           </div>
  		         </div>	
 
   		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.workPhone"/>: </label></div>
  		           <div class="reg-form-control">
  		             <input type="text"  style="width:25%" id="workCountryCode" name="workCountryCode" value="+84"    data-rule-pattern="^\+?[0-9]{2,4}$" data-msg-pattern="<fmt:message key='buyer.register.form.field.workCountryCode.pattern'/>">
  		             <input type="tel"   style="width:73%" id="workPhone"       name="workPhone"   placeholder="<fmt:message key='buyer.register.form.field.workPhone.placeholder'/>" data-rule-required="false"  data-rule-pattern="^[0-9]{5,15}$"  data-msg-pattern="<fmt:message key='buyer.register.form.field.workPhone.pattern'/>"/>
  		             <div id="error-workCountryCode"></div>
  		             <div style="font-size:9px;font-weight:bold;font-style:oblique;">
  		               <fmt:message key='buyer.register.form.field.workPhone.tipmsg'/>
                     </div>
  		           </div>
  		         </div>
  		      
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.mobilePhone"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <input type="text"  style="width:25%"  id="mobileCountryCode" name="mobileCountryCode" value="+84"   data-rule-pattern="^\+?[0-9]{2,4}$"  data-msg-pattern="<fmt:message key='buyer.register.form.field.mobileCountryCode.pattern'/>">
  		             <input type="tel"   style="width:73%"  id="mobilePhone"       name="mobilePhone"  placeholder="<fmt:message key='buyer.register.form.field.mobilePhone.placeholder'/>" data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.mobilePhone.required'/>"   data-rule-pattern="^[0-9]{5,15}$"  data-msg-pattern="<fmt:message key='buyer.register.form.field.mobilePhone.pattern'/>">
  		             <div id="error-mobileCountryCode"></div>
  		          </div>
  		         </div>	
  		   
  		       </div>
  		      
    	       <div class="reg-form-column">  
    	  
 		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.email"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <input type="email" class="form-control" id="email" name="email"   maxlength="255" placeholder="<fmt:message key='buyer.register.form.field.email.placeholder'/>" data-rule-required="true" data-rule-email="true"  data-msg-required="<fmt:message key='buyer.register.form.field.email.required'/>">
  		           </div>
  		         </div>
  		      
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.confirmEmail"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <input type="email" class="form-control" id="confirmEmail" name="confirmEmail"  maxlength="255" placeholder="<fmt:message key='buyer.register.form.field.confirmEmail.placeholder'/>" data-rule-required="true"  data-rule-email="true"  data-msg-required="<fmt:message key='buyer.register.form.field.confirmEmail.required'/>" data-rule-equalTo="#email" data-msg-equalTo="<fmt:message key='buyer.register.form.field.confirmEmail.equalTo'/>">
  		           </div>
  		         </div>
 
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.password"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <input type="password" class="form-control" id="password" name="password" placeholder="<fmt:message key='buyer.register.form.field.password.placeholder'/>"  data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.password.required'/>"  data-rule-pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!$#%@\-_.]{8,50}$" data-msg-pattern="<fmt:message key='buyer.register.form.field.password.pattern'/>">
  		           </div>
  		         </div>
  		      
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.confirmPassword"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="<fmt:message key='buyer.register.form.field.confirmPassword.placeholder'/>"  data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.confirmPassword.required'/>" data-rule-equalTo="#password" data-msg-equalTo="<fmt:message key='buyer.register.form.field.confirmPassword.equalTo'/>">
  		           </div>
  		         </div>
  		    
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.investAs"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <select  id="investAs" name="investAs" data-rule-required="true" data-msg-required="<fmt:message key='buyer.register.form.field.investAs.required'/>">
  		               <option value="">Please select...</option>
  		               <c:forEach var="item" items="${investAsList}" varStatus="status"> 
  		               <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
                       </c:forEach>
                     </select>
  		           </div>
  		         </div>
  		    
  		         <div class="form-group">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.fromChannels"/>: *</label></div>
  		           <div class="reg-form-control">
  		             <select id="fromChannels" name="fromChannels" data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.fromChannels.required'/>">
  		               <option value="">Please select...</option>
  		               <c:forEach var="item" items="${fromChannelsList}" varStatus="status"> 
  		               <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
                       </c:forEach>
                     </select>
  		           </div>
  		         </div>
  		    
  		         <div id="otherFromChannelsDiv" class="form-group"  style="display:none;">
  		           <div class="reg-form-label"><label><fmt:message key="buyer.register.form.field.otherFromChannels"/>: * </label></div>
  		           <div class="reg-form-control">
  		             <input type="text" class="form-control" id="otherFromChannels"  name="otherFromChannels"   maxlength="255"  data-rule-required="true" data-msg-required="<fmt:message key='buyer.register.form.field.otherFromChannels.required'/>" >
			       </div>
  		         </div>
  		        </div>
  		   
  		       <div style="clear:both;text-align:center;"> 
  		         <button class="btn btn-default" id="submitApplication"  type="submit"><fmt:message key="buyer.register.form.submit"/></button> 
                 <input type="hidden" name="defaultLocale" value="${self.locale}">
               </div>
	         </div>	
	       
	       </div>
	     </form>
	    </div>
	  </div>
	  
	  <div class="footer-container" style="height:106px;color:#fff;text-align:center;font-size:16px;padding-top:14px;background:#414141;">
  	    <div id="copyright">
  		  <fmt:message key="common.copyright"/>
  		</div>
  	  </div>	
    </div>
  </body>
  <script type="text/javascript" src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
  <script type="text/javascript" src="${base}/static/libs/carhartl-jquery-v1.4.1/jquery.cookie.js"></script>
  <script type="text/javascript" src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
  <script src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.js"></script>
  <script type="text/javascript" src="${base}/static/libs/select2-3.5.1/select2.min.js"></script>
  <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>
  
  <script type="text/javascript">
  var app = {
	base: '${base}', 
	version: '${version.app}', 
	loginName: '${loginUser.loginName}',
	selfUrl:'${self.url}'
  };
  $(function (){
	   
	   $('#form-main-info').validate({
			  errorPlacement: function (error, element) {
				var dateInputId = element.attr('id');
	            if(dateInputId=='workCountryCode' || dateInputId=='mobileCountryCode') {
	            	$('#error'+'-' + dateInputId).html(error);
	            } else {
	                error.insertAfter(element);
	            }
	          }
		  });
	   
	   
      $("#reg-form-div select").select2({
          containerCssClass: 'form-select-container',
          dropdownCssClass: 'form-select-dropdown',   
      }).on("change select2-blur", function(e) {
    	  var target = $(e.target);
    	  target.focusout();  // 失焦触发验证
	  });  
      
      

		$('#workCountryCode').on('change',function() {
	        var workCountryCode = $('#workCountryCode').val();
		      if(workCountryCode!='' && !workCountryCode.indexOf("+") == 0 ){
				$('#workCountryCode').val("+"+workCountryCode);
			  }if(workCountryCode=='') {
		        $('#workCountryCode').val("+84");
			  }
		});
	     
		$('#mobileCountryCode').on('change',function() {
			var mobileCountryCode = $('#mobileCountryCode').val();
			  if(mobileCountryCode!='' && !mobileCountryCode.indexOf("+") == 0){
				$('#mobileCountryCode').val("+"+mobileCountryCode);
			  }if(mobileCountryCode=='') {
				  $('#mobileCountryCode').val("+84");
			  }
		});
      
      
      $('#fromChannels').on('change',function() {
  		if($('#fromChannels').val()=='Others'){
  		    $('#otherFromChannelsDiv').show();
  		}else{
  		    $('#otherFromChannelsDiv').hide();
  		}
  	  });
  }); 
  
  </script>
  <script type="text/javascript" src="${base}/static/themes/default/js/common.multilang.js"></script>
  <script type="text/javascript" src="${base}/static/themes/default/js/app.js?ver=${version.app}"></script>
    
</html>