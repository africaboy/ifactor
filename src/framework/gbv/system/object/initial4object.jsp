<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="jt.classic.system.object.IObject"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.RandomUtil"%>
<%@ page import="org.limp.mine.annex.AnnexInfo"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	IUser user = ISystemContext.getSessionUser(request);

	String querykey = StringTool.checkString(request
			.getAttribute("querykey"));

	WObject obj = (WObject) request.getAttribute("wobject");

	IObject object = (IObject) request.getAttribute("object");

	Map contentMap = (Map) request.getAttribute("objectContent");

	String readonly = (String) request.getAttribute("readonly");
	
	String view4diy = obj.iview4diy() ? "yes" : "no";

	int handleType = 0;

	if (readonly.equals("true")) {
		handleType = 1;
	} else if (readonly.equals("false")) {
		handleType = 2;
	}

	List doctemp = (List) request.getAttribute("doctemp");
	List numbers = (List) request.getAttribute("numbers");
	Map defaultnumber = (Map) request.getAttribute("defaultnumber");
	int defaultMultiItemSize = 1;
	String sequenceA = RandomUtil.getRandomString(20, false);
	String action = (String) request.getAttribute("action");

	List impsets = null;//obj.importsets();
%>
<LINK rel=stylesheet type=text/css
	href="<%=context %>/system/object/css/object.css" media=screen>
<jsp:include page="../head.jsp"></jsp:include>	
<script>
        var aid = "0";
        var stepid = "0";
        var numberA = "0";
        var docid = "0";
        var sequenceA = "<%=sequenceA%>";
        var action = "<%=action%>";
        /*通用查询key*/
        var querykey = "<%=querykey%>";
        /*操作有效性*/
        var ope = false;
        /*操作类型*/
        var readonly = <%=readonly%>;
        /*对象实例主键值*/
        var objid = "<%=(object != null ? object.id() : "")%>";
        /*对象实例名称*/
        var objname = "<%=(object != null ? object.iname() : "")%>";
        /*对象名称*/
        var objectname = "<%=obj.iname()%>";
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
        /*当前操作用户单位ID*/
        var groupid = "<%=(user.igroup()!=null?user.igroup().id():"")%>";
        /*当前操作用户部门名称*/
        var groupname = "<%=(user.igroup()!=null?user.igroup().iname():"")%>";
        /*部门编号*/
        var groupnumber  = "<%=(user.igroup()!=null?user.igroup().inumber():"")%>";
        /*当前操作用户部门全称*/
        var groupflumelabel = "<%=(user.igroup()!=null?user.igroup().iflumelabel(""):"")%>";
        /*当前操作用户部门简称*/
        var groupshortlabel = groupflumelabel.indexOf("/") > -1 ? groupflumelabel.substring(groupflumelabel.indexOf("/") + 1):"";
        /*当前操作用户部门全ID*/
        var groupflumeids = "<%=(user.igroup()!=null?user.igroup().iflumeid(""):"")%>";
        /*弹出窗口*/
        var newwindow;
        /*allannex个数*/
        var allannex = 0;
        /*是否有导入设置*/
        var impset = <%=(impsets!=null&&!impsets.isEmpty())?"true":"false"%>;
        /*默认文号类型*/
        var defaultnumber = "<%=(defaultnumber==null?"":defaultnumber.get("NUMBER_KEY"))%>";
        /*默认文号名称*/
        var defaultnumbername = "<%=(defaultnumber==null?"":defaultnumber.get("NUMBER_NAME"))%>";
        /*文号种类*/
        var numbers = new Array();
        /*多数据操作表*/
        var multiTables = new Array();
        /*初始化多数据项数目*/
        var defaultMultiItemSize = <%=defaultMultiItemSize%>;
        <%
          if(numbers != null && !numbers.isEmpty()){
             for(int i=0;i<numbers.size();i++){
                 Map num = (Map)numbers.get(i);
        %>
        numbers.push(new Array('<%=num.get("NUMBER_KEY")%>','<%=num.get("NUMBER_NAME")%>'));
        <%
             }
          }
        %>
        
        /*初始化流程相关对象信息*/
        function initobject(){
          createHidden("eip","<%=request.getRemoteAddr()%>");
          /*当前访问hostname*/
          createHidden("ehostname","");
          /*当前访问mac地址*/
          createHidden("emac","");
          /*操作类型*/
          var handleType = readonly == false ? 2 : 1;
<%      
         /*流程对象关联表列表*/
         List list = obj.itables();
         for(int i=0;i<list.size();i++){
             /*流程对象关联表*/
             Table table = (Table)list.get(i);
             if(obj.handleTable(table) == 0){//单处理表
                 Map content = contentMap!=null?(Map)((List)contentMap.get(table.getName())).get(0):null;
                 initElement(content,"",table,out,handleType);
             }else if(obj.handleTable(table) == 1){//多处理表
                 initElementHandleType4MultiItem(table,out,handleType);
             }
         }
         
         out.println("init4number();");
         out.println("init4yijian();");
         out.println("init4wordbook();");
         out.println("initdate();");
         out.println("initselect();");
         
         for(int i=0;i<list.size();i++){
             /*流程对象关联表*/
             Table table = (Table)list.get(i);
             if(obj.handleTable(table) == 1){//多处理表
            	 List contents = contentMap!=null?(List)contentMap.get(table.getName()):null;
            	 
            	 if(contents == null){
            		 if((action == "neu" || action == "edit")){
	                     contents = new ArrayList();
	                     for(int j=0;j<defaultMultiItemSize;j++){
	                         contents.add(null);
	                     }
            		 }else{
            			 contents = new ArrayList();
            		 }
                 }
            	 
            	 /*表主键字段*/
                 Column col = table.column(table.getPrimaryKey()[0]);
                 /*多数据操作计数器*/
                 String counterName = obj.countName(table);
                 /*多数据计数*/
                 int countItems = contents.size();
                 out.println("<!--多处理表['"+table.getName()+"']处理过程开始-->");
                 /*记录多数据表操作必要信息*/
                 out.println("createHidden(\""+counterName+"\",\""+countItems+"\");");
                 /*多数据项(增加,删除)操作设置*/
                 int addtype = handleType;
                 int deltype = handleType;
                 out.println("multiTables.push(\""+table.getName()+","+counterName+","+col.getFormName()+","+addtype+","+deltype+"\");");
                 
                 out.println("var myMultiItemSize = " + contents.size() + ";");
                 
//               out.println("try{initMyMultiItem(defaultMultiItemSize);}catch(e){alert(\"缺少自定义多数据项处理方法\");}");
                 out.println("if(!document.getElementById('"+table.getName()+"')){alert(\"缺少多数据显示区域\");}else{");
                 out.println("parseMultiItem('"+table.getName()+"',0);");
                 out.println("if(!readonly){addMultiButton('"+table.getName()+"');}");
                 out.println("initMultiTable('"+table.getName()+"',(myMultiItemSize==0?defaultMultiItemSize:myMultiItemSize));");
                 out.println("}");
                 
                 for(int j=0;j<contents.size();j++){
	                 Map content = (Map)contents.get(j);
	                 initElement4Multi(content,"_"+String.valueOf(j),table,out,handleType);
	             }
                 
                 out.println("<!--多处理表['"+table.getName()+"']处理过程结束-->");
                 out.println("");
             }
         }
%>
        }
        /*initobjct 定义结束*/
</script>
<script src="<%=context%>/system/object/js/init4object.js"></script>
<script src="<%=context%>/system/object/js/initElement.js"></script>
<script src="<%=context%>/system/object/js/initMultiElement.js"></script>
<%!/*初始化表单元素 viewmode[0(办理模式),1浏览模式(只显示有权限查看的内容),2查看模式(全部内容)]*/
	public void initElement(Map content, String index, Table table,
			javax.servlet.jsp.JspWriter out, int viewmode) throws Exception {
		/*表字段列表*/
		List columns = table.columns();
		for (int j = 0; j < columns.size(); j++) {
			/*表字段*/
			Column column = (Column) columns.get(j);
			String value = "";
			/*操作类型*/
			int handleType = viewmode;

			if (!column.isPremaryKey()) {
				out.println("createHidden('" + column.getFormName() + index
						+ "_handleType'," + (handleType) + ");");
			}

			if (!column.isAnnex() && content != null
					&& content.containsKey(column.getName())) {
				out.println("handleType = " + (handleType) + ";");
				if (handleType > 0
						&& !StringTool.BLOB.equals(column.getType().toString())) {
					value = (String) content.get(column.getName());
				}
				if (column.isPremaryKey()) {
					value = (String) content.get(column.getName());
					out.println("createHidden('" + column.getFormName() + index
							+ "','" + value + "');");
				} else {
					out.println("initElement(document.all."
							+ column.getFormName() + index + ",'" + value
							+ "',handleType);");
				}
			} else if (!column.isAnnex()
					&& (content == null || !content.containsKey(column
							.getName()))) {
				out.println("handleType = " + (handleType) + ";");
				if (column.isPremaryKey()) {
					out.println("createHidden('" + column.getFormName() + index
							+ "','" + value + "');");
				} else {
					out.println("initElement(document.all."
							+ column.getFormName() + index + ",'" + value
							+ "',handleType);");
				}
			} else if (column.isAnnex()
					&& (!"ALLFREE".equals(column.getFormName().toUpperCase()) && !"ALLRESTRICT"
							.equals(column.getFormName().toUpperCase()))) {
				out.println("handleType = " + (handleType) + ";");
				if (handleType > 0 && content != null
						&& content.containsKey(column.getName())) {
					AnnexInfo[] annexs = (AnnexInfo[]) content.get(column.getName());
					AnnexInfo annex = annexs[0];
					out.println("initElementOfFile(document.all."
							+ column.getFormName() + index + ",'"
							+ annex.getID() + "','" + annex.getFullName()
							+ "',handleType);");
				} else {
					out.println("initElementOfFile(document.all."
							+ column.getFormName() + index
							+ ",'','',handleType);");
				}
			} else if (column.isAnnex()
					&& ("ALLFREE".equals(column.getFormName().toUpperCase()) || "ALLRESTRICT"
							.equals(column.getFormName().toUpperCase()))) {
				out.println("handleType = " + (handleType) + ";");
				if (handleType > 0 && content != null
						&& content.containsKey(column.getName())) {
					AnnexInfo[] annexs = (AnnexInfo[]) content.get(column
							.getName());
					out.println("allannex = " + annexs.length + ";");
					for (int k = 0; k < annexs.length; k++) {
						AnnexInfo annex = annexs[k];
						out.println("initElementOfAllFile(document.all."
								+ column.getFormName() + index + ",'"
								+ annex.getID() + "','" + annex.getFullName()
								+ "',handleType);");
					}
				} else {
					out.println("initElementOfAllFile(document.all."
							+ column.getFormName() + index
							+ ",'','',handleType);");
				}
			}
		}
	}

	/*初始化多处理数据项*/
	public void initElement4Multi(Map content, String index, Table table,
			javax.servlet.jsp.JspWriter out, int viewmode) throws Exception {
		/*表字段列表*/
		List columns = table.columns();
		for (int j = 0; j < columns.size(); j++) {
			/*表字段*/
			Column column = (Column) columns.get(j);
			String value = "";
			/*操作类型*/
			int handleType = viewmode;

			if (!column.isPremaryKey()) {
				out.println("createHidden('" + column.getFormName() + index
						+ "_handleType'," + (handleType) + ");");
			}

			if (!column.isAnnex() && content != null
					&& content.containsKey(column.getName())) {
				out.println("handleType = " + (handleType) + ";");
				if (handleType > 0
						&& !StringTool.BLOB.equals(column.getType().toString())) {
					value = (String) content.get(column.getName());
				}
				if (column.isPremaryKey()) {
					value = (String) content.get(column.getName());
					out.println("createHidden('" + column.getFormName() + index
							+ "','" + value + "');");
				} else {
					out.println("initElement(document.all."
							+ column.getFormName() + index + ",'" + value
							+ "',handleType);");
				}
			} else if (!column.isAnnex()
					&& (content == null || !content.containsKey(column
							.getName()))) {
				out.println("handleType = " + (handleType) + ";");
				if (column.isPremaryKey()) {
					out.println("createHidden('" + column.getFormName() + index
							+ "','" + value + "');");
				} else {
					out.println("initElement(document.all."
							+ column.getFormName() + index + ",'" + value
							+ "',handleType);");
				}
			} else if (column.isAnnex()
					&& (!"ALLFREE".equals(column.getFormName().toUpperCase()) && !"ALLRESTRICT"
							.equals(column.getFormName().toUpperCase()))) {
				out.println("handleType = " + (handleType) + ";");
				if (handleType > 0 && content != null
						&& content.containsKey(column.getName())) {
					AnnexInfo[] annexs = (AnnexInfo[]) content.get(column.getName());
					AnnexInfo annex = annexs[0];
					out.println("initElementOfFile(document.all."
							+ column.getFormName() + index + ",'"
							+ annex.getID() + "','" + annex.getFullName()
							+ "',handleType);");
				} 
			}
		}
	}

	public void initElementHandleType4MultiItem(Table table,
			javax.servlet.jsp.JspWriter out, int viewmode) throws Exception {
		List columns = table.columns();
		for (int j = 0; j < columns.size(); j++) {
			/*表字段*/
			Column column = (Column) columns.get(j);

			/*操作类型*/
			int handleType = viewmode;

			if (!column.isPremaryKey()) {
				out.println("createHidden('" + column.getFormName()
						+ "_handleType'," + handleType + ");");
			}
		}
	}%>
