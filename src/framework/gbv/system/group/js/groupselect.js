/* 展开指定节点 */
var selecteGroupNodePath = '/0';

var selectedGroupNodePathMap = new HashMap();
selectedGroupNodePathMap.put(selecteGroupNodePath, selecteGroupNodePath);

/**
 * 机构/人员选择树
 * 
 * @param {}
 *            defaultIds
 * @param {}
 *            oid
 * @param {}
 *            oname
 */
function selectGroupOnly(oid, oname, tp, rv, single) {
	if (tp == null) {
		tp = 'NOROOT_GROUP_CHECK';
	}

	var selectGrouptree = new Ext.tree.TreePanel({
		id : 'selectGrouptree',
		// singleExpand : true,
		frame : false,
		// checkModel : 'single',
		// onlyLeafCheckable : true,
		border : false,
		autoScroll : true,
		animate : true,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
					dataUrl : context
							+ '/system/group/groupmapscript.jsp?type=' + tp,
					baseParams : {
		// active : 'purview4GUSelectForm'
					}
				}),
		root : new Ext.tree.AsyncTreeNode({
					allowChildren : true,
					expanded : true,
					text : '组根节点', // 节点名称
					draggable : false, // 是否支持拖动
					id : '0' // 节点id
				}),
		listeners : {
			'click' : function(node) {
				if (node.isExpanded()) {
					node.collapse();
				} else {
					node.expand();
				}
			},
			'load' : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					selectGrouptree.root.appendChild(temp);
				}

				for (var j = 0; j < node.childNodes.length; j++) {
					if (hasSelectGroup(Ext.get(oid).dom.value,
							node.childNodes[j].attributes.realid)) {
						node.childNodes[j].attributes.checked = true;
						// node.childNodes[j].ui.checkbox.checked =
						// true;
					}
				}
			},
			'checkchange' : function(node, checked) {
				if (single) {
					var selNodes = Ext.getCmp('selectGrouptree').getChecked();

					Ext.each(selNodes, function(nd) {
								if (node.id != nd.id) {
									nd.ui.checkbox.checked = false;
									nd.attributes.checked = false;
								}
							});
				}
			}

		}
	});

	var temp;

	if (tp.indexOf('CHECKUSER') > -1) {
		temp = new Ext.tree.TreeNode({
					id : 'gtemp',
					realid : 'temp',
					type : 'group',
					flumelabel : '',
					iconCls : 'icon-grouptemp',
					text : '临时组'
				});
	} else {
		temp = new Ext.tree.TreeNode({
					id : 'gtemp',
					realid : 'temp',
					type : 'group',
					flumelabel : '',
					iconCls : 'icon-grouptemp',
					checked : false,
					text : '临时组'
				});
	}
	
	//selectGrouptree.expandAll();

	var groupnodespath = selectedGroupNodePathMap.values();

	for (var i = 0; i < groupnodespath.length; i++) {
		/* 展开指定节点 */
		selectGrouptree.expandPath(groupnodespath[i]);
	}

	var selectGrouptreewin = new Ext.Window({
				id : 'selectGrouptreewin',
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 500,
				title : '选择部门/人员',
				resizable : true,
				plain : true,
				modal : true,

				items : [selectGrouptree],

				buttons : [{
							text : '提 交',
							handler : function() {
								handleSelectGroup(oid, oname, rv);
							}
						}, {
							text : '关 闭',
							handler : function() {
								selectGrouptreewin.close();
								selectGrouptreewin = null;
							}
						}]
			});
	selectGrouptreewin.show(this);
}

/**
 * 机构/人员选择树,可返回节点类型
 * @param {} oid
 * @param {} oname
 * @param {} otype
 * @param {} tp
 * @param {} rv
 * @param {} single
 */
function selectGroupUser(oid, oname, otype, tp, rv, single) {
	if (tp == null) {
		tp = 'NOROOT_GROUP_CHECK';
	}

	var selectGrouptree = new Ext.tree.TreePanel({
		id : 'selectGrouptree',
		// singleExpand : true,
		frame : false,
		// checkModel : 'single',
		// onlyLeafCheckable : true,
		border : false,
		autoScroll : true,
		animate : true,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
					dataUrl : context
							+ '/system/group/groupmapscript.jsp?type=' + tp,
					baseParams : {
		// active : 'purview4GUSelectForm'
					}
				}),
		root : new Ext.tree.AsyncTreeNode({
					allowChildren : true,
					expanded : true,
					text : '组根节点', // 节点名称
					draggable : false, // 是否支持拖动
					id : '0' // 节点id
				}),
		listeners : {
			'click' : function(node) {
				if (node.isExpanded()) {
					node.collapse();
				} else {
					node.expand();
				}
			},
			'load' : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					selectGrouptree.root.appendChild(temp);
				}

				for (var j = 0; j < node.childNodes.length; j++) {
					if (hasSelectGroup(Ext.get(oid).dom.value,
							node.childNodes[j].attributes.realid)) {
						node.childNodes[j].attributes.checked = true;
						// node.childNodes[j].ui.checkbox.checked =
						// true;
					}
				}
			},
			'checkchange' : function(node, checked) {
				if (single) {
					var selNodes = Ext.getCmp('selectGrouptree').getChecked();

					Ext.each(selNodes, function(nd) {
								if (node.id != nd.id) {
									nd.ui.checkbox.checked = false;
									nd.attributes.checked = false;
								}
							});
				}
			}

		}
	});

	var temp;

	if (tp.indexOf('CHECKUSER') > -1) {
		temp = new Ext.tree.TreeNode({
					id : 'gtemp',
					realid : 'temp',
					type : 'group',
					flumelabel : '',
					iconCls : 'icon-grouptemp',
					text : '临时组'
				});
	} else {
		temp = new Ext.tree.TreeNode({
					id : 'gtemp',
					realid : 'temp',
					type : 'group',
					flumelabel : '',
					iconCls : 'icon-grouptemp',
					checked : false,
					text : '临时组'
				});
	}
	
	//selectGrouptree.expandAll();

	var groupnodespath = selectedGroupNodePathMap.values();

	for (var i = 0; i < groupnodespath.length; i++) {
		/* 展开指定节点 */
		selectGrouptree.expandPath(groupnodespath[i]);
	}

	var selectGrouptreewin = new Ext.Window({
				id : 'selectGrouptreewin',
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 500,
				title : '选择部门/人员',
				resizable : true,
				plain : true,
				modal : true,

				items : [selectGrouptree],

				buttons : [{
							text : '提 交',
							handler : function() {
								handleSelectGroup(oid, oname, rv, otype);
							}
						}, {
							text : '关 闭',
							handler : function() {
								selectGrouptreewin.close();
								selectGrouptreewin = null;
							}
						}]
			});
	selectGrouptreewin.show(this);
}

/*
 * , bbar : [{ text : "选 择", iconCls : 'icon-pselectuser', handler : function() {
 * var names = '', ids = '', types = '', selNodes = Ext
 * .getCmp('selectlanmutree').getChecked(); Ext.each(selNodes, function(node) {
 * if (names.length > 0) { names += ','; ids += ','; types += ','; } names +=
 * node.text; ids += node.attributes.realid; types += node.attributes.type; }); } }, {
 * text : "取 消", iconCls : 'icon-punchk', handler : function() { } }]
 */

function hasSelectGroup(ids, id) {
	var rnt = false;
	var idstr = ids.split(',');
	for (var i = 0; i < idstr.length; i++) {
		if (idstr[i] == id) {
			rnt = true;
			break;
		}
	}

	return rnt;
}

function handleSelectGroup(oid, oname, rv, otype) {
	var names = '', ids = '', types = '';
	var selNodes = Ext.getCmp('selectGrouptree').getChecked();
	Ext.each(selNodes, function(node) {
				var idpath = node.getPath('id');
				selectedGroupNodePathMap.put(idpath, idpath);

				var path = node.getPath('text');
				//path = getGroupNodePath(path);

				if (names.length > 0) {
					names += ',';
					ids += ',';
					types += ',';
				}
				names += node.text;
				ids += node.attributes.realid;
				types += node.attributes.type;
			});

	Ext.get(oid).dom.value = ids;
	Ext.get(oname).dom.value = names;

	if(otype){
		Ext.get(otype).dom.value = types;
	}

	Ext.getCmp('selectGrouptreewin').close();
}

function getGroupNodePath(path) {
	var pathstr = path.split('/');

	if (pathstr.length > 2) {
		var pathName = "";

		for (var i = 2; i < pathstr.length; i++) {
			pathName += pathstr[i];

			if (i < pathstr.length - 1) {
				pathName += '/';
			}
		}

		return pathName;
	}

	return '';
}