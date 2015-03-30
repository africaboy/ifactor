package com.entrofine.ifactor.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entrofine.ifactor.app.entity.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

	public List<Catalog> findByParentOrderByDispOrderAsc(Catalog parent);

	public List<Catalog> findByName(String name);
}
