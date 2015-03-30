<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.limp.mine.Label"%>
<%@ page import="org.limp.mine.Controller"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.workflow.WNumber"%>
<%@ page import="jt.classic.system.workflow.WInner"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WActivity"%>
<%@ page import="jt.classic.system.workflow.WInstance"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	Object[] result = (Object[]) request.getAttribute("result");
	Label label = (Label) result[1];
	Controller controller = (Controller) result[2];
	String pageNO = (String) result[3];
	List resultList = (List) result[0];

	Map objs = (Map) request.getAttribute("objs");

	Map query = (Map) request.getAttribute("query");

	String qname = (String) request.getAttribute("qname");
	String qdate = (String) request.getAttribute("qdate");
	
	String queryvalue = "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>办结列表</title>
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
  	}
  
	function handleQuery(){
	   document.form1.action = context + "/system/flowlist.do?method=endlist";
	   document.form1.submit();
	}
</script>
<body>
<form name="form1" method="post" action=""><input type="hidden"
	name="pageNO" value="<%=pageNO%>">
<div style="margin-top:15px;"><h1>&nbsp;&nbsp;办结文件列表</h1></div>
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
	<tr>
		<td class="td1" width="15%" align="center">&nbsp;文号</td>
		<td class="td1" width="35%" align="center">&nbsp;文件标题</td>
		<td class="td1" width="10%" align="center">&nbsp;创建时间</td>
		<td class="td1" width="10%" align="center">&nbsp;拟稿人</td>
		<td class="td1" width="10%" align="center">&nbsp;主办部门</td>
		<td class="td1" width="10%" align="center">&nbsp;办结时间</td>
		<td class="td1" width="10%" align="center">&nbsp;</td>
	</tr>
	<%
			if (resultList != null && !resultList.isEmpty()) {
			for (int i = 0; i < resultList.size(); i++) {
				Object[] obj = (Object[]) resultList.get(i);
				//String number = (String) obj[0];
				WInstance ins = (WInstance) obj[1];
				WActivity act = ins.imaxactivity();
				
				WNumber wnumber = act.instance().inumber();
			    String number = wnumber != null ? wnumber.ikeylabel() + " [" + wnumber.iprefix() + "] " + wnumber.ilabel(6) : "";//(String)obj[0];

				String id = act.id();
				String str ="";

				if(ins.istate() == 1){
					str = "未归档";
				}else if(ins.istate() == 2){
					str = "已归档";
				}
				
				String name = act.ititle();
	%>
	<tr>
		<td align="center">&nbsp;<%=number%></td>
		<td><div class="divn" style="width:400px;"><a
			href="<%=context %>/system/flow.do?method=lookover&id=<%=id %>" target="_blank" title="<%=name%>"><%=name%></a></div></td>
		<td align="center">&nbsp;<%=DateTrimmer.toYMD(DateTrimmer.getYMD_LBL(act
									.istarttime()))%></td>
		<td align="center">&nbsp;<%=ins.icreatorname()%></td>
		<td align="center">&nbsp;<%=ins.iunitname()%></td>
		<td align="center">&nbsp;<%=DateTrimmer.toYMD(DateTrimmer.getYMD_LBL(act
									.iendtime()))%></td>
		<td align="center">
		<%if(ins.istate() == 1) {%>
		<a href="javascript:void(0)" onclick="javascript:handlePigeonhole('<%=ins.id()%>', '<%=act.ititle()%>', '<%=ins.iflow().iobject().ikey() %>', '<%=ins.iflow().iobject().iname() %>', '<%=number %>');">文件归档</a></td>
	    <%}else{ %>已归档<%} %>
	</tr>
	<%
		}
		}
	%>
</table>
<table class="tab-noborder" align="center" width="98%">
	<tr>
		<td>&nbsp;<%=label.displayLabel()%></td>
		<td align="right"><%=label.startLabel()%> <%=label.previousLabel()%>
		<%=label.nextLabel()%> <%=label.endLabel()%> <%=controller.getController().toString()%>
		</td>
	</tr>
</table>
<%=controller.getControlScript(true)%></form>
</body>
</html>
