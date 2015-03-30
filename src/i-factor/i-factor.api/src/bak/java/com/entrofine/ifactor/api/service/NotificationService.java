package com.entrofine.ifactor.api.service;

/**
 * 
 * @author LiZhichao
 * 
 */
public interface NotificationService {

	/**
	 * After a certain number of days, if the buyer does not finish modifying
	 * the application, the system should automatically close the application
	 * and send notification to CS and underwriting team member should be able
	 * to see the Closed status
	 * 
	 * Chapter 1 SME Application Proce
	 * 
	 * 3. Completeness and correctness check
	 * 
	 * 5. SME modify within the time limit (7 days) after get contacted by CS?
	 * 
	 * A. After get contacted by CS, after 7 days, if the SME do not finish
	 * modifying the application, the system should be able to automatically
	 * close the application and send notification to the SME.
	 * 
	 * B. The status should change to “Application closed”.
	 * 
	 * C. If the SME finish modifying within the time limit, go to step 6C.
	 */
	public void smeModeifWithOut7(String applicationId, String smeId);

	/**
	 * 
	 * Send email to buyer asking them activate the account through the link
	 * Send email to SME asking them activate the account through the link
	 * 
	 * Chapter 1 SME Application Process
	 * 
	 * 1.3 Process description
	 * 
	 * 1. SME open registration UI
	 * 
	 * D. After SME finish registration form, click on “Register”, the system
	 * should be able to send an automatic email with the activation link to SME
	 * registered email address. For the email content, please refer to Inputs
	 * and Outputs. A. After the investor click on “Submit”, the system will
	 * automatically send an activation email to the investor’s email address
	 * 
	 * @param buyerOrSMEId
	 */
	public void sendEmailBuyerOrSME(String buyerOrSMEId, String content);

	public void sendMSGBuyerOrSME(String buyerOrSMEId, String content);

	/**
	 * Invoice keeps “in VPBank auction” status
	 * 
	 * Chapter 4 Auction Process
	 * 
	 * 1 Auction for VPBank
	 * 
	 * 3. Process description
	 * 
	 * F. Option 4: Keep with VPBank If selected, the invoice will be sent to
	 * status “in VPBank auction” and marked with no bid placed. Maximum TAT for
	 * “In VPBank auction” status: 48 h After 48 h system changes automatically
	 * invoice status from “In VPBank auction” to “In public auction”.
	 */

	public void keepForVPBank(String invoiceId);

	/**
	 * Check if the invoice has reached the 32/22 days remaining limit the end
	 * of each day
	 * 
	 * Chapter 4 Auction Process
	 * 
	 * 2 Auction for investors
	 * 
	 * 3. Process description
	 * 
	 * v. If no transaction is concluded and the invoice remaining term reaches
	 * 32 days or 22 days (for invoices accepted to auction on Deviation
	 * conditions) system changes automatically invoice status from “In public
	 * auction” to “Invoice expired”
	 * 
	 */
	public void checkToExpired(String invoiceId);
}
