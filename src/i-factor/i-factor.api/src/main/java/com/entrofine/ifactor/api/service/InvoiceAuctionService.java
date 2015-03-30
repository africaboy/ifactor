package com.entrofine.ifactor.api.service;

import com.entrofine.ifactor.api.entity.InvoiceAuction;
import com.entrofine.ifactor.app.entity.Invoice;

public interface InvoiceAuctionService {

	public void saveMakeOfferInfo(InvoiceAuction invoiceAuction);

	public void updateAuctionStatus(Invoice invoice);
}
