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
function buyer_apply_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	
	if (dataIndex == 'SP') {
		var pkId = record.data['IBA_PK_ID'];
		var actId = record.data['A_ID'];
		var tabId = 'activity_' + record.data['A_ID'];
		var title = ifactorTranslator.getLangLabel('buyer-language', 'buyer_apply') + ' ' + record.data['FIRST_NAME'];
		//btn
		var btnStr = '<table class="x-btn x-btn-text-icon" style="width:55px;" cellSpacing="0">';
		btnStr = btnStr + '<tbody class="x-btn-small x-btn-icon-small-left">';
		btnStr = btnStr + '	<tr>';
		btnStr = btnStr + '		<td class="x-btn-tl">';
		btnStr = btnStr + '			<i></i></td>';
		btnStr = btnStr + '		<td class="x-btn-tc"/>';
		btnStr = btnStr + '		<td class="x-btn-tr">';
		btnStr = btnStr + '			<i></i></td>'
		btnStr = btnStr + '	</tr>';
		btnStr = btnStr + '	<tr>';
		btnStr = btnStr + '		<td class="x-btn-ml">';
		btnStr = btnStr + '			<i></i></td>';
		btnStr = btnStr + '		<td class="x-btn-mc">';
		btnStr = btnStr + '			<em unseletable="on">';
		btnStr = btnStr + '				<button class="x-btn-text" style="padding-left:0px;" type="button" onclick="javascript:todoInstance(\'buyerApplyFlow\', \''
				+ pkId
				+ '\',\''
				+ gridId
				+ '\',\''
				+ actId
				+ '\', \''
				+ tabId
				+ '\', \'' + title + '\');" title="'+ifactorTranslator.getLangLabel('ifcommon-language', 'deal')+'">';
		btnStr = btnStr + ifactorTranslator.getLangLabel('ifcommon-language', 'details');
		btnStr = btnStr + '			</button></em></td>';
		btnStr = btnStr + '		<td class="x-btn-mr">';
		btnStr = btnStr + '			<i></i></td>'
		btnStr = btnStr + '	</tr>';
		btnStr = btnStr + '	<tr>';
		btnStr = btnStr + '		<td class="x-btn-bl">';
		btnStr = btnStr + '			<i></i></td>';
		btnStr = btnStr + '		<td class="x-btn-bc"/>';
		btnStr = btnStr + '		<td class="x-btn-br">';
		btnStr = btnStr + '			<i></i></td>'
		btnStr = btnStr + '	</tr></tbody></table>';
		return btnStr;
	} else if (dataIndex == 'BA_APPLY_DATE') {
		return formatDate(value);
	} else if (dataIndex == 'BA_UPDATED_DATE') {
		return formatDate(value);
	}
	return value;
}

/**
 * render event for buyer confirm list
 * 
 * @param value
 * @param cellmeta
 * @param record
 * @param rowIndex
 * @param columnIndex
 * @param store
 * @param gridId
 */
function buyer_apply_confirm_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	
	if (dataIndex == 'SP') {
		var pkId = record.data['IBA_PK_ID'];
		var actId = record.data['A_ID'];
		var tabId = 'activity_' + record.data['A_ID'];
		var title = ifactorTranslator.getLangLabel('buyer-language', 'buyer_apply') + ' ' + record.data['FIRST_NAME'];
		//btn
		var btnStr = '<table class="x-btn x-btn-text-icon" style="width:55px;" cellSpacing="0">';
		btnStr = btnStr + '<tbody class="x-btn-small x-btn-icon-small-left">';
		btnStr = btnStr + '	<tr>';
		btnStr = btnStr + '		<td class="x-btn-tl">';
		btnStr = btnStr + '			<i></i></td>';
		btnStr = btnStr + '		<td class="x-btn-tc"/>';
		btnStr = btnStr + '		<td class="x-btn-tr">';
		btnStr = btnStr + '			<i></i></td>'
		btnStr = btnStr + '	</tr>';
		btnStr = btnStr + '	<tr>';
		btnStr = btnStr + '		<td class="x-btn-ml">';
		btnStr = btnStr + '			<i></i></td>';
		btnStr = btnStr + '		<td class="x-btn-mc">';
		btnStr = btnStr + '			<em unseletable="on">';
		btnStr = btnStr + '				<button class="x-btn-text" style="padding-left:0px;" type="button" onclick="javascript:todoInstance(\'buyerApplyFlow\', \''
				+ pkId
				+ '\',\''
				+ gridId
				+ '\',\''
				+ actId
				+ '\', \''
				+ tabId
				+ '\', \'' + title + '\');" title="'+ifactorTranslator.getLangLabel('ifcommon-language', 'deal')+'">';
		btnStr = btnStr + ifactorTranslator.getLangLabel('ifcommon-language', 'details');
		btnStr = btnStr + '			</button></em></td>';
		btnStr = btnStr + '		<td class="x-btn-mr">';
		btnStr = btnStr + '			<i></i></td>'
		btnStr = btnStr + '	</tr>';
		btnStr = btnStr + '	<tr>';
		btnStr = btnStr + '		<td class="x-btn-bl">';
		btnStr = btnStr + '			<i></i></td>';
		btnStr = btnStr + '		<td class="x-btn-bc"/>';
		btnStr = btnStr + '		<td class="x-btn-br">';
		btnStr = btnStr + '			<i></i></td>'
		btnStr = btnStr + '	</tr></tbody></table>';
		return btnStr;
	} else if (dataIndex == 'BA_APPLY_DATE') {
		return formatDate(value);
	} else if (dataIndex == 'BA_UPDATED_DATE') {
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
 */
function apply_registration_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push({
		iconCls : 'icon-go',
		text : 'Apply Regist',
		handler : function() {
			var workflowOptions = {
				key : 'buyerApplyFlow',
				tabid : gridId + '_startwork',
				title : 'apply regist form_' + thizDateLabel,
				tabcontainerid : 'consoletabs',
				displayMode : 'tab',
				actionSrc : {
					gridId : gridId,
					type : 'tablequery'
				},
				params : {},
				size : {
					width : 1000,
					height : 500
				}
			};

			startWorkflow(workflowOptions);
		}
	});
}