<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.module.IModule"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   IModule module = (IModule)request.getAttribute("module");
   
   //List list = module.istairmenus();
   if(module == null){
	   request.setAttribute("result", "{success: false, errCode: '-1'}");
   }else{
	   String result = "{success: true, data:{mid:'" + module.id()
		+ "', mname:'" + module.iname() + "',murl:'"
		+ module.iurl() + "',mmemo:'" + module.imemo()
		+ "',msort:'"+module.isort()+"',mkey:'"+module.ilangkey()+"'}}";
		
		request.setAttribute("result", result);
   }

	SystemTool.returnJson(request, response);
%>
