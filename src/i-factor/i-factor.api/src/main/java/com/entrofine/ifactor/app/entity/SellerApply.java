package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.entrofine.ifactor.jpa.SellerApplyEntity;

@Entity
@Table(name = SellerApply.TABLE)
public class SellerApply extends SellerApplyEntity implements Serializable {

	private static final long serialVersionUID = -968977096879673639L;

	private Long sellerId;
	private String sellerLoginName;
	private String title;
	private String firstName;
	private String lastName;
	private String email;
	private String gender;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date dob;
	private String nationality;
	private String countryOfResidence;
	private String idType;
	private String idNumber;
	private String workPhone;
	private String mobilePhone;
	private String position;
	private String companyName;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date comEstablishmentDate;
	private String isComVietnam;
	private String comRegisteredCountry;
	private String comRegistrationNumber;
	private String comTaxCode;
	private String comRegisterNo;
	private String comIndustrySector;
	private String comAddress;
	private String address;
	private String comDistrict;
	private String comCity;
	private String comRegion;
	private String comCountry;
	private String comPostcode;
	private String comAddress2;
	private String comDistrict2;
	private String comCity2;
	private String comRegion2;
	private String comCountry2;
	private String comPostcode2;
	private String comNearestCenter;

	private Long debtorA1Id;
	private String debtorA1Name;

	private Long debtorA2Id;
	private String debtorA2Name;

	private Long debtorA3Id;
	private String debtorA3Name;

	private Long debtorA4Id;
	private String debtorA4Name;

	private Long debtorA5Id;
	private String debtorA5Name;

	private Long debtorB1Id;
	private String debtorB1Name;

	private Long debtorB2Id;
	private String debtorB2Name;

	private Long debtorB3Id;
	private String debtorB3Name;

	private Long debtorB4Id;
	private String debtorB4Name;

	private Long debtorB5Id;
	private String debtorB5Name;

	private String invoiceAvgAmountCode;
	private String esignatureSN;

	private String flowStatus;
	private String flowOpinion;

	private String workCountryCode;
	private String mobileCountryCode;

	private BigDecimal limitMin;
	private BigDecimal limitMax;
	private BigDecimal limitBalance;

	private String debtorAckReq;

	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date submissionDate;
	@DateTimeFormat(pattern = "MM/dd/yyyy")
	private Date deadLineDate;

	private String bankAccountNumber;

	private String enterpriseCategory;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "biz")
	@OrderBy("dispOrder")
	private List<SellerApplyDoc> documents = new ArrayList<SellerApplyDoc>();

	/*
	 * List<String> termsAndConditions;
	 */

	private String etype;

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified Title
	 */
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified First Name
	 */
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified Last Name
	 */
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified Email
	 */
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified Gender
	 */
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified DOB
	 */
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

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified Country
	 */
	public String getCountryOfResidence() {
		return countryOfResidence;
	}

	public void setCountryOfResidence(String countryOfResidence) {
		this.countryOfResidence = countryOfResidence;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified ID type
	 */
	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified ID number
	 */
	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified Work phone
	 */
	public String getWorkPhone() {
		return workPhone;
	}

	public void setWorkPhone(String workPhone) {
		this.workPhone = workPhone;
	}

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified Mobile phone
	 */

	/*
	 * Personal information system capture from SME registration form, can’t be
	 * modified Position
	 */
	public String getPosition() {
		return position;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	/*
	 * Company information found on license, mapping to license image Company
	 * name
	 */
	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	/*
	 * Company information the date of issuing license Company establishment
	 * date
	 */
	public Date getComEstablishmentDate() {
		return comEstablishmentDate;
	}

	public void setComEstablishmentDate(Date comEstablishmentDate) {
		this.comEstablishmentDate = comEstablishmentDate;
	}

	/*
	 * Company information same question, it can be found on license, mapping to
	 * license Company registration number
	 */
	public String getComRegisterNo() {
		return comRegisterNo;
	}

	public void setComRegisterNo(String comRegisterNo) {
		this.comRegisterNo = comRegisterNo;
	}

	/*
	 * Company information tax code registration Company tax code
	 */
	public String getComTaxCode() {
		return comTaxCode;
	}

	public void setComTaxCode(String comTaxCode) {
		this.comTaxCode = comTaxCode;
	}

	/*
	 * Company information Company address (room, floor, street name,
	 * district,city, country) found on license, mapping to license image
	 * Company address
	 */
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

	public String getComAddress2() {
		return comAddress2;
	}

	public void setComAddress2(String comAddress2) {
		this.comAddress2 = comAddress2;
	}

	public String getComDistrict2() {
		return comDistrict2;
	}

	public void setComDistrict2(String comDistrict2) {
		this.comDistrict2 = comDistrict2;
	}

	public String getComCity2() {
		return comCity2;
	}

	public void setComCity2(String comCity2) {
		this.comCity2 = comCity2;
	}

	public String getComRegion2() {
		return comRegion2;
	}

	public void setComRegion2(String comRegion2) {
		this.comRegion2 = comRegion2;
	}

	public String getComCountry2() {
		return comCountry2;
	}

	public void setComCountry2(String comCountry2) {
		this.comCountry2 = comCountry2;
	}

	public String getComPostcode2() {
		return comPostcode2;
	}

	public void setComPostcode2(String comPostcode2) {
		this.comPostcode2 = comPostcode2;
	}

	public String getComNearestCenter() {
		return comNearestCenter;
	}

	public void setComNearestCenter(String comNearestCenter) {
		this.comNearestCenter = comNearestCenter;
	}

	/*
	 * Company information Industry sector company operates in Drop down list,
	 * mappingto VPBank SME industry segment (for SME industry blacklist) found
	 * on license, mapping to license, VPBank needs to provide SME industry
	 * segment Industry sector company operates in
	 */
	public String getComIndustrySector() {
		return comIndustrySector;
	}

	public void setComIndustrySector(String comIndustrySector) {
		this.comIndustrySector = comIndustrySector;
	}

	public Long getDebtorA1Id() {
		return debtorA1Id;
	}

	public void setDebtorA1Id(Long debtorA1Id) {
		this.debtorA1Id = debtorA1Id;
	}

	public String getDebtorA1Name() {
		return debtorA1Name;
	}

	public void setDebtorA1Name(String debtorA1Name) {
		this.debtorA1Name = debtorA1Name;
	}

	public Long getDebtorA2Id() {
		return debtorA2Id;
	}

	public void setDebtorA2Id(Long debtorA2Id) {
		this.debtorA2Id = debtorA2Id;
	}

	public String getDebtorA2Name() {
		return debtorA2Name;
	}

	public void setDebtorA2Name(String debtorA2Name) {
		this.debtorA2Name = debtorA2Name;
	}

	public Long getDebtorA3Id() {
		return debtorA3Id;
	}

	public void setDebtorA3Id(Long debtorA3Id) {
		this.debtorA3Id = debtorA3Id;
	}

	public String getDebtorA3Name() {
		return debtorA3Name;
	}

	public void setDebtorA3Name(String debtorA3Name) {
		this.debtorA3Name = debtorA3Name;
	}

	public Long getDebtorA4Id() {
		return debtorA4Id;
	}

	public void setDebtorA4Id(Long debtorA4Id) {
		this.debtorA4Id = debtorA4Id;
	}

	public String getDebtorA4Name() {
		return debtorA4Name;
	}

	public void setDebtorA4Name(String debtorA4Name) {
		this.debtorA4Name = debtorA4Name;
	}

	public Long getDebtorA5Id() {
		return debtorA5Id;
	}

	public void setDebtorA5Id(Long debtorA5Id) {
		this.debtorA5Id = debtorA5Id;
	}

	public String getDebtorA5Name() {
		return debtorA5Name;
	}

	public void setDebtorA5Name(String debtorA5Name) {
		this.debtorA5Name = debtorA5Name;
	}

	public Long getDebtorB1Id() {
		return debtorB1Id;
	}

	public void setDebtorB1Id(Long debtorB1Id) {
		this.debtorB1Id = debtorB1Id;
	}

	public String getDebtorB1Name() {
		return debtorB1Name;
	}

	public void setDebtorB1Name(String debtorB1Name) {
		this.debtorB1Name = debtorB1Name;
	}

	public Long getDebtorB2Id() {
		return debtorB2Id;
	}

	public void setDebtorB2Id(Long debtorB2Id) {
		this.debtorB2Id = debtorB2Id;
	}

	public String getDebtorB2Name() {
		return debtorB2Name;
	}

	public void setDebtorB2Name(String debtorB2Name) {
		this.debtorB2Name = debtorB2Name;
	}

	public Long getDebtorB3Id() {
		return debtorB3Id;
	}

	public void setDebtorB3Id(Long debtorB3Id) {
		this.debtorB3Id = debtorB3Id;
	}

	public String getDebtorB3Name() {
		return debtorB3Name;
	}

	public void setDebtorB3Name(String debtorB3Name) {
		this.debtorB3Name = debtorB3Name;
	}

	public Long getDebtorB4Id() {
		return debtorB4Id;
	}

	public void setDebtorB4Id(Long debtorB4Id) {
		this.debtorB4Id = debtorB4Id;
	}

	public String getDebtorB4Name() {
		return debtorB4Name;
	}

	public void setDebtorB4Name(String debtorB4Name) {
		this.debtorB4Name = debtorB4Name;
	}

	public Long getDebtorB5Id() {
		return debtorB5Id;
	}

	public void setDebtorB5Id(Long debtorB5Id) {
		this.debtorB5Id = debtorB5Id;
	}

	public String getDebtorB5Name() {
		return debtorB5Name;
	}

	public void setDebtorB5Name(String debtorB5Name) {
		this.debtorB5Name = debtorB5Name;
	}

	/*
	 * Further Details Your company's average invoice amount on yearly basis
	 * Drop down list A. VND 100 million - 500 million B. VND 500 million - 1
	 * billion C. VND 1 billion - 2 billion D. VND 2 billion - 3 billion E. VND
	 * 3 billion - 4 billion F. VND 4 billion - 5 billion G. Above VND 5 billion
	 */
	public String getInvoiceAvgAmountCode() {
		return invoiceAvgAmountCode;
	}

	public void setInvoiceAvgAmountCode(String invoiceAvgAmountCode) {
		this.invoiceAvgAmountCode = invoiceAvgAmountCode;
	}

	/*
	 * Further Details If you have token for e-signature use , please specify
	 * the serial number on your token
	 */
	public String getEsignatureSN() {
		return esignatureSN;
	}

	public void setEsignatureSN(String esignatureSN) {
		this.esignatureSN = esignatureSN;
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

	public Long getSellerId() {
		return sellerId;
	}

	public void setSellerId(Long sellerId) {
		this.sellerId = sellerId;
	}

	public String getSellerLoginName() {
		return sellerLoginName;
	}

	public void setSellerLoginName(String sellerLoginName) {
		this.sellerLoginName = sellerLoginName;
	}

	public List<SellerApplyDoc> getDocuments() {
		return documents;
	}

	public void setDocuments(List<SellerApplyDoc> documents) {
		this.documents = documents;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public String getComRegisteredCountry() {
		return comRegisteredCountry;
	}

	public void setComRegisteredCountry(String comRegisteredCountry) {
		this.comRegisteredCountry = comRegisteredCountry;
	}

	public String getComRegistrationNumber() {
		return comRegistrationNumber;
	}

	public void setComRegistrationNumber(String comRegistrationNumber) {
		this.comRegistrationNumber = comRegistrationNumber;
	}

	public BigDecimal getLimitMin() {
		return limitMin;
	}

	public void setLimitMin(BigDecimal limitMin) {
		this.limitMin = limitMin;
	}

	public BigDecimal getLimitMax() {
		return limitMax;
	}

	public void setLimitMax(BigDecimal limitMax) {
		this.limitMax = limitMax;
	}

	public BigDecimal getLimitBalance() {
		return limitBalance;
	}

	public void setLimitBalance(BigDecimal limitBalance) {
		this.limitBalance = limitBalance;
	}

	public String getDebtorAckReq() {
		return debtorAckReq;
	}

	public void setDebtorAckReq(String debtorAckReq) {
		this.debtorAckReq = debtorAckReq;
	}

	public String getEtype() {
		return etype;
	}

	public void setEtype(String etype) {
		this.etype = etype;
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

	public String getEnterpriseCategory() {
		return enterpriseCategory;
	}

	public void setEnterpriseCategory(String enterpriseCategory) {
		this.enterpriseCategory = enterpriseCategory;
	}

	public Date getDeadLineDate() {
		return deadLineDate;
	}

	public void setDeadLineDate(Date deadLineDate) {
		this.deadLineDate = deadLineDate;
	}

}
