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
document.write('<link type="text/css" rel="stylesheet" href="' + context
		+ '/system/objquery/css/querylist4ext.css"/>');		

/**
 * 列表cm散列表
 */
var OgridCMMap = new HashMap();

/**
 * 查询项散列表
 */
var OgridQIMap = new HashMap();

/**
 * 查询参数散列表
 */
var OqueryParamsMap = new HashMap();

/**
 * 获取列表cm
 * 
 * @param {}
 *            key 查询定义key
 * @return {}
 */
function OgetGridCm(key) {
	return OgridCMMap.get(key);
}

/**
 * 获取查询项散列表
 * @param {} key
 * @return {}
 */
function OgetGridQI(key) {
	return OgridQIMap.get(key);
}

/**
 * 获取查询参数散列表
 * @param {} key
 * @return {}
 */
function OgetQueryParams(key) {
	return OqueryParamsMap.get(key);
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
function OgetQueryFormCmp(key, title) {
	var items = [];

	var formUrl = context + '/system/result4form.jsp?';
	
	var queryItems = OgetGridQI(key);
	
	var params = OgetQueryParams(key);

	Ext.each(queryItems, function(item) {
		formUrl += item.column + '=' + OgetParamValue(item.column, params) + '&';
		formUrl += item.column + '_' + '='
				+ OgetParamValue(item.column + '_', params) + '&';
		formUrl += item.column + '_name' + '='
				+ OgetParamValue(item.column + '_name', params) + '&';
		formUrl += item.column + '_type' + '='
				+ OgetParamValue(item.column + '_type', params) + '&';
		
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
		} else if (item.type == 'date') {
			var it = new Ext.form.DateField({
						fieldLabel : item.name,
						id : item.column,
						name : item.column,
						format : 'Y-m-d',
						allowBlank : !needValue,
						value : ''
					});
			items.push(it);
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
									+ '_type', '', !needValue), new Ext.form.Hidden({
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
									+ '_type', '', !needValue), new Ext.form.Hidden({
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
					getDataindexCombo(itemid, itemid + '_name', null, item.param,
							!needValue), new Ext.form.Hidden({
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

			var tqitem = [getTableQueryCombo(item.param, function() {
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
function OinitQueryTestParams(key, pageSize) {
	var paramStr = '';
	var rnt = false;
	var queryAction = '';
	
	var queryItems = OgetGridQI(key);

	Ext.each(queryItems, function(item) {
				if (item.type == 'input') {
					var str = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
							.getValue() : OgetParamValue(item.column);

					if (trim(str) != '') {
						rnt = true;
					}

					paramStr += item.column + ' : "' + str + '",';
				} else if (item.type == 'date') {
					var v = Ext.getCmp(item.column)
							? parseDate(Ext.getCmp(item.column).getEl().dom.value)
							: OgetParamValue(item.column);
					if (v != '') {
						// v += '000000';
						rnt = true;
					}
					paramStr += item.column + ' : "' + v + '",';
				} else if (item.type == 'select') {
					var str = Ext.getCmp(item.column + '_')
							? Ext.getCmp(item.column + '_').getValue()
							: OgetParamValue(item.column);
					var lblstr = Ext.getCmp(item.column + '_')
							? Ext.getCmp(item.column + '_').getRawValue()
							: OgetParamValue(item.column);

					if (trim(str) != '') {
						rnt = true;
					}

					paramStr += item.column + ' : "' + str + '",';

					paramStr += item.column + '_ : "' + lblstr + '",';
				} else if (item.type == 'guselect' || item.type == 'uselect'
						|| item.type == 'gselect' || item.type == 'guselect1'
						|| item.type == 'uselect1' || item.type == 'gselect1') {
					var id = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
							.getValue() : OgetParamValue(item.column);
					var name = Ext.getCmp(item.column + '_name')
							? Ext.getCmp(item.column + '_name').getRawValue()
							: OgetParamValue(item.column + '_name');
					var type = Ext.getCmp(item.column + '_type')
							? Ext.getCmp(item.column + '_type').getRawValue()
							: OgetParamValue(item.column + '_type');

					if (trim(id) != '') {
						rnt = true;
					}

					paramStr += item.column + ' : "' + id + '",';

					paramStr += item.column + '_ : "' + name + '",';

					paramStr += item.column + '_name : "' + name + '",';

					paramStr += item.column + '_type : "' + type + '",';
				} else if (item.type == 'roleselect'
						|| item.type == 'roleselect1') {
					var id = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
							.getValue() : OgetParamValue(item.column);
					var name = Ext.getCmp(item.column + '_name')
							? Ext.getCmp(item.column + '_name').getRawValue()
							: OgetParamValue(item.column + '_name');
					var type = Ext.getCmp(item.column + '_type')
							? Ext.getCmp(item.column + '_type').getRawValue()
							: OgetParamValue(item.column + '_type');

					if (trim(id) != '') {
						rnt = true;
					}

					paramStr += item.column + ' : "' + id + '",';

					paramStr += item.column + '_ : "' + name + '",';

					paramStr += item.column + '_name : "' + name + '",';

					paramStr += item.column + '_type : "' + type + '",';
				} else if (item.type == 'dataindex') {
					var id = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
							.getValue() : OgetParamValue(item.column);
					var name = Ext.getCmp(item.column + '_name')
							? Ext.getCmp(item.column + '_name').getRawValue()
							: OgetParamValue(item.column + '_name');

					if (trim(id) != '') {
						rnt = true;
					}

					paramStr += item.column + ' : "' + id + '",';

					paramStr += item.column + '_ : "' + name + '",';

					paramStr += item.column + '_name : "' + name + '",';
				} else if (item.type == 'tablequery') {

					var id = Ext.getCmp(item.column) ? Ext.getCmp(item.column)
							.getValue() : OgetParamValue(item.column);
					var name = Ext.getCmp(item.column + '_name')
							? Ext.getCmp(item.column + '_name').getRawValue()
							: OgetParamValue(item.column + '_name');

					if (trim(id) != '') {
						rnt = true;
					}

					paramStr += item.column + ' : "' + id + '",';

					paramStr += item.column + '_ : "' + name + '",';
				}

			});

	if (rnt) {
		queryAction = 'queryAction';
	}

	if (paramStr != '') {
		paramStr = '({' + paramStr + ' start : 0, limit : ' + pageSize
				+ ', queryAction : "' + queryAction + '"})';
	} else {
		paramStr = '({queryAction : "' + queryAction + '"})';
	}

	var params = eval(paramStr);

	OqueryParamsMap.remove(key);

	OqueryParamsMap.put(key, params);
}

/**
 * 获取查询项参数值
 * 
 * @param {}
 *            id 查询项id
 * @return {} 参数值
 */
function OgetParamValue(id, params) {
	var str = '';

	var pm = eval(params);
	if (pm && eval('pm.' + id)) {
		str = (eval('pm.' + id));
	}

	return str;
}

/**
 * 重新加载查询列表数据
 * @param {} queryKey
 */
function reloadOQList(queryKey) {
	var queryParams = OgetQueryParams(queryKey);

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
function initOExportMenus(exportlist, defaultToolbarMenus) {
	var menus = [];

	if (exportlist.toLowerCase().indexOf('excel') > -1) {
		menus.push({
					text : '<font class="oaFont">excel</font>',
					iconCls : 'expxls',
					handler : function() {

					}
				});
	}

	if (exportlist.toLowerCase().indexOf('xml') > -1) {
		menus.push({
					text : '<font class="oaFont">xml</font>',
					iconCls : 'expxml',
					handler : function() {

					}
				});
	}

	if (exportlist.toLowerCase().indexOf('html') > -1
			|| exportlist.toLowerCase().indexOf('htm') > -1) {
		menus.push({
					text : '<font class="oaFont">html</font>',
					iconCls : 'exphtml',
					handler : function() {

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
	} /*else {
		alert('尚不支持定义的导出数据类型(' + exportlist + ')');
	}*/
}