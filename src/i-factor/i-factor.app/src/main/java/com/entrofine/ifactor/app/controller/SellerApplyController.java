package com.entrofine.ifactor.app.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ddshell.framework.app.entity.User;
import com.entrofine.ifactor.app.entity.AjaxOperResponse;
import com.entrofine.ifactor.app.entity.SellerApply;
import com.entrofine.ifactor.app.entity.SellerApplyDoc;
import com.entrofine.ifactor.app.service.AccountService;
import com.entrofine.ifactor.app.service.DataModifyRecordService;
import com.entrofine.ifactor.app.service.SellerApplyService;
import com.entrofine.ifactor.app.service.workflow.SmeFlowStatus;

@Controller
public class SellerApplyController {
	private static final Logger LOG = LoggerFactory
			.getLogger(SellerApplyController.class);

	@Autowired
	AccountService accountService;
	@Autowired
	private SellerApplyService sellerApplyService;
	@Autowired
	DataModifyRecordService dataModifyRecordService;

	@RequestMapping(value = { "/seller", "/seller/index" }, method = RequestMethod.GET)
	public String index(Model model) {
		return "seller/index";
	}

	@RequestMapping(value = "/seller/account/apply", method = RequestMethod.GET)
	public String applyForm(Model model) {
		User loginUser = accountService.getLoginUser();

		model.addAttribute("user", loginUser);
		return "seller/account/apply-as-seller";
	}

	/**
	 * update luoxunda 2015/01/16
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/account/update", method = RequestMethod.GET)
	public String updateForm(Model model) {
		SellerApply sellerApply = sellerApplyService.getSellerApply();
		if (sellerApply == null) {
			model.addAttribute("message",
					"Cannot find any seller apply form for this user");
			return "/seller/account/message";
		}

		User loginUser = accountService.getLoginUser();
		List<String> modifyFields = dataModifyRecordService
				.findDataModifyFields("smeApplyFlow", sellerApply.getId()
						.toString());

		model.addAttribute("modifyFields", modifyFields);
		model.addAttribute("isModifyStatus",
				SmeFlowStatus.isModify(sellerApply.getFlowStatus()));

		model.addAttribute("sellerApply", sellerApply);
		model.addAttribute("sellerApplyDocs", sellerApply.getDocuments());

		model.addAttribute("user", loginUser);

		if (sellerApply.getFlowStatus() == null
				|| "".equals(sellerApply.getFlowStatus())) {
			return "seller/account/s_resume_application";
			// return "seller/account/apply-update";
		} else {
			model.addAttribute("modifyFields", modifyFields);
			model.addAttribute("isModifyStatus",
					SmeFlowStatus.isModify(sellerApply.getFlowStatus()));
			return "seller/account/apply-update";
		}
	}

	@RequestMapping(value = "/seller/account/updateforapp", method = RequestMethod.GET)
	public String updateForModify(Model model) {
		SellerApply sellerApply = sellerApplyService.getSellerApply();
		if (sellerApply == null) {
			model.addAttribute("message",
					"Cannot find any seller apply form for this user");
			return "/seller/account/message";
		}

		User loginUser = accountService.getLoginUser();
		List<String> modifyFields = dataModifyRecordService
				.findDataModifyFields("smeApplyFlow", sellerApply.getId()
						.toString());

		model.addAttribute("modifyFields", modifyFields);
		model.addAttribute("isModifyStatus",
				SmeFlowStatus.isModify(sellerApply.getFlowStatus()));

		model.addAttribute("sellerApply", sellerApply);
		model.addAttribute("sellerApplyDocs", sellerApply.getDocuments());

		model.addAttribute("user", loginUser);

		if (sellerApply.getFlowStatus() == null
				|| "".equals(sellerApply.getFlowStatus())) {
			return "seller/account/s_resume_application";
			// return "seller/account/apply-update";
		} else {
			model.addAttribute("modifyFields", modifyFields);
			model.addAttribute("isModifyStatus",
					SmeFlowStatus.isModify(sellerApply.getFlowStatus()));
			return "seller/account/apply-update";
		}
	}

	/**
	 * update by xuliufang 2014-12-25
	 * 
	 * @param isCommit
	 * @param sellerApply
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/seller/account/apply", method = RequestMethod.POST)
	@ResponseBody
	public Serializable apply(@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("sellerApply") SellerApply sellerApply, Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {
			if (isCommit) {
				sellerApplyService.commitApply(sellerApply);
				// message = "Your application has been successfully submitted";
				message = "seller.apply.message.successSubmitted";
			} else {
				sellerApplyService.saveApply(sellerApply);
				// message = "Your application has been successfully saved";
				message = "seller.apply.message.successSaved";
			}
			// return "{isSucceed:true,message:'Operation successful'}";
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			// return "{isSucceed:false,message:'" + e.getMessage() + "'}";
			message = "buyer.apply.message.failed";
			response = new AjaxOperResponse(false, e.getMessage());
		}
		return response;
	}

	@RequestMapping(value = "/seller/account/updateapp", method = RequestMethod.POST)
	@ResponseBody
	public Serializable update(@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("sellerApply") SellerApply sellerApply, Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {
			if (isCommit) {
				sellerApplyService.commitApply(sellerApply);
				// message = "Your application has been successfully submitted";
				message = "seller.apply.message.successSubmitted";
			} else {
				sellerApplyService.saveApply(sellerApply);
				// message = "Your application has been successfully updated";
				message = "seller.apply.message.successUpdated";
			}

			// return "{isSucceed:true,message:'Operation successful'}";
			response = new AjaxOperResponse(true, message);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			// return "{isSucceed:false,message:'" + e.getMessage() + "'}";
			response = new AjaxOperResponse(false, e.getMessage());
		}

		return response;
	}

	@RequestMapping(value = "/seller/account/view", method = RequestMethod.GET)
	public String view(Model model) {

		SellerApply sellerApply = sellerApplyService.getSellerApply();
		if (sellerApply == null) {
			model.addAttribute("message",
					"Cannot find any seller apply form for this user");
			return "/seller/account/message";
		}

		User loginUser = accountService.getLoginUser();
		model.addAttribute("user", loginUser);
		model.addAttribute("sellerApply", sellerApply);
		model.addAttribute("sellerApplyDocs", sellerApply.getDocuments());
		return "seller/account/apply-view";
	}

	@RequestMapping(value = "/seller/account/message", method = RequestMethod.GET)
	public String showMessage(@RequestParam(value = "message") String message,
			Model model) {
		model.addAttribute("message", message);
		return "seller/account/message";
	}

	@RequestMapping(value = "/seller/register/applymsg", method = RequestMethod.GET)
	public String showMessage(Model model) {
		model.addAttribute("message", "This is test string!");
		return "seller/account/message";
	}

	@ModelAttribute
	public void getSellerApply(
			@RequestParam(value = "id", defaultValue = "-1") Long id,
			Model model) {
		if (id > 0) {
			SellerApply apply = sellerApplyService.findOne(id);
			apply.setDocuments(new ArrayList<SellerApplyDoc>());

			model.addAttribute("sellerApply", apply);
		}
	}

}
