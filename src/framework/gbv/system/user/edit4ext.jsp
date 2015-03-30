<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.group.IGroup"%>
<%@ page import="jt.classic.system.group.GroupManager"%>
<%@ page import="jt.classic.system.wordbook.WordBookInXML"%>
<%
	IUser user = (IUser)request.getAttribute("user");
	
	String result = null;
	
	if (user == null) {
	    result = "{success: false}";
	} else {
		 IGroup tempGroup = GroupManager.getTempGroup();
		
	    String jobName = WordBookInXML.getWordBookItemName("job", user.ijob());
	    String ratingName = WordBookInXML.getWordBookItemName("user-rating",
	            StringTool.checkString(user.irating()));
	
	    result = "{success: true, data:{uid:'" + user.id() + "', uname:'" +
	        user.iname() + "',logid:'" + user.ilogid() + "',sex:'" +
	        user.isex() + "', birthday:'" + user.ibirthday() +
	        "', uphone:'" + user.iphone() + "', uemail:'" + user.imail() +
	        "', unumber:'" + user.inumber() + "', gid:'" +
	        ((user.igroup() != null) ? user.igroup().id() : tempGroup.id()) +
	        "', gid_:'" +
	        ((user.igroup() != null) ? user.igroup().iname()
	                                 : tempGroup.iname()) + 
	        "', grating_: '" + ratingName + "',rating: '" + user.irating() +
	        "', job_: '" + jobName + "',job: '" + user.ijob() +
	        "', disporder:'" + user.iorder() + "',flag:'" + user.iflag() +
	        "',workstatus_:'" + user.iworkstatuslabel() + "',workstatus:'" + user.iworkstatus() + "',workstatuslabel:'" + user.iworkstatuslabel() + 
	        "'}}";
	}
	
	request.setAttribute("result", result);

	SystemTool.returnJson(request, response);
%>
