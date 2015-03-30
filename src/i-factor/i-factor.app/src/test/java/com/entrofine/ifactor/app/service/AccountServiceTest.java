package com.entrofine.ifactor.app.service;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import com.ddshell.framework.app.service.MimeMailService;

@ActiveProfiles("test")
@ContextConfiguration(locations = "classpath*:/com/ddshell/spring/*.xml")
public class AccountServiceTest extends
		AbstractTransactionalJUnit4SpringContextTests {

	@Autowired
	private AccountService service;
	@Autowired
	private MimeMailService mailService;

	@Before
	public void setUp() {

	}

	@After
	public void tearDown() {

	}

	@Test
	public void test() {
		mailService.send("EntroAuction@sina.com",
				new String[] { "duanaiguo163@163.com" }, "TEST", "haha哈哈");
	}
}
