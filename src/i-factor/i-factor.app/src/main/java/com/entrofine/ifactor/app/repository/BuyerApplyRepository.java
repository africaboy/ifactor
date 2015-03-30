package com.entrofine.ifactor.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entrofine.ifactor.app.entity.BuyerApply;

public interface BuyerApplyRepository extends JpaRepository<BuyerApply, Long> {

	public BuyerApply findByBuyerId(Long buyerId);

}
