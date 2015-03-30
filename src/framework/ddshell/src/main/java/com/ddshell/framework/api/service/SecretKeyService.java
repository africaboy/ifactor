package com.ddshell.framework.api.service;

public interface SecretKeyService {

	public byte[] getHmacKey(String sessionId);

	public byte[] getAesKey(String sessionId);

}
