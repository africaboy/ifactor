var submitType = 'save';
var objectName;

/**
 * 加载对象实体内容
 * 
 * @param {}
 *            id 对象实例ID
 * 
 */
function loadObjectContent(id, name, key, returnURL) {
	objectName = name;

	setObjectCore(id, key, returnURL);
	
	inithelper();

	if (id && id != '') {
		submitType = 'update';

		var url = context + '/system/objectcreator.do?method=load4json&id='
				+ id;

		Ext.Ajax.request({
					// 请求地址
					url : url,
					scriptTag : true,
					// 成功时回调
					success : function(response, options) {
						var json = response.responseText;
						var o = Ext.util.JSON.decode(json);

						recurJson(o.data);

						document.form1.action = context
								+ '/system/objectcreator.do?method=update';
					},
					failure : function(response, options) {
						var json = response.responseText;
						var o = Ext.util.JSON.decode(json);

						if (o.errCode == '-1') {
							alert('您要编辑的信息并不存在');
						} else if (o.errCode == '-2') {
							alert('您没有权限编辑该对象内容');
						} else if (o.errCode == '-3') {
							alert('获取信息出现异常!');
						}
					}
				});
	} else {
		document.form1.action = context
				+ '/system/objectcreator.do?method=save4session';
	}
}

/**
 * 解析form域json数据,初始化form域表单值
 * 
 * @param {}
 *            json
 */
function recurJson(json) {
	for (var i in json) {
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
					initElement(obj[j], json[i]);
				}
			} else {
				// alert('视图丢失了表单项[\'' + i + '\']');
			}
		}
	}
}

/**
 * 初始化页面表单值
 * 
 * @param {}
 *            item 表单对象
 * @param {}
 *            value 表单值
 */
function initElement(item, value) {
	var rootSibling = item.nextSibling;
	if (item.type == "hidden") {
		var bindObject = document.createElement("span");
		bindObject.id = item.name + "_label";
		item.parentNode.insertBefore(bindObject, rootSibling);
		if (value != "") {
			// bindObject.innerHTML = value;
			item.value = value;
		}
	}
	if (item.type == "text" || item.type == "textarea") {
		var bindObject = document.createElement("span");
		bindObject.id = item.name + "_label";
		item.parentNode.insertBefore(bindObject, rootSibling);
		item.value = value == "" ? item.value : value;
	} else if (item.type == "checkbox") {
		item.checked = (item.value == value);
	} else if (item.type == "radio") {
		item.checked = (item.value == value);
	} else if (item.type == "select-one") {
		for (var i = 0; i < item.length; i++) {
			if (item[i].value == value) {
				item[i].selected = true;
			}
		}
	} else if (item.type == "file") {
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
				initElementOfFile(obj[j], json[i]);
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
function initElementOfFile(item, json) {
	var str = "&nbsp;";

	for (var i = 0; i < json.length; i++) {
		var annex = document.createElement("span");
		annex.id = json[i].id;
		str += "<a href=\"javascript:viewAnnex('" + json[i].id
				+ "');\" title=\"查看附件\">" + json[i].name + "</a>&nbsp;";
		str += "<a href=\"javascript:deleteAnnex('"
				+ json[i].id
				+ "','"
				+ json[i].name
				+ "','"
				+ item.name
				+ "');\" title=\"删除附件\"><img style=\"margin-bottom:-3px;\" src=\""
				+ context
				+ "/system/object/images/annexremove.png\" title=\"删除附件\"></a>&nbsp;";
		annex.innerHTML = str;
		item.parentNode.appendChild(annex);
	}

	item.style.display = 'none';
	
	//item.parentNode.removeChild(item);
}

/**
 * 设置对象核心属性值
 * 
 * @param {}
 *            name
 * @param {}
 *            key
 * @param {}
 *            returnURL
 * @need common.js
 */
function setObjectCore(id, key, returnURL) {
	createHidden('okid', id);
	createHidden('okey', key);
	createHidden('objkey', key);
	createHidden('returnURL', returnURL);
}

/**
 * 自动设置对象名称
 */
function autoSetObjectName() {
	/* 自定义表单项值作为对象实例名称 */
	var objnameItem = A('special', 'title');

	if (objnameItem != null && objnameItem.length > 0) {
		/* 设置表单值作为对象实例名称 */
		createHidden('oname', objnameItem[0].value());
	} else {
		var date = new Date();

		var str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-'
				+ date.getDate()

		/* 系统设置默认名称(对象名称+当前日期) */
		createHidden('oname', objectName + '_' + str);
	}
}

/**
 * 保存操作
 * 
 * @param {}
 *            formName
 */
function handleSubmit() {
	if (document.getElementById('okid').value == '') {
		/* 新增加系统对象 */
		autoSetObjectName();
	}

	Ext.MessageBox.confirm('提示', '确定提交保存?', function(e) {
				if (e == "yes") {
					Ext.MessageBox.wait('提交保存过程中...');
					Ext.Ajax.request({
								// 请求地址
								url : document.form1.action,
								// 提交参数组
								fileUpload : true,
								form : 'form1',
								scope : 'form1',
								// 成功时回调
								success : function(response, options) {
									// 获取响应的json字符串
									Ext.MessageBox.hide();

									var json = response.responseText;
									var o = Ext.util.JSON.decode(json);

									if (o.success) {
										alert("提交保存成功！");
										handleRefresh();
									} else {
										Ext.Msg.alert('提示', '提交保存失败！');
									}
								}
							});
				}
			})

}