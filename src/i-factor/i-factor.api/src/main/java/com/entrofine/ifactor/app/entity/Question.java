package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.entrofine.ifactor.jpa.QuestionEntity;

@Entity
@Table(name = Question.TABLE)
public class Question extends QuestionEntity implements Serializable {

	private static final long serialVersionUID = -7272855480123973980L;

	private String qname;
	private String qgroup;
	private String qtext;
	private String atype;

	private String qtextViVn;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question")
	@OrderBy("dispOrder")
	private List<QuestionOption> options = new ArrayList<QuestionOption>();

	/**
	 * 问题名称
	 * 
	 * @return
	 */
	public String getQname() {
		return qname;
	}

	public void setQname(String qname) {
		this.qname = qname;
	}

	/**
	 * 问题分组
	 * 
	 * @return
	 */
	public String getQgroup() {
		return qgroup;
	}

	public void setQgroup(String qgroup) {
		this.qgroup = qgroup;
	}

	/**
	 * 问题内容
	 * 
	 * @return
	 */
	public String getQtext() {
		return qtext;
	}

	public void setQtext(String qtext) {
		this.qtext = qtext;
	}

	/**
	 * 答案类型：text、date、radio、select、checkbox
	 * 
	 * @return
	 */
	public String getAtype() {
		return atype;
	}

	public void setAtype(String atype) {
		this.atype = atype;
	}

	/**
	 * 答案选项
	 * 
	 * @return
	 */
	public List<QuestionOption> getOptions() {
		return options;
	}

	public void setOptions(List<QuestionOption> options) {
		this.options = options;
	}

	public String getQtextViVn() {
		return qtextViVn;
	}

	public void setQtextViVn(String qtextViVn) {
		this.qtextViVn = qtextViVn;
	}

}
