function editPWD() {
	var editPWDForm = new Ext.FormPanel({
				id : 'editPWDForm',
				frame : false,
				bodyStyle : 'border:0px; padding:5px;',
				// labelAlign : 'top',
				height : 150,
				defaults : {
					width : 180
				},
				defaultType : 'textfield',

				items : [{
					fieldLabel : grooveTranslator.getLangLabel('user-language',
							'editpwdform-originalpwd'),
					inputType : 'password',
					allowBlank : false,
					id : 'opwd',
					name : 'opwd'
				}, {
					fieldLabel : grooveTranslator.getLangLabel('user-language',
							'editpwdform-newpwd'),
					inputType : 'password',
					allowBlank : false,
					id : 'npwd',
					name : 'npwd'
				}, {
					fieldLabel : grooveTranslator.getLangLabel('user-language',
							'form-cfmpwd'),
					inputType : 'password',
					allowBlank : false,
					vtype : "password",
					confirmTo : {
						confirmTo : 'npwd',
						formId : 'editPWDForm'
					},
					id : 'npwd1',
					name : 'npwd1'
				}],
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'update'),
					disabled : false,
					handler : handleUpdatePWD
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						editPWDWin.close();
						editPWDWin = null;
					}
				}]
			});

	var editPWDWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 200,
				title : grooveTranslator.getLangLabel('user-language',
						'editpwdform-title'),
				resizable : false,
				plain : true,
				modal : true,

				items : [editPWDForm]
			});

	editPWDWin.show(this);
}

function handleUpdatePWD() {
	if (Ext.getCmp('editPWDForm').getForm().isValid()) {
		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'submit-loading'));
		Ext.getCmp("editPWDForm").getForm().submit({
			url : context + '/system/self.do?method=updatemypwd',
			method : "POST",
			params : {
				pwd : Ext.getCmp("npwd").getValue()
			},
			success : function(form, action) {
				Ext.MessageBox.hide();
				if (action.response.responseText != '') {
					Ext.getCmp("editPWDForm").getForm().reset();
					Ext.Msg.alert('提示', '密码修改成功');
				}
			},
			failure : function(form, action) {
				Ext.MessageBox.hide();
				if (action.result == null) {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('user-language',
									'form-failure-indecisiveerror'));
				} else if (action.result.errCode == '-1') {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('user-language',
									'editpwdform-failure-originalpwderror'));
				} else if (action.result.errCode == '-2') {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('user-language',
									'editpwdform-failure'));
				}
			}
		});
	}
}