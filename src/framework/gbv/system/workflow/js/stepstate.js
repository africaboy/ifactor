/**
 * 操作表单视图权限
 * 
 * @param {}
 *            gid
 * @param {}
 *            sid
 * @param {}
 *            name
 */
function handlingStepView(gid, sid, name) {

	var url = context + '/system/flowmanage.do?method=editstate&sid=' + sid
			+ '&gid=' + gid

	Ext.Ajax.request({
				// 请求地址
				url : url,
				scriptTag : true,
				// 成功时回调
				success : function(response, options) {
					var json = response.responseText;
					var o = Ext.util.JSON.decode(json);
					if (o.success) {
						showEditTabs = new Ext.TabPanel({
									id : 'showPanel',
									region : 'center',
									border : false,
									frame : false,
									activeTab : 0,
									enableTabScroll : true,
									defaults : {
										autoScroll : true,
										bodyStyle : 'padding:5px'
									},

									items : [showTableViewGrid(o.data, gid,
											sid, name)]
								});

						var leftTreePanel = initLeftTreePanel(o.data,
								showEditTabs, gid, sid, name);

						var win = new Ext.Window({
									renderTo : Ext.getBody(),
									id : 'showWin',
									layout : 'border',
									title : '{'
											+ name
											+ '}_'
											+ grooveTranslator.getLangLabel(
													'workflow-language',
													'handler-form-title'),
									width : 700,
									height : 500,
									plain : true,
									modal : true,
									maximizable : false,
									items : [leftTreePanel, showEditTabs]
								});

						win.show();
					} else {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel(
										'workflow-language',
										'handler-set-alert'));
					}
				},
				failure : function(response, options) {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							response.responseText);
				}
			});
}

function initLeftTreePanel(jsonData, showEditTab, gid, sid, name) {
	var treeData = jsonData.treeJson;
	var tempRoot = {
		id : 'root',
		text : grooveTranslator.getLangLabel('workflow-language',
				'step-form-view'),
		type : 'root',
		expanded : true,
		children : treeData
	};
	leftTree = new Ext.tree.TreePanel({
				region : 'west',
				collapsible : true,
				title : grooveTranslator.getLangLabel('workflow-language',
						'step-form-view'),
				width : 200,
				autoScroll : true,
				border : false,
				frame : false,
				split : true,
				loader : new Ext.tree.TreeLoader({

				}),
				root : new Ext.tree.AsyncTreeNode(tempRoot),
				listeners : {
					click : function(n) {
						var showGrid = null;
						if (n.attributes.type == 'root') {
							showGrid = Ext.getCmp('tableViewGrid');
							if (!showGrid) {
								showGrid = showTableViewGrid(jsonData);
								// showEditTab.remove(0);
								showEditTab.add(showGrid).show();
							}
						} else if (n.attributes.type == 'tableview') {
							showGrid = Ext.getCmp('tableGrid_' + n.realid);
							if (!showGrid) {
								showGrid = showTableGrid(jsonData,
										n.attributes.realid, n.text, gid, sid,
										name);
								// showEditTab.remove(0);
								showEditTab.add(showGrid).show();
							}
						} else if (n.attributes.type == 'table') {
							showGrid = Ext
									.getCmp('tableColumnGrid_' + n.realid);
							if (!showGrid) {
								showGrid = showTableColumnGrid(jsonData,
										n.attributes.realid, n.text, gid, sid,
										name);
								// showEditTab.remove(0);
								showEditTab.add(showGrid).show();
							}
						}
					}
				}
			});
	return leftTree;
}
var purviewstore = new Ext.data.Store({
			proxy : new Ext.data.ScriptTagProxy({
						url : context
								+ '/system/wb.do?method=store&type=purview'
					}),
			reader : new Ext.data.ArrayReader({}, [{
								name : 'purview_id'
							}, {
								name : 'purview_name'
							}])

		});
purviewstore.load();
/**
 * 视图权限设置表格
 * 
 * @param {}
 *            dataJson
 * @return {}
 */
function showTableViewGrid(dataJson, gid, sid, name) {
	var tableViewGridStore = new Ext.data.Store({
				reader : new Ext.data.JsonReader({
							root : 'treeJson',
							fields : ['text', 'id', 'realid', 'S_ID', 'H_ID',
									'H_TYPE']
						})
			});
	tableViewGrid = new Ext.grid.EditorGridPanel({
				id : 'tableViewGrid',
				title : grooveTranslator.getLangLabel('workflow-language',
						'handlerlist-purview'),
				border : false,
				height : 100,
				frame : false,
				store : tableViewGridStore,
				stateful : true,
				stripeRows : true,
				stateId : 'grid',
				clicksToEdit : 1,
				loadMask : true,
				columns : [new Ext.grid.RowNumberer({
							header : grooveTranslator.getLangLabel(
									'common-language', 'list-idx'),
							width : 50
						}), {
					header : grooveTranslator.getLangLabel('workflow-language',
							'step-form-view'),
					dataIndex : 'text',
					width : 150
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'handlerlist-purview'),
					width : 100,
					sortable : false,
					editor : new Ext.form.ComboBox({
								selectOnFocus : true,
								emptyText : '',
								forceSelection : true,
								triggerAction : 'all',
								valueField : 'purview_id', // 提交表单时，下拉框的值
								displayField : 'purview_name', // 显示在页面上下拉框的值
								editable : false,
								allowBlank : false,
								store : purviewstore
							}),
					renderer : function(value) {
						var index = purviewstore.find("purview_id", value);
						var record = purviewstore.getAt(index);
						if (record) {
							return record.get('purview_name');
						} else {
							return '';
						}
					},
					dataIndex : 'H_TYPE'
				}],
				viewConfig : {
					forceFit : true
				},
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'save'),
					handler : function() {
						saveTableViewHandle(gid, sid, name);
					}
				}]
			});

	tableViewGridStore.loadData(dataJson);

	return tableViewGrid;

}
/**
 * 显示表权限表
 * 
 * @param {}
 *            dataJson
 * @param {}
 *            viewId
 * @param {}
 *            viewName
 * @param {}
 *            gid
 * @param {}
 *            sid
 * @param {}
 *            name
 * @return {}
 */
function showTableGrid(dataJson, viewId, viewName, gid, sid, name) {
	var tableGridStore = new Ext.data.Store({
				reader : new Ext.data.JsonReader({
							root : 'children',
							fields : ['text', 'id', 'realid', 'S_ID', 'H_ID',
									'H_TYPE']
						})
			});
	tableGrid = new Ext.grid.EditorGridPanel({
				id : 'tableGrid_' + viewId,
				title : '['
						+ viewName
						+ ']'
						+ grooveTranslator.getLangLabel('workflow-language',
								'handlerlist-purview'),
				border : false,
				frame : false,
				store : tableGridStore,
				height : 100,
				stateful : true,
				stripeRows : true,
				stateId : 'grid',
				autoScroll : true,
				clicksToEdit : 1,
				loadMask : true,
				columns : [new Ext.grid.RowNumberer({
							header : grooveTranslator.getLangLabel(
									'common-language', 'list-idx'),
							width : 50
						}), {
					header : grooveTranslator.getLangLabel('backup-language',
							'list-table'),
					dataIndex : 'text',
					width : 150
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'handlerlist-purview'),
					width : 100,
					sortable : false,
					editor : new Ext.form.ComboBox({
								selectOnFocus : true,
								emptyText : '',
								forceSelection : true,
								triggerAction : 'all',
								valueField : 'purview_id', // 提交表单时，下拉框的值
								displayField : 'purview_name', // 显示在页面上下拉框的值
								editable : false,
								allowBlank : false,
								store : purviewstore
							}),
					renderer : function(value) {
						var index = purviewstore.find("purview_id", value);
						var record = purviewstore.getAt(index);
						if (record) {
							return record.get('purview_name');
						} else {
							return '';
						}
					},
					dataIndex : 'H_TYPE'
				}],
				viewConfig : {
					forceFit : true
				},
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'save'),
					handler : function() {
						saveTableHandle(viewId, gid, sid, name);
					}
				}]
			});
	tableGridStore.loadData(getTableJson(dataJson.treeJson, viewId));

	return tableGrid;
}

/**
 * 显示表字段权限表
 * 
 * @param {}
 *            dataJson
 * @param {}
 *            viewId
 * @param {}
 *            viewName
 * @param {}
 *            gid
 * @param {}
 *            sid
 * @param {}
 *            name
 * @return {}
 */
function showTableColumnGrid(dataJson, tableId, tableName, gid, sid, name) {
	var tableColumnGridStore = new Ext.data.Store({
				reader : new Ext.data.JsonReader({
							root : tableId + "_columnList",
							fields : ['OBJ_ITEMNAME', 'OBJ_ITEM', 'S_ID',
									'H_ID', 'H_TYPE']
						})
			});
	tableColumnGrid = new Ext.grid.EditorGridPanel({
				id : 'tableColumnGrid_' + tableId,
				title : '['
						+ tableName
						+ ']'
						+ grooveTranslator.getLangLabel('workflow-language',
								'handlerlist-purview'),
				border : false,
				frame : false,
				store : tableColumnGridStore,
				height : 100,
				stateful : true,
				stripeRows : true,
				stateId : 'grid',
				autoScroll : true,
				clicksToEdit : 1,
				loadMask : true,
				columns : [new Ext.grid.RowNumberer({
							header : grooveTranslator.getLangLabel(
									'common-language', 'list-idx'),
							width : 50
						}), {
					header : grooveTranslator.getLangLabel('workflow-language',
							'handlerlist-column'),
					dataIndex : 'OBJ_ITEMNAME',
					width : 150
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'handlerlist-purview'),
					width : 100,
					sortable : false,
					editor : new Ext.form.ComboBox({
								selectOnFocus : true,
								emptyText : '',
								forceSelection : true,
								triggerAction : 'all',
								valueField : 'purview_id', // 提交表单时，下拉框的值
								displayField : 'purview_name', // 显示在页面上下拉框的值
								editable : false,
								allowBlank : false,
								store : purviewstore
							}),
					renderer : function(value) {
						var index = purviewstore.find("purview_id", value);
						var record = purviewstore.getAt(index);
						if (record) {
							return record.get('purview_name');
						} else {
							return '';
						}
					},
					dataIndex : 'H_TYPE'
				}],
				viewConfig : {
					forceFit : true
				},
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'save'),
					handler : function() {
						saveTableColumnHandle(tableId, gid, sid, name);
					}
				}]
			});
	tableColumnGridStore.loadData(dataJson.columnListJson);

	return tableColumnGrid;
}
/**
 * 保存视图权限
 */
function saveTableViewHandle(gid, sid, name) {
	var params;
	var countNameStr = '';
	var total = Ext.getCmp('tableViewGrid').getStore().getCount();
	if (total > 0) {
		params = '({';
		for (var i = 0; i < total; i++) {
			var record = Ext.getCmp('tableViewGrid').getStore().getAt(i);
			params += 'hid_' + i + ':"' + record.data.H_ID + '",';
			params += 'htype_' + i + ':"' + record.data.H_TYPE + '",';
			params += 'oitem_' + i + ':"' + record.data.realid + '",';
			params += 'sid_' + i + ':"' + record.data.S_ID + '",';
			params += 'otable_' + i + ':"' + record.data.realid + '",';
			if (i == 0) {
				countNameStr = i;
			} else {
				countNameStr = countNameStr + "," + i;
			}
		}
		params += 'countName : "' + countNameStr + '"';
		params += '})';
	}

	if (params == null) {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('workflow-language',
						'handler-set-selectalert'));
	} else {

		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'submit-loading'));

		Ext.Ajax.request({
					url : context + '/system/flowmanage.do?method=updatestate',
					method : 'POST',
					params : eval(params),
					scope : this,
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (o.success) {
							Ext.MessageBox.hide();
							// Ext.getCmp('showWin').close();
							// handlingStepView(gid, sid, name);

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'handler-success'));

						} else {
							Ext.MessageBox.hide();

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'handler-failure'));
						}
					},
					failure : function(response) {
						Ext.MessageBox.hide();
						Ext.MessageBox.show({
									title : grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									msg : response.responseText,
									icon : Ext.MessageBox.ERROR
								});

					}

				});
	}
}
/**
 * 保存表权限
 * 
 * @param {}
 *            viewId
 * @param {}
 *            gid
 * @param {}
 *            sid
 * @param {}
 *            name
 */
function saveTableHandle(viewId, gid, sid, name) {
	var params;
	var countNameStr = '';
	var total = Ext.getCmp('tableGrid_' + viewId).getStore().getCount();
	if (total > 0) {
		params = '({';
		for (var i = 0; i < total; i++) {
			var record = Ext.getCmp('tableGrid_' + viewId).getStore().getAt(i);
			params += 'hid_' + i + ':"' + record.data.H_ID + '",';
			params += 'htype_' + i + ':"' + record.data.H_TYPE + '",';
			params += 'oitem_' + i + ':"' + record.data.realid + '",';
			params += 'sid_' + i + ':"' + record.data.S_ID + '",';
			params += 'otable_' + i + ':"' + viewId + '",';
			if (i == 0) {
				countNameStr = i;
			} else {
				countNameStr = countNameStr + "," + i;
			}
		}
		params += 'countName : "' + countNameStr + '"';
		params += '})';
	}

	if (params == null) {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('workflow-language',
						'handler-set-selectalert'));
	} else {

		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'submit-loading'));

		Ext.Ajax.request({
					url : context + '/system/flowmanage.do?method=updatestate',
					method : 'POST',
					params : eval(params),
					scope : this,
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (o.success) {
							Ext.MessageBox.hide();

							// Ext.getCmp('showWin').close();
							// handlingStepView(gid, sid, name);

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'handler-success'));

						} else {
							Ext.MessageBox.hide();

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'handler-failure'));
						}
					},
					failure : function(response) {
						Ext.MessageBox.hide();
						Ext.MessageBox.show({
									title : grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									msg : response.responseText,
									icon : Ext.MessageBox.ERROR
								});

					}

				});
	}
}

/**
 * 保存表项权限
 * 
 * @param {}
 *            viewId
 * @param {}
 *            gid
 * @param {}
 *            sid
 * @param {}
 *            name
 */
function saveTableColumnHandle(tableId, gid, sid, name) {
	var params;
	var countNameStr = '';
	var total = Ext.getCmp('tableColumnGrid_' + tableId).getStore().getCount();
	if (total > 0) {
		params = '({';
		for (var i = 0; i < total; i++) {
			var record = Ext.getCmp('tableColumnGrid_' + tableId).getStore()
					.getAt(i);
			params += 'hid_' + i + ':"' + record.data.H_ID + '",';
			params += 'htype_' + i + ':"' + record.data.H_TYPE + '",';
			params += 'oitem_' + i + ':"' + record.data.OBJ_ITEM + '",';
			params += 'sid_' + i + ':"' + record.data.S_ID + '",';
			params += 'otable_' + i + ':"' + tableId + '",';
			if (i == 0) {
				countNameStr = i;
			} else {
				countNameStr = countNameStr + "," + i;
			}
		}
		params += 'countName : "' + countNameStr + '"';
		params += '})';
	}

	if (params == null) {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('workflow-language',
						'handler-set-selectalert'));
	} else {

		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'submit-loading'));

		Ext.Ajax.request({
					url : context + '/system/flowmanage.do?method=updatestate',
					method : 'POST',
					params : eval(params),
					scope : this,
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (o.success) {
							Ext.MessageBox.hide();

							// Ext.getCmp('showWin').close();
							// handlingStepView(gid, sid, name);

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'handler-success'));

						} else {
							Ext.MessageBox.hide();

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'handler-failure'));
						}
					},
					failure : function(response) {
						Ext.MessageBox.hide();
						Ext.MessageBox.show({
									title : grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									msg : response.responseText,
									icon : Ext.MessageBox.ERROR
								});

					}

				});
	}
}

function getTableJson(dataJson, viewId) {
	for (var i = 0; i < dataJson.length; i++) {
		var tempJson = dataJson[i];
		if (tempJson.realid == viewId)
			return tempJson;
	}
}