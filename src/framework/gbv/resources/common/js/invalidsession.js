Ext.Ajax.on('requestcomplete', checkUserSessionStatus, this);
function checkUserSessionStatus(conn, response, options) {
	// Ext重新封装了response对象
	try {
		if (response.getResponseHeader('sessionstatus')) {
			invalidSession.process();
		}
	} catch (e) {
	}
}

var invalidSession = {
	process : function() {
		var form = new Ext.form.FormPanel({
			border : 0,
			// baseCls:'header',
			keys : [{// 键盘回车提交功能
				key : [10, 13],
				fn : surely
			}],
			margins : '2 2 2 2',
			labelAlign : 'left',
			bodyStyle : 'padding:5px;',
			labelWidth : 100,
			frame : false,
			items : [{
						xtype : 'textfield',
						name : 'logip',
						inputType : 'hidden',
						value : IP
					}, {
						xtype : 'textfield',
						name : 'logid',
						fieldLabel : grooveTranslator.getLangLabel(
								'welcome-language', 'logid'),
						emptyText : grooveTranslator.getLangLabel(
								'welcome-language', 'logid')
								+ '...',
						blankText : grooveTranslator.getLangLabel(
								'welcome-language', 'logid-blanktext'),
						allowBlank : false,
						readOnly : true,
						value : userLogid,
						anchor : '90%',
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == Ext.EventObject.ENTER) {
								}
							}
						}

					}, {
						xtype : 'textfield',
						name : 'pwd',
						inputType : 'password',
						anchor : '90%',
						fieldLabel : grooveTranslator.getLangLabel(
								'welcome-language', 'logpwd'),
						emptyText : '......',
						blankText : grooveTranslator.getLangLabel(
								'welcome-language', 'logpwd-blanktext'),
						allowBlank : false
					}, {
						xtype : "displayfield",
						// disabled : true,
						overflow : "hidden",
						readOnly : true,
						fieldLabel : grooveTranslator.getLangLabel(
								'common-language', 'warn'),
						style : 'background:#99CC00',
						anchor : '90%',
						html : '<div style="padding:5px;">' + grooveTranslator.getLangLabel(
											'welcome-language', 'notice') + '</div>'
					}]
		});

		var win = new Ext.Window({
					title : grooveTranslator.getLangLabel(
													'common-language', 'prompt'),
					iconCls : 'relogin',
					width : 400,
					height : 200,
					resizable : false,
					closable : false,
					plain : true,
					border : false,
					draggable : false,
					layout : 'fit',
					modal : true,
					items : [form],
					buttons : [{
								text : grooveTranslator.getLangLabel('welcome-language',
						'logbutton'),
								type : 'submit',
								handler : function() {
									surely();
								}
							}, {
								text : grooveTranslator.getLangLabel('common-language',
						'cancel'),
								type : 'button',
								handler : function() {
									// win.close();
									form.getForm().reset();
								}
							}]
				});

		win.show();

		function surely() {
			// 定义表单提交函数
			// 如果通过验证
			if (form.getForm().isValid()) {
				Ext.MessageBox.wait(grooveTranslator.getLangLabel(
					'welcome-language', 'logloading'));

				form.getForm().submit({
							url : context + '/system/remotelogin.do',
							method : 'POST',
							success : function(form, action) {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
													'common-language', 'prompt'), grooveTranslator.getLangLabel(
											'welcome-language', 'recover'), function() {
											win.close();
										});
							},
							failure : function(form, action) {
								Ext.MessageBox.hide();

								if (action.result) {
									if (action.result.errorMsg == "-2") {
										Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'error'), grooveTranslator.getLangLabel(
											'welcome-language', 'notlogin'))
									} else if (action.result.errorMsg == "-3") {
										Ext.Msg.alert(grooveTranslator.getLangLabel(
													'common-language', 'error'),
												grooveTranslator.getLangLabel(
													'welcome-language',
													'logidinvalid'));
									} else {
										Ext.Msg.alert(grooveTranslator.getLangLabel(
													'common-language', 'error'),
												grooveTranslator.getLangLabel(
													'welcome-language',
													'elseerror'));
									}
								} else {
									Ext.Msg.alert(grooveTranslator.getLangLabel(
													'common-language', 'error'),
												grooveTranslator.getLangLabel(
													'welcome-language',
													'elseerror'));
								}
							}
						});
			}
		}
	}
};