var XMLstr = "";

function $(id) {
	var o = ("string" == typeof id ? document.getElementById(id) : id);

	if (!o) {
		o = D(id);
	}

	return o;
}

function D(id) {
	var obj = eval("document.form1." + id);
	if (!obj) {
		// alert("未发现元素["+id+"]");
	}

	return obj;
}

function A(aAttribute, aValue, abody) {
	return getElementsByAttribute(aAttribute, aValue, abody);
}

function T(tp, area) {
	return getElementsByType(tp, area);
}

function sendRequest(url) {
	var xmlhttp = document.all
			? new ActiveXObject("Msxml2.XMLHTTP")
			: new XMLHttpRequest();
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader('x-requested-with', 'XMLHttpRequest');
	if (XMLstr != '') {
		var allXMLstr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		allXMLstr += "<root>";
		allXMLstr += XMLstr;
		allXMLstr += "</root>";
		xmlhttp.setRequestHeader("Content-Type", "text/xml");
		xmlhttp.setRequestHeader("Content-Type", "UTF-8");
		xmlhttp.send(allXMLstr);
		XMLstr = "";
	} else {
		xmlhttp.send(null);
	}

	if (xmlhttp.getResponseHeader('sessionstatus') == 'timeout') {
		invalidSession.process();

		return '';
	}
	return xmlhttp.responseText;
}

function sendRequestObject(url) {
	var xmlhttp = document.all
			? new ActiveXObject("Msxml2.XMLHTTP")
			: new XMLHttpRequest();
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader('x-requested-with', 'XMLHttpRequest');
	if (XMLstr != '') {
		var allXMLstr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		allXMLstr += "<root>";
		allXMLstr += XMLstr;
		allXMLstr += "</root>";
		xmlhttp.setRequestHeader("Content-Type", "text/xml");
		xmlhttp.setRequestHeader("Content-Type", "UTF-8");
		xmlhttp.send(allXMLstr);
		XMLstr = "";
	} else {
		xmlhttp.send(null);
	}

	if (xmlhttp.getResponseHeader('sessionstatus') == 'timeout') {
		invalidSession.process();

		return '';
	}

	return xmlhttp;
}

function paramXML(key, value) {
	XMLstr += "<param name=\"" + key + "\">" + value + "</param>";
}

function setParam2XML(key, value) {
	XMLstr += "<param name=\"" + key + "\">" + value + "</param>";
}

function getParam2XML() {
	var allXMLstr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
	allXMLstr += "<root>";
	allXMLstr += XMLstr;
	allXMLstr += "</root>";

	XMLstr = "";

	return allXMLstr;
}

/* 2008-09-19 parse to 20080919 */
function parseDate(obj) {
	var s = "";
	if (obj.indexOf("-") > -1) {
		f = obj.substring(0, obj.indexOf("-"));
		m = obj.substring(obj.indexOf("-") + 1, obj.lastIndexOf("-"));
		e = obj.substring(obj.lastIndexOf("-") + 1);
		s = f + m + e;
	}

	if (obj.indexOf(".") > -1) {
		f = obj.substring(0, obj.indexOf("."));
		m = obj.substring(obj.indexOf(".") + 1, obj.lastIndexOf("."));
		e = obj.substring(obj.lastIndexOf(".") + 1);
		s = f + m + e;
	}

	return s;
}

/* 20080919 format to 2008-09-19 */
function formatDate(obj) {
	var s = "";
	if (obj.length >= 8) {
		f = obj.substring(0, 4);
		m = obj.substring(4, 6);
		e = obj.substring(6, 8);
		s = f + "-" + m + "-" + e;
	}

	if (obj.indexOf(".") > -1) {
		f = obj.substring(0, obj.indexOf("."));
		m = obj.substring(obj.indexOf(".") + 1, obj.lastIndexOf("."));
		e = obj.substring(obj.lastIndexOf(".") + 1);
		s = f + "-" + m + "-" + e;
	}

	return s;
}

/* 20080919101010 format to 2008-09-19 10:10:10 */
function formatTime(obj) {
	var s = "";
	if (obj.length >= 14) {
		f = obj.substring(0, 4);
		m = obj.substring(4, 6);
		e = obj.substring(6, 8);
		h = obj.substring(8, 10);
		mm = obj.substring(10, 12);
		ss = obj.substring(12, 14);
		s = f + "-" + m + "-" + e + " " + h + ":" + mm + ":" + ss;
	}

	return s;
}

/**
 * 自然数前面补齐'0'
 */
function patchZero(n) {
	var str = n;
	if (n < 10) {
		str = '0' + n;
	}

	return str;
}

/**
 * 当前日期(中文)
 */
function nowChn() {
	var now = new Date(); // 获取系统日期，即Sun Apr 29 16:41:48 UTC+0800 2007
	var yy = now.getFullYear(); // 获取年，即2007
	var MM = now.getMonth() + 1; // 获取月，即04
	var dd = now.getDate(); // 获取该天的星期值
	// 获取时间
	var hh = now.getHours(); // 获取小时，即16
	var mm = now.getMinutes(); // 获取分钟，即41
	var ss = now.getTime() % 60000; // 获取时间，因为系统中时间是以毫秒计算的，
	// 所以秒要通过余60000得到。
	ss = (ss - (ss % 1000)) / 1000; // 然后，将得到的毫秒数再处理成秒

	return yy + '年' + MM + '月' + dd + '日 ' + hh + '时' + mm + '分' + ss + '秒';
}

/**
 * 当前日期(英文)
 */
function nowEng() {
	var now = new Date(); // 获取系统日期，即Sun Apr 29 16:41:48 UTC+0800 2007
	var yy = now.getFullYear(); // 获取年，即2007
	var MM = now.getMonth() + 1; // 获取月，即04
	var dd = now.getDate(); // 获取该天的星期值

	// 获取时间
	var hh = now.getHours(); // 获取小时，即16
	var mm = now.getMinutes(); // 获取分钟，即41
	var ss = now.getTime() % 60000; // 获取时间，因为系统中时间是以毫秒计算的，
	// 所以秒要通过余60000得到。
	ss = (ss - (ss % 1000)) / 1000; // 然后，将得到的毫秒数再处理成秒

	return yy + '-' + patchZero(MM) + '-' + patchZero(dd) + ' ' + patchZero(hh)
			+ ':' + patchZero(mm) + ':' + patchZero(ss);
}

/**
 * 当前时间()
 * 
 * @return {}
 */
function nowTime() {
	var now = new Date(); // 获取系统日期，即Sun Apr 29 16:41:48 UTC+0800 2007
	var yy = now.getFullYear(); // 获取年，即2007
	var MM = now.getMonth() + 1; // 获取月，即04
	var dd = now.getDate(); // 获取该天的星期值

	// 获取时间
	var hh = now.getHours(); // 获取小时，即16
	var mm = now.getMinutes(); // 获取分钟，即41
	var ss = now.getTime() % 60000; // 获取时间，因为系统中时间是以毫秒计算的，
	// 所以秒要通过余60000得到。
	ss = (ss - (ss % 1000)) / 1000; // 然后，将得到的毫秒数再处理成秒

	return yy + '' + patchZero(MM) + '' + patchZero(dd) + '' + patchZero(hh)
			+ '' + patchZero(mm) + '' + patchZero(ss);
}

/**
 * 当前时间()
 * 
 * @return {}
 */
function nowDate() {
	var now = new Date(); // 获取系统日期，即Sun Apr 29 16:41:48 UTC+0800 2007
	var yy = now.getFullYear(); // 获取年，即2007
	var mm = now.getMonth() + 1; // 获取月，即04
	var dd = now.getDate(); // 获取该天的星期值

	return yy + '' + patchZero(mm) + '' + patchZero(dd);
}

/**
 * 当前月
 * 
 * @return {}
 */
function nowMonth() {
	var now = new Date(); // 获取系统日期，即Sun Apr 29 16:41:48 UTC+0800 2007
	var yy = now.getFullYear(); // 获取年，即2007
	var mm = now.getMonth() + 1; // 获取月，即04

	return yy + '' + patchZero(mm);
}

/* trim object.value */
function trimme(obj) {
	return obj.value.replace(/(^\s*)|(\s*$)/g, '');
}

function trim(str) {
	/* trim value */
	return 'string' == typeof str ? str.replace(/(^\s*)|(\s*$)/g, '') : str;
}

function trimDefault(str, dft) {
	/* trim value */
	var tmp = trim(str);
	return trim(str) == '' ? dft : tmp;
}

/* check value is "" */
function isblank(obj) {
	if (trimme(obj) == "") {
		return true;
	}
	return false;
}

/* is number */
function isnumber(obj) {
	if (isblank(obj))
		return false;
	if (/^\d+$/.test(trim(obj.value))) {
		return true;
	} else {
		return false;
	}
}

/* is integer */
function isinteger(obj) {
	if (isblank(obj))
		return false;
	if (/^(\+|-)?\d+$/.test(trim(obj.value))) {
		return true;
	} else {
		return false;
	}
}

/* is float */
function isfloat(obj) {
	if (isblank(obj))
		return false;
	if (/^(\+|-)?\d+($|\.\d+$)/.test(trim(obj.value))) {
		return true;
	} else {
		return false;
	}
}

/* create element of 'hidden' */
function createHidden(name, value) {
	if (document.getElementsByName(name).length == 0) {
		/*
		 * var script = "<input type=\"hidden\" id=\"" + name + "\" name=\"" +
		 * name + "\" value=\"" + value + "\">"; var objectName =
		 * document.createElement(script);
		 */
		var objectName = document.createElement('input');
		objectName.setAttribute("type", "hidden");
		objectName.setAttribute("id", name);
		objectName.setAttribute("name", name);
		objectName.setAttribute("value", value);

		document.forms[0].insertBefore(objectName, null);
	} else {
		document.getElementsByName("" + name + "")[0].value = value;
	}
}

/* create element of 'hidden' */
function createHidden4ext(hid, value, extForm) {
	var hid;
	if (Ext.getCmp(name)) {
		hid = Ext.getCmp(name);
		hid.setValue(value);

		return hid;
	} else {
		hid = new Ext.form.Hidden({
					id : hid,
					name : hid,
					value : value
				});
		if (extForm) {
			extForm.add(hid);
		} else {
			alert("not found ext-form, can't creat Ext.form.HiddenField");
		}
	}

	return hid;
}

/* create element of 'hidden',may be repeater hidden */
function McreateHidden(name, value) {
	var script = "<input type=\"hidden\" id=\"" + name + "\" name=\"" + name
			+ "\" value=\"" + value + "\">";
	var objectName = document.createElement(script)
	document.forms[0].insertBefore(objectName);
}

/* create element of 'textarea', its style.display is none */
function createTAHidden(name, value) {
	if (document.getElementsByName(name).length == 0) {
		var script = "<textarea style=\"display:none;\" id=\"" + name
				+ "\" name=\"" + name + "\"></textarea>";
		var objectName = document.createElement(script)
		objectName.value = value;
		document.forms[0].insertBefore(objectName);
	} else {
		document.getElementsByName("" + name + "")[0].value = value;
	}
}

/**/
function findindex(o, v) {
	var r = -1;
	for (var i = 0; i < o.length; i++) {
		if (o[i].value == v) {
			r = i;
			break;
		}
	}

	return r;
}

/* reresh window */
function handleRefresh() {
	window.location.href = window.location.href;
}

function handleBack() {
	try {
		history.go(-1);
	} catch (e) {
		var referurl;
		referurl = document.referrer;
		window.location.href = referurl;
	}
}

function xwin(thizz, url, rnt, title, width, height) {
	window.open(url, "", "location=no,width=" + width + ",height=" + height
					+ ",resizable=yes,status=yes,scrollbars");
}

/* callback when xwin close */
function callbackme(r) {
	if (r) {
		handleRefresh();
	}
}

/* do print */
function doPrint() {
	window.print();
}

/* init login action */
function initLogin(ctx, ip) {
	if (document.forms[0]) {
		document.forms[0].action = ctx + "/system/login.do";
		document.forms[0].onsubmit = function() {
			if (!this.logid) {
				alert("没有定义登录帐号表单项");
				return false;
			} else if (isblank(this.logid)) {
				alert("请填写登录帐号");
				return false;
			} else if (isblank(this.rand)) {
				alert("请输入验证码");
				return false;
			} else {
				return true;
			}
		}
	} else {
		alert("登录页面没有定义form");
	}
}

/* 汉字长度 */
function JHshStrLen(sString) {
	var sStr, iCount, i, strTemp;
	iCount = 0;
	sStr = sString.split("");
	for (i = 0; i < sStr.length; i++) {
		strTemp = escape(sStr[i]);
		if (strTemp.indexOf("%u", 0) == -1) // 表示是汉字
		{
			iCount = iCount + 1;
		} else {
			iCount = iCount + 2;
		}
	}
	return iCount;
}

/* get elements by element's attribute */
function getElementsByAttribute(aAttribute, aValue, abody) {
	var Elements = [], sfunc = 'return Element.' + aAttribute + '=="' + aValue
			+ '"?true:false;';
	SearchElement(!!abody ? abody : document.body);
	return Elements;
	function ElementVerifier(ele) {
		Element = ele;
		if (Element.nodeName == '#text')
			return false;
		return eval('Element.' + aAttribute + '=="' + aValue + '"?true:false;');
	}
	function SearchElement(ele) {
		if (!ele)
			return;
		if (ElementVerifier(ele))
			Elements.push(ele);
		SearchElement(ele.firstChild);
		SearchElement(ele.nextSibling);
	}
}

/**
 * 得到指定类型的元素
 * 
 * @param {}
 *            sTypeValue 类型名称
 * @param {}
 *            oBox 指定区域
 * @return {}
 */
function getElementsByType(sTypeValue, oBox) {
	// 适用于获取某个HTML区块内部同属于某一特定type的所有HTML元素，如:input,script,link等等
	var d = oBox || document;
	var children = d.getElementsByTagName('*') || document.all;
	var elements = new Array();
	for (var ii = 0; ii < children.length; ii++) {
		if (children[ii].type == sTypeValue) {
			elements.push(children[ii]);
		}
	}
	return elements;
}

/* create iframe['helper'] for annex or others */
function inithelper() {
	if (!getFrameDocument("helper")) {
		var ifm = document.createElement("iframe");
		ifm.name = "helper";
		ifm.id = "helper";
		ifm.frameBorder = "0";
		ifm.width = "0";
		ifm.height = "0";
		ifm.src = context + "/system/form.jsp";
		document.body.appendChild(ifm);
	}
}

/**
 * 查看附件
 * 
 * @param {}
 *            id
 */
function viewAnnex(id) {
	if (getFrameDocument("helper")) {
		getFrameDocument("helper").src = context
				+ "/system/annex.do?method=view&id=" + id;
	} else {
		alert("请事先调用函数[inithelper]初始化隐藏iframe以获得操作帮助");
	}
}

/**
 * 删除附件
 * 
 * @param {}
 *            id
 */
function deleteAnnex(id, func) {
	var url = context + "/system/annex.do?method=delete&id=" + id;

	Ext.MessageBox.confirm('提示', '确定删除附件', function(e) {
				if (e == "yes") {
					Ext.MessageBox.wait('删除过程中...');
					Ext.Ajax.request({
								// 请求地址
								url : url,
								// 提交参数组
								form : 'form1',
								scope : 'form1',
								method : 'post',
								// 成功时回调
								success : function(response, options) {
									// 获取响应的json字符串
									Ext.MessageBox.hide();

									var json = response.responseText;
									var o = Ext.util.JSON.decode(json);

									if (o.success) {
										if (func && typeof func == 'function') {
											try {
												func();
											} catch (error) {
												alert('回调函数[\'' + func
														+ '\']调用出现异常');
											}
										}
									} else {
										Ext.Msg.alert('提示', '删除附件出现异常！');
									}
								}
							});
				}
			});
}

/**
 * 选中指定的option
 * 
 * @param {}
 *            selname
 * @param {}
 *            seletedValue
 */
function selectedSelect(selname, seletedValue) {
	var selObj;
	if (D(selname) || $(selname)) {
		selObj = D(selname) ? D(selname) : null;
		if (!selObj) {
			selObj = $(selname) ? $(selname) : null;
		}

		for (var i = 0; i < selObj.length; i++) {
			if (selObj.options[i].value == seletedValue) {
				selObj.options[i].selected = true;
				break;
			}
		}
	}
}

// 递归遍历JSON所有键值
function listSimpleJson(json) {
	var resultmap = new HashMap();

	for (var i in json) {
		var key = i;

		if (typeof json[i] == "object") {
			listSimpleJson(json[i]);
		} else {
			resultmap.put(key, json[i]);
		}
	}

	return resultmap;
}

function parseCounterName(countP) {
	var countPstr = "";
	for (var i = 0; i < countP; i++) {
		if (i < countP - 1) {
			countPstr += i + ",";
		} else {
			countPstr += i;
		}
	}

	return countPstr;
}

function resizeFrame(frm, width, height) {
	if (frm) {
		frm.height = height;
	}
}

function getFrameInParent(frm) {
	var sub = (document.all) ? parent.document.frames[frm] : parent.document
			.getElementById(frm).contentWindow;
	return sub;
}

function getFrameDocument(frm) {
	var sub = (document.all) ? document.frames[frm] : document
			.getElementById(frm);
	return document.getElementById(frm);
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

/**
 * 弹出窗口
 * 
 * @param {}
 *            url
 */
function showWindow(url, w, h) {
	if (!w) {
		w = 800;
	}

	if (!h) {
		w = 600;
	}

	var isMSIE = (navigator.appName == "Microsoft Internet Explorer");
	if (isMSIE) // IE
	{
		feature = "dialogWidth:" + w + "px;dialogHeight:" + h
				+ "px;status:no;help:no;resizable:yes;status;center:yes;";
		var someValue = window.showModalDialog(url, "", feature);
	} else {
		// modelessDialog可以将modal换成dialog=yes
		feature = "width=" + w + ",height=" + h
				+ ",menubar=no,toolbar=no,location=no,";
		feature += "scrollbars=no,status=no,modal=yes";
		window.open(url, null, feature);
	}
}

/**
 * 获取url携带的参数
 * 
 * @param {}
 *            name
 * @return {String}
 */
function getParameter(name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href))
		return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
};

var getScriptArgs = function() {// 获取多个参数
	var scripts = document.getElementsByTagName("script"), script = scripts[scripts.length
			- 1], // 因为当前dom加载时后面的script标签还未加载，所以最后一个就是当前的script
	src = script.src, reg = /(?:\?|&)(.*?)=(.*?)(?=&|$)/g, temp, res = {};
	while ((temp = reg.exec(src)) != null)
		res[temp[1]] = decodeURIComponent(temp[2]);
	return res;
};
// var args=getScriptArgs();
// alert(args.a+" | "+args.b+" | "+args.c);
// 假如上面的js是在这个js1.js的脚本中<script type="text/javascript"
// src="js1.js?a=abc&b=汉字&c=123"></script>

var getScriptArg = function(key) {// 获取单个参数
	var scripts = document.getElementsByTagName("script"), script = scripts[scripts.length
			- 1], src = script.src;
	return (src.match(new RegExp("(?:\\?|&)" + key + "=(.*?)(?=&|$)")) || ['',
			null])[1];
};

function jsonToString(obj) {
	var THIS = this;
	switch (typeof(obj)) {
		case 'string' :
			return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
		case 'array' :
			return '[' + obj.map(THIS.jsonToString).join(',') + ']';
		case 'object' :
			if (obj instanceof Array) {
				var strArr = [];
				var len = obj.length;
				for (var i = 0; i < len; i++) {
					strArr.push(THIS.jsonToString(obj[i]));
				}
				return '[' + strArr.join(',') + ']';
			} else if (obj == null) {
				return 'null';

			} else {
				var string = [];
				for (var property in obj)
					string.push(THIS.jsonToString(property) + ':'
							+ THIS.jsonToString(obj[property]));
				return '{' + string.join(',') + '}';
			}
		case 'number' :
			return obj;
		case false :
			return obj;
	}
}

// 递归遍历JSON所有键值 to request parameters
function jsonToParameters(json) {
	var paramString = '';

	for (var i in json) {
		var key = i;

		if (typeof json[i] == "object") {
			listSimpleJson(json[i]);
		} else {
			if (paramString == '') {
				paramString += key + '=' + json[i];
			} else {
				paramString += '&' + key + '=' + json[i];
			}
		}
	}

	return paramString;
}

/**
 * parse url to parameter map<key, value>
 * 
 * @param {}
 *            urlString
 * @return {}
 */
function urlToParam(urlString) {
	if (urlString != null) {
		var tempString;
		if (urlString.indexOf('?') > -1) {
			tempString = urlString.substring(urlString.indexOf('?') + 1);

			var tempStr = tempString.split('&');

			if (tempStr != null && tempStr.length > 0) {
				var paramMap = new HashMap();

				for (var i = 0; i < tempStr.length; i++) {
					if (tempStr[i] != '' && tempStr[i].indexOf('=') > -1
							&& tempStr[i].indexOf('=') < tempStr[i].length - 1) {
						var k = tempStr[i]
								.substring(0, tempStr[i].indexOf('='));
						var v = tempStr[i].substring(tempStr[i].indexOf('=')
								+ 1);
						paramMap.put(k, v);
					}
				}

				return paramMap;

			}
		}

		return null;
	}

	return null;
}

/**
 * parse url to parameter json object
 * 
 * @param {}
 *            urlString
 * @return {}
 */
function urlToObject(urlString) {
	var json = {};

	if (urlString != null) {
		var tempString;
		if (urlString.indexOf('?') > -1) {
			tempString = urlString.substring(urlString.indexOf('?') + 1);

			var tempStr = tempString.split('&');

			if (tempStr != null && tempStr.length > 0) {

				for (var i = 0; i < tempStr.length; i++) {
					if (tempStr[i] != '' && tempStr[i].indexOf('=') > -1
							&& tempStr[i].indexOf('=') < tempStr[i].length - 1) {
						var k = tempStr[i]
								.substring(0, tempStr[i].indexOf('='));
						var v = tempStr[i].substring(tempStr[i].indexOf('=')
								+ 1);
						json[k] = v;
					}
				}

			}
		}

	}

	return json;
}

loadXML = function(xmlString) {
	var xmlDoc = null;
	// 判断浏览器的类型
	// 支持IE浏览器
	if (!window.DOMParser && window.ActiveXObject) { // window.DOMParser
		// 判断是否是非ie浏览器
		var xmlDomVersions = ['MSXML.2.DOMDocument.6.0',
				'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
		for (var i = 0; i < xmlDomVersions.length; i++) {
			try {
				xmlDoc = new ActiveXObject(xmlDomVersions[i]);
				xmlDoc.async = false;
				xmlDoc.loadXML(xmlString); // loadXML方法载入xml字符串
				break;
			} catch (e) {
			}
		}
	}
	// 支持Mozilla浏览器
	else if (window.DOMParser && document.implementation
			&& document.implementation.createDocument) {
		try {
			/*
			 * DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。 要使用
			 * DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
			 * parseFromString(text, contentType) 参数text:要解析的 XML 标记
			 * 参数contentType文本的内容类型 可能是 "text/xml" 、"application/xml" 或
			 * "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
			 */
			domParser = new DOMParser();
			xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
		} catch (e) {
		}
	} else {
		return null;
	}

	return xmlDoc;
}

loadXMLFile = function(xmlFile) {
	var xmlDoc = null;
	// 判断浏览器的类型
	// 支持IE浏览器
	if (!window.DOMParser && window.ActiveXObject) {

		var xmlDomVersions = ['MSXML.2.DOMDocument.6.0',
				'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
		for (var i = 0; i < xmlDomVersions.length; i++) {
			try {
				xmlDoc = new ActiveXObject(xmlDomVersions[i]);
				break;
			} catch (e) {
			}
		}
	}
	// 支持Mozilla浏览器
	else if (document.implementation && document.implementation.createDocument) {
		try {
			/*
			 * document.implementation.createDocument('','',null); 方法的三个参数说明
			 * 第一个参数是包含文档所使用的命名空间URI的字符串； 第二个参数是包含文档根元素名称的字符串；
			 * 第三个参数是要创建的文档类型（也称为doctype）
			 */
			xmlDoc = document.implementation.createDocument('', '', null);
		} catch (e) {
		}
	} else {
		return null;
	}

	if (xmlDoc != null) {
		xmlDoc.async = false;
		xmlDoc.load(xmlFile);
	}
	return xmlDoc;
}

/**
 * 角色匹配
 * 
 * @param {}
 *            roles
 * @param {}
 *            purviewRoles
 * @return {Boolean}
 */
function matchRole(roles, purviewRoles) {
	if (roles == null) {
		return false;
	}

	var rnt = false;
	var str = purviewRoles.split(',');
	if (str.length > 0) {
		for (var i = 0; i < str.length; i++) {
			if (roles.containsKey(str[i])) {
				rnt = true;
				break;
			}
		}
	}

	return rnt;
}

function matchImg(filePath, type) {
	var r = false;

	if (filePath.lastIndexOf('.') > -1) {
		var ext = filePath.substring(filePath.lastIndexOf('.') + 1);

		if (ext.toLowerCase() == 'type') {
			r = true;
		}
	}

	return r;
}

/**
 * 动态加载js
 * 
 * @param {}
 *            sId jsid
 * @param {}
 *            source jstext
 */
function IncludeJS(sId, source) {
	if (source != null) {
		var oHead = document.getElementsByTagName('HEAD').item(0);

		if (document.getElementById(sId)) {
			oHead.removeChild(document.getElementById(sId));
		}

		var oScript = document.createElement("script");

		oScript.language = "javascript";

		oScript.type = "text/javascript";

		oScript.id = sId;

		oScript.defer = true;

		oScript.text = source;

		oHead.appendChild(oScript);
	}
}

/**
 * 动态加载css
 * 
 * @param {}
 *            sId cssid
 * @param {}
 *            source csstext
 */
function IncludeCSS(sId, source) {
	if (source != null) {
		var oHead = document.getElementsByTagName('HEAD').item(0);

		if (document.getElementById(sId)) {
			oHead.removeChild(document.getElementById(sId));
		}

		var oScript = document.createElement("style");

		oScript.type = "text/css";

		oScript.id = sId;

		oScript.text = source;

		oHead.appendChild(oScript);
	}
}

// 禁止頁面回退按鈕 只有在text或者textera并且為可編輯狀態backspace才可用
function preventBSK(evt) {
	var bskEventCancel = false;
	var _EVENT = window.event || evt;
	var keyCode = _EVENT.keyCode || _EVENT.which;

	bskEventCancel = _EVENT && _EVENT.altKey
			&& (keyCode == 8 || keyCode == 37 || keyCode == 39);

	if (keyCode == 8) {
		var oTarget = evt.srcElement || evt.target;
		var tagName = oTarget.tagName.toUpperCase();
		if (tagName == 'TEXTAREA' || tagName == 'INPUT')// 文本操作不受影响
			bskEventCancel = oTarget.readOnly;
		else
			bskEventCancel = true;
	}

	if (bskEventCancel) {
		if (_EVENT.preventDefault) {
			_EVENT.preventDefault();
		} else {
			_EVENT.keyCode = 0;
			_EVENT.returnValue = false;
		}
	}
	// return !bskEventCancel;F
}