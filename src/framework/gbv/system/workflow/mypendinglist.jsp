<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.limp.mine.Label"%>
<%@ page import="org.limp.mine.Controller"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WObjectRegister"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	Object[] result = (Object[]) request.getAttribute("result");
	Label label = (Label) result[1];
	Controller controller = (Controller) result[2];
	String pageNO = (String) result[3];
	List resultList = (List) result[0];

	Map objmap = (Map) request.getAttribute("objmap");

	Map query = (Map) request.getAttribute("query");

	String key = StringTool.checkString(request.getAttribute("key"));
	
	WObject wobj = null;
	
	if(!key.equals("")){
		WObjectRegister register = WObjectRegister.getInstance();
		wobj = register.findWObject(key);
	}
	
	String qname = StringTool.checkString(query.get("qname"));
	String qdate = StringTool.checkString(query.get("qdate"));
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>待办公文列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/workflow/css/liststyle.css" />
<script language="javascript" src="<%=context%>/system/workflow/js/dateselect.js"></script>
<script language="javascript">
  function handleEdit(id){
     var url = context + "/system/flow.do?method=edit&id=" + id;
     window.location.href = url;
  }
  
  function handleInsert(){
     window.location.href = context + "/system/flow.do?method=neu";
  }
  
  function handleDelete(id){
     if(confirm("确定删除")){
        window.location.href = context + "/system/flow.do?method=delete&id="+id+"&pageNO=<%=pageNO%>";
     }
  }
  
  function handleQuery(){
     document.form1.action = context + "/system/flowlist.do?method=mypendinglist&key=<%=key%>";
     document.form1.submit();
  }
</script>
<body>
<form name="form1" method="post" action=""><input type="hidden"
	name="pageNO" value="<%=pageNO%>">
<div style="width:98%;margin:5px;"><h1><%=(wobj != null ? "《" + wobj.iname() + "》审批待办列表" : "审批待办列表") %></h1></div>
<br/>
<table class="tab4list" align="center" width="98%">
	<tr>
		<td colspan="8" class="td0" align="left">标题&nbsp;<input type="input" style="width:200px;" name="qname"
			class="box2" value="<%=qname%>"> 时间&nbsp;<input type="input"
			style="width:100px" name="qdate" class="box2" value="<%=qdate%>"
			readonly onclick="HS_setDate(this)">
		<img src="<%=context %>/system/workflow/images/query.png" title="查询" style="cursor:hand;margin-bottom:-4px;" onclick="javascript:handleQuery();"/>查询	
		</td>
	</tr>
	<tr>
		<td class="td1" width="10" align="center">&nbsp;</td>
		<td class="td1" width="10%" align="center">&nbsp;文件类别</td>
		<td class="td1" width="30%" align="center">&nbsp;文件标题</td>
		<td class="td1" width="10%" align="center">&nbsp;接收时间</td>
		<td class="td1" width="10%" align="center">&nbsp;办理时限</td>
		<td class="td1" width="10%" align="center">&nbsp;办理状态</td>
		<td class="td1" width="15%" align="center">&nbsp;发送人/部门</td>
		<td class="td1" width="10%" align="center">&nbsp;</td>
	</tr>
	<%
			if (resultList != null && !resultList.isEmpty()) {
			for (int i = 0; i < resultList.size(); i++) {
				Map obj = (Map) resultList.get(i);
				String number = (String) obj.get("PAGINATION_NUMBER");
				String id = (String) obj.get("A_ID");
				String name = (String) obj.get("A_TITLE");
				String time = DateTrimmer.toYMD(DateTrimmer
				.getYMD_LBL((String) obj.get("A_STIME")));
				String time1 = DateTrimmer.toYMD(DateTrimmer
						.getYMD_LBL((String) obj.get("A_LTIME")));
				int state = Integer.parseInt((String) obj.get("A_STATE"));
				String statelabel = "";
				if (-1 == state) {
			statelabel = "暂存";
				} else if (0 == state) {
			statelabel = "未办理";
				} else if (1 == state) {
			statelabel = "办理中";
				}
				WObject insobj = (WObject) objmap
				.get(obj.get("INS_OBJECT"));
				String objname = insobj.iname();
				String username = (String) obj.get("USER_NAME");
				String groupname = (String) obj.get("UNIT_NAME");
	%>
	<tr onMouseOver="javascript:this.bgColor='#ffff99'"
		onmouseout=" javascript:this.bgColor='#ffffff'" bgColor="#ffffff">
		<td align="center">&nbsp;<%=number%></td>
		<td>&nbsp;<%=objname%></td>
		<td><div class="divn" style="width:300px;"><a title="<%=name%>"
			href="<%=context%>/system/flow.do?method=edit&id=<%=id%>"><%=name%></a></div></td>
		<td align="center">&nbsp;<%=time%></td>
		<td align="center">&nbsp;<%=time1%></td>
		<td align="center">&nbsp;<%=statelabel%></td>
		<td>&nbsp;<%=username%>&nbsp;<%=groupname%></td>
		<td align="center"><a
			href="<%=context%>/system/flow.do?method=edit&id=<%=id%>">办 理</a> <%
 if (-1 == state) {
 %><a
			href="javascript:void(0)" onclick="javascript:handleDelete('<%=id%>');">删 除</a>
		<%
		}
		%>
		</td>
	</tr>
	<%
		}
		}
	%>
</table>
<table width="98%" align="center" class="tab-noborder" border="0" cellspacing="0"
	cellpadding="0">
	<tr>
		<td><%=label.displayLabel()%></td>
		<td align="right"><%=label.startLabel()%> <%=label.previousLabel()%>
		<%=label.nextLabel()%> <%=label.endLabel()%> <%=controller.getController().toString()%>
		</td>
	</tr>
</table>
<%=controller.getControlScript(true)%></form>
</body>
</html>
