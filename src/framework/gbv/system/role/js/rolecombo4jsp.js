/**
 * 获得角色列表combo(多选)
 * 
 * @return {}
 */
function getRoleSelectCombo(returnIdField, returnNameField, returnTypeField,
		defaultValue, allowBlank) {
	var comboxid = returnIdField + '_';

	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : comboxid,
				name : comboxid,
				mode : 'local',
				triggerAction : 'all',
				listWidth : 450,
				maxHeight : 400,
				tpl : '<div id="roleComboListArea"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
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
				id : 'RoleListGrid',
				store : RoleListStore,
				columns : [sm, {
							header : '角色名称',
							width : 150,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : '角色说明',
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
					msg : "数据加载中，请稍等..."
				},
				bbar : [{
					text : "选 择",
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
									types += 'role';
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
				}]
			});
	/*
	 * , { text : "取 消", iconCls : 'icon-punchk', handler : function() {
	 * comboWithTooltip.collapse(); } }
	 */

	RoleListGrid.on('render', function() {
				var total = RoleListGrid.getStore().getCount();// 数据行数

				var arr = [];
				for (var j = 0; j < total; j++) {
					var record = RoleListGrid.getStore().getAt(j);

					if (hasSelected(Ext.getCmp(returnIdField).getValue(),
							record.data.id)) {
						arr.push(record);
					}
				}
				RoleListGrid.getSelectionModel().selectRecords(arr);
			}, this, {
				delay : 1000
			});

	comboWithTooltip.on('expand', function() {
				RoleListGrid.render('roleComboListArea');
				RoleListStore.load({
							params : {
								start : 0,
								limit : 20
							},
							callback : function(r, options, success) {
								if (success == false) {
									Ext.Msg.alert('ERROR', '加载数据出现异常.');
								} else {

								}
							}
						});
			});

	return comboWithTooltip;
}

/**
 * 是否默认选中
 * 
 * @param {}
 *            ids
 * @param {}
 *            recordId
 * @return {}
 */
function hasSelected(ids, recordId) {
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
 * 获得角色列表combo(单选)
 * 
 * @return {}
 */
function getRoleSingleSelectCombo(returnIdField, returnNameField,
		returnTypeField, defaultValue, allowBlank) {
	var comboxid = returnIdField + '_';		
			
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : comboxid,
				name : comboxid,
				mode : 'local',
				triggerAction : 'all',
				listWidth : 450,
				maxHeight : 400,
				tpl : '<div id="roleComboListArea"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
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
							header : '角色名称',
							width : 150,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : '角色说明',
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
					msg : "数据加载中，请稍等..."
				},
				bbar : [{
					text : "选 择",
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
									types += 'role';
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
					text : "取 消",
					iconCls : 'icon-punchk',
					handler : function() {
						comboWithTooltip.collapse();
					}
				}]
			});

	comboWithTooltip.on('expand', function() {
		RoleListGrid.render('roleComboListArea');
		RoleListStore.load({
			params : {
				start : 0,
				limit : 20
			},
			callback : function(r, options, success) {
				if (success == false) {
					Ext.Msg.alert('ERROR', '加载数据出现异常.');
				} else {
					var total = RoleListGrid.getStore().getCount();// 数据行数

					var arr = [];
					for (var j = 0; j < total; j++) {
						var record = RoleListGrid.getStore().getAt(j);
						if (Ext.getCmp(returnIdField).getValue() == record.data.id) {
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
 * 获得角色列表combo(单选,返回值为角色key)
 * 
 * @return {}
 */
function getRoleSingleSelectComboK(returnIdField, returnNameField,
		returnTypeField, defaultValue, allowBlank) {
	var comboxid = returnIdField + '_';			
			
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				editable : false,
				id : comboxid,
				name : comboxid,
				mode : 'local',
				triggerAction : 'all',
				listWidth : 450,
				maxHeight : 400,
				tpl : '<div id="roleComboListArea"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
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
				id : 'RoleListGrid',
				store : RoleListStore,
				columns : [sm, {
							header : '角色名称',
							width : 150,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : '角色说明',
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
					msg : "数据加载中，请稍等..."
				},
				bbar : [{
					text : "选 择",
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
									ids += node.data.key;
									types += 'role';
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
					text : "取 消",
					iconCls : 'icon-punchk',
					handler : function() {
						comboWithTooltip.collapse();
					}
				}]
			});

	comboWithTooltip.on('expand', function() {
		RoleListGrid.render('roleComboListArea');
		RoleListStore.load({
			params : {
				start : 0,
				limit : 20
			},
			callback : function(r, options, success) {
				if (success == false) {
					Ext.Msg.alert('ERROR', '加载数据出现异常.');
				} else {
					var total = RoleListGrid.getStore().getCount();// 数据行数

					var arr = [];
					for (var j = 0; j < total; j++) {
						var record = RoleListGrid.getStore().getAt(j);
						if (Ext.getCmp(returnIdField).getValue() == record.data.key) {
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