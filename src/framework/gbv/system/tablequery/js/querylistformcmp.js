document.write('<script type="text/javascript" src="' + context
		+ '/system/wordbook/js/wbstore.js"></script>');
document.write('<script type="text/javascript" src="' + context
		+ '/system/group/js/groupcombo4jsp.js"></script>');
document.write('<link type="text/css" rel="stylesheet" href="' + context
		+ '/system/group/css/groupmanage.css"/>');
document.write('<script type="text/javascript" src="' + context
		+ '/system/role/js/rolecombo4jsp.js"></script>');
document.write('<link type="text/css" rel="stylesheet" href="' + context
		+ '/system/role/css/rolemanage.css"/>');
document.write('<script type="text/javascript" src="' + context
		+ '/system/dataindex/js/dataindexcombox.js"></script>');
document.write('<script type="text/javascript" src="' + context
		+ '/system/tableview/js/tableview.js"></script>');
document.write('<script type="text/javascript" src="' + context
		+ '/system/tablequery/js/tablehandler.js"></script>');
document.write('<link type="text/css" rel="stylesheet" href="' + context
		+ '/system/tablequery/css/querylistformcmp.css"/>');

/* 高级自定义密码验证 */
Ext.apply(Ext.form.VTypes, {
			/* val指当前文本框值，field指当前文本框组件 */
			password : function(val, field) {
				var rnt = false;
				/* 待比较目标文本框组件 */
				if (field.confirmTo) {
					var pwd = Ext.get(field.confirmTo.confirmTo);
					if (val == pwd.getValue()) {
						rnt = true;
					} else {
						// Ext.Msg.alert('提示', '密码确认错误！');
						rnt = false;
					}
				}
				return rnt;
			}
		});

/**
 * 列表cm散列表
 */
var gridCMMap = new HashMap();

/**
 * 查询项散列表
 */
var gridQIMap = new HashMap();

/**
 * 查询参数散列表
 */
var queryParamsMap = new HashMap();

/**
 * 查询项散列表
 */
var queryLabelsMap = new HashMap();

/**
 * 数据导出数据链接散列表
 */
var exportURLMap = new HashMap();

/**
 * 获取列表cm
 * 
 * @param {}
 *            key 查询定义key
 * @return {}
 */
function getGridCm(key) {
	return gridCMMap.get(key);
}

/**
 * 获取查询项散列表
 * 
 * @param {}
 *            key
 * @return {}
 */
function getGridQI(key) {
	return gridQIMap.get(key);
}

/**
 * 获取查询参数散列表
 * 
 * @param {}
 *            key
 * @return {}
 */
function getQueryParams(key) {
	return queryParamsMap.get(key);
}

/**
 * 
 * @param {}
 *            key
 * @param {}
 *            title
 * @param {}
 *            queryItems
 * @return {}
 */
function getQueryFormCmp(key, title) {
	var items = [];

	var formUrl = context + '/system/result4form.jsp?';

	var queryItems = getGridQI(key);

	var params = getQueryParams(key);

	Ext.each(queryItems, function(item) {
		formUrl += item.column + '=' + getParamValue(item.column, params) + '&';
		formUrl += item.column + '_' + '='
				+ getParamValue(item.column + '_', params) + '&';
		formUrl += item.column + '_name' + '='
				+ getParamValue(item.column + '_name', params) + '&';
		formUrl += item.column + '_type' + '='
				+ getParamValue(item.column + '_type', params) + '&';

		var needValue = (item.need == '1');

		if (item.type == 'input') {
			var it = new Ext.form.TextField({
						fieldLabel : item.name,
						id : item.column,
						name : item.column,
						allowBlank : !needValue,
						value : ''
					});
			items.push(it);

			if (item.mode == '09') {
				var it = new Ext.form.TextField({
							fieldLabel : '至',
							id : item.column + '_',
							name : item.column + '_',
							allowBlank : !needValue,
							value : ''
						});
				items.push(it);
			}
		} else if (item.type == 'date') {

			if (item.mode == '09') {
				var it = new Ext.form.DateField({
							fieldLabel : item.name,
							id : item.column,
							name : item.column,
							endDateField : item.column + '_',
							format : 'Y-m-d',
							allowBlank : !needValue,
							value : ''
						});
				items.push(it);

				var it_ = new Ext.form.DateField({
							fieldLabel : '至',
							id : item.column + '_',
							name : item.column + '_',
							startDateField : item.column,
							format : 'Y-m-d',
							allowBlank : !needValue,
							value : ''
						});
				items.push(it_);
			} else {
				var it = new Ext.form.DateField({
							fieldLabel : item.name,
							id : item.column,
							name : item.column,
							format : 'Y-m-d',
							allowBlank : !needValue,
							value : ''
						});
				items.push(it);
			}
		} else if (item.type == 'select') {
			var item = [
					getWBComboStore(item.param, '', item.column + '_',
							item.name, item.column, null, '', !needValue), {
						xtype : 'hidden',
						name : item.column,
						id : item.column,
						value : ''
					}];

			items.push(item);
		} else if (item.type == 'guselect') {
			var itemid = item.column;
			var guitem = [
					getGroupUserChkCombo4Single(itemid, itemid + '_name',
							itemid + '_type', item.param, !needValue),
					new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_type',
								name : itemid + '_type',
								value : ''
							})]

			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(guitem);
		} else if (item.type == 'gselect') {
			var itemid = item.column;
			var guitem = [
					getGroupSelectCombo4Single(itemid, itemid + '_name', itemid
									+ '_type', item.param, !needValue),
					new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_type',
								name : itemid + '_type',
								value : ''
							})]

			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(guitem);
		} else if (item.type == 'uselect') {
			var itemid = item.column;
			var guitem = [
					getUserChkCombo4Single(itemid, itemid + '_name', itemid
									+ '_type', item.param, !needValue),
					new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_type',
								name : itemid + '_type',
								value : ''
							})]

			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(guitem);
		} else if (item.type == 'guselect1') {
			var itemid = item.column;
			var guitem = [
					getGroupUserChkCombo(itemid, itemid + '_name', itemid
									+ '_type', item.param, !needValue),
					new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_type',
								name : itemid + '_type',
								value : ''
							})]

			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(guitem);
		} else if (item.type == 'gselect1') {
			var itemid = item.column;
			var guitem = [
					getGroupSelectCombo(itemid, itemid + '_name', itemid
									+ '_type', item.param, !needValue),
					new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_type',
								name : itemid + '_type',
								value : ''
							})]

			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(guitem);
		} else if (item.type == 'uselect1') {
			var itemid = item.column;
			var guitem = [
					getUserChkCombo(itemid, itemid + '_name', itemid + '_type',
							item.param, !needValue), new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_type',
								name : itemid + '_type',
								value : ''
							})]

			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(guitem);
		} else if (item.type == 'roleselect') {
			var itemid = item.column;
			var roleitem = [
					getRoleSingleSelectCombo(itemid, itemid + '_name', itemid
									+ '_type', '', !needValue),
					new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_type',
								name : itemid + '_type',
								value : ''
							})]
			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(roleitem);
		} else if (item.type == 'roleselect1') {
			var itemid = item.column;
			var roleitem = [
					getRoleSelectCombo(itemid, itemid + '_name', itemid
									+ '_type', '', !needValue),
					new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_type',
								name : itemid + '_type',
								value : ''
							})]
			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(roleitem);
		} else if (item.type == 'dataindex') {
			var itemid = item.column;
			var dditem = [
					getDataindexCombo(itemid, itemid + '_name', null,
							item.param, !needValue), new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							})]
			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(dditem);
		} else if (item.type == 'tablequery') {
			var itemid = item.column;

			var tqitem = [
					getTableQueryCombo(item.param, function() {
							}, itemid, item.pointId, item.pointName, !needValue),
					new Ext.form.Hidden({
								id : itemid,
								name : itemid,
								value : ''
							}), new Ext.form.Hidden({
								id : itemid + '_name',
								name : itemid + '_name',
								value : ''
							})]
			Ext.getCmp(itemid + '_').fieldLabel = item.name;

			items.push(tqitem);
		}

	});

	var queryForm = new Ext.FormPanel({
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

	queryForm.getForm().load({
		url : encodeURI(formUrl),
		waitTitle : '提示',
		waitMsg : '正在加载数据,请稍候...',
		animEl : "loding",
		success : function(form, action) {
			var resultInfo = listSimpleJson(action.result.data);

			Ext.each(queryItems, function(item) {
						if (item.type == 'date') {
							queryForm.form.findField(item.column)
									.setValue(formatDate(resultInfo
											.get(item.column)));

							if (item.mode == '09') {
								queryForm.form.findField(item.column + '_')
										.setValue(formatDate(resultInfo
												.get(item.column + '_')));
							}
						} else if (item.type == 'input') {
							if (item.mode == '09') {
								queryForm.form.findField(item.column)
										.setValue(resultInfo.get(item.column));
							}
						}
					});
		},
		failure : function(form, action) {
			Ext.Msg.alert('初始化查询项失败');
		}
	});

	return queryForm;
}

/**
 * 获取查询参数
 * 
 * @param {}
 *            key
 * @param {}
 *            queryItems
 * @param {}
 *            pageSize
 * @param {}
 *            params
 * @return {}
 */
function initQueryTestParams(key, pageSize) {
	var paramStr = '';
	var labelStr = '';
	var rnt = false;
	var queryAction = '';

	var queryItems = getGridQI(key);

	Ext.each(queryItems, function(item) {
		if (item.type == 'input') {
			var str = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
					.getValue() : getParamValue(item.column);

			if (trim(str) != '') {
				rnt = true;
			}

			paramStr += item.column + ' : "' + str + '",';

			labelStr += '{"name" : "' + item.name + '",value : "' + str + '"},';

			if (item.mode == '09') {
				var str = Ext.getCmp(item.column + '_')
						? Ext.getCmp(item.column + '_').getValue()
						: getParamValue(item.column + '_');

				if (trim(str) != '') {
					rnt = true;
				}

				paramStr += item.column + '_ : "' + str + '",';

				labelStr += '{"name" : "' + item.name + '_",value : "' + str
						+ '"},';
			}
		} else if (item.type == 'date') {
			var v = Ext.getCmp(item.column) ? parseDate(Ext.getCmp(item.column)
					.getEl().dom.value) : getParamValue(item.column);
			if (v != '') {
				// v += '000000';
				rnt = true;
			}
			paramStr += item.column + ' : "' + v + '",';

			labelStr += '{"name" : "' + item.name + '",value : "'
					+ Ext.getCmp(item.column).getEl().dom.value + '"},';

			if (item.mode == '09') {
				var v = Ext.getCmp(item.column + '_')
						? parseDate(Ext.getCmp(item.column + '_').getEl().dom.value)
						: getParamValue(item.column + '_');
				if (v != '') {
					// v += '000000';
					rnt = true;
				}
				paramStr += item.column + '_ : "' + v + '",';

				labelStr += '{"name" : "' + item.name + '_",value : "'
						+ Ext.getCmp(item.column + '_').getEl().dom.value
						+ '"},';
			}
		} else if (item.type == 'select') {
			var str = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
					.getValue() : getParamValue(item.column);
			var lblstr = Ext.getCmp(item.column + '_') ? Ext.getCmp(item.column
					+ '_').getRawValue() : getParamValue(item.column + '_');

			if (trim(str) != '') {
				rnt = true;
			}

			paramStr += item.column + ' : "' + str + '",';

			paramStr += item.column + '_ : "' + lblstr + '",';

			labelStr += '{"name" : "' + item.name + '",value : "' + lblstr
					+ '"},';
		} else if (item.type == 'guselect' || item.type == 'uselect'
				|| item.type == 'gselect' || item.type == 'guselect1'
				|| item.type == 'uselect1' || item.type == 'gselect1') {
			var id = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
					.getValue() : getParamValue(item.column);
			var name = Ext.getCmp(item.column + '_name')
					? Ext.getCmp(item.column + '_name').getRawValue()
					: getParamValue(item.column + '_name');
			var type = Ext.getCmp(item.column + '_type')
					? Ext.getCmp(item.column + '_type').getRawValue()
					: getParamValue(item.column + '_type');

			if (trim(id) != '') {
				rnt = true;
			}

			paramStr += item.column + ' : "' + id + '",';

			paramStr += item.column + '_ : "' + name + '",';

			paramStr += item.column + '_name : "' + name + '",';

			paramStr += item.column + '_type : "' + type + '",';

			labelStr += '{"name" : "' + item.name + '",value : "' + name
					+ '"},';
		} else if (item.type == 'roleselect' || item.type == 'roleselect1') {
			var id = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
					.getValue() : getParamValue(item.column);
			var name = Ext.getCmp(item.column + '_name')
					? Ext.getCmp(item.column + '_name').getRawValue()
					: getParamValue(item.column + '_name');
			var type = Ext.getCmp(item.column + '_type')
					? Ext.getCmp(item.column + '_type').getRawValue()
					: getParamValue(item.column + '_type');

			if (trim(id) != '') {
				rnt = true;
			}

			paramStr += item.column + ' : "' + id + '",';

			paramStr += item.column + '_ : "' + name + '",';

			paramStr += item.column + '_name : "' + name + '",';

			paramStr += item.column + '_type : "' + type + '",';

			labelStr += '{"name" : "' + item.name + '",value : "' + name
					+ '"},';
		} else if (item.type == 'dataindex') {
			var id = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
					.getValue() : getParamValue(item.column);
			var name = Ext.getCmp(item.column + '_name')
					? Ext.getCmp(item.column + '_name').getRawValue()
					: getParamValue(item.column + '_name');

			if (trim(id) != '') {
				rnt = true;
			}

			paramStr += item.column + ' : "' + id + '",';

			paramStr += item.column + '_ : "' + name + '",';

			paramStr += item.column + '_name : "' + name + '",';

			labelStr += '{"name" : "' + item.name + '",value : "' + name
					+ '"},';
		} else if (item.type == 'tablequery') {

			var id = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
					.getValue() : getParamValue(item.column);
			var name = Ext.getCmp(item.column + '_name')
					? Ext.getCmp(item.column + '_name').getRawValue()
					: getParamValue(item.column + '_name');

			if (trim(id) != '') {
				rnt = true;
			}

			paramStr += item.column + ' : "' + id + '",';

			paramStr += item.column + '_ : "' + name + '",';

			labelStr += '{"name" : "' + item.name + '", "value" : "' + name
					+ '"},';
		}

	});

	if (rnt) {
		queryAction = 'queryAction';
	}

	/* 查询参数 */
	if (paramStr != '') {
		paramStr = '({' + paramStr + ' start : 0, limit : ' + pageSize
				+ ', queryAction : "' + queryAction + '"})';
	} else {
		paramStr = '({queryAction : "' + queryAction + '"})';
	}

	var params = eval(paramStr);

	queryParamsMap.remove(key);

	queryParamsMap.put(key, params);

	/* 查询参数标签 */
	if (labelStr != '') {
		labelStr = '[' + labelStr.substring(0, labelStr.length - 1) + ']';
	} else {
		labelStr = '[]';
	}

	queryLabelsMap.remove(key);

	queryLabelsMap.put(key, labelStr);
}

/**
 * 获取查询项参数值
 * 
 * @param {}
 *            id 查询项id
 * @return {} 参数值
 */
function getParamValue(id, params) {
	var str = '';

	var pm = eval(params);
	if (pm && eval('pm.' + id)) {
		str = (eval('pm.' + id));
	}

	return str;
}

/**
 * 重新加载查询列表数据
 * 
 * @param {}
 *            queryKey
 */
function reloadTQList(queryKey) {
	var queryParams = getQueryParams(queryKey);

	Ext.getCmp(queryKey).getStore().reload({
				params : queryParams
			});
}

/**
 * 初始化导出菜单
 * 
 * @param exportlist
 *            数据导出菜单类型{excel,xml,html||htm}
 * @param defaultToolbarMenus
 *            列表菜单容器
 */
function initExportMenus(exportlist, defaultToolbarMenus, key) {
	var menus = [];

	if (exportlist.toLowerCase().indexOf('excel') > -1) {
		menus.push({
					text : '<font class="oaFont">excel</font>',
					iconCls : 'expxls',
					handler : function() {
						Ext.MessageBox.show({
									title : '提示窗口',
									msg : '数据导出过程中...',
									progressText : '',
									width : 300,
									wait : true,
									progress : true,
									closable : false,
									waitConfig : {
										interval : 200
									},
									animEl : 'loding'
								});
						inithelper(context
								+ '/system/tablequery/querylist4export.jsp?queryKey='
								+ key + "&expType=excel");
					}
				});
	}

	if (exportlist.toLowerCase().indexOf('xml') > -1) {
		menus.push({
					text : '<font class="oaFont">xml</font>',
					iconCls : 'expxml',
					handler : function() {
						Ext.MessageBox.show({
									title : '提示窗口',
									msg : '数据导出过程中...',
									progressText : '',
									width : 300,
									wait : true,
									progress : true,
									closable : false,
									waitConfig : {
										interval : 200
									},
									animEl : 'loding'
								});
						inithelper(context
								+ '/system/tablequery/querylist4export.jsp?queryKey='
								+ key + "&expType=xml");
					}
				});
	}

	if (exportlist.toLowerCase().indexOf('html') > -1
			|| exportlist.toLowerCase().indexOf('htm') > -1) {
		menus.push({
			text : '<font class="oaFont">html</font>',
			iconCls : 'exphtml',
			handler : function() {
				var url = context
						+ '/system/tablequery/exportTQdata.jsp?queryKey=' + key;
				showWindow(url);
			}
		});
	}

	if (exportlist.toLowerCase().indexOf('json') > -1) {
		menus.push({
					text : '<font class="oaFont">json</font>',
					iconCls : 'expjson',
					handler : function() {
						Ext.MessageBox.show({
									title : '提示窗口',
									msg : '数据导出过程中...',
									progressText : '',
									width : 300,
									wait : true,
									progress : true,
									closable : false,
									waitConfig : {
										interval : 200
									},
									animEl : 'loding'
								});
						inithelper(context
								+ '/system/tablequery/querylist4export.jsp?queryKey='
								+ key + "&expType=json");
					}
				});
	}

	if (menus.length > 0) {
		defaultToolbarMenus.push('-');
		defaultToolbarMenus.push({
					text : '<font class="oaFont">数据导出</font>',
					iconCls : 'exp',
					menu : menus
				});
	} /*
		 * else if(exportlist != ''){ alert('尚不支持定义的导出数据类型(' + exportlist +
		 * ')'); }
		 */
}

/**
 * 获取数据导出参数
 * 
 * @param {}
 *            key
 * @return {}
 */
function getExportParams(key) {
	return {
		'exportURL' : exportURLMap.get(key),
		'params' : queryParamsMap.get(key),
		'labels' : queryLabelsMap.get(key)
	}
}

/**
 * 关闭延时窗口
 */
function releaseExportloading() {
	Ext.MessageBox.hide();
}

function initTableViewToolbar(toolbar, defaultToolbarMenus, key, param) {
	if (toolbar.length > 0) {
		Ext.each(toolbar, function(node) {
					if (matchRole(roles, node.purview) || true) {
						defaultToolbarMenus.push({
									iconCls : node.iconcls,
									text : '<font class="oaFont">' + node.name
											+ '</font>',
									handler : function() {
										var tv = new newTableView4QueryList(key);
										tv.initTableView(node.id,
												node.displaymode);
									}
								});
					}

				});
	}

}