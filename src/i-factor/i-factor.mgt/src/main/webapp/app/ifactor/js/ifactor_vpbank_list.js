function ifactor_vpbank_users_list(value, cellmeta, record, rowIndex,
		columnIndex, store, gridId) {
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);

	var id = record.data.VPB_PK_ID;

	if (dataIndex == 'SP') {
		return [
				APP.$link([ id, 'IF_MGT_VPBANK_USER', gridId, 'VPB_PK_ID' ],
						'edit', ifactorTranslator.getLangLabel('ifcommon-language', 'edit')),
				APP.$link([ id, 'IF_MGT_VPBANK_USER', gridId, 'VPB_PK_ID' ],
						'remove', ifactorTranslator.getLangLabel('ifcommon-language', 'delete')) ].join('&nbsp;&nbsp;');
	}else if(dataIndex == 'UPDATE_TIME'){
		return formatTime(value);
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
function ifactor_vpbank_users_list_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push({
				text :ifactorTranslator.getLangLabel('ifcommon-language', 'import'),
				id : 'ifactor_vpbank_returnMenu',
				iconCls : 'icon-go',
				disabled : false,
				handler : function() {
					showVPBankImportDataWin(gridId);
				}
			});
}

/**
 * show import data window
 * 
 */
function showVPBankImportDataWin(gridid) {
	var form = new Ext.FormPanel({
				frame : true,
				border : false,
				margins : '1 1 1 1',
				labelAlign : 'right',
				labelWidth : 85,
				height : 50,
				fileUpload : true,
				waitMsgTarget : true,
				defaults : {
					width : 350
				},
				defaultType : 'textfield',

				items : [{
							id : 'file1',
							name : 'file1',
							fieldLabel : ifactorTranslator.getLangLabel('seller-language', 'data_file'),
							inputType : 'file',
							xtype : 'textfield',
							allowBlank : false
						}]
			});

	var win = new Ext.Window({
		title : ifactorTranslator.getLangLabel('seller-language', 'vpbank_import'),
		width : 500,
		layout : 'fit',
		items : [form],
		plain : true,
		modal : true,
		buttons : [{
			text :  ifactorTranslator.getLangLabel('seller-language', 'perform_import'),
			handler : function() {
				if (form.getForm().isValid()) {
					var extname = Ext.getCmp("file1").getValue();
					extname = extname.substring(extname.lastIndexOf("."));
					if(extname!=".xls"){
						alert(ifactorTranslator.getLangLabel('seller-language', 'file_version'));
					}else{
						Ext.MessageBox.wait(ifactorTranslator.getLangLabel('seller-language', 'data_imported'));

						form.getForm().submit({
							url : context
									+ "/views/vpbank/importData",
							method : 'POST',
							success : function(response, options) {
								if(options.result.success){
									Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('seller-language', 'import_successful')); //
									win.close();
									win = null;
									reloadTQList(gridid);
								}else{
									Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('seller-language', 'import_failure')); //
									win.close();
									win = null;
								}
							},
							failure : function(response, options) {
								Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('seller-language', 'import_failure')); //
								win.close();
								win = null;
							}
						});
					}
				}
			}
		}]
	});

	win.show(this);

}