<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.role.IRole"%>
<%
	IRole role = (IRole) request.getAttribute("role");

	String result = null;

	if (role == null) {
		result = "[]";
	} else {
		result = "[";
        if(true || role.ireal()){
			Object[] objs = role.iobjects();
			if (objs != null && objs.length > 0) {
	
				for (int i = 0; i < objs.length; i++) {
					Object[] objinfo = (Object[]) objs[i];
			
					String otype = (String) objinfo[0];
					
					String tplabel = "用户";
					
					if(otype.equals("group")){
						tplabel = "组";
					}
					
					String oid = (String) objinfo[1];
					String oname = (String) objinfo[2];
			
					if (i == (objs.length - 1)) {
						result += "[";
						result += "'" + oid + "',";
						result += "'" + oname + "',";
						result += "'" + otype + "',";
						result += "'" + tplabel + "',";
						result += "'" + role.id() + "',";
						result += "'" + (role.ireal() ? "1" : "0") + "'";
						result += "]";
					} else {
						result += "[";
						result += "'" + oid + "',";
						result += "'" + oname + "',";
						result += "'" + otype + "',";
						result += "'" + tplabel + "',";
						result += "'" + role.id() + "',";
						result += "'" + (role.ireal() ? "1" : "0") + "'";
						result += "],";
					}
				}
			}
        }
        
        result += "]";
	}

	request.setAttribute("result", result);

	SystemTool.returnJson(request, response);
%>
