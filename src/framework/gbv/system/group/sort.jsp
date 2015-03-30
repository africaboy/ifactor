<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="jt.classic.system.group.IGroup"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String tp = (String)request.getAttribute("tp");
   
   IGroup group = (IGroup)request.getAttribute("group");
   
   List list = (List)request.getAttribute("list");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>排序设置</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link href="<%=context %>/system/group/css/dragcontainer.css"
	rel=stylesheet>
<script>
   var c = <%=(list != null && !list.isEmpty() ? list.size() : 0)%>

   function handleSort(){
       var o = document.getElementById("DragContainer1");
       
       var parts = o.childNodes;
       
       if(parts.length == 0){
          alert("");
       }else{
          var rnt = true;
          var countP = "";
          for(var i=0;i<parts.length;i++){
	          var _id = parts[i].getAttribute("_id");
	          <%if(tp.equals("group")){%>
	          createHidden("gid_" + i, _id);
	          createHidden("disporder_" + i, i);
	          <%}else if(tp.equals("user")){%>
	          createHidden("uid_" + i, _id);
	          createHidden("upo_" + i, i);
	          <%}%>
	          countP += i + ",";
          }
          
          createHidden("countP",countP.substring(0,countP.length - 1));
          document.form1.submit();
       }
   }
</script>
<script src="<%=context%>/system/group/js/dragcontainer.js"></script>
<body
	onload="init(<%=(list != null && !list.isEmpty() ? list.size() : 0)%>);">
<form id="form1" name="form1" method="post"
	action="<%=context%>/system/group.do?method=savesort&tp=<%=tp %>">
<input type="hidden" name="gid" value="<%=group.id() %>">
<h1>排列顺序设置&nbsp;<a href="javascript:void(-1);"
	onclick="javascript:handleSort();">提交更新</a></h1>
<table width="98%" class="tab-noborder" align="center">
	<tr>
		<td colspan="3">
		<DIV id="Demo4">
		<DIV class="DragContainer" id="DragContainer1"
			overClass="OverDragContainer">
		<%  
	     if(list != null && !list.isEmpty()){
	        for(int i=0;i<list.size();i++){
	        	String id = null;
	        	String name = null;
	        	if(tp.equals("group")){
		        	IGroup g = (IGroup)list.get(i);
		        	id = g.id();
		        	name = g.iname();
	        	}else if(tp.equals("user")){
	        		IUser u = (IUser)list.get(i);
	        		id = u.id();
	        		name = u.iname();
	        	}
	   %>
	   <div class="DragBox" style="width:300px;" _id="<%=id %>">&nbsp;<b><%=name %></b></div> 
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
