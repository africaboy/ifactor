package com.ddshell.framework.app.service.support;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.io.Files;

@Component
public class FileSystemSupport {

	private static Logger LOG = LoggerFactory
			.getLogger(FileSystemSupport.class);

	@Autowired
	private GlobalVars globalVars;

	public File get(String name, String targetDir) {
		return getTargetFile(name, targetDir);
	}

	public File save(MultipartFile src, Serializable targetName,
			String targetDir) {
		File target = getTargetFile(src.getOriginalFilename(), targetName,
				targetDir);
		try {
			Files.createParentDirs(target);
			src.transferTo(target);
			return target;
		} catch (IOException e) {
			LOG.error(e.getMessage(), e);
			throw new RuntimeException(e);
		}
	}

	public File save(File src, String originalFilename,
			Serializable targetName, String targetDir) {
		File target = getTargetFile(originalFilename, targetName, targetDir);

		return save(src, target);
	}

	public File save(File src, String targetPath) {
		File target = new File(globalVars.fileSystemRoot, targetPath);
		return save(src, target);
	}

	public File save(byte[] bytes, String targetPath) {
		File target = new File(globalVars.fileSystemRoot, targetPath);

		try {
			Files.createParentDirs(target);
			FileCopyUtils.copy(bytes, target);
			return target;
		} catch (IOException e) {
			LOG.error(e.getMessage(), e);
			throw new RuntimeException(e);
		}
	}

	private File save(File src, File target) {
		try {
			Files.createParentDirs(target);
			Files.copy(src, target);
			return target;
		} catch (IOException e) {
			LOG.error(e.getMessage(), e);
			throw new RuntimeException(e);
		}
	}

	private File getTargetFile(String originalFilename,
			Serializable targetName, String targetDir) {
		StringBuffer buf = new StringBuffer();
		buf.append(targetName);

		String extension = Files.getFileExtension(originalFilename);
		if (!StringUtils.isEmpty(extension)) {
			buf.append(".").append(extension);
		}

		return getTargetFile(buf.toString(), targetDir);
	}

	private File getTargetFile(String name, String targetDir) {
		return new File(new File(globalVars.fileSystemRoot, targetDir), name);
	}

}
