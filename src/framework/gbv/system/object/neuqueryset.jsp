<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.RandomUtil"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	WObject object = (WObject) request.getAttribute("object");

	String key = RandomUtil.getRandomString(10, true);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>定义查询设置</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link href="<%=context %>/system/object/css/dragcontainer.css" rel=stylesheet></link>
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
			name="qname" value=""></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;唯一标识</td>
		<td class="td2">&nbsp;<input type="hidden" name="qkey"
			value="<%=key%>"><%=key%></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;查询说明</td>
		<td class="td2">&nbsp;<input type="text" class="box3"
			name="qdesc" value=""></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;查询视图URL</td>
		<td class="td2">&nbsp;<input type="text" class="box3"
			name="queryurl" value=""></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;查询结果视图URL</td>
		<td class="td2">&nbsp;<input type="text" class="box3"
			name="qresulturl" value=""></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;数据访问权限控制</td>
		<td class="td2">&nbsp;<input type="hidden" name="qpurview"
			value=""><input type="text" class="box3" name="qpurviewname"
			value="" readonly onclick="javascript:handlePurview();"></td>
	</tr>
	<tr class="tr1">
		<td class="td1">&nbsp;数据操作设置</td>
		<td class="td2">
			&nbsp;新建<input type="checkbox" name="qhinsert"
			value="yes">
		    &nbsp;查看<input type="checkbox" name="qhview"
			value="yes">
			&nbsp;修改<input type="checkbox" name="qhupdate"
			value="yes">
			&nbsp;删除<input type="checkbox" name="qhdelete"
			value="yes">
			&nbsp;授权<input type="checkbox" name="qhpurview"
			value="yes">
			&nbsp;导出<input type="checkbox" name="qhexport"
			value="yes">
			&nbsp;复制<input type="checkbox" name="qhcopy"
			value="yes"></td>
	</tr>
	<tr class="tr1">
		<td class="td1" title="当前会话用户所属组及子组相关性设置">&nbsp;会话相关性</td>
		<td class="td2">&nbsp;<input type="checkbox" name="qsession"
			value="1"></td>
	</tr>
	<tr class="tr1">
		<td class="td1" valign="top">&nbsp;对象创建日期</td>
		<td class="td2"><div class="divn">开始日期<br><input type="text" class="box3"
			name="qcreatestime" value="" readonly onclick="javascript:getDateString(this);"></div>
			<div class="divn">结束日期<br><input type="text" class="box3"
			name="qcreateetime" value="" readonly onclick="javascript:getDateString(this);"></div></td>
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
      </DIV>
	   </DIV>
		</td>
	</tr>
	<tr>
		<td><h1><span style="cursor:hand;" title="点击进行显示项设置" onclick="javascript:selectQueryItem('result');">显示项定义</span></h1></td>
	</tr>
	<tr id="viewItem">
		<td>
		<DIV class="DragContainer" id="DragContainer2" overClass="OverDragContainer"></DIV>
		</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;<span style="cursor:hand;"
			title="展开/收缩前置约束条件项定义"
			onclick="javascript:showQueryItem('restraintItem');"><h1>前置约束条件项定义</h1></span></td>
	</tr>
	<tr id="restraintItem">
		<td>
		<%
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

					String itemid = i + "_" + j;
		%>
		<div class="divn" idiv="qrestraintitem" index="<%=itemid%>"
			style="BORDER: #cccccc 1px solid;width:200px;float:left;"><input
			type="checkbox" id="chk3_<%=itemid%>"
			name="chk3_<%=table.getName()%>" itableName="<%=table.getName()%>"
			value="<%=column.getName()%>">&nbsp;<%=column.getDescription()%> <br>&nbsp;初始参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<input type="text" class="box3" style="width:100px;"
			id="<%=(itemid)%>_param3" value=""><br>&nbsp;比较方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<select iname="qitemmode" name="imode3_<%=itemid%>"
			id="<%=(itemid)%>_mode3"></select>
		<script>script4wordbookselect("compare-mode", "", "imode3_<%=itemid%>");</script>	
			</div>
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
			class="button0" value=" 确 定 " onclick="javascript:handleSave();">
		&nbsp;
		<input
			type="button" name="button1" class="button0" value=" 取 消 "
			onclick="javascript:window.history.back(-1);"></td>
	</tr>
	<tr>
		<td align="center"></td>
	</tr>
</table>
</form>
</body>
</html>
