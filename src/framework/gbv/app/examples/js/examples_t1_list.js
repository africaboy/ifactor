function examples_t1_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	var id = record.data.PK_ID;

	if (dataIndex == 'SP') {
		return '<a href="javascript:void(0);" onclick="javascript:examples_t1_normal_edit(\''
				+ id
				+ '\',\''
				+ gridId
				+ '\');">普通视图编辑</a>'
				+ '<br/><a href="javascript:void(0);" onclick="javascript:examples_t1_special_edit(\''
				+ id
				+ '\',\''
				+ gridId
				+ '\');">特殊视图编辑</a>'
				+ '<br/><a href="javascript:void(0);" onclick="javascript:examples_t1_delete(\''
				+ id + '\',\'' + gridId + '\');">删除</a>';
	}

	return value;
}

function examples_t1_list_remix(gridId, options, menus) {
	menus.push('-');
	menus.push({
				text : '普通视图测试',
				iconCls : 'edit',
				handler : function() {
					initTableViewWindow({
								id : 'examples_t1_add',
								title : '普通控件测试',
								gridId : gridId
							});
				}
			});
	menus.push('-');
	menus.push({
				text : '特殊视图测试',
				iconCls : 'edit',
				handler : function() {
					initTableViewWindow({
								id : 'examples_t1_special_add',
								title : '特殊控件测试',
								gridId : gridId
							});
				}
			});
}

function examples_t1_normal_edit(id, gridId) {
	var params = {
		PK_ID : id
	};

	var tv = new initTableView4QueryList(gridId, {
				params : params
			});
	tv.newTableView('examples_t1_add');
}

function examples_t1_special_edit(id, gridId) {
	var params = {
		PK_ID : id
	};

	var tv = new initTableView4QueryList(gridId, {
				params : params
			});
	tv.newTableView('examples_t1_special_add');
}

function examples_t1_delete(id, gridId) {
	APP.remove(id, 'EXAMPLES_T1', gridId);
}