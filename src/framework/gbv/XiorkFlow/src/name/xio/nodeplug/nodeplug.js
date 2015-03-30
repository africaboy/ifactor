function handleMenu(id, name, tp) {
	if (tp == -1) {
		//
	} else {
		showMenu("xnode", id, name, tp);
	}
}

function handleLineMenu(id, name, tp) {
	showMenu("xtransition", id, name, tp);
}

function handleDetail() {
	closeNow();
	var url = XiorkFlowWorkSpace.BASE_PATH + "nodeset?method=nodedetailset";
	createHidden("key", document.getElementById("wobject").value);
	createHidden("objkey", document.getElementById("wobject").value);
	createHidden("objname", document.getElementById("wobjectname").value);
	createHidden("suportkey", document.getElementById("suportkey").value);
	createHidden("nodeid", oID);
	createHidden("nodetype", oType);
	createHidden("nodename", oName);
	dialog4submit(url, true, "节点[" + oName + "]属性详细设置", 600, 500);
	/*
	 * var url = XiorkFlowWorkSpace.BASE_PATH + "nodeset"; dialog4submit(url,
	 * true, "节点[" + oName + "]属性详细设置", 600, 500);
	 */
}

function handleDeleteItem() {
	var xiorkFlowModel = xiorkFlow.getWrapper().getModel();

	if (xiorkFlowModel.nodeSelected()) {
		xiorkFlowModel.deleteSelected();
	} else {
		alert("请选定要删除的对象,然后执行删除操作");
	}
	closeNow();
}

function createHidden(name, value) {
	if (document.getElementsByName(name).length == 0) {
		var script = "<input type=\"hidden\" id=\"" + name + "\" name=\""
				+ name + "\" value=\"" + value + "\">";
		var objectName = document.createElement(script)
		document.forms[0].insertBefore(objectName);
	} else {
		document.getElementsByName("" + name + "")[0].value = value;
	}
}

/**
 * 设置节点属性信息
 */
function nodeset() {
	var nodeid = arguments[0];
	var iname = arguments[1];
	var itype = arguments[2];
	var ipost = arguments[3];
	var iscorr = arguments[4];
	var iscorrvalue = arguments[5];
	var iscorrs = arguments[6];
	var iscorrsvalue = arguments[7];
	var ipara = arguments[8];
	var iinner = arguments[9];
	var objkey = arguments[10];
	var objname = arguments[11];
	var suportkey = arguments[12];

	var wrapper = xiorkFlow.getWrapper();

	var metaNode = wrapper.getMetaNode(nodeid);

	if (metaNode) {
		// metaNode.getModel().setText(iname);
		metaNode._updateNewText(iname);

		metaNode.getModel().setInfo("nodeid", nodeid);
		metaNode.getModel().setInfo("iname", iname);
		metaNode.getModel().setInfo("itype", itype);
		metaNode.getModel().setInfo("ipost", ipost);
		metaNode.getModel().setInfo("iscorr", iscorr);
		metaNode.getModel().setInfo("iscorrvalue", iscorrvalue);
		metaNode.getModel().setInfo("iscorrs", iscorrs);
		metaNode.getModel().setInfo("iscorrsvalue", iscorrsvalue);
		metaNode.getModel().setInfo("ipara", ipara);
		metaNode.getModel().setInfo("iinner", iinner);
		metaNode.getModel().setInfo("objkey", objkey);
		metaNode.getModel().setInfo("objname", objname);
		metaNode.getModel().setInfo("suportkey", suportkey);
	} else {
		alert("流程设计器中该节点已丢失");
	}

	// document.getElementById("name_" + id).value = iname;
}