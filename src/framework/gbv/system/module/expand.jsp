<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.module.IMenu"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String script = (String)request.getAttribute("script");
   
   IMenu defaultmenu = (IMenu)request.getAttribute("defaultmenu");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>模块菜单</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="StyleSheet" href="<%=context%>/resources/system/css/dtree.css" type="text/css" />
<script>
   function handleRefresh(){
       window.location.reload();
   }
</script>
<body bgcolor="#ffffff">
  <form name="form1" method="post" action="">
 <div class="dtree"> 
    <%=script%>
    <!--<script>d.openAll()</script>-->
    <p>
    &nbsp;
    </p>
</div>
  </form>
  <%
    if(defaultmenu != null && !defaultmenu.iurl().equals("")){
  %>
  <script>
      if(parent){
         parent.frames["mainFrame"].location.href = "<%=defaultmenu.iurl()%>";
      }
  </script>
  <%
    }
  %>
</body>
</html>
