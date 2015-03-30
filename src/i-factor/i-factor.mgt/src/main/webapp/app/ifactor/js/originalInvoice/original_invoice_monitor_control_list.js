/**
 * render column value
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @param {}
 *            gridId
 * @return {}
 */
function original_invoice_flow_monitor(value, cellmeta, record,
		rowIndex, columnIndex, store, gridId, options) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'INS_CURRENTSTATUS') {
		if (record.data.INS_STATE == '-1')
			return ifactorTranslator.getLangLabel('ifcommon-language', 'canceldeal');
		else
			return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process')+'"><a href="javascript:void(0);" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process')+'" onclick="javascript:workflowMonitor(\''+ifactorTranslator.getLangLabel('invoice-language', 'oriverinvoice_apply')+'('
					+ record.data['COMPANY_NAME']
					+ ') '+ifactorTranslator.getLangLabel('ifcommon-language', 'graphics_monitor')+'\', \''
					+ record.data['INS_ID'] + '\');">' + value + '</a></div>';

	} else if (dataIndex == 'INS_UPDATE') {
		if (record.data['INS_ID'] != '0') {
			return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_detail')+'"><a href="javascript:void(0);" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_detail')+'" onclick="javascript:workflowTrace(\''+ifactorTranslator.getLangLabel('invoice-language', 'oriverinvoice_apply')+'('
					+ record.data['COMPANY_NAME']
					+ ') '+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process_list')+'\', \''
					+ record.data['INS_ID']
					+ '\', \''
					+ options.tabcontainerid
					+ '\');">' +formatTime(value) + '</a></div>';
		}

		return value;
	} else if (dataIndex == 'IOV_DATE') {
		if (value != null)
			return formatTime(value);
	}else if(dataIndex == 'INS_YESORNO'){
		if(value!=null&&value!=''){
			if(value=="yes"){
				value = ifactorTranslator.getLangLabel('ifcommon-language', 'accepted');
			}else{
				value = ifactorTranslator.getLangLabel('ifcommon-language', 'rejected');
			}
		}
	}else if (dataIndex == 'INVOICE_AMOUNT') {
		return methods.RMBMoney(value);
	}


	return value;

}

/**
 * render column value
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @param {}
 *            gridId
 * @return {}
 */
function original_invoice_flow_monitor1(value, cellmeta, record,
		rowIndex, columnIndex, store, gridId, options) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'INS_CURRENTSTATUS') {
		if (record.data.INS_STATE == '-1')
			return ifactorTranslator.getLangLabel('ifcommon-language', 'canceldeal');
		else
			return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process')+'"><a href="javascript:void(0);" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process')+'" onclick="javascript:workflowMonitor(\''+ifactorTranslator.getLangLabel('invoice-language', 'oriverinvoice_apply')+'('
					+ record.data['COMPANY_NAME']
					+ ') '+ifactorTranslator.getLangLabel('ifcommon-language', 'graphics_monitor')+'\', \''
					+ record.data['INS_ID'] + '\');">' + value + '</a></div>';

	} else if (dataIndex == 'INS_UPDATE') {
		if (record.data['INS_ID'] != '0') {
			return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_detail')+'"><a href="javascript:void(0);" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_detail')+'" onclick="javascript:workflowTrace(\''+ifactorTranslator.getLangLabel('invoice-language', 'oriverinvoice_apply')+'('
					+ record.data['COMPANY_NAME']
					+ ') '+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process_list')+'\', \''
					+ record.data['INS_ID']
					+ '\', \''
					+ options.tabcontainerid
					+ '\');">' +formatTime(value) + '</a></div>';
		}

		return value;
	} else if (dataIndex == 'IOV_DATE') {
		if (value != null)
			return formatTime(value);
	}else if(dataIndex == 'INS_YESORNO'){
		if(value!=null&&value!=''){
			if(value=="yes"){
				value = ifactorTranslator.getLangLabel('ifcommon-language', 'accepted');
			}else{
				value = ifactorTranslator.getLangLabel('ifcommon-language', 'rejected');
			}
		}
	}else if (dataIndex == 'INVOICE_AMOUNT') {
		return methods.RMBMoney(value);
	}


	return value;

}

function original_invoice_flow_monitor2(value, cellmeta, record,
		rowIndex, columnIndex, store, gridId, options) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	if (dataIndex == 'INS_CURRENTSTATUS') {
		if (record.data.INS_STATE == '-1')
			return ifactorTranslator.getLangLabel('ifcommon-language', 'canceldeal');
		else
			return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process')+'"><a href="javascript:void(0);" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process')+'" onclick="javascript:workflowMonitor(\''+ifactorTranslator.getLangLabel('invoice-language', 'oriverinvoice_apply')+'('
					+ record.data['COMPANY_NAME']
					+ ') '+ifactorTranslator.getLangLabel('ifcommon-language', 'graphics_monitor')+'\', \''
					+ record.data['INS_ID'] + '\');">' + value + '</a></div>';

	} else if (dataIndex == 'INS_UPDATE') {
		if (record.data['INS_ID'] != '0') {
			return '<div ext:qtitle="" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_detail')+'"><a href="javascript:void(0);" ext:qtip="'+ifactorTranslator.getLangLabel('ifcommon-language', 'see_detail')+'" onclick="javascript:workflowTrace(\''+ifactorTranslator.getLangLabel('invoice-language', 'oriverinvoice_apply')+'('
					+ record.data['COMPANY_NAME']
					+ ') '+ifactorTranslator.getLangLabel('ifcommon-language', 'see_process_list')+'\', \''
					+ record.data['INS_ID']
					+ '\', \''
					+ options.tabcontainerid
					+ '\');">' +formatTime(value) + '</a></div>';
		}

		return value;
	} else if (dataIndex == 'IOV_DATE') {
		if (value != null)
			return formatTime(value);
	}else if(dataIndex == 'INS_YESORNO'){
		if(value!=null&&value!=''){
			if(value=="yes"){
				value = ifactorTranslator.getLangLabel('ifcommon-language', 'accepted');
			}else{
				value = ifactorTranslator.getLangLabel('ifcommon-language', 'rejected');
			}
		}
	}else if (dataIndex == 'INVOICE_AMOUNT') {
		return methods.RMBMoney(value);
	}


	return value;

}