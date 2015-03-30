package com.entrofine.ifactor.app.service;

import java.io.File;
import java.io.Serializable;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ddshell.framework.app.entity.User;
import com.ddshell.framework.app.service.FileService;
import com.ddshell.framework.app.service.support.FileSystemSupport;
import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.api.AppVars;
import com.entrofine.ifactor.app.entity.SellerApplyDoc;
import com.entrofine.ifactor.app.repository.SellerApplyDocRepository;
import com.entrofine.ifactor.jpa.DocEntity;

@Component
public class SellerApplyDocService extends
		GenericCrudService<SellerApplyDoc, Long> implements FileService {

	public static final String BIZTYPE_PREFIX = "seller"
			+ DocEntity.BIZTYPE_SEP;

	@Autowired
	AccountService accountService;
	@Autowired
	private AppVars appVars;
	@Autowired
	private FileSystemSupport fileSystemSupport;
	@Autowired
	private SellerApplyDocRepository sellerApplyDocRep;

	@Override
	protected JpaRepository<SellerApplyDoc, Long> getRepository() {
		return sellerApplyDocRep;
	}

	@Override
	public boolean support(String biztype) {
		return biztype.startsWith(BIZTYPE_PREFIX);
	}

	@Override
	public Serializable saveUploadedFile(String biztype, MultipartFile file) {
		User loginUser = accountService.getLoginUser();

		SellerApplyDoc doc = new SellerApplyDoc();
		doc.setBizType(biztype);
		doc.setOriginalName(new File(file.getOriginalFilename()).getName());
		doc.setLoginName(loginUser.getLoginName());
		doc.setTargetName(fileSystemSupport.save(file, UUID.randomUUID(),
				appVars.sellerDocumentDir).getName());
		doc = sellerApplyDocRep.save(doc);

		String extension = doc.getExtension();
		if (StringUtils.isEmpty(extension)) {
			return doc.getId();
		}
		return doc.getId() + "." + extension;
	}

	@Override
	public File findUploadedFile(String biztype, String fileName) {
		return fileSystemSupport.get(findDocByFileName(fileName)
				.getTargetName(), appVars.sellerDocumentDir);
	}

	@Override
	public String findUploadedOriginalFilename(String biztype, String fileName) {
		return findDocByFileName(fileName).getOriginalName();
	}

	private SellerApplyDoc findDocByFileName(String fileName) {
		int idx = fileName.indexOf('.');
		if (idx != -1) {
			fileName = fileName.substring(0, idx);
		}

		return sellerApplyDocRep.findOne(Long.valueOf(fileName));
	}
}
