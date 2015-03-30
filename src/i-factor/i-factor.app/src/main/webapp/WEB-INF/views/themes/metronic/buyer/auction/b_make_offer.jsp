<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<%@ include file="/WEB-INF/views/themes/metronic/include/i18n.jsp"%>
<spring:eval var="readyToAdvList" expression="@catalogService.findReadyToAdv().children" />
<spring:eval var="readyToIntList" expression="@catalogService.findReadyToInt().children" />
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
  <!--<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" />-->
  <link rel="stylesheet" href="${base}/static/libs/fonts.googleapis/fonts.googleapis.css">
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
  <link rel="shortcut icon" href="favicon.ico"/>
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
    <ul class="page-sidebar-menu " data-auto-scroll="true" data-slide-speed="200">
      <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
      <li class="sidebar-toggler-wrapper">
        <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
        <div class="sidebar-toggler">
        </div>
        <!-- END SIDEBAR TOGGLER BUTTON -->
      </li>

      <!-- BEGIN AUCTION MENU GROUP -->
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
      <a href="javascript:;"><fmt:message key='b.make.new.offer.page.tbreadcrumb' /></a>
      <i class="fa fa-angle-right"></i>
    </li>
    <li>
      <a href="javascript:;"><fmt:message key='b.make.new.offer.page.tbreadcrumb1' /></a>
      <i class="fa fa-angle-right"></i>
    </li>
    <li>
      <a href="javascript:;"><fmt:message key='b.make.new.offer.page.tbreadcrumb2' /></a>
    </li>
  </ul>
</div>
<h5 class="page-title">
  <b><fmt:message key='b.make.new.offer.page.titleV2' />&nbsp;${invoice.id}</b>
</h5>
<div id="errordiv" class="alert alert-danger display-none">
  <button class="close" data-dismiss="alert"></button>
  <img src="${base }/static/themes/metronic/img/home/warning.png" height="30px">&nbsp;&nbsp;<fmt:message key='buyer.apply.message.failed' />
</div>
<!--<h5 class="page-title">
  <small><b>Auctions status:  <span style="color: green">OPEN <i class="icon-lock-open"></i></span></b></small>
</h5>-->
<!-- END PAGE HEADER-->
<!-- BEGIN PAGE CONTENT-->
<!-- Begin invoice summary information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-light-grey">
  <fmt:message key='b.make.new.offer.page.tab1' />
</div>
  <span class="if-panel-next_to"><a href="${base}/buyer/openauction/openDetail/similarInvoice/${invoice.id}">&gt;&gt;&gt; <fmt:message key='b.make.new.offer.page.similar' />&nbsp;&nbsp;<i class="icon-arrow-right"></i></a></span>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field1' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <div class="input-group">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtStickerID" value="${invoice.finStickerId}">
            <span class="if-icon-addon"><a href="javascript:;"><i class="icon-lock-open" style="color: green;"></i></a></span>
          </div>
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field2' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <div class="input-group">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtToAmountRead" value="<fmt:formatNumber value="${invoice.finInvAmount}" type="number" />&nbsp;VND">
            <input type="hidden" class="form-control if-input-sm if-div-input-sm" readonly  id="txtToAmount" value="${invoice.finInvAmount}">
            <span class="if-icon-addon"><a href="javascript:;"> <i class="icon-lock-open" style="color: green;"></i></a></span>
          </div>
        </div>
        <div class="col-sm-4 if-div-input-sm"></div>
        <!-- Row 2 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field3' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <div class="input-group">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtSellerID" value="${invoice.sellerLoginName}">
            <span class="if-icon-addon"><a href=""><i class="icon-arrow-right"></i></a></span>
          </div>
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field4' /></a></div>
        <div class="col-sm-6 col-xs-12 ">
          <div class="input-group">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDetorID" value="${invoice.debtorName}">
            <span class="if-icon-addon"><a href=""><i class="icon-arrow-right"></i></a></span>
          </div>
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field5' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDueDate" value="${invoice.serialNumInvoice}">
        </div>
        <!-- Row 3 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field6' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtVATNo" value="${invoice.finVatInvNo}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field7' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtObject" value="${invoice.finObjOfInv}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field8' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtIssuanceDate" value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <!-- Row 4 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field9' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDueDate" value="<fmt:formatDate value='${invoice.finDueDateAccToCont}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field10' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtExpectSettle" value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field11' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtTMT1" value="${invoice.finRmngMatTerm}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />">
          <input type="hidden" id="txtTMT" value="${invoice.finRmngMatTerm}">
        </div> 
        <!-- Row 5 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field12' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtReleaseDate" value="<fmt:formatDate value='${invoice.releasedDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field13' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDelistDate" value="<fmt:formatDate value='${invoice.endDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab1.field14' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDueDate"  <c:if test="${empty invoice.reDaysStillDelisting}">value="${invoice.finRmngMatTerm}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />"</c:if>  <c:if test="${not empty invoice.reDaysStillDelisting}">value="${invoice.reDaysStillDelisting}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />"</c:if>>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- End invoice summary information -->
<!-- Begin ready to sell information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-blue">
    <fmt:message key='b.make.new.offer.page.tab2' />
  </div>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab2.field1' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="readyToSellAdv1" value="${invoice.readyToSellAdv}&nbsp;%">
          <input type="hidden" id="readyToSellAdv" value="${invoice.readyToSellAdv}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab2.field2' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="readyToSellInt1" value="${invoice.readyToSellInt}&nbsp;%">
          <input type="hidden" id="readyToSellInt" value="${invoice.readyToSellInt}">
        </div>
        <div class="col-sm-4 col-xs-12 if-div-input-sm">
          <a class="if-view-detail" href="javascript:;" id="RTSToggle" onclick="toggleDetail('<fmt:message key='b.make.new.offer.page.finance' />&nbsp;&nbsp;','<fmt:message key='b.make.new.offer.page.finance.hide' />&nbsp;&nbsp;','#RTSToggle', '#RTSDetail');"><fmt:message key='b.make.new.offer.page.finance' />&nbsp;&nbsp;<i class="icon-arrow-down"></i></a>
        </div>
        <div class="col-sm-12">
          <div class="if-detail-block" id="RTSDetail">
            <div style="float: right; padding-top: 10px;padding-right: 10px; width: 30px">
              <a onclick="toggleDetail('<fmt:message key='b.make.new.offer.page.finance' />&nbsp;&nbsp;','<fmt:message key='b.make.new.offer.page.finance.hide' />&nbsp;&nbsp;','#RTSToggle', '#RTSDetail');"><i class="icon-close"></i></a>
            </div>
            <div style="float: left; padding-top: 10px;position: relative; max-width: 95%; padding-left: 20px">
              <div id="rtsitatbt" style="margin-bottom: 10px">
                
              </div>
              <div id="rtsietraas" style="margin-bottom: 10px">
                
              </div>
              <div id="rtsienras" style="margin-bottom: 10px">
                
              </div>
              <div>
                <i><u><fmt:message key='b.make.new.offer.page.finance.note7' /></u></i><br />
                <ul>
                  <li>
                    <fmt:message key='b.make.new.offer.page.finance.note8' />
                  </li>
                  <li>
                    <fmt:message key='b.make.new.offer.page.finance.note9' />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 text-center" style="margin-top: 10px">
          <a href="javascript:;" class="btn if-detail-btn-group if-btn-medium dialog_make_offer_rts" >
            <fmt:message key='b.make.new.offer.page.buyerBtn' />
          </a>
        </div>
        <!-- Row 2 -->
      </div>
    </div>
  </div>
</div>
<!-- End ready to sell information -->
<!-- Begin current best offer -->
<div class="clearfix">
  <div class="if-panel-head if-panel-red">
    <fmt:message key='b.make.new.offer.page.tab3' />
  </div>
  <span class="if-panel-next_to"><a href="${base}/buyer/auction/makeoffer/biddhistory/${invoice.id}">&gt;&gt;&gt; <fmt:message key='b.make.new.offer.page.history' />&nbsp;&nbsp;<i class="icon-arrow-right"></i></a></span>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab2.field1' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="bestBuyerAdv1" value="${invoice.bestBuyerAdv}&nbsp;%">
          <input type="hidden" id="bestBuyerAdv" value="${invoice.bestBuyerAdv}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab2.field2' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="bestBuyerInt1" value="${invoice.bestBuyerInt}&nbsp;%">
          <input type="hidden" id="bestBuyerInt" value="${invoice.bestBuyerInt}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab3.field3' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtNoOfBids" value="${bids}&nbsp;<fmt:message key='b.make.new.offer.page.bids' />">
        </div>
      </div>
    </div>
  </div>
</div>
<!-- End current best offer -->
<!-- Begin make an offer -->
<div class="clearfix">
  <div class="if-panel-head if-panel-green">
    <fmt:message key='b.make.new.offer.page.tbreadcrumb2' />
  </div>
  <span style="float: right; margin-right: 10px; margin-top: 5px"><a href="javascript:;" onclick="$('#panel_make_offer').css('display','none');"><i class="icon-close"></i></a></span>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab2.field1' /></a></div>
        <div class="col-sm-2 col-xs-12">
          <!--<input type="text" class="form-control if-input-sm if-div-input-sm" id="txtAdvance">-->
          <select name="advanceSelect" id="advanceSelect" class="form-control if-input-sm if-div-input-md">
            <option value=""></option>
            <c:forEach var="item" items="${readyToAdvList}"
				varStatus="status">
				<option value="${item.code}">${item[self.i18n.catalog_name]}%</option>
			</c:forEach>
          </select>
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='b.make.new.offer.page.tab2.field2' /></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <!--<input type="text" class="form-control if-input-sm if-div-input-sm" id="txtInterest"></span>-->
          <select name="interestSelect" id="interestSelect" class="form-control if-input-sm if-div-input-md">
            <option value=""></option>
            <c:forEach var="item" items="${readyToIntList}" varStatus="status">
		      <option value="${item.code}">${item[self.i18n.catalog_name]}%</option>
			</c:forEach>
          </select>
        </div>
        <div class="col-sm-4 col-xs-12 if-div-input-sm">
          <a class="if-view-detail" href="javascript:;" id="MNOToggle" onclick="toggleDetail('<fmt:message key='b.make.new.offer.page.finance' />&nbsp;&nbsp;','<fmt:message key='b.make.new.offer.page.finance.hide' />&nbsp;&nbsp;','#MNOToggle', '#MNODetail');"><fmt:message key='b.make.new.offer.page.finance' />&nbsp;&nbsp;<i class="icon-arrow-down"></i></a>
        </div>
        <div class="col-sm-12">
          <div class="if-detail-block" id="MNODetail">
            <div style="float: right; padding-top: 10px;padding-right: 10px; width: 30px">
              <a onclick="toggleDetail('<fmt:message key='b.make.new.offer.page.finance' />&nbsp;&nbsp;','<fmt:message key='b.make.new.offer.page.finance.hide' />&nbsp;&nbsp;','#MNOToggle', '#MNODetail');"><i class="icon-close"></i></a>
            </div>
            <div style="float: left; padding-top: 10px;position: relative; max-width: 95%; padding-left: 20px">
              <div id="maotatbt" style="margin-bottom: 10px">
              </div>
              <div id="maoetraas" style="margin-bottom: 10px">
              </div>
              <div id="maoenras" style="margin-bottom: 10px">
              </div>
              <div>
                <i><u><fmt:message key='b.make.new.offer.page.finance.note7' /></u></i><br />
                <ul>
                  <li>
                    <fmt:message key='b.make.new.offer.page.finance.note8' />
                  </li>
                  <li>
                    <fmt:message key='b.make.new.offer.page.finance.note9' />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 text-center" style="margin-top: 10px">
          <a href="javascript:;" class="btn if-detail-btn-group if-btn-medium dialog_make_offer" >
            <fmt:message key='b.make.new.offer.page.tbreadcrumb2' />
          </a>
        </div>
        <!-- Row 2 -->
      </div>
    </div>
  </div>
</div>
<!-- End make an offer -->

<!-- END PAGE CONTENT-->
</div>
</div>
<!-- END CONTENT -->
</div>
<input type="hidden"  id="invoiceId"  name="invoiceId" value="${invoice.id}">
<!-- form -->
<form  class="form-horizontal"  id="form-bid-info"  method="post">
	<input type="hidden"  id="discount"  name="discount" value="${invoice.readyToSellAdv}">
	<input type="hidden"  id="interest"  name="interest" value="${invoice.readyToSellInt}">
</form>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<div class="page-footer">
  <div class="page-footer-inner text-center">
    <fmt:message key='b.make.new.offer.page.right' />
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
<script type="text/javascript" src="${base}/static/themes/metronic/js/buyer/auction/aler-dialog-api.js"></script>
<!-- END PAGE LEVEL PLUGINS -->

<script src="${base}/static/libs/metronic/3.3.0/assets/global/scripts/metronic.js"></script>
<script src="${base}/static/libs/metronic/3.3.0/assets/admin/pages/scripts/components-pickers.js"></script>
<script src="${base}/static/themes/metronic/js/layout.js"></script>
<script src="${base}/static/themes/metronic/js/quick-sidebar.js"></script>
<script src="${base}/static/themes/metronic/js/ifactormakeoffer.js"></script>
<script src="${base}/static/themes/metronic/js/common.js"></script>

<script src="${base}/static/themes/metronic/js/jquery.numberFormat.js"></script>
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
			titleOfferRts : "<fmt:message key='b.make.title.make.an.offer.rts'/>&nbsp;${invoice.id}:",
			strOfferRts : "<fmt:message key='b.make.str.make.an.offer1'/>&nbsp;<fmt:formatNumber value="${invoice.finInvAmount}" type="number" />&nbsp;<fmt:message key='b.make.str.make.an.offer2'/>&nbsp;${invoice.readyToSellAdv}&nbsp;%<fmt:message key='b.make.str.make.an.offer3'/>&nbsp;${invoice.readyToSellInt}&nbsp;%<fmt:message key='b.make.str.make.an.offer4'/>",
			titleOffer : "<fmt:message key='b.make.title.make.an.offer'/>&nbsp;${invoice.id}:",
			strOffer1 : "<fmt:message key='b.make.str.make.an.offer1'/>&nbsp;<fmt:formatNumber value="${invoice.finInvAmount}" type="number" />&nbsp;<fmt:message key='b.make.str.make.an.offer2'/> ",
			strOffer2 : "<fmt:message key='b.make.str.make.an.offer3'/> ",
			strOffer3 : "<fmt:message key='b.make.str.make.an.offer4'/>",
			submitMsg : '<fmt:message key="b.make.new.offer.page.submit.msg"/>',
			submitTitle : '<fmt:message key="b.make.new.offer.page.submit.title"/>',
			submitTitle1 : "<fmt:message key='b.make.new.offer.page.submit.title1'/>",
			submitTxt : '<fmt:message key="b.make.new.offer.page.submit.txt"/>',
			submitTxt1 : "<fmt:message key='b.make.new.offer.page.submit.txt1'/>",
			boxBtn1 : "<fmt:message key='b.make.new.offer.page.box.btn1'/>",
			boxBtn2 : "<fmt:message key='b.make.new.offer.page.box.btn2'/>",
			advanceTit1 : "<fmt:message key='b.make.new.offer.page.advance.tit1'/>",
			advanceTit2 : "<fmt:message key='b.make.new.offer.page.advance.tit2'/>",
			advanceTit3 : "<fmt:message key='b.make.new.offer.page.advance.tit3'/>",
			advanceTit4 : "<fmt:message key='b.make.new.offer.page.advance.tit4'/>",
			interestTit1 : "<fmt:message key='b.make.new.offer.page.interest.tit1'/>",
			interestTit2 : "<fmt:message key='b.make.new.offer.page.interest.tit2'/>",
			interestTit3 : "<fmt:message key='b.make.new.offer.page.interest.tit3'/>",
			notOffer : "<fmt:message key='b.make.new.offer.page.notOffer'/>",
			failureMsg : '<fmt:message key="b.make.new.offer.page.failure.msg"/>',
			failureTit : '<fmt:message key="b.make.new.offer.page.failure.title"/>'
  };
</script>

<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
