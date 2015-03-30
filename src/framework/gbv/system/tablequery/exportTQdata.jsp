<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.tablequery.TableQuery"%>
<%@ page import="jt.classic.system.tablequery.TableQueryCenter"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	String queryKey = StringTool.checkString(request.getParameter("queryKey"));
	
	String size = StringTool.checkString(request.getParameter("size"));
	
	if(size.equals("")){
		size = "20";
	}
	
	String orderby = StringTool.checkString(request.getParameter("orderby"));
	
	String orderbyKey = StringTool.checkString(request.getParameter("orderbykey"));
	
	String pageSize = StringTool.checkString(request.getParameter("pageSize"));

	TableQueryCenter register = TableQueryCenter.getInstance();
	
	TableQuery query = register.getTableQuery(queryKey);
	
	if(query != null){
		List resultItems = query.iresultItems();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">
<title>数据导出页面</title>
<jsp:include page="../../system/head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/tablequery/css/exportTQdata.css" />
<script src="<%=context %>/system/tablequery/js/exportTQdata.js"></script>
<script src="<%=context %>/system/tablequery/js/tablehandler.js"></script>
<%
	if(!StringTool.checkString(query.icssurl()).equals("")){
%>
<link rel="stylesheet" type="text/css" href="<%=context + query.icssurl()%>" />
<%
	}
%>
<%
	if(!StringTool.checkString(query.ijsurl()).equals("")){
%>
<script src="<%=context + query.ijsurl()%>"></script>
<%
	}
%>
</head>
<!-- addMeMix 为查询自定义函数,用以在grid中添加自定义的组件,例如:toolbar,menu等 -->
<body onload="javascript:initExportTQList('<%=queryKey %>', function(){addMeMix('<%=queryKey %>');},'<%=orderby %>', '<%=orderbyKey %>', '<%=pageSize %>');">
<table align="center" width="98%" cellspacing="0" cellpadding="0" style="margin:auto;">
    <tr>
        <td><div id="listToolbarArea"></div></td>
    </tr>
</table>
<table align="center" width="98%" cellspacing="0" cellpadding="0" style="margin:auto;">
    <tr>
        <td align="center"><%if(!query.iname().equals("")){ %><h1>&nbsp;&nbsp;<%=query.iname() %></h1><%} %></td>
    </tr>
</table>
<!--startprint1-->
<table class="tab4list" id="<%=queryKey %>" align="center" width="98%" style="margin:auto;">
<caption id="tabCaption">CSS样式切换</caption>
     <tr>  
     <td class="td1" width="25" align="center"><%if(query.ishowchk()){ %><input title="全部选择/取消" type="checkbox" name="chkall" value="" onclick="javascript:checkAllItems(this);"><%} %>&nbsp;</td>
     <%
        if(resultItems != null && !resultItems.isEmpty()){
        	for(int i=0; i<resultItems.size(); i++){
        		Map item = (Map)resultItems.get(i);
        		if (!"-1".equals(item.get("show"))) {
     %>
     <td class="td1" nowrap><div align="center"><%=item.get("label") %></div></td>
     <%
        
        		}
        	}
        }	
     %>
    </tr>
</table>
<table class="tab-noborder" align="center" width="98%" style="margin:auto;">
    <tr>
        <td width="50%" id="pageDisplay">&nbsp;</td>
        <td width="50%" id="pageRoll" align="right">&nbsp;</td>
    </tr>
</table>
<%}else{ %>
<p><font color="red">表数据通用查询 <b>'<%=queryKey%>'</b> 尚未定义</font></p>
<%} %>
<!--endprint1--> 
<form id="form1" name="form1" method="post"></form>
</body>
</html>
