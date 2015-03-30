/**
 * 单选树
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
function getGCombo(combolabel, returnIdField, returnNameField, defaultValue,
		allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				fieldLabel : combolabel,
				editable : false,
				id : returnIdField + '_',
				name : returnIdField + '_',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="getGroupSelectComboTree"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : grooveTranslator.getLangLabel('common-language',
						'select-emptytext')
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
				}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					root.appendChild(temp);
				}

				if (Ext.getCmp(returnIdField)
						&& Ext.getCmp(returnIdField).getValue() != ''
						&& node.id == ('g' + Ext.getCmp(returnIdField)
								.getValue())) {
					node.select();
				} else if (Ext.getCmp(returnNameField)
						&& Ext.getCmp(returnIdField).getValue() != ''
						&& temp.id == ('g' + Ext.getCmp(returnIdField)
								.getValue())) {
					temp.select();
				}
			}
		}
	});

	tree.on("click", function(node, event) {
				comboWithTooltip.setValue(node.text);
				if (Ext.getCmp(returnIdField)) {
					Ext.getCmp(returnIdField).setValue(node.attributes.realid);

				}
				if (Ext.getCmp(returnNameField)) {
					Ext.getCmp(returnNameField).setValue(node.text);
				}

				comboWithTooltip.collapse();
			});
	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel('group-language',
						'tree-root'), // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				flumelabel : '',
				iconCls : 'icon-grouptemp',
				text : grooveTranslator.getLangLabel('group-language',
						'tree-temp')
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getGroupSelectComboTree');
				tree.expandAll();
			});

	if (defaultValue) {
		comboWithTooltip.setValue(defaultValue);
	}

	return comboWithTooltip;
}

/**
 * 单选树
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
function getUCombo(combolabel, returnIdField, returnNameField, defaultValue,
		allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				fieldLabel : combolabel,
				editable : false,
				id : returnIdField + '_',
				name : returnIdField + '_',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="getUserSelectComboTree"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : grooveTranslator.getLangLabel('common-language',
						'select-emptytext')
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
		}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					root.appendChild(temp);
				}

				for (var j = 0; j < node.childNodes.length; j++) {
					if (Ext.getCmp(returnIdField)
							&& Ext.getCmp(returnIdField).getValue() != ''
							&& node.childNodes[j].attributes.realid == Ext
									.getCmp(returnIdField).getValue()) {
						node.childNodes[j].attributes.checked = true;
					}

				}
			}
		},
		bbar : [{
			text : grooveTranslator.getLangLabel('common-language', 'select'),
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
				if (Ext.getCmp(returnIdField)) {
					Ext.getCmp(returnIdField).setValue(ids);

				}
				if (Ext.getCmp(returnNameField)) {
					Ext.getCmp(returnNameField).setValue(names);
				}

				comboWithTooltip.collapse();
			}
		}, {
			text : grooveTranslator.getLangLabel('common-language', 'cancel'),
			iconCls : 'icon-punchk',
			handler : function() {
				comboWithTooltip.setValue('');
				if (Ext.getCmp(returnIdField)) {
					Ext.getCmp(returnIdField).setValue('');

				}

				if (Ext.getCmp(returnNameField)) {
					Ext.getCmp(returnNameField).setValue('');
				}

				comboWithTooltip.collapse();
			}
		}]
	});

	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel('group-language',
						'tree-root'), // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				flumelabel : '',
				iconCls : 'icon-grouptemp',
				text : grooveTranslator.getLangLabel('group-language',
						'tree-temp')
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getUserSelectComboTree');
				tree.expandAll();
			});

	if (defaultValue) {
		comboWithTooltip.setValue(defaultValue);
	}

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
function getGUChkCombo(combolabel, returnIdField, returnNameField,
		returnTypeField, defaultValue, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				fieldLabel : combolabel,
				editable : false,
				id : returnIdField + '_',
				name : returnIdField + '_',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="getGroupChkComboTree"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : grooveTranslator.getLangLabel('common-language',
						'select-emptytext')
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
		}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					node.appendChild(temp);
				}

				var ids = Ext.getCmp(returnIdField).getValue();
				var types = Ext.getCmp(returnTypeField).getValue();

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
			text : grooveTranslator.getLangLabel('common-language', 'select'),
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
				if (Ext.getCmp(returnIdField)) {
					Ext.getCmp(returnIdField).setValue(ids);

				}

				if (Ext.getCmp(returnNameField)) {
					Ext.getCmp(returnNameField).setValue(names);
				}

				if (Ext.getCmp(returnTypeField)) {
					Ext.getCmp(returnTypeField).setValue(types);
				}
				comboWithTooltip.collapse();
			}
		}, {
			text : grooveTranslator.getLangLabel('common-language', 'cancel'),
			iconCls : 'icon-punchk',
			handler : function() {
				comboWithTooltip.setValue('');
				if (Ext.getCmp(returnIdField)) {
					Ext.getCmp(returnIdField).setValue('');

				}

				if (Ext.getCmp(returnNameField)) {
					Ext.getCmp(returnNameField).setValue('');
				}

				if (Ext.getCmp(returnTypeField)) {
					Ext.getCmp(returnTypeField).setValue('');
				}
				comboWithTooltip.collapse();
			}
		}]

	});

	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel('group-language',
						'tree-root'), // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : grooveTranslator.getLangLabel('group-language',
						'tree-temp'),
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getGroupChkComboTree');
				tree.expandAll();
			});

	if (defaultValue) {
		comboWithTooltip.setValue(defaultValue);
	}

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
