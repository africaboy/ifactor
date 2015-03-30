package com.entrofine.ifactor.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entrofine.ifactor.app.entity.SellerApply;

public interface SellerApplyRepository extends JpaRepository<SellerApply, Long> {

	SellerApply findBySellerId(Long sellerId);
}
