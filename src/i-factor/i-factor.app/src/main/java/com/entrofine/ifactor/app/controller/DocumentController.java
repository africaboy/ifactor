package com.entrofine.ifactor.app.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ddshell.framework.app.controller.FileUploadController;
import com.entrofine.ifactor.jpa.DocEntity;

@Controller
public class DocumentController {

	@Autowired
	private FileUploadController fileUploadController;

	@RequestMapping(value = "/document/{catalog1}/{catalog2}/{catalog3}/{id}.{extension}", method = RequestMethod.GET)
	public void downloadx(@PathVariable("catalog1") String catalog1,
			@PathVariable("catalog2") String catalog2,
			@PathVariable("catalog3") String catalog3,
			@PathVariable("id") String id,
			@PathVariable("extension") String extension,
			HttpServletResponse response) throws IOException {
		download(catalog1, catalog2, catalog3, id + "." + extension, response);
	}

	@RequestMapping(value = "/document/{catalog1}/{catalog2}/{catalog3}/{name:[^\\.]+}", method = RequestMethod.GET)
	public void download(@PathVariable("catalog1") String catalog1,
			@PathVariable("catalog2") String catalog2,
			@PathVariable("catalog3") String catalog3,
			@PathVariable("name") String name, HttpServletResponse response)
			throws IOException {

		String biztype = catalog1 + DocEntity.BIZTYPE_SEP + catalog2
				+ DocEntity.BIZTYPE_SEP + catalog3;

		fileUploadController.download(biztype, name, response);

	}
}
