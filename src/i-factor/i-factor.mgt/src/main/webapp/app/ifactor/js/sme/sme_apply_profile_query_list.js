
function sme_apply_profile_query_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	var id = record.data.PRO_PK_ID;
	if (dataIndex == 'CREATETIME') {
		return formatTime(value);
	}else if(dataIndex == 'CINUMBER'){
		return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('seller-language', 'view_profile_info1').formatstr(value)+'"><a href="javascript:void(0);" onclick="javascript:viewSmeProfileDetail(\''
		+gridId+'\',\''+value+'\',\''+id+'\');">' + value + '</a></div>';

	}
	return value;
}

function viewSmeProfileDetail(gridId,title,id){
	var params = {
		PRO_PK_ID : id
	};

	initTableViewWindowFrame({
							id : 'if_cp_profile',
							title : ifactorTranslator.getLangLabel('seller-language', 'view_profile_info2').formatstr(title),
							gridId : gridId,
							params : params,
							labelAlign : 'top',
						    globalReadOnly : true
						});
}
