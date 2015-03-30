package com.ddshell.framework.app.service;

import java.io.IOException;
import java.util.Locale;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.ddshell.framework.app.service.support.GlobalVars;
import com.ddshell.framework.app.util.FreemarkerUtils;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Component
public class MimeMailService {

	private static Logger LOG = LoggerFactory.getLogger(MimeMailService.class);

	@Autowired
	private GlobalVars globalVars;
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	private Configuration freemarkerConfiguration;
	@Autowired
	private MessageSource messageSource;

	public void send(String[] to, String mailName, Object context,
			Locale locale, String defaultMailSubject) {
		String subject = getMailSubject(mailName, locale, defaultMailSubject);
		String templateName = getMailTemplateName(mailName);

		send(to, subject, templateName, locale, context);
	}

	public void send(String[] to, String subject, String templateName,
			Locale locale, Object context) {
		send(globalVars.mailFrom, to, subject, templateName, locale, context);
	}

	public void send(String[] to, String subject, String text) {
		send(globalVars.mailFrom, to, subject, text);
	}

	@Async
	public void send(String from, String[] to, String subject,
			String templateName, Locale locale, Object context) {
		try {
			Template template = freemarkerConfiguration.getTemplate(
					templateName, locale);
			send(from, to, subject,
					FreemarkerUtils.renderTemplate(template, context));
		} catch (IOException e) {
			LOG.error(e.getMessage(), e);
		}
	}

	@Async
	public void send(String from, String[] to, String subject, String text) {
		MimeMessage msg = mailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(msg, true,
					globalVars.mailEncoding);
			helper.setFrom(from);
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(text, true);
		} catch (MessagingException e) {
			LOG.error(e.getMessage(), e);
			return;
		}

		try {
			mailSender.send(msg);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private String getMailSubject(String mailName, Locale locale,
			String defaultMailSubject) {
		try {
			return messageSource.getMessage("mail.subject." + mailName, null,
					locale);
		} catch (Exception e) {
			return defaultMailSubject;
		}
	}

	private String getMailTemplateName(String mailName) {
		StringBuffer buf = new StringBuffer();

		buf.append("mail/").append(mailName).append(".ftl");

		return buf.toString();
	}

}
