package com.entrofine.ifactor.api.service;

/**
 * 
 * @ClassName: UnderwritingService
 * @Description: TODO 核查服务
 * @author LiZhichao
 * @date 2014-6-24 下午10:18:31
 * 
 */
public interface UnderwritingService {

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 2. Completeness and correctness check
	 * 
	 * 2.3 Process description
	 * 
	 * 1. i-Factor underwriting team member receive automatic notification of
	 * new buyer application
	 */
	public void noticeBuyer(String buyerId);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 4.3 Process description
	 * 
	 * 1. A. The underwriting team member should be able to click on “Accept as
	 * potential buyer” the application pass blacklist checks
	 * 
	 * @return 是否在黑名单
	 */
	public boolean checkBlackList(String id);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 5. Documents signing, verification of signed documents, bank account
	 * opening and auction function activation
	 * 
	 * 5.1 Function description The investor is also given an i-Factor package
	 * Lastly, after the documents are signed by the Head of SME center/ Head of
	 * i-Factor and verified by the underwriting team, the auction function will
	 * be activated within the next 24 hours and the investor should be ready to
	 * bid for invoice.
	 * 
	 * @return 激活是否成功
	 */
	public boolean activateInvestor(String investor);

	/**
	 * 7. Apply rating
	 * 
	 * 7.3 Process description
	 * 
	 * 2.
	 * 
	 * C. If the rating is mapped into Medium or Low risk level, the SME will be
	 * accepted as normal risk seller. The underwriting team member should be
	 * able to see the result: “The risk level is Low/Medium”. There should be a
	 * button called “Accept as normal risk seller” for the underwriting team
	 * member to click on to accept the seller.
	 */
	public void acceptSeller(String sellerId);

	/**
	 * Chapter 1
	 * 
	 * 8.3.6
	 * 
	 * C. If the result is negative, the approval team member should be able to
	 * “Reject” the application. At the same time, by clicking “Reject” the
	 * system should inform the SME the rejection in the form of SMS and/or
	 * email.
	 */
	public void rejectSeller(String sellerId);

	/**
	 * Chapter 1
	 * 
	 * 9.3.1.
	 * 
	 * A. After the SME is accepted as either Normal or High risk seller, the
	 * system should automatically assign client ID and create SME profile.
	 * 
	 * @param sellerId
	 * @return ClientId
	 */
	public String assignClientId(String sellerId);

	/**
	 * Receive automatic notification of invoice uploaded
	 * 
	 * Chapter 3 Invoice Delivery Process
	 * 
	 * 1. Invoice Delivery
	 * 
	 * 1.1.3 Process Description
	 * 
	 * 1. SMEs that have been approved to upload invoices can click “Submit
	 * Invoice” and upload the necessary documents, invoice details, and the
	 * mandatory ready-to-sell conditions:
	 * 
	 * A. During the invoice delivery process, the staff in the underwriting
	 * team and approval team can always be able to see the SME profile that has
	 * been created during SME admission process, because the two teams will
	 * compare the company profile information with the invoice details that are
	 * submitted for underwriting purpose.
	 */

	public void receiveNotice(String SMEId);

	/**
	 * The same ppl who checked the invoice submission previously will check the
	 * modified invoice submission based on new and existing information
	 * 
	 * Chapter 3 Invoice Delivery Process
	 * 
	 * 1.1.3 Process Description
	 * 
	 * 7. After the SME modified their invoice submission, the invoice
	 * submission will be sent to the same person in the i-Factor underwriting
	 * team to check for completeness and correctness again
	 * 
	 * A. That member of the i-Factor underwriting team should be able to see
	 * which entries are modified by the invoice sellers, and which entries have
	 * already passed the completeness and correctness check before;
	 * 
	 * @param invoiceId
	 * @return 是否完整和正确
	 */
	public boolean checkCompCorr(String invoiceId);
}
