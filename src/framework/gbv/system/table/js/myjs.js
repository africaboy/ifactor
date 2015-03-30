function handleSubmit() {
	if (isblank(D("tname"))) {
		alert("请定义表名称");
	} else if (countitem()) {

		clipboardData.setData('Text', tablescript);
		alert("表结构信息已经复制,请粘贴到注册文件中");

	}
}

var tablescript;

function countitem() {
	var rnt = true;
	var countMN = "";
	var str = "";

	for (var i = 0; i < DragContainer1.childNodes.length; i++) {
		/* ID of div */
		var oid = DragContainer1.childNodes[i].id;
		/* ID of item */
		oid = oid.substring(oid.indexOf("_") + 1, oid.length);

		if (isblank(D("iname_" + oid))) {
			alert("请设置字段名称");
			D("iname_" + oid).focus();
			rnt = false;
			break;
		}

		var iname = trim(D("iname_" + oid).value);
		var idesc = trim(D("idesc_" + oid).value);
		var itype = trim(D("itype_" + oid).value);

		if (!isinteger(D("isize_" + oid)) || (D("isize_" + oid).value <= 0)) {
			alert("请设置正确的字段大小(正整数定义)");
			D("isize_" + oid).focus();
			rnt = false;
			break;
		}

		var isize = trim(D("isize_" + oid).value);
		var ikey = D("ikey_" + oid).checked ? "yes" : "no";
		var idefault = trim(D("idefault_" + oid).value);
		var inotnull = D("inotnull_" + oid).checked ? "yes" : "no";
		var iauto = D("iauto_" + oid).checked ? "yes" : "no";

		if (isblank(D("ifname_" + oid))) {
			alert("请设置字段表单域名称");
			D("ifname_" + oid).focus();
			rnt = false;
			break;
		}

		var ifname = trim(D("ifname_" + oid).value);
		var iftname = trim(D("iftname_" + oid).value);
		var ifiname = trim(D("ifiname_" + oid).value);

		str += "<column>\n";
		str += "<name>" + iname + "</name>\n";
		str += "<description>" + idesc + "</description>\n";
		str += "<type>" + itype + "</type>\n";
		str += "<length>" + isize + "</length>\n";
		if (D("ikey_" + oid).checked) {
			str += "<primary>" + ikey + "</primary>\n";
		}
		if (D("inotnull_" + oid).checked) {
			str += "<not-null>" + inotnull + "</not-null>\n";
		}
		if (D("iauto_" + oid).checked) {
			str += "<auto-increment>" + iauto + "</auto-increment>\n";
		}
		if (idefault != "") {
			str += "<default-value>" + idefault + "</default-value>\n";
		}
		str += "<form-name>" + ifname + "</form-name>\n";

		if (!isblank(D("iftname_" + oid)) && !isblank(D("ifiname_" + oid))) {
			str += "<foreign>\n";
			str += "<referencing-table>" + iftname + "</referencing-table>\n";
			str += "<referencing-column>" + ifiname + "</referencing-column>\n";
			str += "</foreign>\n";
		}

		str += "</column>\n";

	}

	if (rnt && str == "") {
		alert("请增加字段定义");
		rnt = false;
	}

	if (rnt) {
		// tablescript = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
		// tablescript += "<annotate>\n";
		tablescript = "<table name=\"" + D("tname").value + "\" description=\""
				+ D("tdesc").value + "\">\n"
		tablescript += str;
		tablescript += "</table>\n";
	}

	return rnt;
}

function displayTr(thizz) {
	if (thizz.style.display == "block") {
		thizz.style.display = "none";
	} else {
		thizz.style.display = "block";
	}
}
