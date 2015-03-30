<%@ page contentType="text/html;charset=UTF-8"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
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
<body onload="init(0);">
<form id="form1" name="form1" method="post" action="<%=context%>/system/module.do?method=save">
<h1>系统模块定义</h1>
<table class="tab4edit" width="800">
  <tr class="tr1">
    <td class="td1" width="20%">&nbsp;模块名称</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="mname"></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;模块说明</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="mmemo" /></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;自定义导向</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="murl" /></td>
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
    <td class="td2">&nbsp;<input type="text" class="box3" name="msort" /></td>
  </tr>
  <tr class="tr1">
    <td class="td2" colspan="2" align="center">&nbsp;
    <input type="button" class="button0" value=" 保 存 " onclick="javascript:handleSubmit();"/>
    <input type="reset" class="button0" value=" 重新填写 " />
    <input type="button" class="button0" value=" 返回列表 " onclick="javascript:window.location.href='<%=context %>/system/module.do?method=list';"/>
    <input type="button" class="button0" value=" 增加菜单 " onclick="javascript:createMenu();"/>
    </td>
  </tr>
</table>
<br>
<DIV id="Demo4" >
	    <DIV class="DragContainer" id="DragContainer1" overClass="OverDragContainer"></DIV>
	 </DIV>
</form>
</body>
</html>
