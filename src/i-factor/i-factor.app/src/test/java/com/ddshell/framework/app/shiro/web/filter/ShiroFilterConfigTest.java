package com.ddshell.framework.app.shiro.web.filter;

import static org.junit.Assert.assertEquals;

import java.util.LinkedHashSet;

import org.junit.Test;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;

public class ShiroFilterConfigTest {

	@Test
	public void test() {
		LinkedHashSet<String> configSettings = Sets
				.newLinkedHashSet(Lists.newArrayList("roles[foo1,foo2,bar1]",
						"roles[foo1,bar1,bar2]"));
		assertEquals("roles[foo1,foo2,bar1,bar2]",
				ShiroFilterConfig.merge(configSettings));
	}

}
