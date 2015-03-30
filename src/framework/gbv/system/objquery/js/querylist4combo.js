document.write('<script type="text/javascript" src="' + context
		+ '/system/objquery/js/querylistformcmp.js"></script>');

/**
 * 初始化对象数据信息作为combobox组件使用
 * 
 * @param {}
 *            key 查询key
 * @param {}
 *            func 查询成功后回调函数(开发者自定义)
 * @param {}
 *            setFunc 选择数据后回调函数(开发者自定义)
 * @param {}
 *            returnIdField
 * @param {}
 *            pointId
 * @param {}
 *            pointName
 * @param {}
 *            allowBlank
 */
function getOQueryCombo(key, func, setFunc, returnIdField, pointId, pointName,
		allowBlank) {
	var querykey = key;

	var pageSize = 20;

	var l = document.location + '';
	var param = '';
	if (l.indexOf('?') > -1) {
		param = l.substring(l.indexOf('?') + 1);

		param.replace('querykey=' + querykey, '');
	}

	var url = context + '/system/objectarg.do?method=modelcmp&querykey='
			+ querykey + '&comptype=OQComboList&' + param;

	var result = sendRequest(url);

	var json = Ext.util.JSON.decode(result);// 将字符串转换为json类型

	if (json.success) {
		var title = json.title;

		var showchk = (json.showchk == 'true');

		var sm;
		if (showchk) {
			sm = new Ext.grid.CheckboxSelectionModel({
						handleMouseDown : Ext.emptyFn
					});
		}

		var cm;
		if (showchk) {
			var chkColumModel = [];
			chkColumModel.push(sm);

			Ext.each(json.columModel, function(item) {
						chkColumModel.push(item);
					});

			cm = new Ext.grid.ColumnModel(chkColumModel);
		} else {
			cm = new Ext.grid.ColumnModel(json.columModel);
		}

		queryItems = json.queryCmp;

		OgridCMMap.put(querykey, cm);

		var queryItems = json.queryCmp;

		OgridQIMap.put(querykey, queryItems);

		var defaultToolbarMenus = [];

		if (queryItems.length > 0 && false) {
			defaultToolbarMenus.push({
				iconCls : 'objqueryset',
				text : '<font class="oaFont">数据查询</font>',
				handler : function() {
					var queryForm = OgetQueryFormCmp(querykey, json.title);

					var queryWin = new Ext.Window({
						renderTo : Ext.getBody(),
						layout : 'fit',
						width : 450,
						height : 300,
						title : '<font class="oaFont">' + title + '_查询</font>',
						resizable : true,
						plain : true,
						modal : true,

						items : [queryForm],

						buttons : [{
									id : 'objectQueryButton',
									text : '<font class="oaFont">查 询</font>',
									handler : function() {
										if (queryForm.form.isValid()) {
											OinitQueryTestParams(key, pageSize);

											var queryParams = OgetQueryParams(key);

											if (sm != null) {
												sm.clearSelections();
											}

											Ext.getCmp(key).getStore().reload({
														params : queryParams
													});

											queryWin.close();
										}
									}
								}, {
									text : '<font class="oaFont">重 置</font>',
									handler : function() {
										queryForm.form.reset();
									}
								}, {
									text : '<font class="oaFont">关 闭</font>',
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
			iconCls : 'objqueryselect',
			text : '<font class="oaFont">选 择</font>',
			handler : function() {
				var selectedNodes = grid.getSelectionModel().getSelections();
				if (selectedNodes.length > 0) {
					for (var i = 0; i < selectedNodes.length; i++) {
						var record = selectedNodes[i];
						Ext.getCmp(returnIdField).setValue(record.get(pointId));

						if (setFunc) {
							setFunc(record);
						}
					}
				} else {
					// alert('请选择数据');
					Ext.getCmp(returnIdField).setValue('');
					if (setFunc) {
						setFunc(null);
					}
				}

				comboWithTooltip.collapse();
			}
		});

		var l = document.location + '';
		var param = '';
		if (l.indexOf('&') > -1) {
			param = l.substring(l.indexOf('&'));
		}

		var ds = new Ext.data.JsonStore({
					idProperty : 'PAGINATION_NUMBER',
					remoteSort : false,
					totalProperty : 'totalCount',
					root : 'queryList',
					fields : json.fieldsNames,
					proxy : new Ext.data.HttpProxy({
								url : context
										+ '/system/objectarg.do?method=list&querykey='
										+ key + '&' + param
							})
				});

		var grid;

		var gridId = key;

		if (showchk) {
			grid = new Ext.grid.GridPanel({
						id : gridId,
						cm : cm,
						ds : ds,
						sm : sm,
						height : 250,
						stripeRows : true,
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
						height : 250,
						stripeRows : true,
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
					var t = e.getTarget();
					var v = this.view;
					var rowIdx = v.findRowIndex(t);
					var record = this.getStore().getAt(rowIdx);

					if (record) {
						comboWithTooltip.setValue(record.get(pointName));

						if (Ext.getCmp(returnIdField)) {
							Ext.getCmp(returnIdField).setValue(record
									.get(pointId));

						}

						if (setFunc) {
							setFunc(record);
						}
					}

					comboWithTooltip.collapse();
				});

		/* 设置自定义参数 */
		ds.on('beforeload', function(thiz, options) {
					/* 查询参数 */
					var queryParams = OgetQueryParams(key);
					Ext.apply(thiz.baseParams, queryParams);
				});

		ds.load({
					params : {
						start : 0,
						limit : pageSize
					}
				});

		var comboxid = returnIdField + '_';

		var comboWithTooltip = new Ext.form.ComboBox({
					store : new Ext.data.SimpleStore({
								fields : [],
								data : [[]]
							}),
					editable : false,
					id : comboxid,
					name : comboxid,
					mode : 'local',
					triggerAction : 'all',
					listWidth : 450,
					maxHeight : 400,
					tpl : '<div id="' + returnIdField + 'Area"></div>',
					selectedClass : '',
					onSelect : Ext.emptyFn,
					allowBlank : (allowBlank == true),
					emptyText : '请选择...'
				});

		grid.on('render', function() {
					var total = grid.getStore().getCount();// 数据行数

					var arr = [];
					for (var j = 0; j < total; j++) {
						var record = grid.getStore().getAt(j);

						if (hasSelectOGridRecord(Ext.getCmp(returnIdField)
										.getValue(), record.get(pointId))) {
							arr.push(record);
						}
					}
					grid.getSelectionModel().selectRecords(arr);
				}, this, {
					delay : 1000
				});

		comboWithTooltip.on('expand', function() {
					if ($(returnIdField + 'Area').innerHTML == '') {
						grid.render(returnIdField + 'Area');
						grid.getStore().load({
									params : {
										start : 0,
										limit : 20
									},
									callback : function(r, options, success) {
										if (success == false) {
											Ext.Msg.alert('ERROR', '加载数据出现异常.');
										} else {
											if (func) {
												func(querykey);
											}
										}
									}
								});
					}
				});

		comboWithTooltip.on('collapse', function() {
					// comboWithTooltip.expand();
				});

		return comboWithTooltip;

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
function hasSelectOGridRecord(ids, recordId) {
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
function renderOQComboListHeader(value, cellmeta, record, rowIndex,
		columnIndex, store) {
	return value;
}