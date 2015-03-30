package com.entrofine.ifactor.api.entity;

import java.io.Serializable;

public class TableSyncEvent implements Serializable {

	private static final long serialVersionUID = -2435357316037839089L;

	private String table;
	private String id;
	private String fieldName;
	private String fieldValue;

	public TableSyncEvent() {
	}

	public TableSyncEvent(String table, String id, String fieldName,
			String fieldValue) {
		this.table = table;
		this.id = id;
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}

	public String getTable() {
		return table;
	}

	public void setTable(String table) {
		this.table = table;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public Object getFieldValue() {
		return fieldValue;
	}

	public void setFieldValue(String fieldValue) {
		this.fieldValue = fieldValue;
	}

}
