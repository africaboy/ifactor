/**
 * 新建流程
 * 
 */
function editflow(id, name) {
	var form = new Ext.FormPanel({
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
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-object'),
					name : 'iobjname',
					readOnly : true
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-opinion'),
					name : 'iopinion'
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'flow-form-opinionlist'),
					name : 'iopinionQuery'
				}, {
					xtype : 'hidden',
					name : 'gid'
				}, {
					xtype : 'hidden',
					name : 'okey'
				}, new Ext.form.RadioGroup({
							fieldLabel : grooveTranslator.getLangLabel(
									'workflow-language', 'flow-form-keepdata'),
							// hideLabel : true, // 隐藏RadioGroup标签
							items : [new Ext.form.Radio({ // 以上相同
								id : 'ikeepdata1',
								boxLabel : grooveTranslator.getLangLabel(
										'frequence-language', 'yes'),
								name : 'ikeepdata',
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

	form.getForm().load({
		url : context + '/system/flowmanage.do?method=editflow',
		params : {
			id : id
		},
		waitTitle : grooveTranslator.getLangLabel('common-language', 'prompt'),
		waitMsg : grooveTranslator.getLangLabel('common-language',
				'list-loading'),
		animEl : 'loding',
		success : function(form, action) {
			var resultInfo = action.result.data;

			var keepData = resultInfo.ikeepdata;

			if (keepData == '1') {
				Ext.get("ikeepdata1").dom.checked = true;
			} else if (keepData == '0') {
				Ext.get("ikeepdata0").dom.checked = true;
			}
		},
		failure : function(form, action) {
			if (!action.result) {
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'common-language', 'load-failure'));
			} else if (action.result.result == '0') {
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator
								.getLangLabel('common-language',
										'flow-form-load-noflowerror'));
			} else if (action.result.result == '1') {
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'common-language',
								'fflow-form-load-noobjecterror'));
			}
		}
	});

	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 500,
		height : 400,
		title : name,
		plain : true,
		modal : true,
		maximizable : false,
		items : [form],

		buttons : [{
			id : 'flowUpdateButton',
			text : grooveTranslator.getLangLabel('common-language', 'submit'),
			handler : function() {
				if (form.getForm().isValid()) {
					Ext.getCmp('flowUpdateButton').setDisabled(true);
					Ext.MessageBox.wait(grooveTranslator.getLangLabel(
							'common-language', 'submit-loading'));

					form.getForm().submit({
						url : context
								+ '/system/flowmanage.do?method=updateflow',
						method : 'POST',
						success : function(form, action) {
							Ext.MessageBox.hide();
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'flow-form-save-success'));
							reloadFlowListStore();
							win.close();
							win = null;
						},
						failure : function(form, action) {
							Ext.MessageBox.hide();
							Ext.getCmp('flowUpdateButton').setDisabled(false);

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
				win.close();
				win = null;
			}
		}]
	});

	win.show();
}