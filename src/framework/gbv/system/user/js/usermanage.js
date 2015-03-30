document.write("<script src=\"" + context
		+ "/system/user/js/userlist.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/user/js/useredit.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/user/js/useradd.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/user/js/userpart.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/user/js/editpwd.js\"></script>");

/* 高级自定义密码验证 */
Ext.apply(Ext.form.VTypes, {
			/* val指当前文本框值，field指当前文本框组件 */
			password : function(val, field) {
				var rnt = false;
				/* 待比较目标文本框组件 */
				if (field.confirmTo) {
					var pwd = Ext.getCmp(field.confirmTo.formId).getForm()
							.findField(field.confirmTo.confirmTo);
					if (val == pwd.getValue()) {
						rnt = true;
					} else {
						// Ext.Msg.alert('提示', '密码确认错误！');
						rnt = false;
					}
				}
				return rnt;
			}
		});