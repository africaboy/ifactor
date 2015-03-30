<%@ page contentType="text/html;charset=UTF-8"%>
<%
    String context = jt.classic.system.context.ISystemContext.getContextPath();
    String flowxml = (String)request.getAttribute("flowxml");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns:v="urn:schemas-microsoft-com:vml">
	<head>
		<title>添加</title>

		<meta http-equiv="content-type" content="text/html; charset=UTF-8">

		<script charset="UTF-8" src="<%=context %>/XiorkFlow/js/XiorkFlowWorkSpace.js" language="javascript"></script>
		<script charset="UTF-8" src="<%=context %>/demo/addprocess.js" language="javascript"></script>

	</head>
	<body onload="init()" onselectstart="return false;" style="margin: 0px;overflow: hidden;">
	<form name="form1" method="post"></form>
        <input type="hidden" id="wobject" name="wobject" value="">
        <input type="hidden" id="wobjectname" name="wobjectname" value="">
        <input type="hidden" id="suportkey" name="suportkey" value="">
		<div id="designer" style="width: 100%;height: 100%;border: #e0e0e0 1px solid;"></div>
		<div id="message"></div>	
    <script>
        var xnode = new MouseMenu("xnode");
		xnode.addLink("详细设置", 1, "javascript:handleDetail();");
		xnode.addLink("操作设置", 1, "javascript:handleObjectItem();");
		xnode.addHR();
		xnode.addLink("删除节点", 1, "javascript:handleDeleteItem();");
		
		var xtransition = new MouseMenu("xtransition");
		xtransition.addLink("详细设置", 1, "javascript:handleDetail();");
		xtransition.addHR();
		xtransition.addLink("删除过渡", 1, "javascript:handleDeleteItem();");
    </script>		
	</body>
</html>
