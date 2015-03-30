function if_scoring_items_list(value, cellmeta, record, rowIndex, columnIndex,
		store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	var id = record.data.ITEM_ID;
	if (dataIndex == 'SP') {
		return '<a href="javascript:void(0);" onclick="javascript:doEditScoreItem(\''
				+ id
				+ '\',\''
				+ gridId
				+ '\')">'+ifactorTranslator.getLangLabel('ifcommon-language', 'edit')+'</a>&nbsp;&nbsp;'
				+ '<a href="javascript:void(0);" onclick="javascript:doDelScoreItem(\''
				+ id + '\',\'' + gridId + '\')">'+ifactorTranslator.getLangLabel('ifcommon-language', 'delete')+'</a>'
	}

	return value;
}

function doEditScoreItem(id, gridId) {
	var tv = new initTableView4QueryList(gridId, {
				params : {
					ITEM_ID : id
				}
			});
	tv.newTableView('if_scoring_items_edit');
}

function doDelScoreItem(id, gridId) {
	deleteTable('IF_MGT_SCORING_ITEMS', 'single', '-1', function(params) {
				params['ITEM_ID'] = id;
				return true;
			}, function() {
				reloadTQList(gridId);
			}, null);
}

function if_scoring_items_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push('-');
	defaultToolbarMenus.push({
				text : ifactorTranslator.getLangLabel('seller-language', 'score_item'),
				iconCls : 'add',
				handler : function() {

					var tv = new initTableView4QueryList(gridId, {
								params : {}
							});
					tv.newTableView('if_scoring_items_add');
				}

			});
}

function itemCodeSelect(node, formId, options) {
	var form = Ext.getCmp(formId).getForm();
	var fparentNode = node.parentNode;
	var sparentNode = fparentNode.parentNode;

	if (sparentNode) {
		form.findField('CP_TYPE').setValue(sparentNode.attributes.key);
		form.findField('CP_TYPE_VAL').setValue(sparentNode.attributes.text);
	}

	if (fparentNode) {
		form.findField('CATALOG_ID').setValue(fparentNode.attributes.key);
		form.findField('CATALOG_NAME').setValue(fparentNode.attributes.text);
	}

	if (node) {
		form.findField('ITEM_CODE').setValue(node.attributes.key);
	}

	form.load({
				url : context + "/views/score/loadItem",
				params : {
					itemCode : node.attributes.key,
					cpTypeVal : sparentNode.attributes.text
				},
				waitTitle :ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),
				waitMsg :ifactorTranslator.getLangLabel('ifcommon-language', 'data_loadmasktext'),
				animEl : "loding",
				success : function(form, action) {
					var resultInfo = listSimpleJson(action.result.data);
					if (resultInfo.size() > 0) {
						Ext.getCmp(formId + '_ITEM_TYPE_').setValue(resultInfo
								.get('ITEM_TYPE_VAL'));
					} else {
						Ext.getCmp(formId + '_ITEM_TYPE_').setValue('');
						form.findField('ITEM_TYPE').setValue('');
						form.findField('ITEM_FUNC').setValue('');
						form.findField('ITEM_TYPE_VAL').setValue('');
						form.findField('ITEM_VALUE').setValue('');
						form.findField('FIELD_NAME').setValue('');
						form.findField('CODE_NAME').setValue('');
					}
				},
				failure : function(form, action) {
					Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('seller-language', 'get_score_item'));
				}
			});

}