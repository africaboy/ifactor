/**
 * 系统注册表列表
 * 
 * @param {}
 *            tabid
 */
function tableList(tabid) {
	var tableStore = new Ext.data.Store({
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/table.do?method=files'
						}), // 数据源
				reader : new Ext.data.ArrayReader({}, [ // 如何解析
						{
									name : 'fileName'
								}, {
									name : 'fileDesc'
								}])

			});

	var tablesCombobox = new Ext.form.ComboBox({
				id : 'tablesCombobox',
				name : 'tablesCombobox',
				xtype : 'combo',
				selectOnFocus : true,
				emptyText : 'Please Select The Data Table Registration File...',
				forceSelection : true,
				triggerAction : 'all',
				valueField : 'fileName', // 提交表单时，下拉框的值
				displayField : 'fileDesc', // 显示在页面上下拉框的值
				editable : false,
				width : 300,
				store : tableStore,
				listeners : {
					select : function(combo, record, index) {
						// alert(record.data.id);
						// alert(record.data.name);
						/* 设置combo选择项真正对应的值 */
						// alert(record.data.wbtypeid);
						var fileName = record.data.fileName;

						if (fileName.toLowerCase().indexOf('system_') > -1) {
							Ext.getCmp('addtable').disable();
							Ext.getCmp('uploadtable').disable();
						} else {
							Ext.getCmp('addtable').enable();
							Ext.getCmp('uploadtable').enable();
						}

						Ext.getCmp('deltable').disable();

						tableListStore.proxy = new Ext.data.ScriptTagProxy({
									url : context
											+ '/system/table.do?method=list&file='
											+ fileName
								});
						tableListStore.load();

					}
				}
			});

	var tableListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'tableList',
				fields : ['name', 'fname', 'memo', 'file', 'ds', 'type'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/table.do?method=list'
						})
			});

	var tableListGrid = new Ext.grid.GridPanel({
		id : tabid,
		store : tableListStore,
		closable : true,
		columns : [{
					header : 'Table Name',
					width : 150,
					sortable : true,
					dataIndex : 'name',
					renderer : renderTableName
				}, {
					header : 'Table Description',
					width : 150,
					sortable : true,
					dataIndex : 'memo'
				}, {
					header : 'File Belongs',
					width : 150,
					sortable : false,
					dataIndex : 'file'
				}, {
					header : 'Data Sources',
					width : 150,
					sortable : false,
					dataIndex : 'ds'
				}, {
					header : 'Type',
					width : 150,
					sortable : false,
					dataIndex : 'type',
					renderer : function(value, cellmeta, record, rowIndex,
							columnIndex, store) {
						if (value == -2) {
							return 'Backup Table';
						} else if (value == -1) {
							return 'System Table';
						} else if (value > -1) {
							return 'Application Table'
						}

						return value;
					}
				}],
		stripeRows : true,
		autoExpandColumn : 'name',
		title : 'Data Table List',
		border : false,
		viewConfig : {
			forceFit : true
		},
		// config options for stateful behavior
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : "Loading Data,Please Wait..."
		},
		tbar : new Ext.Toolbar({
			autoWidth : true,
			autoShow : true,
			items : ['Table Registration File', tablesCombobox, '-', {
						id : 'addtable',
						text : 'Added Data Table',
						tooltip : 'New Data Table Registration Information',
						disabled : true,
						iconCls : 'addtable',
						handler : function() {
							edittable();
						}
					}, {
						id : 'uploadtable',
						text : 'Upload Data Table',
						tooltip : 'Batch Upload Data Table Registration Information',
						disabled : true,
						iconCls : 'uploadtable',
						handler : function() {
							var form = new Ext.FormPanel({
										frame : true,
										border : false,
										margins : '1 1 1 1',
										labelAlign : 'right',
										labelWidth : 100,
										height : 50,
										fileUpload : true,
										waitMsgTarget : true,
										defaults : {
											width : 350
										},
										defaultType : 'textfield',

										items : [{
													name : 'file1',
													fieldLabel : 'Data Table Registration File',
													inputType : 'file',
													xtype : 'textfield',
													allowBlank : false
												}]
									});

							var win = new Ext.Window({
								title : 'Batch Upload Data Table',
								width : 500,
								layout : 'fit',
								items : [form],
								plain : true,
								modal : true,
								buttons : [{
									text : ' Submit ',
									handler : function() {
										if (form.getForm().isValid()) {
											Ext.MessageBox.confirm('Data Table Uploading Hint',
													'Determine Upload', function(btn) {
														if (btn == 'yes') {
															Ext.MessageBox
																	.wait('Data Upload Process...');

															form.getForm()
																	.submit({
																		url : context
																				+ '/system/table.do?method=upload',
																		method : 'POST',
																		params : {
																			fileName : Ext
																					.getCmp("tablesCombobox")
																					.getValue()
																		},
																		success : function(
																				response,
																				options) {
																			var o = Ext.util.JSON
																					.decode(response.responseText);
																			Ext.Msg
																					.alert(
																							'Hint',
																							'Data Table Uploaded Successfully'); //
																			tableListGrid
																					.getStore()
																					.reload();
																		},
																		failure : function(
																				response,
																				options) {
																			Ext.MessageBox
																					.show(
																							{
																								title : 'Data Table Uploaded Failed',
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
					}, {
						id : "deltable",
						text : "Delete Data Table",
						disabled : true,
						tooltip : 'Deleting Data Table Registration Information',
						iconCls : 'deltable',
						handler : function() {
							Ext.MessageBox
									.confirm(
											'Hint',
											'To Ensure Data Security,Delete Data Table Operation Will Only Delete The Data Table Registration Information,Not Really Delete Data From A Database Table.',
											function(btn) {
												if (btn == 'yes') {
													var tableNames = '';
													var dsNames = ''
													var selectedNodes = tableListGrid
															.getSelectionModel()
															.getSelections();
													for (var i = 0; i < selectedNodes.length; i++) {
														if (i < selectedNodes.length
																- 1) {
															tableNames += selectedNodes[i].data.name
																	+ ',';
															dsNames += selectedNodes[i].data.ds
																	+ ',';
														} else {
															tableNames += selectedNodes[i].data.name;
															dsNames += selectedNodes[i].data.ds;
														}
													}

													Ext.MessageBox
															.wait('Data Table Deletion Process...');

													Ext.Ajax.request({
														url : context
																+ "/system/table.do?method=delete",
														method : 'POST',
														async : false,
														params : {
															tableNames : tableNames,
															dsNames : dsNames
														},
														success : function(
																response,
																options) {
															var o = Ext.util.JSON
																	.decode(response.responseText);
															if (!o.success) {
																Ext.Msg
																		.alert(
																				'Hint',
																				'Delete Abnormal Data Table');
															} else {
																Ext.Msg
																		.alert(
																				'Hint',
																				'Successfully Deleted Data Table');
																tableListGrid
																		.getStore()
																		.reload();
															}
														}
													})
												}
											});
						}
					}]
		}),
		bbar : new Ext.Toolbar([{
					iconCls : 'refresh',
					text : 'Refresh',
					handler : function() {
						tableListGrid.getStore().reload();
					}
				}])
	});

	tableListGrid.setIconClass('tabs');

	tableListGrid.on('rowclick', function(grid, rowIndex) {
				if (Ext.getCmp("tablesCombobox").getValue().toLowerCase()
						.indexOf('system_') == -1) {
					if (tableListGrid.getSelectionModel().hasSelection()) {
						Ext.getCmp('deltable').enable();
					} else {
						Ext.getCmp('deltable').disable();
					}
				}
			});

	tableListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return tableListGrid;
};

function renderTableName(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString;

	// 类型为不可修改
	if (record.data['type'] == '-1') {
		resultString = String
				.format(
						'<b><a href="javascript:void(0);" onclick="javascript:viewtable(\'{0}\', \'{1}\', \'{2}\', \'{3}\', \'{4}\');">{0}</a></b>',
						value, record.data.fname, record.data.type,
						record.data.memo, record.data.ds);
	} else {
		resultString = String
				.format(
						'<b><a href="javascript:void(0);" onclick="javascript:edittable(\'{0}\', \'{1}\', \'{2}\', \'{3}\', \'{4}\');">{0}</a></b>',
						value, record.data.fname, record.data.type,
						record.data.memo, record.data.ds);
	}

	return resultString;
};

function edittable(name, fname, type, memo, ds) {
	var tableType = getWBComboStore('table-type', '', '_tableType', 'Data Table Type',
			'tableType', 'tableTypeName', '', false);

	var tableForm = new Ext.FormPanel({
				labelWidth : 100, // label
				frame : false,
				region : 'north',
				bodyStyle : 'padding:5px 5px 0',
				height : 150,
				defaults : {
					width : 230
				},
				defaultType : 'textfield',

				items : [{
							fieldLabel : 'Data Table Name',
							name : 'tableName',
							allowBlank : false
						}, {
							fieldLabel : 'Data Table Alias',
							name : 'fakeName'
						}, tableType, {
							fieldLabel : 'Source Name',
							name : 'dataSource'
						}, {
							fieldLabel : 'Description',
							name : 'tableDesc'
						}, {
							id : 'tableType',
							name : 'tableType',
							xtype : 'hidden'
						}, {
							id : 'tableTypeName',
							name : 'tableTypeName',
							xtype : 'hidden'
						}, {
							id : 'otableName',
							name : 'otableName',
							xtype : 'hidden'
						}, {
							id : 'ods',
							name : 'ods',
							xtype : 'hidden'
						}]
			});

	var columnListStore;

	var url = context + '/system/table.do?method=register';

	if (name != null) {
		var typeName = 'Other';

		if (type == -2) {
			typeName = 'Backup Table';
		} else if (type == -1) {
			typeName = 'System Table';
		} else if (type == 0) {
			typeName = 'Application Table';
		}

		tableForm.getForm().load({
					url : context + '/system/result4form.jsp',
					params : {
						tableName : name,
						fakeName : fname,
						dataSource : ds,
						tableType : type,
						tableTypeName : typeName,
						_tableType : typeName,
						tableDesc : memo,
						otableName : name,
						ods : ds
					},
					success : function(form, action) {
						Ext.getCmp('registeTable').setDisabled(false);
					},
					failure : function(form, action) {
						Ext.Msg.alert('Failed To Initialize The Table');
					}
				});

		columnListStore = new Ext.data.JsonStore({
					idProperty : 'id',
					remoteSort : false,
					totalProperty : 'totalCount',
					root : 'columnList',
					fields : ['name', 'fname', 'memo', 'type', 'typeName',
							'notnull', 'length', 'key', 'scale',
							'foreignTable', 'foreignColumn'],

					// load using script tags for cross domain, if the data in
					// on
					// the same domain as
					// this page, an HttpProxy would be better
					proxy : new Ext.data.ScriptTagProxy({
								url : context
										+ '/system/table/columnlist.jsp?tname='
										+ name + "&ds=" + ds
							})
				});

		columnListStore.load({
					params : {
						start : 0,
						limit : 20
					}
				});

		url = context + '/system/table.do?method=reregister';
	} else {
		columnListStore = new Ext.data.Store({
					reader : new Ext.data.ArrayReader({}, ['name', 'fname',
									'memo', 'type', 'notnull', 'typeName',
									'length', 'scale', 'key', 'foreignTable',
									'foreignColumn'])
				});
	}

	var columnListGrid = new Ext.grid.GridPanel({
		id : 'columnListGrid',
		store : columnListStore,
		columns : [{
			header : 'Field Name',
			width : 100,
			sortable : true,
			dataIndex : 'name',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				var resultString = String
						.format(
								'<b><a href="javascript:void(0);" title="Edit" onclick="javascript:editcolumn(\'{0}\', \'{1}\', \'{2}\''
										+ ',\'{3}\', \'{4}\', \'{5}\',\'{6}\', \'{7}\', \'{8}\''
										+ ', \'{9}\', \'{10}\', \'{11}\', \'{12}\', \'{13}\');">'
										+ value + '</a></b>', value,
								record.data.fname, record.data.memo,
								record.data.type, record.data.notnull,
								record.data.notnullname, record.data.typeName,
								record.data.length, record.data.key,
								record.data.keyname, record.data.foreignTable,
								record.data.foreignColumn, rowIndex,
								record.data.scale);

				return resultString;

			}
		}, {
			header : 'Form Name',
			width : 100,
			sortable : true,
			dataIndex : 'fname'
		}, {
			header : 'Field Description',
			width : 100,
			sortable : true,
			dataIndex : 'memo'
		}, {
			header : 'Not Null',
			width : 100,
			sortable : true,
			dataIndex : 'notnull',
			renderer : function(value) {
				if (value == '0') {
					return 'Yes'
				}

				return 'No'
			}
		}, {
			header : 'Type',
			width : 100,
			sortable : true,
			dataIndex : 'typeName'
		}, {
			header : 'Length',
			width : 100,
			sortable : true,
			dataIndex : 'length'
		}, {
			header : 'Scale',
			width : 100,
			sortable : true,
			dataIndex : 'scale'
		}, {
			header : 'Primary Key',
			width : 100,
			sortable : true,
			dataIndex : 'key',
			renderer : function(value) {
				if (value == '0') {
					return 'Yes'
				}

				return 'No'
			}
		}, {
			header : 'Foreign Key Table',
			width : 100,
			sortable : true,
			dataIndex : 'foreignTable'
		}, {
			header : 'Foreign Key Table Primary Key',
			width : 100,
			sortable : true,
			dataIndex : 'foreignColumn'
		}],
		stripeRows : true,
		border : false,
		viewConfig : {
			forceFit : false
		},
		region : 'center',
		// config options for stateful
		// behavior
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : "Loading Data,Please Wait..."
		},
		clicksToEdit : 1,
		tbar : new Ext.Toolbar({
			autoWidth : true,
			autoShow : true,
			items : [{
						text : 'New Field',
						tooltip : 'Add Field Information',
						iconCls : 'addcolumn',
						handler : function() {
							editcolumn();
						}
					}, {
						text : 'Delete Field',
						id : 'removeColumn',
						tooltip : 'Deleting Field Have Been Defined',
						iconCls : 'removecolumn',
						disabled : true,
						handler : function() {
							Ext.MessageBox.confirm('Hint', 'Confirm The Deletion?',
									function(btn) {
										if (btn == 'yes') {
											Ext.getCmp('removeColumn')
													.disable();

											var selectedNodes = Ext
													.getCmp('columnListGrid')
													.getSelectionModel()
													.getSelections();
											for (var i = 0; i < selectedNodes.length; i++) {
												Ext
														.getCmp('columnListGrid')
														.getStore()
														.remove(selectedNodes[i]);
											}

											if (Ext.getCmp('columnListGrid')
													.getStore().getCount() == 0) {
												Ext.getCmp('registeTable')
														.setDisabled(true);
											}
										}
									});
						}
					}]
		})
	});

	columnListGrid.on('rowclick', function(grid, rowIndex) {
				if (columnListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('removeColumn').enable();
				} else {
					Ext.getCmp('removeColumn').disable();
				}
			});

	var win = new Ext.Window({
		title : 'Data Table Registration',
		renderTo : Ext.getBody(),
		layout : 'border',
		closable : true,
		resizable : true,
		maximizable : true,
		width : 700,
		height : 500,
		border : false,
		plain : true,
		modal : true,
		items : [tableForm, columnListGrid],
		buttons : [{
			text : ' OK ',
			id : 'registeTable',
			disabled : true,
			handler : function() {
				if (tableForm.getForm().isValid()) {
					Ext.MessageBox.confirm('Hint', 'Determine Submit', function(btn) {
								if (btn == 'yes') {
									var params = {};
									params.fileName = Ext
											.getCmp("tablesCombobox")
											.getValue();
									params.tableName = tableForm.getForm()
											.findField('tableName').getValue();
									params.fakeName = tableForm.getForm()
											.findField('fakeName').getValue();

									var countP = '';

									for (var i = 0; i < columnListGrid
											.getStore().getCount(); i++) {
										var name = columnListGrid.getStore()
												.getAt(i).get('name');
										var fname = columnListGrid.getStore()
												.getAt(i).get('fname');
										var memo = columnListGrid.getStore()
												.getAt(i).get('memo');
										var type = columnListGrid.getStore()
												.getAt(i).get('type');
										var length = columnListGrid.getStore()
												.getAt(i).get('length');
										var scale = columnListGrid.getStore()
												.getAt(i).get('scale');
										var key = columnListGrid.getStore()
												.getAt(i).get('key');
										var notnull = columnListGrid.getStore()
												.getAt(i).get('notnull');
										var foreignTable = columnListGrid
												.getStore().getAt(i)
												.get('foreignTable');
										var foreignColumn = columnListGrid
												.getStore().getAt(i)
												.get('foreignColumn');

										params['name_' + i] = name;
										params['fname_' + i] = fname;
										params['memo_' + i] = memo;
										params['type_' + i] = type;
										params['length_' + i] = length;
										params['scale_' + i] = scale;
										params['key_' + i] = key;
										params['notnull_' + i] = notnull;
										params['foreignTable_' + i] = foreignTable;
										params['foreignColumn_' + i] = foreignColumn;

										countP += i + ',';
									}

									params.countP = countP;

									Ext.MessageBox.wait('Table Registration Process...');

									Ext.getCmp('registeTable')
											.setDisabled(true);

									tableForm.getForm().submit({
										url : url,
										method : 'POST',
										params : params,
										success : function(form, action) {
											Ext.Msg.alert('Hint', 'Table Registration Is Successful!'); //
											win.close();
											win = null;

											Ext.getCmp('tab_tablelist')
													.getStore().reload();
										},
										failure : function(form, action) {
											Ext.MessageBox.show({
														title : 'Table Registration Failed',
														msg : action.result.errMsg,
														icon : Ext.MessageBox.ERROR
													});

											Ext.getCmp('registeTable')
													.setDisabled(false);
										}
									});
								}
							})
				}
			}
		}, {
			text : ' Cancel ',
			handler : function() {
				win.close();
				win = null;
			}
		}]
	});

	win.show(this);
}

function viewtable(name, fname, type, memo, ds) {

	var tableForm = new Ext.FormPanel({
				labelWidth : 100, // label
				frame : false,
				region : 'north',
				bodyStyle : 'padding:5px 5px 0',
				height : 150,
				defaults : {
					width : 230
				},
				defaultType : 'textfield',

				items : [{
							fieldLabel : 'Data Table Name',
							name : 'tableName',
							allowBlank : false,
							readOnly : true
						}, {
							fieldLabel : 'Data Table Alias',
							name : 'fakeName',
							readOnly : true
						}, {
							fieldLabel : 'Data Table Type',
							name : 'tableTypeName',
							readOnly : true
						}, {
							fieldLabel : 'Source Name',
							name : 'dataSource',
							readOnly : true
						}, {
							fieldLabel : 'Description',
							name : 'tableDesc',
							readOnly : true
						}, {
							id : 'tableType',
							name : 'tableType',
							xtype : 'hidden'
						}, {
							id : 'otableName',
							name : 'otableName',
							xtype : 'hidden'
						}, {
							id : 'ods',
							name : 'ods',
							xtype : 'hidden'
						}]
			});

	var columnListStore;

	var url = context + '/system/table.do?method=register';

	if (name != null) {
		var typeName = 'Other';

		if (type == -2) {
			typeName = 'Backup Table';
		} else if (type == -1) {
			typeName = 'System Table';
		} else if (type == 0) {
			typeName = 'Application Table';
		}

		tableForm.getForm().load({
					url : context + '/system/result4form.jsp',
					params : {
						tableName : name,
						fakeName : fname,
						dataSource : ds,
						tableType : type,
						tableTypeName : typeName,
						_tableType : typeName,
						tableDesc : memo,
						otableName : name,
						ods : ds
					},
					success : function(form, action) {
						
					},
					failure : function(form, action) {
						Ext.Msg.alert('Failed To Initialize The Table');
					}
				});

		columnListStore = new Ext.data.JsonStore({
					idProperty : 'id',
					remoteSort : false,
					totalProperty : 'totalCount',
					root : 'columnList',
					fields : ['name', 'fname', 'memo', 'type', 'typeName',
							'notnull', 'length', 'key', 'scale',
							'foreignTable', 'foreignColumn'],

					// load using script tags for cross domain, if the data in
					// on
					// the same domain as
					// this page, an HttpProxy would be better
					proxy : new Ext.data.ScriptTagProxy({
								url : context
										+ '/system/table/columnlist.jsp?tname='
										+ name + "&ds=" + ds
							})
				});

		columnListStore.load({
					params : {
						start : 0,
						limit : 20
					}
				});

		url = context + '/system/table.do?method=reregister';
	} else {
		columnListStore = new Ext.data.Store({
					reader : new Ext.data.ArrayReader({}, ['name', 'fname',
									'memo', 'type', 'notnull', 'typeName',
									'length', 'scale', 'key', 'foreignTable',
									'foreignColumn'])
				});
	}

	var columnListGrid = new Ext.grid.GridPanel({
				id : 'columnListGrid',
				store : columnListStore,
				columns : [{
							header : 'Field Name',
							width : 100,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : 'Form Name',
							width : 100,
							sortable : true,
							dataIndex : 'fname'
						}, {
							header : 'Field Description',
							width : 100,
							sortable : true,
							dataIndex : 'memo'
						}, {
							header : 'Not Null',
							width : 100,
							sortable : true,
							dataIndex : 'notnull',
							renderer : function(value) {
								if (value == '0') {
									return 'Yes'
								}

								return 'No'
							}
						}, {
							header : 'Type',
							width : 100,
							sortable : true,
							dataIndex : 'typeName'
						}, {
							header : 'Length',
							width : 100,
							sortable : true,
							dataIndex : 'length'
						}, {
							header : 'Scale',
							width : 100,
							sortable : true,
							dataIndex : 'scale'
						}, {
							header : 'Primary Key',
							width : 100,
							sortable : true,
							dataIndex : 'key',
							renderer : function(value) {
								if (value == '0') {
									return 'Yes'
								}

								return 'No'
							}
						}, {
							header : 'Foreign Key Table',
							width : 100,
							sortable : true,
							dataIndex : 'foreignTable'
						}, {
							header : 'Foreign Key Table Primary Key',
							width : 100,
							sortable : true,
							dataIndex : 'foreignColumn'
						}],
				stripeRows : true,
				border : false,
				viewConfig : {
					forceFit : false
				},
				region : 'center',
				// config options for stateful
				// behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Loading Data,Please Wait..."
				},
				clicksToEdit : 1
			});

	columnListGrid.on('rowclick', function(grid, rowIndex) {
				if (columnListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('removeColumn').enable();
				} else {
					Ext.getCmp('removeColumn').disable();
				}
			});

	var win = new Ext.Window({
				title : 'Data Table Structure',
				renderTo : Ext.getBody(),
				layout : 'border',
				closable : true,
				resizable : true,
				maximizable : true,
				width : 700,
				height : 500,
				border : false,
				plain : true,
				modal : true,
				items : [tableForm, columnListGrid]
			});

	win.show(this);
}

/**
 * 存在重复的字段定义
 * 
 * @param {}
 *            grid 字段列表
 * @param {}
 *            columnName 字段名称
 * @param {}
 *            exceptIndex 例外index
 * @return {}
 */
function hasColumn(grid, columnName, exceptIndex) {
	var rnt = false;
	for (var i = 0; i < grid.getStore().getCount(); i++) {
		if ((exceptIndex == null && grid.getStore().getAt(i).get('name') == columnName)
				|| ((exceptIndex != null && i != exceptIndex) && grid
						.getStore().getAt(i).get('name') == columnName)) {
			rnt = true;
			Ext.MessageBox.alert('Hint', 'Duplicate Field[' + columnName + ']Defined');
			break;
		}
	}

	return rnt;
}