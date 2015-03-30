function if_scoring_rating_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	var id = record.data.RATING_ID;
	if (dataIndex == 'SP') {
		return '<a href="javascript:void(0);" onclick="javascript:doEditScoreRate(\''
				+ id
				+ '\',\''
				+ gridId
				+ '\')">'+ifactorTranslator.getLangLabel('ifcommon-language', 'edit')+'</a>&nbsp;&nbsp;'
				+ '<a href="javascript:void(0);" onclick="javascript:doDelScoreRate(\''
				+ id + '\',\'' + gridId + '\')">'+ifactorTranslator.getLangLabel('ifcommon-language', 'delete')+'</a>'
	}

	return value;
}

function doEditScoreRate(id, gridId) {
	var tv = new initTableView4QueryList(gridId, {
				params : {
					RATING_ID : id
				}
			});
	tv.newTableView('if_scoring_rating_add');
}

function doDelScoreRate(id, gridId) {
	deleteTable('IF_MGT_SCORING_RATING', 'single', '-1', function(params) {
				params['RATING_ID'] = id;
				return true;
			}, function() {
				reloadTQList(gridId);
			}, null);
}
