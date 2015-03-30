<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="titleList" expression="@catalogService.findTitle().children" />
<spring:eval var="investAsList" expression="@catalogService.findInvestAs().children" />
<spring:eval var="fromChannelsList" expression="@catalogService.findFromChannels().children" />
<c:set target="${self}" property="title"><fmt:message key='buyer.register.page.title'/></c:set>
<!DOCTYPE html>

<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<%@page import="java.util.Date"%>  
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
  <meta charset="utf-8"/>
  <title><fmt:message key="common.topnav.title"/></title>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <meta content="" name="description"/>
  <meta content="" name="author"/>
  <!-- BEGIN GLOBAL MANDATORY STYLES -->
  <!-- <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800&subset=all"> -->
  <link rel="stylesheet" href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css">
  <link rel="stylesheet" href="${base}/static/libs/font-awesome/4.2.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css">
  <!--<link rel="stylesheet" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-select/bootstrap-select.min.css">-->
  <!--Slider-->
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/themes/default/default.css" type="text/css" media="screen">
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/nivo-slider.css" type="text/css" media="screen">
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/style.css" type="text/css" media="screen">
  <!-- End slider -->
  <link rel="stylesheet" type="text/css" href="${base}/static/themes/metronic/css/homepage.css">
  <%-- <link rel="stylesheet" href="${base}/static/themes/metronic/css/registration.css?ver=${version.app}"> --%>
  <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png"/>
    <style type="text/css">
  span.required {color:red;}
  label.error{color:#ccf;}
  </style>
</head>

<body>
<div class="header">
  <div class="header_container">
    <div class="head_logo">
      <a href="${base}/"><img src="${base}/static/themes/metronic/img/home/logo.png" alt="logo" /></a>
    </div>
    <div class="text-left slogan">
      <fmt:message key="common.topnav.cwcmfs"/>
    </div>
  </div>
</div>
<div class="head_menu">
  <div class="menu_container">
    <ul class="menu cf">
      <li>
        <a href="${base}/" class="text">
          <div class="small_text"><fmt:message key="common.topnav.about"/></div>
          <div class="medium_text"><fmt:message key="common.topnav.entroAuction"/></div>
        </a>
      </li>
      <li>
        <a href="${base}/home/help" class="text">
          <div class="small_text"><fmt:message key="common.topnav.how"/></div>
          <div class="medium_text"><fmt:message key="common.topnav.itWorks"/></div>
        </a>
      </li>
      <li>
        <a href="${base}/home/contact-us" class="text">
          <div class="small_text"><fmt:message key="common.topnav.contact"/></div>
          <div class="medium_text"><fmt:message key="common.topnav.us"/></div>
        </a>
      </li>
      <li class="language">
        <a href="" class="text language_text">
          <img src="${base}/static/themes/metronic/img/home/flag/gb.png"/>&nbsp;<fmt:message key="common.lang.en"/>&nbsp;<img src="${base}/static/themes/metronic/img/home/a.png"/>
          <ul class="submenu">
            <li><img src="${base}/static/themes/metronic/img/home/flag/vn.png"/>&nbsp;<fmt:message key="common.lang.vi"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/cn.png"/>&nbsp;<fmt:message key="common.lang.simpchinese"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/cn.png"/>&nbsp;<fmt:message key="common.lang.Tradchinese"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/id.png"/>&nbsp;<fmt:message key="common.lang.bahasa"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/nl.png"/>&nbsp;<fmt:message key="common.lang.nederlands"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/ro.png"/>&nbsp;<fmt:message key="common.lang.ramana"/></li>
          </ul>
        </a>
      </li>
      <li class="login_link">
        <a class="text" href="${base}/login"><span><fmt:message key="common.topnav.login"/></span></a>
      </li>
      <li class="login_link active_login">
        <a class="text" href="${base}/#apply-now"><fmt:message key="common.topnav.join"/>&nbsp;<b><fmt:message key="common.topnav.today"/></b></a>
      </li>
    </ul>
  </div>
</div>
<div class="register_white_block">
  <div class="register_content_containter" style="height: 170px">
    <div class="register_zone1_img_buyer">
      <img src="${base}/static/themes/metronic/img/home/iwanttoinvest.png">
    </div>
    <div class="register_zone1_bubble">
      <span style="font-size: 20px"><fmt:message key="buyer.registration.zone1.bubble"/><br/></span> <span style="font-size: 28px; font-weight: bold"><fmt:message key="buyer.registration.zone1.bubble1"/></span>
    </div>
    <div class="register_zone1_resume">
      <div style="padding-left: 10px">
        <fmt:message key="buyer.registration.zone1.resume.left1"/>&nbsp;<a href="homepage.html"><fmt:message key="buyer.registration.zone1.resume.left2"/></a>
      </div>
      <div style="padding-left: 10px; margin-top: 10px">
        <fmt:message key="buyer.registration.zone1.resume.left3"/>
      </div>
      <div class="register_resume_button" onclick="location.href='${base}/login';">
        <fmt:message key="buyer.registration.zone1.resume_button"/>&nbsp;<b><fmt:message key="buyer.registration.zone1.resume_button1"/></b>
      </div>
    </div>
  </div>
</div>
<div class="register_blue_block">
  <div class="register_content_containter" style="margin-bottom: -10px">
    <div style="text-align: center; padding-top: 20px;font-size:14px;"><b><fmt:message key="buyer.registration.blue.block"/></b></div>
    <div style="text-align: center;"><fmt:message key="buyer.registration.blue.block1"/></div>
    <div style="text-align: center; padding-top: 15px">
      <img src="${base}/static/themes/metronic/img/home/register_seperator.png">
    </div>
    <div id="invaliddiv" class="alert alert-danger display-none" style="display:none">
      <img src="${base}/static/themes/metronic/img/home/warning.png" height="30px">&nbsp;&nbsp;<fmt:message key="jcaptcha.invalid"/>
    </div>
    <div id="emaildiv" class="alert alert-danger display-none" style="display:none">
      <img src="${base}/static/themes/metronic/img/home/warning.png" height="30px">&nbsp;&nbsp;<fmt:message key="buyer.register.message.emailRegistered"/>
    </div>
    <div id="errordiv" class="alert alert-danger display-none" style="display:none">
      <img src="${base}/static/themes/metronic/img/home/warning.png" height="30px">&nbsp;&nbsp;<fmt:message key="buyer.apply.message.failed"/>
    </div>
    <form class="register_form" id="form-main-info"  method="post" action="#" role="form">
      <div class="row1">
      <div class="column4">
        <div class="column right"><fmt:message key="buyer.register.form.field.title"/>:<span class="required">*</span></div>
        <div class="column left half">
          <select id="title" name="title" data-rule-required="true" tabIndex="1" data-msg-required="<fmt:message key='buyer.register.form.field.title.required'/>" style="margin-bottom:10px; ">
            <option value="">Select</option>
            <c:forEach var="item" items="${titleList}" varStatus="status"> 
            <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
            </c:forEach>
          </select>
        </div>
        <div class="column right"><fmt:message key="buyer.register.form.field.email"/>:<span class="required">*</span></div>
        <div class="column left">
          <input class="form-control" type="email"  id="email" name="email"  tabIndex="10"  maxlength="255" placeholder="<fmt:message key='buyer.register.form.field.email.placeholder'/>" data-rule-required="true" data-rule-email="true"  data-msg-required="<fmt:message key='buyer.register.form.field.email.required'/>">
        </div>
      </div>
      </div>
      
      <div class="row1">
      <div class="column4">
        <div class="column right"><fmt:message key="buyer.register.form.field.firstName"/>:<span class="required">*</span></div>
        <div class="column left half">
          <input class="form-control" type="text" id="firstName" name="firstName" tabIndex="2" maxlength="50" placeholder="<fmt:message key='buyer.register.form.field.firstName.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='buyer.register.form.field.firstName.required'/>">
        </div>
        <div class="column right"><fmt:message key="buyer.register.form.field.confirmEmail"/>:<span class="required">*</span></div>
        <div class="column left">
          <input class="form-control" type="email" id="confirmEmail"  tabIndex="11"  name="confirmEmail"  maxlength="255" placeholder="<fmt:message key='buyer.register.form.field.confirmEmail.placeholder'/>" data-rule-required="true"  data-rule-email="true"  data-msg-required="<fmt:message key='buyer.register.form.field.confirmEmail.required'/>" data-rule-equalTo="#email" data-msg-equalTo="<fmt:message key='buyer.register.form.field.confirmEmail.equalTo'/>">
        </div>
      </div>
      </div>
      
      <div class="row1">
      <div class="column4">
        <div class="column right"><fmt:message key="buyer.register.form.field.lastName"/>:<span class="required">*</span></div>
        <div class="column left half">
          <input class="form-control" type="text" id="lastName" name="lastName"  tabIndex="3" maxlength="50" placeholder="<fmt:message key='buyer.register.form.field.lastName.placeholder'/>" data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.lastName.required'/>">
        </div>
        <div class="column right"><fmt:message key="buyer.register.form.field.password"/>:<span class="required">*</span></div>
        <div class="column left">
          <input class="form-control" type="password" id="password" name="password" tabIndex="12"  placeholder="<fmt:message key='buyer.register.form.field.password.placeholder'/>"  data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.password.required'/>"  data-rule-pattern="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!$#%@\-_.]{8,50}$" data-msg-pattern="<fmt:message key='buyer.register.form.field.password.pattern'/>">
        </div>
      </div>
      </div>
      
      <div class="row1">
      <div class="column4">
        <div class="column right"><fmt:message key="buyer.register.form.field.workPhone"/>:<span class="required">&nbsp;&nbsp;</span></div>
        <div class="column left half">
          <input class="form-control" type="text" style="width: 40px; display: inline-block;float: left" id="workCountryCode" name="workCountryCode"  tabIndex="4" value="+84"    data-rule-pattern="^\+?[0-9]{2,4}$" data-msg-pattern="<fmt:message key='buyer.register.form.field.workCountryCode.pattern'/>"> 
          <input class="form-control" type="text" style="width: 138px;display: inline-block;float: right; padding-right: 0px" id="workPhone"       name="workPhone"   tabIndex="5"  placeholder="<fmt:message key='buyer.register.form.field.workPhone.placeholder'/>" data-rule-required="false"  data-rule-pattern="^[0-9]{5,15}$"  data-msg-pattern="<fmt:message key='buyer.register.form.field.workPhone.pattern'/>"/>
          <div id="error-workCountryCode"></div>
           <!--  <div style="font-size:9px;font-weight:bold;font-style:oblique;">
              <fmt:message key='buyer.register.form.field.workPhone.tipmsg'/>
            </div> -->
        </div>
        <div class="column right"><fmt:message key="buyer.register.form.field.confirmPassword"/>:<span class="required">*</span></div>
        <div class="column left">
          <input class="form-control" type="password" id="confirmPassword" name="confirmPassword"  tabIndex="13"  placeholder="<fmt:message key='buyer.register.form.field.confirmPassword.placeholder'/>"  data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.confirmPassword.required'/>" data-rule-equalTo="#password" data-msg-equalTo="<fmt:message key='buyer.register.form.field.confirmPassword.equalTo'/>">
        </div>
      </div>
      </div>
      
      <div class="row1">
      <div class="column4">
        <div class="column right"><fmt:message key="buyer.register.form.field.mobilePhone"/>:<span class="required">*</span></div>
        <div class="column left half" >
          <input class="form-control" type="text" style="width: 40px; display: inline-block;float: left" id="mobileCountryCode" name="mobileCountryCode" tabIndex="6" value="+84"   data-rule-pattern="^\+?[0-9]{2,4}$"  data-msg-pattern="<fmt:message key='buyer.register.form.field.mobileCountryCode.pattern'/>">
          <input class="form-control" type="text" style="width: 138px;display: inline-block;float: right; padding-right: 0px" id="mobilePhone"       name="mobilePhone" tabIndex="7"  placeholder="<fmt:message key='buyer.register.form.field.mobilePhone.placeholder'/>" data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.mobilePhone.required'/>"   data-rule-pattern="^[0-9]{5,15}$"  data-msg-pattern="<fmt:message key='buyer.register.form.field.mobilePhone.pattern'/>">
          <div id="error-mobileCountryCode"></div>
        </div>
        <div class="column right"><fmt:message key="buyer.register.form.field.fromChannels"/><span class="required">*</span></div>
        <div class="column left full">
          <select id="fromChannels" name="fromChannels" tabIndex="14"   data-rule-required="true"  data-msg-required="<fmt:message key='buyer.register.form.field.fromChannels.required'/>" style="margin-bottom: 10px;">
  		    <option value="">Select</option>
            <c:forEach var="item" items="${fromChannelsList}" varStatus="status"> 
            <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
            </c:forEach>
          </select>
        </div>
      </div>
      </div>
      
      <div class="row1 clear">
      <div class="column4">
        <div class="column right"><fmt:message key="buyer.register.form.field.investAs"/>:<span class="required">*</span></div>
        <div class="column left full">
          <select  id="investAs" name="investAs"  tabIndex="8" data-rule-required="true" data-msg-required="<fmt:message key='buyer.register.form.field.investAs.required'/>" style="margin-bottom: 10px;">
           <option value="">Select</option>
           <c:forEach var="item" items="${investAsList}" varStatus="status"> 
           <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
           </c:forEach>
         </select>
        </div>
        <div  id="otherFromChannelsField"  class="column right"  style="display:none;"><fmt:message key="buyer.register.form.field.otherFromChannels"/>:<span class="required">*</span></div>
        <div  id="otherFromChannelsInput"  class="column left"   style="display:none;">
          <input class="form-control" type="text" id="otherFromChannels"  name="otherFromChannels"  tabIndex="15"    maxlength="255"  data-rule-required="true" data-msg-required="<fmt:message key='buyer.register.form.field.otherFromChannels.required'/>" >
        </div>
      </div>
      </div>
      
      <div class="row1 clear">
      <div class="column4">
        <div class="column right"><fmt:message key="buyer.registration.row1.clear.right"/>:<span class="required">*</span></div>
        <div class="column left half">
          <input class="form-control" type="text"  tabIndex="9" id="defaultReal" name="<%= com.entrofine.ifactor.shiro.web.filter.authc.JCaptchaValidateFilter.JCAPTCHA_VFCODE_PARAM%>" data-rule-required="true">
        </div>
        <div class="column2">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <img id="jcaptcha" title="try another one" src="${base}/jcaptcha">
          <i class="fa fa-refresh" style="color: #ffffff;"  onClick="refrh()"></i>
        </div> 
       </div>
       </div>
        
      <div class="row1" style="height:45px; text-align: center;margin: 0 auto">
      <div class="column4">
        <div class="register_submit_button">
        	<button id="submitApplication"  type="button" style="border: none; background: none;"><b><fmt:message key="seller.register.form.submit"/></b></button> 
        	<input type="hidden" name="defaultLocale" value="${self.locale}">
        </div>
      </div>
      </div>
    </form>
  </div>
</div>
<div id="menu-footer">
	<div id="menu-footer-content">
        <ul>    
            <li><a href="${base}/"><fmt:message key="index.center.menu.footer.aea"/></a></li>
            <li><a href="${base}/home/help"><fmt:message key="index.center.menu.footer.hiw"/></a></li>
            <li><a href="${base}/home/contact-us"><fmt:message key="index.center.menu.footer.ctu"/></a></li>
            <li><a href="${base}/home/cookiepolicy"><fmt:message key="index.center.menu.footer.ckp"/></a></li>
            <li><a href="${base}/home/termofuse"><fmt:message key="index.center.menu.footer.tou"/></a></li>
        </ul>
    </div>
</div>
<div class="company-logo">
  <div class="company-logo-left">
    <div class="hnx-logo"><img src="${base}/static/themes/metronic/img/home/hnx-logo.png"></div>
    <div class="hnx-title"><fmt:message key="index.center.hnx.title"/></div>
    <div class="hnx-weblink"><a href="http://www.bank.site" target="_blank"><fmt:message key="index.center.hnx.weblink"/></a></div>
  </div>
  <div class="company-vertical-divider"></div>
  <div class="company-logo-right">
    <div class="ef-logo"><img src="${base}/static/themes/metronic/img/home/ef-logo.png"></div>
    <div class="ef-title"><fmt:message key="index.center.ef.title"/></div>
    <div class="ef-weblink"><a href="http://www.entrofine.com" target="_blank"><fmt:message key="index.center.ef.weblink"/></a></div>
  </div>
</div>
<div id="footer">
	<div id="footer-content">
       <p><fmt:message key="index.below.footer.content"/></p>
    </div>
</div>
<!--[if lt IE 9]>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/respond.min.js"></script>
<![endif]-->
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-1.11.0.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-migrate-1.2.1.min.js"></script>
<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/js/bootstrap.min.js"></script>
<!--<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-select/bootstrap-select.min.js"></script>-->

<script src="${base}/static/libs/slider/3.2/jquery.nivo.slider.js"></script>
<script src="${base}/static/libs/jquery.marquee/1.0/jquery.marquee.min.js"></script>

<script src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.js"></script>
<script src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>

<script src="${base}/static/themes/metronic/js/buyer/account/buyer-registration.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/scripts/metronic.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/admin/pages/scripts/components-pickers.js"></script>
<script src="${base}/static/themes/metronic/js/layout.js"></script>
<script src="${base}/static/themes/metronic/js/quick-sidebar.js"></script>
<script src="${base}/static/themes/metronic/js/common.js"></script>

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
	  		    $('#otherFromChannelsField').show();
	  		    $('#otherFromChannelsInput').show();
	  		}else{
	  		    $('#otherFromChannelsField').hide();
	  		    $('#otherFromChannelsInput').hide();
	  		}
	  	  });
	  });

  $(window).load(function () {
    $('.marquee').marquee({
      //speed in milliseconds of the marquee
      duration: 10000,
      //gap in pixels between the tickers
      gap: 200,
      //time in milliseconds before the marquee will start animating
      delayBeforeStart: 0,
      //'left' or 'right'
      direction: 'left',
      //true or false - should the marquee be duplicated to show an effect of continues flow
      duplicated: true
    });
  });
  
  function refrh() {
	  $("#jcaptcha").attr('src',"${base}/jcaptcha?t=" + (new Date()).getTime()); 
	}
  
  $('#jcaptcha').click(function(){
	  $("#jcaptcha").attr('src',"${base}/jcaptcha?t=" + (new Date()).getTime()); 
  })
		  
</script>
</body>
</html>
