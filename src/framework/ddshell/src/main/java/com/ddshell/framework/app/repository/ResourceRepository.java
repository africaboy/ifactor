package com.ddshell.framework.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ddshell.framework.app.entity.Resource;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

	@Query("SELECT r FROM Resource r ORDER BY r.id ASC")
	public List<Resource> findAll();
}
