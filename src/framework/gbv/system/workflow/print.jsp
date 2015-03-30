<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%
    String context = jt.classic.system.context.ISystemContext.getContextPath();
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>公文正文编辑窗口</title> 
<jsp:include page="../head.jsp"></jsp:include>
<script src="<%=context%>/system/workflow/officecontrol/ntkodocprint.js"></script>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/workflow/css/init4classic.css" />	
<body onload="javascript:open_word();">
<form name="form1">
<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
   <tr><td>
		<object id="TANGER_OCX" classid="clsid:A39F1330-3322-4a1d-9BF0-0BA2BB90E970" codebase="officecontrol/OfficeControl.cab#version=5,0,1,1" width="100%" height="100%"> 
			<param name="IsUseUTF8URL" value="-1">   
			<param name="IsUseUTF8Data" value="-1">   
			<param name="BorderStyle" value="1">   
			<param name="BorderColor" value="14402205">   
			<param name="TitlebarColor" value="15658734">   
			<param name="TitlebarTextColor" value="0">   
			<param name="MenubarColor" value="14402205">   
			<param name="MenuButtonColor" VALUE="16180947">   
			<param name="MenuBarStyle" value="3">   
			<param name="MenuButtonStyle" value="7">   
			<param name="WebUserName" value="NTKO">   
			<param name="Caption" value="NTKO OFFICE文档控件示例演示 http://www.ntko.com">   
			<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN>   
		</object>
   </td></tr>
</table>
</form>
</body>
</html>