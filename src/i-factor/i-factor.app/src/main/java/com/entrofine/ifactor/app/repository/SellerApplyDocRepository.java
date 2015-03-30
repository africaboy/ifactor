package com.entrofine.ifactor.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.entrofine.ifactor.app.entity.SellerApplyDoc;

public interface SellerApplyDocRepository extends
		JpaRepository<SellerApplyDoc, Long> {

	@Modifying
	@Query("update SellerApplyDoc doc set doc.biz = null where doc.biz.id = ?1")
	public int setBizToNull(Long bizId);

}
