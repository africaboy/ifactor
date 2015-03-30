/**
 * todo from workflow-query list
 * 
 * @param {}
 *            gridId
 * @param {}
 *            actId
 * @param {}
 *            displayMode
 * @param {}
 *            tabid
 * @param {}
 *            title
 * @param {}
 *            width
 * @param {}
 *            height
 */
function doWorkflowFromList(options) {
	/*
	 * var options = { actId : actId, displayMode : displayMode, tabid : tabid,
	 * tabcontainerid : 'consoletabs', title : title, size : { width : width ==
	 * null ? 1000 : width, height : height == null ? 600 : height }, actionSrc : {
	 * type : 'tablequery', gridId : gridId } }
	 */

	if (options.actId == '0') {
		inWorkflow(options);
	} else {
		doWorkflow(options);
	}
}

/**
 * 初始化视图(作为tabpanel的tab),流程开始
 * 
 * @param {}
 *            options
 */
function startWorkflow(options) {
	if (options.key == null) {
		Ext.Msg.alert('hint',
				'options.key is null, can not create view for workflow.');

		return false;
	}

	if (options.displayMode == null) {
		options.displayMode = 'tab';
	}

	var url = context + '/system/flowservice.do?method=startWorkflow&key='
			+ options.key;

	letsworkflow(url, options, function() {
				if (options.actionSrc) {
					if (options.actionSrc.type = 'tablequery') {
						reloadTQList(options.actionSrc.gridId);
					}
				}
			});

}

/**
 * 初始化视图(作为tabpanel的tab),流程办理
 * 
 * @param {}
 *            options
 */
function doWorkflow(options) {
	if (options == null || trim(options.actId) == ''
			|| trim(options.actId) == '0') {
		Ext.Msg.alert('hint',
				'activity id is invalid, canot create view to do workflow.');

		return false;
	}

	if (options.displayMode == null) {
		options.displayMode = 'tab';
	}

	var url = context + '/system/flowservice.do?method=doWorkflow&actId='
			+ options.actId;

	letsworkflow(url, options, function() {
				if (options.actionSrc) {
					if (options.actionSrc.type = 'tablequery') {
						reloadTQList(options.actionSrc.gridId);
					}
				}
			});
}

/**
 * 初始化视图(作为tabpanel的tab),走进流程
 * 
 * @param {}
 *            options
 */
function inWorkflow(options) {
	if (options == null || trim(options.actId) == '') {
		Ext.Msg.alert('hint',
				'activity id is invalid, can not create view to do workflow.');

		return false;
	}

	if (options.displayMode == null) {
		options.displayMode = 'tab';
	}

	var url = context + '/system/flowservice.do?method=inWorkflow';

	letsworkflow(url, options, function() {
				if (options.actionSrc) {
					if (options.actionSrc.type = 'tablequery') {
						reloadTQList(options.actionSrc.gridId);
					}
				}
			});
}

function viewWorkflow(options) {
	if (options == null || trim(options.actId) == ''
			|| trim(options.actId) == '0') {
		Ext.Msg.alert('hint',
				'activity id is invalid, canot create view to do workflow.');

		return false;
	}

	if (options.displayMode == null) {
		options.displayMode = 'tab';
	}

	var url = context + '/system/flowservice.do?method=viewWorkflow&actId='
			+ options.actId;

	letsworkflow(url, options);
}

function letsworkflow(actionUrl, options, returnFunc) {
	options.globalCloseConfirm = true;

	if (options.displayMode == 'tab') {
		if (!Ext.getCmp(options.tabid)) {
			Ext.MessageBox.wait(grooveTranslator.getLangLabel(
											'common-language', 'list-loading'));

			workflowOnline(actionUrl, options, function(borderPanel) {
						if (options.globalCloseConfirm) {
							borderPanel.listeners.beforeclose = function(thiz) {
								// 判断是否关闭
								Ext.Msg.show({
											title : grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
											msg : grooveTranslator.getLangLabel(
											'flow-language', 'closewindow'),
											icon : Ext.MessageBox.QUESTION,
											buttons : {
												yes : grooveTranslator.getLangLabel(
											'common-language', 'close'),
												no : grooveTranslator.getLangLabel(
											'common-language', 'cancel')
											},
											fn : function(option) {
												if (option == 'yes') {
													thiz.destroy();// 调用销毁
												} else {
													return false;
												}
											}
										});
								return false;
							};

							// 在销毁对象前，判断用户是否要关闭窗口，好像在点击关闭按钮时，ext就异步开始销毁页面元素，所以如果不监听beforedestroy，前面的Ext.Msg.alert()就显示不出来
							borderPanel.listeners.beforedestroy = function(tab) {
								return true;
							};
						}

						Ext.getCmp(options.tabcontainerid).add(borderPanel)
								.show();

						Ext.MessageBox.hide();

						if (returnFunc) {
							returnFunc();
						}
					});
		} else {
			Ext.getCmp(options.tabcontainerid).setActiveTab(options.tabid);
		}
	} else if (options.displayMode == 'window') {
		if (!Ext.getCmp(options.tabid)) {
			Ext.MessageBox.wait('The view in the process of initialization...');

			workflowOnline(actionUrl, options, function(borderPanel) {
				var viewWin = new Ext.Window({
					id : options.tabid,
					renderTo : Ext.getBody(),
					layout : 'fit',
					width : options.size.width,
					height : options.size.height,
					title : options.title,
					border : false,
					plain : true,
					resizable : (options.resizable == null || options.resizable == true),
					modal : (options.modal == null || options.modal == true),
					maximizable : (options.maximizable == null || options.maximizable == true),
					items : [borderPanel]
				});

				viewWin.show(this);

				Ext.MessageBox.hide();

				if (returnFunc) {
					returnFunc();
				}
			});
		} else {
			Ext.getCmp(options.tabid).show(this);
		}
	}
}

function workflowOnline(url, options, returnFunc) {
	Ext.Ajax.request({
		url : url,
		params : options.params,
		method : 'POST',
		success : function(rs, request) {
			var result = rs.responseText;// 拿到结果集，此时为字符串

			var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

			if (resultJson.success) {
				var flowJson = resultJson.resultData;
				options.flow = flowJson;

                // 创建视图stockings对象容器
				options.stockings = {};

				var tableView = [];

				Ext.each(options.flow.currentStep.tableView, function(tv, idx) {
							var r = true;

							if (methods.canFunction(options.flow.flowkey
									+ '_beforeshow')) {
								/* 特殊校验,用于决定视图是否展示 */
								try {
									eval('r = ' + options.flow.flowkey
											+ '_beforeshow(options.flow, tv, options);');
								} catch (error) {
									alert(error.message);
								}
							}

							if (r) {
								tableView.push(tv);
							}
						});

				options.flow.currentStep.tableView = tableView;

				// 当前环节可访问的视图form
				options.flow.currentStep.tableViewForm = {};

				// 当前环节可操作的视图form
				options.flow.currentStep.lingerTableViewForm = {};

				// 当前环节可操作的视图
				options.flow.currentStep.lingerTableView = [];

				if (tableView != null && tableView.length > 0) {

					// list table-view in workflow
					Ext.each(tableView, function(tv, idx) {

						var tvResultJson = methods.getTableViewObject(tv.id);// 将字符串转换为json类型

						if (tvResultJson != null) {
							tvResultJson.frozen = false;

							// tvResultJson.param.listenLayout = false;

							var form = createObjectTableView(tvResultJson,
									options, (tv.mode == 0));

							if (true || tableView.length > 1) {
								form.setTitle(tvResultJson.name);
								form.setIconClass('icon-edit');
							}

							tv.form = form;

							options.flow.currentStep.tableViewForm[tv.id] = form;

							// set linger-table-view for Katyusha
							if (tv.mode == 1) {
								options.flow.currentStep.lingerTableView
										.push(tv);
								options.flow.currentStep.lingerTableViewForm[tv.id] = form;
							}
						} else {
							alert('Flow structure view object('
									+ tv.id
									+ ')does not exist, cannot initialize the flow object view');
						}
					});

					//
					var borderPanel = createWorkflowContainer(options);

					if (returnFunc) {
						returnFunc(borderPanel);
					}
				} else {
					Ext.Msg
							.alert('hint',
									'The link does not define the table - the view, unable to process to deal with');
				}

			} else {
				Ext.Msg
						.alert('hint', 'Work for errors: '
										+ resultJson.errorMsg);
			}

		},

		failure : function(rs, request) {
			Ext.Msg.alert('hint', rs.responseText);
		}
	});
}

// var nextStep;

/**
 * 创建流程工作区域
 * 
 * @param {}
 *            options
 */
function createWorkflowContainer(options) {
	if (options.params == null) {
		options.params = {};
	}

	// 默认参数
	var params = options.params;

	// 提交按钮
	var stepMenu;

	var tbar = [];

	var buttons = [];

	if (options.flow.action == 'todo') {
		var canLinger = options.flow.currentStep.lingerTableView.length > 0;

		var lingerButton;

		if (canLinger) {
			// workflowMethods.tbarsplit(tbar);

			lingerButton = new Ext.Action({
				id : 'lingerButton_' + options.flow.actId,
				text : 'Save',
				iconCls : 'icon-save',
				tooltip : 'Staging the current page content',
				handler : function() {
					var form;
					var formName;

					if (options.flow.currentStep.tableView.length > 1) {
						form = Ext.getCmp(options.tabid).items.itemAt(0).items
								.itemAt(0).getActiveTab();
						formName = form.title;
					} else {
						form = options.flow.currentStep.tableView[0].form;
						formName = options.flow.currentStep.tableView[0].name;
					}

					workflowMethods.RPG(formName, form, options, function(o) {
								Ext.Msg.alert('hint',
										'Submitted successfully saved');

								methods.resetTableViewForm(form, o);

								// linger workflow view
								if (methods.canFunction(options.flow.flowkey
										+ '_linger')) {
									try {
										eval('r = '
												+ options.flow.flowkey
												+ '_linger(options.flow, form, o);');
									} catch (error) {
										alert(error.message);
									}
								}

								if (options.actionSrc) {
									if (options.actionSrc.type = 'tablequery') {
										reloadTQList(options.actionSrc.gridId);
									}
								}
							}, true);

				}
			});

			buttons.push(lingerButton);
		}

		if (options.flow.nextStep != null && options.flow.nextStep.length > 0) {
			if (options.flow.nextStep.length == 1) {
				// 单一环节
				stepMenu = {
					text : grooveTranslator.getLangLabel(
											'common-language', 'submit'),
					iconCls : 'icon-send',
					// tooltip : '提交至一下环节办理',
					handler : function() {
						// 为签署审批意见
						if (options.flow.currentStep.opinion == true
								&& options.flow.currentStep.opinionTrace == false) {
							Ext.Msg
									.alert(
											'hint',
											'Please sign '
													+ (options.flow.currentStep.opinionLabel == null
															? 'opinions'
															: options.flow.currentStep.opinionLabel));
							return false;
						}

						if (options.flow.currentStep.sender == 0) {
							workflowMethods.submitWorkflowForm(options,
									options.flow.nextStep[0]);
						} else {
							workflowMethods.autoSubmitNextWorkflowForm(options,
									options.flow.nextStep[0]);
						}
					}
				}
			} else {
				// 多环节
				var stepMenu = {
					text : grooveTranslator.getLangLabel(
											'common-language', 'submit'),
					// tooltip : '提交至一下环节办理',
					iconCls : 'icon-send',
					menu : []
				};

				Ext.each(options.flow.nextStep, function(step) {
					stepMenu.menu.push({
						text : step.name,
						iconCls : 'icon-go',
						handler : function() {
							// 为签署审批意见
							if (options.flow.currentStep.opinion == true
									&& options.flow.currentStep.opinionTrace == false) {
								Ext.Msg
										.alert(
												'hint',
												'Please fill out the'
														+ (options.flow.currentStep.opinionLabel == null
																? 'The examination and approval opinions'
																: options.flow.currentStep.opinionLabel));
								return false;
							}

							if (options.flow.currentStep.sender == 0) {
								workflowMethods.submitWorkflowForm(options,
										step);
							} else {
								workflowMethods.autoSubmitNextWorkflowForm(
										options, step);
							}
						}
					});
				});
			}

			buttons.push(stepMenu);
		} else if (true || options.flow.currentStep.nextHighHandedStep) {
			// very special
			stepMenu = {
				text : grooveTranslator.getLangLabel(
											'common-language', 'submit'),
				iconCls : 'icon-send',
				// tooltip : '提交至一下环节办理',
				handler : function() {
					if (options.flow.currentStep.sender == 1) {
						// 为签署审批意见
						if (options.flow.currentStep.opinion == true
								&& options.flow.currentStep.opinionTrace == false) {
							Ext.Msg
									.alert(
											'hint',
											'Please fill out the'
													+ (options.flow.currentStep.opinionLabel == null
															? 'The examination and approval opinions'
															: options.flow.currentStep.opinionLabel));
							return false;
						}

						workflowMethods.autoSubmitWorkflowForm(options,
								options.flow.currentStep);

					} else {
						Ext.Msg
								.alert(
										'hint',
										'The current link submitted for manual mode, but not the next link to choose from, please check the process definition');
					}
				}
			}

			buttons.push(stepMenu);
		}

		if (false && options.flow.currentStep.back) {
			workflowMethods.tbarsplit(tbar);

			// very special
			stepMenu = {
				text : 'Back to the',
				iconCls : 'icon-back',
				tooltip : 'Return a link is dealt with afresh',
				handler : function() {
					// 为签署审批意见
					if (options.flow.currentStep.opinion == true
							&& options.flow.currentStep.opinionTrace == false) {
						Ext.Msg
								.alert(
										'hint',
										'Please fill out the'
												+ (options.flow.currentStep.opinionLabel == null
														? 'The examination and approval opinions'
														: options.flow.currentStep.opinionLabel));
						return false;
					}

					workflowMethods.autoSubmitBackWorkflowForm(options,
							options.flow.currentStep.backStep);
				}
			}

			tbar.push(stepMenu);
		}

		// meet stop step
		if (false && options.flow.stopStep != null) {
			workflowMethods.tbarsplit(tbar);

			// very special
			stepMenu = {
				text : (options.flow.stopStep.trendName == ''
						? options.flow.stopStep.name
						: options.flow.stopStep.trendName),
				iconCls : 'icon-end',
				tooltip : 'End of the approval process',
				handler : function() {
					// 为签署审批意见
					if (options.flow.currentStep.opinion == true
							&& options.flow.currentStep.opinionTrace == false) {
						Ext.Msg
								.alert(
										'hint',
										'Please fill out the'
												+ (options.flow.currentStep.opinionLabel == null
														? 'The examination and approval opinions'
														: options.flow.currentStep.opinionLabel));
						return false;
					}

					workflowMethods.autoSubmitNextWorkflowForm(options,
							options.flow.stopStep,
							'Transferred to the process is determined');
				}
			}

			tbar.push(stepMenu);
		}

        //query opinion
		if (options.flow.currentStep.opinionQuery) {
				workflowMethods.tbarsplit(tbar);

				tbar.push({
							text : grooveTranslator.getLangLabel(
											'flow-language', 'history-opinion-list'),
							iconCls : 'icon-query',
							handler : function() {
								var grid = tvquery({
									querykey : options.flow.flowOpinionQuery,
									params : {
										insId : options.flow.insId
									}
								});


								if (grid == null) {
									alert('History query list(' + options.flow.flowOpinionQuery
											+ ')undefined');
								} else {
									var win = new Ext.Window({
												renderTo : Ext.getBody(),
												title : grooveTranslator.getLangLabel(
											'flow-language', 'history-opinion-list'),
												layout : 'fit',
												width : 800,
												height : 400,
												items : [grid]
											});

									win.show(this);
								}
							}
						});
			}
		
	} else if (options.flow.action == 'toview') {
		if (options.flow.currentStep.opinion) {

			workflowMethods.tbarsplit(tbar);

			tbar.push({
				text : (options.flow.currentStep.opinionLabel == null
						? 'The examination and approval opinions'
						: options.flow.currentStep.opinionLabel),
				iconCls : 'icon-opinion-edit',
				tooltip : (options.flow.currentStep.opinionLabel == null
						? 'The examination and approval opinions'
						: options.flow.currentStep.opinionLabel)
						+ 'Refer to',
				disabled : options.flow.currentStep.opinionView == '',
				handler : function() {
					// 调用与flow opinion table 同名的 tableview

					var opinionResultJson = methods
							.getTableViewObject(options.flow.currentStep.opinionView);// 将字符串转换为json类型

					// 当前环节审批意见
					var currentOpinionData;

					if (options.flow.currentStep.opinionTrace) {
						// 获取当前环节审批意见
						var currentOpinionResult = sendRequest(context
								+ '/system/flowservice.do?method=getActivityOpinion&actId='
								+ options.flow.actId);

						var currentOpinionDataJson = Ext.util.JSON
								.decode(currentOpinionResult);// 将字符串转换为json类型

						if (currentOpinionDataJson.success
								&& currentOpinionDataJson.resultData != null) {
							currentOpinionData = currentOpinionDataJson.resultData
						}
					}

					var viewSize = opinionResultJson.size;

					var width = 500;
					var height = 400;

					try {
						width = ((viewSize.width == null || isNaN(viewSize.width))
								? 500
								: viewSize.width);
						height = ((viewSize.height == null || isNaN(viewSize.height))
								? 400
								: viewSize.height);
					} catch (error) {
						alert('View set the wrong size, size must set the format for json, like{width:500, height:400}');
						return;
					}

					var opinionForm = getTableViewForm(opinionResultJson, {
								globalReadOnly : true,
								params : {
									insId : options.flow.insId
								},
								plugObject : {
									workflow : options.flow
								},
								beanData : currentOpinionData
							}, {
								bodyStyle : 'padding:5px;',
								autoScroll : true,
								border : false,
								frame : false,
								title : '\'' + options.flow.currentStep.name
										+ '\' Link the opinion'
							});

					var opinionWin = new Ext.Window({
								renderTo : Ext.getBody(),
								layout : 'fit',
								width : width,
								height : height,
								title : 'Advice to consult the window',
								plain : true,
								modal : true,
								border : false,

								items : [opinionForm],

								buttons : [{
											text : 'Close',
											handler : function() {
												opinionWin.close();
												opinionWin = null;
											}
										}]
							});

					opinionWin.show(this);
				}
			});

			if (options.flow.flowOpinionQuery
					&& options.flow.flowOpinionQuery != '') {
				workflowMethods.tbarsplit(tbar);
				var opinionGrid = tvquery({
							querykey : options.flow.flowOpinionQuery,
							layout : 'border',
							params : {
								insId : options.flow.insId
							},
							resizable : true,
							modal : true,
							maximizable : true
						});

				opinionGrid.title = grooveTranslator.getLangLabel(
											'flow-language', 'history-opinion-list');

				tbar.push({
							text : grooveTranslator.getLangLabel(
											'flow-language', 'history-opinion-list'),
							iconCls : 'icon-query',
							style : {
								overflow : 'visible' // For the Combo popup
							},
							menu : new Ext.menu.Menu({
										style : {
											overflow : 'visible'
										},
										items : [new Ext.TabPanel({
													width : 700,
													height : 400,
													activeTab : 0,
													items : [opinionGrid]
												})]
									})
						});
			}
		}
	}

	if (false) {
		workflowMethods.tbarsplit(tbar);

		tbar.push({
			text : 'Process tracking',
			iconCls : 'icon-spell',
			handler : function() {
				var url = context
						+ '/system/flowplotter.do?method=preplotter&type=viewing&id='
						+ options.flow.flowkey;

				if (options.flow.actId) {
					var url = context
							+ "/system/flowplotter.do?method=preplotter&type=viewing&id="
							+ options.flow.flowkey + "&insid="
							+ options.flow.insId;
				}

				var win = new Ext.Window({
					renderTo : Ext.getBody(),
					layout : 'fit',
					width : 800,
					height : 600,
					title : options.flow.flowname,
					resizable : true,
					maximizable : true,
					plain : true,
					modal : true,
					html : '<iframe src="'
							+ url
							+ '" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>',
					buttons : [{
								text : 'Close',
								handler : function() {
									win.close();
								}
							}]
				});

				win.show();
			}
		});
	}

	// 工作流自定义(函数名称默认为工作流key标识)方法调用
	if (methods.canFunction(options.flow.flowkey)) {
		try {
			eval(options.flow.flowkey + '(options.flow, tbar, options);');
		} catch (err) {
			alert(err.message);
		}
	}

	var borderPanel;

	if (options.flow.currentStep.tableView.length == 1) {
		var tv = options.flow.currentStep.tableView[0];
		tv.form.region = 'center';

		var obj;

		if (options.flow.currentStep.opinion && options.flow.action == 'todo') {

			obj = getOpinionViewObj(options, tbar, tv.form, buttons);

		} else {

			obj = {
				tabTip : options.title,
				layout : 'fit',
				iconCls : 'tabs',
				tbar : tbar,
				border : false,
				frame : false,
				items : [tv.form],
				buttons : buttons,
				listeners : {}
			}
		}

		if (options.displayMode == 'tab') {
			obj.title = options.title;
			obj.id = options.tabid;
			obj.closable = true;
		}

		borderPanel = obj;

	} else if (options.flow.currentStep.tableView.length > 1) {
		var tvTabItems = [];

		Ext.each(options.flow.currentStep.tableView, function(tv, idx) {
					tv.form.on('activate', function() {
								if (lingerButton != null) {
									if (tv.mode == 1) {
										lingerButton.enable();
									} else {
										lingerButton.disable();
									}
								}
							});

					tvTabItems.push(tv.form);
				});

		var objItem = {
			xtype : 'tabpanel',
			tabPosition : 'bottom',
			deferredRender : false,
			autoScroll : true,
			border : false,
			items : tvTabItems
		}

		var obj;
		if (options.flow.currentStep.opinion && options.flow.action == 'todo') {
			obj = getOpinionViewObj(options, tbar, objItem, buttons);
		} else {
			obj = {
				tabTip : options.title,
				layout : 'border',
				iconCls : 'tabs',
				border : false,
				frame : false,
				items : [{
							region : 'center',
							border : false,
							frame : false,
							layout : 'fit',
							tbar : tbar,
							items : [objItem]
						}],
				buttons : buttons,
				listeners : {}
			}
		}
		if (options.displayMode == 'tab') {
			obj.title = options.title;
			obj.id = options.tabid;
			obj.closable = true;

			obj.listeners.activate = function(thiz) {
				thiz.items.itemAt(0).items.itemAt(0).setActiveTab(0);
			}
		} else {
			objItem.activeTab = 0;
		}

		borderPanel = obj;

		/*
		 * borderPanel = new Ext.Panel(obj);
		 * 
		 * borderPanel.on('activate', function(){ })
		 */

		/*
		 * borderPanel.on('afterlayout', function() {
		 * objectTableViewTab.render(); });
		 */
	}

	return borderPanel;
}

/**
 * 从json结构定义中初始化form
 * 
 * @param {}
 *            resultJson
 * @param {}
 *            options
 * @param {}
 *            mode
 */
function createObjectTableView(resultJson, options, mode) {
	// table-view-form contain data
	var formLoadData = (options.flow.currentStep.beanData != null && options.flow.currentStep.beanData[resultJson.id] != null);

	var beanData;

	if (formLoadData) {
		beanData = options.flow.currentStep.beanData[resultJson.id];
	}

	// 存在主表主键value,执行编辑操作
	var form = getTableViewForm(resultJson, {
		beanData : beanData,
		params : {},
		plugObject : {
			workflow : options.flow
		},
        stockings : (options.stockings == null ? {} : options.stockings),
		globalReadOnly : mode, // 只读全局设置
		globalHuntItem : false // 痕迹跟踪全局设置
		}, {
		region : 'center',
		params : {},
		bodyStyle : 'padding-left:15px;padding-top:15px',
		autoScroll : true,
		border : false,
		frame : false,
		tableViewID : resultJson.id,
		resultJson : resultJson,
        plugObject : {
			options : options
		}
	});

	return form;
}

/**
 * 显示流程监控列表
 * 
 * @param {}
 *            activityId
 */
function getWorkflowTraceGrid(insId) {
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),  {
		header : 'Received Time',
		width : 80,
		align : 'left',
		dataIndex : 'startTime',
		renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {
			return renderTraceGridColumn(value, cellmeta, record, rowIndex,
					columnIndex, store, insId);
		}
	}, {
		header : 'Completed Time',
		width : 80,
		align : 'left',
		dataIndex : 'endTime',
		renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {
			return renderTraceGridColumn(value, cellmeta, record, rowIndex,
					columnIndex, store, insId);
		}
	},{
		header : 'Approval Step',
		width : 100,
		align : 'left',
		dataIndex : 'activityName',
		renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {
			return renderTraceGridColumn(value, cellmeta, record, rowIndex,
					columnIndex, store, insId);
		}
	}, {
		header : 'Progress',
		width : 50,
		align : 'left',
		dataIndex : 'activityState',
		renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {
			return renderTraceGridColumn(value, cellmeta, record, rowIndex,
					columnIndex, store, insId);
		}
	}, {
		header : 'Responsible Unit/Person',
		width : 100,
		align : 'left',
		dataIndex : 'userGroup'
	}, {
		header : 'IP Address',
		width : 100,
		align : 'left',
		dataIndex : 'ip'
	}]);
	var ds = new Ext.data.JsonStore({
				remoteSort : false,
				root : 'traceList',
				fields : ['activityId', 'activityName', 'activityState',
						'startTime', 'endTime', 'userGroup', 'ip'],
				proxy : new Ext.data.HttpProxy({
							url : context
									+ '/system/flowservice.do?method=traceInstance'
						})
			});

	var grid = new Ext.grid.GridPanel({
				id : 'traceGrid_' + insId,
				cm : cm,
				ds : ds,
				autoScroll : true,
				stateful : true,
				stripeRows : true,
				viewConfig : {
					forceFit : true,
					getRowClass : function(record, rowIndex, rowParams, store) {
						if (record.data.activityState == 0) {
							return 'workflow_activity_0';
						} else if (record.data.activityState == 1) {
							return 'workflow_activity_1';
						} else if (record.data.activityState == 2) {
							return 'workflow_activity_2';
						}
					}
				},
				border : false,
				frame : false,
				stateId : 'grid',
				loadMask : {
					msg : "Data loading, please wait a moment..."
				},
				bbar : new Ext.Toolbar([{
							iconCls : 'refresh',
							text : 'refresh',
							handler : function() {
								grid.getStore().reload();
							}
						}])
			});

	/**
	 * tbar : [{ iconCls : 'refresh', text : '激活Activity', handler : function() { } }]
	 */

	ds.on('beforeload', function(thiz, options) {
				Ext.apply(thiz.baseParams, {
							id : insId
						});
			});
	var gridMask = new Ext.LoadMask(Ext.getBody(), {
				msg : 'Data loading, please wait a moment...'
			});
	gridMask.show();
	ds.load({
				params : {
					id : insId
				},
				callback : function(records, options, success) {
					gridMask.hide();
				}
			});

	return grid;
}

/**
 * render trace-grid-column
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
function renderTraceGridColumn(value, cellmeta, record, rowIndex, columnIndex,
		store, insId) {
	var dataIndex = Ext.getCmp('traceGrid_' + insId).getColumnModel()
			.getDataIndex(columnIndex);

	if (dataIndex == 'activityState') {
		var state = value;
		if (value == 0) {
			state = "Pending";
		} else if (value == 1) {
			state = "Processing";
		} else if (value == 2) {
			state = "Completed";
		} else if (value == -2) {
			state = "Retrieved";
		} else if (value == -3) {
			state = "Returned";
		} else if (value == -4) {
			state = "Withdrawn";
		} else if (value == -1) {
			state = "Suspended";
		}

		return state;
	} else if (dataIndex == 'startTime' || dataIndex == 'endTime') {
		if (value != null) {
			return formatTime(value);
		}
	} else if (dataIndex == 'activityName') {
		return '<a href="javascript:void(0);" onclick="javascript:traceActivityInfo(\''
				+ record.data.activityId
				+ '\', \'To consult the process link for content\');" title="Go to consult the information">'
				+ value + '</a>';
	}

	return value;
}

/**
 * trance activity info
 * 
 * @param {}
 *            actId
 * @param {}
 *            title
 */
function traceActivityInfo(actId, title) {
	viewWorkflow({
				title : title,
				actId : actId,
				displayMode : 'window',
				size : {
					width : 1000,
					height : 600
				}
			});
}

function workflowTrace(title, insId, tabcontainerid) {
	var grid = getWorkflowTraceGrid(insId);

	/*
	 * var win = new Ext.Window({ renderTo : Ext.getBody(), layout : 'fit',
	 * width : 1000, height : 600, title : title, resizable : true, maximizable :
	 * true, plain : true, modal : true, items : [grid], buttons : [{ text : '关
	 * 闭', handler : function() { win.close(); } }] });
	 * 
	 * win.show();
	 */

	grid.title = title;
	grid.setIconClass('tabs');
	grid.closable = true;
	grid.tabTip = title;

	Ext.getCmp(tabcontainerid).add(grid);
	Ext.getCmp(tabcontainerid).setActiveTab(grid);
}

function workflowMonitorRowClass(record, rowIndex, rowParams, store, gridId,
		options) {
	if (record.data.INS_STATE == 0) {
		return 'workflow_instance_0';
	} else if (record.data.INS_STATE == 1) {
		return 'workflow_instance_1';
	} else if (record.data.INS_STATE == -1) {
		return 'workflow_instance_01';
	}
}

function credit_monitor_control_list_rowclick(grid, rowIndex, e) {
	var selections = grid.getSelectionModel().getSelections();
	if (selections.length == 0) {
		return false;
	}

	var record = selections[0];

	workflowMonitorControl(record.data['INS_ID']);
}

function workflowMonitor(title, insId) {
	var url = context
			+ "/system/flowplotter.do?method=preplotter&type=viewing&insid="
			+ insId;

	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 800,
		height : 600,
		title : title,
		resizable : true,
		maximizable : true,
		plain : true,
		modal : true,
		html : '<iframe src="'
				+ url
				+ '" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>',
		buttons : [{
					text : 'Close',
					handler : function() {
						win.close();
					}
				}]
	});

	win.show();
}

var workflowMethods = {
	tbarsplit : function(tbar) {
		if (tbar.length > 0) {
			tbar.push('-');
		}
	},
	getStepUsers : function(id, name) {
		/*
		 * var store = new Ext.data.JsonStore({ idProperty : 'id', remoteSort :
		 * false, totalProperty : 'totalCount', root : 'usersInStepList', fields : [{
		 * name : 'oid' }, { name : 'oname' }, { name : 'ojob' }, { name :
		 * 'orating' }, { name : 'ogroupid' }, { name : 'ogroupname' }], proxy :
		 * new Ext.data.ScriptTagProxy({ url : context +
		 * '/system/flowservice.do?method=getNextStepUser&id=' + id }) });
		 * 
		 * store.load();
		 * 
		 * var sm = new Ext.grid.CheckboxSelectionModel({ singleSelect : true,
		 * handleMouseDown : Ext.emptyFn });
		 * 
		 * var grid = new Ext.grid.GridPanel({ store : store, sm : sm, cm : new
		 * Ext.grid.ColumnModel([sm, { id : 'oname', header : '接收人', width :
		 * 100, sortable : true, dataIndex : 'oname' }, { header : '职务', width :
		 * 100, dataIndex : 'ojob' }, { header : '级别', width : 100, dataIndex :
		 * 'orating' }, { header : '部门', width : 200, dataIndex : 'ogroupname'
		 * }]), viewConfig : { forceFit : true }, columnLines : true, width :
		 * 600, height : 300, title : '', iconCls : 'icon-grid' });
		 * 
		 * return grid;
		 */

		var xg = Ext.grid;

		// shared reader
		var reader = new Ext.data.ArrayReader({}, [{
							name : 'oid'
						}, {
							name : 'oname'
						}, {
							name : 'ojob'
						}, {
							name : 'orating'
						}, {
							name : 'otype'
						}, {
							name : 'ostatus'
						}, {
							name : 'ogroupid'
						}, {
							name : 'ogroupname'
						}]);

		var sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : true,
					handleMouseDown : Ext.emptyFn
				});

		var grid = new xg.GridPanel({
			store : new Ext.data.GroupingStore({
				proxy : new Ext.data.ScriptTagProxy({
					url : context
							+ '/system/flowservice.do?method=getNextStepUser&id='
							+ id
				}),
				autoLoad : true,
				reader : reader,
				sortInfo : {
					field : 'oname',
					direction : "ASC"
				},
				groupField : 'ogroupid'
			}),
			sm : sm,
			loadMask : true,
			view : new Ext.grid.GroupingView({
				forceFit : true,
				showGroupName : false,
				groupTextTpl : '{[values.rs[0].data["ogroupname"]]} ({[values.rs.length]} {[values.rs.length > 1 ? "人" : "人"]})'
			}),
			columns : [sm, {
						id : 'oname',
						header : 'recipient',
						width : 20,
						sortable : true,
						dataIndex : 'oname'
					}, {
						header : 'position',
						width : 20,
						sortable : true,
						dataIndex : 'ojob'
					}, {
						header : 'level',
						width : 20,
						sortable : true,
						dataIndex : 'orating'
					}, {
						header : 'Working state',
						width : 20,
						sortable : true,
						dataIndex : 'ostatus',
						renderer : function(v, c, r, row, col, s) {
							if (v == 0) {
								return 'normal';
							} else if (v == -1) {
								return '<font color="red">departure</font>';
							} else if (v == -2) {
								return '<font color="orange">A vacation</font>';
							} else if (v == -3) {
								return '<font color="orange">leave</font>';
							}

							return v;
						}
					}, {
						header : 'department ID',
						width : 20,
						sortable : false,
						hidden : true,
						dataIndex : 'ogroupid'
					}, {
						header : 'department',
						width : 20,
						sortable : false,
						hidden : true,
						dataIndex : 'ogroupname'
					}],
			iconCls : 'icon-grid'
		});

		// Array data for the grids

		return grid;
	},
	autoSubmitBackWorkflowForm : function(options) {
		if (methods.canFunction(options.flow.flowkey + '_beforesubmit')) {
			var bs = eval(options.flow.flowkey + '_beforesubmit(options.flow,options);');

			if (bs == false) {
				return false;
			}
		}

		// 退回上一环节
		for (var i = 0; i < options.flow.currentStep.tableView.length; i++) {
			if (!methods.checkoutForm(
					options.flow.currentStep.tableView[i].form,
					options.flow.currentStep.tableView[i].form.resultJson)) {
				Ext.Msg
						.alert('hint',
								'Please fill in the right page in the necessary information');

				return false;
			}
		}

		Ext.Msg.show({
			title : 'hint',
			msg : 'Determine the return(' + options.flow.lastStepName
					+ ')register？',
			width : 250,
			buttons : Ext.MessageBox.YESNO,
			fn : function(e) {
				if (e == 'yes') {
					var thizStep = options.flow.currentStep;

					var params = {

					};

					workflowMethods.Katyusha(options, function() {
						Ext.MessageBox.wait('In the process of return...');

						params.flowId = options.flow.flowid;
						params.theStepId = thizStep.id;
						params.actId = options.flow.actId;
						params.insId = options.flow.insId;

						/*
						 * if (options.actId == null) { params.actId =
						 * options.flow.actId; }
						 * 
						 * if (options.insId == null) { params.insId =
						 * options.flow.insId; }
						 */
						workflowMethods.backWorkflow(params, function() {
									if (options.displayMode == 'window') {
										var orgWin = Ext.getCmp(options.tabid);

										orgWin.close();
										orgWin = null;
									} else if (options.displayMode == 'tab') {
										options.globalCloseConfirm = false;

										Ext.getCmp(options.tabcontainerid)
												.remove(Ext
														.getCmp(options.tabid));
									}

									if (options.actionSrc) {
										if (options.actionSrc.type = 'tablequery') {
											reloadTQList(options.actionSrc.gridId);
										}
									}
								});
					});
				}
			},
			icon : Ext.MessageBox.QUESTION
		});
	},
	autoSubmitNextWorkflowForm : function(options, step, msg) {
		if (methods.canFunction(options.flow.flowkey + '_beforesubmit')) {
			var bs = eval(options.flow.flowkey + '_beforesubmit(options.flow,options);');

			if (bs == false) {
				return false;
			}
		}

		// 自动提交,指定了下一步节点
		for (var i = 0; i < options.flow.currentStep.tableView.length; i++) {
			if (!methods.checkoutForm(
					options.flow.currentStep.tableView[i].form,
					options.flow.currentStep.tableView[i].form.resultJson)) {
				Ext.Msg
						.alert('hint',
								'Please fill in the right page in the necessary information');

				return false;
			}
		}

		Ext.MessageBox.confirm('hint', (msg == null ? 'Sure to submit？' : msg),
				function(e) {
					if (e == 'yes') {

						var thizStep = options.flow.currentStep;

						var params = {

						};

						workflowMethods.Katyusha(options, function() {
							// Ext.MessageBox.wait('提交 -> ' + step.name);
							Ext.MessageBox
									.wait('Submit to handle the process...');

							params.flowId = options.flow.flowid;
							params.nextStepId = step.id;
							params.theStepId = thizStep.id;
							params.actId = options.flow.actId;
							params.insId = options.flow.insId;

							/*
							 * if (options.actId == null) { params.actId =
							 * options.flow.actId; }
							 * 
							 * if (options.insId == null) { params.insId =
							 * options.flow.insId; }
							 */
							workflowMethods.runWorkflow(params, function() {
										if (options.displayMode == 'window') {
											var orgWin = Ext
													.getCmp(options.tabid);

											orgWin.close();
											orgWin = null;
										} else if (options.displayMode == 'tab') {
											options.globalCloseConfirm = false;

											Ext
													.getCmp(options.tabcontainerid)
													.remove(Ext
															.getCmp(options.tabid));
										}

										if (options.actionSrc) {
											if (options.actionSrc.type = 'tablequery') {
												reloadTQList(options.actionSrc.gridId);
											}
										}
									});
						});

					}
				});
	},
	autoSubmitWorkflowForm : function(options, step, objectTableViewTab) {
		if (methods.canFunction(options.flow.flowkey + '_beforesubmit')) {
			var bs = eval(options.flow.flowkey + '_beforesubmit(options.flow,options);');

			if (bs == false) {
				return false;
			}
		}

		// 自动提交,未指定下一步节点
		for (var i = 0; i < options.flow.currentStep.tableView.length; i++) {
			if (!methods.checkoutForm(
					options.flow.currentStep.tableView[i].form,
					options.flow.currentStep.tableView[i].form.resultJson)) {
				Ext.Msg
						.alert('hint',
								'Please fill in the right page in the necessary information');

				return false;
			}
		}

		Ext.MessageBox.confirm('hint', 'Sure to submit?', function(e) {
			if (e == 'yes') {
				workflowMethods.Katyusha(options, function() {
							Ext.MessageBox
									.wait('Submit to handle the process...');

							var params = {

							};

							var thizStep = options.flow.currentStep;
							params.flowId = options.flow.flowid;
							params.theStepId = thizStep.id;
							params.actId = options.flow.actId;
							params.insId = options.flow.insId;

							workflowMethods.runWorkflow(params, function() {
										if (options.displayMode == 'window') {
											var orgWin = Ext
													.getCmp(options.tabid);

											orgWin.close();
											orgWin = null;
										} else if (options.displayMode == 'tab') {
											options.globalCloseConfirm = false;

											Ext
													.getCmp(options.tabcontainerid)
													.remove(Ext
															.getCmp(options.tabid));
										}

										if (options.actionSrc) {
											if (options.actionSrc.type = 'tablequery') {
												reloadTQList(options.actionSrc.gridId);
											}
										}
									});
						});
			}
		});
	},
	submitWorkflowForm : function(options, step, objectTableViewTab) {
		if (methods.canFunction(options.flow.flowkey + '_beforesubmit')) {
			var bs = eval(options.flow.flowkey + '_beforesubmit(options.flow,options);');

			if (bs == false) {
				return false;
			}
		}

		// 指定下一环节办理人
		for (var i = 0; i < options.flow.currentStep.tableView.length; i++) {
			if (!methods.checkoutForm(
					options.flow.currentStep.tableView[i].form,
					options.flow.currentStep.tableView[i].form.resultJson)) {
				Ext.Msg
						.alert('hint',
								'Please fill in the right page in the necessary information');

				return false;
			}
		}

		var thizStep = options.flow.currentStep;

		var params = {

		};

		var nextStepUserListGrid = workflowMethods.getStepUsers(step.id,
				step.name);

		var win = new Ext.Window({
			renderTo : Ext.getBody(),
			layout : 'fit',
			width : 600,
			height : 500,
			title : 'Please choose\'' + step.name + '\'the transactor',
			resizable : true,
			plain : true,
			modal : true,

			items : [nextStepUserListGrid],

			buttons : [{
				text : grooveTranslator.getLangLabel(
											'common-language', 'submit') + ' -> ' + step.name,
				handler : function() {
					var selectedNodes = nextStepUserListGrid
							.getSelectionModel().getSelections();

					if (selectedNodes.length == 0) {
						Ext.Msg
								.alert('hint',
										'Please select a link next to deal with people');
					} else {
						workflowMethods.Katyusha(options, function() {
							// Ext.MessageBox.wait('提交 -> ' + step.name);
							Ext.MessageBox
									.wait('Submit to handle the process...');

							var ids = '';

							for (var i = 0; i < selectedNodes.length; i++) {
								if (i < selectedNodes.length - 1) {
									ids += selectedNodes[i].data.oid + ",";
								} else {
									ids += selectedNodes[i].data.oid;
								}
							}

							params.flowId = options.flow.flowid;
							params.nextStepUser = ids;
							params.nextStepId = step.id;
							params.theStepId = thizStep.id;
							params.actId = options.flow.actId;
							params.insId = options.flow.insId;
							params.opinionId = options.flow.currentStep.opinionId;
							params.opinionName = options.flow.currentStep.opinionName;

							/*
							 * if (options.actId == null) { params.actId =
							 * options.flow.actId; }
							 * 
							 * if (options.insId == null) { params.insId =
							 * options.flow.insId; }
							 */
							workflowMethods.runWorkflow(params, function() {
										win.close();
										win = null;

										if (options.displayMode == 'window') {
											var orgWin = Ext
													.getCmp(options.tabid);

											orgWin.close();
											orgWin = null;
										} else if (options.displayMode == 'tab') {
											options.globalCloseConfirm = false;

											Ext
													.getCmp(options.tabcontainerid)
													.remove(Ext
															.getCmp(options.tabid));
										}

										if (options.actionSrc) {
											if (options.actionSrc.type = 'tablequery') {
												reloadTQList(options.actionSrc.gridId);
											}
										}
									});
						});
					}
				}
			}, {
				text : 'Close',
				handler : function() {
					win.close();
					win = null;
				}
			}]
		});

		win.show(this);
	},

	RPG : function(formName, form, options, forwardFunc, becareful) {
		// running thing, update objec table only
		/*
		 * form.getForm().items.each(function(b) { if (!b.validate()) {
		 * //alert(b.fieldLabel); return false; } });
		 */

		if (form.getForm().isValid() == false) {
			Ext.Msg.alert('hint', 'Please fill out the ' + formName
							+ ' in the necessary information page');
		} else {
			var requestParams = {
				currentStepId : options.flow.currentStep.id,
				flowId : options.flow.flowid,
				tableViewID : form.tableViewID,
				GROOVEREQUESTTYPE : 'ajax'
			};

			if (options.flow.actId) {
				requestParams.actId = options.flow.actId;
			}

			if (options.flow.insId) {
				requestParams.insId = options.flow.insId;
			}

			// see tableview.js
			// methods.radioReturn(form);

			// see tableview.js
			methods.checkboxReturn(form);

			// see tableview.js
			if (methods.assemblingList(form.resultJson, requestParams, form)) {
				if (becareful == true) {
					Ext.MessageBox.confirm('hint', 'Sure to submit to save？',
							function(e) {
								if (e == 'yes') {
									Ext.MessageBox.wait('In the process...');

									form.getForm().submit({
										url : context
												+ '/system/flowservice.do?method=lingerWorkflow',
										params : requestParams,
										method : 'POST',
										success : function(fm, action) {
											// 获取响应的json字符串
											Ext.MessageBox.hide();

											var json = action.response.responseText;

											var o = Ext.util.JSON.decode(json);

											if (o.success) {
												options.flow.actId = o.resultData.actId;
												options.flow.insId = o.resultData.insId;

												if (forwardFunc) {
													forwardFunc(o);
												}
											}
										},
										failure : function(fm, action) {
											Ext.Msg
													.alert(
															'hint',
															'Submitted to deal with failure'
																	+ (action.response.responseText == null
																			? ''
																			: ','
																					+ action.response.responseText));
										}
									});

								}
							});
				} else {
					form.getForm().submit({
						url : context
								+ '/system/flowservice.do?method=lingerWorkflow',
						params : requestParams,
						method : 'POST',
						success : function(fm, action) {
							// 获取响应的json字符串
							Ext.MessageBox.hide();

							var json = action.response.responseText;
							var o = Ext.util.JSON.decode(json);

							if (o.success) {
								options.flow.actId = o.resultData.actId;
								options.flow.insId = o.resultData.insId;
								form
										.getForm()
										.findField(form.resultJson.primaryTableColumnFormName)
										.setValue(o.resultData[form.resultJson.primaryTableColumnFormName]);

								if (forwardFunc != null) {
									forwardFunc(o.resultData);
								}
							}
						},
						failure : function(fm, action) {
							Ext.MessageBox.show({
										title : 'hint',
										msg : 'Submitted to deal with failure'
												+ action.response.responseText,
										icon : Ext.MessageBox.ERROR
									});
						}
					});
				}
			}
		}
	},

	testRPG : function(form, options, forwardFunc) {
		if (forwardFunc) {
			setTimeout(forwardFunc, 200)
		}
	},

	Katyusha : function(options, callbankFunc) {
		if (options.flow.currentStep.lingerTableView.length == 0) {
			callbankFunc();
		} else {
			var count = 0;

			var forwardFuc = function(o) {
				count++;

				if (count < options.flow.currentStep.lingerTableView.length) {
					Ext.MessageBox
							.wait(options.flow.currentStep.lingerTableView[count].name
									+ 'In the process of submitting...');

					workflowMethods
							.RPG(
									options.flow.currentStep.lingerTableView[count].name,
									options.flow.currentStep.lingerTableView[count].form,
									options, forwardFuc);
				} else if (callbankFunc) {
					callbankFunc();
				}
			}

			Ext.MessageBox
					.wait(options.flow.currentStep.lingerTableView[count].name
							+ 'In the process of submitting...');

			workflowMethods.RPG(
					options.flow.currentStep.lingerTableView[count].name,
					options.flow.currentStep.lingerTableView[count].form,
					options, forwardFuc);
		}
	},
	runWorkflow : function(params, forwardFunc) {
		Ext.Ajax.request({
					url : context + '/system/flowservice.do?method=runWorkflow',
					method : 'POST',
					params : params,
					scope : this,
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (o.success) {
							Ext.MessageBox.hide();

							Ext.Msg.alert('hint', 'Submit for success');

							if (forwardFunc != null) {
								forwardFunc();
							}
						} else {
							Ext.MessageBox.hide();

							Ext.Msg
									.alert('hint',
											'Submit to deal with failure,'
													+ o.errorMsg);
						}
					},
					failure : function(response) {
						Ext.MessageBox.hide();
						Ext.MessageBox.show({
									title : 'Prompt information',
									msg : response.responseText,
									icon : Ext.MessageBox.ERROR
								});

					}

				});
	},
	backWorkflow : function(params, forwardFunc) {
		Ext.Ajax.request({
					url : context
							+ '/system/flowservice.do?method=backWorkflow',
					method : 'POST',
					params : params,
					scope : this,
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (o.success) {
							Ext.MessageBox.hide();

							Ext.Msg.alert('hint', 'Returned to the successful');

							if (forwardFunc != null) {
								forwardFunc();
							}
						} else {
							Ext.MessageBox.hide();

							Ext.Msg.alert('hint', 'Return the failure,('
											+ o.errorMsg + ')');
						}
					},
					failure : function(response) {
						Ext.MessageBox.hide();
						Ext.MessageBox.show({
									title : 'Prompt information',
									msg : response.responseText,
									icon : Ext.MessageBox.ERROR
								});

					}

				});
	},
	remixWorkflow4Ext : function(params, checkFunc, forwardFunc, extForm, msg) {
		if (checkFunc == null || checkFunc(params) == true) {
			Ext.MessageBox.confirm('hint', (msg != null
							? msg
							: 'Sure to submit to deal with？'), function(e) {
						if (e == "yes") {
							Ext.MessageBox.wait('In the process...');

							extForm.getForm().submit({
								url : context
										+ "/system/flowservice.do?method=runWorkflow",
								params : params,
								method : 'POST',
								success : function(form, action) {
									// 获取响应的json字符串
									Ext.MessageBox.hide();

									var json = action.response.responseText;
									var o = Ext.util.JSON.decode(json);

									if (forwardFunc != null) {
										forwardFunc();
									}
								},
								failure : function(form, action) {
									Ext.MessageBox.show({
												title : 'Exception error',
												msg : action.response.responseText,
												icon : Ext.MessageBox.ERROR
											});
								}
							});

						}
					});
		}
	}
}

function getOpinionViewObj(options, tbar, centerForm, buttons) {
	var winItems = [];

	var opinionResultJson = methods
			.getTableViewObject(options.flow.currentStep.opinionView);

	// 当前环节审批意见
	var currentOpinionData;

	if (options.flow.currentStep.opinionTrace) {
		// 获取当前环节审批意见
		var currentOpinionResult = sendRequest(context
				+ '/system/flowservice.do?method=getActivityOpinion&actId='
				+ options.flow.actId);

		var currentOpinionDataJson = Ext.util.JSON.decode(currentOpinionResult);// 将字符串转换为json类型

		if (currentOpinionDataJson.success
				&& currentOpinionDataJson.resultData != null) {
			currentOpinionData = currentOpinionDataJson.resultData
		}
	}

	var width = 500;
	var height = 400;
	var viewSize = opinionResultJson.size;

	try {
		width = ((viewSize.width == null || isNaN(viewSize.width))
				? 500
				: viewSize.width);
		height = ((viewSize.height == null || isNaN(viewSize.height))
				? 400
				: viewSize.height);
	} catch (error) {
		alert('View set the wrong size, size must set the format for json, like{width:500, height:400}');
		return;
	}

	var opinionForm = getTableViewForm(opinionResultJson, {
				params : {
					insId : options.flow.insId
				},
				plugObject : {
					workflow : options.flow
				},
				beanData : currentOpinionData
			}, {
				bodyStyle : 'padding:5px;',
				autoScroll : true,
				region : 'center',
				border : false,
				frame : false
			});

	options.flow.currentStep.opinionForm = opinionForm;

	var formTbar = [{
		text : grooveTranslator.getLangLabel(
											'flow-language', 'sign-opinion'),
		iconCls : 'icon-save',
		handler : function() {
			methods.submitViewForm(opinionResultJson, opinionForm, function(o) {
						// 签署意见成功
						if (options.flow.currentStep.opinionTrace == false) {
							options.flow.currentStep.opinionTrace = true;
						}

						// reloadTQList(grid.id);
						if (false) {
							try {
								eval(options.flow.flowkey
										+ '_opinion(o, opinionForm, opinionWin);');
							} catch (err) {
								alert(err.message);
							}
						}

                        // return opinion table PK value
						opinionForm.getForm().findField(opinionResultJson.primaryTableColumnFormName).setValue(o.resultData[opinionResultJson.primaryTableColumn]);
					}, function(params) {
						params.opinionTableViewID = options.flow.currentStep.opinionView;
						params.insId = options.flow.insId;
						params.actId = options.flow.actId;
						params.key = options.flow.key;

						return true;
					}, 'Sure to sign '
							+ (options.flow.currentStep.opinionLabel == null
									? 'the opinion'
									: options.flow.currentStep.opinionLabel));
		}
	}];

	if (false && options.flow.currentStep.opinionQuery) {
			formTbar.push('-', {
						text : grooveTranslator.getLangLabel(
											'flow-language', 'history-opinion-list'),
						iconCls : 'icon-query',
						handler : function() {
							var grid = tvquery({
												querykey : options.flow.flowOpinionQuery,
												params : {
													insId : options.flow.insId
												}
											});

							if (grid == null) {
								alert('History query list(' + options.flow.flowOpinionQuery
										+ ')undefined');
							} else {
								var win = new Ext.Window({
													renderTo : Ext.getBody(),
													title : grooveTranslator.getLangLabel(
											'flow-language', 'history-opinion-list'),
													layout : 'fit',
													width : 800,
													height : 400,
													items : [grid]
												});
								win.show(this);
							}
						}	
					});
		}
	
	winItems.push(opinionForm);

	var obj = {
		tabTip : options.title,
		layout : 'border',
		iconCls : 'tabs',
		border : false,
		frame : false,
		items : [{
					region : 'center',
					border : false,
					frame : false,
					layout : 'fit',
					// autoScroll : true,
					tbar : tbar,
					items : [centerForm]
				}, {
					region : 'south',
					title : opinionResultJson.name,
					collapsible : true,
					collapseMode : 'mini',
					split : true,
					border : false,
					frame : false,
					tbar : formTbar,
					autoScroll : true,
					height : 195,
					items : [winItems]
				}],
		buttons : buttons,
		listeners : {}
	}

	return obj;
}
