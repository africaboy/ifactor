package com.ddshell.framework.app.shiro;

import java.util.Map.Entry;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.AntPathMatcher;
import org.apache.shiro.util.PatternMatcher;
import org.apache.shiro.web.servlet.AbstractShiroFilter;
import org.springframework.beans.factory.annotation.Autowired;

import com.ddshell.framework.app.shiro.entity.ShiroResource;
import com.ddshell.framework.app.shiro.service.ShiroResourceService;
import com.ddshell.framework.app.shiro.web.filter.ShiroFilterConfig;
import com.google.common.collect.LinkedHashMultimap;

public class ShiroDbFilterFactoryBean extends ShiroFilterFactoryBean implements
		PathFilter {

	@Autowired
	private ShiroResourceService resourceService;

	private PatternMatcher pathMatcher = new AntPathMatcher();
	private AbstractShiroFilter instance;
	private String basicChainDefinitions;

	@Override
	public void setFilterChainDefinitions(String definitions) {
		basicChainDefinitions = definitions;
		initFilterChainDefinitions();
	}

	@Override
	public boolean isAccessAllowed(String path) {
		Subject subject = SecurityUtils.getSubject();
		for (Entry<String, String> entry : getFilterChainDefinitionMap()
				.entrySet()) {
			if (pathMatcher.matches(entry.getKey(), path)) {
				return ShiroFilterConfig.matches(entry.getValue(), subject);
			}
		}
		return true;
	}

	@Override
	public Object getObject() throws Exception {
		if (instance == null) {
			instance = createInstance();
		}
		return instance;
	}

	public void init() {
		initFilterChainDefinitions();
		try {
			instance = createInstance();
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	private void initFilterChainDefinitions() {
		LinkedHashMultimap<String, String> cache = LinkedHashMultimap.create();
		for (ShiroResource resource : resourceService.findAll()) {
			String[] configStrings = ShiroFilterConfig
					.buildConfigStrings(resource.getPermission());
			for (String configString : configStrings) {
				cache.put(resource.getPattern(), configString);
			}
		}

		String sep = System.getProperty("line.separator");

		StringBuffer buf = new StringBuffer(basicChainDefinitions);
		for (String pattern : cache.keySet()) {
			String permission = ShiroFilterConfig.merge(cache.get(pattern));
			buf.append(sep).append(pattern).append("=").append(permission);
		}

		super.setFilterChainDefinitions(buf.toString());
	}

}
