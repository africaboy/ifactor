document.write("<script src=\"" + context
		+ "/resources/ext3/ux/RowExpander.js\"></script>");

/*
 * if (!Ext.grid.GridView.prototype.templates) {
 * Ext.grid.GridView.prototype.templates = {}; }
 * Ext.grid.GridView.prototype.templates.cell = new Ext.Template( '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>', '<div
 * class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>', '</td>');
 */

var logListStore;
// Add the additional 'advanced' VTypes
Ext.apply(Ext.form.VTypes, {
			daterange : function(val, field) {
				var date = field.parseDate(val);

				if (!date) {
					return;
				}
				if (field.startDateField
						&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
								.getTime()))) {
					var start = Ext.getCmp(field.startDateField);
					start.setMaxValue(date);
					start.validate();
					this.dateRangeMax = date;
				} else if (field.endDateField
						&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
								.getTime()))) {
					var end = Ext.getCmp(field.endDateField);
					end.setMinValue(date);
					end.validate();
					this.dateRangeMin = date;
				}
				/*
				 * Always return true since we're only using this vtype to set
				 * the min/max allowed values (these are tested for after the
				 * vtype test)
				 */
				return true;
			},
			IPAddress : function(v) {
				return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
			},
			IPAddressText : grooveTranslator.getLangLabel('log-language',
					'invalidip'),
			IPAddressMask : /[\d\.]/i
		});

var queryWindow = function(config) {
	var logtype = getWBComboStore('logtype', '', 'logtype_', grooveTranslator
					.getLangLabel('log-language', 'query-type'), 'type', null,
			'0', true);
	logtype.setWidth(200);

	var logoper = getWBComboStore('logoper', '', 'logoper_', grooveTranslator
					.getLangLabel('log-language', 'query-detail'), 'oper',
			null, '0', true);
	logoper.setWidth(200);

	// 将字段加入到form中，以利用form进行样式排列
	this.queryForm = new Ext.FormPanel({
				labelWidth : 100,
				labelAlign : 'right',
				url : '',
				bodyStyle : 'padding:10px 10px 0',
				autoScroll : false,
				items : [new Ext.form.TextField({
							fieldLabel : grooveTranslator.getLangLabel(
									'log-language', 'query-user'),
							name : 'userName',
							id : 'userName',
							width : 200,
							maxLength : 32
						}), new Ext.form.TextField({
							fieldLabel : grooveTranslator.getLangLabel(
									'log-language', 'query-logid'),
							name : 'userId',
							id : 'userId',
							width : 200,
							maxLength : 32
						}), new Ext.form.TextField({
							fieldLabel : grooveTranslator.getLangLabel(
									'log-language', 'query-ip'),
							name : 'ip',
							id : 'ip',
							width : 200,
							vtype : 'IPAddress',
							maxLength : 32
						}), logtype, logoper, new Ext.form.DateField({
					fieldLabel : grooveTranslator.getLangLabel('log-language',
							'query-stime'),
					name : 'startTime',
					id : 'startTime',
					vtype : 'daterange',
					format : 'Y-m-d',
					width : 200,
					endDateField : 'endTime' // id of the end
						// date field
					}), new Ext.form.DateField({
					fieldLabel : grooveTranslator.getLangLabel('log-language',
							'query-etime'),
					name : 'endTime',
					id : 'endTime',
					vtype : 'daterange',
					format : 'Y-m-d',
					width : 200,
					startDateField : 'startTime' // id of the
						// start
						// date
						// field
					}), {
					xtype : 'hidden',
					name : 'type',
					id : 'type'
				}, {
					xtype : 'hidden',
					name : 'oper',
					id : 'oper'
				}]
			});

	Ext.apply(this, config);
	queryWindow.superclass.constructor.call(this, {
				id : 'queryWindow',
				closeAction : 'hide',
				layout : 'fit',
				width : 400,
				height : 300,
				modal : true,
				title : grooveTranslator.getLangLabel('log-language',
						'query-title'),
				items : this.queryForm,
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'query'),
					handler : function(button, e) {
						this.doQuery(e);
						this.hide();
					},
					scope : this
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'reset'),
					handler : function(button, e) {
						this.resetInput(e);
					},
					scope : this
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function(button, e) {
						if (this.cancelHandler) {
							this.cancelHandler
									.call(this.scope || this, this, e);
						} else {
							this.hide();
						}
					},
					scope : this
				}]
			});
};

Ext.extend(queryWindow, Ext.Window, {

			queryForm : null,
			/** 确定按钮事件处理器 */
			okHandler : null,
			/** 取消按钮事件处理器 */
			cancelHandler : null,
			/** 事件触发时对象的工作域 */
			scope : null,
			/** 查询参数 */
			params : {},
			/**
			 * 显示窗口
			 */
			showWindow : function() {
				this.show();
			},

			/**
			 * 将输入框清空
			 */
			resetInput : function() {
				var form = this.queryForm.getForm();
				form.reset();
			},

			/**
			 * 执行查询
			 */
			doQuery : function(event) {
				var form = this.queryForm.getForm();

				if (form.isValid()) {
					var userName = form.findField('userName').getValue();
					this.params.userName = userName;
					var userId = form.findField('userId').getValue();
					this.params.userId = userId;
					var startTime = form.findField('startTime').getEl().dom.value;
					this.params.startTime = startTime;
					var endTime = form.findField('endTime').getEl().dom.value;
					this.params.endTime = endTime;
					var type = form.findField('type').getValue();
					this.params.type = type;
					var oper = form.findField('oper').getValue();
					this.params.oper = oper;
					var ip = form.findField('ip').getValue();
					this.params.ip = ip;
					Ext.getCmp(logListGridId).store.load({
								params : this.params
							});
				} else {
					Ext.MessageBox.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('log-language',
									'query-invalid'));
					return;
				}
			},

			// private
			initComponent : function() {
				queryWindow.superclass.initComponent.call(this);
				this.addEvents(
						/**
						 * @event okClicked 当确定按钮被点击时触发
						 * @param {queryWindow}
						 *            this
						 */
						'okClicked',
						/**
						 * @event okClicked 当取消按钮被点击时触发
						 * @param {queryWindow}
						 *            this
						 */
						'cancelClicked');
			}

		});

var qWindow;

var logListGridId;

function initLogList(tabid) {
	var dateBtn = new Ext.Action({
				text : grooveTranslator.getLangLabel('log-language',
						'query-button'),
				icon : context + '/system/log/images/search.gif',
				tooltip : grooveTranslator.getLangLabel('log-language',
						'query-button-tooltip'),
				handler : function() {

					if (qWindow == null) {
						qWindow = new queryWindow();
					}
					qWindow.showWindow();
				}
			});
	var typeBtn = new Ext.Action({
				text : grooveTranslator.getLangLabel('log-language',
						'delete-button'),
				iconCls : 'del-log',
				tooltip : grooveTranslator.getLangLabel('log-language',
						'delete-button-tooltip'),
				disabled : true,
				handler : function() {
					Ext.MessageBox.confirm(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('log-language',
									'delete-prompt'), handleDelLog);
				}
			});
	var exportBtn = new Ext.Action({
				text : grooveTranslator.getLangLabel('log-language',
						'export-button'),
				icon : context + '/system/log/images/browser_download.png',
				tooltip : grooveTranslator.getLangLabel('log-language',
						'export-button-tooltip'),
				handler : handleExport
			});
	var removeBtn = new Ext.Action({
				text : grooveTranslator.getLangLabel('log-language',
						'clean-button'),
				icon : context + '/system/log/images/basket_delete.png',
				tooltip : grooveTranslator.getLangLabel('log-language',
						'clean-button-tooltip'),
				handler : function() {
					Ext.MessageBox.confirm(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('log-language',
									'clean-prompt'), handleRemoveAll);
				}
			});

	logListStore = new Ext.data.JsonStore({
				id : 'logListStore',
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'logList',
				fields : ['id', 'title', 'time', 'logid', 'ip', 'memo',
						'logtype', 'opertype'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/log.do?method=query'
						})
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var expander = new Ext.ux.grid.RowExpander({
		tpl : new Ext.Template('<p style="padding:5px;color:blue;"><font style="font-size:12px;font-weight:bold;">'
				+ grooveTranslator.getLangLabel('log-language', 'form-detail')
				+ '</font> <br/><textarea onclick="javascrpt:this.focus();" style="width:100%;">{memo}</textarea></p></div>')
	});

	logListGridId = (tabid == null ? 'logListGrid' : tabid);

	var logListGrid = new Ext.grid.GridPanel({
		id : logListGridId,
		title : grooveTranslator.getLangLabel('log-language', 'list-title'),
		closable : true,
		store : logListStore,
		columns : [sm, {
			header : grooveTranslator.getLangLabel('log-language', 'list-user'),
			width : 70,
			sortable : true,
			dataIndex : 'title'
		}, {
			header : grooveTranslator
					.getLangLabel('log-language', 'list-logid'),
			width : 70,
			sortable : true,
			dataIndex : 'logid'
		}, {
			header : grooveTranslator.getLangLabel('log-language', 'list-time'),
			width : 100,
			sortable : true,
			dataIndex : 'time'
		}, {
			header : grooveTranslator.getLangLabel('log-language', 'list-ip'),
			width : 100,
			sortable : true,
			dataIndex : 'ip'
		}, {
			header : grooveTranslator.getLangLabel('log-language', 'list-type'),
			width : 70,
			sortable : true,
			dataIndex : 'logtype'
		}, {
			header : grooveTranslator.getLangLabel('log-language',
					'list-detail'),
			width : 70,
			sortable : true,
			dataIndex : 'opertype'
		}, {
			header : grooveTranslator.getLangLabel('log-language',
					'list-content'),
			width : 200,
			sortable : true,
			dataIndex : 'memo',
			renderer : renderLogMemo
		}],
		sm : sm,
		stripeRows : true,
		autoExpandlog : 'name',
		// width : Ext.get(areaid).getComputedWidth(),
		border : false,
		viewConfig : {
			forceFit : true
		},
		// config options for stateful behavior
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : grooveTranslator.getLangLabel('common-language',
					'list-loading')
		},
		tbar : [typeBtn, dateBtn, exportBtn, removeBtn],
		bbar : new Ext.PagingToolbar({
					pageSize : pageSize,// 每页显示的记录值
					store : logListStore,
					displayInfo : true,
					displayMsg : grooveTranslator.getLangLabel(
							'common-language', 'list-displaymsg'),
					emptyMsg : grooveTranslator.getLangLabel('common-language',
							'list-emptymsg')
				})
	});

	/*
	 * logListGrid.on('render', function(grid) { var store = grid.getStore();
	 * 
	 * var view = grid.getView();
	 * 
	 * logListGrid.tip = new Ext.ToolTip({ target : view.mainBody, delegate :
	 * '.x-grid3-row', trackMouse : true, renderTo : document.body, listeners : {
	 * beforeshow : function updateTipBody(tip) { var rowIndex = view
	 * .findRowIndex(tip.triggerElement); tip.body.dom.innerHTML =
	 * store.getAt(rowIndex).data.memo; } } }); });
	 */

	logListGrid.on('click', function(e) {
				if (logListGrid.getSelectionModel().hasSelection()) {
					typeBtn.enable();
				} else {
					typeBtn.disable();
				}
			});

	logListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	logListStore.on('beforeload', function(thiz, options) {
				Ext.apply(thiz.baseParams, {
							userName : qWindow ? qWindow.queryForm.form
									.findField('userName').getValue() : '',
							userId : qWindow ? qWindow.queryForm.form
									.findField('userId').getValue() : '',
							startTime : qWindow ? qWindow.queryForm.form
									.findField('startTime').getValue() : '',
							endTime : qWindow ? qWindow.queryForm.form
									.findField('endTime').getValue() : '',
							type : qWindow ? qWindow.queryForm.form
									.findField('type').getValue() : '',
							oper : qWindow ? qWindow.queryForm.form
									.findField('oper').getValue() : '',
							ip : qWindow ? qWindow.queryForm.form
									.findField('ip').getValue() : ''
						});
			});

	logListGrid.setIconClass('tabs');
	/*
	 * 修改列表css样式 logListStore.on('load', function() {
	 * logListGrid.getEl().select("table[class=x-grid3-row-table]")
	 * .each(function(x) { x.addClass('x-grid3-cell-text-visible'); }); });
	 */

	return logListGrid;
};

/**
 * 查看日志详细信息
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
 */
function renderLogMemo(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String.format('<b><a href="javascript:void(0);" title="'
					+ grooveTranslator.getLangLabel('log-language',
							'query-detail')
					+ '" onclick="javascript:showLogMemo(this);">{0}</a></b>',
			Ext.util.Format.htmlEncode(value));

	return resultString;
}

/**
 * 显示日志详细信息
 */
function showLogMemo(thizz) {
	var win = new Ext.Window({
		title : grooveTranslator.getLangLabel('log-language', 'query-content'),
		width : 500,
		layout : 'fit',
		html : '<textarea readonly style="border:0px;width:100%;height:300px;">'
				+ thizz.innerHTML + '</textarea>',
		plain : true,
		modal : true,
		buttons : [{
			text : grooveTranslator.getLangLabel('log-language',
					'query-content'),
			handler : function() {
				win.close();
				win = null;
			}
		}]
	});
	win.show(this);

}

function reloadLogListStore() {
	logListStore.reload({
				start : 0,
				limit : pageSize
			});
}

function handleDelLog(btn) {
	if (btn == 'yes') {
		var ids = "";
		var selectedNodes = Ext.getCmp(logListGridId).getSelectionModel()
				.getSelections();
		for (var i = 0; i < selectedNodes.length; i++) {
			if (i < selectedNodes.length - 1) {
				ids += selectedNodes[i].data.id + ",";
			} else {
				ids += selectedNodes[i].data.id;
			}
		}

		Ext.Ajax.request({
					url : context + "/system/log.do?method=delete",
					method : 'POST',
					async : false,
					params : {
						ids : ids
					},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'log-language',
											'delete-failure-deleteerror'));
						} else {
							reloadLogListStore();
						}
					}
				});
	}
};

function handleRemoveAll(btn) {
	if (btn == 'yes') {
		var url = context + "/system/log.do?method=deleteAll";
		Ext.Ajax.request({
					url : url,
					method : 'POST',
					async : false,
					params : {},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'log-language',
											'delete-failure-cleanerror'));
						} else {
							reloadLogListStore();
						}
					},
					failure : function(response, options) {
						Ext.MessageBox.show({
									title : grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									msg : response.responseText,
									icon : Ext.MessageBox.ERROR
								});
					}
				});
	}
}

/**
 * 将当前日志结果集导出至XML文件
 */
function handleExport() {
	if (qWindow == null) {
		qWindow = new queryWindow();
	}
	var url = context + "/system/log.do?method=exportXML";
	var userName = qWindow.params.userName;
	if (userName != "" && !(typeof userName == "undefined")) {
		url = url + "&userName=" + userName;
	}
	var userId = qWindow.params.userId;
	if (userId != "" && !(typeof userId == "undefined")) {
		url = url + "&userId=" + userId;
	}
	var startTime = qWindow.params.startTime;
	if (startTime != "" && !(typeof startTime == "undefined")) {
		url = url + "&startTime=" + startTime;
	}
	var endTime = qWindow.params.endTime;
	if (endTime != "" && !(typeof endTime == "undefined")) {
		url = url + "&endTime=" + endTime;
	}
	var type = qWindow.params.type;
	if (type != "" && !(typeof type == "undefined")) {
		url = url + "&type=" + type;
	}
	var oper = qWindow.params.oper;
	if (oper != "" && !(typeof oper == "undefined")) {
		url = url + "&oper=" + oper;
	}
	var ip = qWindow.params.ip;
	if (ip != "" && !(typeof ip == "undefined")) {
		url = url + "&ip=" + ip;
	}
	Ext.get('dldfrm').dom.src = url;

}
