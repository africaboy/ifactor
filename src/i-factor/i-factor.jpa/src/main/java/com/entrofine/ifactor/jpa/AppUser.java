package com.entrofine.ifactor.jpa;

import java.util.Date;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import org.springframework.format.annotation.DateTimeFormat;

@MappedSuperclass
public abstract class AppUser {

	private String defaultLocale;
	private String title;
	private String firstName;
	private String lastName;
	private String gender;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dob;
	private String country;
	private String idType;
	private String idNo;
	private String workPhone;
	private String mobilePhone;
	private String position;
	private String email;
	private String comName;
	private String comRegNo;
	private String comTaxCode;
	private String fromChannels;
	private String otherFromChannels;
	private String investAs;
	private String status;
	private String mailActiveCode;
	private String resetPasswordCode;
	private String workCountryCode;
	private String mobileCountryCode;

	private Date createTime;
	private Date updateTime;

	public String getDefaultLocale() {
		return defaultLocale;
	}

	public void setDefaultLocale(String defaultLocale) {
		this.defaultLocale = defaultLocale;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public String getWorkPhone() {
		return workPhone;
	}

	public void setWorkPhone(String workPhone) {
		this.workPhone = workPhone;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getComName() {
		return comName;
	}

	public void setComName(String comName) {
		this.comName = comName;
	}

	public String getComRegNo() {
		return comRegNo;
	}

	public void setComRegNo(String comRegNo) {
		this.comRegNo = comRegNo;
	}

	public String getComTaxCode() {
		return comTaxCode;
	}

	public void setComTaxCode(String comTaxCode) {
		this.comTaxCode = comTaxCode;
	}

	public String getFromChannels() {
		return fromChannels;
	}

	public void setFromChannels(String fromChannels) {
		this.fromChannels = fromChannels;
	}

	public String getOtherFromChannels() {
		return otherFromChannels;
	}

	public void setOtherFromChannels(String otherFromChannels) {
		this.otherFromChannels = otherFromChannels;
	}

	public String getInvestAs() {
		return investAs;
	}

	public void setInvestAs(String investAs) {
		this.investAs = investAs;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMailActiveCode() {
		return mailActiveCode;
	}

	public void setMailActiveCode(String mailActiveCode) {
		this.mailActiveCode = mailActiveCode;
	}

	public String getResetPasswordCode() {
		return resetPasswordCode;
	}

	public void setResetPasswordCode(String resetPasswordCode) {
		this.resetPasswordCode = resetPasswordCode;
	}

	public boolean isDisabled() {
		return SystemUserStatus.DISABLED.toString().equals(status);
	}

	public void setDisabled(boolean disabled) {
		if (disabled) {
			status = SystemUserStatus.DISABLED.toString();
		} else {
			status = SystemUserStatus.ENABLED.toString();
		}
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getWorkCountryCode() {
		return workCountryCode;
	}

	public void setWorkCountryCode(String workCountryCode) {
		this.workCountryCode = workCountryCode;
	}

	public String getMobileCountryCode() {
		return mobileCountryCode;
	}

	public void setMobileCountryCode(String mobileCountryCode) {
		this.mobileCountryCode = mobileCountryCode;
	}

	@PrePersist
	public void prePersist() {
		this.createTime = new Date();
		this.updateTime = new Date();
	}

	@PreUpdate
	public void preUpdate() {
		this.updateTime = new Date();
	}

}
