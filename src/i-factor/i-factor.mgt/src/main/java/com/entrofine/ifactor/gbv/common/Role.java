package com.entrofine.ifactor.gbv.common;

/**
 * 
 * role definition
 * 
 * @author wangweifeng
 * 
 */
public enum Role {
	/**
	 * customer service
	 */
	role_001("CS"),
	/**
	 * underwriting team
	 */
	role_002("underwriting"),
	/**
	 * approval team
	 */
	role_003("approval"),
	/**
	 * sales team
	 */
	role_004("sales");

	private String key;

	public String getKey() {
		return key;
	}

	Role(String _key) {
		key = _key;
	}

}
