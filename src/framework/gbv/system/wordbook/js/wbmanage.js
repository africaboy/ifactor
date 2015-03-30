var wordbookListGrid;
var wordbookListArea;
var wordbookListTab;
var nowwbtype;
var nowwbtpindex;

/**
 * 数据字典列表
 * 
 * @param {}
 *            tabid
 */
function wordbookList(tabid) {
	/* 组级别数据store */
	var wbtypestore = new Ext.data.Store({
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/wb.do?method=storetype'
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
				emptyText : grooveTranslator.getLangLabel('wordbook-language',
						'combobox-emptytext'),
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
				header : grooveTranslator.getLangLabel('wordbook-language',
						'list-id'),
				width : 150,
				sortable : true,
				dataIndex : 'id',
				editor : new Ext.form.TextField({
							allowBlank : false
						})
			}, {
				header : grooveTranslator.getLangLabel('wordbook-language',
						'list-name'),
				width : 150,
				sortable : true,
				dataIndex : 'name',
				editor : new Ext.form.TextArea({})
			}, {
				header : grooveTranslator.getLangLabel('wordbook-language',
						'list-idx'),
				width : 100,
				sortable : true,
				dataIndex : 'idx',
				editor : new Ext.form.TextField({})
			}, {
				header : "",
				align : 'center',
				width : 70,
				sortable : true,
				dataIndex : 'id',
				renderer : renderwbtypeRow
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
				title : grooveTranslator.getLangLabel('wordbook-language',
						'list-title'),
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
				id : tabid,
				title : grooveTranslator.getLangLabel('wordbook-language',
						'panel-title'),
				layout : 'fit',
				border : false,
				closable : true,
				items : [grid],
				tbar : new Ext.Toolbar({
							id : 'wbtoolbar',
							autoWidth : true,
							autoShow : true,
							items : [
									grooveTranslator.getLangLabel(
											'wordbook-language', 'tbar-label'),
									wbtypecombobox, '-', {
										id : 'addwbtype',
										text : grooveTranslator
												.getLangLabel(
														'wordbook-language',
														'tbar-add'),
										tooltip : grooveTranslator
												.getLangLabel(
														'wordbook-language',
														'tbar-add-tooltip'),
										iconCls : 'addwbtype',
										handler : neuwbtype
									}, {
										id : 'delwbtype',
										text : grooveTranslator.getLangLabel(
												'wordbook-language',
												'tbar-delete'),
										disabled : true,
										tooltip : grooveTranslator
												.getLangLabel(
														'wordbook-language',
														'tbar-delete-tooltip'),
										iconCls : 'delwbtype',
										handler : delwbtype
									}, '-', {
										id : 'addwbitem',
										text : grooveTranslator.getLangLabel(
												'wordbook-language',
												'tbar-additem'),
										disabled : true,
										iconCls : 'addwbitem',
										tooltip : grooveTranslator
												.getLangLabel(
														'wordbook-language',
														'tbar-additem-tooltip'),
										handler : addRowInWordbookGrid
									}]
						})
			});

	wblistPanel.setIconClass('tabs');

	return wblistPanel;
};

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
function renderwbtypeRow(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<a href="javascript:void(0);" onclick="javascript:savewbitem(\'{0}\', \'{1}\')">'
							+ grooveTranslator.getLangLabel(
									'wordbook-language', 'list-save')
							+ '</a>&nbsp;<a href="javascript:void(0);" onclick="javascript:delwbitem(\'{0}\', \'{1}\')">'
							+ grooveTranslator.getLangLabel(
									'wordbook-language', 'list-delete')
							+ '</a>', value, rowIndex);

	return resultString;
}

/**
 * 保存字典项
 * 
 * @param {}
 *            wbtype
 * @param {}
 *            rowIdx
 */
function savewbitem(wbtype, rowIdx) {
	var index = Ext.getCmp('wbtypegrid').getSelectionModel().getSelectedCell();

	var record = Ext.getCmp('wbtypegrid').getStore().getAt(index[0]);

	if (record.data.id == null || trim(record.data.id) == '') {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('wordbook-language',
						'save-alert-id'));
		return;
	}

	if (record.data.name == null || trim(record.data.name) == '') {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('wordbook-language',
						'save-alert-name'));
		return;
	}

	Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
			'submit-loading'));

	Ext.Ajax.request({
				url : context + '/system/wb.do?method=updateitem',
				method : 'POST',
				params : {
					'wbtype' : nowwbtype,
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
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel(
										'wordbook-language', 'save-failure'));
					} else {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel(
										'wordbook-language', 'save-success'));
						Ext.getCmp('wbtypegrid').getStore().commitChanges();
					}
				}

			});
}

/**
 * 增加字典项
 */
function addRowInWordbookGrid() {
	// purviewListGrid
	var Plant = Ext.getCmp('wbtypegrid').getStore().recordType;
	var p = new Plant({});
	Ext.getCmp('wbtypegrid').stopEditing();
	Ext.getCmp('wbtypegrid').getStore().add(p);

	Ext.getCmp('wbtypegrid').startEditing(
			Ext.getCmp('wbtypegrid').getStore().getCount() - 1, 0);
}

function delwbitem() {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel(
					'wordbook-language', 'delete-prompt'), deletewbitem);
}

function deletewbitem(btn) {
	if (btn == 'yes') {
		var index = Ext.getCmp('wbtypegrid').getSelectionModel()
				.getSelectedCell();

		var record = Ext.getCmp('wbtypegrid').getStore().getAt(index[0]);

		if (record.data.id) {
			Ext.Ajax.request({
				url : context + "/system/wb.do?method=deleteitem",
				method : 'POST',
				async : false,
				params : {
					'wbtype' : nowwbtype,
					'itemid' : record.data.id
				},
				success : function(response, options) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel(
										'wordbook-language', 'delete-failure'));
					} else {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel(
										'wordbook-language', 'delete-success'));
						Ext.getCmp('wbtypegrid').getStore().remove(record);
					}
				}
			})
		} else {
			Ext.getCmp('wbtypegrid').getStore().remove(record);
		}
	}

}

/**
 * 新建字典类别
 */
function neuwbtype() {
	var addwbtypeForm = new Ext.FormPanel({
				id : 'addwbtypeForm',
				labelWidth : 75, // label settings here cascade unless
				// overridden
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				width : 350,
				defaults : {
					width : 230
				},
				defaultType : 'textfield',

				items : [{
					fieldLabel : grooveTranslator.getLangLabel(
							'wordbook-language', 'form-name'),
					id : 'wbtype',
					name : 'wbtype',
					vtype : 'alphanum',
					emptyText : grooveTranslator.getLangLabel(
							'wordbook-language', 'form-name-emptytext'),
					allowBlank : false
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'wordbook-language', 'form-desc'),
					id : 'wbtypename',
					name : 'wbtypename',
					emptyText : grooveTranslator.getLangLabel(
							'wordbook-language', 'form-desc-emptytext'),
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
				title : grooveTranslator.getLangLabel('wordbook-language',
						'window-title'),
				// closeAction : 'close',
				plain : true,
				// maximizable : true,
				plain : true,
				modal : true,
				// tbar : ['-', dateBtn, '-', typeBtn],
				items : [addwbtypeForm],
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					handler : savewbtype
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						addwbtypeWin.close();
						addwbtypeWin = null;
					}
				}]
			});

	addwbtypeWin.show(this);
}

function delwbtype() {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel('common-language',
					'delete-prompt'), function(btn) {
				if (btn == 'yes') {

					Ext.Ajax.request({
						url : context + "/system/wb.do?method=deletetype",
						method : 'POST',
						async : false,
						params : {
							'wbtype' : nowwbtype
						},
						success : function(response, options) {
							var o = Ext.util.JSON.decode(response.responseText);
							if (!o.success) {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'wordbook-language',
												'wb-delete-failure'));
							} else {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'wordbook-language',
												'wb-delete-success'));

								var record = Ext.getCmp('wbtypecombo')
										.getStore().getAt(nowwbtpindex);

								Ext.getCmp('wbtypecombo').getStore()
										.remove(record);

								Ext.getCmp('wbtypecombo')
										.setRawValue(grooveTranslator
												.getLangLabel(
														'wordbook-language',
														'combobox-emptytext'));

								Ext.getCmp('delwbtype').disable();

								Ext.getCmp('wbtypegrid').getStore().removeAll();

								Ext.getCmp('addwbitem').disable();
							}
						}
					});
				}
			})
}

/**
 * 保存字典类别
 */
function savewbtype() {
	if (Ext.getCmp("addwbtypeForm").getForm().isValid()) {

		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'submit-loading'));

		Ext.getCmp("addwbtypeForm").getForm().submit({
			url : context + '/system/wb.do?method=savetype',
			method : "POST",
			success : function(form, action) {
				Ext.MessageBox.hide();
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'wordbook-language', 'wb-save-success'));

				var Plant = Ext.getCmp('wbtypecombo').getStore().recordType;
				var p = new Plant({
							wbtypeid : action.result.data.wbtypeid,
							wbtypename : action.result.data.wbtypename + ' {'
									+ action.result.data.wbtypeid + '}'
						});

				Ext.getCmp('wbtypecombo').getStore().add(p);

				Ext.getCmp('addwbtypeWin').close();
			},
			failure : function(form, action) {
				Ext.MessageBox.hide();
				if (action.result.errCode == '-1') {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('wordbook-language',
									'wb-save-failure'));
				} else if (action.result.errCode == '-2') {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('wordbook-language',
									'wb-save-reduplicatederror'));
				}
			}
		});
	}
}