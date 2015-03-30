package com.ddshell.spring;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Controller
@Configuration
@ComponentScan(basePackages = "com.entrofine.ifactor.**.controller", useDefaultFilters = false, includeFilters = { @ComponentScan.Filter(type = FilterType.ANNOTATION, value = {
		Controller.class, ControllerAdvice.class }) })
public class SpringMVCConfig {

}
