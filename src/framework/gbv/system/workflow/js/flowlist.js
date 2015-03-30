var flowlistTabid;

/**
 * 工作流程列表
 * 
 * @return {}
 */
function workflowlist(tabid) {
	flowlistTabid = tabid;

	var store = new Ext.data.JsonStore({
				root : 'flowList',
				totalProperty : 'totalCount',
				idProperty : 'CG_ID',
				remoteSort : true,

				fields : ['PAGINATION_NUMBER', 'CG_ID', 'CG_KEY', 'CG_NAME',
						'CG_MEMO', 'OBJ_NAME', 'OPINION_TABLE', 'CG_KEEPDATA',
						'SURPORT'],
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/flowmanage.do?method=flowlist'
						})
			});

	function renderTopic(value, p, record) {
		return String
				.format(
						'<b><a href="javascript:void(0);" onclick="javascript:editflow(\'{1}\', \'{0}\');">{0}</a></b>',
						value, record.data.CG_ID);
	}

	function renderLast(value, p, r) {
		var str = '';

		str += '<a href="javascript:void(0);" onclick="javascript:handleDraw(\'{1}\',\'{2}\');">'
				+ grooveTranslator.getLangLabel('workflow-language', 'draw')
				+ '</a>';
		str += '&nbsp;<a href="javascript:void(0);" onclick="javascript:handleSet(\'{0}\',\'{2}\');">'
				+ grooveTranslator.getLangLabel('workflow-language', 'setting')
				+ '</a>';
		str += '&nbsp;<a href="javascript:void(0);" onclick="javascript:handleInit(\'{0}\',\'{2}\');">'
				+ grooveTranslator.getLangLabel('workflow-language', 'init')
				+ '</a>';
		return String.format(str, r.data.CG_ID, r.data.CG_KEY,
				r.data['CG_NAME']);
	}

	var sm = new Ext.grid.CheckboxSelectionModel({
				handleMouseDown : Ext.emptyFn,
				singleSelect : true
			});

	var grid = new Ext.grid.GridPanel({
				id : tabid,
				title : grooveTranslator.getLangLabel('workflow-language',
						'flowlist-title'),
				store : store,
				sm : sm,
				loadMask : true,
				closable : true,
				layout : 'fit',
				// grid columns
				columns : [new Ext.grid.RowNumberer(), sm, {
					id : 'fname',
					header : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-name'),
					dataIndex : 'CG_NAME',
					align : 'left',
					width : 150,
					renderer : renderTopic,
					sortable : true
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-key'),
					dataIndex : 'CG_KEY',
					align : 'left',
					width : 100,
					sortable : false
				}, {
					id : 'oname',
					header : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-object'),
					dataIndex : 'OBJ_NAME',
					align : 'left',
					width : 100,
					sortable : true
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-support'),
					dataIndex : 'SURPORT',
					align : 'left',
					width : 100,
					sortable : true
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-desc'),
					dataIndex : 'CG_MEMO',
					width : 150,
					align : 'left',
					sortable : false
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-opinion'),
					dataIndex : 'OPINION_TABLE',
					width : 150,
					align : 'left',
					sortable : false
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-keepdata'),
					dataIndex : 'CG_KEEPDATA',
					width : 100,
					align : 'left',
					sortable : false,
					renderer : function(value, cellmeta, record, rowIndex,
							columnIndex, store) {
						if (value == 1) {
							return grooveTranslator.getLangLabel(
									'frequence-language', 'yes');
						} else if (value == 0) {
							return grooveTranslator.getLangLabel(
									'frequence-language', 'no');
						}

						return value;
					}
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-op'),
					dataIndex : 'CG_ID',
					align : 'center',
					width : 150,
					renderer : renderLast,
					sortable : false
				}],

				stripeRows : true,
				autoExpandColumn : 'CG_NAME',
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

				// paging bar on the bottom
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayInfo : true,
							displayMsg : grooveTranslator.getLangLabel(
									'common-language', 'list-displaymsg'),
							emptyMsg : grooveTranslator.getLangLabel(
									'common-language', 'list-emptymsg')
						}),
				tbar : [{
					text : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-tbar-add'),
					iconCls : 'addflow',
					handler : function() {
						neuflow();
					}
				}, '-', {
					id : 'delflowbutton',
					text : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-tbar-delete'),
					iconCls : 'delflow',
					disabled : true,
					handler : function() {
						deleteflow(grid);
					}
				}, '-', {
					id : 'copyflowbutton',
					text : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-tbar-copy'),
					iconCls : 'copyflow',
					disabled : true,
					handler : function() {
						if (grid.getSelectionModel().hasSelection()) {
							var selectedNodes = grid.getSelectionModel()
									.getSelections();

							if (selectedNodes && selectedNodes.length > 0) {
								copyflow(selectedNodes[0]);
							}
						}
					}
				}, '-', {
					id : 'exportflowbutton',
					text : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-tbar-export'),
					iconCls : 'exportflow',
					disabled : true,
					handler : function() {
						if (grid.getSelectionModel().hasSelection()) {
							var selectedNodes = grid.getSelectionModel()
									.getSelections();

							if (selectedNodes && selectedNodes.length > 0) {
								exportflow(selectedNodes[0]);
							}
						}
					}
				}, '-', {
					id : 'importflowbutton',
					text : grooveTranslator.getLangLabel('workflow-language',
							'flowlist-tbar-import'),
					iconCls : 'restore',
					handler : function() {
						importflow();
					}
				}]
			});

	grid.on('click', function(e) {
				if (grid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delflowbutton').enable();
					Ext.getCmp('copyflowbutton').enable();
					Ext.getCmp('exportflowbutton').enable();
				} else {
					Ext.getCmp('delflowbutton').disable();
					Ext.getCmp('copyflowbutton').disable();
					Ext.getCmp('exportflowbutton').disable();
				}
			});

	grid.setIconClass('tabs');

	// trigger the data store load
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	return grid;
}

/**
 * 刷新流程列表
 */
function reloadFlowListStore() {
	if (Ext.get(flowlistTabid)) {
		Ext.getCmp(flowlistTabid).getStore().reload();
	}
}

/**
 * 删除操作确认
 * 
 * @param {}
 *            grid
 */
function deleteflow(grid) {
	if (grid.getSelectionModel().hasSelection()) {
		Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
						'prompt'), grooveTranslator.getLangLabel(
						'workflow-language', 'flow-delete-prompt'),
				handleDeleteFlow);
	}
}

/**
 * 删除流程定义
 * 
 * @param {}
 *            btn
 */
function handleDeleteFlow(btn) {
	if (btn == 'yes') {
		var id;
		var selectedNodes = Ext.getCmp(flowlistTabid).getSelectionModel()
				.getSelections();

		if (selectedNodes && selectedNodes.length > 0) {
			id = selectedNodes[0].data.CG_ID;
		}

		Ext.Ajax.request({
					url : context + "/system/flowmanage.do?method=deleteflow",
					method : 'POST',
					async : false,
					params : {
						gid : id
					},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'flow-delete-failure'));
						} else {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'flow-delete-success'));
							reloadFlowListStore();
						}
					}
				})
	}
}

function importflow() {
	var form = new Ext.FormPanel({
				frame : true,
				border : false,
				margins : '1 1 1 1',
				labelAlign : 'right',
				labelWidth : 85,
				height : 50,
				fileUpload : true,
				waitMsgTarget : true,
				defaults : {
					width : 350
				},
				defaultType : 'textfield',

				items : [{
					name : 'file1',
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-import-file'),
					inputType : 'file',
					xtype : 'textfield',
					allowBlank : false
				}]
			});

	var win = new Ext.Window({
		title : grooveTranslator.getLangLabel('workflow-language',
				'flow-import-title'),
		width : 500,
		layout : 'fit',
		items : [form],
		plain : true,
		modal : true,
		buttons : [{
			text : grooveTranslator.getLangLabel('common-language', 'import'),
			handler : function() {
				if (form.getForm().isValid()) {
					Ext.MessageBox.confirm(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('workflow-language',
									'import'), function(btn) {
								if (btn == 'yes') {
									Ext.MessageBox.wait(grooveTranslator
											.getLangLabel('common-language',
													'import-loading'));

									form.getForm().submit({
										url : context
												+ "/system/flowmanage.do?method=importflow",
										method : 'POST',
										success : function(response, options) {
											var o = Ext.util.JSON
													.decode(response.responseText);
											Ext.Msg
													.alert(
															grooveTranslator
																	.getLangLabel(
																			'common-language',
																			'prompt'),
															grooveTranslator
																	.getLangLabel(
																			'workflow-language',
																			'flow-import-success')); //
											win.close();
											win = null;
											reloadFlowListStore();
										},
										failure : function(response, options) {
											Ext.MessageBox.show({
												title : grooveTranslator
														.getLangLabel(
																'common-language',
																'prompt'),
												msg : response.responseText,
												icon : Ext.MessageBox.ERROR
											});
											win.close();
											win = null;
										}
									});
								}
							});
				}
			}
		}]
	});

	win.show(this);
}

function exportflow(node) {
	var url = context + '/system/flowmanage.do?method=exportflow';

	/*
	 * Ext.Ajax.request({ url : url, method : 'POST', async : false, params : {
	 * id : node.data.CG_ID }, success : function(response, options) { var o =
	 * Ext.util.JSON.decode(response.responseText); if (!o.success) {
	 * Ext.Msg.alert('提示', '导出失败！'); } else { //Ext.Msg.alert('提示', '导出成功！');
	 * 
	 * Ext.get('dldfrm').dom.src = context + '/temp-store/' + o.fileName; } }
	 * });
	 */

	document.getElementById('dldfrm').src = url + "&id=" + node.data.CG_ID;

}

function handleInit(id, name) {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel(
					'workflow-language', 'flow-init-alert'), function(btn) {
				if (btn == 'yes') {
					var url = context + "/system/flowmanage.do?method=reinit";

					Ext.MessageBox.show({
								title : grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								msg : grooveTranslator.getLangLabel(
										'common-language', 'init-loading'),
								progressText : '',
								width : 300,
								wait : true,
								progress : true,
								closable : false,
								waitConfig : {
									interval : 400
								},
								animEl : 'loading'
							});

					Ext.Ajax.request({
						url : url,
						method : 'POST',
						async : false,
						params : {
							id : id
						},
						success : function(response, options) {
							var o = Ext.util.JSON.decode(response.responseText);
							if (!o.success) {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'workflow-language',
												'flow-init-error'));
							} else {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'workflow-language',
												'flow-init-success'));
							}
						},
						failure : function() {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'flow-init-failure'));
						}
					})
				}
			});
}

/**
 * 构建流程图
 * 
 * @param {}
 *            id
 */
function handleDraw(id, name) {
	var url = context
			+ "/system/flowplotter.do?method=preplotter&type=drawing&id=" + id;

	/*
	 * window .showModalDialog( url, "",
	 * "dialogWidth:800px;dialogHeight:600px;center:yes;help:no;scroll:no;status:no;resizable:yes;");
	 */
	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 800,
		height : 600,
		title : name,
		resizable : true,
		maximizable : true,
		plain : true,
		modal : true,
		html : '<iframe src="'
				+ url
				+ '" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>',
		buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						win.close();
					}
				}]
	});

	win.show();
}

/**
 * 环节设置
 * 
 * @param {}
 *            id
 * @param {}
 *            name
 */
function handleSet(id, name) {
	stepList(id, name);
}