package com.entrofine.ifactor.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ddshell.framework.api.entity.RemoteMessage;
import com.ddshell.framework.api.service.MessageService;
import com.ddshell.framework.api.service.RestService;
import com.entrofine.ifactor.api.API;
import com.entrofine.ifactor.api.entity.InvoiceAuction;
import com.entrofine.ifactor.api.service.InvoiceAuctionService;
import com.entrofine.ifactor.app.entity.Invoice;

@Controller
public class AuctionMakeOfferController {
	@Autowired
	private RestService rest;
	@Autowired
	private InvoiceAuctionService invoiceAuctionService;

	@RequestMapping(value = API.MGT_MAKE_OFFER, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage saveMakeOfferInfo(@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				invoiceAuctionService
						.saveMakeOfferInfo((InvoiceAuction) request);
				return RemoteMessage.SUCCESS;
			}
		}, InvoiceAuction.class);
	}

	@RequestMapping(value = API.MGT_UPDATE_AUCTION_STATUS, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage updateAuctionStatus(@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				invoiceAuctionService.updateAuctionStatus((Invoice) request);
				return RemoteMessage.SUCCESS;
			}
		}, Invoice.class);
	}
}
