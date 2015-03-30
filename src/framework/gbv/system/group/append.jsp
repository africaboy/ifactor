<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.group.IGroup"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="jt.classic.system.wordbook.XWordbook"%>
<%@ page import="java.util.List"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	IGroup group = (IGroup) request.getAttribute("parent");

	List list = (List) request.getAttribute("list");

	List gratinglist = (List) request.getAttribute("gratinglist");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>添加部门</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script src="<%=context %>/system/group/js/append.js"></script>
<body onload="javascript:init('<%=group.iname() %>');">
<div id="a_tabbar" style="width:800px; height:455px;"></div>
<div id="content" style="height:400px;overflow:auto;">
<form id="form1" name="form1" method="post" action=""><input
	type="hidden" name="id" value="<%=group.id()%>">
<div item="group" count="0" id="group_0"><input type="hidden" name="pid_0"
	value="<%=group.id()%>"><input type="hidden" name="glevel_0"
	value="<%=(group.ilevel()+1)%>">
<table width="500" class="tab4edit" style="margin-top:10px;margin-left:10px">
	<tr>
		<td class="td1" width="20%" align="center"><label>名称</label></td>
		<td>&nbsp;<input type="text" style="width:300px;" name="gname_0"
			value=""></td>
	</tr>
	<tr>
		<td class="td1" align="center"><label>描述</label></td>
		<td>&nbsp;<input type="text" style="width:300px;" name="gintro_0"
			value=""></td>
	</tr>
	<tr>
		<td class="td1" align="center"><label>级别</td>
		<td>&nbsp;<select style="width:300px;" name="grating_0">
			<%
					if (gratinglist != null && !gratinglist.isEmpty()) {
					for (int i = 0; i < gratinglist.size(); i++) {
						XWordbook wb = (XWordbook) gratinglist.get(i);
			%>
			<option value="<%=wb.getID()%>"><%=wb.getName()%></option>
			<%
				}
				}
			%>
		</select></td>
	</tr>
	<tr style="display:none;">
		<td class="td1"><label>所属区域</label></td>
		<td>&nbsp;<select name="garea_0">
			<%
					if (list != null && !list.isEmpty()) {
					for (int i = 0; i < list.size(); i++) {
						XWordbook wb = (XWordbook) list.get(i);
			%>
			<option value="<%=wb.getID()%>"><%=wb.getName()%></option>
			<%
				}
				}
			%>
		</select></td>
	</tr>
	<tr style="display:none;">
		<td class="td1"><label>机构代码</td>
		<td>&nbsp;<input type="text" class="box3" name="gnumber_0"
			value=""></td>
	</tr>
	<tr style="display:none;">
		<td class="td1"><label>分支机构</td>
		<td>&nbsp;<input type="checkbox" name="gbranch_0" value="1"></td>
	</tr>
	<tr style="display:none;">
		<td>临时</td>
		<td>&nbsp; 否<input type="radio" name="glinshi_0" value="0"
			checked> 是<input type="radio" name="glinshi_0" value="1"></td>
	</tr>
	<tr style="display:none;">
		<td class="td1"><label>排列顺序</td>
		<td>&nbsp;<input name="disporder_0" class="box3" type="text"
			value="0" /></td>
	</tr>
</table>
</div>
</form>
</div>
</body>
</html>
