function initElement(item, value, handleType) {
	/* 临时存储元素值 */
	if (item) {
		createHidden(item.name + "_temp", value);
	}

	if (readonly) {
		handleType = 1;
	}

	if (handleType == 0 && item) {
		// item.disabled = true;
		var rootSibling = item.nextSibling;
		var bindObject = document.createElement("span");
		bindObject.id = item.name + "_label";
		item.parentNode.insertBefore(bindObject, rootSibling);
		item.removeNode(true);
	} else if (handleType == 1 && item) {
		var rootSibling = item.nextSibling;
		if (item.type == "hidden") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			if (value != "") {
				// bindObject.innerHTML = value;
				item.value = value;
			}
		} else if (item.type == "text" || item.type == "textarea") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);

			if (value != "") {
				bindObject.innerHTML = value;
			}/*
				 * else{ item.disabled = true; }
				 */

			item.value = value;
			item.style.display = "none";

			// item.removeNode(true);
		} else if (item.type == "checkbox") {
			item.checked = (item.value == value);
			item.disabled = true;
		} else if (item.type == "radio") {
			item.checked = (item.value == value);
			item.disabled = true;
		} else if (item.type == "select-one") {
			var txt = "";
			for (var i = 0; i < item.length; i++) {
				if (item[i].value == value) {
					txt = item[i].text;
					break;
				}
			}

			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			bindObject.innerHTML = txt;
			item.style.display = "none";
			// item.disabled = true;
		} else if (item.type == "file") {
		}
	} else if (handleType == 2 && item) {
		var rootSibling = item.nextSibling;
		if (item.type == "hidden") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			if (value != "") {
				// bindObject.innerHTML = value;
				item.value = value;
			}
		}
		if (item.type == "text" || item.type == "textarea") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			item.value = value == "" ? item.value : value;
		} else if (item.type == "checkbox") {
			item.checked = (item.value == value);
		} else if (item.type == "radio") {
			item.checked = (item.value == value);
		} else if (item.type == "select-one") {
			for (var i = 0; i < item.length; i++) {
				if (item[i].value == value) {
					item[i].selected = true;
				}
			}
		} else if (item.type == "file") {
		}
	}
}

/**
 * 初始化文件类型元素
 */
function initElementOfFile(obj, id, name, r) {
	/* 增加附件 */
	if (r == 2 && id == "") {
		// var bindObject = document.createElement("span");
		// bindObject.id = "filespan_" + obj.name;
		var str = "<input type=\"file\" id=\""
				+ obj.name
				+ "\" name=\""
				+ obj.name
				+ "\" value=\"\"  onpropertychange=\"javascript:try{setfilename(this);}catch(error){}\">&nbsp;";
		// bindObject.innerHTML += str;

		obj.parentNode.innerHTML += str;
	}

	if (r == 0) {
		// obj.disabled = true;
		// obj.removeNode(true);
	} else if (r == 1) {
		if (id != "") {
			var annex = document.createElement("span");
			annex.id = id;
			var str = "&nbsp;";
			str += "<a href=\"javascript:viewAnnex('" + id
					+ "');\" title=\"查看附件\">" + name + "&nbsp;";
			str += "<a href=\"javascript:downloadAnnex('"
					+ id
					+ "');\"><img src=\""
					+ context
					+ "/system/object/images/annexview.png\" style=\"margin-bottom:-3px;\" title=\"下载附件\"></a>&nbsp;";
			annex.innerHTML = str;

			obj.parentNode.appendChild(annex);
			
			obj.removeNode(true);
		}
	} else if (r == 2) {
		if (id != "") {
			var annex = document.createElement("span");
			annex.id = id;
			var str = "&nbsp;";
			str += "<a href=\"javascript:viewAnnex('" + id
					+ "');\" title=\"查看附件\">" + name + "</a>&nbsp;";
			str += "<a href=\"javascript:downloadAnnex('"
					+ id
					+ "');\"><img style=\"margin-bottom:-3px;\" src=\""
					+ context
					+ "/system/object/images/annexview.png\" title=\"下载附件\"></a>&nbsp;";
			str += "<a href=\"javascript:deleteAnnex('"
					+ id
					+ "','"
					+ name
					+ "','"
					+ obj.name
					+ "');\" title=\"删除附件\"><img style=\"margin-bottom:-3px;\" src=\""
					+ context
					+ "/system/object/images/annexremove.png\" title=\"删除附件\"></a>&nbsp;";
				
			annex.innerHTML = str;
			obj.parentNode.appendChild(annex);
			
			obj.removeNode(true);
		}
	}
}

/**
 * 初始化多处理项文件类型元素脚本
 */
function initScriptMultItemOfFile(objname, id, name, r) {
	var str = "";

	/* 增加附件 */
	if (r == 2) {
		str = "<input type=\"file\" class=\"box3\" id=\""
				+ objname
				+ "\" name=\""
				+ objname
				+ "\" value=\"\"  onpropertychange=\"javascript:setfilename(this);\">";

	} else if (r == 1) {
		str = "<input type=\"hidden\" id=\"" + objname + "\" name=\"" + objname
				+ "\" value=\"\">";
	}
	return str;
}

function initElementOfAllFile(obj, id, name, r) {
	if (!obj) {
		alert("表单没有定义附件操作区域");
		return;
	}
	var area = $(obj.name + "_area");

	/* 附件显示区域 */
	if (!area) {
		/* 增加附件 */
		if (r == 2) {
			var a = document.createElement("a");
			a.href = "javascript:addFile('" + obj.name + "_area');";
			a.innerHTML = "<img src=\""
					+ context
					+ "/system/object/images/annexadd.png\" style=\"margin-bottom:-3px;\" title=\"添加附件\">";
			obj.parentNode.appendChild(a);
		}
		area = document.createElement("div");
		area.id = obj.name + "_area";
		obj.parentNode.appendChild(area);
	}

	if (r == 0) {
		// obj.disabled = true;
		// obj.removeNode(true);
	} else if (r == 1) {
		if (id != "") {
			var annex = document.createElement("div");
			annex.style.className = "divn";
			annex.id = id;
			var str = "&nbsp;";
			str += "<a href=\"javascript:viewAnnex('" + id
					+ "');\" title=\"查看附件\">" + name + "</a>&nbsp;";
			str += "<a href=\"javascript:downloadAnnex('" + id
					+ "');\"><img style=\"margin-bottom:-3px;\" src=\""
					+ context
			annex.innerHTML = str;
			area.appendChild(annex);
		}
	} else if (r == 2) {
		if (id != "") {
			var annex = document.createElement("div");
			annex.style.className = "divn";
			annex.id = id;
			var str = "&nbsp;";
			str += "<a href=\"javascript:viewAnnex('" + id
					+ "');\" title=\"查看附件\">" + name + "</a>&nbsp;";
			str += "<a href=\"javascript:downloadAnnex('"
					+ id
					+ "');\"><img style=\"margin-bottom:-3px;\" src=\""
					+ context
					+ "/system/object/images/annexview.png\" title=\"下载附件\"></a>&nbsp;";
			str += "<a href=\"javascript:deleteAnnex('"
					+ id
					+ "','"
					+ name
					+ "','"
					+ obj.name
					+ "');\" title=\"删除附件\"><img style=\"margin-bottom:-3px;\" src=\""
					+ context + "/system/object/images/annexremove.png\"></a>";
			annex.innerHTML = str;
			area.appendChild(annex);
		}
	}
}

/* 增加上传文件 */
function addFile(area) {
	var bindObject = document.createElement("span");
	bindObject.id = "filespan_" + allannex;
	var str = "<input type=\"file\" class=\"box3\" id=\"file_" + allannex
			+ "\" name=\"file_" + allannex + "\" value=\"\">&nbsp;";
	str += "<a href=\"javascript:void(-1);\" onclick=\"javascript:$('filespan_"
			+ allannex
			+ "').removeNode(true);\" title=\"删除附件\"><img style=\"margin-bottom:-3px;\" src=\""
			+ context + "/system/object/images/annexremove.png\"></a><br>";
	bindObject.innerHTML += str;

	$(area).appendChild(bindObject);

	allannex++;
}

/**
 * 在线打开附件
 * 
 * @param {}
 *            id
 */
function viewAnnex(id) {
	if (document.frames["helper"].src != context + "/system/blank.jsp") {
		var frm = document.frames["helper"].document;
		frm.body.innerHTML = "<form method='post' name='form1'><input type='hidden' name='id' value=''></form>";
	}

	document.frames["helper"].document.form1.id.value = id;
	document.frames["helper"].document.form1.action = context
			+ "/system/annex.do?method=seeit";
	document.frames["helper"].document.form1.target = "_blank";
	document.frames["helper"].document.form1.submit();
}

/**
 * 下载附件
 * 
 * @param {}
 *            id
 */
function downloadAnnex(id) {
	if (document.frames["helper"].src != context + "/system/blank.jsp") {
		var frm = document.frames["helper"].document;
		frm.body.innerHTML = "<form method='post' name='form1'><input type='hidden' name='id' value=''></form>";
	}

	document.frames["helper"].document.form1.id.value = id;
	document.frames["helper"].document.form1.action = context
			+ "/system/annex.do?method=view";
	document.frames["helper"].document.form1.submit();
}

function deleteAnnex(id, name, fname) {
	if (confirm("确定删除附件 '" + name + "'")) {
		var url = context + "/system/annex.do?method=delete&id=" + id;
		var res = sendRequest(url);
		if (res == 1) {
			if (D(fname)) {
				D(fname).style.display = "block";
			} else {
				var annex = document.createElement("input");
				annex.name = fname;
				annex.type = "file";
				annex.style.className = "box3";
				$(id).parentNode.appendChild(annex);
				// $(id).parentNode.appendChild(document.createElement("br"));
			}

			$(id).removeNode(true);
		}
	}
}