<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.RandomUtil"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.workflow.WSupport"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	String key = RandomUtil.getRandomString(10, true);

	List list = (List) request.getAttribute("list");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>新建实体对象</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<body>
<script src="<%=context%>/system/object/fckeditor/fckeditor.js"></script>
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
</script>
<form name="form1" method="post" action="">
<h1>创建视图表单&nbsp;<a href="javascript:void(-1);" onclick="javascript:handleSubmit();">提交保存</a></h1>
<table class="tab4edit" width="98%">
	<tr>
		<td width="25%">&nbsp;<label>表单名称</label><br><input type="text"
			class="box3" name="oname" value="">
		</td>
		<td width="25%">	
		&nbsp;<label>标识key</label><br><input type="text" class="box3"
			name="okey" value="<%=key%>"></td>
		<td width="25%">&nbsp;<label>所属系统</label><br><select name="system">
			<%
					if (list != null && !list.isEmpty()) {
					for (int i = 0; i < list.size(); i++) {
						WSupport suport = (WSupport) list.get(i);
			%>
			<option value="<%=suport.ikey()%>"><%=suport.iname()%></option>
			<%
				}
				}
			%>
		</select></td>
		<td width="25%">	
		&nbsp;<label>事件处理类</label><br><input type="text" class="box3"
			name="ohandle" value=""></td>
	</tr>
	<tr>
		<td colspan="4" align="center">
	<input type="hidden" name="ocontent" value="">
	<iframe id="FCKeditor1___Frame" src="<%=context%>/system/object/fckeditor/editor/fckeditor.html?InstanceName=ocontent&Toolbar=Object"
							width="100%" height="430" frameborder="0" scrolling="no"></iframe>
	</td>
	</tr>
</table>
</form>
</body>
</html>
