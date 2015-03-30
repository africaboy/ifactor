<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.wordbook.XWordbook" %>
<%@ page import="java.util.List" %>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String pid = (String)request.getAttribute("pid");
   
   List list = (List)request.getAttribute("list");
   
   List gratinglist = (List)request.getAttribute("gratinglist");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>新建组</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script>
     function init(){
         var myForm = new dhtmlXForm("form1");
     }
</script>
<body onload="javascript:init();">
<form name="form1" method="post" action="">
<input type="hidden" name="pid" value="<%=pid%>">
<table class="tab4edit" width="519" border="1">
  <tr>
    <td width="142">名称</td>
    <td width="361">&nbsp;<input type="text" class="box3" name="gname" value=""></td>
  </tr>
  <tr>
    <td>描述</td>
    <td>&nbsp;<input type="text" class="box3" name="gintro" value=""></td>
  </tr>
  <tr>
    <td>所属区域</td>
    <td>&nbsp;<select name="garea">
	   <%
	     if(list != null && !list.isEmpty()){
	        for(int i=0;i<list.size();i++){
	            XWordbook wb = (XWordbook)list.get(i);
	   %>
	   <option value="<%=wb.getID()%>"><%=wb.getName()%></option>
	   <%
	        }
	     }
	   %>
	</select></td>
  </tr>
  <tr style="display:none;">
    <td>机构代码</td>
    <td>&nbsp;<input type="text" class="box3" name="gnumber" value=""></td>
  </tr>
  <tr style="display:none;">
    <td>分支机构</td>
    <td>&nbsp;<input type="text" class="box3" name="gbranch" value=""></td>
  </tr>
  <tr style="display:none;">
    <td>临时</td>
    <td>&nbsp;
    否<input type="radio" name="glinshi" value="0" checked>
    是<input type="radio" name="glinshi" value="1"></td>
  </tr>
  <tr>
    <td>&nbsp;排列顺序</td>
    <td><input name="disporder" class="box3" type="text" id="disporder" value="99"/></td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <input type="button" name="button0" class="button0" value=" 确 定 ">
      <input type="reset" name="button0" class="button0" value=" 重新填写 ">
    </td>
  </tr>
</table>
</form>
</body>
</html>
