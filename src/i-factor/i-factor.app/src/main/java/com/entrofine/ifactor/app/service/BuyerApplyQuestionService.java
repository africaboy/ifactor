package com.entrofine.ifactor.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.app.entity.BuyerApplyQuestion;
import com.entrofine.ifactor.app.repository.BuyerApplyQuestionRepository;

@Component
@Transactional(readOnly = true)
public class BuyerApplyQuestionService extends
		GenericCrudService<BuyerApplyQuestion, Long> {

	@Autowired
	private BuyerApplyQuestionRepository applyQuestionRepository;

	@Override
	protected JpaRepository<BuyerApplyQuestion, Long> getRepository() {
		return applyQuestionRepository;
	}

}
