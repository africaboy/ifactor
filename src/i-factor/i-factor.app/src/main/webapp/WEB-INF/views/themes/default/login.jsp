<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%
  String errorMessage = null;
  String error = (String)request.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
  if( error != null ){
    if( error.indexOf("UnknownAccountException") != -1 ) {
      errorMessage = "login.form.error.invalidLoginName";
    } else if( error.indexOf("IncorrectCredentialsException") != -1 ) {
      errorMessage = "login.form.error.invalidPassword";
    } else {
      errorMessage = "login.form.error.loginFailed";
    }
  }
%>
<c:set target="${self}" property="errorMessage" value="<%=errorMessage%>" />
<!doctype html>
<!--[if lt IE 7]> <html class="ie6 oldie bg-black"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 oldie bg-black"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 oldie bg-black"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="">
<!--<![endif]-->
  <head>
    <meta charset="UTF-8">
    <title><fmt:message key="login.page.title"/></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css">
    <link rel="stylesheet" href="${base}/static/libs/select2-3.5.1/select2.css?ver=${version.app}">
    <link rel="stylesheet" href="${base}/static/themes/default/css/login.css?ver=${version.app}">
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
           </div>
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
              
            </ul>
          </div>       
          
        </div>
      </div>
      <div class="home-container" id="home-container">
      
        <div class="container" style="width:600px;margin-top:150px;">
        <form action="${base}/login" method="post">
          <div class="form-group">
            <div class="login-form-label"><label><fmt:message key="login.form.email"/></label></div>
            <div class="login-form-control">
              <input type="text" class="form-control" name="username" placeholder="Email" value="${email}" />
            </div>
          </div>
          <div class="form-group">
            <div class="login-form-label"><label><fmt:message key="login.form.password"/></label></div>
            <div class="login-form-control">
              <input type="password" class="form-control" name="password" placeholder="Password" />
            </div>
          </div>          
          <div class="form-group">
            <div class="login-form-label"></div>
            <div class="login-form-control">
              <input type="checkbox" name="rememberMe" value="<fmt:message key='login.form.rememberMe'/>" /> <fmt:message key='login.form.rememberMe'/> &nbsp;| &nbsp;<a href="${base}/password/forget"><fmt:message key='login.form.forgetPassword'/></a>
            </div>
          </div>
          
          <div class="form-group">     
          	<div class="login-form-label"></div>    
          	<div class="login-form-control">                                                     
               <button type="submit" class="btn btn-default"><fmt:message key='login.form.signMeIn'/></button>  
            </div>
          </div>

        </form>
        
        <c:if test="${!empty self.errorMessage}">
          <div class="alert alert-warning alert-dismissable" style="margin-top:60px;">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <strong><fmt:message key="${self.errorMessage}" /></strong>
          </div>
          </c:if>
        </div>
      </div>

      <div class="footer-container" style="height:106px;color:#fff;text-align:center;font-size:16px;padding-top:14px;background:#414141;">
        <div id="copyright">
          <fmt:message key="common.copyright"/>
        </div>
      </div>
    </div>
    <c:if test="${not empty self.content.free}">
    <!--模版/对话框-->
    ${self.content.free}
    </c:if>
    <script type="text/javascript">
    if(window.parent && window.parent!=window.self) {
	  window.parent.location = '${base}/login';
	}
    </script>
    <script type="text/javascript" src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/carhartl-jquery-v1.4.1/jquery.cookie.js"></script>
    <script type="text/javascript" src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/select2-3.5.1/select2.min.js"></script>
    <script type="text/javascript">
    var app = {
      base: '${base}', 
      version: '${version.app}', 
      loginName: '${loginUser.loginName}',
      selfUrl:'${self.url}'
    };

    </script>
      
    <script type="text/javascript" src="${base}/static/themes/default/js/common.multilang.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/app.js?ver=${version.app}"></script>
    <c:if test="${not empty self.js.main}">
    <!--页面js-->
    ${self.js.main}
    </c:if>
    
  </body>
</html>