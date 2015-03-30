<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<%@ include file="/WEB-INF/views/include/global.jsp"%>
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
  <link rel="stylesheet" href="${base}/static/libs/font-awesome-4.2.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css">
  <!--Slider-->
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/themes/default/default.css" type="text/css" media="screen">
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/nivo-slider.css" type="text/css" media="screen">
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/style.css" type="text/css" media="screen">
  <!-- End slider -->
  <link rel="stylesheet" type="text/css" href="${base}/static/themes/metronic/css/homepage.css">
  <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png"/>

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
      <li class="active_menu">
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
        <a class="text language_text">
          <c:if test="${self.locale=='en_US'}"> </c:if> <img src="${base}/static/themes/metronic/img/home/flag/gb.png"/>&nbsp;<fmt:message key="common.lang.en"/>&nbsp;<img src="${base}/static/themes/metronic/img/home/a.png"/>
          <ul class="submenu">
            <li><c:if test="${self.locale=='vi_VN'}"> </c:if><img src="${base}/static/themes/metronic/img/home/flag/vn.png"/>&nbsp;<fmt:message key="common.lang.vi"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/cn.png"/>&nbsp;<fmt:message key="common.lang.simpchinese"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/cn.png"/>&nbsp;<fmt:message key="common.lang.Tradchinese"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/id.png"/>&nbsp;<fmt:message key="common.lang.bahasa"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/nl.png"/>&nbsp;<fmt:message key="common.lang.nederlands"/></li>
            <li><img src="${base}/static/themes/metronic/img/home/flag/ro.png"/>&nbsp;<fmt:message key="common.lang.ramana"/></li>
         
          </ul>
        </a>
      </li>
       <li class="login_link">
        <a class="text" href="${base}/login"><fmt:message key="common.topnav.login"/></a>
      </li>
      <li class="login_link">
        <a class="text" href="${base}/#apply-now"><fmt:message key="common.topnav.join"/>&nbsp;<b><fmt:message key="common.topnav.today"/></b></a>
      </li>
    </ul>
  </div>
</div>
<div class="slider-containter">
  <div class="slider-wrapper theme-default">
    <img src="${base}/static/themes/metronic/img/home/howitwork_banner.png" alt="">
  </div>
  <div class="running_text marquee">
	  <!--marquee  scrollamount="5"  loop="-1"><fmt:message key="index.center.marquee"/></marquee>-->
		  <fmt:message key="index.center.marquee"/>
  </div>
</div>
<!-- begin how it work content header-->
<div class="policyheader">
  <span style="font-weight: bold"><fmt:message key="howItWork.center.title.how"/></span>&nbsp;<span style="font-weight: lighter"><fmt:message key="howItWork.center.title.on"/></span>
</div>
<!-- end how it work content header-->
<!-- begin zone 1-->
<div class="hiw_white_containter">
  <div class="hiw_content_containter">
    <div class="hiw_small_block content_right">
      <img src="${base}/static/themes/metronic/img/home/hiw_seller.png" width="100px" alt="">
    </div>
    <div class="hiw_big_block">
      <div class="hiw_content_big">
        <b><fmt:message key="howItWork.content.zone1.front"/> </b>
      </div>
      <div>
        <fmt:message key="howItWork.content.zone1.behind"/> 
      </div>
    </div>
  </div>
</div>
<!-- end zone 1-->
<!-- begin zone 2-->
<div class="hiw_blue_containter">
  <div class="hiw_content_containter">
    <div class="hiw_big_block content_right">
      <div class="hiw_content_big">
        <b><fmt:message key="howItWork.content.zone2.front"/></b>
      </div>
      <div>
       <fmt:message key="howItWork.content.zone2.behind"/>
      </div>
    </div>
    <div class="hiw_small_block">
      <img src="${base}/static/themes/metronic/img/home/hiw_buyer.png" width="100px" alt="">
    </div>
  </div>
</div>
<!-- end zone 2-->
<!-- begin zone 3-->
<div class="hiw_white_containter">
  <div class="hiw_content_containter">
    <div class="hiw_small_block content_right">
      <img src="${base}/static/themes/metronic/img/home/hiw_bank.png" width="100px" alt="">
    </div>
    <div class="hiw_big_block">
      <div class="hiw_content_big">
        <b><fmt:message key="howItWork.content.zone3.front"/></b>
      </div>
      <div>
         <fmt:message key="howItWork.content.zone3.behind"/>
      </div>
    </div>
  </div>
</div>
<!-- end zone 3-->
<!-- begin zone 4-->
<div class="hiw_blue_containter">
  <div class="hiw_content_containter" style="height: 380px">
    <div class="hiw_big_block">
      <div class="row1">
        <div class="row_logo">
          <img src="${base}/static/themes/metronic/img/home/hiw_logo1.png" alt="">
        </div>
        <div class="row_content">
         <fmt:message key="howItWork.content.zone4.row1"/>
        </div>
      </div>
      <div class="row1">
        <div class="row_logo">
          <img src="${base}/static/themes/metronic/img/home/hiw_logo2.png" alt="">
        </div>
        <div class="row_content">
          <fmt:message key="howItWork.content.zone4.row2"/>
        </div>
      </div>
      <div class="row1">
        <div class="row_logo">
          <img src="${base}/static/themes/metronic/img/home/hiw_logo3.png" alt="">
        </div>
        <div class="row_content">
          <fmt:message key="howItWork.content.zone4.row3"/>
        </div>
      </div>
      <div class="row1">
        <div class="row_logo">
          <img src="${base}/static/themes/metronic/img/home/hiw_logo4.png" alt="">
        </div>
        <div class="row_content">
         <fmt:message key="howItWork.content.zone4.row4"/>
        </div>
      </div>
      <div class="row1">
        <div class="row_logo">
          <img src="${base}/static/themes/metronic/img/home/hiw_logo5.png" alt="">
        </div>
        <div class="row_content">
         <fmt:message key="howItWork.content.zone4.row5"/> 
        </div>
      </div>
    </div>
    <div class="hiw_small_block1">
      <img src="${base}/static/themes/metronic/img/home/hiw_seperator.png" alt="">
    </div>
    <div class="hiw_small_block2 big_text">
      <fmt:message key="howItWork.content.zone4.how"/> <br /><b> <fmt:message key="howItWork.content.zone4.It"/> </b>
    </div>
  </div>
</div>
<!-- end zone 4-->
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

<script src="${base}/static/libs/slider/3.2/jquery.nivo.slider.js"></script>
<script src="${base}/static/libs/jquery.marquee/1.0/jquery.marquee.min.js"></script>
<script>
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
</script>
</body>
</html>
