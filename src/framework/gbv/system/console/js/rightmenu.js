/**
 * 生成右键菜单
 * 
 * @param {}
 *            id
 * @param {}
 *            txt
 * @return {}
 */
function getMenuItem(id, txt) {
	var menuItem;
	if (Ext.getCmp(id)) {
		menuItem = Ext.getCmp(id);
	} else {

		menuItem = new Ext.menu.Item({
					id : id,
					text : txt,
					iconCls : 'icon-menu'
				});
	}

	return menuItem;
}