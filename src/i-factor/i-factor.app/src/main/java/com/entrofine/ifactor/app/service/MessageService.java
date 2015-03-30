package com.entrofine.ifactor.app.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.app.entity.Message;
import com.entrofine.ifactor.app.repository.MessageRepository;

@Component
public class MessageService extends GenericCrudService<Message, Long> {

	@Autowired
	private MessageRepository messageRep;

	@Override
	protected JpaRepository<Message, Long> getRepository() {
		return messageRep;
	}

	@Transactional
	public Page<Message> getMessagesByCreateTime(Date createTimeFrom,
			Date createTimeTo, int pageNo, int pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		Page<Message> messages = messageRep.findByCreateTimeBetween(pageable,
				createTimeFrom, createTimeTo);
		return messages;
	}

	@Transactional
	public Page<Message> getMessagesByCreateTimeFrom(Date createTimeFrom,
			Integer pageNumber, Integer pageSize) {

		Pageable pageable = new PageRequest(pageNumber, pageSize);
		Page<Message> messages = messageRep.findByCreateTimeGreaterThanEqual(
				pageable, createTimeFrom);
		return messages;
	}

	@Transactional
	public Page<Message> getMessagesByCreateTimeTo(Date createTimeTo,
			Integer pageNumber, Integer pageSize) {
		Pageable pageable = new PageRequest(pageNumber, pageSize);
		Page<Message> messages = messageRep.findByCreateTimeLessThanEqual(
				pageable, createTimeTo);
		return messages;
	}

}
