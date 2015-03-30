function initMultiTable(tb, s) {
	for (var i = 0; i < s; i++) {
		addMultiItem(tb);
	}
}

var multiTableInfo = new Array();

/* 解析多数据处理项(分析包含多数据项table中的row中的多数据项) */
function parseMultiItem(tab, c) {
	var table = document.getElementById(tab);

	var td4order = table.getAttribute("order");

	/* 列数 */
	var size = 0;
	for (var i = 0; i < table.rows.length; i++) {
		size = table.rows[0].cells.length;
		break;
	}

	/* 列包含的表单项 */
	var multiItemTemplate = new Array();
	for (var i = 0; i < table.rows[1].cells.length; i++) {
		var tmp = table.rows[1].cells[i].cloneNode(true);
		multiItemTemplate.push(tmp);
	}

	table.rows[1].removeNode(true);

	var tabinfo = new Array();
	/* table id [0] */
	tabinfo.push(table.id);
	/* column size [1] */
	tabinfo.push(size);
	/* row count [2] */
	tabinfo.push(c);
	/* item input template [3] */
	tabinfo.push(multiItemTemplate);
	/* exits order 4 td */
	tabinfo.push(td4order);

	multiTableInfo.push(tabinfo);
}

/* 格式化多数据项(将多数据项id和name加上序列号) */
function formatMultiItem(m_node, c) {
	/* 重组id及name后的表单项innerHTML */
	// m_node = tmp.cloneNode(true);
	var orgOuterHTML = m_node.outerHTML;

	var str = "";
	var i, elm, elements;

	elements = m_node.getElementsByTagName('input');
	for (i = 0, elm; elm = elements.item(i++);) {
		htobj = document.getElementById(elm.name + "_handleType");
		htvalue = htobj ? htobj.value : 2;
		if (htvalue == 1) {
			elm.style.display = "none";
		} else if (htvalue == 2) {
			// do nothing
		}

		outhtml = elm.outerHTML;

		// str += outhtml;
		if (elm.type == "hidden" && elm.getAttribute("special") == "file"
				&& elm.name != "ALLFREE") {
			var filescript = initScriptMultItemOfFile(elm.name + "_" + c, "",
					"", htvalue);

			outhtml = filescript;
		} else {
			outhtml = outhtml.replace("name=" + elm.name, "name=" + elm.name
							+ "_" + c);
			outhtml = outhtml.replace("id=" + elm.id, "id=" + elm.id + "_" + c
							+ " index=" + c);
		}

		var myParent = elm.parentNode;
		myParent.innerHTML = outhtml;
	}

	elements = m_node.getElementsByTagName('select');
	for (i = 0, elm; elm = elements.item(i++);) {
		htobj = document.getElementById(elm.name + "_handleType");
		htvalue = htobj ? htobj.value : 2;
		if (htvalue == 1) {
			elm.style.display = "none";
		} else if (htvalue == 2) {
			// do nothing
		}
		outhtml = elm.outerHTML;

		outhtml = outhtml.replace("name=" + elm.name, "name=" + elm.name + "_"
						+ c);
		outhtml = outhtml.replace("id=" + elm.id, "id=" + elm.id + "_" + c
						+ " index=" + c);
		// str += outhtml;

		var myParent = elm.parentNode;
		myParent.innerHTML = outhtml;
	}

	elements = m_node.getElementsByTagName('textarea');
	for (i = 0, elm; elm = elements.item(i++);) {
		htobj = document.getElementById(elm.name + "_handleType");
		htvalue = htobj ? htobj.value : 2;
		if (htvalue == 1) {
			elm.style.display = "none";
		} else if (htvalue == 2) {
			// do nothing
		}
		outhtml = elm.outerHTML;
		outhtml = outhtml.replace("name=" + elm.name, "name=" + elm.name + "_"
						+ c);
		outhtml = outhtml.replace("id=" + elm.id, "id=" + elm.id + "_" + c
						+ " index=" + c);
		// str += outhtml;

		var myParent = elm.parentNode;
		myParent.innerHTML = outhtml;
	}

	str = m_node.innerHTML;

	m_node.innerHTML = orgOuterHTML;

	return str;
}

/* 添加多数据项增加按钮 */
function addMultiButton(tab) {
	var label = "";
	var table = document.getElementById(tab);
	if (findMultiTableMAddtype(tab) == 2) {
		label += "<a href=\"javascript:addMultiItem('" + table.id
				+ "');\"><img src=\"" + context
				+ "/system/object/images/plus.png\" title=\"增加\"></a>&nbsp;";
	}

	if (findMultiTableMDeltype(tab) == 2) {
		label += "&nbsp;<a href=\"javascript:removeMultiItem('" + table.id
				+ "');\"><img src=\"" + context
				+ "/system/object/images/minus.png\" title=\"删除\"></a>&nbsp;";
	}

	var tinfo = findMultiTableInfoById(tab);
	var row = table.insertRow(0);
	var cel = row.insertCell();

	cel.colSpan = tinfo[1];
	cel.align = "right";
	// cel.style.border = "0px;";

	cel.innerHTML = label;
}

/* 添加多数据项 */
function addMultiItem(tab) {
	var table = document.getElementById(tab);
	var tinfo = findMultiTableInfoById(tab);
	var multiItemTemplate = tinfo[3];
	var c = tinfo[2];
	var td4order = tinfo[4];

	var row = table.insertRow();
	row.id = table.id + "_row_" + c;
	if (findMultiTableMDeltype(tab) == 2) {
		row.title = "单击选中本行/取消选中";
		row.onclick = function() {
			checkThizz(tab, row.id);
		}
	}
	row.className = "tr1";
	row.setAttribute("indexname", tab);
	row.setAttribute("index", c);
	row.setAttribute("checked", "no");

	for (var i = 0; i < tinfo[1]; i++) {
		var cel = row.insertCell();
		cel.className = "td";
		if (td4order == "yes" && i == 0) {
			cel.align = "center";
			cel.innerHTML = "<span itemorder=\"" + tab + "_order\" index=\""
					+ c + "\"></span>";
		} else {
			neuscript = formatMultiItem(multiItemTemplate[i], c);
			/* 添加计数器隐藏域 */
			if (i == tinfo[1] - 1) {
				neuscript += "<input type=\"hidden\" id=\"" + tab
						+ "_item_count\" name=\"" + tab
						+ "_item_count\" value=\"" + c + "\">";
			}
			cel.innerHTML = neuscript;
		}
	}

	c++;

	tinfo[2] = c;

	recountorder(table);
}

/* 删除数据项 */
function removeMultiItem(t) {
	/* 删除成功标识 */
	var r = false;
	/* 多数据表主键 */
	var ky = findMultiTableKey(t);
	/* 所数据表格 */
	var table = document.getElementById(t);
	/* 待删除行数组(行ID) */
	var chkrows = new Array();

	for (var i = 0; i < table.rows.length; i++) {
		chk = table.rows[i].getAttribute("checked");
		if (chk == "yes") {
			chkrows.push(table.rows[i]);
		}
	}
	if (chkrows.length == 0) {
		alert("请选择要删除的内容");
		return;
	}
	if (confirm("确定要删除选定的内容")) {
		for (var i = 0; i < chkrows.length; i++) {
			chk = chkrows[i].getAttribute("checked");
			c = chkrows[i].getAttribute("index");
			id = chkrows[i].id;
			if (chk == "yes") {
				if (document.getElementById(ky + "_" + c)
						&& document.getElementById(ky + "_" + c).value != "") {
					r = deleteItem(t,
							document.getElementById(ky + "_" + c).value);

					if (!r) {
						alert("删除数据项失败");
					}
				} else {
					r = true;
				}

				if (r) {
					chkrows[i].removeNode(true);
				}
			}
		}

		var defaultAddItem = true;

		for (var i = 0; i < table.rows.length; i++) {
			chk = table.rows[i].getAttribute("checked");
			if (chk == "no") {
				defaultAddItem = false;
				break;
			}
		}

		if (defaultAddItem) {
			addMultiItem(t);
		}

		recountorder(table);
	}
}

/* 找到指定multi table的信息 */
function findMultiTableInfoById(id) {
	var result;
	for (var i = 0; i < multiTableInfo.length; i++) {
		var t = multiTableInfo[i];
		if (t[0] == id) {
			result = t;
		}
	}

	return result;
}

/* 找到指定multi table对应的主键名称 */
function findMultiTableKey(id) {
	var keyname = "";
	for (var i = 0; i < multiTables.length; i++) {
		var tmp = multiTables[i].split(",");
		if (tmp[0] == id) {
			keyname = tmp[2];
			break;
		}
	}

	return keyname;
}

/* 找到指定multi table增加权限 */
function findMultiTableMAddtype(id) {
	var tp = "";
	for (var i = 0; i < multiTables.length; i++) {
		var tmp = multiTables[i].split(",");
		if (tmp[0] == id) {
			tp = tmp[3];
			break;
		}
	}

	return tp;
}

/* 找到指定multi table删除权限 */
function findMultiTableMDeltype(id) {
	var tp = "";
	for (var i = 0; i < multiTables.length; i++) {
		var tmp = multiTables[i].split(",");
		if (tmp[0] == id) {
			tp = tmp[4];
			break;
		}
	}

	return tp;
}

/* 真实删除数据项 */
function deleteItem(t, id) {
	var url = context + "/system/objectcreator.do?method=deleteitem&tableName="
			+ t + "&id=" + id;
	var result = trim(sendRequest(url));
	var r = false;

	if (result == "1") {
		r = true;
	}

	return r;
}

/* 选中行 */
function checkThizz(tbid, id) {
	if (window.event.srcElement.parentNode
			&& (window.event.srcElement.parentNode.id == id)) {
		var trO = document.getElementById(id);

		/* checked */
		if (trO.getAttribute("checked") != "yes") {
			trO.style.backgroundColor = "#f1f2f3";
			trO.setAttribute("checked", "yes");
			autoCheckOtherRows(tbid, id, trO.getAttribute("index"), "yes");
		}
		/* unchecked */
		else {
			trO.style.backgroundColor = "#ffffff";
			trO.setAttribute("checked", "no");
			autoCheckOtherRows(tbid, id, trO.getAttribute("index"), "no");
		}
	}
}

/* 自动选择 */
function autoCheckOtherRows(tabid, rowid, index, checktype) {
	var orders = getElementsByAttribute("itemorder", tabid + "_order");

	/* 开始序列号 */
	var sindex = -1;
	var eindex = -1;

	for (var i = 0; i < orders.length; i++) {
		/* 按alt选择row */
		if (event.shiftKey == true && event.srcElement.parentNode
				&& event.srcElement.parentNode.id == rowid) {
			// document.getElementById(tabid).select = false;
			var row = document.getElementById(tabid + "_row_"
					+ orders[i].getAttribute("index"));
			if (row.getAttribute("checked") == checktype && i < index) {
				sindex = i;
				eindex = index;
				break;
			} else if (row.getAttribute("checked") == checktype && i > index) {
				sindex = index;
				eindex = i;
				break;
			}
		}
	}

	if (sindex > -1) {
		if (sindex < eindex && (eindex - sindex) > 1) {
			for (var i = sindex + 1; i < eindex; i++) {
				autoCheckThizz(tabid, tabid + "_row_"
								+ orders[i].getAttribute("index"), checktype);
			}
		}
	}
}

/* 自动选中行 */
function autoCheckThizz(tbid, id, checktype) {
	var trO = document.getElementById(id);
	if (checktype == "yes") {
		trO.style.backgroundColor = "#f1f2f3";
		trO.setAttribute("checked", "yes");
	} else if (checktype == "no") {
		trO.style.backgroundColor = "#f1f2f3";
		trO.setAttribute("checked", "no");
	}
}

/* 序号排列 */
function recountorder(tb) {
	var tinfo = findMultiTableInfoById(tb.id);
	var td4order = tinfo[4];

	if (tb && td4order == "yes") {
		var orders = getElementsByAttribute("itemorder", tb.id + "_order");

		for (var i = 0; i < orders.length; i++) {
			orders[i].innerHTML = (i + 1);
			var row = document.getElementById(tb.id + "_row_"
					+ orders[i].getAttribute("index"));
			row.setAttribute("index", i);
		}
	}
}

/* 处理 */
function handleItemType(elm, value, c) {
	var it = document.getElementById(elm.name + "_handleType_" + c);

	var ht = it ? it.value : "2";
	if (!it) {
		// alert("表单中缺少多数据项定义");
	}

	initElement(elm, value, ht);
}