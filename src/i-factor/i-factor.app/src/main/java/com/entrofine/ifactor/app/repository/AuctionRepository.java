package com.entrofine.ifactor.app.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entrofine.ifactor.app.entity.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

	public List<Auction> findByFlowStatusInAndBuyerId(List<String> statusList,
			Long loginId);

	public Page<Auction> findByFlowStatusInAndBuyerIdAndInterestBetween(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal interestFrom, BigDecimal interestTo);

	/**
	 * b_mybid_open_auction.jsp页面的查询条件方法 add by xuliufang 2014-12-05
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 */

	public Page<Auction> findByFlowStatusInAndBuyerIdAndInvoiceFinInvAmountBetweenAndInvoiceReadyToSellAdvBetweenAndInvoiceReadyToSellIntBetweenOrderByCreateTimeDesc(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo,
			BigDecimal readyToSellAdvFrom, BigDecimal readyToSellAdvTo,
			BigDecimal readyToSellIntFrom, BigDecimal readyToSellIntTo);

	public Page<Auction> findByFlowStatusInAndBuyerIdAndInvoiceFinInvAmountBetween(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo);

	/**
	 * b_mybid_disbursed_auction.jsp 页面查询条件的方法
	 * 
	 * add luoxunda 2014/12/03
	 * 
	 * @param pageable
	 * @param statusList
	 * @param loginId
	 * @param interestFrom
	 * @param interestTo
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
	 * @return
	 */
	public Page<Auction> findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom, BigDecimal invoiceAmountTo/*
																	 * ,
																	 * BigDecimal
																	 * acceptedAdvanceFrom
																	 * ,
																	 * BigDecimal
																	 * acceptedAdvanceTo
																	 * ,
																	 * BigDecimal
																	 * acceptedInterestFrom
																	 * ,
																	 * BigDecimal
																	 * acceptedInterestTo
																	 * , String
																	 * disbursementDateFrom
																	 * , String
																	 * disbursementDateTo
																	 * , String
																	 * expectedSettlementDateFrom
																	 * , String
																	 * expectedSettlementDateTo
																	 */);

	/**
	 * b_mybid_invoice_in_settle.jsp 页面条件查询的方法
	 * 
	 * add luoxunda 2014/12/04
	 * 
	 * @param pageable
	 * @param statusList
	 * @param loginId
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
	 * @return
	 */
	public Page<Auction> findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom, BigDecimal invoiceAmountTo,
			BigDecimal noofOverdueDaysFrom, BigDecimal noofOverdueDaysTo,
			String fullySettled, String partiallySettled, String overdue,
			String settlementDateFrom, String settlementDateTo,
			String expectedSettlementDateFrom, String expectedSettlementDateTo);

	/**
	 * b_mybid_unsuccessful_auction.jsp 页面条件查询的方法
	 * 
	 * add luoxunda 2014/12/05
	 * 
	 * @param pageable
	 * @param statusList
	 * @param loginId
	 * @param interestFrom
	 * @param interestTo
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param readyToSellAdvanceFrom
	 * @param readyToSellAdvanceTo
	 * @param readyToSellInterestFrom
	 * @param readyToSellInterestTo
	 * @param auctionClosedDateFrom
	 * @param auctionClosedDateTo
	 * @return
	 */
	public Page<Auction> findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom, BigDecimal invoiceAmountTo,
			BigDecimal readyToSellAdvanceFrom, BigDecimal readyToSellAdvanceTo,
			BigDecimal readyToSellInterestFrom,
			BigDecimal readyToSellInterestTo, String auctionClosedDateFrom,
			String auctionClosedDateTo);

	/**
	 * b_mybid_delisted_auction.jsp 页面条件查询的方法
	 * 
	 * update luoxunda 2014/12/05
	 * 
	 * @param pageable
	 * @param statusList
	 * @param loginId
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
	 * @return
	 */
	public Page<Auction> findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom, BigDecimal invoiceAmountTo,
			BigDecimal readyToSellAdvanceFrom, BigDecimal readyToSellAdvanceTo,
			BigDecimal readyToSellInterestFrom,
			BigDecimal readyToSellInterestTo, String delistingDateFrom,
			String delistingDateTo, String servicesDelivery,
			String goodsDeliveryPerishable, String goodsDeliveryNonperishable,
			String expired, String unsuccesfulDisbursement,
			String unsuccesfulDisbursementExpired);

	/**
	 * b_mybid_final_closed_auction.jsp 页面条件查询的方法
	 * 
	 * update luoxunda 2014/12/05
	 * 
	 * @param pageable
	 * @param statusList
	 * @param loginId
	 * @param interestFrom
	 * @param interestTo
	 * @param invoiceAmountFrom
	 * @param invoiceAmountTo
	 * @param settlementDateFrom
	 * @param settlementDateTo
	 * @param expectedSettlementDateFrom
	 * @param expectedSettlementDateTo
	 * @return
	 */
	public Page<Auction> findByFlowStatusInAndBuyerIdAndInterestBetweenAndDiscountBetween(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom, BigDecimal invoiceAmountTo,
			String settlementDateFrom, String settlementDateTo,
			String expectedSettlementDateFrom, String expectedSettlementDateTo);

	@Query(value = ""
			+ " SELECT a FROM Auction a   \n "
			+ " WHERE  NOT EXISTS(SELECT 1 FROM Auction WHERE a.invoice.id=invoice.id \n "
			+ " and a.buyerId = buyerId and a.createTime<createTime) and a.buyerId =:buyerId and a.flowStatus = :flowStatus ")
	public Page<Auction> findByCurrentBuyerBestBid(
			@Param("buyerId") long buyerId,
			@Param("flowStatus") String flowStatus, Pageable pageable);

	@Query("SELECT count(id) FROM Auction a WHERE a.invoice.id = :invoiceId")
	public long getBidsCount(@Param("invoiceId") long invoiceId);

	// select t.discount,t.interest from if_app_auction t where t.invoice_id =
	// '13051'
	// and t.buyer_id = '40150' and rownum < 2 order by t.create_time desc

	// select t.discount,t.interest from if_app_auction t where t.invoice_id =
	// '13051'
	// and t.buyer_id = '40150' and rownum < 2 order by t.create_time desc
	@Query("SELECT a.discount,a.interest FROM Auction a WHERE a.invoice.id = :invoiceId AND a.buyerId = :buyerId AND rownum < 2 ORDER BY a.createTime DESC")
	public List<Object> getBidsInfo(@Param("invoiceId") long invoiceId,
			@Param("buyerId") long buyerId);
}
