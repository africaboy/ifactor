package com.entrofine.ifactor.gbv.machining;

import java.sql.Connection;
import java.util.Map;

import org.limp.mine.Render;

import com.entrofine.ifactor.gbv.utils.Getter;

public class DebtorReport implements Render {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void render(Map info, int arg1, int arg2, Connection arg3) {
		// TODO Auto-generated method stub
		float accepted = Getter.f(info.get("ACCEPTED_NO"));
		float overdueDays = Getter.f(info.get("OVERDUE_DAYS"));
		float aveoverdueDays = 0;
		if (overdueDays != 0) {
			aveoverdueDays = accepted / overdueDays;
		}
		float overdueInvoice = Getter.f(info.get("OVERDUE_NO"));
		float aveCPayment = 0;
		if (overdueDays != 0) {
			aveCPayment = overdueInvoice / overdueDays;
		}
		float settmentDays = Getter.f(info.get("SETTLEMENT_DAYS"));
		float aveSPayment = 0;
		if (settmentDays != 0) {
			aveSPayment = overdueInvoice / settmentDays;
		}
		info.put("OVERDUE_DAYS", aveoverdueDays);
		info.put("AVERAGE_CPAYMENT", aveCPayment);
		info.put("AVERAGE_SPAYMENT", aveSPayment);
	}
}
