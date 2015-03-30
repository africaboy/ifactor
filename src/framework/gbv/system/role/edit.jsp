<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.role.IRole"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   IRole role = (IRole)request.getAttribute("role");
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
<form name="form1" method="post" action="<%=context%>/system/role.do?method=update"> 
<input type="hidden" id="rid" name="rid" value="<%=role.id()%>">
<h1>角色信息编辑</h1> 
<table class="tab4edit" width="98%">
  <tr class="tr1">
    <td width="161" class="td1">&nbsp;角色名称</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="rname" value="<%=role.iname()%>"></td>
  </tr>
  <tr class="tr1">
    <td width="161" class="td1">&nbsp;唯一标识</td>
    <td class="td2">
    <%if(role.ikey().equals("admin")){%>
    &nbsp;<%=role.ikey()%>
    <%}else{%>
    &nbsp;<input type="text" class="box3" name="rkey" value="<%=role.ikey()%>"></td>
    <%}%>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;角色说明</td>
    <td class="td2">&nbsp;<input type="text" class="box3" name="rmemo" value="<%=role.imemo()%>"></td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1">&nbsp;角色类型</td>
    <td class="td2">&nbsp;真实角色<input type="radio" name="rrv" value="1" <%=(role.ireal()?"checked":"")%> onclick="javascript:handleType(this);">
    虚拟角色<input type="radio" name="rrv" value="0" <%=(!role.ireal()?"checked":"")%> onclick="javascript:handleType(this);"></td>
  </tr>
  <tr class="tr1">
    <td valign="top" class="td1">&nbsp;<a href="javascript:void(0);" onclick="javascript:handleSelect();">相关性设置</a></td>
    <td class="td2" >&nbsp;<div style="display:<%=(role.ireal()?"block":"none")%>;"  title="点击选择" id="names" style="height:100px;width:100%;overflow-y:scroll;border-bottom:1px #6199C5 solid;">
    <%
       Object[] objs = role.iobjects();
       if(objs != null && objs.length > 0){
          for(int i=0;i<objs.length;i++){
              Object[] temp = (Object[])objs[i];
              String type = (String)temp[0];
              String id = (String)temp[1];
              String name = (String)temp[2];
    %>
         <div id='<%=type%><%=id%>' dtype='roleobj' dname='<%=name%>'><%=name%>&nbsp;<span title='删除' style='cursor:hand;' 
onclick="javascript:handleRemove('<%=type%><%=id%>');">删除</span>;</div>
    <%
          }
       }
    %>&nbsp;
    </div>
    <input type="hidden" name="ids" value="">
    <div id="vir" style="display:<%=(!role.ireal()?"block":"none")%>;">
    <select name="rrvtype">
      <option value="G" <%=(role.irvtype().equals("G")?"selected":"")%>>组级别相关</option>
      <option value="U" <%=(role.irvtype().equals("U")?"selected":"")%>>用户级别相关</option>
    </select>
    <input type="text" class="box3" name="rrvrating" value="<%=role.irvrating()%>">
    </div>
    </td>
  </tr>
  <tr class="tr1"> 
    <td colspan="2" align="center" class="td2">
      <input type="button" class="button0" name="Button" value=" 保 存 " onclick="javascript:handleSubmit();"/>
      <input type="reset" class="button0" name="Reset" value="重新填写" />
      <input type="button" class="button0" name="Button1" value="角色列表" onclick="javascript:window.location.href='<%=context %>/system/role.do?method=list';"/>
      <%if(!"admin".equals(role.ikey()) && !"groupadmin".equals(role.ikey())){%><input type="button" class="button0" name="Button" value=" 删 除 " onclick="javascript:handleDelete();"/><%}%>
    </td>
  </tr>
</table>
</form>
</body>
</html>
