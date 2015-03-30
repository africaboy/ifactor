package com.ddshell.framework.api.util;

import java.security.Security;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.shiro.codec.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.util.StringUtils;

public class Cryptos {

	private static final String AES = "AES";
	private static final String HMACSHA1 = "HmacSHA1";
	private static final String AES_PADDING_SCHEME = "AES/ECB/PKCS7Padding";

	static {
		Security.addProvider(new BouncyCastleProvider());
	}

	/**
	 * @param mac
	 * @param input
	 * @param key
	 * @return
	 */
	public static boolean isMacValid(String mac, String input, byte[] key) {
		if (StringUtils.isEmpty(mac)) {
			return StringUtils.isEmpty(input);
		}

		return mac.equals(hmacSha1(input, key));
	}

	/**
	 * AES算法解密
	 * 
	 * @param ciphertext
	 *            base64编码的密文
	 * @param key
	 *            本地存储的密钥
	 * @return
	 */
	public static byte[] aesDecrypt(String ciphertext, byte[] key) {
		try {
			return aesDecrypt(Base64.decode(ciphertext), key);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	public static String hmacSha1(String input, byte[] key) {
		try {
			return Base64.encodeToString(hmacSha1(Base64.decode(input), key));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static byte[] aesEncrypt(byte[] plaintext, byte[] key) {
		try {
			SecretKeySpec secretKey = new SecretKeySpec(key, AES);

			Cipher cipher = Cipher.getInstance(AES_PADDING_SCHEME,
					BouncyCastleProvider.PROVIDER_NAME);
			cipher.init(Cipher.ENCRYPT_MODE, secretKey);
			return cipher.doFinal(plaintext);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	public static byte[] aesDecrypt(byte[] ciphertext, byte[] key) {
		try {
			Security.addProvider(new BouncyCastleProvider());
			SecretKeySpec secretKey = new SecretKeySpec(key, AES);

			Cipher cipher = Cipher.getInstance(AES_PADDING_SCHEME,
					BouncyCastleProvider.PROVIDER_NAME);
			cipher.init(Cipher.DECRYPT_MODE, secretKey);
			return cipher.doFinal(ciphertext);

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	public static byte[] hmacSha1(byte[] input, byte[] key) {
		try {
			SecretKeySpec secretKey = new SecretKeySpec(key, HMACSHA1);
			Mac mac = Mac.getInstance(HMACSHA1);
			mac.init(secretKey);
			return mac.doFinal(input);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	public static byte[] generateHmacSha1Key(int size) {
		try {
			KeyGenerator keyGenerator = KeyGenerator.getInstance(HMACSHA1);
			keyGenerator.init(size);
			SecretKey secretKey = keyGenerator.generateKey();
			return secretKey.getEncoded();
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	public static byte[] generateAesKey(int size) {
		try {
			KeyGenerator keyGenerator = KeyGenerator.getInstance(AES);
			keyGenerator.init(size);
			SecretKey secretKey = keyGenerator.generateKey();
			return secretKey.getEncoded();
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}
}
