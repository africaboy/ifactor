<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>

<shiro:hasRole name="PRE_BUYER">
  <c:redirect url="${base}/buyer/account/apply"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_BUYER_VIEW">
  <c:redirect url="${base}/buyer/account/view"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_BUYER_UPDATEAPP">
  <c:redirect url="${base}/buyer/account/updateforapp"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_BUYER_UPDATE">
  <c:redirect url="${base}/buyer/account/update"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_SELLER">
  <c:redirect url="${base}/seller/account/apply"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_SELLER_VIEW">
  <c:redirect url="${base}/seller/account/view"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_SELLER_UPDATEAPP">
  <c:redirect url="${base}/seller/account/updateforapp"/>
</shiro:hasRole>
<shiro:hasRole name="PRE_SELLER_UPDATE">
  <c:redirect url="${base}/seller/account/update"/>
</shiro:hasRole>
<shiro:hasRole name="BUYER">
  <c:redirect url="${base}/buyer/bid/open"/>
</shiro:hasRole>
<shiro:hasRole name="VPBANK">
  <c:redirect url="${base}/buyer/bid/open"/>
</shiro:hasRole>
<shiro:hasRole name="SELLER">
  <c:redirect url="${base}/seller/invoice/in-auction"/>
</shiro:hasRole>

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->


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
      <li class="active_menu">
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
            <div id="slider" class="nivoSlider">
                <img src="${base}/static/themes/metronic/img/home/slide_image_1.png" data-thumb="${base}/static/themes/metronic/img/home/slide_image_1.png" alt="" />
                <a href="#"><img src="${base}/static/themes/metronic/img/home/slide_image_2.jpg" data-thumb="${base}/static/themes/metronic/img/home/slide_image_2.jpg" alt="" /></a>
                <img src="${base}/static/themes/metronic/img/home/slide_image_3.jpg" data-thumb="${base}/static/themes/metronic/img/home/slide_image_3.jpg" alt="" />
            </div>
        </div>
		<div class="running_text marquee">
	  <!--marquee  scrollamount="5"  loop="-1"><fmt:message key="index.center.marquee"/></marquee>-->
		  <fmt:message key="index.center.marquee"/>
		</div>
</div>
<!-- Zone 1 -->
<div class="zone1">
	<div class="zone1-content">
    	<div class="zone1_logo">
        <img src="${base}/static/themes/metronic/img/home/home_zone1_bulk.jpg" />
    	</div>
      <div class="zone1_article">
        <div class="zone1_title"><fmt:message key="index.center.zone1.zone1.title"/> </div>
        <div class="zone1_text"><fmt:message key="index.center.zone1.zone1.text"/> </div>
      </div>
  </div>
</div>
<!-- Zone 2 -->
<div class="zone2" >
  <div class="zone1-content">
    <div class="zone2_logo">
      <img src="${base}/static/themes/metronic/img/home/home_zone2_auction.jpg" />
    </div>
    <div class="zone2_article text-right">
      <div class="zone1_title"><fmt:message key="index.center.zone2.zone2.title"/> </div>
      <div class="zone1_text"><fmt:message key="index.center.zone2.zone2.text"/> </div>
    </div>
  </div>
</div>

<!-- Zone 3 -->
<div class="zone3">
	<div class="zone3-content" >
    <div class="zone3-part1">
      <div class="zone3_title">
        <fmt:message key="index.center.zone3.zone3.title"/>
      </div>
      <div class="zone3-text2">
        <fmt:message key="index.center.zone3.zone3.text2"/>
      </div>
    </div>
    <div class="zone3-part2">
      <img alt="" src="${base}/static/themes/metronic/img/home/home-zone3_platform.jpg" />
    </div>
    <div class="zone3-part3">
      <div class="zone3_title p1">
        <fmt:message key="index.center.zone3.zone3.title.p1"/>
      </div>
      <div class="zone3-text1 p2">
        <fmt:message key="index.center.zone3.zone3.title.p2"/>
      </div>
      <div class="zone3_title p3">
        <fmt:message key="index.center.zone3.zone3.title.p3"/>
      </div>
      <div class="zone3-text1 p4">
        <fmt:message key="index.center.zone3.zone3.title.p4"/>
      </div>
    </div>
    </div>
</div>

<!-- Zone 4 -->
<div class="zone4" >
	<div class="zone4-content">
    <div class="zone4_part1">
      <img src="${base}/static/themes/metronic/img/home/home-zone4_setting.jpg" />
    </div>
    <div class="zone4_part2">
      <div class="zone4_commitment"><fmt:message key="index.center.zone4.zone4.commitment"/>&nbsp;<span style="font-weight:bold;"><fmt:message key="index.center.zone4.zone4.commitment1"/></span></div>
      <div class="step step1">
        <div class="step_text_left"><fmt:message key="index.center.zone4.step1.left"/></div>
        <div class="step_text_right">
          <fmt:message key="index.center.zone4.step1.right"/>
          <br />
          <fmt:message key="index.center.zone4.step1.br"/>
        </div>
      </div>
      <div class="step step2">
        <div class="step_text_left"><fmt:message key="index.center.zone4.step2.left"/></div>
        <div class="step_text_right">
          <fmt:message key="index.center.zone4.step2.right"/>
          <br />
          <fmt:message key="index.center.zone4.step2.br"/>
        </div>
      </div>
      <div class="step step3">
        <div class="step_text_left1"><fmt:message key="index.center.zone4.step3.left1"/></div>
        <div class="step_text_right">
          <fmt:message key="index.center.zone4.step3.right"/>
          <br />
          <fmt:message key="index.center.zone4.step3.br"/>
        </div>
      </div>
    </div>
</div>
</div>

<div class="apply-now">
	<div class="apply-now-content">
        <div class="financing">
            <div class="apply-now-text-small"><a name="apply-now"></a><fmt:message key="index.center.apply.now.financing.small"/> </div>
             <div class="apply-now-text-big"><fmt:message key="index.center.apply.now.financing.big"/></div>
            <div><input type="button" value="" class="apply-now-button" onclick="location.href='${base}/seller/register<c:if test='${not empty self.locale}'>?locale=${self.locale}</c:if>';"></div>
        </div>
         <div class="invest">
           <div class="apply-now-text-small"><fmt:message key="index.center.apply.now.invest.small"/> </div>
           <div class="apply-now-text-big"><fmt:message key="index.center.apply.now.invest.big"/></div>
           <div><input type="button" value="" class="apply-now-button" onclick="location.href='${base}/buyer/register<c:if test='${not empty self.locale}'>?locale=${self.locale}</c:if>';"></div>
        </div>
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


<!--div id="company-logo">
	<div id="company-logo-content">
		<img src="${base}/static/themes/metronic/img/home/company-logo.jpg" usemap="#linkmap" />
    <map name="linkmap">
      <area shape="rect" coords="220,0,360,92" href="http://www.hnx.vn" target="_blank" alt="HNX">
      <area shape="rect" coords="362,0,500,92" href="http://www.entrofine.com" target="_blank" alt="Entrofine">
    </map>
  </div>
</div>-->

<div id="footer">
	<div id="footer-content">
       <p class="small_text"><fmt:message key="index.below.footer.content"/></p>
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
    $('#slider').nivoSlider();
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