// 用在extframe框架中,代替原iframe模式,实现真正意义上的ext grid application
document
		.write("<script src=\""
				+ context
				+ "/temp-store/jsstuff/tableview/bestboy.js\" type=\"text/javascript\"></script>");

var minLengthText = 'You input the content of too little(Include at least {0} english characters or {1} chinese characters)';

var maxLengthText = 'You input the content of too much(Most contain characters {0} english characters or {1} chinese characters)';

Ext.override(Ext.form.TextField, {
			validateValue : function(value) {
				if (value.length < 1 || value === this.emptyText) { // if
					// it's
					// blank
					if (this.allowBlank) {
						this.clearInvalid();
						return true;
					} else {
						this.markInvalid(this.blankText);
						return false;
					}
				}
				var valueLength = methods.checkStringlength(value);
				if (valueLength < this.minLength) {
					this.markInvalid(String.format(minLengthText,
							this.minLength, this.minLength / 2));
					return false;
				}
				// except for length = -1
				if (this.maxLength > 0 && valueLength > this.maxLength) {
					this.markInvalid(String.format(maxLengthText,
							this.maxLength, this.maxLength / 2));
					return false;
				}
				if (this.vtype) {
					var vt = Ext.form.VTypes;
					if (!vt[this.vtype](value, this)) {
						this.markInvalid(this.vtypeText
								|| vt[this.vtype + 'Text']);
						return false;
					}
				}
				if (typeof this.validator == "function") {
					var msg = this.validator(value);
					if (msg !== true) {
						this.markInvalid(msg);
						return false;
					}
				}
				if (this.regex && !this.regex.test(value)) {
					this.markInvalid(this.regexText);
					return false;
				}
				return true;
			}
		});

/**
 * 初始化视图(作为tabpanel的tab)
 * 
 * @param {}
 *            options
 */
function initTableViewTab(options) {
	var url = context + "/temp-store/jsstuff/tableview/"
			+ tableviewStuff[options.id] + "/" + options.id + ".json";

	Ext.Ajax.request({
				url : url,
				params : {},
				method : 'POST',
				success : function(rs, request) {
					var result = rs.responseText;// 拿到结果集，此时为字符串

					var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

					if (resultJson.success) {
						// methods.loadJSCSS(resultJson);

						var viewSize = Ext.util.JSON.decode(resultJson.size);
						resultJson.size = viewSize;

						createTableViewTab(resultJson, options);
					} else {
						Ext.MessageBox.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								'tableview(' + options.id
										+ ') json structure is invalid.');
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							response.status);
				}
			});
}

/**
 * 初始化table-view-window
 * 
 * @param {}
 *            options
 * @param {}
 *            myButtons
 */
function initTableViewWindow(options) {
	var url = context + "/temp-store/jsstuff/tableview/"
			+ tableviewStuff[options.id] + "/" + options.id + ".json";

	Ext.Ajax.request({
				url : url,
				params : {},
				method : 'POST',
				success : function(rs, request) {
					var result = rs.responseText;// 拿到结果集，此时为字符串

					var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

					if (resultJson.success) {
						// methods.loadJSCSS(resultJson);
						if (options.params == null) {
							options.params = {};
						}

						createTableViewWindow(resultJson, options);
					} else {
						Ext.MessageBox.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								'tableview(' + options.id
										+ ') json structure is invalid.');
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							response.status);
				}
			});
}

/**
 * 初始化自定义button的table-view-window
 * 
 * @param {}
 *            options
 * @param {}
 *            myButtons
 */
function initTableViewWindowFrame(options, myButtons) {
	var url = context + "/temp-store/jsstuff/tableview/"
			+ tableviewStuff[options.id] + "/" + options.id + ".json";

	Ext.Ajax.request({
				url : url,
				params : {},
				method : 'POST',
				success : function(rs, request) {
					var result = rs.responseText;// 拿到结果集，此时为字符串

					var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

					if (resultJson.success) {
						// methods.loadJSCSS(resultJson);
						if (options.params == null) {
							options.params = {};
						}

						createTableViewWindowFrame(resultJson, options,
								myButtons);
					} else {
						Ext.MessageBox.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								'tableview(' + options.id
										+ ') json structure is invalid.');
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							response.status);
				}
			});
}

/**
 * 初始化table-view for aftercall
 * 
 * @param {}
 *            options
 * @param {}
 *            aftercall
 */
function initTableViewForm(options, aftercall) {
	var resultJson = methods.getTableViewObject(options.id);// 将字符串转换为json类型

	// methods.loadJSCSS(resultJson);
	if (options.params == null) {
		options.params = {};
	}
	// 默认参数
	var params = options.params;

	// 存在主表主键value,执行编辑操作
	if (params[resultJson.primaryTableColumnFormName]) {
		initTableView(resultJson.id,
				params[resultJson.primaryTableColumnFormName], function(o) {
					options.beanData = o.resultData;

					var form = getTableViewForm(resultJson, options, {
								title : options.title,
								autoScroll : true,
								iconCls : 'tabs',
								border : false,
								frame : (options.frame != null
										? options.frame
										: false)
							});

					if (aftercall != null) {
						aftercall(form);
					}
				}, false)
	} else {
		var form = getTableViewForm(resultJson, options, {
					title : options.title,
					autoScroll : true,
					iconCls : 'tabs',
					border : false,
					frame : (options.frame != null ? options.frame : false)
				});

		if (aftercall != null) {
			aftercall(form);
		}
	}
}

/**
 * 从json结构定义中初始化form
 * 
 * @param {}
 *            resultJson
 * @param {}
 *            options
 */
function createTableViewTab(resultJson, options) {
	if (Ext.getCmp(options.tabid) == null) {
		if (options.params == null) {
			options.params = {};
		}
		// 默认参数
		var params = options.params;

		// 存在主表主键value,执行编辑操作
		if (params[resultJson.primaryTableColumnFormName]) {
			initTableView(resultJson.id,
					params[resultJson.primaryTableColumnFormName], function(o) {
						options.beanData = o.resultData;

						var form = getTableViewForm(resultJson, options, {
							id : options.tabid,
							title : (options.title == null
									? resultJson.name
									: options.title),
							autoScroll : true,
							iconCls : 'tabs',
							border : false,
							frame : (options.frame != null
									? options.frame
									: false),
							closable : true,
							buttons : [{
								text : grooveTranslator.getLangLabel(
										'common-language', 'submit'),
								handler : function() {
									methods.submitViewForm(resultJson, form,
											function() {
												if (options.aftercall) {
													options.aftercall(options,
															form);
												}

												Ext.Msg
														.alert(
																grooveTranslator
																		.getLangLabel(
																				'common-language',
																				'prompt'),
																grooveTranslator
																		.getLangLabel(
																				'tableview-language',
																				'save-success'));
												Ext
														.getCmp(options.tabcontainerid)
														.remove(form);
											});
								}
							}, {
								text : grooveTranslator.getLangLabel(
										'common-language', 'close'),
								handler : function() {
									Ext.getCmp(options.tabcontainerid)
											.remove(form);
								}
							}]
						});

						Ext.MessageBox.hide();

						Ext.getCmp(options.tabcontainerid).add(form).show();
					})
		} else {
			var form = getTableViewForm(resultJson, options, {
						id : options.tabid,
						title : (options.title == null
								? resultJson.name
								: options.title),
						autoScroll : true,
						iconCls : 'tabs',
						border : false,
						frame : (options.frame != null ? options.frame : false),
						closable : true,
						buttons : [{
							text : grooveTranslator.getLangLabel(
									'common-language', 'submit'),
							handler : function() {
								methods.submitViewForm(resultJson, form,
										function() {
											if (options.aftercall) {
												options
														.aftercall(options,
																form);
											}

											Ext.Msg
													.alert(
															grooveTranslator
																	.getLangLabel(
																			'common-language',
																			'prompt'),
															grooveTranslator
																	.getLangLabel(
																			'tableview-language',
																			'save-success'));
											Ext.getCmp(options.tabcontainerid)
													.remove(form);
										});
							}
						}, {
							text : grooveTranslator.getLangLabel(
									'common-language', 'close'),
							handler : function() {
								Ext.getCmp(options.tabcontainerid).remove(form);
							}
						}]
					});

			Ext.MessageBox.hide();

			Ext.getCmp(options.tabcontainerid).add(form).show();
		}

	} else {
		Ext.getCmp(options.tabcontainerid).setActiveTab(Ext
				.getCmp(options.tabid));
	}
	// Ext.getCmp(options.tabcontainerid).setActiveTab(form);
}

/**
 * create table-view in window
 * 
 * @param {}
 *            resultJson
 * @param {}
 *            options
 */
function createTableViewWindow(resultJson, options) {

	var width = 500;
	var height = 400;

	var viewSize = Ext.util.JSON.decode(resultJson.size);
	resultJson.size = viewSize;

	try {
		width = ((viewSize.width == null || isNaN(viewSize.width))
				? 500
				: viewSize.width);
		height = ((viewSize.height == null || isNaN(viewSize.height))
				? 400
				: viewSize.height);
	} catch (error) {
		alert('The wrong setting of size for tableview, size setting must be json format, such as {width:500, height:400}');
		return;
	}
	// 默认参数
	var params = options.params;

	if (options.frozen) {
		resultJson.frozen = options.frozen;
	}

	var formObj = {
		bodyStyle : 'padding:5px;',
		autoScroll : true,
		border : false,
		frame : (options.frame != null ? options.frame : false)
	};

	if (options.id) {
		formObj.id = options.id;

		if (Ext.getCmp(formObj.id)) {
			return false;
		}
	}

	var title = (options.title ? options.title : resultJson.name);

	if (params[resultJson.primaryTableColumnFormName]) {
		initTableView(resultJson.id,
				params[resultJson.primaryTableColumnFormName], function(o) {
					options.beanData = o.resultData;

					var form = getTableViewForm(resultJson, options, formObj);

					var winObj = {
						renderTo : Ext.getBody(),
						layout : 'fit',
						width : width,
						height : height,
						title : title,
						plain : true,
						modal : options.modal != null ? options.modal : true,
						border : options.border != null
								? options.border
								: false,

						items : [form]
					};

					winObj.buttons = [];

					if (resultJson.handlemode != 'view') {
						winObj.buttons.push({
							text : grooveTranslator.getLangLabel(
									'common-language', 'submit'),
							handler : function() {

								methods.submitViewForm(resultJson, form,
										function() {
											Ext.Msg
													.alert(
															grooveTranslator
																	.getLangLabel(
																			'common-language',
																			'prompt'),
															grooveTranslator
																	.getLangLabel(
																			'tableview-language',
																			'save-success'));

											if (options.aftercall) {
												options
														.aftercall(options,
																form);
											}

											if (options.gridId) {
												reloadTQList(options.gridId);
											}

											viewWin.close();
											viewWin = null;
										}, options.beforecall, options.msg);
							}
						});
					}

					winObj.buttons.push({
								text : grooveTranslator.getLangLabel(
										'common-language', 'close'),
								handler : function() {
									viewWin.close();
									viewWin = null;
								}
							});

					var viewWin = new Ext.Window(winObj);

					viewWin.show(this);
				});
	} else {
		var form = getTableViewForm(resultJson, options, formObj);

		var viewWin = new Ext.Window({
					renderTo : Ext.getBody(),
					layout : 'fit',
					width : width,
					height : height,
					title : title,
					plain : true,
					modal : options.modal != null ? options.modal : true,
					border : options.border != null ? options.border : false,

					items : [form],

					buttons : [{
						text : grooveTranslator.getLangLabel('common-language',
								'submit'),
						handler : function() {
							methods.submitViewForm(resultJson, form,
									function() {
										if (options.aftercall) {
											options.aftercall(options, form);
										}

										Ext.Msg.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator.getLangLabel(
														'tableview-language',
														'save-success'));

										if (options.gridId) {
											reloadTQList(options.gridId);
										}

										viewWin.close();
										viewWin = null;
									}, options.beforecall, options.msg);
						}
					}, {
						text : grooveTranslator.getLangLabel('common-language',
								'close'),
						handler : function() {
							viewWin.close();
							viewWin = null;
						}
					}]
				});

		viewWin.show(this);
	}

}

/**
 * 
 * @param {}
 *            resultJson
 * @param {}
 *            options
 * @param {}
 *            buttons
 */
function createTableViewWindowFrame(resultJson, options, myButtons) {
	var width = 500;
	var height = 400;

	var viewSize = Ext.util.JSON.decode(resultJson.size);
	resultJson.size = viewSize;

	try {
		width = ((viewSize.width == null || isNaN(viewSize.width))
				? 500
				: viewSize.width);
		height = ((viewSize.height == null || isNaN(viewSize.height))
				? 400
				: viewSize.height);
	} catch (error) {
		alert('The wrong setting of size for tableview, size setting must be json format, such as {width:500, height:400}');
		return;
	}
	// 默认参数
	var params = options.params;

	if (options.frozen) {
		resultJson.frozen = options.frozen;
	}

	var formObj = {
		bodyStyle : 'padding:5px;',
		autoScroll : true,
		border : false,
		frame : (options.frame != null ? options.frame : false)
	};

	if (options.id) {
		formObj.id = options.id;

		if (Ext.getCmp(formObj.id)) {
			return false;
		}
	}

	var buttons = (myButtons != null ? myButtons : []);

	if (params[resultJson.primaryTableColumnFormName]) {
		initTableView(resultJson.id,
				params[resultJson.primaryTableColumnFormName], function(o) {
					options.beanData = o.resultData;

					var form = getTableViewForm(resultJson, options, formObj);

					var viewWinObj = {
						renderTo : Ext.getBody(),
						layout : 'fit',
						width : width,
						height : height,
						title : resultJson.name,
						plain : true,
						modal : options.modal != null ? options.modal : false,
						border : options.border != null
								? options.border
								: false,
						maximizable : true,
						items : [form],

						buttons : [buttons, {
							text : grooveTranslator.getLangLabel(
									'common-language', 'close'),
							handler : function() {
								viewWin.close();
								viewWin = null;
							}
						}]
					};

					if (options.windowId != null) {
						viewWinObj.id = options.windowId;
					}

					var viewWin = new Ext.Window(viewWinObj);

					viewWin.show(this);
				});
	} else {
		var form = getTableViewForm(resultJson, options, formObj);

		var viewWinObj = {
			renderTo : Ext.getBody(),
			layout : 'fit',
			width : width,
			height : height,
			title : resultJson.name,
			plain : true,
			modal : options.modal != null ? options.modal : false,
			border : options.border != null ? options.border : false,
			maximizable : true,
			items : [form],

			buttons : [buttons, {
				text : grooveTranslator
						.getLangLabel('common-language', 'close'),
				handler : function() {
					viewWin.close();
					viewWin = null;
				}
			}]
		};

		if (options.windowId != null) {
			viewWinObj.id = options.windowId;
		}

		var viewWin = new Ext.Window(viewWinObj);

		viewWin.show(this);
	}

}

var tableViewFormIdx = 0;

/**
 * 视图form
 * 
 * @param {}
 *            view resultJson
 * @param {}
 *            options
 * @param {}
 *            formObj
 * @return {}
 */
function getTableViewForm(resultJson, options, formObj) {

	var frozen = resultJson.frozen != null ? resultJson.frozen : false;

	var formId;

	if (formObj.id == null) {
		// init form.id with table.view.id
		formId = resultJson.id;
	} else {
		// set default form.id
		formId = formObj.id;
	}

	if (!frozen) {
		formId += '_viewForm_' + tableViewFormIdx;
		tableViewFormIdx++;
	}

	formObj.id = formId;

	var viewFormArray = [];

	// formObj.items = viewFormArray;
	// formObj.pwdItems = pwdItems;
	// formObj.checkboxes = checkboxes;
	formObj.hiddenItems = [];
	// formObj.radios = radios;
	if (formObj.bodyStyle == null) {
		formObj.bodyStyle = 'padding:5px;';
	}
	// group-fieldset-map
	formObj.fieldsetMap = new HashMap();
	// global counter index
	formObj.counterIdx = 0;
	// set default properties
	formObj.tableViewID = resultJson.id;
	formObj.resultJson = resultJson;

	formObj.labelAlign = options.labelAlign != null
			? options.labelAlign
			: (resultJson.param.labelAlign != null
					? resultJson.param.labelAlign
					: 'left');

	formObj.labelWidth = options.labelWidth != null
			? options.labelWidth
			: (resultJson.param.labelWidth != null
					? resultJson.param.labelWidth
					: 100);	

	// 密码item
	// var pwdItems;

	// 是否上传文件附件
	// var fileUpload = true;

	// checkbox items
	// var checkboxes;

	// radio items
	// var radios;

	var formLoadData = (options.beanData != null);

	if (resultJson.param.prepare != null && resultJson.param.prepare == true) {
		try {
			eval(resultJson.id + '_prepare(resultJson, formLoadData, options);');
		} catch (error) {
			alert(error.message);
		}
	}

	methods.layoutTableView(viewFormArray, resultJson, options, formObj, {});

	if (formObj.hiddenItems.length > 0) {
		viewFormArray = viewFormArray.concat(formObj.hiddenItems);
	}

	var viewForm = new Ext.FormPanel(formObj);

	for (var i = 0; i < viewFormArray.length; i++) {
		viewForm.add(viewFormArray[i]);
	}

	if (resultJson.param.listenLayout != null
			&& resultJson.param.listenLayout == true) {
		if (methods.canFunction(resultJson.id + '_layout')) {

			viewForm.layoutMe = true;
			viewForm.on('afterlayout', function(thiz) {
				if (thiz.layoutMe) {
					try {
						eval(resultJson.id
								+ '_layout(resultJson, thiz, formLoadData, options);');
					} catch (error) {
						alert(error.message);
					}
				}
				thiz.layoutMe = false;
			});
		}
	}

	if (resultJson.param.listenRender != null
			&& resultJson.param.listenRender == true) {
		viewForm.renderMe = true;
		viewForm.on('afterrender', function(thiz) {
			if (thiz.renderMe) {
				thiz.getForm().isValid();

				try {
					eval(resultJson.id
							+ '_render(resultJson, thiz, formLoadData, options);');
				} catch (error) {
					alert(error.message);
				}
			}
			viewForm.renderMe = false;
		});
	}

	return viewForm;
}

function findListInTableView(listId, componentInList) {
	var resultObj = null;
	if (componentInList != null) {
		// list viewList
		Ext.each(componentInList, function(cilObj, i) {
					if (listId == cilObj.id) {
						resultObj = cilObj;
						// methods.arrayRemove(componentInList, i);
						return false;
					}

				});
	};

	return resultObj;
}

function deleteListInTableView() {

}

/**
 * 初始化视图列表(mode=edit)
 * 
 * @param {}
 *            cilObj
 */
function initEditListInTableView(cilObj, resultJson, options, formId) {
	var griditems = [];

	var fieldName = [];

	var gridId = formId + '_' + cilObj.id;

	var p = {};

	var sm;

	if (!options.globalReadOnly) {
		sm = new Ext.grid.CheckboxSelectionModel({
					// handleMouseDown : Ext.emptyFn,
					singleSelect : false
				});

		griditems.push(sm);
	}

	var cilObjitems = cilObj.items;

	var renderName = cilObj.id;

	// list component in viewList
	Ext.each(cilObjitems, function(item, j) {
				var cilObjItem = cilObj.component[item.id];

				// push fieldsName
				fieldName.push({
							'name' : cilObjItem.name
						});

				if (cilObjItem.param.showInGrid == null
						|| cilObjItem.param.showInGrid == true) {
					var item = {
						header : cilObjItem.label,
						dataIndex : cilObjItem.name,
						sortable : true,
						listeners : {}
					}

					if (!options.globalReadOnly && cilObjItem.type != 'hidden'
							&& cilObjItem.param.readOnly != true) {
						item.editor = methods.initExtFieldItemInList(item,
								cilObjItem, resultJson, options, formId,
								cilObj, gridId);
					}

					if (cilObjItem.param.summaryType != null) {
						item.summaryType = cilObjItem.param.summaryType;
					}

					if (cilObjItem.param.summaryRenderer != null
							&& methods
									.canFunction(cilObjItem.param.summaryRenderer)) {
						item.summaryRenderer = function(v, params, data) {
							return eval(cilObjItem.param.summaryRenderer
									+ '(v, params, data);')
						}
					}

					if (cilObjItem.type == 'date') {
						item.renderer = Ext.util.Format.dateRenderer('Y-m-d');
					} else if (cilObjItem.type == 'time') {
						item.renderer = Ext.util.Format
								.dateRenderer('Y-m-d H:i:s');
					} else if (cilObjItem.type == 'money') {
						item.renderer = function(v, c, r, row, col, s) {
							return methods.RMBMoney(v);
						}
					} else if (cilObjItem.type == 'select') {
						item.renderer = function(v, c, r, row, col, s) {
							if (item.editor != null) {
								// edit
								var rowIndex = item.editor.store.find(
										item.editor.valueField, v);

								if (rowIndex < 0)
									return '';
								var record = item.editor.store.getAt(rowIndex);
								return record ? record
										.get(item.editor.displayField) : '';
							} else if (cilObjItem.param.target != null) {
								// readonly
								var returnName = r.data[cilObjItem.param.target];

								return returnName;
							}

							return v;
						}

					}

					if (cilObjItem.param.needRender != null
							&& cilObjItem.param.needRender == true) {
						item.renderer = function(v, c, r, row, col, s) {
							var resultObj = v;

							if (methods.canFunction(renderName)) {
								try {
									resultObj = eval(renderName
											+ "(v, c, r, row, col, s, "
											+ gridId + ", item)");
								} catch (e) {
									alert(e.message);
								}
							}

							return resultObj;
						}
					}

					griditems.push(item);
				}
			});

	var tbar;

	if (!options.globalReadOnly) {
		tbar = new Ext.Toolbar({
			autoWidth : true,
			autoShow : true,
			items : [{
				iconCls : 'add',
				text : ' Add ',
				handler : function() {
					var Plant = Ext.data.Record.create(grid.getStore().fields);

					var pObj = {};

					Ext.each(cilObjitems, function(item, j) {
								var cilObjItem = cilObj.component[item.id];

								pObj[cilObjItem.name] = cilObjItem.defaultValue;
							});

					if (cilObj.param.autoOrderField) {
						pObj[cilObj.param.autoOrderField] = new Date()
								.getTime();
					}
					// 设置自动编号
					if (cilObj.param.autoNumberField) {
						pObj[cilObj.param.autoNumberField] = grid.getStore()
								.getCount()
								+ 1;
					}
					var p = new Plant(pObj);

					grid.stopEditing();

					grid.getStore().insert(grid.getStore().getCount(), p);

					grid.startEditing(grid.getStore().getCount() - 1, 1);
				}
			}, {
				iconCls : 'delete',
				text : ' Delete ',
				disabled : true,
				handler : function() {
					removeDataFromGrid(grid, cilObj, formId);
				}
			}]
		});

	}

	var cm = new Ext.grid.ColumnModel(griditems);

	var xg = Ext.grid;

	var grid = null;

	var gridCollapsible = (cilObj.param.collapsible == null
			? false
			: cilObj.param.collapsible);

	// grid default collapsible
	var gridCollapsed = (cilObj.param.collapsed == null
			? false
			: cilObj.param.collapsed);

	if (options.beanData != null && options.beanData[cilObj.id] != null) {
		if (options.beanData[cilObj.id].length > 0) {
			// if grid store has data
			gridCollapsed = false;
		}
	}

	if (cilObj.param.groupField) {
		var ds = new Ext.data.GroupingStore({
					reader : new Ext.data.JsonReader({
								fields : fieldName
							}),
					// use local data
					data : [],
					sortInfo : {
						field : cilObj.forTablePrimaryColumnName,
						direction : 'ASC'
					},
					groupField : cilObj.param.groupField
				});

		grid = new xg.EditorGridPanel({
			id : gridId,
			ds : ds,
			sm : sm,
			cm : cm,
			view : new Ext.grid.GroupingView({
						showGroupName : false,
						enableNoGroups : false,
						enableGroupingMenu : false,
						hideGroupedColumn : false
					}),
			style : 'margin-top:5px;margin-bottom:5px',
			tbar : tbar,
			frame : true,
			border : true,
			collapsible : gridCollapsible,
			collapsed : gridCollapsed,
			titleCollapse : true,
			animCollapse : false,
			trackMouseOver : false,
			title : (cilObj.param.title != null ? cilObj.param.title : ''),
			width : cilObj.param.width,
			height : cilObj.param.height,
			cilObj : cilObj,
			viewConfig : {
				forceFit : (cilObj.param.forceFit == true)
			},
			clicksToEdit : 1
				// enableColumnMove: false,
			});
	} else {
		var ds = new Ext.data.JsonStore({
					fields : fieldName
				});

		var gridObj = {
			id : gridId,
			ds : ds,
			sm : sm,
			cm : cm,
			style : 'margin-top:5px;margin-bottom:5px',
			tbar : tbar,
			frame : true,
			border : true,
			clicksToEdit : 1,
			collapsible : gridCollapsible,
			collapsed : gridCollapsed,
			titleCollapse : true,
			animCollapse : false,
			trackMouseOver : false,
			title : (cilObj.param.title != null ? cilObj.param.title : ''),
			width : cilObj.param.width,
			height : cilObj.param.height,
			cilObj : cilObj,
			// enableColumnMove: false,
			viewConfig : {
				forceFit : (cilObj.param.forceFit == true)
			}
		}

		if (cilObj.param.summary == true) {
			var summary = new Ext.ux.grid.GridSummary();

			gridObj.plugins = summary;

			tbar.addItem({
						text : 'Toggle',
						tooltip : 'Toggle the visibility of summary row',
						handler : function() {
							summary.toggleSummaries();
						}
					});
		}

		grid = new xg.EditorGridPanel(gridObj);
	}

	if (options.beanData != null && options.beanData[cilObj.id] != null) {
		Ext.each(options.beanData[cilObj.id], function(data) {
					var Plant = Ext.data.Record.create(grid.getStore().fields);

					var p = new Plant(data);

					ds.insert(ds.getCount(), p);
				});
	}

	if (!options.globalReadOnly) {
		grid.on('click', function(e) {
					if (grid.getSelectionModel().hasSelection()) {
						tbar.items.itemAt(1).enable();
					} else {
						tbar.items.itemAt(1).disable()
					}
				});

		/*
		 * grid.on('cellmousedown', function(thiz, rowIndex, e) { var cellEditor =
		 * thiz.colModel.getColumnAt(e).editor;//thiz.colModel.getCellEditor(e,
		 * rowIndex); if (cellEditor != null && cellEditor.xtype == 'combo') {
		 * var record = thiz.store.getAt(rowIndex); cellEditor
		 * .setValue(record.data[cellEditor.returnObject.name]); } });
		 */
	}

	if (cilObj.param.returnFunc) {
		grid.getStore().addListener({
			add : function(store, records, idx) {
				if (methods.canFunction(cilObj.param.returnFunc)) {
					try {
						eval(cilObj.param.returnFunc
								+ "(records[0].data, grid, cilObj, formId, records[0], 'insert')");
					} catch (e) {
						alert(e.message);
					}
				}
			},
			remove : function(store, record, idx) {
				if (methods.canFunction(cilObj.param.returnFunc)) {
					try {
						eval(cilObj.param.returnFunc
								+ "(record.data, grid, cilObj, formId, record, 'remove')");
					} catch (e) {
						alert(e.message);
					}
				}
			},
			update : function(store, record, operation) {
				if (methods.canFunction(cilObj.param.returnFunc)) {
					try {
						eval(cilObj.param.returnFunc
								+ "(record.data, grid, cilObj, formId, record, 'update')");
					} catch (e) {
						alert(e.message);
					}
				}
			}
		});
	}

	return grid;
}

/**
 * 初始化视图列表(mode=dialog)
 * 
 * @param {}
 *            cilObj
 */
function initListInTableView(cilObj, resultJson, options, formId) {
	if (cilObj.mode != 'dialog') {
		return initEditListInTableView(cilObj, resultJson, options, formId);
	}

	var gridId = formId + '_' + cilObj.id;

	var griditems = [];

	var fieldName = [];

	var p = {};

	var sm;

	if (!options.globalReadOnly) {
		sm = new Ext.grid.CheckboxSelectionModel({
					handleMouseDown : Ext.emptyFn,
					singleSelect : false
				});

		griditems.push(sm);
	}

	var cilObjitems = cilObj.items;

	var renderName = cilObj.id;

	// list component in viewList
	Ext.each(cilObjitems, function(item, j) {
		var cilObjItem = cilObj.component[item.id];

		// push fieldsName
		fieldName.push({
					'name' : cilObjItem.name
				});

		if (cilObjItem.param.showInGrid == null
				|| cilObjItem.param.showInGrid == true) {
			var item = {
				header : cilObjItem.label,
				dataIndex : cilObjItem.name,
				sortable : true
			}

			if (cilObjItem.param.summaryType != null) {
				item.summaryType = cilObjItem.param.summaryType;
			}

			if (cilObjItem.param.summaryRenderer != null
					&& methods.canFunction(cilObjItem.param.summaryRenderer)) {
				item.summaryRenderer = function(v, params, data) {
					return eval(cilObjItem.param.summaryRenderer
							+ '(v, params, data);')
				}
			}

			if (cilObjItem.param.needRender != null
					&& cilObjItem.param.needRender == true) {
				item.renderer = function(v, c, r, row, col, s) {
					var resultObj = v;

					if (methods.canFunction(renderName)) {
						try {
							resultObj = eval(renderName
									+ "(v, c, r, row, col, s, " + gridId + ")");
						} catch (e) {
							alert(e.message);
						}
					}

					return resultObj;
				}
			} else if (cilObjItem.type == 'date') {
				item.renderer = function(v, c, r, row, col, s) {
					return formatDate(v);
				}
			} else if (cilObjItem.type == 'time') {
				item.renderer = function(v, c, r, row, col, s) {
					return formatTime(v);
				}
			}

			griditems.push(item);
		}
	});

	var tbar;

	if (!options.globalReadOnly) {
		var item = {
			header : 'Handle',
			dataIndex : 'SP',
			sortable : false,
			groupable : false,
			renderer : function(v, c, r, row, col, s) {
				var resultObj = '<a href="javascript:void(0);" onclick="javascript:editDataInDialog(\''
						+ row
						+ '\', \''
						+ gridId
						+ '\', \''
						+ formId
						+ '\');">Edit</a>';

				if (methods.canFunction(renderName)) {
					try {
						resultObj = eval(renderName + "(v, c, r, row, col, s, "
								+ gridId + ")");
					} catch (e) {
						alert(e.message);
					}
				}
				return resultObj;
			}
		}

		griditems.push(item);

		fieldName.push({
					'name' : 'SP'
				});

		tbar = {
			xtype : 'toolbar',
			autoWidth : true,
			autoShow : true,
			items : [{
						iconCls : 'add',
						text : grooveTranslator.getLangLabel('common-language',
								'add'),
						handler : function() {
							newDataInDialog(grid, cilObj, formId);
						}
					}, {
						iconCls : 'delete',
						text : grooveTranslator.getLangLabel('common-language',
								'delete'),
						disabled : true,
						handler : function() {
							removeDataFromGrid(grid, cilObj, formId);
						}
					}]
		};

	}

	var cm = new Ext.grid.ColumnModel(griditems);

	var xg = Ext.grid;

	var grid = null;

	var gridCollapsible = (cilObj.param.collapsible == null
			? false
			: cilObj.param.collapsible);

	// grid default collapsible
	var gridCollapsed = (cilObj.param.collapsed == null
			? false
			: cilObj.param.collapsed);

	if (options.beanData != null && options.beanData[cilObj.id] != null) {
		if (options.beanData[cilObj.id].length > 0) {
			// if grid store has data
			gridCollapsed = false;
		}
	}

	if (cilObj.param.groupField) {
		var ds = new Ext.data.GroupingStore({
					reader : new Ext.data.JsonReader({
								fields : fieldName
							}),
					// use local data
					data : [],
					sortInfo : {
						field : cilObj.forTablePrimaryColumnName,
						direction : 'ASC'
					},
					groupField : cilObj.param.groupField
				});

		grid = {
			id : gridId,
			ds : ds,
			sm : sm,
			cm : cm,
			view : new Ext.grid.GroupingView({
						showGroupName : false,
						enableNoGroups : false,
						enableGroupingMenu : false,
						hideGroupedColumn : false
					}),
			style : 'margin-top:5px;margin-bottom:5px',
			tbar : tbar,
			frame : true,
			border : true,
			collapsible : gridCollapsible,
			collapsed : gridCollapsed,
			titleCollapse : true,
			animCollapse : false,
			trackMouseOver : false,
			title : (cilObj.param.title != null ? cilObj.param.title : ''),
			width : cilObj.param.width,
			height : cilObj.param.height,
			cilObj : cilObj,
			viewConfig : {
				forceFit : (cilObj.param.forceFit == true)
			}
			// enableColumnMove: false,
		};
	} else {
		var ds = new Ext.data.JsonStore({
					fields : fieldName
				});

		grid = {
			id : gridId,
			ds : ds,
			sm : sm,
			cm : cm,
			style : 'margin-top:5px;margin-bottom:5px',
			tbar : tbar,
			frame : true,
			border : true,
			collapsible : gridCollapsible,
			collapsed : gridCollapsed,
			titleCollapse : true,
			animCollapse : false,
			trackMouseOver : false,
			title : (cilObj.param.title != null ? cilObj.param.title : ''),
			width : cilObj.param.width,
			height : cilObj.param.height,
			cilObj : cilObj,
			// enableColumnMove: false,
			viewConfig : {
				forceFit : (cilObj.param.forceFit == true)
			}
		}

		if (cilObj.param.summary == true) {
			var summary = new Ext.ux.grid.GridSummary();

			gridObj.plugins = summary;

			tbar.addItem({
						text : 'Toggle',
						tooltip : 'Toggle the visibility of summary row',
						handler : function() {
							summary.toggleSummaries();
						}
					});
		}

		// grid = new xg.GridPanel(gridObj);
	}

	if (options.beanData != null && options.beanData[cilObj.id] != null) {
		Ext.each(options.beanData[cilObj.id], function(data) {
					var Plant = Ext.data.Record.create(grid.getStore().fields);

					var p = new Plant(data);

					ds.insert(ds.getCount(), p);
				});
	}

	if (!options.globalReadOnly) {
		grid.on('click', function(e) {
					if (grid.getSelectionModel().hasSelection()) {
						grid.tbar.items.itemAt(1).enable();
					} else {
						grid.tbar.items.itemAt(1).disable()
					}
				});
	}

	return grid;
}

/**
 * 
 * @param {}
 *            cilObj
 */
function newDataInDialog(grid, cilObj, formId) {
	var cilObj = grid.cilObj;

	var form = getTableViewForm({
				id : cilObj.id,
				component : cilObj.component,
				componentNowhere : cilObj.items,
				size : {
					columnCount : cilObj.param.columnCount
				},
				param : {}
			}, {

			}, {
				bodyStyle : 'padding:5px;',
				autoScroll : true,
				border : false,
				frame : false
			});

	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : (cilObj.param.dialogWidth == null
				? 600
				: cilObj.param.dialogWidth),
		height : (cilObj.param.dialogHeight == null
				? 400
				: cilObj.param.dialogHeight),
		title : (cilObj.param.title != null ? cilObj.param.title : ''),
		plain : true,
		modal : true,
		items : [form],
		buttons : [{
			text : grooveTranslator.getLangLabel('common-language', 'confirm'),
			handler : function() {
				if (form.getForm().isValid()) {
					methods.checkboxReturn(form);
					// methods.radioReturn(form);

					// var Plant = grid.getStore().recordType;
					var Plant = Ext.data.Record.create(grid.getStore().fields);

					var tmp = {};
					Ext.each(cilObj.items, function(item, j) {
								var cilObjItem = cilObj.component[item.id]

								var formItem = form.getForm()
										.findField(cilObjItem.formName);
								if (formItem == null) {
									Ext.Msg
											.alert(
													grooveTranslator
															.getLangLabel(
																	'common-language',
																	'prompt'),
													'grid('
															+ grid.id
															+ ') dialog form not found in'
															+ cilObjItem.formName);
								} else {
									tmp[cilObjItem.name] = formItem.getValue();
								}
							});

					var p = new Plant(tmp);

					grid.getStore().insert(grid.getStore().getCount(), p);

					win.close();

					if (cilObj.param.returnFunc
							&& methods.canFunction(cilObj.param.returnFunc)) {
						eval(cilObj.param.returnFunc
								+ '(tmp, grid, cilObj, formId);');
					}
				}
			}
		}, {
			text : grooveTranslator.getLangLabel('common-language', 'close'),
			handler : function() {
				win.close();
			}
		}]
	});

	win.show();
}

/**
 * 
 * @param {}
 *            idx
 * @param {}
 *            listId
 */
function editDataInDialog(idx, listId, formId) {
	var record = Ext.getCmp(listId).getStore().getAt(idx);

	var grid = Ext.getCmp(listId);

	var cilObj = grid.cilObj;

	var beanData = {};

	Ext.each(cilObj.items, function(item, j) {
				var cilObjItem = cilObj.component[item.id];
				beanData[cilObjItem.formName] = record.data[cilObjItem.name];
			});

	var form = getTableViewForm({
				id : cilObj.id,
				component : cilObj.component,
				componentNowhere : cilObj.items,
				size : {
					columnCount : cilObj.param.columnCount
				},
				param : {}
			}, {
				beanData : beanData
			}, {
				bodyStyle : 'padding:5px;',
				autoScroll : true,
				border : false,
				frame : false
			});

	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : (cilObj.param.dialogWidth == null
				? 600
				: cilObj.param.dialogWidth),
		height : (cilObj.param.dialogHeight == null
				? 400
				: cilObj.param.dialogHeight),
		title : (cilObj.param.title != null ? cilObj.param.title : ''),
		plain : true,
		modal : true,
		items : [form],
		buttons : [{
			text : grooveTranslator.getLangLabel('common-language', 'confirm'),
			handler : function() {
				if (form.getForm().isValid()) {
					methods.checkboxReturn(form);
					// methods.radioReturn(form);

					/*
					 * var Plant = Ext.data.Record
					 * .create(grid.getStore().fields);
					 */
					var tmp = {};
					Ext.each(cilObj.items, function(item, j) {
								var cilObjItem = cilObj.component[item.id]

								var formItem = form.getForm()
										.findField(cilObjItem.formName);
								if (formItem == null) {
									Ext.Msg
											.alert(
													grooveTranslator
															.getLangLabel(
																	'common-language',
																	'prompt'),
													'grid('
															+ grid.id
															+ ') dialog form not found in'
															+ cilObjItem.formName);
								} else {
									record.set(cilObjItem.name, formItem
													.getValue());

									tmp[cilObjItem.name] = formItem.getValue();
								}
							});
					grid.stopEditing();

					win.close();

					if (cilObj.param.returnFunc
							&& methods.canFunction(cilObj.param.returnFunc)) {
						eval(cilObj.param.returnFunc
								+ '(tmp, grid, cilObj, formId);');
					}
				}
			}
		}, {
			text : grooveTranslator.getLangLabel('common-language', 'close'),
			handler : function() {
				win.close();
			}
		}]
	});

	win.show();
}

/**
 * 
 * @param {}
 *            grid
 */
function removeDataFromGrid(grid, cilObj, formId) {
	var selectedNodes = grid.getSelectionModel().getSelections();
	/*
	 * for (var i = 0; i < selectedNodes.length; i++) { if (i <
	 * selectedNodes.length - 1) { ids += selectedNodes[i].data.id + ","; } else {
	 * ids += selectedNodes[i].data.id; } }
	 */

	var delRealData = false;
	Ext.each(selectedNodes, function(node, i) {
				if (trim(node.data[cilObj.forTablePrimaryColumnName]) != '') {
					delRealData = true;
					return false;
				}
			});

	if (delRealData) {
		deleteTable(cilObj.forTable, 'multi', 'counterName', function(params) {
			var counterName = '';
			Ext.each(selectedNodes, function(node, i) {
				if (trim(node.data[cilObj.forTablePrimaryColumnName]) != '') {
					counterName += i + ',';
					params[cilObj.forTablePrimaryColumnFormName + '_' + i] = node.data[cilObj.forTablePrimaryColumnName];
				}
			});

			params.counterName = counterName.substring(0, counterName.length
							- 1);
			return true;
		}, function() {
			Ext.each(selectedNodes, function(node, i) {
						grid.store.remove(node);

						if (cilObj.param.returnFunc
								&& methods.canFunction(cilObj.param.returnFunc)) {
							eval(cilObj.param.returnFunc
									+ '(node.data, grid, cilObj, formId);');
						}
					});
		}, null);
	} else {
		Ext.each(selectedNodes, function(node, i) {
					grid.store.remove(node);

					if (cilObj.param.returnFunc
							&& methods.canFunction(cilObj.param.returnFunc)) {
						eval(cilObj.param.returnFunc
								+ '(node.data, grid, cilObj, formId);');
					}
				});

	}
}

/**
 * 从grid中构造视图函数
 * 
 * @param {}
 *            queyrKey_
 * @return {Boolean}
 */
function initTableView4QueryList(gridId, options) {
	if (gridId == null) {
		alert('Initialize the tableview in tablequery error, please provide a valid tablequery grid-id.');
		return false;
	}

	// var pwdItems = [];

	// 初始化视图
	this.newTableView = function(id, mode, pkid) {
		if (Ext.getCmp(gridId) == null) {
			alert('The tablequery ExtGridCmp(' + this.gridId
					+ ') is invalid, can not initialize the tableview.');
		}

		options.gridId = gridId;

		if (options.tabcontainerid == null) {
			// it's
			options.tabcontainerid = 'consoletabs';
			// Ext.getCmp(gridId).ownerCt.id;
		}

		if (options.params == null) {
			options.params = {};
		}

		var url = context + "/temp-store/jsstuff/tableview/"
				+ tableviewStuff[id] + "/" + id + ".json";

		Ext.Ajax.request({
					url : url,
					params : {

		}			,
					method : 'POST',
					success : function(rs, request) {
						var result = rs.responseText;// 拿到结果集，此时为字符串

						var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

						if (resultJson.success) {
							// methods.loadJSCSS(resultJson);

							var displaymode = mode;

							if (displaymode == null) {
								displaymode = resultJson.displaymode == null
										? 'window'
										: resultJson.displaymode;
							}

							if (options.title == null) {
								options.title = resultJson.name;
							}

							if (displaymode == 'window') {
								createTableViewWindow(resultJson, options);
							} else if (displaymode == 'tab') {
								createTableViewTab(resultJson, options);
							}
						}
					}
				});

	}
}

var methods = {
	layoutTableView : function(viewFormArray, resultJson, options, formObj,
			listCounter) {

		if (options.globalReadOnly == null && resultJson.handlemode != null
				&& resultJson.handlemode == 'view') {
			options.globalReadOnly = true;
		} else {
			// do nothing
		}

		var componentItems = resultJson.component;

		if (resultJson.componentNowhere
				&& resultJson.componentNowhere.length > 0) {
			// layout nowhere item
			var items = resultJson.componentNowhere;

			var columnCount = (resultJson.size.columnCount != null && /(^[1-9]\d*$)/
					.test(resultJson.size.columnCount))
					? resultJson.size.columnCount
					: 1;

			if (columnCount <= 1) {
				var columnPanelOther = {
					layout : 'column',
					border : false,
					items : []
				};

				Ext.each(items, function(item, i) {
							var itemObj = methods.initExtFieldItem(
									componentItems[item.id], componentItems,
									options, formObj, resultJson);

							if (componentItems[item.id].type != 'hidden') {
								var cp = {
									columnWidth : '1',
									layout : 'form',
									border : false,
									items : [itemObj]
								};

								columnPanelOther.items.push(cp);
							}
						});
				viewFormArray.push(columnPanelOther);
			} else {
				var columnWidth = parseInt(10 / columnCount);

				var columnPanelOther = {
					layout : 'column',
					border : false,
					items : []
				};

				Ext.each(items, function(item, i) {
							var itemObj = methods.initExtFieldItem(
									componentItems[item.id], componentItems,
									options, formObj, resultJson);

							if (componentItems[item.id].type != 'hidden') {
								var cp;
								if (!componentItems[item.id].param.columnSubCount) {
									if (itemObj.length > 1) {
										Ext.each(itemObj, function(tempItem) {
													cp = {
														columnWidth : '.'
																+ (columnWidth * 10),
														layout : 'form',
														border : false,
														items : [tempItem]
													};
													columnPanelOther.items
															.push(cp);
												});
									} else {
										cp = {
											columnWidth : '.'
													+ (columnWidth * 10),
											layout : 'form',
											border : false,
											items : [itemObj]
										};
										columnPanelOther.items.push(cp);
									}
								} else {
									cp = {
										columnWidth : '1',
										layout : 'form',
										border : false,
										items : [itemObj]
									};

									columnPanelOther.items.push(cp);
								}
							}
						});

				viewFormArray.push(columnPanelOther);
			}

		}

		Ext.each(resultJson.componentInGroup, function(groupObj) {
			var groupColumnCount = (groupObj.columnCount != null && /(^[1-9]\d*$)/
					.test(groupObj.columnCount)) ? groupObj.columnCount : 1;

			if (groupObj.groupWidth == 0) {
				groupObj.groupWidth = 800;
			}

			var groupObjItems = groupObj.items;

			if (groupColumnCount <= 1) {
				var fieldsetItems = [];

				if (groupObjItems.length > 0) {
					Ext.each(groupObjItems, function(item, i) {
								var cig = methods.initExtFieldItem(
										componentItems[item.id],
										componentItems, options, formObj,
										resultJson);

								if (componentItems[item.id] != 'hidden') {
									fieldsetItems.push(cig);
								}
							});
				}

				var fieldsetObj = methods.initExtGroupFieldset(groupObj,
						formObj, resultJson, options);

				fieldsetObj.items = fieldsetItems;

				// var fieldset = new Ext.form.FieldSet(fieldsetObj);

				viewFormArray.push(fieldsetObj);
			} else {
				var columnPanel = {
					layout : 'column',
					border : false,
					items : []
				}

				var columnWidth = parseInt(10 / groupColumnCount);

				if (groupObjItems.length > 0) {
					Ext.each(groupObjItems, function(item, i) {
								var cig = methods.initExtFieldItem(
										componentItems[item.id],
										componentItems, options, formObj,
										resultJson);

								if (componentItems[item.id] != 'hidden') {
									var cp;
									if (!componentItems[item.id].param.columnSubCount) {
										cp = {
											columnWidth : '.'
													+ (columnWidth * 10),
											layout : 'form',
											border : false,
											items : [cig]
										};
									} else {
										cp = {
											columnWidth : '1',
											layout : 'form',
											border : false,
											items : [cig]
										};
									}
									columnPanel.items.push(cp);
									// columnPanel.items[i %
									// groupColumnCount].items
									// .push(cig);
								}
							});
				}

				var fieldsetObj = methods.initExtGroupFieldset(groupObj,
						formObj, resultJson, options);

				fieldsetObj.items = [columnPanel];

				// var fieldset = new Ext.form.FieldSet(fieldsetObj);

				viewFormArray.push(fieldsetObj);
			}

			if (groupObj.hookList != null) {
				// find hook list
				var cilObjids = groupObj.hookList.split(',');

				if (cilObjids != null && cilObjids.length > 0) {
					for (var indexCil = 0; indexCil < cilObjids.length; indexCil++) {
						var cilObjId = cilObjids[indexCil];

						if (cilObjId != '') {
							var cilObj = findListInTableView(cilObjId,
									resultJson.componentInList);

							if (cilObj != null) {
								if (listCounter[cilObj.id] == null) {
									// init list
									var grid = initListInTableView(cilObj,
											resultJson, options, formObj.id);

									viewFormArray.push(grid);

									// take this list
									listCounter[cilObj.id] = viewFormArray.length
											- 1;
								} else {
									// move list
									var grid = formObj.items[listCounter[cilObj.id]];

									methods.ArrayRemove(formObj.items,
											listCounter[cilObj.id]);

									viewFormArray.push(grid);
								}
							} else {
								alert('group(' + groupObj.name
										+ ') unhook list(' + cilObjId + ')');
							}
						}
					}

				}
			}
		});

		var componentInList = resultJson.componentInList;

		if (componentInList != null && componentInList.length > 0) {
			// list viewList
			Ext.each(componentInList, function(cilObj, i) {
						if (listCounter[cilObj.id] == null) {
							var grid = initListInTableView(cilObj, resultJson,
									options, formObj.id);

							viewFormArray.push(grid);

							// take this list
							listCounter[cilObj.id] = viewFormArray.length - 1;
						}

					});

		};

		var componentTabpanel = resultJson.componentTabpanel;

		if (componentTabpanel != null) {
			Ext.each(componentTabpanel, function(tabpanel, i) {
				// init tabpanel
				var tabpanelObj = {
					xtype : 'tabpanel',
					width : tabpanel.param.width ? tabpanel.param.width : 800,
					activeTab : tabpanel.param.activeTab
							? tabpanel.param.activeTab
							: 0,
					frame : false,
					border : true,
					defaults : {
						autoHeight : true,
						bodyStyle : 'padding:5px'
					},
					style : 'margin-top:5px;margin-bottom:5px',
					items : [],
					listeners : {
						tabchange : function() {
							if (!options.globalReadOnly) {
								Ext.getCmp(formObj.id).getForm().isValid();
							}
						}
					}

				};

				// init tab in tabpanel
				Ext.each(tabpanel.tabs, function(tab, j) {
					var tabItems = [];

					tab.resultJson.component = resultJson.component;

					if (tab.param.size == null) {
						tab.resultJson.size = resultJson.size;
					} else {
						tab.resultJson.size = tab.param.size;
					}

					tab.resultJson.componentInList = tab.resultJson.componentInList
							.concat(resultJson.componentInList);

					methods.layoutTableView(tabItems, tab.resultJson, options,
							formObj, listCounter);

					tabpanelObj.items.push({
								title : tab.name,
								items : tabItems
							});
				});
				// var tabs = new Ext.TabPanel(tabpanelObj);
				// viewFormArray.push(tabs);

				viewFormArray.push(tabpanelObj);
			});
		}
	},
	initExtGroupFieldset : function(groupObj, formObj, resultJson, options) {
		var checkboxToggle = (options.globalReadOnly == false && groupObj.param.checkboxToggle != null)
				? groupObj.param.checkboxToggle
				: false;

		var collapsed = (groupObj.param.groupCollapsed != null
				? groupObj.param.groupCollapsed
				: false);

		if (groupObj.param.toggleItem != null) {
			var toggleItem = resultJson.component[groupObj.param.toggleItem.id];

			if (toggleItem != null) {
				var toggleItemValue = methods.initBeanValue(toggleItem,
						options.beanData);

				toggleItemValue = methods.getDefaultValue(toggleItemValue,
						toggleItem.defaultValue, options.params);

				collapsed = (toggleItemValue != '1');
			} else {
				alert('The toggleItem of ExtFieldsetCmp is invalid, can not find the toggleItem('
						+ groupObj.param.toggleItem.id + ')');
			}
		}

		var fieldsetObj = {
			xtype : 'fieldset',
			title : groupObj.groupName,
			autoHeight : true,
			width : groupObj.groupWidth,
			layout : 'form',
			checkboxToggle : checkboxToggle,
			onCheckClick : function() {
				var fieldset = Ext.getCmp(fieldsetObj.id);

				if (fieldset.checkbox.dom.checked) {
					fieldset['expand']();
				} else if (!fieldset.checkbox.dom.checked) {
					fieldset['collapse']();
				}
			},
			collapsed : collapsed,
			collapsible : groupObj.param.groupCollapsible != null
					? groupObj.param.groupCollapsible
					: false,
			disabled : groupObj.param.groupDisabled != null
					? groupObj.param.groupDisabled
					: false,
			defaults : {
				bodyStyle : 'padding:5px'
			},
			style : 'margin-top:5px;margin-bottom:5px',
			listeners : {}
		}

		fieldsetObj.listeners['expand'] = function(thiz) {
			if (groupObj.param.toggleItem != null) {
				Ext.getCmp(formObj.id).getForm()
						.findField(groupObj.param.toggleItem.name)
						.setValue('1');
			}

			if (groupObj.param.conflictwith != null) {
				methods.conflictwithFieldset(thiz, groupObj.param.conflictwith,
						formObj.id);
			}
		}

		fieldsetObj.listeners['collapse'] = function(thiz) {
			if (groupObj.param.toggleItem != null) {
				Ext.getCmp(formObj.id).getForm()
						.findField(groupObj.param.toggleItem.name)
						.setValue('0');
			}
		}

		if (groupObj.groupName == '') {
			fieldsetObj.style = 'margin-top:5px;margin-bottom:5px;padding-top:10px;';
		}

		if (groupObj.param.id != null) {
			fieldsetObj.id = formObj.id + groupObj.param.id;
		}

		if (groupObj.param.toggleItem != null) {
			formObj.fieldsetMap.put(groupObj.param.toggleItem, fieldsetObj.id);
		}

		return fieldsetObj;
	},
	conflictwithFieldset : function(thiz, others, formId) {
		var otherIds = others.split(',');

		for (var i = 0; i < otherIds.length; i++) {
			var otherFieldId = formId + otherIds[i];
			if (otherIds[i] != '' && otherFieldId != thiz.id
					&& Ext.getCmp(otherFieldId) != null) {
				Ext.getCmp(otherFieldId).collapse();
			}
		}
	},
	initExtFieldItem : function(item, componentItems, options, formObj,
			resultJson) {
		var factValue;
		
		if (options.beanData != null) {
			factValue = methods.initBeanValue(item, options.beanData);
		}

		var formId = formObj.id;

		var urlparam = options.params;

		var o = item.param;

		var itemReadOnly = false;

		// rule as global setting
		if (options.globalReadOnly == true) {
			itemReadOnly = true;
		}
		// rule as item definition
		else if (o.readOnly == true) {
			itemReadOnly = true;
		}

		var huntItem = false;

		// rule as item definition
		if (o.hunt != null) {
			huntItem = o.hunt;
		} else if (options.globalHuntItem == true) {
			// rule as global setting
			huntItem = true;
		}

		if (o.zeroForEmpty == null) {
			o.zeroForEmpty = true;
		}

		var labelString = item.translate ? grooveTranslator.getLangLabel(
				resultJson.id, item.id) : item.label;

		if (options.stockings != null
				&& options.stockings[resultJson.id] != null
				&& options.stockings[resultJson.id].putOn == true
				&& options.stockings[resultJson.id].targetItems != null 
				&& options.stockings[resultJson.id].targetItems[item.name] != null) {
			var tlt = (options.stockings[resultJson.id].title == null
					? ''
					: options.stockings[resultJson.id].title);
			labelString = '<input type="checkbox" title="' + tlt
					+ '" onclick="javascript:'
					+ options.stockings[resultJson.id].putOnFunc + '(this,\''
					+ item.id + '\',\'' + formId + '\',\'' + resultJson.id
					+ '\');"/>&nbsp;' + labelString;
		}

		if (item.type == 'input') {
			var it;

			if (itemReadOnly == false) {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					fieldLabel : labelString,
					name : item.formName,
					xtype : 'textfield',
					allowBlank : (o.allowBlank == null || o.allowBlank),
					disabled : (o.disabled == true),
					value : dv,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (o.height) {
					it.height = o.height;
				}

				if (o.vtype) {
					it.vtype = o.vtype;
					if (o.confirmTo)
						it.confirmTo = {
							formId : formId,
							confirmTo : o.confirmTo
						}
				}

				if (o.minLength) {
					it.minLength = o.minLength;
				}

				if (o.minLengthText) {
					it.minLengthText = o.minLengthText;
				}

				if (o.maxLength == null) {
					o.maxLength = item.length;
				}

				if (o.maxLength) {
					it.maxLength = o.maxLength;
				}

				if (o.maxLengthText) {
					it.maxLengthText = o.maxLengthText;
				}

				if (o.listenClick) {
					it.listeners.click = function(thiz) {
						try {
							eval(o.listenClick + '(thiz, formId, options);');
						} catch (error) {
							alert(error.message);
						}
					}
				}

				if (o.listenBlur) {
					it.listeners.blur = function(thiz) {
						try {
							eval(o.listenBlur + '(thiz, formId, options);');
						} catch (error) {
							alert(error.message);
						}
					}
				}

				if (huntItem && methods.fox(item, options.beanData)) {
					it.listeners.change = function(thiz) {
						methods.foxhound(item, dv, thiz, resultJson, formObj,
								options);
					};
				}

				if (item.mode != null && item.mode == '09') {
					if (options.beanData != null) {
						factValue = methods.initBeanValue({
									name : item.formName + '_'
								}, options.beanData);
					}

					var itBT = {
						fieldLabel : grooveTranslator.getLangLabel(
								'tableview-language', 'to'),
						name : item.formName + '_',
						xtype : 'textfield',
						allowBlank : (o.allowBlank == null || o.allowBlank),
						value : methods.getDefaultValue(factValue,
								item.defaultValue, urlparam),
						anchor : '90%',
						listeners : {}
					};

					if (o.width) {
						itBT.width = o.width;
					} else {
						itBT.anchor = '90%';
					}

					if (o.height) {
						itBT.height = o.height;
					}

					if (o.vtype) {
						itBT.vtype = o.vtype;
					}

					if (o.minLength) {
						itBT.minLength = o.minLength;
					}

					if (o.minLengthText) {
						itBT.minLengthText = o.minLengthText;
					}

					if (o.maxLength) {
						itBT.maxLength = o.maxLength;
					}

					if (o.maxLengthText) {
						itBT.maxLengthText = o.maxLengthText;
					}

					return [it, itBT];
				}
			} else {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					xtype : 'textfield',
					name : item.formName,
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : dv,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('hint', '选项只读');
					console.log(thiz.id);
					thiz.fireEvent('blur');
				}

				it.listeners.click = function(thiz) {
					alert(thiz.id);
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}
			}

			return it;

			/*
			 * if (o.readOnly) { it.style = 'background: #f3f3f3;' }
			 */

			/*
			 * if (o.vtype != null) { it.vtype = o.vtype; }
			 * 
			 * return it;
			 */
		} else if (item.type == 'number') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('number类型的视图组件<' +
			 * item.name +
			 * '>的参数格式必须为json,形如{allowBlank:false,allowDecimals:true,allowNegative:false}'); }
			 */

			var it;

			if (o.zeroForEmpty && factValue == '0') {
				factValue = '';
			}

			if (itemReadOnly == false) {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					fieldLabel : labelString,
					name : item.formName,
					xtype : 'numberfield',
					allowBlank : (o.allowBlank == null || o.allowBlank),
					disabled : (o.disabled == true),
					allowDecimals : (o.allowDecimals != null && o.allowDecimals), // 允许小数点
					allowNegative : (o.allowNegative != null && o.allowNegative), // 允许负数
					value : dv,
					listeners : {}
				};

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (o.height) {
					it.height = o.height;
				}

				if (o.minLength) {
					it.minLength = o.minLength;
				}

				if (o.minLengthText) {
					it.minLengthText = o.minLengthText;
				}

				if (o.maxLength) {
					it.maxLength = o.maxLength;
				}

				if (o.maxLengthText) {
					it.maxLengthText = o.maxLengthText;
				}

				if (o.minValue) {
					it.minValue = o.minValue;
				}

				if (o.minText) {
					it.minText = o.minText;
				}

				if (o.maxValue) {
					it.maxValue = o.maxValue;
				}

				if (o.maxText) {
					it.maxText = o.maxText;
				}

				if (o.nanText) {
					it.nanText = o.nanText;
				}

				if (o.baseChars) {
					it.baseChars = o.baseChars;
				}

				if (o.listenClick) {
					it.listeners.click = function(thiz) {
						try {
							eval(o.listenClick + '(thiz, formId, options);');
						} catch (error) {
							alert(error.message);
						}
					}
				}

				if (o.listenBlur) {
					it.listeners.blur = function(thiz) {
						try {
							eval(o.listenBlur + '(thiz, formId, options);');
						} catch (error) {
							alert(error.message);
						}
					}
				}

				if (huntItem && methods.fox(item, options.beanData)) {
					it.listeners.change = function(thiz) {
						methods.foxhound(item, dv, thiz, resultJson, formObj,
								options);
					};
				}

				if (item.mode != null && item.mode == '09') {
					if (options.beanData != null) {
						factValue = methods.initBeanValue({
									name : item.formName + '_'
								}, options.beanData);
					}

					var itBT = {
						fieldLabel : grooveTranslator.getLangLabel(
								'tableview-language', 'to'),
						name : item.formName + '_',
						xtype : 'numberfield',
						allowBlank : (o.allowBlank == null || o.allowBlank),
						allowDecimals : (o.allowDecimals != null && o.allowDecimals), // 允许小数点
						allowNegative : (o.allowNegative != null && o.allowNegative), // 允许负数
						value : methods.getDefaultValue(factValue,
								item.defaultValue, urlparam)
					};

					if (o.width) {
						itBT.width = o.width;
					} else {
						itBT.anchor = '90%';
					}

					if (o.height) {
						itBT.height = o.height;
					}

					if (o.minLength) {
						itBT.minLength = o.minLength;
					}

					if (o.minLengthText) {
						itBT.minLengthText = o.minLengthText;
					}

					if (o.maxLength) {
						itBT.maxLength = o.maxLength;
					}

					if (o.maxLengthText) {
						itBT.maxLengthText = o.maxLengthText;
					}

					if (o.minValue) {
						itBT.minValue = o.minValue;
					}

					if (o.minText) {
						itBT.minText = o.minText;
					}

					if (o.maxValue) {
						itBT.maxValue = o.maxValue;
					}

					if (o.maxText) {
						itBT.maxText = o.maxText;
					}

					if (o.nanText) {
						itBT.nanText = o.nanText;
					}

					if (o.baseChars) {
						itBT.baseChars = o.baseChars;
					}

					return [it, itBT];
				}
			} else {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					xtype : 'textfield',
					name : item.formName,
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : dv,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('hint', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}
			}

			return it;
		} else if (item.type == 'money') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('number类型的视图组件<' +
			 * item.name +
			 * '>的参数格式必须为json,形如{allowBlank:false,allowDecimals:true,allowNegative:false}'); }
			 */

			if (o.zeroForEmpty && factValue == '0') {
				factValue = '';
			}

			var dv = methods.getDefaultValue(factValue, item.defaultValue,
					urlparam);

			formObj.hiddenItems.push({
						xtype : 'hidden',
						name : item.formName,
						value : dv
					});

			var it;
			if (itemReadOnly == false) {
				it = {
					xtype : 'textfield',
					fieldLabel : labelString,
					name : item.formName + '_money',
					allowBlank : (o.allowBlank == null || o.allowBlank),
					disabled : (o.disabled == true),
					value : methods.RMBMoney(dv),
					returnObject : item.formName,
					listeners : {
						'blur' : function(thiz) {
							if (trim(thiz.getValue()) != '') {
								if (!isNaN(thiz.getValue())) {
									Ext.getCmp(formId).getForm()
											.findField(item.formName)
											.setValue(thiz.getValue());
									thiz.setValue(methods.RMBMoney(thiz
											.getValue()));
								} else {
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'tableview-language',
													'numberonly'),
											function(btn) {
												thiz
														.setValue(methods
																.RMBMoney(Ext
																		.getCmp(formId)
																		.getForm()
																		.findField(item.formName)
																		.getValue()));
											});

								}
							} else {
								Ext.getCmp(formId).getForm()
										.findField(item.formName).setValue('');
								thiz.setValue('');
							}
							if (o.listenBlur) {
								try {
									eval(o.listenBlur
											+ '(thiz, formId, options);');
								} catch (error) {
									alert(error.message);
								}
							}
						},
						'focus' : function(thiz) {
							if (Ext.getCmp(formId).getForm()
									.findField(item.formName).getValue() != '') {
								thiz.setValue(Ext.getCmp(formId).getForm()
										.findField(item.formName).getValue());
							}
						}
					}
				}

				if (huntItem && methods.fox(item, options.beanData)) {
					it.listeners.change = function(thiz) {
						methods.foxhound(item, dv, thiz, resultJson, formObj,
								options);
					};
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (o.height) {
					it.height = o.height;
				}

				if (o.minLength) {
					it.minLength = o.minLength;
				}

				if (o.minLengthText) {
					it.minLengthText = o.minLengthText;
				}

				if (o.maxLength) {
					it.maxLength = o.maxLength;
				}

				if (o.maxLengthText) {
					it.maxLengthText = o.maxLengthText;
				}

				if (item.mode != null && item.mode == '09') {
					if (options.beanData != null) {
						factValue = methods.initBeanValue({
									name : item.formName + '_'
								}, options.beanData);
					}

					dv = methods.getDefaultValue(factValue, item.defaultValue,
							urlparam);

					formObj.hiddenItems.push({
								xtype : 'hidden',
								name : item.formName + '_',
								value : dv
							});

					var itBT = {
						xtype : 'textfield',
						fieldLabel : item.label,
						name : item.formName + '_money_',
						returnObject : item.formName + '_',
						allowBlank : (o.allowBlank == null || o.allowBlank),
						value : methods.RMBMoney(dv),
						listeners : {
							'blur' : function(thiz) {
								if (trim(thiz.getValue()) != '') {
									if (!isNaN(thiz.getValue())) {
										Ext.getCmp(formId).getForm()
												.findField(item.formName + '_')
												.setValue(thiz.getValue());
										thiz.setValue(methods.RMBMoney(thiz
												.getValue()));
									} else {
										Ext.Msg.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator.getLangLabel(
														'tableview-language',
														'numberonly'),
												function(btn) {
													thiz
															.setValue(methods
																	.RMBMoney(Ext
																			.getCmp(formId)
																			.getForm()
																			.findField(item.formName
																					+ '_')
																			.getValue()));
												});

									}
								}
								if (o.listenBlur) {
									try {
										eval(o.listenBlur
												+ '(thiz, formId, options);');
									} catch (error) {
										alert(error.message);
									}
								}
							},
							'focus' : function(thiz) {
								if (Ext.getCmp(formId).getForm()
										.findField(item.formName + '_')
										.getValue() != '') {
									thiz.setValue(Ext.getCmp(formId).getForm()
											.findField(item.formName + '_')
											.getValue());
								}
							}
						}
					};

					if (o.width) {
						itBT.width = o.width;
					} else {
						itBT.anchor = '90%';
					}

					if (o.height) {
						itBT.height = o.height;
					}

					if (o.minLength) {
						itBT.minLength = o.minLength;
					}

					if (o.minLengthText) {
						itBT.minLengthText = o.minLengthText;
					}

					if (o.maxLength) {
						itBT.maxLength = o.maxLength;
					}

					if (o.maxLengthText) {
						itBT.maxLengthText = o.maxLengthText;
					}

					return [it, itBT];
				}
			} else {
				it = {
					xtype : 'textfield',
					name : item.formName + '_money',
					returnObject : item.formName,
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : methods.RMBMoney(dv),
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('hint', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}
			}

			return it;
		} else if (item.type == 'htmleditor') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('htmleditor类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{enableAlignments:false,
			 * readOnly:true}'); }
			 */

			var dv = methods.getDefaultValue(factValue, item.defaultValue,
					urlparam);

			var it = {
				xtype : 'htmleditor',
				fieldLabel : labelString,
				enableAlignments : (o.enableAlignments == true),
				enableColors : (o.enableColors == true),
				enableFont : (o.enableFont == true),
				enableFontSize : (o.enableFontSize == true),
				enableLinks : (o.enableLinks == true),
				enableFormat : (o.enableFormat == true),
				enableLists : (o.enableLists == true),
				enableSourceEdit : (o.enableSourceEdit == true),
				name : item.formName,
				allowBlank : (o.allowBlank == null || o.allowBlank),
				disabled : (o.disabled == true),
				readOnly : (itemReadOnly == false),
				value : dv,
				listeners : {}
			};

			if (o.width) {
				it.width = o.width;
			} else {
				it.anchor = '90%';
			}

			if (huntItem && methods.fox(item, options.beanData)) {
				it.listeners.change = function(thiz) {
					methods.foxhound(item, dv, thiz, resultJson, formObj,
							options);
				};
			}

			return it;
		} else if (item.type == 'file') {

			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('file类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{fileType:\'\'}'); }
			 */

			if (item.defaultValue != '') {
				var fileItems = [];
				Ext.each(item.defaultValue, function(file) {
							// item.type
							var it = {
								xtype : 'box',
								name : item.formName,
								fieldLabel : item.label,
								html : (itemReadOnly == false)
										? ('<a href="javascript:viewAnnex(\''
												+ file.id + '\');">'
												+ file.name + "." + file.type + '</a>')
										: ('<a href="javascript:viewAnnex(\''
												+ file.id + '\');">'
												+ file.name + "." + file.type + '</a>')
							}

							fileItems.push(it);
						});

				return fileItems;
			} else if (itemReadOnly == false) {
				var it = {
					xtype : 'fileuploadfield',
					name : item.formName,
					fieldLabel : item.label,
					disabled : (o.disabled == true),
					buttonText : '',
					buttonCfg : {
						iconCls : 'upload-icon'
					}
				};

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (formObj.fileUpload != true) {
					formObj.fileUpload = true;
				}

				return it;
			}

		} else if (item.type == 'textarea') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('textarea类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{allowBlank:false, readOnly:true}'); }
			 */
			var it;
			if (itemReadOnly == false) {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					xtype : 'textarea',
					fieldLabel : labelString,
					name : item.formName,
					allowBlank : (o.allowBlank == null || o.allowBlank),
					disabled : (o.disabled == true),
					value : dv,
					listeners : {}
				};

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (o.height) {
					it.height = o.height;
				}

				if (o.maxLength == null) {
					o.maxLength = item.length;

					if (o.maxLengthText == null) {
						o.maxLengthText = grooveTranslator.getLangLabel(
								'tableview-language', 'maxlength')
								+ '(' + o.maxLength + ')';
					}
				}

				if (o.minLength) {
					it.minLength = o.minLength;
				}

				if (o.minLengthText) {
					it.minLengthText = o.minLengthText;
				}

				if (o.maxLength) {
					it.maxLength = o.maxLength;
				}

				if (o.maxLengthText) {
					it.maxLengthText = o.maxLengthText;
				}

				if (o.listenClick) {
					it.listeners.click = function(thiz) {
						try {
							eval(o.listenClick + '(thiz, formId, options);');
						} catch (error) {
							alert(error.message);
						}
					}
				}

				if (o.listenBlur) {
					it.listeners.blur = function(thiz) {
						try {
							eval(o.listenBlur + '(thiz, formId, options);');
						} catch (error) {
							alert(error.message);
						}
					}
				}

				if (huntItem && methods.fox(item, options.beanData)) {
					it.listeners.change = function(thiz) {
						methods.foxhound(item, dv, thiz, resultJson, formObj,
								options);
					};
				}
			} else {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					xtype : 'textarea',
					name : item.formName,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					readOnly : true,
					value : dv,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (o.height) {
					it.height = o.height;
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('hint', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}
			}

			return it;
		} else if (item.type == 'password') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('password类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{allowBlank:false, readOnly:true,
			 * confirmTo:\'\'}'); }
			 * 
			 * if (o.confirmTo != null && Ext.getCmp(o.confirmTo) == null) {
			 * alert('密码确认对象为空,将无法完成密码确认校验'); }
			 */

			var it;
			if (itemReadOnly == false) {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					xtype : 'textfield',
					fieldLabel : labelString,
					name : item.formName,
					inputType : 'password',
					allowBlank : (o.allowBlank == null || o.allowBlank),
					disabled : (o.disabled == true),
					readOnly : o.readOnly,
					value : dv,
					listeners : {}
				};

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (o.height) {
					it.height = o.height;
				}

				if (o.maxLength == null) {
					o.maxLength = item.length;

					if (o.maxLengthText == null) {
						o.maxLengthText = grooveTranslator.getLangLabel(
								'tableview-language', 'maxlength')
								+ '(' + o.maxLength + ')';
					}
				}

				if (o.minLength) {
					it.minLength = o.minLength;
				}

				if (o.minLengthText) {
					it.minLengthText = o.minLengthText;
				}

				if (o.maxLength) {
					it.maxLength = o.maxLength;
				}

				if (o.maxLengthText) {
					it.maxLengthText = o.maxLengthText;
				}

				if (o.listenClick) {
					it.listeners.click = function(thiz) {
						try {
							eval(o.listenClick + '(thiz, formId, options);');
						} catch (error) {
							alert(error.message);
						}
					}
				}

				if (o.listenBlur) {
					it.listeners.blur = function(thiz) {
						try {
							eval(o.listenBlur + '(thiz, formId, options);');
						} catch (error) {
							alert(error.message);
						}
					}
				}

				if (huntItem && methods.fox(item, options.beanData)) {
					it.listeners.change = function(thiz) {
						methods.foxhound(item, dv, thiz, resultJson, formObj,
								options);
					};
				}

				if (o.confirmTo) {
					var confirmToObj = {
						xtype : 'textfield',
						fieldLabel : item.label + ' confirm',
						name : item.formName + '_',
						inputType : 'password',
						allowBlank : false,
						disabled : (o.disabled == true),
						vtype : 'password',
						confirmTo : {
							formId : formId,
							confirmTo : item.formName
						},
						value : ''
					};

					if (o.width) {
						confirmToObj.width = o.width;
					} else {
						confirmToObj.anchor = '90%';
					}

					if (o.height) {
						confirmToObj.height = o.height;
					}

					return [it, confirmToObj];
				}

				return it;
			} else {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					xtype : 'textfield',
					inputType : 'textfield',
					vtype : 'password',
					name : item.formName,
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : dv,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('hint', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}

				return it;
			}
		} else if (item.type == 'hidden') {
			var it = {
				xtype : 'hidden',
				name : item.formName,
				value : methods.getDefaultValue(factValue, item.defaultValue,
						urlparam)
			};

			formObj.hiddenItems.push(it);

			return it;
		} else if (item.type == 'date' || item.type == 'time') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('date类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{allowBlank:false}'); }
			 */
			var dv = methods.getDefaultValue(factValue, item.defaultValue,
					urlparam);

			var dvString = '';

			if (dv != '') {
				if (item.type == 'date') {
					dvString = formatDate(dv);
				} else if (item.type == 'time') {
					dvString = formatTime(dv);
				}
			}

			var it;
			if (itemReadOnly == false) {
				var it = {
					xtype : 'datefield',
					fieldLabel : labelString,
					name : item.formName + '_assistant_',
					returnObject : item.formName,
					format : 'Y-m-d',
					value : dvString,
					allowBlank : (o.allowBlank == null || o.allowBlank),
					disabled : (o.disabled == true),
					listeners : {
						select : function(m, d) {
							methods.dateReturn(m, item, formId);

							if (o.listenSele) {
								try {
									eval(o.listenSele
											+ '(m.value, formId, options);');
								} catch (error) {
									alert(error.message);
								}
							}
						},
						blur : function(m, d) {
							methods.dateReturn(m, item, formId);

							if (o.listenSele) {
								try {
									eval(o.listenSele
											+ '(m.value, formId, options);');
								} catch (error) {
									alert(error.message);
								}
							}
						}
					}
				};

				if (huntItem && methods.fox(item, options.beanData)) {
					it.listeners.change = function(thiz) {
						methods.foxhound(item, dv, thiz, resultJson, formObj,
								options);
					};
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (o.height) {
					it.height = o.height;
				}

				var it1 = {
					xtype : 'hidden',
					name : item.formName,
					value : dv
				};

				formObj.hiddenItems.push(it1);

				// for query component
				if (item.mode != null && item.mode == '09') {
					it.dateRange = {
						formId : formId,
						begin : item.formName + '_assistant_',
						end : item.formName + '_betweenand_assistant_'
					};
					it.vtype = 'dateRange';
				} else if (o.dateRange != null) {
					o.dateRange.formId = formId;
					o.dateRange.begin = o.dateRange.begin + '_assistant_';
					o.dateRange.end = o.dateRange.end + '_assistant_';
					it.dateRange = o.dateRange;
					it.vtype = 'dateRange';
				}

				// special for queryForm data between startDate and endDate
				if (item.mode != null && item.mode == '09') {
					if (options.beanData != null) {
						factValue = methods.initBeanValue({
									name : item.formName + '_'
								}, options.beanData);
					}

					var dv = methods.getDefaultValue(factValue,
							item.defaultValue, urlparam);

					var dvString = '';

					if (dv != '') {
						if (item.type == 'date') {
							dvString = formatDate(dv);
						} else if (item.type == 'time') {
							dvString = formatTime(dv);
						}
					}

					var itBT = {
						xtype : 'datefield',
						fieldLabel : grooveTranslator.getLangLabel(
								'tableview-language', 'to'),
						name : item.formName + '_betweenand_assistant_',
						returnObject : item.formName + '_',
						format : 'Y-m-d',
						value : dvString,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						disabled : (o.disabled == true),
						listeners : {
							select : function(m, d) {
								methods.dateReturnMax(m, item, formId);
							},
							blur : function(m, d) {
								methods.dateReturnMax(m, item, formId);
							}
						}
					};

					if (o.width) {
						itBT.width = o.width;
					} else {
						itBT.anchor = '90%';
					}

					if (o.height) {
						itBT.height = o.height;
					}

					itBT.dateRange = {
						formId : formId,
						begin : item.formName + '_assistant_',
						end : item.formName + '_betweenand_assistant_'
					};
					itBT.vtype = 'dateRange';

					var it2 = {
						xtype : 'hidden',
						name : item.formName + '_',
						value : dv
					};

					formObj.hiddenItems.push(it2);

					return [it, itBT];
				} else {
					return it;
				}
			} else {
				it = {
					xtype : 'textfield',
					name : item.formName + '_assistant_',
					returnObject : item.formName,
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : dvString,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('hint', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : dv
						});

				return it;
			}
		} else if (item.type == 'radio') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('radio类型的视图组件<' +
			 * item.name +
			 * '>的参数格式必须为json,形如{items:[{label:\'工作日\',value:\'0\'},{label:\'非工作日\',value:\'-1\'}]}');
			 * return; }
			 */
			var dv = methods.getDefaultValue(factValue, item.defaultValue,
					urlparam);

			if (dv == '' && item.param.checkItem != null) {
				dv = item.param.checkItem;
			}

			var radioItems = [];

			var radioIndex = 0;

			var targetItem;

			if (o.target != null) {
				targetItem = methods.findComponentItems(componentItems,
						o[o.target]);

				if (false && targetItem == null) {
					alert('The radio components('
							+ item.name
							+ ')\'s target component(id='
							+ o.target
							+ ') does not exist, it will affect the integrity of the data');
				}
			}

			Ext.each(o.items, function(radioItem) {
				var it = { // 以上相同
					xtype : 'radio',
					boxLabel : radioItem.name,
					id : formObj.id + '_' + item.formName + '_' + radioIndex,
					name : item.formName + '_',
					inputValue : radioItem.id,
					checked : (dv == radioItem.id),
					listeners : {
						check : function(checkitem, checked) {
							if (checked) {
								Ext.getCmp(formId).getForm()
										.findField(item.formName)
										.setValue(radioItem.id);

								if (targetItem != null) {
									Ext.getCmp(formId).getForm()
											.findField(targetItem.formName)
											.setValue(radioItem.name);
								}

								if (huntItem
										&& methods.fox(item, options.beanData)) {
									if (targetItem != null) {
										methods.foxhound(targetItem,
												radioItem.name, checkitem,
												resultJson, formObj, options);
									} else {
										methods.foxhound(item, radioItem.id,
												checkitem, resultJson, formObj,
												options);
									}
								}
							}

							if (o.checkFunc && methods.canFunction(o.checkFunc)) {
								eval(o.checkFunc
										+ '(checkitem, checked, formId, options);');
							}
						}
					}
				};

				radioItems.push(it);

				radioIndex++;
			});

			if (radioItems.length > 0) {
				var radioGroup = {
					xtype : 'radiogroup',
					fieldLabel : labelString,
					disabled : (itemReadOnly == true),
					// columns : o.columns == null ? 1 : o.columns,
					allowBlank : (o.allowBlank == null || o.allowBlank),
					blankText : grooveTranslator.getLangLabel(
							'tableview-language', 'pleaseselect')
							+ item.label,
					items : radioItems
				};

				if (o.width) {
					radioGroup.width = o.width;
				} else {
					radioGroup.anchor = '90%';
				}

				if (o.height) {
					radioGroup.height = o.height;
				}

				if (formObj.radios == null) {
					formObj.radios = [];
				}

				formObj.radios.push({
							radioGroup : radioGroup,
							idsItem : item.formName,
							namesItem : (targetItem != null
									? targetItem.formName
									: null),
							size : radioIndex
						});

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : dv
						});

				return radioGroup;
			} else {
				var it = {
					xtype : 'box',
					name : item.formName + '_',
					fieldLabel : labelString,
					html : 'The wordbook(' + o.wordbook + ') does not exist.'
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : dv
						});

				return it;
			}
		} else if (item.type == 'checkbox') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('radio类型的视图组件<' +
			 * item.name +
			 * '>的参数格式必须为json,形如{items:[{label:\'工作日\',value:\'0\'},{label:\'非工作日\',value:\'-1\'}]}');
			 * return; }
			 */

			var dv = methods.getDefaultValue(factValue, item.defaultValue,
					urlparam);

			if (dv == '' && item.param.checkItem != null) {
				dv = item.param.checkItem;
			}

			var targetItem;

			if (o.forItem != null) {
				targetItem = methods.findComponentItems(componentItems,
						o[o.forItem]);

				if (false && targetItem == null) {
					alert('The checkbox components('
							+ item.name
							+ ')\'s target component(id='
							+ o.forItem
							+ ') does not exist, it will affect the integrity of the data.');
				}
			}

			var it1 = {
				xtype : 'hidden',
				name : item.formName,
				value : dv
			};

			formObj.hiddenItems.push(it1);

			var checkboxItems = [];

			var checkboxIndex = 0;

			var checkboxGroupObj = {
				xtype : 'checkboxgroup',
				fieldLabel : labelString,
				name : formObj.id + '_CHECKGROUP_' + item.formName,
				columns : o.columns == null ? 1 : o.columns,
				allowBlank : (o.allowBlank == null || o.allowBlank),
				disabled : (itemReadOnly == true),
				items : checkboxItems,
				itemsJson : {}
			}

			Ext.each(o.items, function(checkboxItem) {
				var checkedChk = methods.checkItemInGroup(dv, checkboxItem.id);

				if (checkedChk) {
					checkboxGroupObj.itemsJson[formObj.id + '_' + item.formName
							+ '_' + checkboxIndex] = {
						id : checkboxItem.id,
						name : checkboxItem.name
					}
				}

				var it = { // 以上相同
					xtype : 'checkbox',
					boxLabel : checkboxItem.name,
					id : formObj.id + '_' + item.formName + '_' + checkboxIndex,
					name : item.formName + '_' + checkboxIndex,
					inputValue : checkboxItem.id,
					checked : checkedChk,
					listeners : {
						'check' : function(checkItem, checked) {
							if (checked) {
								Ext.getCmp(formId).getForm()
										.findField(item.formName)
										.setValue(checkItem.id);

								if (targetItem != null) {
									Ext.getCmp(formId).getForm()
											.findField(targetItem.formName)
											.setValue(checkItem.name);
								}

								if (checkboxGroupObj.itemsJson[checkItem.id] == null) {
									checkboxGroupObj.itemsJson[checkItem.id] = {
										id : checkboxItem.id,
										name : checkboxItem.name
									}
								}
							} else {
								Ext.getCmp(formId).getForm()
										.findField(item.formName).setValue('');

								if (targetItem != null) {
									Ext.getCmp(formId).getForm()
											.findField(targetItem.formName)
											.setValue('');
								}

								if (checkboxGroupObj.itemsJson[checkItem.id] != null) {
									delete checkboxGroupObj.itemsJson[checkItem.id];
								}
							}

							if (huntItem && methods.fox(item, options.beanData)) {
								if (targetItem != null) {
									methods.foxhound(targetItem,
											checkboxItem.name, checkItem,
											resultJson, formObj, options);
								} else {
									methods.foxhound(item, checkboxItem.id,
											checkItem, resultJson, formObj,
											options);
								}
							}

							if (o.checkFunc && methods.canFunction(o.checkFunc)) {
								eval(o.checkFunc
										+ '(checkitem, checked, formId, options);');
							}
						}
					}
				};

				checkboxItems.push(it);

				checkboxIndex++;
			});

			if (checkboxItems.length > 0) {
				if (o.width) {
					checkboxGroupObj.width = o.width;
				} else {
					checkboxGroupObj.anchor = '90%';
				}

				if (o.height) {
					checkboxGroupObj.height = o.height;
				}

				if (formObj.checkboxes == null) {
					formObj.checkboxes = [];
				}

				formObj.checkboxes.push({
							checkboxGroup : checkboxGroupObj,
							idsItem : item.formName,
							namesItem : (targetItem != null
									? targetItem.formName
									: null),
							size : checkboxIndex
						});

				return checkboxGroupObj;

			} else {
				var it = {
					xtype : 'box',
					name : item.formName + '_',
					fieldLabel : labelString,
					html : 'The wordbook(' + o.wordbook + ') does not exist.'
				}

				return it;
			}

		} else if (item.type == 'select') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('select类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{type:\'rating\',target:\'userId\'}'); }
			 */
			var targetItem;

			if (o.target == null) {
				alert('The select components('
						+ item.name
						+ ')\'s target component is null, it will affect the integrity of the data.');
				targetItem = {
					formName : item.formName + '_notarget',
					defaultValue : ''
				}
			} else {
				targetItem = methods.findComponentItems(componentItems,
						o[o.target]);

				if (targetItem == null) {
					alert('The select components('
							+ item.name
							+ ')\'s target component(id='
							+ o.target
							+ ') does not exist, it will affect the integrity of the data.');
					targetItem = {
						formName : item.formName + '_notarget',
						defaultValue : ''
					}
				}
			}

			if (itemReadOnly == false) {
				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				var it = getWBComboStore(methods.getDefaultValue(null,
								o.wordbook), labelString, item.formName,
						targetItem.formName,
						(o.allowBlank == null || o.allowBlank), formId);

				if (o.returnFunc != null) {
					it.on('select', function(combo, record, index) {
								eval(o.returnFunc + '(\''
										+ (item.formName + 'id') + '\', \''
										+ (item.formName + 'name')
										+ '\', record, formId, options);');
							});
				}

				if (o.disabled == true) {
					it.disable();
				}

				var targetItemFactValue = methods.initBeanValue(targetItem,
						options.beanData);

				var targetItemLabel = methods.getDefaultValue(
						targetItemFactValue, targetItem.defaultValue, urlparam);

				if (targetItemLabel != null && trim(targetItemLabel) != '') {

					it.setValue(targetItemLabel);
				}

				if (o.listWidth && o.listWidth > 0) {
					it.listWidth = o.listWidth;
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				if (o.height) {
					it.height = o.height;
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : dv
						});

				if (huntItem && methods.fox(item, options.beanData)) {
					it.on('blur', function(thiz) {
								if (thiz.getValue() != dv) {
									if (targetItem != null) {
										methods.foxhound(targetItem,
												targetItemLabel, thiz,
												resultJson, formObj, options);
									} else {
										methods.foxhound(item, dv, thiz,
												resultJson, formObj, options);
									}
								}
							});
				}

				return it;
			} else {
				var targetItemFactValue = methods.initBeanValue(targetItem,
						options.beanData);

				var targetItemLabel = methods.getDefaultValue(
						targetItemFactValue, targetItem.defaultValue, urlparam);

				var it = {
					xtype : 'textfield',
					name : item.formName + '_',
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : targetItemLabel,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('hint', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : methods.getDefaultValue(factValue,
									item.defaultValue, urlparam)
						});

				return it;
			}

		} else if (item.type == 'guselect' || item.type == 'gselect'
				|| item.type == 'uselect' || item.type == 'guselect1'
				|| item.type == 'gselect1' || item.type == 'uselect1'
				|| item.type == 'roleselect' || item.type == 'roleselect1') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('guselect或者roleselect类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{root:\'0001\',targetName:\'userName\',targetType:\'userType\'}'); }
			 */
			var targetNameItem;

			if (o.targetName == null) {
				alert('The guselect or roleselect components('
						+ item.name
						+ ')\'s target is null, it will affect the integrity of the data.');
				targetNameItem = {
					formName : item.formName + '_nonametarget',
					defaultValue : ''
				}
			} else {
				targetNameItem = methods.findComponentItems(componentItems,
						o[o.targetName]);

				if (targetNameItem == null) {
					alert('The guselect or roleselect components('
							+ item.name
							+ ')\'s target component(id='
							+ o.targetName
							+ ') does not exist, it will affect the integrity of the data.');
					targetNameItem = {
						formName : item.formName + '_nonametarget',
						defaultValue : ''
					}
				}
			}

			var targetTypeItem;

			if (o.targetType == null) {
				alert('The guselect or roleselect components('
						+ item.name
						+ ')\'s target is null, it will affect the integrity of the data.');
				targetTypeItem = {
					formName : item.formName + '_notypetarget',
					defaultValue : ''
				}
			} else {
				targetTypeItem = methods.findComponentItems(componentItems,
						o[o.targetType]);
				if (targetTypeItem == null) {
					alert('The guselect or roleselect components('
							+ item.name
							+ ')\'s target component(id='
							+ o.targetType
							+ ') does not exist, it will affect the integrity of the data.');
					targetTypeItem = {
						formName : item.formName + '_notypetarget',
						defaultValue : ''
					}
				}
			}

			if (itemReadOnly == false) {

				var gucombox;

				var root = methods.getDefaultValue(null, o.root, urlparam);

				if (item.type == 'guselect') {
					gucombox = getGroupUserChkCombo4Single(labelString,
							item.formName, targetNameItem.formName,
							targetTypeItem.formName, root,
							(o.allowBlank == null || o.allowBlank), formId,
							options);
				} else if (item.type == 'gselect') {
					gucombox = getGroupSelectCombo4Single(labelString,
							item.formName, targetNameItem.formName,
							targetTypeItem.formName, root,
							(o.allowBlank == null || o.allowBlank), formId,
							options);
				} else if (item.type == 'uselect') {
					gucombox = getUserChkCombo4Single(labelString,
							item.formName, targetNameItem.formName,
							targetTypeItem.formName, root,
							(o.allowBlank == null || o.allowBlank), formId,
							options);
				} else if (item.type == 'guselect1') {
					gucombox = getGroupUserChkCombo(labelString, item.formName,
							targetNameItem.formName, targetTypeItem.formName,
							root, (o.allowBlank == null || o.allowBlank),
							formId, options);
				} else if (item.type == 'gselect1') {
					gucombox = getGroupSelectCombo(labelString, item.formName,
							targetNameItem.formName, targetTypeItem.formName,
							root, (o.allowBlank == null || o.allowBlank),
							formId, options);
				} else if (item.type == 'uselect1') {
					gucombox = getUserChkCombo(labelString, item.formName,
							targetNameItem.formName, targetTypeItem.formName,
							root, (o.allowBlank == null || o.allowBlank),
							formId);
				} else if (item.type == 'roleselect') {
					gucombox = getRoleSingleSelectCombo(labelString,
							item.formName, targetNameItem.formName,
							targetTypeItem.formName,
							targetNameItem.defaultValue,
							(o.allowBlank == null || o.allowBlank), formId,
							options);
				} else if (item.type == 'roleselect1') {
					gucombox = getRoleSelectCombo(labelString, item.formName,
							targetNameItem.formName, targetTypeItem.formName,
							targetNameItem.defaultValue,
							(o.allowBlank == null || o.allowBlank), formId,
							options);
				}

				if (o.listWidth && o.listWidth > 0) {
					gucombox.listWidth = o.listWidth;
				}

				if (o.width) {
					gucombox.width = o.width;
				} else {
					gucombox.anchor = '90%';
				}

				if (o.height) {
					gucombox.height = o.height;
				}

				if (o.disabled == true) {
					gucombox.disable();
				}

				var targetNameFactValue = methods.initBeanValue(targetNameItem,
						options.beanData);

				var targetNameItemLabel = methods.getDefaultValue(
						targetNameFactValue, targetNameItem.defaultValue,
						urlparam);

				if (targetNameItemLabel != null
						&& trim(targetNameItemLabel) != '') {
					gucombox.setValue(targetNameItemLabel);
				}

				if (huntItem && methods.fox(item, options.beanData)) {
					var dv = methods.getDefaultValue(factValue,
							item.defaultValue, urlparam);

					gucombox.on('blur', function(thiz) {
								if (thiz.getValue() != dv) {
									if (targetNameItem != null) {
										methods.foxhound(targetNameItem,
												targetNameItemLabel, thiz,
												resultJson, formObj, options);
									} else {
										methods.foxhound(item, dv, thiz,
												resultJson, formObj, options);
									}
								}
							});
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : methods.getDefaultValue(factValue,
									item.defaultValue, urlparam)
						});

				return gucombox;
			} else {
				var targetNameFactValue = methods.initBeanValue(targetNameItem,
						options.beanData);

				var it = {
					xtype : 'textfield',
					name : item.formName + '_',
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : targetNameFactValue,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('提示', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : methods.getDefaultValue(factValue,
									item.defaultValue, urlparam)
						});

				return it;
			}
		} else if (item.type == 'dataindex') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('dataindex类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{type:\'PC\',targetName:\'dataindexName\',returnFunc:\'selectDataindex\'
			 * }'); }
			 */
			var targetNameItem;

			if (o.targetName == null) {
				alert('The dataindex components('
						+ item.name
						+ ')\'s target is null, it will affect the integrity of the data.');
				targetNameItem = {
					formName : item.formName + '_nonametarget',
					defaultValue : ''
				}
			} else {
				targetNameItem = methods.findComponentItems(componentItems,
						o[o.targetName]);

				if (targetNameItem == null) {
					alert('The dataindex components('
							+ item.name
							+ ')\'s target component(id='
							+ o.targetName
							+ ') does not exist, it will affect the integrity of the data.');
					targetNameItem = {
						formName : item.formName + '_nonametarget',
						defaultValue : ''
					}
				}
			}

			if (itemReadOnly == false) {

				var returnFunc;

				if (o.returnFunc) {
					eval('returnFunc = function(node){' + o.returnFunc
							+ '(node, formId, options);} ');
				}

				var dditemOptions = {
					fieldLabel : labelString,
					returnIdField : item.formName,
					returnNameField : targetNameItem.formName,
					returnTypeField : o.targetType,
					type : o.type,
					allowBlank : (o.allowBlank == null || o.allowBlank),
					returnFunc : returnFunc,
					formId : formId,
					showLevel : o.showLevel,
					emptyText : (o.emptyText == null
							? 'Please choose...'
							: o.emptyText)
				}

				var dditem = getDataIndexCombo(dditemOptions);

				var targetFactValue = methods.initBeanValue(targetNameItem,
						options.beanData)

				var nameItemLabel = methods.getDefaultValue(targetFactValue,
						targetNameItem.defaultValue, urlparam);

				if (nameItemLabel != null && trim(nameItemLabel) != '') {
					dditem.setValue(nameItemLabel);
				}

				if (o.listWidth && o.listWidth > 0) {
					dditem.listWidth = o.listWidth;
				}

				if (o.width) {
					dditem.width = o.width;
				} else {
					dditem.anchor = '90%';
				}

				if (o.height) {
					dditem.height = o.height;
				}

				if (o.disabled == true) {
					dditem.disable();
				}

				if (huntItem && methods.fox(item, options.beanData)) {
					var dv = methods.getDefaultValue(factValue,
							item.defaultValue, urlparam);

					dditem.on('blur', function(thiz) {
								if (thiz.getValue() != dv) {
									if (targetNameItem != null) {
										methods.foxhound(targetNameItem,
												nameItemLabel, thiz,
												resultJson, formObj, options);
									} else {
										methods.foxhound(item, dv, thiz,
												resultJson, formObj, options);
									}
								}
							});
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : methods.getDefaultValue(factValue,
									item.defaultValue, urlparam)
						});

				return dditem;
			} else {
				var targetFactValue = methods.initBeanValue(targetNameItem,
						options.beanData);

				var it = {
					xtype : 'textfield',
					name : formId + '_' + item.formName + '_',
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : methods.getDefaultValue(targetFactValue,
							targetNameItem.defaultValue, urlparam),
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('提示', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : methods.getDefaultValue(factValue,
									item.defaultValue, urlparam)
						});

				return it;
			}
		} else if (item.type == 'tablequery') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('tablequery类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{queryKey:\'test\',
			 * targetIdItem:\'\', targetItem:\'\', pointId:\'\',
			 * pointName:\'\'}'); }
			 */
			var targetItem;

			if (o.target == null) {
				alert('The tablequery components('
						+ item.name
						+ ')\'s target is null, it will affect the integrity of the data.');
				targetItem = {
					formName : item.formName + '_notarget',
					defaultValue : ''
				}
			} else {
				targetItem = methods.findComponentItems(componentItems,
						o[o.target]);

				if (targetItem == null) {
					alert('The tablequery components('
							+ item.name
							+ ')\'s target component(id='
							+ o.target
							+ ') does not exist, it will affect the integrity of the data.');
					targetItem = {
						formName : item.formName + '_notarget',
						defaultValue : ''
					}
				}
			}

			if (trim(o.pointId) == '' || trim(o.pointName) == '') {
				alert('The tablequery components('
						+ item.name
						+ ')\'s pointId or pointName does not exist, it will affect the integrity of the data.');
			}

			if (itemReadOnly == false) {

				var returnFunc;

				if (o.returnFunc) {
					eval('returnFunc = function(resultArray, grid){'
							+ o.returnFunc
							+ '(resultArray, formId, grid, options);} ');
				} else {
					returnFunc = function(node) {
						if (node.length > 0) {
							Ext.getCmp(formId).getForm()
									.findField(item.formName)
									.setValue(node[0].data[o.pointId]);
							Ext.getCmp(formId).getForm()
									.findField(targetItem.formName)
									.setValue(node[0].data[o.pointName]);
						}
					};
				}

				var tqitem = getTableQueryCombo(labelString, o.queryKey,
						o.func, returnFunc, item.formName, targetItem.formName,
						o.pointId, o.pointName,
						(o.allowBlank == null || o.allowBlank), formId, o,
						options);

				var targetItemFactValue = methods.initBeanValue(targetItem,
						options.beanData);

				var targetItemLabel = methods.getDefaultValue(
						targetItemFactValue, targetItem.defaultValue, urlparam);

				if (targetItemLabel != null && trim(targetItemLabel) != '') {
					tqitem.setValue(targetItemLabel);
				}

				
				if (o.listWidth && o.listWidth > 0) {
					tqitem.listWidth = o.listWidth;
				}

				if (o.width) {
					tqitem.width = o.width;
				} else {
					tqitem.anchor = '90%';
				}

				if (o.height) {
					tqitem.height = o.height;
				}

				if (o.disabled == true) {
					tqitem.disable();
				}

				if (huntItem && methods.fox(item, options.beanData)) {
					var dv = methods.getDefaultValue(factValue,
							item.defaultValue, urlparam);

					tqitem.on('blur', function(thiz) {
								if (thiz.getValue() != dv) {
									if (targetItem != null) {
										methods.foxhound(targetItem,
												targetItemLabel, thiz,
												resultJson, formObj, options);
									} else {
										methods.foxhound(item, dv, thiz,
												resultJson, formObj, options);
									}
								}
							});
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : methods.getDefaultValue(factValue,
									item.defaultValue, urlparam)
						});

				return tqitem;
			} else {
				var targetItemFactValue = methods.initBeanValue(targetItem,
						options.beanData);

				var it = {
					xtype : 'textfield',
					name : item.formName + '_',
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : methods.getDefaultValue(targetItemFactValue,
							item.defaultValue, urlparam),
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.anchor = '90%';
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('提示', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : methods.getDefaultValue(factValue,
									item.defaultValue, urlparam)
						});

				return it;
			}
		} else if (item.type == 'cascade') {
			var targetNameItem;

			if (o.targetName == null) {
				alert('The cascade components('
						+ item.name
						+ ')\'s target is null, it will affect the integrity of the data.');
				targetNameItem = {
					formName : item.formName + '_nonametarget',
					defaultValue : ''
				}
			} else {
				targetNameItem = methods.findComponentItems(componentItems,
						o[o.targetName]);

				if (targetNameItem == null) {
					alert('The cascade components('
							+ item.name
							+ ')\'s target component(id='
							+ o.targetName
							+ ') does not exist, it will affect the integrity of the data.');
					targetNameItem = {
						formName : item.formName + '_nonametarget',
						defaultValue : ''
					}
				}
			}

			if (itemReadOnly == false) {
				var it = getCascadeItems(item, o, formId, componentItems,
						options, resultJson, formObj);

				formObj.hiddenItems.push({
							xtype : 'hidden',
							name : item.formName,
							value : methods.getDefaultValue(factValue,
									item.defaultValue, urlparam)
						});

				return it;
			} else {
				var itemFactValue;

				if (options.beanData != null) {
					itemFactValue = methods.initBeanValue(targetNameItem,
							options.beanData);
				}

				var dv = methods.getDefaultValue(itemFactValue,
						targetNameItem.defaultValue, urlparam);

				var it = {
					xtype : 'textfield',
					name : targetNameItem.formName,
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : dv,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.width = 180;
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('提示', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}

				var compositefieldItems = [];

				compositefieldItems.push(it);

				if (o.items) {
					Ext.each(o.items, function(it, i) {
						var dicItem = methods.findComponentItems(
								componentItems, item.tableName + '_'
										+ it.target);
						var dicItemName = methods.findComponentItems(
								componentItems, item.tableName + '_'
										+ it.targetName);

						var factValue = null;

						if (options.beanData != null) {
							factValue = methods.initBeanValue(dicItemName,
									options.beanData);
						}

						var dv = methods.getDefaultValue(factValue,
								dicItemName.defaultValue, urlparam);

						var dic = {
							xtype : 'textfield',
							name : dicItemName.formName,
							readOnly : true,
							style : 'background:#f0f0f0',
							fieldLabel : dicItem.label,
							value : dv,
							listeners : {}
						}

						if (o.width) {
							dic.width = o.width;
						} else {
							dic.width = 180;
						}

						dic.listeners.focus = function(thiz) {
							// Ext.Msg.alert('提示', '选项只读');
							thiz.fireEvent('blur');
						}

						dic.listeners.render = function(field) {
							if (field.rendered) {
								Ext.QuickTips.init();
								Ext.QuickTips.register({
											target : field.el,
											text : grooveTranslator
													.getLangLabel(
															'tableview-language',
															'readonly')
										});
							}
						}

						compositefieldItems.push({
									xtype : 'displayfield',
									value : '-'
								});

						compositefieldItems.push(dic);
					});
				}

				if (o.closeText) {
					var closeTextItem = methods.findComponentItems(
							componentItems, item.tableName + '_' + o.closeText);

					if (closeTextItem == null) {
						alert('The cascade components('
								+ item.name
								+ ')\'s closeText component('
								+ itemParam.closeText
								+ ') does not exist, it will affect the integrity of the data.');
					} else {
						var factValue;

						if (options.beanData != null) {
							factValue = methods.initBeanValue(closeTextItem,
									options.beanData);
						}

						var dv = methods.getDefaultValue(factValue,
								closeTextItem.defaultValue, urlparam);

						var closeText = {
							xtype : 'textfield',
							name : closeTextItem.formName + '_',
							readOnly : true,
							style : 'background:#f0f0f0',
							fieldLabel : closeTextItem.label,
							value : dv,
							listeners : {}
						}

						if (o.width) {
							closeTextItem.width = o.width;
						} else {
							closeTextItem.width = 180;
						}

						closeText.listeners.focus = function(thiz) {
							// Ext.Msg.alert('提示', '选项只读');
							thiz.fireEvent('blur');
						}

						closeText.listeners.render = function(field) {
							if (field.rendered) {
								Ext.QuickTips.init();
								Ext.QuickTips.register({
											target : field.el,
											text : grooveTranslator
													.getLangLabel(
															'tableview-language',
															'readonly')
										});
							}
						}

						compositefieldItems.push({
									xtype : 'displayfield',
									value : '-'
								});

						compositefieldItems.push(closeText);

					}
				}

				var cascade = {
					xtype : 'compositefield',
					fieldLabel : labelString,
					items : compositefieldItems
				};

				return cascade;

			}

		} else if (item.type == 'catena') {
			if (itemReadOnly == false) {
				var it = getCatenaItems(item, o, formId, componentItems,
						options, resultJson, formObj);

				return it;
			} else {
				var factValue;

				if (options.beanData != null) {
					factValue = methods.initBeanValue(item, options.beanData);
				}

				var dv = methods.getDefaultValue(factValue, item.defaultValue,
						urlparam);

				it = {
					xtype : 'textfield',
					name : item.formName,
					readOnly : true,
					style : 'background:#f0f0f0',
					fieldLabel : labelString,
					value : dv,
					listeners : {}
				}

				if (o.width) {
					it.width = o.width;
				} else {
					it.width = 180;
				}

				it.listeners.focus = function(thiz) {
					// Ext.Msg.alert('提示', '选项只读');
					thiz.fireEvent('blur');
				}

				it.listeners.render = function(field) {
					if (field.rendered) {
						Ext.QuickTips.init();
						Ext.QuickTips.register({
									target : field.el,
									text : grooveTranslator.getLangLabel(
											'tableview-language', 'readonly')
								});
					}
				}

				var compositefieldItems = [];

				compositefieldItems.push(it);

				if (o.items != null && o.items.length > 0) {
					Ext.each(o.items, function(node, i) {
						var factValue = null;

						var catenaItem = methods.findComponentItems(
								componentItems, item.tableName + '_'
										+ node.target);

						if (catenaItem == null) {
							alert('the Catena components('
									+ item.name
									+ ')\'s associated component('
									+ node.target
									+ ') is null, it will affect the integrity of the data.');
						}

						if (options.beanData != null) {
							factValue = methods.initBeanValue(catenaItem,
									options.beanData);
						}

						var dv = methods.getDefaultValue(factValue,
								catenaItem.defaultValue, urlparam);

						var it = {
							xtype : 'textfield',
							name : catenaItem.formName,
							readOnly : true,
							style : 'background:#f0f0f0',
							fieldLabel : catenaItem.label,
							value : dv,
							listeners : {}
						}

						if (o.width) {
							it.width = o.width;
						} else {
							it.width = 180;
						}

						it.listeners.focus = function(thiz) {
							// Ext.Msg.alert('提示', '选项只读');
							thiz.fireEvent('blur');
						}

						it.listeners.render = function(field) {
							if (field.rendered) {
								Ext.QuickTips.init();
								Ext.QuickTips.register({
											target : field.el,
											text : grooveTranslator
													.getLangLabel(
															'tableview-language',
															'readonly')
										});
							}
						}

						compositefieldItems.push({
									xtype : 'displayfield',
									value : '-'
								});

						compositefieldItems.push(it);
					});
				}

				var catena = {
					xtype : 'compositefield',
					fieldLabel : labelString,
					items : compositefieldItems
				};

				return catena;
			}
		} else {
			alert('Find the unrecognized components(' + item.type + ').');
		}
	},
	initExtFieldItemInList : function(thiz, item, resultJson, options, formId,
			cilObj, gridId) {
		var it = {
			xtype : 'textfield',
			allowBlank : false
		};

		var factValue;

		if (options.beanData != null) {
			factValue = methods.initBeanValue(item, options.beanData);
		}

		var urlparam = options.params;

		var o = item.param;

		if (o.zeroForEmpty == null) {
			o.zeroForEmpty = true;
		}

		if (item.type == 'input') {
			it = {
				fieldLabel : item.label,
				name : item.formName,
				xtype : 'textfield',
				allowBlank : (o.allowBlank == null || o.allowBlank),
				disabled : (o.disabled == true),
				value : methods.getDefaultValue(factValue, item.defaultValue,
						urlparam),
				selectOnFocus : true,
				listeners : {}
			}

			if (o.vtype) {
				it.vtype = o.vtype;
			}

			if (o.minLength) {
				it.minLength = o.minLength;
			}

			if (o.minLengthText) {
				it.minLengthText = o.minLengthText;
			}

			if (o.maxLength == null) {
				o.maxLength = item.length;
			}

			if (o.maxLength) {
				it.maxLength = o.maxLength;
			}

			if (o.maxLengthText) {
				it.maxLengthText = o.maxLengthText;
			}

			if (o.listenClick) {
				it.listeners.click = function(thiz) {
					var row = thiz.gridEditor.row;

					var rowData = Ext.getCmp(gridId).store.getAt(row);

					try {
						eval(o.listenClick + '(thiz, rowData, formId, gridId);');
					} catch (error) {
						alert(error.message);
					}
				}
			}

			if (o.listenBlur) {
				it.listeners.blur = function(thiz) {
					var row = thiz.gridEditor.row;

					var rowData = Ext.getCmp(gridId).store.getAt(row);

					try {
						eval(o.listenBlur + '(thiz, rowData, formId, gridId);');
					} catch (error) {
						alert(error.message);
					}
				}
			}
		} else if (item.type == 'number') {
			if (o.zeroForEmpty && factValue == '0') {
				factValue = '';
			}

			it = {
				fieldLabel : item.label,
				name : item.formName,
				xtype : 'numberfield',
				allowBlank : (o.allowBlank == null || o.allowBlank),
				disabled : (o.disabled == true),
				allowDecimals : (o.allowDecimals != null && o.allowDecimals), // 允许小数点
				allowNegative : (o.allowNegative != null && o.allowNegative), // 允许负数
				value : methods.getDefaultValue(factValue, item.defaultValue,
						urlparam),
				listeners : {}
			};

			if (o.width) {
				it.width = o.width;
			} else {
				it.anchor = '90%';
			}

			if (o.height) {
				it.height = o.height;
			}

			if (o.minLength) {
				it.minLength = o.minLength;
			}

			if (o.minLengthText) {
				it.minLengthText = o.minLengthText;
			}

			if (o.maxLength) {
				it.maxLength = o.maxLength;
			}

			if (o.maxLengthText) {
				it.maxLengthText = o.maxLengthText;
			}

			if (o.minValue) {
				it.minValue = o.minValue;
			}

			if (o.minText) {
				it.minText = o.minText;
			}

			if (o.maxValue) {
				it.maxValue = o.maxValue;
			}

			if (o.maxText) {
				it.maxText = o.maxText;
			}

			if (o.nanText) {
				it.nanText = o.nanText;
			}

			if (o.baseChars) {
				it.baseChars = o.baseChars;
			}

			if (o.listenClick) {
				it.listeners.click = function(thiz) {
					var row = thiz.gridEditor.row;

					var rowData = Ext.getCmp(gridId).store.getAt(row);

					try {
						eval(o.listenClick + '(thiz, rowData, formId, gridId);');
					} catch (error) {
						alert(error.message);
					}
				}
			}

			if (o.listenBlur) {
				it.listeners.blur = function(thiz) {
					var row = thiz.gridEditor.row;

					var rowData = Ext.getCmp(gridId).store.getAt(row);

					try {
						eval(o.listenBlur + '(thiz, rowData, formId, gridId);');
					} catch (error) {
						alert(error.message);
					}
				}
			}
		} else if (item.type == 'money') {
			if (o.zeroForEmpty && factValue == '0') {
				factValue = '';
			}

			var dv = methods.getDefaultValue(factValue, item.defaultValue,
					urlparam);

			it = {
				xtype : 'textfield',
				fieldLabel : item.label,
				name : item.formName,
				allowBlank : (o.allowBlank == null || o.allowBlank),
				disabled : (o.disabled == true),
				value : dv,
				listeners : {
					'blur' : function(thiz) {
						var row = thiz.gridEditor.row;

						var rowData = Ext.getCmp(gridId).store.getAt(row);

						if (trim(thiz.getValue()) != '') {
							if (isNaN(thiz.getValue())) {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'tableview-language',
												'numberonly'));
								thiz.setValue('');
							}
						}

						if (o.listenBlur) {
							try {
								eval(o.listenBlur
										+ '(thiz, rowData, formId, gridId);');
							} catch (error) {
								alert(error.message);
							}
						}
					}
				}
			}

			if (o.width) {
				it.width = o.width;
			} else {
				it.anchor = '90%';
			}

			if (o.height) {
				it.height = o.height;
			}

			if (o.minLength) {
				it.minLength = o.minLength;
			}

			if (o.minLengthText) {
				it.minLengthText = o.minLengthText;
			}

			if (o.maxLength) {
				it.maxLength = o.maxLength;
			}

			if (o.maxLengthText) {
				it.maxLengthText = o.maxLengthText;
			}
		} else if (item.type == 'date' || item.type == 'time') {
			var dv = methods.getDefaultValue(factValue, item.defaultValue,
					urlparam);

			it = {
				xtype : 'datefield',
				fieldLabel : item.label,
				name : item.formName,
				format : 'Y-m-d',
				value : dv,
				allowBlank : (o.allowBlank == null || o.allowBlank),
				disabled : (o.disabled == true),
				listeners : {
					select : function(m, d) {
						var row = m.gridEditor.row;

						var rowData = Ext.getCmp(gridId).store.getAt(row);
						if (m.value != '') {
							rowData.set(item.formName, parseDate(m.value)
											+ '000000');
						}

						if (o.listenSele) {
							try {
								eval(o.listenSele
										+ '(m, rowData, formId, gridId);');
							} catch (error) {
								alert(error.message);
							}
						}
					},
					blur : function(m, d) {
						if (m.value != '') {
							var row = m.gridEditor.row;

							var rowData = Ext.getCmp(gridId).store.getAt(row);

							rowData.set(item.formName, parseDate(m.value)
											+ '000000');
						}
					}
				}
			};

			if (o.width) {
				it.width = o.width;
			} else {
				it.anchor = '90%';
			}

			if (o.height) {
				it.height = o.height;
			}
		} else if (item.type == 'select') {
			var targetItem;

			if (o.target == null) {
				alert('The select components('
						+ item.name
						+ ')\'s target is null, it will affect the integrity of the data.');
				targetItem = {
					formName : item.formName + '_notarget',
					defaultValue : ''
				}
			} else {
				targetItem = methods.findComponentItems(cilObj.component,
						o[o.target]);

				if (targetItem == null) {
					alert('The select components('
							+ item.name
							+ ')\'s target component(id='
							+ o.target
							+ ') does not exist, it will affect the integrity of the data.');
					targetItem = {
						formName : item.formName + '_notarget',
						defaultValue : ''
					}
				}
			}

			var tp = methods.getDefaultValue(null, o.wordbook);

			it = getWBComboboxEditor(tp, item.label, item.formName,
					targetItem.formName,
					(o.allowBlank == null || o.allowBlank), formId, cilObj);

			autoLoadWBCombobox(it, tp);

			if (o.returnFunc != null) {
				it.on('select', function(combo, record, index) {
							var row = combo.gridEditor.row;

							var rowData = Ext.getCmp(gridId).store.getAt(row);

							eval(o.returnFunc + '(\'' + (item.formName + 'id')
									+ '\', \'' + (item.formName + 'name')
									+ '\', record, formId, gridId, rowData);');
						});
			}

			if (o.disabled == true) {
				it.disable();
			}
		}

		return it;
	},
	checkItemInGroup : function(checkIds, id) {
		if (checkIds == null) {
			return false;
		}
		var rnt = false;
		var ids = checkIds.split(",");
		for (var i = 0; i < ids.length; i++) {
			if (ids[i] == id) {
				rnt = true;
				break;
			}
		}
		return rnt;
	},
	/**
	 * 获取默认值
	 * 
	 * @param {}
	 *            vlu 默认值定义
	 * @param {}
	 *            param 参数map
	 * @return {}
	 */
	getDefaultValue : function(factValue, vlu, param) {
		if (factValue != null && trim(factValue) != '') {
			return factValue;
		}

		var temp = vlu;

		if (vlu != null && vlu != '') {
			var f = vlu.substring(0, 1);

			// 默认值为获取参数类型
			if (f == '@') {
				if (param != null && param[vlu.substring(1)]) {
					temp = param[vlu.substring(1)];
				} else {
					try {
						eval('temp = ' + vlu.substring(1) + ';');
					} catch (error) {
						alert(error.message);
						temp = '';
					}
				}
			} else if (f == '#' && vlu.substring(1) != '') {
				// 默认值为自定义函数返回值类型
				try {
					temp = eval(vlu.substring(1) + '()');
				} catch (error) {
					alert(error.message);
				}
			}

			// 使用变量名从全局拿数据
			if (f == '@' && Ext.isEmpty(temp)) {
				temp = getGlobalValByParaName(vlu.substring(1));
			}
		}

		return temp;
	},
	initBeanValue : function(item, beanData) {
		if (beanData != null) {
			if (beanData[item.formName] != null) {
				// item.defaultValue = beanData[item.formName];
				return beanData[item.formName];
			} else if (beanData[item.name] != null) {
				// item.defaultValue = beanData[item.name];
				return beanData[item.name];
			}

			return null;
		}

		return null;
	},
	/**
	 * 找到指定的组件
	 * 
	 * @param {}
	 *            componentItems 组件列表
	 * @param {}
	 *            formName 组件formName
	 * @return {}
	 */
	findComponentItems : function(componentItems, formName) {
		return componentItems[formName];
	},
	/**
	 * 密码确认
	 * 
	 * @param {}
	 *            p1
	 * @param {}
	 *            p2
	 * @return {Boolean}
	 */
	confirmPassword : function(p1, p2) {
		if (p1.getValue() != p2.getValue()) {
			p2.setValue('');
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), p1.fieldLabel
							+ grooveTranslator.getLangLabel(
									'tableview-language', 'mismatch'));
			return false;
		}

		return true;
	},
	/**
	 * 
	 * @param {}
	 *            form
	 * @return {}
	 */
	checkoutForm : function(form, resultJson) {
		var rnt = form.getForm().isValid();
		/*
		 * if (!rnt) { form.getForm().items.each(function(b) { if
		 * (!b.validate()) { alert(b.fieldLabel); return false; } }); }
		 */
		if (rnt && resultJson.componentInList != null) {
			// list listInview
			Ext.each(resultJson.componentInList, function(listObj, i) {
				var gridId = form.id + '_' + listObj.id;
				var grid = Ext.getCmp(gridId);
				if (listObj.param.allowBlank != null
						&& listObj.param.allowBlank == false
						&& grid.getStore().getCount() < 1) {

					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							(listObj.param.title == null
									? listObj.id
									: listObj.param.title)
									+ grooveTranslator.getLangLabel(
											'tableview-language', 'isinvalid'));
					rnt = false;
					return false;
				}
			});
		}

		return rnt;
	},
	assemblingList : function(resultJson, params, form) {
		var rnt = true;

		if (resultJson.componentInList != null) {
			// list listInview
			Ext.each(resultJson.componentInList, function(listObj, i) {
				var gridId = form.id + '_' + listObj.id;
				var grid = Ext.getCmp(gridId);

				if (listObj.param.allowBlank != null
						&& listObj.param.allowBlank == false
						&& grid.getStore().getCount() < 1) {

					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							(listObj.param.title == null
									? listObj.id
									: listObj.param.title)
									+ grooveTranslator.getLangLabel(
											'tableview-language', 'isinvalid'));
					rnt = false;
					return false;
				}

				var tableName = listObj.forTable;
				var counterName = listObj.counterName;

				var counterString = '';
				// list storeInlist
				grid.store.each(function(record, j) {
					counterString += form.counterIdx + ',';
					// list itemInRecord
					Ext.each(listObj.items, function(item) {
						params[item.formName + '_' + form.counterIdx] = record.data[item.name];
					});

					form.counterIdx++;
				});

				params[counterName] = counterString;
			});
		}

		if (resultJson.componentTabpanel != null) {
			Ext.each(resultJson.componentTabpanel, function(ct) {
						Ext.each(ct.tabs, function(tab) {
									rnt = methods.assemblingList(
											tab.resultJson, params, form);

									return rnt;
								});
					});

		}

		return rnt;
	},
	resetTableViewForm : function(form, o) {
		// set primary-table pk-id value
		form
				.getForm()
				.findField(form.resultJson.primaryTableColumnFormName)
				.setValue(o.resultData[form.resultJson.primaryTableColumnFormName]);

		// set foreign-table(handle-type is single) pk-id value
		for (var foreignTable in form.resultJson.foreignTables) {
			var foreignTableObj = form.resultJson.foreignTables[foreignTable];

			if (foreignTableObj.foreignTableHandleType == 'single'
					&& form
							.getForm()
							.findField(foreignTableObj.foreignTableColumnFormName) != null) {
				form
						.getForm()
						.findField(foreignTableObj.foreignTableColumnFormName)
						.setValue(o.resultData[foreignTableObj.foreignTableColumnFormName]);
			}
		}

		// set component-in-list value
		Ext.each(o.resultData.componentInList, function(listObj, i) {
					var gridId = form.id + '_' + listObj.id;

					var grid = Ext.getCmp(gridId);
					// list storeInlist
					grid.getStore().each(function(record, j) {
						// return new pk-id for
						if (record.data[listObj.forTablePrimaryColumnName] == '') {
							// reset vil store
							record.set(listObj.forTablePrimaryColumnName,
									listObj.resultData[j]);
						}

					});

					grid.stopEditing();
				});
	},
	checkboxReturn : function(form) {
		var items = form.checkboxes;
		if (items != null && items.length > 0) {
			for (var i = 0; i < items.length; i++) {
				var checkboxObj = items[i];

				var ids = '';
				var names = '';

				// var idx = checkboxObj.size;

				var itemsJson = checkboxObj.checkboxGroup.itemsJson

				for (var j in itemsJson) {
					var item = itemsJson[j];

					ids += item.id + ',';
					names += item.name + ',';
				}

				/*
				 * for (var j = 0; j < idx; j++) { var chk = Ext.getCmp(form.id +
				 * '_' + checkboxObj.idsItem + '_' + j); if (chk.checked) { ids +=
				 * chk.inputValue + ','; names += chk.boxLabel + ','; } }
				 */

				/*
				 * var checkboxitems = checkboxObj.checkboxGroup.items; if
				 * (checkboxitems != null && checkboxitems.length > 0) { for
				 * (var i = 0; i < checkboxitems.length; i++) { var chk =
				 * checkboxitems[i];// checkboxitems.itemAt(i) if (chk.checked) {
				 * ids += chk.inputValue + ','; names += chk.boxLabel + ','; } } }
				 */

				if (ids != '') {
					form.getForm().findField(checkboxObj.idsItem)
							.setValue(ids.length > 0 ? ids.substring(0,
									ids.length - 1) : ids);
					if (checkboxObj.namesItem != null) {
						form.getForm().findField(checkboxObj.namesItem)
								.setValue(names.length > 0 ? names.substring(0,
										names.length - 1) : names);
					}
				} else {
					form.getForm().findField(checkboxObj.idsItem).setValue('');
					form.getForm().findField(checkboxObj.namesItem)
							.setValue('');
				}
			}
		}
	},
	radioReturn : function(form) {
		var items = form.radios;
		if (items != null && items.length > 0) {
			for (var i = 0; i < items.length; i++) {
				var radioObj = items[i];

				var idx = radioObj.size;

				for (var j = 0; j < idx; j++) {
					var radio = Ext.getCmp(form.id + '_' + radioObj.idsItem
							+ '_' + j);
					if (radio.checked) {
						form.getForm().findField(radioObj.idsItem)
								.setValue(radio.inputValue);
						if (radioObj.namesItem != null) {
							form.getForm().findField(radioObj.namesItem)
									.setValue(radio.boxLabel);
						}

						break;
					}
				}

				/*
				 * var radioitems = radioObj.radioGroup.items; if (radioitems !=
				 * null && radioitems.length > 0) { for (var i = 0; i <
				 * radioitems.length; i++) { if (radioitems.itemAt(i).checked) {
				 * form.getForm().findField(radioObj.idsItem)
				 * .setValue(radioitems.itemAt(i).inputValue); if
				 * (radioObj.namesItem != null) { form .getForm()
				 * .findField(radioObj.namesItem)
				 * .setValue(radioitems.itemAt(i).boxLabel); }
				 * 
				 * break; } } }
				 */
			}
		}
	},
	submitViewForm : function(resultJson, form, aftercall, beforecall, msg) {
		remixTableView4Ext(resultJson.id, function(params) {
			var submitIt = false;

			if (beforecall) {
				submitIt = beforecall(params, form);
			} else {
				submitIt = true;
			}

			if (submitIt) {
				if (form.getForm().isValid() == false) {
					submitIt = false;
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('tableview-language',
									'isinvalid'));
				} else {
					methods.checkboxReturn(form);
					// methods.radioReturn(form);

					submitIt = methods.assemblingList(resultJson, params, form);
				}
			}

			return submitIt;
		}, aftercall, form, msg);
	},
	ArrayRemove : function(array, dx) {
		if (array == null) {
			return false;
		}
		if (isNaN(dx) || dx > array.length) {
			return false;
		}
		for (var i = 0, n = 0; i < array.length; i++) {
			if (array[i] != array[dx]) {
				array[n++] = array[i]
			}
		}
		array.length -= 1
	},
	RMBMoney : function(money) {
		var value = trim(money);

		if (value == '') {
			return '';
		}

		var numberDelim = ',';
		var delimLength = 3;
		//var prefixChar = '￥';
		var prefixChar = '';
		if (!isNaN(money)) {
			var vSplit = value.split('.');

			var cents = (vSplit[1]) ? '.' + vSplit[1] : '';
			if (true && cents == '')
				cents = '.00';

			if (numberDelim && delimLength) {
				var numbers = vSplit[0].split('');
				while (numbers.length > 0) {
					if (numbers[0] == '0' && numbers.length != 1) {
						numbers.shift();
					} else {
						break;
					}
				}
				var sNumbers = [];
				var c = 0;
				while (numbers.length > 0) {
					c++;
					if (c > delimLength)
						c = 1;
					sNumbers.unshift(numbers.pop());
					if (c == delimLength && numbers.length > 0)
						sNumbers.unshift(numberDelim);
				}
				value = sNumbers.join('') + cents;
			} else {
				value = vSplit[0] + cents;
			}
			if (prefixChar)
				value = prefixChar + String(value);

			return value;
		} else {
			alert(grooveTranslator.getLangLabel('tableview-language',
					'numberonly'));
			return '';
		}

		//return "￥" + v;
		return v;
	},
	RMBMoneyNoPrefix : function(money) {
		var value = trim(money);

		if (value == '') {
			return '';
		}

		var numberDelim = ',';
		var delimLength = 3;
		var prefixChar = '';

		if (!isNaN(money)) {
			var vSplit = value.split('.');

			var cents = (vSplit[1]) ? '.' + vSplit[1] : '';
			if (true && cents == '')
				cents = '.00';

			if (numberDelim && delimLength) {
				var numbers = vSplit[0].split('');
				while (numbers.length > 0) {
					if (numbers[0] == '0' && numbers.length != 1) {
						numbers.shift();
					} else {
						break;
					}
				}
				var sNumbers = [];
				var c = 0;
				while (numbers.length > 0) {
					c++;
					if (c > delimLength)
						c = 1;
					sNumbers.unshift(numbers.pop());
					if (c == delimLength && numbers.length > 0)
						sNumbers.unshift(numberDelim);
				}
				value = sNumbers.join('') + cents;
			} else {
				value = vSplit[0] + cents;
			}
			if (prefixChar)
				value = prefixChar + String(value);

			return value;
		} else {
			alert(grooveTranslator.getLangLabel('tableview-language',
					'numberonly'));
			return '';
		}

		return v;
	},
	viewFile : function(id, name, url) {

	},
	loadJSCSS : function(json) {
		if (json.js != null && json.js != '') {
			var xmlhttp = sendRequestObject(context + json.js);

			if (xmlhttp.status == 200) {
				IncludeJS(json.id + '_js', xmlhttp.responseText);
			} else if (xmlhttp.status == 404) {
				Ext.Msg.alert('hint', 'table-view custom js file(' + json.jsurl
								+ ')there is no');
			}
		}

		if (json.css != null && json.css != '') {
			var xmlhttp = sendRequestObject(context + json.css);
			if (xmlhttp.status == 200) {
				IncludeCSS(json.id + '_css', xmlhttp.responseText);
			} else if (xmlhttp.status == 404) {
				Ext.Msg.alert('hint', 'table-view custom css file('
								+ json.cssurl + ')there is no');
			}
		}
	},
	ArrayRemove2 : function(arr, index) {
		if (isNaN(index) || index > this.length) {
			return false;
		}

		arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
	},
	reloadComboboxStore : function(form, combobox, url, init) {
		combobox.setValue('');

		if (!init && combobox.returnObject) {
			var returnIdField = combobox.returnObject.id;
			var returnNameField = combobox.returnObject.name;

			var returnId = form.findField(returnIdField);

			var returnName = form.findField(returnNameField);

			if (returnId != null) {
				returnId.setValue('');
			}
			if (returnName != null) {
				returnName.setValue('');
			}
		}

		var store = combobox.store;
		store.proxy = new Ext.data.HttpProxy({
					url : url
				});
		store.load();
	},
	reloadComboboxStoreData : function(form, combobox, tp, init) {
		if (!init && combobox.returnObject) {
			combobox.setValue('');

			var returnIdField = combobox.returnObject.id;
			var returnNameField = combobox.returnObject.name;

			var returnId = form.findField(returnIdField);

			var returnName = form.findField(returnNameField);

			if (returnId != null) {
				returnId.setValue('');
			}
			if (returnName != null) {
				returnName.setValue('');
			}
		}

		combobox.hasLoadData = false;
		combobox.store.wbType = tp;

		awakeWBComboStore(combobox);

		/*
		 * combobox expand 会自动加载意见内容,see formfield.cmp.js var store =
		 * combobox.store;
		 * 
		 * var type = trim(tp);
		 * 
		 * var data = (type != '' ? getWBComboStoreLocalData(type) : []);
		 * 
		 * var comboData = { data : data };
		 * 
		 * store.removeAll(); store.loadData(comboData, true);
		 */
	},
	dynamicAllowBlankFormItem : function(form, item, allowBlank) {
		// 动态处理form item 是否非空
		if (item == null) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'tableview-language', 'dynamichandlealert'));
		} else {
			item.allowBlank = allowBlank;

			if (allowBlank == true) {
				item.clearInvalid();
			} else {
				item.isValid();
			}
		}
	},
	dynamicHandleFormItem : function(form, item, mode, allowBlank) {
		// 动态处理form item 是否操作/是否非空

		if (item == null) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'tableview-language', 'dynamichandlealert'));
		} else {
			if (item.getXType() == 'combo') {
				if (allowBlank != null) {
					item.allowBlank = allowBlank;
				}

				if (mode == true) {
					item.enable();
					item.isValid();
				} else {
					item.setValue('');

					if (item.returnObject) {
						var returnIdField = item.returnObject.id;
						var returnNameField = item.returnObject.name;

						var returnId = form.findField(returnIdField);

						var returnName = form.findField(returnNameField);

						if (returnId != null) {
							returnId.setValue('');
						}
						if (returnName != null) {
							returnName.setValue('');
						}
					}

					item.clearInvalid();
					item.disable();
				}
			} else if (item.getXType() == 'fieldset') {
				if (mode == true) {
					item.enable();
					item.expand();
				} else {
					item.disable();
					item.collapse();
				}
			} else if (item.getXType() == 'datefield') {
				if (allowBlank != null) {
					item.allowBlank = allowBlank;
				}

				if (mode == true) {
					item.enable();
					item.isValid();
				} else {
					item.setValue('');
					item.clearInvalid();
					item.disable();
				}
			} else {
				if (allowBlank != null) {
					item.allowBlank = allowBlank;
				}

				if (mode == true) {
					item.enable();
					item.isValid();
				} else {
					item.clearInvalid();
					item.disable();

					item.setValue('');

					if (item.returnObject) {
						var returnItem = form.findField(item.returnObject);

						if (returnItem != null) {
							returnItem.setValue('');
						}
					}
				}
			}
		}
	},
	canFunction : function(functionName) {
		return eval('typeof ' + functionName + ' != \'undefined\'')
				&& eval(functionName + ' instanceof Function')
	},
	checkStringlength : function(str) {
		if (str == null) {
			return 0;
		}
		str = str + '';
		return str.replace(/[^\x00-\xff]/g, '**').length;
	},
	getTableViewObjectStatic : function(tableViewId) {
		if (tableviewStuff[tableViewId] == null) {
			alert('not found tableview(' + tableViewId + ')');
		} else {
			if (eval(tableViewId + ' == null')) {
				var tvResultJson = methods.getTableViewObject(tableViewId);

				eval(tableViewId + ' = tvResultJson;');
			}
		}

		// tvResultJson.frozen = false;
		return eval(tableViewId);
	},
	getTableViewObject : function(tableViewId) {
		// dynamic
		var tvResultJson = null;

		if (tableviewStuff[tableViewId] == null) {
			alert('not found tableview(' + tableViewId + ')');
		} else {
			var url = context + "/temp-store/jsstuff/tableview/"
					+ tableviewStuff[tableViewId] + "/" + tableViewId + ".json";

			var responseText = sendRequest(url);

			try {
				tvResultJson = Ext.util.JSON.decode(responseText);// 将字符串转换为json类型
			} catch (error) {
				alert('json(' + tableViewId + ') format is wrong');
			}

			if (typeof tvResultJson.size == 'string') {
				var viewSize = Ext.util.JSON.decode(tvResultJson.size);
				tvResultJson.size = viewSize;
			}
		}

		// tvResultJson.frozen = false;
		return tvResultJson;
	},
	foxhound : function(item, dv, thiz, resultJson, formObj, options) {
		if (item.alien != true) {
			/*
			 * var fox = { tableViewId : resultJson.id, primaryTableKeyValue :
			 * options.beanData[resultJson.primaryTableColumnName], fieldLabel :
			 * item.label, fieldName : item.formName, columnName : item.name,
			 * tableName : item.tableName, pkValue :
			 * options.beanData[item.primaryColumnName], orgValue :
			 * itemObj.value, newValue : thiz.getValue(), curValue :
			 * thiz.getValue() }
			 */

			saveTableSilently('ISYS_TABLEVIEW_TRACE', 'single', '-1', function(
					params) {
				params.tableViewId = resultJson.id;
				params.primaryTableKeyValue = options.beanData[resultJson.primaryTableColumn];
				params.fieldLabel = item.label;
				params.fieldName = item.formName;
				params.columnName = item.name;
				params.tableName = item.tableName;
				params.keyValue = options.beanData[item.primaryColumnName];
				params.orgValue = dv;
				params.newValue = Ext.getCmp(formObj.id).getForm()
						.findField(item.formName).getValue();
				params.curValue = Ext.getCmp(formObj.id).getForm()
						.findField(item.formName).getValue();
				return true
			}, null, 'foxhound');
		}
	},
	fox : function(item, beanData) {
		return (item.alien != true && (beanData != null && beanData[item.primaryColumnName]));
	},
	dateReturn : function(m, item, formId) {
		var dateFieldValue = m.value;

		if (dateFieldValue != '') {
			Ext
					.getCmp(formId)
					.getForm()
					.findField(item.formName)
					.setValue(parseDate(m.value)
							+ ((item.mode == '06' || item.mode == '12' || item.mode == '13')
									? ''
									: '000000'));
		}
	},
	dateReturnMax : function(m, item, formId) {
		var dateFieldValue = m.value;

		if (dateFieldValue != '') {
			Ext.getCmp(formId).getForm().findField(item.formName + '_')
					.setValue(parseDate(m.value) + '240000');
		}
	}
}

/**
 * 根据变量名称从全局获取变量值
 */
function getGlobalValByParaName(paraName) {

	var temp = "";
	if (Ext.isEmpty(paraName)) {
		return temp;
	}

	try {
		temp = eval(paraName);
	} catch (e) {
		temp = "";
	}

	return temp;
}
