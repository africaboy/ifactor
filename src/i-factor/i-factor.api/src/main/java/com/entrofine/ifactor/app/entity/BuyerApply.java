package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.entrofine.ifactor.jpa.BuyerApplyEntity;

@Entity
@Table(name = BuyerApply.TABLE)
public class BuyerApply extends BuyerApplyEntity implements Serializable {

	private static final long serialVersionUID = 1690828913916984531L;

	private Long buyerId;
	private String buyerLoginName;
	private String title;
	private String firstName;
	private String lastName;
	private String email;
	private String investAs;
	private String gender;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date dob;
	private String nationality;
	private String residenceCountry;
	private String idType;
	private String idNumber;
	private String phone;
	private String mobilePhone;
	private String residenceAddress;
	private String postcode;
	private String address;
	private String district;
	private String city;
	private String region;
	private String country;
	private String address2;
	private String district2;
	private String city2;
	private String region2;
	private String country2;
	private String employer;
	private String employerName;
	private String priIndustry;
	private String haveEverTradingOther;
	private String whatIsAsset;
	private String whichBusFrom;
	private String entityType;
	private String position;
	private String companyName;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date comEstablishmentDate;
	private String comRegistrationNumber;
	private String isComVietnam;
	private String comRegisteredCountry;
	private String comIndustry;
	private String comType;
	private String comTaxCode;
	private String comAddress;
	private String comDistrict;
	private String comCity;
	private String comRegion;
	private String comCountry;
	private String comPostcode;
	private String comDurationInVt;
	private String comWhichBusFrom;
	private String authzTitle;
	private String authzFirstName;
	private String authzLastName;
	private String authzEmail;
	private String authzPositon;
	private String authzGender;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date authzDob;
	private String authzNationality;
	private String authzResidenceCountry;
	private String authzIdType;
	private String authzIdNumber;
	private String authzPhone;
	private String authzMobilePhone;
	private String areAuthorizedPerson;
	private String ifNoSpecifyPersonalInfo;

	private String flowStatus;
	private String flowOpinion;

	private String workCountryCode;
	private String mobileCountryCode;

	private String auPhCountryCode;
	private String auMoCountryCode;

	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date submissionDate;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date deadLineDate;

	private String bankAccountNumber;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "biz")
	@OrderBy("dispOrder")
	private List<BuyerApplyDoc> documents = new ArrayList<BuyerApplyDoc>();

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "biz")
	private List<BuyerApplyQuestion> questions = new ArrayList<BuyerApplyQuestion>();

	public Long getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(Long buyerId) {
		this.buyerId = buyerId;
	}

	public String getBuyerLoginName() {
		return buyerLoginName;
	}

	public void setBuyerLoginName(String buyerLoginName) {
		this.buyerLoginName = buyerLoginName;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getInvestAs() {
		return investAs;
	}

	public void setInvestAs(String investAs) {
		this.investAs = investAs;
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

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getResidenceCountry() {
		return residenceCountry;
	}

	public void setResidenceCountry(String residenceCountry) {
		this.residenceCountry = residenceCountry;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getResidenceAddress() {
		return residenceAddress;
	}

	public void setResidenceAddress(String residenceAddress) {
		this.residenceAddress = residenceAddress;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getDistrict2() {
		return district2;
	}

	public void setDistrict2(String district2) {
		this.district2 = district2;
	}

	public String getCity2() {
		return city2;
	}

	public void setCity2(String city2) {
		this.city2 = city2;
	}

	public String getRegion2() {
		return region2;
	}

	public void setRegion2(String region2) {
		this.region2 = region2;
	}

	public String getCountry2() {
		return country2;
	}

	public void setCountry2(String country2) {
		this.country2 = country2;
	}

	public String getEmployer() {
		return employer;
	}

	public void setEmployer(String employer) {
		this.employer = employer;
	}

	public String getEmployerName() {
		return employerName;
	}

	public void setEmployerName(String employerName) {
		this.employerName = employerName;
	}

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Date getComEstablishmentDate() {
		return comEstablishmentDate;
	}

	public void setComEstablishmentDate(Date comEstablishmentDate) {
		this.comEstablishmentDate = comEstablishmentDate;
	}

	public String getComRegistrationNumber() {
		return comRegistrationNumber;
	}

	public void setComRegistrationNumber(String comRegistrationNumber) {
		this.comRegistrationNumber = comRegistrationNumber;
	}

	public String getComIndustry() {
		return comIndustry;
	}

	public void setComIndustry(String comIndustry) {
		this.comIndustry = comIndustry;
	}

	public String getComType() {
		return comType;
	}

	public void setComType(String comType) {
		this.comType = comType;
	}

	public String getComTaxCode() {
		return comTaxCode;
	}

	public void setComTaxCode(String comTaxCode) {
		this.comTaxCode = comTaxCode;
	}

	public String getComAddress() {
		return comAddress;
	}

	public void setComAddress(String comAddress) {
		this.comAddress = comAddress;
	}

	public String getComDistrict() {
		return comDistrict;
	}

	public void setComDistrict(String comDistrict) {
		this.comDistrict = comDistrict;
	}

	public String getComCity() {
		return comCity;
	}

	public void setComCity(String comCity) {
		this.comCity = comCity;
	}

	public String getComRegion() {
		return comRegion;
	}

	public void setComRegion(String comRegion) {
		this.comRegion = comRegion;
	}

	public String getComCountry() {
		return comCountry;
	}

	public void setComCountry(String comCountry) {
		this.comCountry = comCountry;
	}

	public String getComPostcode() {
		return comPostcode;
	}

	public void setComPostcode(String comPostcode) {
		this.comPostcode = comPostcode;
	}

	public String getComDurationInVt() {
		return comDurationInVt;
	}

	public void setComDurationInVt(String comDurationInVt) {
		this.comDurationInVt = comDurationInVt;
	}

	public String getAuthzTitle() {
		return authzTitle;
	}

	public void setAuthzTitle(String authzTitle) {
		this.authzTitle = authzTitle;
	}

	public String getAuthzFirstName() {
		return authzFirstName;
	}

	public void setAuthzFirstName(String authzFirstName) {
		this.authzFirstName = authzFirstName;
	}

	public String getAuthzLastName() {
		return authzLastName;
	}

	public void setAuthzLastName(String authzLastName) {
		this.authzLastName = authzLastName;
	}

	public String getAuthzEmail() {
		return authzEmail;
	}

	public void setAuthzEmail(String authzEmail) {
		this.authzEmail = authzEmail;
	}

	public String getAuthzPositon() {
		return authzPositon;
	}

	public void setAuthzPositon(String authzPositon) {
		this.authzPositon = authzPositon;
	}

	public String getAuthzGender() {
		return authzGender;
	}

	public void setAuthzGender(String authzGender) {
		this.authzGender = authzGender;
	}

	public String getAuthzNationality() {
		return authzNationality;
	}

	public void setAuthzNationality(String authzNationality) {
		this.authzNationality = authzNationality;
	}

	public String getAuthzResidenceCountry() {
		return authzResidenceCountry;
	}

	public void setAuthzResidenceCountry(String authzResidenceCountry) {
		this.authzResidenceCountry = authzResidenceCountry;
	}

	public String getAuthzIdType() {
		return authzIdType;
	}

	public void setAuthzIdType(String authzIdType) {
		this.authzIdType = authzIdType;
	}

	public String getAuthzIdNumber() {
		return authzIdNumber;
	}

	public void setAuthzIdNumber(String authzIdNumber) {
		this.authzIdNumber = authzIdNumber;
	}

	public String getAuthzPhone() {
		return authzPhone;
	}

	public void setAuthzPhone(String authzPhone) {
		this.authzPhone = authzPhone;
	}

	public String getAuthzMobilePhone() {
		return authzMobilePhone;
	}

	public void setAuthzMobilePhone(String authzMobilePhone) {
		this.authzMobilePhone = authzMobilePhone;
	}

	public String getFlowStatus() {
		return flowStatus;
	}

	public void setFlowStatus(String flowStatus) {
		this.flowStatus = flowStatus;
	}

	public String getFlowOpinion() {
		return flowOpinion;
	}

	public void setFlowOpinion(String flowOpinion) {
		this.flowOpinion = flowOpinion;
	}

	public List<BuyerApplyDoc> getDocuments() {
		return documents;
	}

	public void setDocuments(List<BuyerApplyDoc> documents) {
		this.documents = documents;
	}

	public List<BuyerApplyQuestion> getQuestions() {
		return questions;
	}

	public void setQuestions(List<BuyerApplyQuestion> questions) {
		this.questions = questions;
	}

	public String getComRegisteredCountry() {
		return comRegisteredCountry;
	}

	public void setComRegisteredCountry(String comRegisteredCountry) {
		this.comRegisteredCountry = comRegisteredCountry;
	}

	public String getAreAuthorizedPerson() {
		return areAuthorizedPerson;
	}

	public void setAreAuthorizedPerson(String areAuthorizedPerson) {
		this.areAuthorizedPerson = areAuthorizedPerson;
	}

	public String getIfNoSpecifyPersonalInfo() {
		return ifNoSpecifyPersonalInfo;
	}

	public void setIfNoSpecifyPersonalInfo(String ifNoSpecifyPersonalInfo) {
		this.ifNoSpecifyPersonalInfo = ifNoSpecifyPersonalInfo;
	}

	public Date getAuthzDob() {
		return authzDob;
	}

	public void setAuthzDob(Date authzDob) {
		this.authzDob = authzDob;
	}

	public String getPriIndustry() {
		return priIndustry;
	}

	public void setPriIndustry(String priIndustry) {
		this.priIndustry = priIndustry;
	}

	public String getWhichBusFrom() {
		return whichBusFrom;
	}

	public void setWhichBusFrom(String whichBusFrom) {
		this.whichBusFrom = whichBusFrom;
	}

	public String getComWhichBusFrom() {
		return comWhichBusFrom;
	}

	public void setComWhichBusFrom(String comWhichBusFrom) {
		this.comWhichBusFrom = comWhichBusFrom;
	}

	public String getAuPhCountryCode() {
		return auPhCountryCode;
	}

	public void setAuPhCountryCode(String auPhCountryCode) {
		this.auPhCountryCode = auPhCountryCode;
	}

	public String getAuMoCountryCode() {
		return auMoCountryCode;
	}

	public void setAuMoCountryCode(String auMoCountryCode) {
		this.auMoCountryCode = auMoCountryCode;
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

	public String getIsComVietnam() {
		return isComVietnam;
	}

	public void setIsComVietnam(String isComVietnam) {
		this.isComVietnam = isComVietnam;
	}

	public String getHaveEverTradingOther() {
		return haveEverTradingOther;
	}

	public void setHaveEverTradingOther(String haveEverTradingOther) {
		this.haveEverTradingOther = haveEverTradingOther;
	}

	public String getWhatIsAsset() {
		return whatIsAsset;
	}

	public void setWhatIsAsset(String whatIsAsset) {
		this.whatIsAsset = whatIsAsset;
	}

	public Date getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(Date submissionDate) {
		this.submissionDate = submissionDate;
	}

	public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}

	public Date getDeadLineDate() {
		return deadLineDate;
	}

	public void setDeadLineDate(Date deadLineDate) {
		this.deadLineDate = deadLineDate;
	}

}
