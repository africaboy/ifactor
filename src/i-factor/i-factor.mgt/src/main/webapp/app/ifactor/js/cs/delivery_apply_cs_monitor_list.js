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
function delivery_apply_cs_monitor_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if (dataIndex == 'IDA_CODE') {
		var pkId = record.data['IIDA_PK_ID'];
		var title = ifactorTranslator.getLangLabel('invoice-language', 'invoice_apply');

		return '<a href="javascript:void(0);" onclick="javascript:seeInvoiceView(\''
				+ pkId
				+ '\',\''
				+ title
				+ '\');" title="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_detail')+'">'
				+ value + '</a>';

	}else if(dataIndex == "IDA_DATE"){
		return formatDate(value);
	}
	return value;
}

function seeInvoiceView(id, name) {
	initTableViewWindowFrame({
				id : 'ifactor_invoice_delivery_apply',
				globalReadOnly : true,
				labelAlign : 'top',
				modal : true,
				params : {
					IIDA_PK_ID : id
				}
			});
	Ext.Ajax.request({
		url : context + '/views/csMonitorRecord/addMonitorRecord',
		method : 'POST',
		params : {
			flowType : 'invoice',
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

function delivery_apply_cs_monitor_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push({
				id : gridId + '_callingservice',
				iconCls : 'icon-tel',
				text : ifactorTranslator.getLangLabel('ifcommon-language', 'call_service'),
				disabled : true,
				handler : function() {
					var csMonitorGrid = Ext.getCmp(gridId);
					var selectRows = csMonitorGrid.rowSelectCache.values();
					var record = selectRows[0];
					showInvoiceCsRecordWin(record);
				}
	});
}
/**
 * show cs record window
 * 
 * @param record
 */
function showInvoiceCsRecordWin(record) {
	Ext.Ajax.request({
		url : context + '/views/flowexternal/findInstance',
		method : 'POST',
		params : {
			id : record.data.IIDA_PK_ID,
			tv : 'ifactor_invoice_delivery_apply'
		},
		success : function(response, options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if (json.success) {
				var lendApplyTodoGrid = tvquery({
							querykey : 'invoice_apply_cs_record_list',
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
							id : 'ifactor_invoice_flow_cs_record_add',
							params : {
								insId : json.data.insId,
								aId : json.data.actId,
								applyId : record.data.IIDA_PK_ID
							}
						}, function(form) {
							form.region = 'center';
							var viewWin = new Ext.Window({
								renderTo : Ext.getBody(),
								layout : 'border',
								width : 975,
								height : 580,
								title :ifactorTranslator.getLangLabel('invoice-language', 'cs_record'),
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
												'IF_MGT_INVOICE_CS_RECORD',
												'single', '-1',null,
												function() {
													Ext.MessageBox
															.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),
																	ifactorTranslator.getLangLabel('ifcommon-language', 'cs_success'));

													viewWin.close();
													viewWin = null;

												}, form, null,'CSRecordMachining');
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
function delivery_apply_cs_monitor_list_click(e, thiz, options) {
	var selectRows = thiz.rowSelectCache.values();
	if (selectRows.length > 0) {
		var record = selectRows[0];
		if (record.data.CSCALLME != '1')
			Ext.getCmp(thiz.id + '_callingservice').enable();
		else
			Ext.getCmp(thiz.id + '_callingservice').disable();
	} else {
		Ext.getCmp(thiz.id + '_callingservice').disable();
	}
}
