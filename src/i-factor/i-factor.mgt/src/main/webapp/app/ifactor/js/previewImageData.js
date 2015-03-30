/**
 * 带有toolbar的图片预览
 * 
 * @param {}
 *            options
 */
function showPreviewImagePanel(options) {

	if (Ext.getCmp('imageShowWin_' + options.params.applyCode))
		return;

	Ext.Ajax.request({
				url : context + '/views/image/getToolBarJson',
				method : 'POST',
				params : {
					applyCode : options.params.applyCode
				},
				success : function(response, param) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (o.success) {
						var bbar = getBBar(options);

						var panelTemp = new Ext.Panel({
									layout : 'border',
									bbar : bbar,
									height : '100%',
									autoScroll : true,
									margins : '1 1 1 1',
									border : false,
									items : [initImageDataMenuTree(options), {
										region : 'center',
										border : false,
										frame : false,
										html : '<div id="previewPane_'
												+ options.params.applyCode
												+ '" class="previewPane"></div>'
									}, {
										region : 'east',
										border : false,
										frame : false,
										width : 150,
										layout : 'border',
										split : true,
										animCollapse : true,
										collapseMode : 'mini',
										items : [{
											region : 'center',
											border : false,
											frame : false,
											autoScroll : true,
											html : '<div id="theImages_'
													+ options.params.applyCode
													+ '" class="theImages"></div>'
										}]
									}]
								});

						var win = new Ext.Window({
									id : 'imageShowWin_'
											+ options.params.applyCode,
									renderTo : Ext.getBody(),
									layout : 'fit',
									width : 1100,
									height : Ext.getBody().getHeight() - 50,
									x : Ext.getBody().getWidth() - 1100,
									y : 0,
									resizable : true,
									constrainHeader : true,
									plain : true,
									modal : false,
									stateful : false,
									maximizable : true,
									title : ifactorTranslator.getLangLabel('image-language', 'view_image_data'),
									items : [panelTemp]
								});

						win.show();

					}
				}
			});
}

function initImageDataMenuTree(options) {
	var panel = new Ext.tree.TreePanel({
				region : 'west',
				frame : false,
				// renderTo : 'previewMenuTree_' + options.params.applyCode,
				border : false,
				autoScroll : true,
				animate : true,
				split : true,
				animCollapse : true,
				collapseMode : 'mini',
				width : 200,
				rootVisible : true,
				loader : new Ext.tree.TreeLoader({
							dataUrl : context + '/views/image/menutree',
							baseParams : {
								applyCode : options.params.applyCode
							}
						}),
				root : new Ext.tree.AsyncTreeNode({
							allowChildren : true,
							expanded : true,
							text : 'Image Category Tree', // 节点名称
							draggable : false, // 是否支持拖动
							id : '0' // 节点id
						}),
				listeners : {
					'click' : function(node) {
						if (node.leaf) {
							showImages(node.attributes.imageUploadId,
									node.attributes.menuName,
									node.attributes.itemCode,
									node.attributes.itemType,
									options.params.applyCode,
									options.isCheckView ? true : false,
									options.formId, options.params.actId,
									options.params.action);
						}
					}
				}
			});

	return panel;
}

/**
 * 无toolBar图片预览
 * 
 * @param {}
 *            options
 */
function showPreviewImagePanelNoBar(options) {
	var bbar = getBBar(options);
	var panelTemp = new Ext.Panel({
				layout : 'border',
				bbar : bbar,
				height : '100%',
				autoScroll : true,
				margins : '1 1 1 1',
				border : false,
				items : [initImageDataMenuTree(options), {
					region : 'center',
					border : false,
					frame : false,
					html : '<div id="previewPane_' + options.params.applyCode
							+ '" class="previewPane"></div>'
				}, {
					region : 'east',
					border : false,
					frame : false,
					width : 95,
					layout : 'border',
					split : true,
					animCollapse : true,
					collapseMode : 'mini',
					items : [{
						region : 'center',
						border : false,
						frame : false,
						autoScroll : true,
						html : '<div id="theImages_' + options.params.applyCode
								+ '" class="theImages"></div>'
					}]
				}]
			});

	var win = new Ext.Window({
				id : 'imageShowWin_' + options.params.applyCode,
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 920,
				height : Ext.getBody().getHeight() - 50,
				x : Ext.getBody().getWidth() - 920,
				y : 0,
				resizable : true,
				constrainHeader : true,
				plain : true,
				modal : false,
				stateful : false,
				maximizable : true,
				title : ifactorTranslator.getLangLabel('image-language', 'view_image_data')+'_' + options.params.applyCode,
				items : [panelTemp]
			});

	win.show();
	/**
	 * 显示影像资料
	 */
	showImages(options.params.imageUploadId, options.params.imageUploadName,
			options.params.itemCode, options.params.itemType,
			options.params.applyCode, false, options.formId,
			options.params.actId, options.params.action);

}
/**
 * 生成toolBar
 * 
 * @param {}
 *            tbarJson
 * @return {}
 */
function getToolBar(tbarJson, options) {
	var tbar = new Ext.Toolbar();
	Ext.each(tbarJson, function(item) {
				if (!options.params.includetype) {
					var it = {
						text : item.tbarText,
						menu : getToolBarMenu(item.tbarMenu, item.tbarType,
								options.params.applyCode, options.isCheckView
										? true
										: false, options.formId)
					}
					tbar.add(it);
				} else if (options.params.includetype.indexOf(item.tbarType) == -1) {
					return;
				} else {
					var it = {
						text : item.tbarText,
						menu : getToolBarMenu(item.tbarMenu, item.tbarType,
								options.params.applyCode, options.isCheckView
										? true
										: false, options.formId)
					}
					tbar.add(it);
				}
			});
	return tbar;
}

function getBBar(options) {
	var bbar = new Ext.Toolbar();
	bbar.add({
				text : ifactorTranslator.getLangLabel('ifcommon-language', 'close'),
				iconCls : 'close',
				handler : function() {
					var win = Ext.getCmp('imageShowWin_'
							+ options.params.applyCode);
					if (win) {
						win.close();
						win = null;
					}
				}
			});
	bbar.add('->', {
				id : 'previewImageLeftTool_' + options.params.applyCode,
				text : ifactorTranslator.getLangLabel('image-language', 'left_rotation'),
				icon : context + '/app/ifactor/images/arrow_rotate_left.png',
				disabled : true,
				handler : function() {
					rotateChangeWithLoan('left', options.params.applyCode);
				}
			}, {
				id : 'previewImageRightTool_' + options.params.applyCode,
				text : ifactorTranslator.getLangLabel('image-language', 'right_rotation'),
				icon : context + '/app/ifactor/images/arrow_rotate_right.png',
				disabled : true,
				handler : function() {
					rotateChangeWithLoan('right', options.params.applyCode);
				}
			}, {
				id : 'previewImagePreviousTool_' + options.params.applyCode,
				text : ifactorTranslator.getLangLabel('image-language', 'previous'),
				icon : context + '/app/ifactor/images/arrow_left.png',
				disabled : true,
				handler : function() {
					ImageNextWithLoan(-1, options.params.applyCode);
				}
			}, {
				id : 'previewImageNextTool_' + options.params.applyCode,
				text : ifactorTranslator.getLangLabel('image-language', 'next'),
				icon : context + '/app/ifactor/images/arrow_right.png',
				disabled : true,
				handler : function() {
					ImageNextWithLoan(1, options.params.applyCode);
				}
			});

	return bbar;
}

/**
 * 生成toolbarmenu
 * 
 * @param {}
 *            menuJson
 * @return {}
 */
function getToolBarMenu(menuJson, itemType, applyCode, isCheckView, formId) {
	var menu = new Ext.menu.Menu();
	Ext.each(menuJson, function(item) {
				var it = {
					iconCls : 'icon-attach',
					text : item.menuName,
					handler : function() {
						showImages(item.imageUploadId, item.menuName,
								item.itemCode, itemType, applyCode,
								isCheckView, formId);
					}
				}
				menu.add(it);
			});
	return menu;
}
/**
 * 显示相关图片
 * 
 * @param {}
 *            imageUploadId
 */
function showImages(imageUploadId, imageUploadName, itemCode, itemType,
		applyCode, isCheckView, formId, actId, action) {
	document.getElementById('previewPane_' + applyCode).innerHTML = '';
	initTableI('IF_MGT_IMAGE_UPLOAD', imageUploadId, 'IMAGE_UPLOAD_ID',
			'single', function(record) {
				var traceInfo = {};

				if (actId != null && action == 'todo') {
					var url = context + '/views/image/traceinfo';

					url += '?actId=' + actId;

					// log preview trace action
					var responseText = sendRequest(url);

					var previewLogJson = Ext.util.JSON.decode(responseText);

					if (previewLogJson.success == true) {
						traceInfo = previewLogJson.resultData;
					}
				}

				if (Ext.getCmp('removeImageTool_' + applyCode)) {
					Ext.getCmp('removeImageTool_' + applyCode).disable();
				}
				Ext.getCmp('previewImageLeftTool_' + applyCode).disable();
				Ext.getCmp('previewImageRightTool_' + applyCode).disable();
				Ext.getCmp('previewImagePreviousTool_' + applyCode).disable();
				Ext.getCmp('previewImageNextTool_' + applyCode).disable();

				if (record.data != null && record.data.IMAGE != null
						&& record.data.IMAGE.length > 0) {

					var resultDiv = '<div id="imagesListDiv_' + applyCode
							+ '"><ul>';

					var idx = 0;

					var defaultId;

					Ext.each(record.data.IMAGE, function(image) {
						if (idx == 0) {
							defaultId = image.httpurl + '_' + applyCode;
						}

						var preIdx = idx - 1;
						var nextIdx = idx + 1;

						var preImgId = (preIdx > -1 && preIdx < record.data.IMAGE.length)
								? (record.data.IMAGE[preIdx].httpurl)
								: '-1';
						var nextImgId = (nextIdx > -1 && nextIdx < record.data.IMAGE.length)
								? (record.data.IMAGE[nextIdx].httpurl)
								: '-1';

						var viewUrl = image.httpurl;
						var orgUrl = image.httpurl;

						var readit = (traceInfo[image.id] != null
								? traceInfo[image.id]
								: '0');
						if (image.type.toLowerCase() == 'pdf') {
							orgUrl = image.url;
							tempA = '<li style="line-height:20px;"><span style="display:block;float:left;width:10%;margin-top:3px;margin-left:2px;">'
									//+ '<input type="checkbox" name="selectImages" value="'+ image.id+ '"/></span>'
									+ '</span>'
									+ '<span style="display:block;float:left;width:85%;line-height:20px;"><a href="#"  title="'
									+ image.name
									+ '" onclick="showPreviewPDF(\''
									+ viewUrl
									+ '_'
									+ applyCode
									+ '\', \''
									+ orgUrl
									+ '\', \''
									+ image.name
									+ '\', \''
									+ image.id
									+ '\', \''
									+ image.status
									+ '\', \''
									+ isCheckView
									+ '\', \''
									+ imageUploadId
									+ '\', \''
									+ imageUploadName
									+ '\', \''
									+ itemCode
									+ '\', \''
									+ itemType
									+ '\', \''
									+ applyCode
									+ '\' , \''
									+ formId
									+ '\', \''
									+ actId
									+ '\', \''
									+ action
									+ '\'  );return false" id="'
									+ viewUrl
									+ '_'
									+ applyCode
									+ '" orgsrc="'
									+ orgUrl
									+ '" previous="'
									+ preImgId
									+ '" next="'
									+ nextImgId
									+ '"><div style="font-size:15px;">'
									+ image.name + '<div></a></span></li>';
						} else if (image.type.toLowerCase() == 'jpg'
								|| image.type.toLowerCase() == 'gif'
								|| image.type.toLowerCase() == 'png'
								|| image.type.toLowerCase() == 'jpeg'
								|| image.type.toLowerCase() == 'bmp') {
							tempA = '<li style="line-height:20px;">'
									+ '<span style="display:block;float:left;width:85%;line-height:20px;font-size:15px;"><a href="#"  title="'
									+ image.name
									+ '" onclick="showPreview(\''
									+ viewUrl
									+ '_'
									+ applyCode
									+ '\', \''
									+ orgUrl
									+ '\', \''
									+ image.name
									+ '\', \''
									+ image.id
									+ '\', \''
									+ image.status
									+ '\', \''
									+ isCheckView
									+ '\', \''
									+ imageUploadId
									+ '\', \''
									+ imageUploadName
									+ '\', \''
									+ itemCode
									+ '\', \''
									+ itemType
									+ '\', \''
									+ applyCode
									+ '\' , \''
									+ formId
									+ '\', \''
									+ actId
									+ '\', \''
									+ action
									+ '\');return false" id="'
									+ viewUrl
									+ '_'
									+ applyCode
									+ '" orgsrc="'
									+ orgUrl
									+ '" previous="'
									+ preImgId
									+ '" next="'
									+ nextImgId
									+ '" readit="'
									+ readit
									+ '">'
									+ image.name
									+ (readit != '0'
											? ('&nbsp;<img src="' + context + '/app/ifactor/upload/images/trace.png" title="Had Read"/>')
											: '') + '</a></span></li>';
						} else {
							tempA = '<li style="line-height:20px;">'
									+ '<span style="display:block;float:left;width:85%;line-height:20px;font-size:15px;"><a href="#"  title="'
									+ image.name
									+ '" onclick="downloadfile(\''
									+ image.name
									+ '\', \''
									+ image.id
									+ '\', \''
									+ image.status
									+ '\', \''
									+ isCheckView
									+ '\', \''
									+ itemCode
									+ '\', \''
									+ itemType
									+ '\' , \''
									+ applyCode
									+ '\', \''
									+ formId
									+ '\');return false" id="'
									+ viewUrl
									+ '_'
									+ applyCode
									+ '" orgsrc="'
									+ orgUrl
									+ '" previous="'
									+ preImgId
									+ '" next="'
									+ nextImgId
									+ '" readit="'
									+ readit
									+ '">'
									+ image.name
									+ (readit != '0'
											? ('&nbsp;<img src="' + context + '/app/ifactor/upload/images/trace.png" title="Had Read"/>')
											: '') + '</a></span></li>';
						}
						resultDiv += tempA;

						idx++;
					});
					var end = '</ul></div>';
					resultDiv = resultDiv + end;
					document.getElementById('theImages_' + applyCode).innerHTML = resultDiv;

					initGalleryScriptWithLoan(defaultId, applyCode);

				} else {
					document.getElementById('theImages_' + applyCode).innerHTML = '<div id="imagesListDiv_'
							+ applyCode
							+ '"><div id="slideEnd_'
							+ applyCode
							+ '"></div></div>';
				}
			});
}

function isSelectAllImages(param) {
	var selectImages = document.getElementsByName("selectImages");
	for (var i = 0; i < selectImages.length; i++) {
		if (param.checked) {
			selectImages[i].checked = true;
		} else {
			selectImages[i].checked = false;
		}
	}
}

function showPreviewPDF(newSrc, orgUrl, tlt, annexId, annexStatus, isCheckView,
		imageUploadId, imageUploadName, itemCode, itemType, loanId, formId,
		actId, action) {

	if (isCheckView == 'true') {

		if (annexStatus == -1) {
			tlt = '<font style="color:red">' + tlt + '</font>';
		}

		var annexName = itemType + '/' + itemCode + '/' + tlt

		/**tlt = tlt
				+ '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" title="sign ambiguous mark" onclick="javascript:resetAnnexStatus(\''
				+ annexId
				+ '\', \'0\', \''
				+ annexName
				+ '\', \''
				+ formId
				+ '\');"><img src="'
				+ context
				+ '/app/ifactor/upload/images/tick.png" style="margin-bottom:-3px"/></a>'
				+ '&nbsp;&nbsp;<a href="javascript:void(0);" title="clear ambiguous mark" onclick="javascript:resetAnnexStatus(\''
				+ annexId
				+ '\', \'-1\', \''
				+ annexName
				+ '\', \''
				+ formId
				+ '\');"><img src="'
				+ context
				+ '/app/ifactor/upload/images/cross.png" style="margin-bottom:-3px"/></a>';**/
		var resultJson = Ext.getCmp(formId).resultJson;
		var options = Ext.getCmp(formId).plugObject.options;
		var stockings = options.stockings[resultJson.id];
		var stockingsItems = stockings.items[formId + '_' + annexId];
		tlt = tlt + '&nbsp;&nbsp;<input type="checkbox" id = "markCheck"';
		if(stockingsItems!= undefined){
			tlt = tlt + 'checked = "checked"';
		}
		tlt = tlt + 'onChange="resetAnnexStatus(\''+annexId+'\',this,\''+annexName+'\',\''+formId+'\')" >';
	}

	var temp = '<div style="font-size:15px;position: absolute;z-index:5;text-align:center;width:100%;text-align:center">'
			+ tlt
			+ '</div><div id="showpdf_'
			+ loanId
			+ '"  src="'
			+ orgUrl
			+ '" orgsrc="'
			+ orgUrl
			+ '"  height="485" style="position: relative;margin-top:20px" ></div>';
	document.getElementById('previewPane_' + loanId).innerHTML = temp;

	new PDFObject({
				url : orgUrl,
				pdfOpenParams : {
					navpanes : 1,
					view : "FitH",
					pagemode : "thumbs"
				}
			}).embed('showpdf_' + loanId);

}

function downloadfile(tlt, annexId, annexStatus, isCheckView,itemCode, itemType, loanId, formId) {
	if (isCheckView == 'true') {
		if (annexStatus == -1) {
			tlt = '<font style="color:red">' + tlt + '</font>';
		}
		var annexName = itemType + '/' + itemCode + '/' + tlt
		var resultJson = Ext.getCmp(formId).resultJson;
		var options = Ext.getCmp(formId).plugObject.options;
		var stockings = options.stockings[resultJson.id];
		var stockingsItems = stockings.items[formId + '_' + annexId];
		tlt = tlt + '&nbsp;&nbsp;<input type="checkbox" id = "markCheck"';
		if(stockingsItems!= undefined){
			tlt = tlt + 'checked = "checked"';
		}
		tlt = tlt + 'onChange="resetAnnexStatus(\''+annexId+'\',this,\''+annexName+'\',\''+formId+'\')" >';
	}

	var temp = '<div style="font-size:15px;position: absolute;z-index:5;text-align:center;width:100%;text-align:center">'
			+ tlt
			+ '</div><div height="485" style="position: relative;margin-top:20px" ></div>';
	document.getElementById('previewPane_' + loanId).innerHTML = temp;
	var url = context + "/system/annex.do?method=view&id=" + annexId;
	inithelper();
	getFrameDocument('helper').src = url;
}
