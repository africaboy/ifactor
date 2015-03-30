<%@ page contentType="text/html;charset=UTF-8"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<body>
<script src="<%=context%>/system/role/js/myjs.js"></script>
<form name="form1" method="post" action="<%=context%>/system/role.do?method=save"> 
<h1>角色定义</h1>
<table class="tab4edit" width="98%">
  <tr class="tr1">
    <td width="161" class="td1" width="150">&nbsp;角色名称</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="rname" value=""></td>
  </tr>
  <tr class="tr1">
    <td width="161" class="td1">&nbsp;唯一标识</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="rkey" value=""></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;角色说明</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="rmemo" value=""></td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1">&nbsp;角色类型</td>
    <td class="td2">&nbsp;真实角色<input type="radio" name="rrv" value="1" checked onclick="javascript:handleType(this);">
    虚拟角色<input type="radio" name="rrv" value="0" onclick="javascript:handleType(this);"></td>
  </tr>
  <tr class="tr1">
    <td valign="top" class="td1">&nbsp;<a href="javascript:void(0);" onclick="javascript:handleSelect();">相关性设置</a></td>
    <td class="td2">&nbsp;<div style="display:block;" title="点击选择" id="names" style="height:100px;width:100%;overflow-y:scroll;border-bottom:1px #6199C5 solid;">&nbsp;</div>
    <input type="hidden" name="ids" value="">
    <div id="vir" style="display:none;">
    <select name="rrvtype">
      <option value="G">组级别相关</option>
      <option value="U">用户级别相关</option>
    </select>
    <input type="text" class="box3" name="rrvrating" value="">
    </div>
    </td>
  </tr>
  <tr class="tr1"> 
    <td class="td2" colspan="2" align="center">
      <input type="button" class="button0" name="Button" value=" 保 存 " onclick="javascript:handleSubmit();"/>
      <input type="reset" class="button0" name="Reset" value="重新填写" />
      <input type="button" class="button0" name="Button1" value="角色列表" onclick="javascript:window.location.href='<%=context %>/system/role.do?method=list';"/>
    </td>
  </tr>
</table>
</form>
</body>
</html>
