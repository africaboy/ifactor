<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.workflow.WObjectQuery"%>
<%@ page import="jt.classic.system.workflow.WObjectQueryItem"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	ObjectQuery woquery = (ObjectQuery)request.getAttribute("query");
	List queryitemlist = null;
	if(woquery != null){
	   queryitemlist = woquery.iqueryitems();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>数据查询项设置</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script src="<%=context%>/system/object/js/objectlist.js"></script>
<body onload="javascript:initqueryset();">
<form name="form1" method="post" action="">
<h1>
<button type="button" onclick="javascript:setqueryitem();" title="执行查询操作"><img src="<%=context %>/system/object/images/query.png" />确 定</button>
<button type="button" onclick="javascript:window.location.reload();" title="重新设置查询条件"><img src="<%=context %>/system/object/images/reset.png" />重 置</button>
<button type="button" onclick="javascript:_closeDialog();" title="取消查询操作,关闭查询窗口"><img src="<%=context %>/system/object/images/quit.png" />取 消 </button>
<br><br>	
</h1>
	<table class="tab4edit" width="98%">
	<%if(queryitemlist == null || queryitemlist.isEmpty()){ %>
	<tr class="tr1">
		<td class="td1">&nbsp;名称</td>
		<td class="td2"><input type="text" item="query" name="qname" class="box3" value=""></td>
	</tr>  
	<%} %>
	<tr class="tr1">
		<td class="td1" width="30%">&nbsp;创建时间</td>
		<td class="td2"><input type="text" item="query" onclick="javascript:getDateString(this);" name="qcreatetime" class="box3" value=""></td>
	</tr>
	<!--  
	<tr class="tr1">
		<td class="td1">&nbsp;修改时间</td>
		<td class="td2">&nbsp;<input type="text" item="query" onclick="javascript:getDateString(this);"  name="qupdatetime" class="box3" value=""></td>
	</tr>  
	-->
	<%
		       if(queryitemlist != null && !queryitemlist.isEmpty()){
		       for(int i=0;i < queryitemlist.size(); i++){
		           ObjectQueryItem queryitem = (ObjectQueryItem)queryitemlist.get(i);
	%>
	<tr class="tr1">
		<td class="td1">&nbsp;<%=queryitem.ilabel()%></td>
		<td class="td2">
		<%if(queryitem.itype().equals("date")){ %><input type="text" coltype="<%=queryitem.icolumn().getType().toString() %>" collabel="<%=queryitem.icolumn().getDescription()%>" item="query" name="<%=queryitem.icolumn().getName()%>" class="box3" onclick="javascript:getDateString(this);" value="<%=queryitem.iparam()%>">
		<%}else if(queryitem.itype().equals("usertree") || queryitem.itype().equals("grouptree") || queryitem.itype().equals("groupusertree")){ %>
		<input type="text" coltype="<%=queryitem.icolumn().getType().toString() %>" collabel="<%=queryitem.icolumn().getDescription()%>" item="query" name="<%=queryitem.icolumn().getName()%>" class="box3" onclick="javascript:selectGU(this, '<%=queryitem.itype() %>');" value="">
		<%}else if((queryitem.itype().equals("checkbox") || queryitem.itype().equals("radio")) && !queryitem.iparam().equals("")){ %>
	    &nbsp;<div id="ckarea_<%=i %>"></div>
	    <input type="hidden" coltype="<%=queryitem.icolumn().getType().toString() %>" collabel="<%=queryitem.icolumn().getDescription()%>" item="query" name="<%=queryitem.icolumn().getName()%>" value="">
	    <script>initwordbook4checkbox("<%=queryitem.iparam()%>", "", "ckarea_<%=i %>","<%=queryitem.icolumn().getName()%>", true, "<%=queryitem.itype()%>");</script>
		<%}else if((queryitem.itype().equals("checkbox") || queryitem.itype().equals("radio")) && queryitem.iparam().equals("")){ %>
	    <input type="<%=queryitem.itype() %>" item="query" name="<%=queryitem.icolumn().getName()%>" value="">
	    <%}else if(queryitem.itype().equals("select")){ %>
	    <select item="query" coltype="<%=queryitem.icolumn().getType().toString() %>" collabel="<%=queryitem.icolumn().getDescription()%>" name="<%=queryitem.icolumn().getName()%>"></select>
	    <script>initwordbook4select("<%=queryitem.iparam()%>", "", "<%=queryitem.icolumn().getName()%>", true);</script>
		<%}else{%>
        <input type="text" coltype="<%=queryitem.icolumn().getType().toString() %>" collabel="<%=queryitem.icolumn().getDescription()%>" item="query" name="<%=queryitem.icolumn().getName()%>" class="box3" value="<%=queryitem.iparam()%>">
        <%} %>
		</td>
	</tr>
	<%           
	       }     
	    }
	%>
	</table>
</form>
</body>
</html>