<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.basework.impl.CommonBean4HSQ"%>
<%
	StringBuffer result = new StringBuffer();

	CommonBean4HSQ cbh = new CommonBean4HSQ(request);

	Map param = cbh.getResource();

	result.append("{success: true");

	if (!param.isEmpty()) {
		int count = 0;
		
		result.append(",data:{");

		StringBuffer paramString = new StringBuffer();
		
		Iterator keys = param.keySet().iterator();
		
		while (keys.hasNext()) {
			String key = (String) keys.next();

			if(key.indexOf(".") == -1 && !key.equals("IUSER")){
			
			String value = StringTool.checkString(param.get(key));
			
			paramString.append(key + ": '" + value + "',");
			
			}
			count++;
		}
		
		if(!paramString.toString().equals("")){
			result.append(paramString.substring(0, paramString.length() - 1));
		}
		
		result.append("}");
	} 
	
	result.append("}");

	boolean scriptTag = false;

	String cb = request.getParameter("callback");

	if (cb != null) {
		scriptTag = true;
		response.setContentType("text/javascript");
	} else {
		response.setContentType("application/x-json");
	}

	if (scriptTag) {
		out.write(cb + "(");
	}
//System.out.println(result.toString());
	out.print(result.toString());
	if (scriptTag) {
		out.write(");");
	}
%>
