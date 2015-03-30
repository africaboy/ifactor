package com.entrofine.ifactor.app.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ddshell.framework.app.entity.User;
import com.entrofine.ifactor.app.entity.AjaxOperResponse;
import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.SellerApply;
import com.entrofine.ifactor.app.service.AccountService;
import com.entrofine.ifactor.app.service.BuyerApplyService;
import com.entrofine.ifactor.app.service.InvoiceService;
import com.entrofine.ifactor.app.service.QuestionService;
import com.entrofine.ifactor.app.service.SellerApplyService;
import com.entrofine.ifactor.shiro.web.filter.authc.JCaptchaValidateFilter;

@Controller
public class AccountController {

	private static final Logger LOG = LoggerFactory
			.getLogger(AccountController.class);

	@Autowired
	AccountService accountService;
	@Autowired
	SellerApplyService sellerApplyService;
	@Autowired
	BuyerApplyService buyerApplyService;
	@Autowired
	InvoiceService invoiceService;
	@Autowired
	QuestionService questionService;

	@RequestMapping(value = "/buyer/register", method = RequestMethod.GET)
	public String registerBuyerForm(Model model) {

		User user = accountService.getLoginUser();
		model.addAttribute("user", user);

		return "buyer/registration/buyer-registration";
	}

	/**
	 * add by xuliufang 2014-12-26
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/register/register-success", method = RequestMethod.GET)
	public String registerSuccess(Model model) {
		return "buyer/registration/register_success";
	}

	/**
	 * update by xuliufang 2014-12-26
	 * 
	 * @param user
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/buyer/register", method = RequestMethod.POST)
	@ResponseBody
	public synchronized AjaxOperResponse registerBuyer(
			@ModelAttribute("user") User user, Model model,
			HttpServletRequest request) {

		AjaxOperResponse response = null;
		String message = "";
		try {
			if (JCaptchaValidateFilter.isAccessDenied(request)) {
				model.addAttribute("succeed", Boolean.FALSE);
				message = "jcaptcha.invalid";
			} else if (accountService.isEmailRegistered(user)) {
				model.addAttribute("succeed", Boolean.FALSE);
				message = "buyer.register.message.emailRegistered";
			} else {
				accountService.registerBuyer(user);
				model.addAttribute("succeed", Boolean.TRUE);

				model.addAttribute("redirectActionUrl", "/login");
				message = "buyer.register.message.success";
			}
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			model.addAttribute("succeed", Boolean.FALSE);
			// model.addAttribute("message", "error!" + e.getMessage());
			message = "buyer.apply.message.failed";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/buyer/profile/debtor", method = RequestMethod.GET)
	public String viewDetorProfile(Model model) {
		return "buyer/account/b_debtor_profile";
	}

	@RequestMapping(value = "/buyer/profile/edit", method = RequestMethod.GET)
	public String editBuyer(Model model) {
		return "buyer/account/update-profile";
	}

	@RequestMapping(value = "/buyer/password/edit", method = RequestMethod.GET)
	public String changeBuyerPasswordForm(Model model) {
		User loginUser = accountService.getLoginUser();
		if (loginUser.getInvestAs() != null
				&& loginUser.getInvestAs().equals("Company/Institution")) {
			return "buyer/account/bc_application_change_password";
		} else {
			return "buyer/account/bp_application_change_password";
		}
	}

	/**
	 * update by xuliudang 2015-2-2
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/profile/trading/{id}", method = RequestMethod.GET)
	public String viewTradingProfile(@PathVariable Long id, Model model) {

		SellerApply sellerApply = sellerApplyService.getSellerApply(id);
		model.addAttribute("sellerApply", sellerApply);

		return "seller/account/s_trading_profile";
	}

	/**
	 * update by xuliufang 2015-01-07
	 * 
	 * @param user
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/seller/register", method = RequestMethod.POST)
	@ResponseBody
	public synchronized AjaxOperResponse registerSeller(
			@ModelAttribute("user") User user, Model model,
			HttpServletRequest request) {

		AjaxOperResponse response = null;
		String message = "";
		try {

			if (JCaptchaValidateFilter.isAccessDenied(request)) {
				model.addAttribute("succeed", Boolean.FALSE);
				message = "jcaptcha.invalid";
			} else if (accountService.isEmailRegistered(user)) {
				model.addAttribute("succeed", Boolean.FALSE);
				message = "buyer.register.message.emailRegistered";
			} else {
				accountService.registerSeller(user);
				model.addAttribute("succeed", Boolean.TRUE);
				model.addAttribute("redirectActionUrl", "/login");
				message = "buyer.register.message.success";
			}
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			model.addAttribute("succeed", Boolean.FALSE);
			/* model.addAttribute("message", "error!" + e.getMessage()); */
			message = "buyer.apply.message.failed";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/seller/register", method = RequestMethod.GET)
	public String registerSellerForm(Model model) {
		return "seller/registration/ineedfinancing";
	}

	@RequestMapping(value = "/seller/register/message")
	public String sellerMessage(Model model) {
		model.addAttribute("succeed", Boolean.FALSE);
		model.addAttribute("message", "This is some error occured!");

		return "seller/registration/message";
	}

	@RequestMapping(value = "/seller/profile/edit", method = RequestMethod.GET)
	public String editSeller() {
		return "seller/account/update-profile";
	}

	@RequestMapping(value = "/seller/profile/trading", method = RequestMethod.GET)
	public String viewTradingProfile(Model model) {
		return "seller/account/s_trading_profile";
	}

	@RequestMapping(value = "/seller/profile/debtorById/{id}", method = RequestMethod.GET)
	public String viewDebtorProfile(@PathVariable Long id, Model model) {
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);
		return "seller/account/s_debtor_profile";
	}

	@RequestMapping(value = "/seller/password/edit", method = RequestMethod.GET)
	public String changeSellerPasswordForm() {
		return "seller/account/change-password";
	}

	@RequestMapping(value = "/buyer/profile/update", method = RequestMethod.POST)
	public String updateBuyerProfile(@ModelAttribute("user") User user,
			Model model) {
		try {
			accountService.save(user);
			model.addAttribute("succeed", Boolean.TRUE);
			model.addAttribute("message", "Update success!");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			model.addAttribute("succeed", Boolean.FALSE);
			model.addAttribute("message", e.getMessage());
		}

		return "buyer/account/message";
	}

	@RequestMapping(value = "/seller/profile/update", method = RequestMethod.POST)
	public String updateSellerProfile(@ModelAttribute("user") User user,
			Model model) {
		try {
			accountService.save(user);
			model.addAttribute("succeed", Boolean.TRUE);
			model.addAttribute("message", "Update success!");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			model.addAttribute("succeed", Boolean.FALSE);
			model.addAttribute("message", e.getMessage());
		}

		return "seller/account/message";
	}

	@ModelAttribute
	public void getUser(Model model) {
		Subject subject = SecurityUtils.getSubject();

		if (subject.isAuthenticated()) {
			model.addAttribute("user", accountService.getLoginUser());
		}
	}

	@RequestMapping(value = "/password/forget", method = RequestMethod.GET)
	public String forgetPasswordFrom() {
		return "forgetpassword/forget-password";
	}

	@RequestMapping(value = "/password/forget", method = RequestMethod.POST)
	public String forgetPassword(@ModelAttribute("loginName") String loginName,
			Model model) {
		if (accountService.forgetPassword(loginName)) {
			model.addAttribute("succeed", Boolean.TRUE);
			model.addAttribute("message", "success!");
			model.addAttribute("redirectActionUrl", "/login");
		} else {
			model.addAttribute("succeed", Boolean.FALSE);
			model.addAttribute("message", "errors ocurr!");
			model.addAttribute("redirectActionUrl", "/password/forget");
		}
		return "forgetpassword/message";
		// return "buyer/registration/message";
	}

	@RequestMapping(value = "/password/reset/{loginName}/{resetPasswordCode}", method = RequestMethod.GET)
	public String resetPasswordFrom(
			@PathVariable("loginName") String loginName,
			@PathVariable("resetPasswordCode") String resetPasswordCode,
			Model model) {
		if (accountService.verifyResetPwd(loginName, resetPasswordCode)) {
			User user = accountService.findByLoginName(loginName);
			model.addAttribute("user", user);
			return "forgetpassword/reset-password";
		} else {
			model.addAttribute("succeed", Boolean.FALSE);
			model.addAttribute("message", "error!");
			return "forgetpassword/message";
		}
	}

	@RequestMapping(value = "/password/reset", method = RequestMethod.POST)
	public String resetPasswotd(@RequestParam(value = "id") Long userId,
			@RequestParam(value = "password") String plainNewPassword,
			Model model) {
		if (accountService.resetPasswotd(userId, plainNewPassword)) {
			model.addAttribute("succeed", Boolean.TRUE);
			model.addAttribute("message", "success!");
			model.addAttribute("redirectActionUrl", "/password/reset");
		} else {
			model.addAttribute("succeed", Boolean.FALSE);
			model.addAttribute("message", "error!");
			model.addAttribute("redirectActionUrl", "/password/reset");
		}
		return "forgetpassword/message";
	}

	/**
	 * update by xuliufang 2014-12-22
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/profile/view", method = RequestMethod.GET)
	public String viewMyProfile(Model model) {

		User user = accountService.getLoginUser();
		BuyerApply buyerApply = buyerApplyService.findByBuyerId(user.getId());

		model.addAttribute("user", user);
		model.addAttribute("buyerApply", buyerApply);
		model.addAttribute("questions",
				questionService.findByQgroup("buyerApply"));
		model.addAttribute("questions2",
				questionService.findByQgroup("buyerApply2"));

		if (user.getInvestAs() != null
				&& user.getInvestAs().equals("Company/Institution")) {
			return "buyer/account/b_profile_institution";
		} else {
			return "buyer/account/b_profile_private";
		}
	}

	/**
	 * update by xuliufang 2014-12-22
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/profile/debtor/{debtorName}", method = RequestMethod.GET)
	public String viewDetorProfile(@PathVariable String debtorName, Model model) {

		Invoice invoice = invoiceService.getInvoice(debtorName);
		model.addAttribute("invoice", invoice);

		return "buyer/account/b_debtor_profile";
	}

	@RequestMapping(value = "/buyer/profile/debtorById/{id}", method = RequestMethod.GET)
	public String viewDebtorProfile1(@PathVariable Long id, Model model) {
		Invoice invoice = invoiceService.findOne(id);
		model.addAttribute("invoice", invoice);
		return "buyer/account/b_debtor_profile";
	}

	/**
	 * update by xuliufang 2014-12-22
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/profile/debtor/{debtorName}", method = RequestMethod.GET)
	public String viewDebtorProfile(@PathVariable String debtorName, Model model) {

		Invoice invoice = invoiceService.getInvoice(debtorName);
		model.addAttribute("invoice", invoice);

		return "seller/account/s_debtor_profile";
	}

	/**
	 * update by xuliufang 2014-12-22
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/buyer/profile/seller/{id}", method = RequestMethod.GET)
	public String viewSellerProfile(@PathVariable Long id, Model model) {

		SellerApply sellerApply = sellerApplyService.getSellerApply(id);
		model.addAttribute("sellerApply", sellerApply);

		return "buyer/account/b_seller_profile";
	}

	/**
	 * update by xuliufang 2014-12-23
	 * 
	 * @param plainOldPassword
	 * @param plainNewPassword
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/buyer/password/update",
			"/seller/password/update" })
	@ResponseBody
	public AjaxOperResponse changePassword(
			@RequestParam(value = "oldpwd", required = false) String oldpwd,
			@RequestParam(value = "newpwd", required = false) String newpwd,
			Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {
			model.addAttribute("succeed", Boolean.TRUE);
			if (accountService.changeLoginUserPassword(oldpwd, newpwd)) {
				// model.addAttribute("message", "change password success!");
				message = "change.password.message.success";
			} else {
				model.addAttribute("succeed", Boolean.FALSE);
				// model.addAttribute("message", "old  password error!");
				message = "change.password.message.currentpwd.incorrect";
			}
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			model.addAttribute("succeed", Boolean.FALSE);
			// model.addAttribute("message", "change password error!");
			message = "change.password.message.error";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	/**
	 * update by xuliufang 2014-12-23
	 * 
	 * @param loginName
	 * @param mailActiveCode
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/buyer/register/active/{loginName}/{mailActiveCode}" }, method = RequestMethod.GET)
	public String activeBuyer(@PathVariable("loginName") String loginName,
			@PathVariable("mailActiveCode") String mailActiveCode, Model model) {
		if (accountService.activeBuyer(loginName, mailActiveCode)) {
			model.addAttribute("succeed", Boolean.TRUE);
			model.addAttribute("redirectActionUrl", "/login");
			model.addAttribute(
					"message",
					"Your account has been activated. You can now log in using your registered username and password.");
			return "buyer/activation/message_success";
		} else {
			model.addAttribute("succeed", Boolean.FALSE);
			model.addAttribute("redirectActionUrl", "/login");
			model.addAttribute("message",
					"Your account has already been activated.");
			return "buyer/activation/message_fail";
		}

	}

	/**
	 * update by xuliufang 2014-12-22
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/profile/view", method = RequestMethod.GET)
	public String viewSeller(Model model) {

		SellerApply sellerApply = sellerApplyService.getSellerApply();
		model.addAttribute("sellerApply", sellerApply);

		return "seller/account/seller_profile";
	}

	/**
	 * add by xuliufang 2015-01-30
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/profile/view/{id}", method = RequestMethod.GET)
	public String viewSeller(@PathVariable Long id, Model model) {

		SellerApply sellerApply = sellerApplyService.getSellerApply(id);
		model.addAttribute("sellerApply", sellerApply);

		return "seller/account/seller_profile";
	}

	/**
	 * update by xuliufang 2014-12-23
	 * 
	 * @param loginName
	 * @param mailActiveCode
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/seller/register/active/{loginName}/{mailActiveCode}" }, method = RequestMethod.GET)
	public String activeSeller(@PathVariable("loginName") String loginName,
			@PathVariable("mailActiveCode") String mailActiveCode, Model model) {
		if (accountService.activeSeller(loginName, mailActiveCode)) {
			model.addAttribute("succeed", Boolean.TRUE);
			model.addAttribute("redirectActionUrl", "/login");
			model.addAttribute(
					"message",
					"Your account has been activated. You can now log in using your registered username and password.");
			return "seller/activation/message_success";
		} else {
			model.addAttribute("succeed", Boolean.FALSE);
			model.addAttribute("redirectActionUrl", "/login");
			model.addAttribute("message",
					"Your account has already been activated.");
			return "seller/activation/message_fail";
		}
	}

}
