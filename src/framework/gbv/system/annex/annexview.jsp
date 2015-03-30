<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.basework.impl.CommonBean4HSQ"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	CommonBean4HSQ cbh = new CommonBean4HSQ(request);

	Map params = cbh.getResource();

	String id = StringTool.checkString(params.get("id"));
	String name = StringTool.checkString(params.get("name"));
	String type = StringTool.checkString(params.get("type"));
	String url = StringTool.checkString(params.get("url"));
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><%=name %></title>
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8"></meta>
<script>
    window.onblur = function() {
		window.focus();
		//window.close();
	}
	
	function document.oncontextmenu() { 
		return false; 
	} 
</script>
<jsp:include page="../head4nosession.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/annex/css/annexview.css" />
<body onload="javascript:inithelper();">
<form name="form1" method="post" action="">
<table width="100%" border="0">
    <tr>
		<td>&nbsp;<font style="font-size:13px;"><%=name %></font></td>
	</tr>	
	<tr>
		<td align="center">
		<%
					if (type.toLowerCase().equals("jpg")
					|| type.toLowerCase().equals("jpeg")
					|| type.toLowerCase().equals("gif")
					|| type.toLowerCase().equals("bmp")
					|| type.toLowerCase().equals("png")) {
		%> <img src="<%=url %>" /> <%
				 }else if(type.toLowerCase().equals("mp4") || type.toLowerCase().equals("amr")){
		%><div>
			<object align=middle classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" class="OBJECT" id="MediaPlayer" width="500" height="400">
				<param name="ShowStatusBar" value="1">
				<param name="Filename" value="<%=url %>">
				<embed type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"></embed>
			</object>
		<div><%
		}%>
		</td>
	</tr>
	<tr>
		<td align="right" height="50" valign="middle">
		<div style="width:205px;border:0px red solid;">
		<div class="buttons">
		<a href="#" onclick="javascript:viewAnnex('<%=id %>');" class="regular"><!-- class="regular"-->
        <img src="<%=context%>/system/annex/images/download.png" alt="下载附件文件"/> 
         下载附件
        </a> 
        <a href="#"  onclick="javascript:window.close();" class="regular"><!-- class="regular"-->
        <img src="<%=context%>/system/annex/images/delete.png" alt="关闭当前窗口"/> 
         关闭窗口
        </a>
        </div>
        </div>
		</td>
	</tr>
</table>
</form>
</body>
</html>
