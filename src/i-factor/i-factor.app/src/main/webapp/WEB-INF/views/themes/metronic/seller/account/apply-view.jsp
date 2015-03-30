<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/metronic/include/i18n.jsp"%>

<spring:eval var="idTypeList" expression="@catalogService.findIdType().children" />
<spring:eval var="nearestSMECenterList" expression="@catalogService.findNearestSmeCenter().children" />
<spring:eval var="invAvgAmtOptList" expression="@catalogService.findInvoiceAvgAmountOption().children" />
<spring:eval var="genderList" expression="@catalogService.findGender().children" />
<spring:eval var="countryList" expression="@catalogService.findCountry().children" />
<spring:eval var="industryList" expression="@catalogService.findIndustry().children" />
<spring:eval var="isComVietnamList" expression="@catalogService.findIsComVietnam().children" />

<c:forEach var="doc" items="${sellerApplyDocs}" varStatus="status">
  <c:set target="${self}" property="doc${doc.dispOrder}" value="${doc.id}" />
  <c:set target="${self}" property="doc${doc.dispOrder}Link">
  <a href="${base}/fileDownload/${doc.bizType}/${doc.id}<c:if test="${not empty doc.extension}">.</c:if>${doc.extension}">${doc.originalName}</a>
  </c:set>
</c:forEach>

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8" />
    <title><fmt:message key="common.topnav.title"/></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
<%--     <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" /> 
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />--%>
    <link rel="stylesheet" href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css">
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
    <!-- END GLOBAL MANDATORY STYLES -->
        
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload-ui.css">
    
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
    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png" />
    
    <style type="text/css">
    
    .form-body li a{padding:0;}
    
    </style>
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
                                                <fmt:message key='bc.application.scroller.label.danger' />
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
	      <ul class="page-sidebar-menu " data-auto-scroll="true" data-slide-speed="200">
	        <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
	        <li class="sidebar-toggler-wrapper">
	          <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
	          <div class="sidebar-toggler">
	          </div>
	          <!-- END SIDEBAR TOGGLER BUTTON -->
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
                            <a href="#"><fmt:message key='buyer.apply.page.accountManagement' /></a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#"><fmt:message key='seller.apply.view.page.breadcrumb1' /></a>
                        </li>
                    </ul>
                </div>
                <h5 class="page-title">
                    <b><fmt:message key='seller.apply.view.page.breadcrumb1' /></b>
                </h5>
                <h5 class="page-title">
                    <small><b><fmt:message key='seller.apply.view.page.breadcrumb2' />: </b> <span><fmt:formatDate value='${sellerApply.submissionDate}' pattern='MM/dd/yyyy'/> </span></small>                    
                </h5>
                <c:choose>
		        <c:when test="${sellerApply.flowStatus=='zIeeUKnBZF_oQfYjWhRHs'||sellerApply.flowStatus=='zXusSDxdAs_oQfYjWhRHs'||sellerApply.flowStatus=='wVbebSTCKW_oQfYjWhRHs'||sellerApply.flowStatus=='VmnUSmpded_oQfYjWhRHs'||sellerApply.flowStatus=='ulccaPXdZe_oQfYjWhRHs'||sellerApply.flowStatus=='mKISSmbTdc_oQfYjWhRHs'}"> 
                <h5 class="page-title">
                    <small><b><fmt:message key='seller.apply.view.page.breadcrumb4' />: </b> <span style="color: red;font-weight: bold"><fmt:message key='seller.myinvoice.detail.modification.page.status' /></span></small>                    
                </h5>
                <h5 class="page-title">
                    <small><b><fmt:message key='apply.view.page.reasonOfRejection' />: </b> <span style="color: red;"><fmt:message key='seller.apply.view.page.rejectreason' /></span></small>                    
                </h5>
                </c:when>
                <c:otherwise>
                <h5 class="page-title">
                    <small><b><fmt:message key='seller.apply.view.page.breadcrumb4' />: </b> <span style="color: green;font-weight: bold"><fmt:message key='seller.apply.view.page.breadcrumb5' /></span></small>                    
                </h5>
                </c:otherwise>
                </c:choose>
                <!-- END PAGE HEADER-->
                <!-- BEGIN PAGE CONTENT-->
                <div class="row">
                    <div class="col-md-12">
                        <div id="form_wizard_1">
                            <div class="portlet-body form">
                                <form action="#" class="form-horizontal" id="submit_form" method="POST">
                                    <div class="form-wizard">
                                        <div class="form-body">
                                            <ul class="nav nav-pills nav-justified steps">
                                                <li>
                                                    <a href="#tab1" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table1">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.one' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='buyer.apply.tab.personal' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab2" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table2">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.two' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='seller.apply.page.companyInformation' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab3" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table3">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.three' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='bc.application.nav.justified.steps4' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab4" data-toggle="tab" class="step active">
                                                      <a href="javascript:void(0)" class="step" id="table4">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.four' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.documents' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab5" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table5">
                                                        <span class="number"> <fmt:message key='s.modify.invoice.page.five' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.termsAndConditions' />
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
                                                    <fmt:message key='buyer.update.page.step-title' />
                                                </div>
                                                <div class="alert alert-danger display-none">
                                                    <button class="close" data-dismiss="alert"></button>
                                                    <fmt:message key='buyer.apply.form.field.alert_error' />
                                                </div>
                                                <div class="alert alert-success display-none">
                                                    <button class="close" data-dismiss="alert"></button>
                                                    <fmt:message key='buyer.apply.form.field.alert_success' />
                                                </div>
                                                <!-- Begin tab1: Personal information-->
                                                <div class="tab-pane active" id="tab1">
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 if-control-label-md">
                                                            <fmt:message key='seller.register.form.field.title'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="title" name="title" value="${sellerApply.title}"  disabled="disabled" />
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.register.form.field.firstName'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="firstName" name="firstName" value="${sellerApply.firstName}"  disabled="disabled" />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 if-control-label-md">
                                                            <fmt:message key='seller.register.form.field.lastName'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="lastName" name="lastName" value="${sellerApply.lastName}" disabled="disabled"  />
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                            <fmt:message key='seller.register.form.field.email'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="email" name="email" value="${sellerApply.email}"  disabled="disabled" />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                        
                                                        <div class="control-label col-md-2">
                                                            <fmt:message key='seller.apply.form.field.gender'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                            <select style="width: 120%;"  class="form-control if-input-sm if-div-input-md"  id="gender" name="gender" disabled>
								                              <option value=""> </option>
								                              <c:forEach var="item" items="${genderList}" varStatus="status"> 
								                              <option value="${item.code}"<c:if test="${sellerApply.gender==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                              </c:forEach>
									                         </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" style="margin-left: 8.7%;">
                                                           <fmt:message key='seller.apply.form.field.dob'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3 if-input-md">
												          <input type="text" class="form-control if-input-sm if-div-input-md" disabled value="<fmt:formatDate value='${sellerApply.dob}' pattern='MM/dd/yyyy'/>" />
												        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                        
                                                        <div class="control-label col-md-2">
                                                            <fmt:message key='seller.apply.form.field.nationality'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                            <select style="width: 120%;" class="form-control if-input-sm if-div-input-md"  id="nationality" name="nationality" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.nationality.required'/>"  disabled>
									                            <option value=""> </option>
									                            <c:forEach var="item" items = "${countryList}" varStatus = "status">
									                            <option value="${item.code}"<c:if test="${item.code==sellerApply.nationality}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
									                            </c:forEach>
									                         </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" style="margin-left: 8.7%;">
                                                            <fmt:message key='seller.apply.form.field.countryOfResidence'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                          <select style="width: 120%;" class="form-control if-input-sm if-div-input-md" id="countryOfResidence" name="countryOfResidence" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.countryOfResidence.required'/>"  disabled>
								                            <option value=""> </option>
								                            <c:forEach var="item" items = "${countryList}" varStatus = "status">
								                            <option value="${item.code}"<c:if test="${item.code==sellerApply.countryOfResidence}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                            </c:forEach>
									                      </select>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                       
                                                        <div class="control-label col-md-2">
                                                            <fmt:message key='seller.apply.form.field.idType'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                          <select style="width: 120%;" class="form-control if-input-sm if-div-input-md" id="idType" name="idType"  data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.idType.required'/>"  disabled>
								                            <option value=""> </option>
								                            <c:forEach var="item" items="${idTypeList}" varStatus="status"> 
								                            <option value="${item.code}"<c:if test="${sellerApply.idType==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                            </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" style="margin-left: 8.7%;">
                                                            <fmt:message key='seller.apply.form.field.idNumber'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="idNumber" name="idNumber" value="${sellerApply.idNumber}" placeholder="<fmt:message key='seller.apply.form.field.idNumber.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.idNumber.required'/>"   data-rule-pattern="^[0-9a-zA-Z]{7,12}$"
								                             data-msg-pattern="<fmt:message key='seller.apply.form.field.idNumber.pattern'/>" disabled>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                       
                                                        <div class="control-label col-md-2">
                                                          <fmt:message key='seller.register.form.field.workPhone'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left" id="workCountryCode" name="workCountryCode"  value="${sellerApply.workCountryCode}"  data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='seller.apply.form.field.workCountryCode.pattern'/>"  disabled />
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right" id="workPhone" name="workPhone" value="${sellerApply.workPhone}" data-rule-required="true"     data-rule-pattern="^[0-9]{5,15}$" 	data-msg-pattern="<fmt:message key='seller.apply.form.field.workPhone.pattern'/>"   disabled />
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.register.form.field.mobilePhone'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left"   id="mobileCountryCode" name="mobileCountryCode" value="${sellerApply.mobileCountryCode}"    data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='seller.apply.form.field.mobileCountryCode.pattern'/>"  disabled >
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right"  id="mobilePhone" name="mobilePhone" value="${sellerApply.mobilePhone}" data-rule-required="true"     data-rule-pattern="^[0-9]{5,15}$" 	data-msg-pattern="<fmt:message key='seller.apply.form.field.mobilePhone.pattern'/>"   disabled/>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2">
                                                            <fmt:message key='seller.register.form.field.position'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="position" name="position"   maxlength="255" value="${sellerApply.position}" disabled/>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                </div>
                                                <!-- End tab1: Personal information-->
                                                <!-- Begin tab2: Company information-->
                                                <div class="tab-pane" id="tab2">
                                                    <!-- row 1 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.apply.form.field.companyName'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="companyName" name="companyName"  maxlength="255" value="${sellerApply.companyName}" placeholder="<fmt:message key='seller.apply.form.field.companyName.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.companyName.required'/>"  disabled/>
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                         <fmt:message key='seller.apply.form.field.isComVietnam' /><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                            <!--<input type="text" class="form-control if-input-sm if-div-input-md" name="companyregistered" id="companyregistered" />-->
                                                          <select style="width: 120%;" class="form-control if-input-sm if-div-input-md"  id="isComVietnam" name="isComVietnam" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.isComVietnam.required'/>" disabled/>
														    <option value=""> </option>
														    <c:forEach var="item" items="${isComVietnamList}" varStatus="status">
														    <option value="${item.code}"<c:if test="${item.code==sellerApply.isComVietnam}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
													        </c:forEach>
													      </select>
                                                        </div>
                                                    </div>
                                                    <!-- row 2 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.comRegisteredCountry' />
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
			                                              <select style="width: 120%;" class="form-control if-input-sm if-div-input-md" id="comRegisteredCountry" name="comRegisteredCountry" 	data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comRegisteredCountry.required'/>"  disabled>
															<option value=""> </option>
															<c:forEach var="item" items="${countryList}" varStatus="status">
														    <option value="${item.code}"<c:if test="${item.code==sellerApply.comRegisteredCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
															</c:forEach>
														</select>
                                                        </div>
                                                        <div class="control-label col-md-3" style="margin-left: 4px;">
                                                           <fmt:message	key='seller.apply.form.field.comRegistrationNumber' /> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                           <input type="text" class="form-control if-input-sm if-div-input-md" id="comRegistrationNumber"   value="${sellerApply.comRegistrationNumber}" name="comRegistrationNumber"  placeholder="<fmt:message key='seller.apply.form.field.comRegistrationNumber.placeholder'/>"
															data-rule-required="true"   data-msg-required="<fmt:message key='seller.apply.form.field.comRegistrationNumber.required'/>"
															data-rule-pattern="^[0-9a-zA-Z]{8,12}$"  data-msg-pattern="<fmt:message key='seller.apply.form.field.comRegistrationNumber.pattern'/>" disabled>
                                                        </div>
                                                    </div>
                                                    <!-- row 3 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                          <fmt:message key='seller.apply.form.field.comTaxCode' /><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comTaxCode" name="comTaxCode" placeholder="<fmt:message key='seller.apply.form.field.comTaxCode.placeholder'/>"
															data-rule-required="true" 	data-msg-required="<fmt:message key='seller.apply.form.field.comTaxCode.required'/>"
															data-rule-pattern="^[0-9a-zA-Z]{8,12}$" value="${sellerApply.comTaxCode}"
															data-msg-pattern="<fmt:message key='seller.apply.form.field.comTaxCode.pattern'/>" disabled/>
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.field.comEstablishmentDate'/><span class="required">*</span>
                                                        </div>
													    <div class="col-md-3 if-input-md">
													      <input type="text" class="form-control if-input-sm if-div-input-md" disabled value="<fmt:formatDate value='${sellerApply.comEstablishmentDate}' pattern='MM/dd/yyyy'/>"/>
													    </div>
                                                    </div>
                                                    <!-- row 4 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                          <fmt:message key='seller.apply.form.field.comIndustrySector'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                        <select style="width: 120%;" class="form-control if-input-sm if-div-input-md" id="comIndustrySector" name="comIndustrySector" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comIndustrySector.required'/>"  disabled>
								                          <option value=""> </option>
								                            <c:forEach var="item" items="${industryList}"> 
								                            <option value="${item.code}" class="option1" disabled <c:if test="${item.code==sellerApply.comIndustrySector}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                              <c:forEach var="item2" items="${item.children}"> 
								                              <option value="${item2.code}" class="option2" disabled  <c:if test="${item2.code==sellerApply.comIndustrySector}"> selected</c:if>>${item2[self.i18n.catalog_name]}</option>
								                                <c:forEach var="item3" items="${item2.children}"> 
									                            <option value="${item3.code}"  class="option3"  <c:if test="${item3.code==sellerApply.comIndustrySector}"> selected</c:if>>${item3[self.i18n.catalog_name]}</option>
									                            </c:forEach>
								                              </c:forEach>
								                            </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-3" style="margin-left: 4px;">
                                                           <fmt:message key='seller.apply.form.field.comAddress'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comAddress" name="comAddress"  maxlength="255" value="${sellerApply.comAddress}" placeholder="<fmt:message key='seller.apply.form.field.comAddress.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comAddress.required'/>" disabled/>
                                                        </div>
                                                    </div>
                                                    <!-- row 5 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                          <fmt:message key='seller.apply.form.field.comDistrict'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comDistrict" name="comDistrict"  maxlength="255" value="${sellerApply.comDistrict}" placeholder="<fmt:message key='seller.apply.form.field.comDistrict'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comDistrict.required'/>"  disabled/>
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.field.comCity'/>  <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comCity" name="comCity"  maxlength="255"  value="${sellerApply.comCity}" placeholder="<fmt:message key='seller.apply.form.field.comCity.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comCity.required'/>" disabled/>
                                                        </div>
                                                    </div>
                                                    <!-- row 6 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                          <fmt:message key='seller.apply.form.field.comRegion'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comRegion" name="comRegion" maxlength="255" value="${sellerApply.comRegion}" placeholder="<fmt:message key='seller.apply.form.field.comRegion.placeholder'/>"  disabled>
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.field.comPostcode'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <input type="text" class="form-control if-input-sm if-div-input-md"  id="comPostcode" name="comPostcode" value="${sellerApply.comPostcode}" placeholder="<fmt:message key='seller.apply.form.field.comPostcode.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comPostcode.required'/>"  data-rule-pattern="^.{4,8}$"
															data-msg-pattern="<fmt:message key='seller.apply.form.field.comPostcode.pattern'/>"  disabled>
                                                        </div>
                                                    </div>
                                                    <!-- row 7 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.apply.form.field.comCountry'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                         <select style="width: 120%;" class="form-control if-input-sm if-div-input-md"  id="comCountry" name="comCountry" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comCountry.required'/>" disabled>
								                           <option value=""> </option>
								                           <c:forEach var="item" items = "${countryList}" varStatus = "status">
								                           <option value="${item.code}"<c:if test="${item.code==sellerApply.comCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                           </c:forEach>
								                         </select>
                                                        </div>
                                                    </div>
                                                    <!-- row 8 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3">
                                                          <fmt:message key='seller.apply.form.field.isComAddress2'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <input type="checkbox" class="form-control if-input-sm if-div-input-md" id="isComAddress2" name="isComAddress2" disabled>
                         							      <input type="hidden" id="comAddress2" name="comAddress2" value="${sellerApply.comAddress2}" />
                                                        </div>
                                                    </div>
                                                    <!-- row 9 -->
                                                    <div id="addressDiv"  class="form-group if-form-group-sm" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> > 
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                         <fmt:message key='seller.apply.form.field.address'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="address" name="address"  maxlength="255" value="${sellerApply.address}"  placeholder="<fmt:message key='seller.apply.form.field.address.placeholder'/>" data-rule-required="false"    data-msg-required="<fmt:message key='seller.apply.form.field.address.required'/>" disabled/>
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.field.comDistrict2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comDistrict2" name="comDistrict2"   maxlength="255" value="${sellerApply.comDistrict2}" placeholder="<fmt:message key='seller.apply.form.field.comDistrict2'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comDistrict2.required'/>"  disabled/>
                                                        </div>
                                                    </div>
                                                    <!-- row 10 -->
                                                    <div   id="comCityDiv" class="form-group if-form-group-sm" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> > 
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                            <fmt:message key='seller.apply.form.field.comCity2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comCity2" name="comCity2" value="${sellerApply.comCity2}" maxlength="255"  data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comCity2.placeholder'/>"  disabled/>
                                                        </div>
                                                        <div class="control-label col-md-3" style="display: inline-block">
                                                         <fmt:message key='seller.apply.form.field.comRegion2'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comRegion2" name="comRegion2"  maxlength="255"  value="${sellerApply.comRegion2}" placeholder="<fmt:message key='seller.apply.form.field.comRegion2.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comRegion2.required'/>" disabled/>
                                                        </div>
                                                    </div>
                                                    <!-- row 11 -->
                                                    <div  id="comCountryDiv"   class="form-group if-form-group-sm" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> > 
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                            <fmt:message key='seller.apply.form.field.comCountry2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                         <select style="width: 120%;" class="form-control if-input-sm if-div-input-md" id="comCountry2" name="comCountry2" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comCountry2.required'/>" disabled>
							                               <option value=""> </option>
							                               <c:forEach var="item" items = "${countryList}" varStatus = "status">
							                               <option value="${item.code}"<c:if test="${item.code==sellerApply.comCountry2}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
							                               </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-3" style="display: inline-block; margin-left: 4px;">
                                                          <fmt:message key='seller.apply.form.field.comPostcode2'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comPostcode2" name="comPostcode2" value="${sellerApply.comPostcode2}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comPostcode2.required'/>"  data-rule-pattern="^.{4,8}$"
															data-msg-pattern="<fmt:message key='seller.apply.form.field.comPostcode2.pattern'/>"  disabled/>
                                                        </div>
                                                    </div>
                                                    <!-- row 12 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-multiple-line">
                                                        <fmt:message key='seller.apply.form.field.comNearestCenter'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                          <select style="width: 120%;" class="form-control if-input-sm if-div-input-md" id="comNearestCenter" name="comNearestCenter" data-rule-required="true"  placeholder="<fmt:message key='seller.apply.form.field.comNearestCenter.placeholder'/>" data-msg-required="<fmt:message key='seller.apply.form.field.comNearestCenter.required'/>" disabled>
								                            <option value=""> </option>
								                            <c:forEach var="item" items="${nearestSMECenterList}" varStatus="status"> 
								                            <option value="${item.code}"<c:if test="${sellerApply.comNearestCenter==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                            </c:forEach>
								                          </select>
                                                        </div>
                                                    </div>                                                                                                       
                                                </div>
                                               
                                                <!-- End tab2: Company information-->
                                                <!-- Begin tab3: Further details-->
                                                <div class="tab-pane" id="tab3">
                                                    <!-- row 1 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-multiple-line">
                                                          <fmt:message key='seller.apply.form.label.choose5MainDebtors'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <input type="hidden" id="debtorA1Id" name="debtorA1Id" value="${sellerApply.debtorA1Id}" />
								                          <input style="margin-bottom: 5px;" type="text" class="form-control if-input-sm if-div-input-md" id="debtorA1Name" name="debtorA1Name" value="${sellerApply.debtorA1Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  disabled/>
								                          <input type="hidden" id="debtorA2Id" name="debtorA2Id" value="${sellerApply.debtorA2Id}" />
								                          <input style="margin-bottom: 5px;" type="text" class="form-control if-input-sm if-div-input-md" id="debtorA2Name" name="debtorA2Name" value="${sellerApply.debtorA2Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  disabled/>
								                          <input type="hidden" id="debtorA3Id" name="debtorA3Id" value="${sellerApply.debtorA3Id}" />
								                          <input style="margin-bottom: 5px;" type="text" class="form-control if-input-sm if-div-input-md" id="debtorA3Name" name="debtorA3Name" value="${sellerApply.debtorA3Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  disabled/>
								                          <input type="hidden" id="debtorA4Id" name="debtorA4Id" value="${sellerApply.debtorA4Id}" />
								                          <input style="margin-bottom: 5px;" type="text" class="form-control if-input-sm if-div-input-md" id="debtorA4Name" name="debtorA4Name" value="${sellerApply.debtorA4Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  disabled/>
								                          <input type="hidden" id="debtorA5Id" name="debtorA5Id" value="${sellerApply.debtorA5Id}" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md" id="debtorA5Name" name="debtorA5Name" value="${sellerApply.debtorA5Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  disabled/>
                                                      
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.label.choose5OtherDebtors'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="hidden" id="debtorB1Id" name="debtorB1Id"     maxlength="200"  value="${sellerApply.debtorB1Id}" />
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="debtorB1Name"  maxlength="200"  name="debtorB1Name" value="${sellerApply.debtorB1Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.otherDebtor.required'/>"  disabled/>
                                                        </div>
                                                    </div>
                                                    <!-- row 2 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-multiple-line">
                                                            <fmt:message key='seller.apply.form.field.invoiceAvgAmountCode'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3" style="width: 24.6%; overflow: hidden;">
                                                         <select style="width: 120%;" class="form-control if-input-sm if-div-input-md"  id="invoiceAvgAmountCode" name="invoiceAvgAmountCode"  data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceAvgAmountCode.required'/>" disabled>
							                               <option value=""> </option>
							                               <c:forEach var="item" items = "${invAvgAmtOptList}" varStatus = "status">
							                               <option value="${item.code}"<c:if test="${item.code==sellerApply.invoiceAvgAmountCode}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
							                               </c:forEach>
							                             </select>
                                                        </div>
                                                        <div class="control-label col-md-3 if-control-label-multiple-line" style="margin-left: 4px;">
                                                         <fmt:message key='seller.apply.form.field.esignatureSN'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="esignatureSN" name="esignatureSN"    maxlength="255"  value="${sellerApply.esignatureSN}"  disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                
                                                <!-- End tab3: Further details-->
                                                <!-- Begin tab4: Documents-->
                                                <div class="tab-pane" id="tab4">
								                      <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 5px;">
                                                          <fmt:message key='seller.apply.form.field.identificationFile' /><span class="required">*</span>
                                                        </div>
	                                                    <div class="col-md-3 filediv">
	                                                        <div id="file-link-identificationFile" class="filename">
																<c:if test="${not empty self.doc1Link}">${self.doc1Link}</c:if>
																<c:if test="${empty self.doc1Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
															</div>
														</div>
                                                      </div>
								                                        
								                      
								                      <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 5px;">
                                                          <fmt:message key='seller.apply.form.field.signedFile' /><span class="required">*</span>
                                                        </div>
	                                                    <div class="col-md-3 filediv">
	                                                        <div id="file-link-signedFile" class="filename">
																<c:if test="${not empty self.doc2Link}">${self.doc2Link}</c:if>
																<c:if test="${empty self.doc2Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
															</div>
														</div>
                                                      </div>
								                        
								                      <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 6px;">
                                                          <fmt:message key='seller.apply.form.field.licenseFile' /><span class="required">*</span>
                                                        </div>
	                                                    <div class="col-md-3 filediv">
	                                                        <div id="file-link-licenseFile" class="filename">
																<c:if test="${not empty self.doc3Link}">${self.doc3Link}</c:if>
																<c:if test="${empty self.doc3Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
															</div>
														</div>
                                                      </div>
								                      
								                     <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 6px;">
                                                          <fmt:message key='seller.apply.form.field.taxCodeFile' /><span class="required">*</span>
                                                        </div>
	                                                    <div class="col-md-3 filediv">
	                                                        <div id="file-link-taxCodeFile" class="filename">
																<c:if test="${not empty self.doc4Link}">${self.doc4Link}</c:if>
																<c:if test="${empty self.doc4Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
															</div>
														</div>
                                                      </div>
								                      
								                      <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 6px;">
                                                          <fmt:message key='seller.apply.form.field.fsFileLastYear' /><span class="required">*</span>
                                                        </div>
	                                                    <div class="col-md-3 filediv">
	                                                        <div id="file-link-fsFileLastYear" class="filename">
																<c:if test="${not empty self.doc5Link}">${self.doc5Link}</c:if>
																<c:if test="${empty self.doc5Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
															</div>
														</div>
                                                      </div>
								                      
								                      <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 6px;">
                                                          <fmt:message key='seller.apply.form.field.fsFileLast2Year' /><span class="required">*</span>
                                                        </div>
	                                                    <div class="col-md-3 filediv">
	                                                        <div id="file-link-fsFileLast2Year" class="filename">
																<c:if test="${not empty self.doc6Link}">${self.doc6Link}</c:if>
																<c:if test="${empty self.doc6Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
															</div>
														</div>
                                                      </div>
                                                      
								                      <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 6px;">
                                                          <fmt:message key='seller.apply.form.field.invoiceFile' /><span class="required">*</span>
                                                        </div>
	                                                    <div class="col-md-3 filediv">
	                                                        <div id="file-link-invoiceFile1" class="filename">
																<c:if test="${not empty self.doc7Link}">${self.doc7Link}</c:if>
																<c:if test="${empty self.doc7Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
															</div>
														</div>
                                                      </div>
								                   
								                      <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 6px;">
                                                            &nbsp;&nbsp;
                                                        </div>
	                                                    <div class="col-md-3 filediv">
	                                                        <div id="file-link-invoiceFile2" class="filename">
																<c:if test="${not empty self.doc8Link}">${self.doc8Link}</c:if>
																<c:if test="${empty self.doc8Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
															</div>
														</div>
                                                      </div>
							                         <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 6px;">
                                                           &nbsp;&nbsp;
                                                       </div>
                                                       <div class="col-md-3 filediv">
                                                         <div id="file-link-invoiceFile2" class="filename">
														   <c:if test="${not empty self.doc9Link}">${self.doc9Link}</c:if>
														   <c:if test="${empty self.doc9Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
													     </div>
													   </div>
                                                     </div>
								
								                    <form style="display:none;" id="form-documents-hidden">                     
								                      <input type="hidden" name="documents[0].id" id="identificationFileId" value="${self.doc1}">
								                      <input type="hidden" name="documents[0].dispOrder" value="1">
								                      
								                      <input type="hidden" name="documents[1].id" id="signedFileId" value="${self.doc2}">
								                      <input type="hidden" name="documents[1].dispOrder" value="2">
								                      
								                      <input type="hidden" name="documents[2].id" id="licenseFileId" value="${self.doc3}">
								                      <input type="hidden" name="documents[2].dispOrder" value="3">
								                     
								                      <input type="hidden" name="documents[3].id" id="taxCodeFileId" value="${self.doc4}">
								                      <input type="hidden" name="documents[3].dispOrder" value="4">
								                      
								                      <input type="hidden" name="documents[4].id" id="fsFileLastYearId" value="${self.doc5}">
								                      <input type="hidden" name="documents[4].dispOrder" value="5">
								                     
								                      <input type="hidden" name="documents[5].id" id="fsFileLast2YearId" value="${self.doc6}">
								                      <input type="hidden" name="documents[5].dispOrder" value="6">
								                      
								                      <input type="hidden" name="documents[6].id" id="invoiceFile1Id" value="${self.doc7}">
								                      <input type="hidden" name="documents[6].dispOrder" value="7">
								                      
								                      <input type="hidden" name="documents[7].id" id="invoiceFile2Id" value="${self.doc8}">
								                      <input type="hidden" name="documents[7].dispOrder" value="8">
								                      
								                      <input type="hidden" name="documents[8].id" id="invoiceFile3Id" value="${self.doc9}">
								                      <input type="hidden" name="documents[8].dispOrder" value="9">
								                    </form>
                                                </div>
                                                <!-- End tab4: Documents-->
                                                <!-- Begin tab5: Terms and Conditions-->
                                                <div class="tab-pane" id="tab5">
                                                    <div style="height: 220px; max-height: 220px; overflow: auto; padding: 10px 10px; background: white; border: solid #B3AA9F thin; ">
										            <h6><fmt:message key='buyer.apply.form.field.title.h6' /></h6> <p><fmt:message key='buyer.apply.form.field.modifiedTime' /> (<a href="../../policies/terms/archive/"><fmt:message key='buyer.apply.form.field.modified.a' /></a>) </p><h6><fmt:message key='buyer.apply.form.field.content.welcome' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p1' /> </p><p><fmt:message key='buyer.apply.form.field.content.p2' /></p><p><fmt:message key='buyer.apply.form.field.content.p3' /></p><h6 id="toc-services"><fmt:message key='buyer.apply.form.field.content.using' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p4' /> </p><p><fmt:message key='buyer.apply.form.field.content.p5' /> </p><p><fmt:message key='buyer.apply.form.field.content.p6' /> </p><p><fmt:message key='buyer.apply.form.field.content.p7' /> </p><p><fmt:message key='buyer.apply.form.field.content.p8' /> </p><p><fmt:message key='buyer.apply.form.field.content.p9' /> </p><h6 id="toc-account"><fmt:message key='buyer.apply.form.field.content.account' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p10' /> </p><p><fmt:message key='buyer.apply.form.field.content.p11' /> <a href="http://support.google.com/accounts/bin/answer.py?hl=en&amp;answer=58585"><fmt:message key='buyer.apply.form.field.content.p11.a' /></a>. </p><h6 id="toc-protection"><fmt:message key='buyer.apply.form.field.content.privacy' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p12.goole' /> <a href="../../policies/privacy/"><fmt:message key='buyer.apply.form.field.content.p12.a' /></a> <fmt:message key='buyer.apply.form.field.content.p12' /> </p><p><fmt:message key='buyer.apply.form.field.content.p13' /> </p><p><fmt:message key='buyer.apply.form.field.content.p14' /> <a href="http://support.google.com/bin/static.py?hl=en&amp;ts=1114905&amp;page=ts.cs"><fmt:message key='buyer.apply.form.field.content.p14.a' /></a>. </p><h6 id="toc-content"><fmt:message key='buyer.apply.form.field.content.yourContent' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p15' /> </p><p><fmt:message key='buyer.apply.form.field.content.p16' /> </p><p><fmt:message key='buyer.apply.form.field.content.p17' /> </p><p><fmt:message key='buyer.apply.form.field.content.p18' /> </p><p><fmt:message key='buyer.apply.form.field.content.p19' /> </p><h6 id="toc-software"><fmt:message key='buyer.apply.form.field.content.aboutSoftware' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p20' /> </p><p><fmt:message key='buyer.apply.form.field.content.p21' /> </p><p><fmt:message key='buyer.apply.form.field.content.p22' /> </p><h6 id="toc-modification"><fmt:message key='buyer.apply.form.field.content.modifying' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p23' /> </p><p><fmt:message key='buyer.apply.form.field.content.p24' /> </p><p><fmt:message key='buyer.apply.form.field.content.p25' /> </p><h6 id="toc-warranties-disclaimers"><fmt:message key='buyer.apply.form.field.content.ourWarranties' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p26' /> </p><p><fmt:message key='buyer.apply.form.field.content.p27' /> </p><p><fmt:message key='buyer.apply.form.field.content.p28' /> </p><h6 id="toc-liability"><fmt:message key='buyer.apply.form.field.content.liability' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p29' /> </p><p><fmt:message key='buyer.apply.form.field.content.p30' /> </p><p><fmt:message key='buyer.apply.form.field.content.p31' /> </p><h6 id="toc-business-uses"><fmt:message key='buyer.apply.form.field.content.business' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p32' /> </p><h6 id="toc-about"><fmt:message key='buyer.apply.form.field.content.aboutThese' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p33' /> </p><p><fmt:message key='buyer.apply.form.field.content.p34' /> </p><p><fmt:message key='buyer.apply.form.field.content.p35' /> </p><p><fmt:message key='buyer.apply.form.field.content.p36' /> </p><p><fmt:message key='buyer.apply.form.field.content.p37' /> </p>
										            <p><fmt:message key='buyer.apply.form.field.content.p38' /> </p><p><fmt:message key='buyer.apply.form.field.content.p39' /> <a href="../../contact/"><fmt:message key='buyer.apply.form.field.content.p39.a' /></a>.</p>
										          </div>
                                                    <div class="form-group" style="margin-top: 10px">
                                                        <input type="checkbox" readonly class="form-control if-input-sm if-div-input-md">&nbsp;&nbsp;&nbsp;
                                                        <span class="bold"><fmt:message key='buyer.apply.form.field.content.agree' /></span>
                                                    </div>
                                                </div>
                                                <!-- End tab5: Terms and Conditions-->
                                            </div>
                                        </div>
                                    <div class="">
									  <div class="row">
									    <div class="col-md-12 text-center">
									      <a href="javascript:;" class="btn default button-previous" style=" margin-right: 3px">
									        <fmt:message key='buyer.apply.form.button.back' />
									      </a>
									      <a href="javascript:;" class="btn default button-next">
									        <fmt:message key='buyer.apply.form.button.continue' />
									      </a>
									    </div>
									  </div>
									</div>
                                  </div>
                                </form>
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
            <fmt:message key='index.below.footer.content'/> 
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
   <%--  <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-validation/js/additional-methods.min.js"></script> --%>
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/select2/select2.min.js"></script>
    <!-- END PAGE LEVEL PLUGINS -->

    <script src="${base}/static/libs/metronic/3.3.0/assets/global/scripts/metronic.js"></script>
    <script src="${base}/static/libs/metronic/3.3.0/assets/admin/pages/scripts/components-pickers.js"></script>
    <script src="${base}/static/themes/metronic/js/layout.js"></script>
    <script src="${base}/static/themes/metronic/js/quick-sidebar.js"></script>
    <script src="${base}/static/themes/metronic/js/seller/account/view-application.js"></script>
    <script src="${base}/static/themes/metronic/js/ifactor.js"></script>
    
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-process.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-validate.js"></script>
    
    <script type="text/javascript" src="${base}/static/themes/metronic/js/jquery.validate.custom.js"></script>
    <script type="text/javascript" src="${base}/static/themes/metronic/js/seller/account/apply-view.js"></script>
    <script>
    
    var app = {
  	      base: '${base}', 
  	      version: '${version.app}', 
  	      loginName: '${loginUser.loginName}',
  	      selfUrl:'${self.url}',
  	 };
    
	  jQuery(document).ready(function () {
	    Metronic.init(); // init metronic core components
	    Layout.init(); // init current layout
	    ComponentsPickers.init();
	    var titles = ['Personal information', 'Company information', 'Futher details', 'Documents', 'Terms and conditions'];
	    FormWizard.init(titles);
	  });
	  
	  $("#table1").removeAttr("href");
      $("#table2").removeAttr("href");
      $("#table3").removeAttr("href");
      $("#table4").removeAttr("href");
      $("#table5").removeAttr("href");
	  
    </script>

    <!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
