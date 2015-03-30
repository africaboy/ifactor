<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.module.IMenu"%>
<%@ page import="jt.classic.system.module.IModule"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="java.util.List"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   IModule module = (IModule)request.getAttribute("module");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>模块树结构</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="StyleSheet" href="<%=context%>/resources/system/css/dtree.css" type="text/css" />
<style>
body{
	background-color: #F8F9FA;
}
</style>
<script src="<%=context%>/resources/system/js/dtree.js"></script>
<script>
   function handleRefresh(){
       window.location.reload();
   }
</script>
<body>
  <form name="form1" method="post" action="">
  <table width="98%" border="0">
  <tr><td valign="top" width="30%">
 <div class="dtree"> 
  <script type="text/javascript">
		<!--
		//id, pid, name, url, title, target, icon, iconOPne, open,

		d = new dTree('d');
		d.config.target="right";		
		d.config.folderLinks = true;
		
        //----------------- INTRODUCTION ------------------//
        d.add('M<%=module.id()%>',-1,'<%=module.iname()%>','<%=context%>/system/purview.do?method=purview&oid=<%=module.id()%>&otype=module&otable=ISYS_MODULE&include=0&oname=<%=module.iname()%>','<%=module.imemo()%>','folder');
        <%
           List list = module.imenus();
           for(int i=0;i<list.size();i++){
               IMenu menu = (IMenu)list.get(i);
               //String name = java.net.URLEncoder.encode(menu.iname(), "UTF-8");
               String name = menu.iname();
        %>
        d.add('m<%=menu.id()%>','M<%=module.id()%>','<%=menu.iname()%>','<%=context%>/system/purview.do?method=purview&oid=<%=menu.id()%>&otype=menu&otable=ISYS_MODULE_MENU&include=0&oname=<%=name%>','<%=menu.imemo()%>','file');
        <%
           }
        %>
        
		document.write(d);
		//-->
	</script>
 </div>
 </td>
 <td>
 <iframe name="right" id="right" src="<%=context%>/system/purview.do?method=purview&oid=<%=module.id()%>&otype=module&otable=ISYS_MODULE&include=0&oname=<%=module.iname()%>" frameborder="0" width="100%" height="370" scrolling="auto"></iframe>
 </td>
 </tr>
</table>
  </form>
</body>
</html>
