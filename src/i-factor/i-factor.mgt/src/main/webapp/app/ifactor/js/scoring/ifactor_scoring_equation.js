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
function if_scoring_equation(value, cellmeta, record, rowIndex,columnIndex, store, gridId){
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	return value;
 }

/**
 * add toolbar buttons
 * 
 * @param gridId
 * @param options
 * @param defaultToolbarMenus
 */
function if_scoring_equation_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push('-');
	defaultToolbarMenus.push({
				text : 'Edit scoring equation',
				iconCls : 'edit',
				handler : function() {
					var rs=Ext.getCmp(gridId).getSelectionModel();
					var params = {
						SCORINGPKID : rs.getSelected().get("SCORINGPKID")
					};
					var tv = new initTableView4QueryList(gridId, {
						params : params
					});
					tv.newTableView('if_scoring_equation');
				}
			});
}

/**function examples_t1_normal_edit(id, gridId) {
	var params = {
		PK_ID : id
	};

	var tv = new initTableView4QueryList(gridId, {
				params : params
			});
	tv.newTableView('examples_t1_add');
	/**initTableViewWindow({
								id : 'if_scoring_equation',
								title : 'Edit scoring equation',
								gridId : gridId
							});
}**/