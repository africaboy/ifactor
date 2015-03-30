var addModuleWin;

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
function addmodule() {
	if (addModuleWin) {
		addModuleWin = null;
	}

	var moduleBaseForm = initmoduleBaseForm();

	addModuleWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 550,
				height : 400,
				title : grooveTranslator.getLangLabel('module-language',
						'form-title'),
				resizable : false,
				plain : true,
				modal : true,

				items : [moduleBaseForm],

				buttons : [{
					id : 'moduleSaveButton',
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					handler : handleSavemodule
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						addModuleWin.close();
						addModuleWin = null;
					}
				}]
			});

	addModuleWin.show(this);
}

function initmoduleBaseForm() {
	var moduleBaseForm = new Ext.FormPanel({
				id : 'moduleBaseForm',
				labelWidth : 150, // label settings here cascade unless
				// overridden
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				width : 500,
				defaults : {
					width : 300
				},
				defaultType : 'textfield',
				items : [{
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

	return moduleBaseForm;
}

function handleSavemodule() {
	if (Ext.getCmp('moduleBaseForm').getForm().isValid()) {

		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'list-loading'));

		Ext.getCmp("moduleBaseForm").getForm().submit({
			url : context + '/system/module.do?method=save',
			method : "POST",
			success : function(form, action) {
				Ext.MessageBox.hide();
				keepAddmodule(action.result.resultCode);
			},
			failure : function(form, action) {
				Ext.MessageBox.hide();
				Ext.getCmp("moduleSaveButton").setDisabled(false);
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

function keepAddmodule(id) {
	addModuleWin.close();
	addModuleWin = null;

	reloadmoduleListStore();
}