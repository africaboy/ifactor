/**
 * 数据类别
 * 
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            root
 * @param {}
 *            allowBlank
 * @return {}
 */
function getDataindexCombo(returnIdField, returnNameField, returnTypeField,
		root, allowBlank, returnFunc, showLevel) {
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
				tpl : '<div id="getDataindexComboTree_' + returnIdField
						+ '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : grooveTranslator.getLangLabel(
							'common-language', 'select-emptytext')
			});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
				border : false,
				autoScroll : true,
				animate : true,
				height : 200,
				layout : 'fit',
				enableDD : false,
				containerScroll : false,
				rootVisible : false,
				loader : new Ext.tree.TreeLoader({
							dataUrl : context
									+ '/system/ddindexshow.do?method=alltree'
									+ ((root && root != '')
											? '&key=' + root
											: '')
									+ (showLevel == null ? '' : '&showLevel='
											+ showLevel)
						}),
				listeners : {
					load : function(node) {
						var ids = document.getElementById(returnIdField).value;

						if (node.id == '0') {
							/* 手工添加临时组节点 */
							// node.appendChild(temp);
						}

						for (var j = 0; j < node.childNodes.length; j++) {
							if (ids == node.childNodes[j].id) {
								// node.childNodes[j].select();
							}
						}
					}
				}
			});

	tree.on("click", function(node, event) {
		comboWithTooltip.setValue(node.text);
		if (document.getElementById(returnIdField)) {
			document.getElementById(returnIdField).value = node.id;

		}

		if (document.getElementById(returnNameField)) {
			document.getElementById(returnNameField).value = node.text;
		}

		if (document.getElementById(returnTypeField)) {
			document.getElementById(returnTypeField).value = node.attributes.code;
		}

		comboWithTooltip.collapse();

		if (returnFunc != null) {
			returnFunc(node);
		}
	});

	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel(
							'dataindex-language', 'tree-root'), // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getDataindexComboTree_' + returnIdField + '');
				tree.expandAll();
			});

	return comboWithTooltip;
}

/**
 * 数据类别
 * 
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            root
 * @param {}
 *            allowBlank
 * @return {}
 */
function initDataindexCombo(options) {
	var returnIdField = options.returnIdField, returnNameField = options.returnNameField, returnTypeField = options.returnTypeField, root = options.root, allowBlank = options.allowBlank, returnFunc = options.returnFunc, showLevel = options.showLevel;

	var label = options.label;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				fieldLabel : label,
				id : returnIdField + '_',
				name : returnIdField + '_',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="getDataindexComboTree_' + returnIdField
						+ '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : grooveTranslator.getLangLabel(
							'common-language', 'select-emptytext')
			});

	var url = context + '/system/ddindexshow.do?method=alltree'
			+ (showLevel == null ? '' : '&showLevel=' + showLevel);

	if (root && root != '') {
		url += '&key=' + root;
	} else {
		url += '&key=pointforemptydic';
	}

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
				id : 'dataindexComboTree_' + returnIdField,
				border : false,
				autoScroll : true,
				animate : true,
				height : 200,
				layout : 'fit',
				enableDD : false,
				containerScroll : false,
				rootVisible : false,
				loader : new Ext.tree.TreeLoader({
							dataUrl : context
									+ '/system/ddindexshow.do?method=alltree'
									+ ((root && root != '')
											? '&key=' + root
											: '')
									+ (showLevel == null ? '' : '&showLevel='
											+ showLevel)
						}),
				listeners : {
					load : function(node) {
						/*
						 * var ids = Ext.getCmp(returnIdField).getValue();
						 * 
						 * if (node.id == '0') {
						 *  }
						 * 
						 * for (var j = 0; j < node.childNodes.length; j++) { if
						 * (ids == node.childNodes[j].id) {
						 * node.childNodes[j].select(); } }
						 */
					}
				}
			});

	if (options.cascade) {
		tree.loader.on('beforeload', function(treeLoader) {
					// treeLoader.url = node.attributes.url;

					var root = Ext.getCmp(options.cascade) ? Ext
							.getCmp(options.cascade).getValue() : '';

					if (root == '') {
						root = 'pointforemptydic';
					}

					treeLoader.baseParams = {
						id : root
					}
				});
	}

	tree.on("click", function(node, event) {
		comboWithTooltip.setValue(node.text);
		if (document.getElementById(returnIdField)) {
			document.getElementById(returnIdField).value = node.id;

		}

		if (document.getElementById(returnNameField)) {
			document.getElementById(returnNameField).value = node.text;
		}

		if (document.getElementById(returnTypeField)) {
			document.getElementById(returnTypeField).value = node.attributes.code;
		}

		comboWithTooltip.collapse();

		if (returnFunc != null) {
			returnFunc(node);
		}
	});

	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel(
							'dataindex-language', 'tree-root'), // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render('getDataindexComboTree_' + returnIdField + '');
				tree.expandAll();
			});

	return comboWithTooltip;
}

function reloadDataindexRoot(treeId) {
	if (Ext.getCmp(treeId) && Ext.getCmp(treeId).getRootNode().isLoaded()) {
		Ext.getCmp(treeId).loader.load(Ext.getCmp(treeId).getRootNode(),
				function() {
				});// 重新加载数据
	}
}

/**
 * 是否默认选中
 * 
 * @param {}
 *            id
 * @param {}
 *            ids
 * @return {}
 */
function isCheckedNode(id, ids) {
	var idstr = ids.split(",");
	var rnt = false;

	for (var i = 0; i < idstr.length; i++) {
		if (id == idstr[i]) {

			rnt = true;
			break;
		}
	}

	return rnt;
}