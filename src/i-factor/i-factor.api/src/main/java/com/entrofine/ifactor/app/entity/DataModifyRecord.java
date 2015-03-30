package com.entrofine.ifactor.app.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The persistent class for the IF_MGT_DMODIFY_RECORD database table.
 * 
 */
@Entity
@Table(name = "IF_MGT_DMODIFY_RECORD")
public class DataModifyRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "IMDR_PK_ID")
	private String imdrPkId;

	@Column(name = "APP_PK_ID")
	private String appPkId;

	@Column(name = "CREATE_DATE")
	private String createDate;

	@Column(name = "MODIFY_FIELD")
	private String modifyField;

	@Column(name = "NEW_VALUE")
	private String newValue;

	@Column(name = "OLD_VALUE")
	private String oldValue;

	private String status;

	@Column(name = "WORK_FLOW")
	private String workFlow;

	public DataModifyRecord() {
	}

	public String getImdrPkId() {
		return this.imdrPkId;
	}

	public void setImdrPkId(String imdrPkId) {
		this.imdrPkId = imdrPkId;
	}

	public String getAppPkId() {
		return this.appPkId;
	}

	public void setAppPkId(String appPkId) {
		this.appPkId = appPkId;
	}

	public String getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getModifyField() {
		return this.modifyField;
	}

	public void setModifyField(String modifyField) {
		this.modifyField = modifyField;
	}

	public String getNewValue() {
		return this.newValue;
	}

	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}

	public String getOldValue() {
		return this.oldValue;
	}

	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getWorkFlow() {
		return this.workFlow;
	}

	public void setWorkFlow(String workFlow) {
		this.workFlow = workFlow;
	}

}