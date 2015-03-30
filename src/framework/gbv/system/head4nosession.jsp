<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>  
<%@ page import="java.util.List" %>    
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.basework.console.XSystemConfig"%>
<%@ page import="jt.classic.system.wordbook.XWordbook" %>
<%@ page import="jt.classic.system.wordbook.XWordbookMain" %>
<%@ page import="jt.classic.system.wordbook.XWordbookQuery" %>
<%
  response.setHeader("Pragma","No-cache");//HTTP 1.1 
  response.setHeader("Cache-Control","no-cache");//HTTP 1.0 
  response.setHeader("Expires","0");//防止被proxy 
  

  String context = jt.classic.system.context.ISystemContext.getContextPath();
  
  String serverPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
  
  XWordbookMain wbmain = XWordbookMain.getInstance();
  List headParamList = wbmain.getWord("jspparameters");
  
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
%>    
<script>
  var ip = "<%=request.getRemoteAddr()%>";
  var context = "<%=context%>";
  var serverPath = "<%=serverPath%>";
  var ownerName = "<%=ownerName%>";
  var ownerLogoCSS = "<%=ownerLogoCSS%>";
  var ownerLogo = "<%=ownerLogo%>";
  var ownerURL = "<%=ownerURL%>";
  if(document.all){
      setTimeout("CollectGarbage()",1000);
  }
</script>
<script language="javascript"
	src="<%=context%>/resources/common/js/common.js"></script>
<script language="javascript"
	src="<%=context%>/resources/common/js/hashmap.js"></script>
<!-- ** CSS ** -->
<!-- base library -->
<link rel="stylesheet" type="text/css" href="<%=context%>/resources/ext3/resources/css/ext-all.css" />
<!-- ExtJS library: base/adapter -->
<script type="text/javascript" src="<%=context%>/resources/ext3/adapter/ext/ext-base.js"></script>
<!-- ExtJS library: all widgets -->
<script type="text/javascript" src="<%=context%>/resources/ext3/ext-all.js"></script>
<!-- ExtJS language 
<script type="text/javascript"
	src="<%=context%>/resources/ext3/locale/ext-lang-zh_CN.js"></script>-->
<script>
var EXT_THEME = "<%=StringTool.checkString(XSystemConfig.config().getProperty("EXT_THEME"))%>";
if(EXT_THEME != ""){
Ext.util.CSS.swapStyleSheet('theme', context + '/resources/ext3/resources/css/' + EXT_THEME);
}
Ext.BLANK_IMAGE_URL = "<%=context%>/resources/ext3/resources/images/default/s.gif"; 

Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';
</script>
<script> 
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