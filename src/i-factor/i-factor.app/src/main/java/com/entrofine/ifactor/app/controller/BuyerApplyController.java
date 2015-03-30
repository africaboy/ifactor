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
import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.BuyerApplyDoc;
import com.entrofine.ifactor.app.service.AccountService;
import com.entrofine.ifactor.app.service.BuyerApplyQuestionService;
import com.entrofine.ifactor.app.service.BuyerApplyService;
import com.entrofine.ifactor.app.service.DataModifyRecordService;
import com.entrofine.ifactor.app.service.QuestionService;
import com.entrofine.ifactor.app.service.workflow.BuyerFlowStatus;

@Controller
public class BuyerApplyController {

	private static final Logger LOG = LoggerFactory
			.getLogger(BuyerApplyController.class);

	@Autowired
	AccountService accountService;
	@Autowired
	BuyerApplyService buyerApplyService;
	@Autowired
	QuestionService questionService;
	@Autowired
	BuyerApplyQuestionService buyerApplyQuestionService;
	@Autowired
	DataModifyRecordService dataModifyRecordService;

	@RequestMapping(value = "/buyer/account/apply", method = RequestMethod.GET)
	public String applyForm(Model model) {
		User loginUser = accountService.getLoginUser();
		model.addAttribute("user", loginUser);
		model.addAttribute("questions",
				questionService.findByQgroup("buyerApply"));
		model.addAttribute("questions2",
				questionService.findByQgroup("buyerApply2"));

		if (loginUser.getInvestAs() != null
				&& loginUser.getInvestAs().equals("Company/Institution")) {
			return "buyer/account/bc_application";
		} else {
			return "buyer/account/buyer_application";
		}
	}

	@RequestMapping(value = "/buyer/account/updateforapp", method = RequestMethod.GET)
	public String updateFormApp(Model model) {
		User loginUser = accountService.getLoginUser();
		BuyerApply buyerApply = buyerApplyService.findByBuyerId(loginUser
				.getId());
		if (buyerApply == null) {
			model.addAttribute("message",
					"Cannot find any buyer apply form for this user");
			// return "buyer/account/bc_update_application";
			return "buyer/account/message";
		}
		List<BuyerApplyDoc> buyerApplyDoc = buyerApply.getDocuments();
		List<String> modifyFields = dataModifyRecordService
				.findDataModifyFields("buyerApplyFlow", buyerApply.getId()
						.toString());
		model.addAttribute("user", loginUser);
		model.addAttribute("buyerApply", buyerApply);
		model.addAttribute("buyerApplyDoc", buyerApplyDoc);
		model.addAttribute("questions",
				questionService.findByQgroup("buyerApply"));
		model.addAttribute("questions2",
				questionService.findByQgroup("buyerApply2"));

		if (loginUser.getInvestAs() != null
				&& loginUser.getInvestAs().equals("Company/Institution")) {
			if (buyerApply.getFlowStatus() == null
					|| "".equals(buyerApply.getFlowStatus())) {
				return "buyer/account/bc_resume_application";
			} else {
				model.addAttribute("modifyFields", modifyFields);
				model.addAttribute("isModifyStatus",
						BuyerFlowStatus.isModify(buyerApply.getFlowStatus()));
				return "buyer/account/bc_update_application";
			}
		} else {
			if (buyerApply.getFlowStatus() == null
					|| "".equals(buyerApply.getFlowStatus())) {
				return "buyer/account/bp_resume_application";
			} else {
				model.addAttribute("modifyFields", modifyFields);
				model.addAttribute("isModifyStatus",
						BuyerFlowStatus.isModify(buyerApply.getFlowStatus()));
				return "buyer/account/bp_update_application";
			}
		}
	}

	@RequestMapping(value = "/buyer/account/update", method = RequestMethod.GET)
	public String updateForm(Model model) {
		User loginUser = accountService.getLoginUser();
		BuyerApply buyerApply = buyerApplyService.findByBuyerId(loginUser
				.getId());
		if (buyerApply == null) {
			model.addAttribute("message",
					"Cannot find any buyer apply form for this user");
			// return "buyer/account/bc_update_application";
			return "buyer/account/message";
		}
		List<BuyerApplyDoc> buyerApplyDoc = buyerApply.getDocuments();
		List<String> modifyFields = dataModifyRecordService
				.findDataModifyFields("buyerApplyFlow", buyerApply.getId()
						.toString());
		model.addAttribute("user", loginUser);
		model.addAttribute("buyerApply", buyerApply);
		model.addAttribute("buyerApplyDoc", buyerApplyDoc);
		model.addAttribute("questions",
				questionService.findByQgroup("buyerApply"));
		model.addAttribute("questions2",
				questionService.findByQgroup("buyerApply2"));

		if (loginUser.getInvestAs() != null
				&& loginUser.getInvestAs().equals("Company/Institution")) {
			if (buyerApply.getFlowStatus() == null
					|| "".equals(buyerApply.getFlowStatus())) {
				return "buyer/account/bc_resume_application";
			} else {
				model.addAttribute("modifyFields", modifyFields);
				model.addAttribute("isModifyStatus",
						BuyerFlowStatus.isModify(buyerApply.getFlowStatus()));
				return "buyer/account/bc_update_application";
			}
		} else {
			if (buyerApply.getFlowStatus() == null
					|| "".equals(buyerApply.getFlowStatus())) {
				return "buyer/account/bp_resume_application";
			} else {
				model.addAttribute("modifyFields", modifyFields);
				model.addAttribute("isModifyStatus",
						BuyerFlowStatus.isModify(buyerApply.getFlowStatus()));
				return "buyer/account/bp_update_application";
			}
		}
	}

	@RequestMapping(value = "/buyer/account/updateforapp", method = RequestMethod.POST)
	@ResponseBody
	public Serializable updateforapp(
			@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("buyerApply") BuyerApply buyerApply, Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {
			if (isCommit) {
				buyerApplyService.commitApply(buyerApply);
				// message = "Your account has been successfully submited";
				message = "buyer.apply.message.successSubmitted";
			} else {
				buyerApplyService.saveApply(buyerApply);
				// message = "Your account has been successfully updated";
				message = "buyer.apply.message.successUpdated";
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

	@RequestMapping(value = "/buyer/account/update", method = RequestMethod.POST)
	@ResponseBody
	public Serializable update(@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("buyerApply") BuyerApply buyerApply, Model model) {
		AjaxOperResponse response = null;
		String message = "";
		try {
			if (isCommit) {
				buyerApplyService.commitApply(buyerApply);
				// message = "Your account has been successfully submited";
				message = "buyer.apply.message.successSubmitted";
			} else {
				buyerApplyService.saveApply(buyerApply);
				// message = "Your account has been successfully updated";
				message = "buyer.apply.message.successUpdated";
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

	@RequestMapping(value = "/buyer/account/view", method = RequestMethod.GET)
	public String viewForm(Model model) {
		User loginUser = accountService.getLoginUser();
		BuyerApply buyerApply = buyerApplyService.findByBuyerId(loginUser
				.getId());

		if (buyerApply == null) {
			model.addAttribute("message",
					"Cannot find any buyer apply form for this user");
			return "buyer/account/message";
			// return "buyer/account/bc_vew_application";
		}
		List<BuyerApplyDoc> buyerApplyDoc = buyerApply.getDocuments();
		model.addAttribute("user", loginUser);
		model.addAttribute("buyerApply", buyerApply);
		model.addAttribute("buyerApplyDoc", buyerApplyDoc);
		model.addAttribute("questions",
				questionService.findByQgroup("buyerApply"));
		model.addAttribute("questions2",
				questionService.findByQgroup("buyerApply2"));

		if (loginUser.getInvestAs() != null
				&& loginUser.getInvestAs().equals("Company/Institution")) {
			return "buyer/account/bc_vew_application";
		} else {
			return "buyer/account/bp_vew_application";
		}
	}

	/**
	 * update by xuliufang 2014-12-25
	 * 
	 * @param isCommit
	 * @param buyerApply
	 * @param mdel
	 * @return
	 */
	@RequestMapping(value = "/buyer/account/apply", method = RequestMethod.POST)
	@ResponseBody
	public Serializable apply(@RequestParam("isCommit") Boolean isCommit,
			@ModelAttribute("buyerApply") BuyerApply buyerApply, Model mdel) {

		AjaxOperResponse response = null;
		String message = "";
		try {
			if (isCommit) {
				buyerApplyService.commitApply(buyerApply);
				message = "buyer.apply.message.successSubmitted";
			} else {
				buyerApplyService.saveApply(buyerApply);
				message = "buyer.apply.message.successSaved";
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

	@RequestMapping(value = "/buyer/message", method = RequestMethod.GET)
	public String showMessage(@RequestParam("success") Boolean success,
			Model model) {
		String message = "";
		if (success) {
			message = "Operation succeed.";
		} else {
			message = "Operation failed.";
		}
		model.addAttribute("message", message);
		return "buyer/applytobuyer/message";
	}

	@RequestMapping(value = "/buyer/register/applymsg", method = RequestMethod.GET)
	public String showMessage(Model model) {
		model.addAttribute("message", "This is test string!");

		return "buyer/account/message";
	}

	@ModelAttribute
	public void getBuyerApply(
			@RequestParam(value = "id", defaultValue = "-1") Long id,
			Model model) {
		if (id > 0) {
			BuyerApply apply = buyerApplyService.findOne(id);
			apply.setDocuments(new ArrayList<BuyerApplyDoc>());

			model.addAttribute("buyerApply", apply);
		}
	}

}
