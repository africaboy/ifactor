function handleQuerySet() {
	if (D("objkey").value == "") {
		alert("请选择表单对象");
	} else {
		window.location.href = context
				+ "/system/object.do?method=neuqueryset&objkey="
				+ D("objkey").value;
	}
}

function handleQuery(okey, qkey) {
	window.location.href = context + "/system/objectquery.do?key=" + okey
			+ "&querykey=" + qkey;
}

function selQuerySet(thizz) {
	window.location.href = context
			+ "/system/object.do?method=querysetlist&objkey=" + thizz.value;
}

/**
 * 
 */
function showQueryItem(o) {
	if ($(o).style.display == "none") {
		$(o).style.display = "block";
	} else if ($(o).style.display == "block") {
		$(o).style.display = "none";
	}
}

/**
 * 初始化设置
 * 
 */
function initqueryset() {
	var qtypeitems = A("iname", "qitemtype");

	for (var i = 0; i < qtypeitems.length; i++) {
		script4wordbookselect("query-item-type", "", qtypeitems[i].name);
	}

	var qtypeitems = A("iname", "qitemmode");

	for (var i = 0; i < qtypeitems.length; i++) {
		script4wordbookselect("compare-mode", "", qtypeitems[i].name);
	}

	var qtypeitems = A("iname", "qrestraintitemmode");

	for (var i = 0; i < qtypeitems.length; i++) {
		script4wordbookselect("compare-mode", "", qtypeitems[i].name);
	}
}

/**/
var itemmap = new HashMap();

/**
 * 保存设置
 */
function handleSave() {
	if (confirm("确定提交")) {
		var qkey = D("qkey").value;
		var str = "<object-query>\n";
		str += "<query ID=\"" + qkey + "\">\n";

		var qobject = D("object").value;
		var qname = D("qname").value;
		var qdesc = D("qdesc").value;
		var queryurl = D("queryurl").value;
		var qresulturl = D("qresulturl").value;
		var qpurview = D("qpurview").value;
		var qpurviewname = D("qpurviewname").value;
		var qsession = D("qsession").checked ? D("qsession").value : "0";
		var qcreatestime = D("qcreatestime").value;
		var qcreateetime = D("qcreateetime").value;

		var qhinsert = D("qhinsert").checked ? D("qhinsert").value : "no";
		var qhview = D("qhview").checked ? D("qhview").value : "no";
		var qhupdate = D("qhupdate").checked ? D("qhupdate").value : "no";
		var qhdelete = D("qhdelete").checked ? D("qhdelete").value : "no";
		var qhpurview = D("qhpurview").checked ? D("qhpurview").value : "no";
		var qhexport = D("qhexport").checked ? D("qhexport").value : "no";
		var qhcopy = D("qhcopy").checked ? D("qhcopy").value : "no";

		str += "<name>" + qname + "</name>\n";
		str += "<object>" + qobject + "</object>\n";
		str += "<queryurl>" + queryurl + "</queryurl>\n";
		str += "<resulturl>" + qresulturl + "</resulturl>\n";
		str += "<desc>" + qdesc + "</desc>\n";
		str += "<purview>" + qpurview + "</purview>\n";
		str += "<purview-name>" + qpurviewname + "</purview-name>\n";
		str += "<session>" + qsession + "</session>\n";
		str += "<createstime>" + qcreatestime + "</createstime>\n";
		str += "<createetime>" + qcreateetime + "</createetime>\n";

		str += "<handle-item>";
		str += "<insert>" + qhinsert + "</insert>\n";
		str += "<view>" + qhview + "</view>\n";
		str += "<update>" + qhupdate + "</update>\n";
		str += "<delete>" + qhdelete + "</delete>\n";
		str += "<purview>" + qhpurview + "</purview>\n";
		str += "<export>" + qhexport + "</export>\n";
		str += "<copy>" + qhcopy + "</copy>\n";
		str += "</handle-item>";

		var qitems = A("idiv", "qitem");
		str += "<query-item>\n";
		if (qitems && qitems.length > 0) {

			for (var i = 0; i < qitems.length; i++) {
				if (!itemmap.containsKey(qitems[i].id)) {
					itemmap.put(qitems[i].id, qitems[i].id);
					var index = qitems[i].id;
					var name = $("chk_" + index).value;
					var label = $("chk_" + index).getAttribute("ilabel");
					var tableName = $("chk_" + index)
							.getAttribute("itableName");
					var type = $(index + "_type").value;
					var param = $(index + "_param").value;
					var mode = $(index + "_mode").value;
					str += "<item name=\"" + name + "\" label=\"" + label
							+ "\" tableName=\"" + tableName + "\" type=\""
							+ type + "\" param=\"" + param + "\" mode=\""
							+ mode + "\"></item>\n";
				}
			}

		}
		str += "</query-item>\n";

		var qitem1s = A("idiv", "qresultitem");
		str += "<result-item>\n";
		if (qitem1s && qitem1s.length > 0) {

			for (var i = 0; i < qitem1s.length; i++) {
				if (!itemmap.containsKey(qitem1s[i].id)) {
					itemmap.put(qitem1s[i].id, qitem1s[i].id);
					var index = qitem1s[i].id;
					var name = $("chk1_" + index).value;
					var label = $("chk1_" + index).getAttribute("ilabel");
					var tableName = $("chk1_" + index)
							.getAttribute("itableName");
					var param = $(index + "_param2").value;
					str += "<item name=\"" + name + "\" tableName=\""
							+ tableName + "\" label=\"" + label + "\" param=\""
							+ param + "\"></item>\n";
				}
			}

		}
		str += "</result-item>\n";
		
		var qitem1s = A("idiv", "qrestraintitem");
		str += "<restraint-item>\n";
		if (qitem1s && qitem1s.length > 0) {
			for (var i = 0; i < qitem1s.length; i++) {
				var index = qitem1s[i].getAttribute("index");
				if ($("chk3_" + index).checked) {
					var name = $("chk3_" + index).value;
					var tableName = $("chk3_" + index)
							.getAttribute("itableName");
					var param = $(index + "_param3").value;
					var mode = $(index + "_mode3").value;

					str += "<item name=\"" + name + "\" tableName=\""
							+ tableName + "\" param=\"" + param + "\" mode=\""
							+ mode + "\"></item>\n";
				}
			}

		}
		str += "</restraint-item>\n";

		str += "</query>\n";
		str += "</object-query>";

		D("xmlscript").value = str;

		document.form1.action = context
				+ "/system/object.do?method=savequeryset";
		document.form1.submit();
	}
}

/**
 * 修改查询项设置
 */
function handleUpdate() {
	if (confirm("确定提交")) {
		var qkey = D("qkey").value;
		var str = "<object-query>\n";
		str += "<query ID=\"" + qkey + "\">\n";

		var qobject = D("object").value;
		var qname = D("qname").value;
		var qdesc = D("qdesc").value;
		var queryurl = D("queryurl").value;
		var qresulturl = D("qresulturl").value;
		var qpurview = D("qpurview").value;
		var qpurviewname = D("qpurviewname").value;
		var qsession = D("qsession").checked ? D("qsession").value : "0";
		var qhinsert = D("qhinsert").checked ? D("qhinsert").value : "no";
		var qhview = D("qhview").checked ? D("qhview").value : "no";
		var qhupdate = D("qhupdate").checked ? D("qhupdate").value : "no";
		var qhdelete = D("qhdelete").checked ? D("qhdelete").value : "no";
		var qhpurview = D("qhpurview").checked ? D("qhpurview").value : "no";
		var qhexport = D("qhexport").checked ? D("qhexport").value : "no";
		var qhcopy = D("qhcopy").checked ? D("qhcopy").value : "no";
		var qcreatestime = D("qcreatestime").value;
		var qcreateetime = D("qcreateetime").value;

		str += "<name>" + qname + "</name>\n";
		str += "<object>" + qobject + "</object>\n";
		str += "<queryurl>" + queryurl + "</queryurl>\n";
		str += "<resulturl>" + qresulturl + "</resulturl>\n";
		str += "<desc>" + qdesc + "</desc>\n";
		str += "<purview>" + qpurview + "</purview>\n";
		str += "<purview-name>" + qpurviewname + "</purview-name>\n";
		str += "<session>" + qsession + "</session>\n";
		str += "<createstime>" + qcreatestime + "</createstime>\n";
		str += "<createetime>" + qcreateetime + "</createetime>\n";

		str += "<handle-item>";
		str += "<insert>" + qhinsert + "</insert>\n";
		str += "<view>" + qhview + "</view>\n";
		str += "<update>" + qhupdate + "</update>\n";
		str += "<delete>" + qhdelete + "</delete>\n";
		str += "<purview>" + qhpurview + "</purview>\n";
		str += "<export>" + qhexport + "</export>\n";
		str += "<copy>" + qhcopy + "</copy>\n";
		str += "</handle-item>";

		var qitems = A("idiv", "qitem");
		str += "<query-item>\n";
		if (qitems && qitems.length > 0) {

			for (var i = 0; i < qitems.length; i++) {
				if (!itemmap.containsKey(qitems[i].id)) {
					itemmap.put(qitems[i].id, qitems[i].id);
					var index = qitems[i].id;
					var name = $("chk_" + index).value;
					var label = $("chk_" + index).getAttribute("ilabel");
					var tableName = $("chk_" + index)
							.getAttribute("itableName");
					var type = $(index + "_type").value;
					var param = $(index + "_param").value;
					var mode = $(index + "_mode").value;
					str += "<item name=\"" + name + "\" label=\"" + label
							+ "\" tableName=\"" + tableName + "\" type=\""
							+ type + "\" param=\"" + param + "\" mode=\""
							+ mode + "\"></item>\n";
				}
			}

		}
		str += "</query-item>\n";

		var qitem1s = A("idiv", "qresultitem");
		str += "<result-item>\n";
		if (qitem1s && qitem1s.length > 0) {

			for (var i = 0; i < qitem1s.length; i++) {
				if (!itemmap.containsKey(qitem1s[i].id)) {
					itemmap.put(qitem1s[i].id, qitem1s[i].id);
					var index = qitem1s[i].id;
					var name = $("chk1_" + index).value;
					var label = $("chk1_" + index).getAttribute("ilabel");
					var tableName = $("chk1_" + index)
							.getAttribute("itableName");
					var param = $(index + "_param2").value;
					str += "<item name=\"" + name + "\" tableName=\""
							+ tableName + "\" label=\"" + label + "\" param=\""
							+ param + "\"></item>\n";
				}
			}

		}
		str += "</result-item>\n";

		var qitem1s = A("idiv", "qrestraintitem");
		str += "<restraint-item>\n";
		if (qitem1s && qitem1s.length > 0) {

			for (var i = 0; i < qitem1s.length; i++) {
				var index = qitem1s[i].getAttribute("index");
				if ($("chk3_" + index).checked) {
					var name = $("chk3_" + index).value;
					var tableName = $("chk3_" + index)
							.getAttribute("itableName");
					var param = $(index + "_param3").value;
					var mode = $(index + "_mode3").value;

					str += "<item name=\"" + name + "\" tableName=\""
							+ tableName + "\" param=\"" + param + "\" mode=\""
							+ mode + "\"></item>\n";
				}
			}

		}
		str += "</restraint-item>\n";

		str += "</query>\n";
		str += "</object-query>";

		D("xmlscript").value = str;

		document.form1.action = context
				+ "/system/object.do?method=updatequeryset";
		document.form1.submit();
	}
}

/**
 * 删除查询项设置
 */
function handleDel(id) {
	if (confirm("确定删除")) {
		document.form1.action = context
				+ "/system/object.do?method=removequeryset&id=" + id;
		document.form1.submit();
	}
}

/**
 * 编辑查询项设置
 * 
 * @param {}
 *            id
 */
function handleEdit(id) {
	var url = context + "/system/object.do?method=editqueryset&id=" + id;
	window.location.href = url;
}

function handlePurview() {
	var url = context + "/system/role.do?method=selectlist&type=radio";
	dialog(url, true, "数据访问权限设置", 600, 300);
}

function setParameter(id, name, key) {
	D("qpurview").value = key;
	D("qpurviewname").value = name;
}

var tp;
var contentStr;

function selectQueryItem(_tp) {
	var title;
	tp = _tp;
	if (!contentStr) {
		contentStr = $('tablehtml').innerHTML;
		$('tablehtml').innerHTML = "";
	}

	if (tp == "query") {
		title = "查询项定义";
	} else if (tp == "result") {
		title = "显示项定义";
	}

	var objPos = mousePosition(event);
	showMessageBox(title, contentStr, objPos, 350);

	resetItem();
	checkedItem(tp);
	// dialogX($('tablehtml'), true, title, 560, 300);
}

function resetItem() {
	var items = A("what", "item");
	for (var i = 0; i < items.length; i++) {
		items[i].checked = false;
	}
}

function checkedItem(tp) {
	var items = A("what", "item");
	for (var i = 0; i < items.length; i++) {
		if ($(tp + "_" + items[i].getAttribute("tname") + "_" + items[i].value)) {
			items[i].checked = true;
		}
	}
}

function handleSelItem() {
	var items = A("what", "item");
	for (var i = 0; i < items.length; i++) {
		var itemid = tp + "_" + items[i].getAttribute("tname") + "_"
				+ items[i].value;
		if (items[i].checked
				&& !$(tp + "_" + items[i].getAttribute("tname") + "_"
						+ items[i].value)) {

			if (tp == "query") {
				var bindObject = document.createElement("div");
				bindObject.id = itemid;
				bindObject.setAttribute("idiv", "qitem");
				bindObject.className = "DragBox";
				bindObject.style.cssText = "BORDER: #cccccc 1px solid;width:200px;float:left;";

				var sp = '';
				sp += '<img src="' + context
						+ '/system/object/images/delete.png"';
				sp += ' onclick="javascript:removeItem(\'' + itemid
						+ '\');" title="删除">';
				sp += '<input type="hidden" id="chk_' + itemid + '" ilabel="'
						+ items[i].getAttribute("ilabel") + '" ';
				sp += 'itableName="' + items[i].getAttribute("tname")
						+ '" value="' + items[i].value + '"> ';
				sp += items[i].getAttribute("ilabel") + '<br>&nbsp;查询项类型&nbsp;';
				sp += '<select iname="qitemtype" name="itype_' + itemid
						+ '" id="' + itemid + '_type"></select><br>';
				sp += '&nbsp;初始参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				sp += '<input type="text" class="box3" style="width:100px;" id="'
						+ itemid + '_param" name="iparam" ';
				sp += 'value=""> <br>';
				sp += '&nbsp;比较方式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				sp += '<select iname="qitemmode" name="imode_' + itemid
						+ '" id="' + itemid + '_mode"></select>';

				bindObject.innerHTML = sp;

				$("DragContainer1").appendChild(bindObject);

				script4wordbookselect("query-item-type", "", "itype_" + itemid);
				script4wordbookselect("compare-mode", "", "imode_" + itemid);

				CreateDragContainer($("DragContainer1"));
			} else if (tp == "result") {
				var bindObject = document.createElement("div");
				bindObject.id = itemid;
				bindObject.setAttribute("idiv", "qresultitem");
				bindObject.className = "DragBox";
				bindObject.style.cssText = "BORDER: #cccccc 1px solid;width:200px;float:left;";

				var sp = '';
				sp += '<img src="' + context
						+ '/system/object/images/delete.png"';
				sp += ' onclick="javascript:removeItem(\'' + itemid
						+ '\');" title="删除">';
				sp += '<input type="hidden" id="chk1_' + itemid + '" ilabel="'
						+ items[i].getAttribute("ilabel") + '" ';
				sp += 'itableName="' + items[i].getAttribute("tname")
						+ '" value="' + items[i].value + '"> ';
				sp += items[i].getAttribute("ilabel") + '<br>';
				sp += '&nbsp;译词参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				sp += '<input type="text" class="box3" style="width:100px;" id="'
						+ itemid + '_param2" name="iparam2" ';
				sp += 'value=""> <br>';

				bindObject.innerHTML = sp;

				$("DragContainer2").appendChild(bindObject);

				CreateDragContainer($("DragContainer2"));
			}
		}
	}

	closeWindow();
}

function removeItem(id) {
	if ($(id)) {
		$(id).removeNode(true);
	}
}