/* 单选列表 */
var cm;
document.write('<script type="text/javascript" src="' + context
		+ '/system/wordbook/js/wbstore.js"></script>');

var pageSize = 20;
var queryObjectTestForm;
var queryObjectTestWin;
/* 查询项定义 */
var queryItems;
/* 查询参数 */
var params;
var querykey;

/**
 * 初始化对象数据信息在控制台tab页中
 * 
 * @param {}
 *            key 查询key
 * @param {}
 *            id
 * @param {}
 *            name
 * @param {}
 *            idkey
 * @param {}
 *            returnId
 * @param {}
 *            returnName
 */
function initQueryWindow(key, idkey, idvalue, returnFunc) {
	querykey = key;

	var url = context + '/system/tablearg.do?method=modelcmp';

	Ext.Ajax.request({
		url : url,
		params : {
			querykey : key
		},
		method : 'POST',
		success : function(rs, request) {
			var result = rs.responseText;// 拿到结果集，此时为字符串

			var json = Ext.util.JSON.decode(result);// 将字符串转换为json类型

			if (json.success) {
				var title = json.title;

				var showchk = (json.showchk == 'true');

				var sm;
				if (showchk) {
					sm = new Ext.grid.CheckboxSelectionModel({
								handleMouseDown : Ext.emptyFn,
								header : '',
								singleSelect : true
							});
					// var sm = new
					// Ext.selectModel({header:'',singleSelect:true})

				}

				//var cm;
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
				var ds = new Ext.data.JsonStore({
					idProperty : 'PAGINATION_NUMBER',
					remoteSort : false,
					totalProperty : 'totalCount',
					root : 'queryList',
					fields : json.fieldsNames,
					proxy : new Ext.data.HttpProxy({
								url : context
										+ '/system/tablearg.do?method=list&querykey='
										+ key
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
							items : [{
										iconCls : 'objqueryset',
										text : '数据查询',
										handler : function() {
											initQueryForm(key, title);
										}
									}, {
										iconCls : 'objselect',
										text : '确定',
										handler : function() {
											if (returnFunc
													&& typeof returnFunc == 'function') {
												var rows = grid
														.getSelectionModel()
														.getSelections();
												if (rows.length > 0) {
													returnFunc(rows[0]);
												} else {
													returnFunc(null);
												}

												win.close();
											} else {
												alert('没有定义选择值接收对象,数据选择窗口很有可能不能为您提供帮助');
											}
										}
									}]
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
											items : [{
														iconCls : 'objqueryset',
														text : '数据查询',
														handler : function() {
															initQueryForm(key,
																	title);
														}
													}]
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

				/*
				 * grid.on('render', function(grid) { var store =
				 * grid.getStore();
				 * 
				 * var view = grid.getView();
				 * 
				 * grid.tip = new Ext.ToolTip({ target : view.mainBody, delegate :
				 * '.x-grid3-row', trackMouse : true, renderTo : document.body,
				 * listeners : { beforeshow : function updateTipBody(tip) { var
				 * rowIndex = view .findRowIndex(tip.triggerElement); var
				 * cellIndex = view .findCellIndex(tip.triggerElement);
				 * tip.body.dom.innerHTML = store.getAt(rowIndex).data.memo; } }
				 * }); });
				 */
				grid.on('render', function() {
							var total = grid.getStore().getCount();// 数据行数

							var arr = [];
							for (var j = 0; j < total; j++) {
								var record = grid.getStore().getAt(j);
								if (idkey && record.data[idkey] == idvalue) {
									arr.push(record);
								}
							}
							grid.getSelectionModel().selectRecords(arr);
						}, this, {
							delay : 1000
						});

				/* 设置自定义参数 */
				ds.on('beforeload', function(thiz, options) {
							var params = getQueryTestParams(key);
							Ext.apply(thiz.baseParams, params);
						});

				ds.load({
							params : {
								start : 0,
								limit : pageSize
							}
						});

				var win = new Ext.Window({
							id : 'querylistwindow_' + key,
							renderTo : Ext.getBody(),
							layout : 'fit',
							width : 700,
							height : 400,
							title : title,
							resizable : true,
							plain : true,
							modal : true,

							items : [grid]
						});

				win.show(this);
			} else {
				Ext.Msg.alert('提示', json.msg);
			}

		},
		failure : function(rs, request) {
			Ext.Msg.alert('提示', '未知的异常错误');
		}
	});

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
function renderHeader(value, cellmeta, record, rowIndex, columnIndex, store) {
	return value;
}

/**
 * 默认的在查询列表页面添加自定义组件方法
 * 
 * @param {}
 *            querykey
 */
function addMeMix(querykey) {

}

/**
 * 查询对象数据
 * 
 * @param {}
 *            tabid
 */
function initQueryForm(key, title) {
	var items = [];

	Ext.each(queryItems, function(item) {
				if (item.type == 'input') {
					var it = new Ext.form.TextField({
								fieldLabel : item.name,
								id : item.column,
								name : item.column,
								value : getParamValue(item.column)
							});
					items.push(it);
				} else if (item.type == 'date') {
					var str = getParamValue(item.column);

					if (str != '') {
						str += '000000'
					}

					var it = new Ext.form.DateField({
								fieldLabel : item.name,
								id : item.column,
								name : item.column,
								format : 'Y-m-d',
								emptyText : formatDate(str),
								value : str
							});
					items.push(it);
				} else if (item.type == 'select') {
					var vlu = getParamValue(item.column);

					var it = getWBComboStore(item.param, vlu,
							item.column + '_', item.name, item.column, null,
							'0', true);

					var str = getParamValue(item.column + '_');

					if (str != '') {
						// createHidden(item.column + '_', str);
						it.setRawValue(str);
					}

					items.push(it);
				}

			});

	queryObjectTestForm = new Ext.FormPanel({
				labelWidth : 150, // label settings here
				// cascade unless
				// overridden
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				width : 350,
				defaults : {
					width : 230
				},
				defaultType : 'textfield',
				items : items
			});

	queryObjectTestWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 450,
				height : 300,
				title : title + '_查询',
				resizable : true,
				plain : true,
				modal : true,

				items : [queryObjectTestForm],

				buttons : [{
							id : 'objectQueryButton',
							text : '查 询',
							handler : function() {
								// initQueryList(key);
								Ext.getCmp(key).getStore().reload({
											params : getQueryTestParams(key)
										});
								queryObjectTestWin.close();
							}
						}, {
							text : '关 闭',
							handler : function() {
								queryObjectTestWin.close();
								// queryObjectTestWin =
								// null;
								// queryWin = null;
							}
						}]
			});

	queryObjectTestWin.show(this);
}

function getParamValue(id) {
	var str = '';

	var pm = eval(params);
	if (pm && eval('pm.' + id)) {
		str = (eval('pm.' + id));
	}

	return str;
}

/**
 * 初始化查询项表单项
 * 
 * @param {}
 *            cmp
 * @return {}
 */
function initQueryFormItem(key, cmp) {
	var item;

	var itemid = cmp.column;// cmp.table + '.' +

	var myQueryParamMap = queryParamMap.get(key);

	var itemvalue = myQueryParamMap.get(itemid);

	if (cmp.type == 'radio') {
		item = new Ext.Panel({
					layout : "column",
					border : false,
					fieldLabel : cmp.name,
					isFormField : true,
					items : [new Ext.form.RadioGroup({
								hideLabel : true,
								items : [new Ext.form.Radio({
											id : itemid + '_0',
											name : itemid,
											boxLabel : "否",
											inputValue : "0",
											checked : true,
											listeners : {
												check : function(checkbox,
														checked) {
													if (checked) {
													}
												}
											}
										}), new Ext.form.Radio({
											id : itemid + '_1',
											boxLabel : "是",
											name : itemid,
											inputValue : "1",
											listeners : {
												check : function(checkbox,
														checked) {
													if (checked) {
													}
												}
											}
										})]
							})]
				});
	} else if (cmp.type == 'checkbox') {
		item = new Ext.Panel({
			layout : "column",
			border : false,
			fieldLabel : cmp.name,
			isFormField : true,
			items : [new Ext.form.Checkbox({
						fieldLabel : cmp.name,
						inputValue : '0',
						listeners : {
							check : function(checkbox, checked) {
								if (checked) {
									Ext.getCmp(itemid).getEl().dom.value = checkbox
											.getEl().dom.value;
								} else {
									Ext.getCmp(itemid).getEl().dom.value = '0';
								}
							}
						}
					}), new Ext.form.Hidden({
						id : itemid,
						name : itemid,
						value : '0'
					})]
		});
	} else if (cmp.type == 'date') {
		item = new Ext.form.DateField({
					id : itemid,
					name : itemid,
					fieldLabel : cmp.name,
					emptyText : '请选择日期',
					value : itemvalue,
					format : 'Y-m-d'
				});
	} else if (cmp.type == 'guselect') {
		item = [
				getRoleSelectCombo(cmp.name, itemid, itemid + '_name', itemid
								+ '_type', '', true), new Ext.form.Hidden({
							id : itemid,
							name : itemid,
							value : '0'
						}), new Ext.form.Hidden({
							id : itemid + '_name',
							name : itemid + '_name',
							value : '0'
						}), new Ext.form.Hidden({
							id : itemid + '_type',
							name : itemid + '_type',
							value : '0'
						})]
	} else if (cmp.type == 'roleselect') {
		item = [
				getGroupUserChkCombo('组织/人员', itemid, itemid + '_name', itemid
								+ '_type', '', true), new Ext.form.Hidden({
							id : itemid,
							name : itemid,
							value : '0'
						}), new Ext.form.Hidden({
							id : itemid + '_name',
							name : itemid + '_name',
							value : '0'
						}), new Ext.form.Hidden({
							id : itemid + '_type',
							name : itemid + '_type',
							value : '0'
						})]
	} else if (cmp.type == 'select') {
		item = getWBComboStore(cmp.param, '', cmp.column + '_', cmp.name,
				cmp.column, null, '0', true);
	} else if (cmp.type == 'input') {
		item = new Ext.form.TextField({
					fieldLabel : cmp.name,
					id : itemid,
					name : itemid,
					selectOnFocus : true,
					allowBlank : true,
					value : itemvalue,
					blankText : '请定义查询条件值...'
				});
	}

	return item;
}

/**
 * 获取查询参数
 * 
 * @param {}
 *            key
 * @return {}
 */
function getQueryTestParams(key) {
	var paramStr = '';

	Ext.each(queryItems, function(item) {
				if (item.type == 'input') {
					var str = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
							.getValue() : getParamValue(item.column);

					paramStr += item.column + ' : "' + str + '",';
				} else if (item.type == 'date') {
					var v = Ext.getCmp(item.column)
							? parseDate(Ext.getCmp(item.column).getEl().dom.value)
							: getParamValue(item.column);
					if (v != '') {
						// v += '000000';
					}
					paramStr += item.column + ' : "' + v + '",';
				} else if (item.type == 'select') {
					var str = Ext.getCmp(item.column + '_')
							? Ext.getCmp(item.column + '_').getValue()
							: getParamValue(item.column);
					var lblstr = Ext.getCmp(item.column + '_')
							? Ext.getCmp(item.column + '_').getRawValue()
							: getParamValue(item.column);

					paramStr += item.column + ' : "' + str + '",';

					paramStr += item.column + '_ : "' + lblstr + '",';
				}

			});

	if (paramStr != '') {
		paramStr = '({' + paramStr.substring(0, paramStr.length - 1) + '})';
	} else {
		paramStr = '({})';
	}

	params = paramStr;

	return eval(params);
}

function reload() {
	Ext.getCmp(querykey).getStore().reload();
}