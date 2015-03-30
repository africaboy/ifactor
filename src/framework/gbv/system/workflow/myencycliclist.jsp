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
<%@ page import="jt.classic.system.workflow.WActivity"%>
<%@ page import="jt.classic.system.workflow.WObjectRegister"%>
<% 
    String context = jt.classic.system.context.ISystemContext.getContextPath();
	Object[] result = (Object[])request.getAttribute("result");	
	Label label = (Label)result[1];
	Controller controller = (Controller)result[2];	
	String pageNO = (String)result[3];
	List resultList = (List) result[0];
	
	Map objs = (Map)request.getAttribute("objs");	
	
	Map query = (Map)request.getAttribute("query");
	
	Map map = (Map)request.getAttribute("map");
	
	String key = StringTool.checkString(request.getAttribute("key"));
	String qname = StringTool.checkString(query.get("qname"));
	String qdate = StringTool.checkString(query.get("qdate"));
	
    WObject wobj = null;
	
	if(!key.equals("")){
		WObjectRegister register = WObjectRegister.getInstance();
		wobj = register.findWObject(key);
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>传阅列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/workflow/css/liststyle.css" />
<script language="javascript" src="<%=context%>/system/workflow/js/dateselect.js"></script>
<script language="javascript" src="<%=context%>/system/workflow/js/flowevent.js"></script>
<script language="javascript">
  function handleQuery(){
     document.form1.action = context + "/system/flow.do?method=myencycliclist&key=<%=key%>";
     document.form1.submit();
  }
</script>
<body>
<form name="form1" method="post" action="">
<input type="hidden" name="pageNO" value="<%=pageNO%>">

<div style="margin-top:15px;"><h1><%=(wobj != null ? wobj.iname() + "传阅公文列表" : "传阅公文列表") %></h1></div>
<br/>
<table class="tab4list" border="0" width="98%" align="center" cellspacing="0" cellpadding="0">
  <tr>
      <td class="td0" colspan="6" align="left">
标题 <input type="input" name="qname" value="<%=qname%>">
时间 <input type="input" style="width:100px" name="qdate" value="<%=qdate%>" readonly onclick="HS_setDate(this)">
<img src="<%=context %>/system/workflow/images/query.png" title="查询" style="cursor:hand;margin-bottom:-4px;" onclick="javascript:handleQuery();"/>查询
      
      </td>
  </tr>
  <tr> 
    <td class="td1" width="10" align="center">&nbsp;</td>
    <td class="td1" width="15%" align="center">&nbsp;公文类型</td>
    <td class="td1" width="35%" align="center">&nbsp;公文标题</td>
    <td class="td1" width="15%" align="center">&nbsp;接收时间</td>
    <td class="td1" width="20%" align="center">&nbsp;发送人/部门</td>
    <td class="td1" width="10%" align="center">&nbsp;查阅状态</td>
  </tr>
  <% 
    if(resultList!=null&&!resultList.isEmpty()){
       for(int i=0;i<resultList.size();i++){
	       Object[] obj = (Object[])resultList.get(i);
	       String number = (String)obj[0];
	       WActivity activity = (WActivity)obj[1];
	       String id = activity.id();
	       String name = activity.ititle();
	       String time = DateTrimmer.toYMDHM(DateTrimmer.getYMDHM_LBL(activity.istarttime()));
	       String state = "";
	       if(!map.containsKey(activity.id())){
	          state = "未阅";
	       } else {
	          state = "已阅";
	       }
	       
	       WActivity lastactivity = activity.ilast();
  %> 
  <tr> 
    <td align="center">
    &nbsp;<%=number%>
    </td>
    <td align="center">&nbsp;<%=activity.instance().iflow().iobject().iname() %></td>
    <td><div class="divn" style="width:300px;"><a href="<%=context %>/system/flow.do?method=viewencyclic&id=<%=id %>" target="_blank"><%=name%></a></div></td>
    <td align="center">&nbsp;<%=time%></td>
    <td align="center">&nbsp;<%=lastactivity.iexecutor().iuser().iname()%>&nbsp;<%=lastactivity.iexecutor().iunitname()%></td>
    <td align="center">&nbsp;<%=state%></td>
  </tr>
  <%
        }
     }
  %>
</table> 
<table width="98%" align="center" class="tab-noborder" border="0" cellspacing="0" cellpadding="0">
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