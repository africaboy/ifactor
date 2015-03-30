package com.entrofine.ifactor.app.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.entrofine.ifactor.app.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
	public Page<Invoice> findByFlowStatusInAndReadyToSellIntBetweenAndSellerId(
			Pageable pageable, List<String> statusList,
			BigDecimal interestFrom, BigDecimal interestTo, Long sellerId);

	public Page<Invoice> findByAuctionStatusAndFlowStatusInAndReadyToSellIntBetween(
			Pageable pageable, String auctionStatus, List<String> statusList,
			BigDecimal interestFrom, BigDecimal interestTo);

	public Page<Invoice> findByFlowStatusIn(Pageable pageable,
			List<String> statusList);

	public Page<Invoice> findByReadyToSellIntBetweenAndSellerIdAndFlowStatusIsNull(
			Pageable pageable, BigDecimal interestFrom, BigDecimal interestTo,
			Long sellerId);

	public Page<Invoice> findByReadyToSellIntBetween(Pageable pageable,
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

	public Page<Invoice> findByFlowStatusInAndAutionsBuyerIdAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndBestBuyerAdvIsNotNull(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo,
			BigDecimal readyToSellAdvFrom, BigDecimal readyToSellAdvTo,
			BigDecimal readyToSellIntFrom, BigDecimal readyToSellIntTo);

	/**
	 * b_mybid_dealed_aution.jsp
	 * 
	 * @param pageable
	 * @param statusList
	 * @param loginId
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @return
	 */
	public Page<Invoice> findByFlowStatusInAndBuyerIdAndFinInvAmountBetween(
			Pageable pageable, List<String> statusList, Long loginId,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo);

	/**
	 * market-list.jsp 以及 openlist.jsp 页面的查询条件方法
	 * 
	 * add by xuliufang 2014-12-13
	 * 
	 * @param pageable
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param sellerId
	 * @return
	 */
	public Page<Invoice> findByFlowStatusInAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndFinRmngMatTermBetween(
			Pageable pageable, List<String> statusList,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo,
			BigDecimal readyToSellAdvFrom, BigDecimal readyToSellAdvTo,
			BigDecimal readyToSellIntFrom, BigDecimal readyToSellIntTo,
			Long finRmngMatTermFrom, Long finRmngMatTermTo);

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
	public Page<Invoice> findByFlowStatusInAndSellerId(Pageable pageable,
			List<String> statusList, Long sellerId);

	/**
	 * s_invoice_upload.jsp页面的查询条件方法
	 * 
	 * add by liulongxiang 2015-01-30
	 * 
	 * @param statusList
	 * @param saveDateFrom
	 * @param saveDateTo
	 * @param debtorName
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	public Page<Invoice> findByFlowStatusIsNullAndSellerIdOrderByCreateTimeDesc(
			Pageable pageable, Long sellerId);

	/**
	 * s_myinvoice_in_auction.jsp页面的查询条件方法
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
	public Page<Invoice> findByFlowStatusInAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndSellerId(
			Pageable pageable, List<String> statusList,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo,
			BigDecimal readyToSellAdvFrom, BigDecimal readyToSellAdvTo,
			BigDecimal readyToSellIntFrom, BigDecimal readyToSellIntTo,
			Long sellerId);

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
	public Page<Invoice> findByFlowStatusInAndFinInvAmountBetweenAndSellerId(
			Pageable pageable, List<String> statusList,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo,
			Long sellerId);

	/**
	 * openlist.jsp页面 查询条件的方法 add by xuliufang 2014-12-04
	 * 
	 * @param status
	 * @param finInvAmountFrom
	 * @param finInvAmountTo
	 * @param readyToSellAdvFrom
	 * @param readyToSellAdvTo
	 * @return
	 * 
	 *         public Page<Invoice>
	 *         findByFlowStatusInAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetweenAndCurBestOffrIntBetweenAndFinRmngMatTermBetweenAndFinStickerIdAndSellerIdAndDebtorName
	 *         ( Pageable pageable, List<String> statusList, BigDecimal
	 *         finInvAmountFrom, BigDecimal finInvAmountTo, BigDecimal
	 *         readyToSellAdvFrom, BigDecimal readyToSellAdvTo, BigDecimal
	 *         readyToSellIntFrom, BigDecimal readyToSellIntTo, Double
	 *         curBestOffrIntFrom, Double curBestOffrIntTo, Long
	 *         finRmngMatTermFrom, Long finRmngMatTermTo, String FinStickerId,
	 *         Long sellerId, String bedtorName);
	 */

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
	 * 
	 */
	public Page<Invoice> findByFlowStatusInAndFinInvAmountBetweenAndReadyToSellAdvBetweenAndReadyToSellIntBetween(
			Pageable pageable, List<String> statusList,
			BigDecimal finInvAmountFrom, BigDecimal finInvAmountTo,
			BigDecimal readyToSellAdvFrom, BigDecimal readyToSellAdvTo,
			BigDecimal readyToSellIntFrom, BigDecimal readyToSellIntTo);

	/**
	 * s_myinvoice_in_disbursement.jsp 页面的条件查询方法
	 * 
	 * add luoxunda 2014/12/01
	 * 
	 * @param pageable
	 * @param statusList
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
	 * @param sellerId
	 * @return FinDueDateAccToContBetweenAnd
	 */
	public Page<Invoice> findByFlowStatusInAndFinInvAmountBetweenAndBestBuyerAdvBetweenAndBestBuyerIntBetweenAndSellerId(
			Pageable pageable, List<String> statusList,
			BigDecimal invoiceAmountFrom, BigDecimal invoiceAmountTo,
			BigDecimal bestBuyerAdvFrom, BigDecimal bestBuyerAdvTo,
			BigDecimal bestBuyerIntFrom, BigDecimal bestBuyerIntTo,
			Long sellerId);

	/**
	 * add by luoxunda 2015/03/24
	 * 
	 * @param invoice
	 * @return
	 */
	Invoice findByFinStickerId(String finStickerId);

	/**
	 * s_myinvoice_in_settlement.jsp 页面查询条件的方法
	 * 
	 * add luoxunda 2014/12/02
	 * 
	 * @param pageable
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param sellerId
	 * @return
	 */
	public Page<Invoice> findByFlowStatusInAndReadyToSellIntBetweenAndFinInvAmountBetweenAndSellerId(
			Pageable pageable, List<String> statusList,
			BigDecimal interestFrom,
			BigDecimal interestTo,
			BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo,
			// BigDecimal noofoverduedaysFrom, BigDecimal noofoverduedaysTo,
			String settlementDateFrom, String settlementDateTo,
			String expectedSettlementDateFrom, String expectedSettlementDateTo,
			String fullySettled, String partiallySettled, String overdue,
			Long sellerId);

	/**
	 * s_myinvoice_delisted.jsp 页面的条件查询方法
	 * 
	 * add luoxunda 2014/12/03
	 * 
	 * @param pageable
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param sellerId
	 * @return
	 */
	public Page<Invoice> findByFlowStatusInAndReadyToSellIntBetweenAndFinInvIssDateAndSellerId(
			Pageable pageable, List<String> statusList,
			BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom, BigDecimal invoiceAmountTo,
			String delistingDateFrom, String delistingDateTo, String expired,
			String unsuccessfulDisbursement,
			String unsuccessfulDisbursementExpired, String servicesDelivery,
			String goodsDeliveryPerishable, String goodsDeliveryNonperishable,
			Long sellerId);

	/**
	 * s_myinvoice_final_closed.jsp 页面条件的查询方法
	 * 
	 * add luoxunda 2014/12/03
	 * 
	 * @param pageable
	 * @param statusList
	 * @param interestFrom
	 * @param interestTo
	 * @param sellerId
	 * @return
	 */
	public Page<Invoice> findByFlowStatusInAndReadyToSellIntBetweenAndSerialNumInvoiceBetweenAndSellerId(
			Pageable pageable, List<String> statusList,
			BigDecimal interestFrom, BigDecimal interestTo,
			BigDecimal invoiceAmountFrom,
			BigDecimal invoiceAmountTo,
			// BigDecimal noofOverdueDaysFrom, BigDecimal noofOverdueDaysTo,
			String settlementDateFrom, String settlementDateTo,
			String expectedSettlementDateFrom, String expectedSettlementDateTo,
			Long sellerId);

	/**
	 * add by xuliufang 2015-01-05
	 * 
	 * @param pageable
	 * @param statusList
	 * @param finInvAmountFrom
	 * @param readyToSellAdvFrom
	 * @param readyToSellIntFrom
	 * @param finRmngMatTermFrom
	 * @return
	 */
	public Page<Invoice> findByFlowStatusInAndFinInvAmountAndSellerIdAndDebtorNameAndReadyToSellAdvAndReadyToSellIntAndFinRmngMatTermAndFinStickerId(
			Pageable pageable, List<String> statusList,
			BigDecimal finInvAmountF, Long sellerId, String debtorName,
			BigDecimal readyToSellAdvF, BigDecimal readyToSellIntF,
			Long finRmngMatTerm, String finStickerId);

	/**
	 * add by xuliufang 2014-12-22
	 * 
	 * @return
	 */
	public Invoice findByDebtorName(String debtorName);

	/**
	 * add by xuliufang 2014-12-22
	 * 
	 * @return
	 */
	public Invoice findBySellerId(Long id);

	// Aggregate invoice Report
	// Aggregate invoice Reprot - By Region
	@Query(value = ""
			+ "SELECT iau2.com_region  \n"
			+ "-- uploaded \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Pending for completeness and correctness check'  THEN 0 ELSE 0 END) AS noUploaed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Pending for completeness and correctness check'  THEN iai.fin_inv_amount ELSE 0 END) AS amtUploaded \n"
			+ "-- in processing \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Pending for manual check'  THEN 0 ELSE 0 END) AS noInProcessing \n"
			+ ", SUM(CASE WHEN iai.flow_status='Pending for manual check'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInProcessing \n"
			+ "-- rejected \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Rejected'  THEN 0 ELSE 0 END) AS noRejected \n"
			+ ", SUM(CASE WHEN iai.flow_status='Rejected'  THEN iai.fin_inv_amount ELSE 0 END) AS amtRejected \n"
			+ "-- accepted \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Release invoice'  THEN 0 ELSE 0 END) AS noAccepted \n"
			+ ", SUM(CASE WHEN iai.flow_status='Release invoice'  THEN iai.fin_inv_amount ELSE 0 END) AS amtAccepted \n"
			+ "-- in auction (bidded) \n"
			+ ", COUNT(CASE WHEN iai.flow_status='In Auction(Bidded)'  THEN 0 ELSE 0 END) AS noInAuctionBidded \n"
			+ ", SUM(CASE WHEN iai.flow_status='In Auction(Bidded)'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInAuctionBidded \n"
			+ "-- in auction (unbidded) \n"
			+ ", COUNT(CASE WHEN iai.flow_status='In Auction(Unbidded)'  THEN 0 ELSE 0 END) AS noInAuctionUnbidded \n"
			+ ", SUM(CASE WHEN iai.flow_status='In Auction(Unbidded)'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInAuctionUnbidded \n"
			+ "-- delisted \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Delisted'  THEN 0 ELSE 0 END) AS noDelisted \n"
			+ ", SUM(CASE WHEN iai.flow_status='Delisted'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDelisted \n"
			+ "-- dealed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Dealed'  THEN 0 ELSE 0 END) AS noDealed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Dealed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDealed \n"
			+ "-- unsuccessfully disbursed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Unsuccessfully disbursed'  THEN 0 ELSE 0 END) AS noUnsuccessfullyDisbursed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Unsuccessfully disbursed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtUnsuccessfullyDisbursed \n"
			+ "-- disbursed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Disbursed'  THEN 0 ELSE 0 END) AS noDisbursed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Disbursed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDisbursed \n"
			+ "-- settled \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Settled'  THEN 0 ELSE 0 END) AS noSettled \n"
			+ ", SUM(CASE WHEN iai.flow_status='Settled'  THEN iai.fin_inv_amount ELSE 0 END) AS amtSettled \n"
			+ "-- overdue \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Overdue'  THEN 0 ELSE 0 END) AS noOverdue \n"
			+ ", SUM(CASE WHEN iai.flow_status='Overdue'  THEN iai.fin_inv_amount ELSE 0 END) AS amtOverdue \n"
			+ "FROM if_app_invoice iai \n"
			+ "INNER JOIN ( \n"
			+ "  SELECT iau.id AS id , iasa.com_region AS com_region \n"
			+ "  FROM if_app_user iau \n"
			+ "  inner join if_app_userrole iaur on iau.id=iaur.userid  \n"
			+ "  inner join if_app_role iar on iaur.roleid = iar.id and iar.name='SELLER' \n"
			+ "  inner join if_app_seller_apply iasa on iasa.seller_id=iau.id  \n"
			+ ") iau2 ON iau2.id = iai.seller_id \n"
			+ "WHERE iai.seller_id = ?1\n"
			+ "AND iai.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND iai.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY iau2.com_region \n", nativeQuery = true)
	List<Object> aggregateInvoiceRegionReprot(Long sellerId, String startDate,
			String endDate);

	// Aggregate invoice report - by expected settlement date
	@Query(value = (""
			+ "SELECT to_char(iai.fin_exp_pmt_date,'yyyy-MM-dd') AS expectedSettlementDate \n"
			+ "-- uploaded \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Pending for completeness and correctness check'  THEN 0 ELSE 0 END) AS noUploaed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Pending for completeness and correctness check'  THEN iai.fin_inv_amount ELSE 0 END) AS amtUploaded \n"
			+ "-- in processing \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Pending for manual check'  THEN 0 ELSE 0 END) AS noInProcessing \n"
			+ ", SUM(CASE WHEN iai.flow_status='Pending for manual check'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInProcessing \n"
			+ "-- rejected \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Rejected'  THEN 0 ELSE 0 END) AS noRejected \n"
			+ ", SUM(CASE WHEN iai.flow_status='Rejected'  THEN iai.fin_inv_amount ELSE 0 END) AS amtRejected \n"
			+ "-- accepted \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Release invoice'  THEN 0 ELSE 0 END) AS noAccepted \n"
			+ ", SUM(CASE WHEN iai.flow_status='Release invoice'  THEN iai.fin_inv_amount ELSE 0 END) AS amtAccepted \n"
			+ "-- in auction (bidded) \n"
			+ ", COUNT(CASE WHEN iai.flow_status='In Auction(Bidded)'  THEN 0 ELSE 0 END) AS noInAuctionBidded \n"
			+ ", SUM(CASE WHEN iai.flow_status='In Auction(Bidded)'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInAuctionBidded \n"
			+ "-- in auction (unbidded) \n"
			+ ", COUNT(CASE WHEN iai.flow_status='In Auction(Unbidded)'  THEN 0 ELSE 0 END) AS noInAuctionUnbidded \n"
			+ ", SUM(CASE WHEN iai.flow_status='In Auction(Unbidded)'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInAuctionUnbidded \n"
			+ "-- delisted \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Delisted'  THEN 0 ELSE 0 END) AS noDelisted \n"
			+ ", SUM(CASE WHEN iai.flow_status='Delisted'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDelisted \n"
			+ "-- dealed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Dealed'  THEN 0 ELSE 0 END) AS noDealed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Dealed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDealed \n"
			+ "-- unsuccessfully disbursed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Unsuccessfully disbursed'  THEN 0 ELSE 0 END) AS noUnsuccessfullyDisbursed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Unsuccessfully disbursed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtUnsuccessfullyDisbursed \n"
			+ "-- disbursed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Disbursed'  THEN 0 ELSE 0 END) AS noDisbursed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Disbursed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDisbursed \n"
			+ "-- settled \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Settled'  THEN 0 ELSE 0 END) AS noSettled \n"
			+ ", SUM(CASE WHEN iai.flow_status='Settled'  THEN iai.fin_inv_amount ELSE 0 END) AS amtSettled \n"
			+ "-- overdue \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Overdue'  THEN 0 ELSE 0 END) AS noOverdue \n"
			+ ", SUM(CASE WHEN iai.flow_status='Overdue'  THEN iai.fin_inv_amount ELSE 0 END) AS amtOverdue \n"
			+ "FROM if_app_invoice iai \n"
			+ "INNER JOIN ( \n"
			+ "  SELECT iau.id AS id , iasa.com_region AS com_region \n"
			+ "  FROM if_app_user iau \n"
			+ "  inner join if_app_userrole iaur on iau.id=iaur.userid  \n"
			+ "  inner join if_app_role iar on iaur.roleid = iar.id and iar.name='SELLER' \n"
			+ "  inner join if_app_seller_apply iasa on iasa.seller_id=iau.id  \n"
			+ ") iau2 ON iau2.id = iai.seller_id \n"
			+ "WHERE iai.seller_id = ?1 \n"
			+ "AND iai.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND iai.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY to_char(iai.fin_exp_pmt_date,'yyyy-MM-dd') \n" + " \n"
			+ ""), nativeQuery = true)
	List<Object> aggregateInvoiceExpectedSettlementDateReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT iau2.smeSegment AS smeSegment \n"
			+ "-- uploaded \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Pending for completeness and correctness check'  THEN 0 ELSE 0 END) AS noUploaed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Pending for completeness and correctness check'  THEN iai.fin_inv_amount ELSE 0 END) AS amtUploaded \n"
			+ "-- in processing \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Pending for manual check'  THEN 0 ELSE 0 END) AS noInProcessing \n"
			+ ", SUM(CASE WHEN iai.flow_status='Pending for manual check'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInProcessing \n"
			+ "-- rejected \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Rejected'  THEN 0 ELSE 0 END) AS noRejected \n"
			+ ", SUM(CASE WHEN iai.flow_status='Rejected'  THEN iai.fin_inv_amount ELSE 0 END) AS amtRejected \n"
			+ "-- accepted \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Release invoice'  THEN 0 ELSE 0 END) AS noAccepted \n"
			+ ", SUM(CASE WHEN iai.flow_status='Release invoice'  THEN iai.fin_inv_amount ELSE 0 END) AS amtAccepted \n"
			+ "-- in auction (bidded) \n"
			+ ", COUNT(CASE WHEN iai.flow_status='In Auction(Bidded)'  THEN 0 ELSE 0 END) AS noInAuctionBidded \n"
			+ ", SUM(CASE WHEN iai.flow_status='In Auction(Bidded)'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInAuctionBidded \n"
			+ "-- in auction (unbidded) \n"
			+ ", COUNT(CASE WHEN iai.flow_status='In Auction(Unbidded)'  THEN 0 ELSE 0 END) AS noInAuctionUnbidded \n"
			+ ", SUM(CASE WHEN iai.flow_status='In Auction(Unbidded)'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInAuctionUnbidded \n"
			+ "-- delisted \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Delisted'  THEN 0 ELSE 0 END) AS noDelisted \n"
			+ ", SUM(CASE WHEN iai.flow_status='Delisted'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDelisted \n"
			+ "-- dealed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Dealed'  THEN 0 ELSE 0 END) AS noDealed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Dealed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDealed \n"
			+ "-- unsuccessfully disbursed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Unsuccessfully disbursed'  THEN 0 ELSE 0 END) AS noUnsuccessfullyDisbursed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Unsuccessfully disbursed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtUnsuccessfullyDisbursed \n"
			+ "-- disbursed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Disbursed'  THEN 0 ELSE 0 END) AS noDisbursed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Disbursed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDisbursed \n"
			+ "-- settled \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Settled'  THEN 0 ELSE 0 END) AS noSettled \n"
			+ ", SUM(CASE WHEN iai.flow_status='Settled'  THEN iai.fin_inv_amount ELSE 0 END) AS amtSettled \n"
			+ "-- overdue \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Overdue'  THEN 0 ELSE 0 END) AS noOverdue \n"
			+ ", SUM(CASE WHEN iai.flow_status='Overdue'  THEN iai.fin_inv_amount ELSE 0 END) AS amtOverdue \n"
			+ "FROM if_app_invoice iai \n"
			+ "INNER JOIN ( \n"
			+ "  SELECT iau.id AS id , iasa.etype AS smeSegment \n"
			+ "  FROM if_app_user iau \n"
			+ "  inner join if_app_userrole iaur on iau.id=iaur.userid  \n"
			+ "  inner join if_app_role iar on iaur.roleid = iar.id and iar.name='SELLER' \n"
			+ "  inner join if_app_seller_apply iasa on iasa.seller_id=iau.id  \n"
			+ ") iau2 ON iau2.id = iai.seller_id \n"
			+ "WHERE iai.seller_id = ?1                                        \n"
			+ "AND iai.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND iai.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY iau2.smeSegment \n" + " \n" + "", nativeQuery = true)
	List<Object> aggregateInvoiceSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT iai.rating AS sellerRating \n"
			+ "-- uploaded \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Pending for completeness and correctness check'  THEN 0 ELSE 0 END) AS noUploaed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Pending for completeness and correctness check'  THEN iai.fin_inv_amount ELSE 0 END) AS amtUploaded \n"
			+ "-- in processing \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Pending for manual check'  THEN 0 ELSE 0 END) AS noInProcessing \n"
			+ ", SUM(CASE WHEN iai.flow_status='Pending for manual check'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInProcessing \n"
			+ "-- rejected \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Rejected'  THEN 0 ELSE 0 END) AS noRejected \n"
			+ ", SUM(CASE WHEN iai.flow_status='Rejected'  THEN iai.fin_inv_amount ELSE 0 END) AS amtRejected \n"
			+ "-- accepted \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Release invoice'  THEN 0 ELSE 0 END) AS noAccepted \n"
			+ ", SUM(CASE WHEN iai.flow_status='Release invoice'  THEN iai.fin_inv_amount ELSE 0 END) AS amtAccepted \n"
			+ "-- in auction (bidded) \n"
			+ ", COUNT(CASE WHEN iai.flow_status='In Auction(Bidded)'  THEN 0 ELSE 0 END) AS noInAuctionBidded \n"
			+ ", SUM(CASE WHEN iai.flow_status='In Auction(Bidded)'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInAuctionBidded \n"
			+ "-- in auction (unbidded) \n"
			+ ", COUNT(CASE WHEN iai.flow_status='In Auction(Unbidded)'  THEN 0 ELSE 0 END) AS noInAuctionUnbidded \n"
			+ ", SUM(CASE WHEN iai.flow_status='In Auction(Unbidded)'  THEN iai.fin_inv_amount ELSE 0 END) AS amtInAuctionUnbidded \n"
			+ "-- delisted \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Delisted'  THEN 0 ELSE 0 END) AS noDelisted \n"
			+ ", SUM(CASE WHEN iai.flow_status='Delisted'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDelisted \n"
			+ "-- dealed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Dealed'  THEN 0 ELSE 0 END) AS noDealed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Dealed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDealed \n"
			+ "-- unsuccessfully disbursed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Unsuccessfully disbursed'  THEN 0 ELSE 0 END) AS noUnsuccessfullyDisbursed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Unsuccessfully disbursed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtUnsuccessfullyDisbursed \n"
			+ "-- disbursed \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Disbursed'  THEN 0 ELSE 0 END) AS noDisbursed \n"
			+ ", SUM(CASE WHEN iai.flow_status='Disbursed'  THEN iai.fin_inv_amount ELSE 0 END) AS amtDisbursed \n"
			+ "-- settled \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Settled'  THEN 0 ELSE 0 END) AS noSettled \n"
			+ ", SUM(CASE WHEN iai.flow_status='Settled'  THEN iai.fin_inv_amount ELSE 0 END) AS amtSettled \n"
			+ "-- overdue \n"
			+ ", COUNT(CASE WHEN iai.flow_status='Overdue'  THEN 0 ELSE 0 END) AS noOverdue \n"
			+ ", SUM(CASE WHEN iai.flow_status='Overdue'  THEN iai.fin_inv_amount ELSE 0 END) AS amtOverdue \n"
			+ "FROM if_app_invoice iai \n"
			+ "INNER JOIN ( \n"
			+ "  SELECT iau.id AS id , iasa.etype \n"
			+ "  FROM if_app_user iau \n"
			+ "  inner join if_app_userrole iaur on iau.id=iaur.userid  \n"
			+ "  inner join if_app_role iar on iaur.roleid = iar.id and iar.name='SELLER' \n"
			+ "  inner join if_app_seller_apply iasa on iasa.seller_id=iau.id             \n"
			+ ") iau2 ON iau2.id = iai.seller_id \n"
			+ "WHERE iai.seller_id = ?1                                                   \n"
			+ "AND iai.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND iai.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY iai.rating \n", nativeQuery = true)
	List<Object> aggregateInvoiceSellerRatingReport(Long sellerId,
			String startDate, String endDate);

	// In Auction report
	// In Auction for VPBank report
	@Query(value = ""
			+ "SELECT iai.update_time AS releaseDate , iai.id, iai.fin_inv_amount AS invoiceAmount , iai.seller_id AS sellerId, iai.rating AS sellerRating, iai.debtor_name AS debtorId \n"
			+ ", iai.fin_exp_pmt_date AS expectedSettlementDate \n"
			+ ", TRUNC(TO_NUMBER( SUBSTR( (iai.fin_exp_pmt_date - TO_TIMESTAMP(SYSDATE)) , 1, INSTR((iai.fin_exp_pmt_date - TO_TIMESTAMP(SYSDATE)),' ') ) ) ) AS remainingTerm \n"
			+ ", iai.fin_due_date_acc_to_cont AS delistingDate \n"
			+ ", TRUNC(TO_NUMBER( SUBSTR( (iai.fin_due_date_acc_to_cont - TO_TIMESTAMP(SYSDATE)) , 1, INSTR((iai.fin_due_date_acc_to_cont - TO_TIMESTAMP(SYSDATE)),' ') ) ) ) AS remainingDaysTillDelisting \n"
			+ ", iaa.noOfBids AS noOfBids \n"
			+ ", iai.ready_to_sell_adv AS readyToSellAdv \n"
			+ ", iai.ready_to_sell_int AS readyToSellInt \n"
			+ ", iai.best_buyer_adv AS cboa \n"
			+ ", iai.best_buyer_int AS cboi \n"
			+ "FROM if_app_invoice iai  \n"
			+ "INNER JOIN ( \n"
			+ "  SELECT iaa2.invoice_id AS invoice_id, COUNT(1) AS noOfBids \n"
			+ "  FROM if_app_auction iaa2 \n"
			+ "  INNER JOIN if_app_invoice iai2 ON iai2.id=iaa2.invoice_id \n"
			+ "  GROUP BY iaa2.invoice_id \n"
			+ ") iaa ON iaa.invoice_id = iai.id AND iai.auction_status='IAS_02' \n"
			+ "WHERE iai.seller_id=?1                                           \n"
			+ "AND iai.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND iai.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ " \n", nativeQuery = true)
	List<Object> inAuctionForVPBank(Long sellerId, String startDate,
			String endDate);

	// In Auction for Public report
	@Query(value = ""
			+ "SELECT iai.update_time AS releaseDate , iai.id, iai.fin_inv_amount AS invoiceAmount , iai.seller_id AS sellerId, iai.rating AS sellerRating \n"
			+ ", iai.seller_id AS debtorId , iai.debtor_name AS debtorName \n"
			+ ", iai.fin_exp_pmt_date AS expectedSettlementDate \n"
			+ ", TRUNC(TO_NUMBER( SUBSTR( (iai.fin_exp_pmt_date - TO_TIMESTAMP(SYSDATE)) , 1, INSTR((iai.fin_exp_pmt_date - TO_TIMESTAMP(SYSDATE)),' ') ) ) ) AS remainingTerm \n"
			+ ", iai.fin_due_date_acc_to_cont AS delistingDate \n"
			+ ", TRUNC(TO_NUMBER( SUBSTR( (iai.fin_due_date_acc_to_cont - TO_TIMESTAMP(SYSDATE)) , 1, INSTR((iai.fin_due_date_acc_to_cont - TO_TIMESTAMP(SYSDATE)),' ') ) ) ) AS remainingDaysTillDelisting \n"
			+ ", iaa.noOfBids AS noOfBids \n"
			+ ", iai.ready_to_sell_adv AS readyToSellAdv \n"
			+ ", iai.ready_to_sell_int AS readyToSellInt \n"
			+ ", iai.best_buyer_adv AS cboa \n"
			+ ", iai.best_buyer_int AS cboi \n"
			+ "FROM if_app_invoice iai  \n"
			+ "INNER JOIN ( \n"
			+ "  SELECT iaa2.invoice_id AS invoice_id, COUNT(1) AS noOfBids \n"
			+ "  FROM if_app_auction iaa2 \n"
			+ "  INNER JOIN if_app_invoice iai2 ON iai2.id=iaa2.invoice_id \n"
			+ "  GROUP BY iaa2.invoice_id \n"
			+ ") iaa ON iaa.invoice_id = iai.id AND iai.auction_status='IAS_03' \n"
			+ "WHERE iai.seller_id=?1                                           \n"
			+ "AND iai.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND iai.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ " \n", nativeQuery = true)
	List<Object> inAuctionForPublic(Long sellerId, String startDate,
			String endDate);

	// Seller Report
	// Seller Report - Seller details
	@Query(value = ""
			+ "select u.id, 0.0 AS seller_rating, sa.com_region  \n"
			+ ", COUNT(i.id) AS noOfInvSubmitted \n"
			+ ", COUNT(CASE WHEN i.flow_status='Release invoice' THEN 1 ELSE 0 END) AS noOfInvAccepted \n"
			+ ", COUNT(CASE WHEN i.flow_status='Release invoice' THEN 1.0 /*i.fin_inv_amount*/ ELSE 0.0 END) AS amountOfInvAccepted \n"
			+ ", COUNT(0) AS noOfInvDisbursed \n"
			+ ", SUM(0.0) AS amountOfInvDisbursed \n"
			+ ", 0 as totalReturn \n"
			+ ", case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_adv*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAvgAdv  \n"
			+ ", case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_int*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAvgInt  \n"
			+ ", COUNT(0) AS cancellations \n"
			+ "from if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER' \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id            \n"
			+ "left join if_app_invoice i ON i.seller_id = u.id                 \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "group by u.id, sa.com_region", nativeQuery = true)
	List<Object> sellerDetailsReport(Long sellerId, String startDate,
			String endDate);

	// Seller Report -Seller By Region
	@Query(value = ""
			+ "SELECT sa.com_region AS region , 'Applied' AS coltype , COUNT(u.id)  \n"
			+ "FROM if_app_user u  \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid   \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY sa.com_region \n", nativeQuery = true)
	List<Object> sellerAppliedRegionReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT sa.com_region AS region , 'Accepted' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid   \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY sa.com_region \n", nativeQuery = true)
	List<Object> sellerAcceptedRegionReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT sa.com_region AS region ,'financed' AS coltype , COUNT(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid   \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "inner join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "inner join if_app_invoice i on i.seller_id= u.id "
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY sa.com_region \n", nativeQuery = true)
	List<Object> sellerFinancedRegionReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT   \n"
			+ "   sa.com_region AS region ,'weightedAdvAndInt' AS coltype  \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_adv*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageAdvance \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_int*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageInterest \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid   \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "INNER JOIN if_app_auction a1 ON a1.seller_id = u.id \n"
			+ "inner join if_app_invoice i on i.id = a1.invoice_id \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY sa.com_region \n", nativeQuery = true)
	List<Object> sellerWeightedAdvAndIntRegionReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT sa.com_region , 'fraudBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid   \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY sa.com_region \n", nativeQuery = true)
	List<Object> sellerFraudBlacklistedRegionReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT sa.com_region, 'cancellationBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid   \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY sa.com_region \n", nativeQuery = true)
	List<Object> sellerCancellationBlacklistedRegionReport(Long sellerId,
			String startDate, String endDate);

	// Seller Report - Seller by SME-segment
	@Query(value = ""
			+ "SELECT sa.etype , 'Applied' AS coltype , COUNT(u.id)  \n"
			+ "FROM if_app_user u  \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid AND u.id=?1 \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY sa.etype \n", nativeQuery = true)
	List<Object> sellerAppliedSmeSegmentReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT sa.etype , 'Accepted' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY sa.etype \n", nativeQuery = true)
	List<Object> sellerAcceptedSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT sa.etype ,'financed' AS coltype , COUNT(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid AND u.id=?1 \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "inner join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "inner join if_app_invoice i on i.seller_id= u.id "
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"

			+ "GROUP BY sa.etype \n", nativeQuery = true)
	List<Object> sellerFinancedSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT   \n"
			+ "   sa.etype ,'weightedAdvAndInt' AS coltype  \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_adv*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageAdvance \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_int*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageInterest \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid AND u.id=?1 \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "inner join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "inner join if_app_invoice i on i.seller_id= u.id "
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"

			+ "GROUP BY sa.etype \n", nativeQuery = true)
	List<Object> sellerWeightedAdvAndIntSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT sa.etype , 'fraudBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid AND u.id=?1 \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"

			+ "GROUP BY sa.etype \n", nativeQuery = true)
	List<Object> sellerFraudBlacklistedSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT sa.etype , 'cancellationBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid AND u.id=?1 \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='SELLER'  \n"
			+ "left join if_app_seller_apply sa on sa.seller_id=u.id  \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND sa.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND sa.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"

			+ "GROUP BY sa.etype \n", nativeQuery = true)
	List<Object> sellerCancellationBlacklistedSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	// Buyer Report
	// Buyer details
	@Query(value = ""
			+ "select u.id, ba.region, count(a1.id), count(a2.id) \n"
			+ " , case WHEN count(a1.id) is not null and count(a1.id)<>0 then count(a2.id)/count(a2.id) ELSE 0 END as percentOfSuccBid \n"
			+ " , 0 as totalReturn \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_adv*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageAdvance \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_int*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageInterest \n"
			+ " from if_app_user u \n"
			+ " inner join if_app_userrole ur on u.id=ur.userid \n"
			+ " inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ " left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ " left join if_app_auction a1 on a1.buyer_id=u.id \n"
			+ " left join if_app_invoice i on i.id = a1.invoice_id \n"
			+ " left join if_app_auction a2 on a2.buyer_id=u.id and a2.flow_status='After auction' \n"
			+ "WHERE u.id=?1                                                    \n"
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ " group by u.id, ba.region \n", nativeQuery = true)
	List<Object> buyerDetailsReport(Long sellerId, String startDate,
			String endDate);

	// By Region
	@Query(value = ""
			+ "SELECT ba.region AS region , 'Applied' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='PRE_BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerAppliedRegionReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT ba.region AS region , 'Accepted' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerAcceptedRegionReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT ba.region AS region ,'Invested' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "AND EXISTS ( \n" + "  SELECT 1  \n"
			+ "  FROM if_app_auction iaa  \n"
			+ "  WHERE iaa.buyer_id = u.id \n" + ") \n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerInvestedRegionReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT   \n"
			+ " ba.region AS region ,'weightedAdvAndInt' AS coltype  \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_adv*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageAdvance \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_int*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageInterest \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "INNER JOIN if_app_auction a1 ON a1.buyer_id = u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerWeightedAdvAndIntRegionReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT ba.region, 'regulatoryBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerRegulatoryBlacklistedRegionReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT ba.region, 'cancellationBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerCancellationBlacklistedRegionReport(Long sellerId,
			String startDate, String endDate);

	// By SMESegment
	@Query(value = ""
			+ "SELECT  iasa2.etype AS smeSegment , 'Applied' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='PRE_BUYER' \n"
			+ "inner join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i ON i.buyer_id=u.id \n"
			+ "INNER join if_app_user u2 ON u2.id = i.seller_id \n"
			+ "inner join if_app_userrole ur2 on u2.id=ur2.userid AND u2.id=?1 \n"
			+ "inner join if_app_role r2 on ur2.roleid = r2.id and r2.name='SELLER' \n"
			+ "inner join if_app_seller_apply iasa2 ON iasa2.seller_id = u2.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY iasa2.etype \n", nativeQuery = true)
	List<Object> buyerAppliedSmeSegmentReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT  iasa2.etype AS smeSegment , 'Accepted' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u  \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "inner join if_app_buyer_apply ba on ba.buyer_id=u.id  \n"
			+ "inner join if_app_invoice i ON i.buyer_id=u.id  \n"
			+ "INNER join if_app_user u2 ON u2.id = i.seller_id AND u2.id=?1 \n"
			+ "inner join if_app_userrole ur2 on u2.id=ur2.userid \n"
			+ "inner join if_app_role r2 on ur2.roleid = r2.id and r2.name='SELLER' \n"
			+ "inner join if_app_seller_apply iasa2 ON iasa2.seller_id = u2.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY iasa2.etype \n", nativeQuery = true)
	List<Object> buyerAcceptedSmeSegmentReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT  iasa2.etype AS smeSegment ,'Invested' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "inner join if_app_buyer_apply ba on ba.buyer_id=u.id  \n"
			+ "inner join if_app_invoice i ON i.buyer_id=u.id \n"
			+ "INNER join if_app_user u2 ON u2.id = i.seller_id AND u2.id=?1 \n"
			+ "inner join if_app_userrole ur2 on u2.id=ur2.userid   \n"
			+ "inner join if_app_role r2 on ur2.roleid = r2.id and r2.name='SELLER' \n"
			+ "inner join if_app_seller_apply iasa2 ON iasa2.seller_id = u2.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "AND EXISTS ( \n" + "  SELECT 1  \n"
			+ "  FROM if_app_auction iaa  \n"
			+ "  WHERE iaa.buyer_id = u.id \n" + ") \n"
			+ "GROUP BY iasa2.etype \n", nativeQuery = true)
	List<Object> buyerInvestedSmeSegmentReport(Long sellerId, String startDate,
			String endDate);

	@Query(value = ""
			+ "SELECT \n"
			+ "   iasa2.etype AS smeSegment ,'weightedAdvAndInt' AS coltype \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_adv*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageAdvance \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_int*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageInterest \n"
			+ "FROM if_app_user u  \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid   \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER'  \n"
			+ "inner join if_app_buyer_apply ba on ba.buyer_id=u.id  \n"
			+ "inner join if_app_invoice i ON i.buyer_id=u.id \n"
			+ "INNER join if_app_user u2 ON u2.id = i.seller_id AND u2.id=?1 \n"
			+ "inner join if_app_userrole ur2 on u2.id=ur2.userid   \n"
			+ "inner join if_app_role r2 on ur2.roleid = r2.id and r2.name='SELLER'  \n"
			+ "inner join if_app_seller_apply iasa2 ON iasa2.seller_id = u2.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY iasa2.etype \n", nativeQuery = true)
	List<Object> buyerWeightedAvgAdvAndIntSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT iasa2.etype AS smeSegment, 'regulatoryBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "inner join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i ON i.buyer_id=u.id \n"
			+ "INNER join if_app_user u2 ON u2.id = i.seller_id AND u2.id=?1 \n"
			+ "inner join if_app_userrole ur2 on u2.id=ur2.userid \n"
			+ "inner join if_app_role r2 on ur2.roleid = r2.id and r2.name='SELLER' \n"
			+ "inner join if_app_seller_apply iasa2 ON iasa2.seller_id = u2.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY iasa2.etype \n", nativeQuery = true)
	List<Object> buyerRegulatoryBlacklistedSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT iasa2.etype AS smeSegment, 'cancellationBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "inner join if_app_buyer_apply ba on ba.buyer_id=u.id  \n"
			+ "inner join if_app_invoice i ON i.buyer_id=u.id \n"
			+ "INNER join if_app_user u2 ON u2.id = i.seller_id AND u2.id=?1 \n"
			+ "inner join if_app_userrole ur2 on u2.id=ur2.userid \n"
			+ "inner join if_app_role r2 on ur2.roleid = r2.id and r2.name='SELLER' \n"
			+ "inner join if_app_seller_apply iasa2 ON iasa2.seller_id = u2.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY iasa2.etype \n", nativeQuery = true)
	List<Object> buyerCancellationBlacklistedSmeSegmentReport(Long sellerId,
			String startDate, String endDate);

	// Seller-rating
	@Query(value = ""
			+ "SELECT ba.region AS region , 'Applied' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='PRE_BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerAppliedSellerRatingReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT ba.region AS region , 'Accepted' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerAcceptedSellerRatingReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT ba.region AS region ,'Invested' AS coltype , COUNT(u.id) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "AND EXISTS ( \n" + "  SELECT 1  \n"
			+ "  FROM if_app_auction iaa  \n"
			+ "  WHERE iaa.buyer_id = u.id \n" + ") \n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerInvestedSellerRatingReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT   \n"
			+ " ba.region AS region ,'weightedAdvAndInt' AS coltype  \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_adv*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageAdvance \n"
			+ " , case when sum(i.fin_inv_amount) is not null and sum(i.fin_inv_amount)<>0 then sum(i.ready_to_sell_int*i.fin_inv_amount)/sum(i.fin_inv_amount) else 0 end as weightedAverageInterest \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "INNER JOIN if_app_auction a1 ON a1.buyer_id = u.id \n"
			+ "inner join if_app_invoice i on i.id = a1.invoice_id And i.buyer_id=u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerWeightedAdvAndIntSellerRatingReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT ba.region, 'regulatoryBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerRegulatoryBlacklistedSellerRatingReport(Long sellerId,
			String startDate, String endDate);

	@Query(value = ""
			+ "SELECT ba.region, 'cancellationBlacklisted' as coltype \n"
			+ " , count(0) \n"
			+ "FROM if_app_user u \n"
			+ "inner join if_app_userrole ur on u.id=ur.userid  \n"
			+ "inner join if_app_role r on ur.roleid = r.id and r.name='BUYER' \n"
			+ "left join if_app_buyer_apply ba on ba.buyer_id=u.id \n"
			+ "inner join if_app_invoice i on i.buyer_id = u.id \n"
			+ "WHERE i.seller_id=?1 "
			+ "AND ba.update_time>=TO_TIMESTAMP(?2,'yyyy-MM-dd') AND ba.update_time<=TO_TIMESTAMP(?3, 'yyyy-MM-dd' )\n"
			+ "GROUP BY ba.region \n", nativeQuery = true)
	List<Object> buyerCancellationBlacklistedSellerRatingReport(Long sellerId,
			String startDate, String endDate);

}
