<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.HTMLTool"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.workflow.WSupport"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	WObject obj = (WObject) request.getAttribute("obj");

	WSupport mysuport = obj.isupport();

	List list = (List) request.getAttribute("list");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>编辑实体对象</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<body>
<script src="<%=context%>/system/object/fckeditor/fckeditor.js"></script>
<script>
   function handleSubmit(){
       if(isblank(D("ocontent"))){
          alert("请编制表单视图内容)");
       }else if(confirm("确定修改视图表单")){
          document.form1.action = "<%=context%>/system/object.do?method=update";
          document.form1.submit();
       }
   }
</script>
<form name="form1" method="post" action=""><input type="hidden"
	name="okey" value="<%=obj.ikey()%>">
<h1>创建视图表单&nbsp;<a href="javascript:void(-1);" onclick="javascript:handleSubmit();">提交修改</a></h1>
<table width="98%" class="tab4edit">
	<tr>
		<td width="25%">&nbsp;<label>表单名称</label><br><input type="text"
			class="box3" name="oname" value="<%=obj.iname()%>"></td>
		<td width="25%">&nbsp;<label>标识key</label><br><%=obj.ikey()%></td>
		<td width="25%">&nbsp;<label>所属系统</label><br><select name="system">
			<%
					if (list != null && !list.isEmpty()) {
					for (int i = 0; i < list.size(); i++) {
						WSupport suport = (WSupport) list.get(i);
			%>
			<option value="<%=suport.ikey()%>"
				<%=(mysuport.ikey().equals(suport.ikey())?"selected":"")%>><%=suport.iname()%></option>
			<%
				}
				}
			%>
		</select></td>
		<td width="25%">	
		&nbsp;<label>事件处理类</label><br><input type="text" class="box3"
			name="ohandle" value="">
	</tr>
	<tr>
		<td colspan="4" align="center"><script type="text/javascript">
	<!--
	var sBasePath = context + "/system/object/fckeditor/" ;
	//alert(sBasePath);
	var oFCKeditor = new FCKeditor( 'ocontent' ) ;
	oFCKeditor.BasePath	= sBasePath ;
	oFCKeditor.Height	= 430 ;
	oFCKeditor.Value	= '<%=obj.iview4new().replaceAll("'", "&acute;")%>' ;
	oFCKeditor.Create() ;
	//-->
	</script></td>
	</tr>
</table>
</form>
</body>
</html>
