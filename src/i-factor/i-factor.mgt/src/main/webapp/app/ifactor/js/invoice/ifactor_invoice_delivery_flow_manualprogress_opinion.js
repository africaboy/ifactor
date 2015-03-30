/**
 * 意见选择事件
 */

function idaMpOpinionSelect(id, name, record, formId, options) {

	var opinionId = formId + '_REJECT_RESON_';

	if (record.data[id] == 'Confirmed') {

		methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(opinionId), false, true);

	} else if (record.data[id] == 'Reject') {

		methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(opinionId), true, false);

	}
}