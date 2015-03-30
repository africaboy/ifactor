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
import com.entrofine.ifactor.api.service.WorkflowService;
import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.SellerApply;

@Controller
public class WorkflowController {

	@Autowired
	private RestService rest;
	@Autowired
	private WorkflowService workflowService;

	@RequestMapping(value = API.MGT_START_SME_WORKFLOW, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage startSmeWorkflow(@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				workflowService.startSmeWorkflow((SellerApply) request);
				return RemoteMessage.SUCCESS;
			}
		}, SellerApply.class);
	}

	@RequestMapping(value = API.MGT_UPDATE_SME_WORKFLOW, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage updateSmeWorkflow(@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				workflowService.updateSmeWorkflow((SellerApply) request);
				return RemoteMessage.SUCCESS;
			}
		}, SellerApply.class);
	}

	@RequestMapping(value = API.MGT_START_BUYER_WORKFLOW, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage startBuyerWorkflow(@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				workflowService.startBuyerWorkflow((BuyerApply) request);
				return RemoteMessage.SUCCESS;
			}
		}, BuyerApply.class);
	}

	@RequestMapping(value = API.MGT_UPDATE_BUYER_WORKFLOW, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage updateBuyerWorkflow(@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				workflowService.updateBuyerWorkflow((BuyerApply) request);
				return RemoteMessage.SUCCESS;
			}
		}, BuyerApply.class);
	}

	@RequestMapping(value = API.MGT_START_INVOICE_WORKFLOW, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage startInvoiceWorkflow(@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				workflowService.startInvoiceWorkflow((Invoice) request);
				return RemoteMessage.SUCCESS;
			}
		}, Invoice.class);
	}

	@RequestMapping(value = API.MGT_UPDATE_INVOICE_WORKFLOW, method = RequestMethod.POST)
	@ResponseBody
	public RemoteMessage updateInvoiceWorkflow(
			@RequestBody RemoteMessage message) {
		return rest.service(message, new MessageService() {
			@Override
			public Object execute(Object request) {
				workflowService.updateInvoiceWorkflow((Invoice) request);
				return RemoteMessage.SUCCESS;
			}
		}, Invoice.class);
	}

}
