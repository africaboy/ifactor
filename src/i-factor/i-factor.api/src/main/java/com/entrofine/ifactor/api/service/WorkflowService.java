package com.entrofine.ifactor.api.service;

import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.SellerApply;

public interface WorkflowService {

	public void startSmeWorkflow(SellerApply apply);

	public void updateSmeWorkflow(SellerApply apply);

	public void startBuyerWorkflow(BuyerApply apply);

	public void updateBuyerWorkflow(BuyerApply apply);

	public void startInvoiceWorkflow(Invoice apply);

	public void updateInvoiceWorkflow(Invoice apply);
}
