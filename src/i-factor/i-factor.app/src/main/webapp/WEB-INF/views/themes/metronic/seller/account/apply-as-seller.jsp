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


<c:set target="${self}" property="docBiztypePrefix"><%= com.entrofine.ifactor.app.service.SellerApplyDocService.BIZTYPE_PREFIX%></c:set>
<c:set target="${self}" property="title"><fmt:message key='seller.apply.applyPage.title'/></c:set>

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
    <%-- <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" /> --%>
    <link rel="stylesheet" href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css">
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
    
    
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload-ui.css">
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
    <link href="${base}/static/themes/metronic/css/form.css" rel="stylesheet"  />
    <%-- <link href="${base}/static/themes/metronic/css/registration.css?ver=${version.app}" rel="stylesheet"> --%>
    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png" />
    <style type="text/css">
    .form-horizontal .form-group {
   	  margin-right: 0px;
   	  margin-left:  0px;
     }
    label.error { color:#f00;font-size:12px;}
    
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
                            <a href="#"><fmt:message key='seller.apply.page.applyAsSeller' /></a>
                        </li>
                    </ul>
                </div>
                <h5 class="page-title">
                    <b><fmt:message key='seller.apply.page.applyAsSeller' /></b>
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
                                    <div class="form-wizard">
                                        <div class="form-body">
                                            <ul class="nav nav-pills nav-justified steps">
                                                <li>
                                                    <a href="#tab-personal-info" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table1">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.one' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='buyer.apply.tab.personal' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-company-info" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table2">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.two' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='seller.apply.page.companyInformation' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-further-details" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table3">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.three' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='bc.application.nav.justified.steps4' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-documents" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table4">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.four' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.documents' />
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                 <a href="#tab-terms-conditions" data-toggle="tab" class="step">
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
                                                <div class="tab-pane active" id="tab-personal-info">
                                                   <form action="#" class="form-horizontal" id="form-personal-info" method="POST" enctype="multipart/form-data">  
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 if-control-label-md">
                                                            <fmt:message key='seller.register.form.field.title'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="title" name="title" value="${user.title}" readonly />
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.register.form.field.firstName'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="firstName" name="firstName" value="${user.firstName}"  readonly />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 if-control-label-md">
                                                            <fmt:message key='seller.register.form.field.lastName'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="lastName" name="lastName" value="${user.lastName}" readonly  />
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                            <fmt:message key='seller.register.form.field.email'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="email" name="email" value="${user.email}"  readonly />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                        
                                                        <div class="control-label col-md-2">
                                                            <fmt:message key='seller.apply.form.field.gender'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <select  class="form-control if-input-sm if-div-input-md"  id="gender"  name="gender" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.gender.required'/>">
                                                              <option value=""></option>
									                          <c:forEach var="item" items="${genderList}" varStatus="status"> 
									                          <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
									                          </c:forEach>
									                         </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.apply.form.field.dob'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3 if-input-md">
                                                          <input type="text" class="form-control if-input-sm if-div-input-md date-picker"  id="dob" name="dob" autocomplete="off" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.dob.required'/>" data-rule-pattern="^(((0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])/(29|30)|(0[13578]|1[02])/31)/(?!0000)[0-9]{4}|02/29/([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$" data-msg-pattern="<fmt:message key='seller.apply.form.field.dob.pattern'/>" data-rule-isBeforeToday="true" data-msg-isBeforeToday="<fmt:message key='seller.apply.form.field.dob.isBeforeToday'/>" data-rule-isAdult="true"  
							                               data-msg-isAdult="<fmt:message key='seller.apply.form.field.dob.isAdult'/>" readonly />
							                              <div  id="error-dob"></div>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                        
                                                        <div class="control-label col-md-2">
                                                            <fmt:message key='seller.apply.form.field.nationality'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <select  class="form-control if-input-sm if-div-input-md" id="nationality" name="nationality" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.nationality.required'/>">
                                                              <option value=""></option>
												              <c:forEach var="item" items="${countryList}" varStatus="status"> 
												              <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
												              </c:forEach> 
												            </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                            <fmt:message key='seller.apply.form.field.countryOfResidence'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <select  class="form-control if-input-sm if-div-input-md" id="countryOfResidence" name="countryOfResidence" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.countryOfResidence.required'/>">
                                                              <option value=""></option>
												              <c:forEach var="item" items="${countryList}" varStatus="status"> 
												              <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
												              </c:forEach>
												            </select>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                       
                                                        <div class="control-label col-md-2">
                                                            <fmt:message key='seller.apply.form.field.idType'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <select class="form-control if-input-sm if-div-input-md" id="idType" name="idType"  data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.idType.required'/>">
                                                              <option value=""></option>
								                              <c:forEach var="item" items="${idTypeList}" varStatus="status"> 
								                              <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
								                              </c:forEach>
								                            </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                            <fmt:message key='seller.apply.form.field.idNumber'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="idNumber" name="idNumber" placeholder="<fmt:message key='seller.apply.form.field.idNumber.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.idNumber.required'/>" data-rule-pattern="^[0-9a-zA-Z]{7,12}$"
							                             	data-msg-pattern="<fmt:message key='seller.apply.form.field.idNumber.pattern'/>" />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                       
                                                        <div class="control-label col-md-2">
                                                          <fmt:message key='seller.register.form.field.workPhone'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left" id="workCountryCode" name="workCountryCode" value="${user.workCountryCode}" readonly>
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right" id="workPhone" name="workPhone" value="${user.workPhone}" readonly />
                                                            <div id="error-workCountryCode"></div>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.register.form.field.mobilePhone'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left"   id="mobileCountryCode" name="mobileCountryCode" value="${user.mobileCountryCode}" readonly>
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right" id="mobilePhone"     name="mobilePhone" value="${user.mobilePhone}" readonly />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2">
                                                            <fmt:message key='seller.register.form.field.position'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="position" name="position" value="${user.position}"  maxlength="255"  readonly data-rule-required="true" data-msg-required="<fmt:message key='seller.register.form.field.position.required'/>" readonly />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                  </form>
                                                </div>
                                                <!-- End tab1: Personal information-->
                                                <!-- Begin tab2: Company information-->
                                                <div class="tab-pane" id="tab-company-info">
                                                    <!-- row 1 -->
                                                  <form class="form-horizontal" id="form-company-info" method="POST" enctype="multipart/form-data">
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.apply.form.field.companyName'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="companyName" name="companyName"  maxlength="255"  placeholder="<fmt:message key='seller.apply.form.field.companyName.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.companyName.required'/>" />
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                         <fmt:message key='seller.apply.form.field.isComVietnam' /><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <!--<input type="text" class="form-control if-input-sm if-div-input-md" name="companyregistered" id="companyregistered" />-->
                                                          <select class="form-control if-input-sm if-div-input-md" id="isComVietnam" name="isComVietnam" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.isComVietnam.required'/>">
                                                            <option value=""></option>
														    <c:forEach var="item" items="${isComVietnamList}" varStatus="status">
														    <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
													        </c:forEach>
														  </select>
                                                        </div>
                                                    </div>
                                                    <!-- row 2 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.comRegisteredCountry' />
                                                        </div>
                                                        <div class="col-md-3">
                                                          <select  class="form-control if-input-sm if-div-input-md" id="comRegisteredCountry" name="comRegisteredCountry" 	data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comRegisteredCountry.required'/>" disabled>
						                                    <option value=""></option>
														    <c:forEach var="item" items="${countryList}" varStatus="status">
													        <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
														    </c:forEach>
													      </select>
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                           <fmt:message	key='seller.apply.form.field.comRegistrationNumber' /> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comRegistrationNumber" name="comRegistrationNumber"  placeholder="<fmt:message key='seller.apply.form.field.comRegistrationNumber.placeholder'/>"
							                                 data-rule-required="true"   data-msg-required="<fmt:message key='seller.apply.form.field.comRegistrationNumber.required'/>"
														     data-rule-pattern="^[0-9a-zA-Z]{8,12}$"  data-msg-pattern="<fmt:message key='seller.apply.form.field.comRegistrationNumber.pattern'/>">
                                                        </div>
                                                    </div>
                                                    <!-- row 3 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                          <fmt:message key='seller.apply.form.field.comTaxCode' /><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comTaxCode" name="comTaxCode" placeholder="<fmt:message key='seller.apply.form.field.comTaxCode.placeholder'/>"
															data-rule-required="true" 	data-msg-required="<fmt:message key='seller.apply.form.field.comTaxCode.required'/>"
															data-rule-pattern="^[0-9a-zA-Z]{8,12}$" data-msg-pattern="<fmt:message key='seller.apply.form.field.comTaxCode.pattern'/>">
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.field.comEstablishmentDate'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3 if-input-md">
                                                          <input type="text" class="form-control if-input-sm if-div-input-md date-picker" id="comEstablishmentDate" name="comEstablishmentDate"   data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comEstablishmentDate.required'/>" data-rule-pattern="^(((0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])/(29|30)|(0[13578]|1[02])/31)/(?!0000)[0-9]{4}|02/29/([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$" data-msg-pattern="<fmt:message key='seller.apply.form.field.dob.pattern'/>"  autocomplete="off"   data-rule-isBeforeToday="true" data-msg-isBeforeToday="<fmt:message key='seller.apply.form.field.comEstablishmentDate.isBeforeToday' />"  readonly/>
                                                          <div id="error-comEstablishmentDate"></div>
                                                        </div>
                                                    </div>
                                                    <!-- row 4 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                          <fmt:message key='seller.apply.form.field.comIndustrySector'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                        <select  class="form-control if-input-sm if-div-input-md" id="comIndustrySector" name="comIndustrySector" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comIndustrySector.required'/>">
								                            <option value=""></option>
								                            <c:forEach var="item" items="${industryList}"> 
								                             <option value="${item.code}"  class="option1" disabled>${item[self.i18n.catalog_name]}</option>
								                               <c:forEach var="item2" items="${item.children}"> 
								                               <option value="${item2.code}" class="option2" disabled>&nbsp&nbsp${item2[self.i18n.catalog_name]}</option> 
									                             <c:forEach var="item3" items="${item2.children}"> 
									                             <option value="${item3.code}" class="option3">&nbsp&nbsp&nbsp&nbsp${item3[self.i18n.catalog_name]}</option>
									                             </c:forEach>
								                              </c:forEach>
								                            </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                           <fmt:message key='seller.apply.form.field.comAddress'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comAddress" name="comAddress"  maxlength="255" placeholder="<fmt:message key='seller.apply.form.field.comAddress.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comAddress.required'/>"  />
                                                        </div>
                                                    </div>
                                                    <!-- row 5 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                          <fmt:message key='seller.apply.form.field.comDistrict'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comDistrict" name="comDistrict"   maxlength="255"  placeholder="<fmt:message key='seller.apply.form.field.comDistrict'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comDistrict.required'/>" />
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.field.comCity'/>  <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comCity" name="comCity"   maxlength="255"  placeholder="<fmt:message key='seller.apply.form.field.comCity.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comCity.required'/>" />
                                                        </div>
                                                    </div>
                                                    <!-- row 6 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                          <fmt:message key='seller.apply.form.field.comRegion'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"id="comRegion" name="comRegion"   maxlength="255"  placeholder="<fmt:message key='seller.apply.form.field.comRegion.placeholder'/>" />
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.field.comPostcode'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <input type="text" class="form-control if-input-sm if-div-input-md"  id="comPostcode" name="comPostcode" placeholder="<fmt:message key='seller.apply.form.field.comPostcode.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comPostcode.required'/>" data-rule-pattern="^.{4,8}$"
																data-msg-pattern="<fmt:message key='seller.apply.form.field.comPostcode.pattern'/>">
                                                        </div>
                                                    </div>
                                                    <!-- row 7 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md">
                                                           <fmt:message key='seller.apply.form.field.comCountry'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                         <select  class="form-control if-input-sm if-div-input-md"  id="comCountry" name="comCountry" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comCountry.required'/>">
							                               <option value=""></option>
										                   <c:forEach var="item" items="${countryList}" varStatus="status"> 
										                   <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
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
                                                          <input type="checkbox" class="form-control if-input-sm if-div-input-md"  id="isComAddress2" name="isComAddress2" />
                                                          <input type="hidden" id="comAddress2" name="comAddress2" />
                                                        </div>
                                                    </div>
                                                    <!-- row 9 -->
                                                    <div  class="form-group if-form-group-sm" id="addressDiv"  style="display:none;">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                         <fmt:message key='seller.apply.form.field.address'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="address" name="address"   maxlength="255" placeholder="<fmt:message key='seller.apply.form.field.address.placeholder'/>" data-rule-required="false"    data-msg-required="<fmt:message key='seller.apply.form.field.address.required'/>">
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.field.comDistrict2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comDistrict2" name="comDistrict2"   maxlength="255" placeholder="<fmt:message key='seller.apply.form.field.comDistrict2.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comDistrict2.required'/>" />
                                                        </div>
                                                    </div>
                                                    <!-- row 10 -->
                                                    <div class="form-group if-form-group-sm" id="comCityDiv" style="display:none;">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                            <fmt:message key='seller.apply.form.field.comCity2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"   id="comCity2" name="comCity2"    maxlength="255" placeholder="<fmt:message key='seller.apply.form.field.comCity2.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comCity2.required'/>" />
                                                        </div>
                                                        <div class="control-label col-md-3" style="display: inline-block">
                                                         <fmt:message key='seller.apply.form.field.comRegion2'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comRegion2" name="comRegion2"   maxlength="255"  placeholder="<fmt:message key='seller.apply.form.field.comRegion2.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comRegion2.required'/>" />
                                                        </div>
                                                    </div>
                                                    <!-- row 11 -->
                                                    <div class="form-group if-form-group-sm"  id="comCountryDiv"  style="display:none;">
                                                        <div class="control-label col-md-3 if-control-label-md">
                                                            <fmt:message key='seller.apply.form.field.comCountry2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                         <select  class="form-control if-input-sm if-div-input-md"  id="comCountry2" name="comCountry2" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comCountry2.required'/>">
								                           <option value=""></option>
								                           <c:forEach var="item" items="${countryList}" varStatus="status"> 
								                           <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
								                           </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-3" style="display: inline-block">
                                                          <fmt:message key='seller.apply.form.field.comPostcode2'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comPostcode2" name="comPostcode2" placeholder="<fmt:message key='seller.apply.form.field.comPostcode2.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comPostcode2.required'/>" data-rule-pattern="^.{4,8}$"
									                        data-msg-pattern="<fmt:message key='seller.apply.form.field.comPostcode2.pattern'/>">
                                                        </div>
                                                    </div>
                                                    <!-- row 12 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-multiple-line">
                                                        <fmt:message key='seller.apply.form.field.comNearestCenter'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                         <select class="form-control if-input-sm if-div-input-md" id="comNearestCenter" name="comNearestCenter" data-rule-required="true"  placeholder="<fmt:message key='seller.apply.form.field.comNearestCenter.placeholder'/>" data-msg-required="<fmt:message key='seller.apply.form.field.comNearestCenter.required'/>">
								                            <option value=""></option>
								                            <c:forEach var="item" items="${nearestSMECenterList}" varStatus="status"> 
								                            <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
								                            </c:forEach>
								                          </select>
                                                        </div>
                                                    </div>   
                                                  </form>                                                                                                    
                                                </div>
                                               
                                                <!-- End tab2: Company information-->
                                                <!-- Begin tab3: Further details-->
                                                <div class="tab-pane" id="tab-further-details">
                                                    <!-- row 1 -->
                                                  <form class="form-horizontal" id="form-further-details" method="POST" enctype="multipart/form-data">  
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-multiple-line">
                                                          <fmt:message key='seller.apply.form.label.choose5MainDebtors'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <input type="hidden"  id="debtorA1Id" name="debtorA1Id" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md"  id="debtorA1Name" name="debtorA1Name" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>" />
								                          <input type="hidden"  id="debtorA2Id" name="debtorA2Id" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md"  id="debtorA2Name" name="debtorA2Name" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>" />
								                          <input type="hidden"  id="debtorA3Id" name="debtorA3Id" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md"  id="debtorA3Name" name="debtorA3Name" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>" />
								                          <input type="hidden"  id="debtorA4Id" name="debtorA4Id" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md"  id="debtorA4Name" name="debtorA4Name" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>" />
								                          <input type="hidden"  id="debtorA5Id" name="debtorA5Id" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md"  id="debtorA5Name" name="debtorA5Name" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>" />
                                                        </div>
                                                        <div class="control-label col-md-3">
                                                            <fmt:message key='seller.apply.form.label.choose5OtherDebtors'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"   maxlength="200" name="debtorB1Name" id="debtorB1Name" />
                                                        </div>
                                                    </div>
                                                    <!-- row 2 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-multiple-line">
                                                            <fmt:message key='seller.apply.form.field.invoiceAvgAmountCode'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                         <select class="form-control if-input-sm if-div-input-md"  id="invoiceAvgAmountCode"   name="invoiceAvgAmountCode" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceAvgAmountCode.required'/>">
								                            <option value=""></option>
								                            <c:forEach var="item" items = "${invAvgAmtOptList}" varStatus = "status">
								                            <option value="${item.code}">${item[self.i18n.catalog_name]}</option>
								                            </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-3 if-control-label-multiple-line">
                                                         <fmt:message key='seller.apply.form.field.esignatureSN'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="esignatureSN"   maxlength="255" name="esignatureSN" />
                                                        </div>
                                                    </div>
                                                  </form>
                                                </div>
                                                
                                                <!-- End tab3: Further details-->
                                                <!-- Begin tab4: Documents-->
                                                <div class="tab-pane" id="tab-documents">
                                                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                                                      <div class="form-group">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.identificationFile'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-sm-3 filediv" id="div-IdentificationFile">
							                              <span class="file-extend">
														    <span class="fileinput-button" style="display:block;width:72px;height:20px;">
														   <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
                                                            <input type="file" class="if-input-sm if-div-input-md" id="identificationFile" name="file" multiple> 
                                                            <input type="hidden" id="file-type-identificationFile" name="fileType"
															  value="${self.docBiztypePrefix}idcard_authorizedPerson" />
														    </span>
														  </span>
														  <div id="file-link-identificationFile" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
														  <div id="error-identificationFileId" style="clear:both;"></div> 
							                            </div>
                                                      </div>
                                                    </form>
                                                    
                                                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">  
                                                      <div class="form-group">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.signedFile'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-sm-3 filediv" id="div-signedFile">
							                              <span class="file-extend">
														   <span class="fileinput-button" style="display:block;width:72px;height:20px;">
														   <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
                                                            <input type="file" class="if-input-sm if-div-input-md" id="signedFile" name="file" multiple> 
                                                            <input type="hidden" id="file-type-signedFile" name="fileType"
															  value="${self.docBiztypePrefix}idcard_authorizedRep" />
														    </span>
														  </span>
														  <div id="file-link-signedFile" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
														  <div id="error-signedFileId" style="clear:both;"></div> 
							                            </div>
                                                      </div>
                                                    </form>    
                                                    
                                                                                              
                                           
                                                    
                                                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">    
                                                     <div class="form-group">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.licenseFile'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-sm-3">
							                              <span class="file-extend">
														   <span class="fileinput-button" style="display:block;width:72px;height:20px;">
														   <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
                                                            <input type="file" class="if-input-sm if-div-input-md" id="licenseFile" name="file" multiple> 
                                                            <input type="hidden" id="file-type-licenseFile" name="fileType"
															  value="${self.docBiztypePrefix}license_companyLicense" />
														    </span>
														  </span>
														  <div id="file-link-licenseFile" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
														  <div id="error-licenseFileId" style="clear:both;"></div> 
							                            </div>
                                                      </div>
                                                    </form> 
                                                   
                                                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                                                      <div class="form-group">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.taxCodeFile'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-sm-3">
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
                                                  
                                                  
                                                   <form class="form-horizontal" method="POST" enctype="multipart/form-data">  
                                                      <div class="form-group">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.fsFileLastYear'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-sm-3">
							                              <span class="file-extend">
														   <span class="fileinput-button" style="display:block;width:72px;height:20px;">
														   <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
                                                            <input type="file" class="if-input-sm if-div-input-md" id="fsFileLastYear" name="file" multiple> 
                                                            <input type="hidden" id="file-type-fsFileLastYear" name="fileType"
															  value="${self.docBiztypePrefix}fs_fsLastFiscalYear" />
														    </span>
														  </span>
														  <div id="file-link-fsFileLastYear" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
														  <div id="error-fsFileLastYearId" style="clear:both;"></div> 
							                            </div>
                                                      </div>
                                                  </form>  
                                                  
                                                     
                                                    <form class="form-horizontal" method="POST" enctype="multipart/form-data">    
                                                      <div class="form-group">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.fsFileLast2Year'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-sm-3">
							                              <span class="file-extend">
														   <span class="fileinput-button" style="display:block;width:72px;height:20px;">
														   <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
                                                            <input type="file" class="if-input-sm if-div-input-md" id="fsFileLast2Year" name="file" multiple> 
                                                            <input type="hidden" id="file-type-fsFileLast2Year" name="fileType"
															  value="${self.docBiztypePrefix}fs_fsLast2FiscalYear" />
														    </span>
														  </span>
														  <div id="file-link-fsFileLast2Year" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
														  <div id="error-fsFileLast2YearId" style="clear:both;"></div> 
                                                      </div>
                                                    </form>
                                                    
                                                    
                                                    <form class="form-horizontal" style="margin-top:40px;" method="POST" enctype="multipart/form-data">
                                                      <div class="form-group">
                                                        <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           <fmt:message key='seller.apply.form.field.invoiceFile'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-sm-3">
							                              <span class="file-extend">
														   <span class="fileinput-button" style="display:block;width:72px;height:20px;">
														   <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
                                                            <input type="file" class="if-input-sm if-div-input-md" id="invoiceFile1" name="file" multiple> 
                                                            <input type="hidden" id="file-type-invoiceFile1" name="fileType"
															  value="${self.docBiztypePrefix}invoice_firstPaidInvoice" />
														    </span>
														  </span>
														  <div id="file-link-invoiceFile1" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
														  <div id="error-invoiceFile1Id" style="clear:both;"></div> 
							                            </div>
                                                      </div>
                                                   </form> 
                                                   
                                                   <form class="form-horizontal" method="POST" enctype="multipart/form-data">  
                                                     <div class="form-group">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           &nbsp;&nbsp;
                                                       </div>
                                                       <div class="col-sm-3">
						                               <span class="file-extend">
													     <span class="fileinput-button" style="display:block;width:72px;height:20px;">
													     <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
                                                           <input type="file" class="if-input-sm if-div-input-md" id="invoiceFile2" name="file" multiple> 
                                                           <input type="hidden" id="file-type-invoiceFile2" name="fileType"
														  value="${self.docBiztypePrefix}invoice_secondPaidInvoice" />
													     </span>
													   </span>
													   <div id="file-link-invoiceFile2" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
													   <div id="error-invoiceFile2Id" style="clear:both;"></div> 
						                               </div>
                                                     </div>
                                                   </form> 
                                                   
                                                   <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                                                     <div class="form-group">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line">
                                                           &nbsp;&nbsp;
                                                       </div>
                                                       <div class="col-sm-3">
							                             <span class="file-extend">
														   <span class="fileinput-button" style="display:block;width:72px;height:20px;">
														   <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
                                                            <input type="file" class="if-input-sm if-div-input-md" id="invoiceFile3" name="file" multiple> 
                                                            <input type="hidden" id="file-type-invoiceFile3" name="fileType"
															  value="${self.docBiztypePrefix}invoice_thirdPaidInvoice" />
													 	   </span>
													     </span>
														 <div id="file-link-invoiceFile3" class="filename"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></div>
												         <div id="error-invoiceFile3Id" style="clear:both;"></div> 
							                           </div>
                                                     </div>
                                                   </form>
                                                    
                                                    
								                    <form style="display:none;" id="form-documents-hidden">
								                      <input type="hidden" name="documents[0].id" id="identificationFileId" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.identificationFile.required'/>">
								                      <input type="hidden" name="documents[0].dispOrder" value="1">
								                      
								                      <input type="hidden" name="documents[1].id" id="signedFileId" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.signedFile.required'/>">
								                      <input type="hidden" name="documents[1].dispOrder" value="2">
								                      
								                      <input type="hidden" name="documents[2].id" id="licenseFileId" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.licenseFile.required'/>">
								                      <input type="hidden" name="documents[2].dispOrder" value="3">
								                      
								                      <input type="hidden" name="documents[3].id" id="taxCodeFileId" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.taxCodeFile.required'/>">
								                      <input type="hidden" name="documents[3].dispOrder" value="4">
								                      
								                      <input type="hidden" name="documents[4].id" id="fsFileLastYearId" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.fsFileLastYear.required'/>">
								                      <input type="hidden" name="documents[4].dispOrder" value="5">
								                      
								                      <input type="hidden" name="documents[5].id" id="fsFileLast2YearId" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.fsFileLast2Year.required'/>">
								                      <input type="hidden" name="documents[5].dispOrder" value="6">
								                      
								                      <input type="hidden" name="documents[6].id" id="invoiceFile1Id" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceFile.required'/>">
								                      <input type="hidden" name="documents[6].dispOrder" value="7">
								                      
								                      <input type="hidden" name="documents[7].id" id="invoiceFile2Id" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceFile.required'/>">
								                      <input type="hidden" name="documents[7].dispOrder" value="8">
								                          
								                      <input type="hidden" name="documents[8].id" id="invoiceFile3Id" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceFile.required'/>">
								                      <input type="hidden" name="documents[8].dispOrder" value="9">
								                                               
								                    </form>
                                                </div>
                                             </div>
                                             <!-- End tab4: Documents-->
                                             <!-- Begin tab5: Terms and Conditions-->
                                             <div class="tab-pane" id="tab-terms-conditions">
                                               <form class="form-horizontal" id="form-terms-conditions" method="POST" enctype="multipart/form-data">
                                                  <div style="height: 220px; max-height: 220px; overflow: auto; padding: 10px 10px; background: white; border: solid #B3AA9F thin; ">
										            <h6><fmt:message key='buyer.apply.form.field.title.h6' /></h6> <p><fmt:message key='buyer.apply.form.field.modifiedTime' /> (<a href="../../policies/terms/archive/"><fmt:message key='buyer.apply.form.field.modified.a' /></a>) </p><h6><fmt:message key='buyer.apply.form.field.content.welcome' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p1' /> </p><p><fmt:message key='buyer.apply.form.field.content.p2' /></p><p><fmt:message key='buyer.apply.form.field.content.p3' /></p><h6 id="toc-services"><fmt:message key='buyer.apply.form.field.content.using' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p4' /> </p><p><fmt:message key='buyer.apply.form.field.content.p5' /> </p><p><fmt:message key='buyer.apply.form.field.content.p6' /> </p><p><fmt:message key='buyer.apply.form.field.content.p7' /> </p><p><fmt:message key='buyer.apply.form.field.content.p8' /> </p><p><fmt:message key='buyer.apply.form.field.content.p9' /> </p><h6 id="toc-account"><fmt:message key='buyer.apply.form.field.content.account' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p10' /> </p><p><fmt:message key='buyer.apply.form.field.content.p11' /> <a href="http://support.google.com/accounts/bin/answer.py?hl=en&amp;answer=58585"><fmt:message key='buyer.apply.form.field.content.p11.a' /></a>. </p><h6 id="toc-protection"><fmt:message key='buyer.apply.form.field.content.privacy' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p12.goole' /> <a href="../../policies/privacy/"><fmt:message key='buyer.apply.form.field.content.p12.a' /></a> <fmt:message key='buyer.apply.form.field.content.p12' /> </p><p><fmt:message key='buyer.apply.form.field.content.p13' /> </p><p><fmt:message key='buyer.apply.form.field.content.p14' /> <a href="http://support.google.com/bin/static.py?hl=en&amp;ts=1114905&amp;page=ts.cs"><fmt:message key='buyer.apply.form.field.content.p14.a' /></a>. </p><h6 id="toc-content"><fmt:message key='buyer.apply.form.field.content.yourContent' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p15' /> </p><p><fmt:message key='buyer.apply.form.field.content.p16' /> </p><p><fmt:message key='buyer.apply.form.field.content.p17' /> </p><p><fmt:message key='buyer.apply.form.field.content.p18' /> </p><p><fmt:message key='buyer.apply.form.field.content.p19' /> </p><h6 id="toc-software"><fmt:message key='buyer.apply.form.field.content.aboutSoftware' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p20' /> </p><p><fmt:message key='buyer.apply.form.field.content.p21' /> </p><p><fmt:message key='buyer.apply.form.field.content.p22' /> </p><h6 id="toc-modification"><fmt:message key='buyer.apply.form.field.content.modifying' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p23' /> </p><p><fmt:message key='buyer.apply.form.field.content.p24' /> </p><p><fmt:message key='buyer.apply.form.field.content.p25' /> </p><h6 id="toc-warranties-disclaimers"><fmt:message key='buyer.apply.form.field.content.ourWarranties' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p26' /> </p><p><fmt:message key='buyer.apply.form.field.content.p27' /> </p><p><fmt:message key='buyer.apply.form.field.content.p28' /> </p><h6 id="toc-liability"><fmt:message key='buyer.apply.form.field.content.liability' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p29' /> </p><p><fmt:message key='buyer.apply.form.field.content.p30' /> </p><p><fmt:message key='buyer.apply.form.field.content.p31' /> </p><h6 id="toc-business-uses"><fmt:message key='buyer.apply.form.field.content.business' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p32' /> </p><h6 id="toc-about"><fmt:message key='buyer.apply.form.field.content.aboutThese' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p33' /> </p><p><fmt:message key='buyer.apply.form.field.content.p34' /> </p><p><fmt:message key='buyer.apply.form.field.content.p35' /> </p><p><fmt:message key='buyer.apply.form.field.content.p36' /> </p><p><fmt:message key='buyer.apply.form.field.content.p37' /> </p>
										            <p><fmt:message key='buyer.apply.form.field.content.p38' /> </p><p><fmt:message key='buyer.apply.form.field.content.p39' /> <a href="../../contact/"><fmt:message key='buyer.apply.form.field.content.p39.a' /></a>.</p>
										          </div>
                                                  <div class="form-group" style="margin-top: 10px">
										            <input type="checkbox"  id="checkbox-accept" class="form-control if-input-sm if-div-input-md">&nbsp;&nbsp;&nbsp;<span class="bold"><fmt:message key='buyer.apply.form.field.content.agree' /></span>
										          </div>
										          
                                                </form>
                                             </div>
                                            <!-- End tab5: Terms and Conditions-->
                                           </div>
                                        </div>
                                        <div class="">
                                            <div class="row">
                                                <div class="col-md-12 text-center">
                                                    <a href="javascript:;" class="btn default button-previous" style=" margin-right: 3px;margin-top: 10px;">
                                                        <fmt:message key='buyer.apply.form.button.back' />
                                                    </a>
                                                  <!--   <a href="javascript:;"  id="saveApplication" class="btn default" style=" margin-right: 3px">
                                                        Save
                                                    </a> -->
                                                    <button class="btn default" style=" margin-right: 3px;margin-top: 10px;" id="saveApplication" type="button" ><fmt:message key='buyer.apply.form.button.Save' /></button>
                                                    
                                                    <button class="btn default button-next"  style=" margin-right: 3px;margin-top: 10px;" id="continueApp" type="button" ><fmt:message key='buyer.apply.form.button.continue' /></button>
                                              
                                                      <!--   <a href="javascript:;" class="btn default button-next">
                                                        Continue
                                                    </a> -->
                                                 <!--    <a href="javascript:;"  id="submitApplication"  class="btn default button-submit">
                                                        Submit
                                                    </a> -->
                                                   
                                                    <button  class="btn default button-submit"  disabled style="margin-top: 10px;" id="submitApplication"  type="button" ><fmt:message key='buyer.apply.form.button.Submit' /></button>
                                                    
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
    <%-- <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-validation/js/jquery.validate.min.js"></script> --%>
    <%--  <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-validation/js/additional-methods.min.js"></script> --%>
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/select2/select2.min.js"></script>
    
    <script src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.js"></script>
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>
    <!-- END PAGE LEVEL PLUGINS -->

    <script src="${base}/static/libs/metronic/3.3.0/assets/global/scripts/metronic.js"></script>
    <script src="${base}/static/libs/metronic/3.3.0/assets/admin/pages/scripts/components-pickers.js"></script>
    <script src="${base}/static/themes/metronic/js/layout.js"></script>
    <script src="${base}/static/themes/metronic/js/quick-sidebar.js"></script>
    <script src="${base}/static/themes/metronic/js/seller/account/apply-application.js"></script>
    <script src="${base}/static/themes/metronic/js/ifactor.js"></script>
    <script src="${base}/static/themes/metronic/js/common.js"></script>
    
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-process.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-validate.js"></script>
    
    <script type="text/javascript" src="${base}/static/themes/metronic/js/String.prototype.js"></script>
    <script type="text/javascript" src="${base}/static/themes/metronic/js/Date.prototype.js"></script>
    
    <script type="text/javascript" src="${base}/static/themes/metronic/js/jquery.validate.custom.js"></script>
    <script type="text/javascript" src="${base}/static/themes/metronic/js/seller/account/apply-as-seller.js"></script>
    
    
    <script type="text/javascript">
    var app = {
    	      base: '${base}', 
    	      version: '${version.app}', 
    	      loginName: '${loginUser.loginName}',
    	      selfUrl:'${self.url}',
    	      errorMsg: {
    	    	  mailAddress:"<fmt:message key='seller.apply.form.field.address.required'/>",
    	    	  comDistrict2:"<fmt:message key='seller.apply.form.field.comDistrict2.required'/>",
    	    	  comRegion2:"<fmt:message key='seller.apply.form.field.comRegion2.required'/>",
    	    	  comCity2:"<fmt:message key='seller.apply.form.field.comCity2.required'/>",
    	    	  comCountry2:"<fmt:message key='seller.apply.form.field.comCountry2.required'/>",
    	    	  comPostcode2:"<fmt:message key='seller.apply.form.field.comPostcode2.required'/>"
    	      },
    	      
    	      successSavedMsg:"<fmt:message key='seller.apply.message.successSaved'/>",
    	      successUpdatedMsg:"<fmt:message key='seller.apply.message.successUpdated'/>",
    	      successSubmittedMsg:"<fmt:message key='seller.apply.message.successSubmitted'/>",
    	      successRedirectMsg:"<fmt:message key='seller.apply.message.successRedirectMsg'/>"
    	 };
    	    
        jQuery(document).ready(function () {
            Metronic.init(); // init metronic core components
            Layout.init(); // init current layout
            ComponentsPickers.init();
            // var titles = ['Personal information', 'Company information', 'Futher details', 'Documents', 'Terms and conditions'];
            // FormWizard.init(titles);
            
            var forms = [
                {id:'form-personal-info', title:'Personal information'}, 
                {id:'form-company-info', title:'Company information'},
                {id:'form-further-details', title:'Futher details'},
                {id:'form-documents-hidden', title:'Documents'},
                {id:'form-terms-conditions', title:'Terms and conditions'}
            ];
            
            FormWizard.init(forms);
            
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
