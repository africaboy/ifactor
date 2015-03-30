<%
	boolean scriptTag = false;

	String cb = request.getParameter("callback");

	if (cb != null) {
		scriptTag = true;
		response.setContentType("text/javascript; charset=UTF-8");
	} else if(org.limp.mine.StringTool.checkString(request.getContentType()).indexOf("multipart/form-data") == -1){
		response.setContentType("application/x-json; charset=UTF-8");
	}

	if (scriptTag) {
		out.write(cb + "(");
	}

	out.print(request.getAttribute("result"));
	if (scriptTag) {
		out.write(");");
	}
%>