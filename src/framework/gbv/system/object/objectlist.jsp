<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.limp.mine.Label"%>
<%@ page import="org.limp.mine.Controller"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="jt.classic.system.object.ObjectCreatorTool"%>
<%@ page import="jt.classic.system.object.IObject"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WObjectQuery"%>
<%@ page import="jt.classic.system.workflow.WObjectQueryItem"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	Object[] result = (Object[]) request.getAttribute("result");
	Label label = (Label) result[1];
	Controller controller = (Controller) result[2];
	String pageNO = (String) result[3];
	List resultList = (List) result[0];

	WObject object = (WObject) request.getAttribute("object");

	ObjectQuery woquery = (ObjectQuery) request
	.getAttribute("objectquery");

	List viewlist = (woquery != null) ? woquery.iviewitems() : null;

	int width = (viewlist != null ? viewlist.size() * 150 + 50 : 500);

	Map query = (Map) request.getAttribute("query");
	
	String orderbykey = (String) request.getAttribute("orderbykey");
	
	String orderby = (String) request.getAttribute("orderby");

	String qname = (String) query.get("qname");
	String qcreatetime = (String) query.get("qcreatetime");
	String qupdatetime = (String) query.get("qupdatetime");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><%=(woquery != null ? woquery.iname() : object
									.iname())%>数据列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<jsp:include page="objectqueryparaminit.jsp"></jsp:include>
<script src="<%=context%>/system/object/js/objectlist.js"></script>
<script
	src="<%=context%>/application/<%=object.ikey()%>/js/<%=object.ikey()%>.js"></script>
<link rel="StyleSheet"
	href="<%=context %>/application/<%=object.ikey()%>/css/<%=object.ikey()%>.css"
	type="text/css" />
<body onload="javascript:initobjectlist();">
<form name="form1" method="post" action=""><input type="hidden"
	name="pageNO" value="<%=pageNO%>">
<h2><%=(woquery != null ? woquery.iname()
							: (object.iname() + "数据列表"))%>， <a
	href="#" onclick="javascript:queryset('<%=(woquery!=null?woquery.id():"")%>','<%=object.ikey()%>');">查询</a>
<%
if (woquery == null || woquery.ihandle(woquery.INSERT)) {
%><a
	href="#"  onclick="javascript:handleInsert('<%=(woquery!=null?woquery.id():"")%>');">新建</a>
<%
}
%> 
 <%
 if (woquery == null || woquery.ihandle(woquery.DELETE)) {
 %><a
	href="#"  onclick="javascript:handleDelete('<%=(woquery!=null?woquery.id():"")%>');">删除</a>
<%
}
%>
 <%
 if (woquery == null || woquery.ihandle(woquery.EXPORT)) {
 %> 
<a href="#"  onclick="javascript:handleExport('<%=(woquery!=null?woquery.id():"")%>','<%=object.ikey()%>');">导出</a>
<%
}
%>
<a href="<%=context %>/system/objectquery.do?key=<%=object.ikey()%>&querykey=<%=(woquery!=null?woquery.id():"")%>">刷新</a></h2>
<%
	 /*	
	 String stamp = "cid:role;id:ID;name:OBJ_NAME;other:OBJ_CREATETIME;alt:OBJ_UPDATETIME;title:"
	 + object.iname() + "数据列表;type:radio;size:8";

	 out.println(ObjectCreatorTool.rangeObjectList(resultList, viewlist,
	 stamp, context));
	 */
%>
<table class="tab4list" align="center" width="<%=width %>">
	<tr>
		<td class="td1" width="50" align="center"
			<%if(woquery == null || woquery.ihandle(woquery.DELETE)){ %>
			onclick="javascript:checkall();" title="点击全选/取消全选" <%} %>>&nbsp;</td>
		<%
				if (viewlist != null && !viewlist.isEmpty()) {
				for (int j = 0; j < viewlist.size(); j++) {
					ObjectQueryItem item = (ObjectQueryItem) viewlist.get(j);
		%>
		<td class="td1" width="150" align="center"
			onclick="javascript:handleOrder(this, '<%=item.icolumn().associateTable().getName() + "." + item.icolumn().getName() %>','<%=(woquery!=null?woquery.id():"")%>','<%=object.ikey()%>','<%=orderby %>');">&nbsp;<%=item.ilabel()%>
		    <%
		    if(orderbykey.equals(item.icolumn().associateTable().getName() + "." + item.icolumn().getName()) && orderby.equals("DESC")){
		    %>
		    <img src="<%=context %>/system/object/images/asc.gif">
		    <%
		    }else if(orderbykey.equals(item.icolumn().associateTable().getName() + "." + item.icolumn().getName()) && orderby.equals("ASC")){
		    %>
		    <img src="<%=context %>/system/object/images/desc.gif">
		    <%
		    }
		    %>
		</td>
		<%
			}
			} else {
		%>
		<td class="td1" width="150" align="center"
			onclick="javascript:handleOrder(this, 'ISYS_OBJECT.OBJ_NAME','<%=(woquery!=null?woquery.id():"")%>','<%=object.ikey()%>','<%=orderby %>');">&nbsp;名称
			<%
		if(orderbykey.equals("ISYS_OBJECT.OBJ_NAME") && orderby.equals("DESC")){
		%>
		    <img src="<%=context %>/system/object/images/asc.gif">
		    <%
		    }else if(orderbykey.equals("ISYS_OBJECT.OBJ_NAME") && orderby.equals("ASC")){
		    %>
		    <img src="<%=context %>/system/object/images/desc.gif">
		    <%
		    }
		    %>
			</td>
		<td class="td1" width="150" align="center"
			onclick="javascript:handleOrder(this, 'ISYS_OBJECT.OBJ_CREATORNAME','<%=(woquery!=null?woquery.id():"")%>','<%=object.ikey()%>','<%=orderby %>');">&nbsp;创建人
		    <%
		if(orderbykey.equals("ISYS_OBJECT.OBJ_CREATORNAME") && orderby.equals("DESC")){
		%>
		    <img src="<%=context %>/system/object/images/asc.gif">
		    <%
		    }else if(orderbykey.equals("ISYS_OBJECT.OBJ_CREATORNAME") && orderby.equals("ASC")){
		    %>
		    <img src="<%=context %>/system/object/images/desc.gif">
		    <%
		    }
		    %>	
		</td>
		<td class="td1" width="150" align="center"
			onclick="javascript:handleOrder(this, 'ISYS_OBJECT.OBJ_CREATETIME','<%=(woquery!=null?woquery.id():"")%>','<%=object.ikey()%>','<%=orderby %>');">&nbsp;创建时间
		    <%
		if(orderbykey.equals("ISYS_OBJECT.OBJ_CREATETIME") && orderby.equals("DESC")){
		%>
		    <img src="<%=context %>/system/object/images/asc.gif">
		    <%
		    }else if(orderbykey.equals("ISYS_OBJECT.OBJ_CREATETIME") && orderby.equals("ASC")){
		    %>
		    <img src="<%=context %>/system/object/images/desc.gif">
		    <%
		    }
		    %>	
		</td>
		<td class="td1" width="150" align="center" title="最后修改时间"
			onclick="javascript:handleOrder(this, 'ISYS_OBJECT.OBJ_UPDATETIME','<%=(woquery!=null?woquery.id():"")%>','<%=object.ikey()%>','<%=orderby %>');">&nbsp;修改时间
		    <%
		if(orderbykey.equals("ISYS_OBJECT.OBJ_UPDATETIME") && orderby.equals("DESC")){
		%>
		    <img src="<%=context %>/system/object/images/asc.gif">
		    <%
		    }else if(orderbykey.equals("ISYS_OBJECT.OBJ_UPDATETIME") && orderby.equals("ASC")){
		    %>
		    <img src="<%=context %>/system/object/images/desc.gif">
		    <%
		    }
		    %>
		</td>
		<%
		}
		%>
	</tr>
	<%
		if (resultList != null && !resultList.isEmpty()) {
		for (int i = 0; i < resultList.size(); i++) {
			Object[] resultInfo = (Object[]) resultList.get(i);

			String number = (String) resultInfo[0];
			IObject obj = (IObject) resultInfo[1];
			String purview = "";//(String) resultInfo[2];
			
			if(woquery != null && (woquery.ihandle(woquery.UPDATE) && !woquery.ihandle(woquery.VIEW))){
				purview = "2";
			}else if(woquery != null && (!woquery.ihandle(woquery.UPDATE) && woquery.ihandle(woquery.VIEW))){
				purview = "1";
			}else{
				purview = (String) resultInfo[2];
			}

			Map info = obj.icontent();
	%>
	<tr onMouseOver="javascript:this.bgColor='#ffff99'"
		onmouseout=" javascript:this.bgColor='#ffffff'" bgColor="#ffffff">
		<td align="center" width="50" ><%=number%> <%
 if (woquery == null || woquery.ihandle(woquery.DELETE)) {
 %>&nbsp;<input type="checkbox" name="chk" value="<%=obj.id()%>" >
		<%
		}
		%>
		</td>
		<%
				if (viewlist != null && !viewlist.isEmpty()) {
				for (int j = 0; j < viewlist.size(); j++) {
					ObjectQueryItem item = (ObjectQueryItem) viewlist
					.get(j);

					if (object.handleTable(item.icolumn()
					.associateTable()) == 0) {
				Map tableInfo = (Map) ((List) info.get(item
				.icolumn().associateTable().getName()))
				.get(0);
		%>
		<td width="150">&nbsp;<%
		if (j == 0) {
		%><a href="javascript:void(0);"
			onclick="javascript:handleEdit(<%=purview %>, '<%=obj.id()%>', '<%=obj.iname()%>', '<%=(woquery!=null?woquery.id():"")%>', this);">
		<%
		}
		%><%=item
														.translate((String) tableInfo
																.get(item
																		.icolumn()
																		.getName()))%> <%
 if (j == 0) {
 %> </a> <%
 }
 %>
		</td>
		<%
						} else {
						List tableInfoList = (List) info.get(item
						.icolumn().associateTable().getName());
		%>
		<td width="150">
		<%
						if (tableInfoList != null
						&& !tableInfoList.isEmpty()) {
					for (int ii = 0; ii < tableInfoList.size(); ii++) {

						Map multiInfo = (Map) tableInfoList
						.get(ii);
		%>
		<div class="divn">&nbsp;<%=item
																.translate((String) multiInfo
																		.get(item
																				.icolumn()
																				.getName()))%></div>
		<%
						}
						}
		%>
		</td>
		<%
				}

				}
					} else {
		%>
		<td width="150">&nbsp;<a
			href="javascript:handleEdit('<%=(woquery != null ? woquery.ihandle(woquery.UPDATE) : 2) %>', '<%=obj.id()%>', '<%=obj.iname()%>', '<%=(woquery!=null?woquery.id():"")%>', this);">
		<%=obj.iname()%></a></td>
		<td width="150">&nbsp;<%=obj.icreatorname()%></td>
		<td width="150">&nbsp;<%=DateTrimmer.getYMD_LBL(obj.icreatetime())%></td>
		<td width="150">&nbsp;<%=DateTrimmer.getYMD_LBL(obj.iupdatetime())%></td>
		<%
		}
		%>
	</tr>
	<%
		}
		}
	%>
</table>

<table style="margin:5px;" align="center" width="<%=width %>" class="tab-noborder" border="0"
	cellspacing="0" cellpadding="0">
	<tr>
		<td width="50%"><%=label.displayLabel()%></td>
		<td align="right">&nbsp;<%=label.startLabel()%> <%=label.previousLabel()%>
		<%=label.nextLabel()%> <%=label.endLabel()%> <%=controller.getController().toString()%>
		</td>
	</tr>
</table>

<%=controller.getControlScript(true)%></form>
</html>
