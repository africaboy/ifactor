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
/**function buyer_apply_opinion_query_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId, options) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'A_ETIME') {
		return formatTime(value);
	} else if (dataIndex == 'OPINION_TXT') {
		return '<div qtip="' + value + '">' + value + '</div>';
	}

	return value;

}**/

function delivery_apply_opinion_query_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if(rowIndex == 0 && dataIndex == 'OPINION_VAL'){
		mgt.invoiceModifyNum = 0;
	}
	var id = record.data.IIDFO_PK_ID;
	if (dataIndex == 'A_ETIME') {
		return formatTime(value);
	}else if(dataIndex == 'A_TITLE'){
		var tableView = record.data.TABLEVIEW;
		return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'view_opinion_info1').formatstr(value)+'"><a href="javascript:void(0);" onclick="javascript:viewInvoiceOpinionDetail(\''
		+gridId+'\',\''+value+'\',\''+id+'\',\''+tableView+'\');">' + value + '</a></div>';

	}else if(dataIndex == 'OPINION_VAL'){
		if(value == getWBMapValueLocalData('ida_fc_opinion','Modify')){
			mgt.invoiceModifyNum ++;
			return value + mgt.invoiceModifyNum;
		}
	}

	return value;
}

function viewInvoiceOpinionDetail(gridId,title,id,tableView){
	var params = {
		IIDFO_PK_ID : id
	};

	initTableViewWindowFrame({
							id : tableView,
							title : ifactorTranslator.getLangLabel('ifcommon-language', 'view_opinion_info2').formatstr(title),
							gridId : gridId,
							params : params,
						    globalReadOnly : true
						});
}