package com.entrofine.ifactor.api.service.impl;

import org.apache.shiro.codec.Base64;
import org.springframework.stereotype.Component;

import com.ddshell.framework.api.service.SecretKeyService;
import com.ddshell.framework.api.util.Cryptos;

@Component
public class SecretKeyServiceImpl implements SecretKeyService {

	private static final int KEYSIZE = 128;

	public static void main(String[] args) throws Exception {
		String hmacKey = Base64.encodeToString(Cryptos
				.generateHmacSha1Key(KEYSIZE));
		System.out.println(hmacKey);

		String aesKey = Base64.encodeToString(Cryptos.generateAesKey(KEYSIZE));
		System.out.println(aesKey);
	}

	@Override
	public byte[] getHmacKey(String sessionId) {
		return Base64.decode("s8/6uX+9j9kNXH9REbQgjw==");
	}

	@Override
	public byte[] getAesKey(String sessionId) {
		return Base64.decode("DuUv02tLhCWfGMsCZMBLNA==");
	}

}
