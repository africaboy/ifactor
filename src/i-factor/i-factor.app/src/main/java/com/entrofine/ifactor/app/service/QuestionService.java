package com.entrofine.ifactor.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.app.entity.Question;
import com.entrofine.ifactor.app.repository.QuestionRepository;

@Component
@Transactional(readOnly = true)
public class QuestionService extends GenericCrudService<Question, Long> {

	@Autowired
	private QuestionRepository questionRep;

	@Override
	protected JpaRepository<Question, Long> getRepository() {
		return questionRep;
	}

	public List<Question> findByQgroup(String qgroup) {
		return questionRep.findByQgroup(qgroup);
	}

}
