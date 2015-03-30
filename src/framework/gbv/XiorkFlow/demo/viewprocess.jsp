<%@ page contentType="text/html;charset=UTF-8"%>
<%
   String insid = (String)request.getParameter("insid");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns:v="urn:schemas-microsoft-com:vml">
	<head>
		<title><%if(insid != null){%>工作流转过程跟踪<%}else{%>浏览<%}%></title>

		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<jsp:include page="head.jsp"></jsp:include>
<script>
var insid = "<%=((insid != null) ? insid : "")%>";
</script>
		<script charset="UTF-8" src="../js/XiorkFlowWorkSpace.js" language="javascript"></script>
		<script charset="UTF-8" src="viewprocess.js" language="javascript"></script>
	</head>
	<body onload="init()" style="margin: 0px;">
		<div id="designer" style="width: 100%;height: 100%;border: #e0e0e0 1px solid;"></div>
	</body>
</html>
