var numberlistTabid;

/**
 * 工作流程列表
 * 
 * @return {}
 */
function flownumberlist(tabid) {
	numberlistTabid = tabid;

	var store = new Ext.data.JsonStore({
				root : 'numberList',
				totalProperty : 'totalCount',
				idProperty : 'PKID',
				remoteSort : true,

				fields : ['PAGINATION_NUMBER', 'PKID', 'NUMBER_NAME',
						'NUMBER_KEY', 'OBJ_ID', 'OBJ_NAME', 'OBJ_TYPE',
						'WOBJECT'],
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/flowmanage.do?method=numberlist'
						})
			});

	function renderTopic(value, p, record) {
		return String
				.format(
						'<b><a href="javascript:void(0);" onclick="javascript:editNumber(\'{1}\', \'{0}\');">{0}</a></b>',
						value, record.data.PKID);
	}

	var grid = new Ext.grid.GridPanel({
				id : tabid,
				title : '文号管理列表',
				store : store,
				loadMask : true,
				closable : true,
				layout : 'fit',
				// grid columns
				columns : [new Ext.grid.RowNumberer(), {
							id : 'fname',
							header : "文号名称",
							dataIndex : 'NUMBER_NAME',
							align : 'left',
							width : 150,
							renderer : renderTopic,
							sortable : true
						}, {
							id : 'oname',
							header : "流转对象",
							dataIndex : 'WOBJECT',
							align : 'left',
							width : 150,
							sortable : true
						}, {
							header : '对照组',
							dataIndex : 'OBJ_NAME',
							align : 'left',
							width : 150,
							sortable : true
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
				tbar : [{
							text : '文号定义',
							iconCls : 'addflow',
							handler : function() {
								neuNumber();
							}
						}, '-', {
							id : 'delnumberbutton',
							text : '删除文号',
							iconCls : 'delflow',
							disabled : true,
							handler : function() {
								deleteNumber(grid);
							}
						}]
			});

	grid.on('click', function(e) {
				if (grid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delnumberbutton').enable();
				} else {
					Ext.getCmp('delnumberbutton').disable();
				}
			});

	grid.setIconClass('tabs');

	// trigger the data store load
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	return grid;
}

/**
 * 刷新流程列表
 */
function reloadNumberListStore() {
	if (Ext.get(numberlistTabid)) {
		Ext.getCmp(numberlistTabid).getStore().reload();
	}
}

/**
 * 删除操作确认
 * 
 * @param {}
 *            grid
 */
function deleteNumber(grid) {
	if (grid.getSelectionModel().hasSelection()) {
		Ext.MessageBox.confirm('提示', '确定删除文号？', function(btn) {
			if (btn == 'yes') {
				var id;
				var selectedNodes = grid.getSelectionModel().getSelections();

				if (selectedNodes && selectedNodes.length > 0) {
					id = selectedNodes[0].data.PKID;
				}

				Ext.Ajax.request({
					url : context + "/system/flowmanage.do?method=deletenumber",
					method : 'POST',
					async : false,
					params : {
						id : id
					},
					success : function(response, options) {
						var o = Ext.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert('提示', '删除文号失败！');
						} else {
							Ext.Msg.alert('提示', '已成功删除文号！');
							reloadNumberListStore();
						}
					}
				})
			}
		});
	}
}

/**
 * 定义文号
 */
function neuNumber() {
	var objecListCombo = getObjectSelectCombo('流转对象', 'wobject', '', '');
	var groupSelectCombo = getGroupSelectCombo('对照组', 'objid', 'objname', null,
			'root', false);

	var form = new Ext.FormPanel({
				id : 'neunumberForm',
				frame : true,
				monitorValid : true,// 把有formBind:true的按钮和验证绑定
				layout : "form",
				labelAlign : "left",
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
							fieldLabel : '文号名称',
							id : 'nname',
							name : 'nname',
							maxLength : 25,
							allowBlank : false
						}, {
							xtype : 'hidden',
							fieldLabel : '文号标识',
							id : 'nkey',
							name : 'nkey'
						}, groupSelectCombo, objecListCombo, {
							xtype : 'hidden',
							id : 'wobject',
							name : 'wobject'
						}, {
							xtype : 'hidden',
							id : 'objid',
							name : 'objid'
						}, {
							xtype : 'hidden',
							id : 'objname',
							name : 'objname'
						}, {
							xtype : 'hidden',
							id : 'objtype',
							name : 'objtype',
							value : 'GROUP'
						}]
			});

	var neuNumberWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 500,
				height : 300,
				title : '文号定义',
				plain : true,
				modal : true,
				maximizable : false,
				items : [form],

				buttons : [{
					id : 'numberSaveButton',
					text : '提 交',
					handler : function() {
						if (form.getForm().isValid()) {
							Ext.getCmp('numberSaveButton').setDisabled(true);
							Ext.MessageBox.wait('提交保存过程中...');

							form.getForm().submit({
								url : context
										+ '/system/flowmanage.do?method=savenumber',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									Ext.Msg.alert('提示', '已保存文号定义！');
									reloadNumberListStore();
									neuNumberWin.close();
									neuNumberWin = null;
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									Ext.getCmp('numberSaveButton')
											.setDisabled(false);

									if (!action.result) {
										Ext.Msg.alert('提示', '未知的异常错误！');
									} else if (action.result.result == '0') {
										Ext.Msg.alert('提示', '文号定义重复，请重新定义！');
									} else if (action.result.result == '-1') {
										Ext.Msg.alert('提示', '提交保存文号定义发生错误！');
									}
								}
							});
						}
					}
				}, {
					text : '关 闭',
					handler : function() {
						neuNumberWin.close();
						neuNumberWin = null;
					}
				}]
			});

	neuNumberWin.show();
}

function editNumber(id, name) {
	var objecListCombo = getObjectSelectCombo('流转对象', 'wobject', 'wobjectName',
			'');
	var groupSelectCombo = getGroupSelectCombo('对照组', 'objid', 'objname', null,
			'root', false);

	var form = new Ext.FormPanel({
				frame : true,
				monitorValid : true,// 把有formBind:true的按钮和验证绑定
				layout : "form",
				labelAlign : "left",
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
							xtype : 'hidden',
							fieldLabel : '主键',
							id : 'pkid',
							name : 'pkid'
						}, {
							fieldLabel : '文号名称',
							id : 'nname',
							name : 'nname',
							maxLength : 25,
							allowBlank : false
						}, {
							xtype : 'hidden',
							fieldLabel : '文号标识',
							id : 'nkey',
							name : 'nkey'
						}, groupSelectCombo, objecListCombo, {
							xtype : 'hidden',
							id : 'wobject',
							name : 'wobject'
						}, {
							xtype : 'hidden',
							id : 'wobjectName',
							name : 'wobjectName'
						}, {
							xtype : 'hidden',
							id : 'objid',
							name : 'objid'
						}, {
							xtype : 'hidden',
							id : 'objname',
							name : 'objname'
						}, {
							xtype : 'hidden',
							id : 'objtype',
							name : 'objtype'
						}]
			});

	form.getForm().load({
				url : context + '/system/flowmanage.do?method=editnumber',
				params : {
					id : id
				},
				waitTitle : '提示',
				waitMsg : '正在加载数据,请稍候...',
				animEl : "loding",
				success : function(form, action) {
					// Ext.getCmp('_oname').setValue(action.result.data.wobject);
					// Ext.getCmp('_gname').setValue(action.result.data.objid);
					// Ext.getCmp('garea_').setValue(resultInfo.get("garea"));
					// Ext.getCmp('grating_').setValue(resultInfo.get("grating"));
				},
				failure : function(form, action) {
					Ext.Msg.alert('读取组信息失败');
				}
			});

	var neuNumberWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 500,
				height : 300,
				title : '文号编辑',
				plain : true,
				modal : true,
				maximizable : false,
				items : [form],

				buttons : [{
					id : 'numberSaveButton',
					text : '提 交',
					handler : function() {
						if (form.getForm().isValid()) {
							Ext.getCmp('numberSaveButton').setDisabled(true);
							Ext.MessageBox.wait('提交保存过程中...');

							form.getForm().submit({
								url : context
										+ '/system/flowmanage.do?method=updatenumber',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									Ext.Msg.alert('提示', '修改操作成功！');
									reloadNumberListStore();
									neuNumberWin.close();
									neuNumberWin = null;
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									Ext.getCmp('numberSaveButton')
											.setDisabled(false);

									if (!action.result) {
										Ext.Msg.alert('提示', '未知的异常错误！');
									} else if (action.result.result == '0') {
										Ext.Msg.alert('提示', '文号定义重复，请重新定义！');
									} else if (action.result.result == '-1') {
										Ext.Msg.alert('提示', '提交保存文号定义发生错误！');
									}
								}
							});
						}
					}
				}, {
					text : '关 闭',
					handler : function() {
						neuNumberWin.close();
						neuNumberWin = null;
					}
				}]
			});

	neuNumberWin.show();
}