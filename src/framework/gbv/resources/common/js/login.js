var win;

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	win = new Ext.Window({
		id : 'Login-win',
		title : welcome,
		iconCls : 'login',
		width : 800,
		height : 400,
		resizable : false,
		closable : false,
		layout : 'border',
		collapsible : false,
		plain : true,
		draggable : false,
		border : false,
		items : [new Ext.Panel({
					region : 'west',
					width : 560,
					margins : '2 2 2 2',
					defaults : {
						autoHeight : true
					},
					html : '<img src="'
							+ context
							+ (thumb == ''
									? '/extframe/images/label.jpg'
									: thumb)
							+ '" width="100%" height="100%" border="0">'
				}), new Ext.form.FormPanel({
			id : 'Login-form',
			width : 290,
			region : 'center',
			border : 0,
			// baseCls:'header',
			keys : [{// 键盘回车提交功能
				key : [10, 13],
				fn : surely
			}],
			margins : '2 2 2 2',
			labelAlign : 'top',
			bodyStyle : 'padding:5px;',
			frame : false,
			items : [{
						xtype : 'textfield',
						id : 'logip',
						name : 'logip',
						inputType : 'hidden',
						value : ip
					}, {
						xtype : 'textfield',
						id : 'logid',
						name : 'logid',
						fieldLabel : grooveTranslator.getLangLabel(
								'welcome-language', 'logid'),
						emptyText : grooveTranslator.getLangLabel(
								'welcome-language', 'logid')
								+ '...',
						blankText : grooveTranslator.getLangLabel(
								'welcome-language', 'logid-blanktext'),
						allowBlank : false,
						anchor : '90%',
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == Ext.EventObject.ENTER) {
								}
							}
						}

					}, {
						xtype : 'textfield',
						id : 'pwd',
						name : 'pwd',
						inputType : 'password',
						anchor : '90%',
						fieldLabel : grooveTranslator.getLangLabel(
								'welcome-language', 'logpwd'),
						emptyText : '......',
						blankText : grooveTranslator.getLangLabel(
								'welcome-language', 'logpwd-blanktext'),
						allowBlank : false
					}],
			buttons : [{
				id : 'login',
				text : grooveTranslator.getLangLabel('welcome-language',
						'logbutton'),
				type : 'submit',
				handler : function() {
					if (Ext.getCmp('Login-form').getForm().isValid()) {
						var but = this;
						but.setDisabled(true);
						Ext.MessageBox.wait(grooveTranslator.getLangLabel(
								'welcome-language', 'logloading'));

						var logid = Ext.getCmp('logid').getValue();
						var password = Ext.getCmp('pwd').getValue();
						setParam2XML('logid', logid);
						setParam2XML('pwd', password);

						Ext.Ajax.request({
									url : context + '/system/staticlogin.do',
									method : 'POST',
									async : false,
									xmlData : getParam2XML(),
									success : function(response, options) {
										var o = Ext.util.JSON
												.decode(response.responseText);
										if (!o.success) {
											Ext.MessageBox.hide();
											if (o.errCode == '-2') {
												Ext.Msg
														.alert(
																grooveTranslator
																		.getLangLabel(
																				'common-language',
																				'error'),
																grooveTranslator
																		.getLangLabel(
																				'welcome-language',
																				'notlogin'));
												but
														.setText(grooveTranslator
																.getLangLabel(
																		'welcome-language',
																		'logbutton'));
												but.setDisabled(false);
											} else if (o.errCode == "-3") {
												Ext.Msg
														.alert(
																grooveTranslator
																		.getLangLabel(
																				'common-language',
																				'error'),
																grooveTranslator
																		.getLangLabel(
																				'welcome-language',
																				'logidinvalid'));
												but
														.setText(grooveTranslator
																.getLangLabel(
																		'welcome-language',
																		'logbutton'));
												but.setDisabled(false);
											} else {
												Ext.Msg
														.alert(
																grooveTranslator
																		.getLangLabel(
																				'common-language',
																				'error'),
																grooveTranslator
																		.getLangLabel(
																				'welcome-language',
																				'elseerror'));
												but
														.setText(grooveTranslator
																.getLangLabel(
																		'welcome-language',
																		'logbutton'));
												but.setDisabled(false);
											}
										} else {
											Ext.MessageBox.hide();
											document.location = context
													+ HOMEPAGE + '?lang=' + grooveTranslator.language();
										}
									}
								})
					}
				}
			}, {
				text : grooveTranslator.getLangLabel('common-language',
						'cancel'),
				type : 'button',
				handler : function() {
					// win.close();
					Ext.getCmp('Login-form').getForm().reset();
				}
			}]
		})]
	});
	win.show();

	function surely() { // 定义表单提交函数
		// 如果通过验证
		if (Ext.getCmp('Login-form').getForm().isValid()) {
			var but = Ext.getCmp('login');
			but.setDisabled(true);
			Ext.MessageBox.wait(grooveTranslator.getLangLabel(
					'welcome-language', 'logloading'));

			var logid = Ext.getCmp('logid').getValue();
			var password = Ext.getCmp('pwd').getValue();
			setParam2XML('logid', logid);
			setParam2XML('pwd', password);

			Ext.Ajax.request({
				url : context + '/system/staticlogin.do',
				method : 'POST',
				async : false,
				xmlData : getParam2XML(),
				success : function(response, options) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.MessageBox.hide();
						if (o.errCode == '-2') {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'error'),
									grooveTranslator.getLangLabel(
											'welcome-language', 'notlogin'));
							but.setText(grooveTranslator.getLangLabel(
									'welcome-language', 'logbutton'));
							but.setDisabled(false);
						} else if (o.errCode == "-3") {
							Ext.Msg
									.alert(
											grooveTranslator.getLangLabel(
													'common-language', 'error'),
											grooveTranslator.getLangLabel(
													'welcome-language',
													'logidinvalid'));
							but.setText(grooveTranslator.getLangLabel(
									'welcome-language', 'logbutton'));
							but.setDisabled(false);
						} else {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'error'),
									grooveTranslator.getLangLabel(
											'welcome-language', 'elseerror'));
							but.setText(grooveTranslator.getLangLabel(
									'welcome-language', 'logbutton'));
							but.setDisabled(false);
						}
					} else {
						Ext.MessageBox.hide();
						document.location = context + HOMEPAGE + '?lang=' + grooveTranslator.language();
					}
				}
			});
		}
	};

	var panel = new Ext.ux.ThemeChange();
	panel.render('language');
});