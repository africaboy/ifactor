<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String context = jt.classic.system.context.ISystemContext.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>表信息注册</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link href="<%=context %>/system/table/css/dragcontainer.css"
	rel=stylesheet>
<script src="<%=context%>/system/table/js/myjs.js"></script>
<script src="<%=context%>/system/table/js/dragcontainer.js"></script>
<body onload="init(0);">
<form name="form1" method="post" action="">
<h2>表信息注册，请先 <a href="javascript:void(0)" onclick="javascript:additem();">定义表字段</a>，然后 <a
	href="javascript:void(0)" onclick="javascript:handleSubmit();">生成表结构脚本信息</a>，脚本信息将自动粘贴到系统剪贴板中</h2>
<table width="800" align="center" class="tab4edit">
	<tr>
		<td width="200"><label>表名称</label></td>
		<td><input type="text" class="box3" name="tname" value=""></td>
	</tr>
	<tr>
		<td><label>表描述</label></td>
		<td><input type="text" class="box3" name="tdesc" value=""></td>
	</tr>
</table>
<table width="800" align="center" class="tab-noborder">
	<tr>
		<td>
		<div id="Demo4">
		<div class="DragContainer" id="DragContainer1"
			overClass="OverDragContainer"></div>
		</div>
		</td>
	</tr>
</table>
</form>
</body>
</html>
