package com.entrofine.ifactor.app.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReportListController {
	private static final Logger LOG = LoggerFactory
			.getLogger(ReportListController.class);

	@RequestMapping(value = "/report-list/aggreaget-invoice")
	public String aggregateInvoicesReportSection(Model model) {
		LOG.debug("metod=>aggregateInvoicesReportSection");
		return "report-list/aggreaget-invoice";
	}

	@RequestMapping(value = "/report-list/disbursement")
	public String disbursementReportSection(Model model) {
		LOG.debug("metod=>DisbursementReportSection");
		return "report-list/disbursement";
	}

	@RequestMapping(value = "/report-list/in-auction")
	public String inAuctionReportSection(Model model) {
		LOG.debug("metod=>inAuctionReportSection");
		return "report-list/in-auction";
	}

	@RequestMapping(value = "/report-list/settled-invoices")
	public String settledInvoicesReportSection(Model model) {
		LOG.debug("metod=>settledInvoicesReportSection");
		return "report-list/settled-invoices";
	}

	@RequestMapping(value = "/report-list/overdue-invoices")
	public String overdueInvoicesReportSection(Model model) {
		LOG.debug("metod=>overdueInvoicesReportSection");
		return "report-list/overdue-invoices";
	}

	@RequestMapping(value = "/report-list/debtor")
	public String debtorReportSection(Model model) {
		LOG.debug("metod=>overdueInvoiceReportSection");
		return "report-list/debtor";
	}

	@RequestMapping(value = "/report-list/seller")
	public String sellerReportSection(Model model) {
		LOG.debug("metod=>sellerReportSection");
		return "report-list/seller";
	}

	@RequestMapping(value = "/report-list/buyer")
	public String buyerReportSection(Model model) {
		LOG.debug("metod=>buyerReportSection");
		return "report-list/buyer";
	}
}
