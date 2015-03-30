<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.wordbook.XWordbook" %>
<%@ page import="java.util.List" %>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   List list = (List)request.getAttribute("list");
   
   List utypelist = (List)request.getAttribute("utypelist");
   
   List uratinglist = (List)request.getAttribute("uratinglist");
   
   StringBuffer buffer = new StringBuffer();
   
   if(list != null && !list.isEmpty()){
	  for(int i=0;i<list.size();i++){
	      XWordbook wb = (XWordbook)list.get(i);
	      buffer.append("<option value='"+wb.getID()+"'>"+wb.getName()+"</option>");
      }
   }
   
   StringBuffer buffer4rating = new StringBuffer();
   if(uratinglist != null && !uratinglist.isEmpty()){
	  for(int i=0;i<uratinglist.size();i++){
	      XWordbook wb = (XWordbook)uratinglist.get(i);
	      buffer4rating.append("<option value='"+wb.getID()+"'>"+wb.getName()+"</option>");
      }
   }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>用户注册</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
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
     }else if(isblank(document.form1.pwd)){
        rnt = false;
        alert("请设置用户密码");
        document.form1.pwd.focus();
     }else if(trimme(document.form1.pwd) != trimme(document.form1.pwd1)){
        rnt = false;
        alert("密码确认错误");
     } 
     
     if(rnt){
        rnt = countPart();
     }
     
     return rnt;
   }
   
   var c = 1;
   
   function handlePart(){
       var bindObject = document.createElement("div");
	   bindObject.id = "part_" + c;
	   bindObject.style.cssText = "width:250px;margin:2px;float:left;border:1px solid #cccccc";

	   bindObject.setAttribute("_id",c);
	   var str = "<div class='divn'>所属组 <input type='text' class='box3' readonly id='gname_"+c+"' name='gname_"+c+"' value=''>";
	   str += "<input type='hidden' class='box3' readonly id='gid_"+c+"' name='gid_"+c+"' value=''>";
	   str += "<input type='hidden' id='uid_"+c+"' name='uid_"+c+"' value=''>";
	    str += "<input type='hidden' id='upt_"+c+"' name='upt_"+c+"' value='1'>";
	   str += "&nbsp;<a href=\"javascript:handleSelect('gname_"+c+"','gid_"+c+"');\">选择</a>";
	   str += "&nbsp;<a href='javascript:void(0);' onclick=\"javascript:document.getElementById('part_"+c+"').removeNode(true);\">取消</a></div>";
	   str += "<div class='divn'>职位 <select id='upj_"+c+"' name='upj_"+c+"'>";
	   str += "<%=buffer%>";
	   str += "</select></div>";
	   str += "<div class='divn'>级别 <select id='upr_"+c+"' name='upr_"+c+"'>";
	   str += "<%=buffer4rating%>";
	   str += "</select></div>";
	   //str += "<br>组内排序 <input type='text' class='box3' style='width:50px;' id='upo_"+c+"' name='upo_"+c+"' value='99'><br>";
	   
	   bindObject.innerHTML = str;
	   
       document.getElementById("part").appendChild(bindObject);
       c++;
   }
   
   function countPart(){
       var countP = "";
       if(!isblank(document.form1.gid)){
           countP = "0";
	       createHidden("gid_0",document.form1.gid.value);
	       createHidden("uid_0","");
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
<body>
<form id="form1" name="form1" method="post" action="<%=context%>/system/user.do?method=save">
<input type="hidden" name="uorlogid" value="">
<h1>用户注册</h1>  
<table class="tab4edit" width="98%">
  <tr class="tr1">
    <td class="td1" width="150">&nbsp;姓名</td>
    <td class="td2"><input name="uname" class="box3" type="text" id="uname" /></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;登录ID</td>
    <td class="td2"><input name="logid" class="box3" type="text" id="logid" /></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;密码</td>
    <td class="td2"><input name="pwd" class="box3" type="password" id="pwd" />&nbsp;<img src="<%=context%>/system/user/images/setpwd.gif" alt="设置缺省密码" pwd="000000" onclick="javascript:setDefaultPWD(this);"></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;密码确认</td>
    <td class="td2"><input name="pwd1" class="box3" type="password" id="pwd1" /></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;员工编号</td>
    <td class="td2"><input name="unumber" class="box3" type="text" id="unumber" /></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;性别</td>
    <td class="td2"><label>
      男
          <input name="sex" type="radio" value="男" />
     女  
     <input name="sex" type="radio" value="女" checked="checked" />
    </label></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;生日</td>
    <td class="td2"><input name="birthday1" class="box3" type="text" id="birthday1" readonly onclick="HS_setDate(this)"/></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;电话</td>
    <td class="td2"><input name="uphone" class="box3" type="text" id="uphone" /></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;邮箱</td>
    <td class="td2"><input name="uemail" class="box3" type="text" id="uemail" /></td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1">&nbsp;类别</td>
    <td class="td2"><label>
      <select name="utype">
        <%
        if(utypelist != null && !utypelist.isEmpty()){
		  for(int i=0;i<utypelist.size();i++){
		      XWordbook wb = (XWordbook)utypelist.get(i);
		      out.println("<option value='"+wb.getID()+"'>"+wb.getName()+"</option>");
	      }
        }
        %>
      </select>
    </label></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;级别</td>
    <td class="td2"><label>
      <select name="rating">
        <%
        if(uratinglist != null && !uratinglist.isEmpty()){
		  for(int i=0;i<uratinglist.size();i++){
		      XWordbook wb = (XWordbook)uratinglist.get(i);
		      out.println("<option value='"+wb.getID()+"'>"+wb.getName()+"</option>");
	      }
        }
        %>
      </select>
    </label></td>
  </tr>
  <tr class="tr1">
    <td class="td1">&nbsp;职位</td>
    <td class="td2"><select name="job" id="job">
      <%=buffer.toString()%>
        </select></td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1">&nbsp;有效</td>
    <td class="td2">有效
      <input name="flag" type="radio" value="1" checked="checked" />
      无效
      <input name="flag" type="radio" value="0" /></td>
  </tr>
  <t class="tr1"r>
    <td class="td1">&nbsp;所属组</td>
    <td class="td2"><input name="gname" class="box3" type="text" id="gname" readonly value=""/>
    <input name="gid" class="box3" type="hidden" id="gid" value=""/>
    <div class="divn"><a href="javascript:void(0)" onclick="javascript:handleSelect('gname','gid');" title="选择用户所属组">选择</a>
    <a href="javascript:void(0)" onclick="javascript:handleRemove();" title="取消用户所属组">取消</a></div>
    </td>
  </tr>
  <tr class="tr1" style="display:none;">
    <td class="td1">&nbsp;排列顺序</td>
    <td class="td2"><input name="disporder" class="box3" type="text" id="disporder" value="999"/></td>
  </tr>
  <tr class="tr1">
    <td class="td1" valign="top">&nbsp;<a href="javascript:void(0);" onclick="javascript:handlePart();" title="点击进行兼职设置">兼职设置</a></td>
    <td><div id="part"></div></td>
  </tr>  
  <tr class="tr1">
    <td colspan="2" align="center">
        <input type="button" class="button0" name="button0" value=" 保 存 " onclick="javascript:handleSubmit();"/>
        <input type="reset" class="button0" name="button1" value="重新填写" />
        <input type="button" class="button0" name="button0" value="用户列表" onclick="javascript:window.location.href='<%=context %>/system/user.do?method=list';"/>    
    </td>
  </tr>
</table>
</form>
</body>
</html>
