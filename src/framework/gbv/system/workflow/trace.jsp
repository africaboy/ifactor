<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="jt.classic.system.workflow.WActivity"%>
<%@ page import="jt.classic.system.workflow.WInstance"%>
<% 
    String context = jt.classic.system.context.ISystemContext.getContextPath();
    
    WActivity activity = (WActivity)request.getAttribute("activity");
    
    WInstance instance = activity.instance();
    
    List list = instance.iactivitylist();
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>流程列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/workflow/css/liststyle.css" />
<script>
   function handleView(id,name,step){
      var url = context + "/system/flow.do?method=lookover&id=" + id;
      try{
         top.xwin(this,url,false,"("+step+")-" + name,900,550);
      }catch(error){
         window.open(url,"");
      }
   }
</script>
<body>
<form name="form1" method="post" action="">
<div style="padding:4px;">&nbsp;流程类别:<%=instance.iflow().iobject().iname()%>,
	 创建时间:<%=DateTrimmer.toYMD(DateTrimmer.getYMD_LBL(instance.istarttime()))%>,
	 创建人:<%=instance.icreatorname()%>&nbsp;<%=instance.iunitname()%></div>
<table class="tab4list" border="1" width="98%" align="center" cellspacing="0" cellpadding="0">
  <tr class="tr0">
    <td class="td1" width="15">&nbsp;</td>
    <td class="td1" width="25%">&nbsp;环节</td>
    <td class="td1" width="12%">&nbsp;状态</td>
    <td class="td1" width="12%">&nbsp;接收时间</td>
    <td class="td1" width="12%">&nbsp;完成时间</td>
    <td class="td1" width="20%">&nbsp;办理人/部门</td>
    <td class="td1" width="12%">&nbsp;IP地址</td>
  </tr>  
  <%
    if(list != null && !list.isEmpty()){
       for(int i=0;i<list.size();i++){
           WActivity act = (WActivity)list.get(i);
           String state = null;
           
           boolean hasinner = false;
           
           if(act.istep().inner()==0 && !act.iprocess().equals("0") && act.instance().ininner()){
               hasinner = true;
           }
           
           String bgcolor = "#ffffff";

           if(act.istate() == 0){
              state = "未办理";
              if(act.istep().itype() == 2){
                 state = "未阅";
              }
              
              bgcolor = "#ffff99";
           }else if(act.istate() == 1){
              state = "办理中";
              if(act.istep().itype() == 2){
                 state = "已阅";
              }
              
              bgcolor = "#ffff99";
           }else if(act.istate() == 2){
              state = "完成";
              if(act.istep().itype() == 2){
                 state = "已阅";
              }
              
              bgcolor = "#CCFF99";
           }else if(act.istate() == -2){
              state = "取回";
              bgcolor = "#FFFFD9"; 
           }else if(act.istate() == -3){
        	   bgcolor = "#FFFFD9"; 
              state = "退回";
           }else if(act.istate() == -4){
        	   bgcolor = "#FF6633"; 
               state = "撤销";
            }else if(act.istate() == -1){
              state = "暂存";
              bgcolor = "#FFFFD9"; 
           }
  %>
  <tr bgcolor="<%=bgcolor%>">
	  <td class="td0" align="center">&nbsp;<%=(i+1)%>
	  <%if(act.id().equals(activity.id())){%>
	  <img src="<%=context%>/system/workflow/images/arrow.gif">
	  <%}%>
	  <%if(hasinner){%>
	  <img src="<%=context%>/system/workflow/images/quote.gif">
	  <%}%>
	  </td>
	  <td class="td0">&nbsp;<a href="javascript:void(0)" title="文件查阅" onclick="javascript:handleView('<%=act.id()%>','<%=act.ititle()%>','<%=act.istep().iname()%>');"><%=act.istep().iname()%></a></td>
	  <td class="td0">&nbsp;<%=state%></td>
	  <td class="td0">&nbsp;<%=DateTrimmer.toYMD(DateTrimmer.getYMD_LBL(act.istarttime()))%></td>
	  <td class="td0">&nbsp;<%=DateTrimmer.toYMD(DateTrimmer.getYMD_LBL(act.iendtime()))%></td>
	  <td class="td0">&nbsp;<%=act.iexecutor().iusername()%>&nbsp;<%=act.iexecutor().iunitname()%></td>
	  <td class="td0">&nbsp;<%=act.iexecutor().ip()%></td>
  </tr>
  <%
         //}
       }
    }
  %>
</table>
</form>
</body>
</html>