function ifactor_invoice_delivery_auction_list(value, cellmeta, record,
		rowIndex, columnIndex, store, gridId) {

	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	var iidaPkId = record.data.IIDA_PK_ID;

	var iidatPkId = record.data.IIDAT_PK_ID;

	var appPkId = record.data.APP_PK_ID;

	if (dataIndex == 'INVOICE_ID') {
		return '<a href="javascript:void(0);" onclick="javascript:handleInvoiceAuction(\''
				+ iidatPkId
				+ '\',\''
				+ iidaPkId
				+ '\',\''
				+ appPkId
				+ '\',\''
				+ gridId
				+ '\');">'
				+ value + '</a>';
	} else if (dataIndex == 'ACCEPT_TIME') {
		return formatTime(value);
	} else if (dataIndex == 'IDA_CODE') {
		return '<a  href="javascript:void(0);" onclick="javascript:viewInvoiceInfo(\''
				+ iidaPkId + '\',\'' + gridId + '\');">' + value + '</a>';
	}

	return value;

}

/**
 * 处理invoice auction
 * 
 * @param id
 * @param gridId
 * @returns
 */
function handleInvoiceAuction(iidatPkId, iidaPkId, appPkId, gridId) {
	Ext.Ajax.request({
				url : context + '/views/auction/canlock',
				params : {
					iidatPkId : iidatPkId
				},
				success : function(response, options) {
					Ext.MessageBox.hide();
					var json = response.responseText;
					var o = Ext.util.JSON.decode(json);
					if (o.success) {

						var myButtons = [{
									text : ifactorTranslator.getLangLabel('invoice-language', 'ready_to_sell'),
									handler : function() {
										doSetAuctionStatus(iidatPkId,appPkId,
												"1");
									}
								}, {
									text : ifactorTranslator.getLangLabel('invoice-language', 'place_bid'),
									handler : function() {
										doSetAuctionStatus(iidatPkId,appPkId,
												"2");
									}
								}, {
									text : ifactorTranslator.getLangLabel('invoice-language', 'open_investor'),
									handler : function() {
										doSetAuctionStatus(iidatPkId,appPkId,
												"3");
									}
								}, {
									text : ifactorTranslator.getLangLabel('invoice-language', 'keep_vpbank'),
									handler : function() {
										doSetAuctionStatus(iidatPkId,appPkId,
												"4");
									}
								}];

						initTableViewWindowFrame({
									id : 'ifactor_invoice_auction_view',
									globalReadOnly : true,
									params : {
										IIDA_PK_ID : iidaPkId
									},
									modal : true
								}, myButtons);

					} else {
						Ext.MessageBox.show({
									title : ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),
									msg : o.message,
									icon : Ext.MessageBox.WARN
								});
					}
				}
			});
}

function doSetAuctionStatus(iidatPkId, appPkId, flag) {
	Ext.Ajax.request({
				url : context + '/views/auction/decideStatus',
				params : {
					iidatPkId : iidatPkId,
					appPkId : appPkId,
					handleFlag : flag
				},
				success : function(response, options) {
					var json = response.responseText;
					var o = Ext.util.JSON.decode(json);
					if (o.success) {
						Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),
								ifactorTranslator.getLangLabel('invoice-language', 'setauction_status'));
					}
				}
			});

}

function viewInvoiceInfo(iidaPkId, gridId) {
	alert('aa');
}
