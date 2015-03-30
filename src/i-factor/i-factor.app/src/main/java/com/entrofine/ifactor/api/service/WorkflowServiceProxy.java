package com.entrofine.ifactor.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ddshell.framework.api.service.RestService;
import com.entrofine.ifactor.api.API;
import com.entrofine.ifactor.api.AppVars;
import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.SellerApply;

@Component
public class WorkflowServiceProxy implements WorkflowService {

	@Autowired
	private AppVars appVars;
	@Autowired
	private RestService rest;

	@Override
	public void startSmeWorkflow(SellerApply apply) {
		rest.post(RestService.SESSION_NO, appVars.mgtServer
				+ API.MGT_START_SME_WORKFLOW, apply, String.class);
	}

	@Override
	public void updateSmeWorkflow(SellerApply apply) {
		rest.post(RestService.SESSION_NO, appVars.mgtServer
				+ API.MGT_UPDATE_SME_WORKFLOW, apply, String.class);
	}

	@Override
	public void startBuyerWorkflow(BuyerApply apply) {
		rest.post(RestService.SESSION_NO, appVars.mgtServer
				+ API.MGT_START_BUYER_WORKFLOW, apply, String.class);
	}

	@Override
	public void updateBuyerWorkflow(BuyerApply apply) {
		rest.post(RestService.SESSION_NO, appVars.mgtServer
				+ API.MGT_UPDATE_BUYER_WORKFLOW, apply, String.class);
	}

	@Override
	public void startInvoiceWorkflow(Invoice apply) {
		rest.post(RestService.SESSION_NO, appVars.mgtServer
				+ API.MGT_START_INVOICE_WORKFLOW, apply, String.class);
	}

	@Override
	public void updateInvoiceWorkflow(Invoice apply) {
		rest.post(RestService.SESSION_NO, appVars.mgtServer
				+ API.MGT_UPDATE_INVOICE_WORKFLOW, apply, String.class);
	}

}
