<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.workflow.WFlow"%>
<%@ page import="org.limp.mine.StringTool" %>
<%
    String context = jt.classic.system.context.ISystemContext.getContextPath();
    
    String type = (String) request.getAttribute("type");
    String id = (String) request.getAttribute("id");
    
    String insid = StringTool.checkString(request.getAttribute("insid"));
    String currentActId = StringTool.checkString(request.getAttribute("currentActId"));
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>工作流程</title>
<base target="_self" />
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script language="javascript">
function init(){
   document.form1.submit();
}
</script>
<body onload="javascript:init();">
<form id="form1" name="form1" method="post"
	action="<%=context %>/system/flowplotter.do?method=todo">
<input type="hidden" name="id" value="<%=id %>" />
<input type="hidden" name="insid" value="<%=insid %>" />
<input type="hidden" name="currentActId" value="<%=currentActId %>" />
<input type="hidden" name="type" value="<%=type %>" />
<br><br><br><br><br><br><br><br><br><br><br><br>
<center> 
正在初始化流程图形设计器......
</center>
</form>
</body>
</html>
