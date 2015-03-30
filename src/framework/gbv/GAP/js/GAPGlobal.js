// 翻译官对象
function GrooveTranslator() {
	// 语言类型
	this.lang = null;
	// 语言包
	this.langSpaces = null;

	this.load = function(lang) {
		var url = context + '/system/lang.do?method=load&lang=' + lang;

		var responseText = this.sendLangRequest(url);

		var resultJson = null;

		try {
			resultJson = Ext.util.JSON.decode(responseText);// 将字符串转换为json类型
		} catch (error) {
			alert('error occurred for json(' + url + ') formats');
		}

		if (resultJson.success && resultJson.resultData != null) {
			// 设置语言包
			this.langSpaces = resultJson.resultData;
		} else {
			alert('language(' + lang + ') package is not found');
		}

		// 设置语言类型
		this.lang = lang;
	};

	this.language = function() {
		return this.lang;
	};

	this.getLangSpace = function(spaceName) {
		return this.langSpaces[spaceName];
	};

	this.getLangLabel = function(spaceName, labelId) {
		var labelString = '';

		// 语言空间
		var lSpace = this.langSpaces[spaceName];

		if (lSpace == null) {
			alert('language(' + this.lang + ') space(' + spaceName
					+ ') is not found');
		} else {
			// 标签对象
			var label = lSpace[labelId];

			if (label == null) {
				alert('language(' + this.lang + ') space(' + spaceName
						+ ') label(' + labelId + ') is not found');
			} else {
				// 获取标签名称
				labelString = label.wname;
			}
		}

		return labelString;
	};

	this.sendLangRequest = function(url) {
		var xmlhttp = document.all
				? new ActiveXObject('Msxml2.XMLHTTP')
				: new XMLHttpRequest();
		xmlhttp.open('POST', url, false);
		xmlhttp.setRequestHeader('x-requested-with', 'XMLHttpRequest');
		xmlhttp.send(null);

		return xmlhttp.responseText;
	};

	this.getParameter = function(name) {
		var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
		if (reg.test(location.href))
			return unescape(RegExp.$2.replace(/\+/g, " "));
		return "";
	};

	this.getLang = function() {
		var l = this.getParameter('lang');

		if (l == '') {
			l = 'zh_CN.lang';
		}

		return l;
	};
}
