<%@ page contentType="text/html;charset=UTF-8"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String serverPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
   
   String retUrl = request.getHeader("Referer"); 
   
   if(retUrl == null){
      retUrl = "";
   }
   
   out.println("<script language='javascript'>");
   out.println("alert(\"当前会话无效,请重新登录\");");
   out.println("if(document.all){");
   out.println("top.location.href = '"+context+"';");
   out.println("}else{");
   out.println("top.window.location = '"+context+"';");
   out.println("}");
   out.println("</script>");
%> 
