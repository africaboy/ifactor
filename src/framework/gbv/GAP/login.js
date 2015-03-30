Ext.onReady(function() {
	document.title = grooveTranslator.getLangLabel('welcome-language',
			'title');

	Ext.QuickTips.init();

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	var loginPanel = new Ext.FormPanel({
				id : 'Login-form',
				frame : false,
				title : grooveTranslator.getLangLabel('welcome-language',
						'welcome'),
				bodyStyle : 'padding:10px;',
				labelAlign : 'top',
				width : 390,
				height : 200,
				defaultType : 'textfield',
				items : [{
					fieldLabel : grooveTranslator.getLangLabel(
							'welcome-language', 'logid'),
					name : 'logid',
					allowBlank : false,
					width : 300
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'welcome-language', 'logpwd'),
					inputType : 'password',
					name : 'pwd',
					width : 300,
					allowBlank : false
				}, {
					xtype : 'textfield',
					id : 'method',
					name : 'method',
					inputType : 'hidden'
				}, {
					xtype : 'textfield',
					id : 'logip',
					name : 'logip',
					inputType : 'hidden'
				}],
				keys : [{ // 处理键盘回车事件
					key : [10, 13],
					fn : surely
				}]
			});

	loginPanel.render('loginArea');

	Ext.get('loginCheckA').dom.innerHTML = grooveTranslator.getLangLabel(
			'welcome-language', 'logbutton');

	Ext.get('loginCheckA').on('click', submitLoginForm);

	function submitLoginForm() {
		if (Ext.getCmp('Login-form').getForm().isValid()) {
			Ext.getCmp('method').setValue('login');
			Ext.getCmp('logip').setValue(ip);

			var AButton = this;
			Ext.MessageBox.wait(grooveTranslator.getLangLabel(
					'welcome-language', 'logloading'));
			AButton.dom.innerHTML = grooveTranslator.getLangLabel(
					'welcome-language', 'logloadingmsg');
			AButton.un('click');

			Ext.getCmp('Login-form').getForm().submit({
				url : context + '/system/console',
				method : 'POST',
				success : function(form, action) {
					Ext.MessageBox.hide();
					document.location = context + '/system/console' + '?lang='
							+ grooveTranslator.language();
				},
				failure : function(form, action) {
					var err = grooveTranslator.getLangLabel('common-language',
							'error');

					Ext.MessageBox.hide();

					if (action.result != null
							&& action.result.msg == 'notadmin') {
						Ext.Msg.alert(err, grooveTranslator.getLangLabel(
										'welcome-language', 'notadmin'));
					} else if (action.result != null
							&& action.result.msg == 'notlogin') {
						Ext.Msg.alert(err, grooveTranslator.getLangLabel(
										'welcome-language', 'notlogin'));
					} else {
						Ext.Msg.alert(err, grooveTranslator.getLangLabel(
										'welcome-language', 'elseerror'));
					}
					AButton.dom.innerHTML = grooveTranslator.getLangLabel(
							'welcome-language', 'logbutton');
					// AButton.on('click', submitLoginForm);
				}
			});
		}
	}

	// 键盘事件
	function surely() { // 定义表单提交函数
		// 如果通过验证
		if (Ext.getCmp('Login-form').getForm().isValid()) {
			Ext.getCmp('method').setValue('login');
			Ext.getCmp('logip').setValue(ip);
			Ext.getCmp('Login-form').getForm().submit({
				url : context + '/system/console',
				method : 'POST',
				success : function(form, action) {
					Ext.MessageBox.hide();
					document.location = context + '/system/console' + '?lang='
							+ grooveTranslator.language();
				},
				failure : function(form, action) {
					var err = grooveTranslator.getLangLabel('common-language',
							'error');

					Ext.MessageBox.hide();

					if (action.result != null
							&& action.result.msg == 'notadmin') {
						Ext.Msg.alert(err, grooveTranslator.getLangLabel(
										'welcome-language', 'notadmin'));
					} else if (action.result != null
							&& action.result.msg == 'notlogin') {
						Ext.Msg.alert(err, grooveTranslator.getLangLabel(
										'welcome-language', 'notlogin'));
					} else {
						Ext.Msg.alert(err, grooveTranslator.getLangLabel(
										'welcome-language', 'elseerror'));
					}
					AButton.dom.innerHTML = grooveTranslator.getLangLabel(
							'welcome-language', 'logbutton');
					// AButton.on('click', submitLoginForm);
				}
			});
		}

	};

	var panel = new Ext.ux.ThemeChange();
	panel.render('language');

});