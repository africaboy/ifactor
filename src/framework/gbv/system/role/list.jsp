<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.HTMLTool"%>
<% 
    String path = jt.classic.system.context.ISystemContext.getContextPath();
	List list = (List)request.getAttribute("list");	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>角色列表</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script language="javascript">
   function handleDelete(){
     var chks = document.getElementById("listarea").getElementsByTagName("input");
     
     var rnt = false;
     
     if(chks.length > 0){
	     for(var i=0;i<chks.length;i++){
	       if(chks[i].type == "checkbox" && chks[i].checked){
	         var id = document.getElementById("role_id_" + chks[i].value).value;
	         var name = document.getElementById("role_name_" + chks[i].value).value;
	         var oid = document.getElementById("role_other_" + chks[i].value).value;
	         /*role id*/
	         var idscript = "<input type=\"hidden\" name=\"ids\" value=\""+id+"\">";
	         var idobject = document.createElement(idscript)   
	         document.forms[0].insertBefore(idobject);
	         /*role name*/
	         var namescript = "<input type=\"hidden\" name=\"names\" value=\""+name+"\">";
	         var nameobject = document.createElement(namescript)   
	         document.forms[0].insertBefore(nameobject);
	         /*object id*/
	         var oidscript = "<input type=\"hidden\" name=\"oids\" value=\""+oid+"\">";
	         var oidobject = document.createElement(oidscript)   
	         document.forms[0].insertBefore(oidobject);
	         
	         rnt = true;
	       }
	     }
	     
	    
     }
     
     if(!rnt){
       alert("没有选定要删除的角色");
     }else{
       if(confirm("确定要删除")==true){
	     document.form1.action = "<%=path%>/xsystem/xrole.do?method=delete";
	     document.form1.submit();
	   }
     }
   }
   
   function handleThizz(thizz){
     //if(thizz.checked){
       var id = document.getElementById("role_id_" + thizz.value).value;
       window.location.href = "<%=path%>/system/role.do?method=edit&id=" + id;
     //}
   }
</script>
<body>
<form id="form1" name="form1" method="post" action="">
  <h2>角色列表&nbsp;<a href="<%=path %>/system/role.do?method=neu">角色定义</a></h2>
  <table width="400" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td colspan="3">&nbsp;</td>
    </tr>
    <tr>
      <td colspan="3">
       <div id="listarea">
       <%
         String stamp = "cid:role;id:ID;name:NAME;alt:MEMO;title:角色信息列表;type:radio;size:5";
         out.println(HTMLTool.rangeList(list,stamp));
       %>
       </div>
      </td>
    </tr>
  </table>
</form>
</body>
</html>    