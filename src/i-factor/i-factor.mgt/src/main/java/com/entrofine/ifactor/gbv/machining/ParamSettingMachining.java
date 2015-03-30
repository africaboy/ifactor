package com.entrofine.ifactor.gbv.machining;

import java.sql.Connection;

import org.limp.basework.MachiningException;
import org.limp.basework.SimpleBean;
import org.limp.basework.SimpleBeanMachining;
import org.limp.basework.Table;
import org.limp.basework.impl.CommonBean4HSQ;
import org.limp.mine.DateTrimmer;

import com.entrofine.ifactor.gbv.init.ParamSettingCenter;
import com.entrofine.ifactor.gbv.utils.Getter;

/**
 * param setting data handle
 * 
 * @author wangweifeng
 * 
 */
public class ParamSettingMachining implements SimpleBeanMachining {

	@SuppressWarnings("unchecked")
	public SimpleBean machining(SimpleBean bean, Table table,
			CommonBean4HSQ cbh, Connection conn, int type)
			throws MachiningException {

		// 插入前数据处理
		if (type == -4) {

			bean.getResource().put("LAST_MODIFY_TIME", DateTrimmer.getYMDHMS());

		} else if (type == 3) {

			// 更新缓存数据
			ParamSettingCenter psCenter = ParamSettingCenter.getInsance();

			psCenter.set(Getter.string(bean.getResource().get("PARAM_CODE")),
					bean.getResource().get("PARAM_VALUE"));

		}

		return bean;
	}

}
