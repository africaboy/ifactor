// window.onload = init4diy;
// window.onunload = cleanwindow;

var ititle;

document.write("<script src=\"" + context
		+ "/system/workflow/js/initdoc.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/workflow/js/inityj.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/workflow/js/initnumber.js\"></script>");

/**
 * 表单初始化函数
 */
function init4window() {
	initobject();
	inittitle();
	initbutton();
	inithelper();
	createHidden("returnURL", "");

	if (view4diy == "yes") {
		eval(objkey + "_();");
	} else if (view4diy == "no") {

	}
}

function cleanwindow() {
	// event.returnValue="确定放弃？";
}

function initlabel() {
	var h1 = document.createElement("h1");
	h1.innerText = objname;
	document.forms[0].insertBefore(h1, document.forms[0].childNodes[0]);
}

function initbutton() {
	// var buttondiv = document.createElement("div");
	// buttondiv.id = "buttondiv";
	// buttondiv.className = "divn";
	// buttondiv.style.cssText = "width:1000px;align:right";
	var str = "";
	if (!readonly) {
		str += "<button type=\"button\" onClick=\"javascript:handleSubmit();\" title=\"保存当前内容\"><img src=\""
				+ context + "/system/object/images/save.gif\"/>保 存</button>";
		// var str = "<input type=\"button\" class=\"button0\" name=\"button1\"
		// value=\" 保 存 \" onclick=\"javascript:handleSubmit();\">&nbsp;";
		/*
		 * if (action == "edit") { str += "<button type=\"button\"
		 * onclick=\"javascript:handleDelete();\" title=\"删除当前内容\"><img src=\"" +
		 * context + "/system/object/images/delete.png\"/>删 除</button>"; str += "<button
		 * type=\"button\" onclick=\"javascript:handlePurview();\"
		 * title=\"对当前信息进行访问权限设置\"><img src=\"" + context +
		 * "/system/object/images/purview.png\"/>授 权</button>"; str += "<button
		 * type=\"button\" onclick=\"javascript:handleCopy();\"
		 * title=\"创建对象信息副本\"><img src=\"" + context +
		 * "/system/object/images/copy.png\"/>复 制</button>"; // str += "<input
		 * type=\"button\" class=\"button0\" name=\"button1\" // value=\" 进入流转 \"
		 * onclick=\"javascript:handleFlow();\">&nbsp;"; }
		 */
	}

	str += "<button type=\"button\" onclick=\"javascript:handleBack();\" title=\"返回上一操作\"><img src=\""
			+ context + "/system/object/images/back.png\"/>返 回</button>";
	str += "<button type=\"button\" onclick=\"javascript:buttonMore();\" title=\"更多操作\"><img src=\""
			+ context + "/system/object/images/print.png\"/>更多操作</button>";
	// str += "<input type=\"button\" class=\"button0\" name=\"button1\"
	// value=\" 返 回 \" onclick=\"javascript:window.history.back(-1);\">";

	// buttondiv.innerHTML = str;
	if ($("plsz")) {
		$("plsz").innerHTML = str;
	} else {
		var buttondiv = document.createElement("div");
		buttondiv.id = "buttondiv";
		buttondiv.className = "divn";
		buttondiv.innerHTML = str + "<br><br>";

		document.forms[0].insertBefore(buttondiv,
				document.forms[0].childNodes[1]);
	}
	// document.forms[0].insertBefore(buttondiv,
	// document.forms[0].childNodes[1]);
}

function buttonMore() {
	var msg = "";
	if (action == "edit") {
		msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:handleDelete();closeWindow();\" title=\"删除当前内容\">删 除</div>";

		msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:handlePurview();closeWindow();\" title=\"对当前信息进行访问权限设置\">授 权</div>";

		msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:handleCopy();\" title=\"创建对象信息副本\">复 制</div>";
	}
	msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:handlePrint(1);closeWindow();\" title=\"打印当前内容\">打 印</div>";

	var objPos = mousePosition(event);
	showMessageBox("更多功能", msg, objPos, 150);
}

/**
 * 表单提交校验函数
 * 
 * @return {}
 */
function checkit() {
	var items = getElementsByAttribute("colneed", "1");
	var rnt = true;
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var ht = $(items[i].name + "_handleType") ? $(items[i].name
					+ "_handleType").value : "0";
			if (items[i].type == "text" && ht == "2") {
				if (isblank(items[i])) {
					alert("请填写" + items[i].getAttribute("collabel"));
					rnt = false;
					break;
				}
			} else if (items[i].type == "textarea" && ht == "2") {
				if (isblank(items[i])) {
					alert("请填写" + items[i].getAttribute("collabel"));
					rnt = false;
					break;
				}
			} else if (items[i].type == "hidden" && ht == "2") {
				if (items[i].getAttribute("special") == "yijian") {
					var yj = findYJ(items[i].name);
					if (yj == "") {
						alert("请填写" + items[i].getAttribute("collabel"));
						rnt = false;
						break;
					}
				} else if (items[i].getAttribute("special") == "file") {
					if (allannex == 0) {
						alert("请上传" + items[i].getAttribute("collabel"));
						rnt = false;
						break;
					}
				}
			} else if (items[i].type == "select-one") {
				if (items[i].value == "") {
					alert("请选择" + items[i].getAttribute("collabel"));
					rnt = false;
					break;
				}
			} else if (items[i].type == "checkbox" && ht == "2") {
				if (!items[i].checked) {
					alert("请选择" + items[i].getAttribute("collabel"));
					rnt = false;
					break;
				}
			} else if (items[i].type == "radio" && ht == "2") {
				if (!items[i].checked) {
					alert("请选择" + items[i].getAttribute("collabel"));
					rnt = false;
					break;
				}
			}
		}
	}

	if (rnt) {
		rnt = checkNumber();
		handleCheckbox();
	}
	return rnt;
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
 * 处理checkbox值提交
 */
function handleCheckbox() {
	var checkboxs = T("checkbox");

	for (var i = 0; i < checkboxs.length; i++) {
		var ht = $(checkboxs[i].name + "_handleType") ? $(checkboxs[i].name
				+ "_handleType").value : "2";

		if (ht == 2 && !checkboxs[i].checked) {
			var tname = checkboxs[i].name;
			checkboxs[i].name = tname + "_";

			createHidden(tname, "");
		}
	}
}

/**
 * 初始化标题
 */
function inittitle() {
	var items = getElementsByAttribute("special", "title");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			ititle = items[i];
			break;
		}
	}
}

/**
 * 初始化日期选择
 */
function initdate() {
	var items = getElementsByAttribute("special", "date");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var ht = D(items[i].name + "_handleType").value;
			if (ht == 2) {
				items[i].readonly = true;
				/*
				 * items[i].onclick = function() { HS_setDate(this); };
				 */
				items[i]
						.setAttribute("onclick", "javascript:HS_setDate(this);");
			}
		}
	}
}

/**
 * 初始化部门/用户选择
 */
function initselect() {
	var items = getElementsByAttribute("special", "select");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var ht = D(items[i].name + "_handleType").value;
			if (ht == 2) {
				items[i].readonly = true;
				/*
				 * items[i].onclick = function() { };
				 */
				items[i].setAttribute("onclick",
						"javascript:handleSelect(this);");
			}

		}
	}
}

var thizzObj;

/**
 * 选择部门人员
 */
function handleSelect(thizz) {
	/* 当前操作名称 */
	var defaultIds = "";
	thizzObj = thizz;
	nowoper = "select4diy";
	var url = context
			+ "/system/tree.do?method=selectgroupall&type=checkbox&defaultnode="
			+ defaultIds;
	dialog(url, true, "选择部门/人员", 300, 350);
}

function responseResult(ids, names, types) {
	try {
		eval("responseResult4" + nowoper + "('" + ids + "','" + names + "','"
				+ types + "')");
	} catch (error) {
		alert("选择树回调函数执行出现异常,请检查函数['responseResult4" + nowoper + "']的正确性");
	}
}

/* 操作回调函数(函数名称为responseResult4 + nowoper) */
function responseResult4select4diy(ids, names, types) {
	var idx = thizzObj.getAttribute("index");
	/*
	 * document.getElementById(thizzName + "_" + idx).value = names;
	 * document.getElementById(thizzID + "_" + idx).value = ids;
	 */
	thizzObj.value = names;
	closeDialog();
}

/**
 * 初始化意见签署
 */
function init4yijian() {
	var items = getElementsByAttribute("special", "yijian");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var areaid = createYijianArea(items[i]);
			initYJ(items[i].name, areaid);
		}
	}
}

/**
 * 创建意见签署区域
 * 
 * @param {}
 *            obj
 * @return {}
 */
function createYijianArea(obj) {
	var div = document.createElement("div");
	div.id = obj.name + "area";
	div.style.cssText = "HEIGHT: 50px; VERTICAL-ALIGN: top;";
	rootSibling = obj.nextSibling;
	obj.parentNode.insertBefore(div, rootSibling);
	return div.id;
}

/**
 * 初始化编号
 */
function init4number() {
	var items = getElementsByAttribute("number", "1");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var whobj = items[i];
			var wnobjname = whobj.getAttribute("numbere");
			if (wnobjname == null || !D(wnobjname)) {
				alert("没有定义用于存放文号的文本框");
			} else {
				var wnobj = D(wnobjname);

				loadnumber(whobj, defaultnumber, wnobj);
			}

		}
	}
}

/**
 * 初始化加载数据字典类别
 */
function init4wordbook() {
	var items = T("select-one", null);
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var whobj = items[i];
			var wnobjname = whobj.getAttribute("number");
			var wnobjwbtype = whobj.getAttribute("numbere");
			if (wnobjname && wnobjwbtype && wnobjname == "0"
					&& wnobjwbtype != "") {
				var defaultValue = D(whobj.name + "_temp") ? D(whobj.name
						+ "_temp").value : "";
				script4wordbookselect(wnobjwbtype, defaultValue, whobj.name,
						true);
			}
		}
	}
}

/**
 * 处理多数据表技术器
 */
function handleMultiTableCounter() {
	/* 收集多处理数据项信息 */
	if (multiTables.length > 0) {
		for (var i = 0; i < multiTables.length; i++) {
			var tmp = multiTables[i].split(",");
			/* 多数据处理关联表 */
			var tbname = tmp[0];
			/* 多数据处理计数器 */
			var ctname = tmp[1];
			/* 多数据计数返回值 */
			var ct = "";
			/* 当前存在的数据项 */
			var ctitem = document.getElementsByName(tbname + "_item_count");
			for (var j = 0; j < ctitem.length; j++) {
				/* 记录数据项编号 */
				ct += ctitem[j].value + ",";
			}

			/* 多数据处理计数器赋值 */
			$(ctname).value = ct;
		}
	}
}

/** 保存操作 */
function handleSubmit() {
	if (checkit() && confirm("确定提交")) {
		ope = true;
		createHidden("objkey", objkey);

		if (!ititle || objname == "") {
			createHidden("oname", objectname + "(" + tdate1 + ")");
		} else if (ititle && ititle.value == "") {
			createHidden("oname", objectname + "(" + tdate1 + ")");
		} else if (ititle && ititle.value != "") {
			createHidden("oname", ititle.value);
		}

		handleMultiTableCounter();

		if (action == "neu") {
			createHidden("okey", objkey);
			createHidden("ocreatorid", userid);
			createHidden("ocreatorname", username);
			createHidden("ounitid", groupid);
			createHidden("ounitname", groupname);
			createHidden("ounitnumber", groupnumber);
			document.form1.action = context
					+ "/system/objectcreator.do?method=save&querykey="
					+ querykey + "&returnURL=" + D("returnURL").value;
		} else if (action == "edit") {
			createHidden("okid", objid);
			document.form1.action = context
					+ "/system/objectcreator.do?method=update&querykey="
					+ querykey + "&returnURL=" + D("returnURL").value;
		}
		document.form1.submit();
	}
}

/**
 * 删除当前对象
 */
function handleDelete() {
	if (confirm("确定删除")) {
		document.form1.action = context
				+ "/system/objectcreator.do?method=deleteS&ids=" + objid
				+ "&key=" + objkey + "&querykey=" + querykey;
		document.form1.submit();
	}
}

/**/
function handlePrint(oper) {
	bdhtml = window.document.body.innerHTML;// 获取当前页的html代码
	sprnstr = "<!--startprint" + oper + "-->";// 设置打印开始区域
	eprnstr = "<!--endprint" + oper + "-->";// 设置打印结束区域
	if (bdhtml.indexOf(sprnstr) > -1 && bdhtml.indexOf(eprnstr) > -1) {
		prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); // 从开始代码向后取html
		prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));// 从结束代码向前取html
		window.document.body.innerHTML = prnhtml;
		window.print();
		window.document.body.innerHTML = bdhtml;
	} else {
		alert("未定义特定打印区域,系统将默认打印整个页面内容");
		window.print();
	}
}

function handlePurview() {
	var url = context + "/system/purview.do?method=purview&oid=" + objid
			+ "&otype=object&otable=ISYS_OBJECT&oname=" + objname;
	dialog(url, true, "访问权限设置", 500, 350);
}

/**
 * 复制操作
 */
function handleCopy() {
	var msg = "<div class=\"divn\">副本名称</div>";
	msg += "<div class=\"divn\"><input type=\"text\" class=\"box3\" id=\"_oname\" value=\""
			+ objname + "_副本\"></div>";
	msg += "<div class=\"divn\"><input type=\"button\" class=\"button0\" name=\"_button\" value=\"确 定\" onclick=\"javascript:copyObject($('_oname'));\">&nbsp;";
	msg += "<input type=\"button\" class=\"button0\" name=\"_button1\" value=\"取 消\" onclick=\"javascript:closeWindow();\"></div>";

	var objPos = mousePosition(event);
	showMessageBox("创建表单副本", msg, objPos, 350);
}

/**
 * 复制对象
 * 
 * @param {}
 *            on
 */
function copyObject(on) {
	if (isblank(on)) {
		alert("请输入副本名称");
	} else if (confirm("确定创建表单副本")) {
		paramXML("oname", on.value);
		paramXML("otitle", ititle ? ititle.name : "");
		var url = context + "/system/objectcreator.do?method=copy&id=" + objid;
		var result = sendRequest(url);

		if (result == 1) {
			alert("复制成功");
		} else {
			alert("复制失败");
		}

		closeWindow();
	}
}

/**
 * 返回上一页面
 */
function handleBack() {
	/*
	 * var url = context + "/system/objectcreator.do?method=list&key=" + objkey +
	 * "&querykey=" + querykey; window.location.href = url;
	 */
	window.history.back(-1);
}

/**
 * 设置submit处理后返回的url
 * 
 * @param {}
 *            u
 */
function setReturnURL(u) {
	if (u && trim(u) != "") {
		createHidden("returnURL", u);
	} else {
		createHidden("returnURL", "/ok.jsp");
	}
}