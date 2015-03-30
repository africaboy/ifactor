package com.entrofine.ifactor.app.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.ddshell.framework.app.entity.User;
import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.api.service.WorkflowService;
import com.entrofine.ifactor.app.entity.AppRole;
import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.BuyerApplyDoc;
import com.entrofine.ifactor.app.entity.BuyerApplyQuestion;
import com.entrofine.ifactor.app.repository.BuyerApplyDocRepository;
import com.entrofine.ifactor.app.repository.BuyerApplyRepository;

@Component
public class BuyerApplyService extends GenericCrudService<BuyerApply, Long> {

	@Autowired
	BuyerApplyRepository applyRep;
	@Autowired
	BuyerApplyDocRepository applyDocRep;
	@Autowired
	private WorkflowService workflowService;
	@Autowired
	AccountService accountService;

	@Transactional
	public BuyerApply findByBuyerId(Long buyerId) {
		return applyRep.findByBuyerId(buyerId);
	}

	@Transactional
	public BuyerApply saveApply(BuyerApply apply) {
		return saveApply(apply, AppRole.PRE_BUYER_UPDATEAPP.toString());
	}

	@Transactional
	public BuyerApply commitApply(BuyerApply apply) {
		apply.setFlowOpinion(null);
		Date nowDate = new Date();

		Calendar ca = Calendar.getInstance();
		ca.add(Calendar.HOUR_OF_DAY, 72);
		Date deadLineDate = ca.getTime();

		apply.setDeadLineDate(deadLineDate);
		apply.setSubmissionDate(nowDate);
		apply = saveApply(apply, AppRole.PRE_BUYER_VIEW.toString());

		if (StringUtils.isEmpty(apply.getFlowStatus())) {
			workflowService.startBuyerWorkflow(apply);
		} else {
			workflowService.updateBuyerWorkflow(apply);
		}
		return apply;
	}

	@Override
	protected JpaRepository<BuyerApply, Long> getRepository() {
		return applyRep;
	}

	private BuyerApply saveApply(BuyerApply apply, String roleName) {
		User loginUser = accountService.getLoginUser();

		apply.setBuyerId(loginUser.getId());
		apply.setBuyerLoginName(loginUser.getLoginName());

		List<BuyerApplyDoc> documents = apply.getDocuments();
		apply.setDocuments(new ArrayList<BuyerApplyDoc>());
		if (apply.getId() != null) {
			applyDocRep.setBizToNull(apply.getId());
		}

		List<BuyerApplyQuestion> questions = apply.getQuestions();
		for (BuyerApplyQuestion question : questions) {
			question.setBiz(apply);
		}

		apply = super.save(apply);

		for (BuyerApplyDoc document : documents) {
			Long id = document.getId();
			if (id != null) {
				BuyerApplyDoc doc = applyDocRep.findOne(id);
				if (doc != null) {
					doc.setBiz(apply);
					doc.setDispOrder(document.getDispOrder());
					apply.getDocuments().add(doc);
					applyDocRep.save(doc);
				}
			}
		}

		if (!loginUser.getRoleNames().contains(roleName)) {
			accountService.saveAs(loginUser.getId(), roleName);
		}

		return apply;
	}

}
