var roleListGrid;
var roleListArea;
var roleListTab;
var roleListStore;
var pageSize = 20;

/**
 * 角色list
 * 
 * @param {}
 *            tabid
 * @param {}
 *            areaid
 */
function rolelist(tabid) {
	roleListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'roleList',
				fields : ['id', 'name', 'memo', 'key', 'raccede', 'rv',
						'rvrating', 'rvtype'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/role.do?method=listp'
						})
			});

	roleListGrid = new Ext.grid.GridPanel({
		id : tabid,
		store : roleListStore,
		closable : true,
		columns : [{
			header : grooveTranslator
					.getLangLabel('role-language', 'list-name'),
			width : 150,
			sortable : true,
			dataIndex : 'name',
			renderer : renderRoleName
		}, {
			header : grooveTranslator
					.getLangLabel('role-language', 'list-desc'),
			width : 150,
			sortable : true,
			dataIndex : 'memo'
		}, {
			header : grooveTranslator.getLangLabel('role-language', 'list-key'),
			width : 150,
			sortable : false,
			dataIndex : 'key'
		}, {
			header : grooveTranslator.getLangLabel('role-language',
					'list-raccede'),
			width : 75,
			sortable : true,
			dataIndex : 'raccede',
			renderer : renderRoleRaccede
		}, {
			header : grooveTranslator
					.getLangLabel('role-language', 'list-real'),
			width : 75,
			sortable : false,
			dataIndex : 'rv',
			renderer : renderRoleRV
		}, {
			header : '',
			width : 75,
			sortable : false,
			dataIndex : 'id',
			renderer : renderRolerow
		}],
		stripeRows : true,
		autoExpandColumn : 'iname',
		title : grooveTranslator.getLangLabel('role-language', 'list-title'),
		border : false,
		viewConfig : {
			forceFit : true
		},
		// config options for stateful behavior
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : grooveTranslator.getLangLabel('common-language',
					'list-loading')
		},
		tbar : new Ext.Toolbar({
					autoWidth : true,
					autoShow : true,
					items : [{
						iconCls : 'addtrole',
						text : grooveTranslator.getLangLabel('role-language',
								'tbar-add'),
						handler : addrole
					}, '-', {
						id : 'delRoleButton',
						iconCls : 'delrole',
						text : grooveTranslator.getLangLabel('role-language',
								'tbar-delete'),
						disabled : true,
						handler : handleDelrole
					}, '-', {
						id : 'assignRoleButton',
						iconCls : 'accessmodule',
						text : grooveTranslator.getLangLabel('role-language',
								'tbar-purview'),
						disabled : true,
						handler : function() {
							var ids = '';
							var names = '';
							var otypes = '';
							var selectedNodes = roleListGrid
									.getSelectionModel().getSelections();
							for (var i = 0; i < selectedNodes.length; i++) {
								if (i < selectedNodes.length - 1) {
									ids += selectedNodes[i].data.id + ',';
									names += selectedNodes[i].data.name + ',';
									otypes += 'role,';
								} else {
									ids += selectedNodes[i].data.id;
									names += selectedNodes[i].data.name;
									otypes += 'role';
								}
							}

							handleAccessModule(ids, names, otypes);
						}
					}]
				}),
		bbar : new Ext.PagingToolbar({
					pageSize : pageSize,// 每页显示的记录值
					store : roleListStore,
					displayInfo : true,
					displayMsg : grooveTranslator.getLangLabel(
							'common-language', 'list-displaymsg'),
					emptyMsg : grooveTranslator.getLangLabel('common-language',
							'list-emptymsg')
				})
	});

	roleListGrid.on('click', function(e) {
				var t = e.getTarget();
				var v = this.view;
				var rowIdx = v.findRowIndex(t);
				var record = this.getStore().getAt(rowIdx);
				if (record && record.data.key == 'admin') {
					// Ext.Msg.alert('提示', '系统管理员角色不能删除！');
					roleListGrid.getSelectionModel().deselectRow(rowIdx);
				} else if (record && record.data.key != 'admin') {
					var selectedNodes = roleListGrid.getSelectionModel()
							.getSelections();
					for (var i = 0; i < selectedNodes.length; i++) {
						if (selectedNodes[i].data.id != record.data.id) {
							roleListGrid.getSelectionModel()
									.deselectRow(rowIdx);
						}

					}
				}

				if (roleListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delRoleButton').enable();
					Ext.getCmp('assignRoleButton').enable();
				} else {
					Ext.getCmp('delRoleButton').disable();
					Ext.getCmp('assignRoleButton').disable();
				}
			});

	roleListGrid.setIconClass('tabs');

	roleListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return roleListGrid;
}

function renderRoleName(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:editrole(\'{1}\', \'{0}\');">{0}</a></b>',
					value, record.data.id);
	if (false && record.data.key == "admin") {
		resultString = String.format('<b><font color="red">{0}</font></b>',
				value, record.data.id);
	}

	return resultString;
}

function renderRoleRV(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString;
	if (record.data.rv == 1) {
		resultString = grooveTranslator.getLangLabel('role-language',
				'list-real-yes');
	} else if (record.data.rv == 0) {
		resultString = grooveTranslator.getLangLabel('role-language',
				'list-real-no');
	}

	return resultString;
}

function renderRoleRaccede(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	var resultString;
	if (record.data.raccede == true) {
		resultString = grooveTranslator.getLangLabel('role-language',
				'list-raccede-yes');
	} else if (record.data.raccede == false) {
		resultString = grooveTranslator.getLangLabel('role-language',
				'list-raccede-no');
	}

	return resultString;
}

function renderRolerow(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<a href="javascript:void(0);" onclick="javascript:viewRoleobjs(\'{0}\', \'{1}\');">'
							+ grooveTranslator.getLangLabel('role-language',
									'list-object') + '</a>', value,
					record.data.name);
	return resultString;
}

var roleObjListStore;
var roleObjListGrid;

function viewRoleobjs(id, name) {
	var reader = new Ext.data.ArrayReader({}, [{
						name : 'oid'
					}, {
						name : 'oname'
					}, {
						name : 'otype'
					}, {
						name : 'otypelabel'
					}, {
						name : 'rid'
					}, {
						name : 'rv'
					}]);

	roleObjListStore = new Ext.data.Store({
				reader : reader,
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/role.do?method=objlist&id=' + id
						})
			});

	roleObjListStore.load();

	roleObjListGrid = new Ext.grid.GridPanel({
				store : roleObjListStore,
				cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
					id : 'oname',
					header : grooveTranslator.getLangLabel('role-language',
							'object-name'),
					width : 40,
					sortable : true,
					dataIndex : 'oname'
				}, {
					header : grooveTranslator.getLangLabel('role-language',
							'object-type'),
					width : 20,
					dataIndex : 'otypelabel'
				}, {
					header : grooveTranslator.getLangLabel('role-language',
							'object-id'),
					width : 20,
					dataIndex : 'oid'
				}, {
					header : "&nbsp;",
					width : 20,
					dataIndex : 'oid',
					renderer : renderRoleObj
				}]),
				viewConfig : {
					forceFit : true
				},
				columnLines : true,
				width : 600,
				height : 300,
				title : '',
				iconCls : 'icon-grid'
			});

	roleObjWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 400,
				title : '['
						+ name
						+ '] '
						+ grooveTranslator.getLangLabel('role-language',
								'object-list-title'),
				resizable : true,
				plain : true,
				modal : true,

				items : [roleObjListGrid],

				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						roleObjWin.close();
						roleObjWin = null;
					}
				}]
			});

	roleObjWin.show(this);
}

/**
 * 显示删除角色对象链接
 */
function renderRoleObj(value, cellmeta, record, rowIndex, columnIndex, store) {
	if (record.data.rv == '1') {
		var resultString = String
				.format(
						'<a href="javascript:void(0);" onclick="javascript:handleRemoveRoleobjs(\'{0}\', \'{1}\', \'{2}\');">'
								+ grooveTranslator.getLangLabel(
										'common-language', 'delete') + '</a>',
						value, record.data.oname, record.data.rid);
		return resultString;
	}

	return '';
}

/**
 * 删除角色对象确认函数
 */
function handleRemoveRoleobjs(id, name) {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel('role-language',
					'remove-prompt'), removeRoleobjs);
}

/**
 * 删除角色对象函数
 */
function removeRoleobjs(btn) {
	if (btn == 'yes') {
		var selectedNodes = roleObjListGrid.getSelectionModel().getSelections();

		if (selectedNodes.length > 0) {
			Ext.Ajax.request({
						url : context + "/system/role.do?method=deleteobj",
						method : 'POST',
						async : false,
						params : {
							rid : selectedNodes[0].data.rid,
							oid : selectedNodes[0].data.oid,
							otype : selectedNodes[0].data.otype
						},
						success : function(response, options) {
							var o = Ext.util.JSON.decode(response.responseText);
							if (!o.success) {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator
												.getLangLabel('role-language',
														'remove-error'));
							} else {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'role-language',
												'remove-success'));
								reloadroleObjListStore();
							}
						}
					})
		}

	}
}

function ComResizeRoleList() {
	if (roleListGrid
			&& Ext.getCmp('consoletabs').getActiveTab().id == roleListTab.dom.id) {
		roleListGrid.setWidth(roleListArea.getComputedWidth());
		roleListGrid.setHeight(roleListTab.getHeight());
	}
};

/**
 * 重置角色列表视图
 * 
 * 
 */
function resetroleListView() {
	/* 取消已选择数据 */
	roleListGrid.getSelectionModel().clearSelections();
}

function handleDelrole() {
	if (roleListGrid.getSelectionModel().hasSelection()) {
		Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
						'prompt'), grooveTranslator.getLangLabel(
						'role-language', 'delete-prompt'), deleterole);
	} else {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('role-language', 'delete-alert'));
	}
}

/**
 * 重载角色列表store
 */
function reloadroleListStore() {
	if (roleListStore) {
		roleListStore.reload({
					start : 0,
					limit : pageSize
				});
	}
}

/**
 * 重载角色对象列表store
 */
function reloadroleObjListStore() {
	if (roleObjListStore) {
		roleObjListStore.reload();
	}
}

function deleterole(btn) {
	if (btn == 'yes') {
		var ids = "";
		var selectedNodes = roleListGrid.getSelectionModel().getSelections();
		for (var i = 0; i < selectedNodes.length; i++) {
			if (i < selectedNodes.length - 1) {
				ids += selectedNodes[i].data.id + ",";
			} else {
				ids += selectedNodes[i].data.id;
			}
		}

		Ext.Ajax.request({
					url : context + "/system/role.do?method=delete",
					method : 'POST',
					async : false,
					params : {
						rid : ids
					},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'role-language', 'delete-failure'));
						} else {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'role-language', 'delete-success'));
							reloadroleListStore();
						}
					}
				})
	}
}