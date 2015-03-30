/**
 * 影像上传信息列表
 * 
 * @param {}
 *            options
 */
function showImageUploadItemList(options) {
	var searchPanel = initImageUploadItemSearchPanel();

	var imageUploadItemList = initImageUploadItemList(options);

	var showWin = new Ext.Window({
				layout : 'border',
				width : 800,
				height : 600,
				items : [{
							region : 'north',
							height : 60,
							bodyStyle : 'padding:10px',
							items : [searchPanel]
						}, imageUploadItemList],
				modal : true,
				buttons : [{
							text : ifactorTranslator.getLangLabel('ifcommon-language', 'close'),
							handler : function() {
								showWin.close();
								showWin = null;
							}
						}]
			});

	showWin.show();
	imageUploadItemList.getStore().load({
				params : {
					loanId : options.params.loanId,
					itemCode : options.params.itemCode
				}
			});
}
var imageUploadItemQueryParams = {};
function initImageUploadItemSearchPanel() {

	var form = new Ext.form.FormPanel({
		border : false,
		frame : false,
		layout : 'column',
		items : [{
					columnWidth : .4,
					layout : 'form',
					border : false,
					frame : false,
					items : [{
								name : 'queryItemCode',
								xtype : 'textfield',
								fieldLabel : ifactorTranslator.getLangLabel('image-language', 'image_number')
							}]
				}, {
					columnWidth : .4,
					layout : 'form',
					border : false,
					frame : false,
					items : [{
								name : 'queryItemName',
								xtype : 'textfield',
								fieldLabel : ifactorTranslator.getLangLabel('image-language', 'image_name')
							}]
				}, {
					columnWidth : .1,
					border : false,
					frame : false,
					items : [{
						xtype : 'button',
						text : ifactorTranslator.getLangLabel('image-language', 'querybtn_text'),
						handler : function() {

							imageUploadItemQueryParams.queryItemCode = form
									.getForm().findField('queryItemCode')
									.getValue();
							imageUploadItemQueryParams.itemName = form
									.getForm().findField('queryItemName')
									.getValue();

							Ext.getCmp('imageUploadItemListGrid').getStore()
									.reload({
												params : imageUploadItemQueryParams
											});

						}
					}]
				}, {
					columnWidth : .1,
					border : false,
					frame : false,
					items : [{
								xtype : 'button',
								text : ifactorTranslator.getLangLabel('image-language', 'resetbtn_text'),
								handler : function() {
									form.getForm().reset();
								}
							}]
				}]
	});

	return form;

}
/**
 * 初始化影像上传项列表
 */
function initImageUploadItemList(optionParams) {

	var cm = new Ext.grid.ColumnModel([{
				header : ifactorTranslator.getLangLabel('image-language', 'serial_number'),
				dataIndex : 'PAGINATION_NUMBER',
				width : 50
			}, {
				header : ifactorTranslator.getLangLabel('image-language', 'image_name'),
				dataIndex : 'ITEM_NAME',
				width : 150
			}, {
				header : ifactorTranslator.getLangLabel('image-language', 'image_code'),
				dataIndex : 'ITEM_CODE',
				width : 100
			}, {
				header : ifactorTranslator.getLangLabel('image-language', 'last_upload_time'),
				dataIndex : 'UPLOAD_TIME',
				width : 150,
				renderer : formatTime
			}, {
				header : ifactorTranslator.getLangLabel('image-language', 'uploaded_file_number'),
				dataIndex : 'IMAGE_NUM',
				width : 120
			}, {
				header : ifactorTranslator.getLangLabel('image-language', 'handle'),
				dataIndex : 'SP',
				renderer : function(v, c, r, row, col, s) {
					return '<a href="javascript:void(0); " onclick="showSCImageWin(\''
							+ optionParams.params.loanId
							+ '\',\''
							+ r.data["ITEM_CODE"] 
							+ '\',\''
							+ optionParams.params.flowType + '\')">'+ifactorTranslator.getLangLabel('image-language', 'upload')+'</a>';
				}
			}]);

	var conn = new Ext.data.Connection({
				url : context + '/views/image/imageuploaditemlist',
				timeout : 600000, // 自定义是600秒 (默认30s)
				autoAbort : false,
				disableCaching : true,
				method : "POST"
			});

	var proxy = new Ext.data.HttpProxy(conn);

	var ds = new Ext.data.JsonStore({
				remoteSort : false,
				root : 'imageUploadItemList',
				totalProperty : 'totalCount',
				fields : ['ITEM_NAME', 'IS_MUST_NEED_NAME', 'ITEM_CODE',
						'UPLOAD_TIME', 'IMAGE_NUM', 'IMAGE_UPLOAD_ID',
						'PAGINATION_NUMBER'],
				proxy : proxy
			});

	var grid = new Ext.grid.GridPanel({
				region : 'center',
				id : 'imageUploadItemListGrid',
				cm : cm,
				ds : ds,
				autoScroll : true,
				stripeRows : true,
				border : false,
				frame : false,
				loadMask : {
					msg : ifactorTranslator.getLangLabel('ifcommon-language', 'data_loadmasktext')
				},
				viewConfig : {
					forceFit : true
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 20,// 每页显示的记录值
							store : ds,
							displayInfo : true,
							displayMsg : ifactorTranslator.getLangLabel('ifcommon-language', 'bbar_displaymsg'),
							emptyMsg : ifactorTranslator.getLangLabel('ifcommon-language', 'bbar_emptymsg')
						})
			});
	ds.on('beforeload', function(thiz, options) {
				imageUploadItemQueryParams.loanId = optionParams.params.loanId;
				imageUploadItemQueryParams.itemCode = optionParams.params.itemCode;
				Ext.apply(thiz.baseParams, imageUploadItemQueryParams);
			});
	return grid;

}


function showSCImageWin(applyCode, itemCode, flowType) {
	var showWin = new Ext.Window({
		title : ifactorTranslator.getLangLabel('image-language', 'upload_image'),
		width : 650,
		height : 300,
		modal : true,
		closable : false,
		layout : 'fit',
		items : [{
					xtype : 'uploadPanel',
					id : 'uploadPanel',
					border : false,
					fileSize : 1024 * 50,
					uploadUrl : serverPath + context
							+ '/system/baseworkremix.do',
					flashUrl : context + '/app/ifactor/upload/swfupload/swfupload.swf',
					filePostName : 'file',
					fileTypes : '*.*',
					flowType : flowType,
					pkId : 'IMAGE_UPLOAD_ID',
					postParams : {
						tableNames : 'IF_MGT_IMAGE_UPLOAD',
						handleTypes : 'single',
						counterNames : '-1',
						APPLY_CODE : applyCode,
						includeImageType : '',
						defaultImageType : itemCode,
						UPLOAD_TIME : nowTime()
					}
				}],
		buttons : [{
					text : ifactorTranslator.getLangLabel('ifcommon-language', 'close'),
					handler : function() {
						Ext.getCmp('uploadPanel').destory();
						showWin.close();
						showWin = null;
						Ext.getCmp('imageUploadItemListGrid').getStore()
								.reload();
					}
				}]
	});
	showWin.show();
}