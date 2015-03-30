package com.entrofine.ifactor.app.script.init;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.script.DbInitScript;
import com.entrofine.ifactor.app.entity.Question;
import com.entrofine.ifactor.app.entity.QuestionOption;
import com.entrofine.ifactor.app.repository.QuestionRepository;

@Transactional(readOnly = true)
@Component
public class QuestionInitScript extends DbInitScript {

	@Autowired
	private QuestionRepository questionRep;

	public static void main(String[] args) throws Exception {
		init(QuestionInitScript.class);
	}

	@Transactional
	@Override
	public void init(File datafile) throws Exception {
		questionRep.deleteAll();

		List<Question> values = load(datafile, Question.class);
		for (Question question : values) {
			for (QuestionOption option : question.getOptions()) {
				option.setQuestion(question);
			}
		}
		questionRep.save(values);
	}

}
