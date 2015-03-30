<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.IApplication"%>
<%@ page import="jt.classic.system.wordbook.XWordbook" %>
<%@ page import="jt.classic.system.wordbook.XWordbookMain" %>
<%@ page import="jt.classic.system.wordbook.XWordbookQuery" %>
<%@ page import="jt.classic.system.language.GrooveTranslator" %>
<%
    String context = request.getContextPath();

	XWordbookMain wbmain = XWordbookMain.getInstance();
	
	XWordbookQuery wordbookQuery = wbmain.getWordbookQuery("owner-configure");
	
	String ownerName = "GBV";
	String ownerLogo = "/system/console/images/web_logo.png";
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
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />  -->
    <%if(!"".equals(IApplication.D(IApplication.ICON))){ %>
		<link type="image/x-icon" rel="shortcut icon" href="<%=context %><%=IApplication.D(IApplication.ICON) %>" />
	<%} %>
    <title></title>
	<jsp:include page="../system/head4nosession.jsp"></jsp:include>
	<!-- GAP Global Object -->
	<script type="text/javascript" src="<%=context %>/GAP/js/GAPGlobal.js"></script>
	<script type="text/javascript" src="<%=context %>/resources/common/js/options-toolbar.js"></script>
	<script type="text/javascript" src="<%=context %>/GAP/login.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=context %>/GAP/welcome/css/welcome.css" />
</head>
<body id="loginBody">
	<div id="language" style="position:absolute;float:right;z-index:100;right:0;top:0;margin-top:10px;margin-right:20px;"></div>
    <div id="content">
        <div>
            <h5 id="<%=ownerLogoCSS %>"><a target="_blank" href="<%=ownerURL %>"></a></h5>
        </div>
        <div id="page">
            <div class="auto_columns two">
                <div class="column">
                    <img src="<%=context %>/GAP/welcome/img/jet.png">
                    <div id="loginArea" style="margin-top:15px;margin-bottom:15px;padding-bottom:5px;"></div>
                    <p class="button-group"><a href="javascript:void(0);" id="loginCheckA" class="button-link inline"></a> </p>
                </div>
                <div class="column">
                    <img src="<%=context %>/GAP/welcome/img/demo.png" id="feature-img" class="pngfix" />
                    <div class="auto_columns two" id="right">
                        <!--<p style="color:#126499;">
                        1、统一的工作平台。
						</p>
						<p style="color:#126499;">
						2、良好的扩展性。支持业务规模扩展、业务范围扩展。
						</p>
						<p style="color:#126499;">
						3、操作简单，优秀的易用性。
						</p>
						<p style="color:#126499;">
						4、先进的、可靠的、高效的架构体系，支持需求的发展和变化。
						</p>
						<p style="color:#126499;">
						5、Groove兼容多种中间件及数据库。
						</p>
						<p style="color:#126499;">
						6、开放式的编程接口，支持二次开发，个性定制等需求。
						</p> --> 
                    </div>

                </div>
            </div>
        </div>
        <div id="footer">
            <p style="margin-top:5px;color:#004d82;font-size:13px;"><%=ownerName %></p>
        </div>
    </div>
</body>
</html>



