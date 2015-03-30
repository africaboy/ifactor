<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.List" %>	
<%@ page import="org.limp.mine.StringTool" %>	
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%@ page import="jt.classic.system.IApplication"%>
<%@ page import="jt.classic.system.wordbook.XWordbook" %>
<%@ page import="jt.classic.system.wordbook.XWordbookMain" %>
<%@ page import="jt.classic.system.plugin.JSCSSPlugin"%>
<%
   response.setHeader("Pragma","No-cache");//HTTP 1.1 
   response.setHeader("Cache-Control","no-cache");//HTTP 1.0 
   response.setDateHeader("Expires",0);//防止被proxy
   
   IUser user = ISystemContext.getSessionUser(request);
   
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   XWordbookMain wbmain = XWordbookMain.getInstance();
   List applicaitonJS = wbmain.getWord("applicationJSCSS");
   
   String applicationTitle = IApplication.D(IApplication.NAME);
   String initDate = request.getParameter("initDate");
   
   StringBuffer applicaitonJSString = new StringBuffer();
   StringBuffer applicaitonCSSString = new StringBuffer();
   
   if(applicaitonJS != null && !applicaitonJS.isEmpty()){
	   	for(int i=0 ; i < applicaitonJS.size(); i++){
	   		XWordbook wb = (XWordbook)applicaitonJS.get(i);
	   		String paramName = StringTool.checkString(wb.getID());
	   		String paramValue = StringTool.checkString(wb.getName());
	   		if(paramName.lastIndexOf(".js") > -1){
	   			applicaitonJSString.append("<script type=\"text/javascript\" src=\"" + (context + paramValue) + "?version="+ IApplication.D(IApplication.STARTUPTIME)+"\"></script>\n");
	   		}else if(paramName.lastIndexOf(".css") > -1){
	   			applicaitonCSSString.append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + (context + paramValue) + "?version="+IApplication.D(IApplication.STARTUPTIME)+"\"></link>\n");
	   		}
	   	}	
   }
   
   List<String> list = JSCSSPlugin.getPlugin();
   
   if (list != null && !list.isEmpty()) {
		for (int i = 0; i < list.size(); i++) {
			String fileName = list.get(i);
			if (fileName.lastIndexOf(".js") > -1) {
				applicaitonJSString.append("<script type=\"text/javascript\" src=\"" + context + list.get(i) + "?version="+IApplication.D(IApplication.STARTUPTIME)+"\"></script>\n");
			} else if (fileName.lastIndexOf(".css") > -1) {
				applicaitonCSSString.append("<link rel=\"stylesheet\" type=\"text/css\" href=\""+context + list.get(i)+"?version="+IApplication.D(IApplication.STARTUPTIME)+"\" />\n");
			}
		}
	}
%>
<html onkeydown="preventBSK(event);">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<%
if(!"".equals(IApplication.D(IApplication.ICON))){
%>
<link type="image/x-icon" rel="shortcut icon"
	href="<%=context %><%=IApplication.D(IApplication.ICON) %>" />
<%
}
%>
<title><%=(applicationTitle == null ? "Welcome" : applicationTitle)%></title>
<jsp:include page="../system/head.jsp"></jsp:include>
<!-- my css style -->
<link rel="stylesheet" type="text/css" href="layout-browser.css"></link>
<!-- page specific css -->
<%=applicaitonCSSString.toString() %>
</head>
<script type="text/javascript">
	var initDate ='<%=initDate%>';
	var initYear;
	var initMonth;
	var initDay;
	if(initDate!=null){
		initYear = initDate.substring(0,4);
	    initMonth = initDate.substring(4,6)-1;
		initDay = initDate.substring(6,8);
	}
</script>
<script>
  var desktop = '<%=("".equals(IApplication.D(IApplication.DESKTOP)) ? "/extframe/desktop.jsp" : IApplication.D(IApplication.DESKTOP)) %>';
</script>
<body>
<jsp:include page="system_plugin.jsp"></jsp:include>
<!-- my js style -->
<script type="text/javascript" src="layout-browser.js"></script>
<!-- page specific -->
<%=applicaitonJSString.toString() %>
<div id="header">
<!-- <img id="logo" src="<%=context %>/extframe/images/jet.png"/>-->
<h1><%=IApplication.D(IApplication.TITLE)%></h1>
<span id="usergroup"><span id="userNameSpan"></span><span id="groupNameSpan"></span></span>
</div>
<div id="loading-mask"></div>
	<div id="loading">
	  <div id="loading-indicator" class="loading-indicator"><img src="<%=context %>/extframe/images/loading.gif" width="120" height="120" style="margin-right:8px;" align="absmiddle"/></div>
	</div>
    <a id="menuhref"></a>
    
</body>
</html>
