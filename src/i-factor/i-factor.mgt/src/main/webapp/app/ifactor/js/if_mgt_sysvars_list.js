function if_mgt_sysvars_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	var id = record.data.SYSVARS_PK_ID;

	if (dataIndex == 'SP') {
		return [
				APP.$link([ id, 'IF_MGT_SYSVARS', gridId, 'SYSVARS_PK_ID' ],
						'edit', ifactorTranslator.getLangLabel('ifcommon-language', 'edit'))].join('&nbsp;&nbsp;');
	}
	return value;
}