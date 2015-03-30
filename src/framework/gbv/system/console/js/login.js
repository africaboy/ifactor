var win;
Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = context + '/resources/ext3/images/default/s.gif';
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	win = new Ext.Window({
		id : 'Login-win',
		title : 'JET应用支撑平台（标准版）V1.0',
		iconCls : 'login',
		width : 500,
		resizable : false,
		closable : false,
		region : 'center',
		collapsible : false,
		plain : true,
		border : false,
		items : new Ext.form.FormPanel({
			id : 'Login-form',
			labelWidth : 100,
			labelAlign : 'center',
			buttonAlign : 'center',
			border : 0,
			// baseCls:'header',
			keys : [{// 键盘回车提交功能
				key : [10, 13],
				fn : surely
			}],

			frame : true,
			layout : 'form',
			items : [{
				xtype : 'panel',
				defaults : {
					autoHeight : true,
					bodyStyle : 'padding:10px;'
				},
				html : '<img src="'
						+ context
						+ '/system/console/images/welcome1.jpg" width="100%" height="150">'
			}, {
				html : '<br>'
			}, {
				xtype : 'textfield',
				id : 'logid',
				name : 'logid',
				fieldLabel : '登录ID',
				labelAlign : 'left',
				emptyText : '登录帐号...',
				blankText : '请输入登录帐号',
				height : 25,
				allowBlank : false,
				width : 300

			}, {
				xtype : 'textfield',
				id : 'pwd',
				name : 'pwd',
				inputType : 'password',
				height : 25,
				labelAlign : 'left',
				fieldLabel : '登录密码',
				blankText : '请输入登录密码',
				allowBlank : false,
				width : 300,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							handleSubmit(Ext.getCmp('submitButton'));
						}
					}
				}
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
			buttons : [{
						text : '登 录',
						type : 'submit',
						id : 'submitButton',
						handler : function() {
							handleSubmit(this);
						}
					}, {
						text : '重 置',
						type : 'button',
						handler : function() {
							// win.close();
							Ext.getCmp('Login-form').getForm().reset();
						}
					}]
		})
	});
	win.show();
	Ext.getCmp("method").setValue("login");
	Ext.getCmp("logip").setValue(ip);

	function surely() { // 定义表单提交函数
		// 如果通过验证
		if (Ext.getCmp('Login-form').getForm().isValid()) {
			this.disabled = true;

		}
	};

	function handleSubmit(thizz) {
		if (Ext.getCmp('Login-form').getForm().isValid()) {
			var but = thizz;
			but.setDisabled(true);
			Ext.MessageBox.wait('登录验证过程中...');

			Ext.getCmp('Login-form').getForm().submit({
				url : context + '/system/console',
				method : "POST",
				success : function(form, action) {
					Ext.MessageBox.hide();
					document.location = context + '/system/console';
				},
				failure : function(form, action) {
					Ext.MessageBox.hide();
					if (action.result != null
							&& action.result.msg == "notadmin") {
						Ext.Msg.alert('错误', '当前帐号没有系统管理员权限，请使用具有系统管理员权限的帐号登录！');
						but.setText("登录");
						but.setDisabled(false);
					} else if (action.result != null
							&& action.result.msg == "notlogin") {
						Ext.Msg.alert('错误', '错误的用户账号或密码，请重新登录！');
						but.setText("登录");
						but.setDisabled(false);
					} else {
						Ext.Msg.alert('错误', '服务器出现异常请稍后再试！');
						but.setText("登录");
						but.setDisabled(false);
					}
				}
			});
		}
	}
});