function ifactor_param_setting_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {

	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	var id = record.data.IPS_PK_ID;

	if (dataIndex == 'PARAM_CODE') {
		return '<a href="javascript:void(0);" onclick="javascript:doParamSettingEdit(\''
				+ id + '\',\'' + gridId + '\');">' + value + '</a>';
	} else if (dataIndex == 'LAST_MODIFY_TIME') {
		return formatTime(value);
	}

	return value;

}

/**
 * 编辑ifactor平台参数设置
 * 
 * @param id
 * @param gridId
 * @returns
 */
function doParamSettingEdit(id, gridId) {

	var tv = new initTableView4QueryList(gridId, {
				params : {
					IPS_PK_ID : id
				}
			});
	tv.newTableView('ifactor_param_setting_edit');

}

/**
 * 列表添加按钮
 * 
 * @param gridId
 * @param options
 * @param defaultToolbarMenus
 * @returns
 */
function ifactor_param_setting_list_remix(gridId, options, defaultToolbarMenus) {

	defaultToolbarMenus.push({
		text : 'Add Param',
		iconCls : 'add',
		handler : function() {
			Ext.Ajax.request({
						url : context + '/views/ips/add',
						method : 'post',
						params : {},
						success : function(response, options) {
							Ext.MessageBox.hide();
							var json = response.responseText;
							var o = Ext.util.JSON.decode(json);
							if (o.success) {
								Ext.getCmp(gridId).getStore().reload();
								// Call the edit page
								doParamSettingEdit(o.ipsPkId, gridId);
							} else {
								Ext.MessageBox.show({
											title : 'hint',
											msg : 'initialize param code is fail!',
											icon : Ext.MessageBox.ERROR
										});
							}
						}
					});
		}
	});

}
