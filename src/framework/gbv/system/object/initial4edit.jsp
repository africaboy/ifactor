<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	WObject wobject = (WObject) request.getAttribute("wobject");
	
	String id = StringTool.checkString(request.getParameter("id"));
	
	String querykey = StringTool.checkString(request.getParameter("querykey"));
%>
<jsp:include page="../../system/head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/wordbook/css/wbmanage.css" ></link>
<script type="text/javascript" src="<%=context %>/system/wordbook/js/wbstore4form.js"></script>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/group/css/groupmanage.css" ></link>
<script type="text/javascript" src="<%=context %>/system/group/js/groupcombo4jsp.js"></script>
<script type="text/javascript" src="<%=context %>/system/dataindex/js/ditree4jsp.js"></script>
<script type="text/javascript" src="<%=context %>/system/object/js/init4core.js"></script>
<script type="text/javascript" src="<%=context %>/system/object/js/page4edit.js"></script>
<script>
    Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	
	var id = '<%=id%>';
	var name = '<%=wobject.iname()%>';
	var key = '<%=wobject.ikey()%>';
	var returnURL = '';
	var querykey = '<%=querykey%>';
	
	function editObject(){
	   loadObjectContent('<%=id %>');
	   inithelper();
	};
</script>