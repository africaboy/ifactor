/* 默认范围json数据 */
var purviewobjRangeData = {
	'totalCount' : '0',
	'purviewList' : []
};

/**
 * 设置范围jason数据
 * 
 * @param {}
 *            d
 */
function setPurviewobjRange(d) {
	purviewobjRangeData = d;
}

/**
 * 
 * @param {}
 *            combolabel
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            defaultValue
 * @param {}
 *            allowBlank
 * @return {}
 */
function getPurviewobjList(combolabel, returnIdField, returnNameField,
		defaultValue, allowBlank) {
	var purviewobjcomboListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				totalProperty : 'totalCount',
				root : 'purviewList',
				fields : ['rid', 'rname', 'rtype'],
				data : Ext.util.JSON.decode(purviewobjRangeData),
				autoLoad : true
			});

	var purviewobjcomboGrid = new Ext.grid.GridPanel({
				id : 'purviewobjcomboGrid',
				store : purviewobjcomboListStore,
				columns : [{
							header : 'Object',
							width : 150,
							sortable : true,
							dataIndex : 'rname'
						}, {
							header : 'Type',
							width : 75,
							sortable : true,
							dataIndex : 'rtype'
						}, {
							header : '',
							width : 100,
							sortable : false,
							dataIndex : 'rid',
							renderer : renderPurviewObjRow
						}],
				stripeRows : true,
				autoExpandColumn : 'rname',
				border : false,
				height : 200,
				autoWidth : true,
				viewConfig : {
					forceFit : true
				},
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Loading..."
				},
				tbar : new Ext.Toolbar({
							id : 'purviewobjcombotoolbar',
							autoWidth : true,
							autoShow : true,
							items : [{
										id : 'purviewobjcombo4roleMenu',
										iconCls : 'icon-purview4role',
										text : 'Role',
										menu : getPurviewobjcombo4RoleSelectMenu()
									}, '-', {
										id : 'purviewobjcombo4userMenu',
										iconCls : 'icon-purview4user',
										text : 'Group/User',
										menu : getPurviewobjcombo4GUSelectMenu()
									}]
						})
			});

	return purviewobjcomboGrid;
}

/**
 * 
 * @return {}
 */
function getPurviewobjcombo4RoleSelectMenu() {
	if (Ext.getCmp('purviewobjcombo4RoleListGrid')) {
		Ext.getCmp('purviewobjcombo4RoleListGrid').destroy();
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
				id : 'purviewobjcombo4RoleListGrid',
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
								.getCmp('purviewobjcombo4RoleListGrid')
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
						Ext.getCmp('selectpurviewobjcombo4roleMenu').hide
								.defer(
										0,
										Ext
												.getCmp('selectpurviewobjcombo4roleMenu'),
										[true]);

						addRowInPurviewobjcomboGrid(ids, names, types);
					}
				}, {
					text : "Close",
					iconCls : 'icon-punchk',
					handler : function() {
						Ext.getCmp('selectpurviewobjcombo4roleMenu').hide
								.defer(
										0,
										Ext
												.getCmp('selectpurviewobjcombo4roleMenu'),
										[true]);
					}
				}]
			});

	/*
	 * purview4RoleListStore.load({ params : { start : 0, limit : pageSize } });
	 */

	var selectpurviewobjcombo4roleMenu = new Ext.menu.Menu({
				id : 'selectpurviewobjcombo4roleMenu',
				items : purview4RoleListGrid
			});

	selectpurviewobjcombo4roleMenu.on('show', function() {
				var total = purview4RoleListGrid.getStore().getCount();// 数据行数

				var arr = [];
				for (var j = 0; j < total; j++) {
					var record = purview4RoleListGrid.getStore().getAt(j);
					if (hasSelectedPurviewobjcombo(record.data.id, 'role')) {
						arr.push(record);
					}
				}
				purview4RoleListGrid.getSelectionModel().selectRecords(arr);
			}, this, {
				delay : 1000
			});
	// selectpurview4Rolemenu.addItem(purview4RoleListGrid);

	return selectpurviewobjcombo4roleMenu;
}

function getPurviewobjcombo4GUSelectMenu() {
	if (Ext.getCmp('selectpurviewobjcombo4GUtree')) {
		Ext.getCmp('selectpurviewobjcombo4GUtree').destroy();
	}

	var gutree = new Ext.tree.TreePanel({
		id : 'selectpurviewobjcombo4GUtree',
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
					if (hasSelectedPurviewobjcombo(
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
						.getCmp('selectpurviewobjcombo4GUtree').getChecked();
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
				Ext.getCmp('selectpurviewobjcombo4GUmenu').hide
						.defer(0, Ext.getCmp('selectpurviewobjcombo4GUmenu'),
								[true]);

				addRowInPurviewobjcomboGrid(ids, names, types);
			}
		}, {
			text : "取 消",
			iconCls : 'icon-punchk',
			handler : function() {
				Ext.getCmp('selectpurviewobjcombo4GUmenu').hide
						.defer(0, Ext.getCmp('selectpurviewobjcombo4GUmenu'),
								[true]);
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

	var selectpurviewobjcombo4GUmenu = new Ext.menu.Menu({
				id : 'selectpurviewobjcombo4GUmenu',
				items : [gutree],
				listeners : {
					show : function() {
					}
				}
			});

	return selectpurviewobjcombo4GUmenu;
}

/**
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @return {}
 */
function renderPurviewObjRow(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<a href="javascript:void(0);" onclick="javascript:delRangeObjs(\'{0}\');">Delete</a>',
					rowIndex);

	return resultString;

}

/**
 * 
 * @param {}
 *            ids
 * @param {}
 *            names
 * @param {}
 *            types
 * @param {}
 *            oid
 * @param {}
 *            oname
 * @param {}
 *            otype
 * @param {}
 *            otname
 */
function addRowInPurviewobjcomboGrid(ids, names, types) {
	if (ids != '') {
		var idstr = ids.split(",");
		var namestr = names.split(",");
		var typestr = types.split(",");

		if (ids != '') {
			for (var i = 0; i < idstr.length; i++) {
				if (!hasSelectedPurviewobjcombo(idstr[i], typestr[i])) {
					var Plant = Ext.getCmp('purviewobjcomboGrid').getStore().recordType;

					var p = new Plant({
								rid : idstr[i],
								rname : namestr[i],
								rtype : typestr[i]
							});

					Ext.getCmp('purviewobjcomboGrid').getStore().add(p);
				}
			}
		}
	}
}

/**
 * 
 * @param {}
 *            id
 * @param {}
 *            type
 * @return {}
 */
function hasSelectedPurviewobjcombo(id, type) {
	var r;

	var total = Ext.getCmp('purviewobjcomboGrid').getStore().getCount();// 数据行数
	for (var j = 0; j < total; j++) {
		var record = Ext.getCmp('purviewobjcomboGrid').getStore().getAt(j);
		if (record.data.rid == id && record.data.rtype == type) {
			r = true;
			break;
		}
	}

	return r;
}

/**
 * 删除访问范围
 * 
 * @param {}
 *            idx
 */
function delRangeObjs(idx) {
	var record = Ext.getCmp('purviewobjcomboGrid').getStore().getAt(idx);

	Ext.getCmp('purviewobjcomboGrid').getStore().remove(record);
}