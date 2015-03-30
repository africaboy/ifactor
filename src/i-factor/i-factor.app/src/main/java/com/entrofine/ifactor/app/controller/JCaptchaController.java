package com.entrofine.ifactor.app.controller;

import java.awt.image.BufferedImage;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.github.zhangkaitao.shiro.chapter22.jcaptcha.JCaptcha;

@Controller
public class JCaptchaController {

	@RequestMapping(value = "/jcaptcha", method = RequestMethod.GET)
	public void registerBuyerForm(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setDateHeader("Expires", 0L);
		response.setHeader("Cache-Control",
				"no-store, no-cache, must-revalidate");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("image/jpeg");

		BufferedImage img = JCaptcha.captchaService
				.getImageChallengeForID(request.getSession().getId());

		ServletOutputStream out = response.getOutputStream();
		try {
			ImageIO.write(img, "jpg", out);
			out.flush();
		} finally {
			out.close();
		}
	}

}
