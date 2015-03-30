<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.HTMLTool"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.basework.impl.CommonBean4HSQ"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();
	
    CommonBean4HSQ cbh = new CommonBean4HSQ(request);

    /*待授权对象ID*/
    String oid = StringTool.checkString(cbh.getResource().get("oid"));
    /*待授权对象名称*/
    String oname = StringTool.checkString(cbh.getResource().get("oname"));
    /*授权模式(单选:single/多选:multi,默认单选)*/
    String mode = StringTool.checkString(cbh.getResource().get("mode"));
    /*授权(字典)类型(默认purview)*/
    String type = StringTool.checkString(cbh.getResource().get("type"));
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>权限设置列表</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<link rel="StyleSheet"
	href="<%=context%>/system/purview/css/purviewmanage.css"
	type="text/css" />
<link rel="StyleSheet"
	href="<%=context%>/system/group/css/groupmanage.css"
	type="text/css" />
<%if(mode.equals("multi")){ %>
<script src="<%=context%>/system/purview/js/purviewlistmulti4jsp.js"></script>
<script src="<%=context%>/system/wordbook/js/wblist.js"></script>
<%}else{ %>		
<script src="<%=context%>/system/purview/js/purviewlist4jsp.js"></script>
<script src="<%=context%>/system/wordbook/js/wbstore.js"></script>
<%} %>
<script src="<%=context%>/system/purview/js/purviewobjselect.js"></script>
<script>
   Ext.onReady(function(){
     <%if(mode.equals("multi")){ %>
     var purviewList = purviewList4multi('<%=oid%>', '<%=oname%>', 'directory', 'APP_INFO_DIRECTORY', '<%=type%>');
     <%}else{%>
     var purviewList = purviewlist('<%=oid%>', '<%=oname%>', 'directory', 'APP_INFO_DIRECTORY', '<%=type%>');
     <%}%>
   
     var viewport = new Ext.Viewport({
                layout:'border',
                items:[{
                    title : '<%=oname%> 授权列表',
                    layout:'fit',
                    region:'center',
                    cls:'empty',
                    border : true,
                    items : [purviewList]
                }]
            });
    
});
</script>
<body>
<div id="tree-div" style="border:1px #ccc solid;"></div>
</body>
</html>
