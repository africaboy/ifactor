package com.entrofine.ifactor.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entrofine.ifactor.app.entity.DataFieldMatch;

public interface DataFieldMatchRepository extends
		JpaRepository<DataFieldMatch, String> {

	public DataFieldMatch findByWorkFlowAndMgtField(String workFlow,
			String mgtField);

}
