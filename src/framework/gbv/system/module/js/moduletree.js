document.write("<script src=\"" + context
		+ "/system/module/js/addmenu.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/module/js/editmenu.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/module/js/movemenu.js\"></script>");

var moduleTreeTabs;
var moduleTree;

function showmoduleTree(id, tlt) {
	if (!Ext.get('moduleTreeWin')) {
		// tabs for the center
		moduleTreeTabs = new Ext.TabPanel({
					region : 'center',
					margins : '3 3 3 0',
					activeTab : 0,
					defaults : {
						autoScroll : true,
						autoHeight : true,
						bodyStyle : 'padding:5px'
					},

					items : []
				});

		// Panel for the west
		var nav = new Ext.Panel({
			title : grooveTranslator.getLangLabel('module-language',
					'treepanel-title')
					+ '&nbsp;{' + tlt + '}',
			region : 'west',
			split : true,
			width : 200,
			collapsible : true,
			margins : '3 0 3 3',
			cmargins : '3 3 3 3',
			items : [{
				border : false,
				html : '<div id="moduletree-div" style="overflow:auto;height:400px;border:0px #000 solid;"></div>'
			}]
		});

		var win = new Ext.Window({
					id : 'moduleTreeWin',
					title : grooveTranslator.getLangLabel('module-language',
							'treewindow-title'),
					closable : true,
					resizable : true,
					// maximizable : true,
					width : 800,
					height : 465,
					border : false,
					plain : true,
					layout : 'border',
					modal : true,
					items : [nav, moduleTreeTabs]
				});

		win.show(this);

		initModuleTree(id, tlt);
	} else if (Ext.get('moduleTreeWin').hidden()) {
		Ext.get('moduleTreeWin').show();
	}
}

var contextNode;

function initModuleTree(id, rootName) {
	var root = new Ext.tree.AsyncTreeNode({
				text : rootName,
				draggable : false,
				id : '0'
			});

	moduleTree = new Ext.tree.TreePanel({
				layout : 'fit',
				renderTo : 'moduletree-div',
				useArrows : false,
				autoScroll : false,
				animate : false,
				enableDD : false,
				containerScroll : true,
				expandable : true,
				rootVisible : false,
				singleExpand : false,
				animate : true,
				border : false,
				frame : false,
				root : {
					nodeType : 'async'
				},
				// auto create TreeLoader
				dataUrl : context + '/system/module.do?method=moduletree&id='
						+ id,
				listeners : {
					'click' : function(node) {
						// alert(node.id);
						// alert(node.text);
						// alert(node.attributes.type);
						if (node.attributes.isroot != true) {
							var mid = node.attributes.mid;
							var pid = '0';
							if (node.attributes.type == 'menu') {
								pid = node.attributes.realid;

								showEditMenuForm(node.attributes.realid,
										node.text);
							}

							// showAddMenuForm(mid, node.text, pid);
						} else {
							/*
							 * Ext.Msg.show({ title : '提示信息', msg : '不能编辑根组节点',
							 * modal : true, scope : this, fn : this.onFlush,
							 * icon : Ext.Msg.INFO, buttons : Ext.Msg.OK });
							 */
						}
					},
					'contextmenu' : function(node, event) {
						/* 这行是必须的 */
						event.preventDefault();

						node.select();

						nodeMenu.removeAll();

						/* 取得鼠标点击坐标，展示菜单 */
						if (node.attributes.isroot) {
							nodeMenu
									.addItem(getMenuItem('addmodulemenu',
											grooveTranslator.getLangLabel(
													'module-language',
													'treemenu-add')));
						} else if (node.childNodes.length > 0) {
							nodeMenu
									.addItem(getMenuItem('addmodulemenu',
											grooveTranslator.getLangLabel(
													'module-language',
													'treemenu-add')));
							nodeMenu
									.addItem(getMenuItem('editmodulemenu',
											grooveTranslator.getLangLabel(
													'module-language',
													'treemenu-edit')));
							nodeMenu
									.addItem(getMenuItem('movemodulemenu',
											grooveTranslator.getLangLabel(
													'module-language',
													'treemenu-move')));
						} else {
							nodeMenu
									.addItem(getMenuItem('addmodulemenu',
											grooveTranslator.getLangLabel(
													'module-language',
													'treemenu-add')));
							nodeMenu
									.addItem(getMenuItem('editmodulemenu',
											grooveTranslator.getLangLabel(
													'module-language',
													'treemenu-edit')));
							nodeMenu
									.addItem(getMenuItem('movemodulemenu',
											grooveTranslator.getLangLabel(
													'module-language',
													'treemenu-move')));
							nodeMenu.addItem(getMenuItem('delmodulemenu',
									grooveTranslator.getLangLabel(
											'module-language',
											'treemenu-delete')));
						}

						contextNode = node;

						nodeMenu.showAt(event.getXY());
					}

				}
			});

	moduleTree.render();

	moduleTree.expandAll();

	var nodeMenu = new Ext.menu.Menu({
				id : 'moduleTreeNodeMenu',
				listeners : {
					itemclick : function(item) {
						var node = contextNode;

						switch (item.id) {
							case 'addmodulemenu' :
								var mid = node.attributes.mid;
								/* 默认父节点id */
								var pid = '0';
								/* 如果在菜单下增加子菜单 */
								if (node.attributes.type == 'menu') {
									pid = node.attributes.realid;
								}

								showAddMenuForm(mid, node.text, pid);
								break;
							case 'editmodulemenu' :
								showEditMenuForm(node.attributes.realid,
										node.text);
								break;
							case 'delmodulemenu' :
								delMenu();
								break;
							case 'movemodulemenu' :
								moveMenu(node.attributes.realid, node.text,
										node.attributes.type);
								break;
						}
					}
				}
			});
};

/**
 * 重新加载模块菜单树
 */
function moduleTreeReload() {
	moduleTree.root.reload();
	moduleTree.expandAll();
}

function delMenu() {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel('menu-language',
					'delete-prompt'), deleteMenu);
};

function deleteMenu(btn) {
	if (btn == 'yes') {
		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'delete-loading'));

		Ext.Ajax.request({
			url : context + '/system/module.do?method=deletemenu',
			method : "POST",
			params : {
				id : moduleTree.getSelectionModel().getSelectedNode().attributes.realid
			},
			success : function(response, options) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (o.success) {
					Ext.MessageBox.hide();
					if (Ext.get("tab_menuedit")) {
						moduleTreeTabs.remove(0);
					}
					moduleTree.getSelectionModel().getSelectedNode().remove();
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('menu-language',
									'delete-success'));
				} else if (action.result.errCode == '-1') {
					Ext.MessageBox.hide();
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('menu-language',
									'delete-failure-error'));
				} else if (action.result.errCode == '-2') {
					Ext.MessageBox.hide();
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('menu-language',
									'delete-failure-childrenerror'));
				}
			}
		});
	}
}