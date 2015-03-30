/**
 * 新建流程
 * 
 */
function copyflow(r) {
	var fid = r.data.CG_ID;
	var fname = r.data.CG_NAME;
	var key = r.data.CG_KEY;

	var objecListCombo = getObjectSelectCombo(grooveTranslator.getLangLabel(
					'workflow-language', 'flow-form-object'), 'iobj', '', '');

	var form = new Ext.FormPanel({
				id : 'copyflowForm',
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
							fieldLabel : grooveTranslator.getLangLabel(
					'workflow-language', 'flow-form-name'),
							id : 'iname',
							name : 'iname',
							maxLength : 25,
							value : fname + '_',
							allowBlank : false
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
					'workflow-language', 'flow-form-key'),
							id : 'ikey',
							name : 'ikey',
							maxLength : 25,
							value : key + '_bak',
							allowBlank : false
						}, objecListCombo, {
							xtype : 'hidden',
							id : 'iobj',
							name : 'iobj'
						}, {
							xtype : 'hidden',
							id : 'icopyid',
							name : 'icopyid',
							value : fid
						}]
			});

	var copyFlowWin = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 500,
		height : 300,
		title : grooveTranslator.getLangLabel(
					'workflow-language', 'flowlist-tbar-copy') + '_[' + fname + ']',
		plain : true,
		modal : true,
		maximizable : false,
		items : [form],

		buttons : [{
			id : 'flowCopyButton',
			text : grooveTranslator.getLangLabel(
					'common-language', 'submit'),
			handler : function() {
				if (form.getForm().isValid()) {
					Ext.getCmp('flowCopyButton').setDisabled(true);
					Ext.MessageBox.wait(grooveTranslator.getLangLabel(
					'common-language', 'submit-loading'));

					form.getForm().submit({
						url : context + '/system/flowmanage.do?method=copyflow',
						method : "POST",
						success : function(form, action) {
							Ext.MessageBox.hide();
							Ext.Msg.alert(grooveTranslator.getLangLabel(
					'common-language', 'prompt'), grooveTranslator.getLangLabel(
					'workflow-language', 'flow-form-save-success'));
							reloadFlowListStore();
							copyFlowWin.close();
							copyFlowWin = null;
						},
						failure : function(form, action) {
							Ext.MessageBox.hide();
							Ext.getCmp('flowCopyButton').setDisabled(false);

							if (!action.result) {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
					'common-language', 'prompt'), grooveTranslator.getLangLabel(
					'workflow-language', 'flow-form-save-error'));
							} else if (action.result.result == '0') {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
					'common-language', 'prompt'), grooveTranslator.getLangLabel(
					'workflow-language', 'flow-form-save-reduplicatederror'));
							} else if (action.result.result == '-1') {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
					'common-language', 'prompt'), grooveTranslator.getLangLabel(
					'workflow-language', 'flow-form-save-failure'));
							}
						}
					});
				}
			}
		}, {
			text : '关 闭',
			handler : function() {
				copyFlowWin.close();
				copyFlowWin = null;
			}
		}]
	});

	copyFlowWin.show();
}