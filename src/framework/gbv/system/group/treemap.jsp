<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="jt.classic.system.user.IUser"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.HTMLTool"%>
<%@ page import="jt.classic.system.group.GroupMapScript" %>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();
   
   String script = (String)request.getAttribute("script");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>系统组织结构树</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<style>
html, body {
	width: 100%;
	height: 100%;
	margin: 0px;
	padding: 0px;
	overflow: hidden;
}
</style>
<script>
function tonclick(id) {
    //alert(id);
    var url = tree.getUserData(id, "editurl");
    dhxLayout.cells("b").attachURL(url);
};
function tondblclick(id) {
    //alert(id);
};
function tondrag(id, id2) {
    var idid = tree.getUserData(id, "id");
    var idtype = tree.getUserData(id, "tp");
    var parentid = tree.getUserData(id, "parentid");
    var id2id = tree.getUserData(id2, "id");
    var idtype2 = tree.getUserData(id2, "tp");
   
    if((idtype == "user" && idtype2 == "user") || (idtype == "group" && idtype2 == "user")){
        return false;
    }else if(idtype == "user" && idtype2 == "group"){
        if(parentid == id2id){
            return false;
        }if(confirm("确定要将用户 " + tree.getItemText(id) + " 移动到组 " + tree.getItemText(id2) + " 下?")){
            if(MoveIt(idid, 'u', id2id, 'g')){
               tree.setUserData(id, "parentid", id2id);
               tree.changeItemId(id, "g"+id2id+"u"+idid);
               return true;
            }else{
               alert("移动失败");
               return false;
            }
        }else{
            return false;
        }
    }else if(idtype == "group" && idtype2 == "group"){
        if(parentid == id2id){
            return false;
        }if(confirm("确定要将组 " + tree.getItemText(id) + " 移动到组 " + tree.getItemText(id2) + " 下?")){
          if(MoveIt(idid, 'g', id2id, 'g')){
               tree.setUserData(id, "parentid", id2id);
               return true;
            }else{
               alert("移动失败");
               return false;
            }
        }else{
           return false;
        }
    }
    
    return false;
};
function tonopen(id, mode) {
    //return confirm("Do you want to " + (mode > 0 ? "close": "open") + " node " + tree.getItemText(id) + "?");
    return true;
};
function toncheck(id, state) {
    //doLog("Item " + tree.getItemText(id) + " was " + ((state) ? "checked": "unchecked"));
};
function MoveIt(o, otp, t, ttp){
    var u = context + "/system/group.do?method=moveit";
    var params = "oid=" + o + "&otp=" + otp + "&tid=" + t + "&ttp=" + ttp;
	var loader = dhtmlxAjax.postSync(u, encodeURI(params));
    if(loader.xmlDoc.responseText == 1){
        return true;
    }
    return false;
};

var dhxLayout;
var tree;

var url = "<%=context%>/system/group.do?method=treemap&showuser=0";

function loadPage(){
    dhxLayout = new dhtmlXLayoutObject(document.body, "2U");
    dhxLayout.setSkin('dhx_blue');
	dhxLayout.cells("a").setWidth(200);
	dhxLayout.cells("a").setText("组织机构树");
    
    tree = dhxLayout.cells("a").attachTree();
    tree.setSkin('dhx_skyblue');
	tree.setImagePath("<%=context %>/resources/dhtmlx/codebase/imgs/csh_bluebooks/");
	//tree.enableCheckBoxes(1);
	tree.enableDragAndDrop(1);
	tree.setOnClickHandler(tonclick);
	tree.setOnCheckHandler(toncheck);
	tree.setOnDblClickHandler(tondblclick);
	tree.setDragHandler(tondrag);

    var jsondata = <%=GroupMapScript.getInstance().getGroupMapScript("-1", GroupMapScript.ALL_GROUPUSER)%>;

	tree.loadJSONObject(jsondata, function() {
					tree.openAllItems(0);
				});		
	
	dhxLayout.cells("b").attachObject(document.getElementById("area"));
	dhxLayout.cells("b").setText("");
}

function removeItem(){
    tonclick(tree.getParentId(tree.getSelectedItemId()));
    tree.deleteItem(tree.getSelectedItemId());
}

function rename(newLabel){
    tree.setItemText(tree.getSelectedItemId(),newLabel,newLabel);
}

function reloadTree(){
    dhxLayout.cells("a").detachObject();
    
    tree = dhxLayout.cells("a").attachTree();
    tree.setSkin('dhx_skyblue');
	tree.setImagePath("<%=context %>/resources/dhtmlx/codebase/imgs/csh_bluebooks/");
	//tree.enableCheckBoxes(1);
	tree.enableDragAndDrop(1);
	tree.setOnClickHandler(tonclick);
	tree.setOnCheckHandler(toncheck);
	tree.setOnDblClickHandler(tondblclick);
	tree.setDragHandler(tondrag);

    var jsondata = <%=GroupMapScript.getInstance().getGroupMapScript("-1", GroupMapScript.ALL_GROUPUSER)%>;

	tree.loadJSONObject(jsondata, function() {
					tree.openAllItems(0);
				});
}
</script>
<body>
<div id="area" style="width:100%;height:100%;">xxxxxxxxxxxxxxx</div>
</body>
</html>
