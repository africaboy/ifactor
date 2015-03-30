<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   IUser user = ISystemContext.getSessionUser(request);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>个人密码管理</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script src="<%=context %>/system/user/js/editpwd.js"></script>
<script>
Ext.QuickTips.init();
	
Ext.form.Field.prototype.msgTarget = 'side';

/* 高级自定义密码验证 */
Ext.apply(Ext.form.VTypes, {
			/* val指当前文本框值，field指当前文本框组件 */
			password : function(val, field) {
				var rnt = false;
				/* 待比较目标文本框组件 */
				if (field.confirmTo) {
					var pwd = Ext.get(field.confirmTo);
					if (val == pwd.getValue()) {
						rnt = true;
					} else {
						//Ext.Msg.alert('提示', '密码确认错误！');
						rnt = false;
					}
				}
				return rnt;
			}
		});
</script>
<body onload="javascript:editPWD();">
</body>
</html>
