/**
 * 新定义对象查询
 */
function editquery(key, name) {
	var queryEditBaseForm = new Ext.FormPanel({
		bodyStyle : 'border:0px; padding:5px;',
		title : 'Basic Settings',
		layout : 'form',
		labelWidth : 120,
		border : false,
		autoScroll : true,
		defaults : {
			width : 530
		},
		defaultType : 'textfield',

		items : [{
					fieldLabel : 'Query Name',
					id : 'qname',
					name : 'qname',
					allowBlank : false
				}, {
					fieldLabel : 'Key',
					id : 'qkey',
					name : 'qkey',
					allowBlank : false
				}, {
					fieldLabel : 'CustomJS',
					xtype : 'textarea',
					id : 'qjs',
					name : 'qjs',
					height : 40
				}, {
					fieldLabel : 'CustomCSS',
					xtype : 'textarea',
					id : 'qcss',
					name : 'qcss',
					height : 40
				}, {
					fieldLabel : 'Custom Queries Page',
					xtype : 'textarea',
					id : 'queryurl',
					name : 'queryurl',
					height : 40
				}, {
					fieldLabel : 'Customize Results page',
					xtype : 'textarea',
					id : 'qresulturl',
					name : 'qresulturl',
					height : 40
				}, {
					fieldLabel : 'Remarks',
					xtype : 'textarea',
					id : 'qdesc',
					name : 'qdesc',
					height : 40
				}, {
					fieldLabel : 'Related Objects',
					id : 'objectLabel',
					disabled : true
				}, {
					xtype : 'hidden',
					id : 'object',
					name : 'object'
				}, new Ext.form.RadioGroup({
							fieldLabel : 'Session Correlation',
							// //RadioGroup.fieldLabel 标签与
							// Radio.boxLabel 标签区别
							items : [new Ext.form.Radio({ // 三个必须项
										id : "qsession0",
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : "No", // Radio标签
										name : "qsession", // 用于form提交时传送的参数名
										inputValue : "0", // 提交时传送的参数值
										checked : true,
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : "qsession1",
										boxLabel : "Yes",
										name : "qsession",
										inputValue : "1",
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
						}), new Ext.form.RadioGroup({
							fieldLabel : 'Display Box',
							// //RadioGroup.fieldLabel 标签与
							// Radio.boxLabel 标签区别
							items : [new Ext.form.Radio({ // 三个必须项
										id : "qchk0",
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : "NO", // Radio标签
										name : "qchk", // 用于form提交时传送的参数名
										inputValue : "0", // 提交时传送的参数值
										checked : true,
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : "qchk1",
										boxLabel : "Yes",
										name : "qchk",
										inputValue : "1",
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
						}), new Ext.form.DateField({
							id : 'qcreatestime',
							name : 'qcreatestime',
							fieldLabel : '对象创建日期(结束)',
							emptyText : '请选择日期',
							format : 'Y-m-d'
						}), new Ext.form.DateField({
							id : 'qcreateetime',
							name : 'qcreateetime',
							fieldLabel : '对象创建日期(结束)',
							emptyText : '请选择日期',
							format : 'Y-m-d'
						}), {
					xtype : 'hidden',
					id : 'qpurview',
					name : 'qpurview'
				}, {
					xtype : 'hidden',
					id : 'qpurviewname',
					name : 'qpurviewname'
				}]

	});

	queryEditBaseForm.getForm().load({
		url : context + '/system/objectquery.do?method=edit',
		params : {
			key : key
		},
		waitTitle : '提示',
		waitMsg : '正在加载数据,请稍候...',
		animEl : "loding",
		success : function(form, action) {
			var resultInfo = listSimpleJson(action.result.data);

			Ext.getCmp('objectLabel').setValue(resultInfo.get("objectName"));

			Ext.get('objrange').dom.innerHTML = resultInfo.get("purviewstring");

			/* 会话相关性 */
			var qsession = resultInfo.get("qsession");

			if (qsession == "0") {
				Ext.get("qsession0").dom.checked = true;
			} else if (qsession == "1") {
				Ext.get("qsession1").dom.checked = true;
			}
			
			/* 是NO显示复选框 */
			var qchk = resultInfo.get("qchk");

			if (qchk == "0") {
				Ext.get("qchk0").dom.checked = true;
			} else if (qchk == "1") {
				Ext.get("qchk1").dom.checked = true;
			}

			Ext.get('DragContainer1').dom.innerHTML = resultInfo
					.get("queryItemString");
			Ext.get('DragContainer2').dom.innerHTML = resultInfo
					.get("viewItemString");
			Ext.get('DragContainer3').dom.innerHTML = resultInfo
					.get("restraintItemString");
		},
		failure : function(form, action) {
			Ext.Msg.alert('初始化通用查询设置失败');
		}
	});

	var p1 = new Ext.FormPanel({
		title : '可访问范围设置区域',
		border : true,
		html : '<div id="objrange" style="width:600px;padding:5px;"><font color="red">请确定在 \'基本定义\' 中已选定了查询相关对象...</font></div>'
	});

	var p2 = new Ext.FormPanel({
		title : '查询项设置区域',
		border : true,
		html : '<div id="DragContainer1" style="padding:5px;"><font color="red">请确定在 \'基本定义\' 中已选定了查询相关对象...</font></div>'
	});

	var p3 = new Ext.FormPanel({
		title : '显示项设置区域',
		border : true,
		html : '<div id="DragContainer2" style="padding:5px;"><font color="red">请确定在 \'基本定义\' 中已选定了查询相关对象...</font></div>'
	});

	var p4 = new Ext.FormPanel({
		title : '约束项设置区域',
		border : true,
		html : '<div id="DragContainer3" style="padding:5px;"><font color="red">请确定在 \'基本定义\' 中已选定了查询相关对象...</font></div>'
	});

	var accordion = new Ext.Panel({
				border : false,
				layout : 'accordion',
				items : [queryEditBaseForm, p1, p2, p3, p4]
			});

	editQueryWin = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 800,
		height : 500,
		title : name,
		plain : true,
		modal : true,
		maximizable : true,
		tbar : new Ext.Toolbar({
					autoWidth : true,
					autoShow : true,
					items : [{
								id : 'objrangeset',
								iconCls : 'objrangeset',
								text : '访问范围设置',
								handler : selectobjrange,
								tooltip : '可以访问对象数据的用户范围'
							}, '-', {
								id : 'objqueryset',
								iconCls : 'objqueryset',
								text : '查询项设置',
								handler : selectQueryItem,
								tooltip : '数据查询条件'
							}, '-', {
								id : 'objviewset',
								iconCls : 'objviewset',
								text : '显示项设置',
								handler : selectViewItem,
								tooltip : '对象数据列表的显示列'
							}, '-', {
								id : 'objrestraintset',
								iconCls : 'objrestraintset',
								text : '约束项设置',
								handler : selectRestraintItem,
								tooltip : '对象数据查询预先设定的固定查询条件'
							}]
				}),
		items : [accordion],

		buttons : [{
			id : 'QueryUpdateButton',
			text : '提 交',
			handler : function() {
				if (queryEditBaseForm.getForm().isValid()) {
					var xmlscript = initQueryXMLScript();

					Ext.getCmp('QueryUpdateButton').setDisabled(true);
					Ext.MessageBox.wait('数据提交过程中...');

					queryEditBaseForm.getForm().submit({
								url : context
										+ '/system/objectquery.do?method=update',
								method : "POST",
								params : {
									xmlscript : xmlscript,
									qkey1 : key
								},
								success : function(form, action) {
									Ext.MessageBox.hide();
									Ext.Msg.alert('提示', '成功修改查询设置！');
									reloadQueryListStore();
									editQueryWin.close();
									editQueryWin = null;
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									Ext.getCmp('QueryUpdateButton')
											.setDisabled(false);

									if (!action.result) {
										Ext.Msg.alert('提示', '未知的异常错误！');
									} else if (action.result.result == '0') {
										Ext.Msg.alert('提示', '唯一标识重复，请重新定义！');
									} else if (action.result.result == '-1') {
										Ext.Msg.alert('提示', '提交保存查询定义发生错误！');
									}
								}
							});
				}
			}
		}, {
			id : 'QueryDelButton',
			text : '删 除',
			handler : function() {
				deleteQuery(key, editQueryWin);
			}
		}, {
			text : '关 闭',
			handler : function() {
				editQueryWin.close();
				editQueryWin = null;
			}
		}]
	});

	editQueryWin.show(this);
}

var delkey;
var editQueryWin;

function deleteQuery(key, win) {
	delkey = key;
	editQueryWin = win;
	Ext.MessageBox.confirm('提示', '确定删除查询设置？', handleDeleteQuery);
}

/**
 * 删除查询项设置
 * 
 * @param {}
 *            key
 */
function handleDeleteQuery(btn) {
	if (btn == 'yes') {
		Ext.getCmp('QueryDelButton').setDisabled(true);
		Ext.MessageBox.wait('删除过程中...');

		Ext.Ajax.request({
					url : context + "/system/objectquery.do?method=delete",
					method : 'POST',
					async : false,
					params : {
						ids : delkey
					},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.MessageBox.hide();
							Ext.Msg.alert('提示', '删除查询设置出现异常！');
							Ext.getCmp('QueryDelButton').setDisabled(false);
						} else {
							Ext.MessageBox.hide();
							Ext.Msg.alert('提示', '已成功删除查询项设置！');
							try {
								reloadQueryListStore();
							} catch (error) {

							}
							editQueryWin.close();
							editQueryWin = null;
						}
					}
				});
	}
}