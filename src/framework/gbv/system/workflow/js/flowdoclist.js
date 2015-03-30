document.write("<script src=\"" + context
		+ "/resources/ext3/ux/fileuploadfield/FileUploadField.js\"></script>");

var flowdoclistTabid;
var nowFlowId;
/**
 * 工作流程列表
 * 
 * @return {}
 */
function flowdoclist(tabid) {
	flowdoclistTabid = tabid;

	var store = new Ext.data.JsonStore({
				root : 'docList',
				totalProperty : 'totalCount',
				idProperty : 'PKID',
				remoteSort : true,

				fields : ['PAGINATION_NUMBER', 'TEMP_ID', 'CG_ID', 'TEMP_NAME',
						'TEMP_DESC', 'USER_ID', 'USER_NAME', 'TEMP_USED',
						'TEMP_TYPE', 'ANNEXID'],
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/flowmanage.do?method=doclist'
						})
			});

	function renderTopic(value, p, record) {
		return String
				.format(
						'<b><a href="javascript:void(0);" onclick="javascript:editDoc(\'{1}\', \'{0}\', \'{2}\', \'{3}\', \'{4}\', \'{5}\');">编辑</a></b>',
						record.data.TEMP_NAME, record.data.TEMP_ID,
						record.data.TEMP_DESC, record.data.TEMP_USED,
						record.data.TEMP_TYPE, record.data.ANNEXID);
	}

	function renderLast(value, p, record) {
		return String
				.format(
						'<b><a href="javascript:void(0);"  title="点击下载" onclick="javascript:viewAnnex(\'{1}\');">{0}</a></b>',
						value, record.data.ANNEXID);
	}

	function renderDocType(value, p, record) {
		var tp = '';
		if (value == '0') {
			tp = '正文模板';
		} else if (value == '1') {
			tp = '套红模板';
		} else if (value == '2') {
			tp = '版记模板';
		} else if (value == '3') {
			tp = '打印模板';
		}
		return tp;
	}

	function renderUsed(value, p, record) {
		if (value == 0) {
			return '否';
		} else if (value == 1) {
			return '是'
		}

		return '';
	}

	var flowListCombo = getFlowSelectCombo('工作流程', 'wobject', 'wobjectName', '');

	var grid = new Ext.grid.GridPanel({
				id : tabid,
				title : '正文模板列表',
				store : store,
				loadMask : true,
				closable : true,
				layout : 'fit',
				// grid columns
				columns : [new Ext.grid.RowNumberer(), {
							header : '模板名称',
							dataIndex : 'TEMP_NAME',
							align : 'left',
							width : 100,
							renderer : renderLast
						}, {
							header : '模板描述',
							dataIndex : 'TEMP_DESC',
							align : 'left',
							width : 150
						}, {
							header : '模板类型',
							dataIndex : 'TEMP_TYPE',
							align : 'left',
							width : 150,
							renderer : renderDocType
						}, {
							header : '默认使用',
							dataIndex : 'TEMP_USED',
							align : 'left',
							width : 100,
							renderer : renderUsed
						}, {
							header : '上传人',
							dataIndex : 'USER_NAME',
							align : 'left',
							width : 100
						}, {
							header : '',
							dataIndex : 'OBJ_NAME',
							align : 'left',
							width : 100,
							renderer : renderTopic
						}],

				stripeRows : true,
				autoExpandColumn : 'NUMBER_NAME',
				viewConfig : {
					forceFit : true
				},
				border : false,
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "数据加载中，请稍等..."
				},

				// paging bar on the bottom
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayInfo : true,
							displayMsg : '总记录数 {0} - {1} of {2}',
							emptyMsg : "没有数据"
						}),
				tbar : ['选择工作流程', flowListCombo, '-', {
							id : 'adddocbutton',
							text : '上传模板',
							disabled : true,
							iconCls : 'adddoc',
							handler : function() {
								neuDoc();
							}
						}, '-', {
							id : 'deldocbutton',
							text : '删除模板',
							iconCls : 'deldoc',
							disabled : true,
							handler : function() {
								deleteDoc(grid);
							}
						}]
			});

	grid.on('click', function(e) {
				if (grid.getSelectionModel().hasSelection()) {
					Ext.getCmp('deldocbutton').enable();
				} else {
					Ext.getCmp('deldocbutton').disable();
				}
			});

	grid.setIconClass('tabs');

	store.on('beforeload', function(thiz, options) {
				Ext.apply(thiz.baseParams, {
							fid : nowFlowId
						});
			});

	// trigger the data store load
	/*
	 * store.load({ params : { start : 0, limit : 25 } });
	 */

	return grid;
}

function hasSelectedFlow(id, name) {
	nowFlowId = id;

	Ext.getCmp('adddocbutton').enable();

	Ext.getCmp(flowdoclistTabid).getStore().load({
				params : {
					fid : id
				}
			});
}

/**
 * 上传正文模板
 */
function neuDoc() {
	var radio = new Ext.form.RadioGroup({
				fieldLabel : '类型',
				items : [new Ext.form.Radio({ // 三个必须项
							id : 'tp0',
							checked : true, //
							// 设置当前为选中状态,仅且一个为选中.
							boxLabel : '正文', // Radio标签
							name : 'itp', // 用于form提交时传送的参数名
							inputValue : '0', // 提交时传送的参数值
							listeners : {
								check : function(checkbox, checked) { // 选中时,调用的事件
									if (checked) {

									}
								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : 'tp1',
							boxLabel : '红头',
							name : 'itp',
							inputValue : '1',
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : 'tp2',
							boxLabel : '版记',
							name : 'itp',
							inputValue : '2',
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : 'tp3',
							boxLabel : '打印',
							name : 'itp',
							inputValue : '3',
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						})]
			});

	var form = new Ext.FormPanel({
		id : 'neuDocForm',
		frame : true,
		monitorValid : true,// 把有formBind:true的按钮和验证绑定
		layout : "form",
		labelAlign : "left",
		fileUpload : true,
		border : false,
		autoScroll : true,
		labelWidth : 75, // label settings here cascade unless
		// overridden
		frame : false,
		bodyStyle : 'padding:5px 5px 0',
		width : 550,
		defaults : {
			width : 350
		},
		defaultType : 'textfield',
		items : [{
					fieldLabel : '模板名称',
					id : 'iname',
					name : 'iname',
					maxLength : 25,
					allowBlank : false
				}, {
					fieldLabel : '模板文件',
					xtype : 'fileuploadfield',
					emptyText : '选择正文模板',
					id : 'ifile1',
					name : 'ifile1',
					buttonText : '',
					buttonCfg : {
						iconCls : 'upload-icon'
					},
					allowBlank : false
				}, radio, {
					fieldLabel : '内容描述',
					xtype : 'textarea',
					maxLength : 100,
					height : 80,
					id : 'idesc',
					name : 'idesc'
				}, new Ext.form.RadioGroup({
							fieldLabel : '默认使用',
							items : [new Ext.form.Radio({ // 三个必须项
										id : 'userd0',
										checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : '否', // Radio标签
										name : 'iused', // 用于form提交时传送的参数名
										inputValue : '0', // 提交时传送的参数值
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : 'userd1',
										boxLabel : '是',
										name : 'iused',
										inputValue : '1',
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
						})]
	});

	var neuDocWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 500,
				height : 300,
				title : '上传正文模板',
				plain : true,
				modal : true,
				maximizable : false,
				items : [form],

				buttons : [{
					id : 'DocSaveButton',
					text : '提 交',
					handler : function() {
						if (form.getForm().isValid()) {
							Ext.getCmp('DocSaveButton').setDisabled(true);
							Ext.MessageBox.wait('提交保存过程中...');

							form.getForm().submit({
								url : context + '/system/baseworksave.do',
								method : "POST",
								params : {
									tableNames : 'WF_DOCTEMP',
									handleTypes : 'single',
									counterNames : '',
									icgid : nowFlowId,
									iuserid : userId,
									iusername : userName
								},
								success : function(form, action) {
									Ext.MessageBox.hide();
									Ext.Msg.alert('提示', '保存正文模板成功！');
									Ext.getCmp(flowdoclistTabid).getStore()
											.reload();
									neuDocWin.close();
									neuDocWin = null;
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									Ext.getCmp('DocSaveButton')
											.setDisabled(false);

									Ext.Msg.alert('提示', '上传正文模板发生错误！');
								}
							});
						}
					}
				}, {
					text : '关 闭',
					handler : function() {
						neuDocWin.close();
						neuDocWin = null;
					}
				}]
			});

	neuDocWin.show();
}

/**
 * 正文模板编辑
 * 
 * @param {}
 *            id 模板id
 */
function editDoc(id, name, desc, userd, tp, annexid) {
	var radio = new Ext.form.RadioGroup({
				fieldLabel : '类型',
				items : [new Ext.form.Radio({ // 三个必须项
							id : 'tp0',
							// 设置当前为选中状态,仅且一个为选中.
							boxLabel : '正文', // Radio标签
							checked : (tp == '0'),
							name : 'itp', // 用于form提交时传送的参数名
							inputValue : '0', // 提交时传送的参数值
							listeners : {
								check : function(checkbox, checked) { // 选中时,调用的事件
									if (checked) {

									}
								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : 'tp1',
							boxLabel : '红头',
							checked : (tp == '1'),
							name : 'itp',
							inputValue : '1',
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : 'tp2',
							boxLabel : '版记',
							checked : (tp == '2'),
							name : 'itp',
							inputValue : '2',
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : 'tp3',
							boxLabel : '打印',
							checked : (tp == '3'),
							name : 'itp',
							inputValue : '3',
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						})]
			});

	var form = new Ext.FormPanel({
		id : 'neuDocForm',
		frame : true,
		monitorValid : true,// 把有formBind:true的按钮和验证绑定
		layout : "form",
		labelAlign : "left",
		border : false,
		autoScroll : true,
		labelWidth : 75, // label settings here cascade unless
		// overridden
		frame : false,
		fileUpload : true,
		bodyStyle : 'padding:5px 5px 0',
		width : 550,
		defaults : {
			width : 350
		},
		defaultType : 'textfield',
		items : [{
					fieldLabel : '模板名称',
					id : 'iname',
					name : 'iname',
					maxLength : 25,
					value : name,
					allowBlank : false
				}, {
					fieldLabel : '模板文件',
					xtype : 'fileuploadfield',
					emptyText : '选择正文模板',
					id : 'ifile1',
					name : 'ifile1',
					buttonText : '',
					buttonCfg : {
						iconCls : 'upload-icon'
					}
				}, radio, {
					fieldLabel : '内容描述',
					xtype : 'textarea',
					maxLength : 100,
					height : 80,
					id : 'idesc',
					value : desc,
					name : 'idesc'
				}, new Ext.form.RadioGroup({
							fieldLabel : '默认使用',
							items : [new Ext.form.Radio({ // 三个必须项
										id : 'userd0',
										checked : (userd == '0'),
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : '否', // Radio标签
										name : 'iused', // 用于form提交时传送的参数名
										inputValue : '0', // 提交时传送的参数值
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : 'userd1',
										checked : (userd == '1'),
										boxLabel : '是',
										name : 'iused',
										inputValue : '1',
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
						})]
	});

	var neuDocWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 500,
				height : 300,
				title : '编辑正文模板',
				plain : true,
				modal : true,
				maximizable : false,
				items : [form],

				buttons : [{
					id : 'DocSaveButton',
					text : '提 交',
					handler : function() {
						if (form.getForm().isValid()) {
							if (Ext.getCmp('ifile1').getValue() != '') {
								Ext.getCmp('DocSaveButton').setDisabled(true);
								Ext.MessageBox.wait('提交保存过程中...');

								Ext.Ajax.request({// 请求地址
									url : context
											+ '/system/annex.do?method=delete',
									method : 'post',
									params : {
										id : annexid
									},
									// 成功时回调
									success : function(response, options) {
										// 获取响应的json字符串
										Ext.MessageBox.hide();

										var json = response.responseText;
										var o = Ext.JSON.decode(json);

										if (o.success) {
											form.getForm().submit({
												url : context
														+ '/system/baseworkupdate.do',
												method : "POST",
												params : {
													tableNames : 'WF_DOCTEMP',
													handleTypes : 'single',
													counterNames : '',
													tempid : id
												},
												success : function(form, action) {
													Ext.MessageBox.hide();
													Ext.Msg.alert('提示',
															'修改正文模板成功！');
													Ext
															.getCmp(flowdoclistTabid)
															.getStore()
															.reload();
													neuDocWin.close();
													neuDocWin = null;
												},
												failure : function(form, action) {
													Ext.MessageBox.hide();
													Ext.getCmp('DocSaveButton')
															.setDisabled(false);

													Ext.Msg.alert('提示',
															'修改正文模板发生错误！');
												}
											});
										} else {
											Ext.Msg.alert('提示', '修改正文模板发生错误!');
										}
									}
								});
							} else {
								Ext.getCmp('DocSaveButton').setDisabled(true);
								Ext.MessageBox.wait('提交保存过程中...');

								form.getForm().submit({
									url : context + '/system/baseworkupdate.do',
									method : "POST",
									params : {
										tableNames : 'WF_DOCTEMP',
										handleTypes : 'single',
										counterNames : '',
										tempid : id
									},
									success : function(form, action) {
										Ext.MessageBox.hide();
										Ext.Msg.alert('提示', '修改正文模板成功！');
										Ext.getCmp(flowdoclistTabid).getStore()
												.reload();
										neuDocWin.close();
										neuDocWin = null;
									},
									failure : function(form, action) {
										Ext.MessageBox.hide();
										Ext.getCmp('DocSaveButton')
												.setDisabled(false);

										Ext.Msg.alert('提示', '修改正文模板发生错误！');
									}
								});
							}
						}
					}
				}, {
					text : '关 闭',
					handler : function() {
						neuDocWin.close();
						neuDocWin = null;
					}
				}]
			});

	neuDocWin.show();
}

function deleteDoc() {
	Ext.MessageBox.confirm('提示', '确定删除正文模板？', function(btn) {
		if (btn == 'yes') {
			var id;
			var selectedNodes = Ext.getCmp(flowdoclistTabid)
					.getSelectionModel().getSelections();

			if (selectedNodes && selectedNodes.length > 0) {
				id = selectedNodes[0].data.TEMP_ID;
			}

			Ext.Ajax.request({
						url : context + "/system/baseworkdelete.do",
						method : 'POST',
						async : false,
						params : {
							tempid : id,
							tableNames : 'WF_DOCTEMP',
							handleTypes : 'single',
							counterNames : ''
						},
						success : function(response, options) {
							var o = Ext.JSON.decode(response.responseText);
							if (!o.success) {
								Ext.Msg.alert('提示', '删除失败！');
							} else {
								// Ext.Msg.alert('提示', '删除成功！');
								Ext.getCmp(flowdoclistTabid).getStore()
										.reload();
							}
						}
					})
		}

	});
}