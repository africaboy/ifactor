<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.module.IModule"%>
<%@ page import="jt.classic.system.module.IMenu"%>
<%@ page import="java.util.List"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   IModule module = (IModule)request.getAttribute("module");
   
   List list = module.istairmenus();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>模块定义</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link href="<%=context %>/system/module/css/dragcontainer.css" rel=stylesheet>
<script src="<%=context%>/system/module/js/myjs.js"></script>
<script src="<%=context%>/system/module/js/dragcontainer.js"></script>
<body onload="init(<%=(list==null?0:list.size())%>);">
<form id="form1" name="form1" method="post" action="<%=context%>/system/module.do?method=update">
<input type="hidden" name="mid" value="<%=module.id()%>">
<h1>系统模块内容编辑</h1>
<table class="tab4edit" width="800">
  <tr class="tr1">
    <td class="td1" width="20%">&nbsp;模块名称</td>
    <td class="td2">
     &nbsp;<input type="text" class="box3" name="mname" value="<%=module.iname()%>"/>
    </td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;模块说明</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="mmemo" value="<%=module.imemo()%>"/></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;自定义导向</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="murl" value="<%=module.iurl()%>"/></td>
  </tr>
  <!--
  <tr>
    <td valign="top">&nbsp;访问权限</td>
    <td>&nbsp;<div style="display:block;" onclick="javascript:handleSelect(this);" title="点击选择" id="names" style="height:30px;width:200px;border-bottom : 1px #6199C5 solid;"></div>
    <input type="hidden" name="ids" value="">
    </td>
  </tr>
  -->
  <tr class="tr1">
    <td class="td1">&nbsp;排列顺序</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="msort" value="<%=module.isort()%>"/></td>
  </tr>
  <tr class="tr1">
    <td colspan="2" class="td2" align="center">&nbsp;
    <input type="button" class="button0" value=" 保 存 " onclick="javascript:handleSubmit();"/>
    <input type="reset" class="button0" value=" 重新填写 " />
    <input type="button" class="button0" value=" 返回列表 " onclick="javascript:window.location.href='<%=context %>/system/module.do?method=list';"/>
    <input type="button" class="button0" value=" 增加菜单 " onclick="javascript:createMenu();"/>
    </td>
  </tr>
</table>
<br>
<DIV id="Demo4">
	    <DIV class="DragContainer" id="DragContainer1" overClass="OverDragContainer">
<%
  if(list!=null && !list.isEmpty()){
     for(int i=0;i<list.size();i++){
         IMenu menu = (IMenu)list.get(i);
%>	    
<div class="DragBox" id="item_<%=i%>" overClass="OverDragBox" dragClass="DragDragBox"  dragObj="0" style="width:700px;font-size:9pt;">
<input type='hidden' name='mnid_<%=i%>' value='<%=menu.id()%>'>
<div class="divn">菜单项
&nbsp;<span title="增加子菜单" onclick="addMenu('<%=menu.id()%>');"><font color="#006699">增加子菜单</font></span>
&nbsp;<span title="删除菜单项" onclick="deleteRow('item_<%=i%>','<%=menu.id()%>');"><font color="#006699">删除</font></span>
</div>
<div class="divn">菜单名称:&nbsp;<input type='text' style='width:500px' class='box3' name='mnname_<%=i%>' value='<%=menu.iname()%>'></div>
<div class="divn">菜单链接:&nbsp;<input type='text' style='width:500px' class='box3' name='mnurl_<%=i%>' value='<%=menu.iurl()%>'></div>
<div class="divn">菜单描述:&nbsp;<input type='text' style='width:500px' class='box3' name='mnmemo_<%=i%>' value='<%=menu.imemo()%>'></div>
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
