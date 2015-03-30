package com.entrofine.ifactor.app.script.exp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.script.DbExportScript;
import com.entrofine.ifactor.app.entity.Question;
import com.entrofine.ifactor.app.repository.QuestionRepository;

@Transactional(readOnly = true)
@Component
public class QuestionExportScript extends DbExportScript {

	@Autowired
	private QuestionRepository questionRep;

	public static void main(String[] args) throws Exception {
		export(QuestionExportScript.class);
	}

	@Override
	public void export() throws Exception {
		export(questionRep.findAll(), Question.class);
	}

}
