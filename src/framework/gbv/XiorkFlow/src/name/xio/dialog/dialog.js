// Simple Dialog
var bIsCatchFlyBar = false;
var dragClickX = 0;
var dragClickY = 0;

var url = "";
var nowobj;
var objs = new Array();

function mousey() {
	var myobj = document.getElementById("divFlyBar");
	var bodyww = document.body.clientWidth;
	var objww = myobj.clientWidth;
	var y = (bodyww - objww) / 2;
	return y < 0 ? 50 : y;
}

function mousex() {
	var myobj = document.getElementById("divFlyBar");
	var bodyhh = document.body.clientHeight;
	var objhh = myobj.clientHeight;
	x = (bodyhh - objhh) / 2;
	return x < 0 ? 50 : x;
}

function dialog4submit(u, rnt, title, width, height) {
	width = width == null ? "300" : width;
	height = height == null ? "400" : height;

	if (!document.getElementById("divFlyBar")) {
		initDialog(width, height);
	}

	document.getElementById("tableMain").width = width;
	document.getElementById("tableMain").height = height;

	openFlyBar(mousex(), mousey());
	document.getElementById("title").innerHTML = title;

	var str = '<iframe name="ss" id="ss" frameborder="0" width="100%" height="'
			+ height + '" scrolling="auto" src="'
			+ XiorkFlowWorkSpace.BASE_PATH + 'blank.html"></iframe>';
	document.getElementById("flyTailerHolder1").style.display = "none";
	document.getElementById("flyTailerHolder").style.display = "block";
	document.getElementById("flyTailerHolder").innerHTML = str;
	document.forms[0].target = "ss";

	document.forms[0].action = u;

	/*
	 * if (rnt && confirm("确定提交")) { document.forms[0].submit(); } else {
	 * document.forms[0].submit(); }
	 */
	document.forms[0].submit();
}

function dialog(u, rnt, title, width, height) {
	width = width == null ? "300" : width;
	height = height == null ? "400" : height;

	if (!document.getElementById("divFlyBar")) {
		initDialog(width, height);
	}

	document.getElementById("tableMain").width = width;
	document.getElementById("tableMain").height = height;

	openFlyBar(mousex(), mousey());
	document.getElementById("title").innerHTML = title;

	var defaulturl = XiorkFlowWorkSpace.BASE_PATH + "blank.html";

	if (rnt || url == "") {
		url = u;

		var str = '<iframe name="ss" id="ss" frameborder="0" width="100%" height="'
				+ height + '" scrolling="auto" src="' + url + '"></iframe>';
		document.getElementById("flyTailerHolder1").style.display = "none";
		document.getElementById("flyTailerHolder").style.display = "block";
		document.getElementById("flyTailerHolder").innerHTML = str;
	}
}

function dialogN(u, rnt, title, width, height) {
	width = width == null ? "300" : width;
	height = height == null ? "400" : height;

	if (!document.getElementById("divFlyBar")) {
		initDialog(width, height);
	}

	document.getElementById("tableMain").width = width;
	document.getElementById("tableMain").height = height;

	openFlyBar(mousex(), mousey());
	document.getElementById("title").innerHTML = title;

	if (rnt || url == "") {
		url = u;
		var str = '<iframe name="ss" id="ss" frameborder="0" width="100%" height="'
				+ height + '" scrolling="auto" src="' + url + '"></iframe>';
		document.getElementById("flyTailerHolder1").style.display = "none";
		document.getElementById("flyTailerHolder").style.display = "block";
		document.getElementById("flyTailerHolder").innerHTML = str;
	}
}

function dialogX(o, rnt, title, width, height) {
	width = width == null ? "300" : width;
	height = height == null ? "400" : height;

	/*
	 * 不存在窗口
	 */
	if (!document.getElementById("divFlyBar")) {
		/* 初始化窗口 */
		initDialog(width, height);
		openFlyBar(mousex(), mousey());
	}

	/* 窗口隐藏 */
	if (document.getElementById("divFlyBar").style.display == "none") {
		document.getElementById("divFlyBar").style.display = "block";
	}

	document.getElementById("tableMain").width = width;
	document.getElementById("tableMain").height = height;
	document.getElementById("title").innerHTML = title;

	document.getElementById("flyTailerHolder1").style.display = "block";
	document.getElementById("flyTailerHolder").style.display = "none";

	var temp;

	if (!document.getElementById("tempdiv")) {
		temp = document.createElement('div');
		temp.id = "tempdiv";
		temp.style.overflow = "auto";
		temp.style.height = height;
		temp.style.paddingleft = "5px";
		temp.style.paddingright = "5px";
		temp.style.paddingtop = "5px";
		temp.style.paddingbottom = "5px";
	} else {
		temp = document.getElementById("tempdiv");
	}

	if (nowobj && nowobj != o.id) {
		document.getElementById(nowobj).style.display = "none";
		document.forms[0].insertBefore(document.getElementById(nowobj),
				document.forms[0].childNodes[0]);
		nowobj = o.id;
		o.style.display = "block";

	} else if (!nowobj) {
		nowobj = o.id;
		o.style.display = "block";
	}
	temp.appendChild(o);
	// objs.push(o.id);

	document.getElementById("flyTailerHolder1").appendChild(temp);
}

function containsObj(id) {
	var r = false;
	for (var i = 0; i < objs.length; i++) {
		if (objs[i] == id) {
			r = true;
			break;
		}
	}

	return r;
}

function closeDialog() {
	HideFlyBar();
}

function HideFlyBar() {
	divFlyBar.style.display = "none";
}

function openFlyBar(x, y) {
	myload_flybar(x, y);
	divFlyBar.style.display = "block";
}
function catchFlyBar(e) {
	bIsCatchFlyBar = true;
	var x = event.x + document.body.scrollLeft;
	var y = event.y + document.body.scrollTop;
	dragClickX = x - divFlyBar.style.pixelLeft;
	dragClickY = y - divFlyBar.style.pixelTop;
	divFlyBar.setCapture();
	document.onmousemove = moveFlyBar;
}
function releaseFlyBar(e) {
	bIsCatchFlyBar = false;
	divFlyBar.releaseCapture();
	document.onmousemove = null;
}
function moveFlyBar(e) {
	if (bIsCatchFlyBar) {
		divFlyBar.style.left = event.x + document.body.scrollLeft - dragClickX;
		divFlyBar.style.top = event.y + document.body.scrollTop - dragClickY;
	}
}
function myload_flybar(x, y) {
	divFlyBar.style.top = x;
	divFlyBar.style.left = y;
	// divFlyBar.style.top=document.body.scrollTop;
	// divFlyBar.style.left=document.body.offsetWidth-divFlyBar.clientWidth-30+document.body.scrollLeft;
}

// window.onresize = myload_flybar;
// window.onscroll = myload_flybar;
// window.onload = openFlyBar;
// end fly bar
function initDialog(width, height) {
	var str = '';

	str += '<div id=divFlyBar onMouseUp="releaseFlyBar()" style="position:absolute;top:0;left:1;display:block;cursor:move;z-index:99">';
	str += '<table id=tableMain style="background-color:#bec9d6;" width="'
			+ width + '" height="' + height
			+ '" border="0" cellspacing="1" cellpadding="0">';
	str += '<tr><td onMouseDown="catchFlyBar()">';
	str += '<table width="100%" border="0" height="20" cellpadding="0" cellspacing="0">';
	str += '<tr valign="middle">';
	str += '<td>&nbsp;</td>';
	str += '<td style="font-size:12px;color:#000000;font-weight:bold" width=100% align=left>';
	str += '<span id="title">窗口</span>';
	str += '</td>';
	str += '<td align=right valign=top>';
	str += '<span style="width:12;font-size:12;border-width:0px;color:#000000;font-family:webdings;" title="关闭" onmouseover="divFlyBar.style.cursor=\'hand\';" onmouseout="divFlyBar.style.cursor=\'move\';" onclick="javascript:if(true || confirm(\'确定要关闭窗口\')){HideFlyBar();try{catcher();}catch(err){}}">r&nbsp;</span>';
	str += '</td></tr></table></td></tr>';
	str += '<tr id=flyTailerTr name=flyTailerTr>';
	str += '<td style="background-color:#eeeeee;" align=left><div id=flyTailerHolder name=flyTailerHolder></div><div id=flyTailerHolder1 name=flyTailerHolder1></div></td>';
	str += '</tr></table></div>';
	document.body.insertAdjacentHTML("beforeEnd", str);
}