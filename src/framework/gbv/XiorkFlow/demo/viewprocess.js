//
XiorkFlowWorkSpace.build();

//
function init() {
	var searchStr = window.location.search;
	var params = searchStr.substring(searchStr.indexOf("?") + 1);
	var paramsArray = params.split("&");
	var name = null;
	for (var i = 0; i < paramsArray.size(); i++) {
		var tempStr = paramsArray.get(i);
		var key = tempStr.substring(0, tempStr.indexOf("=")).toLowerCase();
		var value = tempStr.substring(tempStr.indexOf("=") + 1);
		if (key == "name") {
			name = value;
			break;
		}
	}

	//
	if (!name) {
		// 您所要浏览的工作流程图名字为空，无法浏览。
		alert("\u60a8\u6240\u8981\u6d4f\u89c8\u7684\u5de5\u4f5c\u6d41\u7a0b\u56fe\u540d\u5b57\u4e3a\u7a7a\uff0c\u65e0\u6cd5\u6d4f\u89c8\u3002");
		return false;
	}

	if (insid != "") {
		var file = insid + "activities.xml";
		var filePath = XiorkFlowWorkSpace.BASE_PATH + "/XiorkFlow/processes/"
				+ file;

		parseInstanceProcessXML(filePath);

		showTrace = true;
	}

	//
	var xiorkFlowViewPattern = new XiorkFlowViewPattern(Toolkit
			.getElementByID("designer"));
	xiorkFlowViewPattern.getWrapper().getModel().setEditable(false);
	var getProcess = new GetProcess(xiorkFlowViewPattern.getWrapper(),
			xiorkFlowViewPattern.getTableViewer(), xiorkFlowViewPattern
					.getToolBar());
	getProcess.getProcess(name);

	/*
	 * var model = new XiorkFlowModel(); model.setEditable(false); var wrapper =
	 * new XiorkFlowWrapper(new Component(document.getElementById("designer")),
	 * model); var tableViewer = XiorkFlowTableViewer(model,
	 * document.getElementById("tableViewer")); var getProcess = new
	 * GetProcess(wrapper, tableViewer); getProcess.getProcess(name);
	 */
}

function changeNodeStatus() {
	for (var i = 0; i < allNodes.length; i++) {
		var ary = allNodes[i];
		var no = ary[0];
		var tbl = ary[1];

		var status = nodesMap.get(no);

	}

	/*
	 * var keys = nodesMap.keys(); for (var i = 0; i < keys.length; i++) { var n =
	 * document.getElementById("node_" + keys[i]);
	 * 
	 * var status = nodesMap.get(keys[i]); }
	 */
}

function parseInstanceProcessXML(filePath) {
	var lanmuDoc = null;

	if (window.ActiveXObject) {
		/* 信息url */
		lanmuDoc = new ActiveXObject('Microsoft.XMLDOM');
		lanmuDoc.async = false;
		lanmuDoc.load(filePath);

		if (lanmuDoc.parseError.errorCode != 0) {
			alert(lanmuDoc.parseError.reason);
		}

	}

	if (lanmuDoc == null) {
		alert('您的浏览器不支持xml文件读取,于是本页面禁止您的操作,推荐使用IE5.0以上可以解决此问题!');
	} else {
		flowtype = getNode(lanmuDoc, "/InstanceProcess/flowtype");
		flowname = getNode(lanmuDoc, "/InstanceProcess/flowname");
		creator = getNode(lanmuDoc, "/InstanceProcess/creator");
		unit = getNode(lanmuDoc, "/InstanceProcess/unit");
		createtime = getNode(lanmuDoc, "/InstanceProcess/stime");

		var items = lanmuDoc.selectNodes("/InstanceProcess/Activity");
		for (var i = 0; i < items.length; i++) {
			var id = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/id");
			var lastid = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/lastid");
			var tlt = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/title");
			if (i == 0) {
				insname = tlt;
			}
			var sno = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/sno");
			var status = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/status");
			var type = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/type");
			var stime = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/stime");
			var etime = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/etime");
			var ltime = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/ltime");
			var lock = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/lock");
			var lockid = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/lockid");
			var lockname = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/lockname");
			var executorid = getNode(lanmuDoc, "/InstanceProcess/Activity[" + i
							+ "]/executorid");
			var executorname = getNode(lanmuDoc, "/InstanceProcess/Activity["
							+ i + "]/executorname");
			var executorunitid = getNode(lanmuDoc, "/InstanceProcess/Activity["
							+ i + "]/executorunitid");
			var executorunitname = getNode(lanmuDoc,
					"/InstanceProcess/Activity[" + i + "]/executorunitname");
			var executorpostid = getNode(lanmuDoc, "/InstanceProcess/Activity["
							+ i + "]/executorpostid");
			var executorpostname = getNode(lanmuDoc,
					"/InstanceProcess/Activity[" + i + "]/executorpostname");

			var str;

			var aidStr = ((lastid == '0' || lastid == id)
					? '当前活动(<b>' + id + '</b>)'
					: ('上一活动(' + lastid + ') -> 当前活动(<b>' + id + '</b>)'));

			if (flowtype == "custom") {
				if (status == -3) {
					str = "<div style=\"padding:5px;background-color:#FFFFD9;\">";
					str += "<div class=\"divn\" style=\"margin:2px;\">"
							+ aidStr + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理人:</b> "
							+ executorname + "/" + executorunitname + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理状态:</b> 退回</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>退回时间:</b> "
							+ stime + "</div></div>";
				} else if (status == -2) {
					str = "<div style=\"padding:5px;background-color:#FFFFD9;\">";
					str += "<div class=\"divn\" style=\"margin:2px;\">"
							+ aidStr + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理人:</b> "
							+ executorname + "/" + executorunitname + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理状态:</b> 被取回</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>取回时间:</b> "
							+ stime + "</div></div>";
				} else if (status == -1) {
					str = "<div style=\"padding:5px;background-color:#FFFFD9;\">";
					str += "<div class=\"divn\" style=\"margin:2px;\">"
							+ aidStr + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理人:</b> "
							+ executorname + "/" + executorunitname + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理状态:</b> 暂存</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>暂存时间:</b> "
							+ stime + "</div></div>";
				} else if (status == 0) {
					str = "<div style=\"padding:5px;background-color:#eeeeee;\">";
					str += "<div class=\"divn\" style=\"margin:2px;\">"
							+ aidStr + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理人:</b> "
							+ executorname + "/" + executorunitname + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理状态:</b> 待办理</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>接收时间:</b> "
							+ stime + "</div></div>";
				} else if (status == 1) {
					str = "<div style=\"padding:5px;background-color:#ffff99;\">";
					str += "<div class=\"divn\" style=\"margin:2px;\">"
							+ aidStr + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理人:</b> "
							+ executorname + "/" + executorunitname + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理状态:</b> 办理中</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>接收时间:</b> "
							+ stime + "</div></div>";
				} else if (status == 2) {
					str = "<div style=\"padding:5px;background-color:#CCFF99;\">";
					str += "<div class=\"divn\" style=\"margin:2px;\">"
							+ aidStr + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理人:</b> "
							+ executorname + "/" + executorunitname + "</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办理状态:</b> 已办理</div>";
					str += "<div class=\"divn\" style=\"margin:2px;\"><b>办结时间:</b> "
							+ etime + "</div></div>";
				}
			} else if (flowtype == "free") {
				str += "<div class=\"divn\">当前活动(" + id + "),上一活动(" + lastid
						+ ")</div>";
				str = "<div style=\"padding:5px;\">办理岗位: " + executorpostname
						+ ", 办理时间: " + etime + "</div>";
			}

			if (nodesDetailMap.containsKey(sno)) {
				var _str = nodesDetailMap.get(sno);
				str = _str + "<hr style=\"height:1px;border:none;border-top:1px dashed #0066CC;\" />" + str;
			}

			nodesMap.put(sno, status);
			nodesDetailMap.put(sno, str);
		}
		/* 标题 */
		// var title = getNode(lanmuDoc, "/InstanceProcess/Activity");
	}
}

/* 获取xml节点内容 */
function getNode(doc, xpath) {
	var retval = "";
	var value = doc.selectSingleNode(xpath);
	if (value) {
		retval = value.text
	};
	return retval;
}

function showDetail(no) {
	alert(no);
}

function hiddenDetail(no) {
	alert(no);
}