package com.entrofine.ifactor.api.service;

import java.io.File;

/**
 * 
 * @author LiZhichao MBO, SBO (Branch) / i-Factor sales team member (HO) service
 */
public interface SalesService {

	/**
	 * Receive notification from CS Print out 2 copies of all the necessary
	 * document for buyer (all the service agreements are in the system). If new
	 * buyer, open VPB bank account for them. If existing buyer, ask them to
	 * provide VPB bank account Key in SME bank account Information in the
	 * i-Factor system Require buyer to deposit min. amount in above VPB bank
	 * account (payment will freeze this amount for cancellation fee if it
	 * occurs later on Fill in account number in the contract Give i-Factor
	 * package to buyer
	 * 
	 * Chapter 2 Investor Application Process
	 * 
	 * 5.3 Process description
	 * 
	 * 1. The SBO/MBO (branch) or the i-Factor sales team member (HO) receive
	 * the notification from CS and:
	 * 
	 * A. Select the list of necessary legal documents for buyer and print them
	 * out and ask the buyer to sign.
	 * 
	 * B. Open bank account for the buyer in case of new VPBank customer. If
	 * existing customer, ask for bank account details.
	 * 
	 * C. Require the buyer to deposit a minimum registration deposit into the
	 * bank account. The amount will be frozen.
	 * 
	 * D. Fill the bank account number into i-Factor system and the contract.
	 * 
	 * E. Give buyer the i-Factor package
	 */
	/**
	 * A
	 * 
	 * @param buyerId
	 */
	public void printDocForBuyer(String buyerId);

	/**
	 * B
	 * 
	 * @param buyerId
	 */
	public void openAccountForBuyer(String buyerId);

	/**
	 * C
	 * 
	 * @param buyerId
	 * @return 保证金是否达到最小值
	 */
	public boolean checkBuyerDeposit(String buyerId);

	/**
	 * D
	 * 
	 * @param account
	 * @param contract
	 */
	public void fillAccountBuyer(String account, String contract);

	/**
	 * E
	 * 
	 * @param packageId
	 * @param buyerId
	 */
	public void givePackageToBuyer(String packageId, String buyerId);

	/**
	 * Receive notification Print out 2 copies of all the necessary document for
	 * SME (all the service agreements are in the system). If new SME, open VPB
	 * bank account for them. If existing SME, ask them VPB bank account Key in
	 * SME bank account Information in the i-Factor system Require SME to
	 * deposit min. amount in above VPB bank account (payment will freeze this
	 * amount for cancellation fee if it occurs) Fill in account number in the
	 * contract Give i-Factor package to SME
	 * 
	 * Chapter 1 SME Application Process
	 * 
	 * 9.3 Process description
	 * 
	 * 5. The SBO/MBO (branch) or the i-Factor sales team member (HO) receive
	 * the notification from CS and:
	 * 
	 * A. Select the list of necessary legal documents for SME and print them
	 * out and ask the SME to sign.
	 * 
	 * B. Open bank account for the SME in case of new VPBank customer. If
	 * existing customer, ask for bank account details.
	 * 
	 * C. Require the SME to deposit a minimum registration deposit into the
	 * bank account. The amount will be frozen. D. Fill the bank account number
	 * into i-Factor system and the contract. E. Give SME the i-Factor package
	 */
	/**
	 * A
	 * 
	 * @param smeId
	 */
	public void printDocForSme(String smeId);

	/**
	 * B
	 * 
	 * @param buyerId
	 */
	public void openAccountForSme(String smeId);

	/**
	 * C
	 * 
	 * @param semId
	 * @param account
	 */
	public void checkSmeDeposit(String semId, String account);

	/**
	 * D
	 * 
	 * @param account
	 * @param contract
	 */
	public void fillAccAndCon(String account, String contract);

	/**
	 * Receive notification and Wait for buyer to go to branch again
	 * 
	 * Chapter 2 Investor Application Process
	 * 
	 * 5.3 Process description
	 * 
	 * 4. The underwriting team member double check the signature and uploaded
	 * documents and verify the bank account number through the interface with
	 * VPBank core banking system
	 * 
	 * A. The underwriting team member should be able to receive notification
	 * from the SBO/MBO (branch) or the i-Factor sales team member (HO) and
	 * check the buyer’s signature, legal documents and verify bank account
	 * number using the interface with VPBank core banking system.
	 * 
	 * B. If the double check gives negative results, the underwriting team
	 * member should “Inform SBO/MBO (branch) or the i-Factor sales team member
	 * (HO)” to contact the buyer to come to branch again to re-sign the
	 * paperwork.
	 */
	public void recevieWait(String buyerId);

	/**
	 * Receive notification and wait for SME to go to branch again
	 * 
	 * Chapter 1 SME Application Process
	 * 
	 * 9.3 Process description
	 * 
	 * 8. The underwriting team member double check the signature and uploaded
	 * documents and Verify bank account with corebanking system
	 * 
	 * A. The underwriting team member should be able to receive notification
	 * from the SBO/MBO (branch) or the i-Factor sales team member (HO) and
	 * check the SME’s signature, legal documents and bank account number and
	 * verify the bank account number using the interface with the core banking
	 * system of the VPBank
	 * 
	 * B. If the double check gives negative results, the underwriting team
	 * member should “Inform SBO/MBO (branch) or the i-Factor sales team member
	 * (HO)” to contact the SME to come to branch again to re-sign the paperwork
	 * and/or reconfirm the bank account number
	 */
	public void noticeReSigna(String smeId);

	/**
	 * VPB Keep one copy of contract and upload signed documents in the system.
	 * 
	 * Chapter 1 SME Application Process
	 * 
	 * 9.3 Process description
	 * 
	 * 7. The SBO/MBO (branch) or the i-Factor sales team member (HO) verify the
	 * SME’s ID, signature and upload the legal documents into the system A. The
	 * SBO/MBO (branch) or the i-Factor sales team member (HO) is required to
	 * verify the SME’s ID and signature.
	 * 
	 * @param SME
	 *            's ID
	 * @param signature
	 *            and upload the legal documents
	 */

	public void verifySmeId(String smeId, File[] documents);

	/**
	 * VPB keep one copy of signed contract and upload the documents into the
	 * system
	 * 
	 * 3. The SBO/MBO (branch) or the i-Factor sales team member (HO) verify the
	 * buyer’s ID, signature and upload the legal documents into the system
	 * 
	 * A. The SBO/MBO (branch) or the i-Factor sales team member (HO) is
	 * required to verify the buyer’s ID and signature.
	 * 
	 * B. The documents will then be passed on to the Head of SME center
	 * (branch) or the Head of i-Factor (HO) to check and sign.
	 * 
	 * C. The documents will then be passed on to the underwriting team member
	 * for double check.
	 * 
	 * @param buyer
	 *            's ID
	 * @param signature
	 *            and upload the legal documents
	 */
	public void verifyBuyerId(String buyerId, File[] documents);

	/**
	 * Verify the ID and signature and submit for the Head to sign
	 * 
	 * Chapter 1 SME Application Process
	 * 
	 * 9.3 Process description
	 * 
	 * 7. The SBO/MBO (branch) or the i-Factor sales team member (HO) verify the
	 * SME’s ID, signature and upload the legal documents into the system
	 * 
	 * B. The documents will then be passed on to the Head of SME center
	 * (branch) or the Head of i-Factor (HO) to check and sign.
	 */
	public boolean verifySeller(String sallerId, String signatureId,
			String headerId);

	/**
	 * Verify the ID and signature and submit for the Head to sign
	 * 
	 * 5.3 Process description
	 * 
	 * 3. The SBO/MBO (branch) or the i-Factor sales team member (HO) verify the
	 * buyer’s ID, signature and upload the legal documents into the system
	 * 
	 * B. The documents will then be passed on to the Head of SME center
	 * (branch) or the Head of i-Factor (HO) to check and sign.
	 */

	public boolean verifyBuyer(String buyerId, String signatureId,
			String headerId);

}
