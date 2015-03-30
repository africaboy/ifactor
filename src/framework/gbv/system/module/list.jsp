<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="jt.classic.system.module.IModule"%>
<%@ page import="org.limp.mine.Label"%>
<%@ page import="org.limp.mine.Controller"%>	
<%@ page import="org.limp.mine.DateTrimmer"%>
<% 
    String context = jt.classic.system.context.ISystemContext.getContextPath();
	Object[] result = (Object[])request.getAttribute("result");	
	Label label = (Label)result[1];
	Controller controller = (Controller)result[2];	
	String pageNO = (String)result[3];
	List resultList = (List) result[0];
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>模块列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<script language="javascript">
  var chk = false;
  function checkall(thizz){
    var chks = document.getElementsByTagName("input");
    for(var i=0;i<chks.length;i++){
      if(chks[i].type == "checkbox"){
        chks[i].checked = !chk;
      }
    }
    
    chk = !chk;
  }
  
  function handleDelete(){
    var rnt = false;
    var ids = "";
    var chks = document.getElementsByTagName("input");
    for(var i=0;i<chks.length;i++){
      if(chks[i].type == "checkbox" && chks[i].checked){
        rnt = true;
        ids += chks[i].value + ",";
      }
    }
    
    if(!rnt){
      alert("请选择要删除模块");
    }else if(confirm("确定删除模块")){
      createHidden("ids",ids.substring(0,ids.length - 1));
      document.form1.action = "<%=context%>/system/module.do?method=delete";
      document.form1.submit();
    }
  }
  
  function handleQuery(){
     dialogX(document.getElementById("querydiv"),true,"查询",200,200);
  }
  
  function query(){
    document.form1.action = context + "/system/user.do?method=list";
    document.form1.submit();
  }
  
  function handleInsert(){
      var url = "<%=context%>/system/module.do?method=neu";
      window.location.href = url;
  }
  
  function handleEdit(id){
      var url = "<%=context%>/system/module.do?method=edit&id=" + id;
      window.location.href = url;
      //top.dialog(url,true,"编辑模块信息",700,500);
  }
  
  function handlePurview(id,name){
      var url = "<%=context%>/system/module.do?method=purview&id=" + id;
      dialog(url,true,"模块访问授权",700,400);
  }
  
  function handleDisable(id,name){
    if(confirm("确定将用户'"+name+"'设置为无效")){
         var url = context + "/system/user.do?method=disabled&id=" + id;
         xmlhttp.Open("POST",url ,false);
	     xmlhttp.send(null);
	     var res = xmlhttp.responseText;
	     
	     if(res == 1){
	        alert("重置成功");
	        document.getElementById("disabled_" + id).style.display = "none";
	        document.getElementById("abled_" + id).style.display = "block";
	     }else{
	        alert("重置失败");
	     }
      }
  }
  
  function handleAble(id,name){
    if(confirm("确定将用户'"+name+"'设置为有效")){
         var url = context + "/system/user.do?method=abled&id=" + id;
         xmlhttp.Open("POST",url ,false);
	     xmlhttp.send(null);
	     var res = xmlhttp.responseText;
	     
	     if(res == 1){
	        alert("重置成功");
	        document.getElementById("abled_" + id).style.display = "none";
	        document.getElementById("disabled_" + id).style.display = "block";
	     }else{
	        alert("重置失败");
	     }
      }
  }
   
  function handleReresh(){
      window.location.href = context + "/system/module.do?method=list&pageNO=<%=pageNO%>";
  }
</script>
<body>
<form name="form1" method="post" action="">
<input type="hidden" name="pageNO" value="<%=pageNO%>">
<h1>系统模块列表</h1> 
<table class="tab4list" align="center" width="800">
  <tr>
    <td colspan="5" class="td0" align="right">
      <input type="button" class="button0" value=" 新 建 " onclick="javascript:handleInsert();">
      <input type="button" class="button0" value=" 删 除 " onclick="javascript:handleDelete();">
      <input type="button" class="button0" value=" 刷 新 " onclick="javascript:handleReresh();">
    </td>
  </tr>
  <tr> 
    <td class="td1" title="全部选择/取消选择" onclick="javascript:checkall();" width="10" align="center">&nbsp;</td>
    <td class="td1" width="10%">&nbsp;</td>
    <td class="td1" width="30%">&nbsp;模块名称</td>
    <td class="td1" width="40%">&nbsp;备注说明</td>
    <td class="td1" width="10%">&nbsp;排序顺序</td>
  </tr>
  <% 
    if(resultList!=null&&!resultList.isEmpty()){
       for(int i=0;i<resultList.size();i++){
	       Map info = (Map)resultList.get(i);
	       String number = (String)info.get("PAGINATION_NUMBER");
	       IModule module = (IModule)info.get("module");
	       String id = module.id();
	       String name = module.iname();
           String memo = module.imemo();
           String sort = module.isort();
  %> 
  <tr onMouseOver="javascript:this.bgColor='#ffff99'" onmouseout=" javascript:this.bgColor='#ffffff'" bgColor="#ffffff"> 
    <td align="center">
    <input type="checkbox" name="chk" value="<%=id%>">
    </td>
    <td align="center"><a href="javascript:void(0)" onclick="javascript:handlePurview('<%=id%>','<%=name%>');">权限设置</a></td>
    <td>&nbsp;<a href="javascript:void(0)" onclick="javascript:handleEdit('<%=id%>');"><%=name%></a></td>
    <td>&nbsp;<%=memo%></td>
    <td align="center">&nbsp;<%=sort%></td>
  </tr>
  <%
        }
     }
  %>
</table> 
<h3>
<table width="800" align="center" class="tab-noborder" border="0" cellspacing="0" cellpadding="0">
  <tr>
   <td>
    <%=label.displayLabel()%>
   </td>
   <td align="right">
        <%=label.startLabel()%>
        <%=label.previousLabel()%>
        <%=label.nextLabel()%>
        <%=label.endLabel()%>
        <%=controller.getController().toString()%>
    </td>
  </tr>
</table>  
</h3>
<%=controller.getControlScript(true)%> 
</form>
</body>
</html>	