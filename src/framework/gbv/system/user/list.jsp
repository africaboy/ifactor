<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="jt.classic.system.group.IGroup"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="org.limp.mine.Label"%>
<%@ page import="org.limp.mine.Controller"%>
<%@ page import="jt.classic.system.wordbook.XWordbook"%>
<%@ page import="jt.classic.system.wordbook.XWordbookQuery"%>
<%@ page import="jt.classic.system.wordbook.XWordbookMain"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	Object[] result = (Object[]) request.getAttribute("result");
	Label label = (Label) result[1];
	Controller controller = (Controller) result[2];
	String pageNO = (String) result[3];
	List resultList = (List) result[0];

	List list = (List) request.getAttribute("list");

	List utypelist = (List) request.getAttribute("utypelist");

	Map query = (Map) request.getAttribute("query");

	String qname = (String) query.get("qname");
	String qlogid = (String) query.get("qlogid");
	String qnumber = (String) query.get("qnumber");
	String qarea = (String) query.get("qarea");
	String qtype = (String) query.get("qtype");

	XWordbookMain wbmain = XWordbookMain.getInstance();
	XWordbookQuery wbquery = wbmain.getWordbookQuery("user-rating");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>用户列表</title>
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
        ids += "'" + chks[i].value + "',";
      }
    }
    
    if(!rnt){
      alert("请选择要删除的用户");
    }else if(confirm("确定删除用户")){
      createHidden("ids",ids.substring(0,ids.length - 1));
      document.form1.action = "<%=context%>/system/user.do?method=delete";
      document.form1.submit();
    }
  }
  
  function handleQuery(){
     dialogX(document.getElementById("querydiv"),true,"查询",200,300);
  }
  
  function query(){
    document.form1.action = context + "/system/user.do?method=list";
    document.form1.submit();
  }
  
  function handleInsert(){
      var url = "<%=context%>/system/user.do?method=neu";
      dialog(url,true,"新建用户",630,400);
  }
  
  function handleEdit(id){
      var url = "<%=context%>/system/user.do?method=edit&id=" + id;
      window.location.href = url;
      //top.dialog(url,true,"编辑用户信息",700,500);
  }
  
  function handleResetPWD(id,name){
      if(confirm("确定将用户'"+name+"'密码恢复成默认设置")){
         var url = context + "/system/user.do?method=resetpwd&id=" + id;
	     var res = sendRequest(url);
	     
	     if(res == 1){
	        alert("密码重置成功");
	     }else{
	        alert("密码重置失败");
	     }
      }
  }
  
  function handleDisable(id,name){
    if(confirm("确定将用户'"+name+"'设置为无效")){
         var url = context + "/system/user.do?method=disabled&id=" + id;
         
	     var res = sendRequest(url);
	     
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
         
	      var res = sendRequest(url);
	     
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
      window.location.href = context + "/system/user.do?method=list&pageNO=<%=pageNO%>";
  }
</script>
<body>
<form name="form1" method="post" action=""><input type="hidden"
	name="pageNO" value="<%=pageNO%>">
<div id="querydiv" style="width:400px;display:none;padding:5px;">
<table class="tab4edit" align="center" width="98%">
	<tr>
		<td colspan="2">&nbsp; 不填写查询条件即查询所有用户</td>
	</tr>
	<tr>
		<td width="20%" class="td1">&nbsp;姓名</td>
		<td>&nbsp;<input type="input" name="qname" class="box3"
			value="<%=qname%>"></td>
	</tr>
	<tr>
		<td class="td1">&nbsp;登录ID</td>
		<td>&nbsp;<input type="input" name="qlogid" class="box3"
			value="<%=qlogid%>"></td>
	</tr>
	<tr>
		<td class="td1">&nbsp;员工编号</td>
		<td>&nbsp;<input type="input" name="qnumber" class="box3"
			value="<%=qnumber%>"></td>
	</tr>
	<tr>
		<td class="td1">类别</td>
		<td>&nbsp;<select name="qtype">
			<option value=""></option>
			<%
					if (utypelist != null && !utypelist.isEmpty()) {
					for (int i = 0; i < utypelist.size(); i++) {
						XWordbook wb = (XWordbook) utypelist.get(i);
			%>
			<option value="<%=wb.getID()%>"
				<%=(qtype.equals(wb.getID()))?"selected":""%>><%=wb.getName()%></option>
			<%
				}
				}
			%>
		</select></td>
	</tr>
	<tr>
		<td class="td1">所属区域</td>
		<td>&nbsp;<select name="qarea">
			<option value=""></option>
			<%
					if (list != null && !list.isEmpty()) {
					for (int i = 0; i < list.size(); i++) {
						XWordbook wb = (XWordbook) list.get(i);
			%>
			<option value="<%=wb.getID()%>"
				<%=(qarea.equals(wb.getID()))?"selected":""%>><%=wb.getName()%></option>
			<%
				}
				}
			%>
		</select></td>
	</tr>
	<tr>
		<td colspan="2" style="height:25px;" align="center">
		   &nbsp;<a href="javascript:void(0);" onclick="javascript:query();">确 定</a>
		   &nbsp;<a href="javascript:void(0);" onclick="javascript:closeDialog();">取 消</a>
		</td>
	</tr>
</table>
</div>
<h1>系统用户列表</h1>
<table>
	<tr>
		<td class="td0" colspan="8" align="left">
		    &nbsp;<a href="<%=context %>/system/user.do?method=neu">用户注册</a>
		    &nbsp;<a href="javascript:void(0);" onclick="javascript:handleQuery();">查 询</a>
		    &nbsp;<a href="javascript:void(0);" onclick="javascript:handleDelete();">删 除</a>
		    &nbsp;<a href="javascript:void(0);" onclick="javascript:handleReresh();">刷 新</a>
		</td>
	</tr>
	<tr>
		<td ><div id="gridbox" style="width:800px; height:270px; background-color:white;"></div></td>
	</tr>
	<%
	   StringBuffer jasonString = new StringBuffer();
	   
	   jasonString.append("{rows: [");
	
	   if (resultList != null && !resultList.isEmpty()) {
			for (int i = 0; i < resultList.size(); i++) {
				Map info = (Map) resultList.get(i);
				String number = (String) info.get("PAGINATION_NUMBER");
				IUser user = (IUser) info.get("user");
				String id = user.id();
				String name = user.iname();
				String logid = user.ilogid();
				String sex = user.isex();
				String job = user.ijob();
				String type = user.itypelabel();
				String rating = String.valueOf(user.irating());
				String bgcolor = user.iflag() == 0 ? "yellow" : "#ffffff";
				String disabledDis = user.iflag() == 1 ? "block" : "none";
				String abledDis = user.iflag() == 0 ? "block" : "none";
				IGroup group = user.igroup();

				String rootname = "";
				String secondname = "";
				String groups = "";
				if (group != null) {
					groups = group.iflumelabel("/");
					if(groups.indexOf("/") > -1){
						groups = groups.substring(groups.indexOf("/") + 1);
					}
				}
				
				XWordbook wb = (wbquery != null ? wbquery.query(rating) : null);
				
				jasonString.append("{id: "+id+",data: [\""+name+"^"+(context + "/system/user.do?method=edit&id=" + id)+"^_self\", \""+logid+"\", \""+sex+"\", \""+groups+"\", \""+job+"\", \""+(wb == null ? rating : wb.getName())+"\"]}");
				
				if(i < resultList.size() - 1){
					jasonString.append(",");
				}
		}
		}
	   
	    jasonString.append("]}");
	%>
</table>
<table width="800" class="tab-noborder" border="0"
	cellspacing="0" cellpadding="5">
	<tr>
		<td width="50%"><%=label.displayLabel()%></td>
		<td align="right"><%=label.startLabel()%> <%=label.previousLabel()%>
		<%=label.nextLabel()%> <%=label.endLabel()%> <%=controller.getController().toString()%>
		</td>
	</tr>
</table>
<%=controller.getControlScript(true)%></form>


<script>data = <%=jasonString.toString()%>
mygrid = new dhtmlXGridObject('gridbox');
mygrid.setImagePath("<%=context %>/resources/dhtmlx/codebase/imgs/");
mygrid.setHeader("姓名, 登录ID, 性别, 部门, 职务, 级别");
mygrid.setInitWidths("200,100,100,200,100,100");
mygrid.setColAlign("left,left,center,left,left, left");
mygrid.setColTypes("link,ed,ed,ed,ed,ed");
mygrid.setColSorting("str,str,str,str,str,str");
mygrid.setEditable(false);
mygrid.init();
mygrid.enableLightMouseNavigation(true);
mygrid.parse(data,"json");
</script>

</body>
</html>
