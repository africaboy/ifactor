package com.entrofine.ifactor.app.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the IF_MGT_DFIELD_MATCH database table.
 * 
 */
@Entity
@Table(name="IF_MGT_DFIELD_MATCH")
public class DataFieldMatch implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="IMDM_PK_ID")
	private String imdmPkId;

	@Column(name="APP_FIELD")
	private String appField;

	private String description;

	@Column(name="MGT_FIELD")
	private String mgtField;

	@Column(name="WORK_FLOW")
	private String workFlow;

	public DataFieldMatch() {
	}

	public String getImdmPkId() {
		return this.imdmPkId;
	}

	public void setImdmPkId(String imdmPkId) {
		this.imdmPkId = imdmPkId;
	}

	public String getAppField() {
		return this.appField;
	}

	public void setAppField(String appField) {
		this.appField = appField;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMgtField() {
		return this.mgtField;
	}

	public void setMgtField(String mgtField) {
		this.mgtField = mgtField;
	}

	public String getWorkFlow() {
		return this.workFlow;
	}

	public void setWorkFlow(String workFlow) {
		this.workFlow = workFlow;
	}

}