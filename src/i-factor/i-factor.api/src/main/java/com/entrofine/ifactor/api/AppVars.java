package com.entrofine.ifactor.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppVars {

	@Value("${server.mgt:http://127.0.0.1:8080/views}")
	public String mgtServer;

	@Value("${server.app:http://127.0.0.1:9080}")
	public String appServer;

	@Value("${app.document.seller:seller}")
	public String sellerDocumentDir;

	@Value("${app.document.buyer:buyer}")
	public String buyerDocumentDir;

	@Value("${app.document.invoice:invoice}")
	public String invoiceDocumentDir;

}
