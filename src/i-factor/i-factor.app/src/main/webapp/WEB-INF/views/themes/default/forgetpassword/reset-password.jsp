<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<!doctype html>
<!--[if lt IE 7]> <html class="ie6 oldie"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 oldie"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 oldie"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="">
<!--<![endif]-->
  <head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css">
    <!--[if lt IE 9]>
    <script src="${base}/static/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="${base}/static/libs/respondjs/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="form-group" style="background-color:#0000FF;font-size:30px;color:white;font-weight:bold">
      <div align="center">CLIENT RESETPASSWORD</div>   
    </div>
    <div id="form-main" style="height: 500px; overflow-y:visible;">
      <form class="form-horizontal"  id="form-main-info"  role="form" action="${base}/password/reset"  method="post" >
        <input type="hidden" class="input-sm" id="id"   name="id" value="${user.id }" />
        <div class="form-group">
          <label for="Title" class="col-sm-5 control-label" style="background-color:#7FFFD4;font-size:20px;color:white;font-weight:bold">MY PASSWORD</label>
        </div>
        <div class="form-group">
          <label for="password" class="col-sm-5 control-label">Login Name</label>
          <div class="col-sm-3">
              ${loginName }
          </div>
        </div>
        
        <div class="form-group">
          <label for="password" class="col-sm-5 control-label">New Password</label>
          <div class="col-sm-3">
              <input type="password" class="form-control" id="investAs" name="password"   placeholder="password"  data-rule-required="true"  data-msg-required="Please enter password">
          </div>
        </div>
        
            
        <div class="form-group">
          <label for="confirmPassword" class="col-sm-5 control-label">Confirm New Password</label>
          <div class="col-sm-3">
              <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"   placeholder="confirmPassword"  data-rule-required="true"  data-msg-required="Please enter confirmPassword">
          </div>
        </div>
        
        <div class="form-group">
          <div class="col-sm-offset-5 col-sm-3">
            <input type="submit" class="btn btn-default" id="submitApplication"  value="Submit Application" />
          </div>
        </div>
      </form>
    </div>
    <script src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
    <script src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
    <script src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.js"></script>
    <script type="text/javascript">
    $(function () {
      $('#form-main-info').validate();
    }); 
    </script>
  </body>
</html>