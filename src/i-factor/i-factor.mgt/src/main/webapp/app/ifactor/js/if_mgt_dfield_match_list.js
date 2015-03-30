function if_mgt_dfield_match_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	var id = record.data.IMDM_PK_ID;
	if (dataIndex == 'SP') {
		return '<a href="javascript:void(0);" onclick="javascript:doEditDfieldMatch(\''
				+ id
				+ '\',\''
				+ gridId
				+ '\')">'+ifactorTranslator.getLangLabel('ifcommon-language', 'edit')+'</a>&nbsp;&nbsp;'
				+ '<a href="javascript:void(0);" onclick="javascript:doDelDfieldMatch(\''
				+ id + '\',\'' + gridId + '\')">'+ifactorTranslator.getLangLabel('ifcommon-language', 'delete')+'</a>'
	}

	return value;
}

function doEditDfieldMatch(id, gridId) {
	var tv = new initTableView4QueryList(gridId, {
				params : {
					IMDM_PK_ID : id
				}
			});
	tv.newTableView('if_mgt_dfield_match_add');
}

function doDelDfieldMatch(id, gridId) {
	deleteTable('IF_MGT_DFIELD_MATCH', 'single', '-1', function(params) {
				params['IMDM_PK_ID'] = id;
				return true;
			}, function() {
				reloadTQList(gridId);
			}, null);
}
