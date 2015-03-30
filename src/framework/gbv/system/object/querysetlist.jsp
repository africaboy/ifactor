<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WObjectQuery"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();

   String objkey = (String)request.getAttribute("objkey");
   
   List list = (List)request.getAttribute("list");
   
   List queryList = (List)request.getAttribute("querylist");
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>实体对象列表</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script src="<%=context%>/system/object/js/queryset.js"></script>
<script>
   
</script>
<body>
<form name="form1" method="post" action=""> 
<h2>表单对象查询分析，选择表单对象&nbsp;<select onchange="javascript:selQuerySet(this);" name="objkey">
  <%
    if(list != null && !list.isEmpty()){
       for(int i=0;i<list.size();i++){
           WObject obj = (WObject)list.get(i);
  %>
  <option value="<%=obj.ikey()%>" <%=(objkey.equals(obj.ikey()) ? "selected" : "") %>><%=obj.iname()%></option>
  <%     
       }
    }
  %>
  </select>，<a href="javascript:void(0)" onclick="javascript:handleQuerySet();">进行查询分析定义</a></h2> 
<table class="tab4edit" width="98%">  
  <tr>
    <td class="td1" width="30%">&nbsp;<label>查询名称</label></td>
    <td class="td1" width="30%">&nbsp;<label>查询说明</label></td>
    <td class="td1" width="20%">&nbsp;<label>快捷链接</label></td>
    <td class="td1">&nbsp;</td>
  </tr>
  <%
          if(queryList != null && !queryList.isEmpty()){
          for(int i=0;i<queryList.size();i++){
             ObjectQuery query = (ObjectQuery)queryList.get(i);
  %>
  <tr>
    <td>&nbsp;<a href="javascript:void(0)" onclick="javascript:handleEdit('<%=query.id()%>');"><%=query.iname()%></a></td>
    <td>&nbsp;<%=query.idesc()%></td>
    <td>&nbsp;<textarea rows="3" title="复制作为菜单链接" onclick="javascript:this.select();"><%="/system/objectquery.do?method=list&key=" + query.iobject().ikey() + "&querykey="
	+ query.id()%></textarea></td>
    <td align="center">
    <a href="javascript:void(0)" onclick="javascript:handleQuery('<%=query.iobject().ikey() %>', '<%=query.id()%>');">查 看</a>
    &nbsp;
    <a href="javascript:void(0)" onclick="javascript:handleEdit('<%=query.id()%>');">编 辑</a>
    &nbsp;
    <a href="javascript:void(0)" onclick="javascript:handleDel('<%=query.id()%>');">删 除</a>
    </td>
  </tr>
  <%
        }
     }
  %>
</table>
</form>
</body>
</html>
