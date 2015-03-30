package com.entrofine.ifactor.app.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.entrofine.ifactor.app.entity.AggregateInvoiceExpectedSettlementDateReportRow;
import com.entrofine.ifactor.app.entity.AggregateInvoiceRegionReportRow;
import com.entrofine.ifactor.app.entity.AggregateInvoiceSellerRatingReportRow;
import com.entrofine.ifactor.app.entity.AggregateInvoiceSmeSegmentReportRow;
import com.entrofine.ifactor.app.entity.BuyerRegionReportRow;
import com.entrofine.ifactor.app.entity.BuyerSellerRatingReportRow;
import com.entrofine.ifactor.app.entity.BuyerSmeSegmentReportRow;
import com.entrofine.ifactor.app.entity.InAuctionReportRow;
import com.entrofine.ifactor.app.entity.SellerRegionReportRow;
import com.entrofine.ifactor.app.entity.SellerSmeSegmentReportRow;
import com.entrofine.ifactor.app.service.ReportService;

@Controller
public class ReportController {
	private static final Logger LOG = LoggerFactory
			.getLogger(ReportController.class);

	@Autowired
	private ReportService reportService;

	// Aggregate Invoice Report
	@RequestMapping(value = "/report/aggregate-invoice/region")
	public String aggregateInvoiceReportByRegion(Model model) {
		LOG.debug("metod=>aggregateInvoiceReportByRegion");
		List<AggregateInvoiceRegionReportRow> details = reportService
				.aggregateInvoiceRegionReport();
		Map<String, Object> detailsSum = reportService
				.aggregateInvoiceRegionSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/aggregate-invoice/region";
	}

	@RequestMapping(value = "/report/aggregate-invoice/expected-settlement-date")
	public String aggregateInvoiceReportByExpectedSettlementDate(Model model) {
		LOG.debug("metod=>aggregateInvoiceReportByDebtor");
		List<AggregateInvoiceExpectedSettlementDateReportRow> details = reportService
				.aggregateInvoiceExpectedSettlementDateReport();
		Map<String, Object> detailsSum = reportService
				.aggregateInvoiceExpectedSettlementDateSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/aggregate-invoice/expected-settlement-date";
	}

	@RequestMapping(value = "/report/aggregate-invoice/sme-segment")
	public String aggregateInvoiceReportBySMESegmen(Model model) {
		LOG.debug("metod=>aggregateInvoiceReportBySMESegmen");
		List<AggregateInvoiceSmeSegmentReportRow> details = reportService
				.aggregateInvoiceSmeSegmentReport();
		Map<String, Object> detailsSum = reportService
				.aggregateInvoiceSmeSegmentSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/aggregate-invoice/sme-segment";
	}

	@RequestMapping(value = "/report/aggregate-invoice/seller-rating")
	public String aggregateInvoiceReportBySellerRating(Model model) {
		LOG.debug("metod=>aggregateInvoiceReportByInvoiceRating");
		List<AggregateInvoiceSellerRatingReportRow> details = reportService
				.aggregateInvoiceSellerRatingReport();
		Map<String, Object> detailsSum = reportService
				.aggregateInvoiceSellerRatingSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/aggregate-invoice/seller-rating";
	}

	// In-auction report
	@RequestMapping(value = "/report/in-auction/vpbank")
	public String inAuctionForVPBankReport(Model model) {
		LOG.debug("metod=>inAuctionForVPBankReport");
		List<InAuctionReportRow> details = reportService
				.inAuctionForVPBankReport();
		Map<String, Object> detailsSum = reportService
				.inAuctionForVPBankSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/in-auction/vpbank";
	}

	@RequestMapping(value = "/report/in-auction/public")
	public String inAuctionForPublicReport(Model model) {
		LOG.debug("metod=>inAuctionForPublicReport");
		List<InAuctionReportRow> details = reportService
				.inAuctionForPublicReport();
		Map<String, Object> detailsSum = reportService
				.inAuctionForPublicSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/in-auction/public";
	}

	// Seller Report
	@RequestMapping(value = "/report/seller/detail")
	public String sellerDetailedReport(Model model) {
		LOG.debug("metod=>sellerDetailedReport");
		List<Object> details = reportService.sellerDetailsReport();
		Map<String, Object> detailsSum = reportService.sellerDetailsSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/seller/detail";
	}

	@RequestMapping(value = "/report/seller/region")
	public String aggregateSellersReportByRegion(Model model) {
		LOG.debug("metod=>aggregateSellersReportByRegion");
		List<SellerRegionReportRow> details = reportService
				.sellerRegionReport();
		Map<String, Object> detailsSum = reportService.sellerRegionSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/seller/region";
	}

	@RequestMapping(value = "/report/seller/debtor")
	public String aggregateSellersReportByCategoryOfDebtors(Model model) {
		LOG.debug("metod=>aggregateSellersReportByCategoryOfDebtors");
		return "report/seller/debtor";
	}

	@RequestMapping(value = "/report/seller/sme-segment")
	public String aggregateSellersReportBySMESegments(Model model) {
		LOG.debug("metod=>aggregateSellersReportBySMESegments");
		List<SellerSmeSegmentReportRow> details = reportService
				.sellerSmeSegmentReport();
		Map<String, Object> detailsSum = reportService
				.sellerSmeSegmentSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/seller/sme-segment";
	}

	@RequestMapping(value = "/report/seller/seller-rating")
	public String aggregateSellersReportBySellerRating(Model model) {
		LOG.debug("metod=>aggregateSellersReportBySellerRating");
		return "report/seller/seller-rating";
	}

	@RequestMapping(value = "/report/seller/debtor-rating")
	public String aggregateSellersReportByDebtorRating(Model model) {
		LOG.debug("metod=>aggregateSellersReportByDebtorRating");
		return "report/seller/debtor-rating";
	}

	@RequestMapping(value = "/report/seller/invoice-rating")
	public String aggregateSellersReportByInvoiceRating(Model model) {
		LOG.debug("metod=>aggregateSellersReportByInvoiceRating");
		return "report/seller/invoice-rating";
	}

	// Buyer Report
	@RequestMapping(value = "/report/buyer/detail")
	public String buyerDetailedReport(Model model) {
		LOG.debug("metod=>buyerDetailedReport");
		List<Object> details = reportService.buyerDetailsReport();
		Map<String, Object> detailsSum = reportService.buyerDetailsSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/buyer/detail";
	}

	@RequestMapping(value = "/report/buyer/region")
	public String aggregateBuyersReportByRegion(Model model) {
		LOG.debug("metod=>aggregateBuyersReportByRegion");
		List<BuyerRegionReportRow> details = reportService.buyerRegionReport();
		Map<String, Object> detailsSum = reportService.buyerRegionSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/buyer/region";
	}

	@RequestMapping(value = "/report/buyer/debtor")
	public String aggregateBuyersReportByCategoryOfDebtors(Model model) {
		LOG.debug("metod=>aggregateBuyersReportByCategoryOfDebtors");
		return "report/buyer/debtor";
	}

	@RequestMapping(value = "/report/buyer/sme-segment")
	public String aggregateBuyersReportBySMESegments(Model model) {
		LOG.debug("metod=>aggregateBuyersReportBySMESegments");
		List<BuyerSmeSegmentReportRow> details = reportService
				.buyerSmeSegmentReport();
		Map<String, Object> detailsSum = reportService
				.buyerSmeSegmentSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/buyer/sme-segment";
	}

	@RequestMapping(value = "/report/buyer/seller-rating")
	public String aggregateBuyersReportBySellerRating(Model model) {
		LOG.debug("metod=>aggregateBuyersReportBySellerRating");
		List<BuyerSellerRatingReportRow> details = reportService
				.buyerSellerRatingReport();
		Map<String, Object> detailsSum = reportService
				.buyerSmeSegmentSumReport();
		model.addAttribute("details", details);
		model.addAttribute("detailsSum", detailsSum);
		return "report/seller/seller-rating";
	}

	@RequestMapping(value = "/report/buyer/debtor-rating")
	public String aggregateBuyersReportByDebtorRating(Model model) {
		LOG.debug("metod=>aggregateBuyersReportByDebtorRating");
		return "report/buyer/debtor-rating";
	}

	@RequestMapping(value = "/report/buyer/invoice-rating")
	public String aggregateBuyersReportByInvoiceRating(Model model) {
		LOG.debug("metod=>aggregateBuyersReportByInvoiceRating");
		return "report/buyer/invoice-rating";
	}
}
