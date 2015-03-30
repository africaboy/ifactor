package com.entrofine.ifactor.app.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.entrofine.ifactor.app.entity.Message;
import com.entrofine.ifactor.app.service.MessageService;

@Controller
public class MessageController {
	private static final Logger LOG = LoggerFactory
			.getLogger(MessageController.class);

	@Autowired
	private MessageService messageService;

	/**
	 * add by liulongxiang 2014-7-9
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = { "/message/inbox", "/message/messageList" })
	public String messageList(
			@RequestParam(value = "createTimeFrom", required = false) String createTimeFrom,
			@RequestParam(value = "createTimeTo", required = false) String createTimeTo,
			@RequestParam(value = "pageNumber", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", required = false) Integer pageSize,
			Model model) {
		LOG.debug("method=>messageList()");
		if (pageNumber == null) {
			pageNumber = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}
		Page<Message> messages;
		Date dtCreateTimeFrom = null, dtCreateTimeTo = null;
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			dtCreateTimeFrom = dateFormat.parse(createTimeFrom);
			dtCreateTimeTo = dateFormat.parse(createTimeTo);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		if (dtCreateTimeFrom == null && dtCreateTimeTo == null) {
			messages = messageService.findAll(pageNumber, pageSize, null);
		} else if (dtCreateTimeFrom != null && dtCreateTimeTo == null) {
			messages = messageService.getMessagesByCreateTimeFrom(
					dtCreateTimeFrom, pageNumber, pageSize);
		} else if (dtCreateTimeFrom == null && dtCreateTimeTo != null) {
			messages = messageService.getMessagesByCreateTimeTo(dtCreateTimeTo,
					pageNumber, pageSize);
		} else {
			/*
			 * messages = messageService.getMessagesByCreateTime(createTimeFrom,
			 * createTimeTo, pageNumber, pageSize);
			 */
			messages = messageService.getMessagesByCreateTime(dtCreateTimeFrom,
					dtCreateTimeTo, pageNumber, pageSize);
		}
		model.addAttribute("page", messages);

		return "message/messagelist";
	}

	@RequestMapping(value = "/message/delete/{id}", method = RequestMethod.GET)
	public String delete(@PathVariable Long id, Model model) {
		LOG.debug("metod=>delete");
		try {
			messageService.delete(id);
			model.addAttribute("message", "delete success!");
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			model.addAttribute("message", "delete error!");
		}
		return "message/message";
	}

}
