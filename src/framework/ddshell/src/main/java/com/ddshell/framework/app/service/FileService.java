package com.ddshell.framework.app.service;

import java.io.File;
import java.io.Serializable;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	/**
	 * 判断是否支持该biztype
	 * 
	 * @param biztype
	 * @return
	 */
	public boolean support(String biztype);

	/**
	 * 保存上传的文件
	 * 
	 * @param biztype
	 * @param file
	 * @return 文件唯一索引标识
	 */
	public Serializable saveUploadedFile(String biztype, MultipartFile file);

	/**
	 * 查找上传的文件
	 * 
	 * @param biztype
	 * @param id
	 * @return
	 */
	public File findUploadedFile(String biztype, String name);

	/**
	 * 查找上传的原始文件名
	 * 
	 * @param biztype
	 * @param id
	 * @return
	 */
	public String findUploadedOriginalFilename(String biztype, String name);

}
