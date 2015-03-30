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
    <title>EntroAuction Platform</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" />
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
                                Buyer
                            </span>
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="${base}/buyer/profile/view">
                                    <i class="icon-user"></i> My Profile
                                </a>
                            </li>
                            <li>
                            <li>
                                <a href="inbox.html">
                                    <i class="icon-envelope-open"></i> My Inbox &nbsp;&nbsp;&nbsp;&nbsp;<span class="badge badge-danger">
                                        3
                                    </span>
                                </a>
                            </li>
                            <li class="divider">
                            </li>
                            <li>
                                <a href="login.html">
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

                    <!-- BEGIN AUCTION MENU GROUP -->
                    <li class="heading">
                        <h3 class="uppercase">Auctions in the Market</h3>
                    </li>
                    <li class="last active">
                        <a href="#">
                            <i class="icon-book-open"></i>
                            <span class="title">Open Auctions in the Market</span>
                        </a>
                    </li>
                    <li class="last ">
                        <a href="#">
                            <i class="icon-bell"></i>
                            <span class="title">Dealed Auctions in the Market</span>
                        </a>
                    </li>
                    <!-- END AUCTION MENU GROUP -->
                    <!-- BEGIN BIDDING MENU GROUP -->
                    <li class="heading">
                        <span class="badge badge-round badge-danger">111</span>
                        <h3 class="uppercase">My bids</h3>
                    </li>
                    <li class="last ">
                        <a href="#">
                            <i class="icon-book-open"></i>
                            <span class="badge badge-round badge-danger">12</span><span class="title">Open Auctions</span>
                        </a>
                    </li>
                    <li class="last ">
                        <a href="#">
                            <i class="icon-bell"></i>
                            <span class="badge badge-round badge-danger">17</span><span class="title">Dealed Auctions</span>
                        </a>
                    </li>
                    <li class="last ">
                        <a href="#">
                            <i class="icon-anchor"></i>
                            <span class="badge badge-round badge-danger">25</span><span class="title">Disbursed Auctions</span>
                        </a>
                    </li>
                    <li class="last ">
                        <a href="#">
                            <i class="icon-loop"></i>
                            <span class="badge badge-round badge-danger">12</span> <span class="title">Invoices in Settlement</span>
                        </a>
                    </li>
                    <li class="last ">
                        <a href="#">
                            <i class="icon-ban"></i>
                            <span class="badge badge-round badge-danger">15</span><span class="title">Unsuccessful Auctions</span>
                        </a>
                    </li>
                    <li class="last">
                        <a href="#">
                            <i class="icon-close"></i>
                            <span class="badge badge-round badge-danger">10</span><span class="title">Delisted Auctions</span>
                        </a>
                    </li>
                    <li class="last ">
                        <a href="#">
                            <i class="icon-trash"></i>
                            <span class="badge badge-round badge-danger">20</span><span class="title">Final Closed Auctions</span>
                        </a>
                    </li>
                    <!-- END BIDDING MENU GROUP -->
                    <!-- BEGIN ACCOUNT MENU GROUP -->
                    <li class="heading">
                        <h3 class="uppercase">Account management</h3>
                    </li>
                    <li class="last">
                        <a href="#">
                            <i class="icon-user"></i>
                            <span class="title">My profile</span>
                        </a>
                    </li>
                    <li class="last">
                        <a href="#">
                            <i class="icon-pencil"></i>
                            <span class="title">Change password</span>
                        </a>
                    </li>
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
                            <a href="#">Auctions in the Market</a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#">Open Auctions</a>
                        </li>
                    </ul>
                </div>
                <h5 class="page-title">
                    <b>Open Auctions in the Market &nbsp;&nbsp;&nbsp;1,000,000,000 Invoices</b>
                </h5>
                <h5 class="page-title">
                    <small><b>Auctions status:  <span style="color: green">OPEN <i class="icon-lock-open"></i></span></b></small>
                </h5>
                <!-- END PAGE HEADER-->
                <!-- BEGIN PAGE CONTENT-->
                <div class="clearfix">
                    <div class="panel panel-success">
                        <div class="panel-heading" style="padding: 5px 5px;">
                            <h3 class="if-panel-title bold">Filters</h3>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-6 col-xs-6 text-left bold">Financing information</div>
                                <div class="col-sm-6 col-xs-6 text-right"><a href="#" id="toggle_link" class="if_toggle if_show" onclick="toggle('More&nbsp;&nbsp;', 'Less&nbsp;&nbsp;','col-sm-offset-5 col-sm-1 col-xs-12 text-right','col-sm-offset-7 col-sm-1 col-xs-12 text-right');">More&nbsp;&nbsp;<i class="icon-arrow-down"></i></a></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="#">Invoice Amount</a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtFromAmount" placeholder="From (VND)">
                                </div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtToAmount" placeholder="To (VND)">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm if-tooltip"><a href="#" data-toggle="tooltip" data-original-title="Ready to sell advance">RTS Advance &nbsp;<i class="icon-question"></i></a> </div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtFromRTS" placeholder="From (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtToRTS" placeholder="To (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if-tooltip"><a href="#" data-toggle="tooltip" data-original-title="Ready to sell interest">RTS Interest &nbsp;<i class="icon-question"></i></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtFromRTI" placeholder="From (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtToRTI" placeholder="To (%)">
                                </div>
                                <!-- Begin Current best offered advance -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if-tooltip if_filter_hidden"><a href="#" data-toggle="tooltip" data-original-title="Current best offered advance">CBO Advance &nbsp;<i class="icon-question"></i></a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtFromCBOA" placeholder="From (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtToCBOA" placeholder="To (%)">
                                </div>
                                <!-- End Current best offered advance -->
                                <!-- Begin Current best offered interest -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if-tooltip if_filter_hidden"><a href="#" data-toggle="tooltip" data-original-title="Current best offered interest">CBO Interest &nbsp;<i class="icon-question"></i></a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtFromCBOI" placeholder="From (%)">
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <span><input type="text" class="form-control if-input-sm if-div-input-sm" id="txtToCBOI" placeholder="To (%)"></span>
                                </div>
                                <!-- End Current best offered interest -->
                                <div class="col-sm-12 col-xs-12 text-left bold if_filter_hidden">Date information</div>
                                <!-- Begin hidden fields -->
                                <!-- Begin Release Date -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"><a href="#">Release date</a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm date-picker" value="From date" readonly="" />
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm date-picker" value="To date" readonly="" />
                                </div>
                                <!-- End Release Date -->
                                <!-- Begin Delisting Date -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"><a href="#">Delisting date</a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm date-picker" value="From date" readonly="" />
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm date-picker" value="To date" readonly="" />
                                </div>
                                <!-- End Delisting Date -->
                                <!-- Begin Remaining maturity term -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if-tooltip if_filter_hidden"><a href="#" data-toggle="tooltip" data-original-title="Remaining maturity term">TMT &nbsp;<i class="icon-question"></i></a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtFromTMT" placeholder="From (days)">
                                </div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtToTMT" placeholder="To (days)">
                                </div>
                                <!-- End Remaining maturity term -->
                                <div class="col-sm-12 col-xs-12 text-left bold if_filter_hidden">Invoice information</div>
                                <!-- Begin my bid -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"><a href="#">My bids &nbsp;<span><input type="checkbox" id="inlineCheckbox1" value="option1"></span></a></div>
                                <!-- End my bid -->
                                <!-- Begin Invoice sticker ID -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"><a href="#">Invoice sticker ID</a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtStickerID" placeholder="Sticker ID">
                                </div>
                                <!-- End Invoice sticker ID -->
                                <!-- Begin Invoice seller ID -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"><a href="#">Invoice seller ID</a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtSellerID" placeholder="Invoice seller ID">
                                </div>
                                <!-- End Invoice seller ID -->
                                <!-- Begin Invoice debtor -->
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"></div>
                                <div class="col-sm-2 col-xs-12 text-left  if-div-input-sm if_filter_hidden"><a href="#">Invoice debtor</a></div>
                                <div class="col-sm-2 col-xs-12 if_filter_hidden">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" id="txtDebtor" placeholder="Invoice debtor">
                                </div>
                                <!-- End Invoice debtor -->
                                <!-- End hidden fields -->
                                <div class="col-sm-offset-5 col-sm-1 col-xs-12 text-right" id="ifFilterButton">
                                    <a href="#" class="btn if-btn" role="button">Apply</a>
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
                                                No
                                            </th>
                                            <th style="width:60px">
                                                Bidding history
                                            </th>
                                            <th style="width:60px">
                                                Make offer
                                            </th>
                                            <th style="width:80px">
                                                Release date
                                            </th>
                                            <th style="width:80px">
                                                Invoice sticker ID
                                            </th>
                                            <th style="width:150px">
                                                Invoice amount
                                            </th>
                                            <th style="width:80px">
                                                Invoice seller ID
                                            </th>
                                            <th style="width:250px">
                                                Invoice debtor
                                            </th>
                                            <th style="width:80px">
                                                Delisting date
                                            </th>
                                            <th style="width:100px" class="if-tooltip">
                                                <a data-toggle="tooltip white" data-original-title="Ready to sell advance" style="color:white">RTSA&nbsp;<i class="icon-question"></i></a>
                                            </th>
                                            <th style="width:100px" class="if-tooltip">
                                                <a data-toggle="tooltip white" data-original-title="Current best offered advance" style="color:white">CBOA&nbsp;<i class="icon-question"></i></a>
                                            </th>
                                            <th style="width:100px" class="if-tooltip">
                                                <a data-toggle="tooltip white" data-original-title="Ready to sell interest" style="color:white">RTSI&nbsp;<i class="icon-question"></i></a>
                                            </th>
                                            <th style="width:100px" class="if-tooltip">
                                                <a data-toggle="tooltip white" data-original-title="Current best offered interest" style="color:white">CBOI&nbsp;<i class="icon-question"></i></a>
                                            </th>
                                            <th style="width:100px" class="if-tooltip">
                                                <a data-toggle="tooltip white" data-original-title="Remaining maturity term" style="color:white">TMT&nbsp;<i class="icon-question"></i></a>
                                            </th>

                                            <th style="width:20px">
                                                Number of bids
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                       <%--      <td class="static">
                                                1
                                            </td>
                                            <td>
                                                <button type="button" class="btn-small btn-info btn-circle">
                                                    <i class="fa fa-list"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn-small btn-primary btn-circle">
                                                    <i class="fa fa-hand-o-right"></i>
                                                </button>
                                            </td>
                                            <td>
                                                10/11/2014
                                            </td>
                                            <td>
                                                111111
                                            </td>
                                            <td>
                                                100,000,000 VND
                                            </td>
                                            <td>
                                                <a href="#">18292782</a>
                                            </td>
                                            <td>
                                                <a href="#">ABC International Consulting Ltd.</a>
                                            </td>
                                            <td class="if-tooltip">
                                                <a data-toggle="tooltip" data-html="true" data-original-title="Remaining days till delisting:<br />20 days">12/15/2014</a>
                                            </td>
                                            <td>
                                                90%
                                            </td>
                                            <td>
                                                85%
                                            </td>
                                            <td>
                                                15%
                                            </td>
                                            <td>
                                                12%
                                            </td>
                                            <td class="if-tooltip">
                                                <a data-toggle="tooltip" data-html="true" data-original-title="Expected settlement date:<br />12/12/2014">80 days</a>
                                            </td>
                                            <td>
                                                20 bids
                                            </td> --%>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!--<div class="col-sm-12 text-right" style="padding-right: 0px">
                              <ul class="pagination">
                                <li><a href="#">&laquo;</a></li>
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#">&raquo;</a></li>
                              </ul>
                            </div>-->
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
            Copyright &copy; 2014 EntroFine Consulting Limited. All Rights Reserved
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
                        for (var i = 0, iLen = oSettings.aiDisplay.length ; i < iLen ; i++) {
                            $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + 1);
                        }
                    }
                },
                pagingType: "bootstrapPager",
                pagerSettings: {
                    textboxWidth: 60,
                    firstIcon: "fa fa-angle-double-left",
                    previousIcon: "fa fa-angle-left",
                    nextIcon: "fa fa-angle-right",
                    lastIcon: "fa  fa-angle-double-right",
                    searchOnEnter: true
                }
            });
        });
    </script>
    <!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
