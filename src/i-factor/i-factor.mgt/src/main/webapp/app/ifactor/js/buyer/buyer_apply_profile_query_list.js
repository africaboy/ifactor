
function buyer_apply_profile_query_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	var id = record.data.PK_ID;
	var invest = record.data.ISINVEST;
	if (dataIndex == 'RELEASETIME') {
		return formatTime(value);
	}else if(dataIndex == 'CINUMBER'){
		return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('buyer-language', 'view_profile_info1').formatstr(value)+'"><a href="javascript:void(0);" onclick="javascript:viewBuyerProfileDetail(\''
		+gridId+'\',\''+value+'\',\''+id+'\',\''+invest+'\');">' + value + '</a></div>';

	}
	return value;
}

function viewBuyerProfileDetail(gridId,title,id,invest){
	var params = {
		PK_ID : id
	};
	var view = "";
	if(invest == "0"){
		view = "ifactor_buyer_profile";
	}else{
		view = "ifactor_buyer_cpprofile";
	}

	initTableViewWindowFrame({
							id : view,
							title : ifactorTranslator.getLangLabel('buyer-language', 'view_profile_info2').formatstr(title),
							gridId : gridId,
							params : params,
						    globalReadOnly : true
						});
}
