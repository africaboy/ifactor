var nowNumber;
var nowNumberType;
var nowPrefix;
var nowNumberid;

/**
 * 初始化文号
 * 
 * @param {}
 *            bh 文号流水号容器
 */
function initNumber(bh) {
	/* 编号 */
	var insNumberStr = getInstanceNumber();

	if (insNumberStr == "") {
		var result = getnumber(defaultnumber, '', tyear, '');
		setNumber(result, bh, defaultnumber, tyear);
	} else {
		setNumber(insNumberStr.split(",")[1], bh, insNumberStr.split(",")[0],
				insNumberStr.split(",")[2]);
	}

}

/**
 * 重新设置文号(选择改变文号类别)
 * 
 * @param {}
 *            thizz
 * @param {}
 *            bh
 */
function reinitNumber(thizz, bh) {
	callbacknumber();

	var result = getnumber(thizz.value, '', D('bhyearSelect').value, '');
	setNumber(result, bh, thizz.value, D('bhyearSelect').value);
}

/**
 * 重新设置文号(选择改变文号年)
 * 
 * @param {}
 *            thizz
 * @param {}
 *            bh
 */
function reinitNumber1(thizz, bh) {
	callbacknumber();

	var result = getnumber(D('bhtypeSelect').value, '', thizz.value, '');
	setNumber(result, bh, D('bhtypeSelect').value, thizz.value);
}

/**
 * 设置文号
 * 
 * @param {}
 *            result 文号
 * @param {}
 *            bh 文号容器
 * @param {}
 *            numberid 文号类型
 */
function setNumber(result, bh, numberid, prefix) {
	nowNumberid = numberid;
	nowPrefix = prefix;
	
	if (result != "") {
		numberA = result;

		nowNumber = "[" + prefix + "]" + result;

		var txt = result;
		txt += "&nbsp;<img src=\""
				+ context
				+ "/system/workflow/images/setyj.png\" style=\"cursor:hand;\" alt=\"修改文号\" onclick=\"editNumber('"
				+ bh.name + "','" + nowNumber + "', '" + numberid + "');\">";

		var bhtypeSelect = '<select id="bhtypeSelect" name="bhtypeSelect" onChange="javascript:reinitNumber(this, D(\''
				+ bh.name + '\'));" name="bhtypeSelect">';

		var bhtypeName = '';

		for (var i = 0; i < numbers.length; i++) {
			var id = numbers[i][0];
			var vlu = numbers[i][1];
			var selected = (numberid == id ? 'selected' : '');
			bhtypeSelect += '<option value="' + id + '" ' + selected + '>'
					+ vlu + '</option>';
			if (numberid == id) {
				bhtypeName = vlu;
			}
		}
		bhtypeSelect += '</select>';

		var bhyearSelect = '&nbsp;[<select id="bhyearSelect" name="bhyearSelect" onChange="javascript:reinitNumber1(this, D(\''
				+ bh.name + '\'));">';
		bhyearSelect += '<option value="2010" '
				+ (prefix == '2010' ? 'selected' : '') + '>2010</option>';
		bhyearSelect += '<option value="2011" '
				+ (prefix == '2011' ? 'selected' : '') + '>2011</option>';
		bhyearSelect += '<option value="2012" '
				+ (prefix == '2012' ? 'selected' : '') + '>2012</option>';
		bhyearSelect += '</select>]&nbsp;';

		var bhInput = '<input type="text" id="bhInput" name="bhInput" value="'
				+ result + '">';

		$(bh.name + "_label").innerHTML = bhtypeSelect + bhyearSelect + txt;

		bh.value = bhtypeName + " [" + $('bhyearSelect').value
				+ "] " + result;
	} else {
		$(bh.name + "_label").innerHTML = "";
		bh.value = "";
	}
}

/**
 * 回收当前使用的编号
 * 
 */
function callbacknumber() {
	if (numberA != "0") {
		var url = context + "/system/flow.do?method=callbacknumber&sequence="
				+ sequenceA + "&number=" + numberA + "&numberid=" + nowNumberid;
		sendRequest(url);
	}
}

/**
 * 获取编号
 * 
 * @param {}
 *            key
 * @param {}
 *            num
 * @param {}
 *            prefix
 * @param {}
 *            suffix
 * @return {}
 */
function getnumber(numberid, num, prefix, suffix) {
	url = context + "/system/flow.do?method=getnumber&sequence=" + sequenceA
			+ "&numberid=" + numberid + "&prefix=" + prefix + "&number=" + num
			+ "&suffix=" + suffix;
	var result = trim(sendRequest(url));
	if (result == "-1") {
		alert("初始化文件编号失败");
	} else {
		numberA = result;
	}
	return result;
}

/**
 * 获取当前实例文号
 * 
 * @return {}
 */
function getInstanceNumber() {
	url = context + "/system/flow.do?method=getInstanceNumber&sequence="
			+ sequenceA + "&size=6";
	var result = trim(sendRequest(url));
	if (result == "-1") {
		alert("初始化文件编号失败");
		result = "";
	}
	return result;
}

/**
 * 加载文号
 * 
 * @param {}
 *            obj 文号类型select
 * @param {}
 *            vl 默认文号类型
 */
function loadnumber(obj) {
	var handleType = $(obj.name + "_handleType").value;

	if (handleType == 1) {
		/* 编号 */
		initNumber(obj);
	} else if (handleType == 0) {
		var bindObject = document.createElement("span");
		$(obj.name + "_label").innerHTML = obj.value;
		// obj.disabled = true;
	}
}

/* 校验文号 */
function checknumber(numberid, num, prefix, suffix) {
	var r = false;
	var url = context + "/system/flow.do?method=checknumber&numberid="
			+ numberid + "&prefix=" + prefix + "&number=" + num + "&suffix="
			+ suffix + "&sequence=" + sequenceA;
	var result = trim(sendRequest(url));
	if (result == 1) {
		r = true;
	} else {
		alert("文号已被占用");
	}

	return r;
}

/**
 * 归还编号
 * 
 * @param {}
 *            num 文号流水
 * @param {}
 *            numberid 文号类型
 * @return {}
 */
function repaynumber(num, numberid) {
	var r = false;
	var url = context + "/system/flow.do?method=repaynumber&numberid="
			+ numberid + "&number=" + num + "&sequence=" + sequenceA;
	var result = trim(sendRequest(url));
	if (result == 1) {
		r = true;
	} else {
		alert("归还文号失败");
	}

	return r;
}

/**
 * 编辑文号
 * 
 * @param {}
 *            s 文号流水号容器name
 * @param {}
 *            nb 当前文号
 * @param {}
 *            numberid 文号类型
 */
function editNumber(s, nb, numberid) {
	var txt = "<input style=\"width:70px;\" type=\"text\" id=\"myEditNumber\" name=\"myEditNumber\" value=\""
			+ nb.substring(nb.indexOf("]") + 1) + "\">";
	txt += "&nbsp;<img src=\""
			+ context
			+ "/system/workflow/images/reset.png\" style=\"cursor:hand;\" alt=\"使用新文号\" onclick=\"selfEditNumber('"
			+ s + "', $('myEditNumber'), '" + numberid + "');\">";
	$(s + "_label").innerHTML = txt;
	$(s).value = '';
	// $("myEditNumber").focus();
}

/**
 * 自定义文号
 * 
 * @param {}
 *            s 文号流水号容器name
 * @param {}
 *            nb 当前文号
 * @param {}
 *            numberid 文号类型
 */
function selfEditNumber(s, thizz, numberid) {
	if (!isnumber(thizz)) {
		alert("文号必须由阿拉伯数字组成");
		thizz.focus();
		$(s).value = '';
	} else if (Number(thizz.value)
			- Number(nowNumber.substring(nowNumber.indexOf("]") + 1)) > 100) {
		alert("新文号过大（间隔不能超过100）");
		thizz.focus();
		$(s).value = '';
	} else if (isblank(thizz)) {
		alert("请输入自定义文号");
		thizz.focus();
		$(s).value = '';
	} else if (trimme(thizz).length > 6) {
		alert("文号长度不能大于六位");
		thizz.focus();
		$(s).value = '';
	} else if (trimme(thizz).length < 6) {
		alert("文号长度不能小于六位，不足位数请用'0'补齐");
		thizz.focus();
		$(s).value = '';
	} else if (!checknumber(numberid, trimme(thizz), nowPrefix, "")) {
		/* 自定义文号但文号无效 */
		thizz.focus();
		$(s).value = '';
	} else {
		if (lockNumber(numberid, trimme(thizz), tyear, "")) {
			callbacknumber();
			setNumber(thizz.value, $(s), numberid);
			numberA = thizz.value;
		}

	}
}

/**
 * 锁定文号
 * 
 * @param {}
 *            number
 * @param {}
 *            numberid
 * @param {}
 *            prefix
 * @param {}
 *            suffix
 */
function lockNumber(numberid, num, prefix, suffix) {
	var r = false;
	var url = context + "/system/flow.do?method=locknumber&numberid="
			+ numberid + "&prefix=" + prefix + "&number=" + num + "&suffix="
			+ suffix + "&sequence=" + sequenceA;
	var result = trim(sendRequest(url));
	if (result == 1) {
		r = true;
	} else {
		alert("文号锁定失败");
	}

	return r;
}