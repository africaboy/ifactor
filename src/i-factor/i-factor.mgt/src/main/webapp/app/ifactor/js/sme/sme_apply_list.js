function sme_apply_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push({
				iconCls : 'icon-go',
				text : 'Apply Regist',
				handler : function() {
					var workflowOptions = {
						key : 'smeApplyFlow',
						tabid : gridId + '_startwork',
						title : 'apply regist form',
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

function sme_apply_list(value, cellmeta, record, rowIndex, columnIndex, store,
		gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'SP') {
		var pkId = record.data['PK_ID'];
		var actId = record.data['A_ID'];
		var tabId = 'activity_' + record.data['A_ID'];
		var title = record.data['MYFNAME'];

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
		btnStr = btnStr + '				<button class="x-btn-text" style="padding-left:0px;" type="button" onclick="javascript:todoSMEApplication(\'smeApplyFlow\', \''
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
	} else if (dataIndex == 'CPCTIME') {
		return formatDate(value);
	} else if (dataIndex == 'UPDATEDDATE') {
		return formatDate(value);
	}

	return value;
}

function todoSMEApplication(flowKey, pkid, gridId, actId, tabId, title) {
	var options = {
		actId : actId,
		displayMode : 'tab',
		tabid : tabId,
		tabcontainerid : 'consoletabs',
		title : title,
		labelAlign : 'top',
		size : {
			width : 1000,
			height : 600
		},
		actionSrc : {
			type : 'tablequery',
			gridId : gridId
		}
	}

	options.params = {
		key : flowKey
	}

	doWorkflowFromList(options);
}