package com.entrofine.ifactor.app.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.entrofine.ifactor.jpa.QuestionOptionEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = QuestionOption.TABLE)
public class QuestionOption extends QuestionOptionEntity implements
		Serializable {

	private static final long serialVersionUID = -1130475791693061211L;

	private String atext;
	private String checked;
	private Integer dispOrder = 9999;
	private String atextViVn;

	@ManyToOne
	@JoinColumn(name = "qid")
	@JsonIgnore
	private Question question;

	public String getAtext() {
		return atext;
	}

	public void setAtext(String atext) {
		this.atext = atext;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	public Integer getDispOrder() {
		return dispOrder;
	}

	public void setDispOrder(Integer dispOrder) {
		this.dispOrder = dispOrder;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public String getAtextViVn() {
		return atextViVn;
	}

	public void setAtextViVn(String atextViVn) {
		this.atextViVn = atextViVn;
	}

}
