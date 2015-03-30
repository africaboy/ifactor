<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/metronic/include/i18n.jsp"%>
<spring:eval var="invAvgAmtOptList" expression="@catalogService.findInvoiceAvgAmountOption().children" />
<spring:eval var="industryList" expression="@catalogService.findIndustry().children" />

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->

<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
  <meta charset="utf-8"/>
  <title><fmt:message key='common.topnav.title' /></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <meta content="" name="description"/>
  <meta content="" name="author"/>
  <!-- BEGIN GLOBAL MANDATORY STYLES -->
  <!-- <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"/> -->
  <link href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css"  rel="stylesheet">
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet"/>
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet"/>
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet"/>
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui.min.css" rel="stylesheet"/>
  <!-- END GLOBAL MANDATORY STYLES -->
  <!-- BEGIN PAGE LEVEL STYLES -->
  <link rel="stylesheet" type="text/css" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/select2/select2.css"/>
  <link rel="stylesheet" type="text/css" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css"/>
  <link rel="stylesheet" type="text/css" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css"/>
  <link rel="stylesheet" type="text/css" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css"/>
  <!-- END PAGE LEVEL STYLES -->
  <!-- BEGIN THEME STYLES -->
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/css/components.css" rel="stylesheet"/>
  <link href="${base}/static/libs/metronic/3.3.0/assets/global/css/plugins.css" rel="stylesheet"/>
  <link href="${base}/static/themes/metronic/css/layout.css" rel="stylesheet"/>
  <link id="style_color" href="${base}/static/themes/metronic/css/themes/light2.css" rel="stylesheet"/>
  <link href="${base}/static/themes/metronic/css/flaticon/flaticon.css" rel="stylesheet"/>
  <link href="${base}/static/themes/metronic/css/custom.css" rel="stylesheet"/>
  <!-- END THEME STYLES -->
  <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png"/>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<!-- DOC: Apply "page-header-fixed-mobile" and "page-footer-fixed-mobile" class to body element to force fixed header or footer in mobile devices -->
<!-- DOC: Apply "page-sidebar-closed" class to the body and "page-sidebar-menu-closed" class to the sidebar menu element to hide the sidebar by default -->
<!-- DOC: Apply "page-sidebar-hide" class to the body to make the sidebar completely hidden on toggle -->
<!-- DOC: Apply "page-sidebar-closed-hide-logo" class to the body element to make the logo hidden on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-hide" class to body element to completely hide the sidebar on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-fixed" class to have fixed sidebar -->
<!-- DOC: Apply "page-footer-fixed" class to the body element to have fixed footer -->
<!-- DOC: Apply "page-sidebar-reversed" class to put the sidebar on the right side -->
<!-- DOC: Apply "page-full-width" class to the body element to have full width page without the sidebar menu -->
<body class="page-header-fixed page-quick-sidebar-over-content">
<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
  <!-- BEGIN HEADER INNER -->
  <div class="page-header-inner">
    <!-- BEGIN LOGO -->
    <div class="page-logo">
      <a href="index.html">
        <img src="${base}/static/themes/metronic/img/entroauction_1.png" alt="logo" class="logo-default"/>
      </a>
      <div class="menu-toggler sidebar-toggler hide">
        <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
      </div>
    </div>
    <!-- END LOGO -->
    <!-- BEGIN HEADER SEARCH BOX -->
    <form class="search-form search-form-expanded" action="extra_search.html" method="GET">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search Invoice/Seller/Debtor" name="query">
				<span class="input-group-btn">
				<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
				</span>
      </div>
    </form>
    <!-- END HEADER SEARCH BOX -->
    <!-- BEGIN RESPONSIVE MENU TOGGLER -->
    <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
    </a>
    <!-- END RESPONSIVE MENU TOGGLER -->
    <!-- BEGIN TOP NAVIGATION MENU -->
    <div class="top-menu">
      <ul class="nav navbar-nav pull-right">
        <!-- BEGIN NOTIFICATION DROPDOWN -->
        <li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                            <i class="icon-envelope-open"></i>
                            <span class="badge badge-default">
                                <fmt:message key='bc.application.badge.default' />
                            </span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <p>
                                    <fmt:message key='bc.application.dropdown.menu.p' />
                                </p>
                            </li>
                            <li>
                                <ul class="dropdown-menu-list scroller" style="height: 200px;">
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-success">
                                                <i class="fa fa-plus"></i>
                                            </span>
                                            <fmt:message key='bc.application.scroller.label.success' /> <span class="time">
                                                <fmt:message key='bc.application.scroller.label.success1' />
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-danger">
                                                <i class="fa fa-bolt"></i>
                                            </span><fmt:message key='bc.application.scroller.label.danger' /><span class="time">
                                                <fmt:message key='bc.application.scroller.label.danger1' />
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-warning">
                                                <i class="fa fa-bell-o"></i>
                                            </span>
                                            <fmt:message key='bc.application.scroller.label.warning' /> <span class="time">
                                                <fmt:message key='bc.application.scroller.label.warning1' />
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-info">
                                                <i class="fa fa-bullhorn"></i>
                                            </span>
                                            <fmt:message key='bc.application.scroller.label.info' /> <span class="time">
                                                <fmt:message key='bc.application.scroller.label.info1' />
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-danger">
                                                <i class="fa fa-bolt"></i>
                                            </span>
                                            <fmt:message key='bc.application.scroller.label.danger' /> <span class="time">
                                                <fmt:message key='bc.application.scroller.label.danger1' />
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="external">
                                <a href="#" style="color:#428bca">
                                    <fmt:message key='bc.application.dropdown.menu.external' /> <i class="m-icon-swapright icon-arrow-right" style="color:#428bca; background: none"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="dropdown dropdown-language">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                            <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/gb.png">
                            <span class="langname"></span>
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/vn.png"> <fmt:message key='common.lang.vi' />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/cn.png"> <fmt:message key='common.lang.simpchinese' />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/cn.png"> <fmt:message key='common.lang.Tradchinese' />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/nl.png"> <fmt:message key='common.lang.bahasa' />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/id.png"> <fmt:message key='common.lang.nederlands' />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/ro.png"> <fmt:message key='common.lang.ramana' />
                                </a>
                            </li>
                        </ul>
                    </li>
        <!-- END NOTIFICATION DROPDOWN -->

        <!-- BEGIN USER LOGIN DROPDOWN -->
		<li class="dropdown dropdown-user">
	            <a href="#" class="dropdown-toggle if-dropdown-user" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
	                <img alt="" class="img-circle hide1" src="${base}/static/themes/metronic/img/avatar3_small.jpg" />
	           <span class="username username-hide-on-mobile">
	               <fmt:message key='s.myinvoice.insettlement.username.hide.mobile' />
	           </span>
	           <i class="fa fa-angle-down"></i>
	       </a>
	       <ul class="dropdown-menu">
	           <li>
	               <a href="${base}/seller/profile/view">
	                   <i class="icon-user"></i> <fmt:message key='bc.application.dropdown.menu.icon.user' />
	               </a>
	           </li>
	           <li>
	           <li>
	               <a href="inbox.html">
	                   <i class="icon-envelope-open"></i> <fmt:message key='bc.application.inbox.html' /> &nbsp;&nbsp;&nbsp;&nbsp;<span class="badge badge-danger">
	                       <fmt:message key='bc.application.inbox.html1' />
	                   </span>
	               </a>
	           </li>
	           <li class="divider">
	           </li>
	           <li>
	               <a href="${base}/logout">
	                   <i class="icon-key"></i> <fmt:message key='bc.application.login.html' />
	               </a>
	           </li>
	       </ul>
        </li>
		<!-- END USER LOGIN DROPDOWN --> <!-- BEGIN QUICK SIDEBAR TOGGLER -->
        
							<li class="dropdown dropdown-extended last">
          <a href="${base}/logout" class="dropdown-toggle if-logout">
            <i class="icon-logout"></i>
          </a>
        </li>
        <!-- END QUICK SIDEBAR TOGGLER -->
      </ul>
    </div>
    <!-- END TOP NAVIGATION MENU -->
  </div>
  <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper">
	<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
	<!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
	<div class="page-sidebar navbar-collapse collapse">
		<!-- BEGIN SIDEBAR MENU -->
		<ul class="page-sidebar-menu " data-auto-scroll="true"
			data-slide-speed="200">
			<!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
			<li class="sidebar-toggler-wrapper">
				<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
				<div class="sidebar-toggler"></div> <!-- END SIDEBAR TOGGLER BUTTON -->
			</li>
			<!-- BEGIN ACCOUNT MENU GROUP -->
			<%@ include file="/WEB-INF/views/themes/metronic/include/menu.jsp"%>
			<!-- END ACCOUNT MENU GROUP -->
	
			<!-- BEGIN FRONTEND THEME LINKS -->
			<!-- END FRONTEND THEME LINKS -->
		</ul>
		<!-- END SIDEBAR MENU -->
		</div>
</div>
<!-- END SIDEBAR -->
<!-- BEGIN CONTENT -->
<div class="page-content-wrapper">
<div class="page-content">

<!-- BEGIN PAGE HEADER-->
<div class="page-bar">
  <ul class="page-breadcrumb">
    <li>
      <a href="javascript:;"><fmt:message key='seller.profile.page.breadcrumb' /></a>
      <i class="fa fa-angle-right"></i>
    </li>
    <li>
      <a href="javascript:;"><fmt:message key='seller.profile.page.breadcrumb1' /></a>
    </li>
  </ul>
</div>
<h5 class="page-title">
  <b><fmt:message key='seller.profile.page.breadcrumb1' /></b>
</h5>
<!-- END PAGE HEADER-->
<!-- BEGIN PAGE CONTENT-->
<!-- Begin invoice summary information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-blue">
    <fmt:message key='seller.profile.general.information' />
</div>
  <span class="if-panel-next_to"><a href="${base}/seller/profile/trading/${sellerApply.sellerId}">&gt;&gt;&gt; <fmt:message key='seller.profile.general.information1' />&nbsp;&nbsp;<i class="icon-arrow-right"></i></a></span>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information2' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtClientID" value="${sellerApply.id}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information3' /></a></div>
        <div class="col-sm-6 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtCompanyName" value="${sellerApply.companyName}">
        </div>
        <!-- Row 2 -->
        <div class="col-sm-2 col-xs-12 text-left if-control-label-multiple-line"><a href="javascript:;"><fmt:message key='seller.profile.general.information4' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtCompanyNo" value="${sellerApply.comRegistrationNumber}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-control-label-multiple-line"><a href="javascript:;"><fmt:message key='seller.profile.general.information5' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtToAmount" value="<fmt:formatDate value='${sellerApply.comEstablishmentDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information6' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtCompanyTaxCode" value="${sellerApply.comTaxCode}">
        </div>
        <div class="clearfix"></div>
        <!-- Row 3 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information7' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtIndustrySector" value="<c:forEach var="item" items = "${industryList}">
             <c:if test="${item.code==sellerApply.comIndustrySector}">${item[self.i18n.catalog_name]}</c:if>
             <c:forEach var="item2" items="${item.children}"> <c:if test="${item2.code==sellerApply.comIndustrySector}">${item[self.i18n.catalog_name]}</c:if>
             <c:forEach var="item3" items="${item2.children}"> <c:if test="${item3.code==sellerApply.comIndustrySector}">${item[self.i18n.catalog_name]}</c:if></c:forEach></c:forEach></c:forEach> ">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information8' /></a></div>
        <div class="col-sm-6 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtCompanyAddress" value="${sellerApply.comAddress}">
        </div>
        <div class="clearfix"></div>
        <!-- Row 4 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information9' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtTypeOfCompany" value="${sellerApply.enterpriseCategory}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information10' /></a></div>
        <div class="col-sm-6 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtOtherMail" value="${sellerApply.comAddress2}">
        </div>
        <div class="clearfix"></div>
        <!-- Row 4 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information11' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtRegistrationCountry" value="${sellerApply.countryOfResidence}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-control-label-multiple-line"><a href="javascript:;"><fmt:message key='seller.profile.general.information12' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtAddress" value="${sellerApply.comNearestCenter}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.general.information13' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtBankAccount" value="${sellerApply.bankAccountNumber}">
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</div>
<!-- End invoice summary information -->
<!-- Begin ready to sell information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-blue">
    <fmt:message key='seller.profile.further.information' />
  </div>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-8">
          <div class="col-sm-3 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.further.information1' /></a></div>
          <div class="col-sm-9 col-xs-12">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDebtor1" value="${sellerApply.debtorA1Name}">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDebtor2" value="${sellerApply.debtorA2Name}">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDebtor3" value="${sellerApply.debtorA3Name}">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDebtor4" value="${sellerApply.debtorA4Name}">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDebtor5" value="${sellerApply.debtorA5Name}">
          </div>
        </div>
        <div class="col-sm-4">
          <div class="col-sm-6 col-xs-12 text-left if-control-label-multiple-line"><a href="javascript:;"><fmt:message key='seller.profile.further.information2' /></a></div>
          <div class="col-sm-6 col-xs-12 ">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="invoiceAvgAmountCode" value="<c:forEach var="item" items = "${invAvgAmtOptList}" varStatus = "status">
               <c:if test="${item.code==sellerApply.invoiceAvgAmountCode}">${item[self.i18n.catalog_name]}</c:if>
             </c:forEach>">
          </div>
          <div class="clearfix"></div>
          <div class="col-sm-6 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.further.information3' /></a></div>
          <div class="col-sm-6 col-xs-12 ">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtTokenSerialNo" value="${sellerApply.esignatureSN}"></span>
          </div>
        </div>
        <!-- Row 2 -->
      </div>
    </div>
  </div>
</div>
<!-- End ready to sell information -->
<!-- Begin invoice summary information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-blue">
    <fmt:message key='seller.profile.authorized.persons.information' />
  </div>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information1' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtTitle" value="${sellerApply.title}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information2' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtFirstName" value="${sellerApply.firstName}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information3' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtLastName" value="${sellerApply.lastName}">
        </div>
        <div class="clearfix"></div>
        <!-- Row 2 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information4' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtGender" value="${sellerApply.gender}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information5' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDateOfBirth" value="<fmt:formatDate value='${sellerApply.dob}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information6' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtNationality" value="${sellerApply.nationality}">
        </div>
        <div class="clearfix"></div>
        <!-- Row 3 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information7' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtResidenceCountry" value="${sellerApply.countryOfResidence}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information8' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtIDtype" value="${sellerApply.idType}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information9' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtIDNumber" value="${sellerApply.idNumber}">
        </div>
        <div class="clearfix"></div>
        <!-- Row 4 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information10' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtPosition" value="${sellerApply.position}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-control-label-multiple-line"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information11' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtPhoneNumber" value="${sellerApply.workPhone}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information12' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtMobileNumber" value="${sellerApply.mobilePhone}">
        </div>
        <div class="clearfix"></div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.profile.authorized.persons.information13' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtEmail" value="${sellerApply.email}">
        </div>
      </div>
    </div>
  </div>
</div>
<!-- End invoice summary information -->

<!-- END PAGE CONTENT-->
</div>
</div>
<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<div class="page-footer">
  <div class="page-footer-inner text-center">
    <fmt:message key='bc.application.footer.copyright' />
  </div>
  <div class="scroll-to-top">
    <i class="icon-arrow-up"></i>
  </div>
</div>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/respond.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-1.11.0.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-migrate-1.2.1.min.js"></script>
<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery.blockui.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery.cokie.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/uniform/jquery.uniform.min.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<!--<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>-->
<script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/extensions/TableTools/js/dataTables.tableTools.min.js"></script>
<script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/extensions/ColReorder/js/dataTables.colReorder.min.js"></script>
<script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/extensions/Scroller/js/dataTables.scroller.min.js"></script>
<script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-pager/bootstrapPager.min.js"></script>
<script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootbox/bootbox.min.js"></script>
<script src="${base}/static/themes/metronic/js/ui-alert-dialog-api.js"></script>
<!-- END PAGE LEVEL PLUGINS -->

<script src="${base}/static/libs/metronic/3.3.0/assets/global/scripts/metronic.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/admin/pages/scripts/components-pickers.js"></script>
<script src="${base}/static/themes/metronic/js/layout.js"></script>
<script src="${base}/static/themes/metronic/js/quick-sidebar.js"></script>
<script src="${base}/static/themes/metronic/js/ifactor.js"></script>
<script>
  jQuery(document).ready(function() {
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    ComponentsPickers.init();
    UIAlertDialogApi.init();
  });
  
  var app = {
			base : '${base}',
			version : '${version.app}',
			loginName : '${loginUser.loginName}',
			selfUrl : '${self.url}',
			successSavedMsg : "<fmt:message key='buyer.apply.message.successSaved'/>",
			successUpdatedMsg : "<fmt:message key='buyer.apply.message.successUpdated'/>",
			successSubmittedMsg : "<fmt:message key='buyer.apply.message.successSubmitted'/>",
			successRedirectMsg : "<fmt:message key='buyer.apply.message.successRedirectMsg'/>"
		};
</script>

<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
