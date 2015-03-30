var layer;
var mousex;
var mousey;

function handleYJ(item, label) {
	if (event) {
		mousex = event.clientX;
		mousey = event.clientY;
	}

	/* aid,stepid,userid,yj,sign,date */
	var yj = findYJ(item);

	var _aid = "";
	var _stepid = "";
	var _userid = "";
	var _yj = "";
	var _sign = "";
	var _date = "";
	var yjlabel = "";

	if (yj != "") {
		var s = yj.split(",");
		_aid = s[0];
		_stepid = s[1];
		_userid = s[2];
		_yj = s[3];
		_sign = s[4];
		_date = s[5];

		if (_yj != "") {
			yjlabel += _yj;
		}

		if (_userid != userid) {
			_aid = "";
			_stepid = "";
			_userid = "";
			_yj = "";
			_sign = "";
			_date = "";
			yjlabel = "";
		}
	} else {
		_sign = username;
	}

	var str = "<div id='yjdiv' style='border:0px solid #cccccc;background:#ffffff'>";
	str += "<table border='0' class='tab-noborder' width='100%'>";
	str += "<tr><td width='60%'>";
	str += "常用意见&nbsp;<select name='cyyj' onchange='javascript:$(\"yjtemp\").value=this.value;'>";
	str += "<option value=''></option>";
	str += "<option value='同意' " + (_yj == "同意" ? "selected" : "")
			+ ">同意</option>";
	/*str += "<option value='拟同意' " + (_yj == "拟同意" ? "selected" : "")
			+ ">拟同意</option>";*/
	str += "<option value='不同意' " + (_yj == "不同意" ? "selected" : "")
			+ ">不同意</option>";
	str += "</select>";
	str += "</td><td align='right' width='40%'>";
	str += "<img style=\"cursor:hand;\" title=\"签署意见\" src='"
			+ context
			+ "/system/workflow/images/right.gif' onclick=\"javascript:setYJ('"
			+ item
			+ "','"
			+ label
			+ "',$('yjtemp'),$('grqz'));closeWindow();\" alt='签署'>";
	str += "&nbsp;&nbsp;</td>";
	// str += "<td><input type='text' style='display:none;' id='grqz'
	// value='"+_sign+"' class='box3'>"
	// str += "&nbsp;<input type='button' style='display:none;' name='buttond'
	// value='签字' class='button0'
	// onclick='$(\"grqz\").value=username'></td>"
	str += "</tr>";
	str += "<tr><td colspan='2'>";
	str += "<input type='hidden' id='grqz' value='" + _sign + "'>";
	str += "<textarea id='yjtemp' style='width:98%;height:100px;' class='box1'>"
			+ yjlabel + "</textarea>";
	str += "</td></tr>";
	str += "</table>";
	str += "</div>";

	// popdialog("签署审核意见",str,false,420,150);
	// dialogX($("yjdiv"),true,"签署意见",250,250);
	/*layer = LayerUtil.createLayer(str);
	layer.viewLayer(true, mousex, mousey);*/
	var objPos = mousePosition(event);
	showMessageBox("签署意见", str, objPos, 350);
}

function handleSign() {
	if ($("grqz").value == "") {
		$("grqz").value = username;
	} else {
		$("grqz").value = "";
	}
}

/* 设置意见 */
function setYJ(item, label, yjtemp, grqz) {
	if (trim(yjtemp.value) != "" || trim(grqz.value) != "") {
		/* aid,stepid,userid,yj,sign,date */
		var yj = "[" + aid + "," + stepid + "," + userid + ","
				+ trim(yjtemp.value).replace(/,/g, "，") + "," + trim(grqz.value) + ","
				+ tdate + ", " + groupshortlabel + "]";

		if (findYJ(item)) {
			$(item).value = resetYJ(item, yj);
		} else {
			if (isblank($(item))) {
				$(item).value += yj;
			} else {
				$(item).value += "&" + yj;
			}
		}
	}
	
	var str = preInitYJ(item);

	var _div = document.createElement("div");
	_div.className = "divn";
	_div.innerHTML = str;
	
	if(($(label).firstChild)){
	     $(label).removeChild($(label).firstChild);
	}
	
	$(label).appendChild(_div);

	closeWindow();
}

/* 重新设置意见结果 */
function resetYJ(item, yj) {
	var result = "";
	/* 当前环节曾签署意见 */
	var r = false;
	var tempyj;
	var yjstrs = $(item).value;
	if (yjstrs != "") {
		tempyj = yjstrs.split("&");
		for (var i = 0; i < tempyj.length; i++) {
			var str = tempyj[i].substring(1, tempyj[i].length - 1);
			if (str.split(",")[1] == stepid) {
				/* 替换原意见 */
				tempyj[i] = yj;
				r = true;
				break;
			}
		}
	}

	if (!r) {
		/* 追加意见 */
		result = yjstrs + "&" + yj;
	} else {
		/* 重新组织意见 */
		for (var i = 0; i < tempyj.length; i++) {
			if (i == tempyj.length - 1) {
				result += tempyj[i];
			} else {
				result += tempyj[i] + "&";
			}
		}
	}
	return result;
}

/* 设置预先意见内容 */
function preInitYJ(item) {
	var result = "";
	/* 操作方式 */
	var ht = $(item + "_handleType").value;
	/* 非隐藏 */
	if (ht != 0) {
		var yjstrs = $(item).value;

		if (yjstrs != "") {
			var yj = yjstrs.split("&");
			for (var i = 0; i < yj.length; i++) {
				var str = yj[i].substring(1, yj[i].length - 1);

				var s = str.split(",");

				var yjlabel = (trim(s[6]) == "" ? "" : "&nbsp;" + (s[6] + ":"))
						+ s[3] + "-" + s[4] + "(" + s[5] + ")";

				if (i == yj.length - 1) {
					result += yjlabel + "<br>";
				} else {
					result += yjlabel + "<br>";
				}
			}
		}
	}

	return result;
}

/* 初始化意见内容 */
function initYJ(item, label, w, h) {
	/* 操作方式 */
	var ht = $(item + "_handleType").value;

	if (ht == "-1") {
		fitElementLabel(item);
	}
	/* 非隐藏 */
	else if (ht != -1) {
		if ($(item + "_label")) {
			$(item + "_label").style.display = "none";
		}

		if (ht == 1) {
			var bindObject = document.createElement("span");
			var str = "<img title=\"签署意见\" id=\"" + item
					+ "_button\" style=\"cursor:hand;\" ";
			str += "src=\"" + context + "/system/workflow/images/setyj.png\"";
			str += "onclick=\"javascript:handleYJ('" + item + "','" + label
					+ "');\">";
			bindObject.innerHTML = str;
			$(item).parentNode.appendChild(bindObject);
		}

		var bindObject = document.createElement("div");
		bindObject.id = item + "area";
		// bindObject.style.height = "50px";
		$(item).parentNode.appendChild(bindObject);

		var yjstrs = $(item).value;
		
		var yjlables = '';
		
		if (yjstrs != "") {
			var yj = yjstrs.split("&");
			for (var i = 0; i < yj.length; i++) {
				var str = yj[i].substring(1, yj[i].length - 1);

				var s = str.split(",");

				var yjlabel = (trim(s[6]) == "" ? "" : "" + (s[6] + ":"))
						+ s[3] + "-" + s[4] + "(" + s[5] + ")";

				var d = document.createElement("<div>");
				d.className = "divn";
				d.innerHTML = yjlabel;
				$(label).appendChild(d);
				
				yjlables += yjlabel + '@';
			}
		}
		
		createHidden(item + '_showlabel', (yjlables.indexOf('@') > -1 ? yjlables.substring(0, yjlables.length - 1) : ''));
	}
}

/* 找到当前环节意见 */
function findYJ(item) {
	var result = "";
	var yjstrs = $(item).value;
	if (yjstrs != "") {
		var yj = yjstrs.split("&");
		for (var i = 0; i < yj.length; i++) {

			var str = yj[i].substring(1, yj[i].length - 1);

			if (str.split(",")[1] == stepid && str.split(",")[2] == userid) {
				result = str;
				break;
			}
		}
	}

	return result;
}