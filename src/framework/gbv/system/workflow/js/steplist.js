/**
 * 初始化流转环节列表
 * 
 * @param {}
 *            fid 工作流程ID
 */
function stepList(gid, gname) {
	// create the Data Store
	var store = new Ext.data.JsonStore({
				root : 'stepList',
				totalProperty : 'totalCount',
				remoteSort : true,

				fields : ['PAGINATION_NUMBER', 'S_ID', 'S_NAME', 'S_NO',
						'S_KEY', 'S_TYPE', 'S_INNER', 'S_STATUS', 'CG_ID'],

				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/flowmanage.do?method=steplist&gid='
									+ gid
						})
			});

	store.setDefaultSort('S_ID', 'asc');

	var grid = new Ext.grid.GridPanel({
				id : 'steplist',
				border : false,
				store : store,
				trackMouseOver : false,
				disableSelection : true,
				loadMask : true,

				// grid columns
				columns : [new Ext.grid.RowNumberer(), {
					id : 'fname',
					header : grooveTranslator.getLangLabel('workflow-language',
							'steplist-name'),
					dataIndex : 'S_NAME',
					sortable : true,
					align : 'center',
					width : 150,
					renderer : renderStepName
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'steplist-no'),
					dataIndex : 'S_NO',
					sortable : true,
					width : 50,
					align : 'center'
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'steplist-key'),
					dataIndex : 'S_KEY',
					sortable : true,
					width : 100
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'steplist-type'),
					dataIndex : 'S_TYPE',
					align : 'center',
					width : 100,
					renderer : renderStepType
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'steplist-inner'),
					dataIndex : 'S_INNER',
					align : 'center',
					width : 50,
					renderer : renderStepInner
				}, {
					header : grooveTranslator.getLangLabel('workflow-language',
							'steplist-setting'),
					dataIndex : 'PAGINATION_NUMBER',
					width : 150,
					renderer : renderStepSet
				}],

				// customize view config
				viewConfig : {
					forceFit : true,
					enableRowBody : true,
					showPreview : false
				},

				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayInfo : true,
							displayMsg : grooveTranslator.getLangLabel(
									'common-language', 'list-displaymsg'),
							emptyMsg : grooveTranslator.getLangLabel(
									'common-language', 'list-emptymsg')
						})
			});

	store.on('load', function(s, records) {
		var girdcount = 0;
		s.each(function(r) {
			if (r.get('S_STATUS') == 0) {
				// grid.getView().getRow(girdcount).style.backgroundColor =
				// '#fffff0';
			} else if (r.get('S_STATUS') == -1) {
				grid.getView().getRow(girdcount).style.backgroundColor = '#ffff00';
				grid.getView().getRow(girdcount).setAttribute(
						'title',
						grooveTranslator.getLangLabel('workflow-language',
								'invalidstep'));
			}
			girdcount = girdcount + 1;
		});
	});

	// trigger the data store load
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	var win = new Ext.Window({
				id : 'stepListWin',
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 800,
				height : 500,
				title : gname,
				plain : true,
				modal : true,
				maximizable : true,
				items : [grid]
			});

	win.show();
}

/**
 * render 环节编辑
 * 
 * @param {}
 *            value
 * @param {}
 *            p
 * @param {}
 *            record
 * @return {}
 */
function renderStepName(value, p, record) {
	var str = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:editStep(\'{1}\');">{0}</a></b>',
					value, record.data.S_ID);
	return str;
}

/**
 * render 环节设置
 * 
 * @param {}
 *            value
 * @param {}
 *            p
 * @param {}
 *            r
 * @return {}
 */
function renderStepSet(value, p, r) {
	var str = '<a href="javascript:void(0);" onclick="javascript:deleteStep(\'{0}\',\'{1}\');">'
			+ grooveTranslator.getLangLabel('workflow-language',
					'steplist-delete') + '</a>';

	if (r.data.S_STATUS == -1) {
		str += '&nbsp;<a href="javascript:void(0);" onclick="javascript:validStep(\'{0}\',\'{1}\');">'
				+ grooveTranslator.getLangLabel('workflow-language',
						'steplist-recover') + '</a>';
	}

	if (r.data.S_TYPE != -1) {
		str += '&nbsp;<a href="javascript:void(0);" onclick="javascript:handlingStepView(\'{2}\',\'{0}\',\'{1}\');">'
				+ grooveTranslator.getLangLabel('workflow-language',
						'steplist-items') + '</a>';
		str += '&nbsp;<a href="javascript:void(0);" onclick="javascript:viewTrend(\'{2}\',\'{0}\',\'{1}\');">'
				+ grooveTranslator.getLangLabel('workflow-language',
						'steplist-trends') + '</a>';
	}
	str = String.format(str, r.data.S_ID, r.data.S_NAME, r.data.CG_ID);
	return str;
};

/**
 * render 环节类型
 * 
 * @param {}
 *            value
 * @param {}
 *            p
 * @param {}
 *            record
 * @return {}
 */
function renderStepType(value, p, record) {
	var tp = "";
	if (value == "-1") {
		tp = '<font color="red">'
				+ grooveTranslator.getLangLabel('workflow-language', 'endstep')
				+ '</font>';
	} else if (value == "0") {
		tp = '<font color="green">'
				+ grooveTranslator.getLangLabel('workflow-language',
						'startstep') + '</font>';
	} else if (value == "1") {
		tp = '<font color="blue">'
				+ grooveTranslator.getLangLabel('workflow-language', 'step')
				+ '</font>';
	} else if (value == "2") {
		tp = '<font color="orange">'
				+ grooveTranslator.getLangLabel('workflow-language',
						'transstep') + '</font>';
	} else if (value == "3") {
		tp = grooveTranslator.getLangLabel('workflow-language', 'numberstep');
	}
	return tp;
}

/**
 * render 环节inner
 * 
 * @param {}
 *            value
 * @param {}
 *            p
 * @param {}
 *            record
 * @return {}
 */
function renderStepInner(value, p, record) {
	var inner = '';
	if (value == '0') {
		inner = grooveTranslator.getLangLabel('frequence-language', 'no');
	} else {
		inner = grooveTranslator.getLangLabel('frequence-language', 'yes');
	}

	return inner;
}

/**
 * 删除流程环节
 * 
 * @param {}
 *            id 环节id
 */
function deleteStep(id) {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel(
					'workflow-language', 'step-delete-prompt'), function(btn) {
				if (btn == 'yes') {
					var url = context
							+ '/system/flowmanage.do?method=deletestep';

					Ext.Ajax.request({
								// 请求地址
								url : url,
								params : {
									id : id
								},
								scriptTag : true,
								// 成功时回调
								success : function(response, options) {
									var json = response.responseText;
									var o = Ext.util.JSON.decode(json);

									if (o.success) {
										Ext.Msg.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator.getLangLabel(
														'workflow-language',
														'step-delete-success'));
									} else {
										Ext.Msg.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator.getLangLabel(
														'workflow-language',
														'step-delete-failure'));
									}
								},
								failure : function(response, options) {
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											response.responseText);
								}

							});
				}
			});
}

/**
 * 设置环节处理表单项权限
 * 
 * @param {}
 *            gid
 * @param {}
 *            sid
 * @param {}
 *            name
 */
function handlingStep(gid, sid, name) {
	var url = context + '/system/flowmanage.do?method=editstate&sid=' + sid
			+ '&gid=' + gid

	Ext.Ajax.request({
		// 请求地址
		url : url,
		scriptTag : true,
		// 成功时回调
		success : function(response, options) {
			var json = response.responseText;
			var o = Ext.util.JSON.decode(json);

			if (o.success) {
				var tables = new Array();

				var win = new Ext.Window({
							renderTo : Ext.getBody(),
							layout : 'accordion',
							split : true,
							title : grooveTranslator.getLangLabel(
									'workflow-language', 'handler-form-title'),
							width : 700,
							height : 500,
							plain : true,
							modal : true,
							maximizable : false,
							buttons : [{
								text : grooveTranslator.getLangLabel(
										'common-language', 'save'),
								handler : function() {
									updateHandleSet(win, tables, sid);
								}
							}, {
								text : grooveTranslator.getLangLabel(
										'common-language', 'close'),
								handler : function() {
									win.close();
									win = null;
								}
							}]

						});

				var idx = 0;

				Ext.each(o.handleList, function(item) {
					var store = new Ext.data.Store({
								reader : new Ext.data.JsonReader({
											root : 'resultList',
											fields : ['PAGINATION_NUMBER',
													'H_ID', 'S_ID', 'OBJ_ITEM',
													'OBJ_ITEMTYPE',
													'OBJ_ITEMNAME', 'H_TYPE',
													'OBJ_TABLE',
													'OBJ_TABLENAME',
													'OBJ_TABLEHANDLE']
										})
							});

					var grid = null;

					if (item.tableHandle == 1) {
						grid = new Ext.grid.EditorGridPanel({
									title : item.tableMemo + ' ['
											+ item.tableName + ']',
									border : false,
									store : store,
									trackMouseOver : false,
									disableSelection : true,
									loadMask : true,

									// grid columns
									columns : [new Ext.grid.RowNumberer(), {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-name'),
										dataIndex : 'OBJ_ITEMNAME',
										width : 150
									}, {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-purview'),
										width : 100,
										sortable : false,
										editor : getWBComboStore('purview', '',
												'purview_' + idx, '', null,
												null, '0'),
										dataIndex : 'H_TYPE'
									}, {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-column'),
										dataIndex : 'OBJ_ITEM',
										width : 100
									}, {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-columntype'),
										dataIndex : 'OBJ_ITEMTYPE',
										width : 100
									}, {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-type'),
										dataIndex : 'OBJ_TABLEHANDLE',
										align : 'center',
										width : 100
									}],
									tbar : new Ext.Toolbar({
												autoWidth : true,
												autoShow : true,
												items : []
											}),

									// customize view config
									viewConfig : {
										forceFit : true,
										enableRowBody : true,
										showPreview : false
									}
								});

						store.loadData(item.columnList);

						var tb = grid.getTopToolbar();

						var insertChkId = 'insertChk_' + item.tableName;

						var editChkId = 'editChk_' + item.tableName;

						var delChkId = 'delChk_' + item.tableName;

						tb.add(grooveTranslator.getLangLabel(
								'workflow-language', 'handlerlist-tbar-add'))
						tb.add(new Ext.form.Checkbox({
									id : insertChkId,
									checked : item.tableAdd == 1,
									inputValue : item.tableAddId
								}));
						tb.add('-');
						tb.add(grooveTranslator.getLangLabel(
								'workflow-language', 'handlerlist-tbar-edit'))
						tb.add(new Ext.form.Checkbox({
									id : editChkId,
									checked : item.tableEdit == 1,
									inputValue : item.tableEdit
								}));
						tb.add('-');
						tb
								.add(grooveTranslator.getLangLabel(
										'workflow-language',
										'handlerlist-tbar-delete'))
						tb.add(new Ext.form.Checkbox({
									id : delChkId,
									checked : item.tableDel == 1,
									inputValue : item.tableDelId
								}));

						tables.push([grid, item.tableHandle, insertChkId,
								editChkId, delChkId, item.tableName]);
					} else {
						grid = new Ext.grid.EditorGridPanel({
									title : item.tableMemo + ' ['
											+ item.tableName + ']',
									border : false,
									store : store,
									trackMouseOver : false,
									disableSelection : true,
									loadMask : true,

									// grid columns
									columns : [new Ext.grid.RowNumberer(), {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-name'),
										dataIndex : 'OBJ_ITEMNAME',
										width : 150
									}, {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-purview'),
										width : 100,
										sortable : false,
										editor : getWBComboStore('purview', '',
												'purview_', '', null, null, '0'),
										dataIndex : 'H_TYPE'
									}, {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-column'),
										dataIndex : 'OBJ_ITEM',
										width : 100
									}, {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-columntype'),
										dataIndex : 'OBJ_ITEMTYPE',
										width : 100
									}, {
										header : grooveTranslator.getLangLabel(
												'workflow-language',
												'handlerlist-type'),
										dataIndex : 'OBJ_TABLEHANDLE',
										align : 'center',
										width : 100
									}],

									// customize view config
									viewConfig : {
										forceFit : true,
										enableRowBody : true,
										showPreview : false
									}
								});

						store.loadData(item.columnList);

						tables.push([grid, item.tableHandle]);
					}

					idx++;

					/*
					 * alert(item.tableName); alert(item.tableMemo);
					 * alert(item.tableHandle); alert(item.columnList.length);
					 */

					/*
					 * var accordion = new Ext.Panel({ border : false, split :
					 * true, layout : 'accordion', items : [grid] });
					 */

					win.items.add(grid);
					win.doLayout();
				});

				win.show();
			} else {
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'workflow-language', 'handler-set-alert'));
			}
		},
		failure : function(response, options) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), response.responseText);
		}
	});
}

/**
 * 编辑环节表单项操作权限
 * 
 * @param {}
 *            win
 * @param {}
 *            tables
 * @param {}
 *            sid
 */
function updateHandleSet(win, tables, sid) {
	var params;

	var countName = 0;
	var countNameStr = '';

	if (tables.length > 0) {
		params = '({'
		/* 关联表设置 */
		for (var i = 0; i < tables.length; i++) {
			var grid = tables[i][0];
			var handle = tables[i][1];

			var total = grid.getStore().getCount();

			if (handle == 0) {
				for (var j = 0; j < total; j++) {
					// 每行records对象
					var record = grid.getStore().getAt(j);

					params += 'hid_' + countName + ' : "' + record.data.H_ID
							+ '",';

					params += 'htype_' + countName + ' : "'
							+ record.data.H_TYPE + '",';

					params += 'oitem_' + countName + ' : "'
							+ record.data.OBJ_ITEM + '",';

					params += 'sid_' + countName + ' : "' + record.data.S_ID
							+ '",';

					params += 'otable_' + countName + ' : "'
							+ record.data.OBJ_TABLE + '",';

					countName++;
				}
			} else if (handle == 1) {
				var insertChkId = tables[i][2];
				var editChkId = tables[i][3];
				var delChkId = tables[i][4];
				var tableName = tables[i][5];

				if (Ext.getCmp(insertChkId) && Ext.getCmp(insertChkId).checked) {
					params += 'hid_' + countName + ' : "'
							+ Ext.get(insertChkId).dom.value + '",';

					params += 'htype_' + countName + ' : "'
							+ (Ext.getCmp(insertChkId).checked ? '1' : '0')
							+ '",';

					params += 'oitem_' + countName + ' : "MADDTYPE",';

					params += 'sid_' + countName + ' : "' + sid + '",';

					params += 'otable_' + countName + ' : "' + tableName + '",';

					countName++;
				}

				if (Ext.getCmp(editChkId) && Ext.getCmp(editChkId).checked) {
					params += 'hid_' + countName + ' : "'
							+ Ext.get(editChkId).dom.value + '",';

					params += 'htype_' + countName + ' : "'
							+ (Ext.getCmp(editChkId).checked ? '1' : '0')
							+ '",';

					params += 'oitem_' + countName + ' : "MEDITTYPE",';

					params += 'sid_' + countName + ' : "' + sid + '",';

					params += 'otable_' + countName + ' : "' + tableName + '",';

					countName++;
				}

				if (Ext.getCmp(delChkId) && Ext.getCmp(delChkId).checked) {
					params += 'hid_' + countName + ' : "'
							+ Ext.get(delChkId).dom.value + '",';

					params += 'htype_' + countName + ' : "'
							+ (Ext.getCmp(delChkId).checked ? '1' : '0') + '",';

					params += 'oitem_' + countName + ' : "MDELTYPE",';

					params += 'sid_' + countName + ' : "' + sid + '",';

					params += 'otable_' + countName + ' : "' + tableName + '",';

					countName++;
				}

				for (var j = 0; j < total; j++) {
					// 每行records对象
					var record = grid.getStore().getAt(j);

					params += 'hid_' + countName + ' : "' + record.data.H_ID
							+ '",';

					params += 'htype_' + countName + ' : "'
							+ record.data.H_TYPE + '",';

					params += 'oitem_' + countName + ' : "'
							+ record.data.OBJ_ITEM + '",';

					params += 'sid_' + countName + ' : "' + record.data.S_ID
							+ '",';

					params += 'otable_' + countName + ' : "'
							+ record.data.OBJ_TABLE + '",';

					countName++;
				}
			}

		}

		for (var i = 0; i < countName; i++) {
			if (i == countName - 1) {
				countNameStr += i;
			} else {
				countNameStr += i + ',';
			}
		}

		params += 'countName : "' + countNameStr + '"';

		params += '})';
	}

	if (params == null) {
		Ext.Msg.alert(grooveTranslator
						.getLangLabel('common-language', 'prompt'),
				grooveTranslator.getLangLabel('workflow-language',
						'handler-set-selectalert'));
	} else {
		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'submit-loading'));

		Ext.Ajax.request({
					url : context + '/system/flowmanage.do?method=updatestate',
					method : 'POST',
					params : eval(params),
					scope : this,
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (o.success) {
							Ext.MessageBox.hide();

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'handler-success'));

							win.close();
							win = null;
						} else {
							Ext.MessageBox.hide();

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'handler-failure'));
						}
					},
					failure : function(response) {
						Ext.MessageBox.hide();
						Ext.MessageBox.show({
									title : grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									msg : response.responseText,
									icon : Ext.MessageBox.ERROR
								});

					}

				});
	}
}

function viewTrend(gid, sid, name) {
	var store = new Ext.data.JsonStore({
				root : 'stepList',
				totalProperty : 'totalCount',
				remoteSort : true,

				fields : ['PAGINATION_NUMBER', 'S_ID', 'S_NAME', 'S_NO',
						'S_TYPE', 'S_TYPENAME', 'S_INNER', 'S_INNERNAME',
						'S_STATUS', 'CG_ID', 'BYWHAT', 'TRENDNAME', 'YESORNO',
						'YNRESPONSE'],

				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/flowmanage.do?method=trendlist&sid='
									+ sid
						})
			});

	store.setDefaultSort('S_ID', 'asc');

	var grid = new Ext.grid.EditorGridPanel({
		id : 'steplist',
		border : false,
		store : store,
		trackMouseOver : false,
		disableSelection : true,
		loadMask : true,
		clicksToEdit : 1,
		// grid columns
		columns : [new Ext.grid.RowNumberer(), {
			id : 'fname',
			header : grooveTranslator.getLangLabel('workflow-language',
					'trendlist-destination'),
			dataIndex : 'S_NAME',
			align : 'center',
			width : 120
		}, {
			header : grooveTranslator.getLangLabel('workflow-language',
					'trendlist-type'),
			dataIndex : 'S_TYPENAME',
			align : 'center',
			width : 120
		}, {
			header : grooveTranslator.getLangLabel('workflow-language',
					'trendlist-trendname'),
			dataIndex : 'TRENDNAME',
			width : 130,
			editor : new Ext.form.TextField({
						allowBlank : false
					})
		}, {
			header : grooveTranslator.getLangLabel('workflow-language',
					'trendlist-result'),
			dataIndex : 'YESORNO',
			width : 130,
			editor : new Ext.form.ComboBox({
						typeAhead : true,
						triggerAction : 'all',
						lazyRender : true,
						store : [['yes', 'yes'], ['no', 'no'], ['back', 'back']]
					})
		}, {
			header : grooveTranslator.getLangLabel('workflow-language',
					'trendlist-responsiblestep'),
			dataIndex : 'YNRESPONSE',
			width : 200,
			editor : new Ext.form.TextField({
						allowBlank : false
					})
		}, {
			header : grooveTranslator.getLangLabel('workflow-language',
					'trendlist-bywhat'),
			dataIndex : 'BYWHAT',
			width : 130,
			editor : new Ext.form.ComboBox({
						store : [['byhand', 'byhand'],
								['bythinking', 'bythinking']]
					})
		}, {
			header : grooveTranslator.getLangLabel('workflow-language',
					'trendlist-op'),
			dataIndex : 'SP',
			width : 50,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				return '<a href="javascript:void(0);" onclick="javascript:saveBywhat(\''
						+ sid
						+ '\',\''
						+ record.data['S_ID']
						+ '\',\''
						+ record.data['BYWHAT']
						+ '\',\''
						+ record.data['TRENDNAME']
						+ '\',\''
						+ record.data['YESORNO']
						+ '\',\''
						+ record.data['YNRESPONSE']
						+ '\')">'
						+ grooveTranslator.getLangLabel('workflow-language',
								'trendlist-save') + '</a>'
			}
		}],

		// customize view config
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : false
		}
	});

	// trigger the data store load
	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	var win = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 800,
				height : 400,
				title : '{'
						+ name
						+ '}_'
						+ grooveTranslator.getLangLabel('workflow-language',
								'trend-title'),
				plain : true,
				modal : true,
				maximizable : true,
				items : [grid],
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						win.close();
						win = null;
					}
				}]
			});

	win.show();
}

function saveBywhat(fstepid, tstepid, bywhat, trendname, yesorno, ynresponse) {
	Ext.getCmp('steplist').stopEditing();

	Ext.Ajax.request({
		url : context + '/system/flowmanage.do?method=updatebywhat',
		method : 'POST',
		params : {
			fstepid : fstepid,
			tstepid : tstepid,
			bywhat : bywhat,
			trendname : trendname,
			yesorno : yesorno,
			ynresponse : ynresponse
		},
		scope : this,
		success : function(response) {
			var o = Ext.util.JSON.decode(response.responseText);
			if (o.success) {
				Ext.MessageBox.hide();

				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'workflow-language', 'trendlist-save-success'));
			} else {
				Ext.MessageBox.hide();

				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'workflow-language', 'trendlist-save-failure'));
			}
		},
		failure : function(response) {
			Ext.MessageBox.hide();
			Ext.MessageBox.show({
						title : grooveTranslator.getLangLabel(
								'common-language', 'prompt'),
						msg : response.responseText,
						icon : Ext.MessageBox.ERROR
					});

		}

	});
}