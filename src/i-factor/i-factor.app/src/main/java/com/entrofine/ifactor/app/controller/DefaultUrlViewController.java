package com.entrofine.ifactor.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class DefaultUrlViewController {

	@RequestMapping(value = "/calculator", method = RequestMethod.GET)
	public String calculator(Model model) {
		return "calculator";
	}

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {
		return "test";
	}
}
