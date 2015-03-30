var editUserWin;

/**
 * 编辑用户信息
 * 
 * @param {}
 *            id 用户ID
 * @param {}
 *            name 用户姓名
 */
function editUser(id, name) {
	if (!editUserWin) {
		editUserWin = null;
	}

	var userBaseForm = initEditUserForm(id, name);

	editUserWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 600,
				height : 450,
				title : grooveTranslator.getLangLabel('user-language',
						'form-title'),
				plain : true,
				modal : true,

				items : [userBaseForm],

				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					handler : handleUpdateUser
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						editUserWin.close();
						editUserWin = null;
					}
				}]
			});

	editUserWin.show(this);
}

function initEditUserForm(id, name) {
	var editUserForm = new Ext.FormPanel({
		id : 'editUserForm',
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
							xtype : 'hidden',
							name : 'uid',
							value : id
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'user-language', 'form-name'),
							name : 'uname',
							// regex : /[\u4e00-\u9fa5]/,
							// regexText : "只能输入中文!",
							emptyText : grooveTranslator.getLangLabel(
									'user-language', 'form-name-emptytext'),
							allowBlank : false
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'user-language', 'form-logid'),
							vtype : 'alphanum',
							allowBlank : false,
							emptyText : grooveTranslator.getLangLabel(
									'user-language', 'form-logid-emptytext'),
							name : 'logid'
						}, new Ext.form.RadioGroup({
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'form-sex'),
									// hideLabel : true, // 隐藏RadioGroup标签
									items : [new Ext.form.Radio({ // 以上相同
										id : "branch1",
										boxLabel : grooveTranslator
												.getLangLabel('user-language',
														'form-sex-male'),
										name : "sex",
										inputValue : grooveTranslator
												.getLangLabel('user-language',
														'form-sex-male'),
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
							fieldLabel : grooveTranslator.getLangLabel(
									'user-language', 'form-phone'),
							name : 'uphone'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'user-language', 'form-email'),
							vtype : "email",
							vtypeText : grooveTranslator.getLangLabel(
									'user-language', 'form-email-emptytext'),
							name : 'uemail'
						}, new Ext.form.RadioGroup({
									fieldLabel : grooveTranslator.getLangLabel(
											'user-language', 'form-flag'),
									// //RadioGroup.fieldLabel 标签与
									// Radio.boxLabel 标签区别
									// width : "200",
									// hideLabel : true, // 隐藏RadioGroup标签
									items : [new Ext.form.Radio({ // 三个必须项
										id : "flag0",
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : grooveTranslator
												.getLangLabel('user-language',
														'form-flag-valid'), // Radio标签
										name : "flag", // 用于form提交时传送的参数名
										inputValue : "0", // 提交时传送的参数值
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : "flag1",
										boxLabel : grooveTranslator
												.getLangLabel('user-language',
														'form-flag-invalid'),
										name : "flag",
										inputValue : "-1",
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
								})]
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
						getGCombo(grooveTranslator.getLangLabel(
										'user-language', 'form-group'), 'gid',
								'gname', ''),
						{
							xtype : 'hidden',
							id : 'gid',
							name : 'gid'
						},
						getWBComboStore('user-rating', '', 'grating_',
								grooveTranslator.getLangLabel('user-language',
										'form-rating'), 'rating', null, '0'),
						{
							xtype : 'hidden',
							name : 'rating',
							id : 'rating'
						},
						getWBComboStore('job', '', 'job_', grooveTranslator
										.getLangLabel('user-language',
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
						getWBComboStore('user-workstatus', '', 'workstatus_',
								grooveTranslator.getLangLabel('user-language',
										'form-status'), 'workstatus',
								'workstatuslabel', '0', true), {
							xtype : 'hidden',
							id : 'workstatus',
							name : 'workstatus'
						}, {
							xtype : 'hidden',
							id : 'workstatuslabel',
							name : 'workstatuslabel'
						}]
			}]
		}
	});

	editUserForm.getForm().load({
		url : context + '/system/user.do?method=edit',
		params : {
			id : id
		},
		waitTitle : grooveTranslator.getLangLabel('common-language', 'prompt'),
		waitMsg : grooveTranslator.getLangLabel('common-language',
				'list-loading'),
		animEl : 'loding',
		success : function(form, action) {
			var resultInfo = listSimpleJson(action.result.data);

			/* 性别 */
			var gbranch = resultInfo.get("sex");

			if (gbranch == grooveTranslator.getLangLabel('user-language',
					'form-sex-female')) {
				Ext.get("branch0").dom.checked = true;
			} else if (gbranch == grooveTranslator.getLangLabel(
					'user-language', 'form-sex-male')) {
				Ext.get("branch1").dom.checked = true;
			}

			/* 有效性 */
			var flag = resultInfo.get("flag");

			if (flag == "0") {
				Ext.get("flag0").dom.checked = true;
			} else if (flag == "-1") {
				Ext.get("flag1").dom.checked = true;
			}
			// Ext.getCmp('garea_').setValue(resultInfo.get("garea"));
			// Ext.getCmp('grating_').setValue(resultInfo.get("grating"));
		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('user-language',
					'edit-load-error'));
		}
	});

	return editUserForm;
}

function handleUpdateUser() {
	if (Ext.getCmp("editUserForm").getForm().isValid()) {
		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'submit-loading'));

		Ext.getCmp("editUserForm").getForm().submit({
			url : context + '/system/user.do?method=update',
			method : "POST",
			params : countUpdateUserGroupItem(),
			success : function(form, action) {
				Ext.MessageBox.hide();
				Ext.MessageBox.alert(grooveTranslator.getLangLabel(
								'common-language', 'prompt'), grooveTranslator
								.getLangLabel('user-language', 'edit-success'),
						function() {
							reloadUserListStore();
						});

			},
			failure : function(form, action) {
				Ext.MessageBox.hide();
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
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('user-language',
									'form-failure-reduplicatelogid'));
				} else {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('user-language',
									'form-failure-indecisiveerror'));
				}
			}
		});
	} else {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('user-language',
						'form-failure-invalidinput'));
	}
}

/**
 * 计算
 * 
 * @return {}
 */
function countUpdateUserGroupItem() {
	var paramsJson = {
		gid_0 : Ext.getCmp("gid").getValue(),
		uid_0 : Ext.getCmp("editUserForm").getForm().findField("uid")
				.getValue(),
		upt_0 : '0',
		upj_0 : Ext.getCmp("job").getValue(),
		upr_0 : Ext.getCmp("rating").getValue(),
		upo_0 : Ext.getCmp("disporder").getValue(),
		countP : parseCounterName(1)
	}

	return paramsJson;
}