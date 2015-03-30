package com.entrofine.ifactor.app.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.entrofine.ifactor.jpa.BuyerApplyQuestionEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = BuyerApplyQuestion.TABLE)
public class BuyerApplyQuestion extends BuyerApplyQuestionEntity implements
		Serializable {

	private static final long serialVersionUID = -3036416214593495324L;

	private Long qid;
	private String qname;
	private String atext;
	private String atextViVn;
	@ManyToOne
	@JoinColumn(name = "BIZ_ID")
	@JsonIgnore
	private BuyerApply biz;

	/**
	 * 问题
	 * 
	 * @return
	 */
	public Long getQid() {
		return qid;
	}

	public void setQid(Long qid) {
		this.qid = qid;
	}

	public String getQname() {
		return qname;
	}

	public void setQname(String qname) {
		this.qname = qname;
	}

	/**
	 * 答案
	 * 
	 * @return
	 */
	public String getAtext() {
		return atext;
	}

	public void setAtext(String atext) {
		this.atext = atext;
	}

	public BuyerApply getBiz() {
		return biz;
	}

	public void setBiz(BuyerApply biz) {
		this.biz = biz;
	}

	public String getAtextViVn() {
		return atextViVn;
	}

	public void setAtextViVn(String atextViVn) {
		this.atextViVn = atextViVn;
	}

}
