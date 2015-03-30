package com.entrofine.ifactor.api.service;

public interface InvoiceService {

	/**
	 * Chapter 3 Invoice Delivery Process
	 * 
	 * 1.1.3
	 * 
	 * 1. SMEs that have been approved to upload invoices can click “Submit
	 * Invoice” and upload the necessary documents, invoice details
	 * 
	 * @return 发票Id
	 */
	public String uploadInvoice(String SMEId);

	/**
	 * Chapter 4 Auction Process
	 * 
	 * 1 Auction for VPBank
	 * 
	 * 3. Process description
	 * 
	 * D. Option 2: Place a bid
	 * 
	 * 2. Don’t accept offer
	 * 
	 * After 48 h, if offer is not accepted by Seller/ no answer from Seller,
	 * system changes automatically invoice status from “In VPBank auction” to
	 * “In public auction”.
	 * 
	 */
	public String changeInvoiceStatus(String invoiceId, String status);
}
