<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.context.ISystemContext"%>
<%@ page import="jt.classic.system.plugin.JSCSSPlugin"%>
<%@ page import="java.util.List"%>
<%
	String context = ISystemContext.getContextPath();

	//List<String> list = JSCSSPlugin.getPlugin();
%>
<script type="text/javascript"
	src="<%=context %>/resources/ext3/ux/fileuploadfield/FileUploadField.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=context %>/resources/ext3/ux/fileuploadfield/css/fileuploadfield.css" />
<link rel="stylesheet" type="text/css"
	href="<%=context %>/system/tableview/css/fileuploadfield.css" />
<script type="text/javascript"
	src="<%=context %>/resources/ext3/ux/MultiSelect.js"></script>
<script type="text/javascript"
	src="<%=context %>/resources/ext3/ux/ItemSelector.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=context %>/extframe/plugin/TabScrollerMenu/tab-scroller-menu.css" />
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/TabScrollerMenu/TabScrollerMenu.js"></script>
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/TabCloseMenu/TabCloseMenu.js"></script>
<script type="text/javascript"
	src="<%=context %>/resources/ext3/ux/GroupSummary.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=context %>/extframe/plugin/statusbar/css/statusbar.css" />
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/statusbar/StatusBar.js"></script>
<script type="text/javascript"
	src="<%=context %>/resources/ext3/ux/CheckColumn.js"></script>	
<!-- 
<link rel="stylesheet" type="text/css"
	href="<%=context %>/extframe/plugin/GridSummary/GridSummary.css" />
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/GridSummary/GridSummary.js"></script>	
 -->		
	
<link type="text/css" rel="stylesheet"
	href="<%=context %>/system/group/css/groupmanage.css" />
<link type="text/css" rel="stylesheet"
	href="<%=context %>/system/role/css/rolemanage.css" />	
<script type="text/javascript"
	src="<%=context %>/system/tablequery/js/tablehandler.js"></script>
	
<link type="text/css" rel="stylesheet"
	href="<%=context %>/system/tablequery/css/querylistformcmp.css" />
<!-- for wordbook -->
<link rel="stylesheet"
	href="<%=context %>/system/wordbook/css/wbmanage.css">
</script>
<script src="<%=context %>/extframe/plugin/wbmanage4tab.js"></script>
<!-- for table-query -->
<link rel="stylesheet" type="text/css"
	href="<%=context %>/extframe/plugin/tablequery4tab.css" />
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/tablequeryformcmp.js"></script>
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/tablequery4tab.js"></script>
<!-- for table-view -->	
<link rel="stylesheet" type="text/css"
	href="<%=context %>/extframe/plugin/tableview4tab.css" />
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/tableview4tab.js"></script>
<!-- for workflow -->	
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/workflow4tab.js"></script>
<script type="text/javascript"
	src="<%=context %>/extframe/plugin/worklist4tab.js"></script>

<script type="text/javascript"
	src="<%=context %>/extframe/plugin/formfield.vtype.js"></script>

<script type="text/javascript"
	src="<%=context %>/extframe/plugin/formfield.cmp.js"></script>
	
<script type="text/javascript"
	src="<%=context %>/resources/common/js/invalidsession.js"></script>	
	
<script type="text/javascript"
	src="<%=context %>/GAP/js/GAPGlobal.js"></script>	
	
<script type="text/javascript"
	src="<%=context %>/resources/common/js/options-toolbar.js"></script>		

<!-- js & css for query,view,object -->
<%
	/*if (list != null && !list.isEmpty()) {
		for (int i = 0; i < list.size(); i++) {
			String fileName = list.get(i);
			if (fileName.lastIndexOf(".js") > -1) {
				out.println("<script type=\"text/javascript\" src=\"" + context + list.get(i) + "\"></script>");
			} else if (fileName.lastIndexOf(".css") > -1) {
				out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\""+context + list.get(i)+"\" />");
			}
		}
	}*/
%>
