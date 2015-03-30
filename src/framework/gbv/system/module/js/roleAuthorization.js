function showRoleAuthorization(options) {
	var roleListGrid = initRoleListGrid();
	var operatePanel = initOperatePanel();
	var moduleTree = initRoleModuleTree();
	var userListGrid = initUserListGrid();
	var showWin = new Ext.Window({
				title : grooveTranslator.getLangLabel('module-language',
						'authorize-title'),
				id : 'showRoleAuthWin',
				width : 1000,
				height : 600,
				layout : 'border',
				modal : true,
				items : [{
							region : 'center',
							border : false,
							frame : false,
							layout : 'accordion',
							items : [roleListGrid, userListGrid]
						}, {
							region : 'east',
							border : false,
							width : 300,
							frame : false,
							layout : 'border',
							bodyStyle : 'border-left:1px #ccc solid;',
							items : [operatePanel, moduleTree]
						}],
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'save'),
					handler : function() {
						handleRoleAuth();
					}
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						showWin.close();
						showWin = null;
					}
				}]
			});
	// showWin.add(roleListGrid);
	showWin.show();
}
/**
 * 角色列表
 */
function initRoleListGrid() {
	var pageSize = 20;
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
	roleListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'roleList',
				fields : ['id', 'name', 'memo', 'key', 'raccede', 'rv',
						'rvrating', 'rvtype'],
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/role.do?method=listp'
						})
			});

	roleListGrid = new Ext.grid.GridPanel({
		region : 'center',
		id : 'roleListGrid',
		width : 500,
		store : roleListStore,
		sm : sm,
		closable : true,
		columns : [sm, {
			header : grooveTranslator.getLangLabel('role-language', 'list-key'),
			width : 150,
			sortable : false,
			dataIndex : 'key'
		}, {
			header : grooveTranslator
					.getLangLabel('role-language', 'list-name'),
			width : 150,
			sortable : true,
			dataIndex : 'name'
		}, {
			header : grooveTranslator
					.getLangLabel('role-language', 'list-desc'),
			width : 150,
			sortable : true,
			dataIndex : 'memo'
		}],
		stripeRows : true,
		autoExpandColumn : 'memo',
		title : grooveTranslator.getLangLabel('role-language', 'list-title'),
		border : false,
		viewConfig : {
			forceFit : true
		},
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : grooveTranslator.getLangLabel('common-language',
					'list-loading')
		},
		bbar : new Ext.PagingToolbar({
					pageSize : pageSize,// 每页显示的记录值
					store : roleListStore,
					displayInfo : true,
					displayMsg : grooveTranslator.getLangLabel(
							'common-language', 'list-displaymsg'),
					emptyMsg : grooveTranslator.getLangLabel('common-language',
							'list-emptymsg')
				})
	});

	roleListGrid.on('click', function(e) {

			});

	roleListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return roleListGrid;
}
function initUserListGrid() {
	var pageSize = 20;
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
	var userListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'userList',
				fields : ['id', 'name', 'logid', 'sex', 'number', 'groupName',
						'rating', 'phone', 'flag', 'workstatusLabel'],

				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/user.do?method=list'
						})
			});

	var qname = '';
	var qlogid = '';
	var qnumber = '';

	/* 设置自定义参数 */
	userListStore.on('beforeload', function(thiz, options) {
				Ext.apply(thiz.baseParams, {
							qname : qname,
							qlogid : qlogid,
							qnumber : qnumber
						});
			});

	var userListGrid = new Ext.grid.GridPanel({
		region : 'center',
		id : 'userListGrid',
		store : userListStore,
		closable : true,
		disabled : true,
		sm : sm,
		width : 500,
		columns : [sm, {
			id : 'iname',
			header : grooveTranslator
					.getLangLabel('user-language', 'list-name'),
			width : 75,
			sortable : true,
			dataIndex : 'name'
		}, {
			header : grooveTranslator.getLangLabel('user-language',
					'list-logid'),
			width : 75,
			sortable : true,
			dataIndex : 'logid'
		}, {
			header : grooveTranslator.getLangLabel('user-language',
					'list-number'),
			width : 75,
			sortable : true,
			dataIndex : 'number'
		}, {
			header : grooveTranslator.getLangLabel('user-language',
					'list-group'),
			width : 150,
			sortable : false,
			dataIndex : 'groupName'
		}, {
			header : grooveTranslator.getLangLabel('user-language',
					'list-status'),
			width : 85,
			sortable : false,
			dataIndex : 'workstatusLabel'
		}],
		stripeRows : true,
		autoExpandColumn : 'iname',
		title : grooveTranslator.getLangLabel('user-language', 'list-title'),
		border : false,
		viewConfig : {
			forceFit : true
		},
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : grooveTranslator.getLangLabel('common-language',
					'list-loading')
		},
		tbar : new Ext.Toolbar({
			autoWidth : true,
			autoShow : true,
			items : [{
				iconCls : 'queryUser',
				text : grooveTranslator
						.getLangLabel('common-language', 'query'),
				handler : function() {
					var queryUForm = new Ext.FormPanel({
								id : 'queryUForm',
								labelWidth : 75,
								// overridden
								frame : false,
								bodyStyle : 'padding:5px 5px 0',
								width : 450,
								defaults : {
									width : 330
								},
								defaultType : 'textfield',

								items : [{
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'list-name'),
									id : 'qname',
									name : 'qname'
								}, {
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'list-logid'),
									id : 'qlogid',
									name : 'qlogid'
								}, {
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'list-number'),
									id : 'qnumber',
									name : 'qnumber'
								}]
							});

					queryUForm.getForm().load({
						url : context + '/system/result4form.jsp',
						params : {
							qname : qname,
							qlogid : qlogid,
							qnumber : qnumber
						},

						success : function(form, action) {

						},
						failure : function(form, action) {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'query-setting'));
						}
					});

					var queryUWin = new Ext.Window({
								renderTo : Ext.getBody(),
								layout : 'fit',
								width : 500,
								height : 350,
								title : grooveTranslator.getLangLabel(
										'user-language', 'query-title'),
								resizable : false,
								plain : true,
								modal : true,

								items : [queryUForm],

								buttons : [{
									id : 'userQueryButton',
									text : grooveTranslator.getLangLabel(
											'common-language', 'query'),
									handler : function() {
										qname = Ext.getCmp('qname').getValue();

										qlogid = Ext.getCmp('qlogid')
												.getValue();
										qnumber = Ext.getCmp('qnumber')
												.getValue();

										Ext.getCmp('userListGrid').store
												.reload({
															params : {
																start : 0,
																limit : pageSize,
																qname : qname,
																qlogid : qlogid,
																qnumber : qnumber
															}
														});

										queryUWin.close();
										queryUWin = null;
									}
								}, {
									text : grooveTranslator.getLangLabel(
											'common-language', 'reset'),
									handler : function() {
										queryUForm.getForm().reset();
									}
								}, {
									text : grooveTranslator.getLangLabel(
											'common-language', 'close'),
									handler : function() {
										queryUWin.close();
										queryUWin = null;
									}
								}]
							});

					queryUWin.show(this);
				}
			}]
		}),
		bbar : new Ext.PagingToolbar({
					pageSize : pageSize,// 每页显示的记录值
					store : userListStore,
					displayInfo : true,
					displayMsg : grooveTranslator.getLangLabel(
							'common-language', 'list-displaymsg'),
					emptyMsg : grooveTranslator.getLangLabel('common-language',
							'list-emptymsg')
				})
	});

	userListGrid.on('click', function(e) {

			});

	userListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return userListGrid;
}

/**
 * 同步操作页面
 */
function initOperatePanel() {
	var itType = getWBComboStore(
			'purview-type',
			'',
			'purviewType_combo_',
			grooveTranslator.getLangLabel('module-language', 'authorize-range'),
			'purviewType', 'purviewType_', null, false)

	itType.setValue(grooveTranslator.getLangLabel('module-language',
			'authorize-role'));

	var it = getWBComboStore('purview-visit', '', 'purview_combo_',
			grooveTranslator.getLangLabel('frequence-language', 'purview-title'),
			'purview', 'purview_', null, false);

	// it.disable();

	itType.on('select', function(combo, record, index) {
		if (record.data['purviewType_combo_id'] == '0') {
			Ext.getCmp('roleListGrid').enable();
			Ext.getCmp('roleListGrid').expand();
			Ext.getCmp('userListGrid').disable();
		} else if (record.data['purviewType_combo_id'] == '1') {
			Ext.getCmp('userListGrid').enable();
			Ext.getCmp('userListGrid').expand();
			Ext.getCmp('roleListGrid').disable();
		}

			// it.disable();
		});
	it.on('select', function(combo, record, index) {
		var operateGrid;
		var operateType;
		if (Ext.getCmp('purviewType').getValue() == '0') {
			operateGrid = Ext.getCmp('roleListGrid');
			operateType = 'role';
		} else if (Ext.getCmp('purviewType').getValue() == '1') {
			operateGrid = Ext.getCmp('userListGrid');
			operateType = 'user';
		}
		var sm = operateGrid.getSelectionModel();
		if (sm.getSelected()) {
			var recordSelect = sm.getSelections()[0];

			Ext.Ajax.request({
						url : context
								+ '/system/purview.do?method=rolePurviewList',
						method : 'POST',
						params : {
							rid : recordSelect.data.id,
							purview : record.data['purview_combo_id'],
							purviewType : operateType
						},
						success : function(response, options) {
							var o = Ext.util.JSON.decode(response.responseText);
							if (o.success) {
								form.getForm().findField('objIds')
										.setValue(o.objIds);
								form.getForm().findField('objTypes')
										.setValue(o.objTypes);
								form.getForm().findField('ids').setValue(o.ids);

								Ext.getCmp('moduleMenuTree').getRootNode()
										.reload();
								Ext.getCmp('moduleMenuTree').expandAll();
							} else {
								Ext.MessageBox.alert(grooveTranslator
												.getLangLabel(
														'common-language',
														'prompt'),
										grooveTranslator.getLangLabel(
												'module-language',
												'authorize-loadrole-error'));
							}
						}
					});
		} else {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'module-language', 'authorize-object-alert'));
		}
	});

	var form = new Ext.FormPanel({
				id : 'roleAuthOperateForm',
				region : 'north',
				title : grooveTranslator.getLangLabel('module-language',
						'purview-window-title'),
				labelWidth : 70,
				frame : false,
				border : false,
				height : 90,
				bodyStyle : 'border:0px; padding:10px;',
				defaultType : 'textfield',
				defaults : {
					msgTarget : 'under',
					width : 150
				},
				items : [itType, {
							xtype : 'hidden',
							id : 'purviewType',
							name : 'purviewType',
							value : '0'
						}, {
							xtype : 'hidden',
							id : 'purviewType_',
							name : 'purviewType_'
						}, it, {
							xtype : 'hidden',
							id : 'purview',
							name : 'purview'
						}, {
							xtype : 'hidden',
							id : 'purview_',
							name : 'purview_'
						}, {
							xtype : 'hidden',
							name : 'objIds'
						}, {
							xtype : 'hidden',
							name : 'objTypes'
						}, {
							xtype : 'hidden',
							name : 'ids'
						}

				]
			});

	return form;
}
/**
 * 模块菜单树
 */
function initRoleModuleTree() {
	var treePanel = new Ext.tree.TreePanel({
				id : 'moduleMenuTree',
				region : 'center',
				layout : 'fit',
				width : 80,
				title : grooveTranslator.getLangLabel('module-language',
						'purview-window-title'),
				border : false,
				rootVisible : false,
				useArrows : true,
				autoScroll : true,
				dataUrl : context + '/system/module.do?method=allmoduletree',
				root : new Ext.tree.AsyncTreeNode({
							id : Ext.id(),
							text : 'root',
							checked : false
						}),
				listeners : {
					load : function(node) {
						var roleAuthForm = Ext.getCmp('roleAuthOperateForm');
						for (var j = 0; j < node.childNodes.length; j++) {
							node.childNodes[j].attributes.checked = false;
							if (roleAuthForm) {
								var objIds = roleAuthForm.getForm()
										.findField('objIds').getValue();
								var objTypes = roleAuthForm.getForm()
										.findField('objTypes').getValue();
								if (hasSelectRole(objIds,
										node.childNodes[j].attributes.realid,
										objTypes,
										node.childNodes[j].attributes.type)) {
									// node.childNodes[j].ui.checkbox.checked =
									// true;
									node.childNodes[j].attributes.checked = true;
								}
							}
						}
						if (roleAuthForm) {
							var objIds = roleAuthForm.getForm()
									.findField('objIds').getValue();
							var objTypes = roleAuthForm.getForm()
									.findField('objTypes').getValue();
							if (hasSelectRole(objIds, node.attributes.realid,
									objTypes, node.attributes.type)) {
								// node.ui.checkbox.checked = true;
								node.attributes.checked = true;
							}
						}
					}
				}
			});

	treePanel.expandAll();
	return treePanel;
}

function hasSelectRole(ids, id, types, type) {
	var rnt = false;
	var idstr = ids.split(',');
	var typestr = types.split(',');
	for (var i = 0; i < idstr.length; i++) {
		if (idstr[i] == id && typestr[i] == type) {
			rnt = true;
			break;
		}
	}

	return rnt;
}
/**
 * 处理授权
 */
function handleRoleAuth() {
	var paramsAdd = {};
	var paramsDel = {};
	var countAdd = '';
	var countDel = '';
	var count = 0;
	var noChgObjIds = '';
	var objIds = Ext.getCmp('roleAuthOperateForm').getForm()
			.findField('objIds').getValue();
	var objTypes = Ext.getCmp('roleAuthOperateForm').getForm()
			.findField('objTypes').getValue();
	var ids = Ext.getCmp('roleAuthOperateForm').getForm().findField('ids')
			.getValue();
	var purview = Ext.getCmp('roleAuthOperateForm').getForm()
			.findField('purview').getValue();
	if (purview == null || '' == purview) {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('module-language',
						'authorize-alert'));
	}
	var operateGrid;
	var operateType;
	if (Ext.getCmp('purviewType').getValue() == '0') {
		operateGrid = Ext.getCmp('roleListGrid');
		operateType = 'role';
	} else if (Ext.getCmp('purviewType').getValue() == '1') {
		operateGrid = Ext.getCmp('userListGrid');
		operateType = 'user';
	}
	var sm = operateGrid.getSelectionModel();
	var selectRecord = sm.getSelections()[0];
	var selNodes = Ext.getCmp('moduleMenuTree').getChecked();
	// 取得需要新增的角色授权
	Ext.each(selNodes, function(nd) {
				if (!hasSelectRole(objIds, nd.attributes.realid, objTypes,
						nd.attributes.type)) {
					paramsAdd['rid_' + count] = selectRecord.data.id;
					paramsAdd['rname_' + count] = selectRecord.data.name;
					paramsAdd['rtype_' + count] = operateType;
					paramsAdd['oid_' + count] = nd.attributes.realid;
					paramsAdd['oname_' + count] = nd.text;
					paramsAdd['otype_' + count] = nd.attributes.type;
					if (nd.attributes.type == 'menu')
						paramsAdd['otname_' + count] = 'ISYS_MODULE_MENU';
					else if (nd.attributes.type == 'module')
						paramsAdd['otname_' + count] = 'ISYS_MODULE';
					paramsAdd['uid_' + count] = userId;
					paramsAdd['uname_' + count] = userName;
					paramsAdd['inherit_' + count] = '0';
					paramsAdd['purview_' + count] = purview;

					if (count != 0)
						countAdd = countAdd + ",";
					countAdd = countAdd + count;
					count++;
				} else {
					if (noChgObjIds != '')
						noChgObjIds = noChgObjIds + ",";
					noChgObjIds = noChgObjIds + nd.attributes.realid;
				}
			});
	paramsAdd.countAdd = countAdd;
	paramsAdd.tableNames = 'ISYS_PURVIEW';
	paramsAdd.handleTypes = 'multi';
	paramsAdd.counterNames = 'countAdd';
	// 取得需要删除的角色授权
	var objIdstr = objIds.split(',');
	var idstr = ids.split(',');
	count = 0;
	for (var i = 0; i < objIdstr.length; i++) {
		if (noChgObjIds.indexOf(objIdstr[i]) == -1) {
			paramsDel['pid_' + count] = idstr[i];
			if (count != 0)
				countDel = countDel + ",";
			countDel = countDel + count;
			count++;
		}
	}
	paramsDel.countDel = countDel;
	paramsDel.tableNames = 'ISYS_PURVIEW';
	paramsDel.handleTypes = 'multi';
	paramsDel.counterNames = 'countDel';

	Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
			'delete-loading'));
	Ext.Ajax.request({
		url : context + "/system/baseworkdelete.do",
		params : paramsDel,
		success : function(response, options) {
			var json = response.responseText;
			var o = Ext.util.JSON.decode(json);
			if (o.success) {
				Ext.MessageBox.wait(grooveTranslator.getLangLabel(
						'common-language', 'submit-loading'));
				Ext.Ajax.request({
							url : context + "/system/baseworksave.do",
							params : paramsAdd,
							success : function(response, options) {
								Ext.MessageBox.hide();
								var json = response.responseText;
								var o = Ext.util.JSON.decode(json);
								if (o.success) {
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'module-language',
													'authorize-success'));
								} else {
									Ext.MessageBox.show({
												title : grooveTranslator
														.getLangLabel(
																'common-language',
																'error'),
												msg : o.msg,
												icon : Ext.MessageBox.ERROR
											});
								}
							}
						});
			} else {
				Ext.MessageBox.show({
							title : grooveTranslator.getLangLabel(
									'common-language', 'error'),
							msg : o.msg,
							icon : Ext.MessageBox.ERROR
						});
			}
		}
	});

}