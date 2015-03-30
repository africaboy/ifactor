function seeSMEView(id, name) {
	initTableViewWindowFrame({
				id : 'if_cp_apply_add',
				globalReadOnly : true,
				modal : true,
				params : {
					PK_ID : id
				}
			});
}

/**
 * render column value
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @param {}
 *            gridId
 * @return {}
 */
function sme_todo_assign_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId, options) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'CPCTIME') {
		return formatDate(value);
	} else if (dataIndex == 'MYTITLE') {
		return '<a href="javascript:seeSMEView(\'' + record.data['PK_ID']
				+ '\');">' + value + '</a>';
	}

	return value;
}

function sme_todo_assign_list_click(e, thiz, options) {
	var selectRows = thiz.rowSelectCache.values();
	if (selectRows.length > 0) {
		Ext.getCmp(thiz.id + '_assignMenu').enable();
	} else {
		Ext.getCmp(thiz.id + '_assignMenu').disable();
	}
}

function sme_todo_assign_selectlist_click(e, thiz, options) {
	var selectRows = thiz.rowSelectCache.values();
	if (selectRows.length > 0) {
		Ext.getCmp(thiz.id + '_assignBtn').enable();
	} else {
		Ext.getCmp(thiz.id + '_assignBtn').disable();
	}
}

/**
 * 添加操作按钮
 * 
 * @param {}
 *            gridId
 * @param {}
 *            options
 * @param {}
 *            defaultToolbarMenus
 */
function sme_todo_assign_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push({
		id : gridId + '_assignMenu',
		iconCls : 'add',
		text : 'Assign Field Visit',
		disabled : true,
		handler : function() {
			var TQOptions = {
				querykey : 'sme_todo_assign_selectlist',
				params : {

				}
			};

			initTQExtListForU(TQOptions, function(grid, resultJson) {
				var win = new Ext.Window({
					renderTo : Ext.getBody(),
					layout : 'fit',
					width : resultJson.resultData.param.width == null
							? 800
							: resultJson.resultData.param.width,
					height : resultJson.resultData.param.height == null
							? 500
							: resultJson.resultData.param.height,
					title : resultJson.resultData.name,
					resizable : true,
					plain : true,
					modal : true,
					maximizable : false,
					items : [grid],
					buttons : [{
						id : grid.id + '_assignBtn',
						text : 'Confirm',
						disabled : true,
						handler : function() {
							var selectedUsers = grid.getSelectionModel()
									.getSelections();

							if (selectedUsers.length > 0) {
								var params = {
									userId : selectedUsers[0].data.ID
								};

								var selectedActivities = Ext.getCmp(gridId)
										.getSelectionModel().getSelections();

								var actIds = '';
								var appIds = '';

								for (var i = 0; i < selectedActivities.length; i++) {
									var actId = selectedActivities[i].data.A_ID;
									var appId = selectedActivities[i].data.PK_ID;

									if (i < selectedActivities.length - 1) {
										actIds += actId + ','
										appIds += appId + ','
									} else {
										actIds += actId;
										appIds += appId;
									}
								}

								// 流程活动记录id
								params.actIds = actIds;
								
								// 业务数据唯一值(这里将申请单主表主键作为唯一值)
								params.loanIds = appIds;

								// 动作来源(通常使用当前通用查询id)
								params.source = 'sme_todo_assign_list';

								Ext.Ajax.request({

									url : context
											+ '/system/flowservice.do?method=assignWorkflow',
									params : params,
									method : 'POST',
									success : function(response, request) {
										var result = response.responseText;// 拿到结果集，此时为字符串
										var resultJson = Ext.util.JSON
												.decode(result);// 将字符串转换为json类型

										if (resultJson.success) {
											// methods.loadJSCSS(resultJson);

											Ext.MessageBox.alert('Hint',
													'Tasks successfully');

											win.close();
											win = null;

											Ext.getCmp(gridId + '_assignMenu')
													.disable();

											reloadTQList(gridId);
										} else {
											Ext.MessageBox.alert('Hint',
													resultJson.errorMsg);
											win.close();
											win = null;

											Ext.getCmp(gridId + '_assignMenu')
													.disable();

											reloadTQList(gridId);
										}

									},
									failure : function(response, options) {
										Ext.MessageBox
												.alert(
														'Failure',
														'Error code:'
																+ response.status);

									}
								});
							}
						}
					}, {
						text : 'Close',
						handler : function() {
							win.close();
							win = null;
						}
					}]
				});

				win.show();
			});
		}
	});
}