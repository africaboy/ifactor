document.write("<script src=\"" + context
		+ "/system/table/js/tablelist.js\"></script>");

function tableRegister(tabid, areaid) {
	var tableTab = Ext.get(tabid);
	var tableTabArea = Ext.get(areaid);
	tableTabArea.dom.style.width = "100%";

	var panel = new Ext.Panel({
				id : 'tableregister',
				margins : '35 5 5 5',
				height : Ext.get(tabid).getHeight(),
				border : false,
				layout : 'column',
				autoScroll : true,
				renderTo : areaid,
				items : [{
					columnWidth : .33,
					baseCls : 'x-plain',
					bodyStyle : 'padding:5px 0px 5px 5px',
					items : [{
						title : '表信息',
						items : new Ext.FormPanel({
									id : 'TBForm',
									labelWidth : 75, // label settings here
									// cascade unless
									frame : false,
									bodyStyle : 'border:0px; padding:5px;',
									labelAlign : 'top',
									border : false,
									width : 320,
									defaults : {
										width : 300
									},
									defaultType : 'textfield',

									items : [{
												fieldLabel : '表名称',
												name : 'tname',
												allowBlank : false
											}, {
												fieldLabel : '表描述',
												name : 'tdesc'
											}],

									buttons : [{
										text : '生成脚本',
										type : 'submit',
										handler : function() {
											if (Ext.getCmp('TBForm').getForm()
													.isValid()) {

											}
										}
									}, {
										text : '重置',
										handler : function() {
											Ext.getCmp('TBForm').getForm()
													.reset();
										}

									}]
								})
					}]
				}, {
					columnWidth : .67,
					baseCls : 'x-plain',
					bodyStyle : 'padding:5px 5px 5px 5px',
					items : [{
								title : '字段信息',
								autoScroll : true,
								height : Ext.get(tabid).getHeight() - 10,
								items : [new Ext.Toolbar({
											autoWidth : true,
											autoShow : true,
											items : [{
														iconCls : 'addcolumn',
														text : '增加字段',
														handler : addcolumn
													}, '-', {
														id : 'delmoduleButton',
														iconCls : 'delcolumn',
														text : '删除字段',
														disabled : true,
														handler : delcolumn
													}]
										})]
							}]
				}]
			});
}

function addcolumn() {

}

function delcolumn() {

}

/**
 * 数据备份
 */
function databackup(tabid) {
	var tableType = getWBComboStore('backup-tabletype', '', '_tableType',
			grooveTranslator.getLangLabel('backup-language', 'list-type'),
			null, null, '', true);
	tableType.on('select', function(combo, record, index) {
				var fileName = record.data['_tableTypeid'];

				tableListStore.proxy = new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/table.do?method=alllist&type='
									+ fileName
						});
				tableListStore.load();

				Ext.getCmp('databackupButton').disable();
			});

	var tableListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'tableList',
				fields : ['name', 'memo', 'file', 'ds', 'type'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/table.do?method=alllist'
						})
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				handleMouseDown : Ext.emptyFn
			});

	var tableListGrid = new Ext.grid.GridPanel({
				id : tabid,
				store : tableListStore,
				closable : true,
				sm : sm,
				columns : [sm, {
					header : grooveTranslator.getLangLabel('backup-language',
							'list-table'),
					width : 150,
					sortable : true,
					dataIndex : 'name'
				}, {
					header : grooveTranslator.getLangLabel('backup-language',
							'list-desc'),
					width : 150,
					sortable : true,
					dataIndex : 'memo'
				}, {
					header : grooveTranslator.getLangLabel('backup-language',
							'list-file'),
					width : 150,
					sortable : false,
					dataIndex : 'file'
				}, {
					header : grooveTranslator.getLangLabel('backup-language',
							'list-datasource'),
					width : 150,
					sortable : false,
					dataIndex : 'ds'
				}, {
					header : grooveTranslator.getLangLabel('backup-language',
							'list-type'),
					width : 150,
					sortable : false,
					dataIndex : 'type',
					renderer : function(value, cellmeta, record, rowIndex,
							columnIndex, store) {
						if (value == -2) {
							return grooveTranslator.getLangLabel(
									'table-language', 'backup');
						} else if (value == -1) {
							return grooveTranslator.getLangLabel(
									'table-language', 'system');
						} else if (value > -1) {
							return grooveTranslator.getLangLabel(
									'table-language', 'app')
						}

						return value;
					}
				}],
				stripeRows : true,
				autoExpandColumn : 'name',
				title : grooveTranslator.getLangLabel('backup-language',
						'list-title'),
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
							items : [
									grooveTranslator.getLangLabel(
											'backup-language', 'list-type'),
									tableType, '-', {
										iconCls : 'databackup',
										id : 'databackupButton',
										text : grooveTranslator.getLangLabel(
												'backup-language',
												'tbar-backup'),
										disabled : true,
										handler : function() {
											handleBackup(tableListGrid);
										}
									}]
						}),
				bbar : new Ext.Toolbar([{
					iconCls : 'refresh',
					text : grooveTranslator.getLangLabel('common-language',
							'refresh'),
					handler : function() {
						tableListGrid.getStore().reload();
					}
				}])
			});

	tableListGrid.setIconClass('tabs');

	tableListGrid.on('click', function(e) {
				if (tableListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('databackupButton').enable();
				} else {
					Ext.getCmp('databackupButton').disable();
				}
			});

	tableListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return tableListGrid;
}

/**
 * 数据备份处理
 * 
 * @param {}
 *            grid
 */
function handleBackup(grid) {
	var labels = '';
	var names = '';
	var tables = '';
	var ds = '';

	var selectedNodes = grid.getSelectionModel().getSelections();

	for (var i = 0; i < selectedNodes.length; i++) {
		labels += '<div style="padding:5px;">' + selectedNodes[i].data.memo
				+ ' [' + selectedNodes[i].data.name + '] ' + '</div>';
		if (i < selectedNodes.length - 1) {
			tables += selectedNodes[i].data.name + ',';
			names += selectedNodes[i].data.memo + ',';
			ds += selectedNodes[i].data.ds + ',';
		} else {
			tables += selectedNodes[i].data.name;
			names += selectedNodes[i].data.memo;
			ds += selectedNodes[i].data.ds;
		}
	}

	var form = new Ext.FormPanel({
				frame : true,
				border : false,
				margins : '1 1 1 1',
				labelAlign : 'right',
				region : 'north',
				labelWidth : 85,
				width : 600,
				height : 50,
				waitMsgTarget : true,
				defaults : {
					width : 400
				},
				defaultType : 'textfield',

				items : [{
					fieldLabel : grooveTranslator.getLangLabel(
							'backup-language', 'form-name'),
					name : 'bakFileName',
					emptyText : grooveTranslator.getLangLabel(
							'backup-language', 'form-name-emptytext'),
					maxLength : 50,
					value : (nowTime()),
					allowBlank : false
				}]
			});

	var panel = new Ext.Panel({
				title : grooveTranslator.getLangLabel('backup-language',
						'form-title'),
				region : 'center',
				margins : '1 1 1 1',
				border : false,
				autoScroll : true,
				html : labels
			});

	var win = new Ext.Window({
		title : grooveTranslator
				.getLangLabel('backup-language', 'window-title'),
		width : 600,
		height : 400,
		layout : 'border',
		items : [form, panel],
		plain : true,
		modal : true,
		buttons : [{
			text : grooveTranslator.getLangLabel('backup-language',
					'backup-button'),
			handler : function() {
				if (form.getForm().isValid()) {
					Ext.MessageBox.confirm(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('backup-language',
									'backup-prompt'), function(btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : context
												+ "/system/table.do?method=backup",
										method : 'POST',
										async : false,
										params : {
											bakFileName : form.getForm()
													.findField('bakFileName')
													.getValue(),
											tables : tables,
											names : names,
											ds : ds
										},
										success : function(response, options) {
											var o = Ext.util.JSON
													.decode(response.responseText);
											if (!o.success) {
												Ext.Msg
														.alert(
																grooveTranslator
																		.getLangLabel(
																				'common-language',
																				'prompt'),
																grooveTranslator
																		.getLangLabel(
																				'backup-language',
																				'backup-failure')); //
											} else {
												Ext.Msg
														.alert(
																grooveTranslator
																		.getLangLabel(
																				'common-language',
																				'prompt'),
																grooveTranslator
																		.getLangLabel(
																				'backup-language',
																				'backup-success')); //
												win.close();
												win = null;

												grid.getStore().reload();
												Ext.getCmp('databackupButton')
														.disable();
											}
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

/**
 * 数据恢复
 */
function datarestore(tabid) {
	var backupListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'backupList',
				fields : ['XSYSTEM_ANNEX_ID', 'ANNEX_NAME', 'ANNEX_PATH',
						'ANNEX_STYLE', 'ANNEX_LOCATION'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/table.do?method=backuplist'
						})
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				handleMouseDown : Ext.emptyFn
			});

	var backupListGrid = new Ext.grid.GridPanel({
		id : tabid,
		store : backupListStore,
		closable : true,
		sm : sm,
		columns : [sm, {
			header : grooveTranslator.getLangLabel('restore-language',
					'list-name'),
			width : 300,
			sortable : true,
			dataIndex : 'ANNEX_NAME'
		}, {
			header : grooveTranslator.getLangLabel('restore-language',
					'list-path'),
			width : 150,
			sortable : true,
			dataIndex : 'ANNEX_PATH'
		}, {
			header : grooveTranslator.getLangLabel('restore-language',
					'list-type'),
			width : 100,
			sortable : true,
			dataIndex : 'ANNEX_STYLE'
		}, {
			header : grooveTranslator.getLangLabel('restore-language',
					'list-location'),
			width : 100,
			sortable : true,
			dataIndex : 'ANNEX_LOCATION'
		}, {
			header : grooveTranslator.getLangLabel('restore-language',
					'list-op'),
			width : 100,
			sortable : false,
			dataIndex : 'XSYSTEM_ANNEX_ID',
			renderer : renderBackupList
		}],
		stripeRows : true,
		autoExpandColumn : 'ANNEX_NAME',
		title : grooveTranslator.getLangLabel('restore-language', 'list-title'),
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
						iconCls : 'delbackup',
						id : 'delbackupButton',
						text : grooveTranslator.getLangLabel(
								'restore-language', 'tbar-delete'),
						disabled : true,
						handler : function() {
							handleDelBackup(backupListGrid);
						}
					}, {
						iconCls : 'restore',
						id : 'rsbackupButton',
						text : grooveTranslator.getLangLabel(
								'restore-language', 'tbar-restore'),
						handler : function() {
							handleDataResore();
						}
					}]
				}),

		bbar : new Ext.Toolbar([{
					iconCls : 'refresh',
					text : grooveTranslator.getLangLabel('common-language',
							'refresh'),
					handler : function() {
						backupListGrid.getStore().reload();
					}
				}])
	});

	backupListGrid.setIconClass('tabs');

	backupListGrid.on('click', function(e) {
				if (backupListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delbackupButton').enable();
				} else {
					Ext.getCmp('delbackupButton').disable();
				}
			});

	backupListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return backupListGrid;
}
/**
 * render备份操作
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
function renderBackupList(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:downloadBackup(\'{0}\');">' + grooveTranslator.getLangLabel('common-language',
							'download') + '</a></b>',
					value, record.data.ANNEX_NAME);

	return resultString;
}

/**
 * 下载备份数据文件
 * 
 * @param {}
 *            id 附件ID
 */
function downloadBackup(id) {
	var url = context + "/system/annex.do?method=view&id=" + id;
	document.form1.action = url;
	document.form1.target = 'dldfrm';
	document.form1.submit();
}

/**
 * 删除备份文件
 * 
 * @param {}
 *            grid
 */
function handleDelBackup(grid) {
	var ids = '';
	var names = '';

	var selectedNodes = grid.getSelectionModel().getSelections();

	for (var i = 0; i < selectedNodes.length; i++) {
		if (i < selectedNodes.length - 1) {
			ids += selectedNodes[i].data.XSYSTEM_ANNEX_ID + ',';
			names += selectedNodes[i].data.ANNEX_NAME + ',';
		} else {
			ids += selectedNodes[i].data.XSYSTEM_ANNEX_ID;
			names += selectedNodes[i].data.ANNEX_NAME;
		}
	}

	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel(
					'restore-language', 'delete-prompt'), function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : context + "/system/table.do?method=delbackup",
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
												'restore-language',
												'delete-failure')); //
							} else {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'restore-language',
												'delete-success')); //

								grid.getStore().reload();
								Ext.getCmp('delbackupButton').disable();
							}
						},
						failure : function(response, options) {
							Ext.MessageBox.show({
										title : grooveTranslator.getLangLabel(
												'common-language', 'error'),
										msg : response.responseText,
										icon : Ext.MessageBox.ERROR
									});
						}
					});
				}
			});
}

/**
 * 系统数据恢复
 * 
 * @param {}
 *            id
 * @param {}
 *            name
 */
function handleDataResore(id, name) {
	alert(grooveTranslator.getLangLabel('restore-language', 'restore-alert'));

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
							'restore-language', 'restore-data'),
					inputType : 'file',
					xtype : 'textfield',
					allowBlank : false
				}]
			});

	var win = new Ext.Window({
		title : grooveTranslator.getLangLabel('restore-language',
				'restore-title'),
		width : 500,
		layout : 'fit',
		items : [form],
		plain : true,
		modal : true,
		buttons : [{
			text : grooveTranslator.getLangLabel('restore-language',
					'restore-button'),
			handler : function() {
				if (form.getForm().isValid()) {
					Ext.MessageBox.confirm(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('restore-language',
									'restore-prompt'), function(btn) {
								if (btn == 'yes') {
									Ext.MessageBox.wait(grooveTranslator
											.getLangLabel('common-language',
													'submit-loading'));

									form.getForm().submit({
										url : context
												+ '/system/table.do?method=restore',
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
																			'restore-language',
																			'restore-success')); //
											win.close();
											win = null;
										},
										failure : function(response, options) {
											Ext.MessageBox.show({
												title : grooveTranslator
														.getLangLabel(
																'common-language',
																'error'),
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