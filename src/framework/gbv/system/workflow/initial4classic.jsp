<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WFlow"%>
<%@ page import="jt.classic.system.workflow.WStep"%>
<%@ page import="jt.classic.system.workflow.WActivity"%>
<%@ page import="jt.classic.system.workflow.WInstance"%>
<%@ page import="jt.classic.system.workflow.WTrend"%>
<%@ page import="jt.classic.system.workflow.WHandle"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.RandomUtil"%>
<%@ page import="org.limp.mine.annex.AnnexInfo"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	IUser user = ISystemContext.getSessionUser(request);

	WActivity activity = (WActivity) request.getAttribute("activity");
	WInstance instance = activity != null ? activity.instance() : null;
	WActivity lastActivity = activity != null ? activity.ilast() : null;
	WFlow flow = (WFlow) request.getAttribute("flow");
	WStep step = (WStep) request.getAttribute("step");
	WObject obj = flow.iobject();
	String action = (String) request.getAttribute("action");
	String readonly = (String) request.getAttribute("readonly");
	String flowtype = flow.itype();
	List printDocTempList = (List) request
			.getAttribute("printDocTempList");
	Map doctemp = (Map) request.getAttribute("doctemp");
	List numbers = (List) request.getAttribute("numbers");
	Map defaultnumber = (Map) request.getAttribute("defaultnumber");
	int defaultMultiItemSize = 4;
	String view4diy = obj.iview4diy() ? "yes" : "no";

	if (flow != null && step != null) {

		List backList = activity == null ? null : activity.ilist4back();

		List trends = step.itrend();

		/*直接结束流程*/
		String directFinish = "no";
		String directFinishName = "办理结束";
		String directStepID = "";

		/*下一环节只有一个并且是结束环节*/
		if (trends != null && trends.size() == 1) {
			WTrend trend = (WTrend) trends.get(0);
			WStep nextstep = flow.istep(trend.itrendid());

			if (nextstep.itype() == -1) {
		directFinish = "yes";
		if (!StringTool.checkString(trend.itrendname()).equals(
				"")) {
			directFinishName = trend.itrendname();
			directStepID = nextstep.id();
		}
			}
		}

		String defaultDocTemp = "/system/workflow/doc/temp.doc";
		String defaultDocHeaderTemp = "";
		String defaulDocFooterTemp = "";
		String defaulDocPrintTemp = "";

		if (doctemp != null && !doctemp.isEmpty()) {
			Iterator keys = doctemp.keySet().iterator();

			while (keys.hasNext()) {
		String key = (String) keys.next();

		Map info = (Map) doctemp.get(key);

		String temptp = StringTool.checkString(info
				.get("TEMP_TYPE"));
		String tempUsed = StringTool.checkString(info
				.get("TEMP_USED"));

		if (temptp.equals("0")) {
			defaultDocTemp = "/system/annex.do?method=load&id="
			+ (String) info.get("ANNEXID");
		} else if (temptp.equals("1")) {
			defaultDocHeaderTemp = "/system/annex.do?method=load&id="
			+ (String) info.get("ANNEXID");
		} else if (temptp.equals("2")) {
			defaulDocFooterTemp = "/system/annex.do?method=load&id="
			+ (String) info.get("ANNEXID");
		} else if (temptp.equals("3")) {
			defaulDocPrintTemp = "/system/annex.do?method=load&id="
			+ (String) info.get("ANNEXID");
		}
			}
		}
%>
<link rel="stylesheet" type="text/css"
	href="<%=context%>/system/workflow/css/init4classic.css" />
<script>
        /*操作有效性*/
        var ope = false;
        /*操作类型*/
        var flowAction = "<%=action%>";
        /*新建活动记录*/
        var newA = <%=activity==null?"true":"false"%>;
        /*实例唯一序列号*/
        var sequenceA = "<%=activity==null?RandomUtil.getRandomString(20):activity.instance().isequence()%>";
        /*实例ID*/
        var sequenceid = "<%=activity==null?"":activity.instance().id()%>";
        /*是否为开始环节*/
        <%if(step.itype() == 0){%>
        var startS = true;
        <%}else{%>
        var startS = <%=(step.itype() == 0 || step.inner() != 0 || (activity!=null&&activity.ilast()!=activity)?"false":"true")%>;
        <%}%>
        /*是否有退回环节*/
        var backA = <%=(backList!=null&&!backList.isEmpty()?"true":"false")%>;
        /*当前活动记录ID*/
        var aid = "<%=activity!=null?activity.id():"0"%>";
        /*上一活动记录ID*/
        var lastAid = "<%=(lastActivity!=null?lastActivity.id():"0")%>";
        /*所属流程ID*/
        var flowid = "<%=flow.id()%>";
        /*实例ID*/
        var insid = "<%=activity!=null?activity.instance().id():""%>";
        /*当前环节ID*/
        var stepid = "<%=step.id()%>";
        /*当前活动记录标题*/
        var atitle = "<%=activity!=null?activity.ititle():""%>";
        /*对象名称*/
        var objname = "<%=obj.iname()%>";
        /*是否只读(预览)*/
        var readonly = <%=readonly%>;
        /*可直接结束流程*/
        var directFinish = "<%=directFinish%>";
        /*流程办结按钮显示标签*/
        var directFinishName = "<%=directFinishName%>";
        /*直接办理名称*/
        var directStepID = "<%=directStepID%>";
        /*流转方式*/
        var flowtype = "<%=flowtype%>";
        /*对象key*/
        var objkey = "<%=obj.ikey()%>";
        /*自定义视图*/
        var view4diy = "<%=view4diy%>";
        /*当前日期(含中文)*/
        var tdate = "<%=DateTrimmer.getYMD_CHS()%>";
        /*当前日期(不含中文)*/
        var tdate1 = "<%=DateTrimmer.getYMD_LBL(DateTrimmer.getYMD())%>";
        /*当前年*/
        var tyear = "<%=DateTrimmer.getYear(0)%>";
        /*当前操作用户ID*/
        var userid = "<%=user.id()%>";
        /*当前操作用户名称*/
        var username = "<%=user.iname()%>";
        /*当前操作用户电话*/
        var telephone = "<%=user.iphone()%>";
        /*当前操作用户部门名称*/
        var groupname = "<%=(user.igroup()!=null?user.igroup().iname():"")%>";
        /*当前操作用户部门全称*/
        var groupflumelabel = "<%=(user.igroup()!=null?user.igroup().iflumelabel(""):"")%>";
        /*当前操作用户部门简称*/
        var groupshortlabel = groupflumelabel.indexOf("/") > -1 ? groupflumelabel.substring(groupflumelabel.indexOf("/") + 1):"";
        /*当前操作用户部门全ID*/
        var groupflumeids = "<%=(user.igroup()!=null?user.igroup().iflumeid(""):"")%>";
        /*操作方式(默认为发送)*/
        var nowoper = "send";
        /*默认正文模板*/
        var defaultDocTemp = "<%=defaultDocTemp%>";
        /*默认套红Header*/
        var defaultDocHeaderTemp = "<%=defaultDocHeaderTemp%>";
        /*默认套红Footer*/
        var defaulDocFooterTemp = "<%=defaulDocFooterTemp%>";
        /*默认打印模板*/
        var defaulDocPrintTemp = "<%=defaulDocPrintTemp%>";
        /*正文ID*/
        var docid = "<%=activity!=null&&activity.instance().idoc()!=null?activity.instance().idoc().getID():"0"%>";
        /*正文操作权限*/
        var doctype = 0;
        /*正文模板数量*/
        var doctempsize = <%=((doctemp != null && !doctemp.isEmpty()) ? doctemp.size() : 0)%>;
        /*实例编号*/
        var numberA = "<%=activity!=null&&activity.instance().inumber()!=null?activity.instance().inumber().ivalue():"0"%>";
        /*退回说明*/
        var backmemo = "<%=activity!=null?activity.ibackmemo():""%>";
        /*弹出窗口*/
        var newwindow;
        /*allannex个数*/
        var allannex = 0;
        /*默认文号类型*/
        var defaultnumber = "<%=(defaultnumber==null?"":defaultnumber.get("PKID"))%>";
        /*默认文号名称*/
        var defaultnumbername = "<%=(defaultnumber==null?"":defaultnumber.get("NUMBER_NAME"))%>";
        /*是否可传阅*/
        var cc = <%=((step != null && step.icc() == 1) ? "true" : "false")%>;
        /*是否可套红*/
        var red = <%=((step != null && StringTool.checkString(step.getResource().get("S_RED")).equals("1")) ? "true" : "false")%>;
        /*是否可盖章*/
        var stamp = <%=((step != null && StringTool.checkString(step.getResource().get("S_STAMP")).equals("1")) ? "true" : "false")%>; 
        /*是否可打印*/
        var cprint = <%=((step != null && StringTool.checkString(step.getResource().get("S_PRINT")).equals("1")) ? "true" : "false")%>; 
         /*是否可特送*/
        var sd = <%=((step != null && StringTool.checkString(step.getResource().get("S_SD")).equals("1")) ? "true" : "false")%>;
        /*打印模板*/
        var prints = new Array();
        /*文号种类*/
        var numbers = new Array();
        /*多数据操作表*/
        var multiTables = new Array();
        /*初始化多数据项数目*/
        var defaultMultiItemSize = <%=defaultMultiItemSize%>;
        /*文号*/
        <%
          if(numbers != null && !numbers.isEmpty()){
             for(int i=0;i<numbers.size();i++){
                 Map num = (Map)numbers.get(i);
        %>
        numbers.push(new Array('<%=num.get("PKID")%>','<%=num.get("NUMBER_NAME")%>'));
        <%
             }
          }
        %>
        /*打印模板列表*/
        <%
          if(printDocTempList != null && !printDocTempList.isEmpty()){
             for(int i=0;i<printDocTempList.size();i++){
                 Map map = (Map)printDocTempList.get(i);
                 String printDocTemp = "/system/annex.do?method=load&id=" + (String)map.get("ANNEXID");
        %>
        var item<%=i%> = new Ext.menu.Item({
				text : '<span style="font-size: 14px"><%=map.get("TEMP_NAME")%></span>',
				iconCls : 'printitem',
				id : 'item<%=i%>',
				handler : function() {
						handlePrint('<%=printDocTemp%>');
					}
			});
        prints.push(item<%=i%>);
        <%
             }
          }
        %>
        
        /*初始化流程相关对象信息*/
        function initobjct(){
          /*流转活动记录ID*/
          createHidden("aid",aid);
          /*实例唯一序列号*/
          createHidden("insequence",sequenceA);
          /*流转活动标题*/
          createHidden("atitle",atitle);
          /*实例类型*/
          createHidden("instype",flowtype);
          /*流转发起岗位*/
          createHidden("insobject",objkey);
          /*流转类别ID*/
          createHidden("gid","<%=flow.id()%>");
          /*当前步骤节点ID*/
          createHidden("sid","<%=step.id()%>");
          /*当前访问IP*/
          createHidden("eip","<%=request.getRemoteAddr()%>");
          /*当前访问hostname*/
          createHidden("ehostname","");
          /*当前访问mac地址*/
          createHidden("emac","");
          /*操作类型*/
          var handleType = -1;
          createHidden("flowAction", "<%=action%>");
          
          inittitle();
<%      
         /*流程对象关联表列表*/
         List list = obj.itables();
         for(int i=0;i<list.size();i++){
             /*流程对象关联表*/
             Table table = (Table)list.get(i);
             List contents = activity!=null?activity.icontent(table):null;
             if(obj.handleTable(table) == 0){//单处理表
                 Map content = contents!=null&&!contents.isEmpty()?(Map)contents.get(0):null;
                 initElement(content,"",table,step,out,0);
             }else if(obj.handleTable(table) == 1){//多处理表
                 /*表主键字段*/
                 Column col = table.column(table.getPrimaryKey()[0]);
                 /*多数据操作计数器*/
                 String counterName = obj.countName(table);
                 /*多数据计数*/
                 int countItems = contents==null?0:contents.size();
                 /*记录多数据表操作必要信息*/
                 out.println("createHidden(\""+counterName+"\",\""+countItems+"\");");
                 /*多数据项(增加,删除)操作设置*/
                 WHandle addhandle = step.iMAddhandle(table.getName());
                 int addtype = addhandle==null?0:addhandle.itype();
                 WHandle delhandle = step.iMDelhandle(table.getName());
                 int deltype = delhandle==null?0:delhandle.itype();
                 out.println("multiTables.push(\""+table.getName()+","+counterName+","+col.getFormName()+","+addtype+","+deltype+"\");");
                 
                 initElementHandleType4MultiItem(table,step,out,0); 
             }
         }
         
         for(int i=0;i<list.size();i++){
             /*流程对象关联表*/
             Table table = (Table)list.get(i);
             if(obj.handleTable(table) == 1){//多处理表
	             List contents = activity!=null?activity.icontent(table):null;
	             if(contents!=null&&!contents.isEmpty()){
	             	out.println("defaultMultiItemSize = " + contents.size() + ";");
	             }else{
		             contents = new ArrayList();
		             for(int j=0;j<defaultMultiItemSize;j++){
		                 contents.add(null);
		             }
                 }
  
	             out.println("if(!document.getElementById('"+table.getName()+"')){alert(\"缺少多数据显示区域\");}else{");
	             out.println("parseMultiItem('"+table.getName()+"',0);");
	             out.println("addMultiButton('"+table.getName()+"');");
	             out.println("initMultiTable('"+table.getName()+"',defaultMultiItemSize);");
	             out.println("}");
	             
	             for(int j=0;j<contents.size();j++){
	                 Map content = (Map)contents.get(j);
	                 initElement(content,"_"+String.valueOf(j),table,step,out,0);
	             }
             }
         }
          
          
%>
        }
        /*initobjct 定义结束*/
        
        /*初始化流程相关对象信息(预览全部内容)*/
        function initobjct4view(){
          createHidden("aid",aid);
          createHidden("atitle",atitle);
          createHidden("gid","<%=flow.id()%>");
          createHidden("sid","<%=step.id()%>");
          createHidden("eip","<%=request.getRemoteAddr()%>");
          createHidden("ehostname","");
          createHidden("emac","");
          var handleType = 1;
          createHidden("flowAction", "<%=action%>");
          
          inittitle();
<%      
         /*流程对象关联表列表*/
         list = obj.itables();
         for(int i=0;i<list.size();i++){
             /*流程对象关联表*/
             Table table = (Table)list.get(i);
             List contents = activity!=null?activity.icontent(table):null;
             if(obj.handleTable(table) == 0){//单处理表
                 Map content = contents!=null&&!contents.isEmpty()?(Map)contents.get(0):null;
                 initElement(content,"",table,step,out,1);
             }else if(obj.handleTable(table) == 1){//多处理表
                 /*表主键字段*/
                 Column col = table.column(table.getPrimaryKey()[0]);
                 /*多数据操作计数器*/
                 String counterName = obj.countName(table);
                 /*多数据计数*/
                 int countItems = contents==null?0:contents.size();
                 /*记录多数据表操作必要信息*/
                 out.println("createHidden(\""+counterName+"\",\""+countItems+"\");");
                 out.println("multiTables.push(\""+table.getName()+","+counterName+","+col.getFormName()+"\",0,0);");
                 
                 initElementHandleType4MultiItem(table,step,out,1); 
             }  
         }
         
         for(int i=0;i<list.size();i++){
        	 Table table = (Table)list.get(i);
             List contents = activity!=null?activity.icontent(table):null;
             
             if(obj.handleTable(table) == 1){//多处理表
                 if(contents!=null&&!contents.isEmpty()){
             	      out.println("defaultMultiItemSize = " + contents.size() + ";");
	             }else{
		             contents = new ArrayList();
		             for(int j=0;j<defaultMultiItemSize;j++){
		                 contents.add(null);
		             }
	             }
             
             
             out.println("if(!document.getElementById('"+table.getName()+"')){alert(\"缺少多数据显示区域\");}else{");
             out.println("parseMultiItem('"+table.getName()+"',0);");
             out.println("addMultiButton('"+table.getName()+"');");
             out.println("initMultiTable('"+table.getName()+"',defaultMultiItemSize);");
             out.println("}");
             
             for(int j=0;j<contents.size();j++){
                 Map content = (Map)contents.get(j);
                 initElement(content,"_"+String.valueOf(j),table,step,out,1);
             }
             }
          }          
%>
        }
        /*initobjct4view 定义结束*/
        
<%
        out.println("var trendMap = new HashMap();");
        
        if(!trends.isEmpty()){
	        for(int i=0;i<trends.size();i++){
	            WTrend trend = (WTrend)trends.get(i);
	            WStep nextstep = flow.istep(trend.itrendid());
	            if(!nextstep.itrans()){
	                out.println("trendMap.put('"+nextstep.id()+"', '"+nextstep.inner()+"');");
	            }else{
	            	List trendList = nextstep.itrend();
	            	
	            	for(int j=0;j<trendList.size();j++){
	    	            WTrend tempTrend = (WTrend)trendList.get(j);
	    	            WStep tempStep = flow.istep(tempTrend.itrendid());
	    	            
	    	            if(!tempStep.itrans()){
	    	                out.println("trendMap.put('"+tempStep.id()+"', '"+tempStep.inner()+"');");
	    	            }
	            	}
	            }
	        }
        }
        
        /*初始化导入设置*/
        out.println("function initimpset(){");
        out.println("var trenddiv = document.createElement(\"div\");");
        out.println("trenddiv.id = \"impset\";");
        out.println("trenddiv.style.display = \"none\";");
        out.println("trenddiv.style.padding = \"10px 10px 10px 10px\";");
        out.println("var trendstr = \"\";");
        out.println("trenddiv.innerHTML = trendstr;");
        //out.println("document.getElementById('handlearea').appendChild(trenddiv); ");
        out.println("}");
        
        out.println("function initbacklist(){");
        //out.println("var backdiv = document.createElement(\"div\");");
        //out.println("backdiv.id = \"backs\";");
        //out.println("backdiv.style.display = \"none\";");
        //out.println("backdiv.style.padding = \"10px 10px 10px 10px\";");
        out.println("var backstr = \"\";");
        if(backList==null || backList.isEmpty()){
            out.println("backstr += \"<div class='divn'>没有环节可退回</div>\";");
        }else{
        out.println("backstr += \"<div class='divn'>选择退回环节</div>\";");
        String bakid = null;

        String chekced = null;
        for(int i=0;i<backList.size();i++){
            WActivity backact = (WActivity)backList.get(i);
            if(i==backList.size()-1){
               chekced = "checked";
               bakid = backact.id();
            }
            out.println("backstr += \"<div class='divn'>\";");
            out.println("backstr += \"<label for='rad"+i+"'><input type='radio' title='点击退回' "+chekced+" style='vertical-align:middle' id='radbak"+i+"' name='radbak' value='"+backact.id()+"' onclick=\\\"javascript:document.getElementById('bakbtn').setAttribute('bakid',this.value)\\\";>"+backact.istep().iname()+"</label>\";");
            out.println("backstr += \"("+backact.iexecutor().iunitname()+":"+backact.iexecutor().iusername()+")</div>\";");
            //out.println("backstr += \"<div id=_"+i+"></div>\";");  
        }
        out.println("backstr += \"<div class='divn'>退回说明</div>\";");
        out.println("backstr += \"<div class='divn'><textarea class='box3' id='abackmemo' name='abackmemo' style='width:75%;height:40px;'></textarea>\";");
        out.println("backstr += \"<input type='button' class='button3' id='bakbtn' bakid='"+bakid+"' value=' 确 定 ' onclick=\\\"javascript:backme(this.getAttribute('bakid'),'"+activity.id()+"','"+activity.ititle()+"',document.getElementById('abackmemo').value);\\\"></div>\";");
        }
        //out.println("backdiv.innerHTML = backstr;");
        //out.println("document.getElementById('handlearea').appendChild(backdiv); ");
        out.println("return backstr;");
        out.println("}");
%>        
</script>
<script src="<%=context%>/system/workflow/js/menu.js"></script>
<script src="<%=context%>/system/workflow/js/init4classic.js"></script>
<script src="<%=context%>/system/workflow/js/init4diy.js"></script>
<script src="<%=context%>/system/workflow/js/initMultiElement.js"></script>
<script src="<%=context%>/system/workflow/js/print.js"></script>
<script src="<%=context%>/system/workflow/js/yjwin.js"></script>
<script src="<%=context%>/system/workflow/js/print.js"></script>
<script src="<%=context%>/system/workflow/js/dateselect.js"></script>

<link rel="stylesheet" type="text/css"
	href="<%=context %>/system/group/css/groupmanage.css" />
<script src="<%=context %>/system/group/js/groupselect.js"></script>
<%
}
%>

<%!/*初始化表单元素 viewmode[0(办理模式),1浏览模式(只显示有权限查看的内容),2查看模式(全部内容)]*/
	public void initElement(Map content, String index, Table table, WStep step,
			javax.servlet.jsp.JspWriter out, int viewmode) throws Exception {
		/*表字段列表*/
		List columns = table.columns();
		for (int j = 0; j < columns.size(); j++) {
			/*表字段*/
			Column column = (Column) columns.get(j);
			String value = "";
			/*当前流转环节操作字段类型*/
			WHandle handle = step.ihandle(table.getName(), column.getName());
			int handleType = -1;

			/*查看模式*/
			if (viewmode == 2) {
				handleType = 0;
			}
			/*浏览模式*/
			else if (viewmode == 1) {
				if (handle != null
						&& (handle.itype() == 1 || handle.itype() == 0)) {
					handleType = 0;
				}
			} else {
				handleType = (handle != null ? handle.itype() : -1);
			}

			if (!column.isPremaryKey()) {
				out.println("createHidden('" + column.getFormName()
						+ "_handleType" + index + "'," + (handleType) + ");");
			}

			out.println("createHidden('" + column.getFormName() + "_Table"
					+ index + "', '" + (table.getName()) + "');");

			if (!column.isAnnex() && content != null
					&& content.containsKey(column.getName())) {
				out.println("handleType = " + (handleType) + ";");
				if (handle != null && handle.itype() > -1
						&& !StringTool.BLOB.equals(column.getType().toString())) {
					value = (String) content.get(column.getName());
				}
				if (column.isPremaryKey()) {
					value = (String) content.get(column.getName());
					out.println("createHidden('" + column.getFormName() + index
							+ "','" + value + "');");
				} else {
					out.println("initElement(D('" + column.getFormName()
							+ index + "'),'" + value + "',handleType);");
				}
			} else if (!column.isAnnex()
					&& (content == null || content
							.containsKey(column.getName()))) {
				out.println("handleType = " + (handleType) + ";");
				if (column.isPremaryKey()) {
					out.println("createHidden('" + column.getFormName() + index
							+ "','" + value + "');");
				} else {
					out.println("initElement(D('" + column.getFormName()
							+ index + "'),'" + value + "',handleType);");
				}
			} else if (column.isAnnex()
					&& (!"ALLFREE".equals(column.getFormName().toUpperCase()) && !"ALLRESTRICT"
							.equals(column.getFormName().toUpperCase()))) {
				out.println("handleType = " + (handleType) + ";");
				if (handle != null && handle.itype() > -1 && content != null
						&& content.containsKey(column.getName())) {
					AnnexInfo annex = (AnnexInfo) content.get(column.getName());
					out.println("initElementOfFile(D('" + column.getFormName()
							+ index + "'),'" + annex.getID() + "','"
							+ annex.getFullName() + "',handleType);");
					out.println("createHidden('" + column.getFormName()
							+ "_showlabel" + index + "', '" + annex.getFullName() + "');");
				} else {
					out.println("initElementOfFile(D('" + column.getFormName()
							+ index + "'),'','',handleType);");
				}
			} else if (column.isAnnex()
					&& ("ALLFREE".equals(column.getFormName().toUpperCase()) || "ALLRESTRICT"
							.equals(column.getFormName().toUpperCase()))) {
				out.println("handleType = " + (handleType) + ";");
				if (handle != null && handle.itype() > -1 && content != null
						&& content.containsKey(column.getName())) {
					AnnexInfo[] annexs = (AnnexInfo[]) content.get(column
							.getName());
					out.println("allannex = " + annexs.length + ";");
					
					String showlabel = "";
					
					for (int k = 0; k < annexs.length; k++) {
						AnnexInfo annex = annexs[k];
						
						showlabel += annex.getFullName() + "*";
						
						out.println("initElementOfAllFile(D('"
								+ column.getFormName() + index + "'),'"
								+ annex.getID() + "','" + annex.getFullName()
								+ "',handleType);");
					}
					
					if(showlabel.indexOf("*") > -1){
						showlabel = showlabel.substring(0, showlabel.length() - 1);
					}
					
					out.println("createHidden('" + column.getFormName() + "_showlabel"
							+ index + "', '" + showlabel + "');");
				} else {
					out.println("initElementOfAllFile(D('"
							+ column.getFormName() + index
							+ "'),'','',handleType);");
				}
			}
		}
	}

	public void initElementHandleType4MultiItem(Table table, WStep step,
			javax.servlet.jsp.JspWriter out, int viewmode) throws Exception {
		List columns = table.columns();
		for (int j = 0; j < columns.size(); j++) {
			/*表字段*/
			Column column = (Column) columns.get(j);

			/*当前流转环节操作字段类型*/
			WHandle handle = step.ihandle(table.getName(), column.getName());
			int handleType = -1;

			/*查看模式*/
			if (viewmode == 2) {
				handleType = 0;
			}
			/*浏览模式*/
			else if (viewmode == 1) {
				if (handle != null && handle.itype() == 1) {
					handleType = 0;
				}
			} else {
				handleType = (handle != null ? handle.itype() : -1);
			}

			if (!column.isPremaryKey()) {
				out.println("createHidden('" + column.getFormName()
						+ "_handleType'," + handleType + ");");
			}
		}
	}%>
