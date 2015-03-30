<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>    
<%@ page import="jt.classic.system.context.ISystemContext" %>
<%@ page import="jt.classic.system.IApplication"%>
<%
    String context = request.getContextPath();

	IUser user = ISystemContext.getSessionUser(request);
	
	String userName = user != null ? user.iname() : "";
%>
<!DOCTYPE HTML>
<html onkeydown="preventBSK(event);">
<head>
    <meta charset="UTF-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> -->
	<META http-equiv="X-UA-Compatible" content="IE=8" />
    <%if(!"".equals(IApplication.D(IApplication.ICON))){ %>
		<link type="image/x-icon" rel="shortcut icon" href="<%=context %><%=IApplication.D(IApplication.ICON) %>" />
	<%} %>
    <title>JET Application-Enabling Platform</title>
	<jsp:include page="../system/head.jsp"></jsp:include>
	
	<!-- 数据字典设置组件 -->
	<script type="text/javascript" src="<%=context %>/system/wordbook/js/wbstore.js"></script>
	<!-- 组织机构组件 -->
	<script type="text/javascript" src="<%=context %>/system/group/js/groupcombo.js"></script>
	
	<script type="text/javascript" src="<%=context %>/GAP/index_clean.js"></script>
	<link rel="stylesheet" href="<%=context %>/GAP/data-view.css"/>
	<script>
		var maxMemory = "<%=(String.valueOf(Runtime.getRuntime().maxMemory() / (1024 * 1024)) + "M")%>";
		var freeMemory = "<%=(String.valueOf(Runtime.getRuntime().freeMemory() / (1024 * 1024)) + "M")%>";
		var totalMemory = "<%=(String.valueOf(Runtime.getRuntime().totalMemory() / (1024 * 1024)) + "M")%>";
	</script>
	
	<!-- 系统日志 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/log/css/logmanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/log/js/logmanage.js"></script>
	<!-- 组织机构组件 -->
	<script type="text/javascript" src="<%=context %>/system/group/js/groupcombo.js"></script>
	<!-- 机构管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/group/css/groupmanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/group/js/groupmanage.js"></script>
	<!-- 用户管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/user/css/usermanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/user/js/usermanage.js"></script>
	<!-- 角色管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/role/css/rolemanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/role/js/rolemanage.js"></script>
	<!-- 模块管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/module/css/modulemanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/module/js/modulemanage.js"></script>
	<!-- 权限设置 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/purview/css/purviewmanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/purview/js/purviewmanage.js"></script>
	<!-- 注册表管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/table/css/tablemanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/table/js/tablemanage.js"></script>
	<script type="text/javascript" src="<%=context %>/system/table/js/tablelistcombobox.js"></script>
	<!-- 对象管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/object/css/objectmanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/object/js/objectmanage.js"></script>
	<script type="text/javascript" src="<%=context %>/system/object/js/objectlistcombo.js"></script>
	<!-- 字典管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/wordbook/css/wbmanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/wordbook/js/wbmanage.js"></script>
	<!-- 数据字典设置组件 -->
	<script type="text/javascript" src="<%=context %>/system/wordbook/js/wbstore.js"></script>
	<script type="text/javascript" src="<%=context %>/system/wordbook/js/wblist.js"></script>
	<!-- 数据类别管理组件 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/dataindex/css/ddmanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/dataindex/js/ddmanage.js"></script>
	<!-- 附件管理组件 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/annex/css/annexmanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/annex/js/annexlist.js"></script>
	<!-- 表查询定义管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/tablequery/css/querymanage.css" ></link>
	<script type="text/javascript" src="<%=context%>/system/tablequery/js/querymanage.js"></script>
	<!-- 对象查询管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/objquery/css/querymanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/objquery/js/querymanage.js"></script>
	<script type="text/javascript" src="<%=context %>/system/purview/js/purviewobjlist.js"></script>
	<!-- 工作流管理 -->
	<link rel="stylesheet" type="text/css" href="<%=context%>/system/workflow/css/wfmanage.css" ></link>
	<script type="text/javascript" src="<%=context %>/system/workflow/js/wfmanage.js"></script>
</head>
<body>
<div id="loading-mask"></div>
<div id="loading">
  <div class="loading-indicator"><img src="<%=context %>/GAP/welcome/img/loading.gif" width="120" height="120" style="margin-right:8px;" align="absmiddle"/>页面内容加载中...</div>
</div>
<form name="form1" method="post" action=""></form>
<iframe width="0" height="0" style="display:none;" name="dldfrm" id="dldfrm" src="<%=context %>/system/blank.jsp"></iframe>
</body>
</html>


