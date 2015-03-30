
/**
 * 加载对象实体内容
 * 
 * @param {}
 *            id 对象实例ID
 * 
 */
function loadObjectContent(id) {
	setObjectCore(id, name, key, returnURL);
	var url = context + '/system/objectcreator.do?method=load4json&id=' + id;

	Ext.Ajax.request({
				// 请求地址
				url : url,
				scriptTag : true,
				// 成功时回调
				success : function(response, options) {
					var json = response.responseText;
					var o = Ext.util.JSON.decode(json);

					if (o.success) {

						recurJson(o.data);

						initExtComponents();

						document.form1.action = context
								+ '/system/objectcreator.do?method=update';
					} else {
						if (o.errCode == '-1') {
							alert('您要编辑的信息并不存在');
						} else if (o.errCode == '-2') {
							alert('您没有权限编辑该对象内容');
						} else if (o.errCode == '-3') {
							alert('获取信息出现异常!');
						}

						window.history.back(-1);
					}
				},
				failure : function(response, options) {
					alert('获取信息出现异常!');
					window.history.back(-1);
				}
			});
}

/**
 * 解析form域json数据,初始化form域表单值
 * 
 * @param {}
 *            json
 */
function recurJson(json) {
	for (var i in json) {
		var ht = getItemHandleType(i);

		if (i == 'ANNEX') {
			initElementOfFileItems(json[i]);
		} else if (typeof json[i] == "object") {
			recurJson(json[i]);
		} else {
			// var obj = eval('document.form1.' + i);
			// document.write(i + ":" + json[i] + "<br>");
			var obj = document.getElementsByName(i);
			if (obj && obj.length > 0) {
				for (var j = 0; j < obj.length; j++) {
					initElement(obj[j], json[i], ht);
				}
			} else {
				// alert('视图丢失了表单项[\'' + i + '\']');
			}
		}
	}
}

/**
 * 初始化文件域
 * 
 * @param {}
 *            json
 */
function initElementOfFileItems(json) {
	for (var i in json) {
		var obj = document.getElementsByName(i);
		if (obj && obj.length > 0) {
			for (var j = 0; j < obj.length; j++) {
				var ht = getItemHandleType(obj[j].name);

				initElementOfFile(obj[j], json[i], ht);
			}
		} else {

		}
	}
}

/**
 * 初始化文件表单项
 * 
 * @param {}
 *            item
 * @param {}
 *            json
 */
function initElementOfFile(item, json, ht) {
	if (ht == -1) {
		item.parentNode.removeNode(item);
	} else {
		var str = "&nbsp;";

		for (var i = 0; i < json.length; i++) {
			var annex = document.createElement("span");
			annex.id = json[i].id;
			str += "<a href=\"javascript:viewAnnex('" + json[i].id
					+ "');\" title=\"查看附件\">" + json[i].name + "</a>&nbsp;";
			if (ht == 1) {
				str += "&nbsp;<a href=\"javascript:deleteAnnex('"
						+ json[i].id
						+ "', function(){showFileItem(document.form1."+item.id+", '"+json[i].id+"');});\" title=\"删除附件\"><img style=\"margin-bottom:-3px;\" src=\""
						+ context
						+ "/system/object/images/annexremove.png\" title=\"删除附件\"></a>&nbsp;";
			}
			annex.innerHTML = str;
			item.parentNode.appendChild(annex);
		}

		item.style.display = 'none';
	}
	// item.parentNode.removeChild(item);
}

function showFileItem(item, id){
	document.getElementById(id).parentNode.removeChild(document.getElementById(id));
	item.style.display = 'block';
}