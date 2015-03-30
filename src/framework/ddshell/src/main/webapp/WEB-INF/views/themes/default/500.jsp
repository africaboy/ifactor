<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%
Throwable t = (Throwable)request.getAttribute("javax.servlet.error.exception");
if (t == null) {
    t = (Throwable)request.getAttribute("exception");
}
if (t != null) {
    org.slf4j.LoggerFactory.getLogger("500.jsp").error(t.getMessage(), t);
}
response.setStatus(200);
%><!doctype html>
<!--[if lt IE 7]> <html class="ie6 oldie"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 oldie"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 oldie"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="">
<!--<![endif]-->
  <head>
    <meta charset="UTF-8">
    <title>500 - 系统内部错误</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="${base}/static/libs/AdminLTE/${version.AdminLTE}/css/font-awesome.min.css" />
    <link type="text/css" rel="stylesheet" href="${base}/static/libs/AdminLTE/${version.AdminLTE}/css/ionicons.min.css" />
    <link type="text/css" rel="stylesheet" href="${base}/static/libs/AdminLTE/${version.AdminLTE}/css/AdminLTE.css" />
    <link type="text/css" rel="stylesheet" href="${base}/static/AdminLTE/css/app.css?ver=${version.app}" />
    <!--[if lt IE 9]>
    <script type="text/javascript" src="${base}/static/libs/html5shiv/${version.html5shiv}/html5shiv.js"></script>
    <script type="text/javascript" src="${base}/static/libs/respondjs/${version.respondjs}/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="error-page">
      <h2 class="headline text-info">500</h2>
      <div class="error-content">
        <h3><i class="fa fa-warning text-yellow"></i> 系统出错啦！</h3>
        <p>请记录出错时间及详细操作步骤，联系系统管理员，或者忽略此错误，点击 <a href="${base}/">此处</a> 返回首页继续执行其他操作。</p>
      </div>
    </div>
    
    <script type="text/javascript" src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
  </body>
</html>