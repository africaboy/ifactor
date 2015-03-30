<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.limp.mine.Label"%>
<%@ page import="org.limp.mine.Controller"%>	
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.workflow.WInner"%>
<%@ page import="jt.classic.system.workflow.WNumber"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WActivity"%>
<%@ page import="jt.classic.system.workflow.WInstance"%>
<% 
    String context = jt.classic.system.context.ISystemContext.getContextPath();
	Object[] result = (Object[])request.getAttribute("result");	
	Label label = (Label)result[1];
	Controller controller = (Controller)result[2];	
	String pageNO = (String)result[3];
	List resultList = (List) result[0];
	
	String key = StringTool.checkString(request.getAttribute("key")); 	
	
	Map query = (Map)request.getAttribute("query");
	
	String queryvalue = "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>撤销列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/workflow/css/liststyle.css" />
<script language="javascript" src="<%=context%>/system/workflow/js/dateselect.js"></script>
<script language="javascript" src="<%=context%>/system/workflow/js/flowevent.js"></script>
<script language="javascript">
  function query(thizz){
     if(thizz.value == "qcreatedate"){
        document.form1.qvalue.readOnly = true;
        document.form1.qvalue.onclick = function(){HS_setDate(this);};
     }else{
        document.form1.qvalue.readOnly = false;
        document.form1.qvalue.onclick = function(){};
     }
     
     //document.form1.qvalue.value = "";
  }
  
  function handleQuery(){
    document.form1.action = context + "/system/flowlist.do?method=cancellist&key=<%=key%>";
    document.form1.submit();
  }
</script>
<body>
<form name="form1" method="post" action="">
<input type="hidden" name="pageNO" value="<%=pageNO%>">
<div style="margin-top:15px;"><h1>&nbsp;&nbsp;撤销公文列表</h1></div>
<br/>
<table class="tab-noborder" align="center" width="98%">
    <tr>
       <td>
		<table class="tab-noborder" align="left">
		    <tr>
		       <td width="100">主办单位</td>
		       <td width="200">
		           <input type="text"  id="qunit"  name="qunit"  style="width:200px;"  value="<%=StringTool.checkString(query.get("qunit"))%>">
		       </td>
		       <td width="100">标题</td>
		       <td width="200">
		           <input type="text"  id="qname" name="qname"  style="width:200px;"  value="<%=StringTool.checkString(query.get("qname"))%>">
		       </td>
		    </tr>
		    <tr>
		       <td>起草人</td>
		       <td>
		           <input type="text" id="qcreator"  name="qcreator"  style="width:200px;"  value="<%=StringTool.checkString(query.get("qcreator"))%>">
		       </td>
		       <td>起草时间</td>
		       <td>
		           <input type="text" id="qcreatedate"  name="qcreatedate"  style="width:200px;" readonly onclick="HS_setDate(this);" value="<%=StringTool.checkString(query.get("qcreatedate"))%>">
		           <img src="<%=context %>/system/workflow/images/query.png" title="查询" style="cursor:hand;margin-bottom:-4px;" onclick="javascript:handleQuery();"/>查询
		       </td>
		   </tr>
		</table>  
	</td>
	</tr>
</table>
<table class="tab4list" align="center" width="98%"> 
   <tr height="20">  
      <td width="150" class="td1"><div align="center">文号</div></td>
      <td width="200" class="td1"><div align="center">标题</div></td>
      <td width="140" class="td1"><div align="center">拟稿时间</div></td>
      <td width="90"  class="td1"><div align="center">拟稿人</div></td>
      <td width="90" class="td1""><div align="center">主办部门</div></td>
      <td width="130" class="td1"><div align="center">&nbsp;</div></td>
    </tr>
  <% 
    if(resultList!=null&&!resultList.isEmpty()){
       for(int i=0;i<resultList.size();i++){
	       Object[] obj = (Object[])resultList.get(i);
	       
	       WInstance ins = (WInstance)obj[1];
	       WActivity act = ins.imaxactivity();
	       
	       WNumber wnumber = act.instance().inumber();
	       String number = wnumber != null ? wnumber.ikeylabel() + " [" + wnumber.iprefix() + "] " + wnumber.ilabel(6) : "";//(String)obj[0];
	       String id = act.id();
	       String str = null;
	       String state = null;
	       String name = act.ititle();
	       String time = DateTrimmer.toYMD(DateTrimmer.getYMD_LBL(ins.istarttime()));
	       String stepname = null;
  %> 
  <tr> 
    <td align="center">
    &nbsp;<%=number%>
    </td>
    <td><div class="divn" style="width:300px;"><a href="javascript:void(0);" onclick="javascript:handleView('<%=id%>','<%=name%>');" title="<%=name%>"><%=name%></a></div></td>
    <td align="center">&nbsp;<%=time%></td>
    <td align="center">&nbsp;<%=ins.icreatorname()%></td>
    <td align="center">&nbsp;<%=ins.iunitname()%></td>
    <td align="center">
     <a href="javascript:void(0);" onclick="javascript:handleWake('<%=ins.id()%>', '<%=name%>');">重新启用</a>
     <a href="javascript:void(0);" onclick="javascript:handleDelete('<%=ins.id()%>', '<%=name%>');">删 除</a>
    </td>
  </tr>
  <%
        }
     }
  %>
</table> 
<table width="98%" class="tab-noborder" border="0" align="center" cellspacing="0" cellpadding="0">
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