function ifactor_image_items_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	var id = record.data.IMAG_ID;

	if (dataIndex == 'SP') {
		return [
				APP.$link([ id, 'IF_MGT_IMAGE_ITEMS', gridId, 'IMAG_ID' ],
						'edit', ifactorTranslator.getLangLabel('ifcommon-language', 'edit')),
				APP.$link([ id, 'IF_MGT_IMAGE_ITEMS', gridId, 'IMAG_ID' ],
						'remove', ifactorTranslator.getLangLabel('ifcommon-language', 'delete')) ].join('&nbsp;&nbsp;');
	}

	return value;
}
