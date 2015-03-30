
function sme_apply_opinion_query_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if(rowIndex == 0 && dataIndex == 'OPINION_VAL'){
		mgt.sellerModifyNum = 0;
	}
	var id = record.data.PK_ID;
	if (dataIndex == 'A_ETIME') {
		return formatTime(value);
	}else if(dataIndex == 'A_TITLE'){
		var tableView = record.data.TABLEVIEW;
		return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'view_opinion_info1').formatstr(value)+'"><a href="javascript:void(0);" onclick="javascript:viewSmeOpinionDetail(\''
		+gridId+'\',\''+value+'\',\''+id+'\',\''+tableView+'\');">' + value + '</a></div>';

	}else if(dataIndex == 'OPINION_VAL'){
		if(value == getWBMapValueLocalData('smecheck_opinion','Modify')){
			mgt.sellerModifyNum ++;
			return value + mgt.sellerModifyNum;
		}
	}

	return value;
}

function viewSmeOpinionDetail(gridId,title,id,tableView){
	var params = {
		PK_ID : id
	};

	initTableViewWindowFrame({
							id : tableView,
							title : ifactorTranslator.getLangLabel('ifcommon-language', 'view_opinion_info2').formatstr(title),
							gridId : gridId,
							params : params,
						    globalReadOnly : true
						});
}