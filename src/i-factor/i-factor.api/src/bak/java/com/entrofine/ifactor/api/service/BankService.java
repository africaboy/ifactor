package com.entrofine.ifactor.api.service;

/**
 * 银行服务
 * 
 * @author LiZhichao
 * 
 */
public interface BankService {

	/**
	 * Chapter 4 Auction Process 2 Auction for investors 3. Process description
	 * 4. Investors accept Ready to Sell D. System automatically sends out
	 * notification to Seller (sms/e-mail) informing on “Ready to Sell” accepted
	 * and Auction closed, disbursement will start, e-signature required. After
	 * ready to sell accepted by Investor, when Seller signs in on the platform
	 * he will be automatically redirected to the “After auction” page, “Ready
	 * to sell accepted” sub-page, where seller can see the accepted ready to
	 * sell. Invoice will be sent to the status “Auction closed – transaction
	 * signed” Invoice will be sent to the status “Auction closed – waiting for
	 * signature”
	 * 
	 */
	public void closeAucStartDis(String auctionId, String sellerId);

	/**
	 * Accept Ready-to-sell, bid, release directly, or keep for VPBank
	 * 
	 * Chapter 4 Auction Process 1 Auction for VPBank 3. Process description
	 * 1.A. VPBank approval team releases accepted invoices to auction B. All
	 * invoices released to auction will have the status “To auction”
	 */
	public void invoiceToAution(String[] invoices);

	/**
	 * Accept Ready-to-sell, bid, release directly, or keep for VPBank
	 * 
	 * Chapter 4 Auction Process 1 Auction for VPBank 3. Process description
	 * 4.B. User should be able to see Invoice profile and Market profile on the
	 * left side of the screen and Acceptable range, Options 1, 2, 3, 4 on the
	 * right of the screen. C. Option 1: Accept Ready to sell D. Option 2: Place
	 * a bid Place bid or accept ready to sell
	 * 
	 * @param invoiceId
	 */
	public void placeBid(String invoiceId);

	public void readyToSell(String invoiceId);

	/**
	 * System sends notification to Investor, informing on transaction closure
	 * and requiring Investor to provide e-Signature 5. Investors place bid D.
	 * If Seller accepted offer and signed the transaction system will send
	 * notification to Investor, informing on transaction closure and requiring
	 * Investor to provide e-Signature
	 */

	public void sendNotice(String investorId);

	public void transactionClosure(String transactionId);

	/**
	 * System sends notification to Investor, informing on transaction closure,
	 * waiting for Sellers signature and requiring Investor to provide
	 * e-Signature/ signature in VPBank Branch
	 * 
	 * E. If Seller accepted offer and did not sign the transaction system sends
	 * notification to Investor, informing on transaction closure, waiting for
	 * Seller’s signature and requiring Investor to provide e-Signature/
	 * signature in VPBank Branch
	 */

	public void waitingSignasture(String investorId, String transactionId);

	/**
	 * No signature from investor Disbursement process sets measures for this
	 * situation Chapter 4 Auction Process 2 Auction for investors 3. Process
	 * description 4. Investors accept Ready to Sell F. Disbursement process
	 * sets rules for the situation that Investor/ Seller don’t provide their
	 * signature (e-signature, signature in Branch)
	 */
	public void noSignature(String investorId);

}
