var chk = false;
function checkall(thizz) {
	var chks = document.getElementsByTagName("input");
	for (var i = 0; i < chks.length; i++) {
		if (chks[i].type == "checkbox") {
			chks[i].checked = !chk;
		}
	}

	chk = !chk;
}

/**
 * 批量删除
 */
function handleDelete(querykey) {
	var rnt = false;
	var ids = "";
	var chks = document.getElementsByTagName("input");
	for (var i = 0; i < chks.length; i++) {
		if (chks[i].type == "checkbox" && chks[i].checked) {
			rnt = true;
			ids += chks[i].value + ",";
		}
	}

	if (!rnt) {
		alert("请选择要删除的数据");
	} else if (confirm("确定删除")) {
		createHidden("ids", ids.substring(0, ids.length - 1));
		document.form1.action = context
				+ "/system/objectcreator.do?method=deleteS&querykey="
				+ querykey;
		document.form1.submit();
	}
}

var okey;
var oqueryid;

function queryset(id, key) {
	oqueryid = id;
	okey = key;
	var url = context + "/system/objectcreator.do?method=queryset&id=" + id;
	dialog(url, false, "数据查询", 500, 300);
}

function query(key, id) {
	document.form1.action = context
			+ "/system/objectquery.do?key=" + okey + "&querykey="
			+ oqueryid;
	document.form1.submit();
}

function handleInsert(querykey) {
	var url = context + "/system/objectcreator.do?method=neu&key="
			+ D("key").value + "&querykey=" + querykey;
	window.location.href = url;
}

function handleEdit(purview, id, name, querykey, thizz) {
	if (purview == 2) {
		var url = context + "/system/objectcreator.do?method=edit&id=" + id
				+ "&querykey=" + querykey;
		window.location.href = url;
	} else if (purview == 1) {
		var url = context + "/system/objectcreator.do?method=view&id=" + id
				+ "&querykey=" + querykey;
		thizz.href = url;
		thizz.target = "_blank";
		thizz.click;
		// window.location.href = url;
	} else {
		alert("您没有查看权限");
	}

	// top.dialog(url,true,"编辑用户信息",700,500);
}

/**
 * 初始化查询设置页面查询项参数
 */
function initqueryset() {
	var items = A("item", "query");
	for (var i = 0; i < items.length; i++) {
		eval("var obj = parent.form1." + items[i].name);
		if (obj) {
			items[i].value = obj.value;
		}
	}

}

/**
 * 初始化数据列表页面查询项参数
 */
function initobjectlist() {
	initqueryparam();
}

/**
 * 数据查询操作
 */
function handleQuery() {
	document.form1.action = context
			+ "/system/objectquery.do?key=" + okey + "&querykey="
			+ oqueryid;
	document.form1.submit();
}

/**
 * 设置查询项参数待执行查询操作
 */
function setqueryitem() {
	if (checkNumber()) {
		var items = A("item", "query");
		for (var i = 0; i < items.length; i++) {
			eval("var obj = parent.form1." + items[i].name);
			if (obj) {
				obj.value = items[i].value;
			}
		}

		parent.handleQuery();
	}
}

/**
 * 检查数字类型的表单项值
 * 
 * @return {}
 */
function checkNumber() {
	var rnt = true;
	var items = document.getElementsByTagName("input");
	for (var i = 0; i < items.length; i++) {
		if ((items[i].getAttribute("coltype") == "integer" || items[i]
				.getAttribute("coltype") == "long")
				&& !isblank(items[i]) && !isinteger(items[i])) {
			alert(items[i].getAttribute("collabel") + "需要填写数字类型的数据(不可带小数位)");
			rnt = false;
			break;
		} else if ((items[i].getAttribute("coltype") == "double" || items[i]
				.getAttribute("coltype") == "float")
				&& !isblank(items[i]) && !isfloat(items[i])) {
			alert(items[i].getAttribute("collabel") + "需要填写数字类型的数据(可带小数位)");
			rnt = false;
			break;
		}
	}

	return rnt;
}

/**
 * 关闭查询项设置页面
 */
function _closeDialog() {
	parent.closeDialog();
}

var currentTD;

function handleOrder(thizz, orderbykey, querykey, key, orderby) {
	/*
	 * var img;
	 * 
	 * if (!$("imgorderby")) { img = document.createElement("IMG"); img.id =
	 * "imgorderby"; img.src = context + "/system/object/images/desc.gif";
	 * 
	 * thizz.appendChild(img);
	 * 
	 * currentTD = thizz;
	 * 
	 * createHidden("orderby", "ASC"); } else { if (currentTD == thizz) { if
	 * ($("imgorderby").src.indexOf("desc.gif") > -1) { $("imgorderby").src =
	 * context + "/system/object/images/asc.gif";
	 * 
	 * createHidden("orderby", "DESC"); } else { $("imgorderby").src = context +
	 * "/system/object/images/desc.gif";
	 * 
	 * createHidden("orderby", "ASC"); } } else { $("imgorderby").src = context +
	 * "/system/object/images/desc.gif";
	 * 
	 * currentTD = thizz;
	 * 
	 * createHidden("orderby", "ASC"); }
	 * 
	 * thizz.appendChild($("imgorderby")); }
	 */
	if (orderby == "") {
		createHidden("orderby", "DESC");
	} else if (orderby == "DESC") {
		createHidden("orderby", "ASC");
	} else if (orderby == "ASC") {
		createHidden("orderby", "DESC");
	}

	var url = context + "/system/objectquery.do?key=" + key
			+ "&querykey=" + querykey + "&pageNO=" + D("pageNO").value;

	createHidden("orderbykey", orderbykey);

	document.form1.action = url;
	document.form1.submit();
}

var selobject;

/**
 * 组织结构树选择
 * 
 * @param {}
 *            thizz
 * @param {}
 *            tp
 */
function selectGU(thizz, tp) {
	selobject = thizz;
	var url = context + "/system/tree.do?method=selectgrouptree&type=radio";
	dialog(url, true, "组织机构", 300, 400);
}

/**
 * 选择返回值
 * 
 * @param {}
 *            ids
 * @param {}
 *            names
 * @param {}
 *            types
 */
function responseResult(ids, names, types) {
	// document.getElementById(_id).value = ids.replace("g", "");
	// document.getElementById(_name).value = names;
	selobject.value = names;
	closeDialog();
}

/**
 * 初始化checkbox,radio类型的查询项
 * 
 * @param {}
 *            wbtype
 * @param {}
 *            defaultvalue
 * @param {}
 *            selarea
 * @param {}
 *            selname
 * @param {}
 *            notresetsel
 * @param {}
 *            rad
 */
function initwordbook4checkbox(wbtype, defaultvalue, selarea, selname,
		notresetsel, rad) {
	var selobj;

	if (!$(selarea) && !D(selarea)) {
		alert("未找到字典数据项容器['" + selname + "']");
	} else {
		/* 查询项容器 */
		if ($(selarea)) {
			selobj = $(selarea);
		} else if (D(selarea)) {
			selobj = D(selarea);
		}

		var url = context + "/system/wbutil.do?method=staticloadwblist&wbname="
				+ wbtype;

		var result = trim(sendRequest(url));

		var wblist = result != "" ? result.split(";") : null;
		var str = "";

		/* 父窗口与该查询项对应的实例 */
		eval("var obj = parent.form1." + selname);

		/* 设置父窗口与该查询项对应的实例值为默认值 */
		if (obj) {
			defaultValue = obj.value;
		}

		var rad_ = rad ? rad : "checkbox";

		/* 数据字典项赋值 */
		if (wblist) {
			for (var i = 0; i < wblist.length; i++) {
				if (wblist[i] != "") {
					var item = wblist[i];
					var itemstr = item.split(",");
					var id = itemstr[0];
					var name = itemstr[1];

					var checked = "";

					if (rad_ == "checkbox" && defaultValue != "") {
						checked = (defaultValue + ",").indexOf(id + ",") > -1
								? "checked"
								: "";
					} else if (rad_ == "radio" && defaultValue != "") {
						checked = id == defaultValue ? "checked" : "";
					}

					str += "&nbsp;<input type=\"" + rad_ + "\" " + checked
							+ " name=\"" + selname + "_\" value=\"" + id
							+ "\" onclick=\"checkThizz(this, '" + selname
							+ "');\">&nbsp;" + name;
					// selobj.appendChild(newCheckbox);
				}
			}

		}
		/* 自定义赋值 */
		else {
			var checked = wbtype == defaultValue ? "checked" : "";

			str += "<input type=\"" + rad_ + "\" " + checked + " name=\""
					+ selname + "_\" value=\"" + wbtype
					+ "\" onclick=\"checkThizz(this, '" + selname + "');\">";
		}

		selobj.innerHTML = str;
	}
}

/**
 * checkbox,radio查询项选择值处理
 * 
 * @param {}
 *            thizz
 * @param {}
 *            name
 */
function checkThizz(thizz, name) {
	/* radio类型,选中则直接赋值 */
	if (thizz.type == "radio" && thizz.checked) {
		D(name).value = thizz.value;
	}
	/* checkbox类型,选中则累加赋值 */
	else if (thizz.type == "checkbox" && thizz.checked) {
		/* 初始赋值 */
		if (isblank(D(name))) {
			D(name).value = thizz.value;
		}
		/* 累加赋值 */
		else if (trim(thizz.value) != "") {
			D(name).value += "," + thizz.value;
		}
	}
	/* checkbox类型,取消选中则去除赋值 */
	else if (thizz.type == "checkbox" && !thizz.checked) {
		/* 已进行累加赋值 */
		if (D(name).value.indexOf(",") > -1) {
			var result = "";
			var str = D(name).value.split(",");
			for (var i = 0; i < str.length; i++) {
				/* 累加有效的赋值 */
				if (str[i] != thizz.value) {
					result += str[i] + ",";
				}
			}
			/* 有效的累加赋值 */
			D(name).value = result.substring(0, result.length - 1);
		} else {
			D(name).value = "";
		}
	}
}

/**
 * 数据导出
 */
function handleExport(querykey, key){
	if(confirm("确定导出数据")){
		inithelper();
		
		document.form1.action = context + "/system/objectcreator.do?method=exportlist&key=" + key + "&querykey=" + querykey;
		document.form1.target = "helper";
		document.form1.submit();
	}
}