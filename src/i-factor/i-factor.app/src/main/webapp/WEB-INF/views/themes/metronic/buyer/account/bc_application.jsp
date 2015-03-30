
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/default/include/i18n.jsp"%>
<spring:eval var="idTypeList"
	expression="@catalogService.findIdType().children" />
<spring:eval var="comDurationList"
	expression="@catalogService.findComDurationInVt().children" />
<spring:eval var="comTypeList"
	expression="@catalogService.findComType().children" />
<spring:eval var="comIndustryList"
	expression="@catalogService.findComIndustry().children" />
<spring:eval var="businessFromList"
	expression="@catalogService.findBusinessFrom().children" />
<spring:eval var="positionList"
	expression="@catalogService.findPosition().children" />
<spring:eval var="titleList"
	expression="@catalogService.findTitle().children" />
<spring:eval var="genderList"
	expression="@catalogService.findGender().children" />
<spring:eval var="countryList"
	expression="@catalogService.findCountry().children" />
<spring:eval var="isComVietnamList"
	expression="@catalogService.findIsComVietnam().children" />
<spring:eval var="haveTradingOtherList"  
    expression="@catalogService.findHaveTradingOther().children" />
<spring:eval var="whatIsAssetList" 
    expression="@catalogService.findWhatIsAsset().children" />
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->

<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8" />
    <title><fmt:message key='common.topnav.title' /></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <!--<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" />-->
    <link rel="stylesheet" href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css">
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link rel="stylesheet" type="text/css" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/select2/select2.css" />
    <link rel="stylesheet" type="text/css" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css" />
    <link rel="stylesheet" type="text/css" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css" />
    <link rel="stylesheet" type="text/css" href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css" />
    <!-- END PAGE LEVEL STYLES -->
    <!-- BEGIN THEME STYLES -->
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/css/components.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/css/plugins.css" rel="stylesheet" />
    <link href="${base}/static/themes/metronic/css/layout.css" rel="stylesheet" />
    <link id="style_color" href="${base}/static/themes/metronic/css/themes/light2.css" rel="stylesheet" />
    <link href="${base}/static/themes/metronic/css/flaticon/flaticon.css" rel="stylesheet" />
    <link href="${base}/static/themes/metronic/css/custom.css" rel="stylesheet" />
    <link href="${base}/static/themes/metronic/css/application.css" rel="stylesheet" />
    <c:set target="${self}" property="docBiztypePrefix"><%=com.entrofine.ifactor.app.service.BuyerApplyDocService.BIZTYPE_PREFIX%></c:set>
    <link rel="stylesheet"
		  href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/css/jquery.fileupload.css">
    <link rel="stylesheet"
		  href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/css/jquery.fileupload-ui.css">
    <!-- END THEME STYLES -->
    <style type="text/css">
		label.error { color:#f00;font-size:12px;}
		
		.form-body li a{padding:0;}
		
	 </style>
    <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png" />
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
                    <img src="${base}/static/themes/metronic/img/entroauction_1.png" alt="logo" class="logo-default" />
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
                                <fmt:message key='bc.application.dropdown.user.mobile' />
                            </span>
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="${base}/buyer/profile/view">
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
                    <!-- END USER LOGIN DROPDOWN -->
                    <!-- BEGIN QUICK SIDEBAR TOGGLER -->
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
                            <a href="#"><fmt:message key='bc.application.page.breadcrumb' /></a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#"><fmt:message key='bc.application.page.breadcrumb.li' /></a>
                        </li>
                    </ul>
                </div>
                <h5 class="page-title">
                    <b><fmt:message key='bc.application.page.breadcrumb.li' /></b>
                </h5>
                <div id="errordiv" class="alert alert-danger display-none">
			      <button class="close" data-dismiss="alert"></button>
			      <img src="${base }/static/themes/metronic/img/home/warning.png" height="30px">&nbsp;&nbsp;<fmt:message key='buyer.apply.message.failed' />
			    </div>
                <!-- END PAGE HEADER-->
                <!-- BEGIN PAGE CONTENT-->
                <div class="row">
                    <div class="col-md-12">
                        <div id="form_wizard_1">
                            <div class="portlet-body form">
                                <div class="form-horizontal" id="submit_form">
                                    <div class="form-wizard">
                                        <div class="form-body">
                                            <ul class="nav nav-pills nav-justified steps">
                                                <li>
                                                    <a href="#tab1" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table1">
                                                        <span class="number"><fmt:message key='bc.application.nav.justified.steps1' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='bc.application.nav.justified.steps2' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab2" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table2">
                                                        <span class="number"><fmt:message key='bc.application.nav.justified.steps3' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='bc.application.nav.justified.steps4' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab3" data-toggle="tab" class="step active">
                                                      <a href="javascript:void(0)" class="step active" id="table3">
                                                        <span class="number"><fmt:message key='bc.application.nav.justified.steps5' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='bc.application.nav.justified.steps6' />
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab4" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table4">
                                                        <span class="number"> <fmt:message key='bc.application.nav.justified.steps7' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='bc.application.nav.justified.steps8' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div id="bar" class="progress progress-striped" role="progressbar">
                                                <div class="progress-bar progress-bar-success">
                                                </div>
                                            </div>
                                            <div class="tab-content">
                                                <div class="step-title">
                                                    <fmt:message key='bc.application.step.title' />
                                                </div>
                                                <div class="alert alert-danger display-none">
                                                    <button class="close" data-dismiss="alert"></button>
                                                    <fmt:message key='bc.application.alert.danger' />
                                                </div>
                                                <div class="alert alert-success display-none">
                                                    <button class="close" data-dismiss="alert"></button>
                                                    <fmt:message key='bc.application.alert.success' />
                                                </div>
                                                <!-- Begin tab1: Personal information-->
                                                <div class="tab-pane active" id="tab1">
	                                                <form class="form-horizontal" id="form-personal-info" method="post" enctype="multipart/form-data">
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.register.form.field.title' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="title" name="title" value="${user.title}" readonly />
	                                                        </div>
	                                                        <div class="control-label col-md-2">
	                                                            <fmt:message key='buyer.register.form.field.firstName' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="firstName" name="firstName" value="${user.firstName}" readonly>
	                                                        </div>
	                                                        <div class="col-md-offset-1"></div>
	                                                    </div>
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.register.form.field.lastName' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="lastName" name="lastName" value="${user.lastName}" readonly>
	                                                        </div>
	                                                        <div class="control-label col-md-2">
	                                                            <fmt:message key='bc.application.control.label.col.md2.Email' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="email" name="email"	value="${user.email}" readonly>
	                                                        </div>
	                                                        <div class="col-md-offset-1"></div>
	                                                    </div>
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.register.form.field.investAs' />  <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="investAs" name="investAs" value="${user.investAs}" readonly>
	                                                        </div>
	                                                        <div class="control-label col-md-2">
	                                                            <fmt:message key='buyer.apply.form.field.gender' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <select name="gender" class="form-control if-input-sm if-div-input-md" data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.gender.required'/>">
																	<option value=""></option>
																	<c:forEach var="item" items="${genderList}" varStatus="status">
																		<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																	</c:forEach>
																</select>
	                                                        </div>
	                                                        <div class="col-md-offset-1"></div>
	                                                    </div>
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.dob' />  <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3 if-input-md">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md date-picker" id="dob" name="dob" autocomplete="off" data-rule-required="true" data-msg-required="<fmt:message key='buyer.apply.form.field.dob.required'/>" data-rule-pattern="^(((0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])/(29|30)|(0[13578]|1[02])/31)/(?!0000)[0-9]{4}|02/29/([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$" data-msg-pattern="<fmt:message key='buyer.apply.form.field.dob.pattern'/>" data-rule-isBeforeToday="true" data-msg-isBeforeToday="<fmt:message key='buyer.apply.form.field.dob.isBeforeToday'/>" data-rule-isAdult="true"  
																data-msg-isAdult="<fmt:message key='buyer.apply.form.field.dob.isAdult'/>" readonly />
																<div id="error-dob"></div>	
	                                                        </div>
	                                                        <div class="control-label col-md-2">
	                                                            <fmt:message key='buyer.apply.form.field.nationality' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <select id="nationality" name="nationality" class="form-control if-input-sm if-div-input-md"
	                                                                data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.nationality.required'/>">
																	<option value=""></option>
																	<c:forEach var="item" items="${countryList}" varStatus="status">
																		<%-- <option value="${item.code}">${item.name}</option> --%>
																		<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																	</c:forEach>
																</select>
	                                                        </div>
	                                                        <div class="col-md-offset-1"></div>
	                                                    </div>
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.residenceCountry' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <select id="residenceCountry" name="residenceCountry" class="form-control if-input-sm if-div-input-md" data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.residenceCountry.required'/>">
																	<option value=""></option>
																	<c:forEach var="item" items="${countryList}" varStatus="status">
																		<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																	</c:forEach>
																</select>
	                                                        </div>
	                                                        <div class="control-label col-md-2">
	                                                            <fmt:message key='buyer.apply.form.field.idType' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <select id="idType" name="idType" class="form-control if-input-sm if-div-input-md" 
	                                                            data-rule-required="true"
																data-msg-required="<fmt:message key='buyer.apply.form.field.idType.required'/>">
																	<option value=""></option>
																	<c:forEach var="item" items="${idTypeList}" varStatus="status">
																		<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																	</c:forEach>
																</select>
	                                                        </div>
	                                                        <div class="col-md-offset-1"></div>
	                                                    </div>
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.idNumber' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md"id="idNumber"
																	name="idNumber" placeholder="" data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.idNumber.required'/>"
																	data-rule-pattern="^[0-9a-zA-Z]{7,12}$"
																	data-msg-pattern="<fmt:message key='buyer.apply.form.field.idNumber.pattern'/>">
	                                                        </div>
	                                                        <div class="control-label col-md-2">
	                                                            <fmt:message key='buyer.apply.form.field.workPhone' />
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left" id="workCountryCode"
																	name="workCountryCode" value="${user.workCountryCode}"   data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='buyer.apply.form.field.workCountryCode.pattern'/>"
																	<c:if test="${not empty user.workPhone}"> readonly</c:if> />
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right" id="phone" name="phone"
																	value="${user.workPhone}" data-rule-required="false"
																	data-rule-number="true"
																	data-rule-pattern="^[0-9]{5,15}$"
																	data-msg-pattern="<fmt:message key='buyer.apply.form.field.workPhone.pattern'/>"
																	<c:if test="${not empty user.workPhone}"> readonly</c:if> />
	                                                        </div>
	                                                        <div class="col-md-offset-1"></div>
	                                                    </div>
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.register.form.field.mobilePhone.placeholder' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left" id="mobileCountryCode"
																	name="mobileCountryCode" value="${user.mobileCountryCode}" readonly>
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right" id="mobilePhone"
																	name="mobilePhone" value="${user.mobilePhone}" readonly>
	                                                        </div>
	                                                    </div>
                                                    </form>
                                                </div>
                                                <!-- End tab1: Personal information-->
                                                <!-- Begin tab2: Further details-->
                                                <div class="tab-pane" id="tab2">
	                                                <form class="form-horizontal" id="form-further-details"
														method="post" enctype="multipart/form-data">
	                                                    <!-- row 1 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.companyName' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="companyName"
																	name="companyName" maxlength="255"
																	placeholder=""
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.companyName.required'/>">
	                                                        </div>
	                                                        <div class="control-label col-md-3">
	                                                            <fmt:message key='buyer.apply.form.field.isComVietnam' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                          <select class="form-control if-input-sm if-div-input-md" id="isComVietnam" name="isComVietnam"
																data-rule-required="true"
																data-msg-required="<fmt:message key='buyer.apply.form.field.isComVietnam.required'/>">
																<option value=""></option>
																<c:forEach var="item" items="${isComVietnamList}"
																	varStatus="status">
																	<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																</c:forEach>
															  </select>
	                                                        </div>
	                                                    </div>
	                                                    <!-- row 2 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-3 if-control-label-multiple-line">
	                                                            <fmt:message key='buyer.apply.form.field.comRegisteredCountry' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                        <select class="form-control if-input-sm if-div-input-md" id="comRegisteredCountry" name="comRegisteredCountry"
																data-rule-required="true" disabled="disabled"
																data-msg-required="<fmt:message key='buyer.apply.form.field.comRegisteredCountry.required'/>">
																<option value=""></option>
																<c:forEach var="item" items="${countryList}" varStatus="status">
																	<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																</c:forEach>
															</select>
	                                                        </div>
	                                                        <div class="control-label col-md-3 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.comRegistrationNumber' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comRegistrationNumber" name="comRegistrationNumber"
																	placeholder=""
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.comRegistrationNumber.required'/>"
																	data-rule-pattern="^[0-9a-zA-Z]{8,12}$"
																	data-msg-pattern="<fmt:message key='buyer.apply.form.field.comRegistrationNumber.pattern'/>">
	                                                        </div>
	                                                    </div>
	                                                    <!-- row 3 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-3 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.comTaxCode' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comTaxCode"
																	name="comTaxCode"
																	placeholder=""
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.comTaxCode.required'/>"
																	data-rule-pattern="^[0-9a-zA-Z]{8,12}$"
																	data-msg-pattern="<fmt:message key='buyer.apply.form.field.comTaxCode.pattern'/>">
	                                                        </div>
	                                                        <div class="control-label col-md-3">
	                                                            <fmt:message key='buyer.apply.form.field.comEstablishmentDate' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
																<input type="text" class="form-control if-input-sm if-div-input-md date-picker" id="comEstablishmentDate" name="comEstablishmentDate" 
																	autocomplete="off" data-rule-required="true" 
																	data-msg-required="<fmt:message key='buyer.apply.form.field.comEstablishmentDate.required'/>"
																	data-msg-pattern="<fmt:message key='buyer.apply.form.field.comEstablishmentDate.pattern'/>"
																	data-rule-pattern="^(((0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])/(29|30)|(0[13578]|1[02])/31)/(?!0000)[0-9]{4}|02/29/([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$" 
																	data-rule-isBeforeToday="true" 
																	data-msg-isBeforeToday="<fmt:message key='buyer.apply.form.field.comEstablishmentDate.isBeforeToday'/>" readonly />
																	<div id="error-comEstablishmentDate"></div>
	                                                        </div>
	                                                    </div>
	                                                    <!-- row 4 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-3 if-control-label-multiple-line">
	                                                            <fmt:message key='buyer.apply.form.field.comDurationInVt' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                          <select class="form-control if-input-sm if-div-input-md" id="comDurationInVt" name="comDurationInVt"
																data-rule-required="true"
																data-msg-required="<fmt:message key='buyer.apply.form.field.comDurationInVt.required'/>">
																<option value=""></option>
																<c:forEach var="item" items="${comDurationList}"
																	varStatus="status">
																	<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																</c:forEach>
															  </select>
	                                                        </div>
	                                                        <div class="control-label col-md-3">
	                                                            <fmt:message key='buyer.apply.form.field.comAddress' />  <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comAddress"
																	name="comAddress" maxlength="255"
																	placeholder=""
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.comAddress.required'/>">
	                                                        </div>
	                                                    </div>
	                                                    <!-- row 5 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-3 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.comDistrict' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comDistrict"
																	name="comDistrict" maxlength="255"
																	placeholder=""
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.comDistrict.required'/>">
	                                                        </div>
	                                                        <div class="control-label col-md-3">
	                                                            <fmt:message key='buyer.apply.form.field.comCity' />  <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comCity"
																	name="comCity" maxlength="255"
																	placeholder=""
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.comCity.required'/>">
	                                                        </div>
	                                                    </div>
	                                                    <!-- row 6 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-3 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.comRegion' />
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comRegion"
																	name="comRegion" maxlength="255"
																	placeholder="">
	                                                        </div>
	                                                        <div class="control-label col-md-3">
	                                                            <fmt:message key='buyer.apply.form.field.comPostcode' />
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comPostcode"
																	name="comPostcode"
																	placeholder=""
																	data-rule-required="false"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.comPostcode.required'/>"
																	data-rule-pattern="^.{4,8}$"
																	data-msg-pattern="<fmt:message key='buyer.apply.form.field.comPostcode.pattern'/>">
	                                                        </div>
	                                                    </div>
	                                                    <!-- row 7 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.comCountry' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <select class="form-control if-input-sm if-div-input-md" id="comCountry" name="comCountry"
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.comCountry.required'/>">
																	<option value=""></option>
																	<c:forEach var="item" items="${countryList}" varStatus="status">
																		<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																	</c:forEach>
																</select>
	                                                        </div>
	                                                    </div>
	                                                    <!-- row 8 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-3 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.isComAddress2' />
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                            <input type="checkbox" id="isComAddress2" class="form-control if-input-sm if-div-input-md" name="isComAddress2" />
	                                                            <input type="hidden"   id="address2" name="address2" />
	                                                        </div>
	                                                    </div>
	                                                    <div id="different" style="display:none;">
		                                                    <!-- row 9 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.address' /> <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="address"
																		name="address" maxlength="255"
																		placeholder=""
																		data-rule-required="false"
																		data-rule-email="false"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.address.required'/>">
		                                                        </div>
		                                                        <div class="control-label col-md-3">
		                                                            <fmt:message key='buyer.apply.form.field.district2' /> <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="district2"
																		name="district2" maxlength="255"
																		placeholder=""
																		data-rule-required="false"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.district2.required'/>">
		                                                        </div>
		                                                    </div>
		                                                    <!-- row 10 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.city2' /> <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="city2" name="city2"
																		maxlength="255"
																		placeholder=""
																		data-rule-required="false"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.city2.required'/>">
		                                                        </div>
		                                                        <div class="control-label col-md-3" style="display: inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.region2' />
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="region2"
																		name="region2" maxlength="255"
																		placeholder="">
		                                                        </div>
		                                                    </div>
		                                                    <!-- row 11 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.country2' /> <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <select class="form-control if-input-sm if-div-input-md" id="country2" name="country2" data-rule-required="false"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.country2.required'/>">
																		<option value=""></option>
																		<c:forEach var="item" items="${countryList}" varStatus="status">
																			<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																		</c:forEach>
																	</select>
		                                                        </div>
		                                                        <div class="control-label col-md-3" style="display: inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.postcode' />
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="postcode"
																		name="postcode"
																		placeholder=""
																		data-rule-required="false"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.postcode.required'/>"
																		data-rule-pattern="^.{4,8}$"
																		data-msg-pattern="<fmt:message key='buyer.apply.form.field.comPostcode.pattern'/>">
		                                                        </div>
		                                                    </div>
	                                                    </div>
	                                                    <!-- row 12 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-3 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.comType' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                          <select class="form-control if-input-sm if-div-input-md" id="comType" name="comType" data-rule-required="true"
																data-msg-required="<fmt:message key='buyer.apply.form.field.comType.required'/>">
																<option value=""></option>
																<c:forEach var="item" items="${comTypeList}" varStatus="status">
																	<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																</c:forEach>
															  </select>
	                                                        </div>
	                                                        <div class="control-label col-md-3 if-control-label-multiple-line" style="display: inline-block">
	                                                            <fmt:message key='buyer.apply.form.field.comIndustry' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                          <select class="form-control if-input-sm if-div-input-md" id="comIndustry" name="comIndustry"
																data-rule-required="true"
																data-msg-required="<fmt:message key='buyer.apply.form.field.comIndustry.required'/>">
																<option value=""></option>
																<c:forEach var="item" items="${comIndustryList}"
																	varStatus="status">
																	<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																</c:forEach>
															  </select>
	                                                        </div>
	                                                    </div>
	                                                    <c:forEach var="question" items="${questions2}" varStatus="status">
															<c:set var="idx" value="${status.index+fn:length(questions)}" />
															<c:set var="idx1" value="${status.index}"/>
															<c:if test="${idx1%2 == 0}">
															  <div class="form-group if-form-group-sm">
																<div class="control-label col-md-3 if-control-label-md">
																	${question[self.i18n.question_qtext]}<span class="required">*</span>
																</div>
																<input type="hidden" name="questions[${idx}].qid" value="${question.id}" /> 
																<input type="hidden" name="questions[${idx}].qname" value="${question.qname}" />
																<c:if test="${question.atype == 'text' }">
																	<div class="col-md-3">
																		<input type="text" class="form-control if-input-sm if-div-input-md" name="questions[${idx}].atext" 
																		data-rule-required="true" 
																		data-msg-required="<fmt:message key='buyer.apply.form.field.question${idx}.required'/>">
																	</div>
																</c:if>
																<c:if test="${question.atype == 'select' }">
																	<div class="col-md-3">
																		<select name="questions[${idx}].atext" class="form-control if-input-sm if-div-input-md"  id="question${idx}" 
																		data-rule-required="true" 
																		data-msg-required="<fmt:message key='buyer.apply.form.field.question${idx}.required'/>">
																			<option value=""></option>
																			<c:forEach var="questionOption" items="${question.options}">
																				<option value="${questionOption[self.i18n.question_atext]}">${questionOption[self.i18n.question_atext]}</option>
																			</c:forEach>
																		</select>
																	</div>
																</c:if>
															</c:if>
															<c:if test="${idx1%2 != 0}">
																<div class="control-label col-md-3 if-control-label-multiple-line">
																	${question[self.i18n.question_qtext]}<span class="required">*</span>
																</div>
																<input type="hidden" name="questions[${idx}].qid" value="${question.id}" /> 
																<input type="hidden" name="questions[${idx}].qname" value="${question.qname}" />
																<c:if test="${question.atype == 'text' }">
																	<div class="col-md-3">
																		<input type="text" class="form-control if-input-sm if-div-input-md" name="questions[${idx}].atext" 
																		data-rule-required="true" 
																		data-msg-required="<fmt:message key='buyer.apply.form.field.question${idx}.required'/>">
																	</div>
																</c:if>
																<c:if test="${question.atype == 'select' }">
																	<div class="col-md-3">
																		<select name="questions[${idx}].atext" class="form-control if-input-sm if-div-input-md"  id="question${idx}"
																		data-rule-required="true" 
																		data-msg-required="<fmt:message key='buyer.apply.form.field.question${idx}.required'/>">
																			<option value=""></option>
																			<c:forEach var="questionOption" items="${question.options}">
																				<option value="${questionOption[self.i18n.question_atext]}">${questionOption[self.i18n.question_atext]}</option>
																			</c:forEach>
																		</select>
																	</div>
																</c:if>
															  </div>
															</c:if>
														</c:forEach>
												        <c:if test="${user.fromChannels == 'Introduced from BANK/ENTITY staff' }">
															<div class="control-label col-md-3">
																<fmt:message key='buyer.apply.form.field.whichBusFrom' />: <span class="required">*</span>
															</div>
															<div class="col-md-3">
																<select id="comWhichBusFrom" name="comWhichBusFrom" class="form-control if-input-sm if-div-input-md" 
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.whichBusFrom.required'/>">
																	<option value=""></option>
																	<c:forEach var="item" items="${businessFromList}" varStatus="status">
																		<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																	</c:forEach>
																</select>
															</div>
														</c:if>
														</div>                                                  
	                                                    <!-- row 16 -->
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-3 if-control-label-md">
	                                                            <fmt:message key='buyer.apply.form.field.position' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
	                                                          <select class="form-control if-input-sm if-div-input-md" id="position" name="position" data-rule-required="true"
																data-msg-required="<fmt:message key='buyer.apply.form.field.position.required'/>">
																<option value=""></option>
																<c:forEach var="item" items="${positionList}"
																	varStatus="status">
																	<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																</c:forEach>
															</select>
	                                                        </div>
	                                                        <div class="control-label col-md-3 if-control-label-multiple-line" style="display: inline-block">
	                                                            <fmt:message key='buyer.apply.form.field.areAuthorizedPerson' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
															   <select class="form-control if-input-sm if-div-input-md" id="areAuthorizedPerson" name="areAuthorizedPerson"
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.areAuthorizedPerson.required'/>">
																	<option value=""></option>
																	<c:forEach var="item" items="${isComVietnamList}"
																		varStatus="status">
																		<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																	</c:forEach>
																</select>
																<div id="ifNoSpecifyTip" style="font-size: 9px; font-weight: bold; font-style: oblique;color:#f00;">
																	<fmt:message key='buyer.apply.form.field.ifNoSpecifyPersonalInfo.tipmsg' />
																</div>
	                                                        </div>
	                                                    </div>
	                                                    <div id="rowtoend" style="display:none;">   
		                                                    <!-- row 17 
		                                                    <div class="form-group if-form-group-sm" style="padding-left:35px;">
		                                                        <fmt:message key='buyer.apply.form.field.ifNoSpecifyPersonalInfo.tipmsg' />:
		                                                    </div>-->                                                    
		                                                    <!-- row 18 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.authzTitle' /> <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <select class="form-control if-input-sm if-div-input-md"
																		id="authzTitle" name="authzTitle"
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzTitle.required'/>">
																		<option value=""></option>
																		<c:forEach var="item" items="${titleList}"
																			varStatus="status">
																			<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																		</c:forEach>
																	</select>
																</div>
		                                                        <div class="control-label col-md-3" style="display: inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.authzFirstName' /><span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="authzFirstName"
																		name="authzFirstName" maxlength="50"
																		placeholder=""
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzFirstName.required'/>">
		                                                        </div>
		                                                    </div>                                                    
		                                                    <!-- row 19 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.authzLastName' /><span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="authzLastName"
																		name="authzLastName" maxlength="50"
																		placeholder=""
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzLastName.required'/>">
		                                                        </div>
		                                                        <div class="control-label col-md-3" style="display: inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.authzEmail' /><span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="authzEmail"
																		name="authzEmail" maxlength="255"
																		placeholder=""
																		data-rule-required="true" data-rule-email="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzEmail.required'/>">
		                                                        </div>
		                                                    </div>                                                    
		                                                    <!-- row 20 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.authzPositon' /> <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="authzPositon"
																		name="authzPositon" maxlength="255"
																		placeholder=""
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzPositon.required'/>">
		                                                        </div>
		                                                        <div class="control-label col-md-3" style="display: inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.authzGender' /> <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <select class="form-control if-input-sm if-div-input-md" id="authzGender" name="authzGender"
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzGender.required'/>">
																		<option value=""></option>
																		<c:forEach var="item" items="${genderList}" varStatus="status">
																			<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																		</c:forEach>
																	</select>
		                                                        </div>
		                                                    </div>                                                    
		                                                    <!-- row 21 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3" style="display:inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.authzDob' />  <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3 if-input-md">
																	<input type="text" class="form-control if-input-sm if-div-input-md date-picker" id="authzDob" 
																		name="authzDob" 
																		autocomplete="off" data-rule-required="true" 
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzDob.required'/>" 
																		data-rule-pattern="^(((0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])/(29|30)|(0[13578]|1[02])/31)/(?!0000)[0-9]{4}|02/29/([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$" 
																		data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzDob.pattern'/>" 
																		data-rule-isBeforeToday="true" 
																		data-msg-isBeforeToday="<fmt:message key='buyer.apply.form.field.authzDob.isBeforeToday'/>" 
																		data-rule-isAdult="true"  
																		data-msg-isAdult="<fmt:message key='buyer.apply.form.field.dob.isAdult'/>" readonly />
																	<div id="error-authzDob"></div>
		                                                        </div>
		                                                        <div class="control-label col-md-3" style="display: inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.authzNationality' /><span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <select class="form-control if-input-sm if-div-input-md" id="authzNationality" name="authzNationality"
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzNationality.required'/>">
																		<option value=""></option>
																		<c:forEach var="item" items="${countryList}" varStatus="status">
																			<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																		</c:forEach>
																	</select>
		                                                        </div>
		                                                    </div>
		                                                    <!-- row 22 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.authzResidenceCountry' /><span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <select class="form-control if-input-sm if-div-input-md" id="authzResidenceCountry" name="authzResidenceCountry"
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzResidenceCountry.required'/>">
																		<option value=""></option>
																		<c:forEach var="item" items="${countryList}" varStatus="status">
																			<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																		</c:forEach>
																	</select>
		                                                        </div>
		                                                        <div class="control-label col-md-3" style="display: inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.authzIdType' /><span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <select class="form-control if-input-sm if-div-input-md" id="authzIdType" name="authzIdType"
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzIdType.required'/>">
																		<option value=""></option>
																		<c:forEach var="item" items="${idTypeList}" varStatus="status">
																			<option value="${item.code}">${item[self.i18n.catalog_name]}</option>
																		</c:forEach>
																	</select>
		                                                        </div>
		                                                    </div>
		                                                    <!-- row 23 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.authzIdNumber' />  <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="authzIdNumber"
																		name="authzIdNumber"
																		placeholder="<fmt:message key='buyer.apply.form.field.authzIdNumber.placeholder'/>"
																		data-rule-required="true"
																		data-msg-required="<fmt:message key='buyer.apply.form.field.authzIdNumber.required'/>"
																		data-rule-pattern="^[0-9a-zA-Z]{7,12}$"
																		data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzIdNumber.pattern'/>">
		                                                        </div>
		                                                        <div class="control-label col-md-3" style="display: inline-block">
		                                                            <fmt:message key='buyer.apply.form.field.authzPhone' />
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                          <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left" id="auPhCountryCode"
																	name="auPhCountryCode"  data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='buyer.apply.form.field.auPhCountryCode.pattern'/>">
		                                                          <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right" id="authzPhone" name="authzPhone"
																	placeholder=""
																	data-rule-required="false"
																	data-rule-pattern="^[0-9]{5,15}$"
																	data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzPhone.pattern'/>">
		                                                        </div>
		                                                    </div>
		                                                    <!-- row 24 -->
		                                                    <div class="form-group if-form-group-sm">
		                                                        <div class="control-label col-md-3 if-control-label-md">
		                                                            <fmt:message key='buyer.apply.form.field.authzMobilePhone' /> <span class="required">*</span>
		                                                        </div>
		                                                        <div class="col-md-3">
		                                                          <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left" id="auMoCountryCode"
																	name="auMoCountryCode"  data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='buyer.apply.form.field.auMoCountryCode.pattern'/>">
		                                                          <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right" id="authzMobilePhone"
																	name="authzMobilePhone"
																	placeholder=""
																	data-rule-required="true"
																	data-msg-required="<fmt:message key='buyer.apply.form.field.authzMobilePhone.required'/>"
																	data-rule-pattern="^[0-9]{5,15}$"
																	data-msg-pattern="<fmt:message key='buyer.apply.form.field.authzMobilePhone.pattern'/>">
		                                                        </div>
		                                                    </div>
	                                                    </div>
                                                    </form>
                                                </div>
                                                <!-- End tab2: Further details-->
                                                <!-- Begin tab3: Documents-->
                                                <div class="tab-pane" id="tab3">
                                                	<form class="form-horizontal" method="POST"
														id="form-authorizedfile-info" enctype="multipart/form-data">
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
	                                                          <fmt:message key='buyer.apply.form.field.authorizedFile' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3">
																<span class="file-extend">
																	<span class="fileinput-button" style="display:block;width:72px;height:20px;">
																		<span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
			                                                            <input type="file" class="if-input-sm if-div-input-md" id="authorizedFile" name="file" multiple> 
			                                                            <input type="hidden" id="file-type-authorizedFile" name="fileType"
																			value="${self.docBiztypePrefix}idcard_authorizedPerson" />
																	</span>
																</span>
																<div id="file-link-authorizedFile" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
																<div id="error-authorizedFileId" style="clear:both;"></div>
	                                                        </div>
	                                                    </div>
                                                    </form>
                                                    <form class="form-horizontal" method="POST"
														id="form-signedfile-info" enctype="multipart/form-data">
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
	                                                            <fmt:message key='buyer.apply.form.field.signedLetterFile' /><span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3 filediv">
																<span class="file-extend">
																	<span class="fileinput-button" style="display:block;width:72px;height:20px;">
																		<span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
			                                                            <input type="file" class="if-input-sm if-div-input-md" id="signedLetterFile" name="file" multiple> 
			                                                            <input type="hidden" id="file-type-signedLetterFile" name="fileType"
																			value="${self.docBiztypePrefix}signed_signedLegal" />
																	</span>
																</span>
																<div id="file-link-signedLetterFile" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
																<div id="error-signedLetterFileId" style="clear:both;"></div>
	                                                        </div>
	                                                    </div>
                                                    </form>
                                                    <form class="form-horizontal" id="form-taxcodefile-info"
														method="POST" enctype="multipart/form-data">
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
	                                                            <fmt:message key='buyer.apply.form.field.taxCodeFile' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3 filediv">
																<span class="file-extend">
																	<span class="fileinput-button" style="display:block;width:72px;height:20px;">
																		<span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
			                                                            <input type="file" class="if-input-sm if-div-input-md" id="taxCodeFile" name="file" multiple> 
			                                                            <input type="hidden" id="file-type-taxCodeFile" name="fileType"
																			value="${self.docBiztypePrefix}taxcode_companyTaxCode" />
																	</span>
																</span>
																<div id="file-link-taxCodeFile" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
																<div id="error-taxCodeFileId" style="clear:both;"></div>
		                                                    </div>
	                                                    </div>
                                                    </form>
                                                    <form class="form-horizontal" method="POST"
														id="form-cmplicensefile-info" enctype="multipart/form-data">
	                                                    <div class="form-group if-form-group-sm">
	                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
	                                                            <fmt:message key='buyer.apply.form.field.companyLicenseFile' /> <span class="required">*</span>
	                                                        </div>
	                                                        <div class="col-md-3 filediv">
																<span class="file-extend">
																	<span class="fileinput-button" style="display:block;width:72px;height:20px;">
																		<span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
			                                                            <input type="file" class="if-input-sm if-div-input-md" id="companyLicenseFile" name="file" multiple> 
			                                                            <input type="hidden" id="file-type-companyLicenseFile" name="fileType"
																			value="${self.docBiztypePrefix}license_companyLicense" />
																	</span>
																</span>
																<div id="file-link-companyLicenseFile" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
																<div id="error-companyLicenseFileId" style="clear:both;"></div>
	                                                        </div>
	                                                    </div>
                                                    </form>
                                                    <form style="display: none;" id="form-file-hidden">
														<input type="hidden" name="documents[1].id" id="authorizedFileId"
															data-rule-required="true"
															data-msg-required="<fmt:message key='buyer.apply.form.field.authorizedFileId.required'/>">
														<input type="hidden" name="documents[1].dispOrder" value="2">
								
														<input type="hidden" name="documents[2].id"
															id="signedLetterFileId" data-rule-required="true"
															data-msg-required="<fmt:message key='buyer.apply.form.field.signedLetterFileId.required'/>">
														<input type="hidden" name="documents[2].dispOrder" value="3">
								
														<input type="hidden" name="documents[3].id"
															id="companyLicenseFileId" data-rule-required="true"
															data-msg-required="<fmt:message key='buyer.apply.form.field.companyLicenseFileId.required'/>">
														<input type="hidden" name="documents[3].dispOrder" value="4">
								
														<input type="hidden" name="documents[4].id" id="taxCodeFileId"
															data-rule-required="true"
															data-msg-required="<fmt:message key='buyer.apply.form.field.taxCodeFileId.required'/>">
														<input type="hidden" name="documents[4].dispOrder" value="5">
													</form>
                                                </div>
                                                <!-- End tab3: Documents-->
                                                <!-- Begin tab4: Terms and Conditions-->
                                                <div class="tab-pane" id="tab4">
	                                                <form class="form-horizontal" id="form-terms-conditions"
														method="POST" enctype="multipart/form-data">
	                                                  <div class="form-group if-form-group-sm">
	                                                    <div style="height: 220px; max-height: 220px; overflow: auto; padding: 10px 10px; background: white; border: solid #B3AA9F thin; ">
																<h6>
																	<fmt:message key='buyer.apply.form.field.title.h6' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.modifiedTime' />
																	(<a href="../../policies/terms/archive/"><fmt:message
																			key='buyer.apply.form.field.modified.a' /></a>)
																</p>
																<h6>
																	<fmt:message
																		key='buyer.apply.form.field.content.welcome' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p1' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p2' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p3' />
																</p>
																<h6 id="toc-services">
																	<fmt:message key='buyer.apply.form.field.content.using' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p4' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p5' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p6' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p7' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p8' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p9' />
																</p>
																<h6 id="toc-account">
																	<fmt:message
																		key='buyer.apply.form.field.content.account' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p10' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p11' />
																	<a
																		href="http://support.google.com/accounts/bin/answer.py?hl=en&amp;answer=58585">
																		<fmt:message key='buyer.apply.form.field.content.p11.a' />
																	</a>.
																</p>
																<h6 id="toc-
															protection">
																	<fmt:message
																		key='buyer.apply.form.field.content.privacy' />
																</h6>
																<p>
																	<fmt:message
																		key='buyer.apply.form.field.content.p12.goole' />
																	<a href="../../policies/privacy/"><fmt:message
																			key='buyer.apply.form.field.content.p12.a' /></a>
																	<fmt:message key='buyer.apply.form.field.content.p12' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p13' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p14' />
																	<a
																		href="http://support.google.com/bin/static.py?hl=en&amp;ts=1114905&amp;page=ts.c 
															s"><fmt:message
																			key='buyer.apply.form.field.content.p14.a' /></a>.
																</p>
																<h6 id="toc-content">
																	<fmt:message
																		key='buyer.apply.form.field.content.yourContent' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p15' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p16' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p17' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p18' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p19' />
																</p>
																<h6 id="toc-
															software">
																	<fmt:message
																		key='buyer.apply.form.field.content.aboutSoftware' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p20' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p21' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p22' />
																</p>
																<h6 id="toc-
															modification">
																	<fmt:message
																		key='buyer.apply.form.field.content.modifying' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p23' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p24' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p25' />
																</p>
																<h6 id="toc-
															warranties-disclaimers">
																	<fmt:message
																		key='buyer.apply.form.field.content.ourWarranties' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p26' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p27' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p28' />
																</p>
																<h6 id="toc-
															liability">
																	<fmt:message
																		key='buyer.apply.form.field.content.liability' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p29' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p30' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p31' />
																</p>
																<h6 id="toc-business-
															uses">
																	<fmt:message
																		key='buyer.apply.form.field.content.business' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p32' />
																</p>
																<h6 id="toc-
															about">
																	<fmt:message
																		key='buyer.apply.form.field.content.aboutThese' />
																</h6>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p33' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p34' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p35' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p36' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p37' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p38' />
																</p>
																<p>
																	<fmt:message key='buyer.apply.form.field.content.p39' />
																	<a href="../../contact/"><fmt:message
																			key='buyer.apply.form.field.content.p39.a' /></a>.
																</p>
															</div>
	                                                  </div>
	                                                  <div class="form-group" style="margin-top: 10px">
	                                                    <input type="checkbox" id="checkbox-accept" class="form-control if-input-sm if-div-input-md">&nbsp;&nbsp;&nbsp;<span class="bold"><fmt:message key='buyer.apply.form.field.content.agree' /></span>
	                                                  </div>
                                                  </form>
                                                </div>
                                                <!-- End tab4: Terms and Conditions-->
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="row">
                                               <div id="btnHandle" class="col-md-12 text-center">
                                                    <a href="javascript:;" class="btn default button-previous" style="margin-right: 3px">
                                                        <fmt:message key='bc.application.button.back' />
                                                    </a>
                                                    <a id="saveApplication" class="btn default" style="margin-right: 3px">
                                                        <fmt:message key='bc.application.button.save' /></i>
                                                    </a>
                                                    <a href="javascript:;" class="btn default button-next">
                                                        <fmt:message key='bc.application.button.continue' />
                                                    </a>
                                                    <a id="submitApplication" class="btn default button-submit">
                                                        <fmt:message key='bc.application.button.submit' />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-validation/js/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-validation/js/additional-methods.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/select2/select2.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <!-- END PAGE LEVEL PLUGINS -->

    <script src="${base}/static/libs/metronic/3.3.0/assets/global/scripts/metronic.js"></script>
    <script src="${base}/static/libs/metronic/3.3.0/assets/admin/pages/scripts/components-pickers.js"></script>
    <script src="${base}/static/themes/metronic/js/layout.js"></script>
    <script src="${base}/static/themes/metronic/js/quick-sidebar.js"></script>
    <script src="${base}/static/themes/metronic/js/buyer/account/buyerApplication.js"></script>
	<script src="${base}/static/themes/metronic/js/ifactor.js"></script>
	<script src="${base}/static/themes/metronic/js/common.js"></script>
	<script src="${base}/static/themes/metronic/js/String.prototype.js"></script>
	<script src="${base}/static/themes/metronic/js/Date.prototype.js"></script>
	<script src="${base}/static/themes/metronic/js/jquery.validate.custom.js"></script>
	<script src="${base}/static/themes/metronic/js/buyer/account/apply-as-buyer.js"></script>
	<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.iframe-transport.js"></script>
	<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload.js"></script>
	<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload-process.js"></script>
	<script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload-validate.js"></script>
	<script>
        jQuery(document).ready(function () {
            Metronic.init(); // init metronic core components
            Layout.init(); // init current layout
            ComponentsPickers.init();
            FormWizard.init();
            $('#btnHandle').find('.button-submit').hide();
            $('#ifNoSpecifyTip').hide();
        });
        
        var app = {
    			base : '${base}',
    			version : '${version.app}',
    			loginName : '${loginUser.loginName}',
    			selfUrl : '${self.url}',
    			operator : 'apply',
    			errorMsg : {
    				question0 : "<fmt:message key='buyer.apply.form.field.question0.required'/>",
    				question1 : "<fmt:message key='buyer.apply.form.field.question1.required'/>",
    				question2 : "<fmt:message key='buyer.apply.form.field.question2.required'/>",
    				question3 : "<fmt:message key='buyer.apply.form.field.question3.required'/>",
    				question4 : "<fmt:message key='buyer.apply.form.field.question4.required'/>",
    				question5 : "<fmt:message key='buyer.apply.form.field.question5.required'/>",
    				question6 : "<fmt:message key='buyer.apply.form.field.question6.required'/>",
    				question7 : "<fmt:message key='buyer.apply.form.field.question7.required'/>",
    				question8 : "<fmt:message key='buyer.apply.form.field.question8.required'/>",
    				question9 : "<fmt:message key='buyer.apply.form.field.question9.required'/>",
    				question10 : "<fmt:message key='buyer.apply.form.field.question10.required'/>",
    				question11 : "<fmt:message key='buyer.apply.form.field.question11.required'/>",
    				question12 : "<fmt:message key='buyer.apply.form.field.question12.required'/>",
    				question13 : "<fmt:message key='buyer.apply.form.field.question13.required'/>",
    				question14 : "<fmt:message key='buyer.apply.form.field.question14.required'/>",
    				question15 : "<fmt:message key='buyer.apply.form.field.question15.required'/>",
    				mailAddress : "<fmt:message key='buyer.apply.form.field.address.required'/>",
    				comDistrict2 : "<fmt:message key='buyer.apply.form.field.comDistrict2.required'/>",
    				comRegion2 : "<fmt:message key='buyer.apply.form.field.comRegion2.required'/>",
    				comCity2 : "<fmt:message key='buyer.apply.form.field.comCity2.required'/>",
    				comCountry2 : "<fmt:message key='buyer.apply.form.field.comCountry2.required'/>",
    				comPostcode2 : "<fmt:message key='buyer.apply.form.field.comPostcode2.required'/>"
    			},

    			successSavedMsg : "<fmt:message key='buyer.apply.message.successSaved'/>",
    			successUpdatedMsg : "<fmt:message key='buyer.apply.message.successUpdated'/>",
    			successSubmittedMsg : "<fmt:message key='buyer.apply.message.successSubmitted'/>",
    			successRedirectMsg : "<fmt:message key='buyer.apply.message.successRedirectMsg'/>",
    			tab1:"<fmt:message key='buyer.apply.tab.personal'/>",
    			tab2:"<fmt:message key='buyer.apply.tab.further'/>",
    			tab3:"<fmt:message key='buyer.apply.tab.documents'/>",
    			tab4:"<fmt:message key='buyer.apply.tab.terms'/>",
  			  	formIds:[{id:'form-personal-info'},{id:'form-further-details'}, {id:'form-file-hidden'},{id:'form-terms-conditions'}]
    		};
        
        $("#table1").removeAttr("href");
        $("#table2").removeAttr("href");
        $("#table3").removeAttr("href");
        $("#table4").removeAttr("href");
        
    </script>

    <!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
