package com.entrofine.ifactor.app.controller;

import java.io.Serializable;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.ddshell.framework.app.entity.User;
import com.entrofine.ifactor.api.service.InvoiceAuctionService;
import com.entrofine.ifactor.app.entity.AjaxOperResponse;
import com.entrofine.ifactor.app.entity.Auction;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.InvoiceDoc;
import com.entrofine.ifactor.app.entity.InvoicePageState;
import com.entrofine.ifactor.app.entity.InvoiceState;
import com.entrofine.ifactor.app.entity.InvoiceStateCheck;
import com.entrofine.ifactor.app.entity.SellerApply;
import com.entrofine.ifactor.app.service.AccountService;
import com.entrofine.ifactor.app.service.AuctionService;
import com.entrofine.ifactor.app.service.DataModifyRecordService;
import com.entrofine.ifactor.app.service.InvoiceDocService;
import com.entrofine.ifactor.app.service.InvoiceService;
import com.entrofine.ifactor.app.service.workflow.InvoiceFlowStatus;

@Controller
public class InvoiceController {
	private static final Logger LOG = LoggerFactory
			.getLogger(InvoiceController.class);

	@Autowired
	private AccountService accountService;
	@Autowired
	private InvoiceService invoiceService;
	@Autowired
	private InvoiceDocService invoiceDocService;
	@Autowired
	private AuctionService auctionService;
	@Autowired
	DataModifyRecordService dataModifyRecordService;
	@Autowired
	InvoiceAuctionService invoiceAuctionService;

	@RequestMapping(value = "/seller/acceptauction", method = RequestMethod.POST)
	@ResponseBody
	public Serializable save(
			@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("auction") Auction auction,
			@RequestParam(value = "invoiceId", defaultValue = "0") Long invoiceId,
			Model model) {
		AjaxOperResponse response = null;
		try {
			if (isCommit) {
				invoiceService.updateStatus(invoiceId);
			} else {
				auctionService.submitBid(auction, invoiceId);
			}
			model.addAttribute("roleId", "success!");
			// return "{isSucceed:true,message:'Operation successful'}";
			response = new AjaxOperResponse(true, "Auction success!");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			// return "{isSucceed:false,message:'" + e.getMessage() + "'}";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/buyer/openauction/openDetail/{offerType}/{id}", method = RequestMethod.GET)
	public String openAuctionDetail(@PathVariable String offerType,
			@PathVariable Long id, Model model) {

		LOG.debug("metod=>openAuctionDetail");

		Invoice invoice = invoiceService.findOne(id); // 　添加为模型数据
		Map<String, String> map = auctionService.getAuctionBidsInfo(id);
		model.addAttribute("invoice", invoice);
		model.addAttribute("bids", map.get("bids"));
		if (offerType.equals("makeNewOffer")) {
			model.addAttribute("advance", map.get("advance"));
			model.addAttribute("interest", map.get("interest"));
			return "buyer/auction/b_make_new_offer";
		} else {
			return "buyer/auction/b_make_offer";
		}

	}

	/**
	 * update by xuliufang 2014-12-26
	 * 
	 * @param isCommit
	 * @param invoice
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/seller/invoice/resume", method = RequestMethod.POST)
	public Serializable resumeInvoice(
			@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("invoice") Invoice invoice, Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {
			if (isCommit) {
				invoice.setRating(3);
				invoiceService.updateSubmitApply(invoice);
				message = "invoice.submit.message.successSubmitted";

			} else {
				invoice.setRating(3);
				invoiceService.saveApply(invoice);
				message = "invoice.submit.message.successSaved";
			}
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			// model.addAttribute("message", "Operation failed");
			message = "buyer.apply.message.failed";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	/**
	 * update by xuliufang 2014-12-26
	 * 
	 * @param isCommit
	 * @param invoice
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/seller/invoice/update", method = RequestMethod.POST)
	public Serializable updateSubmit(
			@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("invoice") Invoice invoice, Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {
			if (isCommit) {
				invoice.setRating(3);
				invoiceService.updateSubmitApply(invoice);
				message = "invoice.submit.message.successSubmitted";

			} else {
				invoice.setRating(3);
				invoiceService.saveApply(invoice);
				message = "invoice.submit.message.successSaved";
			}
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			// model.addAttribute("message", "Operation failed");
			message = "buyer.apply.message.failed";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	/**
	 * update by luoxunda 2015/03/24
	 * 
	 * @param isCommit
	 * @param invoice
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/seller/invoice/apply", method = RequestMethod.POST)
	public Serializable submit(@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("invoice") Invoice invoice, Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {

			if (invoiceService.isfinStickerId(invoice)) {
				model.addAttribute("succeed", Boolean.FALSE);
				message = "seller.invoice.upload.message.finStickerId";
			} else {
				if (isCommit) {
					invoice.setRating(3);
					invoiceService.submitApply(invoice);
					message = "invoice.submit.message.successSubmitted";

				} else {
					invoice.setRating(3);
					invoiceService.saveApply(invoice);
					message = "invoice.submit.message.successSaved";
				}
			}
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			// model.addAttribute("message", "Operation failed");
			message = "buyer.apply.message.failed";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	/**
	 * 根据传入参数进行查询 add by liulongxiang 2014-7-11
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @return
	 */
	@RequestMapping(value = { "/buyer/auction/openforbpbank",
			"/buyer/auction/openListForVpbank" })
	public String openListForVpbank(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "interestFrom", defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {

		LOG.debug("InvoiceController: method=>openList()");

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

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

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService.getInvoicesByStatusAndInterest(
					statusList, interestF, interestT, pageNumber, pageSize);

		}

		model.addAttribute("page", invoices);

		return "buyer/auction/openlistForBank";
	}

	/**
	 * 根据传入参数进行查询 add by liulongxiang 2014-7-11
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @return
	 */
	@RequestMapping(value = { "/buyer/auction/closed",
			"/buyer/auction/closedList" })
	public String closedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "interestFrom", defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {

		LOG.debug("InvoiceController: method=>closedList()");

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		List<String> statusList = new ArrayList<String>();
		List<InvoiceStateCheck> stateCheckedList = null;
		if (status != null) {
			String[] statuses = status.split(",");
			for (int i = 0; i <= statuses.length - 1; i++) {
				statusList.add(statuses[i]);
			}
		}
		stateCheckedList = getCheckedInvoiceStateList(statusList,
				InvoicePageState.AfterAuction);

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService.getInvoicesByStatusAndInterest(
					statusList, interestF, interestT, pageNumber, pageSize);
			model.addAttribute("page", invoices);
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("stateChecks", stateCheckedList);

		return "buyer/auction/closedlist";
	}

	@RequestMapping(value = "/buyer/closedauction/closedAuctionDetail/{id}", method = RequestMethod.GET)
	public String closedAuctionDetail(@PathVariable Long id, Model model) {
		LOG.debug("metod=>closedAuctionDetail");

		Invoice invoice = invoiceService.findOne(id); // 　添加为模型数据

		model.addAttribute("invoice", invoice);
		return "buyer/auction/closeddetail";
	}

	@RequestMapping(value = { "seller/my-invoices", "seller/my-invoices/list" }, method = RequestMethod.GET)
	public String list(Model model) {
		LOG.debug("method=>list");

		List<Invoice> invoices = invoiceService.findAll();

		// 添加为模型属性
		model.addAttribute("invoices", invoices);

		return "seller/my-invoices/list";
	}

	@RequestMapping(value = "/seller/invoice/under-approval/detail/{id}", method = RequestMethod.GET)
	public String underApprovalDetail(@PathVariable Long id, Model model) {
		LOG.debug("metod=>detail");
		Invoice invoice = invoiceService.findOne(id);
		User loginUser = accountService.getLoginUser();
		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("user", loginUser);
		if (sellerApply != null) {
			model.addAttribute("sellerCompanyName",
					sellerApply.getCompanyName());
			model.addAttribute("limitMin", sellerApply.getLimitMin());
			model.addAttribute("limitMax", sellerApply.getLimitMax());
			model.addAttribute("limitBalance", sellerApply.getLimitBalance());
		}

		model.addAttribute("page_state", "under-approval");
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());

		return "/seller/my-invoices/under-approval-detail";
	}

	/**
	 * under-approval-list.jsp页面的查询条件方法
	 * 
	 * update by xuliufang 2015-1-29
	 * 
	 * @param status
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/invoice/under-approval",
			"/seller/invoice/under-approval/list" })
	public String underApprovalList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("InvoiceController: method=>underApprovalList()");

		List<String> statusList = new ArrayList<String>();
		List<InvoiceStateCheck> stateCheckedList = null;

		if (status != null) {
			String[] statuses = status.split(",");
			for (int i = 0; i <= statuses.length - 1; i++) {
				statusList.add(statuses[i]);
			}
		} else {
			statusList.add("szIeAMROkl");
			statusList.add("szIeAMROkl_mVolpvvEFY");
			statusList.add("mVolpvvEFY_RyXlLYLUHF");
			statusList.add("mVolpvvEFY_RyXlLYLUHF_0");
			statusList.add("mVolpvvEFY_RyXlLYLUHF_1");
			statusList.add("mVolpvvEFY_bquDuCwisW");
			statusList.add("bquDuCwisW_dSHAvdyhfW");
			statusList.add("bquDuCwisW_ibvYshlyGv");
			statusList.add("ibvYshlyGv_vBdcCEIXvk");
			statusList.add("ibvYshlyGv_mVolpvvEFY");
			statusList.add("RyXlLYLUHF_mVolpvvEFY");
			statusList.add("RyXlLYLUHF_ibvYshlyGv");
			statusList.add("vBdcCEIXvk_dSHAvdyhfW");
			statusList.add("vBdcCEIXvk_YCcCAeFtUg");
			statusList.add("YCcCAeFtUg_dSHAvdyhfW");
			statusList.add("YCcCAeFtUg_xhLGTcqzFh");
			statusList.add("xhLGTcqzFh_dSHAvdyhfW_0");
			statusList.add("RyXlLYLUHF_dSHAvdyhfW");

		}

		stateCheckedList = getCheckedInvoiceStateList(statusList,
				InvoicePageState.UnderApproval);

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService.getInvoicesByStatus(statusList,
					pageNumber, pageSize);
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("form_title", "Invoices under Approval");
		model.addAttribute("page_state", "under-approval");
		model.addAttribute("stateChecks", stateCheckedList);

		return "seller/my-invoices/under-approval-list";
	}

	@RequestMapping(value = "/seller/invoice/under-approval/update/{id}", method = RequestMethod.GET)
	public String underApprovalUpdate(@PathVariable Long id, Model model) {
		LOG.debug("metod=>detail");
		Invoice invoice = invoiceService.findOne(id);
		User loginUser = accountService.getLoginUser();

		List<String> modifyFields = dataModifyRecordService
				.findDataModifyFields("invoiceDeliveryFlow", invoice.getId()
						.toString());

		model.addAttribute("modifyFields", modifyFields);
		model.addAttribute("isModifyStatus",
				InvoiceFlowStatus.isModify(invoice.getFlowStatus()));

		model.addAttribute("user", loginUser);
		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		if (sellerApply != null) {
			model.addAttribute("debtorAckReq", sellerApply.getDebtorAckReq());
			model.addAttribute("sellerCompanyName",
					sellerApply.getCompanyName());
			model.addAttribute("limitMin", sellerApply.getLimitMin());
			model.addAttribute("limitMax", sellerApply.getLimitMax());
			model.addAttribute("limitBalance", sellerApply.getLimitBalance());
		}

		model.addAttribute("page_state", "under-approval");
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());

		return "/seller/my-invoices/s_modify_invoice";
	}

	@ResponseBody
	@RequestMapping(value = "/seller/invoice/under-approval/updateSave", method = RequestMethod.POST)
	public Serializable updateSave(@ModelAttribute("invoice") Invoice invoice,
			Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {
			invoice.setRating(3);
			invoiceService.submitApply(invoice);
			message = "invoice.submit.message.successSubmitted";
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			model.addAttribute("message", "Operation failed");
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/seller/invoice/update/{id}", method = RequestMethod.GET)
	public String invoiceUpdate(@PathVariable Long id, Model model) {
		LOG.debug("metod=>invoiceUpdate");
		Invoice invoice = invoiceService.findOne(id);
		User loginUser = accountService.getLoginUser();

		List<String> modifyFields = dataModifyRecordService
				.findDataModifyFields("invoiceDeliveryFlow", invoice.getId()
						.toString());
		model.addAttribute("modifyFields", modifyFields);
		model.addAttribute("isModifyStatus",
				InvoiceFlowStatus.isModify(invoice.getFlowStatus()));
		model.addAttribute("user", loginUser);
		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		if (sellerApply != null) {
			model.addAttribute("debtorAckReq", sellerApply.getDebtorAckReq());
			model.addAttribute("sellerCompanyName",
					sellerApply.getCompanyName());
		}

		model.addAttribute("page_state", "under-approval");
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());

		return "/seller/my-invoices/invoice-update";
	}

	@RequestMapping(value = "/seller/invoice/under-approval/confirm/{id}", method = RequestMethod.GET)
	public String underApprovalConfirm(@PathVariable Long id, Model model) {
		LOG.debug("metod=>confirm");
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);
		return "/seller/my-invoices/under-approval-confirm";
	}

	@RequestMapping(value = "/seller/invoice/confirmSave/{id}", method = RequestMethod.POST)
	public String confirmSave(@PathVariable Long id, Model model) {
		LOG.debug("metod=>confirmSave");
		try {
			Invoice invoice = invoiceService.findOne(id);
			invoice.setFlowStatus("After auction");
			invoiceService.save(invoice);
			model.addAttribute("message", "success!");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			model.addAttribute("message", "success!");
		}
		return "buyer/auction/message";
	}

	@RequestMapping(value = "/seller/invoice/in-auction/detail/{id}", method = RequestMethod.GET)
	public String inAuctionDetail(@PathVariable Long id, Model model) {
		LOG.debug("metod=>detail");
		Invoice invoice = invoiceService.findOne(id);
		User loginUser = accountService.getLoginUser();
		model.addAttribute("user", loginUser);
		model.addAttribute("sellerCompanyName",
				invoiceService.getSellerApplyInfo());
		model.addAttribute("page_state", "in-auction");
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/my-invoices/in-auction-detail";
	}

	@RequestMapping(value = { "/seller/invoice/after-auction",
			"/seller/invoice/after-auction/list" })
	public String afterAuctionList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "interestFrom", defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("InvoiceController: method=>afterAuctionList()");

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		List<String> statusList = new ArrayList<String>();
		List<InvoiceStateCheck> stateCheckedList = null;
		if (status != null) {
			String[] statuses = status.split(",");
			for (int i = 0; i <= statuses.length - 1; i++) {
				statusList.add(statuses[i]);
			}
		}
		stateCheckedList = getCheckedInvoiceStateList(statusList,
				InvoicePageState.AfterAuction);

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService.getInvoicesByStatusAndInterest(
					statusList, interestF, interestT, pageNumber, pageSize);
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("form_title", "Invoices after Auction");
		model.addAttribute("page_state", "after-auction");
		model.addAttribute("stateChecks", stateCheckedList);
		// model.addAttribute("invoices", invoices);
		return "seller/my-invoices/after-auction-list";
	}

	@RequestMapping(value = "/seller/invoice/after-auction/detail/{id}", method = RequestMethod.GET)
	public String afterAuctionDetail(@PathVariable Long id, Model model) {
		LOG.debug("metod=>detail");
		Invoice invoice = invoiceService.findOne(id);
		User loginUser = accountService.getLoginUser();
		model.addAttribute("user", loginUser);
		model.addAttribute("sellerCompanyName",
				invoiceService.getSellerApplyInfo());
		model.addAttribute("page_state", "after-auction");
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/my-invoices/after-auction-detail";
	}

	@RequestMapping(value = "/seller/invoice/apply", method = RequestMethod.GET)
	public String submit(Model model) {
		User loginUser = accountService.getLoginUser();
		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("user", loginUser);
		if (sellerApply != null) {
			model.addAttribute("debtorAckReq", sellerApply.getDebtorAckReq());
			model.addAttribute("sellerCompanyName",
					sellerApply.getCompanyName());
			model.addAttribute("limitMin", sellerApply.getLimitMin());
			model.addAttribute("limitMax", sellerApply.getLimitMax());
			model.addAttribute("limitBalance", sellerApply.getLimitBalance());
		}

		return "/seller/my-invoices/s_new_invoice_upload";
	}

	/**
	 * s_history_invoice_in_auction.jsp
	 * 
	 * add by xuliufang 2015-01-30
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/inauction/biddhistory/{id}", method = RequestMethod.GET)
	public String inAuctionBiddhistory(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		return "/seller/bidhistory/s_history_invoice_in_auction";

	}

	/**
	 * s_myinvoice_detail_in_auction.jsp页面
	 * 
	 * update by xuliufang 2015-01-30
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/inauction/detail/{id}", method = RequestMethod.GET)
	public String inAuctionDetail2(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();

		if (sellerApply != null) {
			model.addAttribute("lastName", sellerApply.getLastName());
			model.addAttribute("firstName", sellerApply.getFirstName());
			model.addAttribute("debtorAckReq", sellerApply.getDebtorAckReq());
		}

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */

		return "/seller/detail/s_myinvoice_detail_in_auction";

	}

	/**
	 * update by xuliufang 2015-01-30
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/openauction/openDetail/acceptAnOffer/{id}", method = RequestMethod.GET)
	public String acceptAnOffer(@PathVariable Long id, Model model) {

		LOG.debug("metod=>openAuctionDetail2");

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();

		Invoice invoice = invoiceService.findOne(id); // 　添加为模型数据
		Map<String, String> map = auctionService.getAuctionBidsInfo(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);
		model.addAttribute("bids", map.get("bids"));

		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		if (sellerApply != null) {
			model.addAttribute("debtorAckReq", sellerApply.getDebtorAckReq());
		}
		return "seller/market-invoices/s_accept_an_offer";

	}

	/**
	 * update by xuliufang 2015-01-30
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/openauction/openDetail/rejectAnOffer/{id}", method = RequestMethod.GET)
	public String rejectAnOffer(@PathVariable Long id, Model model) {

		LOG.debug("metod=>openAuctionDetail2");

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();

		Invoice invoice = invoiceService.findOne(id); // 　添加为模型数据
		Map<String, String> map = auctionService.getAuctionBidsInfo(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);
		model.addAttribute("bids", map.get("bids"));

		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		if (sellerApply != null) {
			model.addAttribute("debtorAckReq", sellerApply.getDebtorAckReq());
		}
		return "seller/market-invoices/s_reject_an_offer";

	}

	/*
	 * @RequestMapping(value = "/seller/invoice/upload", method =
	 * RequestMethod.GET) public String invoiceUpload(
	 * 
	 * @RequestParam(value = "savedDateFrom", defaultValue = "1001-01-01")
	 * String savedDateFrom,
	 * 
	 * @RequestParam(value = "savedDateTo", defaultValue = "3999-01-01") String
	 * savedDateTo,
	 * 
	 * @RequestParam(value = "debtorName", required = false) String debtorName,
	 * 
	 * @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
	 * 
	 * @RequestParam(value = "pageSize", required = false) Integer pageSize,
	 * Model model) { LOG.debug("InvoiceController: method=>invoiceUpload()");
	 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
	 * pageSize = 15; } User loginUser = accountService.getLoginUser();
	 * model.addAttribute("user", loginUser);
	 * 
	 * Page<Invoice> invoices = invoiceService
	 * .findByFlowStatusAndCreateTimeBetweenAndDebtorNameAndSellerId(
	 * savedDateFrom, savedDateTo, debtorName, pageNumber, pageSize);
	 * 
	 * model.addAttribute("page", invoices);
	 * 
	 * // 添加为模型属性 model.addAttribute("form_title", "Invoices Update");
	 * model.addAttribute("page_state", "update-invoice");
	 * 
	 * return "/seller/my-invoices/s_invoice_upload"; }
	 */

	/*
	 * @RequestMapping(value = "/seller/invoice/upload", method =
	 * RequestMethod.GET) public String invoiceUpload(Model model) { User
	 * loginUser = accountService.getLoginUser(); model.addAttribute("user",
	 * loginUser);
	 * 
	 * return "/seller/my-invoices/s_invoice_upload"; }
	 */

	@RequestMapping(value = "/seller/invoice/resume/{id}", method = RequestMethod.GET)
	public String invoiceResume(@PathVariable Long id, Model model) {
		LOG.debug("metod=>invoiceResume");
		Invoice invoice = invoiceService.findOne(id);
		User loginUser = accountService.getLoginUser();

		model.addAttribute("user", loginUser);
		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		if (sellerApply != null) {
			model.addAttribute("debtorAckReq", sellerApply.getDebtorAckReq());
			model.addAttribute("sellerCompanyName",
					sellerApply.getCompanyName());
			model.addAttribute("limitMin", sellerApply.getLimitMin());
			model.addAttribute("limitMax", sellerApply.getLimitMax());
			model.addAttribute("limitBalance", sellerApply.getLimitBalance());
		}

		model.addAttribute("page_state", "under-approval");
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());

		return "/seller/my-invoices/s_resume_invoice_upload";
	}

	/**
	 * s_history_dealed_invoice.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2015/01/26
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/dealed/biddhistory/{id}", method = RequestMethod.GET)
	public String dealedBiddhistory(@PathVariable Long id, Model model) {

		LOG.debug("dealedBiddhistory: metod=>dealedBiddhistory(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);
		User loginUser = accountService.getLoginUser();

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		model.addAttribute("user", loginUser);
		model.addAttribute("sellerCompanyName",
				invoiceService.getSellerApplyInfo());
		return "/seller/bidhistory/s_history_dealed_invoice";
	}

	/**
	 * 根据sellerid查询invoice修改列表
	 * 
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */

	@RequestMapping(value = { "/seller/invoice/updatelist",
			"/seller/invoice/update-apply-list" })
	public String updateList(
			@RequestParam(value = "interestFrom", defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {

		LOG.debug("InvoiceController: method=>updateList()");

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = invoiceService.getInvoiceList(interestF,
				interestT, pageNumber, pageSize);

		if (invoices == null) {
			model.addAttribute("message",
					"Cannot find any invoice for this user");
			return "seller/my-invoices/message";
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("form_title", "Invoices Update");
		model.addAttribute("page_state", "update-invoice");

		return "/seller/my-invoices/invoice-update-list";

	}

	@RequestMapping(value = "/seller/auction/apply/detail/{id}", method = RequestMethod.GET)
	public String marketInvoiceDetail(@PathVariable Long id, Model model) {
		LOG.debug("InvoiceController: metod=>marketInvoiceDetail(" + id + ")");
		Invoice invoice = invoiceService.findOne(id);
		User loginUser = accountService.getLoginUser();
		model.addAttribute("user", loginUser);
		model.addAttribute("sellerCompanyName",
				invoiceService.getSellerApplyInfo());
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/market-invoices/market-detail";
	}

	@RequestMapping(value = "/seller/invoice/inauction/biddhistory", method = RequestMethod.GET)
	public String inAuctionBiddhistory(Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		User loginUser = accountService.getLoginUser();
		model.addAttribute("user", loginUser);
		model.addAttribute("sellerCompanyName",
				invoiceService.getSellerApplyInfo());
		return "/seller/bidhistory/s_history_invoice_in_auction";

	}

	@ModelAttribute
	public void getInvoice(
			@RequestParam(value = "id", defaultValue = "-1") Long id,
			Model model) {
		if (id > 0) {
			Invoice apply = invoiceService.findOne(id);
			apply.setAutions(new ArrayList<Auction>());
			apply.setDocuments(new ArrayList<InvoiceDoc>());

			model.addAttribute("invoice", apply);
		}
	}

	/*	*//**
	 * s_myinvoice_in_auction.jsp页面的查询条件方法
	 * 
	 * update by xuliufang 2014-12-03
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	/*
	 * @RequestMapping(value = { "/seller/invoice/in-auction",
	 * "/seller/invoice/in-auction/list" }) public String inAuctionList(
	 * 
	 * @RequestParam(value = "status", required = false) String status,
	 * 
	 * @RequestParam(value = "finInvAmountFrom", defaultValue = "0") String
	 * finInvAmountFrom,
	 * 
	 * @RequestParam(value = "finInvAmountTo", defaultValue = "100000000000")
	 * String finInvAmountTo,
	 * 
	 * @RequestParam(value = "readyToSellAdvFrom", defaultValue = "0") String
	 * readyToSellAdvFrom,
	 * 
	 * @RequestParam(value = "readyToSellAdvTo", defaultValue = "100") String
	 * readyToSellAdvTo,
	 * 
	 * @RequestParam(value = "readyToSellIntFrom", defaultValue = "0") String
	 * readyToSellIntFrom,
	 * 
	 * @RequestParam(value = "readyToSellIntTo", defaultValue = "100") String
	 * readyToSellIntTo,
	 * 
	 * @RequestParam(value = "curBestOffrAdvFrom", defaultValue = "0") String
	 * curBestOffrAdvFrom,
	 * 
	 * @RequestParam(value = "curBestOffrAdvTo", defaultValue = "100") String
	 * curBestOffrAdvTo,
	 * 
	 * @RequestParam(value = "curBestOffrIntFrom", defaultValue = "0") String
	 * curBestOffrIntFrom,
	 * 
	 * @RequestParam(value = "curBestOffrIntTo", defaultValue = "100") String
	 * curBestOffrIntTo,
	 * 
	 * @RequestParam(value = "releaseDateFrom", defaultValue = "1001-01-01")
	 * String releaseDateFrom,
	 * 
	 * @RequestParam(value = "releaseDateTo", defaultValue = "3999-01-01")
	 * String releaseDateTo,
	 * 
	 * @RequestParam(value = "delistingDateFrom", defaultValue = "1001-01-01")
	 * String delistingDateFrom,
	 * 
	 * @RequestParam(value = "delistingDateTo", defaultValue = "3999-01-01")
	 * String delistingDateTo,
	 * 
	 * @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
	 * 
	 * @RequestParam(value = "pageSize", required = false) Integer pageSize,
	 * Model model) { LOG.debug("InvoiceController: method=>inAuctionList()");
	 * LOG.debug("releaseDateFrom:" + releaseDateFrom);
	 * LOG.debug("releaseDateTo:" + releaseDateTo);
	 * LOG.debug("delistingDateFrom:" + delistingDateFrom);
	 * LOG.debug("delistingDateTo:" + delistingDateTo);
	 * 
	 * BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom); BigDecimal
	 * finInvAmountT = new BigDecimal(finInvAmountTo);
	 * 
	 * BigDecimal readyToSellAdvF = new BigDecimal(readyToSellAdvFrom);
	 * BigDecimal readyToSellAdvT = new BigDecimal(readyToSellAdvTo);
	 * 
	 * BigDecimal readyToSellIntF = new BigDecimal(readyToSellIntFrom);
	 * BigDecimal readyToSellIntT = new BigDecimal(readyToSellIntTo);
	 * 
	 * 
	 * Double curBestOffrAdvF = Double.parseDouble(curBestOffrAdvFrom); Double
	 * curBestOffrAdvT = Double.parseDouble(curBestOffrAdvTo);
	 * 
	 * 
	 * Double curBestOffrIntF = Double.parseDouble(curBestOffrIntFrom); Double
	 * curBestOffrIntT = Double.parseDouble(curBestOffrIntTo);
	 * 
	 * List<String> statusList = new ArrayList<String>();
	 * List<InvoiceStateCheck> stateCheckedList = null;
	 * statusList.add("IAS_01"); statusList.add("IAS_02");
	 * statusList.add("IAS_03"); statusList.add("xhLGTcqzFh_dSHAvdyhfW");
	 * 
	 * stateCheckedList = getCheckedInvoiceStateList(statusList,
	 * InvoicePageState.InAuction);
	 * 
	 * 
	 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
	 * pageSize = 15; }
	 * 
	 * Page<Invoice> invoices = null; if (statusList != null &&
	 * statusList.size() > 0) { invoices = invoiceService .
	 * getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrInt
	 * ( statusList, finInvAmountF, finInvAmountT, readyToSellAdvF,
	 * readyToSellAdvT, readyToSellIntF, readyToSellIntT, pageNumber, pageSize);
	 * }
	 * 
	 * model.addAttribute("page", invoices);
	 * 
	 * // 添加为模型属性 model.addAttribute("form_title", "Invoices in Auction");
	 * model.addAttribute("page_state", "in-auction");
	 * model.addAttribute("stateChecks", stateCheckedList);
	 * 
	 * return "seller/my-invoices/s_myinvoice_in_auction"; }
	 */

	/**
	 * s_myinvoice_detail_modification_request.jsp页面
	 * 
	 * update by xuliufang 2015-2-2
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/modification/detail/{id}", method = RequestMethod.GET)
	public String modificationDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_modification_request";
	}

	/**
	 * s_myinvoice_detail_dealed.jsp页面
	 * 
	 * update by xuliufang 2015-2-2
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/dealed/detail/{id}", method = RequestMethod.GET)
	public String dealedDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		Map<String, String> map = auctionService.getAuctionBidsInfo(id);
		model.addAttribute("bids", map.get("bids"));
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());
		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_dealed";
	}

	/*
	 * market-list.jsp 页面的查询条件方法
	 * 
	 * update by xuliufang 2014-12-02
	 * 
	 * @param status
	 * 
	 * @param finInvAmountFrom
	 * 
	 * @param finInvAmountTo
	 * 
	 * @param interestFrom
	 * 
	 * @param interestTo
	 * 
	 * @param pageNumber
	 * 
	 * @param pageSize
	 * 
	 * @param model
	 * 
	 * @return
	 */
	/*
	 * @RequestMapping(value = { "/seller/auction/apply",
	 * "/seller/auction/apply/list" }) public String marketInvoiceList(
	 * 
	 * @RequestParam(value = "status", required = false) String status,
	 * 
	 * @RequestParam(value = "finInvAmountFrom", defaultValue = "0") String
	 * finInvAmountFrom,
	 * 
	 * @RequestParam(value = "finInvAmountTo", defaultValue = "100000000000")
	 * String finInvAmountTo,
	 * 
	 * @RequestParam(value = "readyToSellAdvFrom", defaultValue = "0") String
	 * readyToSellAdvFrom,
	 * 
	 * @RequestParam(value = "readyToSellAdvTo", defaultValue = "100") String
	 * readyToSellAdvTo,
	 * 
	 * @RequestParam(value = "readyToSellIntFrom", defaultValue = "0") String
	 * readyToSellIntFrom,
	 * 
	 * @RequestParam(value = "readyToSellIntTo", defaultValue = "100") String
	 * readyToSellIntTo,
	 * 
	 * @RequestParam(value = "curBestOffrAdvFrom", defaultValue = "0") String
	 * curBestOffrAdvFrom,
	 * 
	 * @RequestParam(value = "curBestOffrAdvTo", defaultValue = "100") String
	 * curBestOffrAdvTo,
	 * 
	 * @RequestParam(value = "curBestOffrIntFrom", defaultValue = "0") String
	 * curBestOffrIntFrom,
	 * 
	 * @RequestParam(value = "curBestOffrIntTo", defaultValue = "100") String
	 * curBestOffrIntTo,
	 * 
	 * @RequestParam(value = "releaseDateFrom", defaultValue = "1000-01-01")
	 * String releaseDateFrom,
	 * 
	 * @RequestParam(value = "releaseDateTo", defaultValue = "2999-01-01")
	 * String releaseDateTo,
	 * 
	 * @RequestParam(value = "delistingDateFrom", defaultValue = "1000-01-01")
	 * String delistingDateFrom,
	 * 
	 * @RequestParam(value = "delistingDateTo", defaultValue = "2999-01-01")
	 * String delistingDateTo,
	 * 
	 * @RequestParam(value = "finRmngMatTermFrom", defaultValue = "25") Long
	 * finRmngMatTermFrom,
	 * 
	 * @RequestParam(value = "finRmngMatTermTo", defaultValue = "120") Long
	 * finRmngMatTermTo,
	 * 
	 * @RequestParam(value = "finObjOfInv", required = false) String
	 * finObjOfInv,
	 * 
	 * @RequestParam(value = "sellerId", required = false) Long sellerId,
	 * 
	 * @RequestParam(value = "debtorName", required = false) String debtorName,
	 * 
	 * @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
	 * 
	 * @RequestParam(value = "pageSize", required = false) Integer pageSize,
	 * Model model) {
	 * LOG.debug("InvoiceController: method=>marketInvoiceList()");
	 * LOG.debug("releaseDateFrom:" + releaseDateFrom);
	 * LOG.debug("releaseDateTo:" + releaseDateTo);
	 * LOG.debug("delistingDateFrom:" + delistingDateFrom);
	 * LOG.debug("delistingDateTo:" + delistingDateTo);
	 * 
	 * BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom); BigDecimal
	 * finInvAmountT = new BigDecimal(finInvAmountTo);
	 * 
	 * BigDecimal readyToSellAdvF = new BigDecimal(readyToSellAdvFrom);
	 * BigDecimal readyToSellAdvT = new BigDecimal(readyToSellAdvTo);
	 * 
	 * BigDecimal readyToSellIntF = new BigDecimal(readyToSellIntFrom);
	 * BigDecimal readyToSellIntT = new BigDecimal(readyToSellIntTo);
	 * 
	 * List<String> statusList = new ArrayList<String>();
	 * statusList.add("IAS_01"); statusList.add("IAS_02");
	 * statusList.add("IAS_03"); statusList.add("xhLGTcqzFh_dSHAvdyhfW");
	 * 
	 * 
	 * Double curBestOffrAdvF = Double.parseDouble(curBestOffrAdvFrom); Double
	 * curBestOffrAdvT = Double.parseDouble(curBestOffrAdvTo);
	 * 
	 * 
	 * Double curBestOffrIntF = Double.parseDouble(curBestOffrIntFrom); Double
	 * curBestOffrIntT = Double.parseDouble(curBestOffrIntTo);
	 * 
	 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
	 * pageSize = 15; }
	 * 
	 * Page<Invoice> invoices = invoiceService .
	 * getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrIntAndFinRmngMatTermAndFinObjOfInvAndSellerIdAndDebtorName
	 * ( statusList, finInvAmountF, finInvAmountT, readyToSellAdvF,
	 * readyToSellAdvT, readyToSellIntF, readyToSellIntT, finRmngMatTermFrom,
	 * finRmngMatTermTo, finObjOfInv, sellerId, debtorName, pageNumber,
	 * pageSize);
	 * 
	 * model.addAttribute("page", invoices);
	 * 
	 * return "seller/market-invoices/market-list"; }
	 */

	/**
	 * s_myinvoice_dealed.jsp页面的查询条件方法
	 * 
	 * update by xuliufang 2014-12-03
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */

	@RequestMapping(value = { "/seller/invoice/dealed",
			"/seller/invoice/dealed/list" })
	public String dealList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "finInvAmountFrom", defaultValue = "0") String finInvAmountFrom,
			@RequestParam(value = "finInvAmountTo", defaultValue = "100000000000") String finInvAmountTo,
			@RequestParam(value = "interestFrom", defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("InvoiceController: method=>dealList()");

		BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom);
		BigDecimal finInvAmountT = new BigDecimal(finInvAmountTo);

		/*
		 * BigDecimal interestF = new BigDecimal(interestFrom); BigDecimal
		 * interestT = new BigDecimal(interestTo);
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_05");

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService.getInvoicesByStatusAndfinInvAmount(
					statusList, finInvAmountF, finInvAmountT, pageNumber,
					pageSize);
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("form_title", "Invoices under Approval");
		model.addAttribute("page_state", "under-approval");

		return "seller/my-invoices/s_myinvoice_dealed";
	}

	/**
	 * s_myinvoice_in_disbursement.jsp 页面的条件查询方法
	 * 
	 * update luoxunda 2014/12/01
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
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping(value = { "/seller/invoice/disbursed",
			"/seller/invoice/disbursed/list" })
	public String disbursedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "invoiceAmountFrom", defaultValue = "0") String invoiceAmountFrom,
			@RequestParam(value = "invoiceAmountTo", defaultValue = "100000000000") String invoiceAmountTo,
			@RequestParam(value = "acceptedAdvanceFrom", defaultValue = "0") String acceptedAdvanceFrom,
			@RequestParam(value = "acceptedAdvanceTo", defaultValue = "100") String acceptedAdvanceTo,
			@RequestParam(value = "acceptedInterestFrom", defaultValue = "0") String acceptedInterestFrom,
			@RequestParam(value = "acceptedInterestTo", defaultValue = "100") String acceptedInterestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) throws ParseException {
		LOG.debug("InvoiceController: method=>disbursedList()");
		/*
		 * LOG.debug("disbursementDateFrom:" + disbursementDateFrom);
		 * LOG.debug("disbursementDateTo:" + disbursementDateTo);
		 * LOG.debug("expectedSettlementDateFrom:" +
		 * expectedSettlementDateFrom); LOG.debug("expectedSettlementDateTo:" +
		 * expectedSettlementDateTo);
		 */

		BigDecimal invoiceAmountF = new BigDecimal(invoiceAmountFrom);
		BigDecimal invoiceAmountT = new BigDecimal(invoiceAmountTo);
		BigDecimal acceptedAdvanceF = new BigDecimal(acceptedAdvanceFrom);
		BigDecimal acceptedAdvanceT = new BigDecimal(acceptedAdvanceTo);
		BigDecimal acceptedInterestF = new BigDecimal(acceptedInterestFrom);
		BigDecimal acceptedInterestT = new BigDecimal(acceptedInterestTo);
		// BigDecimal disbursementDateF = new BigDecimal(disbursementDateFrom);
		// BigDecimal disbursementDateT = new BigDecimal(disbursementDateTo);
		// BigDecimal expectedSettlementDateF = new BigDecimal(
		// expectedSettlementDateFrom);
		// BigDecimal expectedSettlementDateT = new BigDecimal(
		// expectedSettlementDateTo);

		/*
		 * BigDecimal interestF = new BigDecimal(interestFrom); BigDecimal
		 * interestT = new BigDecimal(interestTo);
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_07");
		statusList.add("IAS_08");

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService
					.getInvoicesByStatusAndInterestAndInvoiceAmount(statusList,
							invoiceAmountF, invoiceAmountT, acceptedAdvanceF,
							acceptedAdvanceT, acceptedInterestF,
							acceptedInterestT, pageNumber, pageSize);
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("form_title", "Invoices under Approval");
		model.addAttribute("page_state", "under-approval");

		return "seller/my-invoices/s_myinvoice_in_disbursement";
	}

	/**
	 * s_myinvoice_in_settlement.jsp 页面查询条件的方法
	 * 
	 * update luoxunda 2014/12/02
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/invoice/insettle",
			"/seller/invoice/insettle/list" })
	public String insettleList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "invoiceAmountFrom", defaultValue = "0") String invoiceAmountFrom,
			@RequestParam(value = "invoiceAmountTo", defaultValue = "100000000000") String invoiceAmountTo,
			@RequestParam(value = "noofoverduedaysFrom", defaultValue = "") String noofoverduedaysFrom,
			@RequestParam(value = "noofoverduedaysTo", defaultValue = "") String noofoverduedaysTo,
			@RequestParam(value = "settlementDateFrom", defaultValue = "") String settlementDateFrom,
			@RequestParam(value = "settlementDateTo", defaultValue = "") String settlementDateTo,
			@RequestParam(value = "expectedSettlementDateFrom", defaultValue = "") String expectedSettlementDateFrom,
			@RequestParam(value = "expectedSettlementDateTo", defaultValue = "") String expectedSettlementDateTo,
			@RequestParam(value = "fullySettled", defaultValue = "") String fullySettled,
			@RequestParam(value = "partiallySettled", defaultValue = "") String partiallySettled,
			@RequestParam(value = "overdue", defaultValue = "") String overdue,

			@RequestParam(value = "interestFrom", defaultValue = "0") String interestFrom,
			@RequestParam(value = "interestTo", defaultValue = "100") String interestTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("InvoiceController: method=>insettleList()");
		LOG.debug("settlementDateFrom:" + settlementDateFrom);
		LOG.debug("settlementDateTo:" + settlementDateTo);
		LOG.debug("expectedSettlementDateFrom:" + expectedSettlementDateFrom);
		LOG.debug("expectedSettlementDateTo:" + expectedSettlementDateTo);

		BigDecimal invoiceAmountF = new BigDecimal(invoiceAmountFrom);
		BigDecimal invoiceAmountT = new BigDecimal(invoiceAmountTo);
		// BigDecimal noofoverduedaysF = new BigDecimal(noofoverduedaysFrom);
		// BigDecimal noofoverduedaysT = new BigDecimal(noofoverduedaysTo);

		BigDecimal interestF = new BigDecimal(interestFrom);
		BigDecimal interestT = new BigDecimal(interestTo);

		List<String> statusList = new ArrayList<String>();
		List<InvoiceStateCheck> stateCheckedList = null;
		if (status != null) {
			String[] statuses = status.split(",");
			for (int i = 0; i <= statuses.length - 1; i++) {
				statusList.add(statuses[i]);
			}
		}

		stateCheckedList = getCheckedInvoiceStateList(statusList,
				InvoicePageState.UnderApproval);

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService
					.getInvoicesByStatusAndInterestAndMyinvoiceInSettlement(
							statusList, interestF, interestT, invoiceAmountF,
							invoiceAmountT, /*
											 * noofoverduedaysF,
											 * noofoverduedaysT,
											 */
							settlementDateFrom, settlementDateTo,
							expectedSettlementDateFrom,
							expectedSettlementDateTo, fullySettled,
							partiallySettled, overdue, pageNumber, pageSize);
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("form_title", "Invoices under Approval");
		model.addAttribute("page_state", "under-approval");
		model.addAttribute("stateChecks", stateCheckedList);

		return "seller/my-invoices/s_myinvoice_in_settlement";
	}

	/*	*//**
	 * s_myinvoice_delisted.jsp 页面的条件查询方法
	 * 
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	/*
	 * @RequestMapping(value = { "/seller/invoice/delisted",
	 * "/seller/invoice/delisted/list" }) public String delistedList(
	 * 
	 * @RequestParam(value = "status", required = false) String status,
	 * 
	 * @RequestParam(value = "finInvAmountFrom", defaultValue = "0") String
	 * finInvAmountFrom,
	 * 
	 * @RequestParam(value = "finInvAmountTo", defaultValue = "100000000000")
	 * String finInvAmountTo,
	 * 
	 * @RequestParam(value = "delistingDateFrom", defaultValue = "1000-01-01")
	 * String delistingDateFrom,
	 * 
	 * @RequestParam(value = "delistingDateTo", defaultValue = "2999-01-01")
	 * String delistingDateTo,
	 * 
	 * @RequestParam(value = "finObjOfInv", required = false) String
	 * finObjOfInv,
	 * 
	 * @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
	 * 
	 * @RequestParam(value = "pageSize", required = false) Integer pageSize,
	 * Model model) { LOG.debug("InvoiceController: method=>delistedList()");
	 * LOG.debug("delistingDateFrom:" + delistingDateFrom);
	 * LOG.debug("delistingDateTo:" + delistingDateTo);
	 * 
	 * BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom); BigDecimal
	 * finInvAmountT = new BigDecimal(finInvAmountTo);
	 * 
	 * List<String> statusList = new ArrayList<String>();
	 * statusList.add("IAS_06");
	 * 
	 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
	 * pageSize = 15; }
	 * 
	 * Page<Invoice> invoices = null; if (statusList != null &&
	 * statusList.size() > 0) { invoices = invoiceService
	 * .getInvoicesByStatusAndFinInvAmountAndFinObjOfInv( statusList,
	 * finInvAmountF, finInvAmountT, pageNumber, pageSize); }
	 * 
	 * model.addAttribute("page", invoices);
	 * 
	 * // 添加为模型属性 model.addAttribute("form_title", "Invoices under Approval");
	 * model.addAttribute("page_state", "under-approval"); return
	 * "seller/my-invoices/s_myinvoice_delisted"; }
	 */
	/**
	 * s_myinvoice_final_closed.jsp 页面条件的查询方法
	 * 
	 * update by xuliufang 2014-12-12
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/invoice/finalclosed",
			"/seller/invoice/finalclosed/list" })
	public String finalClosedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "finInvAmountFrom", defaultValue = "0") String finInvAmountFrom,
			@RequestParam(value = "finInvAmountTo", defaultValue = "100000000000") String finInvAmountTo,
			@RequestParam(value = "noofOverdueDaysFrom", defaultValue = "1000-01-01") String noofOverdueDaysFrom,
			@RequestParam(value = "noofOverdueDaysTo", defaultValue = "3999-01-01") String noofOverdueDaysTo,
			@RequestParam(value = "settlementDateFrom", defaultValue = "1000-01-01") String settlementDateFrom,
			@RequestParam(value = "settlementDateTo", defaultValue = "3999-01-01") String settlementDateTo,
			@RequestParam(value = "expectedSettlementDateFrom", defaultValue = "1000-01-01") String finExpPmtDateFrom,
			@RequestParam(value = "expectedSettlementDateTo", defaultValue = "3999-01-01") String finExpPmtDateTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("InvoiceController: method=>finalClosedList()");
		LOG.debug("settlementDateFrom:" + settlementDateFrom);
		LOG.debug("settlementDateTo:" + settlementDateTo);
		LOG.debug("expectedSettlementDateFrom:" + finExpPmtDateFrom);
		LOG.debug("expectedSettlementDateTo:" + finExpPmtDateTo);

		BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom);
		BigDecimal finInvAmountT = new BigDecimal(finInvAmountTo);

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_06");
		statusList.add("IAS_12");
		statusList.add("IAS_13");

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService.getInvoicesByStatusAndFinInvAmountAnd(
					statusList, finInvAmountF, finInvAmountT, pageNumber,
					pageSize);
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("form_title", "Invoices under Approval");
		model.addAttribute("page_state", "under-approval");

		return "seller/my-invoices/s_myinvoice_final_closed";
	}

	/**
	 * s_myinvoice_detail_delisted_both.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/delistedboth/detail/{id}", method = RequestMethod.GET)
	public String delistedBothDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_delisted_both";
	}

	/**
	 * s_myinvoice_detail_delisted_expired.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/delistedexpried/detail/{id}", method = RequestMethod.GET)
	public String delistedExpriedDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_delisted_expired";
	}

	/**
	 * s_myinvoice_detail_delisted_undisbursed.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/delistedundisbursed/detail/{id}", method = RequestMethod.GET)
	public String delistedUndisbursedDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_delisted_undisbursed";
	}

	/**
	 * s_myinvoice_detail_delisted_settled_both.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/settledboth/detail/{id}", method = RequestMethod.GET)
	public String settledbothDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());
		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_delisted_settled_both";
	}

	/**
	 * s_myinvoice_detail_delisted_settled_expired.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/settledexpried/detail/{id}", method = RequestMethod.GET)
	public String settledExpriedDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_delisted_settled_expired";
	}

	/**
	 * s_myinvoice_detail_delisted_settled_undisbursed.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/settledundisbursed/detail/{id}", method = RequestMethod.GET)
	public String settledUndisbursedDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_delisted_settled_undisbursed";
	}

	/**
	 * s_myinvoice_detail_final_closed.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/finalclosed/detail/{id}", method = RequestMethod.GET)
	public String finalClosedDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_final_closed";
	}

	/**
	 * s_myinvoice_detail_in_disbursement.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/indisbursement/detail/{id}", method = RequestMethod.GET)
	public String inDisbursementDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_in_disbursement";
	}

	/**
	 * s_history_delisted_both.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/delistedboth/biddhistory/{id}", method = RequestMethod.GET)
	public String delistedBoth(@PathVariable Long id, Model model) {

		LOG.debug("delistedBoth: metod=>delistedBoth(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_delisted_both";
	}

	/**
	 * s_history_delisted_expried.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/delistedexpried/biddhistory/{id}", method = RequestMethod.GET)
	public String delistedExpried(@PathVariable Long id, Model model) {

		LOG.debug("delistedExpried: metod=>delistedExpried(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_delisted_expried";
	}

	/**
	 * s_history_delisted_undisbursed.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/delistedundisbursed/biddhistory/{id}", method = RequestMethod.GET)
	public String delistedUndisbursed(@PathVariable Long id, Model model) {

		LOG.debug("delistedUndisbursed: metod=>delistedUndisbursed(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_delisted_undisbursed";
	}

	/**
	 * s_history_settled_delisted_both.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/settledboth/biddhistory/{id}", method = RequestMethod.GET)
	public String settledboth(@PathVariable Long id, Model model) {

		LOG.debug("settledboth: metod=>settledboth(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_settled_delisted_both";
	}

	/**
	 * s_history_settled_delisted_expried.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/settledexpried/biddhistory/{id}", method = RequestMethod.GET)
	public String settledExpried(@PathVariable Long id, Model model) {

		LOG.debug("settledExpried: metod=>settledExpried(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_settled_delisted_expried";
	}

	/**
	 * s_history_settled_delisted_undisbursed.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/settledundisbursed/biddhistory/{id}", method = RequestMethod.GET)
	public String settledUndisbursed(@PathVariable Long id, Model model) {

		LOG.debug("settledUndisbursed: metod=>settledUndisbursed(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_settled_delisted_undisbursed";
	}

	/**
	 * s_history_final_closed.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/finalclosed/biddhistory/{id}", method = RequestMethod.GET)
	public String finalClosed(@PathVariable Long id, Model model) {

		LOG.debug("finalClosed: metod=>finalClosed(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_final_closed";
	}

	/**
	 * s_history_in_disbursement_invoice.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/indisbursement/biddhistory/{id}", method = RequestMethod.GET)
	public String inDisbursement(@PathVariable Long id, Model model) {
		LOG.debug("inDisbursement: metod=>inDisbursement(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_in_disbursement_invoice";
	}

	/**
	 * s_history_fully_settled_invoice.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/fullysettled/biddhistory/{id}", method = RequestMethod.GET)
	public String fullySettled(@PathVariable Long id, Model model) {
		LOG.debug("fullySettled: metod=>fullySettled(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_fully_settled_invoice";
	}

	/**
	 * s_history_partical_settled_invoice.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/particalsettled/biddhistory/{id}", method = RequestMethod.GET)
	public String particalSettled_(@PathVariable Long id, Model model) {
		LOG.debug("particalSettled_: metod=>particalSettled_(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_partical_settled_invoice";
	}

	/**
	 * s_history_overdue_invoice.jsp 页面根据ID显示值的方法
	 * 
	 * update luoxunda 2014/12/10
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/overdue/biddhistory/{id}", method = RequestMethod.GET)
	public String overDue(@PathVariable Long id, Model model) {
		LOG.debug("overDue: metod=>overDue(" + id + ")");

		Invoice invoice = invoiceService.findOne(id);

		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDocs", invoice.getDocuments());
		return "/seller/bidhistory/s_history_overdue_invoice";
	}

	/**
	 * s_myinvoice_fully_settled.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/fullysettled/detail/{id}", method = RequestMethod.GET)
	public String fullySettledDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_fully_settled";
	}

	/**
	 * s_myinvoice_overdue.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/overdue/detail/{id}", method = RequestMethod.GET)
	public String overdueDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_overdue";
	}

	/**
	 * s_myinvoice_partially_settled.jsp页面
	 * 
	 * update by xuliufang 2015-3-12
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/particalsettled/detail/{id}", method = RequestMethod.GET)
	public String particalSettledDetail_(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_partially_settled";
	}

	@RequestMapping(value = { "/buyer/auction/dealed" })
	public String getAuctionDealedList(Model model) {
		return "buyer/auction/b_dealed_auction";
	}

	/**
	 * b_dealed_auction.jsp 页面 查询条件的方法
	 * 
	 * update by xuliufang 2014-12-13
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/dealed/list")
	@ResponseBody
	public Object dealedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "finInvAmountFrom", defaultValue = "0") String finInvAmountFrom,
			@RequestParam(value = "finInvAmountTo", defaultValue = "100000000000") String finInvAmountTo,
			@RequestParam(value = "readyToSellAdvFrom", defaultValue = "0") String readyToSellAdvFrom,
			@RequestParam(value = "readyToSellAdvTo", defaultValue = "100") String readyToSellAdvTo,
			@RequestParam(value = "readyToSellIntFrom", defaultValue = "0") String readyToSellIntFrom,
			@RequestParam(value = "readyToSellIntTo", defaultValue = "100") String readyToSellIntTo,
			@RequestParam(value = "releaseDateFrom", defaultValue = "2001-01-01") String releaseDateFrom,
			@RequestParam(value = "releaseDateTo", defaultValue = "2001-01-01") String releaseDateTo,
			@RequestParam(value = "sEcho") String echo,
			@RequestParam(value = "iDisplayStart") Integer iDisplayStart,
			@RequestParam(value = "iDisplayLength") Integer iDisplayLength,
			@RequestParam(value = "sSearch", required = false) String sSearch,
			Model model) {

		LOG.debug("InvoiceController: method=>dealedAuction()");
		LOG.debug("releaseDateFrom:" + releaseDateFrom);
		LOG.debug("releaseDateTo:" + releaseDateTo);

		BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom);
		BigDecimal finInvAmountT = new BigDecimal(finInvAmountTo);

		BigDecimal readyToSellAdvF = new BigDecimal(readyToSellAdvFrom);
		BigDecimal readyToSellAdvT = new BigDecimal(readyToSellAdvTo);

		BigDecimal readyToSellIntF = new BigDecimal(readyToSellIntFrom);
		BigDecimal readyToSellIntT = new BigDecimal(readyToSellIntTo);

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null; if (status != null)
		 * { String[] statuses = status.split(","); for (int i = 0; i <=
		 * statuses.length - 1; i++) { statusList.add(statuses[i]); } }
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_05");

		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */

		/*
		 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
		 * pageSize = 4; }
		 */

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService
					.getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellInt(
							statusList, finInvAmountF, finInvAmountT,
							readyToSellAdvF, readyToSellAdvT, readyToSellIntF,
							readyToSellIntT, iDisplayStart, iDisplayLength);
		}

		Map<String, Object> dataMap = new HashMap<String, Object>();

		model.addAttribute("iTotalRecords", invoices.getTotalElements());

		dataMap.put("iTotalRecords", invoices.getTotalElements());
		dataMap.put("iTotalDisplayRecords", invoices.getTotalElements());
		dataMap.put("sEcho", echo);

		dataMap.put("aaData", invoices.getContent());

		// dataMap.put("aaData", invoiceList);
		/*
		 * // Solution 1 dataMap.put("bestOfferMap", bestOfferMap);
		 */

		return dataMap;
		// 添加为模型属性
		/* model.addAttribute("stateChecks", stateCheckedList); */
	}

	/*
	 * class DataTablePagination<T> implements Serializable {
	 * 
	 * private static final long serialVersionUID = -2292524754426446538L;
	 * private String echo; private Integer iDisplayStart; private Integer
	 * iDispalyLength; private String sSearch; private List<T> dataList;
	 * 
	 * public String getEcho() { return echo; }
	 * 
	 * public void setEcho(String echo) { this.echo = echo; }
	 * 
	 * public Integer getiDisplayStart() { return iDisplayStart; }
	 * 
	 * public void setiDisplayStart(Integer iDisplayStart) { this.iDisplayStart
	 * = iDisplayStart; }
	 * 
	 * public Integer getiDispalyLength() { return iDispalyLength; }
	 * 
	 * public void setiDispalyLength(Integer iDispalyLength) {
	 * this.iDispalyLength = iDispalyLength; }
	 * 
	 * public String getsSearch() { return sSearch; }
	 * 
	 * public void setsSearch(String sSearch) { this.sSearch = sSearch; }
	 * 
	 * }
	 */

	@RequestMapping(value = { "/buyer/auction/open" })
	public String getOpenPage(Model model) {

		return "buyer/auction/openlist";
	}

	/**
	 * openlist.jsp页面 查询条件的方法
	 * 
	 * update by xuliufang 2014-12-13
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 * @return
	 */
	@RequestMapping(value = "/buyer/auction/open/list")
	@ResponseBody
	public Object getOpenList(
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
			@RequestParam(value = "releaseDateFrom", defaultValue = "1001-01-01") String releaseDateFrom,
			@RequestParam(value = "releaseDateTo", defaultValue = "3999-01-01") String releaseDateTo,
			@RequestParam(value = "delistingDateFrom", defaultValue = "1001-01-01") String delistingDateFrom,
			@RequestParam(value = "delistingDateTo", defaultValue = "3999-01-01") String delistingDateTo,
			@RequestParam(value = "finRmngMatTermFrom", defaultValue = "25") Long finRmngMatTermFrom,
			@RequestParam(value = "finRmngMatTermTo", defaultValue = "120") Long finRmngMatTermTo,
			@RequestParam(value = "finStickerId", required = false) String finStickerId,
			@RequestParam(value = "sellerId", required = false) Long sellerId,
			@RequestParam(value = "debtorName", required = false) String debtorName,
			/*
			 * @RequestParam(value = "pageNumber", required = false) Integer
			 * pageNumber,
			 * 
			 * @RequestParam(value = "pageSize", required = false) Integer
			 * pageSize,
			 */
			@RequestParam(value = "sEcho") String echo,
			@RequestParam(value = "iDisplayStart") Integer iDisplayStart,
			@RequestParam(value = "iDisplayLength") Integer iDisplayLength,
			@RequestParam(value = "sSearch", required = false) String sSearch,
			Model model) {

		/*
		 * JSONObject obj = (JSONObject) ja.get(i); 11. if
		 * (obj.get("name").equals("sEcho")) 12. sEcho =
		 * obj.get("value").toString(); 13. if
		 * (obj.get("name").equals("iDisplayStart")) 14. iDisplayStart =
		 * obj.get("value").toString(); 15. if
		 * (obj.get("name").equals("iDisplayLength")) 16. iDisplayLength =
		 * obj.get("value").toString(); 17. if
		 * (obj.get("name").equals("sSearch")) 18. sSearch =
		 * obj.get("value").toString();
		 */

		LOG.debug("InvoiceController: method=>openList()");
		LOG.debug("releaseDateFrom:" + releaseDateFrom);
		LOG.debug("releaseDateTo:" + releaseDateTo);
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

		/*
		 * Double curBestOffrIntF = Double.parseDouble(curBestOffrIntFrom);
		 * Double curBestOffrIntT = Double.parseDouble(curBestOffrIntTo);
		 */

		/*
		 * List<String> statusList = new ArrayList<String>();
		 * List<InvoiceStateCheck> stateCheckedList = null; if (status != null)
		 * { String[] statuses = status.split(","); for (int i = 0; i <=
		 * statuses.length - 1; i++) { statusList.add(statuses[i]); } }
		 */

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_03");
		statusList.add("xhLGTcqzFh_dSHAvdyhfW");

		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */

		/*
		 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
		 * pageSize = 5; }
		 */

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService
					.getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrIntAndFinRmngMatTermAndFinStickerIdAndSellerIdAndDebtorName(
							statusList, finInvAmountF, finInvAmountT,
							readyToSellAdvF, readyToSellAdvT, readyToSellIntF,
							readyToSellIntT, finRmngMatTermFrom,
							finRmngMatTermTo, iDisplayStart, iDisplayLength);
		}

		/* List<Invoice> invoiceList = invoices.getContent(); */
		/*
		 * for (Invoice invoice : invoiceList) { Long invoiceId =
		 * invoice.getId();
		 * 
		 * invoice.setCurBestOfferOfcurrUser(100L); Auction auction = null;
		 * invoive.setAuciton(auction); }
		 */
		/*
		 * // Solution 1 Map<Long, Auction> bestOfferMap = new HashMap<Long,
		 * Auction>(); for (Invoice invoice : invoices.getContent()) { Long
		 * invoiceId = invoice.getId(); Auction acution = null; //
		 * 获取当前用户的最优报价(userId, invoiceId) bestOfferMap.put(invoiceId, acution);
		 * }
		 */
		// model.addAttribute("page", invoices);
		// 添加为模型属性
		/* model.addAttribute("stateChecks", stateCheckedList); */
		// return "buyer/auction/openlist";

		Map<String, Object> dataMap = new HashMap<String, Object>();

		model.addAttribute("iTotalRecords", invoices.getTotalElements());

		dataMap.put("iTotalRecords", invoices.getTotalElements());
		dataMap.put("iTotalDisplayRecords", invoices.getTotalElements());
		dataMap.put("sEcho", echo);

		dataMap.put("aaData", invoices.getContent());

		// dataMap.put("aaData", invoiceList);
		/*
		 * // Solution 1 dataMap.put("bestOfferMap", bestOfferMap);
		 */

		return dataMap;
	}

	/**
	 * s_myinvoice_detail_closed.jsp页面
	 * 
	 * add by xuliufang 2015-2-2
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/closed/detail/{id}", method = RequestMethod.GET)
	public String closedDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */
		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());

		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_closed";
	}

	/**
	 * add by xuliufang 2015-01-05
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/openauction/openDetail/similarInvoice/{id}", method = RequestMethod.GET)
	public String openAuctionDetail(@PathVariable Long id, Model model) {

		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);

		return "buyer/mybids/b_similar_invoice";
	}

	/**
	 * b_similar_invoice.jsp 页面的条件查询方法
	 * 
	 * add by xuliufang 2015-01-05
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/mybids/b_similar_invoice")
	public String similarInvoiceList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "finInvAmount", defaultValue = "0") String finInvAmount,
			@RequestParam(value = "sellerId", required = false) Long sellerId,
			@RequestParam(value = "debtorName", required = false) String debtorName,
			@RequestParam(value = "readyToSellAdv", defaultValue = "0") String readyToSellAdv,
			@RequestParam(value = "readyToSellInt", defaultValue = "0") String readyToSellInt,
			@RequestParam(value = "finRmngMatTerm", defaultValue = "0") Long finRmngMatTerm,
			@RequestParam(value = "finStickerId", required = false) String finStickerId,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("InvoiceController: method=>delistedList()");

		BigDecimal finInvAmountF = new BigDecimal(finInvAmount);
		BigDecimal readyToSellAdvF = new BigDecimal(readyToSellAdv);
		BigDecimal readyToSellIntF = new BigDecimal(readyToSellInt);

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_02");
		statusList.add("IAS_03");
		statusList.add("xhLGTcqzFh_dSHAvdyhfW");

		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService
					.getInvoicesByStatusAndFinInvAmountAndSellerIdAndDebtorNameAndReadyToSellAdvAndReadyToSellIntAndFinRmngMatTermAndFinStickerId(
							statusList, finInvAmountF, sellerId, debtorName,
							readyToSellAdvF, readyToSellIntF, finRmngMatTerm,
							finStickerId, pageNumber, pageSize);
		}

		model.addAttribute("page", invoices);

		// 添加为模型属性
		model.addAttribute("form_title", "Invoices under Approval");
		model.addAttribute("page_state", "under-approval");
		return "buyer/mybids/b_similar_invoice";
	}

	/**
	 * add/update luoxunda 2015/01/16
	 * 
	 * @param invoiceId
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/rejectauction", method = RequestMethod.POST)
	@ResponseBody
	public Serializable saveUpdateAuctSta(
			@RequestParam(value = "invoiceId", defaultValue = "0") Long invoiceId,
			Model model) {
		AjaxOperResponse response = null;
		try {
			Invoice invoice = invoiceService.findOne(invoiceId);
			invoiceAuctionService.updateAuctionStatus(invoice);
			model.addAttribute("message", "success!");
			// return "{isSucceed:true,message:'Operation successful'}";
			response = new AjaxOperResponse(true, "Reject success!");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			// return "{isSucceed:false,message:'" + e.getMessage() + "'}";
			response = new AjaxOperResponse(false, e.getMessage());
		}
		// Invoice invoice = invoiceService.findOne(invoiceId);
		// invoiceAuctionService.updateAuctionStatus(invoice);

		return response;
	}

	/**
	 * s_myinvoice_detail_processing.jsp页面
	 * 
	 * update by xuliufang 2015-2-2
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/processing/detail/{id}", method = RequestMethod.GET)
	public String processingDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());
		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_processing";
	}

	/**
	 * s_myinvoice_detail_rejected.jsp页面
	 * 
	 * update by xuliufang 2015-2-2
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/rejected/detail/{id}", method = RequestMethod.GET)
	public String rejectedDetail(@PathVariable Long id, Model model) {
		/*
		 * LOG.debug("InvoiceController: metod=>dealedBiddhistory(" + id + ")");
		 * Invoice invoice = invoiceService.findOne(id);
		 */

		Invoice invoice = invoiceService.findOne(id);
		List<InvoiceDoc> invoiceDoc = invoice.getDocuments();
		model.addAttribute("invoice", invoice);
		model.addAttribute("invoiceDoc", invoiceDoc);

		SellerApply sellerApply = invoiceService.getSellerApplyInfo();
		model.addAttribute("lastName", sellerApply.getLastName());
		model.addAttribute("firstName", sellerApply.getFirstName());
		/*
		 * User loginUser = accountService.getLoginUser();
		 * model.addAttribute("user", loginUser);
		 * model.addAttribute("sellerCompanyName",
		 * invoiceService.getSellerApplyInfo());
		 */
		return "/seller/detail/s_myinvoice_detail_rejected";
	}

	/**
	 * add by xuliufang 2015-3-23
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/auction/apply" })
	public String getMarketList(Model model) {

		return "seller/market-invoices/market-list";
	}

	/**
	 * market-list.jsp 页面的查询条件方法
	 * 
	 * update by xuliufang 2015-3-23
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/auction/apply/list" })
	@ResponseBody
	public Object getMarketInvoiceList(
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
			@RequestParam(value = "releaseDateFrom", defaultValue = "1000-01-01") String releaseDateFrom,
			@RequestParam(value = "releaseDateTo", defaultValue = "2999-01-01") String releaseDateTo,
			@RequestParam(value = "delistingDateFrom", defaultValue = "1000-01-01") String delistingDateFrom,
			@RequestParam(value = "delistingDateTo", defaultValue = "2999-01-01") String delistingDateTo,
			@RequestParam(value = "finRmngMatTermFrom", defaultValue = "25") Long finRmngMatTermFrom,
			@RequestParam(value = "finRmngMatTermTo", defaultValue = "120") Long finRmngMatTermTo,
			@RequestParam(value = "finObjOfInv", required = false) String finObjOfInv,
			@RequestParam(value = "sellerId", required = false) Long sellerId,
			@RequestParam(value = "debtorName", required = false) String debtorName,
			/*
			 * @RequestParam(value = "pageNumber", required = false) Integer
			 * pageNumber,
			 * 
			 * @RequestParam(value = "pageSize", required = false) Integer
			 * pageSize,
			 */

			@RequestParam(value = "sEcho") String echo,
			@RequestParam(value = "iDisplayStart") Integer iDisplayStart,
			@RequestParam(value = "iDisplayLength") Integer iDisplayLength,
			@RequestParam(value = "sSearch", required = false) String sSearch,
			Model model) {
		LOG.debug("InvoiceController: method=>marketInvoiceList()");
		LOG.debug("releaseDateFrom:" + releaseDateFrom);
		LOG.debug("releaseDateTo:" + releaseDateTo);
		LOG.debug("delistingDateFrom:" + delistingDateFrom);
		LOG.debug("delistingDateTo:" + delistingDateTo);

		BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom);
		BigDecimal finInvAmountT = new BigDecimal(finInvAmountTo);

		BigDecimal readyToSellAdvF = new BigDecimal(readyToSellAdvFrom);
		BigDecimal readyToSellAdvT = new BigDecimal(readyToSellAdvTo);

		BigDecimal readyToSellIntF = new BigDecimal(readyToSellIntFrom);
		BigDecimal readyToSellIntT = new BigDecimal(readyToSellIntTo);

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_01");
		statusList.add("IAS_02");
		statusList.add("IAS_03");
		statusList.add("xhLGTcqzFh_dSHAvdyhfW");

		/*
		 * Double curBestOffrAdvF = Double.parseDouble(curBestOffrAdvFrom);
		 * Double curBestOffrAdvT = Double.parseDouble(curBestOffrAdvTo);
		 */

		/*
		 * Double curBestOffrIntF = Double.parseDouble(curBestOffrIntFrom);
		 * Double curBestOffrIntT = Double.parseDouble(curBestOffrIntTo);
		 */

		/*
		 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
		 * pageSize = 15; }
		 */

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService
					.getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrIntAndFinRmngMatTermAndFinObjOfInvAndSellerIdAndDebtorName(
							statusList, finInvAmountF, finInvAmountT,
							readyToSellAdvF, readyToSellAdvT, readyToSellIntF,
							readyToSellIntT, finRmngMatTermFrom,
							finRmngMatTermTo, finObjOfInv, sellerId,
							debtorName, iDisplayStart, iDisplayLength);
		}

		/*
		 * model.addAttribute("page", invoices);
		 * 
		 * return "seller/market-invoices/market-list";
		 */

		Map<String, Object> dataMap = new HashMap<String, Object>();

		model.addAttribute("iTotalRecords", invoices.getTotalElements());

		dataMap.put("iTotalRecords", invoices.getTotalElements());
		dataMap.put("iTotalDisplayRecords", invoices.getTotalElements());
		dataMap.put("sEcho", echo);

		dataMap.put("aaData", invoices.getContent());

		return dataMap;
	}

	/**
	 * add by xuliufang 2015-3-23
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/invoice/upload" })
	public String getInvoiceUpload(Model model) {

		return "seller/my-invoices/s_invoice_upload";
	}

	/**
	 * update by xuliufang 2015-3-23
	 * 
	 * @param savedDateFrom
	 * @param savedDateTo
	 * @param debtorName
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/invoice/upload/list")
	@ResponseBody
	public Object invoiceUpload(
			@RequestParam(value = "savedDateFrom", defaultValue = "1001-01-01") String savedDateFrom,
			@RequestParam(value = "savedDateTo", defaultValue = "3999-01-01") String savedDateTo,
			@RequestParam(value = "debtorName", required = false) String debtorName,
			/*
			 * @RequestParam(value = "pageNumber", required = false) Integer
			 * pageNumber,
			 * 
			 * @RequestParam(value = "pageSize", required = false) Integer
			 * pageSize,
			 */
			@RequestParam(value = "sEcho") String echo,
			@RequestParam(value = "iDisplayStart") Integer iDisplayStart,
			@RequestParam(value = "iDisplayLength") Integer iDisplayLength,
			@RequestParam(value = "sSearch", required = false) String sSearch,
			Model model) {
		LOG.debug("InvoiceController: method=>invoiceUpload()");
		/*
		 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
		 * pageSize = 15; }
		 */
		User loginUser = accountService.getLoginUser();
		model.addAttribute("user", loginUser);

		Page<Invoice> invoices = null;
		invoices = invoiceService
				.findByFlowStatusAndCreateTimeBetweenAndDebtorNameAndSellerId(
						savedDateFrom, savedDateTo, debtorName, iDisplayStart,
						iDisplayLength);

		/*
		 * model.addAttribute("page", invoices);
		 * 
		 * // 添加为模型属性 model.addAttribute("form_title", "Invoices Update");
		 * model.addAttribute("page_state", "update-invoice");
		 * 
		 * return "/seller/my-invoices/s_invoice_upload";
		 */

		Map<String, Object> dataMap = new HashMap<String, Object>();

		model.addAttribute("iTotalRecords", invoices.getTotalElements());

		dataMap.put("iTotalRecords", invoices.getTotalElements());
		dataMap.put("iTotalDisplayRecords", invoices.getTotalElements());
		dataMap.put("sEcho", echo);

		dataMap.put("aaData", invoices.getContent());

		return dataMap;
	}

	/**
	 * add by xuliufang 2015-3-24
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/invoice/in-auction" })
	public String getInAuction(Model model) {

		return "seller/my-invoices/s_myinvoice_in_auction";
	}

	/**
	 * s_myinvoice_in_auction.jsp页面的查询条件方法
	 * 
	 * update by xuliufang 2015-3-24
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/invoice/in-auction/list" })
	@ResponseBody
	public Object inAuctionList(
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
			@RequestParam(value = "releaseDateFrom", defaultValue = "1001-01-01") String releaseDateFrom,
			@RequestParam(value = "releaseDateTo", defaultValue = "3999-01-01") String releaseDateTo,
			@RequestParam(value = "delistingDateFrom", defaultValue = "1001-01-01") String delistingDateFrom,
			@RequestParam(value = "delistingDateTo", defaultValue = "3999-01-01") String delistingDateTo,
			/*
			 * @RequestParam(value = "pageNumber", required = false) Integer
			 * pageNumber,
			 * 
			 * @RequestParam(value = "pageSize", required = false) Integer
			 * pageSize,
			 */
			@RequestParam(value = "sEcho") String echo,
			@RequestParam(value = "iDisplayStart") Integer iDisplayStart,
			@RequestParam(value = "iDisplayLength") Integer iDisplayLength,
			@RequestParam(value = "sSearch", required = false) String sSearch,
			Model model) {
		LOG.debug("InvoiceController: method=>inAuctionList()");
		LOG.debug("releaseDateFrom:" + releaseDateFrom);
		LOG.debug("releaseDateTo:" + releaseDateTo);
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

		/*
		 * Double curBestOffrIntF = Double.parseDouble(curBestOffrIntFrom);
		 * Double curBestOffrIntT = Double.parseDouble(curBestOffrIntTo);
		 */

		List<String> statusList = new ArrayList<String>();
		List<InvoiceStateCheck> stateCheckedList = null;
		statusList.add("IAS_01");
		statusList.add("IAS_02");
		statusList.add("IAS_03");
		statusList.add("xhLGTcqzFh_dSHAvdyhfW");
		/*
		 * stateCheckedList = getCheckedInvoiceStateList(statusList,
		 * InvoicePageState.InAuction);
		 */

		/*
		 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
		 * pageSize = 15; }
		 */

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService
					.getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrInt(
							statusList, finInvAmountF, finInvAmountT,
							readyToSellAdvF, readyToSellAdvT, readyToSellIntF,
							readyToSellIntT, iDisplayStart, iDisplayLength);
		}

		/*
		 * model.addAttribute("page", invoices);
		 * 
		 * // 添加为模型属性 model.addAttribute("form_title", "Invoices in Auction");
		 * model.addAttribute("page_state", "in-auction");
		 * model.addAttribute("stateChecks", stateCheckedList);
		 */

		/* return "seller/my-invoices/s_myinvoice_in_auction"; */

		Map<String, Object> dataMap = new HashMap<String, Object>();

		model.addAttribute("iTotalRecords", invoices.getTotalElements());

		dataMap.put("iTotalRecords", invoices.getTotalElements());
		dataMap.put("iTotalDisplayRecords", invoices.getTotalElements());
		dataMap.put("sEcho", echo);

		dataMap.put("aaData", invoices.getContent());

		return dataMap;
	}

	/**
	 * add by xuliufang 2015-3-24
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/invoice/delisted" })
	public String getDelisted(Model model) {

		return "seller/my-invoices/s_myinvoice_delisted";
	}

	/**
	 * s_myinvoice_delisted.jsp 页面的条件查询方法
	 * 
	 * update by xuliufang 2015-3-24
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/invoice/delisted/list" })
	@ResponseBody
	public Object delistedList(
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "finInvAmountFrom", defaultValue = "0") String finInvAmountFrom,
			@RequestParam(value = "finInvAmountTo", defaultValue = "100000000000") String finInvAmountTo,
			@RequestParam(value = "delistingDateFrom", defaultValue = "1000-01-01") String delistingDateFrom,
			@RequestParam(value = "delistingDateTo", defaultValue = "2999-01-01") String delistingDateTo,
			@RequestParam(value = "finObjOfInv", required = false) String finObjOfInv,
			/*
			 * @RequestParam(value = "pageNumber", required = false) Integer
			 * pageNumber,
			 * 
			 * @RequestParam(value = "pageSize", required = false) Integer
			 * pageSize,
			 */

			@RequestParam(value = "sEcho") String echo,
			@RequestParam(value = "iDisplayStart") Integer iDisplayStart,
			@RequestParam(value = "iDisplayLength") Integer iDisplayLength,
			@RequestParam(value = "sSearch", required = false) String sSearch,
			Model model) {
		LOG.debug("InvoiceController: method=>delistedList()");
		LOG.debug("delistingDateFrom:" + delistingDateFrom);
		LOG.debug("delistingDateTo:" + delistingDateTo);

		BigDecimal finInvAmountF = new BigDecimal(finInvAmountFrom);
		BigDecimal finInvAmountT = new BigDecimal(finInvAmountTo);

		List<String> statusList = new ArrayList<String>();
		statusList.add("IAS_06");

		/*
		 * if (pageNumber == null) { pageNumber = 0; } if (pageSize == null) {
		 * pageSize = 15; }
		 */

		Page<Invoice> invoices = null;
		if (statusList != null && statusList.size() > 0) {
			invoices = invoiceService
					.getInvoicesByStatusAndFinInvAmountAndFinObjOfInv(
							statusList, finInvAmountF, finInvAmountT,
							iDisplayStart, iDisplayLength);
		}

		/*
		 * model.addAttribute("page", invoices);
		 * 
		 * // 添加为模型属性 model.addAttribute("form_title",
		 * "Invoices under Approval"); model.addAttribute("page_state",
		 * "under-approval"); return "seller/my-invoices/s_myinvoice_delisted";
		 */

		Map<String, Object> dataMap = new HashMap<String, Object>();

		model.addAttribute("iTotalRecords", invoices.getTotalElements());

		dataMap.put("iTotalRecords", invoices.getTotalElements());
		dataMap.put("iTotalDisplayRecords", invoices.getTotalElements());
		dataMap.put("sEcho", echo);

		dataMap.put("aaData", invoices.getContent());

		return dataMap;
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