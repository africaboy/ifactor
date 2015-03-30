

function invoice_oriver_opinion_query_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	
	var id = record.data.IOVF_PK_ID;
	if (dataIndex == 'A_ETIME') {
		return formatTime(value);
	}else if(dataIndex == 'A_TITLE'){
		var tableView = record.data.TABLEVIEW;
		return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'view_opinion_info1').formatstr(value)+'"><a href="javascript:void(0);" onclick="javascript:viewInvoiceOriverOpinionDetail(\''
		+gridId+'\',\''+value+'\',\''+id+'\',\''+tableView+'\');">' + value + '</a></div>';

	}

	return value;
}

function viewInvoiceOriverOpinionDetail(gridId,title,id,tableView){
	var params = {
		IOVF_PK_ID : id
	};

	initTableViewWindowFrame({
							id : tableView,
							title : ifactorTranslator.getLangLabel('ifcommon-language', 'view_opinion_info2').formatstr(title),
							gridId : gridId,
							params : params,
						    globalReadOnly : true
						});
}