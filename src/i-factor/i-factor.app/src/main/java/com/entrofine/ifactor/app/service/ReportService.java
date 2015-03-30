package com.entrofine.ifactor.app.service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ddshell.framework.app.entity.User;
import com.entrofine.ifactor.app.entity.AggregateInvoiceExpectedSettlementDateReportRow;
import com.entrofine.ifactor.app.entity.AggregateInvoiceRegionReportRow;
import com.entrofine.ifactor.app.entity.AggregateInvoiceSellerRatingReportRow;
import com.entrofine.ifactor.app.entity.AggregateInvoiceSmeSegmentReportRow;
import com.entrofine.ifactor.app.entity.BuyerRegionReportRow;
import com.entrofine.ifactor.app.entity.BuyerSellerRatingReportRow;
import com.entrofine.ifactor.app.entity.BuyerSmeSegmentReportRow;
import com.entrofine.ifactor.app.entity.InAuctionReportRow;
import com.entrofine.ifactor.app.entity.SellerRegionReportRow;
import com.entrofine.ifactor.app.entity.SellerSmeSegmentReportRow;
import com.entrofine.ifactor.app.repository.InvoiceRepository;

@Component
public class ReportService {
	@Autowired
	private InvoiceRepository invoiceRepository;

	@Autowired
	private AccountService accountService;

	// Aggregate Invoice Report
	// Aggregate Invoice Report - Region
	public List<AggregateInvoiceRegionReportRow> aggregateInvoiceRegionReport() {
		String[] params = new String[] { "Hanoi", "Ho Chi Minh", "Hai Phong",
				"Da Nang", "Can ThoK", "Others" };

		User loginSeller = accountService.getLoginUser();
		List<AggregateInvoiceRegionReportRow> reportRows = new ArrayList<AggregateInvoiceRegionReportRow>();

		// 初始化
		reportRows.clear();
		for (String param : params) {
			AggregateInvoiceRegionReportRow row = new AggregateInvoiceRegionReportRow(
					param);
			reportRows.add(row);
		}

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年

		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);

		List<Object> dbRows = invoiceRepository.aggregateInvoiceRegionReprot(
				loginSeller.getId(), startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (dbRows != null && dbRows.size() > 0) {
			for (Object dbRow : dbRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (AggregateInvoiceRegionReportRow reportRow : reportRows) {
					if (reportRow.getRegion().equals(dbCells[0].toString())) {
						reportRow.setNoUploaded(reportRow.getNoUploaded()
								+ (Long) dbCells[1]);
						reportRow.setAmtUploaded(reportRow.getAmtUploaded()
								.add((BigDecimal) dbCells[2]));
						reportRow.setNoInProcessing(reportRow
								.getNoInProcessing() + (Long) dbCells[3]);
						reportRow.setAmtInProcessing(reportRow
								.getAmtInProcessing().add(
										(BigDecimal) dbCells[4]));
						reportRow.setNoRejected(reportRow.getNoRejected()
								+ (Long) dbCells[5]);
						reportRow.setAmtRejected(reportRow.getAmtRejected()
								.add((BigDecimal) dbCells[6]));
						reportRow.setNoAccepted(reportRow.getNoAccepted()
								+ (Long) dbCells[7]);
						reportRow.setAmtAccepted(reportRow.getAmtAccepted()
								.add((BigDecimal) dbCells[8]));
						reportRow.setNoInAuctionBidded(reportRow
								.getNoInAuctionBidded() + (Long) dbCells[9]);
						reportRow.setAmtInAuctionBidded(reportRow
								.getAmtInAuctionBidded().add(
										(BigDecimal) dbCells[10]));
						reportRow.setNoInAuctionUnbidded(reportRow
								.getNoInAuctionUnbidded() + (Long) dbCells[11]);
						reportRow.setAmtInAuctionUnbidded(reportRow
								.getAmtInAuctionUnbidded().add(
										(BigDecimal) dbCells[12]));
						reportRow.setNoDelisted(reportRow.getNoDelisted()
								+ (Long) dbCells[13]);
						reportRow.setAmtDelisted(reportRow.getAmtDelisted()
								.add((BigDecimal) dbCells[14]));
						reportRow.setNoDealed(reportRow.getNoDealed()
								+ (Long) dbCells[15]);
						reportRow.setAmtDealed(reportRow.getAmtDealed().add(
								(BigDecimal) dbCells[16]));
						reportRow.setNoUnsuccessfullyDisbursed(reportRow
								.getNoUnsuccessfullyDisbursed()
								+ (Long) dbCells[17]);
						reportRow.setAmtUnsuccessfullyDisbursed(reportRow
								.getAmtUnsuccessfullyDisbursed().add(
										(BigDecimal) dbCells[18]));
						reportRow.setNoDisbursed(reportRow.getNoDisbursed()
								+ (Long) dbCells[19]);
						reportRow.setAmtDisbursed(reportRow.getAmtDisbursed()
								.add((BigDecimal) dbCells[20]));
						reportRow.setNoSettled(reportRow.getNoSettled()
								+ (Long) dbCells[21]);

						reportRow.setAmtSettled(reportRow.getAmtSettled().add(
								(BigDecimal) dbCells[22]));
						reportRow.setNoOverdue(reportRow.getNoOverdue()
								+ (Long) dbCells[23]);
						reportRow.setAmtOverdue(reportRow.getAmtOverdue().add(
								(BigDecimal) dbCells[24]));

						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (AggregateInvoiceRegionReportRow reportRow : reportRows) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setNoUploaded(reportRow.getNoUploaded()
									+ (Long) dbCells[1]);
							reportRow.setAmtUploaded(reportRow.getAmtUploaded()
									.add((BigDecimal) dbCells[2]));
						}
					}
				}
			}
		}

		return reportRows;
	}

	public Map<String, Object> aggregateInvoiceRegionSumReport() {
		Map<String, Object> returnSum = new HashMap<String, Object>();
		Long sumNoUploaded = 0L;
		BigDecimal sumAmtUploaded = new BigDecimal(0);
		Long sumNoInProcessing = 0L;
		BigDecimal sumAmtInProcessing = new BigDecimal(0);
		Long sumNoRejected = 0L;
		BigDecimal sumAmtRejected = new BigDecimal(0);
		Long sumNoAccepted = 0L;
		BigDecimal sumAmtAccepted = new BigDecimal(0);
		Long sumNoInAuctionBidded = 0L;
		BigDecimal sumAmtInAuctionBidded = new BigDecimal(0);
		Long sumNoInAuctionUnbidded = 0L;
		BigDecimal sumAmtInAuctionUnbidded = new BigDecimal(0);
		Long sumNoDelisted = 0L;
		BigDecimal sumAmtDelisted = new BigDecimal(0);
		Long sumNoDealed = 0L;
		BigDecimal sumAmtDealed = new BigDecimal(0);
		Long sumNoUnsuccessfullyDisbursed = 0L;
		BigDecimal sumAmtUnsuccessfullyDisbursed = new BigDecimal(0);
		Long sumNoDisbursed = 0L;
		BigDecimal sumAmtDisbursed = new BigDecimal(0);
		Long sumNoSettled = 0L;
		BigDecimal sumAmtSettled = new BigDecimal(0);
		Long sumNoOverdue = 0L;
		BigDecimal sumAmtOverdue = new BigDecimal(0);

		List<AggregateInvoiceRegionReportRow> rows = aggregateInvoiceRegionReport();

		for (AggregateInvoiceRegionReportRow row : rows) {
			sumNoUploaded += row.getNoUploaded();
			sumAmtUploaded.add(row.getAmtUploaded());
			sumNoInProcessing += row.getNoInProcessing();
			sumAmtInProcessing.add(row.getAmtInProcessing());
			sumNoRejected += row.getNoRejected();
			sumAmtRejected.add(row.getAmtRejected());
			sumNoAccepted += row.getNoAccepted();
			sumAmtAccepted.add(row.getAmtAccepted());
			sumNoInAuctionBidded += row.getNoInAuctionBidded();
			sumAmtInAuctionBidded.add(row.getAmtInAuctionBidded());
			sumNoInAuctionUnbidded += row.getNoInAuctionUnbidded();
			sumAmtInAuctionUnbidded.add(row.getAmtInAuctionUnbidded());
			sumNoDelisted += row.getNoDelisted();
			sumAmtDelisted.add(row.getAmtDelisted());
			sumNoDealed += row.getNoDealed();
			sumAmtDealed.add(row.getAmtDealed());
			sumNoUnsuccessfullyDisbursed += row.getNoUnsuccessfullyDisbursed();
			sumAmtUnsuccessfullyDisbursed.add(row
					.getAmtUnsuccessfullyDisbursed());
			sumNoDisbursed += row.getNoDisbursed();
			sumAmtDisbursed.add(row.getAmtDisbursed());
			sumNoSettled += row.getNoSettled();
			sumAmtSettled.add(row.getAmtSettled());
			sumNoOverdue += row.getNoOverdue();
			sumAmtOverdue.add(row.getAmtOverdue());
		}

		returnSum.put("sumNoUploaded", sumNoUploaded);
		returnSum.put("sumAmtUploaded", sumAmtUploaded);
		returnSum.put("sumNoInProcessing", sumNoInProcessing);
		returnSum.put("sumAmtInProcessing", sumAmtInProcessing);
		returnSum.put("sumNoRejected", sumNoRejected);
		returnSum.put("sumAmtRejected", sumAmtRejected);
		returnSum.put("sumNoAccepted", sumNoAccepted);
		returnSum.put("sumAmtAccepted", sumAmtAccepted);
		returnSum.put("sumNoInAuctionBidded", sumNoInAuctionBidded);
		returnSum.put("sumAmtInAuctionBidded", sumAmtInAuctionBidded);
		returnSum.put("sumNoInAuctionUnbidded", sumNoInAuctionUnbidded);
		returnSum.put("sumAmtInAuctionUnbidded", sumAmtInAuctionUnbidded);
		returnSum.put("sumNoDelisted", sumNoDelisted);
		returnSum.put("sumAmtDelisted", sumAmtDelisted);
		returnSum.put("sumNoDealed", sumNoDealed);
		returnSum.put("sumAmtDealed", sumAmtDealed);
		returnSum.put("sumNoUnsuccessfullyDisbursed",
				sumNoUnsuccessfullyDisbursed);
		returnSum.put("sumAmtUnsuccessfullyDisbursed",
				sumAmtUnsuccessfullyDisbursed);
		returnSum.put("sumNoDisbursed", sumAmtDisbursed);
		returnSum.put("sumAmtDisbursed", sumAmtDealed);
		returnSum.put("sumNoSettled", sumNoSettled);
		returnSum.put("sumAmtSettled", sumAmtSettled);
		returnSum.put("sumNoOverdue", sumNoOverdue);
		returnSum.put("sumAmtOverdue", sumAmtOverdue);

		return returnSum;
	}

	// Aggregate Invoice Report - Region
	public List<AggregateInvoiceExpectedSettlementDateReportRow> aggregateInvoiceExpectedSettlementDateReport() {

		User loginSeller = accountService.getLoginUser();
		List<AggregateInvoiceExpectedSettlementDateReportRow> reportRows = new ArrayList<AggregateInvoiceExpectedSettlementDateReportRow>();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年

		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);
		List<Object> dbRows = invoiceRepository
				.aggregateInvoiceExpectedSettlementDateReport(
						loginSeller.getId(), startDate, endDate);

		reportRows.clear();
		for (Object dbRow : dbRows) {
			AggregateInvoiceExpectedSettlementDateReportRow reportRow = new AggregateInvoiceExpectedSettlementDateReportRow();
			Object[] dbCells = (Object[]) dbRow;
			reportRow.setExpectedSettlementDate((String) dbCells[0]);
			reportRow.setNoUploaded(reportRow.getNoUploaded()
					+ (Long) dbCells[1]);
			reportRow.setAmtUploaded(reportRow.getAmtUploaded().add(
					(BigDecimal) dbCells[2]));
			reportRow.setNoInProcessing(reportRow.getNoInProcessing()
					+ (Long) dbCells[3]);
			reportRow.setAmtInProcessing(reportRow.getAmtInProcessing().add(
					(BigDecimal) dbCells[4]));
			reportRow.setNoRejected(reportRow.getNoRejected()
					+ (Long) dbCells[5]);
			reportRow.setAmtRejected(reportRow.getAmtRejected().add(
					(BigDecimal) dbCells[6]));
			reportRow.setNoAccepted(reportRow.getNoAccepted()
					+ (Long) dbCells[7]);
			reportRow.setAmtAccepted(reportRow.getAmtAccepted().add(
					(BigDecimal) dbCells[8]));
			reportRow.setNoInAuctionBidded(reportRow.getNoInAuctionBidded()
					+ (Long) dbCells[9]);
			reportRow.setAmtInAuctionBidded(reportRow.getAmtInAuctionBidded()
					.add((BigDecimal) dbCells[10]));
			reportRow.setNoInAuctionUnbidded(reportRow.getNoInAuctionUnbidded()
					+ (Long) dbCells[11]);
			reportRow.setAmtInAuctionUnbidded(reportRow
					.getAmtInAuctionUnbidded().add((BigDecimal) dbCells[12]));
			reportRow.setNoDelisted(reportRow.getNoDelisted()
					+ (Long) dbCells[13]);
			reportRow.setAmtDelisted(reportRow.getAmtDelisted().add(
					(BigDecimal) dbCells[14]));
			reportRow.setNoDealed(reportRow.getNoDealed() + (Long) dbCells[15]);
			reportRow.setAmtDealed(reportRow.getAmtDealed().add(
					(BigDecimal) dbCells[16]));
			reportRow.setNoUnsuccessfullyDisbursed(reportRow
					.getNoUnsuccessfullyDisbursed() + (Long) dbCells[17]);
			reportRow.setAmtUnsuccessfullyDisbursed(reportRow
					.getAmtUnsuccessfullyDisbursed().add(
							(BigDecimal) dbCells[18]));
			reportRow.setNoDisbursed(reportRow.getNoDisbursed()
					+ (Long) dbCells[19]);
			reportRow.setAmtDisbursed(reportRow.getAmtDisbursed().add(
					(BigDecimal) dbCells[20]));
			reportRow.setNoSettled(reportRow.getNoSettled()
					+ (Long) dbCells[21]);

			reportRow.setAmtSettled(reportRow.getAmtSettled().add(
					(BigDecimal) dbCells[22]));
			reportRow.setNoOverdue(reportRow.getNoOverdue()
					+ (Long) dbCells[23]);
			reportRow.setAmtOverdue(reportRow.getAmtOverdue().add(
					(BigDecimal) dbCells[24]));
		}

		return reportRows;
	}

	public Map<String, Object> aggregateInvoiceExpectedSettlementDateSumReport() {
		Map<String, Object> returnSum = new HashMap<String, Object>();
		Long sumNoUploaded = 0L;
		BigDecimal sumAmtUploaded = new BigDecimal(0);
		Long sumNoInProcessing = 0L;
		BigDecimal sumAmtInProcessing = new BigDecimal(0);
		Long sumNoRejected = 0L;
		BigDecimal sumAmtRejected = new BigDecimal(0);
		Long sumNoAccepted = 0L;
		BigDecimal sumAmtAccepted = new BigDecimal(0);
		Long sumNoInAuctionBidded = 0L;
		BigDecimal sumAmtInAuctionBidded = new BigDecimal(0);
		Long sumNoInAuctionUnbidded = 0L;
		BigDecimal sumAmtInAuctionUnbidded = new BigDecimal(0);
		Long sumNoDelisted = 0L;
		BigDecimal sumAmtDelisted = new BigDecimal(0);
		Long sumNoDealed = 0L;
		BigDecimal sumAmtDealed = new BigDecimal(0);
		Long sumNoUnsuccessfullyDisbursed = 0L;
		BigDecimal sumAmtUnsuccessfullyDisbursed = new BigDecimal(0);
		Long sumNoDisbursed = 0L;
		BigDecimal sumAmtDisbursed = new BigDecimal(0);
		Long sumNoSettled = 0L;
		BigDecimal sumAmtSettled = new BigDecimal(0);
		Long sumNoOverdue = 0L;
		BigDecimal sumAmtOverdue = new BigDecimal(0);

		List<AggregateInvoiceRegionReportRow> rows = aggregateInvoiceRegionReport();

		for (AggregateInvoiceRegionReportRow row : rows) {
			sumNoUploaded += row.getNoUploaded();
			sumAmtUploaded.add(row.getAmtUploaded());
			sumNoInProcessing += row.getNoInProcessing();
			sumAmtInProcessing.add(row.getAmtInProcessing());
			sumNoRejected += row.getNoRejected();
			sumAmtRejected.add(row.getAmtRejected());
			sumNoAccepted += row.getNoAccepted();
			sumAmtAccepted.add(row.getAmtAccepted());
			sumNoInAuctionBidded += row.getNoInAuctionBidded();
			sumAmtInAuctionBidded.add(row.getAmtInAuctionBidded());
			sumNoInAuctionUnbidded += row.getNoInAuctionUnbidded();
			sumAmtInAuctionUnbidded.add(row.getAmtInAuctionUnbidded());
			sumNoDelisted += row.getNoDelisted();
			sumAmtDelisted.add(row.getAmtDelisted());
			sumNoDealed += row.getNoDealed();
			sumAmtDealed.add(row.getAmtDealed());
			sumNoUnsuccessfullyDisbursed += row.getNoUnsuccessfullyDisbursed();
			sumAmtUnsuccessfullyDisbursed.add(row
					.getAmtUnsuccessfullyDisbursed());
			sumNoDisbursed += row.getNoDisbursed();
			sumAmtDisbursed.add(row.getAmtDisbursed());
			sumNoSettled += row.getNoSettled();
			sumAmtSettled.add(row.getAmtSettled());
			sumNoOverdue += row.getNoOverdue();
			sumAmtOverdue.add(row.getAmtOverdue());
		}

		returnSum.put("sumNoUploaded", sumNoUploaded);
		returnSum.put("sumAmtUploaded", sumAmtUploaded);
		returnSum.put("sumNoInProcessing", sumNoInProcessing);
		returnSum.put("sumAmtInProcessing", sumAmtInProcessing);
		returnSum.put("sumNoRejected", sumNoRejected);
		returnSum.put("sumAmtRejected", sumAmtRejected);
		returnSum.put("sumNoAccepted", sumNoAccepted);
		returnSum.put("sumAmtAccepted", sumAmtAccepted);
		returnSum.put("sumNoInAuctionBidded", sumNoInAuctionBidded);
		returnSum.put("sumAmtInAuctionBidded", sumAmtInAuctionBidded);
		returnSum.put("sumNoInAuctionUnbidded", sumNoInAuctionUnbidded);
		returnSum.put("sumAmtInAuctionUnbidded", sumAmtInAuctionUnbidded);
		returnSum.put("sumNoDelisted", sumNoDelisted);
		returnSum.put("sumAmtDelisted", sumAmtDelisted);
		returnSum.put("sumNoDealed", sumNoDealed);
		returnSum.put("sumAmtDealed", sumAmtDealed);
		returnSum.put("sumNoUnsuccessfullyDisbursed",
				sumNoUnsuccessfullyDisbursed);
		returnSum.put("sumAmtUnsuccessfullyDisbursed",
				sumAmtUnsuccessfullyDisbursed);
		returnSum.put("sumNoDisbursed", sumAmtDisbursed);
		returnSum.put("sumAmtDisbursed", sumAmtDealed);
		returnSum.put("sumNoSettled", sumNoSettled);
		returnSum.put("sumAmtSettled", sumAmtSettled);
		returnSum.put("sumNoOverdue", sumNoOverdue);
		returnSum.put("sumAmtOverdue", sumAmtOverdue);

		return returnSum;
	}

	// Aggregate Invoice Report - SME Segment
	public List<AggregateInvoiceSmeSegmentReportRow> aggregateInvoiceSmeSegmentReport() {
		String[] params = new String[] { "SME", "MSME" };

		User loginSeller = accountService.getLoginUser();
		List<AggregateInvoiceSmeSegmentReportRow> reportRows = new ArrayList<AggregateInvoiceSmeSegmentReportRow>();

		// 初始化
		reportRows.clear();
		for (String param : params) {
			AggregateInvoiceSmeSegmentReportRow row = new AggregateInvoiceSmeSegmentReportRow(
					param);
			reportRows.add(row);
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年

		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);

		List<Object> dbRows = invoiceRepository
				.aggregateInvoiceSmeSegmentReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (dbRows != null && dbRows.size() > 0) {
			for (Object dbRow : dbRows) {

				Object[] dbCells = (Object[]) dbRow;
				for (AggregateInvoiceSmeSegmentReportRow reportRow : reportRows) {
					if (reportRow.getSmeSegment().equals(dbCells[0].toString())) {
						reportRow.setNoUploaded(reportRow.getNoUploaded()
								+ (Long) dbCells[1]);
						reportRow.setAmtUploaded(reportRow.getAmtUploaded()
								.add((BigDecimal) dbCells[2]));
						reportRow.setNoInProcessing(reportRow
								.getNoInProcessing() + (Long) dbCells[3]);
						reportRow.setAmtInProcessing(reportRow
								.getAmtInProcessing().add(
										(BigDecimal) dbCells[4]));
						reportRow.setNoRejected(reportRow.getNoRejected()
								+ (Long) dbCells[5]);
						reportRow.setAmtRejected(reportRow.getAmtRejected()
								.add((BigDecimal) dbCells[6]));
						reportRow.setNoAccepted(reportRow.getNoAccepted()
								+ (Long) dbCells[7]);
						reportRow.setAmtAccepted(reportRow.getAmtAccepted()
								.add((BigDecimal) dbCells[8]));
						reportRow.setNoInAuctionBidded(reportRow
								.getNoInAuctionBidded() + (Long) dbCells[9]);
						reportRow.setAmtInAuctionBidded(reportRow
								.getAmtInAuctionBidded().add(
										(BigDecimal) dbCells[10]));
						reportRow.setNoInAuctionUnbidded(reportRow
								.getNoInAuctionUnbidded() + (Long) dbCells[11]);
						reportRow.setAmtInAuctionUnbidded(reportRow
								.getAmtInAuctionUnbidded().add(
										(BigDecimal) dbCells[12]));
						reportRow.setNoDelisted(reportRow.getNoDelisted()
								+ (Long) dbCells[13]);
						reportRow.setAmtDelisted(reportRow.getAmtDelisted()
								.add((BigDecimal) dbCells[14]));
						reportRow.setNoDealed(reportRow.getNoDealed()
								+ (Long) dbCells[15]);
						reportRow.setAmtDealed(reportRow.getAmtDealed().add(
								(BigDecimal) dbCells[16]));
						reportRow.setNoUnsuccessfullyDisbursed(reportRow
								.getNoUnsuccessfullyDisbursed()
								+ (Long) dbCells[17]);
						reportRow.setAmtUnsuccessfullyDisbursed(reportRow
								.getAmtUnsuccessfullyDisbursed().add(
										(BigDecimal) dbCells[18]));
						reportRow.setNoDisbursed(reportRow.getNoDisbursed()
								+ (Long) dbCells[19]);
						reportRow.setAmtDisbursed(reportRow.getAmtDisbursed()
								.add((BigDecimal) dbCells[20]));
						reportRow.setNoSettled(reportRow.getNoSettled()
								+ (Long) dbCells[21]);

						reportRow.setAmtSettled(reportRow.getAmtSettled().add(
								(BigDecimal) dbCells[22]));
						reportRow.setNoOverdue(reportRow.getNoOverdue()
								+ (Long) dbCells[23]);
						reportRow.setAmtOverdue(reportRow.getAmtOverdue().add(
								(BigDecimal) dbCells[24]));
					}
				}

			}
		}

		return reportRows;
	}

	public Map<String, Object> aggregateInvoiceSmeSegmentSumReport() {
		Map<String, Object> returnSum = new HashMap<String, Object>();
		Long sumNoUploaded = 0L;
		BigDecimal sumAmtUploaded = new BigDecimal(0);
		Long sumNoInProcessing = 0L;
		BigDecimal sumAmtInProcessing = new BigDecimal(0);
		Long sumNoRejected = 0L;
		BigDecimal sumAmtRejected = new BigDecimal(0);
		Long sumNoAccepted = 0L;
		BigDecimal sumAmtAccepted = new BigDecimal(0);
		Long sumNoInAuctionBidded = 0L;
		BigDecimal sumAmtInAuctionBidded = new BigDecimal(0);
		Long sumNoInAuctionUnbidded = 0L;
		BigDecimal sumAmtInAuctionUnbidded = new BigDecimal(0);
		Long sumNoDelisted = 0L;
		BigDecimal sumAmtDelisted = new BigDecimal(0);
		Long sumNoDealed = 0L;
		BigDecimal sumAmtDealed = new BigDecimal(0);
		Long sumNoUnsuccessfullyDisbursed = 0L;
		BigDecimal sumAmtUnsuccessfullyDisbursed = new BigDecimal(0);
		Long sumNoDisbursed = 0L;
		BigDecimal sumAmtDisbursed = new BigDecimal(0);
		Long sumNoSettled = 0L;
		BigDecimal sumAmtSettled = new BigDecimal(0);
		Long sumNoOverdue = 0L;
		BigDecimal sumAmtOverdue = new BigDecimal(0);

		List<AggregateInvoiceSmeSegmentReportRow> rows = aggregateInvoiceSmeSegmentReport();

		for (AggregateInvoiceSmeSegmentReportRow row : rows) {
			sumNoUploaded += row.getNoUploaded();
			sumAmtUploaded.add(row.getAmtUploaded());
			sumNoInProcessing += row.getNoInProcessing();
			sumAmtInProcessing.add(row.getAmtInProcessing());
			sumNoRejected += row.getNoRejected();
			sumAmtRejected.add(row.getAmtRejected());
			sumNoAccepted += row.getNoAccepted();
			sumAmtAccepted.add(row.getAmtAccepted());
			sumNoInAuctionBidded += row.getNoInAuctionBidded();
			sumAmtInAuctionBidded.add(row.getAmtInAuctionBidded());
			sumNoInAuctionUnbidded += row.getNoInAuctionUnbidded();
			sumAmtInAuctionUnbidded.add(row.getAmtInAuctionUnbidded());
			sumNoDelisted += row.getNoDelisted();
			sumAmtDelisted.add(row.getAmtDelisted());
			sumNoDealed += row.getNoDealed();
			sumAmtDealed.add(row.getAmtDealed());
			sumNoUnsuccessfullyDisbursed += row.getNoUnsuccessfullyDisbursed();
			sumAmtUnsuccessfullyDisbursed.add(row
					.getAmtUnsuccessfullyDisbursed());
			sumNoDisbursed += row.getNoDisbursed();
			sumAmtDisbursed.add(row.getAmtDisbursed());
			sumNoSettled += row.getNoSettled();
			sumAmtSettled.add(row.getAmtSettled());
			sumNoOverdue += row.getNoOverdue();
			sumAmtOverdue.add(row.getAmtOverdue());
		}

		returnSum.put("sumNoUploaded", sumNoUploaded);
		returnSum.put("sumAmtUploaded", sumAmtUploaded);
		returnSum.put("sumNoInProcessing", sumNoInProcessing);
		returnSum.put("sumAmtInProcessing", sumAmtInProcessing);
		returnSum.put("sumNoRejected", sumNoRejected);
		returnSum.put("sumAmtRejected", sumAmtRejected);
		returnSum.put("sumNoAccepted", sumNoAccepted);
		returnSum.put("sumAmtAccepted", sumAmtAccepted);
		returnSum.put("sumNoInAuctionBidded", sumNoInAuctionBidded);
		returnSum.put("sumAmtInAuctionBidded", sumAmtInAuctionBidded);
		returnSum.put("sumNoInAuctionUnbidded", sumNoInAuctionUnbidded);
		returnSum.put("sumAmtInAuctionUnbidded", sumAmtInAuctionUnbidded);
		returnSum.put("sumNoDelisted", sumNoDelisted);
		returnSum.put("sumAmtDelisted", sumAmtDelisted);
		returnSum.put("sumNoDealed", sumNoDealed);
		returnSum.put("sumAmtDealed", sumAmtDealed);
		returnSum.put("sumNoUnsuccessfullyDisbursed",
				sumNoUnsuccessfullyDisbursed);
		returnSum.put("sumAmtUnsuccessfullyDisbursed",
				sumAmtUnsuccessfullyDisbursed);
		returnSum.put("sumNoDisbursed", sumAmtDisbursed);
		returnSum.put("sumAmtDisbursed", sumAmtDealed);
		returnSum.put("sumNoSettled", sumNoSettled);
		returnSum.put("sumAmtSettled", sumAmtSettled);
		returnSum.put("sumNoOverdue", sumNoOverdue);
		returnSum.put("sumAmtOverdue", sumAmtOverdue);

		return returnSum;
	}

	// Aggregate Invoice Report - Seller rating
	public List<AggregateInvoiceSellerRatingReportRow> aggregateInvoiceSellerRatingReport() {
		String[] params = new String[] { "1.1", "1.2", "2.1", "2.2", "3.1",
				"3.2", "4.1", "4.2", "5.1", "5.2", "6.1", "6.2" };

		User loginSeller = accountService.getLoginUser();
		List<AggregateInvoiceSellerRatingReportRow> reportRows = new ArrayList<AggregateInvoiceSellerRatingReportRow>();

		// 初始化
		reportRows.clear();
		for (String param : params) {
			AggregateInvoiceSellerRatingReportRow row = new AggregateInvoiceSellerRatingReportRow(
					param);
			reportRows.add(row);
		}

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年

		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);
		List<Object> dbRows = invoiceRepository
				.aggregateInvoiceSellerRatingReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (dbRows != null && dbRows.size() > 0) {
			for (Object dbRow : dbRows) {

				Object[] dbCells = (Object[]) dbRow;
				for (AggregateInvoiceSellerRatingReportRow reportRow : reportRows) {
					if (reportRow.getSellerRating().equals((String) dbCells[0])) {
						reportRow.setNoUploaded(reportRow.getNoUploaded()
								+ (Long) dbCells[1]);
						reportRow.setAmtUploaded(reportRow.getAmtUploaded()
								.add((BigDecimal) dbCells[2]));
						reportRow.setNoInProcessing(reportRow
								.getNoInProcessing() + (Long) dbCells[3]);
						reportRow.setAmtInProcessing(reportRow
								.getAmtInProcessing().add(
										(BigDecimal) dbCells[4]));
						reportRow.setNoRejected(reportRow.getNoRejected()
								+ (Long) dbCells[5]);
						reportRow.setAmtRejected(reportRow.getAmtRejected()
								.add((BigDecimal) dbCells[6]));
						reportRow.setNoAccepted(reportRow.getNoAccepted()
								+ (Long) dbCells[7]);
						reportRow.setAmtAccepted(reportRow.getAmtAccepted()
								.add((BigDecimal) dbCells[8]));
						reportRow.setNoInAuctionBidded(reportRow
								.getNoInAuctionBidded() + (Long) dbCells[9]);
						reportRow.setAmtInAuctionBidded(reportRow
								.getAmtInAuctionBidded().add(
										(BigDecimal) dbCells[10]));
						reportRow.setNoInAuctionUnbidded(reportRow
								.getNoInAuctionUnbidded() + (Long) dbCells[11]);
						reportRow.setAmtInAuctionUnbidded(reportRow
								.getAmtInAuctionUnbidded().add(
										(BigDecimal) dbCells[12]));
						reportRow.setNoDelisted(reportRow.getNoDelisted()
								+ (Long) dbCells[13]);
						reportRow.setAmtDelisted(reportRow.getAmtDelisted()
								.add((BigDecimal) dbCells[14]));
						reportRow.setNoDealed(reportRow.getNoDealed()
								+ (Long) dbCells[15]);
						reportRow.setAmtDealed(reportRow.getAmtDealed().add(
								(BigDecimal) dbCells[16]));
						reportRow.setNoUnsuccessfullyDisbursed(reportRow
								.getNoUnsuccessfullyDisbursed()
								+ (Long) dbCells[17]);
						reportRow.setAmtUnsuccessfullyDisbursed(reportRow
								.getAmtUnsuccessfullyDisbursed().add(
										(BigDecimal) dbCells[18]));
						reportRow.setNoDisbursed(reportRow.getNoDisbursed()
								+ (Long) dbCells[19]);
						reportRow.setAmtDisbursed(reportRow.getAmtDisbursed()
								.add((BigDecimal) dbCells[20]));
						reportRow.setNoSettled(reportRow.getNoSettled()
								+ (Long) dbCells[21]);

						reportRow.setAmtSettled(reportRow.getAmtSettled().add(
								(BigDecimal) dbCells[22]));
						reportRow.setNoOverdue(reportRow.getNoOverdue()
								+ (Long) dbCells[23]);
						reportRow.setAmtOverdue(reportRow.getAmtOverdue().add(
								(BigDecimal) dbCells[24]));
					}
				}

			}
		}

		return reportRows;
	}

	public Map<String, Object> aggregateInvoiceSellerRatingSumReport() {
		Map<String, Object> returnSum = new HashMap<String, Object>();
		Long sumNoUploaded = 0L;
		BigDecimal sumAmtUploaded = new BigDecimal(0);
		Long sumNoInProcessing = 0L;
		BigDecimal sumAmtInProcessing = new BigDecimal(0);
		Long sumNoRejected = 0L;
		BigDecimal sumAmtRejected = new BigDecimal(0);
		Long sumNoAccepted = 0L;
		BigDecimal sumAmtAccepted = new BigDecimal(0);
		Long sumNoInAuctionBidded = 0L;
		BigDecimal sumAmtInAuctionBidded = new BigDecimal(0);
		Long sumNoInAuctionUnbidded = 0L;
		BigDecimal sumAmtInAuctionUnbidded = new BigDecimal(0);
		Long sumNoDelisted = 0L;
		BigDecimal sumAmtDelisted = new BigDecimal(0);
		Long sumNoDealed = 0L;
		BigDecimal sumAmtDealed = new BigDecimal(0);
		Long sumNoUnsuccessfullyDisbursed = 0L;
		BigDecimal sumAmtUnsuccessfullyDisbursed = new BigDecimal(0);
		Long sumNoDisbursed = 0L;
		BigDecimal sumAmtDisbursed = new BigDecimal(0);
		Long sumNoSettled = 0L;
		BigDecimal sumAmtSettled = new BigDecimal(0);
		Long sumNoOverdue = 0L;
		BigDecimal sumAmtOverdue = new BigDecimal(0);

		List<AggregateInvoiceSmeSegmentReportRow> rows = aggregateInvoiceSmeSegmentReport();

		for (AggregateInvoiceSmeSegmentReportRow row : rows) {
			sumNoUploaded += row.getNoUploaded();
			sumAmtUploaded.add(row.getAmtUploaded());
			sumNoInProcessing += row.getNoInProcessing();
			sumAmtInProcessing.add(row.getAmtInProcessing());
			sumNoRejected += row.getNoRejected();
			sumAmtRejected.add(row.getAmtRejected());
			sumNoAccepted += row.getNoAccepted();
			sumAmtAccepted.add(row.getAmtAccepted());
			sumNoInAuctionBidded += row.getNoInAuctionBidded();
			sumAmtInAuctionBidded.add(row.getAmtInAuctionBidded());
			sumNoInAuctionUnbidded += row.getNoInAuctionUnbidded();
			sumAmtInAuctionUnbidded.add(row.getAmtInAuctionUnbidded());
			sumNoDelisted += row.getNoDelisted();
			sumAmtDelisted.add(row.getAmtDelisted());
			sumNoDealed += row.getNoDealed();
			sumAmtDealed.add(row.getAmtDealed());
			sumNoUnsuccessfullyDisbursed += row.getNoUnsuccessfullyDisbursed();
			sumAmtUnsuccessfullyDisbursed.add(row
					.getAmtUnsuccessfullyDisbursed());
			sumNoDisbursed += row.getNoDisbursed();
			sumAmtDisbursed.add(row.getAmtDisbursed());
			sumNoSettled += row.getNoSettled();
			sumAmtSettled.add(row.getAmtSettled());
			sumNoOverdue += row.getNoOverdue();
			sumAmtOverdue.add(row.getAmtOverdue());
		}

		returnSum.put("sumNoUploaded", sumNoUploaded);
		returnSum.put("sumAmtUploaded", sumAmtUploaded);
		returnSum.put("sumNoInProcessing", sumNoInProcessing);
		returnSum.put("sumAmtInProcessing", sumAmtInProcessing);
		returnSum.put("sumNoRejected", sumNoRejected);
		returnSum.put("sumAmtRejected", sumAmtRejected);
		returnSum.put("sumNoAccepted", sumNoAccepted);
		returnSum.put("sumAmtAccepted", sumAmtAccepted);
		returnSum.put("sumNoInAuctionBidded", sumNoInAuctionBidded);
		returnSum.put("sumAmtInAuctionBidded", sumAmtInAuctionBidded);
		returnSum.put("sumNoInAuctionUnbidded", sumNoInAuctionUnbidded);
		returnSum.put("sumAmtInAuctionUnbidded", sumAmtInAuctionUnbidded);
		returnSum.put("sumNoDelisted", sumNoDelisted);
		returnSum.put("sumAmtDelisted", sumAmtDelisted);
		returnSum.put("sumNoDealed", sumNoDealed);
		returnSum.put("sumAmtDealed", sumAmtDealed);
		returnSum.put("sumNoUnsuccessfullyDisbursed",
				sumNoUnsuccessfullyDisbursed);
		returnSum.put("sumAmtUnsuccessfullyDisbursed",
				sumAmtUnsuccessfullyDisbursed);
		returnSum.put("sumNoDisbursed", sumAmtDisbursed);
		returnSum.put("sumAmtDisbursed", sumAmtDealed);
		returnSum.put("sumNoSettled", sumNoSettled);
		returnSum.put("sumAmtSettled", sumAmtSettled);
		returnSum.put("sumNoOverdue", sumNoOverdue);
		returnSum.put("sumAmtOverdue", sumAmtOverdue);

		return returnSum;
	}

	// In-Auction report
	// In-Auction vpbank report
	public List<InAuctionReportRow> inAuctionForVPBankReport() {
		User loginSeller = accountService.getLoginUser();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年

		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);
		List<Object> dbRows = this.invoiceRepository.inAuctionForVPBank(
				loginSeller.getId(), startDate, endDate);

		List<InAuctionReportRow> reportRows = new ArrayList<InAuctionReportRow>();
		reportRows.clear();
		if (dbRows != null && dbRows.size() > 0) {
			for (Object dbRow : dbRows) {
				Object[] dbCells = (Object[]) dbRow;
				InAuctionReportRow reportRow = new InAuctionReportRow();
				reportRow.setReleaseDate((Date) dbCells[0]);
				reportRow.setInvoiceId((Long) dbCells[1]);
				reportRow.setInvoiceAmount((BigDecimal) dbCells[2]);
				reportRow.setSellerId((Long) dbCells[3]);
				reportRow.setSellerRating((BigDecimal) dbCells[4]);
				reportRow.setDebtorId((Long) dbCells[5]);
				reportRow.setDebtorName((String) dbCells[6]);
				reportRow.setExpectedSettlementDate((Date) dbCells[7]);
				reportRow.setRemainingTerm((Long) dbCells[8]);
				reportRow.setDelistingDate((Date) dbCells[9]);
				reportRow.setRemainingDaysTillDelisting((Long) dbCells[10]);
				reportRow.setNoOfBids((Long) dbCells[11]);
				reportRow.setReadyToSellAdv((BigDecimal) dbCells[12]);
				reportRow.setReadyToSellInt((BigDecimal) dbCells[13]);
				reportRow.setCboa((BigDecimal) dbCells[14]);
				reportRow.setCboi((BigDecimal) dbCells[15]);

				reportRows.add(reportRow);
			}
		}
		return reportRows;
	}

	public Map<String, Object> inAuctionForVPBankSumReport() {
		Map<String, Object> returnSum = new HashMap<String, Object>();
		BigDecimal sumInvoiceAmount = new BigDecimal(0);
		Long sumNoOfBids = 0L;
		List<InAuctionReportRow> reportRows = inAuctionForVPBankReport();
		for (InAuctionReportRow row : reportRows) {
			sumInvoiceAmount.add(row.getInvoiceAmount());
			sumNoOfBids += row.getNoOfBids();
		}

		returnSum.put("sumInvoiceAmount", sumInvoiceAmount);
		returnSum.put("sumNoOfBids", sumNoOfBids);

		return returnSum;
	}

	// In-Auction public report
	public List<InAuctionReportRow> inAuctionForPublicReport() {
		User loginSeller = accountService.getLoginUser();

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年

		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);
		List<Object> dbRows = this.invoiceRepository.inAuctionForPublic(
				loginSeller.getId(), startDate, endDate);

		List<InAuctionReportRow> reportRows = new ArrayList<InAuctionReportRow>();
		reportRows.clear();
		if (dbRows != null && dbRows.size() > 0) {
			for (Object dbRow : dbRows) {
				Object[] dbCells = (Object[]) dbRow;
				InAuctionReportRow reportRow = new InAuctionReportRow();
				reportRow.setReleaseDate((Date) dbCells[0]);
				reportRow.setInvoiceId((Long) dbCells[1]);
				reportRow.setInvoiceAmount((BigDecimal) dbCells[2]);
				reportRow.setSellerId((Long) dbCells[3]);
				reportRow.setSellerRating((BigDecimal) dbCells[4]);
				reportRow.setDebtorId((Long) dbCells[5]);
				reportRow.setDebtorName((String) dbCells[6]);
				reportRow.setExpectedSettlementDate((Date) dbCells[7]);
				reportRow.setRemainingTerm((Long) dbCells[8]);
				reportRow.setDelistingDate((Date) dbCells[9]);
				reportRow.setRemainingDaysTillDelisting((Long) dbCells[10]);
				reportRow.setNoOfBids((Long) dbCells[11]);
				reportRow.setReadyToSellAdv((BigDecimal) dbCells[12]);
				reportRow.setReadyToSellInt((BigDecimal) dbCells[13]);
				reportRow.setCboa((BigDecimal) dbCells[14]);
				reportRow.setCboi((BigDecimal) dbCells[15]);

				reportRows.add(reportRow);
			}
		}
		return reportRows;
	}

	public Map<String, Object> inAuctionForPublicSumReport() {
		Map<String, Object> returnSum = new HashMap<String, Object>();
		BigDecimal sumInvoiceAmount = new BigDecimal(0);
		Long sumNoOfBids = 0L;
		List<InAuctionReportRow> reportRows = inAuctionForVPBankReport();
		for (InAuctionReportRow row : reportRows) {
			sumInvoiceAmount.add(row.getInvoiceAmount());
			sumNoOfBids += row.getNoOfBids();
		}

		returnSum.put("sumInvoiceAmount", sumInvoiceAmount);
		returnSum.put("sumNoOfBids", sumNoOfBids);

		return returnSum;
	}

	// Seller Report
	// Seller Report - detail report
	public List<Object> sellerDetailsReport() {
		User loginSeller = accountService.getLoginUser();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年

		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);
		return invoiceRepository.sellerDetailsReport(loginSeller.getId(),
				startDate, endDate);
	}

	public Map<String, Object> sellerDetailsSumReport() {
		Map<String, Object> detailsSum = new HashMap<String, Object>();
		List<Object> rows = sellerDetailsReport();

		Long sumNoOfInvSubmitted = 0L;
		Long sumNoOfInvAccepted = 0L;
		BigDecimal sumAmountOfInvAccepted = new BigDecimal(0.0);
		Long sumNoOfInvDisbursed = 0L;
		BigDecimal sumAmountOfInvDisbursed = new BigDecimal(0.0);
		// Long weightedAvgAdv = 0L;
		// Long weightedAvgInt = 0L;
		Long sumCancellations = 0L;

		for (Object row : rows) {
			Object[] cells = (Object[]) row;
			sumNoOfInvSubmitted += Long.parseLong(cells[3].toString());
			sumNoOfInvAccepted += Long.parseLong(cells[4].toString());
			sumAmountOfInvAccepted.add((BigDecimal) cells[5]);
			sumNoOfInvDisbursed += Long.parseLong(cells[6].toString());
			sumAmountOfInvDisbursed.add((BigDecimal) cells[7]);
			sumCancellations += Long.parseLong(cells[10].toString());
		}

		detailsSum.put("sumNoOfInvSubmitted", sumNoOfInvSubmitted);
		detailsSum.put("sumNoOfInvAccepted", sumNoOfInvAccepted);
		detailsSum.put("sumAmountOfInvAccepted", sumAmountOfInvAccepted);
		detailsSum.put("sumNoOfInvDisbursed", sumNoOfInvDisbursed);
		detailsSum.put("sumAmountOfInvDisbursed", sumAmountOfInvDisbursed);
		detailsSum.put("sumCancellations", sumCancellations);

		return detailsSum;
	}

	// Seller Report - Region
	public List<SellerRegionReportRow> sellerRegionReport() {
		String[] paramRegion = new String[] { "Hanoi", "Ho Chi Minh",
				"Hai Phong", "Da Nang", "Can ThoK", "Others" };

		List<SellerRegionReportRow> returnObj = new ArrayList<SellerRegionReportRow>();

		// 初始化
		returnObj.clear();
		for (String region : paramRegion) {
			SellerRegionReportRow row = new SellerRegionReportRow(region);
			returnObj.add(row);
		}

		User loginSeller = accountService.getLoginUser();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年
		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);

		// applied
		List<Object> appliedRegionRows = invoiceRepository
				.buyerAppliedRegionReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (appliedRegionRows != null && appliedRegionRows.size() > 0) {
			for (Object dbRow : appliedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setApplied(reportRow.getApplied()
								+ ((BigDecimal) (dbCells[2])).longValue());
						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (SellerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setApplied(reportRow.getApplied()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}
		// accepted
		List<Object> acceptedRegionRows = invoiceRepository
				.sellerAcceptedRegionReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (acceptedRegionRows != null && acceptedRegionRows.size() > 0) {
			for (Object dbRow : acceptedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setAccepted(reportRow.getAccepted()
								+ ((BigDecimal) (dbCells[2])).longValue());
						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (SellerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setAccepted(reportRow.getAccepted()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}

		// invested
		List<Object> financedRegionRows = invoiceRepository
				.sellerFinancedRegionReport(loginSeller.getId(), startDate,
						endDate); // 抓取数据库的的数据,并进行运算
		if (financedRegionRows != null && financedRegionRows.size() > 0) {
			for (Object dbRow : financedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setFinanced(reportRow.getFinanced()
								+ ((BigDecimal) (dbCells[2])).longValue());
						bOthers = false;
					}
				} // 没找到区域，则计入Others
				if (bOthers) {
					for (SellerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setFinanced(reportRow.getFinanced()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}

		// weightedAvgAdv
		// weightedAvgInt
		List<Object> weightedAvgAdvIntRegionRows = invoiceRepository
				.buyerWeightedAdvAndIntRegionReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (weightedAvgAdvIntRegionRows != null
				&& weightedAvgAdvIntRegionRows.size() > 0) {
			for (Object dbRow : weightedAvgAdvIntRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setWeightedAvgAdv(reportRow
								.getWeightedAvgAdv().add(
										(BigDecimal) (dbCells[2])));
						reportRow.setWeightedAvgInt(reportRow
								.getWeightedAvgInt().add(
										(BigDecimal) (dbCells[3])));
						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (SellerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setWeightedAvgAdv(reportRow
									.getWeightedAvgAdv().add(
											(BigDecimal) (dbCells[2])));
							reportRow.setWeightedAvgInt(reportRow
									.getWeightedAvgInt().add(
											(BigDecimal) (dbCells[3])));
						}
					}
				}
			}
		}

		// regulatoryBlacklisted
		List<Object> fraudBlacklistedRegionRows = invoiceRepository
				.sellerFraudBlacklistedRegionReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (fraudBlacklistedRegionRows != null
				&& fraudBlacklistedRegionRows.size() > 0) {
			for (Object dbRow : fraudBlacklistedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setFraudBlacklisted(reportRow
								.getFraudBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (SellerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setFraudBlacklisted(reportRow
									.getFraudBlacklisted()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}

		// cancellationBlacklisted
		List<Object> cancellationBlacklistedRegionRows = invoiceRepository
				.buyerCancellationBlacklistedRegionReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (cancellationBlacklistedRegionRows != null
				&& cancellationBlacklistedRegionRows.size() > 0) {
			for (Object dbRow : cancellationBlacklistedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setCancellationBlacklisted(reportRow
								.getCancellationBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (SellerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setCancellationBlacklisted(reportRow
									.getCancellationBlacklisted()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}

		return returnObj;
	}

	public Map<String, Object> sellerRegionSumReport() {
		Map<String, Object> regionSum = new HashMap<String, Object>();
		Long sumApplied = 0L, sumAccepted = 0L, sumFinanced = 0L;
		Long sumFraudBlacklisted = 0L, sumCancellationBlacklisted = 0L;

		List<SellerRegionReportRow> rows = sellerRegionReport();

		for (SellerRegionReportRow row : rows) {
			sumApplied += row.getApplied();
			sumAccepted += row.getAccepted();
			sumFinanced += row.getFinanced();

			sumFraudBlacklisted += row.getFraudBlacklisted();
			sumCancellationBlacklisted += row.getCancellationBlacklisted();
		}

		regionSum.put("sumApplied", sumApplied);
		regionSum.put("sumAccepted", sumAccepted);
		regionSum.put("sumFinanced", sumFinanced);
		regionSum.put("sumFraudBlacklisted", sumFraudBlacklisted);
		regionSum.put("sumCancellationBlacklisted", sumCancellationBlacklisted);

		return regionSum;
	}

	// Seller Report - SME Segment
	public List<SellerSmeSegmentReportRow> sellerSmeSegmentReport() {
		String[] paramRegion = new String[] { "SME", "MSME" };

		List<SellerSmeSegmentReportRow> returnObj = new ArrayList<SellerSmeSegmentReportRow>();

		// 初始化
		returnObj.clear();
		for (String smeSegment : paramRegion) {
			SellerSmeSegmentReportRow row = new SellerSmeSegmentReportRow(
					smeSegment);
			returnObj.add(row);
		}

		User loginSeller = accountService.getLoginUser();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年
		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);

		// applied
		List<Object> appliedSmeSegmentRows = invoiceRepository
				.sellerAppliedSmeSegmentReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (appliedSmeSegmentRows != null && appliedSmeSegmentRows.size() > 0) {
			for (Object dbRow : appliedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setApplied(reportRow.getApplied()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}
		// accepted
		List<Object> acceptedSmeSegmentRows = invoiceRepository
				.sellerAcceptedSmeSegmentReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (acceptedSmeSegmentRows != null && acceptedSmeSegmentRows.size() > 0) {
			for (Object dbRow : acceptedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setAccepted(reportRow.getAccepted()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}

		// financed
		List<Object> finanedSmeSegmentRows = invoiceRepository
				.sellerFinancedSmeSegmentReport(loginSeller.getId(), startDate,
						endDate); // 抓取数据库的的数据,并进行运算
		if (finanedSmeSegmentRows != null && finanedSmeSegmentRows.size() > 0) {
			for (Object dbRow : finanedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setFinanced(reportRow.getFinanced()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}

		// weightedAvgAdv
		// weightedAvgInt
		List<Object> weightedAvgAdvIntSmeSegmentRows = invoiceRepository
				.sellerWeightedAdvAndIntSmeSegmentReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (weightedAvgAdvIntSmeSegmentRows != null
				&& weightedAvgAdvIntSmeSegmentRows.size() > 0) {
			for (Object dbRow : weightedAvgAdvIntSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setWeightedAvgAdv(reportRow
								.getWeightedAvgAdv().add(
										(BigDecimal) (dbCells[2])));
						reportRow.setWeightedAvgInt(reportRow
								.getWeightedAvgInt().add(
										(BigDecimal) (dbCells[3])));
						// bOthers = false;
					}
				}
			}
		}

		// fraudBlacklisted
		List<Object> fraudBlacklistedSmeSegmentRows = invoiceRepository
				.sellerFraudBlacklistedSmeSegmentReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (fraudBlacklistedSmeSegmentRows != null
				&& fraudBlacklistedSmeSegmentRows.size() > 0) {
			for (Object dbRow : fraudBlacklistedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setFraudBlacklisted(reportRow
								.getFraudBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						// bOthers = false;
					}
				}
			}
		}

		// cancellationBlacklisted
		List<Object> cancellationBlacklistedSmeSegmentRows = invoiceRepository
				.buyerCancellationBlacklistedSmeSegmentReport(
						loginSeller.getId(), startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (cancellationBlacklistedSmeSegmentRows != null
				&& cancellationBlacklistedSmeSegmentRows.size() > 0) {
			for (Object dbRow : cancellationBlacklistedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (SellerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setCancellationBlacklisted(reportRow
								.getCancellationBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						// bOthers = false;
					}
				}
			}
		}

		return returnObj;
	}

	public Map<String, Object> sellerSmeSegmentSumReport() {
		Map<String, Object> regionSum = new HashMap<String, Object>();
		Long sumApplied = 0L, sumAccepted = 0L, sumFinanced = 0L;
		Long sumFraudBlacklisted = 0L, sumCancellationBlacklisted = 0L;

		List<SellerSmeSegmentReportRow> rows = sellerSmeSegmentReport();

		for (SellerSmeSegmentReportRow row : rows) {
			sumApplied += row.getApplied();
			sumAccepted += row.getAccepted();
			sumFinanced += row.getFinanced();

			sumFraudBlacklisted += row.getFraudBlacklisted();
			sumCancellationBlacklisted += row.getCancellationBlacklisted();
		}

		regionSum.put("sumApplied", sumApplied);
		regionSum.put("sumAccepted", sumAccepted);
		regionSum.put("sumFinanced", sumFinanced);
		regionSum.put("sumFraudBlacklisted", sumFraudBlacklisted);
		regionSum.put("sumCancellationBlacklisted", sumCancellationBlacklisted);

		return regionSum;
	}

	// //////////////////////////////////////////////////////////
	public List<Object> buyerDetailsReport() {
		User loginSeller = accountService.getLoginUser();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年
		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);

		return invoiceRepository.buyerDetailsReport(loginSeller.getId(),
				startDate, endDate);
	}

	public Map<String, Object> buyerDetailsSumReport() {
		Map<String, Object> detailsSum = new HashMap<String, Object>();
		List<Object> rows = buyerDetailsReport();

		Long sumNoOfBidsPlaced = 0L;
		Long sumNoOfBidAccepted = 0L;
		BigDecimal sumTotalReturn = new BigDecimal(0.0);
		for (Object row : rows) {
			Object[] cells = (Object[]) row;
			sumNoOfBidsPlaced += Long.parseLong(cells[2].toString());
			sumNoOfBidAccepted += Long.parseLong(cells[3].toString());
			sumTotalReturn.add(new BigDecimal(cells[6].toString()));
		}

		detailsSum.put("sumNoOfBidsPlaced", sumNoOfBidsPlaced);
		detailsSum.put("sumNoOfBidAccepted", sumNoOfBidAccepted);
		detailsSum.put("sumTotalReturn", sumTotalReturn);
		return detailsSum;
	}

	public List<BuyerRegionReportRow> buyerRegionReport() {
		String[] paramRegion = new String[] { "Hanoi", "Ho Chi Minh",
				"Hai Phong", "Da Nang", "Can ThoK", "Others" };

		List<BuyerRegionReportRow> returnObj = new ArrayList<BuyerRegionReportRow>();

		// 初始化
		returnObj.clear();
		for (String region : paramRegion) {
			BuyerRegionReportRow row = new BuyerRegionReportRow(region);
			returnObj.add(row);
		}

		User loginSeller = accountService.getLoginUser();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年
		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);

		// applied
		List<Object> appliedRegionRows = invoiceRepository
				.buyerAppliedRegionReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (appliedRegionRows != null && appliedRegionRows.size() > 0) {
			for (Object dbRow : appliedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setApplied(reportRow.getApplied()
								+ ((BigDecimal) (dbCells[2])).longValue());
						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (BuyerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setApplied(reportRow.getApplied()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}
		// accepted
		List<Object> acceptedRegionRows = invoiceRepository
				.buyerAcceptedRegionReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (acceptedRegionRows != null && acceptedRegionRows.size() > 0) {
			for (Object dbRow : acceptedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setAccepted(reportRow.getAccepted()
								+ ((BigDecimal) (dbCells[2])).longValue());
						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (BuyerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setAccepted(reportRow.getAccepted()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}

		// invested
		List<Object> investedRegionRows = invoiceRepository
				.buyerInvestedRegionReport(loginSeller.getId(), startDate,
						endDate); // 抓取数据库的的数据,并进行运算
		if (investedRegionRows != null && investedRegionRows.size() > 0) {
			for (Object dbRow : investedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setInvested(reportRow.getInvested()
								+ ((BigDecimal) (dbCells[2])).longValue());
						bOthers = false;
					}
				} // 没找到区域，则计入Others
				if (bOthers) {
					for (BuyerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setInvested(reportRow.getInvested()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}

		// weightedAvgAdv
		// weightedAvgInt
		List<Object> weightedAvgAdvIntRegionRows = invoiceRepository
				.buyerWeightedAdvAndIntRegionReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (weightedAvgAdvIntRegionRows != null
				&& weightedAvgAdvIntRegionRows.size() > 0) {
			for (Object dbRow : weightedAvgAdvIntRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setWeightedAvgAdv(reportRow
								.getWeightedAvgAdv().add(
										(BigDecimal) (dbCells[2])));
						reportRow.setWeightedAvgInt(reportRow
								.getWeightedAvgInt().add(
										(BigDecimal) (dbCells[3])));
						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (BuyerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setWeightedAvgAdv(reportRow
									.getWeightedAvgAdv().add(
											(BigDecimal) (dbCells[2])));
							reportRow.setWeightedAvgInt(reportRow
									.getWeightedAvgInt().add(
											(BigDecimal) (dbCells[3])));
						}
					}
				}
			}
		}

		// regulatoryBlacklisted
		List<Object> regulatoryBlacklistedRegionRows = invoiceRepository
				.buyerRegulatoryBlacklistedRegionReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (regulatoryBlacklistedRegionRows != null
				&& regulatoryBlacklistedRegionRows.size() > 0) {
			for (Object dbRow : regulatoryBlacklistedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setRegulatoryBlacklisted(reportRow
								.getRegulatoryBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (BuyerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setRegulatoryBlacklisted(reportRow
									.getRegulatoryBlacklisted()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}

		// cancellationBlacklisted
		List<Object> cancellationBlacklistedRegionRows = invoiceRepository
				.buyerCancellationBlacklistedRegionReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (cancellationBlacklistedRegionRows != null
				&& cancellationBlacklistedRegionRows.size() > 0) {
			for (Object dbRow : cancellationBlacklistedRegionRows) {
				boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerRegionReportRow reportRow : returnObj) {
					if (reportRow.getRegion().equals(dbCells[1].toString())) {
						reportRow.setCancellationBlacklisted(reportRow
								.getCancellationBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						bOthers = false;
					}
				}
				// 没找到区域，则计入Others
				if (bOthers) {
					for (BuyerRegionReportRow reportRow : returnObj) {
						if (reportRow.getRegion().equals("Others")) {
							reportRow.setCancellationBlacklisted(reportRow
									.getCancellationBlacklisted()
									+ ((BigDecimal) (dbCells[2])).longValue());
						}
					}
				}
			}
		}

		return returnObj;
	}

	public Map<String, Object> buyerRegionSumReport() {
		Map<String, Object> regionSum = new HashMap<String, Object>();
		Long sumApplied = 0L, sumAccepted = 0L, sumInvested = 0L;
		Long sumRegulatoryBlacklisted = 0L, sumCancellationBlacklisted = 0L;

		List<BuyerRegionReportRow> rows = buyerRegionReport();

		for (BuyerRegionReportRow row : rows) {
			sumApplied += row.getApplied();
			sumAccepted += row.getAccepted();
			sumInvested += row.getInvested();

			sumRegulatoryBlacklisted += row.getRegulatoryBlacklisted();
			sumCancellationBlacklisted += row.getCancellationBlacklisted();
		}

		regionSum.put("sumApplied", sumApplied);
		regionSum.put("sumAccepted", sumAccepted);
		regionSum.put("sumInvested", sumInvested);
		regionSum.put("sumRegulatoryBlacklisted", sumRegulatoryBlacklisted);
		regionSum.put("sumCancellationBlacklisted", sumCancellationBlacklisted);

		return regionSum;
	}

	// SME Segment
	public List<BuyerSmeSegmentReportRow> buyerSmeSegmentReport() {
		String[] paramRegion = new String[] { "SME", "MSME" };

		List<BuyerSmeSegmentReportRow> returnObj = new ArrayList<BuyerSmeSegmentReportRow>();

		// 初始化
		returnObj.clear();
		for (String smeSegment : paramRegion) {
			BuyerSmeSegmentReportRow row = new BuyerSmeSegmentReportRow(
					smeSegment);
			returnObj.add(row);
		}

		User loginSeller = accountService.getLoginUser();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年
		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);

		// applied
		List<Object> appliedSmeSegmentRows = invoiceRepository
				.buyerAppliedSmeSegmentReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (appliedSmeSegmentRows != null && appliedSmeSegmentRows.size() > 0) {
			for (Object dbRow : appliedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setApplied(reportRow.getApplied()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}
		// accepted
		List<Object> acceptedSmeSegmentRows = invoiceRepository
				.buyerAcceptedSmeSegmentReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (acceptedSmeSegmentRows != null && acceptedSmeSegmentRows.size() > 0) {
			for (Object dbRow : acceptedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setAccepted(reportRow.getAccepted()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}

		// invested
		List<Object> investedSmeSegmentRows = invoiceRepository
				.buyerInvestedSmeSegmentReport(loginSeller.getId(), startDate,
						endDate); // 抓取数据库的的数据,并进行运算
		if (investedSmeSegmentRows != null && investedSmeSegmentRows.size() > 0) {
			for (Object dbRow : investedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setInvested(reportRow.getInvested()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}

		// weightedAvgAdv
		// weightedAvgInt
		List<Object> weightedAvgAdvIntSmeSegmentRows = invoiceRepository
				.buyerWeightedAvgAdvAndIntSmeSegmentReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (weightedAvgAdvIntSmeSegmentRows != null
				&& weightedAvgAdvIntSmeSegmentRows.size() > 0) {
			for (Object dbRow : weightedAvgAdvIntSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setWeightedAvgAdv(reportRow
								.getWeightedAvgAdv().add(
										(BigDecimal) (dbCells[2])));
						reportRow.setWeightedAvgInt(reportRow
								.getWeightedAvgInt().add(
										(BigDecimal) (dbCells[3])));
						// bOthers = false;
					}
				}
			}
		}

		// regulatoryBlacklisted
		List<Object> regulatoryBlacklistedSmeSegmentRows = invoiceRepository
				.buyerRegulatoryBlacklistedSmeSegmentReport(
						loginSeller.getId(), startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (regulatoryBlacklistedSmeSegmentRows != null
				&& regulatoryBlacklistedSmeSegmentRows.size() > 0) {
			for (Object dbRow : regulatoryBlacklistedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setRegulatoryBlacklisted(reportRow
								.getRegulatoryBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						// bOthers = false;
					}
				}
			}
		}

		// cancellationBlacklisted
		List<Object> cancellationBlacklistedSmeSegmentRows = invoiceRepository
				.buyerCancellationBlacklistedSmeSegmentReport(
						loginSeller.getId(), startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (cancellationBlacklistedSmeSegmentRows != null
				&& cancellationBlacklistedSmeSegmentRows.size() > 0) {
			for (Object dbRow : cancellationBlacklistedSmeSegmentRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSmeSegmentReportRow reportRow : returnObj) {
					if (reportRow.getSmeSegment().equals(dbCells[1].toString())) {
						reportRow.setCancellationBlacklisted(reportRow
								.getCancellationBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						// bOthers = false;
					}
				}
			}
		}

		return returnObj;
	}

	public Map<String, Object> buyerSmeSegmentSumReport() {
		Map<String, Object> regionSum = new HashMap<String, Object>();
		Long sumApplied = 0L, sumAccepted = 0L, sumInvested = 0L;
		Long sumRegulatoryBlacklisted = 0L, sumCancellationBlacklisted = 0L;

		List<BuyerSmeSegmentReportRow> rows = buyerSmeSegmentReport();

		for (BuyerSmeSegmentReportRow row : rows) {
			sumApplied += row.getApplied();
			sumAccepted += row.getAccepted();
			sumInvested += row.getInvested();

			sumRegulatoryBlacklisted += row.getRegulatoryBlacklisted();
			sumCancellationBlacklisted += row.getCancellationBlacklisted();
		}

		regionSum.put("sumApplied", sumApplied);
		regionSum.put("sumAccepted", sumAccepted);
		regionSum.put("sumInvested", sumInvested);
		regionSum.put("sumRegulatoryBlacklisted", sumRegulatoryBlacklisted);
		regionSum.put("sumCancellationBlacklisted", sumCancellationBlacklisted);

		return regionSum;
	}

	public List<BuyerSellerRatingReportRow> buyerSellerRatingReport() {
		BigDecimal[] paramRegion = new BigDecimal[] { new BigDecimal(1.1),
				new BigDecimal(1.2), new BigDecimal(2.1), new BigDecimal(2.2),
				new BigDecimal(3.1), new BigDecimal(3.2), new BigDecimal(4.1),
				new BigDecimal(4.2), new BigDecimal(5.1), new BigDecimal(5.2),
				new BigDecimal(6.1), new BigDecimal(6.2), new BigDecimal(7.1),
				new BigDecimal(7.2) };

		List<BuyerSellerRatingReportRow> returnObj = new ArrayList<BuyerSellerRatingReportRow>();

		// 初始化
		returnObj.clear();
		for (BigDecimal sellerRating : paramRegion) {
			BuyerSellerRatingReportRow row = new BuyerSellerRatingReportRow(
					sellerRating);
			returnObj.add(row);
		}

		User loginSeller = accountService.getLoginUser();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date today = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(today);
		gc.add(1, -1); // 减一年
		String startDate = sdf.format(gc.getTime());
		String endDate = sdf.format(today);

		// applied
		List<Object> appliedSellerRatingRows = invoiceRepository
				.buyerAppliedSellerRatingReport(loginSeller.getId(), startDate,
						endDate);
		// 抓取数据库的的数据,并进行运算
		if (appliedSellerRatingRows != null
				&& appliedSellerRatingRows.size() > 0) {
			for (Object dbRow : appliedSellerRatingRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSellerRatingReportRow reportRow : returnObj) {
					if (reportRow.getSellerRating().compareTo(
							(BigDecimal) dbCells[1]) == 0) {
						reportRow.setApplied(reportRow.getApplied()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}
		// accepted
		List<Object> acceptedSellerRatingRows = invoiceRepository
				.buyerAcceptedSellerRatingReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (acceptedSellerRatingRows != null
				&& acceptedSellerRatingRows.size() > 0) {
			for (Object dbRow : acceptedSellerRatingRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSellerRatingReportRow reportRow : returnObj) {
					if (reportRow.getSellerRating().compareTo(
							(BigDecimal) dbCells[1]) == 0) {
						reportRow.setAccepted(reportRow.getAccepted()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}

		// invested
		List<Object> investedSellerRatingRows = invoiceRepository
				.buyerInvestedSellerRatingReport(loginSeller.getId(),
						startDate, endDate); // 抓取数据库的的数据,并进行运算
		if (investedSellerRatingRows != null
				&& investedSellerRatingRows.size() > 0) {
			for (Object dbRow : investedSellerRatingRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSellerRatingReportRow reportRow : returnObj) {
					if (reportRow.getSellerRating().compareTo(
							(BigDecimal) dbCells[1]) == 0) {
						reportRow.setInvested(reportRow.getInvested()
								+ ((BigDecimal) (dbCells[2])).longValue());
						// bOthers = false;
					}
				}
			}
		}

		// weightedAvgAdv
		// weightedAvgInt
		List<Object> weightedAvgAdvIntSellerRatingRows = invoiceRepository
				.buyerWeightedAdvAndIntSellerRatingReport(loginSeller.getId(),
						startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (weightedAvgAdvIntSellerRatingRows != null
				&& weightedAvgAdvIntSellerRatingRows.size() > 0) {
			for (Object dbRow : weightedAvgAdvIntSellerRatingRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSellerRatingReportRow reportRow : returnObj) {
					if (reportRow.getSellerRating().compareTo(
							(BigDecimal) dbCells[1]) == 0) {
						reportRow.setWeightedAvgAdv(reportRow
								.getWeightedAvgAdv().add(
										(BigDecimal) (dbCells[2])));
						reportRow.setWeightedAvgInt(reportRow
								.getWeightedAvgInt().add(
										(BigDecimal) (dbCells[3])));
						// bOthers = false;
					}
				}
			}
		}

		// regulatoryBlacklisted
		List<Object> regulatoryBlacklistedSellerRatingRows = invoiceRepository
				.buyerRegulatoryBlacklistedSellerRatingReport(
						loginSeller.getId(), startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (regulatoryBlacklistedSellerRatingRows != null
				&& regulatoryBlacklistedSellerRatingRows.size() > 0) {
			for (Object dbRow : regulatoryBlacklistedSellerRatingRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSellerRatingReportRow reportRow : returnObj) {
					if (reportRow.getSellerRating().compareTo(
							(BigDecimal) dbCells[1]) == 0) {
						reportRow.setRegulatoryBlacklisted(reportRow
								.getRegulatoryBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						// bOthers = false;
					}
				}
			}
		}

		// cancellationBlacklisted
		List<Object> cancellationBlacklistedSellerRatingRows = invoiceRepository
				.buyerCancellationBlacklistedSellerRatingReport(
						loginSeller.getId(), startDate, endDate);
		// 抓取数据库的的数据,并进行运算
		if (cancellationBlacklistedSellerRatingRows != null
				&& cancellationBlacklistedSellerRatingRows.size() > 0) {
			for (Object dbRow : cancellationBlacklistedSellerRatingRows) {
				// boolean bOthers = true;
				Object[] dbCells = (Object[]) dbRow;
				for (BuyerSellerRatingReportRow reportRow : returnObj) {
					if (reportRow.getSellerRating().compareTo(
							(BigDecimal) dbCells[1]) == 0) {
						reportRow.setCancellationBlacklisted(reportRow
								.getCancellationBlacklisted()
								+ ((BigDecimal) (dbCells[2])).longValue());

						// bOthers = false;
					}
				}
			}
		}

		return returnObj;
	}

	public Map<String, Object> buyerSellerRatingSumReport() {
		Map<String, Object> regionSum = new HashMap<String, Object>();
		Long sumApplied = 0L, sumAccepted = 0L, sumInvested = 0L;
		Long sumRegulatoryBlacklisted = 0L, sumCancellationBlacklisted = 0L;

		List<BuyerSellerRatingReportRow> rows = buyerSellerRatingReport();

		for (BuyerSellerRatingReportRow row : rows) {
			sumApplied += row.getApplied();
			sumAccepted += row.getAccepted();
			sumInvested += row.getInvested();

			sumRegulatoryBlacklisted += row.getRegulatoryBlacklisted();
			sumCancellationBlacklisted += row.getCancellationBlacklisted();
		}

		regionSum.put("sumApplied", sumApplied);
		regionSum.put("sumAccepted", sumAccepted);
		regionSum.put("sumInvested", sumInvested);
		regionSum.put("sumRegulatoryBlacklisted", sumRegulatoryBlacklisted);
		regionSum.put("sumCancellationBlacklisted", sumCancellationBlacklisted);

		return regionSum;
	}
}