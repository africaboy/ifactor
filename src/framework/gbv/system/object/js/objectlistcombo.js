/**
 * 对象选择列表combo
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
function getObjectSelectCombo(combolabel, returnIdField, returnNameField,
		defaultValue, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				fieldLabel : combolabel,
				editable : false,
				id : '_oname',
				name : '_oname',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 200,
				listWidth : 400,
				tpl : '<div id="getObjectSelectComboList"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : grooveTranslator.getLangLabel(
							'common-language', 'select-emptytext')
			});

	var objectListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'objectList',
				fields : ['id', 'key', 'name', 'memo', 'handler', 'system',
						'viewdiy'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/object.do?method=list'
						})
			});

	var objectListGrid = new Ext.grid.GridPanel({
				id : 'objectList4SelectGrid',
				store : objectListStore,
				columns : [{
							header : grooveTranslator.getLangLabel(
							'object-language', 'list-name'),
							width : 100,
							sortable : true,
							dataIndex : 'name'
						}, {
							header : grooveTranslator.getLangLabel(
							'object-language', 'list-key'),
							width : 100,
							sortable : true,
							dataIndex : 'key'
						}, {
							header : grooveTranslator.getLangLabel(
							'object-language', 'list-desc'),
							width : 150,
							sortable : false,
							dataIndex : 'memo'
						}, {
							header : grooveTranslator.getLangLabel(
							'object-language', 'list-system'),
							width : 100,
							sortable : false,
							dataIndex : 'system'
						}],
				stripeRows : true,
				autoExpandColumn : 'iname',
				viewConfig : {
					forceFit : true
				},
				border : false,
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				height : 200,
				loadMask : {
					msg : grooveTranslator.getLangLabel(
							'common-language', 'list-loading')
				},bbar : new Ext.Toolbar([{
							iconCls : 'refresh',
							text : grooveTranslator.getLangLabel(
							'common-language', 'refresh'),
							handler : function() {
								objectListGrid.getStore().reload();
							}
						}])
			});

	objectListGrid.on('click', function(e) {
				var t = e.getTarget();
				var v = this.view;
				var rowIdx = v.findRowIndex(t);
				var record = this.getStore().getAt(rowIdx);

				if (record) {
					comboWithTooltip.setValue(record.data.name);

					/* 调用此方法的js或jsp包含的自定义处理方法 */
					try {
						hasSelectedObject(record.data.key, record.data.name);
					} catch (error) {

					}

					if (Ext.getCmp(returnIdField)) {
						Ext.getCmp(returnIdField).setValue(record.data.key);

					}

					if (Ext.getCmp(returnNameField)) {
						Ext.getCmp(returnNameField).setValue(record.data.name);
					}
				}

				comboWithTooltip.collapse();
			});

	comboWithTooltip.on('expand', function() {
				objectListGrid.render('getObjectSelectComboList');

				objectListStore.load({
							params : {
								start : 0,
								limit : pageSize
							},
							callback : function(r, options, success) {
								if (success == false) {
									Ext.Msg.alert(grooveTranslator.getLangLabel(
							'common-language', 'prompt'), grooveTranslator.getLangLabel(
							'common-language', 'load-failure'));
								} else {
									var total = objectListGrid.getStore()
											.getCount();// 数据行数

									var arr = [];
									for (var j = 0; j < total; j++) {
										var record = objectListGrid.getStore()
												.getAt(j);
										if (hasSelected(Ext
														.getCmp(returnIdField)
														.getValue(),
												record.data.id)) {
											arr.push(record);
										}
									}
									if (arr.length > 0) {
										objectListGrid.getSelectionModel()
												.selectRecords(arr);
									}
								}
							}
						});
			});

	return comboWithTooltip;
}