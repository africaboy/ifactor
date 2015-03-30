<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<!--<![endif]-->
<!doctype html>
<!--[if lt IE 7]> <html class="ie6 oldie bg-black"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 oldie bg-black"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 oldie bg-black"> <![endif]-->
<!--[if gt IE 8]><!-->
<html>
  <head>
    <meta charset="UTF-8">
    <title>Forget Password</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css">
    <link rel="stylesheet" href="${base}/static/libs/silviomoreto-bootstrap-select/bootstrap-select.min.css">
    <link rel="stylesheet" href="${base}/static/themes/default/css/login.css?ver=${version.app}">
    <link rel="stylesheet" href="${base}/static/themes/default/css/topnav.css?ver=${version.app}">
    <link rel="stylesheet" href="${base}/static/themes/default/css/form.css?ver=${version.app}">
    <!--[if lt IE 9]>
    <script src="${base}/static/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="${base}/static/libs/respondjs/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body style="margin: 0; padding: 0;background:#515151">
    <div class="container" style="width:1200px;padding:0;margin-top:0;">
      <div class="logo-container" id="logo-container-div">
         <div class="logo1-container" id="logo1-container">
           <img src="${base}/static/themes/default/img/logo1.png" />
         </div>
         <div class="logo2-container" id="logo2-container">
           <img src="${base}/static/themes/default/img/logo2.png" />
         </div>
      </div>
      
      <div class="navbar navbar-default" id="navbar">
        <div class="navbar-container" id="navbar-container">
          <div class="navbar-header pull-left">
            <a href="#" class="navbar-brand">
            </a>
          </div>
          <div class="navbar-header pull-right">
            <select class="selectpicker">
              <option>English</option>
              <option>Vietnamese</option>
            </select>
          </div>
          <div class="navbar-header pull-right">
             <div style="width:66px">&nbsp;</div>
          </div>
          
          <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ifactor-nav">
              <li class="open">
                <a  href="#">
                  <i class="icon-homehelp"></i>
                  <span class="">Help</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="icon-homecontactus"></i>
                  <span class="">Contact Us</span>
                </a>
              </li>
              
              <li>
                <a href="${base}/login">
                  <i class="icon-logout"></i>
                  <span class="">Login</span>
                </a>
              </li>
            </ul>
          </div>       
          
        </div>
      </div>
      <div class="home-container" id="home-container">
      
        <div class="container" style="width:600px;margin-top:150px;">
          <form action="${base}/password/forget" method="post">
            <div class="form-group">
              <div class="login-form-label"><label>Email</label></div>
              <div class="login-form-control">
                <input type="text" class="form-control" name="loginName" placeholder="Email" value="${email}" />
              </div>
            </div>
            <div class="form-group">     
              <div class="login-form-label"></div>    
              <div class="login-form-control">                                                     
                 <button type="submit" class="btn btn-default">Reset password</button>  
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="footer-container" style="height:106px;color:#fff;text-align:center;font-size:16px;padding-top:14px;background:#414141;">
      <div id="copyright">
        &copy;2014 Entrofine Consulting Limited.All Rights Reserved.
      </div>
    </div>
    <script type="text/javascript" src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/silviomoreto-bootstrap-select/bootstrap-select.js"></script>
    <script>
    var app = {
      base: '${base}', 
      version: '${version.app}', 
      loginName: '${loginUser.loginName}'
    };
    $(function () {
      $('.selectpicker').selectpicker();
    });
    </script>
      
    <script src="${base}/static/themes/default/js/app.js?ver=${version.app}"></script> 
  </body>
</html>