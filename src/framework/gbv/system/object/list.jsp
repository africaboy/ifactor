<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	List list = (List) request.getAttribute("list");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>实体对象列表</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script>
   function handleSubmit(){
       if(isblank(D("oname"))){
          alert("请给表单命名中文名称");
       }else if(isblank(D("okey"))){
          alert("请指定表单标识key(提示：可使用表单中文名称各字首字母拼音)");
       }else if(confirm("确定保存视图表单")){
          document.form1.action = "<%=context%>/system/object.do?method=save";
          document.form1.submit();
       }
   }
   
   function handleDelete(id, name){
       if(confirm("删除操作不可恢复,表单对象属性信息及其所有关联的表信息,表数据信息将一同被删除,确定执行")){
           document.form1.action = "<%=context%>/system/object.do?method=delete&okey=" + id;
           document.form1.submit();
       }
   }
</script>
<body>
<form name="form1" method="post" action="">
<h1>表单对象列表</h1>
<table class="tab4list" width="800" align="center">
	<tr>
		<td class="td1" width="10%">&nbsp;</td>
		<td class="td1" width="20%"><label>表单对象名称</label></td>
		<td class="td1" width="20%"><label>所属系统</label></td>
		<td class="td1" width="20%"><label>新建表单对象</label></td>
		<td class="td1" width="20%"><label>表单对象列表</label></td>
		<td class="td1">&nbsp;</td>
	</tr>
	<%
			if (list != null && !list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				WObject obj = (WObject) list.get(i);
	%>
	<tr>
		<td align="center">&nbsp;<%=(i + 1)%></td>
		<td>&nbsp;<%
		if (obj.iview4diy()) {
		%><a
			href="<%=context%>/system/object.do?method=edit&key=<%=obj.ikey()%>"><%=obj.iname()%></a>
		<%
		} else {
		%><%=obj.iname()%>
		<%
		}
		%>
		</td>
		<td>&nbsp;<%=obj.isupport().iname()%></td>
		<td>&nbsp;<a
			href="<%=context%>/system/objectcreator.do?method=neu&key=<%=obj.ikey()%>"><%=obj.iname()%></a></td>
		<td>&nbsp;<a
			href="<%=context%>/system/objectquery.do?method=list&key=<%=obj.ikey()%>"><%=obj.iname()%></a></td>
		<td align="center">&nbsp;<a
			href="javascript:void(0)" onclick="javascript:handleDelete('<%=obj.ikey()%>','<%=obj.iname()%>');">删
		除</a></td>
	</tr>
	<%
		}
		}
	%>
</table>
</form>
</body>
</html>
