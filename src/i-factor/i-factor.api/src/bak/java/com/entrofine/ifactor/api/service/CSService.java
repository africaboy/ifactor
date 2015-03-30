package com.entrofine.ifactor.api.service;

/**
 * 
 * @ClassName: CustomerService
 * @Description: TODO
 * @author LiZhichao
 * @date 2014-6-24 下午9:35:34
 * 
 */
public interface CSService {

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 2. Completeness and correctness check
	 * 
	 * 2.3 Process description
	 * 
	 * 1.C. The application status should be “Pending for completeness and
	 * correctness check”. CS should be able to see this status.
	 * 
	 * CS is able to see application status (for rejection, CS do not call SME)
	 */

	public String checkStatus(String application);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 4.3 Process description
	 * 
	 * 5. Get confirmation of the buyer’s identity
	 * 
	 * B. If the buyer is not real, the CS team member should be able to click
	 * on “Buyer’s identity unconfirmed” and messages will be automatically sent
	 * to the underwriting team with the following content
	 * 
	 * D. If the buyer is real, the CS team member should be able to click on
	 * “Buyer’s identity confirmed” and messages will be automatically sent to
	 * the underwriting team and MBO/SBO/i-Factor sales team member with the
	 * following content
	 * 
	 * @param buyerId
	 * @return 确认结果
	 * 
	 */
	public String confimBuyer(String buyerId);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 4.3 Process description
	 * 
	 * 2. Inform CS to call the investor to go to branch
	 * 
	 * @param investorId
	 * @return 呼叫是否成功
	 */
	public String callInvestor(String investorId);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 4.3 Process description
	 * 
	 * 4. CS receive notification and contact the investor
	 * 
	 * A. The CS team member should be able to see the message sent from the
	 * underwriting team member on the screen
	 */
	public void readMsgFromUnderwriting();

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 4.3 Process description
	 * 
	 * 4. CS receive notification and contact the investor
	 * 
	 * B. The CS team member should contact the investor by phone and change the
	 * contact status
	 * 
	 * @param investorId
	 * @return 变更是否成功
	 */
	public String changeContactStatus(String investorId, String status);

	/**
	 * 
	 * Chapter 2 Investor Application Process
	 * 
	 * 2. Completeness and correctness check
	 * 
	 * 2.3 Process description
	 * 
	 * 1. i-Factor underwriting team member receive automatic notification of
	 * new buyer application
	 * 
	 * C. The application status should be “Pending for completeness and
	 * correctness check”. CS should be able to see this status.
	 */

	public String seeApplicationStatus(String applicationId);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 3. Checking against blacklist
	 * 
	 * 4. Reject application
	 * 
	 * A. If the either of the blacklist checks give negative results, the
	 * underwriting team member click on “Reject” to reject the application. The
	 * application status should be “Application rejected”
	 * 
	 * B. The system should be able to interface with VPBank’s SMS and email
	 * systems to send automatic SMS/email to the investor to inform rejection
	 * Paste the SMS/email format, contents here.
	 * 
	 * C. The CS team should be able to see the status changed
	 */
	public String rejectApplication(String applicationId);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 2. Completeness and correctness check
	 * 
	 * 2.3 Process description
	 * 
	 * 4. Investor modify within the time limit (3 days) ?
	 * 
	 * A. After 3 days, if the investor do not modify the application as
	 * requested, the application status should change automatically to “Pending
	 * for CS to contact”.
	 * 
	 * B. The system should automatically send a notification to the CS to
	 * contact the investor for modification.
	 * 
	 * C. The CS team member should contact the investor on the phone to require
	 * them to modify the application. The application status should be
	 * “Contacted by CS”. The details of the call should be recorded by the
	 * system.
	 */
	public String InvModTimeOut3(String applicationId, String investorId);

	/**
	 * 1. i-Factor underwriting team member receive automatic notification of
	 * new buyer application
	 * 
	 * A. After the investor finish the application form and click “Submit”, the
	 * application should be saved and submitted to the i-Factor underwriting
	 * team member to check and verify
	 * 
	 * B. The underwriting team receive an automatic notification of new buyer
	 * application submitted
	 * 
	 * C. The application status should be “Pending for completeness and
	 * correctness check”. CS should be able to see this status.
	 * 
	 */

	public void newBuyerApplication(String buyerId, String applicationId);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 2. Completeness and correctness check
	 * 
	 * 2.3 Process description
	 * 
	 * 5. Investor modify within the time limit (7 days) after get contacted by
	 * CS?
	 * 
	 * A. After get contacted by CS, after 7 days, if the investor do not finish
	 * modifying the application, the system should be able to automatically
	 * close the application and send notification to the investor.
	 * 
	 * B. The application status should change to “Application closed”.
	 */
	public void InvModTimeOut7(String investorId, String applicationId);

	public String seeInvAppClosed(String applicationId);

	/**
	 * Chapter 1 SME Application Process
	 * 
	 * 3.3 Process description
	 * 
	 * 4. SME modify within the time limit (3 days)?
	 * 
	 * A. After 3 days, if the SME do not modify the application as requested,
	 * the application status should change automatically to “Pending for CS to
	 * contact”.
	 * 
	 * B. The system should automatically send a notification to the CS to
	 * contact the SME for modification.
	 * 
	 * C. The CS team member should contact the SME on the phone to require them
	 * to modify the application. The application status should be “Contacted by
	 * CS”.
	 */
	public String SmeModifyTimeOut3(String applicationId, String SmeId);

	// B
	public void receiveNotice(String SMEId);

	/**
	 * Chapter 1 SME Application Process
	 * 
	 * 3.3 Process description
	 * 
	 * 5. SME modify within the time limit (7 days) after get contacted by CS?
	 * 
	 * A. After get contacted by CS, after 7 days, if the SME do not finish
	 * modifying the application, the system should be able to automatically
	 * close the application and send notification to the SME.
	 * 
	 * B. The status should change to “Application closed”.
	 */
	public String SmeModifyTimeOut7(String applicationId, String SmeId);

	// B
	public String seeSmeAppClosed(String applicationId);

	/**
	 * Chapter 1 SME Application Process
	 * 
	 * 3.3 Process description
	 * 
	 * 6.SME modify the application
	 * 
	 * A. After get informed by SMS/email and/or CS, the SME should be able to
	 * log in to modify the application.
	 */
	public void callSmeToModify(String SmeId);

	/**
	 * Chapter 2 Investor Application Process
	 * 
	 * 2.3 Process description
	 * 
	 * 6. Investor modify the application
	 * 
	 * A. After get informed by SMS/email and/or CS, the investor should be able
	 * to log in to modify the application.
	 */
	public void callInvToModify(String investorId);

}
