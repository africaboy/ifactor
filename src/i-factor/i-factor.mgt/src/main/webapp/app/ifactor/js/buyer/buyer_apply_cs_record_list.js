/**
 * render event for list
 * 
 * @param value
 * @param cellmeta
 * @param record
 * @param rowIndex
 * @param columnIndex
 * @param store
 * @param gridId
 */
function buyer_apply_cs_record_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if (dataIndex == 'REMARK') {
		return '<div qtip="' + value + '">' + value + '</div>';
	} else if (dataIndex == 'CREATE_DATE') {
		return formatTime(value);
	}

	return value;
}
