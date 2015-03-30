var viewResourceWin;
var arrowImageHeight = 35;
var displayWaitMessage = true;
var previewImage = false;
var previewImageParent = false;
var slideSpeed = 0;
var previewImagePane = false;
var slideEndMarker = false;
var galleryContainer = false;
var imageGalleryCaptions = new Array();

function getTopPos(inputObj) {

	var returnValue = inputObj.offsetTop;
	while ((inputObj = inputObj.offsetParent) != null)
		returnValue += inputObj.offsetTop;
	return returnValue;
}

function getLeftPos(inputObj) {

	var returnValue = inputObj.offsetLeft;
	while ((inputObj = inputObj.offsetParent) != null)
		returnValue += inputObj.offsetLeft;
	return returnValue;
}
/**
 * 缩放图片
 * 
 * @param {}
 *            simage
 * @param {}
 *            dwMax
 * @param {}
 *            dhMax
 */
function drawImg(simage, dwMax, dhMax) {
	var dw = simage.width;
	var dh = simage.height;
	if (dw > dwMax || dh > dhMax) {
		a = dw / dwMax;
		b = dh / dhMax;
		if (b > a)
			a = b;
		dw = dw / a;
		dh = dh / a;
	}
	simage.width = dw;
	simage.height = dh;
}
/**
 * 显示大图
 * 
 * @param {}
 *            newSrc
 */
function showPreview(newSrc, orgUrl, tlt, annexId, annexStatus, isCheckView,
		imageUploadId, imageUploadName, itemCode, itemType, loanId, formId,
		actId, action) {
	var previewLogJson = {
		success : false
	};
	if (actId != null && action == 'todo') {
		// log image file preview trace info
		var url = context
				+ '/system/baseworkremix.do?tableNames=IF_MGT_IMAGE_TRACE&handleTypes=single'
				+ '&counterNames=-1&listener=ImagePreviewLogMachining';

		url += '&ACT_ID=' + actId + '&ANNEX_ID=' + annexId;

		// log preview trace action
		var responseText = sendRequest(url);

		previewLogJson = Ext.util.JSON.decode(responseText);
	}

	if (previewLogJson.success == true) {
		// flag for read it
		if (document.getElementById(newSrc).getAttribute('readit') == '0') {
			document.getElementById(newSrc).innerHTML = document
					.getElementById(newSrc).innerHTML
					+ '&nbsp;<img src="'
					+ context
					+ '/app/ifactor/upload/images/trace.png" title="Had Read"/>';
			document.getElementById(newSrc).setAttribute('readit',
					previewLogJson.resultData.TRACE_TIME);
		}
		// alert(previewLogJson.resultData.TRACE_ID);
	}

	degreeToRotate = 0;
	var currentImageSrc = document.getElementById('showImage_' + loanId)
			? document.getElementById('showImage_' + loanId)
					.getAttribute('currentImageSrc')
			: null;

	if (document.getElementById(currentImageSrc) != null
			&& currentImageSrc != newSrc) {
		// blur last image
		document.getElementById(currentImageSrc).style.filter = 'alpha(opacity=35)';
		document.getElementById(currentImageSrc).style.opacity = 0.35;
	}

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
			+ '</div><img id="showImage_'
			+ loanId
			+ '"  src="'
			+ orgUrl
			+ '" orgsrc="'
			+ orgUrl
			+ '" onload1="drawImg(this,500,400)" height="485" style="position: relative;margin-top:20px"  onmousewheel="return bbimg(this)" />';
	document.getElementById('previewPane_' + loanId).innerHTML = temp;

	// 设置图片位置
	// resetPicPos();

	document.getElementById('showImage_' + loanId).setAttribute(
			'currentImageSrc', newSrc);

	document.getElementById('showImage_' + loanId).onmousedown = function(e) {
		selectmouseWithLoan(e, loanId)
	};
	document.getElementById('showImage_' + loanId).onmouseup = new Function("isdrag=false");
	//document.getElementById('showImage_' + loanId).oncontextmenu = function() {
	//	return false;
	//};

	if (Ext.getCmp('removeImageTool_' + loanId)
			&& (trim(Ext.getCmp('removeImageTool_' + loanId).currentItem.removeType) == '' || Ext
					.getCmp('removeImageTool_' + loanId).currentItem.removeType
					.indexOf(itemCode) > -1)) {
		Ext.getCmp('removeImageTool_' + loanId).enable();
		Ext.getCmp('removeImageTool_' + loanId).currentItem.id = annexId;
		Ext.getCmp('removeImageTool_' + loanId).currentItem.name = tlt;
		Ext.getCmp('removeImageTool_' + loanId).currentItem.imageUploadId = imageUploadId;
		Ext.getCmp('removeImageTool_' + loanId).currentItem.imageUploadName = imageUploadName;
	}

	Ext.getCmp('previewImageLeftTool_' + loanId).enable();
	Ext.getCmp('previewImageRightTool_' + loanId).enable();

	var previous = document.getElementById(newSrc).getAttribute("previous");
	var next = document.getElementById(newSrc).getAttribute("next");

	if (previous != '-1') {
		Ext.getCmp('previewImagePreviousTool_' + loanId).enable();
	} else {
		Ext.getCmp('previewImagePreviousTool_' + loanId).disable();
	}

	if (next != '-1') {
		Ext.getCmp('previewImageNextTool_' + loanId).enable();
	} else {
		Ext.getCmp('previewImageNextTool_' + loanId).disable();
	}
}
function showPreviewWithLoan(newSrc, orgUrl, tlt, loanId) {
	degreeToRotate = 0;
	var currentImageSrc = document.getElementById('showImage_' + loanId)
			? document.getElementById('showImage_' + loanId)
					.getAttribute('currentImageSrc')
			: null;

	if (document.getElementById(currentImageSrc) != null
			&& currentImageSrc != newSrc) {
		// blur last image
		document.getElementById(currentImageSrc).style.filter = 'alpha(opacity=35)';
		document.getElementById(currentImageSrc).style.opacity = 0.35;
	}

	var temp = '<div style="font-size:15px;position: absolute;z-index:5;text-align:center;width:100%;text-align:center">'
			+ tlt
			+ '</div><img id="showImage_'
			+ loanId
			+ '"  src="'
			+ orgUrl
			+ '" orgsrc="'
			+ orgUrl
			+ '" onload1="drawImg(this,500,400)" height="485" style="position: relative;margin-top:20px"   onmousewheel="return bbimg(this)" />';
	document.getElementById('previewPane_' + loanId).innerHTML = temp;

	document.getElementById('showImage_' + loanId).setAttribute(
			'currentImageSrc', newSrc);

	document.getElementById('showImage_' + loanId).onmousedown = function(e) {
		selectmouseWithLoan(e, loanId)
	};
	document.getElementById('showImage_' + loanId).onmouseup = function() {
		return false;
	};
	//document.getElementById('showImage_' + loanId).oncontextmenu = function() {
	//	return false;
	//};

	Ext.getCmp('previewImageLeftTool_' + loanId).enable();
	Ext.getCmp('previewImageRightTool_' + loanId).enable();

	var previous = document.getElementById(newSrc).getAttribute("previous");
	var next = document.getElementById(newSrc).getAttribute("next");

	if (previous != '-1') {
		Ext.getCmp('previewImagePreviousTool_' + loanId).enable();
	} else {
		Ext.getCmp('previewImagePreviousTool_' + loanId).disable();
	}

	if (next != '-1') {
		Ext.getCmp('previewImageNextTool_' + loanId).enable();
	} else {
		Ext.getCmp('previewImageNextTool_' + loanId).disable();
	}
}

// 重新定位图片位置
function resetPicPos() {
	var zoom = parseInt(document.getElementById('showImage').style.zoom, 10)
			|| 100;

	if (document.getElementById('showImage').style.left > 0) {
		document.getElementById('showImage').style.left = 0;
		return;
	}
	document.getElementById('showImage').style.left = (document
			.getElementById('previewPane').offsetWidth - document
			.getElementById('showImage').offsetWidth
			* zoom / 100)
			/ 2;
}

// 计算元素x坐标
function getX(node) {
	var tempx = 0;
	while ((node = node.offsetParent)) {
		tempx += node.offsetLeft;
	}
	return tempx;
}

// 上一图片,下一图片
function ImageNext(tp) {
	var id = document.getElementById('showImage')
			.getAttribute('currentImageSrc');
	var targetId;
	if (tp == -1) {
		targetId = document.getElementById(id).getAttribute('previous');
	} else {
		targetId = document.getElementById(id).getAttribute('next');
	}

	if (targetId != '-1') {
		document.getElementById(targetId).click();

		document.getElementById(targetId).style.filter = 'alpha(opacity=100)';
		document.getElementById(targetId).style.opacity = 1;
	}
}
// 上一图片,下一图片
function ImageNextWithLoan(tp, loanId) {
	var id = document.getElementById('showImage_' + loanId)
			.getAttribute('currentImageSrc');
	var targetId;
	if (tp == -1) {
		targetId = document.getElementById(id).getAttribute('previous');
	} else {
		targetId = document.getElementById(id).getAttribute('next');
	}

	if (targetId != '-1') {
		document.getElementById(targetId + '_' + loanId).click();

		document.getElementById(targetId + '_' + loanId).style.filter = 'alpha(opacity=100)';
		document.getElementById(targetId + '_' + loanId).style.opacity = 1;
	}
}

var ie = document.all;
var nn6 = document.getElementById && !document.all;
var isdrag = false;
var x, y;
var dobj;

function movemouse(e) {
	if (isdrag) {
		var test = (parseInt(dobj.style.zoom, 10) || 100) / 100;
		dobj.style.left = nn6 ? tx + (e.clientX - x) / test : tx
				+ (event.clientX - x);
		dobj.style.top = nn6 ? ty + (e.clientY - y) / test : ty
				+ (event.clientY - y);
		return false;
	}
}
function selectmouse(e) {
	var fobj = nn6 ? e.target : event.srcElement;
	var topelement = nn6 ? "HTML" : "BODY";
	while (fobj.tagName != topelement && fobj.id != "showImage") {
		fobj = nn6 ? fobj.parentNode : fobj.parentElement;
	}
	if (fobj.id == "showImage") {
		isdrag = true;
		dobj = fobj;
		tx = parseInt(dobj.style.left + 0);
		ty = parseInt(dobj.style.top + 0);
		x = nn6 ? e.clientX : event.clientX;
		y = nn6 ? e.clientY : event.clientY;
		document.onmousemove = movemouse;
		return false;
	}
}
function selectmouseWithLoan(e, loanId) {
	var fobj = nn6 ? e.target : event.srcElement;
	var topelement = nn6 ? "HTML" : "BODY";
	while (fobj.tagName != topelement && fobj.id != "showImage_" + loanId) {
		fobj = nn6 ? fobj.parentNode : fobj.parentElement;
	}
	if (fobj.id == "showImage_" + loanId) {
		isdrag = true;
		dobj = fobj;
		tx = parseInt(dobj.style.left + 0);
		ty = parseInt(dobj.style.top + 0);
		x = nn6 ? e.clientX : event.clientX;
		y = nn6 ? e.clientY : event.clientY;
		document.onmousemove = movemouse;
		return false;
	}
}
function bbimgByHand(loanId, zoom) {
	if (zoom > 0) {
		document.getElementById("showImage_" + loanId).style.zoom = zoom + '%';
	}
}
function bbimg(o) {
	var zoom = parseInt(o.style.zoom, 10) || 100;
	zoom += event.wheelDelta / 12;
	if (zoom > 0)
		o.style.zoom = zoom + '%';

	// resetPicPos();
	return false;
}
/**
 * 查看原图
 * 
 * @param {}
 *            image
 * @param {}
 *            event
 */
function viewSourceImg(image, event) {
	var tbar1 = new Ext.Toolbar({
				items : ["->", {
							text : 'Rotating',
							handler : function() {
								rotateChange();
							}
						}]
			});
	var viewResourceWin = new Ext.Window({
				title : 'Image-preview',
				width : 800,
				height : 600,
				modal : false,
				plain : false,
				autoScroll : true,
				tbar : tbar1,
				html : '<div  id="viewResourceImage" class=rotate0><img src="'
						+ image.src + '" ></div>'
			});
	viewResourceWin.show();
}

function rotateChange(direction) {
	if (direction == 'left') {
		degreeToRotate--;
	} else if (direction == 'right')
		degreeToRotate++;
	if (degreeToRotate < -3 || degreeToRotate > 3) {
		degreeToRotate = 0;
	}
	imageToRotate = document.getElementById('showImage');
	if (ie) {
		// imageToRotate.style.filter =
		// "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto
		// expand')";
		// rotate();
		if (degreeToRotate == 0) {
			imageToRotate.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=0)";
		} else if (degreeToRotate == 1 || degreeToRotate == -3) {
			imageToRotate.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
		} else if (degreeToRotate == 2 || degreeToRotate == -2) {
			imageToRotate.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
		} else if (degreeToRotate == 3 || degreeToRotate == -1) {
			imageToRotate.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
		}
	} else {
		if (degreeToRotate == 0) {
			imageToRotate.setAttribute("class", "rotate0");
		} else if (degreeToRotate == 1 || degreeToRotate == -3) {
			imageToRotate.setAttribute("class", "rotate1");
		} else if (degreeToRotate == 2 || degreeToRotate == -2) {
			imageToRotate.setAttribute("class", "rotate2");
		} else if (degreeToRotate == 3 || degreeToRotate == -1) {
			imageToRotate.setAttribute("class", "rotate3");
		}
	}

}
function rotateChangeWithLoan(direction, loanId) {
	if (direction == 'left') {
		degreeToRotate--;
	} else if (direction == 'right')
		degreeToRotate++;
	if (degreeToRotate < -3 || degreeToRotate > 3) {
		degreeToRotate = 0;
	}
	imageToRotate = document.getElementById('showImage_' + loanId);
	if (ie) {
		// imageToRotate.style.filter =
		// "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto
		// expand')";
		// rotate();
		if (degreeToRotate == 0) {
			imageToRotate.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=0)";
		} else if (degreeToRotate == 1 || degreeToRotate == -3) {
			imageToRotate.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
		} else if (degreeToRotate == 2 || degreeToRotate == -2) {
			imageToRotate.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
		} else if (degreeToRotate == 3 || degreeToRotate == -1) {
			imageToRotate.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
		}
	} else {
		if (degreeToRotate == 0) {
			imageToRotate.setAttribute("class", "rotate0");
		} else if (degreeToRotate == 1 || degreeToRotate == -3) {
			imageToRotate.setAttribute("class", "rotate1");
		} else if (degreeToRotate == 2 || degreeToRotate == -2) {
			imageToRotate.setAttribute("class", "rotate2");
		} else if (degreeToRotate == 3 || degreeToRotate == -1) {
			imageToRotate.setAttribute("class", "rotate3");
		}
	}

}

var imageToRotate;

var degreeToRotate = 0;

function rotate() {
	var deg2radians = Math.PI * 180 / 360;
	degreeToRotate = degreeToRotate % 360;
	rad = degreeToRotate * deg2radians;
	costheta = Math.cos(rad);
	sintheta = Math.sin(rad);
	imageToRotate.filters.item(0).M11 = costheta;
	imageToRotate.filters.item(0).M12 = -sintheta;
	imageToRotate.filters.item(0).M21 = sintheta;
	imageToRotate.filters.item(0).M22 = costheta;

}

function hideLargeView() {
	var ei = document.getElementById("enlarge_images");
	ei.innerHTML = "";
	ei.style.display = "none";
}

function hideWaitMessageAndShowCaption(imageIndex) {
	document.getElementById('waitMessage').style.display = 'none';
	document.getElementById('largeImageCaption').innerHTML = imageGalleryCaptions[imageIndex];
	document.getElementById('largeImageCaption').style.display = 'block';

}
function initSlide(e) {
	if (document.all)
		e = event;

	if (this.src.indexOf('over') < 0)
		this.src = this.src.replace('.gif', '-over.gif');

	slideSpeed = e.clientY
			+ Math.max(document.body.scrollTop,
					document.documentElement.scrollTop) - getTopPos(this);
	if (this.src.indexOf('down') >= 0) {
		slideSpeed = (slideSpeed) * -1;
	} else {
		slideSpeed = arrowImageHeight - slideSpeed;
	}
	slideSpeed = Math.round(slideSpeed * 10 / arrowImageHeight);
}

function stopSlide() {
	slideSpeed = 0;
	this.src = this.src.replace('-over', '');
}

function slidePreviewPane() {
	if (slideSpeed != 0) {
		var topPos = previewImagePane.style.top.replace(/[^\-0-9]/g, '') / 1;

		if (slideSpeed < 0
				&& slideEndMarker.offsetTop < (previewImageParent.offsetHeight - topPos)) {
			slideSpeed = 0;

		}
		topPos = topPos + slideSpeed;
		if (topPos > 0)
			topPos = 0;

		previewImagePane.style.top = topPos + 'px';

	}
	setTimeout('slidePreviewPane()', 30);
}

// focus
function revealThumbnail() {
	this.style.filter = 'alpha(opacity=100)';
	this.style.opacity = 1;
}

// blur
function hideThumbnail() {
	if (document.getElementById('showImage') == null
			|| document.getElementById('showImage').getAttribute('orgsrc') != this
					.getAttribute('orgsrc')) {
		this.style.filter = 'alpha(opacity=35)';
		this.style.opacity = 0.35;
	}
}

function initGalleryScript(defaultId) {
	previewImageParent = document.getElementById('theImages');
	previewImagePane = document.getElementById('imagesListDiv');
	previewImagePane.style.top = '0px';
	galleryContainer = document.getElementById('galleryContainer');
	var images = previewImagePane.getElementsByTagName('IMG');
	for (var no = 0; no < images.length; no++) {
		images[no].onmouseover = revealThumbnail;
		images[no].onmouseout = hideThumbnail;
		//images[no].oncontextmenu = function() {
		//	return false
		//};
	}
	slideEndMarker = document.getElementById('slideEnd');

	var divs = previewImageParent.getElementsByTagName('DIV');

	if (defaultId != null) {
		document.getElementById(defaultId).click();
	}

	slidePreviewPane();

}

function initGalleryScriptWithLoan(defaultId, loanId) {
	previewImageParent = document.getElementById('theImages_' + loanId);
	previewImagePane = document.getElementById('imagesListDiv_' + loanId);
	previewImagePane.style.top = '0px';
	galleryContainer = document.getElementById('galleryContainer_' + loanId);
	var images = previewImagePane.getElementsByTagName('IMG');
	for (var no = 0; no < images.length; no++) {
		images[no].onmouseover = revealThumbnail;
		images[no].onmouseout = hideThumbnail;
		//images[no].oncontextmenu = function() {
		//	return false
		//};
	}
	slideEndMarker = document.getElementById('slideEnd_' + loanId);
	var divs = previewImageParent.getElementsByTagName('DIV');

	if (defaultId != null) {
		document.getElementById(defaultId).click();
	}

	slidePreviewPane();

}
/**
 * 更新附件审阅状态
 * 
 * @param {}
 *            annexId
 * @param {}
 *            annexStatus
 */
/**
function resetAnnexStatus(annexId, annexStatus, annexName, formId) {**/
	/*
	 * updateTable('XSYSTEM_ANNEX', 'single', '-1', function(params) {
	 * params.pkid = annexId; params.fstatus = annexStatus; return true; },
	 * function() { Ext.MessageBox.alert('Hint', 'Review status changed
	 * successful！'); }, 'Sure change review status？', null);
	 */
/**	var resultJson = Ext.getCmp(formId).resultJson;
	var options = Ext.getCmp(formId).plugObject.options;
	var stockings = options.stockings[resultJson.id];
	if (annexStatus == 0) {
		var annex = annexName.split('/');
		stockings.items[formId + '_' + annexId] = {
			name : annexName,
			dataField:annex[0]+'_'+annex[1],
			type : 'image',
			view : resultJson.name
		};
	} else {
		delete stockings.items[formId + '_' + annexId];
	}

	eval(stockings.stripOffFunc + '(stockings, options);');
}**/
function resetAnnexStatus(annexId, obj, annexName, formId) {
	var resultJson = Ext.getCmp(formId).resultJson;
	var options = Ext.getCmp(formId).plugObject.options;
	var stockings = options.stockings[resultJson.id];
	if (obj.checked == true) {
		var annex = annexName.split('/');
		stockings.items[formId + '_' + annexId] = {
			name : annexName,
			dataField:annex[0]+'_'+annex[1],
			type : 'image',
			view : resultJson.name
		};
	} else {
		delete stockings.items[formId + '_' + annexId];
	}

	eval(stockings.stripOffFunc + '(stockings, options);');
}

