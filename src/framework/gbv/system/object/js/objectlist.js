var objectListGrid;
var objectListArea;
var objectListTab;
var objectListStore;
var pageSize = 20;

/**
 * 模块list
 * 
 * @param {}
 *            tabid
 * @param {}
 *            areaid
 */
function objectlist(tabid) {
	objectListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'objectList',
				fields : ['id', 'key', 'name', 'memo', 'handler', 'system',
						'viewdiy'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/object.do?method=list'
						})
			});

	objectListGrid = new Ext.grid.GridPanel({
				id : tabid,
				store : objectListStore,
				closable : true,
				columns : [{
							header : 'Object Name',
							width : 100,
							sortable : true,
							dataIndex : 'name',
							renderer : renderobjectName
						}, {
							header : 'Unique ID',
							width : 100,
							sortable : true,
							dataIndex : 'key'
						}, {
							header : 'Object Description',
							width : 150,
							sortable : false,
							dataIndex : 'memo'
						}, {
							header : 'Event Handling Class',
							width : 100,
							sortable : false,
							dataIndex : 'handler'
						}, {
							header : 'System',
							width : 100,
							sortable : false,
							dataIndex : 'system'
						}],
				stripeRows : true,
				autoExpandColumn : 'iname',
				title : 'Form Object List',
				viewConfig : {
					forceFit : true
				},
				border : false,
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Data loading, please wait a moment..."
				},
				tbar : new Ext.Toolbar({
							autoWidth : true,
							autoShow : true,
							items : [{
										iconCls : 'addobject',
										text : 'New Form Object',
										handler : objectneu
									}, '-', {
										id : 'delobjectButton',
										iconCls : 'delobject',
										text : 'Delete Form Object',
										disabled : true,
										handler : handleDelobject
									}, '-', {
										id : 'copyobjectButton',
										iconCls : 'copyobject',
										text : 'Copy Form Object',
										disabled : true,
										handler : handleCopyobject
									}]
						}),
				bbar : new Ext.Toolbar([{
							iconCls : 'refresh',
							text : 'Refresh',
							handler : function() {
								objectListGrid.getStore().reload();
							}
						}])
			});

	objectListGrid.on('click', function(e) {
				var t = e.getTarget();
				var v = this.view;
				var rowIdx = v.findRowIndex(t);
				var record = this.getStore().getAt(rowIdx);
				var selectedNodes = objectListGrid.getSelectionModel()
						.getSelections();
				for (var i = 0; i < selectedNodes.length; i++) {
					if (record && selectedNodes[i].data.id != record.data.id) {
						objectListGrid.getSelectionModel().deselectRow(rowIdx);
					}

				}

				if (objectListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delobjectButton').enable();
					Ext.getCmp('copyobjectButton').enable();
				} else {
					Ext.getCmp('delobjectButton').disable();
					Ext.getCmp('copyobjectButton').disable();
				}
			});

	objectListGrid.setIconClass('tabs');

	objectListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return objectListGrid;
}

function renderobjectName(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString;

	if (record.data.viewdiy) {
		resultString = String
				.format(
						'<b><a href="javascript:void(0);" onclick="javascript:editobject(\'{1}\', \'{0}\');">{0}</a></b>',
						value, record.data.key);
	} else {
		// do nothing
		resultString = value;
	}

	return resultString;
}

/**
 * 
 * 
 */
function resetobjectListView() {
	/* 取消已选择数据 */
	objectListGrid.getSelectionModel().clearSelections();
}

/**
 * 删除对象
 */
function handleDelobject() {
	if (objectListGrid.getSelectionModel().hasSelection()) {
		Ext.MessageBox.confirm('Hint', 'Sure to delete the form object?', deleteobject);
	} else {
		Ext.Msg.alert('Hint', 'Please choose to delete the form object!');
	}
}

/**
 * 复制对象
 */
function handleCopyobject() {
	if (objectListGrid.getSelectionModel().hasSelection()) {
		var selectedNodes = objectListGrid.getSelectionModel().getSelections();
		if (selectedNodes.length > 0) {
			copyobject(selectedNodes[0].data.id, selectedNodes[0].data.name);
		}
	} else {
		Ext.Msg.alert('Hint', 'Please choose to copy the form object!');
	}
}

/**
 * 重载角色列表store
 */
function reloadobjectListStore() {
	if (objectListStore) {
		objectListStore.reload({
					start : 0,
					limit : pageSize
				});
	}
}

function deleteobject(btn) {
	if (btn == 'yes') {
		var ids = "";
		var selectedNodes = objectListGrid.getSelectionModel().getSelections();
		for (var i = 0; i < selectedNodes.length; i++) {
			if (i < selectedNodes.length - 1) {
				ids += selectedNodes[i].data.key + ",";
			} else {
				ids += selectedNodes[i].data.key;
			}
		}

		Ext.Ajax.request({
					url : context + "/system/object.do?method=delete",
					method : 'POST',
					async : false,
					params : {
						okey : ids
					},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert('Hint', 'The form object was removed  failed!');
						} else {
							Ext.Msg.alert('Hint', 'The form object was removed successfully!');
							reloadobjectListStore();
						}
					}
				})
	}
}