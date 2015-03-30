document.write("<script src=\"" + context
		+ "/system/object/js/objectlistcombo.js\"></script>");

var addQueryWin;

/**
 * 新定义对象查询
 */
function neuobjquery() {
	var queryBaseForm = new Ext.FormPanel({
		title : 'Basic Settings',
		bodyStyle : 'border:0px; padding:5px;',
		layout : 'form',
		labelWidth : 120,
		border : false,
		autoScroll : true,
		defaults : {
			width : 530
		},
		defaultType : 'textfield',

		items : [{
					fieldLabel : 'Query Subjects',
					id : 'qname',
					name : 'qname',
					allowBlank : false
				}, {
					fieldLabel : 'Uniquely Identifies',
					id : 'qkey',
					name : 'qkey',
					allowBlank : false
				}, {
					fieldLabel : 'Custom JS',
					xtype : 'textarea',
					id : 'qjs',
					name : 'qjs',
					height : 40
				}, {
					fieldLabel : 'Custom CSS',
					xtype : 'textarea',
					id : 'qcss',
					name : 'qcss',
					height : 40
				}, {
					fieldLabel : 'Custom Queries Page',
					xtype : 'textarea',
					id : 'queryurl',
					name : 'queryurl',
					height : 40
				}, {
					fieldLabel : 'Customize Results Page',
					xtype : 'textarea',
					id : 'qresulturl',
					name : 'qresulturl',
					height : 40
				}, {
					fieldLabel : 'Remarks',
					xtype : 'textarea',
					id : 'qdesc',
					name : 'qdesc',
					height : 40
				},
				/*
				 * { fieldLabel : '查询视图URL', xtype : 'textarea', id :
				 * 'queryurl', name : 'queryurl', height : 40 }, { fieldLabel :
				 * '查询结果视图URL', xtype : 'textarea', id : 'qresulturl', name :
				 * 'qresulturl', height : 40 },
				 */
				getObjectSelectCombo('Related Objects', 'object', '', ''), {
					xtype : 'hidden',
					id : 'object',
					name : 'object'
				}, new Ext.form.RadioGroup({
							fieldLabel : 'Session Correlation',
							// //RadioGroup.fieldLabel 标签与
							// Radio.boxLabel 标签区别
							items : [new Ext.form.Radio({ // 三个必须项
										id : "qsession0",
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : "No", // Radio标签
										name : "qsession", // 用于form提交时传送的参数名
										inputValue : "0", // 提交时传送的参数值
										checked : true,
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : "qsession1",
										boxLabel : "Yes",
										name : "qsession",
										inputValue : "1",
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
						}), new Ext.form.RadioGroup({
							fieldLabel : 'Display Checkboxs',
							// //RadioGroup.fieldLabel 标签与
							// Radio.boxLabel 标签区别
							items : [new Ext.form.Radio({ // 三个必须项
										id : "qchk0",
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : "No", // Radio标签
										name : "qchk", // 用于form提交时传送的参数名
										inputValue : "0", // 提交时传送的参数值
										checked : true,
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : "qchk1",
										boxLabel : "Yes",
										name : "qchk",
										inputValue : "1",
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
						}), new Ext.form.DateField({
							id : 'qcreatestime',
							name : 'qcreatestime',
							fieldLabel : 'Object Creation Date (Rnd)',
							emptyText : 'Please Delect A Date',
							format : 'Y-m-d'
						}), new Ext.form.DateField({
							id : 'qcreateetime',
							name : 'qcreateetime',
							fieldLabel : 'Object Creation Date (Rnd)',
							emptyText : 'Please Delect A Date',
							format : 'Y-m-d'
						}), {
					xtype : 'hidden',
					id : 'qpurview',
					name : 'qpurview'
				}, {
					xtype : 'hidden',
					id : 'qpurviewname',
					name : 'qpurviewname'
				}]

	});

	var p1 = new Ext.FormPanel({
				title : 'Accessible Range Settings Area',
				border : true,
				html : '<div id="objrange" style="width:600px;padding:5px;"></div>'
			});

	var p2 = new Ext.FormPanel({
				title : 'Query Terms Settings Area',
				border : true,
				html : '<div id="DragContainer1" style="padding:5px;"></div>'
			});

	var p3 = new Ext.FormPanel({
				title : 'Show Items Settings Area',
				border : true,
				html : '<div id="DragContainer2" style="padding:5px;"></div>'
			});

	var p4 = new Ext.FormPanel({
				title : 'Constraints Key Settings Area',
				border : true,
				html : '<div id="DragContainer3" style="padding:5px;"></div>'
			});

	var accordion = new Ext.Panel({
				border : false,
				layout : 'accordion',
				items : [queryBaseForm, p1, p2, p3, p4]
			});

	addQueryWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 800,
				height : 500,
				title : 'Query Definition',
				plain : true,
				modal : true,
				maximizable : true,
				tbar : new Ext.Toolbar({
							autoWidth : true,
							autoShow : true,
							items : [{
										id : 'objrangeset',
										iconCls : 'objrangeset',
										text : 'Accessible Range Settings',
										disabled : true,
										handler : selectobjrange,
										tooltip : 'Users Can Access Object Data Range'
									}, '-', {
										id : 'objqueryset',
										iconCls : 'objqueryset',
										text : 'Query Terms Settings',
										disabled : true,
										handler : selectQueryItem,
										tooltip : 'Data Query Condition'
									}, '-', {
										id : 'objviewset',
										iconCls : 'objviewset',
										text : 'Show Items Settings',
										disabled : true,
										handler : selectViewItem,
										tooltip : 'Object Data List Display Column'
									}, '-', {
										id : 'objrestraintset',
										iconCls : 'objrestraintset',
										text : 'Constraints Key Settings',
										disabled : true,
										handler : selectRestraintItem,
										tooltip : 'Object Data Query Preset Fixed Query'
									}]
						}),
				items : [accordion],

				buttons : [{
					id : 'QuerySaveButton',
					text : 'Submit',
					handler : function() {
						if (queryBaseForm.getForm().isValid()) {
							var xmlscript = initQueryXMLScript();

							Ext.getCmp('QuerySaveButton').setDisabled(true);
							Ext.MessageBox.wait('Submit To Save The Process...');

							queryBaseForm.getForm().submit({
								url : context
										+ '/system/objectquery.do?method=save',
								method : "POST",
								params : {
									xmlscript : xmlscript
								},
								success : function(form, action) {
									Ext.MessageBox.hide();
									Ext.Msg.alert('Hint', 'Saved Query Definition!');
									try {
										reloadQueryListStore();
									} catch (error) {

									}
									addQueryWin.close();
									addQueryWin = null;
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									Ext.getCmp('QuerySaveButton')
											.setDisabled(false);

									if (!action.result) {
										Ext.Msg.alert('Hint', 'Unknown Exception Error!');
									} else if (action.result.result == '0') {
										Ext.Msg.alert('Hint', 'Uniquely Identify Repeat, Redefine！');
									} else if (action.result.result == '-1') {
										Ext.Msg.alert('Hint', 'Submit To Save The Query Definition Error Has Occurred!');
									}
								}
							});
						}
					}
				}, {
					text : 'Close',
					handler : function() {
						addQueryWin.close();
						addQueryWin = null;
					}
				}]
			});

	addQueryWin.show(this);
}

/**
 * 设置对象访问范围
 * 
 * @param {}
 *            areaid
 */
function initobjrangeitem(areaid) {
	var items = Ext.get(areaid).dom.getElementsByTagName('div');
	var json = '"totalCount" : "' + items.length + '",';

	json += '"purviewList" : [';

	for (var i = 0; i < items.length; i++) {
		var id = items[i].getAttribute('oid');
		var name = items[i].getAttribute('oname');
		var type = items[i].getAttribute('otype');

		json += '{"rid" : "' + id + '", "rname" : "' + name + '", "rtype" : "'
				+ type + '"}';

		if (i < items.length - 1) {
			json += ","
		}
	}

	json += ']';

	setPurviewobjRange('{' + json + '}');
}

/**
 * 对象范围查询范围设置
 * 
 * @param {}
 *            id
 * @param {}
 *            tlt
 */
function selectobjrange() {
	// {'totalCount' : '0', 'purviewList' : [{'rid' : '','rname' : '', 'rtype' :
	// ''}]};
	var id = 'objrange';
	var tlt = 'Accessible Range Settings';

	initobjrangeitem(id);

	var selectobjrangeWin = new Ext.Window({
				id : 'selectobjrangeWin',
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 500,
				height : 300,
				title : tlt,
				resizable : false,
				plain : true,
				modal : true,

				items : [getPurviewobjList()],

				buttons : [{
							text : 'Confirm',
							handler : function() {
								handleSelectRange(id);
								selectobjrangeWin.close();
							}
						}, {
							text : 'Close',
							handler : function() {
								selectobjrangeWin.close();
							}
						}]
			});

	selectobjrangeWin.show(this);
}

/**
 * 设置权限范围
 * 
 * @param {}
 *            id
 */
function handleSelectRange(id) {
	var str = "";
	for (var i = 0; i < Ext.getCmp('purviewobjcomboGrid').getStore().getCount(); i++) {
		var node = Ext.getCmp('purviewobjcomboGrid').getStore().getAt(i);

		var tp;

		if (node.data.rtype == 'role') {
			tp = 'Role';
		} else if (node.data.rtype == 'group') {
			tp = 'Group';
		} else if (node.data.rtype == '') {
			tp = 'User';
		}

		var did = node.data.rid + '_' + node.data.rtype;

		str += '<div range="item" id="'
				+ did
				+ '" oid="'
				+ node.data.rid
				+ '" oname="'
				+ node.data.rname
				+ '" otype="'
				+ node.data.rtype
				+ '" style="float:left;width:120px;"> '
				+ node.data.rname
				+ ' ('
				+ tp
				+ ')'
				+ ' <img src="'
				+ context
				+ '/system/objquery/images/del.gif" title="Delete" style="cursor:hand;" onclick="javascript:removeRange(\''
				+ did + '\');"/></div>';
	}

	Ext.get(id).dom.innerHTML = str;
}

function addQueryItem() {
	var tp = 'query';

	var selectedNodes = Ext.getCmp('querySetListGrid').getSelectionModel()
			.getSelections();
	if (selectedNodes.length > 0) {
		var rnt = true;

		for (var i = 0; i < selectedNodes.length; i++) {
			if (selectedNodes[i].data.columnName == ''
					|| selectedNodes[i].data.mode == ''
					|| selectedNodes[i].data.type == '') {
				Ext.Msg.alert('Hint', 'Display Labels, Form Type, Comparison Method Must Be Set!');
				rnt = false;
				break;
			}
		}

		if (rnt) {
			for (var i = 0; i < selectedNodes.length; i++) {
				var itemid = tp + "_" + selectedNodes[i].data.table + "_"
						+ selectedNodes[i].data.column;
				if (!Ext.get(itemid)) {
					var bindObject = document.createElement("div");
					bindObject.id = itemid;
					bindObject.setAttribute("idiv", "qitem");
					bindObject.className = "DragBox";
					bindObject.style.cssText = "BORDER: #cccccc 0px solid;margin:2px;float:left;";

					var sp = '';

					sp += '<input type="hidden" id="chk_' + itemid
							+ '" ilabel="' + selectedNodes[i].data.name + '" ';
					sp += 'itableName="' + selectedNodes[i].data.table
							+ '" value="' + selectedNodes[i].data.column
							+ '"> ';
					sp += selectedNodes[i].data.columnName;
					/* 关联字段 */
					sp += '<input type="hidden" id="' + itemid
							+ '_column" value="' + selectedNodes[i].data.column
							+ '">';
					/* 关联表 */
					sp += '<input type="hidden" id="' + itemid
							+ '_table" value="' + selectedNodes[i].data.table
							+ '">';
					/* 查询标签 */
					sp += '<input type="hidden" id="' + itemid
							+ '_label" value="'
							+ selectedNodes[i].data.columnName + '">';
					/* 表单类型 */
					sp += '<input type="hidden" id="' + itemid
							+ '_type" value="' + selectedNodes[i].data.type
							+ '">';
					/* 默认参数 */
					sp += '<input type="hidden" id="' + itemid
							+ '_param" value="' + selectedNodes[i].data.param
							+ '">';
					/* 比较方式 */
					sp += '<input type="hidden" id="' + itemid
							+ '_mode" value="' + selectedNodes[i].data.mode
							+ '">';
					/* 显示顺序 */
					sp += '<input type="hidden" id="' + itemid
							+ '_idx" value="' + selectedNodes[i].data.idx
							+ '">';

					sp += '&nbsp;<img style="vertical-align:middle" src="'
							+ context + '/system/objquery/images/del.gif"';
					sp += ' onclick="javascript:removeItem(\'' + itemid
							+ '\');" title="Delete">';

					bindObject.innerHTML = sp;

					Ext.get("DragContainer1").dom.appendChild(bindObject);
				} else {
					/* 重置变量 */
					Ext.get(itemid + '_label').dom.value = selectedNodes[i].data.columnName;
					Ext.get(itemid + '_type').dom.value = selectedNodes[i].data.type;
					Ext.get(itemid + '_mode').dom.value = selectedNodes[i].data.mode;
					Ext.get(itemid + '_param').dom.value = selectedNodes[i].data.param;
					Ext.get(itemid + '_idx').dom.value = selectedNodes[i].data.idx;
				}
			}

			Ext.getCmp('selectQueryItemWin').close();
		}
	} else {
		Ext.Msg.alert('Hint', 'Please Select The Fields To Be Used As Query Terms!');
	}
}

/**
 * 选择查询项设置窗口
 */
function selectQueryItem() {
	var tlt = 'Query Term Set';

	if (Ext.get('object').getValue() == '') {
		Ext.Msg.alert('Hint', 'Please Select Query Related Objects!');
	} else {
		var querySetListGrid = getQueryListGrid();

		var selectQueryItemWin = new Ext.Window({
					id : 'selectQueryItemWin',
					renderTo : Ext.getBody(),
					layout : 'fit',
					width : 800,
					height : 450,
					title : 'Query Terms Set',
					// closeAction : 'close',
					plain : true,
					maximizable : false,
					plain : true,
					modal : true,
					// tbar : ['-', dateBtn, '-', typeBtn],
					items : [querySetListGrid],
					buttons : [{
								text : 'Confirm',
								handler : addQueryItem
							}, {
								text : 'Close',
								handler : function() {
									selectQueryItemWin.close();
									selectQueryItemWin = null;
								}
							}]
				});

		// checkedItem('query');
		selectQueryItemWin.show(this);
	}
}

/**
 * 查询项设置字段列表
 * 
 * @return {}
 */
function getQueryListGrid() {
	var url = context + '/system/objectquery.do?method=setlist&obj='
			+ Ext.get('object').getValue() + '&type=query';

	var sm = new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel([sm, {
				header : 'Field Name',
				width : 100,
				sortable : true,
				dataIndex : 'column'
			}, {
				header : 'Display Labels',
				width : 100,
				sortable : true,
				dataIndex : 'columnName',
				editor : new Ext.form.TextField({
						// value : this.value
						})
			}, {
				header : 'Field Type',
				width : 100,
				sortable : true,
				dataIndex : 'columnType'
			}, {
				header : 'Data Manipulation',
				width : 100,
				sortable : false,
				dataIndex : 'tableHandleType'
			}, {
				header : 'Form Type',
				width : 100,
				sortable : false,
				dataIndex : 'type',
				allowBlank : false,
				editor : getWBComboStore('component', '', 'qic_', '', null,
						null, '0', false)
			}, {
				header : 'Compare The Way',
				width : 100,
				sortable : false,
				dataIndex : 'mode',
				allowBlank : false,
				editor : getWBComboStore('compare-mode', '', 'qim_', '', null,
						null, '0', false)
			}, {
				header : 'The Default Value',
				width : 100,
				sortable : false,
				dataIndex : 'param',
				editor : new Ext.form.TextField({})
			}, {
				header : 'Sort',
				width : 50,
				sortable : false,
				dataIndex : 'idx',
				editor : new Ext.form.TextField({})
			}]);

	var fd = ['name', 'column', 'columnName', 'columnType', 'table',
			'tableName', 'tableHandleType', 'param', 'mode', 'type',
			'itemType', 'idx'];

	var store = new Ext.data.JsonStore({
				url : url,
				idProperty : 'name',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'queryList',
				fields : fd
			});

	store.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	store.on('load', function(store, records, options) {
				var arr = [];
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					var isMatch = hasSelectedQueryItem('query', record);
					if (isMatch) {
						arr.push(record);

						var rlt = getSelectedQueryItemValue('query', record);

						record.set('columnName', rlt[0]);
						record.set('type', rlt[1]);
						record.set('mode', rlt[2]);
						record.set('param', rlt[3]);
						record.set('idx', rlt[4]);
					} else {
						record.set('name', record.data.columnName);
						// record.set('idx', i + 1);
					}
				}

				sm.selectRecords(arr);
			}, this, {
				delay : 1000
			})

	var querySetListGrid = new Ext.grid.EditorGridPanel({
				id : 'querySetListGrid',
				store : store,
				cm : cm,
				sm : sm,
				// enableDrag : true,
				// enableDragDrop : true,
				stripeRows : true,
				autoExpandColumn : 'columnName',
				border : false,
				autoWidth : true,
				height : 200,
				viewConfig : {
					forceFit : true
				},
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Loading Data,Please Wait..."
				}
			});

	/*
	 * querySetListGrid.on('render', function() { new
	 * Ext.dd.DropTarget(querySetListGrid.getEl(), { ddGroup :
	 * querySetListGrid.ddGroup || 'GridDD', grid : querySetListGrid,
	 * gridDropTarget : this, notifyDrop : function(dd, e, data) {
	 * 
	 * var t = e.getTarget();// 获取选择行 var rindex =
	 * this.grid.view.findRowIndex(t); if (rindex === false) return false; var
	 * ds = this.grid.getStore(); var rdata = ds.getAt(rindex); //
	 * 判断插入行YesNo选择行，如果Yes不允许插入 for (i = 0; i < data.selections.length; i++) { var
	 * rowIndex = ds .indexOfId(data.selections[i].id); if (rindex == rowIndex)
	 * rindex = false; } move(rindex, data.selections, this.grid); return true; },
	 * 
	 * notifyOver : function(dd, e, data) { var t = e.getTarget(); var rindex =
	 * this.grid.view.findRowIndex(t); var ds = this.grid.getStore(); for (i =
	 * 0; i < data.selections.length; i++) { var rowIndex = ds
	 * .indexOfId(data.selections[i].id); if (rindex == rowIndex) rindex =
	 * false; } return (rindex === false) ? this.dropNotAllowed :
	 * this.dropAllowed; } });
	 * 
	 * });
	 */

	return querySetListGrid;
}

/**
 * YesNo已选定查询项
 * 
 * @param {}
 *            record 当前选项
 * @return {}
 */
function hasSelectedQueryItem(tp, record) {
	var itemid = tp + "_" + record.data.table + "_" + record.data.column;

	return Ext.get(itemid) != null;
}

/**
 * 获得已选定查询项属性值
 * 
 * @param {}
 *            tp
 * @param {}
 *            record
 */
function getSelectedQueryItemValue(tp, record) {
	var arr = [];

	var itemid = tp + "_" + record.data.table + "_" + record.data.column;

	if (Ext.get(itemid) != null) {
		arr.push(Ext.get(itemid + '_label').dom.value);
		arr.push(Ext.get(itemid + '_type').dom.value);
		arr.push(Ext.get(itemid + '_mode').dom.value);
		arr.push(Ext.get(itemid + '_param').dom.value);
		arr.push(Ext.get(itemid + '_idx').dom.value);
	}

	return arr;
}

function selectViewItem() {
	var tlt = 'Show Items Set';

	if (Ext.get('object').getValue() == '') {
		Ext.Msg.alert('Hint', 'Please Select Query Related Objects!');
	} else {
		var viewListGrid = getViewListGrid();

		var selectViewItemWin = new Ext.Window({
					id : 'selectViewItemWin',
					renderTo : Ext.getBody(),
					layout : 'fit',
					width : 800,
					height : 450,
					title : tlt,
					// closeAction : 'close',
					plain : true,
					maximizable : false,
					plain : true,
					modal : true,
					// tbar : ['-', dateBtn, '-', typeBtn],
					items : [viewListGrid],
					buttons : [{
								text : 'Confirm',
								handler : addViewItem
							}, {
								text : 'Close',
								handler : function() {
									selectViewItemWin.close();
									selectViewItemWin = null;
								}
							}]
				});

		// checkedItem('query');
		selectViewItemWin.show(this);
	}
}

/**
 * 显示项设置字段列表
 * 
 * @return {}
 */
function getViewListGrid() {
	var url = context + '/system/objectquery.do?method=setlist&obj='
			+ Ext.get('object').getValue() + '&type=query';

	var sm = new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel([sm, {
				header : 'Field Name',
				width : 100,
				sortable : true,
				dataIndex : 'column'
			}, {
				header : 'Display Labels',
				width : 100,
				sortable : true,
				dataIndex : 'columnName',
				editor : new Ext.form.TextField({
						// value : this.value
						})
			}, {
				header : 'Translation Of The Word Parameter',
				width : 200,
				sortable : false,
				dataIndex : 'param',
				editor : new Ext.form.TextField({})
			}, {
				header : 'Display Order',
				width : 50,
				sortable : false,
				dataIndex : 'idx',
				editor : new Ext.form.TextField({})
			}]);

	var fd = ['name', 'column', 'columnName', 'columnType', 'table',
			'tableName', 'tableHandleType', 'param', 'mode', 'type',
			'itemType', 'idx'];

	var store = new Ext.data.JsonStore({
				url : url,
				idProperty : 'name',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'queryList',
				fields : fd
			});

	store.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	store.on('load', function(store, records, options) {
				var arr = [];
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					var isMatch = hasSelectedQueryItem('view', record);
					if (isMatch) {
						arr.push(record);

						var rlt = getSelectedViewItemValue('view', record);

						record.set('columnName', rlt[0]);
						record.set('param', rlt[1]);
						record.set('idx', rlt[2]);
					} else {
						record.set('columnName', record.data.columnName);
						// record.set('idx', i + 1);
					}
				}

				sm.selectRecords(arr);
			}, this, {
				delay : 1000
			})

	var viewSetListGrid = new Ext.grid.EditorGridPanel({
				id : 'viewSetListGrid',
				store : store,
				cm : cm,
				sm : sm,
				stripeRows : true,
				autoExpandColumn : 'columnName',
				border : false,
				autoWidth : true,
				height : 200,
				viewConfig : {
					forceFit : true
				},
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Loading Data,Please Wait..."
				}
			});

	return viewSetListGrid;
}

/**
 * 
 */
function addViewItem() {
	var tp = 'view';

	var selectedNodes = Ext.getCmp('viewSetListGrid').getSelectionModel()
			.getSelections();
	if (selectedNodes.length > 0) {
		var rnt = true;

		for (var i = 0; i < selectedNodes.length; i++) {
			if (selectedNodes[i].data.columnName == '') {
				Ext.Msg.alert('Hint', 'Please Set The Display Label');
				rnt = false;
				break;
			}
		}

		if (rnt) {
			for (var i = 0; i < selectedNodes.length; i++) {
				var itemid = tp + "_" + selectedNodes[i].data.table + "_"
						+ selectedNodes[i].data.column;
				if (!Ext.get(itemid)) {
					var bindObject = document.createElement("div");
					bindObject.id = itemid;
					bindObject.setAttribute("idiv", "qitem");
					bindObject.className = "DragBox";
					bindObject.style.cssText = "BORDER: #cccccc 0px solid;margin:2px;float:left;";

					var sp = '';

					sp += selectedNodes[i].data.columnName;
					/* 关联字段 */
					sp += '<input type="hidden" id="' + itemid
							+ '_column" value="' + selectedNodes[i].data.column
							+ '">';
					/* 关联表 */
					sp += '<input type="hidden" id="' + itemid
							+ '_table" value="' + selectedNodes[i].data.table
							+ '">';
					/* 显示标签 */
					sp += '<input type="hidden" id="' + itemid
							+ '_label" value="'
							+ selectedNodes[i].data.columnName + '">';
					/* 默认参数 */
					sp += '<input type="hidden" id="' + itemid
							+ '_param" value="' + selectedNodes[i].data.param
							+ '">';
					/* 显示顺序 */
					sp += '<input type="hidden" id="' + itemid
							+ '_idx" value="' + selectedNodes[i].data.idx
							+ '">';

					sp += '&nbsp;<img style="vertical-align:middle" src="'
							+ context + '/system/objquery/images/del.gif"';
					sp += ' onclick="javascript:removeItem(\'' + itemid
							+ '\');" title="Delete">';

					bindObject.innerHTML = sp;

					Ext.get("DragContainer2").dom.appendChild(bindObject);
				} else {
					/* 重置变量 */
					Ext.get(itemid + '_label').dom.value = selectedNodes[i].data.columnName;
					Ext.get(itemid + '_param').dom.value = selectedNodes[i].data.param;
					Ext.get(itemid + '_idx').dom.value = selectedNodes[i].data.idx;
				}
			}

			Ext.getCmp('selectViewItemWin').close();
		}
	} else {
		Ext.Msg.alert('Hint', 'Please Select The Fields To Be Used As Query Terms!');
	}
}

/**
 * 获得已选定显示项属性值
 * 
 * @param {}
 *            tp
 * @param {}
 *            record
 */
function getSelectedViewItemValue(tp, record) {
	var arr = [];

	var itemid = tp + "_" + record.data.table + "_" + record.data.column;

	if (Ext.get(itemid) != null) {
		arr.push(Ext.get(itemid + '_label').dom.value);
		arr.push(Ext.get(itemid + '_param').dom.value);
		arr.push(Ext.get(itemid + '_idx').dom.value);
	}

	return arr;
}

/**
 * 选择前置约束项设置
 */
function selectRestraintItem() {
	var tlt = 'Constraints Key Settings';

	if (Ext.get('object').getValue() == '') {
		Ext.Msg.alert('Hint', 'Please Select Query Related Objects!');
	} else {
		var restraintListGrid = getRestraintListGrid();

		var selectRestraintItemWin = new Ext.Window({
					id : 'selectRestraintItemWin',
					renderTo : Ext.getBody(),
					layout : 'fit',
					width : 800,
					height : 450,
					title : tlt,
					// closeAction : 'close',
					plain : true,
					maximizable : false,
					plain : true,
					modal : true,
					// tbar : ['-', dateBtn, '-', typeBtn],
					items : [restraintListGrid],
					buttons : [{
								text : 'Confirm',
								handler : addRestraintItem
							}, {
								text : 'Close',
								handler : function() {
									selectRestraintItemWin.close();
									selectRestraintItemWin = null;
								}
							}]
				});

		// checkedItem('query');
		selectRestraintItemWin.show(this);
	}
}

/**
 * 前置约束项列表
 * 
 * @return {}
 */
function getRestraintListGrid() {
	var url = context + '/system/objectquery.do?method=setlist&obj='
			+ Ext.get('object').getValue() + '&type=query';

	var sm = new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel([sm, {
				header : 'Field Name',
				width : 100,
				sortable : true,
				dataIndex : 'column'
			}, {
				header : 'Field Description',
				width : 100,
				sortable : true,
				dataIndex : 'columnName'
			}, {
				header : 'Field Type',
				width : 100,
				sortable : true,
				dataIndex : 'columnType'
			}, {
				header : 'Data Sheet',
				width : 100,
				sortable : false,
				dataIndex : 'table'
			}, {
				header : 'Data Manipulation',
				width : 100,
				sortable : false,
				dataIndex : 'tableHandleType'
			}, {
				header : 'Compare The Way',
				width : 100,
				sortable : false,
				dataIndex : 'mode',
				allowBlank : false,
				editor : getWBComboStore('compare-mode', '', 'qim_', '', null,
						null, '0', false)
			}, {
				header : 'The default value',
				width : 100,
				sortable : false,
				dataIndex : 'param',
				editor : new Ext.form.TextField({})
			}]);

	var fd = ['name', 'column', 'columnName', 'columnType', 'table',
			'tableName', 'tableHandleType', 'param', 'mode', 'type', 'itemType'];

	var store = new Ext.data.JsonStore({
				url : url,
				idProperty : 'name',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'queryList',
				fields : fd
			});

	store.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	store.on('load', function(store, records, options) {
				var arr = [];
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					var isMatch = hasSelectedQueryItem('restraint', record);
					if (isMatch) {
						arr.push(record);

						var rlt = getSelectedRestraintItemValue('restraint',
								record);

						record.set('mode', rlt[0]);
						record.set('param', rlt[1]);
					} else {
						record.set('name', record.data.columnName);
					}
				}

				sm.selectRecords(arr);
			}, this, {
				delay : 1000
			})

	var restraintSetListGrid = new Ext.grid.EditorGridPanel({
				id : 'restraintSetListGrid',
				store : store,
				cm : cm,
				sm : sm,
				// enableDrag : true,
				// enableDragDrop : true,
				stripeRows : true,
				autoExpandColumn : 'columnName',
				border : false,
				autoWidth : true,
				height : 200,
				viewConfig : {
					forceFit : true
				},
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Loading Data,Please Wait..."
				}
			});

	return restraintSetListGrid;
}

/**
 * 增加
 */
function addRestraintItem() {
	var tp = 'restraint';

	var selectedNodes = Ext.getCmp('restraintSetListGrid').getSelectionModel()
			.getSelections();
	if (selectedNodes.length > 0) {
		var rnt = true;

		for (var i = 0; i < selectedNodes.length; i++) {
			if (selectedNodes[i].data.mode == ''
					|| selectedNodes[i].data.param == '') {
				Ext.Msg.alert('Hint', 'Compare Mode, The Default Parameter Must Be Set');
				rnt = false;
				break;
			}
		}

		if (rnt) {
			for (var i = 0; i < selectedNodes.length; i++) {
				var itemid = tp + "_" + selectedNodes[i].data.table + "_"
						+ selectedNodes[i].data.column;
				if (!Ext.get(itemid)) {
					var bindObject = document.createElement("div");
					bindObject.id = itemid;
					bindObject.setAttribute("idiv", "qitem");
					bindObject.className = "DragBox";
					bindObject.style.cssText = "BORDER: #cccccc 0px solid;margin:2px;float:left;";

					var sp = '';

					sp += '<input type="hidden" id="chk_' + itemid
							+ '" ilabel="' + selectedNodes[i].data.name + '" ';
					sp += 'itableName="' + selectedNodes[i].data.table
							+ '" value="' + selectedNodes[i].data.column
							+ '"> ';
					sp += selectedNodes[i].data.columnName;
					/* 关联字段 */
					sp += '<input type="hidden" id="' + itemid
							+ '_column" value="' + selectedNodes[i].data.column
							+ '">';
					/* 关联表 */
					sp += '<input type="hidden" id="' + itemid
							+ '_table" value="' + selectedNodes[i].data.table
							+ '">';
					/* 查询标签 */
					sp += '<input type="hidden" id="' + itemid
							+ '_label" value="'
							+ selectedNodes[i].data.columnName + '">';
					/* 表单类型 */
					sp += '<input type="hidden" id="' + itemid
							+ '_type" value="' + selectedNodes[i].data.type
							+ '">';
					/* 默认参数 */
					sp += '<input type="hidden" id="' + itemid
							+ '_param" value="' + selectedNodes[i].data.param
							+ '">';
					/* 比较方式 */
					sp += '<input type="hidden" id="' + itemid
							+ '_mode" value="' + selectedNodes[i].data.mode
							+ '">';
					/* 显示顺序 */
					sp += '<input type="hidden" id="' + itemid
							+ '_idx" value="' + selectedNodes[i].data.idx
							+ '">';

					sp += '&nbsp;<img style="vertical-align:middle" src="'
							+ context + '/system/objquery/images/del.gif"';
					sp += ' onclick="javascript:removeItem(\'' + itemid
							+ '\');" title="Delete">';

					bindObject.innerHTML = sp;

					Ext.get("DragContainer3").dom.appendChild(bindObject);
				} else {
					/* 重置变量 */
					Ext.get(itemid + '_mode').dom.value = selectedNodes[i].data.mode;
					Ext.get(itemid + '_param').dom.value = selectedNodes[i].data.param;
				}
			}

			Ext.getCmp('selectRestraintItemWin').close();
		}
	} else {
		Ext.Msg.alert('Hint', 'Please Select The Items To Be Used As A Field Constraint!');
	}
}

/**
 * 获取约束条件值
 * 
 * @param {}
 *            tp 类型
 * @param {}
 *            record 记录
 * @return {}
 */
function getSelectedRestraintItemValue(tp, record) {
	var arr = [];

	var itemid = tp + "_" + record.data.table + "_" + record.data.column;

	if (Ext.get(itemid) != null) {
		arr.push(Ext.get(itemid + '_mode').dom.value);
		arr.push(Ext.get(itemid + '_param').dom.value);
	}

	return arr;
}

function removeItem(id) {
	Ext.get(id).dom.parentNode.removeChild(Ext.get(id).dom);
}

/**
 * 
 * @param {}
 *            did
 */
function removeRange(did) {
	Ext.get(did).dom.parentNode.removeChild(Ext.get(did).dom);
}

function hasSelectedObject(id, name) {
	Ext.getCmp('objrangeset').enable();
	Ext.getCmp('objqueryset').enable();
	Ext.getCmp('objviewset').enable();
	Ext.getCmp('objrestraintset').enable();

	if (Ext.getCmp('object').getValue() != ''
			&& Ext.getCmp('object').getValue() != id) {
		if (Ext.get('DragContainer1').dom.innerHTML != '') {
			Ext.get('DragContainer1').dom.innerHTML = '';
		}

		if (Ext.get('DragContainer2').dom.innerHTML != '') {
			Ext.get('DragContainer2').dom.innerHTML = '';
		}
		if (Ext.get('DragContainer3').dom.innerHTML != '') {
			Ext.get('DragContainer3').dom.innerHTML = '';
		}
	}
}

/**
 * 初始化访问范围
 */
function initQueryPurview() {
	var str = '';

	var qitems = Ext.get("objrange").dom.childNodes;
	if (qitems && qitems.length > 0) {
		str += "<purview-item>\n";

		for (var i = 0; i < qitems.length; i++) {
			var oid = qitems[i].getAttribute('oid');
			var oname = qitems[i].getAttribute('oname');
			var otype = qitems[i].getAttribute('otype');

			str += '<item id="' + oid + '" name="' + oname + '" type="' + otype
					+ '"/>\n';
		}

		str += "</purview-item>\n";
	}

	return str;
}

/**
 * 初始化查询xml脚本
 */
function initQueryXMLScript() {
	var qkey = Ext.getCmp("qkey").getValue();
	var str = "<object-query>\n";
	str += "<query ID=\"" + qkey + "\">\n";

	var qobject = Ext.get("object").dom.value;
	var qname = Ext.get("qname").dom.value;
	var qdesc = Ext.get("qdesc").dom.value;
	var qjs = Ext.get("qjs").dom.value;
	var qcss = Ext.get("qcss").dom.value;
	var queryurl = Ext.get("queryurl").dom.value;
	var qresulturl = Ext.get("qresulturl").dom.value;
	var qpurview = Ext.get("qpurview").dom.value;
	var qpurviewname = Ext.get("qpurviewname").dom.value;

	var qsession = '0';
	if (Ext.get("qsession1").dom.checked) {
		qsession = '1';
	}
	var qcreatestime = (Ext.getCmp("qcreatestime").getValue() != '') ? Ext
			.get("qcreatestime").dom.value : '';
	var qcreateetime = (Ext.getCmp("qcreateetime").getValue() != '') ? Ext
			.get("qcreateetime").dom.value : '';
	
	var qchk = '0';
	if (Ext.get("qchk1").dom.checked) {
		qchk = '1';
	}

	/*
	 * var qhinsert = D("qhinsert").checked ? D("qhinsert").value : "no"; var
	 * qhview = D("qhview").checked ? D("qhview").value : "no"; var qhupdate =
	 * D("qhupdate").checked ? D("qhupdate").value : "no"; var qhdelete =
	 * D("qhdelete").checked ? D("qhdelete").value : "no"; var qhpurview =
	 * D("qhpurview").checked ? D("qhpurview").value : "no"; var qhexport =
	 * D("qhexport").checked ? D("qhexport").value : "no"; var qhcopy =
	 * D("qhcopy").checked ? D("qhcopy").value : "no";
	 */

	str += "<name>" + qname + "</name>\n";
	str += "<object>" + qobject + "</object>\n";
	str += "<jsurl>" + qjs + "</jsurl>\n";
	str += "<cssurl>" + qjs + "</cssurl>\n";
	str += "<showchk>" + qchk + "</showchk>\n";
	str += "<queryurl>" + queryurl + "</queryurl>\n";
	str += "<resulturl>" + qresulturl + "</resulturl>\n";
	str += "<desc>" + qdesc + "</desc>\n";
	str += "<session>" + qsession + "</session>\n";
	str += "<createstime>" + qcreatestime + "</createstime>\n";
	str += "<createetime>" + qcreateetime + "</createetime>\n";

	str += initQueryPurview();

	/*
	 * str += "<handle-item>"; str += "<insert>" + qhinsert + "</insert>\n";
	 * str += "<view>" + qhview + "</view>\n"; str += "<update>" + qhupdate + "</update>\n";
	 * str += "<delete>" + qhdelete + "</delete>\n"; str += "<purview>" +
	 * qhpurview + "</purview>\n"; str += "<export>" + qhexport + "</export>\n";
	 * str += "<copy>" + qhcopy + "</copy>\n"; str += "</handle-item>";
	 */

	var qitems = Ext.get("DragContainer1").dom.childNodes;
	str += "<query-item>\n";
	if (qitems && qitems.length > 0) {
		for (var i = 0; i < qitems.length; i++) {
			var index = qitems[i].id;
			var name = Ext.get(index + "_column").dom.value;
			var label = Ext.get(index + "_label").dom.value;
			var tableName = Ext.get(index + "_table").dom.value;
			var type = Ext.get(index + "_type").dom.value;
			var param = Ext.get(index + "_param").dom.value;
			var mode = Ext.get(index + "_mode").dom.value;
			var idx = Ext.get(index + "_idx").dom.value;

			str += '<item name="' + name + '" label="' + label
					+ '" tableName="' + tableName + '" type="' + type
					+ '" param="' + param + '" mode="' + mode + '" idx="' + idx
					+ '"></item>\n';
		}
	}
	str += "</query-item>\n";

	var qitem1s = Ext.get("DragContainer2").dom.childNodes;
	str += "<result-item>\n";
	if (qitem1s && qitem1s.length > 0) {
		for (var i = 0; i < qitem1s.length; i++) {
			var index = qitem1s[i].id;
			var name = Ext.get(index + "_column").dom.value;
			var label = Ext.get(index + "_label").dom.value;
			var tableName = Ext.get(index + "_table").dom.value;
			var param = Ext.get(index + "_param").dom.value;
			var idx = Ext.get(index + "_idx").dom.value;
			str += '<item name="' + name + '" label="' + label
					+ '" tableName="' + tableName + '" param="' + param
					+ '" idx="' + idx + '"></item>\n';
		}

	}
	str += "</result-item>\n";

	var qitem2s = Ext.get("DragContainer3").dom.childNodes;
	str += "<restraint-item>\n";
	if (qitem2s && qitem2s.length > 0) {
		for (var i = 0; i < qitem2s.length; i++) {
			var index = qitem2s[i].id;
			var name = Ext.get(index + "_column").dom.value;
			var tableName = Ext.get(index + "_table").dom.value;
			var param = Ext.get(index + "_param").dom.value;
			var mode = Ext.get(index + "_mode").dom.value;

			str += '<item name="' + name + '" tableName="' + tableName
					+ '" param="' + param + '" mode="' + mode + '"></item>\n';
		}

	}
	str += "</restraint-item>\n";

	str += "</query>\n";
	str += "</object-query>";

	return str;
}