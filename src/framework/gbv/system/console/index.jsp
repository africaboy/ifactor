<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>    
<%@ page import="jt.classic.system.context.ISystemContext" %>
<%@ page import="jt.classic.system.IApplication"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	
	IUser user = ISystemContext.getSessionUser(request);
	
	String userName = user != null ? user.iname() : "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%if(!"".equals(IApplication.D(IApplication.ICON))){ %>
<link type="image/x-icon" rel="shortcut icon" href="<%=context %><%=IApplication.D(IApplication.ICON) %>" />
<%} %>
<title>系统控制台</title>
</head>
<script>
    document.location = '<%=context%>/GAP/index.jsp';
</script>
<jsp:include page="../head.jsp"></jsp:include>
<!-- plug -->
<script type="text/javascript" src="<%=context %>/system/console/js/rightmenu.js"></script>
<!-- 控制台桌面 -->
<link rel="stylesheet" type="text/css" href="<%=context%>/resources/ext3/ux/css/Portal.css" />
<script type="text/javascript" src="<%=context %>/system/console/js/desktop.js"></script>
<!-- 控制台 -->
<link rel="stylesheet" type="text/css" href="<%=context%>/system/console/css/console.css" ></link>
<script type="text/javascript" src="<%=context %>/system/console/js/console.js"></script>
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
<!-- 对象管理 -->
<link rel="stylesheet" type="text/css" href="<%=context%>/system/object/css/objectmanage.css" ></link>
<script type="text/javascript" src="<%=context %>/system/object/js/objectmanage.js"></script>
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
<script>
var maxMemory = "<%=(String.valueOf(Runtime.getRuntime().maxMemory() / (1024 * 1024)) + "M")%>";
var freeMemory = "<%=(String.valueOf(Runtime.getRuntime().freeMemory() / (1024 * 1024)) + "M")%>";
var totalMemory = "<%=(String.valueOf(Runtime.getRuntime().totalMemory() / (1024 * 1024)) + "M")%>";
</script>
<body>
<div id="loading-mask" style=""></div>
  <div id="loading">
    <div class="loading-indicator"><img src="<%=context %>/system/console/images/extanim32.gif" width="32" height="32" style="margin-right:8px;" align="absmiddle"/>页面加载中...</div>
  </div>
  <div id="header">
	<a href="javascript:void(0);" style="float:right;margin-right:10px;"><img src="<%=context %>/system/console/images/web_logo.png" style="height:25px;margin-top:-2px;"/></a>
	<span style="float:left;margin-left:5px;color:#ffffff;font-size:14px;font-family:Georgia;">Groove Release Standard Edition</span>
    <span style="float:left;margin-left:100px;color:#ffffff;font-size:14px;font-family:SimSu;">会话用户 --- <%=userName %></span>
  </div>
   <div id="west" class="x-hide-display">
    </div>
    <div id="props-panel" class="x-hide-display" style="width:200px;height:200px;overflow:hidden;">
    </div>
    <form name="form1" method="post" action=""></form>
    <iframe width="0" height="0" name="dldfrm" id="dldfrm" src="<%=context %>/system/blank.jsp"></iframe>
</body>
</html>