package com.entrofine.ifactor.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ddshell.framework.api.service.RestService;
import com.entrofine.ifactor.api.API;
import com.entrofine.ifactor.api.AppVars;
import com.entrofine.ifactor.api.entity.InvoiceAuction;
import com.entrofine.ifactor.app.entity.Invoice;

@Component
public class InvoiceAuctionServiceProxy implements InvoiceAuctionService {

	@Autowired
	private AppVars appVars;
	@Autowired
	private RestService rest;

	@Override
	public void saveMakeOfferInfo(InvoiceAuction invoiceAuction) {
		rest.post(RestService.SESSION_NO, appVars.mgtServer
				+ API.MGT_MAKE_OFFER, invoiceAuction, String.class);
	}

	@Override
	public void updateAuctionStatus(Invoice invoice) {
		rest.post(RestService.SESSION_NO, appVars.mgtServer
				+ API.MGT_UPDATE_AUCTION_STATUS, invoice, String.class);
	}

}
