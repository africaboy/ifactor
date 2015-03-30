function consoleTabPanelRender(tabId, consoleheader, consoletcenter) {
	/*showPrimaryAuditTab({
		tabcontainerid : tabId,
		consoleheader : consoleheader,
		consoletcenter : consoletcenter
	});*/
}
/**
 * the console for to do
 * 
 * @param {}
 *            options
 */
function showPrimaryAuditTab(options) {

	var mainpanel = {
		border : false,
		frame : false,
		layout : 'accordion',
		items : []
	};

	var xmlhttp = sendRequestObject(context + '/views/maintab/getUserTodoList');

	if (xmlhttp.status == 200) {
		var result = xmlhttp.responseText;

		var o = Ext.util.JSON.decode(result);

		if (o.success) {
			var wfObj = [ 'buyerApplyObject', 'invoiceDeliveryObject' ];

			Ext
					.each(
							wfObj,
							function(obj) {
								Ext
										.each(
												o.userTodoList,
												function(item) {
													if (item.INS_OBJECT == obj) {
														// buyer apply flow todo
														// list grid
														if (item.INS_OBJECT == 'buyerApplyObject') {
															var buyerApplyTodoGrid = initBuyerApplyTodoGrid();
															mainpanel.items
																	.push(buyerApplyTodoGrid);

														} else if (item.INS_OBJECT == 'invoiceDeliveryObject') {
															// invoice delivery
															// apply flow todo
															// list grid
															var invoiceDeliveryApplyTodoGrid = initInvoiceDeliveryApplyTodoGrid();
															mainpanel.items
																	.push(invoiceDeliveryApplyTodoGrid);

														}
													}

												});

							});
		}
	} else {
		Ext.Msg.alert('hint', 'Failed to get backlog information');
	}

	var showpanel = new Ext.Panel({
		title : 'To-do tasks',
		tabTip : 'My to-do tasks',
		layout : 'fit',
		border : false,
		frame : false,
		items : [ mainpanel ]
	});

	showpanel.setIconClass('tabs');
	showpanel.closable = false;
	Ext.getCmp(options.tabcontainerid).add(showpanel);
	Ext.getCmp(options.tabcontainerid).setActiveTab(showpanel);
}
/**
 * initialize buyer flow todo
 */
function initBuyerApplyTodoGrid() {
	var buyerApplyTodo_cm = new Ext.grid.ColumnModel([ {
		header : 'Sequence',
		dataIndex : 'PAGINATION_NUMBER',
		width : 40
	}, {
		header : 'Buyer Apply Code',
		align : 'center',
		dataIndex : 'BA_APPLY_CODE',
		width : 100,
		renderer : buyerApplyTodoGridRender
	}, {
		header : 'Receipt Time',
		align : 'center',
		dataIndex : 'A_STIME',
		renderer : formatTime,
		width : 100
	}, {
		header : 'Current Status',
		align : 'center',
		dataIndex : 'BA_STATUS_VAL'
	}, {
		header : 'Submitter',
		align : 'center',
		dataIndex : 'A_LASTEXECUTOR'
	} ]);
	var buyerApplyTodo_ds = new Ext.data.JsonStore({
		remoteSort : false,
		root : 'buyerApplyTodoList',
		totalProperty : 'totalCount',
		fields : [ 'IBA_PK_ID', 'A_ID', 'A_LASTEXECUTOR', 'BA_STATUS_VAL',
				'A_STIME', 'BA_APPLY_CODE', 'PAGINATION_NUMBER' ],
		proxy : new Ext.data.HttpProxy({
			url : context + '/views/maintab/buyerApplyTodoList'
		})
	});

	var buyerApplyTodoGrid = new Ext.grid.GridPanel(
			{
				title : 'Buyer Apply To Do',
				id : 'buyerApplyTodoGrid',
				cm : buyerApplyTodo_cm,
				ds : buyerApplyTodo_ds,
				autoScroll : true,
				stripeRows : true,
				border : false,
				frame : false,
				loadMask : {
					msg : "data loading,please wait..."
				},
				viewConfig : {
					forceFit : true,
					templates : {
						cell : new Ext.Template(
								'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id}   x-selectable {css}" style="{style}"   tabIndex="0" {cellAttr}>',
								'<div class="x-grid3-cell-inner x-grid3-col-{id}"  {attr}>{value}</div>',
								'</td>')
					}
				},
				bbar : new Ext.PagingToolbar({
					pageSize : 20,// 每页显示的记录值
					store : buyerApplyTodo_ds,
					displayInfo : true,
					displayMsg : 'The total number of records {0} - {1} of {2}',
					emptyMsg : "There is no record"
				})
			});

	buyerApplyTodo_ds.load({
		params : {
			start : 0,
			limit : 20
		}
	});
	return buyerApplyTodoGrid;
}
/**
 * initialize invoice delivery flow todo
 * 
 * @returns {Ext.grid.GridPanel}
 */
function initInvoiceDeliveryApplyTodoGrid() {
	var invoiceDeliveryApplyTodo_cm = new Ext.grid.ColumnModel([ {
		header : 'Sequence',
		dataIndex : 'PAGINATION_NUMBER',
		width : 40
	}, {
		header : 'Invoice Delivery Apply Code',
		align : 'center',
		dataIndex : 'IDA_CODE',
		width : 100,
		renderer : invoiceDeliveryApplyTodoGridRender
	}, {
		header : 'Receipt Time',
		align : 'center',
		dataIndex : 'A_STIME',
		renderer : formatTime,
		width : 100
	}, {
		header : 'Current Status',
		align : 'center',
		dataIndex : 'IDA_STATUS_VAL'
	}, {
		header : 'Submitter',
		align : 'center',
		dataIndex : 'A_LASTEXECUTOR'
	} ]);
	var invoiceDeliveryApplyTodo_ds = new Ext.data.JsonStore({
		remoteSort : false,
		root : 'invoiceDeliveryApplyTodoList',
		totalProperty : 'totalCount',
		fields : [ 'IDA_PK_ID', 'A_ID', 'A_LASTEXECUTOR', 'IDA_STATUS_VAL',
				'A_STIME', 'IDA_CODE', 'PAGINATION_NUMBER' ],
		proxy : new Ext.data.HttpProxy({
			url : context + '/views/maintab/invoiceDeliveryApplyTodoList'
		})
	});

	var invoiceDeliveryApplyTodoGrid = new Ext.grid.GridPanel(
			{
				title : 'Invoice Delivery Apply To Do',
				id : 'invoiceDeliveryApplyTodoGrid',
				cm : invoiceDeliveryApplyTodo_cm,
				ds : invoiceDeliveryApplyTodo_ds,
				autoScroll : true,
				stripeRows : true,
				border : false,
				frame : false,
				loadMask : {
					msg : "data loading,please wait..."
				},
				viewConfig : {
					forceFit : true,
					templates : {
						cell : new Ext.Template(
								'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id}   x-selectable {css}" style="{style}"   tabIndex="0" {cellAttr}>',
								'<div class="x-grid3-cell-inner x-grid3-col-{id}"  {attr}>{value}</div>',
								'</td>')
					}
				},
				bbar : new Ext.PagingToolbar({
					pageSize : 20,// 每页显示的记录值
					store : invoiceDeliveryApplyTodo_ds,
					displayInfo : true,
					displayMsg : 'The total number of records {0} - {1} of {2}',
					emptyMsg : "There is no record"
				})
			});

	invoiceDeliveryApplyTodo_ds.load({
		params : {
			start : 0,
			limit : 20
		}
	});
	return invoiceDeliveryApplyTodoGrid;
}

function buyerApplyTodoGridRender(value, cellmeta, record, rowIndex,
		columnIndex, store) {
	var gridId = 'buyerApplyTodoGrid';

	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'BA_APPLY_CODE') {
		var pkId = record.data['IBA_PK_ID'];
		var actId = record.data['A_ID'];
		var tabId = 'activity_' + record.data['A_ID'];
		var title = 'buyer apply form_' + value;

		return '<a href="javascript:void(0);" onclick="javascript:todoInstance(\'buyerApplyFlow\', \''
				+ pkId
				+ '\',\''
				+ gridId
				+ '\',\''
				+ actId
				+ '\', \''
				+ tabId
				+ '\', \'' + title + '\');" title="Click on to deal with">' + value + '</a>';
	}

}
function invoiceDeliveryApplyTodoGridRender(value, cellmeta, record, rowIndex,
		columnIndex, store) {
	var gridId = 'invoiceDeliveryApplyTodoGrid';

	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'IDA_CODE') {
		var pkId = record.data['IIDA_PK_ID'];
		var actId = record.data['A_ID'];
		var tabId = 'activity_' + record.data['A_ID'];
		var title = 'invoice delivery apply form_' + value;

		return '<a href="javascript:void(0);" onclick="javascript:todoInstance(\'invoiceDeliveryFlow\', \''
				+ pkId
				+ '\',\''
				+ gridId
				+ '\',\''
				+ actId
				+ '\', \''
				+ tabId
				+ '\', \'' + title + '\');" title="Click on to deal with">' + value + '</a>';
	}

}
