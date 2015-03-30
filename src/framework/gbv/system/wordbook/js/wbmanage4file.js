/**
 * 对指定的数据字典文件进行维护管理
 * 
 * @param {}
 *            fileName 数据字典文件
 */
function initWordbookGrid(fileName) {
	var _fileName = (fileName == null) ? '' : fileName;

	/* 组级别数据store */
	var wbtypestore = new Ext.data.Store({
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/wb.do?method=storetype&fileName='
									+ _fileName
						}), // 数据源
				reader : new Ext.data.ArrayReader({}, [ // 如何解析
						{
									name : 'wbtypeid'
								}, {
									name : 'wbtypename'
								}])

			});

	var wbtypecombobox = new Ext.form.ComboBox({
				id : 'wbtypecombo',
				name : 'wbtypecombo',
				fieldLabel : 'wbtypecomboLabel',
				xtype : 'combo',
				selectOnFocus : true,
				emptyText : '请选择字典类别...',
				forceSelection : true,
				triggerAction : 'all',
				valueField : 'wbtypeid', // 提交表单时，下拉框的值
				displayField : 'wbtypename', // 显示在页面上下拉框的值
				editable : false,
				width : 300,
				store : wbtypestore,
				listeners : {
					select : function(combo, record, index) {
						// alert(record.data.id);
						// alert(record.data.name);
						/* 设置combo选择项真正对应的值 */
						// alert(record.data.wbtypeid);
						nowwbtype = record.data.wbtypeid;
						nowwbtpindex = index;

						gridStore.proxy = new Ext.data.ScriptTagProxy({
									url : context
											+ '/system/wb.do?method=store&type='
											+ record.data.wbtypeid
								});
						gridStore.load();
						// Ext.getCmp('savewbitem').disable();
						Ext.getCmp('delwbtype').enable();
						Ext.getCmp('addwbitem').enable();
						// Ext.getCmp('delwbtype').enable();
					}
				}
			});

	// create the data store
	var gridStore = new Ext.data.Store({
				reader : new Ext.data.ArrayReader({}, [ // 如何解析
						{
									name : 'id'
								}, {
									name : 'name'
								}, {
									name : 'desc'
								}, {
									name : 'type'
								}, {
									name : 'idx'
								}])

			});

	// Column Model shortcut array
	var cols = [{
				header : '主键',
				width : 150,
				sortable : true,
				dataIndex : 'id',
				editor : new Ext.form.TextField({
							allowBlank : false
						})
			}, {
				header : '值',
				width : 150,
				sortable : true,
				dataIndex : 'name',
				editor : new Ext.form.TextArea({})
			}, {
				header : '排序',
				width : 100,
				sortable : true,
				dataIndex : 'idx',
				editor : new Ext.form.TextField({})
			}, {
				header : '',
				align : 'center',
				width : 70,
				sortable : true,
				dataIndex : 'type',
				renderer : renderWordbookRow
			}];

	// declare the source Grid
	var grid = new Ext.grid.EditorGridPanel({
				id : 'wbtypegrid',
				ddGroup : 'gridDDGroup',
				store : gridStore,
				border : false,
				columns : cols,
				enableDragDrop : false,
				stripeRows : true,
				autoExpandColumn : 'name',
				width : 400,
				region : 'west',
				title : '字典列表',
				viewConfig : {
					forceFit : true
				},
				clicksToEdit : 1
			});

	grid.on('click', function(e) {
				var t = e.getTarget();
				var v = this.view;
				var rowIdx = v.findRowIndex(t);
				var record = this.getStore().getAt(rowIdx);

				if (record) {
					// Ext.getCmp('savewbitem').enable();
				}
			});

	// Simple 'border layout' panel to house both grids
	var wblistPanel = new Ext.Panel({
		id : 'wblist',
		title : '数据字典列表',
		layout : 'fit',
		border : false,
		closable : false,
		items : [grid],
		tbar : new Ext.Toolbar({
			id : 'wbtoolbar',
			autoWidth : true,
			autoShow : true,
			items : ['字典数据类别', wbtypecombobox, '-', {
				id : "addwbtype",
				text : "增加类别",
				tooltip : '增加字典类别',
				iconCls : 'addwbtype',
				handler : function() {
					var addwbtypeForm = new Ext.FormPanel({
								id : 'addwbtypeForm',
								labelWidth : 75, // label settings
								// here cascade
								// unless
								// overridden
								frame : false,
								bodyStyle : 'padding:5px 5px 0',
								width : 350,
								defaults : {
									width : 230
								},
								defaultType : 'textfield',

								items : [{
											fieldLabel : '类别名称',
											id : 'wbtype',
											name : 'wbtype',
											vtype : 'alphanum',
											emptyText : '请定义类别名称(注意:英文唯一标识)',
											allowBlank : false
										}, {
											fieldLabel : '类别描述',
											id : 'wbtypename',
											name : 'wbtypename',
											emptyText : '请定义类别描述(通常为中文描述)',
											allowBlank : false
										}]
							});

					var addwbtypeWin = new Ext.Window({
						id : 'addwbtypeWin',
						renderTo : Ext.getBody(),
						layout : 'fit',
						closable : false,
						width : 400,
						height : 150,
						title : '增加数据字典类别',
						// closeAction : 'close',
						plain : true,
						// maximizable : true,
						plain : true,
						modal : true,
						// tbar : ['-', dateBtn, '-', typeBtn],
						items : [addwbtypeForm],
						buttons : [{
							text : '确定',
							handler : function() {
								if (Ext.getCmp("addwbtypeForm").getForm()
										.isValid()) {

									Ext.MessageBox.wait('提交保存过程中...');

									Ext.getCmp("addwbtypeForm").getForm()
											.submit({
												url : context
														+ '/system/wb.do?method=savetype',
												params : {
													fileName : _fileName
												},
												method : 'POST',
												success : function(form, action) {
													Ext.MessageBox.hide();
													Ext.Msg.alert('提示',
															'已成功添加新的数据字典类别！');

													var Plant = Ext
															.getCmp('wbtypecombo')
															.getStore().recordType;
													var p = new Plant({
														wbtypeid : action.result.data.wbtypeid,
														wbtypename : action.result.data.wbtypename
																+ ' {'
																+ action.result.data.wbtypeid
																+ '}'
													});

													Ext.getCmp('wbtypecombo')
															.getStore().add(p);

													Ext.getCmp('addwbtypeWin')
															.close();
												},
												failure : function(form, action) {
													Ext.MessageBox.hide();
													if (action.result.errCode == '-1') {
														Ext.Msg
																.alert('提示',
																		'提交保存数据字典类别发生错误！');
													} else if (action.result.errCode == '-2') {
														Ext.Msg
																.alert('提示',
																		'数据字典类别重复，请重新定义！');
													}
												}
											});
								}

							}
						}, {
							text : '取消',
							handler : function() {
								addwbtypeWin.close();
								addwbtypeWin = null;
							}
						}]
					});

					addwbtypeWin.show(this);
				}
			}, {
				id : "delwbtype",
				text : "删除类别",
				disabled : true,
				tooltip : '删除字典类别定义',
				iconCls : 'delwbtype',
				handler : function() {
					Ext.MessageBox.confirm('提示', '确定删除？', function(btn) {
						if (btn == 'yes') {

							Ext.Ajax.request({
								url : context
										+ "/system/wb.do?method=deletetype",
								method : 'POST',
								async : false,
								params : {
									'wbtype' : Ext.getCmp('wbtypecombo')
											.getValue()
								},
								success : function(response, options) {
									var o = Ext.util.JSON
											.decode(response.responseText);
									if (!o.success) {
										Ext.Msg.alert('提示', '删除字典数据类别失败！');
									} else {
										Ext.Msg.alert('提示', '已成功删除字典数据类别！');

										var record = Ext.getCmp('wbtypecombo')
												.getStore().getAt(nowwbtpindex);

										Ext.getCmp('wbtypecombo').getStore()
												.remove(record);

										Ext.getCmp('wbtypecombo')
												.setRawValue('请选择字典类别...');

										Ext.getCmp('delwbtype').disable();

										Ext.getCmp('wbtypegrid').getStore()
												.removeAll();

										Ext.getCmp('addwbitem').disable();
									}
								}
							});
						}
					})
				}
			}, '-', {
				id : "addwbitem",
				text : "增加字典项",
				disabled : true,
				iconCls : 'addwbitem',
				tooltip : '在当前字典类别中定义新的字典项',
				handler : function() {
					// purviewListGrid
					var Plant = Ext.getCmp('wbtypegrid').getStore().recordType;
					var p = new Plant({});
					Ext.getCmp('wbtypegrid').stopEditing();
					Ext.getCmp('wbtypegrid').getStore().add(p);

					Ext.getCmp('wbtypegrid').startEditing(
							Ext.getCmp('wbtypegrid').getStore().getCount() - 1,
							0);
				}
			}]
		})
	});

	wblistPanel.setIconClass('tabs');

	var tabPanel = {
		xtype : 'tabpanel',
		region : 'center',
		activeTab : 0,
		resizeTabs : true,
		border : false,
		deferredRender : false,
		enableTabScroll : true,
		items : [wblistPanel]
	};

	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [tabPanel]
			});
}

/**
 * 字典项列表行操作render
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
function renderWordbookRow(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	var resultString = String
			.format(
					'<a href="javascript:void(0);" onclick="javascript:insertWordbookItem(\'{0}\', \'{1}\')">保存</a>&nbsp;<a href="javascript:void(0);" onclick="javascript:deleteWordbookItem(\'{0}\', \'{1}\')">删除</a>',
					Ext.getCmp('wbtypecombo').getValue(), rowIndex);

	return resultString;
}

/**
 * 增加数据字典项
 * 
 * @param {}
 *            wbtype 数据字典类型
 * @param {}
 *            rowIdx item行数
 */
function insertWordbookItem(wbtype, rowIdx) {
	var index = Ext.getCmp('wbtypegrid').getSelectionModel().getSelectedCell();

	var record = Ext.getCmp('wbtypegrid').getStore().getAt(index[0]);

	if (record.data.id == null || trim(record.data.id) == '') {
		Ext.Msg.alert('提示', '请定义数据字典项ID！');
		return;
	}

	if (record.data.name == null || trim(record.data.name) == '') {
		Ext.Msg.alert('提示', '请定义数据字典项名称！');
		return;
	}

	Ext.MessageBox.wait('提交保存过程中...');

	Ext.Ajax.request({
				url : context + '/system/wb.do?method=updateitem',
				method : 'POST',
				params : {
					'wbtype' : wbtype,
					'itemid' : record.data.id,
					'itemvalue' : record.data.name,
					'itemidx' : record.data.idx
				},
				scope : this,
				async : false,
				success : function(response) {
					Ext.MessageBox.hide();
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert('提示', '保存字典数据项失败！');
					} else {
						Ext.Msg.alert('提示', '已成功保存字典数据项！');
						Ext.getCmp('wbtypegrid').getStore().commitChanges();
					}
				}

			});
}

/**
 * 删除数据字典项
 * 
 * @param {}
 *            wbtype 数据字典类别
 * @param {}
 *            rowIdx
 */
function deleteWordbookItem(wbtype, rowIdx) {
	Ext.MessageBox.confirm('提示', '确定删除？', function(btn) {
				if (btn == 'yes') {
					var index = Ext.getCmp('wbtypegrid').getSelectionModel()
							.getSelectedCell();

					var record = Ext.getCmp('wbtypegrid').getStore()
							.getAt(index[0]);

					if (record.data.id) {
						Ext.Ajax.request({
									url : context
											+ "/system/wb.do?method=deleteitem",
									method : 'POST',
									async : false,
									params : {
										'wbtype' : wbtype,
										'itemid' : record.data.id
									},
									success : function(response, options) {
										var o = Ext.util.JSON
												.decode(response.responseText);
										if (!o.success) {
											Ext.Msg.alert('提示', '删除字典数据项失败！');
										} else {
											Ext.Msg.alert('提示', '已成功删除字典数据项！');
											Ext.getCmp('wbtypegrid').getStore()
													.remove(record);
										}
									}
								})
					} else {
						Ext.getCmp('wbtypegrid').getStore().remove(record);
					}
				}
			});
}