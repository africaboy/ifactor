var editroleWin;

function editrole(id, name) {
	if (editroleWin) {
		editroleWin = null;
	}

	var editroleForm = new Ext.FormPanel({
		id : 'editroleForm',
		labelWidth : 75, // label settings here cascade unless
		// overridden
		frame : false,
		bodyStyle : 'padding:5px 5px 0',
		width : 350,
		defaults : {
			width : 230
		},
		defaultType : 'textfield',

		items : [{
					xtype : 'hidden',
					name : 'rid',
					id : 'rid'
				}, {
					fieldLabel : grooveTranslator.getLangLabel('role-language',
							'form-name'),
					id : 'rname',
					name : 'rname',
					emptyText : grooveTranslator.getLangLabel('role-language',
							'form-name-emptytext'),
					allowBlank : false
				}, {
					fieldLabel : grooveTranslator.getLangLabel('role-language',
							'form-key'),
					id : 'rkey',
					name : 'rkey',
					emptyText : grooveTranslator.getLangLabel('role-language',
							'form-key-emptytext'),
					allowBlank : false
				}, {
					fieldLabel : grooveTranslator.getLangLabel('role-language',
							'form-desc'),
					xtype : 'textarea',
					id : 'rmemo',
					name : 'rmemo'
				}, {
					xtype : 'hidden',
					name : 'rrv',
					id : 'rrv',
					value : '1'
				}, {
					xtype : 'fieldset',
					id : 'rroleset',
					checkboxToggle : true,
					onCheckClick : function() {
						clickRoleSet('rroleset', 'vroleset');
					},
					title : grooveTranslator.getLangLabel('role-language',
							'form-real-yes'),
					autoHeight : true,
					defaultType : 'textfield',
					collapsed : false,
					width : 350,
					labelWidth : 65,
					animCollapse : true,
					defaults : {
						width : 230
					},
					items : [
							{
								fieldLabel : grooveTranslator.getLangLabel(
										'role-language', 'form-raccede'),
								xtype : 'checkbox',
								id : 'raccede1',
								name : 'raccede1'
							},
							{
								xtype : 'hidden',
								id : 'raccede',
								name : 'raccede',
								value : '0'
							},
							getGUChkCombo(grooveTranslator.getLangLabel(
											'role-language', 'form-object'),
									'objids', 'objnames', 'objtypes', '', true),
							{
								xtype : 'hidden',
								id : 'objids',
								name : 'objids'
							}, {
								xtype : 'hidden',
								id : 'objnames',
								name : 'objnames'
							}, {
								xtype : 'hidden',
								id : 'objtypes',
								name : 'objtypes'
							}]
				}, {
					xtype : 'fieldset',
					id : 'vroleset',
					checkboxToggle : true,
					onCheckClick : function() {
						clickRoleSet('vroleset', 'rroleset');
					},
					title : grooveTranslator.getLangLabel('role-language',
							'form-real-no'),
					autoHeight : true,
					defaultType : 'textfield',
					width : 350,
					labelWidth : 65,
					animCollapse : true,
					collapsed : true,
					defaults : {
						width : 230
					},
					items : [
							{
								xtype : 'hidden',
								name : 'rrvtype',
								value : 'U'
							},
							getWBComboStore('user-rating', '', 'grating_',
									grooveTranslator.getLangLabel(
											'role-language',
											'form-object-rating'), 'rrvrating',
									null, '0', true), {
								xtype : 'hidden',
								name : 'rrvrating',
								id : 'rrvrating',
								value : '0'
							}]
				}]
	});

	editroleForm.getForm().load({
		url : context + '/system/role.do?method=edit',
		params : {
			id : id
		},
		success : function(form, action) {
			var resultInfo = listSimpleJson(action.result.data);

			var rkey = resultInfo.get("rkey");

			/* 系统管理员角色唯一标识不可编辑 */
			if (rkey == 'admin') {
				Ext.getCmp("rkey").getEl().dom.readOnly = true;
			}

			/* 真实/虚拟角色 */
			var rrv = resultInfo.get("rrv");

			if (rrv == "0") {
				Ext.getCmp("vroleset").checkbox.dom.checked = true;
				Ext.getCmp("vroleset").expand();
				Ext.getCmp("rroleset").checkbox.dom.checked = false;
				Ext.getCmp("rroleset").collapse();
			} else if (rrv == "1") {
				Ext.getCmp("rroleset").checkbox.dom.checked = true;
				Ext.getCmp("rroleset").expand();
				Ext.getCmp("vroleset").checkbox.dom.checked = false;
				Ext.getCmp("vroleset").collapse();
			}

			Ext.getCmp('objids_').setValue(resultInfo.get('_gname'));

			/* 角色组继承 */
			var raccede = resultInfo.get("raccede");

			if (raccede == "1") {
				Ext.getCmp("raccede1").el.dom.checked = true;
			}
		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('role-language',
					'edit-load-error'));
		}
	});

	editroleWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 500,
				title : grooveTranslator.getLangLabel('role-language',
						'form-title'),
				resizable : false,
				plain : true,
				modal : true,

				items : [editroleForm],

				buttons : [{
					id : 'roleEditButton',
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					handler : handleUpdateRole
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						editroleWin.close();
						editroleWin = null;
					}
				}]
			});

	editroleWin.show(this);
}

function clickRoleSet(fset, sset) {
	// thizz[thizz.checkbox.dom.checked ? 'expand' : 'collapse']();
	if (Ext.getCmp(fset).checkbox.dom.checked) {
		Ext.getCmp(fset)['expand']();
		Ext.getCmp(sset)['collapse']();
	} else if (!Ext.getCmp(fset).checkbox.dom.checked) {
		Ext.getCmp(fset)['collapse']();
		Ext.getCmp(sset)['expand']();
	}
}

function handleUpdateRole() {
	if (Ext.getCmp("editroleForm").getForm().isValid()) {
		var params = {};

		if (Ext.getCmp("rroleset").checkbox.dom.checked
				&& Ext.getCmp("objids").getValue() == '') {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'role-language', 'form-alert-object'));
		} else if (Ext.getCmp("vroleset").checkbox.dom.checked
				&& Ext.getCmp("rrvrating").getValue() == '') {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'role-language', 'form-alert-rating'));
		} else {
			if (Ext.getCmp("objids").getValue() != ''
					&& Ext.getCmp("objnames").getValue() != ''
					&& Ext.getCmp("objtypes").getValue() != ''
					&& Ext.getCmp("rroleset").checkbox.dom.checked) {
				countRoleObjectItem(Ext.getCmp("rid").getValue(), Ext
								.getCmp("objids").getValue(), Ext
								.getCmp("objnames").getValue(), Ext
								.getCmp("objtypes").getValue(), params);
			}

			if (Ext.getCmp("rroleset").checkbox.dom.checked) {
				Ext.getCmp("rrv").setValue('1');
			} else if (Ext.getCmp("vroleset").checkbox.dom.checked) {
				Ext.getCmp("rrv").setValue('0');
			}

			if (Ext.getCmp("raccede1").el.dom.checked) {
				Ext.getCmp("raccede").setValue('1');
			} else {
				Ext.getCmp("raccede").setValue('0');
			}

			Ext.getCmp("roleEditButton").setDisabled(true);

			Ext.MessageBox.wait(grooveTranslator.getLangLabel(
					'common-language', 'submit-loading'));

			Ext.getCmp("editroleForm").getForm().submit({
				url : context + '/system/role.do?method=update',
				method : "POST",
				params : params,
				success : function(form, action) {
					Ext.MessageBox.hide();
					Ext.getCmp("roleEditButton").setDisabled(false);
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('role-language',
									'edit-success'));
					reloadroleListStore();
				},
				failure : function(form, action) {
					Ext.MessageBox.hide();
					Ext.getCmp("roleEditButton").setDisabled(false);
					if (action.result.errCode == '-1') {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel('role-language',
										'form-failure-error'));
					} else if (action.result.errCode == '-2') {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel('role-language',
										'form-failure-reduplicatekey'));
					} else if (action.result.errCode == '-3') {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel('role-language',
										'form-failure-invalidkey'));
					} else {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel('role-language',
										'form-failure-indecisiveerror'));
					}
				}
			});
		}
	}
}