<%@ page contentType="text/html;charset=UTF-8"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String ip = request.getRemoteAddr();
%>  
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> 
<html> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<title>控制台登录页面</title> 
<jsp:include page="../head4nosession.jsp"></jsp:include>
<script>
    document.location = '<%=context%>/GAP/login.jsp';
</script>
<style type="text/css"> 
.login{ 
    background-image: url(<%=context%>/system/console/images/user.gif) !important; 
} 
</style> 
<script type="text/javascript" language="JavaScript" src="<%=context %>/system/console/js/login.js"></script> 
</head> 
<body style="BACKGROUND: #ffffff;">
</body>
</html> 