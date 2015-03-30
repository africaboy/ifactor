<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.object.IObject"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.DateTrimmer"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.ArrayList"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

    IObject object = (IObject) request.getAttribute("object");

	WObject wobject = (WObject) request.getAttribute("wobject");
	
	String id = StringTool.checkString(request.getParameter("id"));

	String querykey = StringTool.checkString(request.getParameter("querykey"));
%>
<jsp:include page="../../system/head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/wordbook/css/wbmanage.css" ></link>
<script type="text/javascript" src="<%=context %>/system/wordbook/js/wbstore4form.js"></script>
<link rel="stylesheet" type="text/css" href="<%=context%>/system/group/css/groupmanage.css" ></link>
<script type="text/javascript" src="<%=context %>/system/group/js/groupcombo4jsp.js"></script>
<script type="text/javascript" src="<%=context %>/system/dataindex/js/ditree4jsp.js"></script>
<script type="text/javascript" src="<%=context %>/system/object/js/page4view.js"></script>
<script type="text/javascript" src="<%=context %>/system/object/js/init4core.js"></script>
<script>
    Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	
	var id = '<%=id%>';
	var name = '<%=wobject.iname()%>';
	var key = '<%=wobject.ikey()%>';
	var returnURL = '';
	var querykey = '<%=querykey%>';
	
	<%
	List list = wobject.itables();
	
	if (list != null && !list.isEmpty()) {
		Map annexItem = new HashMap();
		
		for (int i = 0; i < list.size(); i++) {
			Table table = (Table) list.get(i);
	
			List columnList = table.columns();
	
			if (wobject.handleTable(table) == 0 && ((List) object.icontent(table)) != null) {
				Map info = (Map) ((List) object.icontent(table)).get(0);
	
				for (int j = 0; j < columnList.size(); j++) {
					Column column = (Column) columnList.get(j);
	
					out.println("handleTypeMap.put('"+column.getFormName()+"', '0');");
				}
			} else if (wobject.handleTable(table) == 1 && ((List) object.icontent(table)) != null) {
	            List infoList = (List) object.icontent(table);
	            
	            for(int k = 0; k < infoList.size(); k++){           	
	            	for (int j = 0; j < columnList.size(); j++) {
						Column column = (Column) columnList.get(j);
		
						out.println("handleTypeMap.put('" + column.getFormName()+ "_" + k + "', '0');");
					}
	            	

	            }
	            
	          
			}
		}
	}
	%>
	
	function viewObject(){
	   loadObjectContent('<%=id %>');
	   inithelper();
	};
</script>