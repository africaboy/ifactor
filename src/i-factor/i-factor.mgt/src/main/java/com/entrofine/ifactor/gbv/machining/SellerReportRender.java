package com.entrofine.ifactor.gbv.machining;

import java.sql.Connection;
import java.util.Map;

import org.limp.mine.Render;

import com.entrofine.ifactor.gbv.utils.Getter;

public class SellerReportRender implements Render {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void render(Map info, int arg1, int arg2, Connection arg3) {
		// TODO Auto-generated method stub
		float accepted = Getter.f(info.get("ACCEPTED"));
		float advance = Getter.f(info.get("AVERAGE_ADVANCE"));
		float interest = Getter.f(info.get("AVERAGE_INTEREST"));
		float avgAdvance = 0;
		float avgInterest = 0;
		if (accepted != 0) {
			avgAdvance = advance / accepted;
			avgInterest = interest / accepted;
		}
		info.put("AVERAGE_ADVANCE", avgAdvance);
		info.put("AVERAGE_INTEREST", avgInterest);
	}

}
