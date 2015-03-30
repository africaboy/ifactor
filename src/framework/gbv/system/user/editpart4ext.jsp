<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.group.IGroup"%>
<%@ page import="jt.classic.system.group.GroupManager"%>
<%@ page import="jt.classic.system.wordbook.WordBookInXML"%>
<%
	IUser user = (IUser) request.getAttribute("user");

	IGroup group = (IGroup) request.getAttribute("group");

	String result = null;

	if (user == null || group == null) {
		result = "{success: false}";
	} else {
		if (user.ipartgroup(group.id())) {
			String jobName = WordBookInXML.getWordBookItemName("job",
			user.ijob(group));
			String ratingName = WordBookInXML.getWordBookItemName(
			"user-rating", StringTool.checkString(user
			.irating(group)));
			int order = user.iorder(group);

			result = "{success: true, data:{uid:'" + user.id()
			+ "', gid:'" + group.id() + "',upt : 1"
			+ ", grating_: '" + ratingName + "',upr: '"
			+ user.irating(group) + "', job_: '" + jobName
			+ "',upj: '" + user.ijob(group) + "', upo:'"
			+ order + "', tp: 'update'}}";
		}else if (user.igroup() != null && user.igroup().id().equals(group.id())) {
			String jobName = WordBookInXML.getWordBookItemName("job",
					user.ijob());
					String ratingName = WordBookInXML.getWordBookItemName(
					"user-rating", StringTool.checkString(user
					.irating()));
					int order = user.iorder();

					result = "{success: true, data:{uid:'" + user.id()
					+ "', gid:'" + group.id() + "',upt : 0"
					+ ", grating_: '" + ratingName + "',upr: '"
					+ user.irating() + "', job_: '" + jobName
					+ "',upj: '" + user.ijob() + "', upo:'"
					+ order + "', tp: 'update'}}";
		} else {
			result = "{success: true, data:{uid:'"
			+ user.id()
			+ "', gid:'"
			+ group.id()
			+ "',upt : 1, grating_: '',rating: '', job_: '',job: '', upo:'', tp: 'insert'}}";
		}

	}

	request.setAttribute("result", result);
	
	//System.out.println(result);

	SystemTool.returnJson(request, response);
%>
