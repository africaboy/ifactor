package com.entrofine.ifactor.mgt.service.impl;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;
import javax.servlet.http.HttpServletRequest;

import jt.classic.system.database.SystemDataSource;
import jt.classic.system.database.SystemDataSourceException;
import jt.classic.system.wordbook.WordBookUtil;

import org.limp.mine.DataTrimmerI;
import org.limp.mine.DateTrimmer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.entrofine.ifactor.api.AppVars;
import com.entrofine.ifactor.api.entity.Document;
import com.entrofine.ifactor.api.service.WorkflowService;
import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.BuyerApplyQuestion;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.SellerApply;
import com.entrofine.ifactor.gbv.init.ParamSettingCenter;
import com.entrofine.ifactor.gbv.utils.Getter;
import com.entrofine.ifactor.gbv.utils.ImageUploadHelper;
import com.entrofine.ifactor.gbv.utils.WorkflowProxy;
import com.entrofine.ifactor.jpa.DocEntity;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Component
public class WorkflowServiceImpl implements WorkflowService {

	private static final Logger LOG = LoggerFactory
			.getLogger(WorkflowServiceImpl.class);

	@Autowired
	private AppVars appVars;

	@Override
	public void startSmeWorkflow(SellerApply apply) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		smeFlowInfo(apply, request, "start");
	}

	@Override
	public void updateSmeWorkflow(SellerApply apply) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		smeFlowInfo(apply, request, "dataModify");
	}

	@Override
	public void startBuyerWorkflow(BuyerApply apply) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		buyerFlowInfo(apply, request, "start");
	}

	@Override
	public void updateBuyerWorkflow(BuyerApply apply) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		buyerFlowInfo(apply, request, "dataModify");
	}

	@Override
	public void startInvoiceWorkflow(Invoice apply) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		invoiceFlowInfo(apply, request, "start");
		invoiceOriVerFlowInfo(apply, request, "start");
	}

	@Override
	public void updateInvoiceWorkflow(Invoice apply) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		invoiceFlowInfo(apply, request, "dataModify");
		invoiceOriVerFlowInfo(apply, request, "dataModify");
	}

	private void smeFlowInfo(final SellerApply apply,
			HttpServletRequest request, final String handleType) {

		saveDocuments(apply.getId().toString(), apply.getDocuments());

		flowHandle(WorkflowProxy.smeApplyFlow, handleType, request,
				new Function<Map<String, Object>, Object>() {
					@Override
					@Nullable
					public Object apply(@Nullable Map<String, Object> context) {
						WorkflowProxy.setAppPkId(context, apply.getId());
						if (handleType.equals("start")) {
							context.put("CPCTIME", apply.getCreateTime());
							context.put("SA_APPLY_CODE",
									"SA_" + DateTrimmer.getYMDHMS());
						}
						context.put("UPDATEDDATE", apply.getUpdateTime());
						context.put(
								"MYTITLE",
								WordBookUtil.getWordBookItemName("title",
										apply.getTitle()));
						context.put("MYFNAME", apply.getFirstName());
						context.put("MYLNAME", apply.getLastName());
						context.put("MYGENDERID", apply.getGender());
						context.put("MYGENDER", WordBookUtil
								.getWordBookItemName("gender",
										apply.getGender()));
						context.put("MYDOB", apply.getDob());
						context.put("MYNATIONALITY", WordBookUtil
								.getWordBookItemName("country",
										apply.getNationality()));
						context.put("MYCOUNTRYID",
								apply.getCountryOfResidence());
						context.put("MYCOUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getCountryOfResidence()));
						context.put("MYIDTYPEID", apply.getIdType());
						context.put("MYIDTYPE", WordBookUtil
								.getWordBookItemName("idtype",
										apply.getIdType()));
						context.put("MYIDNUMBER", apply.getIdNumber());
						context.put("WLOCALCODE", apply.getWorkCountryCode());
						context.put("MYWPHONE", apply.getWorkPhone());
						context.put("MLOCALCODE", apply.getMobileCountryCode());
						context.put("MYMPHONE", apply.getMobilePhone());
						// context.put("MYPOSITION", WordBookUtil
						// .getWordBookItemName("position",
						// apply.getPosition()));
						context.put("MYPOSITION", apply.getPosition());
						context.put("MYEMAIL", apply.getEmail());
						context.put("CPNAME", apply.getCompanyName());
						context.put("ISCOMVIETNAM", apply.getIsComVietnam());

						if (apply.getComRegisteredCountry() != null) {
							context.put("CPRCOUNTRY", WordBookUtil
									.getWordBookItemName("country",
											apply.getComRegisteredCountry()));
						}
						if ("Yes".equals(apply.getIsComVietnam())) {
							context.put("CPRCOUNTRY", "Vietnam");
						}
						context.put("CPDATE", apply.getComEstablishmentDate());
						context.put("CPNUMBER",
								apply.getComRegistrationNumber());
						context.put("CPSECTORID", apply.getComIndustrySector());
						context.put("CPSECTOR", WordBookUtil
								.getWordBookItemName("industryOper",
										apply.getComIndustrySector()));
						context.put("CPTAXCODE", apply.getComTaxCode());
						context.put("CPADDRESS", apply.getComAddress());
						context.put("CPDISTRICT", apply.getComDistrict());
						context.put("CPCITY", apply.getComCity());
						context.put("CPREIZON", apply.getComRegion());
						context.put("CPCOUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getComCountry()));
						context.put("CPPOSTCODE", apply.getComPostcode());

						context.put("ISDFCPADDRESS", apply.getComAddress2());
						context.put("DFCPADDRESS", apply.getAddress());
						context.put("DFCPDISTRICT", apply.getComDistrict2());
						context.put("DFCPCITY", apply.getComCity2());
						context.put("DFCPREIZON", apply.getComRegion2());
						context.put("DFCPCOUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getComCountry2()));
						context.put("DFCPPOSTCODE", apply.getComPostcode2());
						context.put("NEARESTSIGN", WordBookUtil
								.getWordBookItemName("nearestsign",
										apply.getComNearestCenter()));
						context.put("DEBTORS1", apply.getDebtorA1Name());
						context.put("DEBTORS2", apply.getDebtorA2Name());
						context.put("DEBTORS3", apply.getDebtorA3Name());
						context.put("DEBTORS4", apply.getDebtorA4Name());
						context.put("DEBTORS5", apply.getDebtorA5Name());
						context.put("TBDDEBTORS1", apply.getDebtorB1Name());
						context.put("TBDDEBTORS2", apply.getDebtorB2Name());
						context.put("TBDDEBTORS3", apply.getDebtorB3Name());
						context.put("TBDDEBTORS4", apply.getDebtorB4Name());
						context.put("TBDDEBTORS5", apply.getDebtorB5Name());
						context.put("INVOICEAMMOUNT", WordBookUtil
								.getWordBookItemName("estimatedag",
										apply.getInvoiceAvgAmountCode()));
						context.put("SERIALNUM", apply.getEsignatureSN());
						return context;
					}
				});
	}

	private void buyerFlowInfo(final BuyerApply apply,
			HttpServletRequest request, final String handleType) {

		saveDocuments(apply.getId().toString(), apply.getDocuments());

		flowHandle(WorkflowProxy.buyerApplyFlow, handleType, request,
				new Function<Map<String, Object>, Object>() {
					@Override
					@Nullable
					public Object apply(@Nullable Map<String, Object> context) {
						WorkflowProxy.setAppPkId(context, apply.getId());
						if (handleType.equals("start")) {
							context.put("BA_APPLY_DATE", apply.getCreateTime());
							context.put("BA_APPLY_CODE",
									"BA_" + DateTrimmer.getYMDHMS());
						}
						context.put("BA_UPDATED_DATE", apply.getUpdateTime());
						context.put("TITLE",
								Getter.string(WordBookUtil.getWordBookItemName(
										"title", apply.getTitle())));
						context.put("FIRST_NAME", apply.getFirstName());

						context.put("LAST_NAME", apply.getLastName());
						context.put("EMAIL", apply.getEmail());
						context.put("INVEST_AS", apply.getInvestAs());
						if (apply.getInvestAs() != null
								&& apply.getInvestAs().equals(
										"Private investor")) {
							context.put("INVEST_AS_PRIVATE", "1");
							context.put("INVEST_AS_COMPANY", "0");
						} else {
							context.put("INVEST_AS_PRIVATE", "0");
							context.put("INVEST_AS_COMPANY", "1");
						}
						context.put("GENDER", Getter.string(WordBookUtil
								.getWordBookItemName("gender",
										apply.getGender())));
						context.put("BIRTH_DATE", apply.getDob());
						context.put("NATIONALITY", WordBookUtil
								.getWordBookItemName("country",
										apply.getNationality()));
						context.put("RESIDENCE_COUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getResidenceCountry()));
						context.put("ID_TYPE", WordBookUtil
								.getWordBookItemName("idtype",
										apply.getIdType()));
						context.put("ID_NUMBER", apply.getIdNumber());
						context.put("PLOCALCODE", apply.getWorkCountryCode());
						context.put("PHONE", apply.getPhone());
						context.put("MLOCALCODE", apply.getMobileCountryCode());
						context.put("MOBILE_PHONE", apply.getMobilePhone());

						context.put("RESIDENCE_ADDRESS",
								apply.getResidenceAddress());
						context.put("DISTRICT", apply.getDistrict());
						context.put("CITY", apply.getCity());
						context.put("REGION", apply.getRegion());
						context.put("COUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getCountry()));
						context.put("OCCUPATION", apply.getEmployer());
						context.put("EMPLOYER_NAME", apply.getEmployerName());
						context.put("COMPANY_INDUSTRY", apply.getPriIndustry());

						context.put("TRADEPLATFORM",
								apply.getHaveEverTradingOther());
						if (apply.getWhatIsAsset() != null) {
							context.put("ASSET", apply.getWhatIsAsset());
						}

						if (apply.getQuestions() != null) {
							List<BuyerApplyQuestion> questions = apply
									.getQuestions();
							for (int i = 0; i < questions.size(); i++) {
								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q101")) {
									context.put("YEARSINVESTOR",
											questions.get(i).getAtext());
									continue;
								}
								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q102")) {
									context.put("ISFACTORING", questions.get(i)
											.getAtext());
									continue;
								}
								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q103")) {
									context.put("ISAUCTION", questions.get(i)
											.getAtext());
									continue;
								}

								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q104")) {
									context.put("ISPROVIDER", questions.get(i)
											.getAtext());
									continue;
								}
								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q105")) {
									context.put("ISASSET", questions.get(i)
											.getAtext());
									continue;
								}
								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q106")) {
									context.put("MAJOR", questions.get(i)
											.getAtext());
									continue;
								}

								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q107")) {
									context.put("EALAST", questions.get(i)
											.getAtext());
									continue;
								}

								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q108")) {
									context.put("EATHIS", questions.get(i)
											.getAtext());
									continue;
								}

								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q109")) {
									context.put("PLATFORM", questions.get(i)
											.getAtext());
									continue;
								}
							}

						}
						context.put("BUSINESSFROM", apply.getWhichBusFrom());
						context.put("COMPANY_NAME", apply.getCompanyName());
						context.put("ISREGISTVN", apply.getIsComVietnam());
						if (apply.getComRegisteredCountry() != null) {
							context.put("REGIST_COUNTRY",
									apply.getComRegisteredCountry());
						}
						if ("Yes".equals(apply.getIsComVietnam())) {
							context.put("REGIST_COUNTRY", "Vietnam");
						}
						context.put("REGIST_NUMBER",
								apply.getComRegistrationNumber());
						context.put("TAX_CODE", apply.getComTaxCode());
						context.put("ESTABLISH_DATE",
								apply.getComEstablishmentDate());
						context.put("ORGANIZATION", WordBookUtil
								.getWordBookItemName("comDurationInVt",
										apply.getComDurationInVt()));
						// context.put("ENTITY_TYPE", WordBookUtil
						// .getWordBookItemName("entityType",
						// apply.getEntityType()));
						context.put("COMPANY_ADDRESS", apply.getComAddress());
						context.put("COMPANY_DISTRICT", apply.getComDistrict());
						context.put("COMPANY_CITY", apply.getComCity());
						context.put("COMPANY_REGION", apply.getComRegion());
						context.put("COMPANY_COUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getComCountry()));
						context.put("POST_CODE", apply.getComPostcode());
						context.put("ISDFCPADDRESS", apply.getAddress2());
						context.put("DFCOMPANY_ADDRESS", apply.getAddress());
						context.put("DFCOMPANY_DISTRICT", apply.getDistrict2());
						context.put("DFCOMPANY_CITY", apply.getCity2());
						context.put("DFCOMPANY_REGION", apply.getRegion2());
						context.put("DFCOMPANY_COUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getCountry2()));
						context.put("DFPOST_CODE", apply.getPostcode());
						context.put("TYPECOMPANY", WordBookUtil
								.getWordBookItemName("comType",
										apply.getComType()));
						context.put("CPINDUSTRY", apply.getComIndustry());

						if (apply.getQuestions() != null) {
							List<BuyerApplyQuestion> questions = apply
									.getQuestions();
							for (int i = 0; i < questions.size(); i++) {
								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q201")) {
									context.put("CPTURNOVER", questions.get(i)
											.getAtext());
									continue;
								}
								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q202")) {
									context.put("ISCPENGAGED", questions.get(i)
											.getAtext());
									continue;
								}

								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q203")) {
									context.put("ISCPASSET", questions.get(i)
											.getAtext());
									continue;
								}
								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q204")) {
									context.put("CPASSET", questions.get(i)
											.getAtext());
									continue;
								}

								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q205")) {
									context.put("CPINVESTMENT", questions
											.get(i).getAtext());
									continue;
								}

								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q206")) {
									context.put("CPAVERAGE", questions.get(i)
											.getAtext());
									continue;
								}

								if (questions.get(i).getQname() != null
										&& questions.get(i).getQname()
												.equals("q207")) {
									context.put("CPAVERAGEPER", questions
											.get(i).getAtext());
									continue;
								}
							}
						}
						context.put("CPBUSINESSFROM",
								apply.getComWhichBusFrom());
						context.put("CPPOSITION", WordBookUtil
								.getWordBookItemName("position",
										apply.getPosition()));

						if (apply.getAreAuthorizedPerson() != null
								&& apply.getAreAuthorizedPerson().equals("No")) {
							context.put("ISATHPERSON", "1");
						} else {
							context.put("ISATHPERSON", "0");
						}
						context.put("ISCPOPERATE",
								apply.getAreAuthorizedPerson());

						context.put(
								"CPTITLE",
								WordBookUtil.getWordBookItemName("title",
										apply.getAuthzTitle()));
						context.put("CPFNAME", apply.getAuthzFirstName());
						context.put("CPLNAME", apply.getAuthzLastName());
						context.put("CPEMAIL", apply.getAuthzEmail());
						context.put("CPPOSITION1", apply.getAuthzPositon());
						context.put("CPGENDER", WordBookUtil
								.getWordBookItemName("gender",
										apply.getAuthzGender()));
						context.put("CPDOB", apply.getAuthzDob());
						context.put("CPNATIONALITY", WordBookUtil
								.getWordBookItemName("country",
										apply.getAuthzNationality()));
						context.put("CPRESIDENCE", WordBookUtil
								.getWordBookItemName("country",
										apply.getAuthzResidenceCountry()));
						context.put("CPIDTYPE", WordBookUtil
								.getWordBookItemName("idtype",
										apply.getAuthzIdType()));
						context.put("CPIDNUMBER", apply.getAuthzIdNumber());
						context.put("CPWPHONECODE", apply.getAuPhCountryCode());
						context.put("CPWPHONE", apply.getAuthzPhone());
						context.put("CPMPHONECODE", apply.getAuMoCountryCode());
						context.put("CPMPHONE", apply.getAuthzMobilePhone());
						return context;
					}
				});

	}

	private void invoiceFlowInfo(final Invoice apply,
			HttpServletRequest request, final String handleType) {

		saveDocuments(apply.getId().toString(), apply.getDocuments());

		flowHandle(WorkflowProxy.invoiceDeliveryFlow, handleType, request,
				new Function<Map<String, Object>, Object>() {
					@Override
					@Nullable
					public Object apply(@Nullable Map<String, Object> context) {
						WorkflowProxy.setAppPkId(context, apply.getId());

						context.put("COMPANY_NAME",
								apply.getSellerCompanyName());
						if (handleType.equals("start")) {
							context.put("IDA_DATE", apply.getCreateTime());
							context.put("IDA_CODE",
									"IDA_" + DateTrimmer.getYMDHMS());
							context.put("SME_APP_PK_ID", apply.getSellerIdKey());
							context.put("ISVERIFICATION", "0");
							ParamSettingCenter psCenter = ParamSettingCenter
									.getInsance();
							String ifSystemCheck = Getter.string(psCenter
									.get("IPS0006"));

							try {
								Connection conn = SystemDataSource
										.getInstance().getConnection();
								DataTrimmerI trimmerI = new DataTrimmerI(conn);
								String sql = "SELECT P.DARID,P.RATING,P.RISKLEVEL FROM IF_MGT_CP_PROFILE P WHERE P.PROFILE_APP_ID = ?";
								Map map = trimmerI.searchSingleData(sql,
										apply.getSellerIdKey());
								if (map != null) {
									context.put("DAR", WordBookUtil
											.getWordBookItemName(
													"common_yesorno",
													Getter.string(map
															.get("DARID"))));
									if (ifSystemCheck.equals("yes")) {
										context.put("RATING", Getter.string(map
												.get("RATING")));
										context.put("RISKLEVEL", (Getter
												.string(map.get("RISKLEVEL")))
												.substring(0, 1));
									}
								}
							} catch (SystemDataSourceException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
						context.put("IDA_UPDATED_DATE", apply.getUpdateTime());
						context.put("IDA_ADVANCE", apply.getReadyToSellAdv());
						context.put("IDA_INTEREST", apply.getReadyToSellInt());
						// context.put("IIDSI_TITLE",
						// apply.getSellerRepresentedByTitle());
						//
						// context.put("IIDSI_USER",
						// apply.getSellerRepresentedByName());
						context.put("IIDSI_USER",
								apply.getSellerRepresentedByTitle());
						context.put("DEBTOR", apply.getDebtorName());
						context.put("ADDRESS", apply.getDebtorAddress());
						context.put("DISTRICT", apply.getDistrict());
						context.put("CITY", apply.getCity());
						context.put("REGION", apply.getRegion());
						context.put("COUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getCountry()));
						context.put("POSTCODE", apply.getPostCode());
						context.put("TAX_CODE", apply.getDebtorTaxCode());
						context.put("REGIST_NO", apply.getDebtorBizRegNo());

						context.put("STICKER_ID", apply.getFinStickerId());
						context.put("SERIAL_NUMBER",
								apply.getSerialNumInvoice());
						context.put("INVOICE_NUMBER", apply.getFinVatInvNo());
						context.put("INVOICE_ISSUANCE_DATE",
								apply.getFinInvIssDate());
						context.put("INVOICE_AMOUNT", apply.getFinInvAmount());
						context.put("INVOICE_OBJECT", apply.getFinObjOfInv());
						context.put("DUE_DATE", apply.getFinDueDateAccToCont());
						context.put("EXPECTED_PAYMENT_DATE",
								apply.getFinExpPmtDate());
						context.put("REMAINING_TERM", apply.getFinRmngMatTerm());
						return context;
					}
				});
	}

	private void invoiceOriVerFlowInfo(final Invoice apply,
			HttpServletRequest request, final String handleType) {

		flowHandle(WorkflowProxy.oriVerInvoiceFlow, handleType, request,
				new Function<Map<String, Object>, Object>() {
					@Override
					@Nullable
					public Object apply(@Nullable Map<String, Object> context) {
						WorkflowProxy.setAppPkId(context, apply.getId());

						context.put("COMPANY_NAME",
								apply.getSellerCompanyName());
						if (handleType.equals("start")) {
							context.put("IOV_DATE", apply.getCreateTime());
							context.put("IOV_CODE",
									"IOV_" + DateTrimmer.getYMDHMS());
							context.put("SME_APP_PK_ID", apply.getSellerIdKey());
							try {
								Connection conn = SystemDataSource
										.getInstance().getConnection();
								DataTrimmerI trimmerI = new DataTrimmerI(conn);
								String sql = "SELECT P.DARID,P.RATING,P.RISKLEVEL FROM IF_MGT_CP_PROFILE P WHERE P.PROFILE_APP_ID = ?";
								Map map = trimmerI.searchSingleData(sql,
										apply.getSellerIdKey());
								ParamSettingCenter psCenter = ParamSettingCenter
										.getInsance();
								String ifSystemCheck = Getter.string(psCenter
										.get("IPS0006"));
								if (map != null) {
									context.put("DAR", WordBookUtil
											.getWordBookItemName(
													"common_yesorno",
													Getter.string(map
															.get("DARID"))));
									if (ifSystemCheck.equals("yes")) {
										context.put("RATING", Getter.string(map
												.get("RATING")));
										context.put("RISKLEVEL", (Getter
												.string(map.get("RISKLEVEL")))
												.substring(0, 1));
									}
								}
							} catch (SystemDataSourceException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
						context.put("IOV_UPDATED_DATE", apply.getUpdateTime());
						context.put("IOV_ADVANCE", apply.getReadyToSellAdv());
						context.put("IOV_INTEREST", apply.getReadyToSellInt());
						context.put("ISACCEPTED", "0");
						context.put("ISVERIFICATION", "0");
						// context.put("IIDSI_TITLE",
						// apply.getSellerRepresentedByTitle());
						//
						// context.put("IIDSI_USER",
						// apply.getSellerRepresentedByName());
						context.put("IOVS_USER",
								apply.getSellerRepresentedByName());
						context.put("DEBTOR", apply.getDebtorName());
						context.put("ADDRESS", apply.getDebtorAddress());
						context.put("DISTRICT", apply.getDistrict());
						context.put("CITY", apply.getCity());
						context.put("REGION", apply.getRegion());
						context.put("COUNTRY", WordBookUtil
								.getWordBookItemName("country",
										apply.getCountry()));
						context.put("POSTCODE", apply.getPostCode());
						context.put("TAX_CODE", apply.getDebtorTaxCode());
						context.put("REGIST_NO", apply.getDebtorBizRegNo());

						context.put("STICKER_ID", apply.getFinStickerId());
						context.put("SERIAL_NUMBER",
								apply.getSerialNumInvoice());
						context.put("INVOICE_NUMBER", apply.getFinVatInvNo());
						context.put("INVOICE_ISSUANCE_DATE",
								apply.getFinInvIssDate());
						context.put("INVOICE_AMOUNT", apply.getFinInvAmount());
						context.put("INVOICE_OBJECT", apply.getFinObjOfInv());
						context.put("DUE_DATE", apply.getFinDueDateAccToCont());
						context.put("EXPECTED_PAYMENT_DATE",
								apply.getFinExpPmtDate());
						context.put("REMAINING_TERM", apply.getFinRmngMatTerm());
						return context;
					}
				});
	}

	private void saveDocuments(String bizId, List<? extends Document> documents) {
		List<String> urls = Lists.newArrayList();
		for (Document doc : documents) {
			String[] types = doc.getBizType().split(DocEntity.BIZTYPE_SEP);
			StringBuffer buf = new StringBuffer(appVars.appServer);
			buf.append("/document/");
			buf.append(types[0]).append('/');
			buf.append(types[1]).append('/');
			buf.append(types[2]).append('/');
			buf.append(doc.getId());
			String extension = doc.getExtension();
			if (!StringUtils.isEmpty(extension)) {
				buf.append('.').append(extension);
			}
			urls.add(buf.toString());
		}
		try {
			ImageUploadHelper.saveDocumentUrls(bizId, urls);
		} catch (Throwable t) {
			LOG.error(t.getMessage(), t);
		}
	}

	private void flowHandle(WorkflowProxy workflow, String handleType,
			HttpServletRequest request,
			Function<Map<String, Object>, Object> bind) {
		LOG.info(handleType + " " + workflow.name() + " workflow");
		Map<String, Object> context = Maps.newHashMap();
		bind.apply(context);
		try {
			workflow.flowHandle(context, request, handleType);
		} catch (Throwable t) {
			LOG.error(t.getMessage(), t);
		}
	}
}
