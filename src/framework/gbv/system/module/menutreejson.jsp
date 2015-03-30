<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.module.IMenu"%>
<%@ page import="jt.classic.system.module.IModule"%>
<%@ page import="jt.classic.system.module.ModuleManager"%>
<%
	List list = null;	

    String script = null;

	IUser user = ISystemContext.getSessionUser(request);

	ModuleManager manager = new ModuleManager();
	try{
	    list = manager.getMyModuleList(user);
	    
	    if(list != null){
	    	script = manager.getAllModuleJson(list);
	    }
	}catch(Exception ex){
	    ex.printStackTrace(System.out);
	}finally {
	    manager.clean();
	}
	
    request.setAttribute("result", script);

	SystemTool.returnJson(request, response);
%>