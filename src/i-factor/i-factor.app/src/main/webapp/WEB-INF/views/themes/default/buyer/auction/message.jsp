<%@ page contentType="text/html;charset=UTF-8" %><!doctype html>
<!--[if lt IE 7]> <html class="ie6 oldie"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 oldie"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 oldie"> <![endif]-->
<!--[if gt IE 8]><!-->
<html>
<!--<![endif]-->
  <head>
    <meta charset="UTF-8">
    <title>${self.title}</title>
    <%@ include file="/WEB-INF/views/include/global.jsp"%>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css">
  </head>
  <body>
  
                  <div class="form-group"   style="background-color:#0000FF;font-size:30px;color:white;font-weight:bold">
		            <div align="center">MESSAGE</div>   
	              </div>
                  <div id="form-main">
                    <div style="text-align: center;">
  	                  ${message}
                    </div>
                  </div>
  </body>
</html>
