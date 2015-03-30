/**
 * 通用查询列表作为选择窗口
 * 
 * @param {}
 *            key 查询key
 * @param {}
 *            func 查询成功后回调函数(开发者自定义)
 * @param {}
 *            returnIdField 接收返回值的域名称
 * @param {}
 *            pointToId 返回id
 * @param {}
 *            pointToName 返回value
 * @param {}
 *            allowBlank 非必选项
 */
function getTableQueryWindow(key, func, setFunc, returnIdField, pointId,
		pointName, allowBlank) {
	var querykey = key;

	/* 默认排序方式 */
	var orderby = '';
	/* 默认排序字段项(tableName.columnName) */
	var orderbykey = '';

	var pageSize = 20;

	var l = document.location + '';
	var param = '';
	if (l.indexOf('?') > -1) {
		param = l.substring(l.indexOf('?') + 1);

		param.replace('querykey=' + querykey, '');
	}

	var url = context + '/system/tablearg.do?method=modelcmp&querykey='
			+ querykey + '&comptype=TQWindowList' + '&' + param;

	var result = sendRequest(url);

	var json = Ext.util.JSON.decode(result);// 将字符串转换为json类型

	if (json.success) {
		var title = json.title;

		var showchk = (json.showchk == 'true');

		var sm = new Ext.grid.CheckboxSelectionModel({
					handleMouseDown : Ext.emptyFn,
					singleSelect : !showchk
				});

		var chkColumModel = [];
		chkColumModel.push(sm);

		Ext.each(json.columModel, function(item) {
					chkColumModel.push(item);
				});

		var cm = new Ext.grid.ColumnModel(chkColumModel);

		gridCMMap.put(querykey, cm);

		var queryItems = json.queryCmp;

		gridQIMap.put(querykey, queryItems);

		var ds = new Ext.data.JsonStore({
					idProperty : 'PAGINATION_NUMBER',
					remoteSort : false,
					totalProperty : 'totalCount',
					root : 'queryList',
					fields : json.fieldsNames,
					proxy : new Ext.data.HttpProxy({
								url : context
										+ '/system/tablearg.do?method=list&querykey='
										+ key + '&' + param + '&orderby='
										+ orderby + '&orderbykey=' + orderbykey
							})
				});

		var grid;

		var gridId = key;

		var defaultToolbarMenus = [];

		if (queryItems.length > 0) {
			defaultToolbarMenus.push({
				iconCls : 'objqueryset',
				text : '数据查询',
				handler : function() {
					var queryForm = getQueryFormCmp(querykey, json.title);

					var queryWin = new Ext.Window({
								renderTo : Ext.getBody(),
								layout : 'fit',
								width : 450,
								height : 300,
								title : title + '_查询',
								resizable : true,
								plain : true,
								modal : true,

								items : [queryForm],

								buttons : [{
									id : 'objectQueryButton',
									text : '查 询',
									handler : function() {
										if (queryForm.form.isValid()) {
											initQueryTestParams(key,
													queryItems, pageSize);

											var queryParams = getQueryParams(key);

											Ext.getCmp(key).getStore().reload({
														params : queryParams
													});

											queryWin.close();
										}
									}
								}, {
									text : '重 置',
									handler : function() {
										queryForm.form.reset();
									}
								}, {
									text : '关 闭',
									handler : function() {
										queryWin.close();
									}
								}]
							});

					queryWin.show(this);
				}
			});
		}

		defaultToolbarMenus.push({
					iconCls : 'objselect',
					text : '选 择',
					handler : function() {
						var ids = '';
						var names = '';
						var selNodes = grid.getSelectionModel().getSelections();
						Ext.each(selNodes, function(node) {
									if (names.length > 0) {
										names += ',';
										ids += ',';
									}

									names += node.get(pointName);
									ids += node.get(pointId);

									if (setFunc) {
										setFunc(node);
									}
								});

						if (Ext.getCmp(returnIdField)) {
							Ext.getCmp(returnIdField).setValue(ids);
						}

						if (Ext.getCmp(returnIdField + '_name')) {
							Ext.getCmp(returnIdField + '_name').setValue(names);
						}

						win.close();
						win = null;
					}
				});

		if (func != null) {
			func();
		}

		if (showchk) {
			grid = new Ext.grid.GridPanel({
						id : gridId,
						cm : cm,
						ds : ds,
						sm : sm,
						region : 'center',
						stateful : true,
						split : true,
						stripeRows : true,
						height : 250,
						margins : '1 1 1 1',
						viewConfig : {
							forceFit : true
						},
						border : false,
						// config options for stateful behavior
						stateful : true,
						stateId : 'grid',
						loadMask : {
							msg : "数据加载中，请稍等..."
						},
						tbar : new Ext.Toolbar({
									id : key + '_toolbar',
									autoWidth : true,
									autoShow : true,
									items : [defaultToolbarMenus]
								}),
						bbar : new Ext.PagingToolbar({
									pageSize : pageSize,// 每页显示的记录值
									store : ds,
									displayInfo : true,
									displayMsg : '总记录数 {0} - {1} of {2}',
									emptyMsg : "没有记录"
								})
					});
		} else {
			grid = new Ext.grid.GridPanel({
						id : gridId,
						cm : cm,
						ds : ds,
						region : 'center',
						stateful : true,
						split : true,
						stripeRows : true,
						height : 250,
						margins : '1 1 1 1',
						viewConfig : {
							forceFit : true
						},
						border : false,
						// config options for stateful behavior
						stateful : true,
						stateId : 'grid',
						loadMask : {
							msg : "数据加载中，请稍等..."
						},
						tbar : new Ext.Toolbar({
									id : key + '_toolbar',
									autoWidth : true,
									autoShow : true,
									items : [defaultToolbarMenus]
								}),
						bbar : new Ext.PagingToolbar({
									pageSize : pageSize,// 每页显示的记录值
									store : ds,
									displayInfo : true,
									displayMsg : '总记录数 {0} - {1} of {2}',
									emptyMsg : "没有记录"
								})
					});
		}

		grid.on('click', function(e) {
					/*
					 * var t = e.getTarget(); var v = this.view; var rowIdx =
					 * v.findRowIndex(t); var record =
					 * this.getStore().getAt(rowIdx);
					 * 
					 * if (record) {
					 * comboWithTooltip.setValue(record.get(pointName));
					 * 
					 * if (Ext.getCmp(returnIdField)) {
					 * Ext.getCmp(returnIdField).setValue(record .get(pointId)); }
					 * 
					 * if (Ext.getCmp(returnIdField + '_name')) {
					 * Ext.getCmp(returnIdField + '_name').setValue(record
					 * .get(pointName)); }
					 * 
					 * if (setFunc) { setFunc(record); } }
					 * 
					 * comboWithTooltip.collapse();
					 */
				});

		/* 设置自定义参数 */
		ds.on('beforeload', function(thiz, options) {
					/* 查询参数 */
					var queryParams = getQueryParams(querykey);

					Ext.apply(thiz.baseParams, queryParams);
				});

		ds.load({
					params : {
						start : 0,
						limit : pageSize
					}
				});

		grid.on('render', function() {
					var total = grid.getStore().getCount();// 数据行数

					var arr = [];
					for (var j = 0; j < total; j++) {
						var record = grid.getStore().getAt(j);

						if (hasSelectGridRecord(Ext.getCmp(returnIdField)
										.getValue(), record.get(pointId))) {
							arr.push(record);
						}
					}
					grid.getSelectionModel().selectRecords(arr);
				}, this, {
					delay : 1000
				});

		var win = new Ext.Window({
					id : 'win_' + querykey,
					title : '<font class="oaFont">' + title + '</font>',
					closable : true,
					resizable : true,
					// maximizable : true,
					width : 600,
					height : 400,
					border : false,
					plain : true,
					layout : 'border',
					modal : true,
					listeners : {
						'show' : function() {

						}
					},
					items : [grid]
				});

		win.show(this);

	} else {
		Ext.Msg.alert('提示', json.msg);
	}

}

/**
 * 是否已选择行
 * 
 * @param {}
 *            ids 已选择值
 * @param {}
 *            recordId 列表行值
 * @return {}
 */
function hasSelectGridRecord(ids, recordId) {
	var r = false;

	var idstr = ids.split(',');
	for (var i = 0; i < idstr.length; i++) {
		if (idstr[i] == recordId) {
			r = true;
			break;
		}
	}
	return r;
}

/**
 * 默认列render函数
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
function renderTQWindowListHeader(value, cellmeta, record, rowIndex,
		columnIndex, store) {
	return value;
}