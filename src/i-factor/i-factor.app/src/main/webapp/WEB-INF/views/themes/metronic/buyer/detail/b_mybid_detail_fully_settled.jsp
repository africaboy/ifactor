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
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
            </a>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <!-- BEGIN TOP NAVIGATION MENU -->
            <div class="top-menu">
                <ul class="nav navbar-nav pull-right">
                    <li class="dropdown dropdown-language">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
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
                    <!-- BEGIN QUICK SIDEBAR TOGGLER -->
                    <li class="dropdown dropdown-extended last">
                        <a href="${base}/buyer/bid/insettlement" class="dropdown-toggle if-logout">
                            <i class="icon-close"></i>
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
        <!-- END SIDEBAR -->
        <!-- BEGIN CONTENT -->
        <div class="page-content-wrapper">
            <div class="page-content if-detail-auction-content">
                <!-- BEGIN PAGE HEADER-->
                <div class="page-bar">
                    <ul class="page-breadcrumb">
                        <li>
                            <a href="#"><fmt:message key='b.mybid.final.closed.auction.page.breadcrumb' /></a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#"> <fmt:message key='seller.history.settled.delisted.expried.page.header.invoice' /></a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#"><fmt:message key='seller.myinvoice.detail.delisted.both.page.header.invoiceDetails' /></a>
                        </li>
                    </ul>
                </div>
                <h5 class="page-title">
                    <b><fmt:message key='seller.myinvoice.detail.delisted.both.page.title.invoiceDetails' /></b>
                </h5>
                <h5 class="page-title">
                    <small><b><fmt:message key='seller.history.delisted.both.page.auctionStatus' />:  </b><span style="color: #d64635"><b><fmt:message key='s.history.fully.settled.invoice.page.breadcrumb5' /></b> <i class="icon-lock"></i></span></small>
                </h5>
                <!-- END PAGE HEADER-->
                <!-- BEGIN PAGE CONTENT-->
                <!-- Begin invoice summary information -->
                <div class="clearfix">
                     <div class="if-panel-head if-panel-blue"><fmt:message key='seller.market.list.page.panel.body.financing' /></div>
                    <div class="panel panel-success">
                        <div class="panel-body">
                            <div class="row">
                                <!-- Row 1 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='invoice.list.thead.stickerId' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <div class="input-group">
                                        <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtStickerID" value="${invoice.finStickerId}">
                                        <span class="if-icon-addon"><a href="javascript:;"><i class="icon-lock" style="color: #d64635;"></i></a></span>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='invoice.list.thead.invoiceAmount' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <div class="input-group">
                                        <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtToAmount" value="<fmt:formatNumber value='${invoice.finInvAmount}' type='number' />&nbsp;VND">
                                        <span class="if-icon-addon"><a href="javascript:;"> <i class="icon-lock" style="color: #d64635;"></i></a></span>
                                    </div>
                                </div>
                                <div class="col-sm-4 if-div-input-sm"></div>
                                <!-- Row 2 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.myinvoice.detail.delisted.both.page.panel.body.invoiceSerialNumber' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtserialnumber" value="${invoice.serialNumInvoice}">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.myinvoice.detail.delisted.both.page.panel.body.vatInvoiceNumber' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtDetorID" value="${invoice.finVatInvNo}">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='s.myinvoice.delisted.table.thead6' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtSellerID" value="${invoice.finObjOfInv}">
                                </div>
                                <!-- Row 3 -->

                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='invoice.submit.form.field.finInvIssDate' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtObject" value="<fmt:formatDate value='${invoice.finInvIssDate}' pattern='MM/dd/yyyy'/>">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.myinvoice.detail.delisted.both.page.panel.body.contractDueDate' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtVATNo" value="<fmt:formatDate value='${invoice.finDueDateAccToCont}' pattern='MM/dd/yyyy'/>">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.myinvoice.detail.delisted.both.page.panel.body.releasedDate' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtReleaseDate" value="<fmt:formatDate value='${invoice.releasedDate}' pattern='MM/dd/yyyy'/>">
                                </div>
                                
                                <!-- Row 4 -->

                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.myinvoice.dealed.page.panel.body.auctionClosedDate' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtDelistDate" value="<fmt:formatDate value='${invoice.endDate}' pattern='MM/dd/yyyy'/>">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='s.history.dealed.invoice.Invoice.summary7' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtDueDate" value="${invoice.finRmngMatTerm}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />">
                                </div>  
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.myinvoice.disbursement.page.panel.body.disbursementDate' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtDisbursementDate" value="<fmt:formatDate value='${invoice.endDate}' pattern='MM/dd/yyyy'/>">
                                </div>
                                <!-- Row 5 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.myinvoice.disbursement.page.panel.body.expected' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtIssuanceDate" value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='MM/dd/yyyy'/>">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='buyer.debtor.profile.page.table.th.settlementDate' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtSettlementDate" value="<fmt:formatDate value='${invoice.finExpPmtDate}' pattern='MM/dd/yyyy'/>">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='buyer.mybid.detail.disbursed.page.panel.remainingTerm' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtDueDate" value="${invoice.finRmngMatTerm}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />">
                                </div>             
                                <!-- Row 6 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='buyer.mybid.detail.fully.settled.page.panel.actualInterestTerm' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtinterestterm" value="${invoice.finRmngMatTerm}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='buyer.debtor.profile.page.table.th.numberOfOverdueDays' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtDisbursementDate" value="${invoice.finRmngMatTerm}&nbsp;<fmt:message key='b.make.new.offer.page.tab1.days' />">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               <!-- End invoice summary information -->
                <!-- Begin ready to sell information -->
                <div class="clearfix">
                    <div class="if-panel-head if-panel-blue">
                        <fmt:message key='seller.myinvoice.detail.delisted.both.page.panel.title.sellerInformation' />
                    </div>
                    <span class="if-panel-next_to"> <a href="${base}/buyer/profile/seller">&gt;&gt;&gt; <fmt:message key='seller.myinvoice.detail.delisted.both.page.viewMore' />&nbsp;&nbsp;<i class="icon-arrow-right"></i></a></span>
                    <div class="panel panel-success">
                        <div class="panel-body">
                            <div class="row">
                                <!-- Row 1 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='buyer.mybid.detail.delisted.both.page.panel.sellerId' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtAdvance" value="${invoice.sellerId}">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='buyer.seller.profile.page.panel.companyIndustry' /></a></div>
                                <div class="col-sm-6 col-xs-12 if-div-input-sm">
                                    <input type="text" class="form-control if-input-sm" readonly value="${invoice.sellerCompanyName}">
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
                        <fmt:message key='buyer.debtor.profile.page.panel.title' />
                    </div>
                    <span class="if-panel-next_to"> <a href="${base}/buyer/profile/debtor">&gt;&gt;&gt; <fmt:message key='seller.myinvoice.detail.delisted.both.page.viewMore' />&nbsp;&nbsp;<i class="icon-arrow-right"></i></a></span>
                    <div class="panel panel-success">
                        <div class="panel-body">
                            <div class="row">
                                <!-- Row 1 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='invoice.list.thead.debtorName' /></a></div>
                                <div class="col-sm-6 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtAdvance" value="${invoice.debtorName}">
                                </div>
                                <div class="col-sm-4 col-xs-12 if-div-input-sm"></div>
                                <!-- Row 2 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.apply.form.field.comRegistrationNumber' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtInterest" value="${invoice.debtorBizRegNo}"></span>
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='buyer.debtor.profile.page.panel.taxCode' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtInterest" value="${invoice.debtorTaxCode}"></span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End ready to sell information -->
                <!-- Begin ready to sell information -->
                <div class="clearfix">
                    <div class="if-panel-head if-panel-blue">
                        <fmt:message key='seller.history.delisted.both.page.panel.title.ready' />
                    </div>
                    <div class="panel panel-success">
                        <div class="panel-body">
                            <div class="row">
                                <!-- Row 1 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='invoice.submit.form.field.readyToSellAdv' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtAdvance" value="${invoice.readyToSellAdv}%">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='invoice.submit.form.field.readyToSellInt' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtInterest" value="${invoice.readyToSellInt}%"></span>
                                </div>
                                <!-- Row 2 -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End ready to sell information -->
                <!-- Begin  Your offer -->
                <div class="clearfix">
                    <div class="if-panel-head if-panel-yellow-grey">
                        <fmt:message key='buyer.history.delisted.both.page.panel.title.yourOffer' />
                    </div>
                    <span class="if-panel-next_to"> <a href="${base}/buyer/auction/dealed/biddhistory">&gt;&gt;&gt; <fmt:message key='seller.myinvoice.detail.delisted.both.page.viewBiddingHistory' />&nbsp;&nbsp;<i class="icon-arrow-right"></i></a></span>
                    <div class="panel panel-success">
                        <div class="panel-body">
                            <div class="row">
                                <!-- Row 1 -->
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='invoice.submit.form.field.readyToSellAdv' /></a></div>
                                <div class="col-sm-2 col-xs-12">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtAdvance" value="${invoice.bestBuyerAdv}%">
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='invoice.submit.form.field.readyToSellInt' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtInterest" value="${invoice.bestBuyerInt}%"></span>
                                </div>
                                <div class="col-sm-2 col-xs-12 text-left if-div-input-sm"><a href="javascript:;"><fmt:message key='seller.market.list.page.table.th.numberOfBids' /></a></div>
                                <div class="col-sm-2 col-xs-12 ">
                                    <input type="text" class="form-control if-input-sm if-div-input-sm" readonly id="txtInterest" value="${invoice.noOfOffers}&nbsp;<fmt:message key='b.make.new.offer.page.bids' />">
                                </div>
                                <!-- Row 2 -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Your offer -->
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
    <script type="text/javascript" src="${base}/static/libs/metronic/3.3.0/assets/global/plugins/bootbox/bootbox.min.js"></script>
    <script src="${base}/static/themes/metronic/js/ui-alert-dialog-api.js"></script>
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
