function getPurview4RoleSelectMenu(oid, oname, otype, otname, thizzMenu, multi) {
	if (Ext.getCmp('purview4RoleListGrid')) {
		Ext.getCmp('purview4RoleListGrid').destroy();
	}

	var purview4RoleListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				autoLoad : true,
				totalProperty : 'totalCount',
				root : 'roleList',
				fields : ['id', 'name', 'memo', 'key', 'raccede', 'rv',
						'rvrating', 'rvtype'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/rolelist.do?method=selectlist'
						})
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var purview4RoleListGrid = new Ext.grid.GridPanel({
				id : 'purview4RoleListGrid',
				store : purview4RoleListStore,
				columns : [sm, {
							header : 'Role',
							width : 150,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : 'Desc',
							width : 150,
							sortable : true,
							dataIndex : 'memo'
						}],
				sm : sm,
				stripeRows : true,
				autoExpandColumn : 'name',
				height : 300,
				width : 270,
				border : false,
				viewConfig : {
					forceFit : true
				},
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Loading..."
				},
				bbar : [{
					text : "Select",
					iconCls : 'icon-pselectuser',
					handler : function() {
						var names = '', ids = '', types = '', selNodes = Ext
								.getCmp('purview4RoleListGrid')
								.getSelectionModel().getSelections();
						Ext.each(selNodes, function(node) {
									if (names.length > 0) {
										names += ',';
										ids += ',';
										types += ',';
									}
									names += node.data.name;
									ids += node.data.id;
									types += 'role';
								});

						/* very suck */
						Ext.getCmp('selectpurview4Rolemenu').hide.defer(0, Ext
										.getCmp('selectpurview4Rolemenu'),
								[true]);

						if (names != '') {
							if (!multi) {
								addRowInPurviewGrid(ids, names, types, oid,
										oname, otype, otname);
							} else {
								addRowInMultiPurviewGrid(ids, names, types,
										oid, oname, otype, otname);
							}
						}
					}
				}, {
					text : "Close",
					iconCls : 'icon-punchk',
					handler : function() {
						Ext.getCmp('selectpurview4Rolemenu').hide.defer(0, Ext
										.getCmp('selectpurview4Rolemenu'),
								[true]);
					}
				}]
			});

	/*
	 * purview4RoleListStore.load({ params : { start : 0, limit : pageSize } });
	 */

	var selectpurview4Rolemenu = new Ext.menu.Menu({
				id : 'selectpurview4Rolemenu',
				items : purview4RoleListGrid
			});

	selectpurview4Rolemenu.on('show', function() {
		var total = purview4RoleListGrid.getStore().getCount();// 数据行数

		var arr = [];
		for (var j = 0; j < total; j++) {
			var record = purview4RoleListGrid.getStore().getAt(j);
			if (!multi && hasSelectedPurview(record.data.id, 'role')) {
				arr.push(record);
			} else if (multi && hasSelectedMultiPurview(record.data.id, 'role')) {
				arr.push(record);
			}
		}
		if (arr.length > 0) {
			purview4RoleListGrid.getSelectionModel().selectRecords(arr);
		}
	}, this, {
		delay : 1000
	})

	// selectpurview4Rolemenu.addItem(purview4RoleListGrid);

	return selectpurview4Rolemenu;
}

function getPurview4GUSelectMenu(oid, oname, otype, otname, thizzMenu, multi) {
	if (Ext.getCmp('selectpurview4GUtree')) {
		Ext.getCmp('selectpurview4GUtree').destroy();
	}

	var gutree = new Ext.tree.TreePanel({
		id : 'selectpurview4GUtree',
		// singleExpand : true,
		width : 270,
		height : 300,
		frame : false,
		// checkModel : 'single',
		// onlyLeafCheckable : true,
		border : false,
		autoScroll : true,
		animate : true,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
			dataUrl : context
					+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUPUSER_CHECKALL',
			baseParams : {
		// active : 'purview4GUSelectForm'
			}
		}),
		root : new Ext.tree.AsyncTreeNode({
					allowChildren : true,
					expanded : true,
					text : 'Root', // 节点名称
					draggable : false, // 是否支持拖动
					id : '0' // 节点id
				}),
		listeners : {
			'click' : function(node) {
				if (node.isExpanded()) {
					node.collapse();
				} else {
					node.expand();
				}
			},
			'load' : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					node.appendChild(temp);
				}

				for (var j = 0; j < node.childNodes.length; j++) {
					if (!multi
							&& hasSelectedPurview(
									node.childNodes[j].attributes.realid,
									node.childNodes[j].attributes.type)) {
						node.childNodes[j].attributes.checked = true;
					} else if (multi
							&& hasSelectedMultiPurview(
									node.childNodes[j].attributes.realid,
									node.childNodes[j].attributes.type)) {
						node.childNodes[j].attributes.checked = true;
					}
				}

			}

		},
		bbar : [{
			text : "Select",
			iconCls : 'icon-pselectuser',
			handler : function() {
				var names = '', ids = '', types = '', selNodes = Ext
						.getCmp('selectpurview4GUtree').getChecked();
				Ext.each(selNodes, function(node) {
							if (names.length > 0) {
								names += ',';
								ids += ',';
								types += ',';
							}
							names += node.text;
							ids += node.attributes.realid;
							types += node.attributes.type;
						});

				/* very suck */
				Ext.getCmp('selectpurview4GUmenu').hide.defer(0, Ext
								.getCmp('selectpurview4GUmenu'), [true]);

				if (names != '') {
					if (!multi) {
						addRowInPurviewGrid(ids, names, types, oid, oname,
								otype, otname);
					} else {
						addRowInMultiPurviewGrid(ids, names, types, oid, oname,
								otype, otname);
					}
				}
			}
		}, {
			text : "Close",
			iconCls : 'icon-punchk',
			handler : function() {
				Ext.getCmp('selectpurview4GUmenu').hide.defer(0, Ext
								.getCmp('selectpurview4GUmenu'), [true]);
			}
		}]
	});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : 'Temp group',
				checked : false
			});

	// gutree.expandAll();

	var selectpurview4GUmenu = new Ext.menu.Menu({
				id : 'selectpurview4GUmenu',
				items : [gutree],
				listeners : {
					show : function() {
					}
				}
			});

	return selectpurview4GUmenu;
}