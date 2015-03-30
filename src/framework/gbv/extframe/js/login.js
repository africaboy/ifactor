/**
 * 系统登录验证
 */
function loginSystem() {
	// var but = Ext.get('submit').dom;
	// but.disabled = true;
	if (isblank($('logid')) || isblank($('pwd'))) {
		Ext.Msg.alert('提示', '请输入用户名和密码');
	} else {
		Ext.MessageBox.wait('登录验证过程中...');
		var logid = Ext.get('logid').dom.value;
		var password = Ext.get('pwd').dom.value;
		setParam2XML("logid", logid);
		setParam2XML("pwd", password);

		Ext.Ajax.request({
					url : context + '/system/staticlogin.do',
					method : 'POST',
					async : false,
					xmlData : getParam2XML(),
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.MessageBox.hide();
							if (o.errCode == "-2") {
								Ext.Msg.alert('错误', '错误的用户名或密码');
								// but.disabled = false;
							} else if (o.errCode == "-3") {
								Ext.Msg.alert('错误', '您使用的帐号已失效，请联系管理员重新启用该帐号');
								// but.setText("登录");
								// but.disabled = false;
							} else {
								Ext.Msg.alert('错误', '未知的错误异常，请稍后再试或联系系统管理员');
								// but.disabled = false;
							}
						} else {
							//loadOtherSessionObject();
							document.location = context + HOMEPAGE;
						}
					}
				});
	}
}

/**
 * 加载其它会话对象
 */
function loadOtherSessionObject() {
	Ext.Ajax.request({
				url : context + '/app/newframe.do?method=loadSession',
				method : 'POST',
				success : function(response, options) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (o.success) {
						Ext.MessageBox.hide();
						document.location = context + HOMEPAGE;
					} else {
						Ext.Msg.alert('错误', '初始化会话信息出现异常，无法登录系统，请重试或联系系统管理员');
					}
				}
			});
}
