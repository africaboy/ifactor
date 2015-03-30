package com.ddshell.framework.app.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ddshell.framework.app.entity.Menu;
import com.ddshell.framework.app.repository.MenuRepository;
import com.ddshell.framework.app.service.support.GenericCrudService;
import com.ddshell.framework.app.shiro.PathFilter;

@Component
@Transactional(readOnly = true)
public class MenuService extends GenericCrudService<Menu, Long> {

	@Autowired
	private MenuRepository menuRep;
	@Autowired
	private PathFilter pathFilter;

	@Override
	protected JpaRepository<Menu, Long> getRepository() {
		return menuRep;
	}

	public List<Menu> findLevel1Menus() {
		return filter(menuRep.findByLevelOrderByDispOrderAsc(1));
	}

	/**
	 * 递归筛选有权限访问的菜单
	 * 
	 * @param menus
	 * @return 筛选结果
	 */
	private List<Menu> filter(List<Menu> menus) {
		Iterator<Menu> itr = menus.iterator();
		while (itr.hasNext()) {
			Menu menu = itr.next();
			List<Menu> children = menu.getChildren();
			if (children == null || children.isEmpty()) {
				if (!pathFilter.isAccessAllowed(menu.getUrl())) {
					itr.remove();
				}
			} else {
				if (filter(children).isEmpty()) {
					itr.remove();
				}
			}
		}

		return menus;
	}

}
