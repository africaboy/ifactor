package com.entrofine.ifactor.app.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.entrofine.ifactor.app.entity.ContactUs;
import com.entrofine.ifactor.app.service.ContactUsService;

@Controller
public class ContactUsController {

	@Autowired
	ContactUsService contactUsService;

	@RequestMapping(value = "/home/contact-us", method = RequestMethod.POST)
	public synchronized String registerSeller(
			@ModelAttribute("contactUs") ContactUs contactUs, Model model,
			HttpServletRequest request) {

		contactUsService.commitApply(contactUs);

		return "home/contact_success";
	}

}
