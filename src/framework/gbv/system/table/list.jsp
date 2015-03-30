<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	Map tablefiles = (Map) request.getAttribute("tablefiles");
	List list = (List) request.getAttribute("list");

	String tableFileName = (String) request
			.getAttribute("tableFileName");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>注册表列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script language="javascript">
    function handlesel(thizz){
        window.location.href = context + "/system/table.do?method=list&tableFileName=" + thizz.value;
    }
    
    function handleInsert(){
        window.location.href = context + "/system/table.do?method=register";
    }
</script>
<body>
<form name="form1" method="post" action="">
<h2>注册表列表，<a href="javascript:void(0)" onclick="javascript:handleInsert();">新建数据表</a></h2>
<table class="tab4list" width="800">
	<tr>
		<td colspan="2" class="td0">&nbsp;表注册文件&nbsp;<select style="width:200px;" name="tableFileName"
			onchange="javascript:handlesel(this);">
			<%
					if (tablefiles != null) {
					Iterator iter = tablefiles.keySet().iterator();
					while (iter.hasNext()) {
						String tname = (String) iter.next();
			%>
			<option value="<%=tname%>"
				<%=(tableFileName.equals(tname)?"selected":"")%>><%=tname%></option>
			<%
				}
				}
			%>
		</select></td>
	</tr>
	<tr>
		<td class="td1" width="30%">&nbsp;表名称</td>
		<td class="td1" width="70%">&nbsp;表描述</td>
	</tr>
	<%
			if (list != null && !list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				Table table = (Table) list.get(i);
	%>
	<tr onMouseOver="javascript:this.bgColor='#ffff99'"
		onmouseout=" javascript:this.bgColor='#ffffff'" bgColor="#ffffff">
		<td>&nbsp;<%=table.getName()%></td>
		<td>&nbsp;<%=table.getDescription()%></td>
	</tr>
	<%
		}
		}
	%>
</table>
</form>
</body>
</html>
