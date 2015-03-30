package com.entrofine.ifactor.gbv.machining;

import java.sql.Connection;
import java.util.Map;

import org.limp.mine.Render;

import com.entrofine.ifactor.gbv.utils.Getter;

public class BuyerReportRender implements Render {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void render(Map info, int arg1, int arg2, Connection arg3) {
		// TODO Auto-generated method stub
		float applied = Getter.f(info.get("APPLIED"));
		float accepted = Getter.f(info.get("ACCEPTED"));
		float rate = 0;
		if (applied != 0) {
			rate = accepted / applied;
		}
		info.put("APPROVAL_RATE", rate);
	}

}
