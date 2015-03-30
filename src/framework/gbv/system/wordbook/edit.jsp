<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="jt.classic.system.wordbook.XWordbook" %>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String wbname = (String)request.getAttribute("wbname");
   
   Map map = (Map)request.getAttribute("map");
   
   Map mapDesc = (Map)request.getAttribute("mapDesc");
   
   String editonly = (String)request.getAttribute("editonly");
   
   List list = (List)request.getAttribute("list");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>字典类别维护</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link href="<%=context %>/system/wordbook/css/dragcontainer.css" rel=stylesheet>
<script>
   function checkit(){
   } 
   
   function handleSelect(thizz){
       window.location.href = context + "/system/wb.do?method=edit&wbname=" + thizz.value;
   }
   
   var c = <%=(list != null && !list.isEmpty() ? list.size() : 0)%>
   
   function handleAdd(){
       var o = document.getElementById("DragContainer1");
       
       var bindObject = document.createElement("div");
	   bindObject.id = "div_" + c;
	   bindObject.setAttribute("_id",c);
	   bindObject.className = "DragBox";
	   
	   var str = "<div class=\"divn\">类别标识名称</div><div class=\"divn\"><input type=\"text\" id=\"itemname_"+c+"\" name=\"itemname_"+c+"\" class=\"box3\" value=\"\"></div>";
	   str += " <div class=\"divn\">类别显示名称</div><div class=\"divn\"><input class=\"box3\" type=\"text\" id=\"itemvalue_"+c+"\" name=\"itemvalue_"+c+"\" value=\"\">";
	   str += " <a href=\"javascript:handleRemove('div_"+c+"');\">删除</a></div>";
	   
	   bindObject.innerHTML = str;
	   
       o.appendChild(bindObject);
       
       CreateDragContainer(o);
       
       c++;
   }
   
   function handleRemove(id){
       if(confirm("确定删除")){
          document.getElementById(id).removeNode(true);
       }
   }
   
   function handleSubmit(){
       var o = document.getElementById("DragContainer1");
       
       var parts = o.childNodes;
       
       if(parts.length == 0){
          alert("请定义类别");
       }else{
          var rnt = true;
          var countP = "";
          for(var i=0;i<parts.length;i++){
	          var _id = parts[i].getAttribute("_id");
	          if(isblank(document.getElementById("itemname_" + _id)) || isblank(document.getElementById("itemvalue_" + _id))){
	             alert("类别项设置无效,请定义完整的<类别标识名称>和<类别显示名称>");
	             rnt = false;
	             break;
	          }else{
	             countP += _id + ",";
	          }
          }
          
          if(rnt && confirm("确定提交")){
             createHidden("countP",countP.substring(0,countP.length - 1));
             document.form1.submit();
          }
       }
   }
</script>
<script src="<%=context%>/system/wordbook/js/dragcontainer.js"></script>
<body onload="init(<%=(list != null && !list.isEmpty() ? list.size() : 0)%>);">
<form id="form1" name="form1" method="post" action="<%=context%>/system/wb.do?method=update&wbname=<%=wbname %>">
<input name="editonly" type="hidden" value="<%=editonly %>"> 
<h1>类别维护</h1> 
<table width="600" class="tab4edit" align="center">
  <tr>
  <td width="40%" class="td1">类别&nbsp;<%=wbname %></td><td><select name="wbname1" <%=(editonly.equals("yes")? "disabled" : "") %> onChange="javascript:handleSelect(this);">
       <%
         Iterator iter = map.keySet().iterator();
         while(iter.hasNext()){
         String key = (String)iter.next();
       %>
       <option value="<%=key%>" <%=(wbname.equals(key)?"selected":"")%>><%=mapDesc.get(key)%></option>
       <%
         }
       %>
       </select></td><td width="20%" align="center">
       <a href="javascript:void(0)" onclick="javascript:handleAdd();">增 加</a>&nbsp;
       <a href="javascript:void(0)" onclick="javascript:handleSubmit();">保 存</a>
       </td>
  </tr>
  <tr>
    <td colspan="3">
      <DIV id="Demo4">
      <DIV class="DragContainer" id="DragContainer1" overClass="OverDragContainer">
      <%  
	     if(list != null && !list.isEmpty()){
	        for(int i=0;i<list.size();i++){
	            XWordbook wb = (XWordbook)list.get(i);
	   %>
	   <div class="DragBox" id="div_<%=i%>" _id="<%=i%>"><div class="divn">类别标识名称</div>
	   <div class="divn"><input type="text" id="itemname_<%=i%>" name="itemname_<%=i%>" class="box3" value="<%=wb.getID()%>"></div>
	   <div class="divn">类别显示名称</div>
	   <div class="divn"><input class="box3" type="text" id="itemvalue_<%=i%>" name="itemvalue_<%=i%>" value="<%=wb.getName()%>">
	   <a href="javascript:void(0)" onclick="javascript:handleRemove('div_<%=i%>');">删除</a></div>
	   </div>
	   <%
	        }
	     }
	   %>
	   </DIV>
	   </DIV>
    </td>
  </tr>     
</table>
</form>
</body>
</html>
