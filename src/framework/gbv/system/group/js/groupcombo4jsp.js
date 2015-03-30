/**
 * 组选择树(多选)
 * 
 * @param {}
 *            combolabel
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            defaultValue
 * @param {}
 *            allowBlank
 * @return {}
 */
function getGroupSelectCombo(returnIdField, returnNameField, returnTypeField,
		root, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : returnIdField + '_',
				name : returnIdField + '_',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="getGroupSelectComboTree_' + returnIdField
						+ '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
			});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
		border : false,
		autoScroll : true,
		animate : true,
		height : 300,
		layout : 'fit',
		enableDD : false,
		containerScroll : false,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
			dataUrl : context
					+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUP_CHECK'
					+ ((root && root != '') ? '&id=' + root : '')
		}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				var ids = document.getElementById(returnIdField).value;
				var types = document.getElementById(returnTypeField).value;

				for (var j = 0; j < node.childNodes.length; j++) {
					if (isCheckedGUNode(node.childNodes[j].attributes.realid,
							node.childNodes[j].attributes.type, ids, types)) {
						// node.childNodes[j].select();
						node.childNodes[j].attributes.checked = true;
					}
				}
			}
		},
		bbar : [{
			text : "选择",
			iconCls : 'icon-chk',
			handler : function() {
				var names = '', ids = '', types = '', selNodes = tree
						.getChecked();
				Ext.each(selNodes, function(node) {
							if (names.length > 0) {
								names += ',';
								ids += ',';
								types += ',';
							}
							names += node.text;
							ids += node.attributes.realid;
							types += node.attributes.type;
						});
				comboWithTooltip.setValue(names);
				if (document.getElementById(returnIdField)) {
					document.getElementById(returnIdField).value = (ids);

				}

				if (document.getElementById(returnNameField)) {
					document.getElementById(returnNameField).value = (names);
				}

				if (document.getElementById(returnTypeField)) {
					document.getElementById(returnTypeField).value = (types);
				}
				comboWithTooltip.collapse();
			}
		}]
	});

	var root = new Ext.tree.AsyncTreeNode({
				text : '组根节点', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				flumelabel : '',
				iconCls : 'icon-grouptemp',
				text : '临时组'
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getGroupSelectComboTree_' + returnIdField + '');
				tree.expandAll();
			});

	return comboWithTooltip;
}

/**
 * 组和用户混合多选树(节点带有checkbox)
 * 
 * @param {}
 *            combolabel
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            returnTypeField
 * @param {}
 *            defaultValue
 * @param {}
 *            allowBlank
 * @return {}
 */
function getGroupUserChkCombo(returnIdField, returnNameField, returnTypeField,
		root, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
		store : new Ext.data.SimpleStore({
					fields : [],
					data : [[]]
				}),
		editable : false,
		id : returnIdField + '_',
		name : returnIdField + '_',
		mode : 'local',
		triggerAction : 'all',
		maxHeight : 400,
		listWidth : 300,
		tpl : '<div id="getGroupUserChkComboTree_' + returnIdField + '"></div>',
		selectedClass : '',
		onSelect : Ext.emptyFn,
		allowBlank : (allowBlank == true),
		emptyText : '请选择...'
	});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
		border : false,
		autoScroll : true,
		animate : false,
		height : 300,
		layout : 'fit',
		enableDD : false,
		containerScroll : false,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
			dataUrl : context
					+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUPUSER_CHECKALL'
					+ ((root && root != '') ? '&id=' + root : '')
		}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				var ids = document.getElementById(returnIdField).value;
				var types = document.getElementById(returnTypeField).value;

				for (var j = 0; j < node.childNodes.length; j++) {
					if (isCheckedGUNode(node.childNodes[j].attributes.realid,
							node.childNodes[j].attributes.type, ids, types)) {
						// node.childNodes[j].select();
						node.childNodes[j].attributes.checked = true;
					}
				}

			}
		},
		bbar : [{
			text : "选择",
			iconCls : 'icon-chk',
			handler : function() {
				var names = '', ids = '', types = '', selNodes = tree
						.getChecked();
				Ext.each(selNodes, function(node) {
							if (names.length > 0) {
								names += ',';
								ids += ',';
								types += ',';
							}
							names += node.text;
							ids += node.attributes.realid;
							types += node.attributes.type;
						});
				comboWithTooltip.setValue(names);
				if (document.getElementById(returnIdField)) {
					document.getElementById(returnIdField).value = (ids);

				}

				if (document.getElementById(returnNameField)) {
					document.getElementById(returnNameField).value = (names);
				}

				if (document.getElementById(returnTypeField)) {
					document.getElementById(returnTypeField).value = (types);
				}
				comboWithTooltip.collapse();
			}
		}]

	});

	var root = new Ext.tree.AsyncTreeNode({
				text : '组根节点', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : '临时组',
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getGroupUserChkComboTree_' + returnIdField + '');
				tree.expandAll();
			});

	return comboWithTooltip;
}

/**
 * 只选择用户机构树(多选)
 * 
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            returnTypeField
 * @param {}
 *            root
 * @param {}
 *            allowBlank
 * @return {}
 */
function getUserChkCombo(returnIdField, returnNameField, returnTypeField, root,
		allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : returnIdField + '_',
				name : returnIdField + '_',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="getUserSelectComboTree_' + returnIdField
						+ '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
			});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
		border : false,
		autoScroll : true,
		animate : true,
		height : 300,
		layout : 'fit',
		enableDD : false,
		containerScroll : false,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
			dataUrl : context
					+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUPUSER_CHECKUSER'
					+ ((root && root != '') ? '&id=' + root : '')
		}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				var ids = document.getElementById(returnIdField).value;
				var types = document.getElementById(returnTypeField).value;

				for (var j = 0; j < node.childNodes.length; j++) {
					if (isCheckedGUNode(node.childNodes[j].attributes.realid,
							node.childNodes[j].attributes.type, ids, types)) {
						// node.childNodes[j].select();
						node.childNodes[j].attributes.checked = true;
					}
				}
			}
		},
		bbar : [{
			text : "选择",
			iconCls : 'icon-chk',
			handler : function() {
				var names = '', ids = '', types = '', selNodes = tree
						.getChecked();
				Ext.each(selNodes, function(node) {
							if (names.length > 0) {
								names += ',';
								ids += ',';
								types += ',';
							}
							names += node.text;
							ids += node.attributes.realid;
							types += node.attributes.type;
						});
				comboWithTooltip.setValue(names);
				if (document.getElementById(returnIdField)) {
					document.getElementById(returnIdField).value = (ids);

				}

				if (document.getElementById(returnNameField)) {
					document.getElementById(returnNameField).value = (names);
				}

				if (document.getElementById(returnTypeField)) {
					document.getElementById(returnTypeField).value = (types);
				}
				comboWithTooltip.collapse();
			}
		}]
	});

	var root = new Ext.tree.AsyncTreeNode({
				text : '组根节点', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				flumelabel : '',
				iconCls : 'icon-grouptemp',
				text : '临时组'
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getUserSelectComboTree_' + returnIdField + '');
				tree.expandAll();
			});

	return comboWithTooltip;
}

/**
 * 组选择树(单选)
 * 
 * @param {}
 *            combolabel
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            defaultValue
 * @param {}
 *            allowBlank
 * @return {}
 */
function getGroupSelectCombo4Single(returnIdField, returnNameField,
		returnTypeField, root, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : returnIdField + '_',
				name : returnIdField + '_',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="getGroupSelectComboTree_' + returnIdField
						+ '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
			});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
		border : false,
		autoScroll : true,
		animate : true,
		height : 300,
		layout : 'fit',
		enableDD : false,
		containerScroll : false,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
					dataUrl : context
							+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUP'
							+ ((root && root != '') ? '&id=' + root : '')
				}),
		listeners : {
			load : function(node) {
				var ids = document.getElementById(returnIdField).value;
				var types = document.getElementById(returnTypeField).value;

				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				if ((ids == node.attributes.realid)
						&& (types == node.attributes.type)) {
					node.select();
				}

			}
		}
	});

	tree.on("click", function(node, event) {
		comboWithTooltip.setValue(node.text);
		if (document.getElementById(returnIdField)) {
			document.getElementById(returnIdField).value = node.attributes.realid;

		}

		if (document.getElementById(returnNameField)) {
			document.getElementById(returnNameField).value = node.text;
		}

		if (document.getElementById(returnTypeField)) {
			document.getElementById(returnTypeField).value = node.attributes.type;
		}

		comboWithTooltip.collapse();
	});

	var root = new Ext.tree.AsyncTreeNode({
				text : '组根节点', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				flumelabel : '',
				iconCls : 'icon-grouptemp',
				text : '临时组'
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getGroupSelectComboTree_' + returnIdField + '');
				tree.expandAll();
			});

	return comboWithTooltip;
}

/**
 * 组和用户混合多选树(单选)
 * 
 * @param {}
 *            combolabel
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            returnTypeField
 * @param {}
 *            defaultValue
 * @param {}
 *            allowBlank
 * @return {}
 */
function getGroupUserChkCombo4Single(returnIdField, returnNameField,
		returnTypeField, root, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
		store : new Ext.data.SimpleStore({
					fields : [],
					data : [[]]
				}),
		editable : false,
		id : returnIdField + '_',
		name : returnIdField + '_',
		mode : 'local',
		triggerAction : 'all',
		maxHeight : 400,
		listWidth : 300,
		tpl : '<div id="getGroupUserChkComboTree_' + returnIdField + '"></div>',
		selectedClass : '',
		onSelect : Ext.emptyFn,
		allowBlank : (allowBlank == true),
		emptyText : '请选择...'
	});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
		border : false,
		autoScroll : true,
		animate : false,
		height : 300,
		layout : 'fit',
		enableDD : false,
		containerScroll : false,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
					dataUrl : context
							+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUPUSER'
							+ ((root && root != '') ? '&id=' + root : '')
				}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				var ids = document.getElementById(returnIdField).value;
				var types = document.getElementById(returnTypeField).value;

				var ids = document.getElementById(returnIdField).value;
				var types = document.getElementById(returnTypeField).value;

				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				if ((ids == node.attributes.realid)
						&& (types == node.attributes.type)) {
					node.select();
				}
			}
		}

	});

	tree.on("click", function(node, event) {
		comboWithTooltip.setValue(node.text);
		if (document.getElementById(returnIdField)) {
			document.getElementById(returnIdField).value = node.attributes.realid;

		}

		if (document.getElementById(returnNameField)) {
			document.getElementById(returnNameField).value = node.text;
		}

		if (document.getElementById(returnTypeField)) {
			document.getElementById(returnTypeField).value = node.attributes.type;
		}

		comboWithTooltip.collapse();
	});

	var root = new Ext.tree.AsyncTreeNode({
				text : '组根节点', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : '临时组',
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getGroupUserChkComboTree_' + returnIdField + '');
				tree.expandAll();
			});

	return comboWithTooltip;
}

/**
 * 用户选择树(单选)
 * 
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            returnTypeField
 * @param {}
 *            root
 * @param {}
 *            allowBlank
 * @return {}
 */
function getUserChkCombo4Single(returnIdField, returnNameField,
		returnTypeField, root, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : returnIdField + '_',
				name : returnIdField + '_',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="getUserSelectComboTree_' + returnIdField
						+ '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
			});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
		border : false,
		autoScroll : true,
		animate : true,
		height : 300,
		layout : 'fit',
		enableDD : false,
		containerScroll : false,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
					dataUrl : context
							+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUPUSER'
							+ ((root && root != '') ? '&id=' + root : '')
				}),
		listeners : {
			load : function(node) {
				var ids = document.getElementById(returnIdField).value;
				var types = document.getElementById(returnTypeField).value;

				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				var ids = document.getElementById(returnIdField).value;
				var types = document.getElementById(returnTypeField).value;

				for (var j = 0; j < node.childNodes.length; j++) {
					if (isCheckedGUNode(node.childNodes[j].attributes.realid,
							node.childNodes[j].attributes.type, ids, types)) {
						//node.childNodes[j].select();
						//node.childNodes[j].attributes.checked = true;
					}
				}

			}
		}
	});

	tree.on("click", function(node, event) {
		if (node.attributes.type == 'group') {
            alert('请选择用户');
		} else {
			comboWithTooltip.setValue(node.text);
			if (document.getElementById(returnIdField)) {
				document.getElementById(returnIdField).value = node.attributes.realid;

			}

			if (document.getElementById(returnNameField)) {
				document.getElementById(returnNameField).value = node.text;
			}

			if (document.getElementById(returnTypeField)) {
				document.getElementById(returnTypeField).value = node.attributes.type;
			}

			comboWithTooltip.collapse();
		}
	});

	var root = new Ext.tree.AsyncTreeNode({
				text : '组根节点', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				flumelabel : '',
				iconCls : 'icon-grouptemp',
				text : '临时组'
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getUserSelectComboTree_' + returnIdField + '');
				tree.expandAll();
			});

	return comboWithTooltip;
}

function isCheckedGUNode(id, type, ids, types) {
	var idstr = ids.split(",");
	var typestr = types.split(",");
	var rnt = false;
	if (idstr.length == typestr.length) {
		for (var i = 0; i < idstr.length; i++) {
			if (type == typestr[i] && id == idstr[i]) {

				rnt = true;
				break;
			}
		}
	}

	return rnt;
}