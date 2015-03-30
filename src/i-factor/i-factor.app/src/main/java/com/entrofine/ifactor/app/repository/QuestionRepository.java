package com.entrofine.ifactor.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entrofine.ifactor.app.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

	public List<Question> findByQgroup(String qgroup);

}
