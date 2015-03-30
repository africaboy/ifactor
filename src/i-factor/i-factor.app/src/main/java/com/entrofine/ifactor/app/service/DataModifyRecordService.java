package com.entrofine.ifactor.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.service.support.GenericCrudService;
import com.entrofine.ifactor.app.entity.DataFieldMatch;
import com.entrofine.ifactor.app.entity.DataModifyRecord;
import com.entrofine.ifactor.app.repository.DataFieldMatchRepository;
import com.entrofine.ifactor.app.repository.DataModifyRecordRepository;

@Component
public class DataModifyRecordService extends
		GenericCrudService<DataModifyRecord, String> {

	@Autowired
	DataModifyRecordRepository dataModifyRecordRep;
	@Autowired
	DataFieldMatchRepository dataFieldMatchRep;

	@Override
	protected JpaRepository<DataModifyRecord, String> getRepository() {
		return dataModifyRecordRep;
	}

	@Transactional
	public List<String> findDataModifyFields(String workFlow, String appPkId) {

		List<String> modifyFields = new ArrayList<String>();

		List<DataModifyRecord> dmRecordList = dataModifyRecordRep
				.findByWorkFlowAndAppPkIdAndStatus(workFlow, appPkId, "1");

		if (dmRecordList != null && !dmRecordList.isEmpty()) {
			for (DataModifyRecord dmRecord : dmRecordList) {
				DataFieldMatch dfMatch = dataFieldMatchRep
						.findByWorkFlowAndMgtField(dmRecord.getWorkFlow(),
								dmRecord.getModifyField());
				if (dfMatch != null) {
					modifyFields.add("&" + dfMatch.getAppField() + "&");
				}
			}
		}

		return modifyFields;
	}
}
