<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.basework.console.XSystemConfig"%>
<%@ page import="jt.classic.system.IApplication"%>
<%@ page import="org.limp.mine.StringTool"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String productVersion = (String)XSystemConfig.config().getProperty("PRODUCT_VERSION");
   
   String applicationTitle = IApplication.D(IApplication.NAME);

%>  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> 
<html> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<%if(!"".equals(IApplication.D(IApplication.ICON))){ %>
<link type="image/x-icon" rel="shortcut icon" href="<%=context %><%=IApplication.D(IApplication.ICON) %>" />
<%} %>
<title><%=(applicationTitle == null ? "Welcome!" : applicationTitle)%></title> 
<jsp:include page="system/head4nosession.jsp"></jsp:include>
<script type="text/javascript" src="<%=context %>/GAP/js/GAPGlobal.js"></script>
<script type="text/javascript"
	src="<%=context %>/resources/common/js/options-toolbar.js"></script>
<style type="text/css"> 
.login{ 
    background-image: url(<%=context%>/extframe/images/monitor.png) !important; 
} 
</style>
<script>
   var HOMEPAGE = '<%=StringTool.defaultForEmpty(IApplication.D(IApplication.INDEX), "/extframe/index.jsp")%>';
   var PRODUCT = '<%=StringTool.checkString(productVersion)%>';
   //var welcome = '<%=StringTool.defaultForEmpty(IApplication.D(IApplication.WELCOME), "欢迎光临")%>';
   var welcome =  grooveTranslator.getLangLabel('welcome-language', 'welcomeLogin');
   var thumb = '<%=IApplication.D(IApplication.THUMB)%>';
   var icon = '<%=IApplication.D(IApplication.ICON)%>'; 
</script> 
<script type="text/javascript" language="JavaScript" src="<%=context %>/resources/common/js/login.js"></script> 
</head> 
<body style="background-image:url('<%=context %>/extframe/images/square.gif');">
<div id="language" style="position:absolute;float:right;z-index:100;right:0;top:0;margin-top:10px;margin-right:20px;"></div>
</body>
</html> 