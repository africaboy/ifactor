package com.ddshell.framework.app.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.Serializable;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ddshell.framework.app.service.FileService;

@Controller
public class FileUploadController {
	@Autowired
	private FileService[] services;

	@RequestMapping(value = "/fileTransfer/{biztype}", method = RequestMethod.POST)
	@ResponseBody
	public String transfer(@PathVariable("biztype") String biztype,
			String originalFilename, @RequestBody byte[] bytes) {
		return null;
	}

	@RequestMapping(value = "/fileUpload/{biztype}", method = RequestMethod.POST)
	@ResponseBody
	public Serializable upload(@PathVariable("biztype") String biztype,
			@RequestParam("file") MultipartFile file) {
		if (!StringUtils.isEmpty(biztype)) {
			for (FileService service : services) {
				if (service.support(biztype)) {
					return service.saveUploadedFile(biztype, file);
				}
			}
		}
		return "";
	}

	@RequestMapping(value = "/fileDownload/{biztype}/{id}.{extension}", method = RequestMethod.GET)
	public void downloadx(@PathVariable("biztype") String biztype,
			@PathVariable("id") String id,
			@PathVariable("extension") String extension,
			HttpServletResponse response) throws IOException {
		download(biztype, id + "." + extension, response);
	}

	@RequestMapping(value = "/fileDownload/{biztype}/{name:[^\\.]+}", method = RequestMethod.GET)
	public void download(@PathVariable("biztype") String biztype,
			@PathVariable("name") String name, HttpServletResponse response)
			throws IOException {
		for (FileService service : services) {
			if (service.support(biztype)) {
				File file = service.findUploadedFile(biztype, name);
				String originalFilename = service.findUploadedOriginalFilename(
						biztype, name);
				if (!name.toLowerCase().endsWith(".pdf")) {
					response.setContentLength((int) file.length());
					response.setContentType("application/octet-stream");
					response.setHeader("Content-Disposition",
							"attachment; filename=\"" + originalFilename + "\"");
				}
				FileCopyUtils.copy(new FileInputStream(file),
						response.getOutputStream());

				return;
			}
		}
	}
}
