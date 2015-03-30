<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.module.IMenu"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   IMenu menu = (IMenu)request.getAttribute("menu");
   
   //List list = module.istairmenus();
   
   if(menu == null){
	   request.setAttribute("result", "{success: false, errCode: '-1'}");
   }else{
	   String url = menu.iurl();
	   
	   if(menu.iblank() == 1){
		   url = "blank:" + url;
	   }
	   
	   String result = "{success: true, data:{mnid:'"+menu.id()+"',mid:'" + menu.imoduleid()
		+ "',mnicon:'"+menu.icon()+"',mnicon_:'"+menu.iconlabel()+"',mniconlabel:'"+menu.iconlabel()+"',mnpid:'" + menu.iparentid() + "', mnname:'" + menu.iname() + "',mnurl:'"
		+ url + "',mnmemo:'" + menu.imemo()
		+ "',mnsort:'"+menu.isort()+"',mnkey:'"+menu.ilangkey()+"'}}";
		
		request.setAttribute("result", result);
   }

	SystemTool.returnJson(request, response);
%>
