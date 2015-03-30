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
function invoice_delivery_apply_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {

	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'SP') {
		var pkId = record.data['IIDA_PK_ID'];
		var actId = record.data['A_ID'];
		var tabId = 'activity_' + record.data['A_ID'];
		var title = ifactorTranslator.getLangLabel('invoice-language', 'invoice_apply') + ' (' + record.data['COMPANY_NAME'] + ')';
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
		btnStr = btnStr + '				<button class="x-btn-text" style="padding-left:0px;" type="button" onclick="javascript:todoInstance(\'invoiceDeliveryFlow\', \''
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
	} else if (dataIndex == 'IDA_DATE') {
		return formatDate(value);
	} else if (dataIndex == 'IDA_UPDATED_DATE') {
		return formatDate(value);
	}else if (dataIndex == 'INVOICE_AMOUNT') {
		var val = methods.RMBMoney(value);
		//val = val.substring(1);
		return val;
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
function invoice_delivery_registration_list_remix(gridId, options,
		defaultToolbarMenus) {
	defaultToolbarMenus.push({
		iconCls : 'icon-go',
		text : 'Apply Regist',
		handler : function() {
			var workflowOptions = {
				key : 'invoiceDeliveryFlow',
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