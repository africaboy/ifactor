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
<c:forEach var="doc" items="${sellerApplyDocs}" varStatus="status">
	<c:set target="${self}" property="doc${doc.dispOrder}Name" value="${doc.originalName}" />
    <c:set target="${self}" property="doc${doc.dispOrder}" value="${doc.id}" />
    <c:set target="${self}" property="doc${doc.dispOrder}Link">
      <a title="${doc.originalName}" href="${base}/fileDownload/${doc.bizType}/${doc.id}<c:if test="${not empty doc.extension}">.</c:if>${doc.extension}">
      	<c:if test="${fn:length(doc.originalName)>20}">
      		${fn:substring(doc.originalName,0,10)}...${fn:substring(doc.originalName,fn:length(doc.originalName)-10,fn:length(doc.originalName))}
      	</c:if>
      	<c:if test="${fn:length(doc.originalName)<=20}">
      		${doc.originalName}
      	</c:if>
      </a>
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
    <title>EntroAuction Platform</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link rel="stylesheet" href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css">
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="${base}/static/libs/iCheck-master/skins/all.css?v=1.0.2" rel="stylesheet">
    
    
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
    <%-- <link href="${base}/static/themes/metronic/css/registration.css?ver=${version.app}" rel="stylesheet"> --%>
    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png" />
    <style type="text/css">
    .form-horizontal .form-group {
   	  margin-right: 0px;
   	  margin-left:  0px;
     }
    
    label.error { color:#f00;}
    
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
                                14
                            </span>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <p>
                                    You have 14 new notifications
                                </p>
                            </li>
                            <li>
                                <ul class="dropdown-menu-list scroller" style="height: 200px;">
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-success">
                                                <i class="fa fa-plus"></i>
                                            </span>
                                            New bid for Invoice ID 1234. <span class="time">
                                                Just now
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-danger">
                                                <i class="fa fa-bolt"></i>
                                            </span>Invoice ID 2345 closed.<span class="time">
                                                15 mins
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-warning">
                                                <i class="fa fa-bell-o"></i>
                                            </span>
                                            Invoice ID 3453: Seller agree with... <span class="time">
                                                22 mins
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-info">
                                                <i class="fa fa-bullhorn"></i>
                                            </span>
                                            Invoice ID 8888: Sub-contract has... <span class="time">
                                                40 mins
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="label label-sm label-icon label-danger">
                                                <i class="fa fa-bolt"></i>
                                            </span>
                                            Invoice ID 2375 closed. <span class="time">
                                                2 hrs
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="external">
                                <a href="#" style="color:#428bca">
                                    See all notifications <i class="m-icon-swapright icon-arrow-right" style="color:#428bca; background: none"></i>
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
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/vn.png"> Tiếng Việt
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/cn.png"> 简体中文
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/cn.png"> 繁體中文
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/nl.png"> Nederlands
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/id.png"> Bahasa
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img alt="" src="${base}/static/libs/metronic/3.3.0/assets/global/img/flags/ro.png"> Română
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
                                Seller
                            </span>
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="${base}/seller/profile/view">								
                                    <i class="icon-user"></i> My Profile
                                </a>
                            </li>
                            <li>
                            <li>
                                <a href="${base}/message/inbox">
                                    <i class="icon-envelope-open"></i> My Inbox &nbsp;&nbsp;&nbsp;&nbsp;<span class="badge badge-danger">
                                        3
                                    </span>
                                </a>
                            </li>
                            <li class="divider">
                            </li>
                            <li>
                                <a href="${base}/logout">
                                    <i class="icon-key"></i> Log Out
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
                            <a href="#">Account management</a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#">Modify Application</a>
                        </li>
                    </ul>
                </div>
                <h5 class="page-title">
                    <b>Modify Application</b>
                </h5>
                <h5 class="page-title">
                    <small><b>Application submission date:</b><span>&nbsp;&nbsp;<fmt:formatDate value='${sellerApply.submissionDate}' pattern='MM/dd/yyyy'/></span></small>
                </h5>
                <h5 class="page-title">
                    <small><b>Application Status: <span style="color:#ff6a00">&nbsp;&nbsp;REQUEST FOR MODIFICATION </span></b></small>
                </h5>
                <h5 class="page-title">
                    <small><b>Deadline of modification:</b><span style="color:#d00b0b">&nbsp;&nbsp;<fmt:formatDate value='${sellerApply.deadLineDate}' pattern='MM/dd/yyyy'/></span></small>
                </h5>
                <!-- END PAGE HEADER-->
                <!-- BEGIN PAGE CONTENT-->
                <div class="row">
                    <div class="col-md-12">
                        <div id="form_wizard_1">
                            <div class="portlet-body form">
                                    <div class="form-wizard">
                                        <div class="form-body">
                                            <ul class="nav nav-pills nav-justified steps">
                                            
                                                <li>
                                                    <a href="#tab-modification-request" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table1">
                                                        <span class="number">1 </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> Opinion on modification request
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-personal-info" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table2">
                                                        <span class="number">2 </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> Personal information
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-company-info" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table3">
                                                        <span class="number">3 </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> Company information
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-further-details" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table4">
                                                        <span class="number">4 </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> Further details
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-documents" data-toggle="tab" class="step active">
                                                      <a href="javascript:void(0)" class="step" id="table5">
                                                        <span class="number">5 </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> Documents
                                                        </div>
                                                      </a>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab-terms-conditions" data-toggle="tab" class="step">
                                                      <a href="javascript:void(0)" class="step" id="table6">
                                                        <span class="number"> 6 </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> Terms and Conditions
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
                                                    Step 1 of 4: Personal information
                                                </div>
                                                <div class="alert alert-danger display-none">
                                                    <button class="close" data-dismiss="alert"></button>
                                                    You have some form errors. Please check below.
                                                </div>
                                                <div class="alert alert-success display-none">
                                                    <button class="close" data-dismiss="alert"></button>
                                                    Your form validation is successful!
                                                </div>
                                                
                                                <!-- Begin tab1: Opinion on modification request-->
                                                <div class="tab-pane active" id="tab-modification-request">
                                                   <form action="#" class="form-horizontal" id="form-modification-request" method="POST" enctype="multipart/form-data"> 
                                                    <div class="form-group if-form-group-sm">
                                                      <div style="color: #ff0000; font-weight: 500; font-size: 13px; margin-bottom: 10px;">You must update below fields to complete the application applying process: </div>
                                                      <ol>
                                                        ${sellerApply.flowOpinion}
                                                      </ol>
                                                    </div>
                                                  </form>
                                                </div>
                                                <!-- End tab1: Opinion on modification request-->
                                                
                                                <!-- Begin tab1: Personal information-->
                                                <div class="tab-pane active" id="tab-personal-info">
                                                  <form action="#" class="form-horizontal" id="form-personal-info" method="POST" enctype="multipart/form-data"> 
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="col-sm-6">
								                          <input type="hidden" name="id" value="${sellerApply.id }" />
								                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div> 
                                                     <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&title&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.register.form.field.title'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="title" name="title" value="${sellerApply.title}" <c:if test="${(not fn:contains(modifyFields,'&title&') && isModifyStatus)||!isModifyStatus}">readonly</c:if> />
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&firstName&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                           <fmt:message key='seller.register.form.field.firstName'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="firstName" name="firstName" value="${sellerApply.firstName}" <c:if test="${(not fn:contains(modifyFields,'&firstName&') && isModifyStatus)||!isModifyStatus}">readonly</c:if>  />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&lastName&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.register.form.field.lastName'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="lastName" name="lastName" value="${sellerApply.lastName}" <c:if test="${(not fn:contains(modifyFields,'&lastName&') && isModifyStatus)||!isModifyStatus}">readonly</c:if>  />
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&email&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.register.form.field.email'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="email" name="email" value="${sellerApply.email}" <c:if test="${(not fn:contains(modifyFields,'&email&') && isModifyStatus)||!isModifyStatus}">readonly</c:if> />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                        
                                                        <div class="control-label col-md-2" <c:if test="${fn:contains(modifyFields,'&gender&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.gender'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <select  class="form-control if-input-sm if-div-input-md"  id="gender" name="gender" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.gender.required'/>"  <c:if test="${not fn:contains(modifyFields,'&gender&') && isModifyStatus}">disabled=true</c:if>>
								                              <option value="">  </option>
								                              <c:forEach var="item" items="${genderList}" varStatus="status"> 
								                              <option value="${item.code}"<c:if test="${sellerApply.gender==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                              </c:forEach>
									                         </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&dob&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                           <fmt:message key='seller.apply.form.field.dob'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3 if-input-md">
                                                            <c:choose>
															  <c:when test="${not fn:contains(modifyFields,'&dob&') && isModifyStatus}">
																<input type="text" class="form-control if-input-sm if-div-input-md" id="dobRead" name="dobRead"     value="<fmt:formatDate value='${sellerApply.dob}' pattern='MM/dd/yyyy'/>"   readonly>
															  </c:when>
															  <c:otherwise>
															    <input type="text" class="form-control if-input-sm if-div-input-md date-picker" id="dob" name="dob" autocomplete="off" data-rule-required="true"  value="<fmt:formatDate value='${sellerApply.dob}' pattern='MM/dd/yyyy'/>" data-msg-required="<fmt:message key='seller.apply.form.field.dob.required'/>" data-rule-pattern="^(((0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])/(29|30)|(0[13578]|1[02])/31)/(?!0000)[0-9]{4}|02/29/([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$" data-msg-pattern="<fmt:message key='seller.apply.form.field.dob.pattern'/>" data-rule-isBeforeToday="true" data-msg-isBeforeToday="<fmt:message key='seller.apply.form.field.dob.isBeforeToday'/>" data-rule-isAdult="true"  
						                                         data-msg-isAdult="<fmt:message key='seller.apply.form.field.dob.isAdult'/>" readonly />
															    <div id="error-dob"></div>
										            		  </c:otherwise>
															</c:choose>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                        
                                                        <div class="control-label col-md-2" <c:if test="${fn:contains(modifyFields,'&nationality&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.nationality'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <select  class="form-control if-input-sm if-div-input-md"  id="nationality" name="nationality" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.nationality.required'/>"  <c:if test="${not fn:contains(modifyFields,'&nationality&') && isModifyStatus}">disabled=true</c:if>>
									                            <option value="">  </option>
									                            <c:forEach var="item" items = "${countryList}" varStatus = "status">
									                            <option value="${item.code}"<c:if test="${item.code==sellerApply.nationality}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
									                            </c:forEach>
									                         </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&countryOfResidence&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.countryOfResidence'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <select  class="form-control if-input-sm if-div-input-md" id="countryOfResidence" name="countryOfResidence" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.countryOfResidence.required'/>"  <c:if test="${not fn:contains(modifyFields,'&countryOfResidence&') && isModifyStatus}">disabled=true</c:if>>
								                            <option value="">  </option>
								                            <c:forEach var="item" items = "${countryList}" varStatus = "status">
								                            <option value="${item.code}"<c:if test="${item.code==sellerApply.countryOfResidence}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                            </c:forEach>
									                      </select>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                       
                                                        <div class="control-label col-md-2"  <c:if test="${fn:contains(modifyFields,'&idType&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.idType'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <select class="form-control if-input-sm if-div-input-md" id="idType" name="idType"  data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.idType.required'/>"  <c:if test="${not fn:contains(modifyFields,'&idType&') && isModifyStatus}">disabled=true</c:if>>
								                            <option value="">  </option>
								                            <c:forEach var="item" items="${idTypeList}" varStatus="status"> 
								                            <option value="${item.code}"<c:if test="${sellerApply.idType==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                            </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&idNumber&')  && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.idNumber'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="idNumber" name="idNumber" value="${sellerApply.idNumber}" placeholder="<fmt:message key='seller.apply.form.field.idNumber.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.idNumber.required'/>"   data-rule-pattern="^[0-9a-zA-Z]{7,12}$"
								                             data-msg-pattern="<fmt:message key='seller.apply.form.field.idNumber.pattern'/>" <c:if test="${not fn:contains(modifyFields,'&idNumber&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">                                                       
                                                        <div class="control-label col-md-2" <c:if test="${fn:contains(modifyFields,'&workCountryCode&') || fn:contains(modifyFields,'&workPhone&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                          <fmt:message key='seller.register.form.field.workPhone'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left" id="workCountryCode" name="workCountryCode"  value="${sellerApply.workCountryCode}"  data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='seller.apply.form.field.workCountryCode.pattern'/>"   <c:if test="${(not fn:contains(modifyFields,'&workCountryCode&') && isModifyStatus)||!isModifyStatus}">readonly</c:if> />
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right" id="workPhone" name="workPhone" value="${sellerApply.workPhone}" data-rule-required="true"     data-rule-pattern="^[0-9]{5,15}$" 	data-msg-pattern="<fmt:message key='seller.apply.form.field.workPhone.pattern'/>"   <c:if test="${(not fn:contains(modifyFields,'&workPhone&') && isModifyStatus)||!isModifyStatus}">readonly</c:if>  />
                                                            <div id="error-workCountryCode"></div>
                                                        </div>
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&mobileCountryCode&') || fn:contains(modifyFields,'&mobilePhone&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                           <fmt:message key='seller.register.form.field.mobilePhone'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" value="+84" style="display: inline-block; max-width: 20%;float: left"   id="mobileCountryCode" name="mobileCountryCode" value="${sellerApply.mobileCountryCode}"    data-rule-pattern="^\+?[0-9]{2,4}$"   data-msg-pattern="<fmt:message key='seller.apply.form.field.mobileCountryCode.pattern'/>"  <c:if test="${(not fn:contains(modifyFields,'&mobileCountryCode&') && isModifyStatus)||!isModifyStatus}">readonly</c:if> >
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" style="display: inline-block; max-width: 79%;float: right"  id="mobilePhone" name="mobilePhone" value="${sellerApply.mobilePhone}" data-rule-required="true"     data-rule-pattern="^[0-9]{5,15}$" 	data-msg-pattern="<fmt:message key='seller.apply.form.field.mobilePhone.pattern'/>"   <c:if test="${(not fn:contains(modifyFields,'&mobilePhone&') && isModifyStatus)||!isModifyStatus}">readonly</c:if>  />
                                                        </div>
                                                        <div class="col-md-offset-1"></div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2" <c:if test="${fn:contains(modifyFields,'&position&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.register.form.field.position'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="position" name="position"   maxlength="255" value="${sellerApply.position}" data-rule-required="true" data-msg-required="<fmt:message key='seller.register.form.field.position.required'/>"  <c:if test="${(not fn:contains(modifyFields,'&position&') && isModifyStatus)||!isModifyStatus}">readonly</c:if> />
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
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md"  <c:if test="${fn:contains(modifyFields,'&companyName&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                           <fmt:message key='seller.apply.form.field.companyName'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="companyName" name="companyName"  maxlength="255" value="${sellerApply.companyName}" placeholder="<fmt:message key='seller.apply.form.field.companyName.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.companyName.required'/>"  <c:if test="${not fn:contains(modifyFields,'&companyName&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                        <div class="control-label col-md-3" <c:if test="${fn:contains(modifyFields,'&isComVietnam&') || fn:contains(modifyFields,'&comRegisteredCountry&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.isComVietnam' /><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <!--<input type="text" class="form-control if-input-sm if-div-input-md" name="companyregistered" id="companyregistered" />-->
                                                          <select class="form-control if-input-sm if-div-input-md"  id="isComVietnam" name="isComVietnam" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.isComVietnam.required'/>"  <c:if test="${not fn:contains(modifyFields,'&isComVietnam&') && not fn:contains(modifyFields,'&comRegisteredCountry&')&& isModifyStatus}">disabled=true</c:if>>
														    <option value="">  </option>
														    <c:forEach var="item" items="${isComVietnamList}" varStatus="status">
														    <option value="${item.code}"<c:if test="${item.code==sellerApply.isComVietnam}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
													        </c:forEach>
													      </select>
                                                        </div>
                                                    </div>
                                                    <!-- row 2 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md if-control-label-multiple-line" <c:if test="${fn:contains(modifyFields,'&isComVietnam&') || fn:contains(modifyFields,'&comRegisteredCountry&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                           <fmt:message key='seller.apply.form.field.comRegisteredCountry' />
                                                        </div>
                                                        <div class="col-md-3">
			                                              <select  class="form-control if-input-sm if-div-input-md" id="comRegisteredCountry" name="comRegisteredCountry" 	data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comRegisteredCountry.required'/>"   <c:if test="${not fn:contains(modifyFields,'&isComVietnam&') && not fn:contains(modifyFields,'&comRegisteredCountry&') && isModifyStatus}">disabled=true</c:if>>
															<option value="">  </option>
															<c:forEach var="item" items="${countryList}" varStatus="status">
														    <option value="${item.code}"<c:if test="${item.code==sellerApply.comRegisteredCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
															</c:forEach>
														</select>
                                                        </div>
                                                        <div class="control-label col-md-3" <c:if test="${fn:contains(modifyFields,'&comRegistrationNumber&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                           <fmt:message	key='seller.apply.form.field.comRegistrationNumber' /> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                           <input type="text" class="form-control if-input-sm if-div-input-md" id="comRegistrationNumber"   value="${sellerApply.comRegistrationNumber}" name="comRegistrationNumber"  placeholder="<fmt:message key='seller.apply.form.field.comRegistrationNumber.placeholder'/>"
															data-rule-required="true"   data-msg-required="<fmt:message key='seller.apply.form.field.comRegistrationNumber.required'/>"
															data-rule-pattern="^[0-9a-zA-Z]{8,12}$"  data-msg-pattern="<fmt:message key='seller.apply.form.field.comRegistrationNumber.pattern'/>"  <c:if test="${not fn:contains(modifyFields,'&comRegistrationNumber&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                    <!-- row 3 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&comTaxCode&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                          <fmt:message key='seller.apply.form.field.comTaxCode' /><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comTaxCode" name="comTaxCode" placeholder="<fmt:message key='seller.apply.form.field.comTaxCode.placeholder'/>"
															data-rule-required="true" 	data-msg-required="<fmt:message key='seller.apply.form.field.comTaxCode.required'/>"
															data-rule-pattern="^[0-9a-zA-Z]{8,12}$" value="${sellerApply.comTaxCode}"
															data-msg-pattern="<fmt:message key='seller.apply.form.field.comTaxCode.pattern'/>" <c:if test="${not fn:contains(modifyFields,'&comTaxCode&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                        <div class="control-label col-md-3" <c:if test="${fn:contains(modifyFields,'&comEstablishmentDate&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.comEstablishmentDate'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3 if-input-md">
                                                          <c:choose>
															<c:when test="${not fn:contains(modifyFields,'&comEstablishmentDate&') && isModifyStatus}">
																<input type="text" class="form-control if-input-sm if-div-input-md" id="comEstablishmentDateRead" name="comEstablishmentDateRead"     value="<fmt:formatDate value='${sellerApply.comEstablishmentDate}' pattern='MM/dd/yyyy'/>"   readonly>
															</c:when>
															<c:otherwise>
															<input type="text" class="form-control if-input-sm if-div-input-md date-picker"
																id="comEstablishmentDate" name="comEstablishmentDate" data-rule-required="true"
											                    data-msg-required="<fmt:message key='seller.apply.form.field.comEstablishmentDate.required'/>"
																value="<fmt:formatDate value='${sellerApply.comEstablishmentDate}' pattern='MM/dd/yyyy'/>"  data-rule-pattern="^(((0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])/(29|30)|(0[13578]|1[02])/31)/(?!0000)[0-9]{4}|02/29/([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$" data-msg-pattern="<fmt:message key='seller.apply.form.field.comEstablishmentDate.pattern'/>"
											                    data-rule-isBeforeToday="true" data-msg-isBeforeToday="<fmt:message key='seller.apply.form.field.comEstablishmentDate.isBeforeToday' />"
											                    readonly />
															    <div id="error-comEstablishmentDate"></div>
										            		</c:otherwise>
														  </c:choose>
                                                         </div>
                                                    </div>
                                                    <!-- row 4 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&comIndustrySector&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                          <fmt:message key='seller.apply.form.field.comIndustrySector'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                        <select  class="form-control if-input-sm if-div-input-md" id="comIndustrySector" name="comIndustrySector" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comIndustrySector.required'/>"  <c:if test="${not fn:contains(modifyFields,'&comIndustrySector&') && isModifyStatus}">disabled=true</c:if>>
								                          <option value="">  </option>
								                            <c:forEach var="item" items="${industryList}"> 
								                            <option value="${item.code}" class="option1" disabled <c:if test="${item.code==sellerApply.comIndustrySector}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                              <c:forEach var="item2" items="${item.children}"> 
								                              <option value="${item2.code}" class="option2" disabled  <c:if test="${item2.code==sellerApply.comIndustrySector}"> selected</c:if>>&nbsp&nbsp${item2[self.i18n.catalog_name]}</option>
								                                <c:forEach var="item3" items="${item2.children}"> 
									                            <option value="${item3.code}"  class="option3"  <c:if test="${item3.code==sellerApply.comIndustrySector}"> selected</c:if>>&nbsp&nbsp&nbsp&nbsp${item3[self.i18n.catalog_name]}</option>
									                            </c:forEach>
								                              </c:forEach>
								                            </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-3"  <c:if test="${fn:contains(modifyFields,'&comAddress&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                           <fmt:message key='seller.apply.form.field.comAddress'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comAddress" name="comAddress"  maxlength="255" value="${sellerApply.comAddress}" placeholder="<fmt:message key='seller.apply.form.field.comAddress.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comAddress.required'/>"  <c:if test="${not fn:contains(modifyFields,'&comAddress&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                    <!-- row 5 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md"  <c:if test="${fn:contains(modifyFields,'&comDistrict&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                          <fmt:message key='seller.apply.form.field.comDistrict'/><span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comDistrict" name="comDistrict"  maxlength="255" value="${sellerApply.comDistrict}" placeholder="<fmt:message key='seller.apply.form.field.comDistrict'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comDistrict.required'/>"  <c:if test="${not fn:contains(modifyFields,'&comDistrict&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                        <div class="control-label col-md-3" <c:if test="${fn:contains(modifyFields,'&comCity&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.comCity'/>  <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comCity" name="comCity"  maxlength="255"  value="${sellerApply.comCity}" placeholder="<fmt:message key='seller.apply.form.field.comCity.placeholder'/>" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comCity.required'/>"  <c:if test="${not fn:contains(modifyFields,'&comCity&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                    <!-- row 6 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-md"  <c:if test="${fn:contains(modifyFields,'&comRegion&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                          <fmt:message key='seller.apply.form.field.comRegion'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comRegion" name="comRegion" maxlength="255" value="${sellerApply.comRegion}" placeholder="<fmt:message key='seller.apply.form.field.comRegion.placeholder'/>"  <c:if test="${not fn:contains(modifyFields,'&comRegion&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                        <div class="control-label col-md-3" <c:if test="${fn:contains(modifyFields,'&comPostcode&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.comPostcode'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <input type="text" class="form-control if-input-sm if-div-input-md"  id="comPostcode" name="comPostcode" value="${sellerApply.comPostcode}" placeholder="<fmt:message key='seller.apply.form.field.comPostcode.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comPostcode.required'/>"  data-rule-pattern="^.{4,8}$"
															data-msg-pattern="<fmt:message key='seller.apply.form.field.comPostcode.pattern'/>"  <c:if test="${not fn:contains(modifyFields,'&comPostcode&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                    <!-- row 7 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&comCountry&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                           <fmt:message key='seller.apply.form.field.comCountry'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                         <select  class="form-control if-input-sm if-div-input-md"  id="comCountry" name="comCountry" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comCountry.required'/>" <c:if test="${not fn:contains(modifyFields,'&comCountry&') && isModifyStatus}">disabled=true</c:if>>
								                           <option value="">  </option>
								                           <c:forEach var="item" items = "${countryList}" varStatus = "status">
								                           <option value="${item.code}"<c:if test="${item.code==sellerApply.comCountry}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
								                           </c:forEach>
								                         </select>
                                                        </div>
                                                    </div>
                                                    <!-- row 8 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3" <c:if test="${fn:contains(modifyFields,'&isComAddress2&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                          <fmt:message key='seller.apply.form.field.isComAddress2'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <input type="checkbox" class="form-control if-input-sm if-div-input-md" id="isComAddress2" name="isComAddress2"<c:if test="${not empty sellerApply.comAddress2}"> checked </c:if> <c:if test="${not fn:contains(modifyFields,'&isComAddress2&') && isModifyStatus}">disabled=true</c:if>/>
                         							      <input type="hidden" id="comAddress2" name="comAddress2" value="${sellerApply.comAddress2}" />
                                                        </div>
                                                    </div>
                                                    <!-- row 9 -->
                                                    <div id="addressDiv"  class="form-group if-form-group-sm" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
                                                        <div class="control-label col-md-3 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&address&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.address'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="address" name="address"  maxlength="255" value="${sellerApply.address}"  placeholder="<fmt:message key='seller.apply.form.field.address.placeholder'/>" data-rule-required="false"    data-msg-required="<fmt:message key='seller.apply.form.field.address.required'/>" <c:if test="${not fn:contains(modifyFields,'&address&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                        <div class="control-label col-md-3"  <c:if test="${fn:contains(modifyFields,'&comDistrict2&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.comDistrict2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comDistrict2" name="comDistrict2"   maxlength="255" value="${sellerApply.comDistrict2}" placeholder="<fmt:message key='seller.apply.form.field.comDistrict2'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comDistrict2.required'/>"  <c:if test="${not fn:contains(modifyFields,'&comDistrict2&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                    <!-- row 10 -->
                                                    <div   id="comCityDiv" class="form-group if-form-group-sm" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
                                                        <div class="control-label col-md-3 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&comCity2&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.comCity2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comCity2" name="comCity2" value="${sellerApply.comCity2}" maxlength="255"  data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comCity2.placeholder'/>"  <c:if test="${not fn:contains(modifyFields,'&comCity2&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                        <div class="control-label col-md-3" style="display: inline-block" <c:if test="${fn:contains(modifyFields,'&comRegion2&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.comRegion2'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="comRegion2" name="comRegion2"  maxlength="255"  value="${sellerApply.comRegion2}" placeholder="<fmt:message key='seller.apply.form.field.comRegion2.placeholder'/>" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comRegion2.required'/>"  <c:if test="${not fn:contains(modifyFields,'&comRegion2&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                    <!-- row 11 -->
                                                    <div  id="comCountryDiv"   class="form-group if-form-group-sm" <c:if test="${empty sellerApply.comAddress2}"> style="display:none;"</c:if> /> 
                                                        <div class="control-label col-md-3 if-control-label-md" <c:if test="${fn:contains(modifyFields,'&comCountry2&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.comCountry2'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                         <select  class="form-control if-input-sm if-div-input-md" id="comCountry2" name="comCountry2" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.comCountry2.required'/>" <c:if test="${not fn:contains(modifyFields,'&comCountry2&') && isModifyStatus}">disabled=true</c:if>>
							                               <option value="">  </option>
							                               <c:forEach var="item" items = "${countryList}" varStatus = "status">
							                               <option value="${item.code}"<c:if test="${item.code==sellerApply.comCountry2}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
							                               </c:forEach>
								                          </select>
                                                        </div>
                                                        <div class="control-label col-md-3" style="display: inline-block" <c:if test="${fn:contains(modifyFields,'&comPostcode2&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                          <fmt:message key='seller.apply.form.field.comPostcode2'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="comPostcode2" name="comPostcode2" value="${sellerApply.comPostcode2}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.comPostcode2.required'/>"  data-rule-pattern="^.{4,8}$"
															data-msg-pattern="<fmt:message key='seller.apply.form.field.comPostcode2.pattern'/>"   <c:if test="${not fn:contains(modifyFields,'&comPostcode2&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                    <!-- row 12 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-multiple-line" <c:if test="${fn:contains(modifyFields,'&comNearestCenter&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                        <fmt:message key='seller.apply.form.field.comNearestCenter'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <select class="form-control if-input-sm if-div-input-md" id="comNearestCenter" name="comNearestCenter" data-rule-required="true"  placeholder="<fmt:message key='seller.apply.form.field.comNearestCenter.placeholder'/>" data-msg-required="<fmt:message key='seller.apply.form.field.comNearestCenter.required'/>" <c:if test="${not fn:contains(modifyFields,'&comNearestCenter&') && isModifyStatus}">disabled=true</c:if>>
								                            <option value="">  </option>
								                            <c:forEach var="item" items="${nearestSMECenterList}" varStatus="status"> 
								                            <option value="${item.code}"<c:if test="${sellerApply.comNearestCenter==item.code}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
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
                                                        <div class="control-label col-md-2 col-md-offset-1 if-control-label-multiple-line" <c:if test="${fn:contains(modifyFields,'&debtorA1Name&') || fn:contains(modifyFields,'&debtorA2Name&') || fn:contains(modifyFields,'&debtorA3Name&') || fn:contains(modifyFields,'&debtorA4Name&')|| fn:contains(modifyFields,'&debtorA5Name&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                          <fmt:message key='seller.apply.form.label.choose5MainDebtors'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                          <input type="hidden" id="debtorA1Id" name="debtorA1Id" value="${sellerApply.debtorA1Id}" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md" id="debtorA1Name" name="debtorA1Name" value="${sellerApply.debtorA1Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  <c:if test="${not fn:contains(modifyFields,'&debtorA1Name&') && isModifyStatus}">readonly</c:if>/>
								                          <input type="hidden" id="debtorA2Id" name="debtorA2Id" value="${sellerApply.debtorA2Id}" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md" id="debtorA2Name" name="debtorA2Name" value="${sellerApply.debtorA2Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  <c:if test="${not fn:contains(modifyFields,'&debtorA2Name&') && isModifyStatus}">readonly</c:if>/>
								                          <input type="hidden" id="debtorA3Id" name="debtorA3Id" value="${sellerApply.debtorA3Id}" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md" id="debtorA3Name" name="debtorA3Name" value="${sellerApply.debtorA3Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  <c:if test="${not fn:contains(modifyFields,'&debtorA3Name&') && isModifyStatus}">readonly</c:if>/>
								                          <input type="hidden" id="debtorA4Id" name="debtorA4Id" value="${sellerApply.debtorA4Id}" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md" id="debtorA4Name" name="debtorA4Name" value="${sellerApply.debtorA4Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  <c:if test="${not fn:contains(modifyFields,'&debtorA4Name&') && isModifyStatus}">readonly</c:if>/>
								                          <input type="hidden" id="debtorA5Id" name="debtorA5Id" value="${sellerApply.debtorA5Id}" />
								                          <input type="text" class="form-control if-input-sm if-div-input-md" id="debtorA5Name" name="debtorA5Name" value="${sellerApply.debtorA5Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.mainDebtor.required'/>"  <c:if test="${not fn:contains(modifyFields,'&debtorA5Name&') && isModifyStatus}">readonly</c:if>/>
                                                      
                                                        </div>
                                                        <div class="control-label col-md-3" <c:if test="${fn:contains(modifyFields,'&debtorB1Name&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.label.choose5OtherDebtors'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="hidden" id="debtorB1Id" name="debtorB1Id"     maxlength="200"  value="${sellerApply.debtorB1Id}" />
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="debtorB1Name"  maxlength="200"  name="debtorB1Name" value="${sellerApply.debtorB1Name}" data-rule-required="false" data-msg-required="<fmt:message key='seller.apply.form.field.otherDebtor.required'/>"  <c:if test="${not fn:contains(modifyFields,'&debtorB1Name&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                    <!-- row 2 -->
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-3 if-control-label-multiple-line" <c:if test="${fn:contains(modifyFields,'&invoiceAvgAmountCode&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                            <fmt:message key='seller.apply.form.field.invoiceAvgAmountCode'/> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-3">
                                                         <select class="form-control if-input-sm if-div-input-md"  id="invoiceAvgAmountCode" name="invoiceAvgAmountCode"  data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceAvgAmountCode.required'/>" <c:if test="${not fn:contains(modifyFields,'&invoiceAvgAmountCode&') && isModifyStatus}">disabled=true</c:if>>
							                               <option value=""> </option>
							                               <c:forEach var="item" items = "${invAvgAmtOptList}" varStatus = "status">
							                               <option value="${item.code}"<c:if test="${item.code==sellerApply.invoiceAvgAmountCode}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
							                               </c:forEach>
							                             </select>
                                                        </div>
                                                        <div class="control-label col-md-3 if-control-label-multiple-line" <c:if test="${fn:contains(modifyFields,'&esignatureSN&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.esignatureSN'/>
                                                        </div>
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md"  id="esignatureSN" name="esignatureSN"    maxlength="255"  value="${sellerApply.esignatureSN}"  <c:if test="${not fn:contains(modifyFields,'&esignatureSN&') && isModifyStatus}">readonly</c:if>/>
                                                        </div>
                                                    </div>
                                                   </form>
                                                </div>
                                               
                                                
                                                <!-- End tab3: Further details-->
                                                <!-- Begin tab4: Documents-->
                                                <div class="tab-pane" id="tab-documents">
                                                  <form class="form-horizontal" method="POST"	id="form-authorizedfile-info" enctype="multipart/form-data">
                                                    <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" <c:if test="${fn:contains(modifyFields,'&idcard_authorizedPerson&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.identificationFile' /><span class="required">*</span>
                                                       </div>
                                                       <div class="col-md-3"  style="margin-top: 4px;">
													  <c:if test="${fn:contains(modifyFields,'&idcard_authorizedPerson&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc1Name}"> title="${self.doc1Name}" </c:if>
													      	  <c:if test="${empty self.doc1Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="identificationFile" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-identificationFile" name="fileType"	value="${self.docBiztypePrefix}idcard_authorizedPerson" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-identificationFile" class="filename">${self.doc1Link}</div>
													  <div id="error-identificationFileId" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                  
                                                  
                                                  <form class="form-horizontal" method="POST"	id="form-authorizedfile-info" enctype="multipart/form-data">
                                                    <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" <c:if test="${fn:contains(modifyFields,'&idcard_authorizedRep&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.signedFile' /><span class="required">*</span>
                                                       </div>
                                                       <div class="col-md-3"  style="margin-top: 4px;">
													   <c:if test="${fn:contains(modifyFields,'&idcard_authorizedRep&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc2Name}"> title="${self.doc2Name}" </c:if>
													      	  <c:if test="${empty self.doc2Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="signedFile" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-signedFile" name="fileType"	value="${self.docBiztypePrefix}idcard_authorizedRep" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-signedFile" class="filename">${self.doc2Link}</div>
													  <div id="error-signedFileId" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                 
                                                 
                                                  
                                                  <form class="form-horizontal" method="POST"	id="form-authorizedfile-info" enctype="multipart/form-data">
                                                    <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 3px;" <c:if test="${fn:contains(modifyFields,'&license_companyLicense&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.licenseFile' /><span class="required">*</span>
                                                       </div>
                                                       <div class="col-md-3">
													  <c:if test="${fn:contains(modifyFields,'&license_companyLicense&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc3Name}"> title="${self.doc3Name}" </c:if>
													      	  <c:if test="${empty self.doc3Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="licenseFile" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-licenseFile" name="fileType"	value="${self.docBiztypePrefix}license_companyLicense" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-licenseFile" class="filename">${self.doc3Link}</div>
													  <div id="error-licenseFileId" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                  
                                                  
                                                  <form class="form-horizontal" method="POST"	id="form-authorizedfile-info" enctype="multipart/form-data">
                                                    <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 3px;" <c:if test="${fn:contains(modifyFields,'&taxcode_companyTaxCode&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.taxCodeFile' /><span class="required">*</span>
                                                       </div>
                                                       <div class="col-md-3">
													  <c:if test="${fn:contains(modifyFields,'&taxcode_companyTaxCode&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc4Name}"> title="${self.doc4Name}" </c:if>
													      	  <c:if test="${empty self.doc4Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="taxCodeFile" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-taxCodeFile" name="fileType"	value="${self.docBiztypePrefix}taxcode_companyTaxCode" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-taxCodeFile" class="filename">${self.doc4Link}</div>
													  <div id="error-taxCodeFileId" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                  
                                                  <form class="form-horizontal" method="POST"	id="form-authorizedfile-info" enctype="multipart/form-data">
                                                    <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 3px;"  <c:if test="${fn:contains(modifyFields,'&fs_fsLastFiscalYear&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.fsFileLastYear' /><span class="required">*</span>
                                                       </div>
                                                       <div class="col-md-3">
													  <c:if test="${fn:contains(modifyFields,'&fs_fsLastFiscalYear&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc5Name}"> title="${self.doc5Name}" </c:if>
													      	  <c:if test="${empty self.doc5Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="fsFileLastYear" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-fsFileLastYear" name="fileType"	value="${self.docBiztypePrefix}fs_fsLastFiscalYear" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-fsFileLastYear" class="filename">${self.doc5Link}</div>
													  <div id="error-fsFileLastYearId" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                    
                                                  <form class="form-horizontal" method="POST"  id="form-authorizedfile-info" enctype="multipart/form-data">
                                                    <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 3px;" <c:if test="${fn:contains(modifyFields,'&fs_fsLast2FiscalYear&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.fsFileLast2Year' /><span class="required">*</span>
                                                       </div>
                                                       <div class="col-md-3">
													  <c:if test="${fn:contains(modifyFields,'&fs_fsLast2FiscalYear&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc6Name}"> title="${self.doc6Name}" </c:if>
													      	  <c:if test="${empty self.doc6Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="fsFileLast2Year" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-fsFileLast2Year" name="fileType"	value="${self.docBiztypePrefix}fs_fsLast2FiscalYear" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-fsFileLast2Year" class="filename">${self.doc6Link}</div>
													  <div id="error-fsFileLast2YearId" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                  
                                                  <form class="form-horizontal" method="POST"  id="form-authorizedfile-info" enctype="multipart/form-data">
                                                     <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 3px;" <c:if test="${fn:contains(modifyFields,'&invoice_firstPaidInvoice&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         <fmt:message key='seller.apply.form.field.invoiceFile' /><span class="required">*</span>
                                                       </div>
                                                       <div class="col-md-3">
													  <c:if test="${fn:contains(modifyFields,'&invoice_firstPaidInvoice&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc7Name}"> title="${self.doc7Name}" </c:if>
													      	  <c:if test="${empty self.doc7Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="invoiceFile1" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-invoiceFile1" name="fileType"	value="${self.docBiztypePrefix}invoice_firstPaidInvoice" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-invoiceFile1" class="filename">${self.doc7Link}</div>
													  <div id="error-invoiceFile1Id" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                  
                                                  <form class="form-horizontal" method="POST"  id="form-authorizedfile-info" enctype="multipart/form-data">
                                                     <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 3px;" <c:if test="${fn:contains(modifyFields,'&invoice_secondPaidInvoice&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         &nbsp;&nbsp;
                                                       </div>
                                                       <div class="col-md-3">
													  <c:if test="${fn:contains(modifyFields,'&invoice_secondPaidInvoice&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc8Name}"> title="${self.doc8Name}" </c:if>
													      	  <c:if test="${empty self.doc8Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="invoiceFile2" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-invoiceFile2" name="fileType"	value="${self.docBiztypePrefix}invoice_secondPaidInvoice" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-invoiceFile2" class="filename">${self.doc8Link}</div>
													  <div id="error-invoiceFile2Id" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                  
                                                   <form class="form-horizontal" method="POST"  id="form-authorizedfile-info" enctype="multipart/form-data">
                                                     <div class="form-group if-form-group-sm">
                                                       <div class="control-label col-md-offset-3 col-md-3 if-control-label-multiple-line" style="margin-top: 3px;" <c:if test="${fn:contains(modifyFields,'&invoice_thirdPaidInvoice&') && isModifyStatus}">style="color: #ff0000;"</c:if>>
                                                         &nbsp;&nbsp;
                                                       </div>
                                                       <div class="col-md-3">
													  <c:if test="${fn:contains(modifyFields,'&invoice_thirdPaidInvoice&') || not isModifyStatus}">
														<span class="file-extend">
															<span class="fileinput-button" style="display:block;width:72px;height:20px;">
															  <span class="file-uploadBtn"><fmt:message key='buyer.apply.form.button.addFile'/></span>
	                                                          <input type="file" 
	                                                          <c:if test="${not empty self.doc9Name}"> title="${self.doc9Name}" </c:if>
													      	  <c:if test="${empty self.doc9Name}"> title="<fmt:message key='buyer.apply.form.button.uploadFileTip'/>" </c:if>
	                                                           class="if-input-sm if-div-input-md" id="invoiceFile3" name="file" multiple> 
	                                                          <input type="hidden" id="file-type-invoiceFile3" name="fileType"	value="${self.docBiztypePrefix}invoice_thirdPaidInvoice" />
															</span>
														</span>
													  </c:if>
													  <div id="file-link-invoiceFile3" class="filename">${self.doc9Link}</div>
													  <div id="error-invoiceFile3Id" style="clear:both;"></div>
                                                     </div>
                                                   </div>
                                                  </form>
                                                    
								                    <form style="display:none;" id="form-documents-hidden">
								                      <input type="hidden" name="documents[0].id" id="identificationFileId" value="${self.doc1}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.identificationFile.required'/>">
								                      <input type="hidden" name="documents[0].dispOrder" value="1">
								                      
								                      <input type="hidden" name="documents[1].id" id="signedFileId" value="${self.doc2}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.signedFile.required'/>">
								                      <input type="hidden" name="documents[1].dispOrder" value="2">
								                      
								                      <input type="hidden" name="documents[2].id" id="licenseFileId" value="${self.doc3}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.licenseFile.required'/>">
								                      <input type="hidden" name="documents[2].dispOrder" value="3">
								                     
								                      <input type="hidden" name="documents[3].id" id="taxCodeFileId" value="${self.doc4}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.taxCodeFile.required'/>">
								                      <input type="hidden" name="documents[3].dispOrder" value="4">
								                      
								                      <input type="hidden" name="documents[4].id" id="fsFileLastYearId" value="${self.doc5}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.fsFileLastYear.required'/>">
								                      <input type="hidden" name="documents[4].dispOrder" value="5">
								                     
								                      <input type="hidden" name="documents[5].id" id="fsFileLast2YearId" value="${self.doc6}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.fsFileLast2Year.required'/>">
								                      <input type="hidden" name="documents[5].dispOrder" value="6">
								                      
								                      <input type="hidden" name="documents[6].id" id="invoiceFile1Id" value="${self.doc7}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceFile.required'/>">
								                      <input type="hidden" name="documents[6].dispOrder" value="7">
								                      
								                      <input type="hidden" name="documents[7].id" id="invoiceFile2Id" value="${self.doc8}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceFile.required'/>">
								                      <input type="hidden" name="documents[7].dispOrder" value="8">
								                      
								                      <input type="hidden" name="documents[8].id" id="invoiceFile3Id" value="${self.doc9}" data-rule-required="true" data-msg-required="<fmt:message key='seller.apply.form.field.invoiceFile.required'/>">
								                      <input type="hidden" name="documents[8].dispOrder" value="9">
																                                               
								                    </form>
                                                </div>
                                                <!-- End tab4: Documents-->
                                                <!-- Begin tab5: Terms and Conditions-->
                                                <div class="tab-pane" id="tab-terms-conditions">
                                                  <form class="form-horizontal" id="form-terms-conditions" method="POST" enctype="multipart/form-data">
                                                    <div class="form-group if-form-group-sm">
                                                        <div style="height: 220px; max-height: 220px; overflow: auto; padding: 10px 10px; background: white; border: solid #B3AA9F thin; ">
                                                            <h6>Google Terms of Service</h6> <p>Last modified: April 14, 2014 (<a href="../../policies/terms/archive/">view archived versions</a>) </p><h6>Welcome to Google!</h6> <p>Thanks for using our products and services (“Services”). The Services are provided by Google Inc. (“Google”), located at 1600 Amphitheatre Parkway, Mountain View, CA 94043, United States. </p><p>By using our Services, you are agreeing to these terms. Please read them carefully. </p><p>Our Services are very diverse, so sometimes additional terms or product requirements (including age requirements) may apply. Additional terms will be available with the relevant Services, and those additional terms become part of your agreement with us if you use those Services. </p><h6 id="toc-services">Using our Services</h6> <p>You must follow any policies made available to you within the Services. </p><p>Don’t misuse our Services. For example, don’t interfere with our Services or try to access them using a method other than the interface and the instructions that we provide. You may use our Services only as permitted by law, including applicable export and re-export control laws and regulations. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct. </p><p>Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access. You may not use content from our Services unless you obtain permission from its owner or are otherwise permitted by law. These terms do not grant you the right to use any branding or logos used in our Services. Don’t remove, obscure, or alter any legal notices displayed in or along with our Services. </p><p>Our Services display some content that is not Google’s. This content is the sole responsibility of the entity that makes it available. We may review content to determine whether it is illegal or violates our policies, and we may remove or refuse to display content that we reasonably believe violates our policies or the law. But that does not necessarily mean that we review content, so please don’t assume that we do. </p><p>In connection with your use of the Services, we may send you service announcements, administrative messages, and other information. You may opt out of some of those communications. </p><p>Some of our Services are available on mobile devices. Do not use such Services in a way that distracts you and prevents you from obeying traffic or safety laws. </p><h6 id="toc-account">Your Google Account</h6> <p>You may need a Google Account in order to use some of our Services. You may create your own Google Account, or your Google Account may be assigned to you by an administrator, such as your employer or educational institution. If you are using a Google Account assigned to you by an administrator, different or additional terms may apply and your administrator may be able to access or disable your account. </p><p>To protect your Google Account, keep your password confidential. You are responsible for the activity that happens on or through your Google Account. Try not to reuse your Google Account password on third-party applications. If you learn of any unauthorized use of your password or Google Account, <a href="http://support.google.com/accounts/bin/answer.py?hl=en&amp;answer=58585">follow these instructions</a>. </p><h6 id="toc-protection">Privacy and Copyright Protection</h6> <p>Google’s <a href="../../policies/privacy/">privacy policies</a> explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that Google can use such data in accordance with our privacy policies. </p><p>We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers according to the process set out in the U.S. Digital Millennium Copyright Act. </p><p>We provide information to help copyright holders manage their intellectual property online. If you think somebody is violating your copyrights and want to notify us, you can find information about submitting notices and Google’s policy about responding to notices <a href="http://support.google.com/bin/static.py?hl=en&amp;ts=1114905&amp;page=ts.cs">in our Help Center</a>. </p><h6 id="toc-content">Your Content in our Services</h6> <p>Some of our Services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content. In short, what belongs to you stays yours. </p><p>When you upload, submit, store, send or receive content to or through our Services, you give Google (and those we work with) a worldwide license to use, host, store, reproduce, modify, create derivative works (such as those resulting from translations, adaptations or other changes we make so that your content works better with our Services), communicate, publish, publicly perform, publicly display and distribute such content. The rights you grant in this license are for the limited purpose of operating, promoting, and improving our Services, and to develop new ones. This license continues even if you stop using our Services (for example, for a business listing you have added to Google Maps). Some Services may offer you ways to access and remove content that has been provided to that Service. Also, in some of our Services, there are terms or settings that narrow the scope of our use of the content submitted in those Services. Make sure you have the necessary rights to grant us this license for any content that you submit to our Services. </p><p>Our automated systems analyze your content (including emails) to provide you personally relevant product features, such as customized search results, tailored advertising, and spam and malware detection. This analysis occurs as the content is sent, received, and when it is stored. </p><p>If you have a Google Account, we may display your Profile name, Profile photo, and actions you take on Google or on third-party applications connected to your Google Account (such as +1’s, reviews you write and comments you post) in our Services, including displaying in ads and other commercial contexts. We will respect the choices you make to limit sharing or visibility settings in your Google Account. For example, you can choose your settings so your name and photo do not appear in an ad. </p><p>You can find more information about how Google uses and stores content in the privacy policy or additional terms for particular Services. If you submit feedback or suggestions about our Services, we may use your feedback or suggestions without obligation to you. </p><h6 id="toc-software">About Software in our Services</h6> <p>When a Service requires or includes downloadable software, this software may update automatically on your device once a new version or feature is available. Some Services may let you adjust your automatic update settings. </p><p>Google gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to use the software provided to you by Google as part of the Services. This license is for the sole purpose of enabling you to use and enjoy the benefit of the Services as provided by Google, in the manner permitted by these terms. You may not copy, modify, distribute, sell, or lease any part of our Services or included software, nor may you reverse engineer or attempt to extract the source code of that software, unless laws prohibit those restrictions or you have our written permission. </p><p>Open source software is important to us. Some software used in our Services may be offered under an open source license that we will make available to you. There may be provisions in the open source license that expressly override some of these terms. </p><h6 id="toc-modification">Modifying and Terminating our Services</h6> <p>We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether. </p><p>You can stop using our Services at any time, although we’ll be sorry to see you go. Google may also stop providing Services to you, or add or create new limits to our Services at any time. </p><p>We believe that you own your data and preserving your access to such data is important. If we discontinue a Service, where reasonably possible, we will give you reasonable advance notice and a chance to get information out of that Service. </p><h6 id="toc-warranties-disclaimers">Our Warranties and Disclaimers</h6> <p>We provide our Services using a commercially reasonable level of skill and care and we hope that you will enjoy using them. But there are certain things that we don’t promise about our Services. </p><p>OTHER THAN AS EXPRESSLY SET OUT IN THESE TERMS OR ADDITIONAL TERMS, NEITHER GOOGLE NOR ITS SUPPLIERS OR DISTRIBUTORS MAKE ANY SPECIFIC PROMISES ABOUT THE SERVICES. FOR EXAMPLE, WE DON’T MAKE ANY COMMITMENTS ABOUT THE CONTENT WITHIN THE SERVICES, THE SPECIFIC FUNCTIONS OF THE SERVICES, OR THEIR RELIABILITY, AVAILABILITY, OR ABILITY TO MEET YOUR NEEDS. WE PROVIDE THE SERVICES “AS IS”. </p><p>SOME JURISDICTIONS PROVIDE FOR CERTAIN WARRANTIES, LIKE THE IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. TO THE EXTENT PERMITTED BY LAW, WE EXCLUDE ALL WARRANTIES. </p><h6 id="toc-liability">Liability for our Services</h6> <p>WHEN PERMITTED BY LAW, GOOGLE, AND GOOGLE’S SUPPLIERS AND DISTRIBUTORS, WILL NOT BE RESPONSIBLE FOR LOST PROFITS, REVENUES, OR DATA, FINANCIAL LOSSES OR INDIRECT, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES. </p><p>TO THE EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF GOOGLE, AND ITS SUPPLIERS AND DISTRIBUTORS, FOR ANY CLAIMS UNDER THESE TERMS, INCLUDING FOR ANY IMPLIED WARRANTIES, IS LIMITED TO THE AMOUNT YOU PAID US TO USE THE SERVICES (OR, IF WE CHOOSE, TO SUPPLYING YOU THE SERVICES AGAIN). </p><p>IN ALL CASES, GOOGLE, AND ITS SUPPLIERS AND DISTRIBUTORS, WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE THAT IS NOT REASONABLY FORESEEABLE. </p><h6 id="toc-business-uses">Business uses of our Services</h6> <p>If you are using our Services on behalf of a business, that business accepts these terms. It will hold harmless and indemnify Google and its affiliates, officers, agents, and employees from any claim, suit or action arising from or related to the use of the Services or violation of these terms, including any liability or expense arising from claims, losses, damages, suits, judgments, litigation costs and attorneys’ fees. </p><h6 id="toc-about">About these Terms</h6> <p>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. You should look at the terms regularly. We’ll post notice of modifications to these terms on this page. We’ll post notice of modified additional terms in the applicable Service. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions for a Service or changes made for legal reasons will be effective immediately. If you do not agree to the modified terms for a Service, you should discontinue your use of that Service. </p><p>If there is a conflict between these terms and the additional terms, the additional terms will control for that conflict. </p><p>These terms control the relationship between Google and you. They do not create any third party beneficiary rights. </p><p>If you do not comply with these terms, and we don’t take action right away, this doesn’t mean that we are giving up any rights that we may have (such as taking action in the future). </p><p>If it turns out that a particular term is not enforceable, this will not affect any other terms. </p><p>The laws of California, U.S.A., excluding California’s conflict of laws rules, will apply to any disputes arising out of or relating to these terms or the Services. All claims arising out of or relating to these terms or the Services will be litigated exclusively in the federal or state courts of Santa Clara County, California, USA, and you and Google consent to personal jurisdiction in those courts. </p><p>For information about how to contact Google, please visit our <a href="../../contact/">contact page</a>.</p>
                                                        </div>
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
                                                    <a href="javascript:;" class="btn default button-previous" style=" margin-right: 3px">
                                                        Back
                                                    </a>
                                                   <!--  <a href="javascript:;"  id="saveApplication" class="btn default" style=" margin-right: 3px">
                                                        Save
                                                    </a> -->
                                                    <a href="javascript:;" class="btn default button-next">
                                                        Continue
                                                    </a>
                                                    <a href="javascript:;"  id="submitApplication" disabled  class="btn default button-submit">
                                                        Submit
                                                    </a>
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
    <script src="${base}/static/themes/metronic/js/seller/account/update-application.js"></script>
    <script src="${base}/static/themes/metronic/js/ifactor.js"></script>
    <script src="${base}/static/themes/metronic/js/common.js"></script>
    
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-process.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-validate.js"></script>
    
    <script type="text/javascript" src="${base}/static/themes/metronic/js/String.prototype.js"></script>
    <script type="text/javascript" src="${base}/static/themes/metronic/js/Date.prototype.js"></script>
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    
    <script type="text/javascript" src="${base}/static/themes/metronic/js/jquery.validate.custom.js"></script>
    <script type="text/javascript" src="${base}/static/themes/metronic/js/seller/account/apply-update.js"></script>
    
    
    <script type="text/javascript"	>
    
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
			{id:'form-modification-request', title:'Opinion on modification request'}, 
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
       $("#table6").removeAttr("href");
        
    </script>

    <!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
