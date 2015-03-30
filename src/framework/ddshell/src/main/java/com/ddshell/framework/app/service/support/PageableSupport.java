package com.ddshell.framework.app.service.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PageableSupport {

	@Autowired
	private GlobalVars globalVars;

	/**
	 * 构造分页参数
	 * 
	 * @param pageNumber
	 *            页码，0开始
	 * @param pageSize
	 *            页大小
	 * @param sort
	 *            排序
	 * @return
	 */
	public Pageable getPageable(Integer pageNumber, Integer pageSize, Sort sort) {
		if (pageNumber == null || pageNumber < 0) {
			pageNumber = 0;
		}
		if (pageSize == null || pageSize < 1) {
			pageSize = globalVars.defaultPageSize;
		}
		if (pageSize > globalVars.maxPageSize) {
			pageSize = globalVars.maxPageSize;
		}

		return new PageRequest(pageNumber, pageSize, sort);
	}

	/**
	 * 计算连续显示页的起始页码
	 * 
	 * @param page
	 * @return 起始页码，0-首页
	 */
	public int getPageNumberStart(Page<?> page) {
		return Math.max(0, page.getNumber() - globalVars.displayPages / 2);
	}

	/**
	 * 计算连续显示页的结束页码
	 * 
	 * @param page
	 * @return 结束页码，0-首页
	 */
	public int getPageNumberEnd(Page<?> page) {
		return Math.min(Math.max(page.getNumber() + globalVars.displayPages / 2
				- 1, globalVars.displayPages - 1), page.getTotalPages() - 1);
	}

}
