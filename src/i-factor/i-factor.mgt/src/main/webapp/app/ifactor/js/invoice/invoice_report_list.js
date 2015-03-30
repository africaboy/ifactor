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
function invoice_report_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if (dataIndex == 'REPORTDATE') {
		return formatDate(value);
	}
	return value;
}


/**
 * add toolbar buttons
 * 
 * @param gridId
 * @param options
 * @param defaultToolbarMenus

function invoice_report_list_remix(gridId, options,
		defaultToolbarMenus) {
	defaultToolbarMenus.push({
		iconCls : 'icon-go',
		text : 'Export excel',
		handler : function() {
			
		}
	});
} */