package com.entrofine.ifactor.app.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import com.entrofine.ifactor.jpa.ContactUsEntity;

@Entity
@Table(name = ContactUs.TABLE)
public class ContactUs extends ContactUsEntity implements Serializable {

	private static final long serialVersionUID = -7035360902920656845L;

	@NotEmpty
	private String country;
	@NotEmpty
	private String fullname;
	@NotEmpty
	private String companyOrganization;
	@NotEmpty
	@Length(min = 0, max = 255)
	@Email
	private String email;
	@NotEmpty
	private String subject;
	@NotEmpty
	private String message;
	@NotEmpty
	private String status;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getCompanyOrganization() {
		return companyOrganization;
	}

	public void setCompanyOrganization(String companyOrganization) {
		this.companyOrganization = companyOrganization;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
