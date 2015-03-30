package com.entrofine.ifactor.shiro.web.filter.authc;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.web.filter.AccessControlFilter;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.github.zhangkaitao.shiro.chapter22.jcaptcha.JCaptcha;

@Component("jcaptchaVf")
@Lazy(false)
public class JCaptchaValidateFilter extends AccessControlFilter {

	public static final String JCAPTCHA_VFCODE_PARAM = "jcaptchaVfCode";

	private static final String ACCESS_DENIED = JCaptchaValidateFilter.class
			+ ".ACCESS_DENIED";

	public static boolean isAccessDenied(HttpServletRequest request) {
		return Boolean.TRUE.equals(request.getAttribute(ACCESS_DENIED));
	}

	@Override
	protected boolean isAccessAllowed(ServletRequest request,
			ServletResponse response, Object mappedValue) throws Exception {

		HttpServletRequest req = WebUtils.toHttp(request);

		if (!"post".equalsIgnoreCase(req.getMethod())) {
			return true;
		}

		return JCaptcha.validateResponse(req,
				req.getParameter(JCAPTCHA_VFCODE_PARAM));
	}

	@Override
	protected boolean onAccessDenied(ServletRequest request,
			ServletResponse response) throws Exception {
		request.setAttribute(ACCESS_DENIED, Boolean.TRUE);
		return true;
	}
}
