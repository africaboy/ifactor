package com.ddshell.framework.app.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

	private static final Logger LOG = LoggerFactory
			.getLogger(IndexController.class);

	@RequestMapping(value = { "/", "index" }, method = RequestMethod.GET)
	public String index(Model model) {
		LOG.debug("method=>index");

		return "index";
	}
}
