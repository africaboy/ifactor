package com.entrofine.ifactor.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.entrofine.ifactor.app.entity.BuyerApplyDoc;

public interface BuyerApplyDocRepository extends
		JpaRepository<BuyerApplyDoc, Long> {

	@Modifying
	@Query("update BuyerApplyDoc doc set doc.biz = null where doc.biz.id = ?1")
	public int setBizToNull(Long bizId);

}
