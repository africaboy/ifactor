<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.group.IGroup"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.wordbook.XWordbook"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	IUser user = (IUser) request.getAttribute("user");

	IGroup group = user.igroup();

	List subgroups = user.isubgroup();

	List list = (List) request.getAttribute("list");

	List utypelist = (List) request.getAttribute("utypelist");

	List uratinglist = (List) request.getAttribute("uratinglist");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>用户注册</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<style>
.cont{
   margin: 10px;
}

.cont div {
        width:350px;
        height:30px;
}
.cont div input {
    float:right;
    width:250px;
}
.cont div label{
}
</style>
<script>
   function checkit(){
     var rnt = true;
     if(isblank(document.form1.uname)){
        rnt = false;
        alert("请填写用户名称");
        document.form1.uname.focus();
     }else if(isblank(document.form1.logid)){
        rnt = false;
        alert("请填写用户登录ID");
        document.form1.logid.focus();
     }else if(!checkLogID(trimme(document.form1.logid))){
        rnt = false;
        alert("登录ID重复，请设定其它的登录ID");
        document.form1.logid.focus();
     }
     
     if(rnt){
        rnt = countPart();
     }
     
     return rnt;
   }
   
   var c = <%=subgroups.size()+1%>;
   
   function handlePart(){
       var bindObject = document.createElement("div");
	   bindObject.id = "part_" + c;
	   bindObject.style.width = "180px";
	   bindObject.style.border = "1px solid #cccccc";
	   bindObject.style.padding = "2px";
	   bindObject.style.margin = "2px";
	   bindObject.style.styleFloat = "left";
	   bindObject.setAttribute("_id",c);
	   var str = "<div class=\"divn\">所属组&nbsp;";
	   str += "<a href='javascript:void(0);' onclick=\"javascript:handleSelect('gname_"+c+"','gid_"+c+"');\">选择</a>&nbsp;";
	   str += "<a href='javascript:void(0);' onclick=\"javascript:document.getElementById('part_"+c+"').removeNode(true);\">取消</a><br>";
	   str += "<input type='text' readonly id='gname_"+c+"' name='gname_"+c+"' value=''>";
	   str += "<input type='hidden' class='box3' readonly id='gid_"+c+"' name='gid_"+c+"' value=''>";
	   str += "<input type='hidden' id='uid_"+c+"' name='uid_"+c+"' value='<%=user.id()%>'>";
	   str += "<input type='hidden' id='upt_"+c+"' name='upt_"+c+"' value='1'>";
	   str += "</div>";
	   str += "<div class=\"divn\">职位<br><select id='upj_"+c+"' name='upj_"+c+"'>";
	   <%
	     if(list != null && !list.isEmpty()){
	        for(int j=0;j<list.size();j++){
	            XWordbook wb = (XWordbook)list.get(j);
	   %>
	   str += "<option value=\"<%=wb.getID()%>\"><%=wb.getName()%></option>";
	   <%
	        }
	     }
	   %>
	   str += "</select></div>";
	   str += "<div class=\"divn\">级别<br><select id='upr_"+c+"' name='upr_"+c+"'>";
	   <%
	     if(uratinglist != null && !uratinglist.isEmpty()){
	        for(int j=0;j<uratinglist.size();j++){
	            XWordbook wb = (XWordbook)uratinglist.get(j);
	   %>
	   str += "<option value=\"<%=wb.getID()%>\"><%=wb.getName()%></option>";
	   <%
	        }
	     }
	   %>
	   str += "</select></div>";
	   //str += "<tr style='display:none;'><td>组内排序</td><td><input type='text' id='upo_"+c+"' name='upo_"+c+"' value='99'></td></tr>";
	   
	   bindObject.innerHTML = str;
	   
       document.getElementById("part").appendChild(bindObject);
       c++;
   }
   
   function countPart(){
       var countP = "";
       if(!isblank(document.form1.gid)){
           countP = "0";
	       createHidden("gid_0",document.form1.gid.value);
	       createHidden("uid_0","<%=user.id()%>");
	       createHidden("upt_0","0");
	       createHidden("upj_0",document.form1.job.value);
	       createHidden("upr_0",document.form1.rating.value);
	       //createHidden("upo_0",document.form1.disporder.value);
       }
       
       var parts = document.getElementById("part").getElementsByTagName("div");
       for(var i=0;i<parts.length;i++){
          var _id = parts[i].getAttribute("_id");
          if(_id && !isblank(document.getElementById("gid_" + _id))){
             countP += "," + _id;
          }
       }
       
       if(countP == ""){
          alert("请设置用户所属组");
          return false;
       }else{
          createHidden("countP",countP);
          return true;
       }
   }
</script>
<script src="<%=context%>/system/user/js/myjs.js"></script>
<body onload="javascript:onload();">
<div id="a_tabbar" style="width:800px; height:455px;"></div>
<div id="content"><div style="height:400px;overflow:auto; ">
<form id="form1" name="form1" method="post"
	action="<%=context%>/system/user.do?method=update"><input
	type="hidden" name="uid" value="<%=user.id()%>"> <input
	type="hidden" name="uorlogid" value="<%=user.ilogid()%>">	
<table class="tab4edit" width="755" style="margin-top:10px;margin-left:10px">
	<tr>
		<td class="td1" width="100">&nbsp;姓名</td>
		<td width="250"><input name="uname"  type="text" id="uname"
			value="<%=user.iname()%>" /></td>
		<td class="td1" width="100">&nbsp;登录ID</td>
		<td width="250"><input name="logid"  type="text" id="logid"
			value="<%=user.ilogid()%>" /></td>	
	</tr>
	<tr>
		<td class="td1">&nbsp;员工编号</td>
		<td><input name="unumber"  type="text" id="unumber"
			value="<%=user.inumber()%>" /></td>
		<td class="td1">&nbsp;性别</td>
		<td><label> 男 <input name="sex" type="radio" value="男"
			<%=user.isex().equals("男")?"checked":""%> /> 女 <input name="sex"
			type="radio" value="女" <%=user.isex().equals("女")?"checked":""%> />
		</label></td>	
	</tr>
	<tr>
		<td class="td1">&nbsp;生日</td>
		<td><input name="birthday1"  type="text"
			id="birthday1" readonly
			value="<%=DateTrimmer.getYMD_S_LBL(user.ibirthday())%>" /></td>
		<td class="td1">&nbsp;电话</td>
		<td><input name="uphone"  type="text" id="uphone"
			value="<%=user.iphone()%>" /></td>	
	</tr>
	<tr>
		<td class="td1">&nbsp;邮箱</td>
		<td><input name="uemail"  type="text" id="uemail"
			value="<%=user.imail()%>" /></td>
		<td class="td1">&nbsp;类别</td>
		<td><label> <select name="utype">
			<%
					if (utypelist != null && !utypelist.isEmpty()) {
					for (int i = 0; i < utypelist.size(); i++) {
						XWordbook wb = (XWordbook) utypelist.get(i);
						out.println("<option value='"
						+ wb.getID()
						+ "'"
						+ (user.itype().equals(wb.getID()) ? "selected"
						: "") + ">" + wb.getName() + "</option>");
					}
				}
			%>
		</select> </label></td>	
	</tr>
	<tr>
	    <td class="td1">&nbsp;用户有效性</td>
		<td>有效 <input name="flag" type="radio" value="1"
			<%=(user.iflag()==1?"checked":"")%> /> 无效 <input name="flag"
			type="radio" value="0" <%=(user.iflag()==0?"checked":"")%> /></td>
		<td class="td1">&nbsp;职位</td>
		<td><select name="job" id="job">
			<%
					if (list != null && !list.isEmpty()) {
					for (int i = 0; i < list.size(); i++) {
						XWordbook wb = (XWordbook) list.get(i);
			%>
			<option value="<%=wb.getID()%>"
				<%=(user.ijob().equals(wb.getID()))?"selected":""%>><%=wb.getName()%></option>
			<%
				}
				}
			%>
		</select></td>
	</tr>
	<tr>
		<td class="td1">&nbsp;所属组</td>
		<td><input name="gname"  type="text" id="gname"
			readonly value="<%=(group!=null?group.iname():"")%>" /> <input
			name="gid"  type="hidden" id="gid"
			value="<%=(group!=null?group.id():"")%>" />&nbsp;<a href="javascript:void(0)"
			onclick="javascript:handleSelect('gname','gid');" title="选择用户所属组">选择</a>
		<a href="javascript:void(0)" onclick="javascript:handleRemove();"
			title="取消用户所属组">取消</a>
		</td>
		<td class="td1">&nbsp;级别</td>
		<td><label> <select name="rating">
			<%
					if (uratinglist != null && !uratinglist.isEmpty()) {
					for (int i = 0; i < uratinglist.size(); i++) {
						XWordbook wb = (XWordbook) uratinglist.get(i);
						out.println("<option value='"
						+ wb.getID()
						+ "'"
						+ (String.valueOf(user.irating())
						.equals(wb.getID()) ? "selected" : "")
						+ ">" + wb.getName() + "</option>");
					}
				}
			%>
		</select> </label></td>	
	</tr>
</table>
<table style="margin-top:5px;margin-left:5px">
<tr class="tr1">
    <td valign="top" colspan="4">
    <div id="part"><%
		if (subgroups != null && !subgroups.isEmpty()) {
		for (int i = 0; i < subgroups.size(); i++) {
			IGroup g = (IGroup) subgroups.get(i);
			String _job = user.ijob(g);
			String _rating = String.valueOf(user.irating(g));
			String _order = String.valueOf(user.iorder(g));
%>
<div id="part_<%=i+1%>" _id="<%=i+1%>"
	style="border:1px solid #cccccc;margin:2px;float:left;width:180px;"><input
	type='hidden' class='box3' readonly id='gid_<%=i+1%>'
	name='gid_<%=i+1%>' value='<%=g.id()%>'> <input type='hidden'
	id='uid_<%=i+1%>' name='uid_<%=i+1%>' value='<%=user.id()%>'> <input
	type='hidden' id='upt_<%=i+1%>' name='upt_<%=i+1%>' value='1'>
<div class="divn">所属组&nbsp;&nbsp;<a
	href="javascript:void(0)"
	onclick="javascript:handleSelect('gname_<%=i+1%>','gid_<%=i+1%>');">选择</a>&nbsp;<a
	href='javascript:void(0);'
	onclick="javascript:document.getElementById('part_<%=i+1%>').removeNode(true);">取消</a><br/><input type='text' readonly id='gname_<%=i+1%>'
	name='gname_<%=i+1%>' value='<%=g.idesc()%>'>
</div>
<div class="divn">职位<br/><select id='upj_<%=i+1%>' name='upj_<%=i+1%>'>
	<%
			if (list != null && !list.isEmpty()) {
			for (int j = 0; j < list.size(); j++) {
				XWordbook wb = (XWordbook) list.get(j);
	%>
	<option value="<%=wb.getID()%>"
		<%=(_job.equals(wb.getID()))?"selected":""%>><%=wb.getName()%></option>
	<%
				}
				}
	%>
</select></div>
<div class="divn">级别<br/><select id='upr_<%=i+1%>' name='upr_<%=i+1%>'>
	<%
			if (uratinglist != null && !uratinglist.isEmpty()) {
			for (int j = 0; j < uratinglist.size(); j++) {
				XWordbook wb = (XWordbook) uratinglist.get(j);
	%>
	<option value="<%=wb.getID()%>"
		<%=(_rating.equals(wb.getID()))?"selected":""%>><%=wb.getName()%></option>
	<%
				}
				}
	%>
</select></div></div>
<%
	}
	}
%></div></td>
  </tr>  
</table>
</form>
</div>
</div>
</body>
</html>
