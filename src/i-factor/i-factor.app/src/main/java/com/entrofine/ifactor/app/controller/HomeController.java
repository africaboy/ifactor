package com.entrofine.ifactor.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping("/home/cookiepolicy")
	public String cookiePolic(Model model) {
		return "home/cookiepolicy";
	}

	@RequestMapping("/home/help")
	public String help(Model model) {
		return "home/howItWork";
	}

	@RequestMapping("/home/contact-us")
	public String contact(Model model) {
		return "home/contactUs";
	}

	@RequestMapping("/home/termofuse")
	public String joinToday(Model model) {
		return "home/termofuse";

	}

	@RequestMapping("/home/forgotpassword")
	public String forgotPassword(Model model) {
		return "home/forgotpassword";
	}
}
