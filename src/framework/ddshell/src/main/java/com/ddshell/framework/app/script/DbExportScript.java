package com.ddshell.framework.app.script;

import java.util.List;

import com.ddshell.framework.app.util.AppContextUtils;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.Annotated;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

public abstract class DbExportScript {

	protected static void export(Class<? extends DbExportScript> scriptClass)
			throws Exception {
		AppContextUtils.getBean(scriptClass).export();
	}

	protected static <T> void export(List<T> value, Class<T> entityClass)
			throws Exception {
		final String filterName = entityClass.getName();
		String[] excludeProperties = { "createTime", "updateTime", "id" };

		JacksonAnnotationIntrospector ai = new JacksonAnnotationIntrospector() {
			private static final long serialVersionUID = 1L;

			@Override
			public Object findFilterId(Annotated a) {
				return filterName;
			}
		};
		SimpleFilterProvider filters = new SimpleFilterProvider().addFilter(
				filterName,
				SimpleBeanPropertyFilter.serializeAllExcept(excludeProperties));
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.setSerializationInclusion(Include.NON_NULL);
		objectMapper.setFilters(filters);
		objectMapper.setAnnotationIntrospector(ai);

		System.out.println(objectMapper.writerWithDefaultPrettyPrinter()
				.writeValueAsString(value));
	}

	public abstract void export() throws Exception;

}
