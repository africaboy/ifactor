<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/metronic/include/i18n.jsp"%>
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
    <!-- END THEME STYLES -->
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
                            <a href="#"><fmt:message key='seller.myinvoice.list.page.header.myInvoices' /></a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#"><fmt:message key='seller.myinvoice.list.page.header.invoicesInAuction' /></a>
                        </li>
                    </ul>
                </div>
                <h5 class="page-title">
                    <b><fmt:message key='seller.myinvoice.list.page.title' />&nbsp;&nbsp;&nbsp;<span id="invoiceNum"></span></b>
                </h5>
                <h5 class="page-title">
                    <small><b><fmt:message key='seller.market.list.page.auctionStatus' />:&nbsp;<span style="color: green"><fmt:message key='seller.market.list.page.status' />&nbsp;<i class="icon-lock-open"></i></span></b></small>
                </h5>
                <!-- END PAGE HEADER-->
                <!-- BEGIN PAGE CONTENT-->
                <form class="form-inline" id="formQuery" name="listform" method="post" role="form">
                <div class="clearfix">
                    <div class="panel panel-success">
                        <div class="panel-heading" style="padding: 5px 5px;">
                            <h3 class="if-panel-title bold"><fmt:message key='seller.market.list.page.panel.heading' /></h3>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-6 col-xs-6 text-left bold"><fmt:message key='seller.market.list.page.panel.body.financing' /></div>
                                <div class="col-sm-6 col-xs-6 text-right"><a href="#" id="toggle_link" class="if_toggle if_show" onclick="toggle('More&nbsp;&nbsp;', 'Less&nbsp;&nbsp;','col-sm-offset-5 col-sm-1 col-xs-12 text-right','col-sm-offset-11 col-sm-1 col-xs-12 text-right');">More&nbsp;&nbsp;<i class="icon-arrow-down"></i></a></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="#"><fmt:message key='seller.market.list.page.panel.body.invoiceAmount' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="finInvAmountFrom" name="finInvAmountFrom" placeholder="From (VND)">
                                </div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="finInvAmountTo" name="finInvAmountTo" placeholder="To (VND)">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm if-tooltip"><a href="#" data-toggle="tooltip" data-original-title="Ready to sell advance"><fmt:message key='seller.market.list.page.panel.body.rtsa' /> &nbsp;<i class="icon-question"></i></a> </div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="readyToSellAdvFrom" name="readyToSellAdvFrom" placeholder="From (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="readyToSellAdvTo" name="readyToSellAdvTo" placeholder="To (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if-tooltip"><a href="#" data-toggle="tooltip" data-original-title="Ready to sell interest"><fmt:message key='seller.market.list.page.panel.body.rtsi' /> &nbsp;<i class="icon-question"></i></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="readyToSellIntFrom" name="readyToSellIntFrom" placeholder="From (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="readyToSellIntTo" name="readyToSellIntTo" placeholder="To (%)">
                                </div>
                                <!-- Begin Current best offered advance -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if-tooltip if_filter_hidden"><a href="#" data-toggle="tooltip" data-original-title="Current best offered advance"><fmt:message key='seller.market.list.page.panel.body.cboa' /> &nbsp;<i class="icon-question"></i></a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="curBestOffrAdvFrom" name="curBestOffrAdvFrom" placeholder="From (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="curBestOffrAdvTo" name="curBestOffrAdvTo" placeholder="To (%)">
                                </div>
                                <!-- End Current best offered advance -->
                                <!-- Begin Current best offered interest -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if-tooltip if_filter_hidden"><a href="#" data-toggle="tooltip" data-original-title="Current best offered interest"><fmt:message key='seller.market.list.page.panel.body.cboi' /> &nbsp;<i class="icon-question"></i></a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="curBestOffrIntFrom" name="curBestOffrIntFrom" placeholder="From (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <span><input type="text" class="form-control if-input-sm if-div-input-sm" id="curBestOffrIntTo" name="curBestOffrIntTo" placeholder="To (%)"></span>
                                </div>
                                <!-- End Current best offered interest -->
                                <div class="col-sm-12 col-xs-12 text-left bold if_filter_hidden"><fmt:message key='seller.market.list.page.panel.body.dataInformation' /></div>
                                <!-- Begin hidden fields -->
                                <!-- Begin Release Date -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"><a href="#"><fmt:message key='seller.market.list.page.panel.body.releaseDate' /></a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm date-picker" id="releaseDateFrom" name="releaseDateFrom" value="From date" readonly="" />
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm date-picker" id="releaseDateTo" name="releaseDateTo" value="To date" readonly="" />
                                </div>
                                <!-- End Release Date -->
                                <!-- Begin Delisting Date -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"><a href="#"><fmt:message key='seller.market.list.page.panel.body.delistingDate' /></a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm date-picker" id="delistingDateFrom" name="delistingDateFrom" value="From date" readonly="" />
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm date-picker" id="delistingDateTo" name="delistingDateTo" value="To date" readonly="" />
                                </div>
                                <!-- End Delisting Date -->
                                <div class="col-sm-offset-5 col-sm-1 col-xs-12 text-right" id="ifFilterButton">
                                    <button type="submit" class="btn if-btn"><fmt:message key='seller.market.list.page.panel.button.apply' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="portlet box">
                            <div class="">
                                <!-- table-scrollable -->
                                <table class="table table-striped table-bordered table-hover" id="content_table">
                                    <thead>
                                        <tr>
                                            <th style="width:20px">
                                                <fmt:message key='seller.market.list.page.table.th.no' />
                                            </th>
                                            <th style="width:60px">
                                                <fmt:message key='seller.market.list.page.table.th.biddingHistory' />
                                            </th>
                                            <th style="width:60px">
                                                <fmt:message key='seller.market.list.page.table.th.accept' />
                                            </th>
                                            <th style="width:80px">
                                                <fmt:message key='seller.market.list.page.table.th.releaseDate' />
                                            </th>
                                            <th style="width:80px">
                                                <fmt:message key='seller.market.list.page.table.th.invoiceStickerID' />
                                            </th>
                                            <th style="width:150px">
                                                <fmt:message key='seller.market.list.page.table.th.invoiceAmount' />
                                            </th>
                                            <th style="width:250px">
                                                <fmt:message key='seller.market.list.page.table.th.invoiceDebtor' />
                                            </th>
                                            <th style="width:80px">
                                                <fmt:message key='seller.market.list.page.table.th.delistingDate' />
                                            </th>
                                            <th style="width:80px" class="if-tooltip">
                                                <a data-toggle="tooltip white" data-original-title="Ready to sell advance" style="color:white"><fmt:message key='seller.market.list.page.table.th.rtsa' />&nbsp;<i class="icon-question"></i></a>
                                            </th>
                                            <th style="width:80px" class="if-tooltip">
                                                <a data-toggle="tooltip white" data-original-title="Current best offered advance" style="color:white"><fmt:message key='seller.market.list.page.table.th.cboa' />&nbsp;<i class="icon-question"></i></a>
                                            </th>
                                            <th style="width:80px" class="if-tooltip">
                                                <a  data-toggle="tooltip white" data-original-title="Ready to sell interest" style="color:white"><fmt:message key='seller.market.list.page.table.th.rtsi' />&nbsp;<i class="icon-question"></i></a>
                                            </th>
                                            <th style="width:100px" class="if-tooltip">
                                                <a data-toggle="tooltip white" data-original-title="Current best offered interest" style="color:white"><fmt:message key='seller.market.list.page.table.th.cboi' />&nbsp;<i class="icon-question"></i></a>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       <%-- <c:if test="${not empty page.content}">
				                       <c:forEach var="item" items="${page.content}" varStatus="status">
                                        <tr>
                                            <td class="static">
                                                ${status.index + 1}
                                            </td>
                                            <td>
			                          	      <a href="javascript:;" target="main-iframe">
			                          	        <button type="button" class="btn-small btn-info btn-circle" onclick="window.open('${base}/seller/invoice/inauction/biddhistory/${item.id}');"><i class="fa fa-list"></i></button>
			                          	      </a>
                                            </td>
                                            <td>
                                            <a href="javascript:;">
                                              <button type="button" class="btn-small btn-primary btn-circle" onclick="window.location='${base}/seller/openauction/openDetail/acceptAnOffer/${item.id}';">
                                                <i class="fa fa-check"></i>
                                              </button>
                                            </a>
                                            </td>
                                            <td>
                                                <fmt:formatDate value='${item.releasedDate}' pattern='MM/dd/yyyy'/>
                                            </td>
                                            <td>
                                                <a href="${base}/seller/invoice/inauction/detail/${item.id}">
			                          	          ${item.finStickerId}
			                           	        </a> 
                                            </td>
                                            <td>
                                                <fmt:formatNumber  value="${item.finInvAmount}" type="number" />&nbsp;VND
                                            </td>
                                            <td>
	                                          <a href="${base}/seller/profile/debtorById/${item.id}">
					                            ${item.debtorName}
					                          </a>
                                            </td>
                                            <td class="if-tooltip">
                                                <a data-toggle="tooltip" data-html="true" data-original-title="Remaining days till delisting:<br />20 days"><fmt:formatDate value='${item.endDate}' pattern='MM/dd/yyyy'/></a>
                                            </td>
                                            <td>${item.readyToSellAdv }&nbsp;%</td>
					                        <td>${item.bestBuyerAdv }&nbsp;%</td>
					                        <td>${item.readyToSellInt }&nbsp;%</td>
					                        <td>${item.bestBuyerInt }&nbsp;%</td>
                                        </tr>
                                        </c:forEach>
                                        </c:if> --%>
                                    </tbody>
                                    <tfoot>
			                          <%-- <tr>
			                            <td colspan="13">
			                             <input type="hidden" name="pageNumber" value="${page.number}" />
			                             <input type="hidden" name="pageSize" value="${page.size}" />
			                               <%@ include file="/WEB-INF/views/themes/metronic/include/pagination.jsp"%>
			                            </td>
			                          </tr> --%>
			                        </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
  			  </form>
                <!-- END PAGE CONTENT-->
            </div>
        </div>
        <!-- END CONTENT -->
    </div>
    <!-- END CONTAINER -->
    <!-- BEGIN FOOTER -->
    <div class="page-footer">
        <div class="page-footer-inner text-center">
            <fmt:message key='buyer.apply.form.footer.copyright' />
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
    <!-- END PAGE LEVEL PLUGINS -->

    <script src="${base}/static/libs/metronic/3.3.0/assets/global/scripts/metronic.js"></script>
    <script src="${base}/static/libs/metronic/3.3.0/assets/admin/pages/scripts/components-pickers.js"></script>
    <script src="${base}/static/themes/metronic/js/layout.js"></script>
    <script src="${base}/static/themes/metronic/js/quick-sidebar.js"></script>
    <script src="${base}/static/themes/metronic/js/ifactor.js"></script>
    
    <script type="text/javascript" src="${base}/static/themes/metronic/js/Date.prototype.js"></script>
    <script type="text/javascript" src="${base}/static/themes/metronic/js/jquery.numberFormat.js"></script>
    <script>
        jQuery(document).ready(function () {
            Metronic.init(); // init metronic core components
            Layout.init(); // init current layout
            ComponentsPickers.init();
            $('#content_table').DataTable({
                searching: false,
                "order": [[3, "desc"]],
                //      "sDom": 'tip',
                "aoColumnDefs": [{ 'bSortable': false, 'aTargets': [0, 1, 2] }],
                "fnDrawCallback": function (oSettings) {
                    if (oSettings.bSorted || oSettings.bFiltered) {
                    	if(oSettings.aiDisplay.length<2){
                    		$('#invoiceNum').html(oSettings.aiDisplay.length+" Invoice");
                    		}else{
                    	$('#invoiceNum').html(oSettings.aiDisplay.length+" Invoices");
                    	}
                        for (var i = 0, iLen = oSettings.aiDisplay.length ; i < iLen ; i++) {
                            $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + 1);
                        }
                    }
                },
                bServerSide : true,
                iDisplayLength:15,
                pagingType: "bootstrapPager",
                pagerSettings: {
                    textboxWidth: 60,
                    firstIcon: "fa fa-angle-double-left",
                    previousIcon: "fa fa-angle-left",
                    nextIcon: "fa fa-angle-right",
                    lastIcon: "fa  fa-angle-double-right",
                    searchOnEnter: true
                },
                 sAjaxSource: app.base + '/seller/invoice/in-auction/list',
                

                "fnServerData" : function(sSource, aoData, fnCallback) {
                	
                	$.ajax({
                		"type" : 'post',
                		"url" : sSource,
                		"dataType" : "json",
                		"data" : aoData ,
                		"success" : function(resp) {
                			fnCallback(resp);
                		}
                	});
                } ,
                "aoColumns":[ 
                         	{ "mData": "sellerId", 'sClass':'left'},
                         	{ "mData": "id", 'sClass':'left'},
                         	{ "mData": "releasedDate",'sType': 'date','sClass':'center'},
                         	{ "mData": "finStickerId", 'sClass':'left'},
                         	{ "mData": "finInvAmount", 'sClass':'left'},
                         	{ "mData": "debtorName", 'sClass':'left'},
                         	{ "mData": "endDate", 'sClass':'left'},
                         	{ "mData": "readyToSellAdv", 'sClass':'left'},
                         	{ "mData": "bestBuyerAdv", 'sClass':'left'},
                         	{ "mData": "readyToSellInt", 'sClass':'left'},
                          	{ "mData": "bestBuyerInt", 'sClass':'left'},
                         	{ "mData": "noOfOffers", 'sClass':'left'},
                         	],
                         	
                         	
                         	  "fnRowCallback": function(nRow, aData, iDisplayIndex) {// 当创建了行，但还未绘制到屏幕上的时候调用，通常用于改变行的class风格 
                         	     // if(aData.bestBuyerAdv!=null && !"".equals(aData.bestBuyerAdv)){
                             /*       $('td:eq(9)', nRow).html("<a href='' user_id='" + aData.user_id + "' class='ace_detail'>详情</a>");
                                   if (aData.status != 1 && aData.status != 4 && aData.active == 0) { */
                                 	  var rDate=new Date(aData.releasedDate);
                                 	  var eDate=new Date(aData.endDate);
                                 	  var td0 = nRow._DT_RowIndex+1;
                                 	  var td1 = "<a href='${base}/seller/invoice/inauction/biddhistory/"+aData.id+"' target='main-iframe'><button type='button' class='btn-small btn-info btn-circle'>    <i class='fa fa-list'></i>"
                                                  +"</button></a>";
                                      var td2 = "<button type='button' class='btn-small btn-primary btn-circle'><a href='/seller/openauction/openDetail/acceptAnOffer/"+aData.id+" 'style='color:#ffffff;'><i class='fa fa-hand-o-right'></i></a>"
             		                             +"</button>";
                                      var td3 =  rDate.Format('MM/dd/yyyy');
                                      var td4 = "<a href='${base}/seller/invoice/inauction/detail/"+aData.id+"'> "+aData.finStickerId+" </a>";
                                      var td5 =  decimalInputFormatFunc(aData.finInvAmount)+"&nbsp;VND";
                                      var td6 = "<a href='${base}/seller/profile/debtorById/"+aData.id+"'> "+aData.debtorName+" </a>";
                                      var td7 =  eDate.Format('MM/dd/yyyy');
                                      var td8 =  aData.readyToSellAdv+"&nbsp;%";
                                      var td9 =  aData.bestBuyerAdv== null?0:aData.bestBuyerAdv+"&nbsp;%";
                                      var td10 = aData.readyToSellInt+"&nbsp;%";
                                      var td11 = aData.bestBuyerInt== null?0:aData.bestBuyerInt+"&nbsp;%";
                                       $('td:eq(0)', nRow).html(td0);
                                       $('td:eq(1)', nRow).html(td1);
                                       $('td:eq(2)', nRow).html(td2);
                                       $('td:eq(3)', nRow).html(td3);
                                       $('td:eq(4)', nRow).html(td4);
                                       $('td:eq(5)', nRow).html(td5);
                                       $('td:eq(6)', nRow).html(td6);
                                       $('td:eq(7)', nRow).html(td7);
                                       $('td:eq(8)', nRow).html(td8);
                                       $('td:eq(9)', nRow).html(td9);                          
                                       $('td:eq(10)', nRow).html(td10);
                                       $('td:eq(11)', nRow).html(td11);   
                                   
                                   return nRow;
                               },
                
            });
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
