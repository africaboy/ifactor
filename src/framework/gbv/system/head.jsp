<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.role.IRole"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="org.limp.basework.console.XSystemConfig"%>
<%@ page import="jt.classic.system.wordbook.XWordbook"%>
<%@ page import="jt.classic.system.wordbook.XWordbookMain"%>
<%@ page import="jt.classic.system.wordbook.XWordbookQuery" %>
<%
	response.setHeader("Pragma", "No-cache");//HTTP 1.1 
	response.setHeader("Cache-Control", "no-cache");//HTTP 1.0 
	response.setHeader("Expires", "0");//防止被proxy 

	String context = jt.classic.system.context.ISystemContext
			.getContextPath();

	String serverPath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort();
	
	String sessionId = request.getSession().getId();
			
	  
	XWordbookMain wbmain = XWordbookMain.getInstance();
	XWordbookQuery wordbookQuery = wbmain.getWordbookQuery("owner-configure");
	  
	String ownerName = "GBV";
	String ownerLogo = "/system/console/images/web-logo.png";
	String ownerLogoCSS = "defaultlogo";
	String ownerURL = "javascript:void(0);";
	
	if(wordbookQuery != null){
		  XWordbook ownerNameWB = wordbookQuery.query("ownerName");
		  if(ownerNameWB != null){
			  ownerName = ownerNameWB.getName();
		  }
		  XWordbook ownerLogoWB = wordbookQuery.query("ownerLogo");
		  if(ownerLogoWB != null){
			  ownerLogo = ownerLogoWB.getName();
		  }
		  XWordbook ownerLogoCSSWB = wordbookQuery.query("ownerLogoCSS");
		  if(ownerLogoCSSWB != null){
			  ownerLogoCSS = ownerLogoCSSWB.getName();
		  }
		  XWordbook ownerURLWB = wordbookQuery.query("ownerURL");
		  if(ownerURLWB != null){
			  ownerURL = ownerURLWB.getName();
		  }
	}	

	if (ISystemContext.invalidSesstion(request)) {
		out.println("<script language='javascript'>");
		out.println("alert(\"当前会话无效,请重新登录\");");
		out.println("top.location = '"
		+ (context.equals("") ? "/" : context) + "';");
		out.println("</script>");
	} else {
		IUser user = ISystemContext.getSessionUser(request);
		String ssosessionkey = ISystemContext.getSSOSessionKey(user);

		List roleList = user.iroles();

		List headParamList = wbmain.getWord("jspparameters");

		String thizDate = DateTrimmer.getYMD();
		String thizDateLabel = DateTrimmer.getYMD_LBL(thizDate);
		String thizTime = DateTrimmer.getYMDHMS();
		String thizTimeLabel = DateTrimmer.getYMDHMS_LBL(thizTime);
%>

<script>
	var context = "<%=context%>";
	var serverPath = "<%=serverPath%>";
	var sessionId = "<%=sessionId%>";
	var SSOSESSIONKEY = "<%=ssosessionkey%>";
	var userLogid = "<%=user.ilogid()%>";
	var userId = "<%=user.id()%>";
	var userName = "<%=user.iname()%>";
	var userCode = "<%=user.inumber()%>";
	var groupId = "<%=(user.igroup() != null ? user.igroup().id() : "")%>";
	var groupName = "<%=(user.igroup() != null ? user.igroup().iname() : "")%>";
	var groupCode = "<%=(user.igroup() != null ? user.igroup().inumber() : "")%>";
	var groupNO = "<%=(user.igroup() != null ? user.igroup().ideptCode() : "")%>";
	var groupArea = "<%=(user.igroup() != null ? user.igroup().iarea() : "")%>";
	var thizDate = "<%=thizDate%>";
	var thizDateLabel = "<%=thizDateLabel%>";
	var thizDateStart = "<%=thizDate + "000000"%>";
	var thizDateEnd = "<%=thizDate + "240000"%>";
	var thizTime = "<%=thizTime%>";
	var thizTimeLabel = "<%=thizTimeLabel%>";
	var IP = "<%=request.getRemoteAddr()%>";
	
	var ownerName = "<%=ownerName%>";
  	var ownerLogoCSS = "<%=ownerLogoCSS%>";
 	var ownerLogo = "<%=ownerLogo%>";
 	var ownerURL = "<%=ownerURL%>";

	if(document.all){
	     setTimeout("CollectGarbage()",1000);
	}
  
  	var XSYSTEM_DB = "<%=XSystemConfig.config().getProperty(XSystemConfig.XSYSTEM_DB)%>";
	var XSYSTEM_ANNEX_TRANSACTOR = "<%=XSystemConfig.config().getProperty(XSystemConfig.XSYSTEM_ANNEX_TRANSACTOR)%>";
	var XSYSTEM_DATASOURCE = "<%=XSystemConfig.config().getProperty(XSystemConfig.XSYSTEM_DATASOURCE)%>";
	var XSYSTEM_CHARSETNAME = "<%=XSystemConfig.config().getProperty(XSystemConfig.XSYSTEM_CHARSETNAME)%>";
	var XSYSTEM_SESSIONFILTER = "<%=XSystemConfig.config().getProperty(XSystemConfig.XSYSTEM_SESSIONFILTER)%>";
	var XSYSTEM_CHECKBROWSER = "<%=XSystemConfig.config().getProperty(XSystemConfig.XSYSTEM_CHECKBROWSER)%>";
	var XSYSTEM_CONSOLE_IP = "<%=XSystemConfig.config().getProperty(XSystemConfig.XSYSTEM_CONSOLE_IP)%>";
	var GROOVE_VERSION = "<%=XSystemConfig.config().getProperty("GROOVE_VERSION")%>";
</script>
<script language="javascript"
	src="<%=context%>/resources/common/js/common.js"></script>
<script language="javascript"
	src="<%=context%>/resources/common/js/hashmap.js"></script>
<!-- ** CSS ** -->
<!-- base library -->
<link rel="stylesheet" type="text/css"
	href="<%=context%>/resources/ext3/resources/css/ext-all.css" />
<!-- ExtJS library: base/adapter -->
<script type="text/javascript"
	src="<%=context%>/resources/ext3/adapter/ext/ext-base.js"></script>
<!-- ExtJS library: all widgets -->
<script type="text/javascript"
	src="<%=context%>/resources/ext3/ext-all.js"></script>
<!-- ExtJS language 
<script type="text/javascript"
	src="<%=context%>/resources/ext3/locale/ext-lang-zh_CN.js"></script>-->
<script>
var EXT_THEME = "<%=StringTool.checkString(XSystemConfig.config().getProperty("EXT_THEME"))%>";
if(EXT_THEME != ""){
Ext.util.CSS.swapStyleSheet('theme', context + '/resources/ext3/resources/css/' + EXT_THEME);
}
Ext.BLANK_IMAGE_URL = "<%=context%>/resources/ext3/resources/images/default/s.gif"; 
</script>
<script>
    var roles = new HashMap(); 
    <%
    	if(roleList != null && !roleList.isEmpty()){
    		for(int i = 0 ; i< roleList.size(); i++){
    			IRole role = (IRole)roleList.get(i);
    %>
    roles.put('<%=role.ikey()%>', '<%=role.iname()%>');
    <%
    		}
    	}
    %>
    
    <%
        if(headParamList != null && !headParamList.isEmpty()){
        	for(int i=0;i<headParamList.size();i++){
        		XWordbook wb = (XWordbook)headParamList.get(i);
        		String paramName = StringTool.checkString(wb.getID());
        		String paramValue = StringTool.checkString(wb.getName());
        		if(!paramName.equals("")){
    %>
    var <%=paramName%> = '<%=paramValue%>';
    <%
        	
        		}
        	}	
        }
    %>
</script>
<%
}
%>
