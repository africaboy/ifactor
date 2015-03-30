function seeBuyerView(id, name) {
	initTableViewWindowFrame({
				id : 'ifactor_buyer_apply',
				globalReadOnly : true,
				labelAlign : 'top',
				modal : true,
				params : {
					IBA_PK_ID : id
				},
				labelAlign : 'top'
			});
	Ext.Ajax.request({
		url : context + '/views/csMonitorRecord/addMonitorRecord',
		method : 'POST',
		params : {
			flowType : 'buyer',
			pkId : id,
			userId : userId
		},
		success : function(response, options) {
			var resultInfo = Ext.util.JSON.decode(response.responseText);
			if(!resultInfo.success){
				Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'exception'));
			}
		},
		failure : function(response, options) {
			Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'exception'));
		}
	});
}

/**
 * render event for list
 * 
 * @param value
 * @param cellmeta
 * @param record
 * @param rowIndex
 * @param columnIndex
 * @param store
 * @param gridId
 */
function buyer_apply_cs_monitor_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if (dataIndex == 'BA_APPLY_CODE') {
		var pkId = record.data['IBA_PK_ID'];
		var title = ifactorTranslator.getLangLabel('buyer-language', 'buyer_apply');

		return '<a href="javascript:void(0);" onclick="javascript:seeBuyerView(\''
				+ pkId
				+ '\',\''
				+ title
				+ '\');" title="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_detail')+'">'
				+ value + '</a>';

	} else if (dataIndex == 'BA_APPLY_DATE') {
		return formatDate(value);
	}

	return value;
}
/**
 * add toolbar buttons
 * 
 * @param gridId
 * @param options
 * @param defaultToolbarMenus
 */
function buyer_apply_cs_monitor_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push('-', {
				iconCls : 'icon-tel',
				id : 'buyerApplyTelRegistrationBtn',
				text : ifactorTranslator.getLangLabel('ifcommon-language', 'call_service'),
				disabled : true,
				handler : function() {
					var csMonitorGrid = Ext.getCmp(gridId);
					var selectRows = csMonitorGrid.rowSelectCache.values();
					var record = selectRows[0];
					showBuyerCsRecordWin(record);
				}
			});
	/*
	 * , { iconCls : 'icon-go', text : 'FS Report Test', handler : function() {
	 * var tv = new initTableView4QueryList(gridId, { params : {} });
	 * tv.newTableView('if_cp_fs_add'); } }
	 */
}
/**
 * show cs record window
 * 
 * @param record
 */
function showBuyerCsRecordWin(record) {
	Ext.Ajax.request({
		url : context + '/views/flowexternal/findInstance',
		method : 'POST',
		params : {
			id : record.data.IBA_PK_ID,
			tv : 'ifactor_buyer_apply'
		},
		success : function(response, options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if (json.success) {
				var lendApplyTodoGrid = tvquery({
							querykey : 'buyer_apply_cs_record_list',
							title : ifactorTranslator.getLangLabel('ifcommon-language', 'call_list'),
							resizable : true,
							modal : true,
							maximizable : true,
							params : {
								insId : json.data.insId
							}
						});
				lendApplyTodoGrid.region = 'north';
				lendApplyTodoGrid.height = 200;

				initTableViewForm({
							id : 'ifactor_buyer_flow_cs_record_add',
							params : {
								insId : json.data.insId,
								aId : json.data.actId,
								applyCode : record.data.BA_APPLY_CODE
							}
						}, function(form) {
							form.region = 'center';
							var viewWin = new Ext.Window({
								renderTo : Ext.getBody(),
								layout : 'border',
								width : 975,
								height : 580,
								title :ifactorTranslator.getLangLabel('buyer-language', 'cs_record'),
								border : false,
								plain : true,
								resizable : true,
								constrain : true,
								modal : true,
								maximizable : false,
								items : [lendApplyTodoGrid, form],
								buttons : [{
									text : 'submit',
									handler : function() {
										remixTable4Ext(
												'IF_MGT_BUYER_FLOW_CS_RECORD',
												'single', '-1',
												null,
												function() {
													Ext.MessageBox
															.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),
																	ifactorTranslator.getLangLabel('ifcommon-language', 'cs_success'));
													viewWin.close();
													viewWin = null;

												}, form, null, 'CSRecordMachining');
									}
								}, {
									text : 'close',
									handler : function() {
										viewWin.close();
										viewWin = null;
									}
								}]
							});
							viewWin.show();
						});
			} else {
				Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'process_instance'));
			}
		},
		failure : function(response, options) {
			Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'process_instance'));
		}
	});

}
/**
 * record click event
 * 
 * @param e
 * @param thiz
 */
function buyer_apply_cs_monitor_list_click(e, thiz) {
	var selectRows = thiz.rowSelectCache.values();
	if (selectRows.length > 0) {
		var record = selectRows[0];
		if (true || record.data.BA_STATUS == 'frTGUAcenq_AyrbNcfEYW_02_0')
			Ext.getCmp('buyerApplyTelRegistrationBtn').enable();
		else
			Ext.getCmp('buyerApplyTelRegistrationBtn').disable();
	} else {
		Ext.getCmp('buyerApplyTelRegistrationBtn').disable();
	}
}