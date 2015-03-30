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

  <script src="https://maps.googleapis.com/maps/api/js"></script>
  <!--<script>
    function initialize() {
      var mapCanvas = document.getElementById('contact_map');
      var mapOptions = {
        center: new google.maps.LatLng(21.011209, 105.800454),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map(mapCanvas, mapOptions)
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  </script>-->
  <script> function init_map() {
    var myOptions = {
      zoom: 15,
      center: new google.maps.LatLng(22.339547, 114.15072600000008),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("contact_map"), myOptions);
    marker = new google.maps.Marker({map: map, position: new google.maps.LatLng(22.339547, 114.15072600000008)});
    infowindow = new google.maps.InfoWindow({content: "<b>Peninsula Tower</b><br/>538 Castle Peak Rd<br/> Hong Kong"});
    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
  }
  google.maps.event.addDomListener(window, 'load', init_map);</script>
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
      <li>
         <a href="${base}/home/help" class="text">
          <div class="small_text"><fmt:message key="common.topnav.how"/></div>
          <div class="medium_text"><fmt:message key="common.topnav.itWorks"/></div>
        </a>
      </li>
      <li class="active_menu">
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
    <img src="${base}/static/themes/metronic/img/home/contactus_banner.png" alt="">
  </div>
  <div class="running_text marquee">
    <!--<marquee  scrollamount="5"  loop="-1">Over £227,547,880 of invoices traded and 56,424 successful transaction</marquee>-->
    <fmt:message key="index.center.marquee"/>
  </div>
</div>
<div class="contact_container">
<div class="contact_content">
  <div id="contact_map"></div>
  <div class="contact_address">
    <div class="contact_block">
      <div style="font-weight: bold"> <fmt:message key="contactUs.content.block1.office"/></div>
      <div style="margin-bottom: 10px"><fmt:message key="contactUs.content.block1.adress"/></div>
      <div><b>Tel:</b> <fmt:message key="contactUs.content.block1.Tel"/><br />
      <b>Fax:</b> <fmt:message key="contactUs.content.block1.Fax"/><br />
      <b>E-mail:</b> <fmt:message key="contactUs.content.block1.E-mail"/></div>
    </div>
    <div class="contact_block">
      <div style="font-weight: bold"> <fmt:message key="contactUs.content.block2.office"/></div>
      <div style="margin-bottom: 10px"><fmt:message key="contactUs.content.block2.adress"/></div>
      <div><b>Tel:</b> <fmt:message key="contactUs.content.block2.Tel"/><br />
        <b>Fax:</b> <fmt:message key="contactUs.content.block2.Fax"/><br />
        <b>E-mail:</b> <fmt:message key="contactUs.content.block2.E-mail"/></div>
    </div>
    <div class="contact_block last">
      <div style="font-weight: bold"><fmt:message key="contactUs.content.block3.office"/></div>
      <div style="margin-bottom: 10px"><fmt:message key="contactUs.content.block3.adress"/></div>
      <div><b>Tel:</b> <fmt:message key="contactUs.content.block3.Tel"/><br />
        <b>Fax:</b> <fmt:message key="contactUs.content.block3.Fax"/><br />
        <b>E-mail:</b> <fmt:message key="contactUs.content.block3.E-mail"/></div>
    </div>
  </div>
  <div class="contact_form">
    <div class="contactus_heading_text"><fmt:message key="contactUs.content.contact"/> <b><fmt:message key="contactUs.content.us"/></b></div>
    <div class="contactus_heading_logo"></div>
    <div class="contactus_form">
      <div>
        <label><fmt:message key="contactUs.content.row1"/></label>
        <select class="form-control">
          <option><fmt:message key="contactUs.content.row1.Vietnam"/></option>
          <option><fmt:message key="contactUs.content.row1.Chinese"/></option>
        </select>
      </div>
      <div>
        <label><fmt:message key="contactUs.content.row2"/></label>
        <input type="text"  class="form-control">
      </div>
      <div>
        <label><fmt:message key="contactUs.content.row3"/></label>
        <input type="text"  class="form-control">
      </div>
      <div>
        <label><fmt:message key="contactUs.content.row4"/></label>
        <input type="text"  class="form-control">
      </div>
      <div>
        <label><fmt:message key="contactUs.content.row5"/></label>
        <input type="text"  class="form-control">
      </div>
      <div>
        <label><fmt:message key="contactUs.content.row6"/></label>
        <textarea class="form-control"></textarea>
      </div>
      <div>
        <label style="font-style: italic"><fmt:message key="contactUs.content.row7"/></label>
      </div>
      <div>
        <input type="button" class="contact_btn" value="SUBMIT"><input type="button" class="contact_btn" value="RESET">
      </div>
    </div>
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
