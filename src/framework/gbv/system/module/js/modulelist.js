var moduleListGrid;
var moduleListArea;
var moduleListTab;
var moduleListStore;
var pageSize = 20;

/**
 * 模块list
 * 
 * @param {}
 *            tabid
 * @param {}
 *            areaid
 */
function modulelist(tabid) {
	moduleListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'moduleList',
				fields : ['mid', 'mname', 'mmemo', 'murl', 'msort'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/module.do?method=list'
						})
			});

	moduleListGrid = new Ext.grid.GridPanel({
				id : tabid,
				store : moduleListStore,
				closable : true,
				columns : [{
					header : grooveTranslator.getLangLabel('module-language',
							'list-name'),
					width : 100,
					sortable : true,
					dataIndex : 'mname',
					renderer : rendermoduleName
				}, {
					header : grooveTranslator.getLangLabel('module-language',
							'list-desc'),
					width : 150,
					sortable : true,
					dataIndex : 'mmemo'
				}, {
					header : grooveTranslator.getLangLabel('module-language',
							'list-link'),
					width : 200,
					sortable : false,
					dataIndex : 'murl'
				}, {
					header : grooveTranslator.getLangLabel('module-language',
							'list-idx'),
					width : 75,
					sortable : false,
					dataIndex : 'msort'
				}, {
					header : '',
					width : 100,
					sortable : false,
					dataIndex : 'mid',
					renderer : rendermodulerow
				}],
				stripeRows : true,
				autoExpandColumn : 'iname',
				title : grooveTranslator.getLangLabel('module-language',
						'list-title'),
				viewConfig : {
					forceFit : true
				},
				border : false,
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
								iconCls : 'addmodule',
								text : grooveTranslator.getLangLabel(
										'module-language', 'tbar-add'),
								handler : addmodule
							}, '-', {
								id : 'delmoduleButton',
								iconCls : 'delmodule',
								text : grooveTranslator.getLangLabel(
										'module-language', 'tbar-delete'),
								disabled : true,
								handler : handleDelmodule
							}, '-', {
								iconCls : 'delmodule',
								text : grooveTranslator.getLangLabel(
										'module-language', 'tbar-purview'),
								handler : showRoleAuthorization
							}]
						}),
				bbar : new Ext.PagingToolbar({
							pageSize : pageSize,// 每页显示的记录值
							store : moduleListStore,
							displayInfo : true,
							displayMsg : grooveTranslator.getLangLabel(
									'common-language', 'list-displaymsg'),
							emptyMsg : grooveTranslator.getLangLabel(
									'common-language', 'list-emptymsg')
						})
			});

	moduleListGrid.on('click', function(e) {
				var t = e.getTarget();
				var v = this.view;
				var rowIdx = v.findRowIndex(t);
				var record = this.getStore().getAt(rowIdx);
				if (record && record.data.key == 'admin') {
					// Ext.Msg.alert('提示', '系统管理员角色不能删除！');
					moduleListGrid.getSelectionModel().deselectRow(rowIdx);
				} else if (record && record.data.key != 'admin') {
					var selectedNodes = moduleListGrid.getSelectionModel()
							.getSelections();
					for (var i = 0; i < selectedNodes.length; i++) {
						if (selectedNodes[i].data.id != record.data.id) {
							moduleListGrid.getSelectionModel()
									.deselectRow(rowIdx);
						}

					}
				}

				if (moduleListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delmoduleButton').enable();
				} else {
					Ext.getCmp('delmoduleButton').disable();
				}
			});

	moduleListGrid.setIconClass('tabs');

	moduleListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return moduleListGrid;
}

function rendermoduleName(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:editmodule(\'{1}\', \'{0}\');">{0}</a></b>',
					value, record.data.mid);
	if (false && record.data.key == "admin") {
		resultString = String.format('<b><font color="red">{0}</font></b>',
				value, record.data.id);
	}

	return resultString;
}

function rendermodulerow(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<a href="javascript:void(0);" onclick="javascript:showmoduleTree(\'{0}\', \'{1}\');">'
							+ grooveTranslator.getLangLabel('module-language',
									'list-menumanage')
							+ '</a>&nbsp;'
							+ '<a href="javascript:void(0);" onclick="javascript:showmodulePurviewTree(\'{0}\', \'{1}\');">'
							+ grooveTranslator.getLangLabel('module-language',
									'list-purview') + '</a>', value,
					record.data.mname);
	return resultString;
}

/**
 * 重置模块信息列表视图
 * 
 * 
 */
function resetmoduleListView() {
	/* 取消已选择数据 */
	moduleListGrid.getSelectionModel().clearSelections();
}

function handleDelmodule() {
	if (moduleListGrid.getSelectionModel().hasSelection()) {
		Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
						'prompt'), grooveTranslator.getLangLabel(
						'module-language', 'delete-prompt'), deletemodule);
	} else {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator
						.getLangLabel('module-language', 'delete-alert'));
	}
}

/**
 * 重载角色列表store
 */
function reloadmoduleListStore() {
	if (moduleListStore) {
		moduleListStore.reload({
					start : 0,
					limit : pageSize
				});
	}
}

/**
 * 重载角色对象列表store
 */
function reloadmoduleObjListStore() {
	if (moduleObjListStore) {
		moduleObjListStore.reload();
	}
}

function deletemodule(btn) {
	if (btn == 'yes') {
		var ids = "";
		var selectedNodes = moduleListGrid.getSelectionModel().getSelections();
		for (var i = 0; i < selectedNodes.length; i++) {
			if (i < selectedNodes.length - 1) {
				ids += selectedNodes[i].data.mid + ",";
			} else {
				ids += selectedNodes[i].data.mid;
			}
		}

		Ext.Ajax.request({
					url : context + "/system/module.do?method=delete",
					method : 'POST',
					async : false,
					params : {
						ids : ids
					},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'module-language', 'delete-error'));
						} else {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator
											.getLangLabel('module-language',
													'delete-success'));
							reloadmoduleListStore();
						}
					}
				})
	}
}