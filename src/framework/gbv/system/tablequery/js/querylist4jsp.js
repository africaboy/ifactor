document.write('<script type="text/javascript" src="' + context
		+ '/system/tablequery/js/querylistformcmp.js"></script>');

/**
 * 初始化对象数据信息在控制台tab页中
 * 
 * @param {}
 *            key 查询key
 * @param {}
 *            func 查询成功后回调函数(开发者自定义)
 */
function initTQJspList(key, func, odby, odbyKey, _pageSize) {
	var querykey = key;

	var pageSize = _pageSize ? _pageSize : 20;

	/* 默认排序方式 */
	var orderby = '';
	/* 默认排序字段项(tableName.columnName) */
	var orderbykey = '';

	if (odby && odbyKey) {
		orderby = odby;
		orderbykey = odbyKey;
	}
	
	var l = document.location + '';
	var param = '';
	if (l.indexOf('?') > -1) {
		param = l.substring(l.indexOf('?') + 1);
		
		param.replace('querykey=' + querykey, '');
	}

	var url = context
			+ '/system/tablearg.do?method=modelcmp&comptype=TQJspList&' + param;

	var queryUrl = context + '/system/tablearg.do?method=list&querykey=' + key
			+ '&' + param + '&orderby=' + orderby + '&orderbykey=' + orderbykey;

	Ext.Ajax.request({
		url : url,
		params : {
			querykey : key
		},
		method : 'POST',
		success : function(rs, request) {
			var result = rs.responseText;// 拿到结果集，此时为字符串

			json = Ext.util.JSON.decode(result);// 将字符串转换为json类型

			if (json.success) {
				var title = json.title;

				var showchk = (json.showchk == 'true');

				var defaultlist = (json.defaultlist == 'true');

				var sm = new Ext.grid.CheckboxSelectionModel({
							handleMouseDown : Ext.emptyFn
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

				var defaultToolbarMenus = [];

				if (queryItems.length > 0) {
					defaultToolbarMenus.push({
						iconCls : 'objqueryset',
						text : '<font class="oaFont">数据查询</a>',
						handler : function() {
							var queryForm = getQueryFormCmp(querykey,
									json.title);

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
											initQueryTestParams(key, pageSize);

											var queryParams = getQueryParams(key);

											store.reload({
														params : queryParams,
														callback : function(r,
																options,
																success) {
															initInfoList(r,
																	options,
																	success,
																	querykey,
																	pageSize,
																	showchk);
														}
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

				var store = new Ext.data.JsonStore({
							id : querykey + '_store',
							idProperty : 'PAGINATION_NUMBER',
							remoteSort : false,
							totalProperty : 'totalCount',
							root : 'queryList',
							fields : json.fieldsNames,
							proxy : new Ext.data.HttpProxy({
										url : queryUrl
									})
						});

				/* 设置自定义参数 */
				store.on('beforeload', function(thiz, options) {
							var queryParams = getQueryParams(key);
							Ext.apply(thiz.baseParams, queryParams);
						});

				storeOnLoad(0, pageSize, querykey, showchk);

				var toolbar = new Ext.Toolbar({
							id : querykey + '_toolbar',
							autoWidth : true,
							autoShow : true,
							items : [defaultToolbarMenus]
						});

				toolbar.addClass('ExtToolBar');

				func(querykey);

				toolbar.render('listToolbarArea');
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
 * store加载数据
 * 
 * @param {}
 *            ds
 * @param {}
 *            start
 * @param {}
 *            json
 */
function storeOnLoad(start, pageSize, querykey, showchk) {
	Ext.StoreMgr.get(querykey + '_store').load({
				params : {
					start : start,
					limit : pageSize
				},
				callback : function(r, options, success) {
					initInfoList(r, options, success, querykey, pageSize,
							showchk);
				}
			});
}

function storeReload(start, pageSize, querykey, showchk) {
	var queryParams = getQueryParams(querykey);

	if (queryParams == null) {
		queryParams = eval('({})');

		queryParams.limit = pageSize;
	}

	queryParams.start = start;

	Ext.StoreMgr.get(querykey + '_store').reload({
				params : queryParams,
				callback : function(r, options, success) {
					initInfoList(r, options, success, querykey, pageSize,
							showchk);
				}
			});

}

function initInfoList(r, options, success, querykey, pageSize, showchk) {
	if (success == false) {
		Ext.Msg.alert('ERROR', '加载数据出现异常.');
	} else {
		var store = Ext.StoreMgr.get(querykey + '_store');

		var total = store.getCount();// 数据行数

		while ($(querykey).rows.length > 1) {
			$(querykey).deleteRow($(querykey).rows.length - 1);
		}

		var cm = getGridCm(querykey);

		var arr = [];
		for (var j = 0; j < total; j++) {
			var record = store.getAt(j);

			var tr = $(querykey).insertRow($(querykey).rows.length);

			var i = 0;
			Ext.each(json.columModel, function(item) {
				var td = tr.insertCell(-1);
				td.className = item.clazz;
				if (showchk && i == 0) {
					td.innerHTML = '<div class="divn"><input type="checkbox" name="chkitem" value="'
							+ j
							+ '">&nbsp;'
							+ renderTQJspListHeader(
									record.data[item.dataIndex], cm, record, j,
									i + 1, store) + '</div>';
				} else {
					td.innerHTML = '<div class="divn">'
							+ renderTQJspListHeader(
									record.data[item.dataIndex], cm, record, j,
									i + 1, store) + '</div>';
				}
				i++;
			});
		}

		var ys = store.getTotalCount() % pageSize;

		var sh = parseInt(store.getTotalCount() / pageSize);

		var totalPage = (ys == 0 ? sh : sh + 1);

		var pageNO = parseInt(options.params.start / options.params.limit) + 1;

		var str1 = '共' + store.getTotalCount() + '条数据';

		if (store.getTotalCount() > 0) {
			str1 += ',第' + pageNO + '/' + totalPage + '页';
		}

		$('pageDisplay').innerHTML = str1;

		var str = '';

		if (pageNO > 1) {
			str += '<a href="javascript:storeReload(\'0\', \'' + pageSize
					+ '\', \'' + querykey + '\', ' + showchk + ');">首页</a>';
		} else if (totalPage > 1) {
			str += '首页';
		}

		if (pageNO > 1) {
			var start = pageSize * (pageNO - 2)

			str += '&nbsp;<a href="javascript:storeReload(\'' + start
					+ '\', \'' + pageSize + '\', \'' + querykey + '\', '
					+ showchk + ');">上一页</a>';
		}

		if (pageNO < totalPage) {
			var start = pageSize * pageNO

			str += '&nbsp;<a href="javascript:storeReload(\'' + start
					+ '\', \'' + pageSize + '\', \'' + querykey + '\', '
					+ showchk + ');">下一页</a>';
		}

		if (pageNO < totalPage) {
			var start = pageSize * (totalPage - 1)

			str += '&nbsp;<a href="javascript:storeReload(\'' + start
					+ '\', \'' + pageSize + '\', \'' + querykey + '\', '
					+ showchk + ');">尾页</a>';
		} else if (pageNO == totalPage && pageNO > 1) {
			str += '尾页';
		}

		$('pageRoll').innerHTML = str;

		callBackAfterList();
	}
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
function renderTQJspListHeader(value, cellmeta, record, rowIndex, columnIndex,
		store) {
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

function callBackAfterList() {

}

/**
 * 全部选择/取消
 * 
 * @param {}
 *            thizz
 */
function checkAllItems(thizz) {
	var items = document.getElementsByName('chkitem');
	for (var i = 0; i < items.length; i++) {
		items[i].checked = thizz.checked;
	}
}