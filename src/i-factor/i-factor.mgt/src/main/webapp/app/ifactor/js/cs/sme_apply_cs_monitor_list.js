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
function sme_apply_cs_monitor_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if (dataIndex == 'CPCTIME') {
		var pkId = record.data['PK_ID'];
		var title = ifactorTranslator.getLangLabel('seller-language', 'seller_apply');

		return '<a href="javascript:void(0);" onclick="javascript:seeSellerView(\''
				+ pkId
				+ '\',\''
				+ title
				+ '\');" title="'+ifactorTranslator.getLangLabel('seller-language', 'view_detail_info1')+'">'
				+ formatDate(value) + '</a>';

	}
	return value;
}

function seeSellerView(id, name) {
	initTableViewWindowFrame({
				id : 'if_cp_apply_add',
				globalReadOnly : true,
				labelAlign : 'top',
				modal : true,
				params : {
					PK_ID : id
				}
			});
	Ext.Ajax.request({
		url : context + '/views/csMonitorRecord/addMonitorRecord',
		method : 'POST',
		params : {
			flowType : 'seller',
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

function sme_apply_cs_monitor_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push({
				id : gridId + '_callingservice',
				iconCls : 'icon-tel',
				text : ifactorTranslator.getLangLabel('ifcommon-language', 'call_service'),
				disabled : true,
				handler : function() {
					var csMonitorGrid = Ext.getCmp(gridId);
					var selectRows = csMonitorGrid.rowSelectCache.values();
					var record = selectRows[0];
					showSellerCsRecordWin(record);
				}
	});
}
/**
 * show cs record window
 * 
 * @param record
 */
function showSellerCsRecordWin(record) {
	Ext.Ajax.request({
		url : context + '/views/flowexternal/findInstance',
		method : 'POST',
		params : {
			id : record.data.PK_ID,
			tv : 'if_cp_apply_add'
		},
		success : function(response, options) {
			var json = Ext.util.JSON.decode(response.responseText);
			if (json.success) {
				var lendApplyTodoGrid = tvquery({
							querykey : 'seller_apply_cs_record_list',
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
							id : 'ifactor_seller_flow_cs_record_add',
							params : {
								insId : json.data.insId,
								aId : json.data.actId,
								applyId : record.data.PK_ID
							}
						}, function(form) {
							form.region = 'center';
							var viewWin = new Ext.Window({
								renderTo : Ext.getBody(),
								layout : 'border',
								width : 975,
								height : 580,
								title :ifactorTranslator.getLangLabel('seller-language', 'cs_record'),
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
												'IF_MGT_SELLER_FLOW_CS_RECORD',
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
function sme_apply_cs_monitor_list_click(e, thiz, options) {
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
/**
function sme_apply_cs_monitor_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push({
				id : gridId + '_callingservice',
				iconCls : 'icon-tel',
				text : 'Calling Service',
				disabled : true,
				handler : function() {
					var selectRows = Ext.getCmp(gridId).rowSelectCache.values();

					var record = selectRows[0];

					/*
					 * Ext.Ajax.request({ url : context +
					 * '/views/cs/callingservice', method : 'POST', params : {
					 * id : record.data.PK_ID }, success : function(response,
					 * options) { var json = Ext.util.JSON
					 * .decode(response.responseText); if (json.success) { } }
					 * });
					 */

					/**var simple = new Ext.FormPanel({
								labelWidth : 150, // label settings here
								// cascade unless overridden
								url : 'save-form.php',
								frame : false,
								border : true,
								bodyStyle : 'padding:5px 5px 0',
								labelAlign : 'left',
								defaults : {
									width : 230
								},
								defaultType : 'textfield',

								items : [{
											fieldLabel : 'Called SME',
											disabled : true,
											value : ''
										}, {
											fieldLabel : 'Data modify limit date',
											disabled : true,
											value : ''
										}, {
											fieldLabel : 'Elapsed days',
											disabled : true,
											value : ''
										}, {
											fieldLabel : 'Remaining days',
											disabled : true,
											value : ''
										}, {
											name : 'pkId',
											xtype : 'hidden'
										}]
							});

					var win = new Ext.Window({
								layout : 'fit',
								width : 500,
								height : 300,
								plain : true,
								title : 'Calling Service for ('
										+ record.data.MYTITLE + ')',
								items : [simple],
								modal : true,
								buttons : [{
											text : 'Call SME',
											disabled : true
										}, {
											text : 'Close',
											handler : function() {
												win.close();
											}
										}]
							});

					win.show(this);
				}
			});
}
**/
