<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.module.IModule"%>
<%@ page import="jt.classic.system.module.IMenu"%>
<%@ page import="java.util.List"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	IMenu parentMenu = (IMenu) request.getAttribute("menu");

	List list = parentMenu.ichildren();

	String url = "";

	if (parentMenu.iparentid().equals("0")) {
		url = context + "/system/module.do?method=edit&id="
		+ parentMenu.imoduleid();
	} else {
		url = context + "/system/module.do?method=addmenu&id="
		+ parentMenu.iparentid();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>子菜单定义</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link href="<%=context %>/system/module/css/dragcontainer.css"
	rel=stylesheet>
<script src="<%=context%>/system/module/js/myjs.js"></script>
<script src="<%=context%>/system/module/js/dragcontainer.js"></script>
<body onload="init(<%=(list==null?0:list.size())%>);">
<form id="form1" name="form1" method="post"
	action="<%=context%>/system/module.do?method=savemenu"><input
	type="hidden" name="mnpid" value="<%=parentMenu.id()%>"> <input
	type='hidden' name='moduleid' value='<%=parentMenu.imoduleid()%>'>
<table class="tab4edit" width="710">
	<tr>
		<td width="147" class="td1">&nbsp;<label>菜单名称</label></td>
		<td>&nbsp;<a href="<%=url%>"><%=parentMenu.iname()%></a></td>
	</tr>
	<tr>
		<td width="147" class="td1">&nbsp;<label>所属模块</label></td>
		<td>&nbsp;<%=parentMenu.imodule().iname()%></td>
	</tr>
	<tr>
		<td colspan="2" align="left">&nbsp; <input type="button"
			class="button0" value=" 保 存 " onclick="javascript:handleSaveMenu();" />
		<input type="button" class="button0" value=" 增加子菜单 "
			onclick="javascript:createMenu();" /></td>
	</tr>
</table>
<DIV id="Demo4">
<DIV class="DragContainer" id="DragContainer1"
	overClass="OverDragContainer">
<%
		if (list != null && !list.isEmpty()) {
		for (int i = 0; i < list.size(); i++) {
			IMenu menu = (IMenu) list.get(i);
%>
<div class="DragBox" id="item_<%=i%>" overClass="OverDragBox"
	dragClass="DragDragBox" dragObj="0" style="width:300px;font-size:9pt;">
<input type='hidden' name='mnid_<%=i%>' value='<%=menu.id()%>'>
<div>菜单项 &nbsp;<span title="删除菜单项"
	onclick="deleteRow('item_<%=i%>','<%=menu.id()%>');"><font
	color="#006699">删 除</font></span> &nbsp;<span title="增加子菜单"
	onclick="addMenu('<%=menu.id()%>');"><font color="#006699">增加子菜单</font></span>
</div>
<div>菜单名称:&nbsp;<input type='text' class='box3'
	name='mnname_<%=i%>' value='<%=menu.iname()%>'></div>
<div>菜单链接:&nbsp;<input type='text' class='box3'
	name='mnurl_<%=i%>' value='<%=menu.iurl()%>'></div>
<div>菜单描述:&nbsp;<input type='text' class='box3'
	name='mnmemo_<%=i%>' value='<%=menu.imemo()%>'></div>
<div>&nbsp;</div>
</div>
<%
	}
	}
%>
</DIV>
</DIV>
</form>
</body>
</html>
