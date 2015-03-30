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
function getFlowSelectCombo(combolabel, returnIdField, returnNameField,
		defaultValue, allowBlank) {
	var comboWithTooltip = new Ext.form.ComboBox({
				store : new Ext.data.SimpleStore({
							fields : [],
							data : [[]]
						}),
				fieldLabel : combolabel,
				editable : false,
				id : '_flow',
				name : '_flow',
				mode : 'local',
				triggerAction : 'all',
				maxHeight : 350,
				width : 290,
				listWidth : 450,
				tpl : '<div id="getFlowSelectCombo"></div>',
				selectedClass : '',
				onSelect : Ext.emptyFn,
				allowBlank : (allowBlank == true),
				emptyText : '请选择...'
			});

	var store = new Ext.data.JsonStore({
				root : 'flowList',
				totalProperty : 'totalCount',
				idProperty : 'CG_ID',
				remoteSort : true,

				fields : ['PAGINATION_NUMBER', 'CG_ID', 'CG_KEY', 'CG_NAME',
						'CG_MEMO', 'OBJ_NAME', 'SURPORT'],
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/flowmanage.do?method=flowlist'
						})
			});

	var grid = new Ext.grid.GridPanel({
				title : '工作流程列表',
				store : store,
				loadMask : true,
				closable : true,
				layout : 'fit',
				// grid columns
				columns : [new Ext.grid.RowNumberer(), {
							id : 'fname',
							header : "流程类别名称",
							dataIndex : 'CG_NAME',
							align : 'left',
							width : 100,
							sortable : true
						}, {
							header : "流程类别描述",
							dataIndex : 'CG_MEMO',
							width : 100,
							align : 'left',
							sortable : false
						}],

				stripeRows : true,
				autoExpandColumn : 'CG_NAME',
				viewConfig : {
					forceFit : true
				},
				height : 300,
				border : false,
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "数据加载中，请稍等..."
				},

				// paging bar on the bottom
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayMsg : '',
							emptyMsg : "没有数据"
						})
			});

	grid.on('click', function(e) {
				var t = e.getTarget();
				var v = this.view;
				var rowIdx = v.findRowIndex(t);
				var record = this.getStore().getAt(rowIdx);

				if (record) {
					comboWithTooltip.setValue(record.data.CG_NAME);

					/* 调用此方法的js或jsp包含的自定义处理方法 */
					try {
						hasSelectedFlow(record.data.CG_ID, record.data.CG_NAME);
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
		grid.render('getFlowSelectCombo');

		store.load({
			params : {
				start : 0,
				limit : pageSize
			},
			callback : function(r, options, success) {
				if (success == false) {
					Ext.Msg.alert('ERROR', '加载数据出现异常.');
				} else {
					var total = grid.getStore().getCount();// 数据行数

					var arr = [];
					for (var j = 0; j < total; j++) {
						var record = grid.getStore().getAt(j);
						if (Ext.getCmp(returnIdField)
								&& Ext.getCmp(returnIdField).getValue() == record.data.CG_ID) {
							arr.push(record);
						}
					}
					if (arr.length > 0) {
						grid.getSelectionModel().selectRecords(arr);
					}
				}
			}
		});
	});

	return comboWithTooltip;
}