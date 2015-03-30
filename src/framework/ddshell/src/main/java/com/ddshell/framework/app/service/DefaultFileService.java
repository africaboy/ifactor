package com.ddshell.framework.app.service;

import java.io.File;
import java.io.Serializable;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.ddshell.framework.app.service.support.FileSystemSupport;

@Component
public class DefaultFileService implements FileService {

	@Autowired
	private FileSystemSupport fileSystemSupport;

	@Override
	public boolean support(String biztype) {
		return biztype.startsWith("default");
	}

	@Override
	public Serializable saveUploadedFile(String biztype, MultipartFile file) {
		UUID uuid = UUID.randomUUID();
		fileSystemSupport.save(file, uuid, biztype);

		return uuid;
	}

	@Override
	public File findUploadedFile(String biztype, String name) {
		return fileSystemSupport.get(name, biztype);
	}

	@Override
	public String findUploadedOriginalFilename(String biztype, String name) {
		return name;
	}

}
