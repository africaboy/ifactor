<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="jt.classic.system.group.IGroup"%>
<%@ page import="jt.classic.system.user.IUser"%>
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
	
	Map query = (Map)request.getAttribute("query");
	
	String qname = (String)query.get("qname");
	String qlogid = (String)query.get("qlogid");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>系统日志列表</title>
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
    
    if(!isblank(document.form1.stime) || !isblank(document.form1.etime)){
        rnt = true;
    }else{
	    var chks = document.getElementsByTagName("input");
	    for(var i=0;i<chks.length;i++){
	      if(chks[i].type == "checkbox" && chks[i].checked){
	        rnt = true;
	        ids += chks[i].value + ",";
	      }
	    }
    }
    
    if(!rnt){
      alert("请选择要删除日志");
    }else if(confirm("删除日志")){
      if(ids != ""){
         createHidden("ids",ids.substring(0,ids.length - 1));
      }
      document.form1.action = "<%=context%>/system/log.do?method=delete";
      document.form1.submit();
    }
  }
  
  function handleQuery(){
     dialogX(document.getElementById("querydiv"),true,"查询",200,200);
  }
  
  function query(){
    document.form1.action = context + "/system/log.do?method=list";
    document.form1.submit();
  }
  
  function handleReresh(){
      window.location.href = context + "/system/log.do?method=list&pageNO=<%=pageNO%>";
  }
</script>
<body>
<form name="form1" method="post" action="">
<input type="hidden" name="pageNO" value="<%=pageNO%>">
<div id="querydiv" style="display:none;">
  <table border="0" class="tab-noborder" width="400" cellspacing="0" cellpadding="0">
    <tr>
	<td colspan="2">&nbsp;
	不填写查询条件即查询所有日志
	</td>
    </tr>
	 <tr>
	 <td width="20%">&nbsp;姓名</td>
	 <td>&nbsp;<input type="input" name="qname" class="box3" value="<%=qname%>"></td>
	 </tr>
	 <tr>
	 <tr><td colspan="2"></td></tr>
	 <td>&nbsp;登录ID</td>
	 <td>&nbsp;<input type="input" name="qlogid" class="box3" value="<%=qlogid%>"></td>
	 </tr>
	 <tr>
	 <td colspan="2">&nbsp;
	 <input type="button" name="button3" class="button0" value=" 确 定 " onclick="javascript:query();">
	 </td>
	 </tr>
     </table>
     </div>
<h1>系统日志列表</h1>
<table class="tab4list" border="0" width="98%" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="7" class="td0" align="left">
      <input type="text" name="stime" class="box2" style="width:150px;" value="" readonly onclick="HS_setDate(this);">&nbsp;至&nbsp;<input type="text" class="box2" style="width:150px;" name="etime" value="" readonly onclick="HS_setDate(this);">
      <input type="button" class="button0" value=" 删 除 " onclick="javascript:handleDelete();">
      <input type="button" class="button0" value=" 查 询 " onclick="javascript:handleQuery();">
      <input type="button" class="button0" value=" 刷 新 " onclick="javascript:handleReresh();">
    </td>
  </tr>
  <tr> 
    <td class="td1" title="全部选择/取消选择" onclick="javascript:checkall();" width="10" align="center">&nbsp;</td>
    <td class="td1" width="15%">&nbsp;用户名称</td>
    <td class="td1" width="10%">&nbsp;日志类型</td>
    <td class="td1" width="10%">&nbsp;个人帐号</td>
    <td class="td1" width="20%">&nbsp;时间</td>
    <td class="td1" width="20%">&nbsp;IP地址</td>
    <td class="td1" width="20%">&nbsp;</td>
  </tr>
  <% 
    if(resultList!=null&&!resultList.isEmpty()){
       for(int i=0;i<resultList.size();i++){
	       Map info = (Map)resultList.get(i);
	       String number = (String)info.get("PAGINATION_NUMBER");
	       String logname = (String)info.get("LOGNAME");
	       String logtype = (String)info.get("LOGTYPE");
	       String logid = (String)info.get("LOGID");
	       String logtime = (String)info.get("LOGTIME");
	       String logmemo = (String)info.get("LOGMEMO");
	       String id = (String)info.get("ID");
	       String logip = (String)info.get("LOGIP");
  %> 
  <tr onMouseOver="javascript:this.bgColor='#ffff99'" onmouseout=" javascript:this.bgColor='#ffffff'" bgColor="#ffffff"> 
    <td align="center">
    <input type="checkbox" name="chk" value="<%=id%>">
    </td>
    <td>&nbsp;<%=logname%></td>
    <td>&nbsp;<%=logtype%></td>
    <td>&nbsp;<%=logid%></td>
    <td>&nbsp;<%=DateTrimmer.getYMDHMS_LBL(logtime)%></td>
    <td align="center"><%=logip%></td>
    <td align="left"><%=logmemo%></td>
  </tr>
  <%
        }
     }
  %>
</table> 
<table width="98%" class="tab-noborder" border="0" cellspacing="0" cellpadding="0">
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
<%=controller.getControlScript(true)%> 
</form>
</body>
</html>	