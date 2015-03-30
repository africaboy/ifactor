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
  <meta charset="utf-8"/>
  <title><fmt:message key="common.topnav.title"/></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <meta content="" name="description"/>
  <meta content="" name="author"/>
  <!-- BEGIN GLOBAL MANDATORY STYLES -->
  <!-- <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"/> -->
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
  <link rel="shortcut icon" href="${base}/static/themes/metronic/img/home/policy_1.png"/>
  
  <c:set target="${self}" property="docBiztypePrefix"><%=com.entrofine.ifactor.app.service.InvoiceDocService.BIZTYPE_PREFIX%></c:set>
	<c:forEach var="doc" items="${invoiceDoc}" varStatus="status">
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
      <a href="javascript:;">
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
      <a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.head.myInvoices"/></a>
      <i class="fa fa-angle-right"></i>
    </li>
    <li>
      <a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.head.invoicesInAuction"/></a>
      <i class="fa fa-angle-right"></i>
    </li>
    <li>
      <a href="javascript:;"><fmt:message key="s.reject.an.offer.page.rejectAnOffer"/></a>
    </li>
  </ul>
</div>
<h5 class="page-title">
  <!--<small><b>Auctions status:  <span style="color: green">OPEN <i class="icon-lock-open"></i></span></b></small>-->
  <b><fmt:message key="s.reject.an.offer.page.title.rejectAnOffer"/>&nbsp;${invoice.id}</b>
</h5>
<div id="rejectdiv" class="alert alert-danger display-none">
  <img src="${base }/static/themes/metronic/img/home/warning.png" height="30px">&nbsp;&nbsp;<fmt:message key='s.accept.offer.message.reject' />
</div>
<!-- END PAGE HEADER-->
<!-- BEGIN PAGE CONTENT-->
<!-- Begin invoice summary information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-light-grey">
  <fmt:message key="seller.acceptAnOffer.page.panel.title.invoiceSummary"/>
</div>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.invoiceStickerId"/></a></div>
        <div class="col-sm-2 col-xs-12">
          <div class="input-group">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtStickerID" value="${invoice.finStickerId}">
            <span class="if-icon-addon"><a href="javascript:;"><i class="icon-lock-open" style="color: green;"></i></a></span>
          </div>
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.invoiceAmount"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <div class="input-group">
            <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtToAmount" value="<fmt:formatNumber value="${invoice.finInvAmount}" type="number" />&nbsp;VND">
            <span class="if-icon-addon"><a href="javascript:;"> <i class="icon-lock-open" style="color: green;"></i></a></span>
          </div>
        </div>
        <div class="col-sm-4 if-div-input-sm"></div>
        <!-- Row 2 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.invoiceSerialNumber"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtObject" value="${invoice.serialNumInvoice}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.invoiceObject"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtObject" value="${invoice.finObjOfInv}">
        </div>
        <!-- Row 3 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.vatInvoiceNumber"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtVATNo" value="${invoice.finVatInvNo}">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.invoiceIssuanceDate"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtIssuanceDate" value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <!-- Row 4 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.contractDueDate"/></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDueDate" value="<fmt:formatDate value='${invoice.finDueDateAccToCont}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.expectedSettlementDate"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtExpectSettle" value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.remainingMaturityTerm"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtTMT" value="${invoice.finRmngMatTerm}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />">
        </div>
        <!-- Row 5 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.releasedDate"/></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtReleaseDate" value="<fmt:formatDate value='${invoice.releasedDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.delistingDate"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDelistDate" value="<fmt:formatDate value='${invoice.endDate}' pattern='MM/dd/yyyy'/>">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.remainingDays"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtDueDate" value="${invoice.reDaysStillDelisting}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />">
        </div>
      </div>
    </div>
  </div>
</div>
<!-- End invoice summary information -->
<!-- Begin ready to sell information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-light-grey">
    <fmt:message key="seller.acceptAnOffer.page.panel.title.sellerInformation"/>
  </div>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.companyName"/></a></div>
        <div class="col-sm-6 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly value="${invoice.sellerCompanyName}">
        </div>
        <div class="col-sm-4 col-xs-12 text-left if-div-input-sm"></div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"> <fmt:message key="seller.acceptAnOffer.page.panel.body.representedBy"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  value="${invoice.sellerRepresentedByTitle}"></span>
        </div>
        <div class="col-sm-4 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  value="${lastName}&nbsp;${firstName}"></span>
        </div>
        <!-- Row 2 -->
      </div>
    </div>
  </div>
</div>
<!-- End ready to sell information -->
<!-- Begin ready to sell information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-light-grey">
    <fmt:message key="seller.acceptAnOffer.page.panel.title.debtorInformation"/>
  </div>
  <span class="if-panel-next_to"> <a href="${base}/seller/profile/debtor/${invoice.debtorName}">&gt;&gt;&gt; <fmt:message key="seller.acceptAnOffer.page.panel.body.viewMore"/>&nbsp;&nbsp;<i class="icon-arrow-right"></i></a></span>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.debtorName"/></a></div>
        <div class="col-sm-6 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  value="${invoice.debtorName}">
        </div>
        <div class="clearfix"></div>
        <div class="col-sm-2 col-xs-12 text-left if-control-label-multiple-line"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.companyRegistrationNumber"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  value="${invoice.debtorBizRegNo}"></span>
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.taxCode"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  value="${invoice.debtorTaxCode}"></span>
        </div>
        <!-- Row 2 -->
      </div>
    </div>
  </div>
</div>
<!-- End ready to sell information -->
<!-- Begin ready to sell information -->
<div class="clearfix">
  <div class="if-panel-head if-panel-blue">
    <fmt:message key="seller.acceptAnOffer.page.panel.title.readyToSell"/>
  </div>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.advance"/></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtAdvance" value="${invoice.readyToSellAdv}&nbsp;%">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.interest"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="txtInterest" value="${invoice.readyToSellInt}&nbsp;%"></span>
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
              <div id="saccanoffrtsienaatbr" style="margin-bottom: 10px">
                
              </div>
              <div id="saccanoffrtsieraas" style="margin-bottom: 10px">
                
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
        <!-- Row 2 -->
      </div>
    </div>
  </div>
</div>
<!-- End ready to sell information -->
<!-- Begin current best offer -->
<div class="clearfix">
  <div class="if-panel-head if-panel-red">
    <fmt:message key="s.reject.an.offer.page.rejectAnOffer"/>
  </div>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.advance"/></a></div>
        <div class="col-sm-2 col-xs-12">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="bestAdvance" value="${invoice.bestBuyerAdv}&nbsp;%">
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key="seller.acceptAnOffer.page.panel.body.interest"/></a></div>
        <div class="col-sm-2 col-xs-12 ">
          <input type="text" class="form-control if-input-sm if-div-input-sm" readonly  id="bestInterest" value="${invoice.bestBuyerInt}&nbsp;%">
        </div>
        <div class="col-sm-4 col-xs-12 if-div-input-sm">
          <a class="if-view-detail" href="javascript:;" id="AAOToggle" onclick="toggleDetail('<fmt:message key="seller.acceptAnOffer.page.panel.body.viewFinancingDetais"/>&nbsp;&nbsp;','<fmt:message key="seller.acceptAnOffer.page.panel.body.hideFinancingDetais"/>&nbsp;&nbsp;','#AAOToggle', '#AAODetail');"><u><fmt:message key="seller.acceptAnOffer.page.panel.body.viewFinancingDetais"/>&nbsp;&nbsp;<i class="icon-arrow-down"></i></u></a>
        </div>
        <div class="col-sm-12">
          <div class="if-detail-block" id="AAODetail">
            <div style="float: right; padding-top: 10px;padding-right: 10px; width: 30px">
              <a onclick="toggleDetail('<fmt:message key="seller.acceptAnOffer.page.panel.body.viewFinancingDetais"/>&nbsp;&nbsp;','<fmt:message key="seller.acceptAnOffer.page.panel.body.hideFinancingDetais"/>&nbsp;&nbsp;','#AAOToggle', '#AAODetail');"><i class="icon-close"></i></a>
            </div>
            <div style="float: left; padding-top: 10px;position: relative; max-width: 95%; padding-left: 20px">
              <div id="saccanoffaccaoenaatbr" style="margin-bottom: 10px">
                
              </div>
              <div id="saccanoffaccaoeraas" style="margin-bottom: 10px">
                
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
        <div class="col-sm-12 text-center" style="margin-top: 10px">
          <a href="javascript:;" class="btn if-detail-btn-group if-btn-medium dialog_reject_offer" >
            <fmt:message key="seller.acceptAnOffer.page.button.rejectOffer"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- End current best offer -->
<!-- Begin make an offer -->
<div class="clearfix">
  <div class="if-panel-head if-panel-light-grey">
    <fmt:message key="seller.acceptAnOffer.page.panel.title.documentation"/>
  </div>
  <div class="panel panel-success">
    <div class="panel-body">
      <div class="row">
        <!-- Row 1 -->
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><fmt:message key="seller.acceptAnOffer.page.panel.body.scanOfInvoice"/></div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm">
          <c:if test="${not empty self.doc1Link}"><a href="#">${self.doc1Link}</a></c:if>
		  <c:if test="${empty self.doc1Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><fmt:message key="seller.acceptAnOffer.page.panel.body.scanOfContract"/></div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm">
          <c:if test="${not empty self.doc2Link}"><a href="#">${self.doc2Link}</a></c:if>
		  <c:if test="${empty self.doc2Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
        </div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><fmt:message key="seller.acceptAnOffer.page.panel.body.deliveryConfirmation"/></div>
        <div class="col-sm-2 col-xs-12 text-left if-div-input-sm">
          <c:if test="${not empty self.doc3Link}"><a href="#">${self.doc3Link}</a></c:if>
		  <c:if test="${empty self.doc3Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
        </div>
         <c:if test="${debtorAckReq == '01' }">
	    <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><fmt:message key="s.accept.anoffer.debtor.acknowledgement"/></div>
	    <div class="col-sm-2 col-xs-12 text-left if-div-input-sm">
	      <c:if test="${not empty self.doc4Link}"><a href="#">${self.doc4Link}</a></c:if>
		  <c:if test="${empty self.doc4Link}"><fmt:message key='buyer.apply.form.button.uploadFileTip'/></c:if>
	    </div>
	    </c:if>
        <!-- Row 2 -->
      </div>
    </div>
  </div>
</div>
<!-- End make an offer -->
<form  class="form-horizontal"  id="form-bid-info"  method="post">
	<input type="hidden"  id="invoiceId"  name="invoiceId" value="${invoice.id}">
	<input type="hidden"  id="startDate"  name="startDate" value="${invoice.startDate}">
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
    <fmt:message key="seller.acceptAnOffer.page.copyright"/>
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
<script type="text/javascript" src="${base}/static/themes/metronic/js/Date.prototype.js"></script>
<script src="${base}/static/themes/metronic/js/ifactorrejectoffer.js"></script>

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
			titleOfferRts : "<fmt:message key='s.reject.an.offer.page.pleaseConfirm'/> <b><fmt:message key='s.reject.an.offer.page.reject'/></b> <fmt:message key='s.reject.an.offer.page.theFollowing'/>&nbsp;${invoice.id}:",
			strOfferRts : "<ul><li><fmt:message key='invoice.submit.form.field.finInvAmount'/>:&nbsp;<fmt:formatNumber value="${invoice.finInvAmount}" type="number" />&nbsp;VND</li><li><fmt:message key='invoice.submit.form.field.readyToSellAdv'/>:&nbsp;${invoice.bestBuyerAdv}&nbsp;%</li><li><fmt:message key='invoice.submit.form.field.readyToSellInt'/>:&nbsp;${invoice.bestBuyerInt}&nbsp;%</li></ul>",
			noOffer: "<fmt:message key='s.accept.offer.page.noOffer'/>"
};
</script>

<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
