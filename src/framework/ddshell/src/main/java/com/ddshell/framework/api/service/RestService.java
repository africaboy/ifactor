package com.ddshell.framework.api.service;

import org.apache.shiro.codec.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.ddshell.framework.api.entity.RemoteMessage;
import com.ddshell.framework.api.util.Cryptos;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class RestService {

	public static final String SESSION_NO = "SESSION_NO";

	private static final Logger LOG = LoggerFactory
			.getLogger(RestService.class);

	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private SecretKeyService secretKeyService;

	private ObjectMapper objectMapper = new ObjectMapper();

	@Async
	public <T> T post(String sessionId, String url, Object request,
			Class<T> responseType) {
		RemoteMessage message = post(sessionId, url, request);

		try {
			return decrypt(message, responseType);
		} catch (Throwable t) {
			LOG.error(t.getMessage(), t);
			throw new RuntimeException(t.getMessage(), t);
		}
	}

	@Async
	public Object postEx(String sessionId, String url, Object request,
			Class<?> parametrizedResponseType, Class<?>... parameterClasses) {
		RemoteMessage message = post(sessionId, url, request);

		try {
			return decrypt(message, parametrizedResponseType, parameterClasses);
		} catch (Throwable t) {
			LOG.error(t.getMessage(), t);
			throw new RuntimeException(t.getMessage(), t);
		}
	}

	public <T> RemoteMessage service(RemoteMessage message,
			MessageService service, Class<T> requestType) {

		onFail(message);

		String sessionId = message.getSessionId();
		try {
			return encrypt(sessionId,
					service.execute(decrypt(message, requestType)));
		} catch (Throwable t) {
			return fail(sessionId, t);
		}
	}

	public RemoteMessage serviceEx(RemoteMessage message,
			MessageService service, Class<?> parametrizedRequestType,
			Class<?>... parameterClasses) {

		onFail(message);

		String sessionId = message.getSessionId();
		try {
			return encrypt(sessionId, service.execute(decrypt(message,
					parametrizedRequestType, parameterClasses)));
		} catch (Throwable t) {
			return fail(sessionId, t);
		}
	}

	private RemoteMessage post(String sessionId, String url, Object request) {
		LOG.info("POST {}", url);

		RemoteMessage message = null;

		try {
			message = restTemplate.postForObject(url,
					encrypt(sessionId, request), RemoteMessage.class);
		} catch (Throwable t) {
			LOG.error(t.getMessage(), t);
			throw new RuntimeException(t.getMessage(), t);
		}

		onFail(message);

		return message;
	}

	private RemoteMessage encrypt(String sessionId, Object value)
			throws Exception {
		byte[] ciphertext = Cryptos.aesEncrypt(
				objectMapper.writeValueAsBytes(value),
				secretKeyService.getAesKey(sessionId));

		byte[] mac = Cryptos.hmacSha1(ciphertext,
				secretKeyService.getHmacKey(sessionId));

		return new RemoteMessage(sessionId, Base64.encodeToString(ciphertext),
				Base64.encodeToString(mac));
	}

	private <T> T decrypt(RemoteMessage message, Class<T> valueType)
			throws Exception {
		return objectMapper.readValue(decrypt(message), valueType);
	}

	private Object decrypt(RemoteMessage message, Class<?> parametrized,
			Class<?>... parameterClasses) throws Exception {
		JavaType javaType = objectMapper.getTypeFactory()
				.constructParametricType(parametrized, parameterClasses);
		return objectMapper.readValue(decrypt(message), javaType);
	}

	private byte[] decrypt(RemoteMessage message) {
		byte[] hmacKey = secretKeyService.getHmacKey(message.getSessionId());
		if (!Cryptos
				.isMacValid(message.getMac(), message.getContent(), hmacKey)) {
			throw new RuntimeException("mac invalid.");
		}

		byte[] aesKey = secretKeyService.getAesKey(message.getSessionId());
		return Cryptos.aesDecrypt(message.getContent(), aesKey);
	}

	private void onFail(RemoteMessage message) {
		if (message == null) {
			return;
		}

		if (RemoteMessage.FAIL.equalsIgnoreCase(message.getStatusCode())) {
			RuntimeException t = new RuntimeException(
					message.getStatusMessage(), new Exception(
							message.getStatusCode()));
			LOG.error(t.getMessage(), t);
			throw t;
		}

	}

	private RemoteMessage fail(String sessionId, Throwable t) {
		LOG.error(t.getMessage(), t);
		return new RemoteMessage(RemoteMessage.FAIL, t.getMessage(), sessionId,
				null, null);
	}

}
