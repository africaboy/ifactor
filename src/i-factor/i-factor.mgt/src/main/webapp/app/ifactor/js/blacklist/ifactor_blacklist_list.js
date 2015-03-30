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
function ifactor_blacklist(value, cellmeta, record, rowIndex,columnIndex, store, gridId){
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if (dataIndex == 'BLSTATUS') {
		if(value=='-1'){
			value = ifactorTranslator.getLangLabel('ifcommon-language', 'invalid');
		}else{
			value = ifactorTranslator.getLangLabel('ifcommon-language', 'valid');
		}
	}
	return value;
 }
/**
function ifactor_blacklist(value, cellmeta, record, rowIndex,columnIndex, store, gridId){
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	var value1 = '';
	if (dataIndex == 'BLSTATUS') {
		var pkId = record.data['PKID'];
		if(value=='-1'){
			value1 = 0;
			value = '不校验';
		}else{
			value1 = -1;
			value = '需校验';
		}
		return '<a href="javascript:void(0);" onclick="javascript:updatestatus(\''
				+ pkId
				+ '\',\''
				+ gridId
				+ '\',\''
				+ value1
				+ '\');" title="点击更改信息">' + value + '</a>';

	}
	return value;
 }

function updatestatus(pkid,gridid,value){
	var form = new Ext.FormPanel({
				id : 'uform',
				renderTo : Ext.getBody(),
				hidden : true,
				items : [{
					layout : 'form',
					items : [{
								xtype : "textfield",
								name : 'pkid',
								value : pkid
							}]
				}, {
					layout : "form",
					items : [{
								xtype : "textfield",
								name : 'blstatus',
								value : value
							}]
				}]

			});
			
	form.getForm().submit({
							url : context
									+ "/views/blacklist/updateBL",
							method : 'POST',
							success : function(response, options) {
								reloadTQList(gridid);
								var o = Ext.util.JSON
										.decode(response.responseText);
								Ext.Msg.alert('tip info', 'update blsStatus successful!'); //
							},
							failure : function(response, options) {
								Ext.Msg.alert('tip info', 'update blsStatus failure!'); //
							}
						});
	Ext.fly("uform").remove();
}**/
/**
 * add toolbar buttons
 * 
 * @param gridId
 * @param options
 * @param defaultToolbarMenus
 */
function ifactor_blacklist_remix(gridId, options, defaultToolbarMenus) {
	defaultToolbarMenus.push({
				text : ifactorTranslator.getLangLabel('ifcommon-language', 'import'),
				id : 'ifactor_blacklist_returnMenu',
				iconCls : 'icon-go',
				disabled : false,
				handler : function() {
					showImportDataWin(gridId);
				}
			});
}

/**
 * show import data window
 * 
 */
function showImportDataWin(gridid) {
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
							fieldLabel :ifactorTranslator.getLangLabel('seller-language', 'data_file'),
							inputType : 'file',
							xtype : 'textfield',
							allowBlank : false
						}]
			});

	var win = new Ext.Window({
		title : ifactorTranslator.getLangLabel('seller-language', 'blacklist_import'),
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
									+ "/views/blacklist/importData",
							method : 'POST',
							success : function(response, options) {
								if(options.result){
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