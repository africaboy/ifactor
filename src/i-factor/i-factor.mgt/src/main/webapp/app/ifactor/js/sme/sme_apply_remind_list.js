
function sme_apply_remind_list(value, cellmeta, record, rowIndex, columnIndex, store,
		gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'SA_APPLY_CODE') {
		var pkId = record.data['PK_ID'];
		return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('seller-language', 'view_detail_info1')+'"><a href="javascript:void(0);" onclick="javascript:viewSmeApplyDetail(\''
		+gridId+'\',\''+pkId+'\');">' + value + '</a></div>';
	} else if (dataIndex == 'CPDATE') {
		return formatDate(value);
	} else if (dataIndex == 'CPCTIME') {
		return formatDate(value);
	} else if (dataIndex == 'REMIND'){
		if(value == ''){
			value = ifactorTranslator.getLangLabel('seller-language', 'not_call');
		}
		var pkId = record.data['PK_ID'];
		var str = '<a href="javascript:void(0);" onclick="javascript:updateRemindStatus(\''+gridId+'\',\''+pkId+'\');">' + value + '</a>';
		return str; 
	}

	return value;
}

function viewSmeApplyDetail(gridId,id){
	var params = {
		PK_ID : id
	};

	initTableViewWindowFrame({
							id : 'if_cp_apply_add',
							title : ifactorTranslator.getLangLabel('seller-language', 'view_detail_info2'),
							gridId : gridId,
							labelAlign : 'top',
							params : params,
						    globalReadOnly : true
						});
}

function updateRemindStatus(gridid,id){
	Ext.Ajax.request({
		url : context + '/views/csMonitorRecord/updateRemindStatus',
		method : 'POST',
		params : {
			pkId : id
		},
		success : function(response, options) {
			var resultInfo = Ext.util.JSON.decode(response.responseText);
			if(!resultInfo.success){
				Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('seller-language', 'program_abnormal'));
			}else{
				Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('seller-language', 'update_remind')); 
				reloadTQList(gridid);
			}
		},
		failure : function(response, options) {
			Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('seller-language', 'program_abnormal'));
		}
	});
}