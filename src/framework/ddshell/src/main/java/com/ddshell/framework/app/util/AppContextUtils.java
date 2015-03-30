package com.ddshell.framework.app.util;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AppContextUtils {

	private static ClassPathXmlApplicationContext ctx;

	public static <T> T getBean(Class<T> requiredType) {
		return getContext().getBean(requiredType);
	}

	private static ClassPathXmlApplicationContext getContext() {
		if (ctx == null) {
			System.setProperty("spring.profiles.active", "production");
			ctx = new ClassPathXmlApplicationContext(
					"classpath*:/com/ddshell/spring/*.xml",
					"classpath:/spring/*.xml");
		}

		return ctx;
	}

}
