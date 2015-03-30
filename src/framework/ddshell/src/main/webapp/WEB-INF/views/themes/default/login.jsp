<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# 处理逻辑
* 
--%>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%
  String errorMessage = null;
  String error = (String)request.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
  if( error != null ){
    if( error.indexOf("UnknownAccountException") != -1 ) {
      errorMessage = "账号无效！";
    } else if( error.indexOf("IncorrectCredentialsException") != -1 ) {
      errorMessage = "密码无效！";
    } else {
      errorMessage = "登录失败！";
    }
  }
%>
<c:set target="${self}" property="title" value="登录" />
<c:set target="${self}" property="errorMessage" value="<%=errorMessage%>" />
<!doctype html>
<!--[if lt IE 7]> <html class="ie6 oldie bg-black"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 oldie bg-black"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 oldie bg-black"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="bg-black">
<!--<![endif]-->
  <head>
    <meta charset="UTF-8">
    <title>${self.title}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="${base}/static/libs/AdminLTE/${version.AdminLTE}/css/font-awesome.min.css" />
    <link type="text/css" rel="stylesheet" href="${base}/static/libs/AdminLTE/${version.AdminLTE}/css/AdminLTE.css" />
    <link type="text/css" rel="stylesheet" href="${base}/static/AdminLTE/css/app.css?ver=${version.app}" />
    <!--[if lt IE 9]>
    <script src="${base}/static/libs/html5shiv/${version.html5shiv}/html5shiv.js"></script>
    <script src="${base}/static/libs/respondjs/${version.respondjs}/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="bg-black">
    <div class="form-box" id="login-box">
      <div class="header">Sign In</div>
      <form action="${base}/login" method="post">
        <div class="body bg-gray">
          <div class="form-group">
            <input type="text" class="form-control" name="username" placeholder="User Name" value="${username}" />
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Password" />
          </div>          
          <div class="form-group">
            <input type="checkbox" name="rememberMe" value="remember-me" /> Remember me
          </div>
          <c:if test="${!empty self.errorMessage}">
          <div class="alert alert-warning alert-dismissable">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <strong>${self.errorMessage}</strong>
          </div>
          </c:if>
        </div>
        <div class="footer">                                                               
          <button type="submit" class="btn bg-olive btn-block">Sign me in</button>  
        </div>
      </form>
    </div>

    <script type="text/javascript" src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${base}/static/AdminLTE/js/app.js?ver=${version.app}"></script>
  </body>
</html>