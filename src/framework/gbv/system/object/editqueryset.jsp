<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.RandomUtil"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WObjectQuery"%>
<%@ page import="jt.classic.system.workflow.WObjectQueryItem"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	ObjectQuery query = (ObjectQuery) request.getAttribute("query");

	WObject object = query.iobject();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>定义查询设置</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link href="<%=context %>/system/object/css/dragcontainer.css" rel=stylesheet>
<script src="<%=context%>/system/object/js/queryset.js"></script>
<script src="<%=context%>/system/object/js/dragcontainer.js"></script>
<body onload="init(0);">
<form name="form1" method="post" action=""><input type="hidden"
	name="object" value="<%=object.ikey()%>"> <textarea
	name="xmlscript" style="display:none;"></textarea>
<div id="tablehtml" style="display:none;">
<h1>&nbsp;<a href="javascript:void(0);" onclick="javascript:handleSelItem();">确定</a> <a href="javascript:void(0);" onclick="javascript:closeWindow();">取消</a></h1>
<%

	List tlist = object.itables();
	for (int i = 0; i < tlist.size(); i++) {
		/*流程对象关联表*/
		Table table = (Table) tlist.get(i);
	    List columns = table.columns();
		
	    for (int j = 0; j < columns.size(); j++) {
		/*表字段*/
		Column column = (Column) columns.get(j);

		if (!column.isAnnex() && !column.isLob()
				&& !column.isPremaryKey()) {
%>
<div class="divn" style="BORDER: #cccccc 0px solid;width:150px;float:left;"><input type="checkbox" style="vertical-align:middle" what="item" name="item_<%=i %>" tname="<%=table.getName() %>" ilabel="<%=column.getDescription() %>" value="<%= column.getName()%>"><%=column.getDescription() %></div>
<% 
		}
	    }
	}
%>
</div>	
<h1>对象查询设置</h1>
<table class="tab4edit" width="98%">
	<tr class="tr1">
		<td class="td1" width="200">&nbsp;表单对象</td>
		<td class="td2">&nbsp;<%=object.iname()%></td>
	</tr>
	<tr class="tr1">
		<td class="td1" width="200">&nbsp;查询名称</td>
		<td class="td2">&nbsp;<input type="text" class="box3"
			name="qname" value="<%=query.iname()%>"></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;唯一标识</td>
		<td class="td2">&nbsp;<input type="hidden" name="qkey"
			value="<%=query.id()%>"><%=query.id()%></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;查询说明</td>
		<td class="td2">&nbsp;<input type="text" class="box3"
			name="qdesc" value="<%=query.idesc()%>"></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;查询视图URL</td>
		<td class="td2">&nbsp;<input type="text" class="box3"
			name="queryurl" value="<%=query.iqueryurl()%>"></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;查询结果视图URL</td>
		<td class="td2">&nbsp;<input type="text" class="box3"
			name="qresulturl" value="<%=query.iresulturl()%>"></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;数据访问权限设置</td>
		<td class="td2">&nbsp;<input type="text" class="box3"
			name="qpurviewname" readonly value="<%=query.ipurviewname()%>" onclick="javascript:handlePurview();"> <input
			type="hidden" name="qpurview" value="<%=query.ipurview()%>"></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;数据操作设置</td>
		<td class="td2">
			&nbsp;新建<input type="checkbox" name="qhinsert"
			value="yes" <%=(query.ihandle(query.INSERT)?"checked":"")%>>
		    &nbsp;查看<input type="checkbox" name="qhview"
			value="yes" <%=(query.ihandle(query.VIEW)?"checked":"")%>>
			&nbsp;修改<input type="checkbox" name="qhupdate"
			value="yes" <%=(query.ihandle(query.UPDATE)?"checked":"")%>>
			&nbsp;删除<input type="checkbox" name="qhdelete"
			value="yes" <%=(query.ihandle(query.DELETE)?"checked":"")%>>
			&nbsp;授权<input type="checkbox" name="qhpurview"
			value="yes" <%=(query.ihandle(query.PURVIEW)?"checked":"")%>>
			&nbsp;导出<input type="checkbox" name="qhexport"
			value="yes" <%=(query.ihandle(query.EXPORT)?"checked":"")%>>
			&nbsp;复制<input type="checkbox" name="qhcopy"
			value="yes" <%=(query.ihandle(query.COPY)?"checked":"")%>></td>
	</tr>
	<tr class="tr1">
		<td class="td1" title="当前会话用户所属组及子组相关性设置">&nbsp;会话相关性</td>
		<td class="td2">&nbsp;<input type="checkbox" name="qsession"
			value="1" <%=(query.isession()==1?"checked":"")%>></td>
	</tr>
	<tr class="tr1">
		<td class="td1" valign="top">&nbsp;对象创建日期</td>
		<td class="td2"><div class="divn">开始日期<br><input type="text" class="box3"
			name="qcreatestime" value="<%=query.icreatestime() %>" readonly onclick="javascript:getDateString(this);"></div>
			<div class="divn">结束日期<br><input type="text" class="box3"
			name="qcreateetime" value="<%=query.icreateetime() %>" readonly onclick="javascript:getDateString(this);"></div></td>
	</tr>
</table>
<br>
<table class="tab-noborder1" width="98%">
	<tr>
		<td colspan="2">&nbsp;<h1><span style="cursor:hand;"
			title="点击进行查询项设置" onclick="javascript:selectQueryItem('query');">查询项定义</span></h1></td>
	</tr>
	<tr id="queryItem">
		<td>
		<DIV id="Demo4">
      <DIV class="DragContainer" id="DragContainer1" overClass="OverDragContainer">
		<%
				    List queryitemList = query.iqueryitems();

				    for (int i = 0; i < queryitemList.size(); i++) {
				    	ObjectQueryItem item = (ObjectQueryItem)queryitemList.get(i);

				String itemid = "query_" + item.icolumn().associateTable().getName() + "_" + item.icolumn().getName();
		%>
		<div class="DragBox" idiv="qitem" id="<%=itemid %>"
			style="BORDER: #cccccc 1px solid;width:200px;float:left;">
		<img src="<%=context%>/system/object/images/delete.png" onclick="javascript:removeItem('<%=itemid %>');" title="删除">
		<input
			type="hidden" id="chk_<%=itemid%>" ilabel="<%=item.icolumn().getDescription()%>"
			itableName="<%=item.icolumn().associateTable().getName()%>" value="<%=item.icolumn().getName()%>">
		<%=item.icolumn().getDescription()%> <br> &nbsp;查询项类型&nbsp; 
		<select iname="qitemtype" name="itype_<%=itemid%>"
			id="<%=(itemid)%>_type"></select> <br>
		&nbsp;初始参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		<input type="text" class="box3" style="width:100px;"
			id="<%=(itemid)%>_param" name="iparam"
			value="<%=(item != null ? item.iparam() : "")%>"> <br>
		&nbsp;比较方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		<select iname="qitemmode" name="imode_<%=itemid%>"
			id="<%=(itemid)%>_mode"></select></div>
		<script>script4wordbookselect("query-item-type", "<%=(item != null ? item.itype() : "")%>", "itype_<%=itemid%>");</script>
		<script>script4wordbookselect("compare-mode", "<%=(item != null ? item.imode() : "")%>", "imode_<%=itemid%>");</script>
		<%
		}
		%>
		</DIV>
	   </DIV>
		</td>
	</tr>
	<tr>
		<td>&nbsp;<h1><span style="cursor:hand;" title="点击进行显示项设置" onclick="javascript:selectQueryItem('result');">显示项定义</span></h1></td>
	</tr>
	<tr id="viewItem">
		<td>
      <DIV class="DragContainer" id="DragContainer2" overClass="OverDragContainer">
		<%
			List viewitemList = query.iviewitems();

			for (int i = 0; i < viewitemList.size(); i++) {
				ObjectQueryItem item = (ObjectQueryItem)viewitemList.get(i);
				String itemid = "result_" + item.icolumn().associateTable().getName() + "_" + item.icolumn().getName();
		%>
		<div class="DragBox" idiv="qresultitem" id="<%=itemid %>"
			style="BORDER: #cccccc 1px solid;width:200px;float:left;">
		<img src="<%=context%>/system/object/images/delete.png" onclick="javascript:removeItem('<%=itemid %>');" title="删除">
		<input
			type="hidden" id="chk1_<%=itemid%>" ilabel="<%=item.icolumn().getDescription()%>"
			itableName="<%=item.icolumn().associateTable().getName()%>" value="<%=item.icolumn().getName()%>">
		<%=item.icolumn().getDescription()%> </br>
		&nbsp;译词参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" class="box3" style="width:100px;"
			id="<%=(itemid)%>_param2" name="iparam2"
			value="<%=(item != null ? item.iparam() : "")%>">
		</div>
		<%
		}
		%>
		</DIV>
		</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;<h1><span style="cursor:hand;"
			title="展开/收缩前置约束条件项定义"
			onclick="javascript:showQueryItem('restraintItem');">前置约束条件项定义</span></h1></td>
	</tr>
	<tr id="restraintItem">
		<td>
		<%
				    Map restraintitemMap = query.irestraintitemMap();

				    List list = object.itables();
				
			for (int i = 0; i < list.size(); i++) {
				/*流程对象关联表*/
				Table table = (Table) list.get(i);
				if (object.handleTable(table) == 0) {
					List columns = table.columns();
					for (int j = 0; j < columns.size(); j++) {
				/*表字段*/
				Column column = (Column) columns.get(j);

				if (!column.isAnnex() && !column.isLob()
				&& !column.isPremaryKey()) {
					ObjectQueryItem item = restraintitemMap
					.containsKey(column.getName()) ? (ObjectQueryItem) restraintitemMap
					.get(column.getName())
					: null;

					String checked = (item != null ? "checked" : "");

					String itemid = i + "_" + j;
		%>
		<div class="divn" idiv="qrestraintitem" index="<%=itemid%>"
			style="BORDER: #cccccc 1px solid;width:200px;float:left;"><input
			type="checkbox" <%=checked%> id="chk3_<%=itemid%>"
			name="chk3_<%=table.getName()%>"
			ilabel="<%=column.getDescription()%>"
			itableName="<%=table.getName()%>" value="<%=column.getName()%>">
		<%=column.getDescription()%> <br>
		&nbsp;初始参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		<input type="text" class="box3" style="width:100px;"
			id="<%=(itemid)%>_param3"
			value="<%=(item != null ? item.iparam() : "")%>"> <br>
		&nbsp;比较方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		<select name="imode3_<%=itemid%>" id="<%=(itemid)%>_mode3"></select></div>
		<script>script4wordbookselect("compare-mode", "<%=(item != null ? item.imode() : "")%>", "imode3_<%=itemid%>");</script>
		<%
					}
					}
				}
			}
		%>
		</td>
	</tr>
	<tr>
		<td align="center"><input type="button" name="button0"
			class="button0" value=" 确 定 " onclick="javascript:handleUpdate();">
		&nbsp;	
		<input type="button" name="button1" class="button0" value=" 取 消 "
			onclick="javascript:window.history.back(-1);"></td>
	</tr>
	<tr>
		<td align="center"></td>
	</tr>
</table>
</form>
</body>
</html>
