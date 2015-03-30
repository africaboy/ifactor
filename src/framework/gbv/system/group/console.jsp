<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>系统组织机构管理</title>
</head>
<frameset rows="*" cols="259,720" scrolling="auto" frameborder="0" framespacing="1">
  <frame name="left" src="<%=context%>/system/group.do?method=treemap" />
  <frame name="right" src="<%=context%>/system/blank.jsp" />
</frameset>
<noframes><body>
</body>
</noframes></html>