var objectName;

/**
 * 自定义表单项操作权限设置
 * 
 */
var handleTypeMap = new HashMap();
var defaultHandleType = 1;

/**
 * 设置对象核心属性
 * 
 * @param {}
 *            id
 * @param {}
 *            name
 * @param {}
 *            key
 * @param {}
 *            returnURL
 */
function setObjectCore(id, name, key, returnURL) {
	objectName = name;

	createHidden('okid', id);
	createHidden('okey', key);
	createHidden('objkey', key);
	createHidden('returnURL', returnURL);
}

/**
 * 获取表单项操作权限
 * 
 * @param {}
 *            name 表单项名称
 * @return {}
 */
function getItemHandleType(name) {
	var str = handleTypeMap.containsKey(name)
			? handleTypeMap.get(name)
			: defaultHandleType;

	return str;
}

function initElement(item, value, handleType) {
	var rootSibling = item.nextSibling;

	/* 表单项不可见 */
	if (handleType == '-1') {
		/*
		 * var bindObject = document.createElement("span"); bindObject.innerHTML =
		 * '&nbsp;'; item.parentNode.insertBefore(bindObject, rootSibling);
		 */
		item.parentNode.removeChild(item);
	} else {
		if (item.type == "hidden") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			if (value != "") {
				// bindObject.innerHTML = value;
				item.value = value;
			}

			if (handleType == 0) {
				bindObject.innerHTML = renderHiddenItem(item, value);
			}
		} else if (item.type == "text" || item.type == "textarea") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			// item.parentNode.appendChild(bindObject);
			item.parentNode.insertBefore(bindObject, rootSibling);
			if (handleType == 1) {
				item.value = value == '' ? item.value : value;
			} else if (handleType == 0) {
				item.style.display = 'none';
				bindObject.innerHTML = value;
			}
		} else if (item.type == "checkbox") {
			item.checked = (item.value == value);

			if (handleType == 0) {
				item.disabled = true;
			}
		} else if (item.type == "radio") {
			item.checked = (item.value == value);

			if (handleType == 0) {
				item.disabled = true;
			}
		} else if (item.type == "select-one") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			// item.parentNode.appendChild(bindObject);
			item.parentNode.insertBefore(bindObject, rootSibling);

			if (handleType == 1) {
				for (var i = 0; i < item.length; i++) {
					if (item[i].value == value) {
						item[i].selected = true;
						break;
					}
				}
			} else if (handleType == 0) {
				item.style.display = 'none';

				var txt = '';

				for (var i = 0; i < item.length; i++) {
					if (item[i].value == value) {
						txt = item[i].text;
						break;
					}
				}

				bindObject.innerHTML = txt;
			}
		} else if (item.type == "file") {
			if (handleType == 0) {
				item.style.display = 'none';
			}
		}

	}
}

/**
 * 初始化Ext组件
 */
function initExtComponents() {
	var items = T("hidden", null);
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			var tp = getItemHandleType(item.name);

			if (tp == '1') {
				/* 日期类型表单项 */
				if (item.getAttribute('special') == 'date') {
					initItem4Date(item, item.value);
				}

				/* 数据字典类型 */
				if (item.getAttribute('special') == 'wordbook') {
					initItem4Wordbook(item, item.value);
				}

				/* 组织结构选择树 */
				if (item.getAttribute('special') == 'gu') {
					initItem4GU(item, item.value);
				}

				/* 组织结构选择树 */
				if (item.getAttribute('special') == 'dataindex') {
					initItem4DataIndex(item, item.value);
				}
			}
		}
	}
}

/**
 * 初始化日期选择类型表单项
 * 
 * @param {}
 *            name 表单项名称
 * @param {}
 *            value 默认值
 */
function initItem4Date(item, value) {
	var dt = new Ext.form.DateField({
				id : item.name + '_',
				name : item.name + '_',
				format : 'Y-m-d',
				width : 200,
				// editable: false,
				allowBlank : false,// 不允许为空
				listeners : {
					'blur' : function() {
						if (this.isValid() && this.getEl().dom.value != '') {
							item.value = parseDate(this.getEl().dom.value
									+ '000000');
						}
					}
				}
			});

	if (value != '') {
		var d = new Date(formatDate(value).replace('-', '/'));
		dt.setValue(d);
	} else {
		dt.setValue(new Date());
	}

	var rootSibling = item.nextSibling;
	var bindObject = document.createElement("span");
	bindObject.id = item.name + '_div';
	item.parentNode.insertBefore(bindObject, rootSibling);

	dt.render(bindObject);
}

/**
 * 数据字典选择项
 * 
 * @param {}
 *            item
 * @param {}
 *            value
 */
function initItem4Wordbook(item, value) {
	var rootSibling = item.nextSibling;
	var bindObject = document.createElement("span");
	bindObject.id = item.name + '_div';
	item.parentNode.insertBefore(bindObject, rootSibling);

	getWBComboStore(item.getAttribute('wbtype'), '', item.name + '_', '',
			item.name, item.getAttribute('wbname'), '0').render(bindObject);

	if (document.getElementById(item.getAttribute('wbname')).value != '') {
		createHidden(item.name + '_', document.getElementById(item
						.getAttribute('wbname')).value);
	}
}

/**
 * 
 */
function initItem4GU(item, value) {
	var rootSibling = item.nextSibling;
	var bindObject = document.createElement("span");
	bindObject.id = item.name + '_div';
	item.parentNode.insertBefore(bindObject, rootSibling);

	var root = item.getAttribute('root');

	var select = item.getAttribute('select');

	var combox;

	if (select == 'group') {
		combox = getGroupSelectCombo(item.name, item.getAttribute('guname'),
				root, false);
		if (item.getAttribute('iwidth') != '') {
			//combox.setWidth(item.getAttribute('iwidth'));
		}
		combox.render(bindObject);
	} else if (select == 'user') {
		combox = getUserChkCombo(item.name, item.getAttribute('guname'), root,
				false);
		if (item.getAttribute('width') != '') {
			//combox.setWidth(item.getAttribute('width'));
		}
		combox.render(bindObject);
	} else {
		combox = getGroupUserChkCombo(item.name, item.getAttribute('guname'),
				item.getAttribute('gutype'), root, false);
		if (item.getAttribute('width') != '') {
			//combox.setWidth(item.getAttribute('width'));
		}
		combox.render(bindObject);
	}
	
	createHidden(item.name + '_', document.getElementById(item
					.getAttribute('guname')).value);
}

function initItem4DataIndex(item, value) {
	var rootSibling = item.nextSibling;
	var bindObject = document.createElement("a");
	var divObject = document.createElement("div");
	divObject.id = item.name + '_div';
	// divObject.setAttribute("class","x-hidden");
	bindObject.id = item.name + '_a';
	bindObject.setAttribute("href", "javascript:openDITree('"
					+ item.getAttribute('wbtype') + "','" + item.id + "','"
					+ item.getAttribute('wbname') + "','" + item.name + "_a')");
	var img = new Image();
	img.src = context + '/system/object/images/select.png';
	img.style.border = '0';
	img.style.marginLeft = '3px';
	img.style.verticalAlign = 'middle';
	img.title = '点击选择';
	bindObject.appendChild(img);
	insertAfter(bindObject, item);

}

/**
 * render 隐藏域(当表单项为隐藏域并且权限操作为只读模式)
 */
function renderHiddenItem(item, value) {
	if (item.getAttribute('special') == 'date') {
		return formatDate(value);
	} else if (item.getAttribute('special') == 'none') {
		return '';
	} else if (item.getAttribute('special') == 'wordbook') {
		return '';
	} else if (item.getAttribute('special') == 'gu') {
		return '';
	}

	return value;
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
 * 删除多数据项
 * 
 * @param {}
 *            id 主键ID
 * @param {}
 *            tableName 所属表名称
 */
function removeItemFromDB(id, tableName) {
	var url = context + '/system/objectcreator.do?method=deleteitem';

	Ext.Ajax.request({
				url : url,
				params : {
					id : id,
					tableName : tableName
				},
				method : 'POST',
				success : function(rs, request) {

				},
				failure : function(rs, request) {
					Ext.Msg.alert('提示', '删除数据操作出现异常');
				}
			});
}

/**
 * 保存操作
 * 
 * @param {}
 *            formName
 */
function handleSubmit(func) {
	if (checkit()) {
		Ext.MessageBox.confirm('提示', '确定提交保存?', function(e) {
					if (e == "yes") {
						if (document.getElementById('okid').value == '') {
							/* 自动设置系统对象名称 */
							autoSetObjectName();
						}

						handleCheckbox();

						var url = document.form1.action;

						if (chkParams != '' && url.indexOf('?') > -1) {
							url += '&' + chkParams;
						} else if (chkParams != '' && url.indexOf('?') == -1) {
							url += '?' + chkParams;
						}

						Ext.MessageBox.wait('提交保存过程中...');
						Ext.Ajax.request({
									// 请求地址
									url : url,
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
											if (typeof func == 'function') {
												try {
													func()
												} catch (error) {
													alert('回调函数[\'' + func
															+ '\']调用出现异常');
												}
											}
										} else {
											Ext.Msg.alert('提示', '提交保存失败！');
										}
									}
								});
					}
				});
	}
}

var chkParams;

/* 处理checkbox表单项 */
function handleCheckbox() {
	chkParams = '';

	var checkboxs = T('checkbox');

	for (var i = 0; i < checkboxs.length; i++) {
		var ht = getItemHandleType(checkboxs[i].name);

		if (ht == 1 && !checkboxs[i].checked) {
			var tname = checkboxs[i].name;

			chkParams += tname + '=&';
		}
	}
}

/**
 * 表单提交校验函数
 * 
 * @return {}
 */
function checkit() {
	var items = getElementsByAttribute('colneed', '1');
	var rnt = true;
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var ht = getItemHandleType(items[i].name);
			if (items[i].type == 'text' && ht == '1') {
				if (isblank(items[i])) {
					alert(items[i].getAttribute('label') + '不能为空');
					rnt = false;
					break;
				}
			} else if (items[i].type == 'textarea' && ht == '1') {
				if (isblank(items[i])) {
					alert(items[i].getAttribute('label') + '不能为空');
					rnt = false;
					break;
				}
			} else if (items[i].type == 'hidden' && ht == '1') {
				if (isblank(items[i])) {
					alert(items[i].getAttribute('label') + '不能为空');
					rnt = false;
					break;
				}
			} else if (items[i].type == 'select-one') {
				if (items[i].value == '') {
					alert('请选择' + items[i].getAttribute('label'));
					rnt = false;
					break;
				}
			} else if (items[i].type == 'checkbox' && ht == '1') {
				if (!items[i].checked) {
					alert('请选择' + items[i].getAttribute('label'));
					rnt = false;
					break;
				}
			} else if (items[i].type == 'radio' && ht == '1') {
				if (!items[i].checked) {
					alert('请选择' + items[i].getAttribute('label'));
					rnt = false;
					break;
				}
			}
		}
	}

	return rnt;
}

/**
 * 返回到查询列表页面
 */
function handleBack() {
	window.location.href = context
			+ '/system/objquery/commonlist.jsp?queryKey=' + querykey;
}