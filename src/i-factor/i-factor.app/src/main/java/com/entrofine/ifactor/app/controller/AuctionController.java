package com.entrofine.ifactor.app.controller;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entrofine.ifactor.app.entity.AjaxOperResponse;
import com.entrofine.ifactor.app.entity.Auction;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.InvoicePageState;
import com.entrofine.ifactor.app.entity.InvoiceState;
import com.entrofine.ifactor.app.entity.InvoiceStateCheck;
import com.entrofine.ifactor.app.service.AuctionService;
import com.entrofine.ifactor.app.service.InvoiceService;

@Controller
public class AuctionController {

	private static final Logger LOG = LoggerFactory
			.getLogger(AuctionController.class);

	@Autowired
	private AuctionService auctionService;

	@Autowired
	private InvoiceService invoiceService;

	@RequestMapping(value = "/buyer/auction", method = RequestMethod.POST)
	@ResponseBody
	public Serializable save(
			@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("auction") Auction auction,
			@RequestParam(value = "invoiceId", defaultValue = "0") Long invoiceId,
			Model model) {
		AjaxOperResponse response = null;
		try {
			if (isCommit) {
				auctionService.submitBidForBuyNow(auction, invoiceId);
			} else {
				auctionService.submitBid(auction, invoiceId);
			}
			model.addAttribute("message", "success!");
			// return "{isSucceed:true,message:'Operation successful'}";
			response = new AjaxOperResponse(true, "Auction success!");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			// return "{isSucceed:false,message:'" + e.getMessage() + "'}";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/buyer/bid/open/{id}", method = RequestMethod.GET)
	public String openDetail(@PathVariable Long id, Model model) {
		model.addAttribute("auction", auctionService.findOne(id));
		return "buyer/mybids/opendetail";
	}

	@RequestMapping(value = "/buyer/bid/closed/{id}", method = RequestMethod.GET)
	public String closedDetail(@PathVariable Long id, Model model) {
		model.addAttribute("auction", auctionService.findOne(id));
		return "buyer/mybids/closeddetail";
	}

	@RequestMapping(value = "/buyer/auction/delistedexpried/detail", method = RequestMethod.GET)
	public String delistedExpriedDetai(Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 * 
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_delisted_expried";
	}

	// update by xuliufang

	/**
	 * b_mybid_detail_dealed_auction.jsp页面
	 * 
	 * update by xuliufang 2014-12-10
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/dealed/detail/{id}", method = RequestMethod.GET)
	public String inAuctionDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);
		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_dealed_auction";

	}

	/**
	 * b_mybid_detail_delisted_both.jsp页面
	 * 
	 * update by xuliufang 2014-12-10
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/delistedboth/detail/{id}", method = RequestMethod.GET)
	public String delistedBothDetai(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);
		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_delisted_both";
	}

	/**
	 * b_mybid_detail_delisted_expried.jsp页面
	 * 
	 * update by xuliufang 2014-12-10
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/delistedexpired/detail/{id}", method = RequestMethod.GET)
	public String delistedExpriedDetai(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 * 
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		return "/buyer/detail/b_mybid_detail_delisted_expired";
	}

	/**
	 * b_mybid_detail_delisted_undisbursed.jsp页面
	 * 
	 * update by xuliufang 2014-12-10
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/delistedundisbursed/detail/{id}", method = RequestMethod.GET)
	public String delistedUndisbursedDetai(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_delisted_undisbursed";
	}

	/**
	 * b_mybid_detail_disbursed_auction.jsp页面
	 * 
	 * update by xuliufang 2014-12-10
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/disbursed/detail/{id}", method = RequestMethod.GET)
	public String disbursedDetai(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_disbursed_auction";
	}

	/**
	 * b_mybid_detail_final_closed.jsp页面
	 * 
	 * update by xuliufang 2014-12-11
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/finalclosed/detail/{id}", method = RequestMethod.GET)
	public String finalClosedDetai(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_final_closed";
	}

	/**
	 * b_mybid_detail_fully_settled.jsp页面
	 * 
	 * update by xuliufang 2014-12-11
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/fullysettled/detail/{id}", method = RequestMethod.GET)
	public String fullySettledDetai(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_fully_settled";
	}

	/**
	 * b_mybid_detail_partical_settled.jsp页面
	 * 
	 * update by xuliufang 2014-12-11
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/particalsettled/detail/{id}", method = RequestMethod.GET)
	public String particalSettledDetai(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_partical_settled";
	}

	/**
	 * b_mybid_detail_overdue.jsp页面
	 * 
	 * update by xuliufang 2014-12-11
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/overdue/detail/{id}", method = RequestMethod.GET)
	public String overDueDetai(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_overdue";
	}

	/**
	 * b_mybid_detail_unsuccessful_auction.jsp页面
	 * 
	 * update by xuliufang 2014-12-11
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/unsuccessful/detail/{id}", method = RequestMethod.GET)
	public String unsuccessfulDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/buyer/detail/b_mybid_detail_unsuccessful_auction";
	}

	/**
	 * b_mybid_open_auction.jsp页面的查询条件方法
	 * 
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 */
	@RequestMapping(value = { "/buyer/bid/open", "/buyer/bid/openList" })
	public String openList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "finInvAmountFrom", defaultValue = "0") String finInvAmountFrom,
			@RequestParam(value = "finInvAmountTo", defaultValue = "100000000000") String finInvAmountTo,
			@RequestParam(value = "readyToSellAdvFrom", defaultValue = "0") String readyToSellAdvFrom,
			@RequestParam(value = "readyToSellAdvTo", defaultValue = "100") String readyToSellAdvTo,
			@RequestParam(value = "readyToSellIntFrom", defaultValue = "0") String readyToSellIntFrom,
			@RequestParam(value = "readyToSellIntTo", defaultValue = "100") String readyToSellIntTo,
			@RequestParam(value = "curBestOffrAdvFrom", defaultValue = "0") String curBestOffrAdvFrom,
			@RequestParam(value = "curBestOffrAdvTo", defaultValue = "100") String curBestOffrAdvTo,
			@RequestParam(value = "curBestOffrIntFrom", defaultValue = "0") String curBestOffrIntFrom,
			@RequestParam(value = "curBestOffrIntTo", defaultValue = "100") String curBestOffrIntTo,
			@RequestParam(value = "biddingDateFrom", defaultValue = "1001-01-01") String biddingDateFrom,
			@RequestParam(value = "biddingDateTo", defaultValue = "3999-01-01") String biddingDateTo,
			@RequestParam(value = "delistingDateFrom", defaultValue = "1001-01-01") String delistingDateFrom,
			@RequestParam(value = "delistingDateTo", defaultValue = "3999-01-01") String delistingDateTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("biddingDateFrom:" + biddingDateFrom);
		LOG.debug("biddingDateTo:" + biddingDateTo);
		LOG.debug("delistingDateFrom:" + delistingDateFrom);
		LOG.debug("delistingDateTo:" + delistingDateTo);

		BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom);
		BigDecimal finInvAmountT = new BigDecimal(finInvAmountTo);

		BigDecimal readyToSellAdvF = new BigDecimal(readyToSellAdvFrom);
		BigDecimal readyToSellAdvT = new BigDecimal(readyToSellAdvTo);

		BigDecimal readyToSellIntF = new BigDecimal(readyToSellIntFrom);
		BigDecimal readyToSellIntT = new BigDecimal(readyToSellIntTo);

		/*
		 * Double curBestOffrAdvF = Double.parseDouble(curBestOffrAdvFrom);
		 * Double curBestOffrAdvT = Double.parseDouble(curBestOffrAdvTo);
		 */

		Double curBestOffrIntF = Double.parseDouble(curBestOffrIntFrom);
		Double curBestOffrIntT = Double.parseDouble(curBestOffrIntTo);

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null;
		 * 
		 * if (null == status || "".equals(status)) {
		 * statusList.add("Release invoice"); } else { String[] statuses =
		 * status.split(","); for (int i = 0; i <= statuses.length - 1; i++) {
		 * statusList.add(statuses[i]); } }
		 */
		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_02");
		statusList.add("IAS_03");
		statusList.add("xhLGTcqzFh_dSHAvdyhfW");
		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */
		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Auction> auctions = auctionService.getCurrentBuyerBestBid(
				statusList, finInvAmountF, finInvAmountT, readyToSellAdvF,
				readyToSellAdvT, readyToSellIntF, readyToSellIntT,
				curBestOffrIntF, curBestOffrIntT, pageNumber, pageSize);
		/*
		 * .
		 * getAuctionsByStatusAndInvoiceAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrInt
		 * ( statusList, finInvAmountF, finInvAmountT, readyToSellAdvF,
		 * readyToSellAdvT, readyToSellIntF, readyToSellIntT, curBestOffrIntF,
		 * curBestOffrIntT, pageNumber, pageSize);
		 */

		model.addAttribute("page", auctions);

		/*
		 * List<Invoice> invoiceList = invoices.getContent();
		 * 
		 * for (Invoice invoice : invoiceList) { Long invoiceId =
		 * invoice.getId(); Map<String, String> map = auctionService
		 * .getAuctionBidsInfo(invoiceId); model.addAttribute("advance",
		 * map.get("advance")); model.addAttribute("interest",
		 * map.get("interest")); }
		 */
		/*
		 * // Solution 1 Map<Long, Auction> bestOfferMap = new HashMap<Long,
		 * Auction>(); for (Invoice invoice : invoices.getContent()) { Long
		 * invoiceId = invoice.getId(); Auction acution = null; //
		 * 获取当前用户的最优报价(userId, invoiceId) bestOfferMap.put(invoiceId, acution);
		 * }
		 */
		// model.addAttribute("page", invoices);

		return "buyer/mybids/b_mybid_open_auction";
	}

	/**
	 * b_mybid_dealed_auction.jsp 页面的查询条件方法
	 * 
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @return
	 */
	@RequestMapping(value = { "/buyer/bid/dealed", "/buyer/bid/dealedList" })
	public String dealedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "finInvAmountFrom", defaultValue = "0") String finInvAmountFrom,
			@RequestParam(value = "finInvAmountTo", defaultValue = "100000000000") String finInvAmountTo,
			@RequestParam(value = "auctionClosedDateFrom", defaultValue = "2001-01-01") String auctionClosedDateFrom,
			@RequestParam(value = "auctionClosedDateTo", defaultValue = "2001-01-01") String auctionClosedDateTo,
			@RequestParam(value = "finExpPmtDateFrom", defaultValue = "2001-01-01") String finExpPmtDateFrom,
			@RequestParam(value = "finExpPmtDateTo", defaultValue = "2001-01-01") String finExpPmtDateTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("auctionClosedDateFrom:" + auctionClosedDateFrom);
		LOG.debug("auctionClosedDateTo:" + auctionClosedDateTo);
		LOG.debug("finExpPmtDateFrom:" + finExpPmtDateFrom);
		LOG.debug("finExpPmtDateTo:" + finExpPmtDateTo);

		BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom);
		BigDecimal finInvAmountT = new BigDecimal(finInvAmountTo);

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null;
		 * 
		 * if (null == status || "".equals(status)) {
		 * statusList.add("Release invoice"); } else { String[] statuses =
		 * status.split(","); for (int i = 0; i <= statuses.length - 1; i++) {
		 * statusList.add(statuses[i]); } }
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_05");

		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */
		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = invoiceService
				.getAuctionsByStatusAndInvoiceAndFinInvAmount(statusList,
						finInvAmountF, finInvAmountT, pageNumber, pageSize);
		model.addAttribute("page", invoices);
		return "buyer/mybids/b_mybid_dealed_auction";
	}

	/**
	 * b_mybid_disbursed_auction.jsp 页面查询条件的方法
	 * 
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param acceptedAdvanceFrom
	 * @param acceptedAdvanceTo
	 * @param acceptedInterestFrom
	 * @param acceptedInterestTo
	 * @param disbursementDateFrom
	 * @param disbursementDateTo
	 * @param expectedSettlementDateFrom
	 * @param expectedSettlementDateTo
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/buyer/bid/disbursed",
			"/buyer/bid/disbursedList" })
	public String disbursedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "invoiceAmountFrom", required = true, defaultValue = "0") String invoiceAmountFrom,
			@RequestParam(value = "invoiceAmountTo", required = true, defaultValue = "100000000000") String invoiceAmountTo,
			@RequestParam(value = "acceptedAdvanceFrom", required = true, defaultValue = "0") String acceptedAdvanceFrom,
			@RequestParam(value = "acceptedAdvanceTo", required = true, defaultValue = "100") String acceptedAdvanceTo,
			@RequestParam(value = "acceptedInterestFrom", required = true, defaultValue = "0") String acceptedInterestFrom,
			@RequestParam(value = "acceptedInterestTo", required = true, defaultValue = "100") String acceptedInterestTo,
			@RequestParam(value = "disbursementDateFrom", required = true, defaultValue = "") String disbursementDateFrom,
			@RequestParam(value = "disbursementDateTo", required = true, defaultValue = "") String disbursementDateTo,
			@RequestParam(value = "expectedSettlementDateFrom", required = true, defaultValue = "") String expectedSettlementDateFrom,
			@RequestParam(value = "expectedSettlementDateTo", required = true, defaultValue = "") String expectedSettlementDateTo,

			@RequestParam(value = "interestFrom", required = false, defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", required = false, defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {

		LOG.debug("disbursementDateFrom:" + disbursementDateFrom);
		LOG.debug("disbursementDateTo:" + disbursementDateTo);
		LOG.debug("expectedSettlementDateFrom:" + expectedSettlementDateFrom);
		LOG.debug("expectedSettlementDateTo:" + expectedSettlementDateTo);

		BigDecimal invoiceAmountF = new BigDecimal(invoiceAmountFrom);
		BigDecimal invoiceAmountT = new BigDecimal(invoiceAmountTo);
		BigDecimal acceptedAdvanceF = new BigDecimal(acceptedAdvanceFrom);
		BigDecimal acceptedAdvanceT = new BigDecimal(acceptedAdvanceTo);
		BigDecimal acceptedInterestF = new BigDecimal(acceptedInterestFrom);
		BigDecimal acceptedInterestT = new BigDecimal(acceptedInterestTo);

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null;
		 * 
		 * if (null == status || "".equals(status)) {
		 * statusList.add("Release invoice"); } else { String[] statuses =
		 * status.split(","); for (int i = 0; i <= statuses.length - 1; i++) {
		 * statusList.add(statuses[i]); } }
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_07");
		statusList.add("IAS_08");

		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */
		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Auction> auctions = auctionService
				.getAuctionsByStatusAndInterestAndBmybiddisbursedauction(
						statusList, interestF, interestT, invoiceAmountF,
						invoiceAmountT, acceptedAdvanceF, acceptedAdvanceT,
						acceptedInterestF, acceptedInterestT,
						disbursementDateFrom, disbursementDateTo,
						expectedSettlementDateFrom, expectedSettlementDateTo,
						pageNumber, pageSize);

		model.addAttribute("page", auctions);
		return "buyer/mybids/b_mybid_disbursed_auction";
	}

	/**
	 * add by liulongxiang 2014-11-14
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @return
	 */

	/**
	 * b_mybid_invoice_in_settle.jsp 页面条件查询的方法
	 * 
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param noofOverdueDaysFrom
	 * @param noofOverdueDaysTo
	 * @param fullySettled
	 * @param partiallySettled
	 * @param overdue
	 * @param settlementDateFrom
	 * @param settlementDateTo
	 * @param expectedSettlementDateFrom
	 * @param expectedSettlementDateTo
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/buyer/bid/insettlement",
			"/buyer/bid/insettlementList" })
	public String insettlementList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "invoiceAmountFrom", required = true, defaultValue = "0") String invoiceAmountFrom,
			@RequestParam(value = "invoiceAmountTo", required = true, defaultValue = "100000000000") String invoiceAmountTo,
			@RequestParam(value = "noofOverdueDaysFrom", required = true, defaultValue = "0") String noofOverdueDaysFrom,
			@RequestParam(value = "noofOverdueDaysTo", required = true, defaultValue = "100") String noofOverdueDaysTo,
			@RequestParam(value = "fullySettled", required = true, defaultValue = "") String fullySettled,
			@RequestParam(value = "partiallySettled", required = true, defaultValue = "") String partiallySettled,
			@RequestParam(value = "overdue", required = true, defaultValue = "") String overdue,
			@RequestParam(value = "settlementDateFrom", required = true, defaultValue = "") String settlementDateFrom,
			@RequestParam(value = "settlementDateTo", required = true, defaultValue = "") String settlementDateTo,
			@RequestParam(value = "expectedSettlementDateFrom", required = true, defaultValue = "") String expectedSettlementDateFrom,
			@RequestParam(value = "expectedSettlementDateTo", required = true, defaultValue = "") String expectedSettlementDateTo,

			@RequestParam(value = "interestFrom", required = false, defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", required = false, defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {

		LOG.debug("settlementDateFrom:" + settlementDateFrom);
		LOG.debug("settlementDateTo:" + settlementDateTo);
		LOG.debug("expectedSettlementDateFrom:" + expectedSettlementDateFrom);
		LOG.debug("expectedSettlementDateTo:" + expectedSettlementDateTo);

		BigDecimal invoiceAmountF = new BigDecimal(invoiceAmountFrom);
		BigDecimal invoiceAmountT = new BigDecimal(invoiceAmountTo);
		BigDecimal noofOverdueDaysF = new BigDecimal(noofOverdueDaysFrom);
		BigDecimal noofOverdueDaysT = new BigDecimal(noofOverdueDaysTo);

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null;
		 * 
		 * if (null == status || "".equals(status)) {
		 * statusList.add("Release invoice"); } else { String[] statuses =
		 * status.split(","); for (int i = 0; i <= statuses.length - 1; i++) {
		 * statusList.add(statuses[i]); } }
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_09");
		statusList.add("IAS_13");
		statusList.add("IAS_14");

		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Auction> auctions = auctionService
				.getAuctionsByStatusAndInterestAndBmybidinvoiceinsettle(
						statusList, interestF, interestT, invoiceAmountF,
						invoiceAmountT, noofOverdueDaysF, noofOverdueDaysT,
						fullySettled, partiallySettled, overdue,
						settlementDateFrom, settlementDateTo,
						expectedSettlementDateFrom, expectedSettlementDateTo,
						pageNumber, pageSize);
		model.addAttribute("page", auctions);
		return "buyer/mybids/b_mybid_invoice_in_settle";
	}

	/**
	 * add by liulongxiang 2014-11-14
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @return
	 */

	/**
	 * b_mybid_unsuccessful_auction.jsp 页面条件查询的方法 update luoxunda 2014/12/05
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param readyToSellAdvanceFrom
	 * @param readyToSellAdvanceTo
	 * @param readyToSellInterestFrom
	 * @param readyToSellInterestTo
	 * @param auctionClosedDateFrom
	 * @param auctionClosedDateTo
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/buyer/bid/unsuccessful",
			"/buyer/bid/unsuccessfulList" })
	public String unsuccessfulList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "invoiceAmountFrom", required = true, defaultValue = "0") String invoiceAmountFrom,
			@RequestParam(value = "invoiceAmountTo", required = true, defaultValue = "100000000000") String invoiceAmountTo,
			@RequestParam(value = "readyToSellAdvanceFrom", required = true, defaultValue = "0") String readyToSellAdvanceFrom,
			@RequestParam(value = "readyToSellAdvanceTo", required = true, defaultValue = "100") String readyToSellAdvanceTo,
			@RequestParam(value = "readyToSellInterestFrom", required = true, defaultValue = "0") String readyToSellInterestFrom,
			@RequestParam(value = "readyToSellInterestTo", required = true, defaultValue = "100") String readyToSellInterestTo,
			@RequestParam(value = "auctionClosedDateFrom", required = true, defaultValue = "") String auctionClosedDateFrom,
			@RequestParam(value = "auctionClosedDateTo", required = true, defaultValue = "") String auctionClosedDateTo,

			@RequestParam(value = "interestFrom", required = false, defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", required = false, defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {

		LOG.debug("auctionClosedDateFrom:" + auctionClosedDateFrom);
		LOG.debug("auctionClosedDateTo:" + auctionClosedDateTo);

		BigDecimal invoiceAmountF = new BigDecimal(invoiceAmountFrom);
		BigDecimal invoiceAmountT = new BigDecimal(invoiceAmountTo);
		BigDecimal readyToSellAdvanceF = new BigDecimal(readyToSellAdvanceFrom);
		BigDecimal readyToSellAdvanceT = new BigDecimal(readyToSellAdvanceTo);
		BigDecimal readyToSellInterestF = new BigDecimal(
				readyToSellInterestFrom);
		BigDecimal readyToSellInterestT = new BigDecimal(readyToSellInterestTo);

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null;
		 * 
		 * if (null == status || "".equals(status)) {
		 * statusList.add("Release invoice"); } else { String[] statuses =
		 * status.split(","); for (int i = 0; i <= statuses.length - 1; i++) {
		 * statusList.add(statuses[i]); } }
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_07");

		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Auction> auctions = auctionService
				.getAuctionsByStatusAndInterestAndBmybidunsuccessfulauction(
						statusList, interestF, interestT, invoiceAmountF,
						invoiceAmountT, readyToSellAdvanceF,
						readyToSellAdvanceT, readyToSellInterestF,
						readyToSellInterestT, auctionClosedDateFrom,
						auctionClosedDateTo, pageNumber, pageSize);
		model.addAttribute("page", auctions);
		/* model.addAttribute("stateChecks", stateCheckedList); */
		return "buyer/mybids/b_mybid_unsuccessful_auction";
	}

	/**
	 * add by liulongxiang 2014-11-14
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @return
	 */

	/**
	 * b_mybid_delisted_auction.jsp 页面条件查询的方法 update by luoxunda 2014/12/05
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param readyToSellAdvanceFrom
	 * @param readyToSellAdvanceTo
	 * @param readyToSellInterestFrom
	 * @param readyToSellInterestTo
	 * @param delistingDateFrom
	 * @param delistingDateTo
	 * @param servicesDelivery
	 * @param goodsDeliveryPerishable
	 * @param goodsDeliveryNonperishable
	 * @param expired
	 * @param unsuccesfulDisbursement
	 * @param unsuccesfulDisbursementExpired
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/buyer/bid/delisted", "/buyer/bid/delistedList" })
	public String delistedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "invoiceAmountFrom", required = true, defaultValue = "0") String invoiceAmountFrom,
			@RequestParam(value = "invoiceAmountTo", required = true, defaultValue = "100000000000") String invoiceAmountTo,
			@RequestParam(value = "readyToSellAdvanceFrom", required = true, defaultValue = "0") String readyToSellAdvanceFrom,
			@RequestParam(value = "readyToSellAdvanceTo", required = true, defaultValue = "100") String readyToSellAdvanceTo,
			@RequestParam(value = "readyToSellInterestFrom", required = true, defaultValue = "0") String readyToSellInterestFrom,
			@RequestParam(value = "readyToSellInterestTo", required = true, defaultValue = "100") String readyToSellInterestTo,
			@RequestParam(value = "delistingDateFrom", required = true, defaultValue = "") String delistingDateFrom,
			@RequestParam(value = "delistingDateTo", required = true, defaultValue = "") String delistingDateTo,
			@RequestParam(value = "servicesDelivery", required = true, defaultValue = "") String servicesDelivery,
			@RequestParam(value = "goodsDeliveryPerishable", required = true, defaultValue = "") String goodsDeliveryPerishable,
			@RequestParam(value = "goodsDeliveryNonperishable", required = true, defaultValue = "") String goodsDeliveryNonperishable,
			@RequestParam(value = "expired", required = true, defaultValue = "") String expired,
			@RequestParam(value = "unsuccesfulDisbursement", required = true, defaultValue = "") String unsuccesfulDisbursement,
			@RequestParam(value = "unsuccesfulDisbursementExpired", required = true, defaultValue = "") String unsuccesfulDisbursementExpired,

			@RequestParam(value = "interestFrom", required = false, defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", required = false, defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {

		LOG.debug("delistingDateFrom:" + delistingDateFrom);
		LOG.debug("delistingDateTo:" + delistingDateTo);

		BigDecimal invoiceAmountF = new BigDecimal(invoiceAmountFrom);
		BigDecimal invoiceAmountT = new BigDecimal(invoiceAmountTo);
		BigDecimal readyToSellAdvanceF = new BigDecimal(readyToSellAdvanceFrom);
		BigDecimal readyToSellAdvanceT = new BigDecimal(readyToSellAdvanceTo);
		BigDecimal readyToSellInterestF = new BigDecimal(
				readyToSellInterestFrom);
		BigDecimal readyToSellInterestT = new BigDecimal(readyToSellInterestTo);

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null;
		 * 
		 * if (null == status || "".equals(status)) {
		 * statusList.add("Release invoice"); } else { String[] statuses =
		 * status.split(","); for (int i = 0; i <= statuses.length - 1; i++) {
		 * statusList.add(statuses[i]); } }
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_06");

		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Auction> auctions = auctionService
				.getAuctionsByStatusAndInterestAndBmybiddelistedauction(
						statusList, interestF, interestT, invoiceAmountF,
						invoiceAmountT, readyToSellAdvanceF,
						readyToSellAdvanceT, readyToSellInterestF,
						readyToSellInterestT, delistingDateFrom,
						delistingDateTo, servicesDelivery,
						goodsDeliveryPerishable, goodsDeliveryNonperishable,
						expired, unsuccesfulDisbursement,
						unsuccesfulDisbursementExpired, pageNumber, pageSize);
		model.addAttribute("page", auctions);
		/* model.addAttribute("stateChecks", stateCheckedList); */
		return "buyer/mybids/b_mybid_delisted_auction";
	}

	/**
	 * add by liulongxiang 2014-7-11
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @return
	 */

	/**
	 * b_mybid_final_closed_auction.jsp 页面条件查询的方法
	 * 
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param settlementDateFrom
	 * @param settlementDateTo
	 * @param expectedSettlementDateFrom
	 * @param expectedSettlementDateTo
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/buyer/bid/finalclosed",
			"/buyer/bid/finalclosedList" })
	public String closedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "invoiceAmountFrom", required = true, defaultValue = "0") String invoiceAmountFrom,
			@RequestParam(value = "invoiceAmountTo", required = true, defaultValue = "100000000000") String invoiceAmountTo,
			@RequestParam(value = "settlementDateFrom", required = true, defaultValue = "") String settlementDateFrom,
			@RequestParam(value = "settlementDateTo", required = true, defaultValue = "") String settlementDateTo,
			@RequestParam(value = "expectedSettlementDateFrom", required = true, defaultValue = "") String expectedSettlementDateFrom,
			@RequestParam(value = "expectedSettlementDateTo", required = true, defaultValue = "") String expectedSettlementDateTo,

			@RequestParam(value = "interestFrom", required = false, defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", required = false, defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("AuctionController: method=>closedList()");
		LOG.debug("settlementDateFrom:" + settlementDateFrom);
		LOG.debug("settlementDateTo:" + settlementDateTo);
		LOG.debug("expectedSettlementDateFrom:" + expectedSettlementDateFrom);
		LOG.debug("expectedSettlementDateTo:" + expectedSettlementDateTo);

		BigDecimal invoiceAmountF = new BigDecimal(invoiceAmountFrom);
		BigDecimal invoiceAmountT = new BigDecimal(invoiceAmountTo);

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null;
		 * 
		 * if (status != null) { String[] statuses = status.split(","); for (int
		 * i = 0; i <= statuses.length - 1; i++) { statusList.add(statuses[i]);
		 * } }
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_09");
		statusList.add("IAS_06");
		statusList.add("IAS_12");
		statusList.add("IAS_13");

		/*
		 * if (null == status || "".equals(status)) {
		 * statusList.add("Release invoice"); } else { String[] statuses =
		 * status.split(","); for (int i = 0; i <= statuses.length - 1; i++) {
		 * statusList.add(statuses[i]); } }
		 */

		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.AfterAuction);
		 */

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}
		Page<Auction> auctions = null;
		if (statusList != null && statusList.size() > 0) {
			auctions = auctionService
					.getAuctionsByStatusAndInterestAndBmybidfinalclosedauction(
							statusList, interestF, interestT, invoiceAmountF,
							invoiceAmountT, settlementDateFrom,
							settlementDateTo, expectedSettlementDateFrom,
							expectedSettlementDateTo, pageNumber, pageSize);
			model.addAttribute("page", auctions);
		}
		model.addAttribute("page", auctions);

		/* model.addAttribute("stateChecks", stateCheckedList); */

		return "buyer/mybids/b_mybid_final_closed_auction";
	}

	/**
	 * b_history_dealed_auction.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/12
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/dealed/biddhistory/{id}", method = RequestMethod.GET)
	public String inAuctionBiddhistory(@PathVariable Long id, Model model) {

		LOG.debug("inAuctionBiddhistory: metod=>inAuctionBiddhistory(" + id
				+ ")");

		model.addAttribute("invoice", invoiceService.findOne(id));
		return "/buyer/bidhistory/b_history_dealed_auction";

	}

	/**
	 * b_history_mybid_dealed_auction.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/11
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/mybiddealed/biddhistory/{id}", method = RequestMethod.GET)
	public String mybiddealed(@PathVariable Long id, Model model) {

		LOG.debug("mybiddealed: metod=>mybiddealed(" + id + ")");
		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		return "/buyer/bidhistory/b_history_mybid_dealed_auction";

	}

	/**
	 * b_history_delisted_both.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/11
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/delistedboth/biddhistory/{id}", method = RequestMethod.GET)
	public String delistedBoth(@PathVariable Long id, Model model) {

		LOG.debug("delistedBoth: metod=>delistedBoth(" + id + ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_delisted_both";
	}

	/**
	 * b_history_delisted_expried.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/11
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/delistedexpried/biddhistory/{id}", method = RequestMethod.GET)
	public String delistedExpried(@PathVariable Long id, Model model) {

		LOG.debug("delistedExpried: metod=>delistedExpried(" + id + ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_delisted_expried";
	}

	/**
	 * b_history_delisted_undisbursed.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/11
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/delistedundisbursed/biddhistory/{id}", method = RequestMethod.GET)
	public String delistedUndisbursed(@PathVariable Long id, Model model) {

		LOG.debug("delistedUndisbursed: metod=>delistedUndisbursed(" + id + ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_delisted_undisbursed";
	}

	/**
	 * b_history_disbursed_auction.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/11
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/disbursed/biddhistory/{id}", method = RequestMethod.GET)
	public String disbursed(@PathVariable Long id, Model model) {

		LOG.debug("disbursed: metod=>disbursed(" + id + ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_disbursed_auction";
	}

	/**
	 * b_history_final_closed.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/12
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/finalclosed/biddhistory/{id}", method = RequestMethod.GET)
	public String finalClosed(@PathVariable Long id, Model model) {

		LOG.debug("finalClosed: metod=>finalClosed(" + id + ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_final_closed";
	}

	/**
	 * b_history_fully_settled.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/12
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/fullysettled/biddhistory/{id}", method = RequestMethod.GET)
	public String fullySettled(@PathVariable Long id, Model model) {

		LOG.debug("fullySettled: metod=>fullySettled(" + id + ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_fully_settled";
	}

	/**
	 * b_history_partical_settled.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/12
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/particalsettled/biddhistory/{id}", method = RequestMethod.GET)
	public String particalSettled_(@PathVariable Long id, Model model) {

		LOG.debug("particalSettled_: metod=>particalSettled_(" + id + ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_partical_settled";
	}

	/**
	 * b_history_overdue.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/12
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/overdue/biddhistory/{id}", method = RequestMethod.GET)
	public String overDue(@PathVariable Long id, Model model) {

		LOG.debug("overDue: metod=>overDue(" + id + ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_overdue";
	}

	/**
	 * b_history_make_offer.jsp 页面根据ID显示值的方法
	 * 
	 * update xuliufang 2015-2-3
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/makeoffer/biddhistory/{id}", method = RequestMethod.GET)
	public String offerhistory(@PathVariable Long id, Model model) {

		LOG.debug("offerhistory: metod=>offerhistory(" + id + ")");

		model.addAttribute("invoice", invoiceService.findOne(id));
		return "/buyer/bidhistory/b_history_make_offer";

	}

	/**
	 * b_history_make_new_offer.jsp 页面根据ID显示值的方法
	 * 
	 * update xuliufang 2015-2-3
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/newoffer/biddhistory/{id}", method = RequestMethod.GET)
	public String newOfferhistory(@PathVariable Long id, Model model) {

		LOG.debug("newOfferhistory: metod=>newOfferhistory(" + id + ")");

		model.addAttribute("invoice", invoiceService.findOne(id));
		return "/buyer/bidhistory/b_history_make_new_offer";

	}

	/**
	 * b_history_unsuccessful_aution.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/12
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/unsuccessful/biddhistory/{id}", method = RequestMethod.GET)
	public String unsuccessfulBidHistory(@PathVariable Long id, Model model) {

		LOG.debug("unsuccessfulBidHistory: metod=>unsuccessfulBidHistory(" + id
				+ ")");

		model.addAttribute("auction", auctionService.findOne(id));
		return "/buyer/bidhistory/b_history_unsuccessful_aution";
	}

	private List<InvoiceStateCheck> getCheckedInvoiceStateList(
			List<String> checkStateList, InvoicePageState invoicePageState) {
		List<InvoiceStateCheck> stateChecks = new ArrayList<InvoiceStateCheck>();
		for (InvoiceState state : InvoiceState.values()) {
			if (state.getPageState() == invoicePageState) {
				InvoiceStateCheck stateCheck = new InvoiceStateCheck(state,
						false);
				for (String checkedState : checkStateList) {
					if (state.getName().equals(checkedState)) {
						stateCheck.setIsChecked(true);
					}
				}
				stateChecks.add(stateCheck);
			}
		}
		return stateChecks;
	}
}
