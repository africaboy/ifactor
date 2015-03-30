document.write("<script src=\"" + context
		+ "/system/group/js/groupedit.js\"></script>");

var groupEditTabs;
var grouptree;
var adjusttree;
function showgrouptree(id, tlt, url) {
	if (!Ext.get("win_" + id)) {
		// tabs for the center
		groupEditTabs = new Ext.TabPanel({
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
			title : grooveTranslator.getLangLabel('group-language',
					'treepanel-title'),
			region : 'west',
			split : true,
			width : 300,
			collapsible : true,
			margins : '3 0 3 3',
			cmargins : '3 3 3 3',
			items : [{
				border : false,
				html : '<div id="groupmap-div" style="overflow:auto;width:100%;height:500px;border:0px #000 solid;"></div>'
			}]
		});

		var win = new Ext.Window({
					id : "win_" + id,
					title : tlt,
					closable : true,
					resizable : false,
					// maximizable : true,
					width : 800,
					height : 565,
					border : false,
					plain : true,
					layout : 'border',
					modal : true,
					items : [nav, groupEditTabs]
				});

		win.show(this);

		showMapTree();
	} else if (Ext.get(id + "_win").hidden()) {
		Ext.get(id + "_win").show();
	}
}

/**
 * 显示组织机构调整树
 * 
 * @param {}
 *            id
 * @param {}
 *            tlt
 * @param {}
 *            url
 */
function showadjuesttree(id, tlt, url) {
	if (!Ext.get("win_" + id)) {
		// Panel for the west
		var nav = new Ext.Panel({
			title : '',
			region : 'center',
			split : true,
			layout : 'fit',
			collapsible : false,
			margins : '3 0 3 3',
			cmargins : '3 3 3 3',
			items : [{
				border : false,
				html : '<div id="groupadjust-div" style="overflow:auto;width:100%;height:465px;border:0px #000 solid;"></div>'
			}]
		});

		var win = new Ext.Window({
					id : "win_" + id,
					title : tlt,
					closable : true,
					resizable : false,
					// maximizable : true,
					width : 400,
					height : 500,
					border : false,
					plain : true,
					modal : true,
					items : [nav]
				});

		win.show(this);

		showAdjustTree();
	} else if (Ext.get(id + "_win").hidden()) {
		Ext.get(id + "_win").show();
	}
}

/**
 * 组织机构图
 */
function showMapTree() {
	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel('group-language',
						'tree-root'),
				draggable : false,
				id : '0'
			});

	grouptree = new Ext.tree.TreePanel({
				layout : 'fit',
				renderTo : 'groupmap-div',
				useArrows : false,
				autoScroll : false,
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
				dataUrl : context
						+ '/system/group/groupmapscript.jsp?type=ALL_GROUP',
				listeners : {
					'click' : function(node) {
						// alert(node.id);
						// alert(node.text);
						// alert(node.attributes.type);
						if (node.attributes.isroot != true) {
							showEditForm(node.attributes.realid, node.text);
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
									.addItem(getMenuItem('addgroupmenu',
											grooveTranslator.getLangLabel(
													'group-language',
													'tree-menu-add')));
						} else if (node.childNodes.length > 0) {
							nodeMenu
									.addItem(getMenuItem('addgroupmenu',
											grooveTranslator.getLangLabel(
													'group-language',
													'tree-menu-add')));
							nodeMenu
									.addItem(getMenuItem('editgroupmenu',
											grooveTranslator.getLangLabel(
													'group-language',
													'tree-menu-edit')));
						} else {
							nodeMenu
									.addItem(getMenuItem('addgroupmenu',
											grooveTranslator.getLangLabel(
													'group-language',
													'tree-menu-add')));
							nodeMenu
									.addItem(getMenuItem('editgroupmenu',
											grooveTranslator.getLangLabel(
													'group-language',
													'tree-menu-edit')));
							nodeMenu.addItem(getMenuItem('delgroupmenu',
									grooveTranslator.getLangLabel(
											'group-language',
											'tree-menu-delete')));
						}

						nodeMenu.contextNode = node;

						nodeMenu.showAt(event.getXY());
					}

				}
			});

	grouptree.render();

	grouptree.root.expand(true);

	var nodeMenu = new Ext.menu.Menu({
				id : 'groupNodeMenu',
				listeners : {
					itemclick : function(item) {
						var node = item.parentMenu.contextNode;
						switch (item.id) {
							case 'addgroupmenu' :
								showAddForm(node.attributes.realid, node.text);
								break;
							case 'editgroupmenu' :
								showEditForm(node.attributes.realid, node.text);
								break;
							case 'delgroupmenu' :
								delNode();
								break;
						}
					}
				}
			});
}

/**
 * 显示组织机构调整树
 */
function showAdjustTree() {
	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel('group-language',
						'tree-root'),
				draggable : false,
				id : '0'
			});

	adjusttree = new Ext.tree.TreePanel({
				layout : 'fit',
				renderTo : 'groupadjust-div',
				useArrows : false,
				autoScroll : false,
				animate : false,
				enableDD : true,
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
				dataUrl : context
						+ '/system/group/groupmapscript.jsp?type=ALL_GROUP'
			});
	// grouptree.setRootNode(root);// 设置根节点
	adjusttree.render();

	adjusttree.expandAll();

	adjusttree.on('nodedrop', function(e) {
		if (e.point == 'append') {
			if (e.dropNode.attributes.parentId == e.target.attributes.id) {
				return;
			}

			adjustGroup(e.dropNode, e.target);

			/*
			 * if (!adjustGroup(e.dropNode.attributes.realid,
			 * e.target.attributes.id)) { return; }
			 */
		}

		else if (e.point == 'above') {
			/* 移出当前父级节点 */
			if (e.dropNode.attributes.parentId != e.target.attributes.parentId) {
				adjustGroup(e.dropNode, e.target.parentNode);
				adjustSingleGroupOrder(e.dropNode);
			} else {
				adjustGroupOrder(e.dropNode, e.target);
			}

			/*
			 * alert('当前"' + e.dropNode.text + '"放在了"' + e.target.text +
			 * '"上面！');
			 */
		} else if (e.point == 'below') {
			if (e.dropNode.attributes.parentId != e.target.attributes.parentId) {
				adjustGroup(e.dropNode, e.target.parentNode);
				adjustSingleGroupOrder(e.dropNode);
			} else {
				adjustGroupOrder(e.dropNode, e.target);
			}
			/*
			 * alert('当前"' + e.dropNode.text + '"放在了"' + e.target.text +
			 * '"下面！');
			 */
		}

	});
}

/**
 * 调整组织机构
 * 
 * @param {}
 *            dropNodeId 拖动节点ID
 * @param {}
 *            targetNodeId
 */
function adjustGroup(dropNode, targetNode) {
	Ext.Ajax.request({
				url : context + "/system/group.do?method=moveit",
				method : 'POST',
				async : false,
				params : {
					oid : dropNode.attributes.realid,
					otp : 'g',
					tid : targetNode.attributes.realid,
					ttp : 'g',
					idx : dropNode.parentNode.indexOf(dropNode)
				},
				success : function(response, options) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel('group-language',
										'node-adjust-error'));
						// alert(Ext.decode(response.responseText).msg);
						adjusttree.getRootNode().reload();
						adjusttree.expandAll();
					} else {
						dropNode.attributes.parentId = targetNode.attributes.id;
					}
				}
			})

}

/**
 * 调整节点排列顺序
 * 
 * @param {}
 *            dropNode
 * @param {}
 *            targetNode
 */
function adjustGroupOrder(dropNode, targetNode) {
	var pn = dropNode.parentNode;

	var ids = '';
	var idxs = '';

	Ext.each(pn.childNodes, function(node) {
				var id = node.attributes.realid;
				var idx = pn.indexOf(node);

				ids += id + ',';
				idxs += idx + ',';
			});

	Ext.Ajax.request({
				url : context + "/system/group.do?method=savesort",
				method : 'POST',
				async : false,
				params : {
					ids : ids,
					idxs : idxs
				},
				success : function(response, options) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel('group-language',
										'node-reorder-error')); //
						alert(Ext.decode(response.responseText).msg);
						adjusttree.getRootNode().reload();
						adjusttree.expandAll();
					}
				}
			});
}

/**
 * 调整单个节点排列顺序
 * 
 * @param {}
 *            dropNode
 */
function adjustSingleGroupOrder(dropNode) {
	Ext.Ajax.request({
				url : context + "/system/group.do?method=savesort",
				method : 'POST',
				async : false,
				params : {
					oid : dropNode.attributes.realid,
					oidx : dropNode.parentNode.indexOf(dropNode)
				},
				success : function(response, options) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel('group-language',
										'node-reorder-error'));
						// alert(Ext.decode(response.responseText).msg);
						adjusttree.getRootNode().reload();
						adjusttree.expandAll();
					}
				}
			})
}
