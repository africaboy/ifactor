<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.HTMLTool"%>
<% 
    String path = jt.classic.system.context.ISystemContext.getContextPath();
	List list = (List)request.getAttribute("list");	
	String select = (String)request.getAttribute("type");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>角色列表</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<style>
input {
vertical-align:middle; 
margin-top:0;
}
</style>
<script language="javascript">
   function handleQuery(){
     document.form1.submit();
   }
   
   function handleThizz(thizz){
     if(thizz.type == "radio"){
       var id = document.getElementById("role_id_" + thizz.value).value;
       var name = document.getElementById("role_name_" + thizz.value).value;
       var key = document.getElementById("role_other_" + thizz.value).value;
       parent.setParameter(id,name,key);
       parent.closeDialog();
     }
   }
   
   function handleCheckbox(){
     var id = "";
     var name = "";
     var key = "";
     var chk = document.getElementsByName("role_chk");
     for(var i=0;i<chk.length;i++){
        if(chk[i].checked){
           id += document.getElementById("role_id_" + chk[i].value).value + ",";
           name += document.getElementById("role_name_" + chk[i].value).value + ",";
           key += document.getElementById("role_other_" + chk[i].value).value + ",";
        }
     }
     
     if(id == ""){
       alert("请选择角色");
     }else{
       parent.setParameter(id.substring(0,id.length-1),name.substring(0,name.length-1),key.substring(0,key.length-1));
       parent.closeDialog();
     }
   }
   
   var checked = false;
   
   function checkall(){
     var chk = document.getElementsByName("role_chk");
     for(var i=0;i<chk.length;i++){
       chk[i].checked = !checked;
     }
     checked = !checked;
   }
   
   function handleInit(){
     if(parent.nowselect != ""){
     var rck = document.getElementsByName("role_chk");
     for(var i=0;i<rck.length;i++){
        var id = document.getElementById("role_id_" + rck[i].value).value; 
        if(parent.document.getElementById(parent.nowselect + "_role_" + id)){
           rck[i].checked = true;
        }
     }
     }
   }
</script>
<body onload="javascript:handleInit();">
<form id="form1" name="form1" method="post" action="">
<h1>系统角色列表 
        <%if(select.equals("checkbox")){%><a href="#" title="全部选择/取消选择" onclick="javascript:checkall();">选择</a><%} %>
        <a href="#" onclick="javascript:handleCheckbox();">确定</a>
        <a href="#" onclick="javascript:parent.closeDialog();">取消</a></h1>

  <table width="400" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td colspan="3">
       <div id="listarea">
       <%
         String stamp = "cid:role;id:ID;name:NAME;other:ROLEKEY;alt:MEMO;title:角色信息列表;type:"+select+";size:5";
         out.println(HTMLTool.rangeList(list,stamp));
       %>
       </div>
      </td>
    </tr>
  </table>
</form>
</body>
</html>    