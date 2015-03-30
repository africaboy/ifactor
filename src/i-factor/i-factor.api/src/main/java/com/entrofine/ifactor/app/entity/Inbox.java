package com.entrofine.ifactor.app.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.entrofine.ifactor.jpa.InboxEntity;

@Entity
@Table(name = Inbox.TABLE)
public class Inbox extends InboxEntity implements Serializable {
	private static final long serialVersionUID = 6484150493697899749L;

	private Long applyId;

	private String title;
	@Column(length = 4000, name = "CONTENT")
	private String content;

	private String status;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getApplyId() {
		return applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}
}
