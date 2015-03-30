package com.entrofine.ifactor.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.app.entity.ContactUs;
import com.entrofine.ifactor.app.repository.ContactUsRepository;

@Component
public class ContactUsService extends GenericCrudService<ContactUs, Long> {

	@Autowired
	ContactUsRepository applyRep;

	@Transactional
	public ContactUs commitApply(ContactUs contactUs) {
		contactUs = applyRep.save(contactUs);
		return contactUs;
	}

	@Override
	protected JpaRepository<ContactUs, Long> getRepository() {
		return applyRep;
	}

}
