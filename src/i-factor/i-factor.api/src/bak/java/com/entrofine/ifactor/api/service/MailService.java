package com.entrofine.ifactor.api.service;

public interface MailService {

	public void send(String from, String[] to, String subject, String text);

}
