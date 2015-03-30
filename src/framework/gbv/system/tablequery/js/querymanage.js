document.write("<script src=\"" + context
		+ "/system/tablequery/js/querylistformcmp.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/tablequery/js/querylist4extG.js\"></script>");

function tableQueryList(tabid) {
	var store = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'tableList',
				fields : ['id', 'name', 'desc', 'purview', 'check', 'fileName',
						'tableNames', 'xmlString'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/tableqm.do?method=list'
						})
			});

	var grid = new Ext.grid.GridPanel({
		id : tabid,
		store : store,
		closable : true,
		columns : [{
					header : 'Unique identification',
					width : 100,
					sortable : true,
					dataIndex : 'id',
					renderer : rendertablequery
				}, {
					header : 'Theme',
					width : 100,
					sortable : true,
					dataIndex : 'name'
				}, {
					header : 'Instructions',
					width : 100,
					sortable : true,
					dataIndex : 'desc'
				}, {
					header : 'Data table',
					width : 100,
					sortable : false,
					dataIndex : 'tableNames'
				}, {
					header : 'Permissions',
					width : 50,
					sortable : false,
					dataIndex : 'purview'
				}, {
					header : 'Choose',
					width : 50,
					sortable : false,
					dataIndex : 'check'
				}, {
					header : 'Configuration file',
					width : 50,
					sortable : false,
					dataIndex : 'fileName'
				}, {
					header : '&nbsp;',
					width : 50,
					sortable : true,
					dataIndex : 'id',
					renderer : renderTQtest
				}],
		stripeRows : true,
		autoExpandColumn : 'id',
		title : 'Table query definition list',
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
						iconCls : 'addtq',
						text : 'Single table query definition',
						handler : function() {
							neutablequery('single');
						}
					}, {
						iconCls : 'addtq',
						text : 'Multi-table query definition',
						handler : function() {
							neutablequery('multi');
						}
					}, '-', {
						id : 'delTQButton',
						iconCls : 'deltq',
						text : 'Delete query',
						disabled : true,
						handler : function() {
							if (grid.getSelectionModel().hasSelection()) {
								Ext.MessageBox.confirm('Hint', 'To delete query table definition?',
										function(btn) {
											if (btn == 'yes') {
												var ids = "";
												var selectedNodes = grid
														.getSelectionModel()
														.getSelections();
												for (var i = 0; i < selectedNodes.length; i++) {
													if (i < selectedNodes.length
															- 1) {
														ids += selectedNodes[i].data.id
																+ ",";
													} else {
														ids += selectedNodes[i].data.id;
													}
												}

												Ext.Ajax.request({
													url : context
															+ "/system/tableqm.do?method=delete",
													method : 'POST',
													async : false,
													params : {
														ids : ids
													},
													success : function(
															response, options) {
														var o = Ext.util.JSON
																.decode(response.responseText);
														if (!o.success) {
															Ext.Msg
																	.alert(
																			'Hint',
																			'Delete query table definition failed!');
														} else {
															Ext.Msg
																	.alert(
																			'Hint',
																			'Table query definition was removed successfully!');
															grid.getStore()
																	.reload();
														}
													}
												})
											}

										});
							} else {
								Ext.Msg.alert('Hint', 'Please choose to delete the form object!');
							}
						}
					}]
		}),
		bbar : new Ext.Toolbar([{
					iconCls : 'refresh',
					text : 'Refresh',
					handler : function() {
						grid.getStore().reload();
					}
				}])
	});

	grid.on('click', function(e) {
				if (grid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delTQButton').enable();
				} else {
					Ext.getCmp('delTQButton').disable();
				}
			});

	grid.setIconClass('tabs');

	store.load({
				params : {
					start : 0,
					limit : 15
				}
			});

	return grid;
}

/**
 * 新建表查询定义
 */
function neutablequery(tp) {
	var defaultXMLString = '';

	if (tp == 'single') {
		defaultXMLString = '&lt;query ID=""&gt;<BR>'
				+ '&lt;name&gt;&lt;/name&gt;<BR>'
				+ '&lt;table&gt;&lt;/table&gt;<BR>'
				+ '&lt;jsurl&gt;&lt;/jsurl&gt;<BR>'
				+ '&lt;cssurl&gt;&lt;/cssurl&gt;<BR>'
				+ '&lt;desc&gt;&lt;/desc&gt;<BR>'
				+ '&lt;showchk&gt;&lt;/showchk&gt;<BR>'
				+ '&lt;purview&gt;&lt;/purview&gt;<BR>'
				+ '&lt;purviewRole&gt;&lt;/purviewRole&gt;<BR>'
				+ '&lt;query-item&gt;<BR>'
				+ '&lt;item name="" label="" tableName="" type="" param="" mode="" idx=""/&gt;<BR>'
				+ '&lt;/query-item&gt;<BR>'
				+ '&lt;result-item&gt;<BR>'
				+ '&lt;item name="" label="" tableName="" idx=""/&gt;<BR>'
				+ '&lt;item name="" label="" tableName="" show="-1" idx=""/&gt;<BR>'
				+ '&lt;item name="" label="" alien="1" idx=""/&gt;<BR>'
				+ '&lt;/result-item&gt;' + '&lt;restraint-item&gt;<BR>'
				+ '&lt;item name="" tableName="" mode="" param=""/&gt;<BR>'
				+ '&lt;/restraint-item&gt;' + '&lt;orderby-item&gt;<BR>'
				+ '&lt;item name="" tableName="" mode=""/&gt;<BR>'
				+ '&lt;/orderby-item&gt;<BR>' + '&lt;/query&gt;';
	} else if (tp == 'multi') {
		defaultXMLString = '&lt;query ID=""&gt;<BR>'
				+ '&lt;name&gt;&lt;/name&gt;<BR>'
				+ '&lt;table&gt;&lt;/table&gt;<BR>'
				+ '&lt;jsurl&gt;&lt;/jsurl&gt;<BR>'
				+ '&lt;cssurl&gt;&lt;/cssurl&gt;<BR>'
				+ '&lt;desc&gt;&lt;/desc&gt;<BR>'
				+ '&lt;showchk&gt;&lt;/showchk&gt;<BR>'
				+ '&lt;purview&gt;&lt;/purview&gt;<BR>'
				+ '&lt;purviewRole&gt;&lt;/purviewRole&gt;<BR>'
				+ '&lt;relate-item&gt;<BR>'
				+ '&lt;leftitem tableName="" name=""&gt;&lt;/leftitem&gt;<BR>'
				+ '&lt;rightitem tableName="" name=""&gt;&lt;/rightitem&gt;<BR>'
				+ '&lt;/relate-item&gt;<BR>'
				+ '&lt;query-item&gt;<BR>'
				+ '&lt;item name="" label="" tableName="" type="" param="" mode="" idx=""/&gt;<BR>'
				+ '&lt;/query-item&gt;<BR>'
				+ '&lt;result-item&gt;<BR>'
				+ '&lt;item name="" label="" tableName="" idx=""/&gt;<BR>'
				+ '&lt;item name="" label="" tableName="" show="-1" idx=""/&gt;<BR>'
				+ '&lt;item name="" label="" alien="1" idx=""/&gt;<BR>'
				+ '&lt;/result-item&gt;' + '&lt;restraint-item&gt;<BR>'
				+ '&lt;item name="" tableName="" mode="" param=""/&gt;<BR>'
				+ '&lt;/restraint-item&gt;' + '&lt;orderby-item&gt;<BR>'
				+ '&lt;item name="" tableName="" mode=""/&gt;<BR>'
				+ '&lt;/orderby-item&gt;<BR>' + '&lt;/query&gt;';
	}

	var store = new Ext.data.Store({
				reader : new Ext.data.ArrayReader({}, [ // 如何解析
						{
									name : 'fid'
								}, {
									name : 'fname'
								}])

			});
	store.proxy = new Ext.data.ScriptTagProxy({
				url : context + '/system/tableqm.do?method=neu'
			});

	store.load();

	var combo = new Ext.form.ComboBox({
				name : 'fname',
				store : store,
				fieldLabel : 'Configuration file',
				displayField : 'fname',
				valueField : 'fid',
				triggerAction : 'all',
				editable : true,
				width : 600,
				allowBlank : false,
				emptyText : 'Select table query configuration file...'
			});

	var editForm = new Ext.FormPanel({
				labelWidth : 150, // label settings here cascade
				// unless
				// overridden
				labelAlign : 'top',
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				defaults : {
					width : 500
				},
				defaultType : 'textfield',

				items : [combo, {
							fieldLabel : 'XML Configuration Scripting',
							xtype : 'textarea',
							value : '',
							height : 400,
							id : 'xmlString',
							name : 'xmlString'
						}]
			});

	//Ext.getCmp('xmlString').setValue(defaultXMLString);

	var editWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				closable : false,
				width : 650,
				height : 500,
				title : 'Table query definition',
				// closeAction : 'close',
				plain : true,
				// maximizable : true,
				plain : true,
				modal : true,
				// tbar : ['-', dateBtn, '-', typeBtn],
				items : [editForm],
				buttons : [{
					text : 'Confirm',
					id : 'tqupdatebut',
					handler : function() {
						if (editForm.getForm().isValid()) {

							Ext.MessageBox.wait('Submission process...');

							editForm.getForm().submit({
								url : context
										+ '/system/tableqm.do?method=save',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									Ext.Msg.alert('Hint', 'Submitted successfully saved!');

									editWin.close();
									editWin = null;

									Ext.getCmp('tab_querylist').getStore()
											.reload();
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									Ext.MessageBox.show({
												title : 'Submitted to save failed',
												msg : action.result.msg,
												icon : Ext.MessageBox.ERROR
											});
								}
							});
						}
					}
				}, {
					text : 'Cancel',
					handler : function() {
						editWin.close();
						editWin = null;
					}
				}]
			});

	editWin.show(this);
}

function rendertablequery(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:edittablequery(\'{0}\');">{0}</a></b>',
					value);

	return resultString;
}

/**
 * 编辑表查询配置信息
 * 
 * @param {}
 *            id 表查询id
 * @param {}
 *            xmlString 表查询配置内容
 */
function edittablequery(id, xmlString) {
	var editForm = new Ext.FormPanel({
				labelWidth : 150, // label settings here cascade
				// unless
				// overridden
				labelAlign : 'top',
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				defaults : {
					width : 500
				},
				defaultType : 'textfield',

				items : [{
							xtype : 'hidden',
							name : 'id',
							id : 'id',
							value : id
						}, {
							fieldLabel : 'XML Configuration Scripting',
							xtype : 'htmleditor',
							enableAlignments : false,
							enableColors : false,
							enableFont : false,
							enableFontSize : false,
							enableLinks : false,
							enableFormat : false,
							enableLists : false,
							enableSourceEdit : false,
							allowBlank : false,
							anchor : '98%',
							height : 400,
							id : 'xmlString',
							name : 'xmlString'
						}]
			});

	editForm.getForm().load({
				url : context + '/system/tableqm.do?method=edit',
				params : {
					id : id
				},
				success : function(form, action) {
				},
				failure : function(form, action) {
					Ext.Msg.alert('Initialize the query failed configuration information');
				}
			});

	var editWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				closable : false,
				width : 650,
				height : 500,
				title : 'Table query editor configuration information',
				// closeAction : 'close',
				plain : true,
				// maximizable : true,
				plain : true,
				modal : true,
				// tbar : ['-', dateBtn, '-', typeBtn],
				items : [editForm],
				buttons : [{
					text : 'Confirm',
					id : 'tqupdatebut',
					handler : function() {
						if (editForm.getForm().isValid()) {

							Ext.MessageBox.wait('Submission process...');

							editForm.getForm().submit({
								url : context
										+ '/system/tableqm.do?method=update',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									Ext.Msg.alert('Hint', 'Submitted successfully saved!');

									editWin.close();
									editWin = null;

									Ext.getCmp('tab_querylist').getStore()
											.reload();
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									Ext.MessageBox.show({
												title : 'Submitted to save failed',
												msg : action.result.msg,
												icon : Ext.MessageBox.ERROR
											});
								}
							});
						}
					}
				}, {
					text : 'Cancel',
					handler : function() {
						editWin.close();
						editWin = null;
					}
				}]
			});

	editWin.show(this);
}

/**
 * render table-query test
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
function renderTQtest(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:testTQList(\'{1}\');">Test</a></b>',
					record.data.name, record.data.id);

	return resultString;
}

function testTQList(id) {
	initTQExtListG(id, function(grid) {
				var testWin = new Ext.Window({
							renderTo : Ext.getBody(),
							layout : 'fit',
							closable : false,
							width : 650,
							height : 500,
							title : 'Table query test',
							// closeAction : 'close',
							plain : true,
							// maximizable : true,
							plain : true,
							modal : true,
							// tbar : ['-', dateBtn, '-', typeBtn],
							items : [grid],
							buttons : [{
										text : 'Close',
										handler : function() {
											testWin.close();
											testWin = null;
										}
									}]
						});

				testWin.show(this);
			}, null, null, null)
}