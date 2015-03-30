var OnMyDocOpened = false;



function initZW(item, doc) {
	/* 操作方式 */
	if (!$(item)) {
		alert("未发现正文表单项'" + item + "',无法初始化正文控件");
		return;
	}

	var ht = $(item + "_handleType").value;

	doctype = ht;

	if (!$(item + "area")) {
		var bindObject = document.createElement("div");
		bindObject.id = item + "area";
		bindObject.align = "center";
		$(item).parentNode.appendChild(bindObject);
	}
	if (ht == 0) {
		if (docid != 0) {
			var str = "查阅正文 <img alt=\"查阅正文\" style=\"cursor:hand;\" id=\"docimg\" src=\""
					+ context
					+ "/system/workflow/images/doc.png\" onclick=\"javascript:viewDocument('"
					+ item + "');\">";

			var bindObject = document.createElement("span");
			bindObject.id = doc;
			bindObject.innerHTML = str;
			$(item + "area").appendChild(bindObject);
		}
	} else if (ht == 1) {
		var str = "编辑正文 <img alt=\"编辑正文\" style=\"cursor:hand;\" id=\"docimg\" src=\""
				+ context
				+ "/system/workflow/images/doc.png\" onclick=\"javascript:editDoc('"
				+ item + "');\">";

		var bindObject = document.createElement("span");
		// bindObject.id = doc;
		bindObject.innerHTML = str;
		$(item + "area").appendChild(bindObject);
	}
}

function alertZW() {
	alert("没有定义正文");
}

function openDoc() {
	OnMyDocOpened = true;
}

function closeDoc() {
	OnMyDocOpened = false;
}

/**
 * 查阅正文
 * 
 * @param {}
 *            docid 正文ID
 */
function viewDocument(itemName) {
	if (docid != "0") {
		var url = context + "/system/workflow/doc.jsp";
		
		var tableName = $(itemName + '_Table').value;

		var args = new Array();
		args[0] = (context + defaultDocTemp);
		args[1] = docid;
		args[2] = sequenceA;
		args[3] = itemName;
		args[4] = tableName;
		args[5] = '0';
		args[6] = red;
		args[7] = (context + defaultDocHeaderTemp);
		args[8] = (context + defaulDocFooterTemp);
		args[9] = document;
		args[10] = stamp;
		args[11] = username;
		var result = window
				.showModalDialog(
						url,
						args,
						"dialogWidth:800px;dialogHeight:600px;center:yes;help:no;scroll:no;status:no;resizable:yes;");

	} else {
		alert("没有定义正文");
	}
}

/**
 * 获取正文ID
 * 
 * @return {}
 */
function getDocId() {
	if (docid == "0") {
		var url = context + "/system/annex.do?method=get&oid=" + sequenceA
				+ "&oname=WF_INSTANCE";
		var id = sendRequest(url);
		return id;
	}

	return docid;
}

function useDoc(doc) {
	// var obj = $("dsoframer");
	// obj.Open(template4doc, true);

	var url = context + "/system/flowmanage.do?method=selectdoctemp&gid="
			+ document.form1.gid.value;
	dialog(url, false, "", 300, 400);
}

function setDocTemp(temp) {
	var obj = $("dsoframer");
	obj.Open(temp, true);

	closeDialog();
}

function editDoc(itemName) {
	OnMyDocOpened = true;

	var tableName = $(itemName + '_Table').value;

	if (docid == 0) {
		neuDocument(itemName, tableName);
	} else {
		editDocument(itemName, tableName);
	}
}

/**
 * 新建文档
 * 
 * @param {}
 *            doc
 */
function neuDocument(itemName, tableName) {
	var url = context + "/system/workflow/doc.jsp";

	var args = new Array();
	args[0] = (context + defaultDocTemp);
	args[1] = docid;
	args[2] = sequenceA;
	args[3] = itemName;
	args[4] = tableName;
	args[5] = '1';
	args[6] = red;
	args[7] = (context + defaultDocHeaderTemp);
	args[8] = (context + defaulDocFooterTemp);
	args[9] = document;
	args[10] = stamp;
	args[11] = username;
	var result = window
			.showModalDialog(
					url,
					args,
					"dialogWidth:800px;dialogHeight:600px;center:yes;help:no;scroll:no;status:no;resizable:yes;");
	docid = result;
}

/**
 * 套红
 */
/*function taohong() {
	var docHeader = serverPath + context
			+ '/application/changdangfawen/red/head.doc';
	var docFooter = serverPath + context
			+ '/application/changdangfawen/red/foot.doc';

	// 文件头部插入文件
	obj.InSertFile(context + defaultDocHeaderTemp, 1);
	// 文件尾部插入文件
	obj.InSertFile(context + defaulDocFooterTemp, 2);
}*/

/**
 * 编辑文档
 * 
 * @param {}
 *            doc
 */
function editDocument(itemName, tableName) {
	var url = context + "/system/workflow/doc.jsp";

	var args = new Array();
	args[0] = (context + defaultDocTemp);
	args[1] = docid;
	args[2] = sequenceA;
	args[3] = itemName;
	args[4] = tableName;
	args[5] = '1';
	args[6] = red;
	args[7] = (context + defaultDocHeaderTemp);
	args[8] = (context + defaulDocFooterTemp);
	args[9] = document;
	args[10] = stamp;
	args[11] = username;

	var result = window
			.showModalDialog(
					url,
					args,
					"dialogWidth:800px;dialogHeight:600px;center:yes;help:no;scroll:no;status:no;resizable:yes;");
	docid = result;
}

function deletedoc() {
	if (docid != "0") {
		var url = context + "/system/annex.do?method=delete&id=" + docid;
		sendRequest(url);
	}

	try {
		document.getElementById('WebOfficeObj').Close();
	} catch (ex) {
	}
}

function hassavedoc() {
	return true;
}

function loadTemplate() {
}