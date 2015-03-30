// get wordbook list for combobox store
// need temp-store/jsstuff/wordbook/allworkbook.js
function getWBComboStoreLocalData(tp) {
	// return wordbook json
	// [{desc:'',idx:'',wid:'L2.I1',wname:'L2.I1',wtype:'L2'},{desc:'',idx:'',wid:'L2.I1',wname:'L2.I1',wtype:'L2'}]
	if ('undefined' != typeof grooveWordbookObject) {
		var tpData = grooveWordbookObject[tp];

		if (tpData == null) {
			alert('Data dictionary category(' + tp + ')dose not exist');
		} else {
			return tpData;
		}
	} else {
		alert('Data dictionary structure object (grooveWordbookObject) does not exist, unable to initialize the combobox components');
	}

	return null;
}

// get wordbook object map for renderer
// need temp-store/jsstuff/wordbook/allworkbookmap.js
function getWBMapLocalData(tp) {
	// return wordbookmap json
	// {desc:'',idx:'',wid:'L2.I1',wname:'L2.I1',wtype:'L2'}
	if ('undefined' != typeof grooveWordbookObjectMap) {
		var tpData = grooveWordbookObjectMap[tp];

		if (tpData == null) {
			alert('Data dictionary category(' + tp + ')dose not exist');
		} else {
			return tpData;
		}
	} else {
		alert('Data dictionary structure object (grooveWordbookObjectMap) does not exist, unable to get the dictionary category (' + tp + ') data');
	}

	return null;
}

// get wordbook object map for renderer
// need temp-store/jsstuff/wordbook/allworkbookmap.js
function getWBMapValueLocalData(tp, id) {
	var apprstateJson = getWBMapLocalData(tp);
	var apprstateValue;
	if (apprstateJson != null) {
		var apprstateObj = apprstateJson[id];
		apprstateValue = (apprstateObj == null ? id : apprstateObj['wname']);
	}

	return apprstateValue;
}

function getWBMapDescLocalData(tp, id) {
	var apprstateJson = getWBMapLocalData(tp);
	var apprstateValue;
	if (apprstateJson != null) {
		var apprstateObj = apprstateJson[id];
		apprstateValue = (apprstateObj == null ? id : apprstateObj['desc']);
	}

	return apprstateValue;
}

function getWBJsonStoreLocal(tp, autoLoad, id, name) {
	var store = new Ext.data.JsonStore({
				autoLoad : (autoLoad == true),
				data : {
					data : getWBComboStoreLocalData(tp)
				},
				root : 'data',
				fields : [{
							name : id,
							mapping : 'wid'
						}, {
							name : name,
							mapping : 'wname'
						}]
			});

	return store;
}

/**
 * 
 * @param {}
 *            tp
 * @param {}
 *            combolabel
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            allowBlank
 * @param {}
 *            formId
 * @return {}
 */
function getWBComboStore(type, combolabel, returnIdField, returnNameField,
		allowBlank, formId) {
	var comboData = {
		data : []
	};

	var comboId = formId + '_' + returnIdField + '_';

	var id = returnIdField + 'id';
	var name = returnIdField + 'name';

	var store = new Ext.data.JsonStore({
				autoLoad : false,
				data : {
					data : [{}]
				},
				root : 'data',
				fields : [{
							name : id,
							mapping : 'wid'
						}, {
							name : name,
							mapping : 'wname'
						}],
				wbType : trim(type)
			});

	store.on('load', function() {
				if (Ext.getCmp(formId).getForm().findField(returnIdField)
						&& Ext.getCmp(formId).getForm()
								.findField(returnIdField).getValue() != '') {
					Ext.getCmp(comboId).setValue(Ext.getCmp(formId).getForm()
							.findField(returnIdField).getValue());
				}
			});

	var combobox = new Ext.form.ComboBox({
				id : comboId,
				fieldLabel : combolabel,
				selectOnFocus : true,
				emptyText : 'Please choose..',
				forceSelection : true,
				triggerAction : 'all',
				valueField : id, // 提交表单时，下拉框的值
				displayField : name, // 显示在页面上下拉框的值
				editable : true,
				allowBlank : (allowBlank == true),
				store : store,
				mode : 'local',
				hasLoadData : false,
				returnObject : {
					id : returnIdField,
					name : returnNameField
				},
				listeners : {
					select : function(combo, record, index) {
						// alert(record.data.id);
						// alert(record.data.name);
						/* 设置combo选择项真正对应的值 */
						var returnId = Ext.getCmp(formId).getForm()
								.findField(returnIdField);

						var returnName = Ext.getCmp(formId).getForm()
								.findField(returnNameField);

						if (returnId != null) {
							returnId.setValue(eval("record.data." + id));
						}
						if (returnName != null) {
							returnName.setValue(eval("record.data." + name));
						}
					},
					blur : function(combo) {
						if (combo.getValue() == '') {
							var returnId = Ext.getCmp(formId).getForm()
									.findField(returnIdField);

							var returnName = Ext.getCmp(formId).getForm()
									.findField(returnNameField);

							if (returnId != null) {
								returnId.setValue('');
							}
							if (returnName != null) {
								returnName.setValue('');
							}
						}
					},
					expand : function(combo) {
						if (!combo.hasLoadData) {
							combo.hasLoadData = true;
							var tpData = (store.wbType != ''
									? getWBComboStoreLocalData(store.wbType)
									: null);

							if (tpData != null) {
								comboData.data = tpData;
							}

							store.loadData(comboData, false);
						}
					}
				}
			});

	return combobox;
}

function awakeWBComboStore(combobox) {
	if (combobox.store.data == null || combobox.store.data.length == 0) {

		var comboData = {
			data : [{}]
		};

		combobox.store.loadData(comboData, false);
	}
}

/**
 * 
 * @param {}
 *            tp
 * @param {}
 *            combolabel
 * @param {}
 *            returnIdField
 * @param {}
 *            returnNameField
 * @param {}
 *            allowBlank
 * @param {}
 *            formId
 * @return {}
 */
function getWBComboboxEditor(type, combolabel, returnIdField, returnNameField,
		allowBlank, formId, cilObj) {
	var comboData = {
		data : []
	};

	var tp = trim(type);

	var tpData = (tp != '' ? getWBComboStoreLocalData(tp) : null);

	if (tpData != null) {
		comboData.data = tpData;
	}

	var id = returnIdField + 'id';
	var name = returnIdField + 'name';

	var store = new Ext.data.JsonStore({
				autoLoad : false,
				data : {
					data : [{}]
				},
				root : 'data',
				fields : [{
							name : id,
							mapping : 'wid'
						}, {
							name : name,
							mapping : 'wname'
						}]
			});

	var combobox = new Ext.form.ComboBox({
				fieldLabel : combolabel,
				xtype : 'combo',
				selectOnFocus : true,
				emptyText : 'Please choose..',
				forceSelection : true,
				triggerAction : 'all',
				valueField : id, // 提交表单时，下拉框的值
				displayField : name, // 显示在页面上下拉框的值
				editable : true,
				allowBlank : (allowBlank == true),
				hasLoadData : false,
				store : store,
				mode : 'local',
				returnObject : {
					id : returnIdField,
					name : returnNameField
				},
				listeners : {
					select : function(combo, record, index) {
						var row = combo.gridEditor.row;

						var rowData = Ext.getCmp(formId + '_' + cilObj.id).store
								.getAt(row);

						rowData.set(returnIdField, record.data[id]);
						rowData.set(returnNameField, record.data[name]);

						combo.collapse();
					},
					blur : function(combo) {
						if (combo.getValue() == '') {
							var row = combo.gridEditor.row;

							var rowData = Ext.getCmp(formId + '_' + cilObj.id).store
									.getAt(row);

							rowData.set(returnIdField, '');
							rowData.set(returnNameField, '');
						}
					},
					expand : function(combo) {
						if (!combo.hasLoadData) {
							combo.hasLoadData = true;
							store.loadData(comboData, false);
						}
					}
				}
			});

	return combobox;

}

function autoLoadWBCombobox(combo, type) {
	var tp = trim(type);

	var tpData = (tp != '' ? getWBComboStoreLocalData(tp) : null);

	if (tpData != null) {
		var comboData = {
			data : tpData
		};

		combo.hasLoadData = true;
		combo.store.loadData(comboData, false);
	}
}

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
function getGroupSelectCombo(fieldLabel, returnIdField, returnNameField,
		returnTypeField, root, allowBlank, formId) {
	var id = formId + '_' + returnIdField + '_';
	var treeDivId = 'GroupSelectComboTree_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				fieldLabel : fieldLabel,
				id : id,
				name : id,
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="' + treeDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : 'Please choose...'
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
					+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUP_CHECK'
					+ ((root && root != '') ? '&id=' + root : '')
		}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				var ids = Ext.getCmp(formId).getForm().findField(returnIdField)
						.getValue();
				var types = Ext.getCmp(formId).getForm()
						.findField(returnTypeField).getValue();

				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}
				if (isCheckedGUNode(node.attributes.realid,
						node.attributes.type, ids, types)) {
					node.ui.checkbox.checked = true
					node.attributes.checked = true;
				}
			}
		},
		bbar : [{
			text : "Choose",
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
				// comboWithTooltip.setValue(names);

				Ext.getCmp(formId).getForm().findField(comboWithTooltip.id)
						.setValue(names);
				comboWithTooltip.value = ids;

				if (Ext.getCmp(formId).getForm().findField(returnIdField)) {
					Ext.getCmp(formId).getForm().findField(returnIdField)
							.setValue(ids);

				}

				if (Ext.getCmp(formId).getForm().findField(returnNameField)) {
					Ext.getCmp(formId).getForm().findField(returnNameField)
							.setValue(names);
				}

				if (Ext.getCmp(formId).getForm().findField(returnTypeField)) {
					Ext.getCmp(formId).getForm().findField(returnTypeField)
							.setValue(types);
				}
				comboWithTooltip.collapse();
			}
		}]

	});

	var root = new Ext.tree.AsyncTreeNode({
				text : 'Set the root node', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : 'Temporary group',
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render(treeDivId);
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
function getGroupUserChkCombo(fieldLabel, returnIdField, returnNameField,
		returnTypeField, root, allowBlank, formId) {
	var id = formId + '_' + returnIdField + '_';
	var treeDivId = 'getGroupUserChkComboTree_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : id,
				name : id,
				fieldLabel : fieldLabel,
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="' + treeDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : 'Please choose...'
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

				var ids = Ext.getCmp(formId).getForm().findField(returnIdField)
						.getValue();
				var types = Ext.getCmp(formId).getForm()
						.findField(returnTypeField).getValue();

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
			text : "Choose",
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
				// comboWithTooltip.setValue(names);
				Ext.getCmp(formId).getForm().findField(comboWithTooltip.id)
						.setValue(names);
				comboWithTooltip.value = ids;

				if (Ext.getCmp(formId).getForm().findField(returnIdField)) {
					Ext.getCmp(formId).getForm().findField(returnIdField)
							.setValue(ids);

				}

				if (Ext.getCmp(formId).getForm().findField(returnNameField)) {
					Ext.getCmp(formId).getForm().findField(returnNameField)
							.setValue(names);
				}

				if (Ext.getCmp(formId).getForm().findField(returnTypeField)) {
					Ext.getCmp(formId).getForm().findField(returnTypeField)
							.setValue(types);
				}
				comboWithTooltip.collapse();
			}
		}]

	});

	var root = new Ext.tree.AsyncTreeNode({
				text : 'Set the root node', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : 'Temporary group',
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render(treeDivId);
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
function getUserChkCombo(fieldLabel, returnIdField, returnNameField,
		returnTypeField, root, allowBlank, formId) {
	var id = formId + '_' + returnIdField + '_';
	var treeDivId = 'UserChkComboTree_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				fieldLabel : fieldLabel,
				id : id,
				name : id,
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="' + treeDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : 'Please choose...'
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
					+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUPUSER_CHECKUSER'
					+ ((root && root != '') ? '&id=' + root : '')
		}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				var ids = Ext.getCmp(formId).getForm().findField(returnIdField)
						.getValue();
				var types = Ext.getCmp(formId).getForm()
						.findField(returnTypeField).getValue();

				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				for (var j = 0; j < node.childNodes.length; j++) {
					if (isCheckedGUNode(node.childNodes[j].attributes.realid,
							node.childNodes[j].attributes.type, ids, types)) {
						node.childNodes[j].attributes.checked = true;
						// node.childNodes[j].ui.checkbox.checked = true;
					}
				}
			}
		},
		bbar : [{
			text : "Choose",
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
				// comboWithTooltip.setValue(names);
				Ext.getCmp(formId).getForm().findField(comboWithTooltip.id)
						.setValue(names);
				comboWithTooltip.value = ids;
				if (Ext.getCmp(formId).getForm().findField(returnIdField)) {
					Ext.getCmp(formId).getForm().findField(returnIdField)
							.setValue(ids);

				}

				if (Ext.getCmp(formId).getForm().findField(returnNameField)) {
					Ext.getCmp(formId).getForm().findField(returnNameField)
							.setValue(names);
				}

				if (Ext.getCmp(formId).getForm().findField(returnTypeField)) {
					Ext.getCmp(formId).getForm().findField(returnTypeField)
							.setValue(types);
				}
				comboWithTooltip.collapse();
			}
		}]

	});

	var root = new Ext.tree.AsyncTreeNode({
				text : 'Set the root node', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : 'Temporary group',
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render(treeDivId);
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
function getGroupSelectCombo4Single(fieldLabel, returnIdField, returnNameField,
		returnTypeField, root, allowBlank, formId) {
	var id = formId + '_' + returnIdField + '_';
	var treeDivId = 'GroupSelectCombo4SingleTree_' + formId + '_'
			+ returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				fieldLabel : fieldLabel,
				id : id,
				name : id,
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="' + treeDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : 'Please choose...'
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
							+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUP'
							+ ((root && root != '') ? '&id=' + root : '')
				}),
		listeners : {
			load : function(node) {
				if (node.id == '0') {
					/* 手工添加临时组节点 */
					// node.appendChild(temp);
				}

				var ids = Ext.getCmp(formId).getForm().findField(returnIdField)
						.getValue();
				var types = Ext.getCmp(formId).getForm()
						.findField(returnTypeField).getValue();

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
				// comboWithTooltip.setValue(node.text);
				Ext.getCmp(formId).getForm().findField(comboWithTooltip.id)
						.setValue(node.text);
				comboWithTooltip.value = node.attributes.realid;

				if (Ext.getCmp(formId).getForm().findField(returnIdField)) {
					Ext.getCmp(formId).getForm().findField(returnIdField)
							.setValue(node.attributes.realid);

				}

				if (Ext.getCmp(formId).getForm().findField(returnNameField)) {
					Ext.getCmp(formId).getForm().findField(returnNameField)
							.setValue(node.text);
				}

				if (Ext.getCmp(formId).getForm().findField(returnTypeField)) {
					Ext.getCmp(formId).getForm().findField(returnTypeField)
							.setValue(node.attributes.type);
				}

				comboWithTooltip.collapse();
			});

	var root = new Ext.tree.AsyncTreeNode({
				text : 'Set the root node', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : 'Temporary group',
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render(treeDivId);
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
function getGroupUserChkCombo4Single(fieldLabel, returnIdField,
		returnNameField, returnTypeField, root, allowBlank, formId) {
	var id = formId + '_' + returnIdField + '_';
	var treeDivId = 'GroupUserChkComboTree_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				fieldLabel : fieldLabel,
				id : id,
				name : id,
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="' + treeDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : 'Please choose...'
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

				var ids = Ext.getCmp(formId).getForm().findField(returnIdField)
						.getValue();
				var types = Ext.getCmp(formId).getForm()
						.findField(returnTypeField).getValue();

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
				// comboWithTooltip.setValue(node.text);
				Ext.getCmp(formId).getForm().findField(comboWithTooltip.id)
						.setValue(node.text);
				comboWithTooltip.value = node.attributes.realid;
				if (Ext.getCmp(formId).getForm().findField(returnIdField)) {
					Ext.getCmp(formId).getForm().findField(returnIdField)
							.setValue(node.attributes.realid);

				}

				if (Ext.getCmp(formId).getForm().findField(returnNameField)) {
					Ext.getCmp(formId).getForm().findField(returnNameField)
							.setValue(node.text);
				}

				if (Ext.getCmp(formId).getForm().findField(returnTypeField)) {
					Ext.getCmp(formId).getForm().findField(returnTypeField)
							.setValue(node.attributes.type);
				}

				comboWithTooltip.collapse();
			});

	var root = new Ext.tree.AsyncTreeNode({
				text : 'Set the root node', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : 'Temporary group',
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render(treeDivId);
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
function getUserChkCombo4Single(fieldLabel, returnIdField, returnNameField,
		returnTypeField, root, allowBlank, formId) {
	var id = formId + '_' + returnIdField + '_';
	var treeDivId = 'UserChkCombo4SingleTree_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				fieldLabel : fieldLabel,
				id : id,
				name : id,
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="' + treeDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : 'Please choose...'
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

				var ids = Ext.getCmp(formId).getForm().findField(returnIdField)
						.getValue();
				var types = Ext.getCmp(formId).getForm()
						.findField(returnTypeField).getValue();

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
				if (node.attributes.type == 'group') {
					alert('Please select a user');
				} else {
					// comboWithTooltip.setValue(node.text);
					Ext.getCmp(formId).getForm().findField(comboWithTooltip.id)
							.setValue(node.text);
					comboWithTooltip.value = node.attributes.realid;
					if (Ext.getCmp(formId).getForm().findField(returnIdField)) {
						Ext.getCmp(formId).getForm().findField(returnIdField)
								.setValue(node.attributes.realid);

					}

					if (Ext.getCmp(formId).getForm().findField(returnNameField)) {
						Ext.getCmp(formId).getForm().findField(returnNameField)
								.setValue(node.text);
					}

					if (Ext.getCmp(formId).getForm().findField(returnTypeField)) {
						Ext.getCmp(formId).getForm().findField(returnTypeField)
								.setValue(node.attributes.type);
					}

					comboWithTooltip.collapse();
				}
			});

	var root = new Ext.tree.AsyncTreeNode({
				text : 'Set the root node', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	var temp = new Ext.tree.TreeNode({
				id : 'gtemp',
				realid : 'temp',
				type : 'group',
				iconCls : 'icon-grouptemp',
				text : 'Temporary group',
				checked : false
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
				tree.render(treeDivId);
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
function getDataIndexCombo(options) {
	var fieldLabel = options.fieldLabel;
	var returnIdField = options.returnIdField;
	var returnNameField = options.returnNameField;
	var returnTypeField = options.returnTypeField;
	var root = options.type;
	var allowBlank = options.allowBlank;
	var returnFunc = options.returnFunc;
	var formId = options.formId;
	var showLevel = options.showLevel;
	var emptyText = options.emptyText == null ? 'Please choose...' : options.emptyText;

	var showLevel_ = (showLevel != null ? showLevel : '-1');
	var id = formId + '_' + returnIdField + '_';
	var treeDivId = 'DataindexComboTree_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : id,
				name : id,
				fieldLabel : fieldLabel,
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="' + treeDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : emptyText
			});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
				id : id + 'tree',
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
											: '') + '&showLevel=' + showLevel_
						}),
				listeners : {
					load : function(node) {
						var ids = Ext.getCmp(formId).getForm()
								.findField(returnIdField).getValue();

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

	tree.on('click', function(node, event) {
				// comboWithTooltip.setValue(node.text);
				Ext.getCmp(comboWithTooltip.id).setValue(node.text);
				comboWithTooltip.value = node.id;

				if (Ext.getCmp(formId).getForm().findField(returnIdField)) {
					Ext.getCmp(formId).getForm().findField(returnIdField)
							.setValue(node.id);

				}

				if (Ext.getCmp(formId).getForm().findField(returnNameField)) {
					Ext.getCmp(formId).getForm().findField(returnNameField)
							.setValue(node.text);
				}

				if (returnTypeField != null
						&& Ext.getCmp(formId).getForm()
								.findField(returnTypeField)) {
					Ext.getCmp(formId).getForm().findField(returnTypeField)
							.setValue(node.attributes.code);
				}

				comboWithTooltip.collapse();

				if (returnFunc != null) {
					returnFunc(node, formId);
				}
			});

	var root = new Ext.tree.AsyncTreeNode({
				text : 'The root node data category', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
		tree.render(treeDivId);
			// tree.expandAll();
		});

	return comboWithTooltip;
}

/**
 * 数据类别（级联comboxbox组件）
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
function getDataIndexComboCascade(options) {
	var fieldLabel = options.fieldLabel;
	var returnIdField = options.returnIdField;
	var returnNameField = options.returnNameField;
	var returnTypeField = options.returnTypeField;
	var cascadeItemName = options.cascadeItemName;
	var allowBlank = options.allowBlank;
	var returnFunc = options.returnFunc;
	var formId = options.formId;
	var showLevel = options.showLevel;
	var itemIndex = options.itemIndex;
	var emptyText = options.emptyText == null ? 'Please choose...' : options.emptyText;

	var showLevel_ = (showLevel != null ? showLevel : '-1');
	var id = formId + '_' + returnIdField + '_';
	var treeDivId = 'DataindexComboTree_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : id,
				name : id,
				fieldLabel : fieldLabel,
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 400,
				listWidth : 300,
				tpl : '<div id="' + treeDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : emptyText
			});

	// 创建树形结构
	var tree = new Ext.tree.TreePanel({
		id : id + 'tree',
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
							+ '/system/ddindexshow.do?method=alltree&showLevel='
							+ showLevel_
				}),
		listeners : {
			load : function(node) {
				var ids = Ext.getCmp(formId).getForm().findField(returnIdField)
						.getValue();

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

	tree.loader.on('beforeload', function(treeLoader) {
				// treeLoader.url = node.attributes.url;

				var root = Ext.getCmp(formId).getForm()
						.findField(cascadeItemName) ? Ext.getCmp(formId)
						.getForm().findField(cascadeItemName).getValue() : '';

				if (root == '') {
					root = 'pointforemptydic';
				}

				treeLoader.baseParams = {
					id : root
				}
			});

	tree.on('click', function(node, event) {
				// comboWithTooltip.setValue(node.text);
				Ext.getCmp(comboWithTooltip.id).setValue(node.text);
				comboWithTooltip.value = node.id;

				if (Ext.getCmp(formId).getForm().findField(returnIdField)) {
					Ext.getCmp(formId).getForm().findField(returnIdField)
							.setValue(node.id);

				}

				if (Ext.getCmp(formId).getForm().findField(returnNameField)) {
					Ext.getCmp(formId).getForm().findField(returnNameField)
							.setValue(node.text);
				}

				if (returnTypeField != null
						&& Ext.getCmp(formId).getForm()
								.findField(returnTypeField)) {
					Ext.getCmp(formId).getForm().findField(returnTypeField)
							.setValue(node.attributes.code);
				}

				comboWithTooltip.collapse();

				if (returnFunc != null) {
					returnFunc(node, formId, itemIndex);
				}
			});

	var root = new Ext.tree.AsyncTreeNode({
				text : 'The root node data category', // 节点名称
				draggable : false, // 是否支持拖动
				id : '0' // 节点id
			});

	tree.setRootNode(root);
	comboWithTooltip.on('expand', function() {
		tree.render(treeDivId);
			// tree.expandAll();
		});

	return comboWithTooltip;
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
function isCheckedDataIndexNode(id, ids) {
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

function hasSelectTQGridRecord(ids, recordId) {
	var r = false;
	var idstr = ids.split(',');
	for (var i = 0; i < idstr.length; i++) {
		if (idstr[i] == recordId) {
			r = true;
			break;
		}
	}
	return r;
}

/**
 * 初始化对象数据信息在form组件中
 * 
 * @param {}
 *            key 查询key
 * @param {}
 *            func 查询成功后回调函数(开发者自定义)
 * @param {}
 *            returnIdField 接收返回值(ID)的表单ID
 * @param {}
 *            returnIdField 接收返回值(NAME)的表单ID
 * @param {}
 *            pointToId 返回id
 * @param {}
 *            pointToName 返回value
 * @param {}
 *            allowBlank 非必选项
 */
function getTableQueryCombo(fieldLabel, key, func, setFunc, returnIdField,
		returnNameField, pointId, pointName, allowBlank, formId, itemOptions,
		formOptions) {
	var id = formId + '_' + returnIdField + '_';
	var name = formId + '_' + returnNameField + '_';
	var treeDivId = 'TableQueryComboTree_' + formId + '_' + returnIdField;

	var borderPanel;

	if (key != null) {
		var options = {
			tabid : formId + '_TQ_' + returnIdField,
			comboWithTooltip : id,
			pointId : pointId,
			pointName : pointName,
			setFunc : setFunc,
			formId : formId,
			returnIdField : returnIdField,
			returnNameField : returnNameField,
			querykey : key,
			func : func,
			height : 100
		};

		if (itemOptions.pageSize) {
			options.pageSize = itemOptions.pageSize;
		}

		if (formOptions.params != null) {
			options.params = formOptions.params;
		}

		// 初始化tablequerycombobox前调用函数,可用于初始化查询参数
		if (func) {
			eval(func + '(options, formOptions)');
		}

		borderPanel = initTVqueryList(options);
		if (borderPanel != null) {
			borderPanel.height = 300;
			borderPanel.border = false;
		}
	} else {
		var options = {
			tabid : formId + '_TQ_' + returnIdField,
			comboWithTooltip : id,
			pointId : pointId,
			pointName : pointName,
			setFunc : setFunc,
			formId : formId,
			returnIdField : returnIdField,
			returnNameField : returnNameField,
			height : 100
		};

		if (itemOptions.pageSize) {
			options.pageSize = itemOptions.pageSize;
		}

		if (formOptions.params != null) {
			options.params = formOptions.params;
		}

		// 初始化tablequerycombobox前调用函数,可用于初始化查询参数
		if (func) {
			eval('borderPanel = ' + func + '(options, formOptions)');
		}
	}

	var gridId = formId + '_TQ_' + returnIdField + '_grid';

	var grid = Ext.getCmp(gridId);

	if (grid != null) {
		grid.on('render', function() {
					var total = grid.getStore().getCount();// 数据行数

					var arr = [];
					for (var j = 0; j < total; j++) {
						var record = grid.getStore().getAt(j);

						if (hasSelectTQGridRecord(Ext.getCmp(formId).getForm()
										.findField(returnIdField).getValue(),
								record.get(pointId))) {
							arr.push(record);
						}
					}
					grid.getSelectionModel().selectRecords(arr);
				}, this, {
					delay : 1000
				});
	}

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : id,
				gridId : gridId,
				fieldLabel : fieldLabel,
				valueField : id, // 提交表单时，下拉框的值
				displayField : name, // 显示在页面上下拉框的值
				mode : 'local',
				triggerAction : 'all',
				listWidth : itemOptions.listWidth ? itemOptions.listWidth : 600,
				maxHeight : 400,
				tpl : '<div id="' + treeDivId + '"></div>',
				forceSelection : true,
				selectOnFocus : true,
				allowBlank : allowBlank,
				emptyText : 'Please choose...'
			});

	comboWithTooltip.on('expand', function() {
				borderPanel.render(treeDivId);
				autoLoadTQListObject(grid);
			});

	return comboWithTooltip;
}

/**
 * 获得角色列表combo(单选)
 * 
 * @return {}
 */
function getRoleSingleSelectCombo(combolabel, returnIdField, returnNameField,
		returnTypeField, defaultValue, allowBlank, formId) {
	var id = formId + '_' + returnIdField + '_';
	var listDivId = 'RoleSingleSelectCombo_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				fieldLabel : combolabel,
				editable : false,
				id : id,
				name : id,
				mode : 'local',
				triggerAction : 'all',
				listWidth : 450,
				maxHeight : 400,
				tpl : '<div id="' + listDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : 'Please choose...'
			});

	var RoleListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'roleList',
				fields : ['id', 'name', 'memo', 'key', 'raccede', 'rv',
						'rvrating', 'rvtype'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/rolelist.do?method=selectlist'
						})
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true,
				handleMouseDown : Ext.emptyFn
			});

	var RoleListGrid = new Ext.grid.GridPanel({
				store : RoleListStore,
				columns : [sm, {
							header : 'Role name',
							width : 150,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : 'Role Description',
							width : 150,
							sortable : true,
							dataIndex : 'memo'
						}],
				sm : sm,
				stripeRows : true,
				autoExpandColumn : 'name',
				layout : 'fit',
				height : 250,
				border : false,
				viewConfig : {
					forceFit : true
				},
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Data loading, please wait a moment..."
				},
				bbar : [{
					text : "Choose",
					iconCls : 'icon-pselectuser',
					handler : function() {
						var names = '', ids = '', types = '', selNodes = RoleListGrid
								.getSelectionModel().getSelections();
						Ext.each(selNodes, function(node) {
									if (names.length > 0) {
										names += ',';
										ids += ',';
										types += ',';
									}
									names += node.data.name;
									ids += node.data.id;
									types += node.data.key;
								});

						// comboWithTooltip.setValue(names);
						Ext.getCmp(formId).getForm()
								.findField(comboWithTooltip.id).setValue(names);
						comboWithTooltip.value = ids;

						if (Ext.getCmp(formId).getForm()
								.findField(returnIdField)) {
							Ext.getCmp(formId).getForm()
									.findField(returnIdField).setValue(ids);

						}

						if (Ext.getCmp(formId).getForm()
								.findField(returnNameField)) {
							Ext.getCmp(formId).getForm()
									.findField(returnNameField).setValue(names);
						}

						if (Ext.getCmp(formId).getForm()
								.findField(returnTypeField)) {
							Ext.getCmp(formId).getForm()
									.findField(returnTypeField).setValue(types);
						}
						comboWithTooltip.collapse();
					}
				}, {
					text : "Cancel",
					iconCls : 'icon-punchk',
					handler : function() {
						comboWithTooltip.collapse();
					}
				}]
			});

	comboWithTooltip.on('expand', function() {
		RoleListGrid.render(listDivId);
		RoleListStore.load({
			params : {
				start : 0,
				limit : 20
			},
			callback : function(r, options, success) {
				if (success == false) {
					Ext.Msg.alert('ERROR', 'Load data is abnormal.');
				} else {
					var total = RoleListGrid.getStore().getCount();// 数据行数

					var arr = [];
					for (var j = 0; j < total; j++) {
						var record = RoleListGrid.getStore().getAt(j);
						if (Ext.getCmp(formId).getForm()
								.findField(returnIdField).getValue() == record.data.id) {
							arr.push(record);
						}
					}
					if (arr.length > 0) {
						RoleListGrid.getSelectionModel().selectRecords(arr);
					}
				}
			}

		});
	});

	if (defaultValue) {
		comboWithTooltip.setValue(defaultValue);
	}

	return comboWithTooltip;
}

/**
 * 获得角色列表combo(多选)
 * 
 * @return {}
 */
function getRoleSelectCombo(combolabel, returnIdField, returnNameField,
		returnTypeField, defaultValue, allowBlank, formId) {
	var id = formId + '_' + returnIdField + '_';
	var listDivId = 'RoleSelect_' + formId + '_' + returnIdField;

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				fieldLabel : combolabel,
				editable : false,
				id : id,
				name : id,
				mode : 'local',
				triggerAction : 'all',
				listWidth : 450,
				maxHeight : 400,
				tpl : '<div id="' + listDivId + '"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : 'Please choose...'
			});

	var RoleListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'roleList',
				fields : ['id', 'name', 'memo', 'key', 'raccede', 'rv',
						'rvrating', 'rvtype'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/rolelist.do?method=selectlist'
						})
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var RoleListGrid = new Ext.grid.GridPanel({
				store : RoleListStore,
				columns : [sm, {
							header : 'Role name',
							width : 150,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : 'Role Description',
							width : 150,
							sortable : true,
							dataIndex : 'memo'
						}],
				sm : sm,
				stripeRows : true,
				autoExpandColumn : 'name',
				region : 'center',
				layout : 'fit',
				height : 250,
				border : false,
				viewConfig : {
					forceFit : true
				},
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Data loading, please wait a moment..."
				},
				bbar : [{
					text : "Choose",
					iconCls : 'icon-pselectuser',
					handler : function() {
						var names = '', ids = '', types = '', selNodes = RoleListGrid
								.getSelectionModel().getSelections();
						Ext.each(selNodes, function(node) {
									if (names.length > 0) {
										names += ',';
										ids += ',';
										types += ',';
									}
									names += node.data.name;
									ids += node.data.id;
									types += node.data.key;
								});

						// comboWithTooltip.setValue(names);
						Ext.getCmp(formId).getForm()
								.findField(comboWithTooltip.id).setValue(names);
						comboWithTooltip.value = ids;

						if (Ext.getCmp(formId).getForm()
								.findField(returnIdField)) {
							Ext.getCmp(formId).getForm()
									.findField(returnIdField).setValue(ids);

						}

						if (Ext.getCmp(formId).getForm()
								.findField(returnNameField)) {
							Ext.getCmp(formId).getForm()
									.findField(returnNameField).setValue(names);
						}

						if (Ext.getCmp(formId).getForm()
								.findField(returnTypeField)) {
							Ext.getCmp(formId).getForm()
									.findField(returnTypeField).setValue(types);
						}
						comboWithTooltip.collapse();
					}
				}, {
					text : "Cancel",
					iconCls : 'icon-punchk',
					handler : function() {
						comboWithTooltip.collapse();
					}
				}]
			});

	comboWithTooltip.on('expand', function() {
				RoleListGrid.render(listDivId);
				RoleListStore.load({
							params : {
								start : 0,
								limit : 20
							},
							callback : function(r, options, success) {
								if (success == false) {
									Ext.Msg.alert('ERROR', 'Load data is abnormal.');
								} else {
									var total = RoleListGrid.getStore()
											.getCount();// 数据行数

									var arr = [];
									for (var j = 0; j < total; j++) {
										var record = RoleListGrid.getStore()
												.getAt(j);
										if (hasSelected(
												Ext
														.getCmp(formId)
														.getForm()
														.findField(returnIdField)
														.getValue(),
												record.data.id)) {
											arr.push(record);
										}
									}
									if (arr.length > 0) {
										RoleListGrid.getSelectionModel()
												.selectRecords(arr);
									}
								}
							}
						});
			});

	return comboWithTooltip;
}

/**
 * dataindex级联控件
 * 
 * @param {}
 *            item
 * @param {}
 *            addressPrefix
 * @param {}
 *            formId
 * @param {}
 *            componentItems
 * @param {}
 *            options
 * @return {}
 */
function getCascadeItems(item, itemParam, formId, componentItems, options,
		resultJson, formObj) {
	// 主combobox回掉函数
	var returnFunc = function(node, formId) {
		if (itemParam.items) {
			Ext.each(itemParam.items, function(it, i) {
						var dicItem = methods.findComponentItems(
								componentItems, item.tableName + '_'
										+ it.targetName);

						var comboboxId = formId + '_' + it.target + '_';

						Ext.getCmp(comboboxId).setValue('');
						Ext.getCmp(comboboxId).value = '';

						var treeId = formId + '_' + it.target + '_tree';
						if (Ext.getCmp(treeId).getRootNode().isLoaded()) {
							Ext.getCmp(treeId).loader.load(Ext.getCmp(treeId)
											.getRootNode(), function() {
									});// 重新加载数据
						}

						var itTarget = methods.findComponentItems(
								componentItems, item.tableName + '_'
										+ it.target);
						if (Ext.getCmp(formId).getForm()
								.findField(itTarget.formName)) {
							Ext.getCmp(formId).getForm()
									.findField(itTarget.formName).setValue('');
						}

						var itTargetName = methods.findComponentItems(
								componentItems, item.tableName + '_'
										+ it.targetName);
						if (Ext.getCmp(formId).getForm()
								.findField(itTargetName.formName)) {
							Ext.getCmp(formId).getForm()
									.findField(itTargetName.formName)
									.setValue('');
						}

						var itTargetType = methods.findComponentItems(
								componentItems, item.tableName + '_'
										+ it.targetType);
						if (Ext.getCmp(formId).getForm()
								.findField(itTargetType.formName)) {
							Ext.getCmp(formId).getForm()
									.findField(itTargetType.formName)
									.setValue('');
						}
					});
		}

		// 自定义回掉函数
		if (itemParam.returnFunc) {
			itemParam.returnFunc(node, formId, it);
		}
	};

	var targetNameItem = methods.findComponentItems(componentItems,
			itemParam[itemParam.targetName]);

	var targetTypeItem = methods.findComponentItems(componentItems,
			itemParam[itemParam.targetType]);

	var dditemOptions = {
		fieldLabel : item.label,
		returnIdField : item.formName,
		returnNameField : targetNameItem.formName,
		returnTypeField : itemParam.targetType,
		type : itemParam.type,
		allowBlank : itemParam.allowBlank,
		returnFunc : returnFunc,
		formId : formId,
		showLevel : itemParam.showLevel,
		emptyText : (itemParam.emptyText == null
				? 'Please choose...'
				: itemParam.emptyText)
	}

	if (targetTypeItem != null) {
		dditemOptions.returnTypeField = targetTypeItem.formName;
	}

	var mainDIC = getDataIndexCombo(dditemOptions);

	var huntItem = false;

	// rule as item definition
	if (itemParam.hunt != null) {
		huntItem = o.hunt;
	} else if (options.globalHuntItem == true) {
		// rule as global setting
		huntItem = true;
	}

	var urlparam = options.params;

	var targetFactValue = methods.initBeanValue(targetNameItem,
			options.beanData);

	var nameItemLabel = methods.getDefaultValue(targetFactValue,
			targetNameItem.defaultValue, urlparam);

	if (nameItemLabel != null && trim(nameItemLabel) != '') {
		mainDIC.setValue(nameItemLabel);
	}

	if (huntItem && methods.fox(item, options.beanData)) {
		var factValue = methods.initBeanValue(item, options.beanData);

		var dv = methods
				.getDefaultValue(factValue, item.defaultValue, urlparam);

		dditem.on('blur', function(thiz) {
					if (thiz.getValue() != dv) {
						if (targetNameItem != null) {
							methods.foxhound(targetNameItem, nameItemLabel,
									thiz, resultJson, formObj, options);
						} else {
							methods.foxhound(item, dv, thiz, resultJson,
									formObj, options);
						}
					}
				});
	}

	var compositefieldItems = [];

	compositefieldItems.push(mainDIC);

	// 遍历级联组件定义
	if (itemParam.items) {
		Ext.each(itemParam.items, function(it, i) {
			var dicItem = methods.findComponentItems(componentItems,
					item.tableName + '_' + it.target);
			var dicItemName = methods.findComponentItems(componentItems,
					item.tableName + '_' + it.targetName);
			var dicItemType = methods.findComponentItems(componentItems,
					item.tableName + '_' + it.targetType);

			var parentItemName = null;

			if (i == 0) {
				parentItemName = item.formName
			} else if (i > 0) {
				parentItemName = methods.findComponentItems(componentItems,
						item.tableName + '_' + itemParam.items[i - 1].target).formName;
			}

			it.itemIndex = i;

			var itReturnFunc = function(node, formId, itemIndex) {
				for (var j = itemIndex + 1; j < itemParam.items.length; j++) {
					var comboboxId = formId + '_' + itemParam.items[j].target
							+ '_';

					Ext.getCmp(comboboxId).setValue('');
					Ext.getCmp(comboboxId).value = '';

					var treeId = formId + '_' + itemParam.items[j].target
							+ '_tree';
					if (Ext.getCmp(treeId).getRootNode().isLoaded()) {
						Ext.getCmp(treeId).loader.load(Ext.getCmp(treeId)
										.getRootNode(), function() {
								});// 重新加载数据
					}

					var itTarget = methods.findComponentItems(componentItems,
							item.tableName + '_' + itemParam.items[j].target);
					if (Ext.getCmp(formId).getForm()
							.findField(itTarget.formName)) {
						Ext.getCmp(formId).getForm()
								.findField(itTarget.formName).setValue('');
					}

					var itTargetName = methods.findComponentItems(
							componentItems, item.tableName + '_'
									+ itemParam.items[j].targetName);
					if (Ext.getCmp(formId).getForm()
							.findField(itTargetName.formName)) {
						Ext.getCmp(formId).getForm()
								.findField(itTargetName.formName).setValue('');
					}

					var itTargetType = methods.findComponentItems(
							componentItems, item.tableName + '_'
									+ itemParam.items[j].targetType);
					if (Ext.getCmp(formId).getForm()
							.findField(itTargetType.formName)) {
						Ext.getCmp(formId).getForm()
								.findField(itTargetType.formName).setValue('');
					}
				}

				// 自定义回掉函数
				if (itemParam.items[itemIndex].returnFunc) {
					itemParam.items[itemIndex].returnFunc(node, formId,
							itemParam.items[itemIndex]);
				}
			};

			var _dditemOptions = {
				fieldLabel : dicItem.label,
				returnIdField : dicItem.formName,
				returnNameField : dicItemName.formName,
				cascadeItemName : parentItemName,
				allowBlank : it.allowBlank,
				returnFunc : itReturnFunc,
				formId : formId,
				showLevel : it.showLevel,
				itemIndex : i,
				emptyText : (it.emptyText == null ? 'Please choose...' : it.emptyText)
			}

			if (dicItemType != null) {
				_dditemOptions.returnTypeField = dicItemType.formName;
			}

			var dic = getDataIndexComboCascade(_dditemOptions);

			var targetFactValue = methods.initBeanValue(dicItemName,
					options.beanData);

			var nameItemLabel = methods.getDefaultValue(targetFactValue,
					dicItemName.defaultValue, urlparam);

			if (nameItemLabel != null && trim(nameItemLabel) != '') {
				dic.setValue(nameItemLabel);
			}

			if (huntItem && methods.fox(dicItem, options.beanData)) {
				var factValue = methods
						.initBeanValue(dicItem, options.beanData);

				var dv = methods.getDefaultValue(factValue,
						dicItem.defaultValue, urlparam);

				dditem.on('blur', function(thiz) {
							if (thiz.getValue() != dv) {
								if (dicItemName != null) {
									methods.foxhound(dicItemName,
											nameItemLabel, thiz, resultJson,
											formObj, options);
								} else {
									methods.foxhound(dicItem, dv, thiz,
											resultJson, formObj, options);
								}
							}
						});
			}

			compositefieldItems.push({
						xtype : 'displayfield',
						value : '-'
					});

			compositefieldItems.push(dic)
		});
	}

	if (itemParam.closeText) {
		var closeTextItem = methods.findComponentItems(componentItems,
				item.tableName + '_' + itemParam.closeText);

		if (closeTextItem == null) {
			alert('Cascade type of view component<' + item.name + '>closeText components('
					+ itemParam.closeText + ')are not defined, it will affect the integrity of the data');
		} else {
			var factValue;

			if (options.beanData != null) {
				factValue = methods.initBeanValue(closeTextItem,
						options.beanData);
			}

			var dv = methods.getDefaultValue(factValue,
					closeTextItem.defaultValue, urlparam);

			var o = closeTextItem.param;

			var it = {
				fieldLabel : closeTextItem.label,
				name : closeTextItem.formName + '_',
				xtype : 'textfield',
				allowBlank : (o.allowBlank == null || o.allowBlank),
				disabled : (o.disabled == true),
				value : dv,
				listeners : {
					blur : function(thiz) {
						Ext.getCmp(formId).getForm()
								.findField(closeTextItem.formName)
								.setValue(thiz.getValue());
					}
				}
			}

			if (o.width) {
				it.width = o.width;
			} else {
				it.width = 180;
			}

			if (o.height) {
				it.height = o.height;
			}

			if (o.vtype) {
				it.vtype = o.vtype;
				if (o.confirmTo)
					it.confirmTo = {
						formId : formId,
						confirmTo : o.confirmTo
					}
			}

			if (o.minLength) {
				it.minLength = o.minLength;
			}

			if (o.minLengthText) {
				it.minLengthText = o.minLengthText;
			}

			if (o.maxLength == null) {
				o.maxLength = item.length;
			}

			if (o.maxLength) {
				it.maxLength = o.maxLength;
			}

			if (o.maxLengthText) {
				it.maxLengthText = o.maxLengthText;
			}

			if (o.listenClick) {
				it.listeners.click = function(thiz) {
					var closeText = Ext.getCmp(formId).getForm()
							.findField(closeTextItem.formName);

					try {
						eval(o.listenClick
								+ '(thiz, closeText, item, formId, options);');
					} catch (error) {
						alert(error.message);
					}
				}
			}

			if (o.listenBlur) {
				it.listeners.blur = function(thiz) {
					var closeText = Ext.getCmp(formId).getForm()
							.findField(closeTextItem.formName);

					try {
						eval(o.listenBlur
								+ '(thiz, closeText, item, formId, options);');
					} catch (error) {
						alert(error.message);
					}
				}
			}

			compositefieldItems.push({
						xtype : 'displayfield',
						value : '-'
					});

			compositefieldItems.push(it);
		}
	}

	var it = {
		xtype : 'compositefield',
		fieldLabel : item.label,
		items : compositefieldItems
	};

	return it;

}

/**
 * 初始化电话组件分为区号-电话号码-分机号
 * 
 * @param {}
 *            item
 * @param {}
 *            addressPrefix
 * @param {}
 *            formId
 * @param {}
 *            componentItems
 * @param {}
 *            options
 * @return {}
 */
function getCatenaItems(item, params, formId, componentItems, options,
		resultJson, formObj) {
	var compositefieldItems = [];

	var urlparam = options.urlparam;

	var factValue = null;

	if (options.beanData != null) {
		factValue = methods.initBeanValue(item, options.beanData);
	}

	var dv = methods.getDefaultValue(factValue, item.defaultValue, urlparam);

	var type = (item.type == 'number' ? 'numberfield' : 'textfield');

	var it = {
		name : item.formName,
		xtype : type,
		allowBlank : (params.allowBlank == null || params.allowBlank),
		disabled : (params.disabled == true),
		value : dv,
		listeners : {}
	}

	if (params.emptyText != null) {
		it.emptyText = params.emptyText;
	}

	if (params.allowDecimals) {
		// 允许小数点
		it.allowDecimals = params.allowDecimals;
	}

	if (params.allowNegative) {
		// 允许负数
		it.allowNegative = params.allowNegative;
	}

	if (params.width) {
		it.width = params.width;
	} else {
		it.width = 180;
	}

	if (params.height) {
		it.height = params.height;
	}

	if (params.vtype) {
		it.vtype = params.vtype;
		if (params.confirmTo)
			it.confirmTo = {
				formId : formId,
				confirmTo : params.confirmTo
			}
	}

	if (params.minLength) {
		it.minLength = params.minLength;
	}

	if (params.minLengthText) {
		it.minLengthText = params.minLengthText;
	}

	if (params.maxLength == null) {
		params.maxLength = item.length;
	}

	if (params.maxLength) {
		it.maxLength = params.maxLength;
	}

	if (params.maxLengthText) {
		it.maxLengthText = params.maxLengthText;
	}

	if (params.listenClick) {
		it.listeners.click = function(thiz) {
			try {
				eval(params.listenClick + '(thiz, formId, options);');
			} catch (error) {
				alert(error.message);
			}
		}
	}

	if (params.listenBlur) {
		it.listeners.blur = function(thiz) {
			try {
				eval(params.listenBlur + '(thiz, formId, options);');
			} catch (error) {
				alert(error.message);
			}
		}
	}

	var huntItem = false;

	// rule as item definition
	if (params.hunt != null) {
		huntItem = o.hunt;
	} else if (options.globalHuntItem == true) {
		// rule as global setting
		huntItem = true;
	}

	if (huntItem && methods.fox(item, options.beanData)) {
		it.listeners.change = function(thiz) {
			methods.foxhound(item, dv, thiz, resultJson, formObj, options);
		};
	}

	compositefieldItems.push(it);

	if (params.items != null && params.items.length > 0) {
		Ext.each(params.items, function(node, i) {
			var factValue = null;

			var catenaItem = methods.findComponentItems(componentItems,
					item.tableName + '_' + node.target);

			if (catenaItem == null) {
				alert('Catena type of view component<' + item.name + '>associated components(' + node.target
						+ ')are not defined, it will affect the integrity of the data ');
			}

			if (options.beanData != null) {
				factValue = methods.initBeanValue(catenaItem, options.beanData);
			}

			var dv = methods.getDefaultValue(factValue,
					catenaItem.defaultValue, urlparam);

			var type = (node.type == 'numberfield' ? node.type : 'textfield');

			var it = {
				name : catenaItem.formName + '_',
				xtype : type,
				allowBlank : (catenaItem.param.allowBlank == null || catenaItem.param.allowBlank),
				disabled : (catenaItem.param.disabled == true),
				value : dv,
				listeners : {
					blur : function(thiz) {
						Ext.getCmp(formId).getForm()
								.findField(catenaItem.formName).setValue(thiz
										.getValue());
					}
				}
			}

			if (catenaItem.param.allowDecimals) {
				// 允许小数点
				it.allowDecimals = catenaItem.param.allowDecimals;
			}

			if (catenaItem.param.allowNegative) {
				// 允许负数
				it.allowNegative = catenaItem.param.allowNegative;
			}

			if (node.emptyText != null) {
				it.emptyText = node.emptyText;
			}

			if (catenaItem.param.width) {
				it.width = catenaItem.param.width;
			} else {
				it.width = 180;
			}

			if (catenaItem.param.height) {
				it.height = catenaItem.param.height;
			}

			if (params.vtype) {
				it.vtype = catenaItem.param.vtype;
				if (catenaItem.param.confirmTo)
					it.confirmTo = {
						formId : formId,
						confirmTo : catenaItem.param.confirmTo
					}
			}

			if (catenaItem.param.minLength) {
				it.minLength = catenaItem.param.minLength;
			}

			if (catenaItem.param.minLengthText) {
				it.minLengthText = catenaItem.param.minLengthText;
			}

			if (catenaItem.param.maxLength == null) {
				params.maxLength = catenaItem.param.length;
			}

			if (catenaItem.param.maxLength) {
				it.maxLength = catenaItem.param.maxLength;
			}

			if (catenaItem.param.maxLengthText) {
				it.maxLengthText = catenaItem.param.maxLengthText;
			}

			if (catenaItem.param.listenClick) {
				it.listeners.click = function(thiz) {
					try {
						eval(catenaItem.param.listenClick
								+ '(thiz, formId, options);');
					} catch (error) {
						alert(error.message);
					}
				}
			}

			if (catenaItem.param.listenBlur) {
				it.listeners.blur = function(thiz) {
					try {
						eval(catenaItem.param.listenBlur
								+ '(thiz, formId, options);');
					} catch (error) {
						alert(error.message);
					}
				}
			}

			var huntItem = false;

			// rule as item definition
			if (catenaItem.param.hunt != null) {
				huntItem = o.hunt;
			} else if (options.globalHuntItem == true) {
				// rule as global setting
				huntItem = true;
			}

			if (huntItem && methods.fox(catenaItem, options.beanData)) {
				it.listeners.change = function(thiz) {
					methods.foxhound(catenaItem, dv, thiz, resultJson, formObj,
							options);
				};
			}

			compositefieldItems.push({
						xtype : 'displayfield',
						value : '-'
					});

			compositefieldItems.push(it);
		});
	}

	var catena = {
		xtype : 'compositefield',
		fieldLabel : item.label,
		items : compositefieldItems
	};

	return catena;
}

Ext.form.CompositeField = Ext.extend(Ext.form.Field, {

	defaultMargins : '0 5 0 0',

	skipLastItemMargin : true,

	isComposite : true,

	combineErrors : false,

	labelConnector : ', ',

	initComponent : function() {
		var labels = [], items = this.items, item;

		for (var i = 0, j = items.length; i < j; i++) {
			item = items[i];

			labels.push(item.fieldLabel);

			Ext.apply(item, this.defaults);

			if (!(i == j - 1 && this.skipLastItemMargin)) {
				Ext.applyIf(item, {
							margins : this.defaultMargins
						});
			}
		}

		this.fieldLabel = this.fieldLabel || this.buildLabel(labels);

		this.fieldErrors = new Ext.util.MixedCollection(true, function(item) {
					return item.field;
				});

		this.fieldErrors.on({
					scope : this,
					add : this.updateInvalidMark,
					remove : this.updateInvalidMark,
					replace : this.updateInvalidMark
				});

		Ext.form.CompositeField.superclass.initComponent.apply(this, arguments);
	},

	onRender : function(ct, position) {
		if (!this.el) {

			var innerCt = this.innerCt = new Ext.Container({
						layout : 'hbox',
						renderTo : ct,
						items : this.items,
						cls : 'x-form-composite',
						defaultMargins : '0 3 0 0'
					});

			this.el = innerCt.getEl();

			var fields = innerCt.findBy(function(c) {
						return c.isFormField;
					}, this);

			this.items = new Ext.util.MixedCollection();
			this.items.addAll(fields);

			if (this.combineErrors) {
				this.eachItem(function(field) {
							Ext.apply(field, {
										markInvalid : this.onFieldMarkInvalid
												.createDelegate(this, [field],
														0),
										clearInvalid : this.onFieldClearInvalid
												.createDelegate(this, [field],
														0)
									});
						});
			}

			var l = this.el.parent().parent().child('label', true);
			if (l) {
				l.setAttribute('for', this.items.items[0].id);
			}
		}

		Ext.form.CompositeField.superclass.onRender.apply(this, arguments);
	},

	onFieldMarkInvalid : function(field, message) {
		var name = field.getName(), error = {
			field : name,
			error : message
		};

		this.fieldErrors.replace(name, error);

		field.el.addClass(field.invalidClass);
	},

	onFieldClearInvalid : function(field) {
		this.fieldErrors.removeKey(field.getName());

		field.el.removeClass(field.invalidClass);
	},

	updateInvalidMark : function() {
		var ieStrict = Ext.isIE6 && Ext.isStrict;

		if (this.fieldErrors.length == 0) {
			this.clearInvalid();

			if (ieStrict) {
				this.clearInvalid.defer(50, this);
			}
		} else {
			var message = this
					.buildCombinedErrorMessage(this.fieldErrors.items);

			this.sortErrors();
			this.markInvalid(message);

			if (ieStrict) {
				this.markInvalid(message);
			}
		}
	},

	validateValue : function() {
		var valid = true;

		this.eachItem(function(field) {
					if (!field.isValid())
						valid = false;
				});

		return valid;
	},

	buildCombinedErrorMessage : function(errors) {
		var combined = [], error;

		for (var i = 0, j = errors.length; i < j; i++) {
			error = errors[i];

			combined.push(String.format("{0}: {1}", error.field, error.error));
		}

		return combined.join("<br />");
	},

	sortErrors : function() {
		var fields = this.items;

		this.fieldErrors.sort("ASC", function(a, b) {
			var findByName = function(key) {
				return function(field) {
					return field.getName() == key;
				};
			};

			var aIndex = fields.findIndexBy(findByName(a.field)), bIndex = fields
					.findIndexBy(findByName(b.field));

			return aIndex < bIndex ? -1 : 1;
		});
	},

	reset : function() {
		this.eachItem(function(item) {
					item.reset();
				});

(function() {
			this.clearInvalid();
		}).defer(50, this);
	},

	clearInvalidChildren : function() {
		this.eachItem(function(item) {
					item.clearInvalid();
				});
	},

	buildLabel : function(segments) {
		return Ext.clean(segments).join(this.labelConnector);
	},

	isDirty : function() {

		if (this.disabled || !this.rendered) {
			return false;
		}

		var dirty = false;
		this.eachItem(function(item) {
					if (item.isDirty()) {
						dirty = true;
						return false;
					}
				});
		return dirty;
	},

	eachItem : function(fn, scope) {
		if (this.items && this.items.each) {
			this.items.each(fn, scope || this);
		}
	},

	onResize : function(adjWidth, adjHeight, rawWidth, rawHeight) {
		var innerCt = this.innerCt;

		if (this.rendered && innerCt.rendered) {
			innerCt.setSize(adjWidth, adjHeight);
		}

		Ext.form.CompositeField.superclass.onResize.apply(this, arguments);
	},

	doLayout : function(shallow, force) {
		if (this.rendered) {
			var innerCt = this.innerCt;

			innerCt.forceLayout = this.ownerCt.forceLayout;
			innerCt.doLayout(shallow, force);
		}
	},

	beforeDestroy : function() {
		Ext.destroy(this.innerCt);

		Ext.form.CompositeField.superclass.beforeDestroy.call(this);
	},

	setReadOnly : function(readOnly) {
		if (readOnly == undefined) {
			readOnly = true;
		}
		readOnly = !!readOnly;

		if (this.rendered) {
			this.eachItem(function(item) {
						item.setReadOnly(readOnly);
					});
		}
		this.readOnly = readOnly;
	},

	onShow : function() {
		Ext.form.CompositeField.superclass.onShow.call(this);
		this.doLayout();
	},

	onDisable : function() {
		this.eachItem(function(item) {
					item.disable();
				});
	},

	onEnable : function() {
		this.eachItem(function(item) {
					item.enable();
				});
	}
});

Ext.reg('compositefield', Ext.form.CompositeField);