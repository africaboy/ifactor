var ititle;

/**
 * 表单初始化函数
 */
function init4diy() {
	init4yijian();
	init4number();
	initdate();
	initselect();
	init4wordbook();
	init4doc();
	inittitle();
	init4gu();
}

/**
 * 表单提交校验函数
 * 
 * @return {}
 */
function checkit() {
	var items = getElementsByAttribute("colneed", "1");
	var rnt = 1;
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var ht = $(items[i].name + "_handleType") ? $(items[i].name
					+ "_handleType").value : "0";
			if (items[i].type == "text" && ht == "1") {
				if (isblank(items[i])) {
					alert("请填写" + items[i].getAttribute("collabel"));
					rnt = -1;
					break;
				}
			} else if (items[i].type == "hidden" && ht == "1") {
				if (items[i].getAttribute("special") == "yijian") {
					var yj = findYJ(items[i].name);
					if (yj == "") {
						alert("请填写" + items[i].getAttribute("collabel"));
						rnt = -1;
						break;
					}
				} else if (items[i].getAttribute("special") == "file") {
					if (allannex == 0) {
						alert("请上传" + items[i].getAttribute("collabel"));
						rnt = -1;
						break;
					}
				}
			} else if (items[i].type == "select-one" && ht == "1") {

			} else if (items[i].type == "checkbox" && ht == "1") {
				if (!items[i].checked) {
					alert("请选择" + items[i].getAttribute("collabel"));
					rnt = -1;
					break;
				}
			} else if (items[i].type == "radio" && ht == "1") {
				if (!items[i].checked) {
					alert("请选择" + items[i].getAttribute("collabel"));
					rnt = -1;
					break;
				}
			}
		}
	}

	if (rnt) {
		/* 无标题标单项 */
		if (ititle == null && isblank($("atitle"))) {
			rnt = 0;
		} else if (ititle != null) {
			if (isblank($(ititle))) {
				rnt = 0;
			} else if ($(ititle).value != $("atitle").value) {
				setDefaultTitle($(ititle).value);
			}
		}
	}

	return rnt;
}

/**
 * 默认标题设置
 */
function defaultTitleSet() {
	/* 设置文件标题 */
	var form = new Ext.FormPanel({
				frame : true,
				layout : 'form',
				labelAlign : 'left',
				border : false,
				autoScroll : true,
				labelWidth : 75, // label settings here cascade
				frame : false,
				bodyStyle : 'padding:10px',
				defaults : {
					width : 350

				},
				defaultType : 'textfield',
				items : [{
							fieldLabel : '文件标题',
							id : 'myTitle',
							name : 'myTitle',
							allowBlank : false,
							value : atitle
						}]
			});

	var win = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 500,
				height : 150,
				title : '自定义文件标题',
				plain : true,
				modal : true,
				maximizable : false,
				items : [form],

				buttons : [{
					text : ' 确 定 ',
					handler : function() {
						if (form.getForm().isValid()) {
							setDefaultTitle(form.getForm().findField('myTitle')
									.getValue());
							win.close();
							win = null;
						}
					}
				}, {
					text : '关 闭',
					handler : function() {
						win.close();
						win = null;
					}
				}]
			});

	win.show();
}

/**
 * 设置默认标题
 * 
 * @param {}
 *            thizz
 */
function setDefaultTitle(txt) {
	D("atitle").value = txt;
	D("atitle").title = txt;
}

/**
 * 初始化标题
 */
function inittitle() {
	var items = getElementsByAttribute("special", "title");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			ititle = items[i].name;
			break;
		}
	}
}

/**
 * 初始化日期选择
 */
function initdate() {
	var items = getElementsByAttribute("special", "date");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var ht = D(items[i].name + "_handleType").value;
			if (ht == 1) {
				items[i].readOnly = true;
				items[i].onclick = function() {
					HS_setDate(this);
				};
			}
		}
	}
}

/**
 * 初始化部门/用户选择
 */
function initselect() {
	var items = getElementsByAttribute("special", "select");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var ht = D(items[i].name + "_handleType").value;
			if (ht == 1) {
				items[i].readonly = true;
				items[i].onclick = function() {
					handleSelect(this);
				};
			}

		}
	}
}

var thizzObj;

/**
 * 选择部门人员
 */
function handleSelect(thizz) {
	/* 当前操作名称 */
	var defaultIds = "";
	thizzObj = thizz;
	nowoper = "select4diy";
	var url = context
			+ "/iflow/tree.do?method=selectgroupall&type=checkbox&defaultnode="
			+ defaultIds;
	dialog(url, true, "选择部门/人员", 300, 350);
}

/* 操作回调函数(函数名称为responseResult4 + nowoper) */
function responseResult4select4diy(ids, names, types) {
	var idx = thizzObj.getAttribute("index");
	/*
	 * document.getElementById(thizzName + "_" + idx).value = names;
	 * document.getElementById(thizzID + "_" + idx).value = ids;
	 */
	thizzObj.value = names;
	closeDialog();
}

/**
 * 初始化意见签署
 */
function init4yijian() {
	var items = getElementsByAttribute("special", "yijian");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			// var areaid = createYijianArea(items[i]);
			initYJ(items[i].name, items[i].name + "area");
		}
	}
}

/**
 * 创建意见签署区域
 * 
 * @param {}
 *            obj
 * @return {}
 */
function createYijianArea(obj) {
	var div = document.createElement("div");
	div.id = obj.name + "area";
	div.style.cssText = "HEIGHT: 50px; VERTICAL-ALIGN: top;";
	rootSibling = obj.nextSibling;
	obj.parentNode.insertBefore(div, rootSibling);
	return div.id;
}

/**
 * 初始化编号
 */
function init4number() {
	var items = getElementsByAttribute("special", "number");
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var whobj = items[i];

			loadnumber(whobj);
		}
	}
}

/**
 * 数据字典选项
 */
function init4wordbook() {
	var items = A("special", 'wordbook');
	if (items) {
		for (var i = 0; i < items.length; i++) {
			var whobj = items[i];
			if (whobj.getAttribute('wbtype') != '') {
				script4wordbookselect(whobj.getAttribute('wbtype'), "",
						whobj.name, true);
			}
		}
	}
}

/**
 * 正文
 */
function init4doc() {
	var items = getElementsByAttribute("special", "zhengwen");

	if (items) {
		for (var i = 0; i < items.length; i++) {
			initZW(items[i].name);
		}
	}
}

/**
 * 
 */
function init4GU() {
	var items = getElementsByAttribute("special", "gu");

	if (items) {
		for (var i = 0; i < items.length; i++) {
			var ht = D(items[i].name + "_handleType").value;
			if (ht == 1) {
				initGU(item[i]);
			}
		}
	}
}