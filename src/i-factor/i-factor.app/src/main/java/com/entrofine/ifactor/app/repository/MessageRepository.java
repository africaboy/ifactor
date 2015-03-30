package com.entrofine.ifactor.app.repository;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.entrofine.ifactor.app.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
	public Page<Message> findByCreateTimeBetween(Pageable pageable,
			Date createTimeFrom, Date createTimeTo);

	public Page<Message> findByCreateTimeGreaterThanEqual(Pageable pageable,
			Date createTimeFrom);

	public Page<Message> findByCreateTimeLessThanEqual(Pageable pageable,
			Date createTimeTo);

}
