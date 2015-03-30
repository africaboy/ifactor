package com.ddshell.framework.app.service.support;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GlobalVars {

	@Value("${app.fs.root:/var/ddshell/app/fs}")
	public String fileSystemRoot;

	@Value("${app.theme:default}")
	public String theme;

	@Value("${app.defaultPageSize:20}")
	public int defaultPageSize;

	@Value("${app.maxPageSize:100}")
	public int maxPageSize;

	@Value("${app.displayPages:10}")
	public int displayPages;

	@Value("${app.shiro.hashAlgorithmName}")
	public String hashAlgorithmName;

	@Value("${app.shiro.hashIterations}")
	public int hashIterations;

	@Value("${mail.smtp.defaultEncoding:UTF-8}")
	public String mailEncoding;

	@Value("${mail.smtp.from:ddshell@gmail.com}")
	public String mailFrom;

}
