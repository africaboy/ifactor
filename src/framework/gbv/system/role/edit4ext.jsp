<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.HTMLTool"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.role.IRole"%>
<%@ page import="jt.classic.system.wordbook.WordBookInXML"%>
<%
	IRole role = (IRole) request.getAttribute("role");

	String result = null;

	if (role == null) {
		result = "{success: false}";
	} else {
		String ratingName = WordBookInXML
		.getWordBookItemName("user-rating", StringTool
				.checkString(role.irvrating()));

		Object[] objs = role.iobjects();

		String objids = "";
		String objnames = "";
		String objtypes = "";

		if (objs != null && objs.length > 0) {
			for (int i = 0; i < objs.length; i++) {
				Object[] objinfo = (Object[]) objs[i];
		
				String otype = (String) objinfo[0];
				String oid = (String) objinfo[1];
				String oname = (String) objinfo[2];
		
				if (i == (objs.length - 1)) {
					objids += oid;
					objnames += oname;
					objtypes += otype;
				} else {
					objids += oid + ",";
					objnames += oname + ",";
					objtypes += otype + ",";
				}
			}
		}

		result = "{success: true, data:{rid:'" + role.id()
		+ "', rname:'" + role.iname() + "',rkey:'"
		+ role.ikey() + "',rmemo:'" + HTMLTool.htmlEscape(role.imemo(), false, false, true, true)
		+ "', rrvtype:'" + role.irvtype() + "', raccede:'"
		+ (role.iaccede() ? "1" : "0") + "', rrv:'"
		+ (role.ireal() ? "1" : "0") + "', rrvrating:'"
		+ role.irvrating() + "', grating_:'" + ratingName
		+ "', objids:'" + objids + "',objnames:'" + objnames
		+ "',objtypes:'" + objtypes + "',_gname:'"+objnames+"'}}";
	}

	request.setAttribute("result", result);

	SystemTool.returnJson(request, response);
%>
