/* 流程控制事件定义文件 */
document.write('<script type="text/javascript" src="' + context
		+ '/system/wordbook/js/wbstore.js"></script>');

/**
 * 流程跟踪操作
 * 
 * @param {}
 *            flowid 流程id
 * @param {}
 *            insid 实例id
 */
function handleTrace(flowid, insid) {
	// var url = context + "/system/flow.do?method=trace&id=" + id;
	var url = context
			+ "/system/flowplotter.do?method=preplotter&type=viewing&id="
			+ flowid + "&insid=" + insid;
	window
			.showModalDialog(
					url,
					"",
					"dialogWidth:1000px;dialogHeight:700px;center:yes;help:no;scroll:no;status:no;resizable:yes;");
}

/**
 * 新建操作
 * 
 * @param {}
 *            key 流转唯一标识
 */
function handleInsert(key) {
	window.location.href = context + "/system/flow.do?method=neu&key=" + key;
}

/**
 * 取回操作
 * 
 * @param {}
 *            id 待取回活动记录ID
 * @param {}
 *            cid 当前活动记录ID
 */
function handleRetake(id, cid) {
	Ext.MessageBox.confirm('提示', '确定将文件取回', function(e) {
				if (e == "yes") {
					var url = context + "/system/flow.do?method=retake&id="
							+ id + "&cid=" + cid;

					Ext.MessageBox.wait('文件取回过程中...');
					Ext.Ajax.request({
								// 请求地址
								url : url,
								// 成功时回调
								success : function(response, options) {
									// 获取响应的json字符串
									Ext.MessageBox.hide();

									var json = response.responseText;
									var o = Ext.JSON.decode(json);

									if (o.success) {
										alert("文件取回成功！");
										handleRefresh();
									} else {
										Ext.Msg.alert('提示', '文件取回失败');
									}
								}
							});
				}
			});
}

/**
 * 查阅操作
 * 
 * @param {}
 *            id 活动记录ID
 */
function handleView(id) {
	var url = context + "/system/flow.do?method=view&id=" + id;
	// window.open(url, "");
	document.location = url;
}

/**
 * 查看,无权限约束
 * 
 * @param {}
 *            id
 */
function handleLookOver(id) {
	var url = context + "/system/flow.do?method=lookover&id=" + id;
	// window.open(url, "");
	document.location = url;
}

/**
 * 查看传阅文件
 * 
 * @param {}
 *            id
 */
function handleEncyclic(id) {
	var url = context + "/system/flow.do?method=encyclic&id=" + id;
	window.open(url, "");
}

/**
 * 重新启用
 */
function handleWake(id, name) {
	Ext.MessageBox.confirm('提示', '确定重新启用 <p><b>' + name + '</b></p>', function(
					e) {
				if (e == "yes") {
					var url = context + "/system/flow.do?method=awake";

					Ext.MessageBox.wait('重新启用过程中...');
					Ext.Ajax.request({
								// 请求地址
								url : url,
								params : {
									id : id
								},
								// 成功时回调
								success : function(response, options) {
									// 获取响应的json字符串
									Ext.MessageBox.hide();

									var json = response.responseText;
									var o = Ext.JSON.decode(json);

									if (o.success) {
										alert("重新启用成功！");
										handleRefresh();
									} else {
										Ext.Msg.alert('提示', '重新启用失败');
									}
								}
							});
				}
			});
}

/**
 * 删除实例
 */
function handleDelete(id, name) {
	Ext.MessageBox
			.confirm(
					'提示',
					'<font color="red"><b>警告:</b></font> 如果执行删除操作,流转实例相关活动记录及公文数据将被删除,删除后数据不可恢复',
					function(ex) {
						if (ex == "yes") {
							Ext.MessageBox.confirm('提示', '确定删除公文 <' + name
											+ '> 办理过程', function(e) {
										if (e == "yes") {
											var url = context
													+ "/system/flow.do?method=delete";

											Ext.MessageBox.wait('删除过程中...');
											Ext.Ajax.request({
												// 请求地址
												url : url,
												params : {
													id : id
												},
												// 成功时回调
												success : function(response,
														options) {
													// 获取响应的json字符串
													Ext.MessageBox.hide();

													var json = response.responseText;
													var o = Ext.JSON
															.decode(json);

													if (o.success) {
														alert("已成功执行删除操作！");
														handleRefresh();
													} else {
														Ext.Msg.alert('提示',
																'删除失败');
													}
												}
											});
										}
									});
						}
					});
}

/**
 * 文件归档
 * 
 * @param {}
 *            id
 * @param {}
 *            name
 */
function handlePigeonhole(id, name, tp, tpName, num) {
	var todayObj = new Date();

	var mj = getWBComboStore('mj', '', 'mj_', '密级', 'mj', null, '');

	mj.setWidth(200);

	var lb = getWBComboStore('lb', '', 'lb_', '类别', 'lb', null, '');

	lb.setWidth(200);

	var form = new Ext.FormPanel({
				frame : true,
				border : false,
				margins : '1 1 1 1',
				labelWidth : 85,
				waitMsgTarget : true,

				items : [{
							layout : 'column',
							items : [{
										columnWidth : .5,
										layout : 'form',
										items : [{
													fieldLabel : '文件编号',
													xtype : 'textfield',
													width : 200,
													name : 'phnumber',
													value : num,
													readOnly : true
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										items : [{
													fieldLabel : '题名',
													xtype : 'textfield',
													width : 200,
													name : 'phname',
													value : name,
													readOnly : true
												}]
									}]
						}, {
							layout : 'column',
							items : [{
										columnWidth : .5,
										layout : 'form',
										items : [{
													fieldLabel : '主题词',
													xtype : 'textfield',
													width : 200,
													name : 'phztc'
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										items : [{
													fieldLabel : '页数',
													xtype : 'textfield',
													width : 200,
													name : 'phsize'
												}]
									}]
						}, {
							layout : 'column',
							items : [{
										columnWidth : .5,
										layout : 'form',
										items : [{
													fieldLabel : '归档年度',
													xtype : 'textfield',
													name : 'phyear',
													width : 200,
													value : todayObj
															.getFullYear()
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										items : [{
													fieldLabel : '保管期限',
													xtype : 'datefield',
													allowBlank : false,
													format : 'Y-m-d',
													width : 200,
													name : 'phdate'
												}]
									}]
						}, {
							layout : 'column',
							items : [{
										columnWidth : .5,
										layout : 'form',
										items : [{
													xtype : 'datefield',
													fieldLabel : '案卷日期',
													name : 'phStartDate',
													allowBlank : false,
													format : 'Y-m-d',
													width : 200
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										items : [{
													xtype : 'datefield',
													fieldLabel : '至',
													name : 'phEndDate',
													allowBlank : false,
													format : 'Y-m-d',
													width : 200
												}]
									}]
						}, {
							layout : 'column',
							items : [{
										columnWidth : .5,
										layout : 'form',
										items : [mj]
									}, {
										columnWidth : .5,
										layout : 'form',
										items : [lb]
									}]
						}, {
							layout : 'column',
							items : [{
										columnWidth : .5,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : '文件种类',
													name : 'phTypeName',
													value : tpName,
													width : 200,
													readOnly : true
												}]
									}]
						}, {
							xtype : 'hidden',
							name : 'insid',
							value : id
						}, {
							xtype : 'hidden',
							name : 'insname',
							value : name
						}, {
							xtype : 'hidden',
							name : 'phtype',
							value : tp
						}, {
							xtype : 'hidden',
							id : 'mj',
							name : 'mj'
						}, {
							xtype : 'hidden',
							id : 'lb',
							name : 'lb'
						}]
			});

	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		id : 'win',
		layout : 'fit',
		width : 650,
		height : 400,
		title : '文件归档',
		plain : true,
		modal : true,

		items : [form],

		buttons : [{
			id : 'saveButton',
			text : '提 交',
			handler : function() {
				if (form.getForm().isValid()) {

					Ext.MessageBox.confirm('提示', '确定归档', function(e) {
								if (e == "yes") {
									Ext.MessageBox.wait('提交保存过程中...');

									form.getForm().submit({
										url : context
												+ '/system/flow.do?method=pigeonhole',
										method : "POST",
										success : function(form, action) {
											Ext.MessageBox.hide();
											win.close();
										},
										failure : function(form, action) {
											Ext.MessageBox.hide();
											Ext.Msg.alert('提示', '文件归档发生错误！');

											win.close();
										}
									});

								}
							});
				}
			}
		}, {
			text : '关 闭',
			handler : function() {
				win.close();
				win = null;
			}
		}]
	});

	win.show();
}

/**
 * 
 * @param {}
 *            target
 * @param {}
 *            functionref
 * @param {}
 *            tasktype
 */
function addEvent(target, functionref, tasktype) {
	if (target.addEventListener)
		target.addEventListener(tasktype, functionref, false);
	else if (target.attachEvent)
		target.attachEvent('on' + tasktype, function() {
					return functionref.call(target, window.event)
				});
}

addEvent(window, function() {/* 调整父窗口frame高度 */
			if (parent && parent.resizeFrame) {
				var height = document.getElementsByTagName("body")[0].scrollHeight;

				if (height < 400) {
					height = 400;
				}

				parent.resizeFrame(height + 50);
			}
		}, 'load');