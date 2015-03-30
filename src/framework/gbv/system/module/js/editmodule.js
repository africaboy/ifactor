var editModuleWin;

// Ext.form.Field.prototype.msgTarget='side';

/*
 * qtip-当鼠标移动到控件上面时显示提示 title-在浏览器的标题显示，但是测试结果是和qtip一样的 under-在控件的底下显示错误提示
 * side-在控件右边显示一个错误图标，鼠标指向图标时显示错误提示. 默认值. id-[element id]错误提示显示在指定id的HTML元件中
 */

/**
 * 编辑模块信息
 * 
 * @param {}
 *            id 模块ID
 */
function editmodule(id) {
	if (editModuleWin) {
		editModuleWin = null;
	}

	var moduleUpdateForm = initmoduleUpdateForm();

	editModuleWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 550,
				height : 400,
				title : grooveTranslator.getLangLabel('module-language',
						'form-title'),
				resizable : false,
				plain : true,
				modal : true,

				items : [moduleUpdateForm],

				buttons : [{
					id : 'moduleUpdateButton',
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					handler : handleUpdatemodule
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						editModuleWin.close();
						editModuleWin = null;
					}
				}]
			});

	moduleUpdateForm.getForm().load({
		url : context + '/system/module.do?method=edit',
		params : {
			id : id
		},
		success : function(form, action) {

		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('module-language',
					'fedit-load-error'));
		}
	});

	editModuleWin.show(this);
}

function initmoduleUpdateForm() {

	var moduleUpdateForm = new Ext.FormPanel({
				id : 'moduleUpdateForm',
				labelWidth : 150, // label settings here cascade unless
				// overridden
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				width : 500,
				defaults : {
					width : 350
				},
				defaultType : 'textfield',
				items : [{
							xtype : 'hidden',
							id : 'mid',
							name : 'mid'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'module-language', 'form-name'),
							name : 'mname',
							emptyText : grooveTranslator.getLangLabel(
									'module-language', 'form-name-emptytext'),
							allowBlank : false
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'module-language', 'form-desc'),
							xtype : 'textarea',
							id : 'mmemo',
							name : 'mmemo'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'module-language', 'form-link'),
							xtype : 'textarea',
							name : 'murl',
							value : ''
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'module-language', 'form-idx'),
							name : 'msort',
							value : ''
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'module-language', 'form-langkey'),
							name : 'mkey',
							value : ''
						}]
			});

	return moduleUpdateForm;
}

function handleUpdatemodule() {
	if (Ext.getCmp('moduleUpdateForm').getForm().isValid()) {

		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'list-loading'));

		Ext.getCmp("moduleUpdateForm").getForm().submit({
			url : context + '/system/module.do?method=update',
			method : "POST",
			success : function(form, action) {
				Ext.MessageBox.hide();
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'module-language', 'edit-success'));
				editModuleWin.close();
				editModuleWin = null;

				reloadmoduleListStore();
			},
			failure : function(form, action) {
				Ext.MessageBox.hide();
				Ext.getCmp("moduleUpdateButton").setDisabled(false);
				if (action.result.errCode == '-1') {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('module-language',
									'form-failure-error'));
				} else {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('module-language',
									'form-failure-indecisiveerror'));
				}
			}
		});
	}
}