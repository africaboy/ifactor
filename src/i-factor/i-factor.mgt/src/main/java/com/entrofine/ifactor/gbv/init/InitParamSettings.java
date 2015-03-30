package com.entrofine.ifactor.gbv.init;

import jt.classic.system.ISystemException;
import jt.classic.system.init.AbstractInitializtion;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 系统初始化参数
 * 
 * @author wangweifeng
 * 
 */
public class InitParamSettings extends AbstractInitializtion {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	public void load() throws ISystemException {

		// 加载系统参数设置
		ParamSettingCenter psCenter = ParamSettingCenter.getInsance();

		psCenter.init();

		logger.info("system message: param setting initialize is OK.");

	}
}
