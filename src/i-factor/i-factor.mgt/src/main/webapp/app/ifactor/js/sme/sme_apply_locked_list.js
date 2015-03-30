function sme_apply_locked_list(value, cellmeta, record, rowIndex, columnIndex, store,
		gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'MYTITLE') {
		var pkId = record.data['PK_ID'];
		var actId = record.data['A_ID'];
		var tabId = 'activity_' + record.data['A_ID'];
		var title = value;

		return '<a href="javascript:void(0);" onclick="javascript:todoSMEApplication(\'smeApplyFlow\', \''
				+ pkId
				+ '\',\''
				+ gridId
				+ '\',\''
				+ actId
				+ '\', \''
				+ tabId
				+ '\', \'' + title + '\');" title="'+ifactorTranslator.getLangLabel('ifcommon-language', 'deal')+'">' + value + '</a>';
	} else if (dataIndex == 'CPCTIME') {
		return formatDate(value);
	}

	return value;
}