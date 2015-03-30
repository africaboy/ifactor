package com.entrofine.ifactor.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entrofine.ifactor.app.entity.DataModifyRecord;

public interface DataModifyRecordRepository extends
		JpaRepository<DataModifyRecord, String> {

	public List<DataModifyRecord> findByWorkFlowAndAppPkIdAndStatus(
			String workFlow, String appPkId, String status);

}
