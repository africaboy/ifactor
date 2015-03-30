<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String type = (String)request.getAttribute("type");
   String checkFolder = (String)request.getAttribute("checkFolder");
   String checkFile = (String)request.getAttribute("checkFile");
   String defaultCheckFile = (String)request.getAttribute("defaultCheckFile");
   String script = (String)request.getAttribute("script");
   String defaultnode = (String)request.getAttribute("defaultnode");
   String autoselect = (String)request.getAttribute("autoselect");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>系统组织结构树</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="StyleSheet" href="<%=context%>/resources/system/css/dtree.css" type="text/css" />
<script src="<%=context%>/resources/system/js/dtree.js"></script>
<style>hr{height:1px;border:none;border-top:1px solid #ccc;}</style>
<script>
   function handleRefresh(){
       window.location.reload();
   }
   
   function handleChecked(){
       var ids = "";
       var names = "";
       var types = "";
       var r = document.getElementsByName("rad");
       for(var i=0;i<r.length;i++){
           if(r[i].checked && ids.indexOf(r[i].value + ",") == -1){
              ids += r[i].value + ",";
              names += r[i].getAttribute("iname") + ",";
              types += r[i].getAttribute("itype") + ",";
              <%if(type.equals("radio")){%>break;<%}%> 
           }
       }
       
       if(ids != ""){
	       if(opener){
	          opener.responseResult(ids.substring(0,ids.length-1),names.substring(0,names.length-1),types.substring(0,types.length-1));
	       }else if(parent){
	          parent.responseResult(ids.substring(0,ids.length-1),names.substring(0,names.length-1),types.substring(0,types.length-1));
	       }else{
	          alert("无法接收返回值，请在父窗口定义function responseResult(ids,names,types)");
	       }
       }
       
       /*try{
          parent.responseResult(ids.substring(0,ids.length-1),names.substring(0,names.length-1),types.substring(0,types.length-1));
       }catch(error){
          alert("无法接收返回值，请在父窗口定义function responseResult(ids,names,types)");
       }*/
       
   }
</script>
<body>
  <form name="form1" method="post" action="">
 <div class="dtree"> 
<button onclick="javascript: handleChecked();return false;"><img src="<%=context %>/system/object/images/query.png" />确 定</button>
<button onclick="javascript: parent.closeDialog();return false;"><img src="<%=context %>/system/object/images/quit.png" />取 消</button>
<br><br>
  <hr>
  <script type="text/javascript">
		<!--
		//id, pid, name, url, title, target, icon, iconOPne, open,

		d = new dTree('d');

		d.config.target="right";		
		d.config.checkFolder = <%=checkFolder%>;
		d.config.checkFile = <%=checkFile%>;
		d.config.checkFolderType = "<%=type%>";
		d.config.checkFileType = "<%=type%>";
		d.config.defaultCheckFile = "<%=defaultCheckFile%>";
		d.config.defaultnode = "<%=defaultnode%>";
		d.config.autoselect = "<%=autoselect%>";
		d.config.folderLinks = false;
		d.config.fileLinks = false;
		
        //----------------- INTRODUCTION ------------------//
        <%=script%>
		document.write(d);
		//-->
	</script>
	<p>&nbsp;
	</p>
</div>
  </form>
</body>
</html>
