

// Ext.form.Field.prototype.msgTarget='side';

/*
 * qtip-当鼠标移动到控件上面时显示提示 title-在浏览器的标题显示，但是测试结果是和qtip一样的 under-在控件的底下显示错误提示
 * side-在控件右边显示一个错误图标，鼠标指向图标时显示错误提示. 默认值. id-[element id]错误提示显示在指定id的HTML元件中
 */

/**
 * 编辑用户信息
 * 
 * @param {}
 *            id 用户ID
 * @param {}
 *            name 用户姓名
 */
function useradd() {
	var userBaseForm = new Ext.FormPanel({
				id : 'userBaseForm',
				labelWidth : 75,
				border : false,
				width : 350,

				items : {
					xtype : 'tabpanel',
					activeTab : 0,
					border : false,
					defaults : {
						autoHeight : true,
						bodyStyle : 'padding:10px'
					},
					items : [{
						title : grooveTranslator.getLangLabel('user-language',
								'form-basic'),
						layout : 'form',
						defaults : {
							width : 230
						},
						defaultType : 'textfield',

						items : [{
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-name'),
							name : 'uname',
							emptyText : grooveTranslator.getLangLabel('user-language',
									'form-name-emptytext'),
							allowBlank : false
						}, {
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-logid'),
							vtype : 'alphanum',
							allowBlank : false,
							emptyText : grooveTranslator.getLangLabel('user-language',
									'form-logid-emptytext'),
							name : 'logid'
						}, {
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-pwd'),
							inputType : 'password',
							allowBlank : false,
							id : 'pwd',
							name : 'pwd'
						}, {
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-cfmpwd'),
							inputType : 'password',
							allowBlank : false,
							id : 'pwd1',
							name : 'pwd1',
							vtype : "password",
							confirmTo : {
								confirmTo : "pwd",
								formId : 'userBaseForm'
							}
						}, new Ext.form.RadioGroup({
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'form-sex'),
									// //RadioGroup.fieldLabel 标签与
									// Radio.boxLabel 标签区别
									items : [new Ext.form.Radio({ // 以上相同
										id : "branch1",
										boxLabel : grooveTranslator
												.getLangLabel('user-language',
														'form-sex-male'),
										name : "sex",
										inputValue : grooveTranslator
												.getLangLabel('user-language',
														'form-sex-male'),
										checked : 'checked',
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 三个必须项
										id : "branch0",
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : grooveTranslator
												.getLangLabel('user-language',
														'form-sex-female'), // Radio标签
										name : "sex", // 用于form提交时传送的参数名
										inputValue : grooveTranslator
												.getLangLabel('user-language',
														'form-sex-female'), // 提交时传送的参数值
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									})]
								}), new Ext.form.DateField({
									id : 'birthday',
									name : 'birthday',
									format : 'Y-m-d',
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'form-birthday')
								}), {
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-phone'),
							name : 'uphone'
						}, {
							fieldLabel : grooveTranslator.getLangLabel('user-language',
									'form-email'),
							vtype : "email",
							vtypeText : grooveTranslator.getLangLabel('user-language',
									'form-email-emptytext'),
							name : 'uemail'
						}]
					}, {
						title : grooveTranslator.getLangLabel('user-language',
								'form-detail'),
						layout : 'form',
						defaults : {
							width : 230
						},
						defaultType : 'textfield',

						items : [
								{
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'form-code'),
									name : 'unumber'
								},
								getGCombo(grooveTranslator.getLangLabel('user-language',
												'form-group'), 'gid', 'gname',
										''),
								{
									xtype : 'hidden',
									id : 'gid',
									name : 'gid'
								},
								getWBComboStore('user-rating', '', 'grating_',
										grooveTranslator.getLangLabel('user-language',
												'form-rating'), 'rating', null,
										'0'),
								{
									xtype : 'hidden',
									name : 'rating',
									id : 'rating'
								},
								getWBComboStore('job', '', 'job_',
										grooveTranslator.getLangLabel('user-language',
												'form-job'), 'job', null, ''),
								{
									xtype : 'hidden',
									name : 'job',
									id : 'job'
								},
								{
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'form-idx'),
									regex : /^[1-9]\d*$/,
									regexText : grooveTranslator.getLangLabel(
											'user-language', 'form-idx-regextext'),
									name : 'disporder',
									id : 'disporder',
									value : '99'
								},
								getWBComboStore('user-workstatus', '',
										'workstatus_', grooveTranslator
												.getLangLabel('user-language',
														'form-status'),
										'workstatus', 'workstatuslabel', '0',
										true), {
									xtype : 'hidden',
									id : 'workstatus',
									name : 'workstatus',
									value : '0'
								}, {
									xtype : 'hidden',
									id : 'workstatuslabel',
									name : 'workstatuslabel',
									value : grooveTranslator.getLangLabel(
											'user-language', 'form-status-normal')
								}, {
									xtype : 'hidden',
									id : 'flag',
									name : 'flag',
									value : '0'
								}]
					}]
				}
			});

	var addUserWin = new Ext.Window({
		renderTo : Ext.getBody(),
		id : 'addUserWin',
		layout : 'fit',
		width : 500,
		height : 400,
		title : grooveTranslator.getLangLabel('user-language', 'form-title'),
		plain : true,
		modal : true,

		items : [userBaseForm],

		buttons : [{
			id : 'userSaveButton',
			text : grooveTranslator.getLangLabel('common-language', 'submit'),
			handler : function() {
				if (userBaseForm.getForm().isValid()) {

					Ext.MessageBox.wait(grooveTranslator.getLangLabel(
							'common-language', 'submit-loading'));

					userBaseForm.getForm().submit({
						url : context + '/system/user.do?method=save',
						method : 'POST',
						params : countUserGroupItem(),
						success : function(form, action) {
							Ext.MessageBox.hide();
							Ext.getCmp("userSaveButton").setDisabled(false);
							Ext.MessageBox.confirm(grooveTranslator
											.getLangLabel('common-language',
													'prompt'), grooveTranslator
											.getLangLabel('user-language',
													'form-success-confirm'),
									keepAddUser);
						},
						failure : function(form, action) {
							Ext.MessageBox.hide();
							Ext.getCmp("userSaveButton").setDisabled(false);
							if (action.result.errCode == '-1') {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel('user-language',
												'form-failure-error'));
							} else if (action.result.errCode == '0') {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel('user-language',
												'form-failure-invalidlogid'));
							} else if (action.result.errCode == '1') {
								Ext.Msg
										.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator
														.getLangLabel('user-language',
																'form-failure-reduplicatelogid'));
							} else {
								Ext.Msg
										.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator
														.getLangLabel('user-language',
																'form-failure-indecisiveerror'));
							}
						}
					});
				} else {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('user-language',
									'form-failure-invalidinput'));
				}
			}
		}, {
			text : grooveTranslator.getLangLabel('common-language', 'close'),
			handler : function() {
				addUserWin.close();
				addUserWin = null;
			}
		}]
	});

	addUserWin.show(this);
}

/**
 * 计算关联组设置
 */
function countUserGroupItem() {
	var paramsJson = {
		gid_0 : Ext.getCmp("gid").getValue(),
		upt_0 : '0',
		upj_0 : Ext.getCmp("job").getValue(),
		upr_0 : Ext.getCmp("rating").getValue(),
		upo_0 : Ext.getCmp("disporder").getValue(),
		countP : parseCounterName(1)
	}

	return paramsJson;
}

function keepAddUser(btn) {
	if (btn == 'yes') {
		Ext.getCmp('addUserWin').close();
		useradd();
	} else {
		Ext.getCmp('addUserWin').close();
	}

	reloadUserListStore();
}