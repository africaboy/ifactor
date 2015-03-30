package com.ddshell.framework.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ddshell.framework.app.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	public List<Menu> findByLevelOrderByDispOrderAsc(Integer level);

}
