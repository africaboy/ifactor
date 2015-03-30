/**
 * 表选择列表combo
 * 
 * @param {}
 *            combolabel
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            defaultValue
 * @param {}
 *            allowBlank
 * @return {}
 */
function getTableSelectCombo(fileName, combolabel, returnIdField,
		returnNameField, defaultValue, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				fieldLabel : combolabel,
				editable : false,
				id : '_tablename',
				name : '_tablename',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 200,
				listWidth : 400,
				tpl : '<div id="getTableSelectComboList"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
			});

	var url = context + '/system/table.do?method=list&file=' + fileName;

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
							url : url
						})
			});

	var tableListGrid = new Ext.grid.GridPanel({
				id : 'tableListComboboxGrid',
				store : tableListStore,
				closable : true,
				columns : [{
							header : '表名称',
							width : 150,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : '表说明',
							width : 150,
							sortable : true,
							dataIndex : 'memo'
						}],
				stripeRows : true,
				autoExpandColumn : 'name',
				border : false,
				viewConfig : {
					forceFit : true
				},
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				height : 200,
				loadMask : {
					msg : "数据加载中，请稍等..."
				},
				bbar : new Ext.Toolbar([{
							iconCls : 'refresh',
							text : '刷新',
							handler : function() {
								tableListGrid.getStore().reload();
							}
						}])
			});

	tableListGrid.on('click', function(e) {
				var t = e.getTarget();
				var v = this.view;
				var rowIdx = v.findRowIndex(t);
				var record = this.getStore().getAt(rowIdx);

				if (record) {
					comboWithTooltip.setValue(record.data.memo);

					if (Ext.getCmp(returnIdField)) {
						Ext.getCmp(returnIdField).setValue(record.data.name);

					}

					if (Ext.getCmp(returnNameField)) {
						Ext.getCmp(returnNameField).setValue(record.data.memo);
					}
				}

				comboWithTooltip.collapse();
			});

	comboWithTooltip.on('expand', function() {
				tableListGrid.render('getTableSelectComboList');

				tableListStore.load({
							params : {
								start : 0,
								limit : pageSize
							},
							callback : function(r, options, success) {
								if (success == false) {
									Ext.Msg.alert('ERROR', '加载数据出现异常.');
								} else {
									var total = tableListGrid.getStore()
											.getCount();// 数据行数

									var arr = [];
									for (var j = 0; j < total; j++) {
										var record = tableListGrid.getStore()
												.getAt(j);
										if (hasSelected(Ext
														.getCmp(returnIdField)
														.getValue(),
												record.data.id)) {
											arr.push(record);
										}
									}
									if (arr.length > 0) {
										tableListGrid.getSelectionModel()
												.selectRecords(arr);
									}
								}
							}
						});
			});

	return comboWithTooltip;
}