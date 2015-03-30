package com.entrofine.ifactor.app.service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.ddshell.framework.app.entity.User;
import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.api.service.InvoiceAuctionService;
import com.entrofine.ifactor.api.service.WorkflowService;
import com.entrofine.ifactor.app.entity.Auction;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.InvoiceDoc;
import com.entrofine.ifactor.app.entity.SellerApply;
import com.entrofine.ifactor.app.repository.InvoiceDocRepository;
import com.entrofine.ifactor.app.repository.InvoiceRepository;
import com.entrofine.ifactor.app.repository.SellerApplyRepository;

@Component
public class InvoiceService extends GenericCrudService<Invoice, Long> {

	@Autowired
	AccountService accountService;
	@Autowired
	private WorkflowService workflowService;
	@Autowired
	private InvoiceRepository invoiceRep;
	@Autowired
	private SellerApplyRepository sellerApplyRep;
	@Autowired
	private InvoiceDocRepository applyDocRep;
	@Autowired
	private InvoiceAuctionService invoiceAuctionService;

	@Override
	protected JpaRepository<Invoice, Long> getRepository() {
		return invoiceRep;
	}

	@Transactional
	public Invoice updateStatus(Long invoiceId) {
		Invoice invoice = invoiceRep.findOne(invoiceId);
		invoice.setFlowStatus("IAS_05");

		List<InvoiceDoc> invoiceDocs = new ArrayList<InvoiceDoc>();
		for (InvoiceDoc invoiceDoc : invoice.getDocuments()) {
			invoiceDocs.add(invoiceDoc);
		}

		List<Auction> auctions = new ArrayList<Auction>();
		for (Auction auction1 : invoice.getAutions()) {
			auction1.setFlowStatus("IAS_05");
			auctions.add(auction1);
		}
		invoice.setAutions(auctions);
		super.save(invoice);
		invoiceAuctionService.updateAuctionStatus(invoice);
		return invoice;
	}

	@Transactional
	public Invoice saveApply(Invoice apply) {
		User loginUser = accountService.getLoginUser();

		apply.setSellerId(loginUser.getId());
		apply.setSellerLoginName(loginUser.getLoginName());

		List<InvoiceDoc> documents = apply.getDocuments();
		apply.setDocuments(new ArrayList<InvoiceDoc>());
		if (apply.getId() != null) {
			applyDocRep.setBizToNull(apply.getId());
		}

		apply = super.save(apply);

		for (InvoiceDoc document : documents) {
			Long id = document.getId();
			if (id != null) {
				InvoiceDoc doc = applyDocRep.findOne(id);
				if (doc != null) {
					doc.setBiz(apply);
					doc.setDispOrder(document.getDispOrder());
					apply.getDocuments().add(doc);
					applyDocRep.save(doc);
				}
			}
		}
		return apply;
	}

	/**
	 * add by luoxunda 2015/03/24
	 * 
	 * @param invoice
	 * @return
	 */
	public boolean isfinStickerId(Invoice invoice) {
		return invoiceRep.findByFinStickerId(invoice.getFinStickerId()) != null;
	}

	@Transactional
	public Invoice submitApply(Invoice apply) throws ParseException {
		User loginUser = accountService.getLoginUser();
		Long userId = loginUser.getId();
		SellerApply sellerApply = sellerApplyRep.findBySellerId(userId);

		apply.setSellerId(loginUser.getId());
		apply.setSellerLoginName(loginUser.getLoginName());
		apply.setSellerIdKey(sellerApply.getId());
		SimpleDateFormat myfmt = new SimpleDateFormat("MM/dd/yyyy");
		String date = myfmt.format(new java.util.Date()).toString();
		apply.setSubmissionDate(myfmt.parse(date));

		List<InvoiceDoc> documents = apply.getDocuments();
		apply.setDocuments(new ArrayList<InvoiceDoc>());
		if (apply.getId() != null) {
			applyDocRep.setBizToNull(apply.getId());
		}

		apply = super.save(apply);

		for (InvoiceDoc document : documents) {
			Long id = document.getId();
			if (id != null) {
				InvoiceDoc doc = applyDocRep.findOne(id);
				if (doc != null) {
					doc.setBiz(apply);
					doc.setDispOrder(document.getDispOrder());
					apply.getDocuments().add(doc);
					applyDocRep.save(doc);
				}
			}
		}

		if (StringUtils.isEmpty(apply.getFlowStatus())) {
			workflowService.startInvoiceWorkflow(apply);
		} else {
			workflowService.updateInvoiceWorkflow(apply);
		}
		return apply;
	}

	/**
	 * invoice modify更新提交
	 * 
	 * @param apply
	 * @return
	 * @throws ParseException
	 */
	@Transactional
	public Invoice updateSubmitApply(Invoice apply) throws ParseException {
		List<InvoiceDoc> documents = apply.getDocuments();
		apply.setDocuments(new ArrayList<InvoiceDoc>());
		if (apply.getId() != null) {
			applyDocRep.setBizToNull(apply.getId());
		}

		User loginUser = accountService.getLoginUser();
		Long userId = loginUser.getId();
		SellerApply sellerApply = sellerApplyRep.findBySellerId(userId);

		apply.setSellerId(loginUser.getId());
		apply.setSellerLoginName(loginUser.getLoginName());
		apply.setSellerIdKey(sellerApply.getId());
		SimpleDateFormat myfmt = new SimpleDateFormat("MM/dd/yyyy");
		String date = myfmt.format(new java.util.Date()).toString();
		apply.setSubmissionDate(myfmt.parse(date));

		apply = super.save(apply);

		for (InvoiceDoc document : documents) {
			Long id = document.getId();
			if (id != null) {
				InvoiceDoc doc = applyDocRep.findOne(id);
				if (doc != null) {
					doc.setBiz(apply);
					doc.setDispOrder(document.getDispOrder());
					apply.getDocuments().add(doc);
					applyDocRep.save(doc);
				}
			}
		}
		if (StringUtils.isEmpty(apply.getFlowStatus())) {
			workflowService.startInvoiceWorkflow(apply);
		} else {
			workflowService.updateInvoiceWorkflow(apply);
		}

		return apply;
	}

	public SellerApply getSellerApplyInfo() {
		User loginUser = accountService.getLoginUser();

		SellerApply sellerApply = sellerApplyRep.findBySellerId(loginUser
				.getId());

		if (sellerApply == null) {
			return null;
		}

		return sellerApply;
	}

	public Page<Invoice> getInvoiceList(BigDecimal interestFrom,
			BigDecimal interestTo, int pageNo, int pageSize) {
		User loginUser = accountService.getLoginUser();

		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByReadyToSellIntBetweenAndSellerIdAndFlowStatusIsNull(
						pageable, interestFrom, interestTo, loginUser.getId());

		if (invoices == null) {
			return null;
		}

		return invoices;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndInterest(List statusList,
			BigDecimal interestFrom, BigDecimal interestTo, int pageNo,
			int pageSize) {
		User loginUser = accountService.getLoginUser();
		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndReadyToSellIntBetweenAndSellerId(
						pageable, statusList, interestFrom, interestTo,
						loginUser.getId());
		return invoices;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndInterestAndAuctionStatus(
			List statusList, BigDecimal interestFrom, BigDecimal interestTo,
			int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		String auctionStatus = "IAS_03";

		Page<Invoice> invoices = invoiceRep
				.findByAuctionStatusAndFlowStatusInAndReadyToSellIntBetween(
						pageable, auctionStatus, statusList, interestFrom,
						interestTo);
		return invoices;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> findByStatusIn(List statusList, int pageNo,
			int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		Page<Invoice> invoices = invoiceRep.findByFlowStatusIn(pageable,
				statusList);
		return invoices;
	}

	public Page<Invoice> findByReadyToSellIntBetween(BigDecimal interestFrom,
			BigDecimal interestTo, int pageNo, int pageSize) {

		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep.findByReadyToSellIntBetween(
				pageable, interestFrom, interestTo);
		return invoices;
	}

	/**
	 * s_myinvoice_dealed.jsp页面的查询条件方法
	 * 
	 * add by xuliufang 2014-12-03
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param finInvAmountT
	 * @param finInvAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndfinInvAmount(List statusList,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo, int pageNo,
			int pageSize) {
		User loginUser = accountService.getLoginUser();
		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountBetweenAndSellerId(pageable,
						statusList, finInvAmountFrom, finInvAmountTo,
						loginUser.getId());
		return invoices;
	}

	/**
	 * under-approval-list.jsp页面的查询条件方法
	 * 
	 * add by xuliufang 2014-12-02
	 * 
	 * @param status
	 * @param pageNumber
	 * @param pageSize
	 * @param model
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatus(List statusList, int pageNo,
			int pageSize) {
		User loginUser = accountService.getLoginUser();
		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep.findByFlowStatusInAndSellerId(
				pageable, statusList, loginUser.getId());
		return invoices;
	}

	/**
	 * s_myinvoice_in_disbursement.jsp 页面的条件查询方法
	 * 
	 * add luoxunda 2014/12/01
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param acceptedAdvanceFrom
	 * @param acceptedAdvanceTo
	 * @param acceptedInterestFrom
	 * @param acceptedInterestTo
	 * @param disbursementDateTo
	 * @param disbursementDateFrom
	 * @param disbursementDateFrom
	 * @param disbursementDateTo
	 * @param expectedSettlementDateTo
	 * @param expectedSettlementDateFrom
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndInterestAndInvoiceAmount(
			List statusList, BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo, BigDecimal bestBuyerAdvFrom,
			BigDecimal bestBuyerAdvTo, BigDecimal bestBuyerIntFrom,
			BigDecimal bestBuyerIntTo, int pageNo, int pageSize) {
		User loginUser = accountService.getLoginUser();
		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountBetweenAndBestBuyerAdvBetweenAndBestBuyerIntBetweenAndSellerId(
						pageable, statusList, invoiceAmountFrom,
						invoiceAmountTo, bestBuyerAdvFrom, bestBuyerAdvTo,
						bestBuyerIntFrom, bestBuyerIntTo, loginUser.getId());
		return invoices;
	}

	/**
	 * s_myinvoice_in_settlement.jsp 页面查询条件的方法
	 * 
	 * add luoxunda 2014/12/02
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param noofoverduedaysT
	 * @param noofoverduedaysF
	 * @param invoiceAmountT
	 * @param invoiceAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndInterestAndMyinvoiceInSettlement(
			List statusList, BigDecimal interestFrom,
			BigDecimal interestTo,
			BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo,
			// BigDecimal noofoverduedaysFrom, BigDecimal noofoverduedaysTo,
			String settlementDateFrom, String settlementDateTo,
			String expectedSettlementDateFrom, String expectedSettlementDateTo,
			String fullySettled, String partiallySettled, String overdue,
			int pageNo, int pageSize) {
		User loginUser = accountService.getLoginUser();
		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndReadyToSellIntBetweenAndFinInvAmountBetweenAndSellerId(
						pageable, statusList, interestFrom,
						interestTo,
						invoiceAmountFrom,
						invoiceAmountTo,
						// noofoverduedaysFrom, noofoverduedaysTo,
						settlementDateFrom, settlementDateTo,
						expectedSettlementDateFrom, expectedSettlementDateTo,
						fullySettled, partiallySettled, overdue,
						loginUser.getId());
		return invoices;
	}

	/**
	 * s_myinvoice_delisted.jsp 页面的条件查询方法
	 * 
	 * add luoxunda 2014/12/03
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param delistingDateTo
	 * @param delistingDateFrom
	 * @param goodsDeliveryNonperishable
	 * @param goodsDeliveryPerishable
	 * @param servicesDelivery
	 * @param unsuccessfulDisbursementExpired
	 * @param unsuccessfulDisbursement
	 * @param expired
	 * @param invoiceAmountT
	 * @param invoiceAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndInterestAndSmyinvoicedelisted(
			List statusList, BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom, BigDecimal invoiceAmountTo,
			String delistingDateFrom, String delistingDateTo, String expired,
			String unsuccessfulDisbursement,
			String unsuccessfulDisbursementExpired, String servicesDelivery,
			String goodsDeliveryPerishable, String goodsDeliveryNonperishable,
			int pageNo, int pageSize) {
		User loginUser = accountService.getLoginUser();
		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndReadyToSellIntBetweenAndFinInvIssDateAndSellerId(
						pageable, statusList, interestFrom, interestTo,
						invoiceAmountFrom, invoiceAmountTo, delistingDateFrom,
						delistingDateTo, expired, unsuccessfulDisbursement,
						unsuccessfulDisbursementExpired, servicesDelivery,
						goodsDeliveryPerishable, goodsDeliveryNonperishable,
						loginUser.getId());
		return invoices;
	}

	/**
	 * s_myinvoice_final_closed.jsp 页面条件的查询方法
	 * 
	 * update by xuliufang 2014-12-12
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param expectedSettlementDateTo
	 * @param expectedSettlementDateFrom
	 * @param settlementDateTo
	 * @param settlementDateFrom
	 * @param noofOverdueDaysT
	 * @param noofOverdueDaysF
	 * @param invoiceAmountT
	 * @param invoiceAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndFinInvAmountAnd(List statusList,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo,
			// BigDecimal noofOverdueDaysFrom, BigDecimal noofOverdueDaysTo,
			int pageNo, int pageSize) {
		User loginUser = accountService.getLoginUser();
		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountBetweenAndSellerId(pageable,
						statusList, finInvAmountFrom, finInvAmountTo,
						// noofOverdueDaysFrom, noofOverdueDaysTo,
						loginUser.getId());
		return invoices;
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
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrIntAndFinRmngMatTermAndFinStickerIdAndSellerIdAndDebtorName(
			List statusList, BigDecimal finInvAmountFrom,
			BigDecimal finInvAmountTo, BigDecimal readyToSellAdvFrom,
			BigDecimal readyToSellAdvTo, BigDecimal readyToSellIntFrom,
			BigDecimal readyToSellIntTo, Long finRmngMatTermFrom,
			Long finRmngMatTermTo, int iDisplayStart, int iDisplayLenth) {
		int pageNo = iDisplayStart / iDisplayLenth;
		Pageable pageable = new PageRequest(pageNo, iDisplayLenth);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndFinRmngMatTermBetween(
						pageable, statusList, finInvAmountFrom, finInvAmountTo,
						readyToSellAdvFrom, readyToSellAdvTo,
						readyToSellIntFrom, readyToSellIntTo,
						finRmngMatTermFrom, finRmngMatTermTo);
		return invoices;
	}

	/**
	 * b_mybid_open_auction.jsp页面的查询条件方法 add by xuliufang 2014-12-05
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 */
	@Transactional
	public Page<Invoice> getAuctionsByStatusAndInvoiceAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrInt(
			List<String> statusList, BigDecimal finInvAmountFrom,
			BigDecimal finInvAmountTo, BigDecimal readyToSellAdvFrom,
			BigDecimal readyToSellAdvTo, BigDecimal readyToSellIntFrom,
			BigDecimal readyToSellIntTo, Double curBestOffrIntFrom,
			Double curBestOffrIntTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		/*
		 * Page<Auction> auctions = auctionRep .
		 * findByFlowStatusInAndBuyerIdAndInvoiceFinInvAmountBetweenAndInvoiceReadyToSellAdvBetweenAndInvoiceReadyToSellIntBetweenAndInvoiceCurBestOffrIntBetween
		 * ( pageable, statusList, loginUser.getId(), finInvAmountFrom,
		 * finInvAmountTo, readyToSellAdvFrom, readyToSellAdvTo,
		 * readyToSellIntFrom, readyToSellIntTo, curBestOffrIntFrom,
		 * curBestOffrIntTo);
		 */
		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndAutionsBuyerIdAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndBestBuyerAdvIsNotNull(
						pageable, statusList, loginUser.getId(),
						finInvAmountFrom, finInvAmountTo, readyToSellAdvFrom,
						readyToSellAdvTo, readyToSellIntFrom, readyToSellIntTo);
		return invoices;
	}

	/**
	 * b_mybid_dealed_auction.jsp 页面的查询条件方法 add by xuliufang 2014-12-05
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @return
	 */
	@Transactional
	public Page<Invoice> getAuctionsByStatusAndInvoiceAndFinInvAmount(
			List<String> statusList, BigDecimal finInvAmountFrom,
			BigDecimal finInvAmountTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndBuyerIdAndFinInvAmountBetween(pageable,
						statusList, loginUser.getId(), finInvAmountFrom,
						finInvAmountTo);
		return invoices;
	}

	/**
	 * b_dealed_auction.jsp页面 查询条件的方法
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
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellInt(
			List statusList, BigDecimal finInvAmountFrom,
			BigDecimal finInvAmountTo, BigDecimal readyToSellAdvFrom,
			BigDecimal readyToSellAdvTo, BigDecimal readyToSellIntFrom,
			BigDecimal readyToSellIntTo, int iDisplayStart, int iDisplayLenth) {

		int pageNo = iDisplayStart / iDisplayLenth;
		Pageable pageable = new PageRequest(pageNo, iDisplayLenth);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetween(
						pageable, statusList, finInvAmountFrom, finInvAmountTo,
						readyToSellAdvFrom, readyToSellAdvTo,
						readyToSellIntFrom, readyToSellIntTo);
		return invoices;
	}

	/**
	 * add by xuliufang 2014-12-22
	 * 
	 * @return
	 */
	public Invoice getInvoice(String debtorName) {
		return invoiceRep.findByDebtorName(debtorName);
	}

	/**
	 * add by xuliufang 2014-12-22
	 * 
	 * @return
	 */
	public Invoice getInvoice(Long id) {
		return invoiceRep.findBySellerId(id);
	}

	/**
	 * s_myinvoice_final_closed.jsp 页面条件的查询方法
	 * 
	 * add luoxunda 2014/12/03
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param expectedSettlementDateTo
	 * @param expectedSettlementDateFrom
	 * @param settlementDateTo
	 * @param settlementDateFrom
	 * @param noofOverdueDaysT
	 * @param noofOverdueDaysF
	 * @param invoiceAmountT
	 * @param invoiceAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndInterestAndSmyinvoicefinalclosed(
			List statusList, BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo,
			// BigDecimal noofOverdueDaysFrom, BigDecimal noofOverdueDaysTo,
			String settlementDateFrom, String settlementDateTo,
			String expectedSettlementDateFrom, String expectedSettlementDateTo,
			int pageNo, int pageSize) {
		User loginUser = accountService.getLoginUser();
		Pageable pageable = new PageRequest(pageNo, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndReadyToSellIntBetweenAndSerialNumInvoiceBetweenAndSellerId(
						pageable, statusList, interestFrom, interestTo,
						invoiceAmountFrom,
						invoiceAmountTo,
						// noofOverdueDaysFrom, noofOverdueDaysTo,
						settlementDateFrom, settlementDateTo,
						expectedSettlementDateFrom, expectedSettlementDateTo,
						loginUser.getId());
		return invoices;
	}

	/**
	 * add by xuliufang 2015-01-05
	 * 
	 * @param statusList
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 * @param readyToSellIntFrom
	 * @param readyToSellIntTo
	 * @param finRmngMatTermFrom
	 * @param finRmngMatTermTo
	 * @param finObjOfInv
	 * @param sellerId
	 * @param debtorName
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndFinInvAmountAndSellerIdAndDebtorNameAndReadyToSellAdvAndReadyToSellIntAndFinRmngMatTermAndFinStickerId(
			List<String> statusList, BigDecimal finInvAmountF, Long sellerId,
			String debtorName, BigDecimal readyToSellAdvF,
			BigDecimal readyToSellIntF, Long finRmngMatTerm,
			String finStickerId, int pageNumber, int pageSize) {
		Pageable pageable = new PageRequest(pageNumber, pageSize);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountAndSellerIdAndDebtorNameAndReadyToSellAdvAndReadyToSellIntAndFinRmngMatTermAndFinStickerId(
						pageable, statusList, finInvAmountF, sellerId,
						debtorName, readyToSellAdvF, readyToSellIntF,
						finRmngMatTerm, finStickerId);
		return invoices;
	}

	/**
	 * s_invoice_upload.jsp页面的查询条件方法
	 * 
	 * update by liulongxiang 2015-3-23
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param finInvAmountT
	 * @param finInvAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> findByFlowStatusAndCreateTimeBetweenAndDebtorNameAndSellerId(
			String saveTimeFrom, String saveTimeTo, String debtorName,
			int iDisplayStart, int iDisplayLength) {
		User loginUser = accountService.getLoginUser();
		/* Pageable pageable = new PageRequest(pageNo, pageSize); */
		int pageNo = iDisplayStart / iDisplayLength;
		Pageable pageable = new PageRequest(pageNo, iDisplayLength);
		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusIsNullAndSellerIdOrderByCreateTimeDesc(
						pageable, loginUser.getId());
		return invoices;
	}

	/**
	 * s_myinvoice_delisted.jsp 页面的条件查询方法
	 * 
	 * update by xuliufang 2015-3-24
	 * 
	 * @param statusList
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndFinInvAmountAndFinObjOfInv(
			List statusList, BigDecimal finInvAmountFrom,
			BigDecimal finInvAmountTo, int iDisplayStart, int iDisplayLength) {
		User loginUser = accountService.getLoginUser();
		/* Pageable pageable = new PageRequest(pageNo, pageSize); */
		int pageNo = iDisplayStart / iDisplayLength;
		Pageable pageable = new PageRequest(pageNo, iDisplayLength);
		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountBetweenAndSellerId(pageable,
						statusList, finInvAmountFrom, finInvAmountTo,
						loginUser.getId());
		return invoices;
	}

	/**
	 * s_myinvoice_in_auction.jsp页面的查询条件方法
	 * 
	 * update by xuliufang 2015-3-24
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param finInvAmountT
	 * @param finInvAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrInt(
			List statusList, BigDecimal finInvAmountFrom,
			BigDecimal finInvAmountTo, BigDecimal readyToSellAdvFrom,
			BigDecimal readyToSellAdvTo, BigDecimal readyToSellIntFrom,
			BigDecimal readyToSellIntTo, int iDisplayStart, int iDisplayLength) {
		User loginUser = accountService.getLoginUser();
		/* Pageable pageable = new PageRequest(pageNo, pageSize); */

		int pageNo = iDisplayStart / iDisplayLength;
		Pageable pageable = new PageRequest(pageNo, iDisplayLength);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndSellerId(
						pageable, statusList, finInvAmountFrom, finInvAmountTo,
						readyToSellAdvFrom, readyToSellAdvTo,
						readyToSellIntFrom, readyToSellIntTo, loginUser.getId());
		return invoices;
	}

	/**
	 * market-list.jsp 页面的查询条件方法
	 * 
	 * update by xuliufang 2015-3-23
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param finInvAmountT
	 * @param finInvAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Page<Invoice> getInvoicesByStatusAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrIntAndFinRmngMatTermAndFinObjOfInvAndSellerIdAndDebtorName(
			List<String> statusList, BigDecimal finInvAmountFrom,
			BigDecimal finInvAmountTo, BigDecimal readyToSellAdvFrom,
			BigDecimal readyToSellAdvTo, BigDecimal readyToSellIntFrom,
			BigDecimal readyToSellIntTo, Long finRmngMatTermFrom,
			Long finRmngMatTermTo, String finObjOfInv, Long sellerId,
			String debtorName, int iDisplayStart, int iDisplayLength) {
		User loginUser = accountService.getLoginUser();
		int pageNo = iDisplayStart / iDisplayLength;
		Pageable pageable = new PageRequest(pageNo, iDisplayLength);

		Page<Invoice> invoices = invoiceRep
				.findByFlowStatusInAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndFinRmngMatTermBetween(
						pageable, statusList, finInvAmountFrom, finInvAmountTo,
						readyToSellAdvFrom, readyToSellAdvTo,
						readyToSellIntFrom, readyToSellIntTo,
						finRmngMatTermFrom, finRmngMatTermTo);
		return invoices;
	}

}
