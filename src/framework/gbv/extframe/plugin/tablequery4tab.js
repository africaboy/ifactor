// 用在extframe框架中,代替原iframe模式,实现真正意义上的ext grid application
document
		.write("<script src=\""
				+ context
				+ "/temp-store/jsstuff/tablequery/bestboy.js\" type=\"text/javascript\"></script>");

Ext.grid.GridPanel.prototype.unSelectAll = function() {
	// var view = this.getView();
	var sm = this.getSelectionModel();
	if (sm) {
		sm.clearSelections();
	}

	if (this.rowSelectCache) {
		this.rowSelectCache.clear();
	}
}

/**
 * 初始化对象数据信息在控制台tab页中
 * 
 * @param {
 *            options.tabid options.querykey options.func options.pageSize
 *            options.tabparam } options
 */
function initTQExtTabList(options) {
	var tabid = options.tabid;
	var querykey = options.querykey;
	if (querykey == null || querykey == '') {
		alert('tablequery key is null, please check it out!');
		return false;
	}

	if (options.params == null) {
		options.params = {};
	}

	/*
	 * var url = context +
	 * '/system/tablearg.do?method=modelcmp&comptype=TQExtTabList&' + param;
	 */

	var url = context + '/temp-store/jsstuff/tablequery/'
			+ tablequeryStuff[querykey] + '/' + querykey + '.json';

	Ext.Ajax.request({
				url : url,
				params : {
					querykey : querykey
				},
				method : 'POST',
				success : function(rs, request) {
					var result = rs.responseText;// 拿到结果集，此时为字符串

					var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

					if (resultJson.success) {
						// 不自动加载grid的store
						options.isDormant = true;

						var grid = createTableQueryList(tabid, options,
								resultJson);

						grid.setIconClass('tabs');
						grid.closable = true;

						if (grid != null) {
							Ext.getCmp(options.tabcontainerid).add(grid);
							Ext.getCmp(options.tabcontainerid)
									.setActiveTab(grid);

							var gridPanel = Ext.getCmp(grid.gridId);

							gridPanel.Iload();

							gridPanel.on('activate', function(thiz) {
										reloadTQListObject(thiz);
									});
						} else {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'tablequery-language',
											'error-uncreated'));
						}

					} else {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'), json.msg);
					}

				},
				failure : function(rs, request) {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel(
									'tablequery-language', 'failure-uncreated')
									+ (' + querykey + '));
				}
			});
}

/**
 * 初始化对象数据信息在弹出窗口中
 * 
 * @param {
 *            options.tabid options.querykey options.func options.pageSize
 *            options.tabparam } options
 */
function initTQExtWindowList(options) {
	var querykey = options.querykey;
	if (querykey == null || querykey == '') {
		alert('tablequery key is null,please check it out!');
		return false;
	}

	if (options.params == null) {
		options.params = {};
	}

	// default gridId
	var gridId = querykey;

	if (options.gridId) {
		// first prior for given
		gridId = options.gridId;
	} else if (options.tabid) {
		// second prior for menu
		gridId = options.tabid;
	}

	/*
	 * var url = context +
	 * '/system/tablearg.do?method=modelcmp&comptype=TQExtTabList&' + param;
	 */

	var url = context + "/temp-store/jsstuff/tablequery/"
			+ tablequeryStuff[querykey] + "/" + querykey + ".json";

	Ext.Ajax.request({
		url : url,
		params : {
			querykey : querykey
		},
		method : 'POST',
		success : function(rs, request) {
			var result = rs.responseText;// 拿到结果集，此时为字符串

			var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

			if (resultJson.success) {
				options.TQExtWindow = gridId + '_window';

				var grid = createTableQueryList(gridId, options, resultJson);

				if (grid != null) {
					grid.Iload();

					var win = new Ext.Window({
						id : options.TQExtWindow,
						renderTo : Ext.getBody(),
						layout : 'fit',
						width : resultJson.resultData.param.width == null
								? 800
								: resultJson.resultData.param.width,
						height : resultJson.resultData.param.height == null
								? 500
								: resultJson.resultData.param.height,
						title : resultJson.resultData.name,
						resizable : (options.resizable == null || options.resizable == true),
						plain : true,
						border : false,
						constrainHeader : true,
						modal : (options.modal == null || options.modal == true),
						maximizable : (options.maximizable == null || options.maximizable == true),

						items : [grid]
					});

					win.show();
				} else {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel(
									'tablequery-language', 'error-uncreated'));
				}

			} else {
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), json.msg);
			}

		},
		failure : function(rs, request) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'tablequery-language', 'failure-uncreated')
							+ (' + querykey + '));
		}
	});
}

/**
 * init TQExtList for further processing
 * 
 * @param {}
 *            options
 * @param {}
 *            returnFunc
 * @return {Boolean}
 */
function initTQExtListForU(options, returnFunc) {
	if (returnFunc == null) {
		alert('returnFunc is null,please provide it!');
		return false;
	}

	var querykey = options.querykey;
	if (querykey == null || querykey == '') {
		alert('tablequery key is null, please check it out!');
		return false;
	}

	if (options.params == null) {
		options.params = {};
	}

	// default gridId
	var gridId = querykey;

	if (options.gridId) {
		// first prior for given
		gridId = options.gridId;
	} else if (options.tabid) {
		// second prior for menu
		gridId = options.tabid;
	}

	/*
	 * var url = context +
	 * '/system/tablearg.do?method=modelcmp&comptype=TQExtTabList&' + param;
	 */

	var url = context + "/temp-store/jsstuff/tablequery/"
			+ tablequeryStuff[querykey] + "/" + querykey + ".json";

	Ext.Ajax.request({
				url : url,
				params : {
					querykey : querykey
				},
				method : 'POST',
				success : function(rs, request) {
					var result = rs.responseText;// 拿到结果集，此时为字符串

					var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

					if (resultJson.success) {
						var grid = createTableQueryList(gridId, options,
								resultJson);

						if (grid != null) {
							returnFunc(grid, resultJson);
						} else {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'tablequery-language',
											'error-uncreated'));
						}

					} else {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'), json.msg);
					}

				},
				failure : function(rs, request) {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel(
									'tablequery-language', 'failure-uncreated')
									+ (' + querykey + '));
				}
			});
}

/**
 * 创建tablequery 查询列表
 * 
 * @param {}
 *            gridId_ 数据列表ID
 * @param {}
 *            options 自定义参数
 * @param {}
 *            resultJson 通用查询配置结构json
 * @return {}
 */
function createTableQueryList(gridId_, options, resultJson) {
	var gridId = gridId_;
	var func = options.func;
	var listType = options.type;

	if (listType == null) {
		listType = 'gridlist';
	}
	var json = resultJson.resultData;
	var querykey = json.id;
	var gridObj;

	var pageSize = 20;

	if (json.param.pageSize != null) {
		pageSize = json.param.pageSize;
	}

	if (options.pageSize != null) {
		pageSize = options.pageSize;
	}

	// 查询form显示模式
	var layout;

	if (options.layout != null) {
		layout = options.layout;
	} else {
		layout = json.param.layout == null ? 'window' : json.param.layout;
	}

	if (layout == 'border') {
		gridId = gridId_ + '_grid';
	}

	if (false && json.jsurl != '') {
		var xmlhttp = sendRequestObject(context + json.jsurl);

		if (xmlhttp.status == 200) {
			IncludeJS(querykey + '_js', xmlhttp.responseText);
		} else if (xmlhttp.status == 404) {
			Ext.Msg.alert('提示', '通用查询自定义js文件(' + json.jsurl + ')并不存在');
		}
	}

	if (false && json.cssurl != '') {
		var xmlhttp = sendRequestObject(context + json.cssurl);
		if (xmlhttp.status == 200) {
			IncludeCSS(querykey + '_css', xmlhttp.responseText);
		} else if (xmlhttp.status == 404) {
			Ext.Msg.alert('提示', '通用查询自定义css文件(' + json.cssurl + ')并不存在');
		}
	}

	var title = json.name;

	var showchk = json.showchk;

	var items = [];

	var sm;
	if (showchk) {
		sm = new Ext.grid.CheckboxSelectionModel({
			checkOnly : false,
			// handleMouseDown : Ext.emptyFn,
			singleSelect : (json.param.singleSelect != null
					? json.param.singleSelect
					: false),
			listeners : {
				rowselect : function(sm, rowIndex, record) { // 选择事件，将time添加到timeArray中
					if (json.param.singleSelect == true
							&& gridObj.rowSelectCache.size() > 0) {
						gridObj.rowSelectCache.clear();
					}
					if (!gridObj.rowSelectCache
							.containsKey(record.data[gridObj.selectCacheKey])) {
						gridObj.rowSelectCache.put(
								record.data[gridObj.selectCacheKey], record);
					}
					if (json.param.listenRowSelect != null
							&& json.param.listenRowSelect == true) {
						if (methods.canFunction(querykey + '_rowselect')) {
							eval(querykey
									+ '_rowselect(true, Ext.getCmp(gridId), options, sm, rowIndex, record);');

						}
					}
				},

				rowdeselect : function(sm, rowIndex, record) { // 取消选择事件,从timeArray中移除出去
					gridObj.rowSelectCache
							.remove(record.data[gridObj.selectCacheKey]);
					if (json.param.listenRowSelect != null
							&& json.param.listenRowSelect == true) {
						if (methods.canFunction(querykey + '_rowselect')) {
							eval(querykey
									+ '_rowselect(false, Ext.getCmp(gridId), options, sm, rowIndex, record);');

						}
					}
				}
			}
		});

		items.push(sm);
	}

	var cm;

	Ext.each(json.columnModel, function(n) {
				// 默认render函数名称
				var renderName = querykey;
				// 自定义
				if (n.render != null && n.render != '') {
					renderName = n.render;
				} else if (options.comptype != null
						&& trim(options.comptype) != '') {
					// 菜单定义时指定的参数
					renderName = options.comptype;
				}

				var display = n.display;

				if (n.translate && n.name != 'PAGINATION_NUMBER') {
					display = grooveTranslator.getLangLabel(querykey
									+ '_result', n.name);
				} else if (n.translate && n.name == 'PAGINATION_NUMBER') {
					display = grooveTranslator.getLangLabel('common-language',
							'list-idx');
				}

				var item = {
					header : display,
					dataIndex : n.name,
					sortable : n.sortable,
					align : n.align,
					width : parseInt(n.width),
					clazz : n.clazz,
					renderer : function(v, c, r, row, col, s) {
						var resultObj = v;

						if (methods.canFunction(renderName)) {
							resultObj = eval(renderName
									+ '(v, c, r, row, col, s, gridId, options)');
						}

						return resultObj;
					}
				};

				//fixed：是否固定列宽，默认为false
				//menuDisabled：是否禁用列的上下文菜单，默认为false
				//item.fixed = false;
				//item.menuDisabled = true;

				items.push(item);
			});

	/*
	 * Ext.each(json.hiddenModel, function(n) { var item = { header : n.display,
	 * dataIndex : n.name, hidden : true }; items.push(item); });
	 */

	if (json.param.group && json.param.group.field != null
			&& json.param.group.sort != null) {
		Ext.each(json.hiddenModel, function(n) {
					if (json.param.group.field == n.name
							|| json.param.group.sort) {

						var item = {
							header : n.display,
							dataIndex : n.name,
							hidden : true

						};
						items.push(item);

					}
				});

	}

	cm = new Ext.grid.ColumnModel(items);

	// gridCMMap.put(gridId, cm);

	// query items to form items
	var queryItems = [];
	var queryComponent = {};
	var queryComponentNowhere = [];

	if (json.queryModel != null && json.queryModel.length > 0) {
		Ext.each(json.queryModel, function(queryItem) {
			var jsonObj = {
				defaultValue : queryItem.param,
				formName : queryItem.formName,
				label : (queryItem.translate
						? grooveTranslator.getLangLabel(querykey + '_query',
								(queryItem.table + '_' + queryItem.column))
						: queryItem.label),
				name : queryItem.column,
				type : queryItem.type,
				param : queryItem.jsonParam,
				mode : queryItem.mode
			}

			if (queryItem.jsonParam.target) {
				queryItem.jsonParam[queryItem.jsonParam.target] = queryItem.jsonParam.target;
			} else if (queryItem.jsonParam.forItem) {
				queryItem.jsonParam[queryItem.jsonParam.forItem] = queryItem.jsonParam.forItem;
			} else if (queryItem.jsonParam.targetName) {
				queryItem.jsonParam[queryItem.jsonParam.targetName] = queryItem.jsonParam.targetName;
			} else if (queryItem.jsonParam.targetType) {
				queryItem.jsonParam[queryItem.jsonParam.targetType] = queryItem.jsonParam.targetType;
			}

			queryItems.push(jsonObj);

			queryComponent[queryItem.formName] = jsonObj;
			queryComponentNowhere.push({
						id : queryItem.formName
					});
		});

		// gridQIMap.put(gridId, queryItems);

	}

	var defaultToolbarMenus = [];

	// 查询条件form在window窗口模式
	if (json.queryModel.length > 0 && layout == 'window') {

		defaultToolbarMenus.push({
			iconCls : 'objqueryset',
			text : grooveTranslator.getLangLabel('common-language', 'query'),
			handler : function() {
				// getQueryFormCmp(gridId,
				// title);

				var formObj = {
					id : gridId_ + '_queryForm',
					bodyStyle : 'padding:5px;',
					autoScroll : true,
					border : false,
					frame : false
				}

				if (json.param.labelAlign) {
					options.labelAlign = json.param.labelAlign;
				}
				
				if (json.param.labelWidth) {
					options.labelWidth = json.param.labelWidth;
				}

				var queryParams = Ext.getCmp(gridId).queryParams;

				if (queryParams != null) {
					var beanData = {};

					Ext.each(queryItems, function(item) {
						// item.defaultValue =
						// queryParams[item.formName];
						beanData[item.formName] = queryParams[item.formName];

						if (item.mode == '09') {
							beanData[item.formName + '_'] = queryParams[item.formName
									+ '_'];
						}
					});

					options.beanData = beanData;
				}

				var queryForm = getTableViewForm({
							component : queryComponent,
							componentNowhere : queryComponentNowhere,
							frozen : true,
							size : {
								columnCount : json.param.columnCount == null
										? 1
										: json.param.columnCount
							},
							param : {}
						}, options, formObj);

				var queryWin = new Ext.Window({
							renderTo : Ext.getBody(),
							layout : 'fit',
							width : json.param.width == null
									? 450
									: json.param.width,
							height : json.param.height == null
									? 300
									: json.param.height,
							title : grooveTranslator.getLangLabel(
									'common-language', 'query'),
							resizable : true,
							plain : true,
							modal : true,

							items : [queryForm],

							buttons : [{
								text : grooveTranslator.getLangLabel(
										'common-language', 'query'),
								handler : function() {
									if (queryForm.form.isValid()) {
										methods.checkboxReturn(queryForm);
										// methods.radioReturn(queryForm);

										initQueryTestParams(queryForm, gridId);

										reloadTQList(gridId);

										queryWin.close();
									}
								}
							}, {
								text : grooveTranslator.getLangLabel(
										'common-language', 'reset'),
								handler : function() {
									queryForm.form.getEl().dom.reset();

									var hiddenItems = queryForm.hiddenItems;

									if (hiddenItems != null) {
										Ext.each(hiddenItems, function(item) {
													queryForm
															.getForm()
															.findField(item.name)
															.setValue('');
												});
									}

									for (var i in Ext.getCmp(gridId).queryParams) {
										delete i;
									}
								}
							}, {
								text : grooveTranslator.getLangLabel(
										'common-language', 'close'),
								handler : function() {
									queryWin.close();
								}
							}]
						});

				queryWin.show();
			}
		});
	}

	if (listType == 'tablequerycmp') {
		// for table-view component 'tablequery'
		defaultToolbarMenus.push({
			iconCls : 'objselect',
			text : grooveTranslator.getLangLabel('common-language', 'select'),
			handler : function() {
				var ids = '';
				var names = '';
				var selNodes = grid.getSelectionModel().getSelections();
				var resultArray = [];
				Ext.each(selNodes, function(node, idx) {
							if (idx < selNodes.length - 1) {
								names += node.get(options.pointName) + ',';
								ids += node.get(options.pointId) + ',';
							} else {
								names += node.get(options.pointName);
								ids += node.get(options.pointId);
							}

							resultArray.push(node);
						});

				Ext.getCmp(options.formId).getForm().findField(Ext
						.getCmp(options.comboWithTooltip).id).setValue(names);
				Ext.getCmp(options.comboWithTooltip).value = ids;
				// Ext.getCmp(options.comboWithTooltip).lastSelectionText =
				// names;

				if (Ext.getCmp(options.formId).getForm()
						.findField(options.returnIdField)) {
					Ext.getCmp(options.formId).getForm()
							.findField(options.returnIdField).setValue(ids);
				}

				if (Ext.getCmp(options.formId).getForm()
						.findField(options.returnNameField)) {
					Ext.getCmp(options.formId).getForm()
							.findField(options.returnNameField).setValue(names);
				}

				if (options.setFunc) {
					options.setFunc(resultArray, grid);
				}

				Ext.getCmp(options.comboWithTooltip).collapse();
			}
		});
	} else if (listType == 'tablequerywindowcmp') {
		// for my select window
		defaultToolbarMenus.push({
			iconCls : 'objselect',
			text : grooveTranslator.getLangLabel('common-language', 'select'),
			handler : function() {
				var ids = '';
				var names = '';
				var selNodes = grid.getSelectionModel().getSelections();
				var resultArray = [];

				Ext.each(selNodes, function(node, idx) {
							if (idx < selNodes.length - 1) {
								names += node.get(options.pointName) + ',';
								ids += node.get(options.pointId) + ',';
							} else {
								names += node.get(options.pointName);
								ids += node.get(options.pointId);
							}

							resultArray.push(node);
						});

				if (options.setFunc) {
					options.setFunc(resultArray, grid);
				}

				if (options.formId != null
						&& Ext.getCmp(options.formId) != null) {
					if (Ext.getCmp(options.formId).getForm()
							.findField(options.returnIdField)) {
						Ext.getCmp(options.formId).getForm()
								.findField(options.returnIdField).setValue(ids);
					}

					if (Ext.getCmp(options.formId).getForm()
							.findField(options.returnNameField)) {
						Ext.getCmp(options.formId).getForm()
								.findField(options.returnNameField)
								.setValue(names);
					}
				}

				if (options.TQExtWindow != null) {
					var win = Ext.getCmp(options.TQExtWindow);
					win.close();
					win = null;
				}
			}
		});
	}

	if (listType == 'gridlist') {
		if (json.exporter != null) {
			initExportMenus(json.exporter, defaultToolbarMenus, querykey,
					gridId);
		}

		initTableViewToolbar(json.toolbars, defaultToolbarMenus, gridId,
				options);
		if (json.param.listenRemix != null && json.param.listenRemix == true) {
			if (methods.canFunction(querykey + '_remix')) {
				eval(querykey + '_remix(gridId, options, defaultToolbarMenus);');
			}
		}
	}

	if (json.param.prepare != null && json.param.prepare == true) {
		try {
			eval(querykey + '_prepare(json,options);');
		} catch (error) {
			alert(error.message);
		}
	}

	var queryUrl = context + '/system/tablearg.do?method=list&querykey='
			+ querykey;

	if (options.params) {
		queryUrl = queryUrl + '&' + jsonToParameters(options.params);
	}

	var dsJson = {
		idProperty : 'PAGINATION_NUMBER',
		remoteSort : false,
		totalProperty : 'totalCount',
		root : 'queryList',
		fields : json.fieldName,
		proxy : new Ext.data.HttpProxy({
					url : queryUrl
				})
	};

	if (json.param.group) {
		if (json.param.group.field == null || json.param.group.sort == null
				|| json.param.group.display == null) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'tablequery-language', 'alert-group'));
		}
		dsJson.reader = new Ext.data.JsonReader({
					root : 'queryList',
					totalProperty : 'totalCount',
					fields : json.fieldName
				});

		dsJson.groupField = json.param.group.field;
		dsJson.sortInfo = {
			field : json.param.group.sort,
			direction : 'ASC'
		}
	}

	var ds = json.param.group != null
			? new Ext.data.GroupingStore(dsJson)
			: new Ext.data.JsonStore(dsJson);

	/* 设置自定义参数 */
	ds.on('beforeload', function(thiz, options) {
				/* 查询参数 */
				var queryParams = getQueryParams(gridId);
				Ext.apply(thiz.baseParams, queryParams);
			});

	ds.on('load', function() {
		if (Ext.getCmp(gridId).rowSelectCache.size() > 0) {
			var records = new Array();
			ds.each(function(record) {
						if (gridObj.rowSelectCache
								.containsKey(record.data[gridObj.selectCacheKey])) {
							records.push(record);
						}
					});

			sm.selectRecords(records, true);
		}
	});

	var pageBar = new PageBarEx({
				gridId : gridId,
				store : ds,
				width : 50,
				pageSize : pageSize
			});

	if (showchk) {
		gridObj = {
			queryItems : queryItems,
			queryParams : {},
			id : gridId,
			gridId : gridId,
			cm : cm,
			ds : ds,
			sm : sm,
			title : listType == 'tablequerycmp' ? json.name : options.title,
			stripeRows : true,
			enableColumnResize : (json.param.enableColumnResize ? true : json.param.enableColumnResize),
			enableHdMenu : (json.param.enableHdMenu ? true : json.param.enableHdMenu),
			margins : '1 1 1 1',
			viewConfig : {
				forceFit : json.param.forceFit,
				templates : {
					cell : new Ext.Template(
							'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id}   x-selectable {css}" style="{style}"   tabIndex="0" {cellAttr}>',
							'<div class="x-grid3-cell-inner x-grid3-col-{id}"  {attr}>{value}</div>',
							'</td>')
				}
			},
			border : false,
			// config options for stateful behavior
			stateful : false,
			stateId : 'grid',
			loadMask : (json.param.gridMask == true),
			tbar : new Ext.Toolbar({
						id : gridId + '_toolbar',
						autoWidth : true,
						autoShow : true,
						items : [defaultToolbarMenus]
					}),
			bbar : pageBar.pageToolBar
		}

	} else {
		gridObj = {
			queryItems : queryItems,
			queryParams : {},
			id : gridId,
			gridId : gridId,
			cm : cm,
			ds : ds,
			title : listType == 'tablequerycmp' ? json.name : options.title,
			stripeRows : true,
			enableColumnResize : (json.param.enableColumnResize ? true : json.param.enableColumnResize),
			enableHdMenu : (json.param.enableHdMenu ? true : json.param.enableHdMenu),
			margins : '1 1 1 1',
			viewConfig : {
				forceFit : json.param.forceFit,
				templates : {
					cell : new Ext.Template(
							'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id}   x-selectable {css}" style="{style}"   tabIndex="0" {cellAttr}>',
							'<div class="x-grid3-cell-inner x-grid3-col-{id}"  {attr}>{value}</div>',
							'</td>')
				}
			},
			border : false,
			// config options for stateful behavior
			stateful : false,
			stateId : 'grid',
			loadMask : (json.param.gridMask == true),
			tbar : new Ext.Toolbar({
						id : gridId + '_toolbar',
						autoWidth : true,
						autoShow : true,
						items : [defaultToolbarMenus]
					}),
			bbar : pageBar.pageToolBar
		}
	}

	gridObj.Iload = function() {
		Ext.getCmp(gridId).store.load({
					params : {
						start : 0,
						limit : pageSize
					},
					callback : function(records, options, success) {
						TQStoreCallback(records, options, success, gridId);
					}
				});
	}

	if (json.param.group) {
		gridObj.view = new Ext.grid.GroupingView({
			forceFit : true,
			showGroupName : false,
			groupTextTpl : '{[values.rs[0].data["'
					+ json.param.group.display
					+ '"]]} ({[values.rs.length]} {[values.rs.length > 1 ? "人" : "人"]})'
		});
	}

	gridObj.rowSelectCache = new HashMap();

	gridObj.selectCacheKey = (options.pointId == null
			? 'PAGINATION_NUMBER'
			: options.pointId);

	// plug for table-row-style
	if (json.param.getRowClass && methods.canFunction(json.param.getRowClass)) {
		gridObj.viewConfig.getRowClass = function(record, rowIndex, rowParams,
				store) {
			try {
				var clsName = eval(json.param.getRowClass
						+ "(record, rowIndex, rowParams, store, gridId, options)");

				return clsName;
			} catch (e) {
				alert(e.name + ': ' + e.message);
			}
		}
	}

	var grid = new Ext.grid.GridPanel(gridObj);

	if (json.param.listenClick != null && json.param.listenClick == true) {
		if (methods.canFunction(querykey + '_click')) {
			grid.on('click', function(e) {
						try {
							eval(querykey + '_click(e, this, options);');
						} catch (error) {
							alert(error.name + ': ' + error.message);
						}
					});
		}
	}

	if (json.param.listenRowClick != null && json.param.listenRowClick == true) {
		if (methods.canFunction(querykey + '_rowclick')) {
			grid.on('rowclick', function(grid, rowIndex, e) {
						try {
							eval(querykey
									+ '_rowclick(grid, rowIndex, e, options);');
						} catch (error) {
							alert(error.name + ': ' + error.message);
						}

					});
		}
	}
	if (json.param.listenRowContextMenu != null
			&& json.param.listenRowContextMenu == true) {
		if (methods.canFunction(querykey + '_rowcontextmenu')) {
			grid.on('rowcontextmenu', function(grid, rowIndex, e) {
						try {
							eval(querykey
									+ '_rowcontextmenu(grid, rowIndex, e, options);');
						} catch (error) {
							alert(error.name + ': ' + error.message);
						}

					});
		}
	}

	/*
	 * Ext.MessageBox.show({ title : '', msg : '数据加载中，请稍等...', progressText :
	 * '', width : 300, wait : true, progress : true, closable : false,
	 * waitConfig : { interval : 600 }, animEl : 'loading' });
	 */

	var gridMask;

	if (false && json.param.gridMask) {
		gridMask = new Ext.LoadMask(Ext.getBody(), {
					msg : grooveTranslator.getLangLabel('common-language',
							'list-loading')
				});
		gridMask.show();
	}

	if (func) {
		func(gridId);
	}

	if (options.isDormant != true && listType != 'tablequerycmp') {
		ds.load({
					params : {
						start : 0,
						limit : pageSize
					},
					callback : function(records, options, success) {
						TQStoreCallback(records, options, success, gridId);
						if (false && json.param.gridMask) {
							gridMask.hide();
						}
					}
				});

	}

	if (json.param.after != null && json.param.after == true) {
		try {
			eval(querykey + '_after(grid);');
		} catch (error) {
			alert(error.message);
		}
	}

	if (layout == 'border') {
		var items = [];

		if (json.queryModel.length > 0) {
			var formObj = {
				bodyStyle : 'padding:5px;',
				autoScroll : true,
				border : false,
				frame : false
			}

			if (json.param.labelAlign) {
				formObj.labelAlign = json.param.labelAlign;
			}

			var queryForm = getTableViewForm({
						id : gridId_ + '_queryForm',
						component : queryComponent,
						componentNowhere : queryComponentNowhere,
						size : {
							columnCount : json.param.columnCount == null
									? 2
									: json.param.columnCount
						},
						param : {}
					}, options, formObj);

			queryForm.title = grooveTranslator.getLangLabel(
					'tablequery-language', 'form-title');
			queryForm.autoWidth = true;

			var buttons = ['->'];

			buttons.push({
						text : grooveTranslator.getLangLabel('common-language',
								'query'),
						iconCls : 'icon-query',
						handler : function() {
							if (queryForm.form.isValid()) {
								methods.checkboxReturn(queryForm);
								// methods.radioReturn(queryForm);

								initQueryTestParams(queryForm, gridId);

								reloadTQList(gridId);
							}
						}
					});

			buttons.push({
						text : grooveTranslator.getLangLabel('common-language',
								'reset'),
						iconCls : 'icon-reset',
						handler : function() {
							queryForm.form.reset();
						}
					});

			var height;

			if (options.height != null) {
				height = options.height;
			} else {
				height = json.param.height == null
						? 100
						: (json.param.height / 3);
			}

			items.push(new Ext.Panel({
						region : 'north',
						height : height,
						title : grooveTranslator.getLangLabel(
								'tablequery-language', 'form-title'),
						autoScroll : true,
						split : true,// 显示分隔条
						collapsible : true,
						collapsed : (listType == 'gridlist'
								? false
								: json.param.collapsed == true),
						cmargins : '1 1 1 1',
						items : [queryForm],
						border : false,
						frame : false,
						bbar : buttons
					}));
		}

		grid.region = 'center';

		items.push(grid);

		var borderPanel = new Ext.Panel({
					title : options.title,
					layout : 'border',
					id : gridId_,
					gridId : gridId,
					items : items

				});

		return borderPanel;
	}

	return grid;
}

/**
 * for tableview.item.type=='tablequery'
 * 
 * @param {}
 *            options
 */
function initTVqueryList(options) {
	if (tablequeryStuff[options.querykey]) {
		var tabid = options.tabid;
		var querykey = options.querykey;
		var func = options.func;
		var pageSize = options.pageSize ? options.pageSize : 20;
		options.type = 'tablequerycmp';
		options.layout = 'border';
		/*
		 * var url = context +
		 * '/system/tablearg.do?method=modelcmp&comptype=TQExtTabList&' + param;
		 */

		var url = context + "/temp-store/jsstuff/tablequery/"
				+ tablequeryStuff[querykey] + "/" + querykey + ".json";

		// var result = sendRequest(url);

		var xmlhttp = sendRequestObject(url);
		if (xmlhttp.status == 200) {
			var resultJson = Ext.util.JSON.decode(xmlhttp.responseText);

			if (resultJson.success) {
				var json = resultJson.resultData;

				var grid = createTableQueryList(tabid, options, resultJson);

				return grid;
			} else {
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'tablequery-language', 'alert-getjson')
								+ '(' + options.querykey + ')');
				return null;
			}

		}
	} else {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('tablequery-language',
						'alert-notfound')
						+ '(' + options.querykey + ')');
		return null;
	}
}

/**
 * return table-query grid for what you want
 * 
 * @param {}
 *            options
 */
function tvquery(options) {
	var tabid = options.tabid;
	var querykey = options.querykey;
	// var func = options.func;
	// var pageSize = options.pageSize ? options.pageSize : 20;

	/*
	 * var url = context +
	 * '/system/tablearg.do?method=modelcmp&comptype=TQExtTabList&' + param;
	 */
	// default gridId
	var gridId = querykey;

	if (options.gridId) {
		// first prior for given
		gridId = options.gridId;
	} else if (options.tabid) {
		// second prior for menu
		gridId = options.tabid;
	}

	var url = context + "/temp-store/jsstuff/tablequery/"
			+ tablequeryStuff[querykey] + "/" + querykey + ".json";

	// var result = sendRequest(url);

	var xmlhttp = sendRequestObject(url);
	if (xmlhttp.status == 200) {
		var resultJson = Ext.util.JSON.decode(xmlhttp.responseText);

		if (resultJson.success) {
			var json = resultJson.resultData;

			if (tabid == null) {
				tabid = json.id;
			}

			var grid = createTableQueryList(gridId, options, resultJson);

			return grid;
		} else {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'tablequery-language', 'alert-getjson')
							+ '(' + options.querykey + ')');
			return null;
		}

	}
}

// 可自定义每页显示数量的扩展对象
var PageBarEx = function(config) {
	this.pageSize = config.pageSize || 10; // 默认每页显示10条
	this.maxSize = config.maxSize || 5000; // 默认最大每页显示1000条
	this.width = config.width || 50; // 输入框的宽度
	this.store = config.store;

	var thiz = this; // 引用PageBarEx对象,KeyMap中有用
	this.pageSizeF = new Ext.form.NumberField({
				width : this.width,
				minValue : 1,
				value : this.pageSize,
				listeners : {
					render : function(field) {
						if (field.getValue() != thiz.pageSize) {
							new Ext.KeyMap(field.id, {
										key : 13,
										fn : function() {
											thiz.setPageSize();
											reloadTQList(config.gridId);
										}
									});
						}
					},
					blur : function(field) {
						if (field.getValue() != thiz.pageSize) {
							thiz.setPageSize();

							reloadTQList(config.gridId);
						}
					}
				}
			});

	this.pageToolBar = new Ext.PagingToolbar({
				pageSize : this.pageSize,
				store : this.store,
				displayInfo : true,
				displayMsg : grooveTranslator.getLangLabel(
						'tablequery-language', 'list-displaymsg'),
				emptyMsg : grooveTranslator.getLangLabel('tablequery-language',
						'list-emptymsg')
			});

	this.pageToolBar.addSeparator();
	this.pageToolBar.addText(grooveTranslator.getLangLabel(
			'tablequery-language', 'list-page'));
	this.pageToolBar.addField(this.pageSizeF);
	this.pageToolBar.addText(grooveTranslator.getLangLabel(
			'tablequery-language', 'list-data'));

	/**
	 * 设置每页条数
	 */
	this.setPageSize = function() {
		var pageS = this.pageSizeF.getValue();
		if (pageS != '' && pageS > 0) {
			if (pageS > this.maxSize)
				pageS = this.maxSize;
			this.pageSize = pageS;
		} else {
			this.pageSize = 10;
		}
		this.pageSizeF.setValue(this.pageSize);
		this.pageToolBar.pageSize = this.pageSize;
		this.store.baseParams.limit = this.pageSize;
	};
};

/**
 * 默认的在查询列表页面添加自定义组件方法
 * 
 * @param {}
 *            querykey
 */
function addMeMix(querykey) {

}

var tablequeryMethods = {
	hasSelectGridRecord : function(ids, recordId) {
		var r = false;

		var idstr = ids.split(',');
		for (var i = 0; i < idstr.length; i++) {
			if (idstr[i] == recordId) {
				r = true;
				break;
			}
		}
		return r;
	},
	resetStoreProxy : function(gridId, params) {
		if (Ext.getCmp(gridId) && params != null) {
			var url = Ext.getCmp(gridId).store.proxy.url;

			// 截取原url的?前内容
			var urlString = url.indexOf('?') > -1 ? url.substring(0, url
							.indexOf('?')) : url;

			// 获取原url携带的参数map
			var paramsJson = urlToObject(url);

			// 遍历新参数json对象
			for (var i in params) {
				var key = i;

				if (typeof params[i] == 'object') {
					// do nothing
				} else {
					// 设置参数map内容
					paramsJson[i] = params[i];
				}
			}

			var count = 0;

			// 将参数map挂至url
			for (var i in paramsJson) {
				var key = i;

				if (typeof paramsJson[i] == 'object') {
					// do nothing
				} else {
					// 设置参数map内容
					if (count == 0) {
						urlString += '?' + i + '=' + paramsJson[i];
					} else {
						urlString += '&' + i + '=' + paramsJson[i];
					}

					count++;
				}
			}

			Ext.getCmp(gridId).store.proxy = new Ext.data.HttpProxy({
						url : urlString
					});
		} else {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'tablequery-language', 'alert-notfound')
							+ '(' + gridId + ')');
		}
	}
}
