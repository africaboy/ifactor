// for tablequery 'abandoneworkflowlist'
function abandoneworkflowlist(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'INS_START') {
		return formatTime(value);
	} else if (dataIndex == 'SP') {
		return '<a href="javascript:restartWorkflowInstance(\''
				+ record.data.INS_START
				+ '\',\''
				+ record.data.INS_ID
				+ '\', \''
				+ record.data.A_ID
				+ '\', \''
				+ gridId
				+ '\');">重启</a>&nbsp;<a href="javascript:deleteWorkflowInstance(\''
				+ record.data.INS_ID + '\', \'' + gridId + '\');">删除</a>'
	}

	return value;
}

// for tablequery 'allinstancelist' 实例管理
function allinstancelist(value, cellmeta, record, rowIndex, columnIndex, store,
		gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'ZHUJIAN') {
		return '<a href="javascript:workflowMonitor(\'' + record.data.CG_NAME
				+ '(' + formatTime(record.data.INS_START) + ')\', \''
				+ record.data['INS_ID'] + '\');">' + record.data.INS_ID
				+ '</a>';
	} else if (dataIndex == 'INS_START') {
		return formatTime(value);
	} else if (dataIndex == 'SP') {
		return '<a href="javascript:deleteWorkflowInstance(\''
				+ record.data.INS_ID + '\', \'' + gridId + '\');">删除</a>'
	}

	return value;
}