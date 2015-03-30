var userListGrid;
var userListArea;
var userListTab;
var userListStore;
var pageSize = 20;

/* 查询项设置 */
var qname;
var qgid;
var qgname;
var qlogid;
var qnumber;
var qtype;
var qtypename;
var qflag;
var qarea;
var qareaname;
var qworkstatus;
var qworkstatuslabel;

/**
 * 重置参数值
 */
function renewQueryParam() {
	qname = "";
	qgid = "";
	qgname = "";
	qlogid = "";
	qnumber = "";
	qtype = "";
	qtypename = "";
	qflag = "";
	qarea = "";
	qareaname = "";
	qworkstatus = "";
	qworkstatuslabel = "";
}

function userlist(tabid) {
	renewQueryParam();

	userListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'userList',
				fields : ['id', 'name', 'logid', 'sex', 'number', 'groupName',
						'rating', 'phone', 'flag', 'workstatusLabel', 'roles'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/user.do?method=list'
						})
			});
	// userListStore.setDefaultSort('name', 'desc');

	userListGrid = new Ext.grid.GridPanel({
		id : tabid,
		store : userListStore,
		closable : true,
		layout : 'fit',
		columns : [{
					id : 'iname',
					header : grooveTranslator.getLangLabel('user-language', 'list-name'),
					width : 75,
					sortable : true,
					dataIndex : 'name',
					renderer : renderName
				}, {
					header : grooveTranslator
							.getLangLabel('user-language', 'list-logid'),
					width : 75,
					sortable : true,
					dataIndex : 'logid'
				}, {
					header : grooveTranslator.getLangLabel('user-language', 'list-sex'),
					width : 75,
					sortable : false,
					dataIndex : 'sex'
				}, {
					header : grooveTranslator.getLangLabel('user-language',
							'list-number'),
					width : 75,
					sortable : true,
					dataIndex : 'number'
				}, {
					header : grooveTranslator
							.getLangLabel('user-language', 'list-group'),
					width : 150,
					sortable : false,
					dataIndex : 'groupName'
				}, {
					header : grooveTranslator.getLangLabel('user-language',
							'list-rating'),
					width : 85,
					sortable : true,
					dataIndex : 'rating'
				}, {
					header : grooveTranslator
							.getLangLabel('user-language', 'list-phone'),
					width : 85,
					sortable : false,
					dataIndex : 'phone'
				}, {
					header : grooveTranslator.getLangLabel('user-language',
							'list-status'),
					width : 85,
					sortable : false,
					dataIndex : 'workstatusLabel'
				}, {
					header : grooveTranslator.getLangLabel('user-language', 'list-role'),
					width : 150,
					sortable : false,
					dataIndex : 'roles',
					renderer : renderUserRolesLabel
				}, {
					header : '&nbsp;',
					width : 85,
					sortable : true,
					dataIndex : 'id',
					renderer : renderHD
				}],
		stripeRows : true,
		autoExpandColumn : 'iname',
		bodyStyle : 'width:100%',
		autoWidth : true,
		autoScroll : true,
		title : grooveTranslator.getLangLabel('user-language', 'list-title'),
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
		tbar : new Ext.Toolbar({
			autoWidth : true,
			autoShow : true,
			items : [{
				iconCls : 'addUser',
				text : grooveTranslator.getLangLabel('user-language', 'tbar-createuser'),
				handler : useradd
			}, {
				iconCls : 'queryUser',
				text : grooveTranslator.getLangLabel('user-language', 'tbar-searchuser'),
				handler : handleQueryUser
			}, '-', {
				id : 'delUserButton',
				iconCls : 'delUser',
				text : grooveTranslator.getLangLabel('user-language', 'tbar-deleteuser'),
				disabled : true,
				handler : handleDelUser
			}, '-', {
				id : 'partUserButton',
				iconCls : 'partUser',
				text : grooveTranslator.getLangLabel('user-language', 'tbar-parttime'),
				disabled : true,
				handler : handlePartUser
			}, '-', {
				id : 'assignUserButton',
				iconCls : 'accessmodule',
				text : grooveTranslator
						.getLangLabel('user-language', 'tbar-userpurview'),
				disabled : true,
				handler : function() {
					var ids = '';
					var names = '';
					var otypes = '';
					var selectedNodes = userListGrid.getSelectionModel()
							.getSelections();
					for (var i = 0; i < selectedNodes.length; i++) {
						if (i < selectedNodes.length - 1) {
							ids += selectedNodes[i].data.id + ',';
							names += selectedNodes[i].data.name + ',';
							otypes += 'user,';
						} else {
							ids += selectedNodes[i].data.id;
							names += selectedNodes[i].data.name;
							otypes += 'user';
						}
					}

					handleAccessModule(ids, names, otypes);
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

	// Ext.getDom('test').value
	// render the grid to the specified div in the page
	// userListGrid.render(areaid);

	userListGrid.on('click', function() {
				if (userListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delUserButton').enable();
					Ext.getCmp('partUserButton').enable();
					Ext.getCmp('assignUserButton').enable();
				} else {
					Ext.getCmp('delUserButton').disable();
					Ext.getCmp('partUserButton').disable();
					Ext.getCmp('assignUserButton').disable();
				}
			});

	/* 设置自定义参数 */
	userListStore.on('beforeload', function(thiz, options) {
				resetUserListView();
				Ext.apply(thiz.baseParams, {
							qname : qname,
							qgid : qgid,
							qlogid : qlogid,
							qnumber : qnumber,
							qtype : qtype,
							qarea : qarea,
							qflag : qflag
						});
			});

	userListGrid.setIconClass('tabs');

	userListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return userListGrid;
}

function renderName(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:editUser(\'{1}\', \'{0}\');">{0}</a></b>',
					value, record.data.id);
	if (record.data.flag == "-1") {
		resultString = String
				.format(
						'<b><a href="javascript:void(0);" onclick="javascript:editUser(\'{1}\', \'{0}\');"><font color="red">{0}</font></a></b>',
						value, record.data.id);
	}

	return resultString;
}

/**
 * 重置用户密码(000000)
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
function renderHD(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:restPWD(\'{1}\', \'{0}\');">'
							+ grooveTranslator.getLangLabel('user-language',
									'list-resetpwd') + '</a></b>',
					record.data.name, record.data.id);

	return resultString;
}

function renderUserRolesLabel(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	if (value != null && value != '') {
		var vlu = '';
		var str = value.split(',');
		if (str.length > 0) {
			for (var i = 0; i < str.length; i++) {
				if (i == str.length - 1) {
					vlu += '<span>' + str[i] + '</span>';
				} else {
					vlu += '<span style="padding-bottom:2px;">' + str[i]
							+ '</span><br/>';
				}
			}
		}
		return vlu;
	}

	return vlu;
}

/**
 * 重置用户密码(000000)
 * 
 * @param {}
 *            id 用户ID
 * @param {}
 *            name 用户姓名
 */
function restPWD(id, name) {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel('user-language',
					'prompt-resetpwd'), function(btn) {
				if (btn == 'yes') {
					Ext.MessageBox.wait(grooveTranslator.getLangLabel(
							'common-language', 'submit-loading'));
					Ext.Ajax.request({
						url : context + "/system/user.do?method=resetpwd",
						method : 'POST',
						async : false,
						params : {
							id : id
						},
						success : function(response, options) {
							var o = Ext.util.JSON.decode(response.responseText);
							if (!o.success) {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel('user-language',
												'resetpwd-failure'));
							} else {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel('user-language',
												'resetpwd-success'));
							}
						}
					});
				}
			});
}

var queryUserWin;
var queryUserForm

function handleQueryUser() {
	if (queryUserWin) {
		queryUserWin = null;
	}

	queryUserForm = new Ext.FormPanel({
				labelWidth : 75, // label settings here cascade unless
				// overridden
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				width : 450,
				defaults : {
					width : 330
				},
				defaultType : 'textfield',

				items : [
						{
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-name'),
							id : 'qname',
							name : 'qname'
						},
						{
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-logid'),
							id : 'qlogid',
							name : 'qlogid'
						},
						{
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-code'),
							id : 'qnumber',
							name : 'qnumber'
						},
						getWBComboStore('user-rating', '', 'qrating_',
								grooveTranslator.getLangLabel('user-language',
										'form-rating'), 'qtype', null, '', true),
						{
							xtype : 'hidden',
							name : 'qtype',
							id : 'qtype'
						},
						getWBComboStore('area', '', 'qarea_', grooveTranslator
										.getLangLabel('user-language', 'query-area'),
								'qarea', null, '', true),
						{
							xtype : 'hidden',
							name : 'qarea',
							id : 'qarea'
						},
						getGCombo(grooveTranslator.getLangLabel('user-language',
										'form-group'), 'qgid', null, '', true),
						{
							xtype : 'hidden',
							id : 'qgid',
							name : 'qgid'
						},
						new Ext.form.RadioGroup({
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'form-flag'),
									// //RadioGroup.fieldLabel 标签与
									// Radio.boxLabel 标签区别
									// width : "200",
									// hideLabel : false, // 隐藏RadioGroup标签
									items : [new Ext.form.Radio({ // 三个必须项
										id : "qflag0",
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : grooveTranslator
												.getLangLabel('user-language',
														'form-flag-valid'), // Radio标签
										name : "qflag", // 用于form提交时传送的参数名
										inputValue : "0", // 提交时传送的参数值
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : "qflag1",
										boxLabel : grooveTranslator
												.getLangLabel('user-language',
														'form-flag-invalid'),
										name : "qflag",
										inputValue : "-1",
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
								}),
						getWBComboStore('user-workstatus', '', 'qworkstatus_',
								grooveTranslator.getLangLabel('user-language',
										'form-status'), 'qworkstatus', null,
								'0', true), {
							xtype : 'hidden',
							id : 'qworkstatus',
							name : 'qworkstatus'
						}]
			});

	queryUserForm.getForm().load({
		url : context + '/system/result4form.jsp',
		params : {
			qname : qname,
			qgid : qgid,
			qgid_ : qgname,
			qlogid : qlogid,
			qnumber : qnumber,
			qtype : qtype,
			qrating_ : qtypename,
			qarea : qarea,
			qarea_ : qareaname,
			qflag : qflag,
			qworkstatus : qworkstatus,
			qworkstatus_ : qworkstatuslabel
		},
		success : function(form, action) {
			var resultInfo = listSimpleJson(action.result.data);

			/* 有效性 */
			var qflag = resultInfo.get("qflag");

			if (qflag == "0") {
				Ext.get("qflag0").dom.checked = true;
			} else if (qflag == "-1") {
				Ext.get("qflag1").dom.checked = true;
			}
		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('user-language', 'query-alert'));
		}
	});

	queryUserWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 500,
				height : 350,
				title : grooveTranslator.getLangLabel('user-language', 'query-title'),
				resizable : false,
				plain : true,
				modal : true,

				items : [queryUserForm],

				buttons : [{
					id : 'userQueryButton',
					text : grooveTranslator.getLangLabel('common-language',
							'query'),
					handler : function() {
						qname = Ext.getCmp('qname').getValue();
						qgid = Ext.getCmp('qgid').getValue();
						qgname = Ext.getCmp('qgid_').getValue();
						qlogid = Ext.getCmp('qlogid').getValue();
						qnumber = Ext.getCmp('qnumber').getValue();
						qtype = Ext.getCmp('qtype').getValue();
						qtypename = Ext.getCmp('qrating_').getRawValue();
						qarea = Ext.getCmp('qarea').getValue();
						qareaname = Ext.getCmp('qarea_').getRawValue();
						qworkstatus = Ext.getCmp('qworkstatus').getValue();
						qworkstatuslabel = Ext.getCmp('qworkstatus_')
								.getRawValue();

						qflag = '';

						if (Ext.get("qflag0").dom.checked) {
							qflag = '0';
						} else if (Ext.get("qflag1").dom.checked) {
							qflag = '-1';
						}
						userListStore.reload({
									params : {
										start : 0,
										limit : pageSize,
										qname : qname,
										qgid : qgid,
										qlogid : qlogid,
										qnumber : qnumber,
										qtype : qtype,
										qarea : qarea,
										qflag : qflag,
										qworkstatus : qworkstatus
									}
								});
						queryUserWin.close();
						queryUserWin = null;
					}
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'reset'),
					handler : function() {
						queryUserForm.getForm().reset();
					}
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						queryUserWin.close();
						queryUserWin = null;
					}
				}]
			});

	queryUserWin.show(this);
}

/**
 * 重置用户列表视图
 * 
 * 
 */
function resetUserListView() {
	/* 取消已选择数据 */
	// userListGrid.getSelectionModel().clearSelections();
	/* 删除按钮置无效 */
	// Ext.getCmp('delUserButton').disable();
	// Ext.getCmp('partUserButton').disable();
}

function handleDelUser() {
	if (userListGrid.getSelectionModel().hasSelection()) {
		Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
						'prompt'), grooveTranslator.getLangLabel('user-language',
						'delete-prompt'), deleteUser);
	} else {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('user-language', 'delete-alert'));
	}
}

function handlePartUser() {
	if (userListGrid.getSelectionModel().hasSelection()) {
		var selectedNodes = userListGrid.getSelectionModel().getSelections();
		var userid = selectedNodes[0].data.id;
		editUserPart(userid, selectedNodes[0].data.name);
	}
}

/**
 * 重载用户列表store
 */
function reloadUserListStore() {
	if (userListStore) {
		userListStore.reload({
					start : 0,
					limit : pageSize
				});
	}
}

function deleteUser(btn) {
	if (btn == 'yes') {
		var ids = "";
		var selectedNodes = userListGrid.getSelectionModel().getSelections();
		for (var i = 0; i < selectedNodes.length; i++) {
			if (i < selectedNodes.length - 1) {
				ids += selectedNodes[i].data.id + ",";
			} else {
				ids += selectedNodes[i].data.id;
			}
		}

		Ext.Ajax.request({
					url : context + "/system/user.do?method=delete",
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
									grooveTranslator.getLangLabel('user-language',
											'delete-failure'));
						} else {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel('user-language',
											'delete-success'));
							reloadUserListStore();
						}
					}
				})
	}
}