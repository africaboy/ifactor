package com.entrofine.ifactor.app.service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.ddshell.framework.app.entity.User;
import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.api.entity.InvoiceAuction;
import com.entrofine.ifactor.api.service.InvoiceAuctionService;
import com.entrofine.ifactor.app.entity.Auction;
import com.entrofine.ifactor.app.entity.AuctionStatus;
import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.repository.AuctionRepository;
import com.google.common.collect.Lists;

@Component
public class AuctionService extends GenericCrudService<Auction, Long> {

	@Autowired
	private AccountService accountService;
	@Autowired
	private InvoiceService invoiceService;
	@Autowired
	private AuctionRepository auctionRep;
	@Autowired
	private BuyerApplyService buyerApplyService;
	@Autowired
	private InvoiceAuctionService invoiceAuctionService;

	@Override
	protected JpaRepository<Auction, Long> getRepository() {
		return auctionRep;
	}

	@Transactional
	public Auction submitBid(Auction auction, Long invoiceId)
			throws ParseException {
		User loginUser = accountService.getLoginUser();
		Invoice invoice = invoiceService.findOne(invoiceId);
		invoice.setBestBuyerAdv(auction.getDiscount());
		invoice.setBestBuyerInt(auction.getInterest());
		invoice.setBuyerId(loginUser.getId());
		invoice.setNoOfOffers(invoice.getNoOfOffers() == null ? 1 : invoice
				.getNoOfOffers() + 1);
		SimpleDateFormat myfmt = new SimpleDateFormat("MM/dd/yyyy");
		String date = myfmt.format(new java.util.Date()).toString();
		invoice.setBiddingDate(myfmt.parse(date));
		invoiceService.save(invoice);

		auction.setBuyerId(loginUser.getId());
		BuyerApply buyerApply = buyerApplyService.findByBuyerId(loginUser
				.getId());
		auction.setBuyerApplyId(buyerApply.getId());
		auction.setBuyerLoginName(loginUser.getLoginName());
		auction.setFlowStatus(invoice.getFlowStatus());
		auction.setInvoice(invoice);
		auction = save(auction);
		InvoiceAuction invoiceAuction = new InvoiceAuction();
		invoiceAuction.setInvoiceId(String.valueOf(invoiceId));
		invoiceAuction.setAuction(auction);
		invoiceAuction.setAccepted(false);
		invoiceAuctionService.saveMakeOfferInfo(invoiceAuction);
		return auction;
	}

	@Transactional
	public Auction submitBidForBuyNow(Auction auction, Long invoiceId) {
		User loginUser = accountService.getLoginUser();
		BuyerApply buyerApply = buyerApplyService.findByBuyerId(loginUser
				.getId());

		Invoice invoice = invoiceService.findOne(invoiceId);
		invoice.setBestBuyerAdv(auction.getDiscount());
		invoice.setBestBuyerInt(auction.getInterest());
		invoice.setFlowStatus("IAS_05");
		invoice.setBuyerId(loginUser.getId());
		invoice.setAuctionStatus("IAS_05");
		invoice.setNoOfOffers(invoice.getNoOfOffers() == null ? 1 : invoice
				.getNoOfOffers() + 1);
		invoiceService.save(invoice);

		auction.setBuyerId(loginUser.getId());
		auction.setBuyerApplyId(buyerApply.getId());
		auction.setBuyerLoginName(loginUser.getLoginName());
		auction.setFlowStatus(invoice.getFlowStatus());
		auction.setInvoice(invoice);
		auction = save(auction);
		InvoiceAuction invoiceAuction = new InvoiceAuction();
		invoiceAuction.setInvoiceId(String.valueOf(invoiceId));
		invoiceAuction.setAuction(auction);
		invoiceAuction.setAccepted(true);
		invoiceAuctionService.saveMakeOfferInfo(invoiceAuction);
		return auction;
	}

	public List<Auction> findOpenBidsByStatusIn(List<String> statusList) {
		return findByStatusIn(Lists.newArrayList(
				AuctionStatus.InAuction.toString(),
				AuctionStatus.OfferAccepted.toString(),
				AuctionStatus.BeingAdvanced.toString(),
				AuctionStatus.InDefault.toString(),
				AuctionStatus.Returned.toString(),
				AuctionStatus.AbnormalTermination.toString()), statusList);
	}

	public List<Auction> findClosedBidsByStatusIn(List<String> statusList) {
		return findByStatusIn(Lists.newArrayList(
				AuctionStatus.InDefault.toString(),
				AuctionStatus.Rejected.toString(),
				AuctionStatus.AuctionDatePassed.toString(),
				AuctionStatus.Returned.toString(),
				AuctionStatus.AbnormalTermination.toString()), statusList);
	}

	private List<Auction> findByStatusIn(List<String> statusList,
			List<String> statusSubList) {
		if (statusSubList != null) {
			for (Iterator<String> itr = statusList.iterator(); itr.hasNext();) {
				if (!statusSubList.contains(itr.next())) {
					itr.remove();
				}
			}
		}
		User loginUser = accountService.getLoginUser();

		return auctionRep.findByFlowStatusInAndBuyerId(statusList,
				loginUser.getId());
	}

	@Transactional
	public Page<Auction> getAuctionsByStatusAndInterest(
			List<String> statusList, BigDecimal interestFrom,
			BigDecimal interestTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		Page<Auction> auctions = auctionRep
				.findByFlowStatusInAndBuyerIdAndInterestBetween(pageable,
						statusList, loginUser.getId(), interestFrom, interestTo);
		return auctions;
	}

	/*	*//**
	 * b_mybid_open_auction.jsp页面的查询条件方法 add by liulongxiang 2015-03-06
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 */
	/*
	 * @Transactional public Page<Auction>
	 * getAuctionsByStatusAndInvoiceAndFinInvAmountAndReadyToSellAdvAndReadyToSellIntAndCurBestOffrInt
	 * ( List<String> statusList, BigDecimal finInvAmountFrom, BigDecimal
	 * finInvAmountTo, BigDecimal readyToSellAdvFrom, BigDecimal
	 * readyToSellAdvTo, BigDecimal readyToSellIntFrom, BigDecimal
	 * readyToSellIntTo, Double curBestOffrIntFrom, Double curBestOffrIntTo, int
	 * pageNo, int pageSize) { Pageable pageable = new PageRequest(pageNo,
	 * pageSize); User loginUser = accountService.getLoginUser();
	 * 
	 * Page<Auction> auctions = auctionRep .
	 * findByFlowStatusInAndBuyerIdAndInvoiceFinInvAmountBetweenAndInvoiceReadyToSellAdvBetweenAndInvoiceReadyToSellIntBetweenAndInvoiceCurBestOffrIntBetween
	 * ( pageable, statusList, loginUser.getId(), finInvAmountFrom,
	 * finInvAmountTo, readyToSellAdvFrom, readyToSellAdvTo, readyToSellIntFrom,
	 * readyToSellIntTo, curBestOffrIntFrom, curBestOffrIntTo);
	 * 
	 * Page<Auction> auctions = auctionRep .
	 * findByFlowStatusInAndBuyerIdAndInvoiceFinInvAmountBetweenAndInvoiceReadyToSellAdvBetweenAndInvoiceReadyToSellIntBetweenOrderByCreateTimeDesc
	 * ( pageable, statusList, loginUser.getId(), finInvAmountFrom,
	 * finInvAmountTo, readyToSellAdvFrom, readyToSellAdvTo, readyToSellIntFrom,
	 * readyToSellIntTo); return auctions; }
	 */
	/**
	 * b_mybid_dealed_auction.jsp 页面的查询条件方法 add by xuliufang 2014-12-05
	 * 
	 * @param status
	 * @param interestFrom
	 * @param interestTo
	 * @return
	 */
	@Transactional
	public Page<Auction> getAuctionsByStatusAndInvoiceAndFinInvAmount(
			List<String> statusList, BigDecimal finInvAmountFrom,
			BigDecimal finInvAmountTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		Page<Auction> auctions = auctionRep
				.findByFlowStatusInAndBuyerIdAndInvoiceFinInvAmountBetween(
						pageable, statusList, loginUser.getId(),
						finInvAmountFrom, finInvAmountTo);
		return auctions;
	}

	/**
	 * b_mybid_disbursed_auction.jsp 页面查询条件的方法
	 * 
	 * add luoxunda 2014/12/03
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param expectedSettlementDateTo
	 * @param expectedSettlementDateFrom
	 * @param disbursementDateTo
	 * @param disbursementDateFrom
	 * @param acceptedInterestT
	 * @param acceptedInterestF
	 * @param acceptedAdvanceT
	 * @param acceptedAdvanceF
	 * @param invoiceAmountT
	 * @param invoiceAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@Transactional
	public Page<Auction> getAuctionsByStatusAndInterestAndBmybiddisbursedauction(
			List<String> statusList, BigDecimal interestFrom,
			BigDecimal interestTo, BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo, BigDecimal acceptedAdvanceFrom,
			BigDecimal acceptedAdvanceTo, BigDecimal acceptedInterestFrom,
			BigDecimal acceptedInterestTo, String disbursementDateFrom,
			String disbursementDateTo, String expectedSettlementDateFrom,
			String expectedSettlementDateTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		Page<Auction> auctions = auctionRep
				.findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
						pageable, statusList, loginUser.getId(), interestFrom,
						interestTo, invoiceAmountFrom, invoiceAmountTo/*
																	 * ,
																	 * acceptedAdvanceFrom
																	 * ,
																	 * acceptedAdvanceTo
																	 * ,
																	 * acceptedInterestFrom
																	 * ,
																	 * acceptedInterestTo
																	 * ,
																	 * disbursementDateFrom
																	 * ,
																	 * disbursementDateFrom
																	 * ,
																	 * expectedSettlementDateFrom
																	 * ,
																	 * expectedSettlementDateTo
																	 */);
		return auctions;
	}

	/**
	 * b_mybid_invoice_in_settle.jsp 页面条件查询的方法
	 * 
	 * add luoxunda 2014/12/04
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
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
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@Transactional
	public Page<Auction> getAuctionsByStatusAndInterestAndBmybidinvoiceinsettle(
			List<String> statusList, BigDecimal interestFrom,
			BigDecimal interestTo, BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo, BigDecimal noofOverdueDaysFrom,
			BigDecimal noofOverdueDaysTo, String fullySettled,
			String partiallySettled, String overdue, String settlementDateFrom,
			String settlementDateTo, String expectedSettlementDateFrom,
			String expectedSettlementDateTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		Page<Auction> auctions = auctionRep
				.findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
						pageable, statusList, loginUser.getId(), interestFrom,
						interestTo, invoiceAmountFrom, invoiceAmountTo/*
																	 * ,
																	 * noofOverdueDaysFrom
																	 * ,
																	 * noofOverdueDaysTo
																	 * ,
																	 * fullySettled
																	 * ,
																	 * partiallySettled
																	 * ,
																	 * overdue,
																	 * settlementDateFrom
																	 * ,
																	 * settlementDateTo
																	 * ,
																	 * expectedSettlementDateFrom
																	 * ,
																	 * expectedSettlementDateTo
																	 */);
		return auctions;
	}

	/**
	 * b_mybid_unsuccessful_auction.jsp 页面条件查询的方法
	 * 
	 * add luoxunda 2014/12/05
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param auctionClosedDateTo
	 * @param auctionClosedDateFrom
	 * @param readyToSellInterestF2
	 * @param readyToSellInterestF
	 * @param readyToSellAdvanceT
	 * @param readyToSellAdvanceF
	 * @param invoiceAmountT
	 * @param invoiceAmountF
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@Transactional
	public Page<Auction> getAuctionsByStatusAndInterestAndBmybidunsuccessfulauction(
			List<String> statusList, BigDecimal interestFrom,
			BigDecimal interestTo, BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo, BigDecimal readyToSellAdvanceFrom,
			BigDecimal readyToSellAdvanceTo,
			BigDecimal readyToSellInterestFrom,
			BigDecimal readyToSellInterestTo, String auctionClosedDateFrom,
			String auctionClosedDateTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		Page<Auction> auctions = auctionRep
				.findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
						pageable, statusList, loginUser.getId(), interestFrom,
						interestTo, invoiceAmountFrom, invoiceAmountTo/*
																	 * ,
																	 * readyToSellAdvanceFrom
																	 * ,
																	 * readyToSellAdvanceTo
																	 * ,
																	 * readyToSellInterestFrom
																	 * ,
																	 * readyToSellInterestTo
																	 * ,
																	 * auctionClosedDateFrom
																	 * ,
																	 * auctionClosedDateFrom
																	 */);
		return auctions;
	}

	/**
	 * b_mybid_delisted_auction.jsp 页面条件查询的方法
	 * 
	 * update luoxunda 2014/12/05
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
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
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@Transactional
	public Page<Auction> getAuctionsByStatusAndInterestAndBmybiddelistedauction(
			List<String> statusList, BigDecimal interestFrom,
			BigDecimal interestTo, BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo, BigDecimal readyToSellAdvanceFrom,
			BigDecimal readyToSellAdvanceTo,
			BigDecimal readyToSellInterestFrom,
			BigDecimal readyToSellInterestTo, String delistingDateFrom,
			String delistingDateTo, String servicesDelivery,
			String goodsDeliveryPerishable, String goodsDeliveryNonperishable,
			String expired, String unsuccesfulDisbursement,
			String unsuccesfulDisbursementExpired, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		Page<Auction> auctions = auctionRep
				.findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
						pageable, statusList, loginUser.getId(), interestFrom,
						interestTo, invoiceAmountFrom, invoiceAmountTo/*
																	 * ,
																	 * readyToSellAdvanceFrom
																	 * ,
																	 * readyToSellAdvanceTo
																	 * ,
																	 * readyToSellInterestFrom
																	 * ,
																	 * readyToSellInterestTo
																	 * ,
																	 * delistingDateFrom
																	 * ,
																	 * delistingDateTo
																	 * ,
																	 * servicesDelivery
																	 * ,
																	 * goodsDeliveryPerishable
																	 * ,
																	 * goodsDeliveryNonperishable
																	 * ,
																	 * expired,
																	 * unsuccesfulDisbursement
																	 * ,
																	 * unsuccesfulDisbursementExpired
																	 */);
		return auctions;
	}

	/**
	 * b_mybid_final_closed_auction.jsp 页面条件查询的方法
	 * 
	 * update luoxunda 2014/12/05
	 * 
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param settlementDateFrom
	 * @param settlementDateTo
	 * @param expectedSettlementDateFrom
	 * @param expectedSettlementDateTo
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	@Transactional
	public Page<Auction> getAuctionsByStatusAndInterestAndBmybidfinalclosedauction(
			List<String> statusList, BigDecimal interestFrom,
			BigDecimal interestTo, BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo, String settlementDateFrom,
			String settlementDateTo, String expectedSettlementDateFrom,
			String expectedSettlementDateTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		Page<Auction> auctions = auctionRep
				.findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
						pageable, statusList, loginUser.getId(), interestFrom,
						interestTo, invoiceAmountFrom, invoiceAmountTo/*
																	 * ,
																	 * settlementDateFrom
																	 * ,
																	 * settlementDateTo
																	 * ,
																	 * expectedSettlementDateFrom
																	 * ,
																	 * expectedSettlementDateTo
																	 */);
		return auctions;
	}

	/**
	 * b_mybid_open_auction.jsp页面的查询条件方法 add by liulongxiang 2015-03-06
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 */
	@Transactional
	public Page<Auction> getCurrentBuyerBestBid(List<String> statusList,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo,
			BigDecimal readyToSellAdvFrom, BigDecimal readyToSellAdvTo,
			BigDecimal readyToSellIntFrom, BigDecimal readyToSellIntTo,
			Double curBestOffrIntFrom, Double curBestOffrIntTo, int pageNo,
			int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		User loginUser = accountService.getLoginUser();
		String flowStatus = "IAS_03";
		Page<Auction> auctions = auctionRep.findByCurrentBuyerBestBid(
				loginUser.getId(), flowStatus, pageable);
		/*
		 * 
		 * Page<Auction> auctions = auctionRep.
		 * findByFlowStatusInAndAutionsBuyerIdAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndBestBuyerAdvIsNotNull
		 * ( pageable, statusList, loginUser.getId(), finInvAmountFrom,
		 * finInvAmountTo, readyToSellAdvFrom, readyToSellAdvTo,
		 * readyToSellIntFrom, readyToSellIntTo);
		 */
		return auctions;
	}

	public Map<String, String> getAuctionBidsInfo(long invoiceId) {
		// TODO
		// auctionRep.getBidsCount(invoiceId);
		Map<String, String> map = new HashMap<String, String>();
		map.put("bids", String.valueOf(auctionRep.getBidsCount(invoiceId)));
		User loginUser = accountService.getLoginUser();
		List<Object> list = auctionRep
				.getBidsInfo(invoiceId, loginUser.getId());
		String advance = "";
		String interest = "";
		if (!CollectionUtils.isEmpty(list)) {
			Object object[] = (Object[]) list.get(0);
			advance = object[0] + "";
			interest = object[1] + "";
		}
		map.put("advance", advance);
		map.put("interest", interest);
		return map;
	}
}
