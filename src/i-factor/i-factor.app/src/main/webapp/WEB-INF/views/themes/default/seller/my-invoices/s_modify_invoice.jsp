<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/metronic/include/i18n.jsp"%>
<spring:eval var="finObjOfInvList" expression="@catalogService.findFinObjOfInv().children" />
<spring:eval var="countryList"  expression="@catalogService.findCountry().children" />
<spring:eval var="readyToAdvList" expression="@catalogService.findReadyToAdv().children" />
<spring:eval var="readyToIntList" expression="@catalogService.findReadyToInt().children" />
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
    <!-- <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" /> -->
    <link href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css"  rel="stylesheet">
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" />
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/blueimp-gallery/blueimp-gallery.min.css" rel="stylesheet"/>
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/css/jquery.fileupload.css" rel="stylesheet"/>
    <link href="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/css/jquery.fileupload-ui.css" rel="stylesheet"/>
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
    <link rel="shortcut icon" href="favicon.ico" />
    
<c:set target="${self}" property="docBiztypePrefix"><%= com.entrofine.ifactor.app.service.InvoiceDocService.BIZTYPE_PREFIX%></c:set>
<c:forEach var="doc" items="${invoiceDocs}" varStatus="status">
	<c:set target="${self}" property="doc${doc.dispOrder}"
		value="${doc.id}" />
	<c:set target="${self}" property="doc${doc.dispOrder}Link">
		<a	href="${base}/fileDownload/${doc.bizType}/${doc.id}<c:if test="${not empty doc.extension}">.</c:if>${doc.extension}">${doc.originalName}</a>
	</c:set>
</c:forEach>

<c:set target="${self}" property="title"><fmt:message key='invoice.submit.submitPage.title'/></c:set>
<c:set target="${self.css}" property="main">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload.css">
    <link rel="stylesheet" href="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/css/jquery.fileupload-ui.css">
    <link href="${base}/static/libs/date-time/css/datepicker.css" rel="stylesheet">
    <style type="text/css">
	body,h2{margin:0 ; padding:0;}

    #BgDiv{background-color:#202020; position:absolute; z-index:99; left:0; top:0; display:none; width:100%; height:1000px;opacity:0.5;filter: alpha(opacity=50);-moz-opacity: 0.5;}

    #DialogDiv{position:absolute;width:400px; left:50%; top:50%; margin-left:-200px; height:auto; z-index:100;background-color:#fff; border:1px #8FA4F5 solid; padding:1px;}

	#DialogDiv h2{ height:25px; font-size:14px; background-color:#8FA4F5; position:relative; padding-left:10px; line-height:25px;}

	#DialogDiv h2 a{position:absolute; right:5px; font-size:12px; color:#000000}

	#DialogDiv .form{padding:10px;}
    </style>
</c:set>

<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/vendor/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-process.js"></script>
    <script type="text/javascript" src="${base}/static/libs/blueimp-file-upload/${version['jquery.fileupload']}/js/jquery.fileupload-validate.js"></script>
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/jquery-validation/${version['jquery.validation']}/dist/additional-methods.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/libs/date-time/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/common.js"></script>
    <script type="text/javascript">
    var app = {
      base: '${base}', 
      version: '${version.app}', 
      loginName: '${loginUser.loginName}',
      selfUrl:'${self.url}',

      successSavedMsg:"<fmt:message key='invoice.submit.message.successSaved'/>",
      successUpdatedMsg:"<fmt:message key='invoice.submit.message.successUpdated'/>",
      successSubmittedMsg:"<fmt:message key='invoice.submit.message.successSubmitted'/>",
      successRedirectMsg:"<fmt:message key='invoice.submit.message.successRedirectMsg'/>"
    };
    </script>
    <script type="text/javascript" src="${base}/static/themes/default/js/seller/my-invoices/under-approval-update.js"></script>
</c:set>
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
                                <a href="extra_profile.html">
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
                        <a href="login.html" class="dropdown-toggle if-logout">
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
                            <a href="#"><fmt:message key='s.modify.invoice.page.head.myInvoices' /></a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#"><fmt:message key='s.modify.invoice.page.head.modify' /></a>
                        </li>
                    </ul>
                </div>
                <h5 class="page-title">
                    <b> <fmt:message key='s.modify.invoice.page.head.modify' /></b>
                </h5>
                <h5 class="page-title">
                  <small><b><fmt:message key='s.modify.invoice.page.invoiceApprovalStaus' /> </b> <span style="color: red; font-weight: normal"><fmt:message key='s.modify.invoice.page.requestFor' /></span></small>
                </h5>
                <h5 class="page-title">
                  <small><b><fmt:message key='s.modify.invoice.page.deadlineOf' />	</b> <span style="color: red; font-weight: normal"><fmt:formatDate value='${invoice.endDate}' pattern='MM/dd/yyyy'/></span></small>
                </h5>
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
                                                  <span class="number"><fmt:message key='s.modify.invoice.page.one' /> </span>
                                                  <div class="desc">
                                                    <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.opinionOn' />
                                                  </div>
                                                </a>
                                              </li>
                                              <li>
                                                  <a href="#tab2" data-toggle="tab" class="step">
                                                      <span class="number"><fmt:message key='s.modify.invoice.page.two' /> </span>
                                                      <div class="desc">
                                                          <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.sellerInformation' />
                                                      </div>
                                                  </a>
                                              </li>
                                                <li>
                                                    <a href="#tab3" data-toggle="tab" class="step">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.three' /> </span>
                                                        <div class="desc desc_modify">
                                                            <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.debtorInformation' />
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab4" data-toggle="tab" class="step">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.four' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.financingInformation' />
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#tab5" data-toggle="tab" class="step active">
                                                        <span class="number"><fmt:message key='s.modify.invoice.page.five' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.readyToSell' />
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                  <a href="#tab6" data-toggle="tab" class="step">
                                                    <span class="number"> <fmt:message key='s.modify.invoice.page.six' /> </span>
                                                    <div class="desc desc_modify">
                                                      <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.documents' />
                                                    </div>
                                                  </a>
                                                </li>
                                                <li>
                                                    <a href="#tab7" data-toggle="tab" class="step">
                                                        <span class="number"> <fmt:message key='s.modify.invoice.page.seven' /> </span>
                                                        <div class="desc">
                                                            <i class="fa fa-check"></i> <fmt:message key='s.modify.invoice.page.step.termsAndConditions' />
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div id="bar" class="progress progress-striped" role="progressbar">
                                                <div class="progress-bar progress-bar-success">
                                                </div>
                                            </div>
                                            <div class="tab-content">
                                                <div class="step-title">
                                                    <fmt:message key='s.modify.invoice.page.oneStepOf' />
                                                </div>
                                                <div class="alert alert-danger display-none">
                                                    <button class="close" data-dismiss="alert"></button>
                                                    <fmt:message key='s.modify.invoice.page.alert.errors' />
                                                </div>
                                                <div class="alert alert-success display-none">
                                                    <button class="close" data-dismiss="alert"></button>
                                                    <fmt:message key='s.modify.invoice.page.alert.success' />
                                                </div>
                                                <!-- Begin tab1: Seller information-->
                                                <div class="tab-pane active" id="tab1">
                                                  <div class="form-group if-form-group-sm">
                                                    <div style="color: #ff0000; font-weight: 500; font-size: 13px; margin-bottom: 10px;"><fmt:message key='s.modify.invoice.page.tab1.youMust' /> </div>
                                                    <ol>
                                                      <li>
                                                        <fmt:message key='s.modify.invoice.page.tab1.invalid' />
                                                      </li>
                                                      <li>
                                                        <fmt:message key='s.modify.invoice.page.tab1.debtorCompany' />
                                                      </li>
                                                      <li>
                                                        <fmt:message key='s.modify.invoice.page.tab1.choose' />
                                                      </li>
                                                    </ol>
                                                  </div>
                                                </div>
                                                <!-- End tab1: Seller information-->
                                                <!-- Begin tab1: Seller information-->
                                                <div class="tab-pane active" id="tab2">
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-2 col-md-2 if-control-label-md">
                                                          <fmt:message key='s.modify.invoice.page.companyName' /> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <input type="text" class="form-control if-input-sm if-div-input-md" id="sellerCompanyName" name="sellerCompanyName" value="${invoice.sellerCompanyName}" disabled="disabled" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group if-form-group-sm">
                                                        <div class="control-label col-md-offset-2 col-md-2 if-control-label-md">
                                                          <fmt:message key='s.modify.invoice.page.representedBy' /> <span class="required">*</span>
                                                        </div>
                                                        <div class="col-md-4">
                                                          <input type="text" class="form-control if-input-sm if-div-input-md" id="sellerRepresentedByName" name="sellerRepresentedByName" disabled="disabled" value="${invoice.sellerRepresentedByName}" readonly />
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End tab1: Seller information-->
                                                <!-- Begin tab2: Debtor information-->
                                                <div class="tab-pane" id="tab3">
                                                  <!-- row 1 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-2 col-md-offset-1 if-control-label-md"> <fmt:message key='s.modify.invoice.page.nameOfDebtor' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="debtorName" name="debtorName" value="${invoice.debtorName}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.debtorName.required'/>"  <c:if test="${not fn:contains(modifyFields,'debtorName') && isModifyStatus}">readonly</c:if>/>                        
                                                    </div>
                                                  </div>
                                                  <!-- row 2 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <span class="required"><fmt:message key='s.modify.invoice.page.companyAdress' /> *</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="debtorAddress"   maxlength="255"  name="debtorAddress"  value="${invoice.debtorAddress}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.debtorAddress.required'/>"  <c:if test="${not fn:contains(modifyFields,'debtorAddress') && isModifyStatus}">readonly</c:if>/>
                                                    </div>
                                                    <div class="control-label col-md-3 if-control-label-md"><span class="required"><fmt:message key='s.modify.invoice.page.district' /> *</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="district" name="district" maxlength="255" data-rule-required="true"  value="${invoice.district}"
														 data-msg-required="<fmt:message key='invoice.submit.form.field.district.required'/>"  <c:if test="${not fn:contains(modifyFields,'district') && isModifyStatus}">readonly</c:if>/>
													</div>
                                                  </div>
                                                  <!-- row 3 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <span class="required"><fmt:message key='s.modify.invoice.page.city' /> *</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="city" name="city"  maxlength="255"  data-rule-required="true"   value="${invoice.city}" data-msg-required="<fmt:message key='invoice.submit.form.field.city.required'/>"  <c:if test="${not fn:contains(modifyFields,'city') && isModifyStatus}">readonly</c:if>/>
						                            </div>
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.region' />
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="region" name="region"  maxlength="255"  value="${invoice.region}" <c:if test="${not fn:contains(modifyFields,'region') && isModifyStatus}">readonly</c:if>/>
						                            </div>
                                                  </div>
                                                  <!-- row 4 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.country' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
														<select class="form-control if-input-sm if-div-input-md" id="country" name="country" data-rule-required="true"
															data-msg-required="<fmt:message key='invoice.submit.form.field.country.required'/>"
															<c:if test="${not fn:contains(modifyFields,'country') && isModifyStatus}">disabled=true</c:if>>
															<option value=""> </option>
															<c:forEach var="item" items="${countryList}" varStatus="status">
																<option value="${item.code}" 
																<c:if test="${item.code==invoice.country}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
															</c:forEach>
														</select>
													</div>
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.postCode' />
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="postCode"  name="postCode" data-rule-required="false"  value="${invoice.postCode}"	data-msg-required="<fmt:message key='seller.apply.form.field.comPostcode.required'/>"
														data-rule-pattern="^.{4,8}$"  data-msg-pattern="<fmt:message key='invoice.submit.form.field.postCode.pattern'/>"  <c:if test="${not fn:contains(modifyFields,'postCode') && isModifyStatus}">readonly</c:if>/>
													</div>									
                                                  </div>
                                                  <!-- row 5 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.companyRegistration' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" disabled="disabled" id="debtorBizRegNo" name="debtorBizRegNo" value="${invoice.debtorBizRegNo}" 	  data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.debtorBizRegNo.required'/>"  data-rule-pattern="^[0-9a-zA-Z]{8,12}$"
															data-msg-pattern="<fmt:message key='invoice.submit.form.field.debtorBizRegNo.pattern'/>" <c:if test="${not fn:contains(modifyFields,'debtorBizRegNo') && isModifyStatus}">readonly</c:if>/>
							                        </div>
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.taxCode' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" disabled="disabled" id="debtorTaxCode" name="debtorTaxCode" value="${invoice.debtorTaxCode}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.debtorTaxCode.required'/>"  data-rule-pattern="^[0-9a-zA-Z]{8,12}$"
															data-msg-pattern="<fmt:message key='invoice.submit.form.field.debtorTaxCode.pattern'/>" <c:if test="${not fn:contains(modifyFields,'debtorTaxCode') && isModifyStatus}">readonly</c:if>/>
							                        </div>
                                                  </div>
                                                </div>
                                                <!-- End tab2: Debtor information-->
                                                <!-- Begin tab3: Financing information-->
                                                <div class="tab-pane" id="tab4">
                                                  <!-- row 1 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                     <fmt:message key='s.modify.invoice.page.stickerId'/> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="finStickerId" name="finStickerId"   maxlength="6"	 value="${invoice.finStickerId}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finStickerId.required'/>" 	data-rule-pattern="^[0-9a-zA-Z]{6}$"
															data-msg-pattern="<fmt:message key='invoice.submit.form.field.finStickerId.pattern'/>" <c:if test="${not fn:contains(modifyFields,'finStickerId') && isModifyStatus}">readonly</c:if>/>
							                        </div>
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.serialNumOfInv' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="serialNumInvoice"  name="serialNumInvoice" data-rule-required="true" minlength="3"  value="${invoice.serialNumInvoice}"
															maxlength="12"  data-msg-required="<fmt:message key='invoice.submit.form.field.serialNumInvoice.required'/>" <c:if test="${not fn:contains(modifyFields,'serialNumInvoice') && isModifyStatus}">readonly</c:if>/>
												    </div>
                                                  </div>
                                                  <!-- row 2 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.vatInvoice' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="finVatInvNo" name="finVatInvNo" value="${invoice.finVatInvNo}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finVatInvNo.required'/>" data-rule-pattern="^[0-9]{5,12}$"
															data-msg-pattern="<fmt:message key='invoice.submit.form.field.finVatInvNo.pattern'/>"  <c:if test="${not fn:contains(modifyFields,'finVatInvNo') && isModifyStatus}">readonly</c:if>/>
							                        </div>
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.invoiceIssuanceDate' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
							                        <c:choose>
															<c:when test="${not fn:contains(modifyFields,'finInvIssDate') && isModifyStatus}">
																<input type="text" class="form-control if-input-sm if-div-input-md" id="finInvIssDateRead" name="finInvIssDateRead"     value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='MM/dd/yyyy'/>"   >
															</c:when>
															<c:otherwise>
									                          <div class="input-group">
									                            <input type="text" class="form-control if-input-sm if-div-input-md" id="finInvIssDate" autocomplete="off" name="finInvIssDate" value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='MM/dd/yyyy'/>"  autocomplete="off"  data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finInvIssDate.required'/>" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="<fmt:message key='invoice.submit.form.field.finInvIssDate.pattern'/>"   data-rule-isBeforeToday="true"
																data-msg-isBeforeToday="<fmt:message key='invoice.submit.form.field.finInvIssDate.isBeforeToday'/>"  />
																<span class="input-group-addon">
																  <i class="icon-calendar"></i>
																</span>
															  </div>
													  	</c:otherwise>
														</c:choose>
							                        </div>
                                                  </div>
                                                  <!-- row 3 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.invoiceAmount' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="finInvAmount"
															name="finInvAmount" data-rule-required="true"   maxlength="10"	 value="${invoice.finInvAmount}" data-msg-required="<fmt:message key='invoice.submit.form.field.finInvAmount.required'/>"
															data-rule-pattern="^[0-9]{0,9}$" data-msg-pattern="<fmt:message key='invoice.submit.form.field.finInvAmount.pattern'/>" <c:if test="${not fn:contains(modifyFields,'finInvAmount') && isModifyStatus}">readonly</c:if>>
												    </div>
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.objectOfInvoice' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
							                          <select id="finObjOfInv" name="finObjOfInv" class="form-control if-input-sm if-div-input-md" data-rule-required="true"  data-msg-required="<fmt:message key='invoice.submit.form.field.finObjOfInv.required'/>" <c:if test="${not fn:contains(modifyFields,'finObjOfInv') && isModifyStatus}">disabled=true</c:if>>
													 	<option value=""> </option>
														<c:forEach var="item" items="${finObjOfInvList}" varStatus="status">
															<option value="${item.code}"
																<c:if test="${item.code==invoice.finObjOfInv}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
														</c:forEach>
														</select>
							                        </div>
                                                  </div>
                                                  <!-- row 4 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.contractDueDate' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
							                          <c:choose>
															<c:when test="${not fn:contains(modifyFields,'finDueDateAccToCont') && isModifyStatus}">
																<input type="text" class="form-control if-input-sm if-div-input-md" id="finDueDateAccToContRead" name="finDueDateAccToContRead"     value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='MM/dd/yyyy'/>"   >
															</c:when>
													  	
													      	<c:otherwise>
															  <input type="text" class="form-control if-input-sm if-div-input-md date-picker"
																id="finDueDateAccToCont" name="finDueDateAccToCont" data-rule-required="true"
											                    data-msg-required="<fmt:message key='seller.apply.form.field.comEstablishmentDate.required'/>"
																value="<fmt:formatDate value='${invoice.finDueDateAccToCont}' pattern='MM/dd/yyyy'/>" autocomplete="off"  data-rule-required="true"
																 data-rule-pattern="^(((0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])/(29|30)|(0[13578]|1[02])/31)/(?!0000)[0-9]{4}|02/29/([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$" 
																 data-msg-pattern="<fmt:message key='invoice.submit.form.field.finDueDateAccToCont.isAfterToday'/>"
											                     data-rule-isAfterToday="true" data-msg-isAfterToday="<fmt:message key='invoice.submit.form.field.finDueDateAccToCont.isAfterToday'/>" readonly />
										            		</c:otherwise>
														  </c:choose>
							                        </div>
                                                    <div class="control-label col-md-3 if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.expectedSettlementDate' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
							                         <c:choose>
															<c:when test="${not fn:contains(modifyFields,'finExpPmtDate') && isModifyStatus}">
																<input type="text" class="form-control if-input-sm if-div-input-md" id="finExpPmtDateRead" name="finExpPmtDateRead"     value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='MM/dd/yyyy'/>"   >
															</c:when>
															<c:otherwise>
									                          <div class="input-group">
									                            <input type="text" class="form-control if-input-sm if-div-input-md" id="finExpPmtDate" name="finExpPmtDate"  value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='MM/dd/yyyy'/>" readonly  autocomplete="off" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.finExpPmtDate.required'/>" data-rule-pattern="^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$" data-msg-pattern="<fmt:message key='invoice.submit.form.field.finExpPmtDate.pattern'/>"   data-rule-isAfterDueDate="true"
																data-msg-isAfterDueDate="<fmt:message key='invoice.submit.form.field.finExpPmtDate.isAfterDueDate'/>"  readonly />                        
									                            <span class="input-group-addon">
																  <i class="icon-calendar"></i>
																</span>
															  </div>
													  	</c:otherwise>
														</c:choose>
							                        </div>
                                                  </div>
                                                  <!-- row 5 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-3 if-control-label-md if-control-label-md">
                                                      <fmt:message key='s.modify.invoice.page.remainingMaturityTerm' /> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3">
                                                      <input type="text" class="form-control if-input-sm if-div-input-md" id="finRmngMatTerm" name="finRmngMatTerm" data-rule-required="true"  value="${invoice.finRmngMatTerm}"  data-msg-required="<fmt:message key='invoice.submit.form.field.finRmngMatTerm.required'/>" data-rule-range="[25,120]" readonly   data-msg-range="<fmt:message key='invoice.submit.form.field.finRmngMatTerm.pattern'/>"  <c:if test="${not fn:contains(modifyFields,'finRmngMatTerm') && isModifyStatus}">readonly</c:if>>
                                                    </div>
                                                  </div>
                                                </div>
                                                <!-- End tab3: Financing information-->
                                                <!-- Begin tab4: Documents-->
                                                <div class="tab-pane" id="tab5">
                                                <form class="form-horizontal" id="form-readytosell-info" method="POST" enctype="multipart/form-data">
                                                  <div class="form-group if-form-group-sm">
                                                    <!-- Row 1 -->
                                                    <div class="col-sm-2 col-xs-12 text-left if-control-label-md"><fmt:message key="seller.acceptAnOffer.page.panel.body.advance"/></div>
                                                    <div class="col-sm-2 col-xs-12">
														<select id="readyToSellAdv" name="readyToSellAdv" class="form-control if-input-sm if-div-input-md"
															data-rule-required="true"
															data-msg-required="<fmt:message key='invoice.submit.form.field.readyToSellAdv.required'/>"
																<c:if test="${not fn:contains(modifyFields,'readyToSellAdv') && isModifyStatus}">disabled=true</c:if>>
															<option value=""> </option>
															<c:forEach var="item" items="${readyToAdvList}"
																varStatus="status">
																<c:if test="${item.code==invoice.readyToSellAdv}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
															</c:forEach>
														</select>
													</div>
                                                    <div class="col-sm-2 col-xs-12 text-left if-control-label-md"><fmt:message key="seller.acceptAnOffer.page.panel.body.interest"/></div>
                                                    <div class="col-sm-2 col-xs-12">
														<select id="readyToSellInt" name="readyToSellInt" class="form-control if-input-sm if-div-input-md"
															data-rule-required="true"
															data-msg-required="<fmt:message key='invoice.submit.form.field.readyToSellInt.required'/>"
															<c:if test="${not fn:contains(modifyFields,'readyToSellInt') && isModifyStatus}">disabled=true</c:if>>
															<option value=""> </option>
															<c:forEach var="item" items="${readyToIntList}"
																varStatus="status">
															  <c:if test="${item.code==invoice.readyToSellInt}"> selected</c:if>>${item[self.i18n.catalog_name]}</option>
															</c:forEach>
														</select>
													</div>
                                                    <div class="col-sm-4 col-xs-12 if-div-input-sm">
											          <a class="if-view-detail" href="javascript:;" id="RTSToggle" onclick="toggleDetail('<fmt:message key="seller.acceptAnOffer.page.panel.body.viewFinancingDetais"/>&nbsp;&nbsp;','<fmt:message key="seller.acceptAnOffer.page.panel.body.hideFinancingDetais"/>&nbsp;&nbsp;','#RTSToggle', '#RTSDetail');"><u><fmt:message key="seller.acceptAnOffer.page.panel.body.viewFinancingDetais"/>&nbsp;&nbsp;<i class="icon-arrow-down"></i></u></a>
											        </div>
                                                    <div class="col-sm-12">
                                                      <div class="if-detail-block" id="RTSDetail">
											            <div style="float: right; padding-top: 10px;padding-right: 10px; width: 30px">
											              <a onclick="toggleDetail('<fmt:message key="seller.acceptAnOffer.page.panel.body.viewFinancingDetais"/>&nbsp;&nbsp;','<fmt:message key="seller.acceptAnOffer.page.panel.body.hideFinancingDetais"/>&nbsp;&nbsp;','#RTSToggle', '#RTSDetail');"><i class="icon-close"></i></a>
											            </div>
											            <div style="float: left; padding-top: 10px;position: relative; max-width: 95%; padding-left: 20px">
											              <div style="margin-bottom: 10px">
											                <b><fmt:message key="seller.acceptAnOffer.page.panel.financingDetails.expectedNetAdvance"/><br /></b>
											                <fmt:message key="seller.acceptAnOffer.page.panel.financingDetails.Line1"/>
											              </div>
											              <div style="margin-bottom: 10px">
											                <b><fmt:message key="seller.acceptAnOffer.page.panel.financingDetails.expectedReceivableAmount"/><br /></b>
											                <fmt:message key="seller.acceptAnOffer.page.panel.financingDetails.Line2"/>
											              </div>
											              <div>
											                <i><u><fmt:message key="seller.acceptAnOffer.page.panel.financingDetails.note"/></u></i><br />
											                <ul>
											                  <li>
											                    <fmt:message key="seller.acceptAnOffer.page.panel.financingDetails.note1"/>
											                  </li>
											                  <li>
											                    <fmt:message key="seller.acceptAnOffer.page.panel.financingDetails.note2"/>
											                  </li>
											                </ul>
											              </div>
											            </div>
											          </div>
											        </div>
                                                    </div>
                                                </form>
                                                    <!-- Row 2 -->
                                                  </div>
                                                <!-- End tab4: Documents-->
                                                <!-- Begin tab5: Terms and Conditions-->
                                                <div class="tab-pane" id="tab6">
                                                <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                                                  <!-- row 5 -->
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-5">
                                                      <fmt:message key="seller.acceptAnOffer.page.panel.body.scanOfInvoice"/> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3 if-div-input-sm">
							                          <c:if test="${fn:contains(modifyFields,'invoice_firstInvoice') || not isModifyStatus}">
							                          <span class="btn btn-success fileinput-button">
							                            <i class="icon-plus icon-white"></i>
							                            <span><fmt:message key='invoice.submit.form.button.addFile'/></span>                            
							                            <input type="file" id="docScanOfInv" name="file" multiple>
							                            <input type="hidden" id="file-type-docScanOfInv" name="fileType" value="${self.docBiztypePrefix}invoice_firstInvoice" />
							                          </span>
							                          <!-- 进度条 -->
							                          <div id="progress-docScanOfInv" class="progress progress-success progress-striped">
							                            <div class="bar"></div>
							                          </div>
							                          </c:if>
							                          <!-- 已经上传的文件 -->
							                          <div id="file-link-docScanOfInv">${self.doc1Link}</div>
							                          <div id="error-docScanOfInvId"></div>
							                        </div>
                                                  </div>
                                                </form>
                                                <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-5">
                                                      <fmt:message key="seller.acceptAnOffer.page.panel.body.scanOfInvoice"/> <span class="required">*</span>
                                                    </div>
                                                    <div class="col-md-3 if-div-input-sm">
							                        <c:if test="${fn:contains(modifyFields,'invoice_secondInvoice') || not isModifyStatus}">
							                          <span class="btn btn-success fileinput-button">
							                            <i class="icon-plus icon-white"></i>
							                            <span><fmt:message key='invoice.submit.form.button.addFile'/></span>
							                            <input type="file" id="docScanOfCont" name="file" multiple>
							                            <input type="hidden" id="file-type-docScanOfCont" name="fileType" value="${self.docBiztypePrefix}invoice_secondInvoice" />
							                          </span>
							                          
							                          <!-- 进度条 -->
							                          <div id="progress-docScanOfCont" class="progress progress-success progress-striped">
							                            <div class="bar"></div>
							                          </div>
							                          </c:if>
							                          <!-- 已经上传的文件 -->
							                          <div id="file-link-docScanOfCont">${self.doc2Link}</div>
							                          <div id="error-docScanOfContId"></div>
							                        </div>
                                                  </div>
                                                </form>
                                                <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-5">
                                                      <span class="required"><fmt:message key="seller.acceptAnOffer.page.panel.body.deliveryConfirmation"/> *</span>
                                                    </div>
                                                    <div class="col-md-3 if-div-input-sm">
							                        <c:if test="${fn:contains(modifyFields,'invoice_thirdInvoice') || not isModifyStatus}">
							                          <span class="btn btn-success fileinput-button">
							                            <i class="icon-plus icon-white"></i>
							                            <span><fmt:message key='invoice.submit.form.button.addFile'/></span>                            
							                            <input type="file" id="docDlvryCnfm" name="file" multiple>
							                            <input type="hidden" id="file-type-docDlvryCnfm" name="fileType" value="${self.docBiztypePrefix}invoice_thirdInvoice" />
							                          </span>
							                          <!-- 进度条 -->
							                          <div id="progress-docDlvryCnfm" class="progress progress-success progress-striped">
							                            <div class="bar"></div>
							                          </div>
							                          </c:if>
							                          <!-- 已经上传的文件 -->
							                          <div id="file-link-docDlvryCnfm">${self.doc3Link}</div>
							                          <div id="error-docDlvryCnfmId"></div>
							                        </div>
                                                  </div>
                                                </form>
                                                <c:if test="${debtorAckReq == 'required' }">
                                                <form class="form-horizontal" method="POST" enctype="multipart/form-data">
                                                  <div class="form-group if-form-group-sm">
                                                    <div class="control-label col-md-5">
                                                      <fmt:message key="s.modify.invoice.page.debtorAcknowledgement"/>
                                                    </div>
                                                    <div class="col-md-3 if-div-input-sm">
							                        <c:if test="${fn:contains(modifyFields,'taxcode_deliveryConfirm') || not isModifyStatus}">
							                          <span class="btn btn-success fileinput-button">
							                            <i class="icon-plus icon-white"></i>
							                            <span><fmt:message key='invoice.submit.form.button.addFile'/></span> 
							                            <input type="file" id="docDebtorAckmt" name="file" multiple>
							                            <input type="hidden" id="file-type-docDebtorAckmt" name="fileType" value="${self.docBiztypePrefix}taxcode_deliveryConfirm" />
							                          </span>
							                          
							                          <!-- 进度条 -->
							                          <div id="progress-docDebtorAckmt" class="progress progress-success progress-striped">
							                            <div class="bar"></div>
							                          </div>
							                          </c:if>
							                          <!-- 已经上传的文件 -->
							                          <div id="file-link-docDebtorAckmt">${self.doc4Link}</div>
							                          <div id="error-docDebtorAckmtId"></div>
							                        </div>
                                                  </div>
                                                </form>
                                                </c:if>
                                                
                                                <form style="display:none;" id="form-documents-hidden">
							                      <input type="hidden" name="documents[0].id" id="docScanOfInvId"  value="${self.doc1}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.docScanOfInvId.required'/>">
							                      <input type="hidden" name="documents[0].dispOrder" value="1">
							                      
							                      <input type="hidden" name="documents[1].id" id="docScanOfContId"  value="${self.doc2}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.docScanOfContId.required'/>">
							                      <input type="hidden" name="documents[1].dispOrder" value="2">
							                      
							                      <input type="hidden" name="documents[2].id" id="docDlvryCnfmId"   value="${self.doc3}"  data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.docDlvryCnfmId.required'/>">
							                      <input type="hidden" name="documents[2].dispOrder" value="3">
							                      <c:if test="${debtorAckReq == 'required' }">
							                        <input type="hidden" name="documents[3].id" id="docDebtorAckmtId"  value="${self.doc4}" data-rule-required="true" data-msg-required="<fmt:message key='invoice.submit.form.field.docDebtorAckmtId.required'/>">
							                        <input type="hidden" name="documents[3].dispOrder" value="4">
							                      </c:if>
							                    </form>
                                                </div>
                                                <!-- End tab5: Terms and Conditions-->
                                                <!-- Begin tab5: Terms and Conditions-->
                                                <div class="tab-pane" id="tab7">
											    <form class="form-horizontal" id="form-terms-conditions" method="POST" enctype="multipart/form-data">
											        <div class="form-group if-form-group-sm">
											          <div style="height: 220px; max-height: 220px; overflow: auto; padding: 10px 10px; background: white; border: solid #B3AA9F thin; ">
											            <h6><fmt:message key='buyer.apply.form.field.title.h6' /></h6> <p><fmt:message key='buyer.apply.form.field.modifiedTime' /> (<a href="../../policies/terms/archive/"><fmt:message key='buyer.apply.form.field.modified.a' /></a>) </p><h6><fmt:message key='buyer.apply.form.field.content.welcome' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p1' /> </p><p><fmt:message key='buyer.apply.form.field.content.p2' /></p><p><fmt:message key='buyer.apply.form.field.content.p3' /></p><h6 id="toc-services"><fmt:message key='buyer.apply.form.field.content.using' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p4' /> </p><p><fmt:message key='buyer.apply.form.field.content.p5' /> </p><p><fmt:message key='buyer.apply.form.field.content.p6' /> </p><p><fmt:message key='buyer.apply.form.field.content.p7' /> </p><p><fmt:message key='buyer.apply.form.field.content.p8' /> </p><p><fmt:message key='buyer.apply.form.field.content.p9' /> </p><h6 id="toc-account"><fmt:message key='buyer.apply.form.field.content.account' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p10' /> </p><p><fmt:message key='buyer.apply.form.field.content.p11' /> <a href="http://support.google.com/accounts/bin/answer.py?hl=en&amp;answer=58585"><fmt:message key='buyer.apply.form.field.content.p11.a' /></a>. </p><h6 id="toc-protection"><fmt:message key='buyer.apply.form.field.content.privacy' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p12.goole' /> <a href="../../policies/privacy/"><fmt:message key='buyer.apply.form.field.content.p12.a' /></a> <fmt:message key='buyer.apply.form.field.content.p12' /> </p><p><fmt:message key='buyer.apply.form.field.content.p13' /> </p><p><fmt:message key='buyer.apply.form.field.content.p14' /> <a href="http://support.google.com/bin/static.py?hl=en&amp;ts=1114905&amp;page=ts.cs"><fmt:message key='buyer.apply.form.field.content.p14.a' /></a>. </p><h6 id="toc-content"><fmt:message key='buyer.apply.form.field.content.yourContent' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p15' /> </p><p><fmt:message key='buyer.apply.form.field.content.p16' /> </p><p><fmt:message key='buyer.apply.form.field.content.p17' /> </p><p><fmt:message key='buyer.apply.form.field.content.p18' /> </p><p><fmt:message key='buyer.apply.form.field.content.p19' /> </p><h6 id="toc-software"><fmt:message key='buyer.apply.form.field.content.aboutSoftware' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p20' /> </p><p><fmt:message key='buyer.apply.form.field.content.p21' /> </p><p><fmt:message key='buyer.apply.form.field.content.p22' /> </p><h6 id="toc-modification"><fmt:message key='buyer.apply.form.field.content.modifying' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p23' /> </p><p><fmt:message key='buyer.apply.form.field.content.p24' /> </p><p><fmt:message key='buyer.apply.form.field.content.p25' /> </p><h6 id="toc-warranties-disclaimers"><fmt:message key='buyer.apply.form.field.content.ourWarranties' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p26' /> </p><p><fmt:message key='buyer.apply.form.field.content.p27' /> </p><p><fmt:message key='buyer.apply.form.field.content.p28' /> </p><h6 id="toc-liability"><fmt:message key='buyer.apply.form.field.content.liability' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p29' /> </p><p><fmt:message key='buyer.apply.form.field.content.p30' /> </p><p><fmt:message key='buyer.apply.form.field.content.p31' /> </p><h6 id="toc-business-uses"><fmt:message key='buyer.apply.form.field.content.business' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p32' /> </p><h6 id="toc-about"><fmt:message key='buyer.apply.form.field.content.aboutThese' /></h6> <p><fmt:message key='buyer.apply.form.field.content.p33' /> </p><p><fmt:message key='buyer.apply.form.field.content.p34' /> </p><p><fmt:message key='buyer.apply.form.field.content.p35' /> </p><p><fmt:message key='buyer.apply.form.field.content.p36' /> </p><p><fmt:message key='buyer.apply.form.field.content.p37' /> </p>
											            <p><fmt:message key='buyer.apply.form.field.content.p38' /> </p><p><fmt:message key='buyer.apply.form.field.content.p39' /> <a href="../../contact/"><fmt:message key='buyer.apply.form.field.content.p39.a' /></a>.</p>
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
                                                        <fmt:message key='buyer.apply.form.button.back' />
                                                    </a>
                                                    <a href="javascript:;" class="btn default" style="margin-right: 3px">
                                                        <fmt:message key='buyer.apply.form.button.Save' />
                                                    </a>
                                                    <a href="javascript:;" class="btn default button-next">
                                                        <fmt:message key='buyer.apply.form.button.continue' />
                                                    </a>
                                                    <a href="javascript:;" class="btn default button-submit">
                                                        <fmt:message key='buyer.apply.form.button.Submit' />
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
            <fmt:message key="seller.acceptAnOffer.page.copyright"/>
        </div>
        <div class="scroll-to-top">
            <i class="icon-arrow-up"></i>
        </div>
    </div>
    <!-- END FOOTER -->

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
    <!-- BEGIN:File Upload Plugin JS files-->
    <!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/vendor/jquery.ui.widget.js"></script>
    <!-- The Templates plugin is included to render the upload/download listings -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/vendor/tmpl.min.js"></script>
    <!-- The Load Image plugin is included for the preview images and image resizing functionality -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/vendor/load-image.min.js"></script>
    <!-- The Canvas to Blob plugin is included for image resizing functionality -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/vendor/canvas-to-blob.min.js"></script>
    <!-- blueimp Gallery script -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/blueimp-gallery/jquery.blueimp-gallery.min.js"></script>
    <!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.iframe-transport.js"></script>
    <!-- The basic File Upload plugin -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload.js"></script>
    <!-- The File Upload processing plugin -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload-process.js"></script>
    <!-- The File Upload image preview & resize plugin -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload-image.js"></script>
    <!-- The File Upload audio preview plugin -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload-audio.js"></script>
    <!-- The File Upload video preview plugin -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload-video.js"></script>
    <!-- The File Upload validation plugin -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload-validate.js"></script>
    <!-- The File Upload user interface plugin -->
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/jquery.fileupload-ui.js"></script>
    <!-- The main application script -->
    <!-- The XDomainRequest Transport is included for cross-domain file deletion for IE 8 and IE 9 -->
    <!--[if (gte IE 8)&(lt IE 10)]>
    <script src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/jquery-file-upload/js/cors/jquery.xdr-transport.js"></script>
    <![endif]-->
    <!-- END:File Upload Plugin JS files-->
    <!-- END PAGE LEVEL PLUGINS -->

    <script src="${base}/static/libs/metronic/3.3.0/assets/global/scripts/metronic.js"></script>
    <script src="${base}/static/libs/metronic/3.3.0/assets/admin/pages/scripts/components-pickers.js"></script>
    <script src="${base}/static/themes/metronic/js/layout.js"></script>
    <script src="${base}/static/themes/metronic/js/quick-sidebar.js"></script>
    <script src="${base}/static/themes/metronic/js/application.js"></script>
    <script src="${base}/static/themes/metronic/js/ifactor.js"></script>
    <script src="${base}/static/themes/metronic/js/form-fileupload.js"></script>
    <script>
        jQuery(document).ready(function () {
            Metronic.init(); // init metronic core components
            Layout.init(); // init current layout
            ComponentsPickers.init();
            var titles = ['Opinion on modification request','Seller information', 'Debtor information', 'Financing information', 'Documents','Ready-to-sell', 'Terms and conditions'];
            FormWizard.init(titles);
            //FormFileUpload.init();
        });
//        $('#fileupload').fileupload({
//          dataType: 'json',
//          add: function (e, data) {
//            data.context = $('<button/>').text('Upload')
//                .appendTo(document.body)
//                .click(function () {
//                  data.context = $('<p/>').text('Uploading...').replaceAll($(this));
//                  data.submit();
//                });
//          },
//          done: function (e, data) {
//            data.context.text('Upload finished.');
//          },
//          progressall: function (e, data) {
//            var progress = parseInt(data.loaded / data.total * 100, 10);
//            $('#progress .bar').css(
//                'width',
//                progress + '%'
//            );
//          }
//        });

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
