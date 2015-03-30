<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma", "No-cache");//HTTP 1.1 
	response.setHeader("Cache-Control", "no-cache");//HTTP 1.0 
	response.setHeader("Expires", "0");//防止被proxy 

	String context = jt.classic.system.context.ISystemContext.getContextPath();

	String serverPath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort();
%>
<script>
  var context = "<%=context%>";
  var serverPath = "<%=serverPath%>";
</script>
<script src="<%=context %>/resources/common/js/hashmap.js"></script>
<script src="../plugs/diawin.js"></script>
<script src="../plugs/dialog.js"></script>
<style>
/*diawin.js use it*/
.mesWindow {
	border: #cccccc 1px solid;;
	background: #fff;
}

.mesWindowTop {
	cursor: hand;;
	border-bottom: #eee 1px solid;;
	margin-left: 4px;
	padding: 3px;
	font-weight: bold;
	text-align: left;
	font-size: 12px;
}

.mesWindowContent {
	margin: 4px;;
	font-size: 12px;
}

.mesWindow .close {
	height: 15px;
	width: 35px;
	border: none;
	cursor: pointer;
	text-decoration: underline;;
	background: #fff
}
</style>
