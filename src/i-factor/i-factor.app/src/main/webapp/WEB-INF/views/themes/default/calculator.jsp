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
    <title><fmt:message key="calculator.title"/></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css">
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
        <div class="col-md-offset-2 col-md-8">
          <div class="input-group" >
            <input type="text" class="form-control" id="amount" placeholder="Invoice amount">
            <span class="input-group-addon">VND</span>
          </div>
          <div class="input-group">
            <input type="text" class="form-control" id="financing" placeholder="Financing percentage">
            <span class="input-group-addon">%</span>
          </div>
          <div class="input-group">
            <input type="text" class="form-control" id="interest" placeholder="Monthly interest rate">
            <span class="input-group-addon">%</span>
          </div>
          <div class="input-group">
            <input type="text" class="form-control" id="invoiceTerm" placeholder="Invoice Term (by number of days)">
            <span class="input-group-addon">days</span>
          </div>
          <div class="input-group">
            <span class="input-group-addon">Amount needs to be transferred by Buyer </span>
            <input type="text" class="form-control" id="amountResultB" readonly="readonly">
          </div>
          <div class="input-group">
            <span class="input-group-addon">Estimated Profit from interest</span>
            <input type="text" class="form-control" id="estimatedResultS" readonly="readonly">
          </div>
          <div class="input-group">
            <span class="input-group-addon"> Amount to be received by seller</span>
            <input type="text" class="form-control" id="amountResultS" readonly="readonly">
          </div>
          <div class="input-group">
            <span class="input-group-addon"> Estimated Interest amount</span>
            <input type="text" class="form-control" id="estimatedResultB" readonly="readonly">
          </div>
          <button type="button" class="btn btn-primary">compute</button>
        </div>
      </div>
    </div>
    <script type="text/javascript" src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
    <script>
    $(function() {
      $('button').click(function() {
        var amount = $('#amount').val();
        var interest = $('#interest').val()/100;
        var financing = $('#financing').val()/100;
        var invoiceTerm = $('#invoiceTerm').val();
        // Amount needs to be transferred by Buyer (Financing amount plus transaction fees) = Invoice Amount*Financing percentage*(1+0.005) 
        $('#amountResultB').val((amount*financing*(1+0.005)).toFixed(2));
        // Estimated Profit from interest if the debtor pays on the expected payment date = Invoice Amount*Financing percentage*(Monthly interest rate/30)*Invoice Term
        $('#estimatedResultS').val((amount*financing*(interest/30)*invoiceTerm).toFixed(2));
        //Amount to be received by seller (Financing amount minus transaction fees) = Invoice Amount*Financing percentage*(1-0.015)
        $('#amountResultS').val((amount*financing*(1-0.015)).toFixed(2));
        //Estimated Interest amount if the debtor pays on the expected payment date = Invoice Amount*Financing percentage*(Monthly interest rate/30)*Invoice Term
        $('#estimatedResultB').val((amount*financing*(interest/30)*invoiceTerm).toFixed(2));
      });
    });
    </script>
  </body>
</html>