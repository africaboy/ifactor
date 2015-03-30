<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>

<spring:eval var="countryList" expression="@catalogService.findCountry().children" />
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
  <!--  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800&subset=all"> -->
  <link rel="stylesheet" href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css">
  <link rel="stylesheet" href="${base}/static/libs/font-awesome-4.2.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css">
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet"/>
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet"/>
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui.min.css" rel="stylesheet"/>
  <!--Slider-->
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/themes/default/default.css" type="text/css" media="screen">
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/nivo-slider.css" type="text/css" media="screen">
  <link rel="stylesheet" href="${base}/static/libs/slider/3.2/style.css" type="text/css" media="screen">
  <link rel="stylesheet" href="${base}/static/libs/lightSlider/1.1.1/css/lightSlider.css">
  <!-- End slider -->
  <link rel="stylesheet" type="text/css" href="${base}/static/themes/metronic/css/homepage.css">
  <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png"/>

  <script src="https://maps.googleapis.com/maps/api/js"></script>
  <style type="text/css">
    .form-horizontal .form-group {
   	  margin-right: 0px;
   	  margin-left:  0px;
     }
    label.error { color:#f00;}
    </style>
</head>

<body>
<div class="header">
  <div class="header_container">
    <div class="head_logo">
      <img src="${base}/static/themes/metronic/img/home/logo.png" alt="logo" />
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
        <a class="text" href="${base}/login"><span><fmt:message key="common.topnav.login"/></span></a>
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
    <!--<marquee  scrollamount="5"  loop="-1">Over Â£227,547,880 of invoices traded and 56,424 successful transaction</marquee>-->
    <fmt:message key="index.center.marquee"/>
  </div>
</div>
<div class="policyheader">
  <span style="font-weight: bold"><fmt:message key="contactUs.content.title"/></span>
</div>
<div class="contact_container">
  <div class="contact_slider_container">
    <ul id="lightSlider">
      <li data-thumb="${base}/static/themes/metronic/img/home/contactus_thumb1.png">
        <img src="${base}/static/themes/metronic/img/home/contactus_img1.jpg" />
      </li>
      <li data-thumb="${base}/static/themes/metronic/img/home/contactus_thumb2.png">
        <img src="${base}/static/themes/metronic/img/home/contactus_img2.jpg" />
      </li>
      <li data-thumb="${base}/static/themes/metronic/img/home/contactus_thumb3.png">
        <img src="${base}/static/themes/metronic/img/home/contactus_img3.jpg"/>
      </li>
      <li data-thumb="${base}/static/themes/metronic/img/home/contactus_thumb4.png">
        <img src="${base}/static/themes/metronic/img/home/contactus_img4.jpg" />
      </li>
    </ul>
  </div>

  <!-- -->
  <div class="contact_content">
    <div class="contact_address">
      <div class="contact_text">
        <div class="contactus_slider_button" id="slider_next_button">
          <img src="${base}/static/themes/metronic/img/home/contactus_next.png">
        </div>
        <div style="float: right; margin-top: 0px; margin-right: 0px;width: 2px; height: 30px;">
        </div>
        <div class="contactus_slider_button" id="slider_previous_button">
          <img src="${base}/static/themes/metronic/img/home/contactus_previous.png">
        </div>
        <div class="contact_block contact_block3" style="display: none">
          <div style="font-weight: bold;margin-bottom: 20px"><fmt:message key="contactUs.content.block2.office"/></div>
          <div style="margin-bottom: 18px"><fmt:message key="contactUs.content.block2.adress"/></div>
          <div><fmt:message key="contactUs.content.tel1"/><br />
            <fmt:message key="contactUs.content.fax1"/><br />
            <fmt:message key="contactUs.content.email"/>&nbsp;<a href="mailto:info@entrofine.com"><fmt:message key="contactUs.content.block2.E-mail"/></a></div>
        </div>
        <div class="contact_block contact_block1" style="display: none">
          <div style="font-weight: bold;margin-bottom: 20px"><fmt:message key="contactUs.content.block1.office"/></div>
          <div style="margin-bottom: 18px"><fmt:message key="contactUs.content.block1.adress"/></div>
          <div><fmt:message key="contactUs.content.tel2"/><br />
            <fmt:message key="contactUs.content.fax2"/><br />
            <fmt:message key="contactUs.content.email"/>&nbsp;<a href="mailto:info@entrofine.com"><fmt:message key="contactUs.content.block2.E-mail"/></a></div>
        </div>
        <div class="contact_block contact_block4" style="display: none">
          <div style="font-weight: bold;margin-bottom: 20px"><fmt:message key="contactUs.content.office"/></div>
          <div style="margin-bottom: 18px"><fmt:message key="contactUs.content.adress"/></div>
          <div><fmt:message key="contactUs.content.tel3"/><br />
            <fmt:message key="contactUs.content.fax3"/><br />
            <fmt:message key="contactUs.content.email"/>&nbsp;<a href="mailto: office@entrofine.ro"><fmt:message key="contactUs.content.block2.E-mail"/></a></div>
        </div>
        <div class="contact_block contact_block2" style="display: none">
          <div style="font-weight: bold;margin-bottom: 20px"><fmt:message key="contactUs.content.block3.office"/></div>
          <div style="margin-bottom: 18px"><fmt:message key="contactUs.content.block3.adress"/></div>
          <div><fmt:message key="contactUs.content.tel4"/><br />
            <fmt:message key="contactUs.content.fax4"/><br />
            <fmt:message key="contactUs.content.email"/>&nbsp;<a href="mailto:info@entrofine.com"><fmt:message key="contactUs.content.block2.E-mail"/></a></div>
        </div>
      </div>
      <div id="contact_map">

      </div>
    </div>
    <div class="contact_form">
      <div class="contactus_heading_text"><fmt:message key="contactUs.content.webform"/></div>
      <div class="contactus_heading_logo"></div>
      <div class="contactus_form">
        <form class="form-horizontal" id="myForm" name="myForm" method="post"  role="form">
        <form:form method="post" modelAttribute="contactUs">
         <form:errors path="*" cssClass="error" />
          <div class="form-group">
            <div class="col-xs-5 contact_label"><span class="require">* </span><fmt:message key="contactUs.content.country"/></div>
            <td><form:input path="country" /></td>  
            <td><form:errors path="country" cssClass="error" /></td>
            <div class="col-xs-7">
            <select  class="contact_dropdown" id="country" name="country" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.countryOfResidence.required'/>">
              <option value=""></option>
              <c:forEach var="item" items="${countryList}" varStatus="status"> 
              <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
              </c:forEach>
            </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-5 contact_label"><span class="require">* </span><fmt:message key="contactUs.content.fullName"/></div>
            <td><form:input path="fullname" /></td>  
            <td><form:errors path="fullname" cssClass="error" /></td>
            <div class="col-xs-7">
              <input type="text"  class="form-control" id="fullname" name="fullname">
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-5 contact_label"><span class="require">*</span><fmt:message key="contactUs.content.company"/></div>
            <td><form:input path="companyOrganization" /></td>  
            <td><form:errors path="companyOrganization" cssClass="error" /></td>
            <div class="col-xs-7">
              <input type="text"  class="form-control" id="companyOrganization" name="companyOrganization">
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-5 contact_label"><span class="require">* </span><fmt:message key="contactUs.content.Email"/></div>
            <td><form:input path="email" /></td>  
            <td><form:errors path="email" cssClass="error" /></td>
            <div class="col-xs-7">
              <input type="text"  class="form-control" id="email" name="email">
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-5 contact_label"><span class="require">* </span><fmt:message key="contactUs.content.subject"/></div>
            <td><form:input path="subject" /></td>  
            <td><form:errors path="subject" cssClass="error" /></td>
            <div class="col-xs-7">
              <input type="text"  class="form-control" id="subject" name="subject">
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-5 contact_label"><span class="require">* </span><fmt:message key="contactUs.content.message"/></div>
            <td><form:input path="message" /></td>  
            <td><form:errors path="message" cssClass="error" /></td>
            <div class="col-xs-7">
              <textarea class="form-control" rows="5" id="message" name="message"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-5 contact_label"></div>
            <div class="col-xs-7" style="margin-bottom: 10px">
              <i style="font-size: 11px"><span class="require">* </span><fmt:message key="contactUs.content.allFields"/></i>
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-5 contact_label"></div>
            <div class="col-xs-7" style="margin-top: 5px">
              <input id="submitApplication" type="submit" class="contact_btn" value="<fmt:message key="contactUs.content.submit"/>">&nbsp;&nbsp;<input type="reset" class="contact_btn" value="<fmt:message key="contactUs.content.reset"/>">
            </div>
          </div>
         </form:form>
        </form>
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
<script src="${base}/static/libs/lightSlider/1.1.1/js/jquery.lightSlider.min.js"></script>
<script src="${base}/static/themes/metronic/js/home/contactUs.js"></script>
<script src="${base}/static/themes/metronic/js/common.js"></script>
<script>

var app = {
		base: '${base}', 
		version: '${version.app}', 
		loginName: '${loginUser.loginName}',
		selfUrl:'${self.url}'
	  };
  function init_map(lat,lng, content) {
    var myOptions = {
      zoom: 15,
      center: new google.maps.LatLng(lat,lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("contact_map"), myOptions);
    marker = new google.maps.Marker({map: map, position: new google.maps.LatLng(lat-0.002,lng)});
    infowindow = new google.maps.InfoWindow({content: content});
    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
    infowindow.open(map, marker);
  }
  var latArr = [22.339547,22.5371301,21.013551,44.448775];
  var lngArr = [114.15072600000008,113.9893549,105.803446,26.086876];
  var contentArr = ["<b>Peninsula Tower</b><br/>538 Castle Peak Rd<br/> Hong Kong","<b>Tower A, Fortune Plaza</b><br/>7002 Shennan Ave.,Futian District<br/> China","<b>Eurowindow Building</b><br/>27 Tran Duy Hung Street<br/> Vietnam","<b>Bucharest</b><br/>41 Frumoasa Street, District 1<br/> Romania"];
  var locationArr=["Hong Kong, China","Shenzen, China", "Hanoi, Vietnam", "Bucharest, Romania"];

  function loadContent(slideNo){
    init_map(latArr[slideNo],lngArr[slideNo],contentArr[slideNo]);
    for(var i = 0; i<4;i++){
      if(i==slideNo){
        $(".contact_block"+(i+1)).css('display','block');
      }else{
        $(".contact_block"+(i+1)).css('display','none');
      }
    }
    $(".lSPager a").addClass('if-tooltip');
    var lis = $(".lSPager img");
    for( var j=0; j<lis.length; j++ ){
      $(lis[j]).attr('data-toggle','tooltip');
      $(lis[j]).attr('data-original-title',locationArr[j]);
    }
    $(".if-tooltip img").tooltip({
      placement : 'top'
    });
    $('[data-toggle="tooltip"]').tooltip({
      placement : 'top'
    });
  }

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
  $(document).ready(function() {
    var slider = $('#lightSlider').lightSlider({
      gallery: true,
      item: 1,
      loop:true,
      slideMargin: 0,
      thumbItem: 14,
      thumbMargin: 3,
      galleryMargin: -59,
      //auto:true,
      //loop:true,
      onSliderLoad: function (el) {
        loadContent(slider.getCurrentSlideCount()-1);
      },
      onAfterSlide: function (el) {
        loadContent(slider.getCurrentSlideCount()-1);
      }
    });
    $("#slider_next_button").click(function(){
      slider.goToNextSlide();
    });
    $("#slider_previous_button").click(function(){
      slider.goToPrevSlide();
    });
    loadContent(slider.getCurrentSlideCount()-1);
  });
  
//   function funshow(){
// 	  document.getElementById("formSubmit").submit();
//   }
  
</script>
</body>
</html>
