<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.group.IGroup"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="jt.classic.system.wordbook.XWordbook" %>
<%@ page import="java.util.List" %>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   IGroup group = (IGroup)request.getAttribute("group");
   
   List list = (List)request.getAttribute("list");
   
   List gratinglist = (List)request.getAttribute("gratinglist");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>组信息编辑</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script src="<%=context %>/system/group/js/edit.js"></script>
<body onload="javascript:init(<%=(!group.isroot())%>, <%=(!group.isroot() && !group.hasChildren()) %>, '<%=group.id() %>');">
<div id="a_tabbar" style="width:800px; height:455px;"></div>
<div id="content">
<form id="form1" name="form1" method="post" action="">
<input type="hidden" name="gid" value="<%=group.id()%>">
<table class="tab4edit" width="500" style="margin-top:10px;margin-left:10px">
  <tr class="tr1">
    <td class="td1" width="20%" align="center"><label>名称</label></td>
    <td class="td2"><%if(!group.isroot()){%><input type="text" name="gname" style="width:300px;" value="<%=group.iname()%>"><%}else{%><%=group.iname()%><%} %></td>
  </tr>
  <tr class="tr1">
    <td class="td1" align="center"><label>描述</label></td>
    <td class="td2"><%if(!group.isroot()){%><input type="text" name="gintro" style="width:300px;" value="<%=group.idesc()%>"><%}else{%><%=group.idesc()%><%} %></td>
  </tr>
  <%if(!group.isroot()){%>
  <tr class="tr1">
    <td class="td1" align="center"><label>级别</label></td>
    <td class="td2"><select name="grating" style="width:300px;">
       <%
	     if(gratinglist != null && !gratinglist.isEmpty()){
	        for(int i=0;i<gratinglist.size();i++){
	            XWordbook wb = (XWordbook)gratinglist.get(i);
	   %>
	   <option value="<%=wb.getID()%>" <%=(String.valueOf(group.irating()).equals(wb.getID())?"selected":"")%>><%=wb.getName()%></option>
	   <%
	        }
	     }
	   %>
      </select>
   </td>
  </tr>
  <%} %>
  <tr class="tr1" style="display:none;">
    <td class="td1"><label>所属区域</label></td>
    <td class="td2"><select name="garea" class="select">
	   <%
	     if(list != null && !list.isEmpty()){
	        for(int i=0;i<list.size();i++){
	            XWordbook wb = (XWordbook)list.get(i);
	   %>
	   <option value="<%=wb.getID()%>" <%=(group.iarea().equals(wb.getID()))?"selected":""%>><%=wb.getName()%></option>
	   <%
	        }
	     }
	   %>
	</select></td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1"><label>机构代码</label></td>
    <td class="td2"><input type="text" class="box3" name="gnumber" value="<%=group.inumber()%>"></td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1"><label>分支机构</label></td>
    <td class="td2"><input type="checkbox" name="branch" value="1" <%=group.isbranch()?"checked":""%>></td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1"><label>临时</label></td>
    <td class="td2">&nbsp;
    否<input type="radio" name="glinshi" value="0" <%=(!group.istemporary()?"checked":"")%>>
    是<input type="radio" name="glinshi" value="1" <%=(group.istemporary()?"checked":"")%>></td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1"><label>排列顺序</label></td>
    <td class="td2"><input name="disporder" class="box3" type="text" id="disporder" value="<%=group.iorder()%>"/></td>
  </tr>
</table>
</form>
</div>
</body>
</html>
