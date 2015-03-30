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

function buyer_apply_opinion_query_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if(rowIndex == 0 && dataIndex == 'OPINION_VAL'){
		mgt.buyerModifyNum = 0;
	}
	var id = record.data.IBFO_PK_ID;
	if (dataIndex == 'A_ETIME') {
		return formatTime(value);
	}else if(dataIndex == 'A_TITLE'){
		var tableView = record.data.TABLEVIEW;
		return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'view_opinion_info1').formatstr(value)+'"><a href="javascript:void(0);" onclick="javascript:viewBuyerOpinionDetail(\''
		+gridId+'\',\''+value+'\',\''+id+'\',\''+tableView+'\');">' + value + '</a></div>';

	}else if(dataIndex == 'OPINION_VAL'){
		if(value == getWBMapValueLocalData('fc_opinion','Modify')){
			mgt.buyerModifyNum ++;
			return value + mgt.buyerModifyNum;
		}
	}

	return value;
}

function viewBuyerOpinionDetail(gridId,title,id,tableView){
	var params = {
		IBFO_PK_ID : id
	};

	initTableViewWindowFrame({
							id : tableView,
							title : ifactorTranslator.getLangLabel('ifcommon-language', 'view_opinion_info2').formatstr(title),
							gridId : gridId,
							params : params,
						    globalReadOnly : true
						});
}