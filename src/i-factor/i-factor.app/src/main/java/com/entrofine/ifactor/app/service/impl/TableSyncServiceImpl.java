package com.entrofine.ifactor.app.service.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.entrofine.ifactor.api.entity.TableSyncEvent;
import com.entrofine.ifactor.api.service.TableSyncService;
import com.entrofine.ifactor.app.entity.AppRole;
import com.entrofine.ifactor.app.entity.BuyerApply;
import com.entrofine.ifactor.app.entity.Catalog;
import com.entrofine.ifactor.app.entity.Invoice;
import com.entrofine.ifactor.app.entity.SellerApply;
import com.entrofine.ifactor.app.repository.BuyerApplyRepository;
import com.entrofine.ifactor.app.repository.InvoiceRepository;
import com.entrofine.ifactor.app.repository.SellerApplyRepository;
import com.entrofine.ifactor.app.service.AccountService;
import com.entrofine.ifactor.app.service.CatalogService;
import com.entrofine.ifactor.app.service.workflow.BuyerFlowStatus;
import com.entrofine.ifactor.app.service.workflow.InvoiceFlowStatus;
import com.entrofine.ifactor.app.service.workflow.SmeFlowStatus;

@Component
public class TableSyncServiceImpl implements TableSyncService {

	private enum EventType {

		buyerApplyStatus("IF_MGT_BUYER_APPLY", "BA_STATUS"),

		smeApplyStatus("IF_MGT_CP_APPLY", "CPSTATUS"),

		invoiceDeliveryStatus("IF_MGT_INVOICE_APPLY", "IDA_STATUS"),

		auctionStatus("IF_MGT_INVOICE_AUCTION", "AUCTION_STATUS"),

		buyerApplyOpinion("IF_MGT_BUYER_FLOW_OPINION", "IMAGE_REMARK"),

		smeApplyOpinion("IF_MGT_SME_FLOW_OPINION", "IMAGE_REMARK"),

		invoiceDeliveryOpinion("IF_MGT_INVOICE_OPINION", "IMAGE_REMARK"),

		invoiceStartDate("IF_MGT_INVOICE_APPLY", "IDA_CYCLESTART"),

		invoiceEndDate("IF_MGT_INVOICE_APPLY", "IDA_CYCLEEND"),

		invoiceReleaseDate("IF_MGT_INVOICE_APPLY", "RELEASE_DATE"),

		invoiceDelistingDays("IF_MGT_INVOICE_FINANC", "REMAINING_TERM"),

		invoiceAdvance("IF_MGT_INVOICE_APPLY", "IDA_ADVANCE"),

		invoiceInterest("IF_MGT_INVOICE_APPLY", "IDA_INTEREST"),

		smeInvoiceLimitMin("IF_MGT_CP_PROFILE", "MIAMOUNT"),

		smeInvoiceLimitMax("IF_MGT_CP_PROFILE", "MAAMOUNT"),

		smeInvoiceLimitBalance("IF_MGT_CP_PROFILE", "LIMITBALANCE"),

		smeAcknowledagementRequirement("IF_MGT_CP_PROFILE", "DAR"),

		sysVars("IF_MGT_SYSVARS", "VALUE"),

		enterpriseCategory("IF_MGT_CP_APPLY", "COMPANIESTYPEID"),

		sellerBankAccount("IF_MGT_SME_FLOW_OPINION", "BANKACCOUNT"),

		buyerBankAccount("IF_MGT_BUYER_FLOW_OPINION", "BANKACCOUNT");

		private String table;
		private String fieldName;

		private EventType(String table, String fieldName) {
			this.table = table;
			this.fieldName = fieldName;
		}

		public boolean match(TableSyncEvent e) {
			return table.equalsIgnoreCase(e.getTable())
					&& fieldName.equalsIgnoreCase(e.getFieldName());
		}
	}

	private static final Logger LOG = LoggerFactory
			.getLogger(TableSyncServiceImpl.class);

	@Autowired
	private SellerApplyRepository smeApplyRep;
	@Autowired
	private BuyerApplyRepository buyerApplyRep;
	@Autowired
	private InvoiceRepository invoiceRep;
	@Autowired
	private AccountService accountService;
	@Autowired
	private CatalogService catalogService;

	@Override
	@Transactional
	public void execute(List<TableSyncEvent> events) {
		for (TableSyncEvent event : events) {
			save(event);
		}
	}

	private void save(TableSyncEvent event) {
		if (EventType.smeApplyStatus.match(event)) {
			saveSmeApplyFlowStatus(event);
			return;
		}

		if (EventType.smeApplyOpinion.match(event)) {
			saveSmeApplyFlowOpinion(event);
			return;
		}

		if (EventType.buyerApplyStatus.match(event)) {
			saveBuyerApplyFlowStatus(event);
			return;
		}

		if (EventType.buyerApplyOpinion.match(event)) {
			saveBuyerApplyFlowOpinion(event);
			return;
		}

		if (EventType.invoiceDeliveryStatus.match(event)) {
			saveInvoiceDeliveryFlowStatus(event);
			return;
		}

		if (EventType.invoiceDeliveryOpinion.match(event)) {
			saveInvoiceDeliveryFlowOpinion(event);
			return;
		}

		if (EventType.invoiceStartDate.match(event)) {
			saveStartDate(event);
			return;
		}

		if (EventType.invoiceEndDate.match(event)) {
			saveEndDate(event);
			return;
		}

		if (EventType.invoiceReleaseDate.match(event)) {
			saveReleaseDate(event);
			return;
		}

		if (EventType.invoiceDelistingDays.match(event)) {
			saveDelistingDays(event);
			return;
		}

		if (EventType.invoiceAdvance.match(event)) {
			saveAdvance(event);
			return;
		}

		if (EventType.invoiceInterest.match(event)) {
			saveInterest(event);
			return;
		}

		if (EventType.auctionStatus.match(event)) {
			saveAuctionStatus(event);
			return;
		}

		if (EventType.smeInvoiceLimitMin.match(event)) {
			saveInvoiceLimitMin(event);
		}

		if (EventType.smeInvoiceLimitMax.match(event)) {
			saveInvoiceLimitMax(event);
		}

		if (EventType.smeInvoiceLimitBalance.match(event)) {
			saveInvoiceLimitBalance(event);
		}

		if (EventType.smeAcknowledagementRequirement.match(event)) {
			saveAcknowledagementRequirement(event);
		}

		if (EventType.sysVars.match(event)) {
			saveSysVars(event);
		}

		if (EventType.enterpriseCategory.match(event)) {
			saveEnterpriseCategory(event);
		}

		if (EventType.sellerBankAccount.match(event)) {
			saveSellerBankAccount(event);
		}

		if (EventType.buyerBankAccount.match(event)) {
			saveBuyerBankAccount(event);
		}
	}

	private void saveSmeApplyFlowStatus(TableSyncEvent event) {
		try {
			SellerApply apply = smeApplyRep
					.findOne(Long.valueOf(event.getId()));
			apply.setFlowStatus((String) event.getFieldValue());
			apply = smeApplyRep.save(apply);

			changeRole(apply);
			sendMessage(apply);

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveSmeApplyFlowOpinion(TableSyncEvent event) {
		try {
			String opinion = (String) event.getFieldValue();
			if (StringUtils.isEmpty(opinion)) {
				opinion = "Empty";
			}

			SellerApply apply = smeApplyRep
					.findOne(Long.valueOf(event.getId()));
			apply.setFlowOpinion(opinion);
			apply = smeApplyRep.save(apply);

			sendMessage(apply);

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void changeRole(SellerApply apply) {
		SmeFlowStatus flowStatus = SmeFlowStatus.findByStatus(apply
				.getFlowStatus());
		if (flowStatus == null) {
			return;
		}

		if (SmeFlowStatus.MODIFY.equals(flowStatus)) {
			accountService.saveAs(apply.getSellerId(),
					AppRole.PRE_SELLER_UPDATE.toString());
			return;
		}

		if (SmeFlowStatus.RELEASE.equals(flowStatus)) {
			accountService.saveAs(apply.getSellerId(),
					AppRole.SELLER.toString());
			return;
		}
	}

	private void sendMessage(SellerApply apply) {
		SmeFlowStatus flowStatus = SmeFlowStatus.findByStatus(apply
				.getFlowStatus());
		if (flowStatus == null) {
			return;
		}
		accountService.sendWorkflowMessage(apply.getSellerId(),
				flowStatus.getMessageId(), apply);

	}

	private void saveBuyerApplyFlowStatus(TableSyncEvent event) {
		try {
			String status = (String) event.getFieldValue();
			BuyerApply apply = buyerApplyRep
					.findOne(Long.valueOf(event.getId()));
			apply.setFlowStatus(status);
			apply = buyerApplyRep.save(apply);

			changeRole(apply);
			sendMessage(apply);

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveBuyerApplyFlowOpinion(TableSyncEvent event) {
		try {
			String opinion = (String) event.getFieldValue();
			if (StringUtils.isEmpty(opinion)) {
				opinion = "Empty";
			}

			BuyerApply apply = buyerApplyRep
					.findOne(Long.valueOf(event.getId()));
			apply.setFlowOpinion(opinion);
			buyerApplyRep.save(apply);

			sendMessage(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void changeRole(BuyerApply apply) {
		BuyerFlowStatus flowStatus = BuyerFlowStatus.findByStatus(apply
				.getFlowStatus());
		if (flowStatus == null) {
			return;
		}

		if (BuyerFlowStatus.MODIFY.equals(flowStatus)) {
			accountService.saveAs(apply.getBuyerId(),
					AppRole.PRE_BUYER_UPDATE.toString());
			return;
		}

		if (BuyerFlowStatus.RELEASE.equals(flowStatus)) {
			accountService.saveAs(apply.getBuyerId(), AppRole.BUYER.toString());
			return;
		}
	}

	private void sendMessage(BuyerApply apply) {
		BuyerFlowStatus flowStatus = BuyerFlowStatus.findByStatus(apply
				.getFlowStatus());
		if (flowStatus == null) {
			return;
		}
		accountService.sendWorkflowMessage(apply.getBuyerId(),
				flowStatus.getMessageId(), apply);

	}

	private void saveInvoiceDeliveryFlowStatus(TableSyncEvent event) {
		try {
			String status = (String) event.getFieldValue();
			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setFlowStatus(status);
			invoiceRep.save(apply);
			if (!status.equals("xhLGTcqzFh_dSHAvdyhfW")) {
				sendMessage(apply);
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveInvoiceDeliveryFlowOpinion(TableSyncEvent event) {
		try {
			String opinion = (String) event.getFieldValue();
			if (StringUtils.isEmpty(opinion)) {
				opinion = "Empty";
			}

			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setFlowOpinion(opinion);
			invoiceRep.save(apply);

			sendMessage(apply);

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveStartDate(TableSyncEvent event) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
			String value = (String) event.getFieldValue();
			if (value.length() > 8) {
				value = value.substring(4, 6) + "/" + value.substring(6, 8)
						+ "/" + value.substring(0, 4);
			}
			Date startDate = sdf.parse(value);
			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setStartDate(startDate);
			invoiceRep.save(apply);
			apply.setFlowStatus("xhLGTcqzFh_dSHAvdyhfW");
			sendMessage(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveEndDate(TableSyncEvent event) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
			String value = (String) event.getFieldValue();
			if (value.length() > 8) {
				value = value.substring(4, 6) + "/" + value.substring(6, 8)
						+ "/" + value.substring(0, 4);
			}
			Date endDate = sdf.parse(value);
			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setEndDate(endDate);
			invoiceRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveReleaseDate(TableSyncEvent event) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
			String value = (String) event.getFieldValue();
			if (value.length() > 8) {
				value = value.substring(4, 6) + "/" + value.substring(6, 8)
						+ "/" + value.substring(0, 4);
			}
			Date releaseDate = sdf.parse(value);
			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setReleasedDate(releaseDate);
			invoiceRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveDelistingDays(TableSyncEvent event) {
		try {
			Long value = Long.valueOf((String) event.getFieldValue());
			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setReDaysStillDelisting(value);
			invoiceRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveAdvance(TableSyncEvent event) {
		try {
			BigDecimal advance = new BigDecimal((String) event.getFieldValue());
			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setAdvance(advance);
			invoiceRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveInterest(TableSyncEvent event) {
		try {
			BigDecimal interest = new BigDecimal((String) event.getFieldValue());
			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setInterest(interest);
			invoiceRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void sendMessage(Invoice apply) {
		if (StringUtils.isEmpty(apply.getFlowOpinion())) {
			return;
		}

		InvoiceFlowStatus flowStatus = InvoiceFlowStatus.findByStatus(apply
				.getFlowStatus());
		if (flowStatus != null) {
			accountService.sendWorkflowMessage(apply.getSellerId(),
					flowStatus.getMessageId(), apply);
		}
	}

	private void saveAuctionStatus(TableSyncEvent event) {
		try {
			Invoice apply = invoiceRep.findOne(Long.valueOf(event.getId()));
			apply.setFlowStatus((String) event.getFieldValue());
			invoiceRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveAcknowledagementRequirement(TableSyncEvent event) {
		SellerApply apply = smeApplyRep.findOne(Long.valueOf(event.getId()));
		apply.setDebtorAckReq((String) event.getFieldValue());
		apply = smeApplyRep.save(apply);
	}

	private void saveInvoiceLimitBalance(TableSyncEvent event) {
		SellerApply apply = smeApplyRep.findOne(Long.valueOf(event.getId()));
		apply.setLimitBalance(new BigDecimal((String) event.getFieldValue()));
		apply = smeApplyRep.save(apply);
	}

	private void saveInvoiceLimitMax(TableSyncEvent event) {
		SellerApply apply = smeApplyRep.findOne(Long.valueOf(event.getId()));
		apply.setLimitMax(new BigDecimal((String) event.getFieldValue()));
		apply = smeApplyRep.save(apply);
	}

	private void saveInvoiceLimitMin(TableSyncEvent event) {
		SellerApply apply = smeApplyRep.findOne(Long.valueOf(event.getId()));
		apply.setLimitMin(new BigDecimal((String) event.getFieldValue()));
		apply = smeApplyRep.save(apply);
	}

	private void saveSysVars(TableSyncEvent event) {
		Catalog sysVars = catalogService.findSysVars();
		if (sysVars == null) {
			return;
		}
		for (Catalog var : sysVars.getChildren()) {
			if (var.getName().equalsIgnoreCase(event.getId())) {
				var.setCode((String) event.getFieldValue());
				return;
			}
		}
	}

	private void saveEnterpriseCategory(TableSyncEvent event) {
		try {
			SellerApply apply = smeApplyRep
					.findOne(Long.valueOf(event.getId()));
			apply.setEtype((String) event.getFieldValue());
			apply = smeApplyRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveSellerBankAccount(TableSyncEvent event) {
		try {
			SellerApply apply = smeApplyRep
					.findOne(Long.valueOf(event.getId()));
			apply.setBankAccountNumber((String) event.getFieldValue());
			apply = smeApplyRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	private void saveBuyerBankAccount(TableSyncEvent event) {
		try {
			BuyerApply apply = buyerApplyRep
					.findOne(Long.valueOf(event.getId()));
			apply.setBankAccountNumber((String) event.getFieldValue());
			apply = buyerApplyRep.save(apply);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}
}
