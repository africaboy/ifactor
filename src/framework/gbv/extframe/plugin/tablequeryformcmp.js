/**
 * 列表cm散列表
 */
// var gridCMMap = new HashMap();
/**
 * 查询项散列表
 */
// var gridQIMap = new HashMap();
/**
 * 查询参数散列表
 */
// var queryParamsMap = new HashMap();
/**
 * 查询项散列表
 */
// var queryLabelsMap = new HashMap();
/**
 * 数据导出数据链接散列表
 */
// var exportURLMap = new HashMap();
/**
 * 获取列表cm
 * 
 * @param {}
 *            key 查询定义key
 * @return {}
 */
function getGridCm(key) {
	// gridCMMap.get(key)
	return Ext.getCmp(key) ? Ext.getCmp(key).colModel : null;
}

/**
 * 获取查询项散列表
 * 
 * @param {}
 *            key
 * @return {}
 */
function getGridQI(key) {
	// gridQIMap.get(key)
	return Ext.getCmp(key) ? Ext.getCmp(key).queryItems : null;
}

/**
 * 获取查询参数散列表
 * 
 * @param {}
 *            key
 * @return {}
 */
function getQueryParams(key) {
	// queryParamsMap.get(key)
	return Ext.getCmp(key) ? Ext.getCmp(key).queryParams : {};
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
function initQueryTestParams(queryForm, key) {
	var paramStr = '';
	var labelStr = '';
	var rnt = true;
	var queryAction = '';

	var grid = Ext.getCmp(key);

	var queryItems = getGridQI(key);

	Ext.each(queryItems, function(item) {
				if (item.type == 'input') {
					var str = queryForm.getForm().findField(item.formName)
							? queryForm.getForm().findField(item.formName)
									.getValue()
							: getParamValue(item.formName);

					if (trim(str) != '') {
						rnt = true;
					}

					paramStr += item.formName + ' : "' + str + '",';

					labelStr += '{"name" : "' + item.formName + '",value : "'
							+ str + '"},';

					if (item.mode == '09') {
						var str = queryForm.getForm().findField(item.formName
								+ '_')
								? queryForm.getForm().findField(item.formName
										+ '_').getValue()
								: getParamValue(item.formName + '_');

						if (trim(str) != '') {
							rnt = true;
						}

						paramStr += item.formName + '_ : "' + str + '",';

						labelStr += '{"name" : "' + item.formName
								+ '_",value : "' + str + '"},';
					}
				} else if (item.type == 'hidden') {
					var str = queryForm.getForm().findField(item.formName)
							? queryForm.getForm().findField(item.formName)
									.getValue()
							: getParamValue(item.formName);

					if (trim(str) != '') {
						rnt = true;
					}

					paramStr += item.formName + ' : "' + str + '",';

					labelStr += '{"name" : "' + item.formName + '",value : "'
							+ str + '"},';
				} else if (item.type == 'date' || item.type == 'time') {
					var v = queryForm.getForm().findField(item.formName)
							? queryForm.getForm().findField(item.formName)
									.getValue()
							: getParamValue(item.formName);
					if (v != '') {
						// v += '000000';
						rnt = true;
					}
					paramStr += item.formName + ' : "' + v + '",';
					labelStr += '{"name" : "'
							+ item.formName
							+ '",value : "'
							+ queryForm.getForm().findField(item.formName)
									.getValue() + '"},';

					if (item.mode == '09') {
						var v = queryForm.getForm().findField(item.formName
								+ '_')
								? queryForm.getForm().findField(item.formName
										+ '_').getValue()
								: getParamValue(item.formName + '_');

						if (v != '') {
							// v += '000000';
							rnt = true;
						}
						paramStr += item.formName + '_ : "' + v + '",';

						labelStr += '{"name" : "'
								+ item.formName
								+ '_",value : "'
								+ queryForm.getForm().findField(item.formName
										+ '_').getValue() + '"},';
					}
				} else if (item.type == 'select') {
					var str = queryForm.getForm().findField(item.formName)
							? queryForm.getForm().findField(item.formName)
									.getValue()
							: getParamValue(item.formName);
					var lblstr = queryForm.getForm()
							.findField(item.param.target)
							? queryForm.getForm().findField(item.param.target)
									.getValue()
							: getParamValue(item.param.target);

					if (trim(str) != '') {
						rnt = true;
					}

					paramStr += item.formName + ' : "' + str + '",';

					paramStr += item.param.target + ': "' + lblstr + '",';

					labelStr += '{"name" : "' + item.formName + '",value : "'
							+ lblstr + '"},';
				} else if (item.type == 'guselect' || item.type == 'uselect'
						|| item.type == 'gselect' || item.type == 'guselect1'
						|| item.type == 'uselect1' || item.type == 'gselect1'
						|| item.type == 'roleselect'
						|| item.type == 'roleselect1') {
					var id = queryForm.getForm().findField(item.formName)
							? queryForm.getForm().findField(item.formName)
									.getValue()
							: getParamValue(item.formName);
					var name = queryForm.getForm()
							.findField(item.param.targetName) ? queryForm
							.getForm().findField(item.param.targetName)
							.getValue() : getParamValue(item.param.targetName);
					var type = queryForm.getForm()
							.findField(item.param.targetType) ? queryForm
							.getForm().findField(item.param.targetType)
							.getValue() : getParamValue(item.param.targetType);

					if (trim(id) != '') {
						rnt = true;
					}

					paramStr += item.formName + ' : "' + id + '",';

					paramStr += item.formName + '_ : "' + name + '",';

					paramStr += item.param.targetName + ' : "' + name + '",';

					paramStr += item.param.targetType + ' : "' + type + '",';

					labelStr += '{"name" : "' + item.formName + '",value : "'
							+ name + '"},';
				} else if (item.type == 'dataindex') {
					var id = queryForm.getForm().findField(item.formName)
							? queryForm.getForm().findField(item.formName)
									.getValue()
							: getParamValue(item.formName);
					var name = queryForm.getForm()
							.findField(item.param.targetName) ? queryForm
							.getForm().findField(item.param.targetName)
							.getValue() : getParamValue(item.param.targetName);

					if (trim(id) != '') {
						rnt = true;
					}

					paramStr += item.formName + ' : "' + id + '",';

					paramStr += item.formName + '_ : "' + name + '",';

					paramStr += item.param.targetName + ' : "' + name + '",';

					labelStr += '{"name" : "' + item.formName + '",value : "'
							+ name + '"},';
				} else if (item.type == 'tablequery') {
					var str = queryForm.getForm().findField(item.formName)
							? queryForm.getForm().findField(item.formName)
									.getValue()
							: getParamValue(item.formName);
					var lblstr = queryForm.getForm()
							.findField(item.param.target)
							? queryForm.getForm().findField(item.param.target)
									.getValue()
							: getParamValue(item.param.target);

					if (trim(str) != '') {
						rnt = true;
					}

					paramStr += item.formName + ' : "' + str + '",';

					paramStr += item.param.target + ': "' + lblstr + '",';

					labelStr += '{"name" : "' + item.formName + '",value : "'
							+ lblstr + '"},';
				}

			});

	if (rnt) {
		queryAction = 'queryAction';
	}

	/* 查询参数 */
	if (paramStr != '') {
		paramStr = '({' + paramStr + ' start : 0, queryAction : "'
				+ queryAction + '"})';
	} else {
		paramStr = '({queryAction : "' + queryAction + '"})';
	}

	var params = eval(paramStr);

	/*
	 * queryParamsMap.remove(key); queryParamsMap.put(key, params);
	 */

	for (var i in Ext.getCmp(key).queryParams) {
		delete i;
	}

	Ext.getCmp(key).queryParams = params;

	/* 查询参数标签 */
	if (labelStr != '') {
		labelStr = '[' + labelStr.substring(0, labelStr.length - 1) + ']';
	} else {
		labelStr = '[]';
	}

	/*
	 * queryLabelsMap.remove(key);
	 * 
	 * queryLabelsMap.put(key, labelStr);
	 */

	Ext.getCmp(key).queryLabels = labelStr;
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

function TQStoreCallback(records, options, success, gridId) {
	var btn = gridId + '_exportDataMenu';
	if (Ext.getCmp(btn)) {
		Ext.getCmp(btn).setDisabled((records.length == 0));
	}
}

/**
 * 重新加载查询列表数据
 * 
 * @param {}
 *            queryKey
 */
function reloadTQList(queryKey_) {
	if (queryKey_ != null) {
		var keys = queryKey_.split(',');

		for (var i = 0; i < keys.length; i++) {
			var queryKey = trim(keys[i]);
			if (Ext.getCmp(keys[i]) != null) {

				var queryKey = keys[i];
				var queryParams = getQueryParams(queryKey);

				if (queryParams == null) {
					queryParams = {
						start : 0,
						limit : Ext.getCmp(queryKey).getBottomToolbar() != null
								&& Ext.getCmp(queryKey).getBottomToolbar().pageSize != null
								? Ext.getCmp(queryKey).getBottomToolbar().pageSize
								: 20
					};
				} else {
					queryParams.limit = Ext.getCmp(queryKey).getBottomToolbar() != null
							&& Ext.getCmp(queryKey).getBottomToolbar().pageSize != null
							? Ext.getCmp(queryKey).getBottomToolbar().pageSize
							: 20;
				}

				if (Ext.getCmp(queryKey).unSelectAll != null) {
					try {
						Ext.getCmp(queryKey).unSelectAll();
					} catch (error) {
						// do nothing
					}
				}

				Ext.getCmp(queryKey).getStore().reload({
							params : queryParams,
							callback : function(records, options, success) {
								/*
								 * if (Ext.getCmp(queryKey).rowSelectCache) {
								 * Ext.getCmp(queryKey).rowSelectCache.clear(); }
								 */

								TQStoreCallback(records, options, success,
										queryKey);
							}
						});
			}
		}
	}
}

/**
 * 重新加载查询列表数据
 * 
 * @param {}
 *            queryKey
 */
function reloadTQListObject(grid) {
	var queryParams = getQueryParams(grid.id);

	if (queryParams == null) {
		queryParams = {
			start : 0,
			limit : grid.getBottomToolbar() != null
					&& grid.getBottomToolbar().pageSize != null ? grid
					.getBottomToolbar().pageSize : 20
		};
	} else {
		queryParams.limit = grid.getBottomToolbar()
				&& grid.getBottomToolbar().pageSize != null != null ? grid
				.getBottomToolbar().pageSize : 20;
	}

	if (grid.unSelectAll != null) {
		grid.unSelectAll();
	}

	grid.getStore().reload({
				params : queryParams,
				callback : function(records, options, success) {
					/*
					 * if (Ext.getCmp(queryKey).rowSelectCache) {
					 * Ext.getCmp(queryKey).rowSelectCache.clear(); }
					 */

					TQStoreCallback(records, options, success, grid.id);
				}
			});
}

function autoLoadTQListObject(grid) {
	grid.store.load({
				params : {
					start : 0,
					limit : grid.getBottomToolbar() != null
							&& grid.getBottomToolbar().pageSize != null ? grid
							.getBottomToolbar().pageSize : 20
				},
				callback : function(records, options, success) {
					TQStoreCallback(records, options, success, grid.id);
				}
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
function initExportMenus(exportlist, defaultToolbarMenus, key, gridId) {
	var menus = [];

	var queryParamJson = getExportParams(gridId);

	if (exportlist['excel'] == true) {
		menus.push({
					text : 'Export Excel file',
					iconCls : 'expxls',
					handler : function() {
						Ext.Msg.alert('hint', 'Large amount of data, file export delay is longer, please wait until the download file');
						var queryParamJson = getExportParams(gridId);
						var paramString = queryParamJson.params != null
								? jsonToParameters(queryParamJson.params)
								: '';
						inithelper();
						getFrameDocument('helper').src = context
								+ '/system/tablearg.do?method=export&querykey='
								+ key + '&expType=excel&' + paramString;
					}
				});
	}

	if (exportlist['xml'] == true) {
		menus.push({
					text : 'Export XML file',
					iconCls : 'expxml',
					handler : function() {
						Ext.Msg.alert('hint', 'Large amount of data, file export delay is longer, please wait until the download file');
						var queryParamJson = getExportParams(gridId);
						var paramString = queryParamJson.params != null
								? jsonToParameters(queryParamJson.params)
								: '';
						inithelper();
						getFrameDocument('helper').src = context
								+ '/system/tablearg.do?method=export&querykey='
								+ key + '&expType=xml&' + paramString;
					}
				});
	}

	if (exportlist['html'] == true) {
		menus.push({
					text : 'Export HTML file',
					iconCls : 'exphtml',
					handler : function() {
						Ext.Msg.alert('hint', 'Large amount of data, file export delay is longer, please wait until the download file');
						var queryParamJson = getExportParams(gridId);
						var paramString = queryParamJson.params != null
								? jsonToParameters(queryParamJson.params)
								: '';
						inithelper();
						getFrameDocument('helper').src = context
								+ '/system/tablearg.do?method=export&querykey='
								+ key + '&expType=html&' + paramString;
					}
				});
	}

	if (exportlist['json'] == true) {
		menus.push({
					text : 'Export JSON file',
					iconCls : 'expjson',
					handler : function() {
						Ext.Msg.alert('hint', 'Large amount of data, file export delay is longer, please wait until the download file');
						var queryParamJson = getExportParams(gridId);
						var paramString = queryParamJson.params != null
								? jsonToParameters(queryParamJson.params)
								: '';
						inithelper();
						getFrameDocument('helper').src = context
								+ '/system/tablearg.do?method=export&querykey='
								+ key + '&expType=json&' + paramString;
					}
				});
	}

	if (menus.length > 1) {
		defaultToolbarMenus.push({
					id : gridId + '_exportDataMenu',
					disabled : true,
					text : 'Export data',
					iconCls : 'exp',
					menu : menus
				});
	} else if (menus.length == 1) {
		defaultToolbarMenus.push(menus[0]);
	}
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
		'params' : getQueryParams(key),
		'labels' : Ext.getCmp(key) ? Ext.getCmp(key).queryLabels : ''
	}
}

/**
 * 关闭延时窗口
 */
function releaseExportloading() {
	Ext.MessageBox.hide();
}

function initTableViewToolbar(toolbar, defaultToolbarMenus, key, options) {
	if (toolbar.length > 0) {
		Ext.each(toolbar, function(node) {
					if (matchRole(roles, node.purview) || true) {
						var options_ = {
							frozen : true,
							params : {},
							querykey : options.querykey,
							tabcontainerid : options.tabcontainerid,
							tabid : options.tabid,
							title : options.title
						}

						defaultToolbarMenus.push({
									iconCls : node.iconcls,
									text : node.name,
									handler : function() {
										var tv = new initTableView4QueryList(
												key, options_);
										tv.newTableView(node.id,
												node.displaymode);
									}
								});
					}

				});
	}

}