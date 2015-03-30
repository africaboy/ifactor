<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.ISystem" %>
<%@ page import="jt.classic.system.group.GroupManager" %>
<%@ page import="jt.classic.system.workflow.WSupport" %>
<%@ page import="jt.classic.system.workflow.WSupportCeneter" %>
<%@ page import="jt.classic.system.workflow.WSupportUGCenter" %>
<%
    String id = StringTool.checkString(request.getParameter("id"));
    String type = StringTool.checkString(request.getParameter("type"));
    String supportKey = StringTool.checkString(request.getParameter("support"));
    
    WSupport support = null;
    WSupportUGCenter ugcenter = null;
    String script = null;
    
    if(id.equals("")){
    	id = GroupManager.ROOTID;
    }
    
    if(supportKey.equals("")){
    	support = WSupportCeneter.getDefaultSupport();
    }else{
        WSupportCeneter center = WSupportCeneter.getInstance();
    	support = center.getSupport(supportKey);
    }
    
    if(support != null){
    	try{
    		ugcenter = support.iusergroupcenter();
    		script = ugcenter.getGroupTreeJson(id, type);
    	}catch(Exception ex){
    		ISystem.catchException(ex);
    	}finally{
    		ugcenter.clean();
    	}
    }
%>
<%=script%>