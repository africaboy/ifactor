<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.limp.mine.Label"%>
<%@ page import="org.limp.mine.Controller"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.workflow.WInner"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WActivity"%>
<%@ page import="jt.classic.system.workflow.WInstance"%>
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
<title>已办公文列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/workflow/css/liststyle.css" />
<script language="javascript" src="<%=context%>/system/workflow/js/dateselect.js"></script>
<script language="javascript" src="<%=context%>/system/workflow/js/flowevent.js"></script>
<script language="javascript">
  function handleQuery(){
      document.form1.action = context + "/system/flowlist.do?method=mydonelist&key=<%=key%>";
      document.form1.submit();
  }
</script>
<body>
<form name="form1" method="post" action=""><input type="hidden"
	name="pageNO" value="<%=pageNO%>">
<div style="margin:5px;"><h1><%=(wobj != null ? "&nbsp;《" + wobj.iname() + "》已审批列表" : "&nbsp;已审批列表") %></h1></div>
<br/>
<table class="tab4list" align="center" width="98%">
	<tr>
		<td colspan="6" class="td0" align="left">标题 <input type="input"
			style="width:200px;" name="qname" class="box2" value="<%=qname%>">
		时间 <input type="input" style="width:80px" name="qdate" class="box2"
			value="<%=qdate%>" readonly onclick="HS_setDate(this)"> 
		<img src="<%=context %>/system/workflow/images/query.png" title="查询" style="cursor:hand;margin-bottom:-4px;" onclick="javascript:handleQuery();"/>查询
			</td>
	</tr>
	<tr class="tr0">
		<td class="td1" width="10" align="center">&nbsp;</td>
		<td class="td1" width="25%" align="center">&nbsp;文件标题</td>
		<td class="td1" width="15%" align="center">&nbsp;发送时间</td>
		<td class="td1" width="20%" align="center">&nbsp;已发送环节及状态</td>
		<td class="td1" width="25%" align="center">&nbsp;办理人/部门</td>
		<td class="td1" width="10%" align="center">&nbsp;</td>
	</tr>
	<%
			if (resultList != null && !resultList.isEmpty()) {
				for (int i = 0; i < resultList.size(); i++) {
					Object[] obj = (Object[]) resultList.get(i);
					String number = (String) obj[0];
					WActivity act = (WActivity) obj[1];
	
					WInstance ins = act.instance();
	
					String id = act.id();
					String str = null;
					String state = null;
					String name = act.ititle();
					String time = DateTrimmer.toYMD(DateTrimmer.getYMD_LBL(act
					.iendtime()));
					String stepname = null;
					String stepstate = "";
	
					if (!ins.ininner()) {
						str = "";
						List childrenlist = ins.iactivitylist4mychildren(id);
			
						if(childrenlist != null && !childrenlist.isEmpty()){
						for (int j = 0; j < childrenlist.size(); j++) {
							WActivity temp = (WActivity) childrenlist.get(j);
							
							String userName = temp.iexecutor().iusername();
							String unitName = temp.iexecutor().iunitname();
			
							if (temp.istate() == 0) {
								stepstate += "<div class=divn>"
								+ temp.istep().iname() + "/未办理</div>";
							} else if (temp.istate() == 1) {
								stepstate += "<div class=divn>"
								+ temp.istep().iname() + "/办理中</div>";
							} else if (temp.istate() == 2) {
								stepstate += "<div class=divn>"
								+ temp.istep().iname() + "/办理完成</div>";
							} else if (temp.istate() == -2) {
								stepstate += "<div class=divn>"
									+ act.istep().iname() + "/取回</div>";
									
								userName = act.iexecutor().iusername();
								unitName = act.iexecutor().iunitname();	
							}
			
							String labelstr = "&nbsp;" + userName + "&nbsp;"
							+ unitName + "&nbsp;";
			
							stepname = temp.istep().iname();
							str += "<div class=divn>";
							str += labelstr;
			
							if (temp.canretake()
							&& act.istep().inner() > 0
							&& act.iprocess().equals(
									temp.ilast().iprocess())) {
								str += "&nbsp;<a href=\"javascript:handleRetake('"
								+ temp.id()
								+ "','"
								+ act.id()
								+ "');\">取回</a>";
							} else if (temp.canretake()
							&& act.istep().inner() == 0
							&& act.id().equals(temp.ilast().id())) {
								str += "&nbsp;<a href=\"javascript:handleRetake('"
								+ temp.id()
								+ "','"
								+ act.id()
								+ "');\">取回</a>";
							}
							str += "</div>";
							state = temp.istate() == 1 ? "办理中" : "未办理";
						}
						}else{
							stepstate = "<div class=divn>结束环节/已办结</div>";
							str = "<div class=divn>" + act.iexecutor().iusername() + "/" + act.iexecutor().iunitname() + "</div>";
						}
					} else {
						str = "";
						WActivity activity = ins.imaxactivity();
						//WInner winner = ins.inowinner();
						//stepname = winner.imemo();
						state = ins.innerisok(activity.istep().inner(), activity
								.iprocess()) ? "" : "未完成";
			
						List innerlist = ins.inner4in(activity.istep().inner(), activity
								.iprocess());
						if (innerlist != null && !innerlist.isEmpty()) {
							for (int j = 0; j < innerlist.size(); j++) {
								WActivity temp = (WActivity) innerlist.get(j);
								str += "<div class=divn>";
								str += temp.iexecutor().iusername() + "&nbsp;"
								+ temp.iexecutor().iunitname();
								
								
								if (temp.canretake()
								&& act.id().equals(temp.ilast().id())) {
									str += "&nbsp;<a href=\"javascript:handleRetake('"
											+ temp.id()
											+ "','"
											+ act.id()
											+ "');\">取回</a>";		
								}
								str += "</div>";
								
								if (temp.istate() == 0) {
									stepstate += "<div class=divn>"
									+ temp.istep().iname() + "/未办理</div>";
								} else if (temp.istate() == 1) {
									stepstate += "<div class=divn>"
									+ temp.istep().iname() + "/办理中</div>";
								} else if (temp.istate() == 2) {
									stepstate += "<div class=divn>"
									+ temp.istep().iname() + "/办理完成</div>";
								} else if (temp.istate() == -2) {
									stepstate += "<div class=divn>"
										+ act.istep().iname() + "/取回</div>";
								}
							}
						}
					}
		%>
		<tr onMouseOver="javascript:this.bgColor='#ffff99'"
			onmouseout=" javascript:this.bgColor='#ffffff'" bgColor="#ffffff">
			<td align="center">&nbsp;<%=number%></td>
			<td>
			<div class="divn" style="width:300px;"><a
				href="javascript:void(0)" title="<%=name%>"
				onclick="javascript:handleView('<%=id%>','<%=name%>');" title="查看"><%=name%></a></div>
			</td>
			<td align="center">&nbsp;<%=time%></td>
			<td align="center"><%=stepstate%></td>
			<td align="center"><%=str%></td>
			<td align="center"><a href="javascript:void(-1);"
				onclick="javascript:handleTrace('<%=act.instance().iflow().id()%>', '<%=act.instance().id()%>');">流程跟踪</a></td>
		</tr>
		<%
			}
		}
	%>
</table>
<table width="98%" class="tab-noborder" align="center" border="0"
	cellspacing="0" cellpadding="0">
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
