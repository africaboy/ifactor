/**
 * 新建流程
 * 
 */
function neuflow() {
	var objecListCombo = getObjectSelectCombo(grooveTranslator.getLangLabel(
					'workflow-language', 'flow-form-object'), 'iobj', '', '');
	var tableListCombo = getTableSelectCombo('system_flow_opinion.table',
			grooveTranslator.getLangLabel('workflow-language',
					'flow-form-opinion'), 'iopinion', '', '', true);

	var form = new Ext.FormPanel({
				id : 'neuflowForm',
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
					allowBlank : false
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-key'),
					id : 'ikey',
					name : 'ikey',
					maxLength : 25,
					allowBlank : false
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-desc'),
					xtype : 'textarea',
					id : 'imemo',
					name : 'imemo',
					maxLength : 100,
					height : 40
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-js'),
					xtype : 'textarea',
					id : 'ijs',
					name : 'ijs',
					maxLength : 100,
					height : 40
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-css'),
					xtype : 'textarea',
					id : 'icss',
					name : 'icss',
					maxLength : 100,
					height : 40
				}, objecListCombo, {
					xtype : 'hidden',
					id : 'iobj',
					name : 'iobj'
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-opinion'),
					id : 'iopinion',
					name : 'iopinion'
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-opinionlist'),
					id : 'iopinionQuery',
					name : 'iopinionQuery'
				}, new Ext.form.RadioGroup({
							fieldLabel : grooveTranslator.getLangLabel(
									'workflow-language', 'flow-form-keepdata'),
							// hideLabel : true, // 隐藏RadioGroup标签
							items : [new Ext.form.Radio({ // 以上相同
								id : 'ikeepdata1',
								boxLabel : grooveTranslator.getLangLabel(
										'frequence-language', 'yes'),
								name : 'ikeepdata',
								checked : true,
								inputValue : '1',
								listeners : {
									check : function(checkbox, checked) {
										if (checked) {

										}
									}
								}
							}), new Ext.form.Radio({ // 三个必须项
								id : 'ikeepdata0',
								// checked : true, //
								// 设置当前为选中状态,仅且一个为选中.
								boxLabel : grooveTranslator.getLangLabel(
										'frequence-language', 'no'), // Radio标签
								name : 'ikeepdata', // 用于form提交时传送的参数名
								inputValue : '0', // 提交时传送的参数值
								listeners : {
									check : function(checkbox, checked) { // 选中时,调用的事件
										if (checked) {

										}
									}
								}
							})]
						})]
			});

	var neuFlowWin = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 500,
		height : 400,
		title : grooveTranslator.getLangLabel('workflow-language',
				'flow-form-title'),
		plain : true,
		modal : true,
		maximizable : false,
		items : [form],

		buttons : [{
			id : 'flowSaveButton',
			text : grooveTranslator.getLangLabel('common-language', 'submit'),
			handler : function() {
				if (form.getForm().isValid()) {
					Ext.getCmp('flowSaveButton').setDisabled(true);
					Ext.MessageBox.wait(grooveTranslator.getLangLabel(
							'common-language', 'submit-loading'));

					form.getForm().submit({
						url : context + '/system/flowmanage.do?method=saveflow',
						method : 'POST',
						success : function(form, action) {
							Ext.MessageBox.hide();
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'flow-form-save-success'));
							reloadFlowListStore();
							neuFlowWin.close();
							neuFlowWin = null;
						},
						failure : function(form, action) {
							Ext.MessageBox.hide();
							Ext.getCmp('flowSaveButton').setDisabled(false);

							if (!action.result) {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'workflow-language',
												'flow-form-save-error'));
							} else if (action.result.result == '0') {
								Ext.Msg
										.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator
														.getLangLabel(
																'workflow-language',
																'flow-form-save-reduplicatederror'));
							} else if (action.result.result == '-1') {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										grooveTranslator.getLangLabel(
												'workflow-language',
												'flow-form-save-failure'));
							}
						}
					});
				}
			}
		}, {
			text : grooveTranslator.getLangLabel('common-language', 'close'),
			handler : function() {
				neuFlowWin.close();
				neuFlowWin = null;
			}
		}]
	});

	neuFlowWin.show();
}