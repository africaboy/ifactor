<%@ page contentType="text/html;charset=UTF-8"%>
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
    <title>${self.title}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload.css">
    <style type="text/css">

    </style>
    <!--[if lt IE 9]>
    <script src="${base}/static/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="${base}/static/libs/respondjs/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-1">
          <form data-result="#doc1" action="${base}/fileUpload/seller_idcard_authorizedPerson" method="post" enctype="multipart/form-data" name="fileupload">
            <div class="fileinput-button">
              <span class="btn btn-primary">上传</span>
              <input type="file" name="file">
            </div>
          </form>
        </div>
        <div class="col-md-2" id="doc1"></div>
        <div class="col-md-1">
          <form data-result="#doc2" action="${base}/fileUpload/seller_idcard_authorizedRep" method="post" enctype="multipart/form-data" name="fileupload">
            <div class="fileinput-button">
              <span class="btn btn-primary">上传</span>
              <input type="file" name="file">
            </div>
          </form>
        </div>
        <div class="col-md-2" id="doc2"></div>
      </div>
    </div>
    <script src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
    <script src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
    <script src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
    <script src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
    <script src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-process.js"></script>
    <script src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-validate.js"></script>
    <script src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
    <script>
    $(function() {
      $('form[name="fileupload"]').fileupload({
        dataType: 'json',
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        done: function (e, data) {
        }
      }).on('fileuploadprocessalways', function (e, data) {
        var currentFile = data.files[data.index];
        if (data.files.error && currentFile.error) {
          alert(currentFile.error);
        }
      });
    });
    </script>
  </body>
</html>