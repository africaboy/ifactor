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
import com.entrofine.ifactor.app.entity.SellerApply;
import com.entrofine.ifactor.app.entity.SellerApplyDoc;
import com.entrofine.ifactor.app.repository.SellerApplyDocRepository;
import com.entrofine.ifactor.app.repository.SellerApplyRepository;

@Component
public class SellerApplyService extends GenericCrudService<SellerApply, Long> {

	@Autowired
	private SellerApplyRepository applyRep;
	@Autowired
	private SellerApplyDocRepository applyDocRep;
	@Autowired
	private WorkflowService workflowService;
	@Autowired
	AccountService accountService;

	public SellerApply getSellerApply() {
		User loginUser = accountService.getLoginUser();
		return applyRep.findBySellerId(loginUser.getId());
	}

	@Transactional
	public SellerApply saveApply(SellerApply apply) {
		return saveApply(apply, AppRole.PRE_SELLER_UPDATEAPP.toString());
	}

	@Transactional
	public SellerApply commitApply(SellerApply apply) {
		apply.setFlowOpinion(null);
		Date systemDate = new Date();
		apply.setSubmissionDate(systemDate);

		Calendar ca = Calendar.getInstance();
		ca.add(Calendar.HOUR_OF_DAY, 72);
		Date deadLineDate = ca.getTime();

		apply.setDeadLineDate(deadLineDate);

		apply = saveApply(apply, AppRole.PRE_SELLER_VIEW.toString());

		if (StringUtils.isEmpty(apply.getFlowStatus())) {
			workflowService.startSmeWorkflow(apply);
		} else {
			workflowService.updateSmeWorkflow(apply);
		}
		return apply;
	}

	@Override
	protected JpaRepository<SellerApply, Long> getRepository() {
		return applyRep;
	}

	@Transactional
	private SellerApply saveApply(SellerApply apply, String roleName) {
		User loginUser = accountService.getLoginUser();

		List<SellerApplyDoc> documents = apply.getDocuments();
		apply.setDocuments(new ArrayList<SellerApplyDoc>());
		if (apply.getId() != null) {
			applyDocRep.setBizToNull(apply.getId());
		}

		apply.setSellerId(loginUser.getId());
		apply.setSellerLoginName(loginUser.getLoginName());

		apply = super.save(apply);

		for (SellerApplyDoc document : documents) {
			Long id = document.getId();
			if (id != null) {
				SellerApplyDoc doc = applyDocRep.findOne(id);
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

	/**
	 * add by xuliufang 2014-12-22
	 * 
	 * @param id
	 * @return
	 */
	public SellerApply getSellerApply(Long id) {
		return applyRep.findBySellerId(id);
	}

}
