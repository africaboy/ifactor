package com.entrofine.ifactor.app.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.entrofine.ifactor.jpa.MessageEntity;

@Entity
@Table(name = Message.TABLE)
public class Message extends MessageEntity implements Serializable {

	private static final long serialVersionUID = 6484150493697899749L;

	private String title;

	private String content;

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

}
