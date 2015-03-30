$(function() {

	/*
	 * // 初始化tab显示 $('#form-tab-header a:first').tab('show');
	 * 
	 * $('#form-tab-header a').click(function (e) {
	 * e.preventDefault();//阻止a链接的跳转行为
	 * $(this).tab('show');//显示当前选中的链接及关联的content })
	 */

	$('#modal_add_new_file').on('hide', function() {
		alert('Please select a file.');
	});
	$('#btn_add_file').on('click', function() {
		$('#modal_add_new_file').modal('show');
	});

	$('#rating-1,#rating-2,#rating-3,#rating-4,#rating-5').click(
			function(e) {
				// 获取指定元素的前边所有的同级元素及自己，移除所有active样式
				$(this).prevAll().add($(this)).removeClass('active');
				// 给本身加上active类样式
				$(this).addClass('active');
				// 获取指定元素后边的所有同级元素，移除其中所有active样式
				$(this).nextAll().removeClass('active');

				var rating_value = parseInt($(this).attr('id').substring(
						'#rating'.length), 10);

				$('#rating').val(rating_value);
				return false;
			});

	$('#checkbox-agree1,#checkbox-agree2,#checkbox-agree3,#checkbox-agree4')
			.click(
					function(e) {
						if ($('#checkbox-agree1').is(':checked')
								&& $('#checkbox-agree2').is(':checked')
								&& $('#checkbox-agree3').is(':checked')
								&& $('#checkbox-agree4').is(':checked')) {
							$('#submitApplication').attr('disabled', false);
						} else {
							$('#submitApplication').attr('disabled', true);
						}
					});

	// 初始化上传设置
	// 初始化上传设置
	initUploadSettings('docScanOfInv');
	initUploadSettings('docScanOfCont');
	initUploadSettings('docDlvryCnfm');
	initUploadSettings('docDebtorAckmt');

	

	/* 验证设置 */
	$('#form-documents-hidden').validate({
		ignore : '',// 需要验证隐藏域
		errorPlacement : function(error, element) {
			if (element.is(':radio')) {
				error.appendTo(element.parent());
			} else if (element.is(':checkbox')) {
				error.appendTo(element.parent());
			} else if (element.is(':hidden')) {
				var hiddenName = element.attr('name');
				var removeDigitName = hiddenName.replace(/\d/g, '');
				$('#error' + '-' + hiddenId).html('');
				if (removeDigitName == 'documents[].id') {
					var hiddenId = element.attr('id');
					$('#error' + '-' + hiddenId).html(error);
					// error.appendTo($('#error'+'-'+hiddenId));
				}
			} else if (element.is('input[name=captcha]')) {
				error.appendTo(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});

	$('#save-invoice').click(
			function() {

				$('#form-tab-header a[href="#tab-4"]').tab('show');
				if (!$('#readyToSellAdv').valid()) {
					// alert('form-further-details is valid');
					return false;
				} else {

				}

				if (!$('#readyToSellInt').valid()) {
					// alert('form-further-details is valid');
					return false;
				} else {

				}

				var formIds = [ 'form-seller-info', 'form-debtor-info',
						'form-financing-info', 'form-readytosell-info',
						'form-documents-hidden', 'form-conditions' ]
				var formData = MergeFormData(formIds);
				var url = app.base + '/seller/invoice/apply?isCommit=false';

				AjaxPostRequest(url, formData, successSaveOrSubmit);
			});

	$('#submit-invoice').click(
			function() {
				$('#form-tab-header a[href="#tab1"]').tab('show');
				if (!$('#form-opinion-info').valid()) {
					// alert('form-seller-info is valid');
					return false;
				} else {
					// alert('form-seller-info is invalid');
				}
				
				$('#form-tab-header a[href="#tab2"]').tab('show');
				if (!$('#form-seller-info').valid()) {
					// alert('form-seller-info is valid');
					return false;
				} else {
					// alert('form-seller-info is invalid');
				}

				$('#form-tab-header a[href="#tab3"]').tab('show');
				if (!$('#form-debtor-info').valid()) {
					// alert('form-debtor-info is valid');
					return false;
				} else {
					// alert('form-debtor-info is invalid');
				}

				$('#form-tab-header a[href="#tab4"]').tab('show');
				if (!$('#form-financing-info').valid()) {
					// alert('form-financing-info is valid');
					return false;
				} else {
					// alert('form-financing-info is invalid');
				}

				$('#form-tab-header a[href="#tab5"]').tab('show');
				if (!$('#form-readytosell-info').valid()) {
					// alert('form-readytosell-info is valid');
					return false;
				} else {
					// alert('form-readytosell-info is invalid');
				}

				$('#form-tab-header a[href="#tab6"]').tab('show');
				if (!$('#form-documents-hidden').valid()) {
					// alert('form-documents-hidden is valid');
					return false;
				} else {
					// alert('form-documents-hidden is invalid');
				}

				$('#form-tab-header a[href="#tab7"]').tab('show');
				if (!$('#form-conditions').valid()) {
					// alert('form-conditions is valid');
					return false;
				} else {
					// alert('form-conditions is invalid');
				}

				
				var formIds = [ 'form-opinion-info','form-seller-info', 'form-debtor-info',
						        'form-financing-info', 'form-readytosell-info','form-documents-hidden', 'form-conditions' ]
				var formData = MergeFormData(formIds);
				var url = app.base + '/seller/invoice/update?isCommit=true';

				AjaxPostRequest(url, formData, successSaveOrSubmit);
			});

	// 设置模态窗口垂直居中
	$('.modal').on('show', function() {
		$(this).css({
			'margin-top' : function() {
				return -($(this).height() / 2);
			}
		});
	});

	$('#btnContinueSubmit').on('click', function() {
		$('#modal_success').modal('hide');
		location.href = app.base + '/seller/invoice/apply';
	});
	$('#btnGoToList').on('click', function() {
		$('#modal_success').modal('hide');
		location.href = app.base + '/seller/invoice/under-approval';
	});
	$('#btnFailedClose').on('click', function() {
		$('#modal_failed').modal('hide');
	});

	$("#finInvIssDate,#finDueDateAccToCont,#finExpPmtDate").on('change',
  	   function(e) {
		  return $(e.target).valid();
	  });

	$("#checkbox-accept").click(function(){
        if($("#checkbox-accept").attr("checked")=="checked"){
        	$('#submit-invoice').attr('disabled', false);  
        }else{   
        	$('#submit-invoice').attr('disabled', true);  
        }   
    });  
	
	$('#finDueDateAccToCont').on('change', function() {
		var issDateStr = $("#finDueDateAccToCont").val();
		var issDate = StringToDate(issDateStr);
		var payDate = issDate.DateAdd('d', 30);
		var newDate = payDate.Format('MM/dd/yyyy');
		$("#finExpPmtDate").val(newDate);
		var nowDate = new Date();
		compareDate(payDate, nowDate)
	});

	$('#finInvAmount')
			.on(
					'change',
					function() {
						var limitMin = parseFloat($("#limitMin").val());
						var limitMax = parseFloat($("#limitMax").val());
						var limitBalance = parseFloat($("#limitBalance").val());
						var finInvAmount = parseFloat($("#finInvAmount").val());
						if (finInvAmount < limitMin || finInvAmount > limitMax) {
							alert("Your invoice amount is not within the acceptable range of a single invoice");
							$("#finInvAmount").val("");
							return false;
						}
						if (finInvAmount > limitBalance) {
							alert("Your invoice amount has exceeded your remaining revolving limit");
							$("#finInvAmount").val("");
							return false;
						}
						return true;
					});

	$("#qry").click(function() {

		var dlgTop = $("#finInvAmountRead").offset().top + $("#finInvAmountRead").height();
		var dlgLeft = $("#finInvAmountRead").offset().left;
		$("#DialogDiv").css("top", dlgTop+ "px");
		$("#DialogDiv").css("left", dlgLeft + "px");
		$("#DialogDiv").css({
			margin:0,
			position:'absolute',
			display : "block",
			width : "250px",
			height : "100px"
		});
		document.documentElement.scrollTop = 0;

	});

	$("#btnClose").click(function() {
		$("#BgDiv").css("display", "none");
		$("#DialogDiv").css("display", "none");
	});

	$('#finExpPmtDate').on(
			'change',
			function() {
				var expPmtDate = new Date($("#finExpPmtDate").val().replace(
						/\-/g, "\/"));
				var nowDate = new Date();
				compareDate(expPmtDate, nowDate)
			});

	$(".form-content .form-group select").select2({
		containerCssClass : 'form-select-container',
		dropdownCssClass : 'form-select-dropdown',
	});

	$(".form-content .form-group select").on("change select2-blur",
			function(e) {
				var target = $(e.target);
				// alert(target.attr('id') + ' ' +e.val);
				target.focusout(); // 失焦触发验证
			});
});

function successSaveOrSubmit(result) {
	// data = eval("(" + data + ")");

	if (result.success) {
		if (result.message == 'invoice.submit.message.successSaved') {
			$('#modal-success-body').html(app.successSavedMsg);
		} else if (result.message == 'invoice.submit.message.successUpdated') {
			$('#modal-success-body').html(app.successUpdatedMsg);
		} else if (result.message == 'invoice.submit.message.successSubmitted') {
			$('#modal-success-body').html(app.successSubmittedMsg);
		} else {
			$('#modal-success-body').html(result.message);
		}
		$('#modal_success').modal('show');
		var msgTpl = app.successRedirectMsg; // 'The page will redirect in
												// {timeCount} seconds';
		var redUrl = app.base + '/';
		jump(5, msgTpl, redUrl);
	} else {
		$('#errordiv').show();
	}
}

function initUploadSettings(fileinput_id) {
	var biztype = $('#file-type-' + fileinput_id).val();
	var url = app.base + '/fileUpload/' + biztype;
	// alert(url);

	// 初始化，主要是设置上传参数，以及事件处理方法(回调函数)
	$('#' + fileinput_id)
			.fileupload(
					{
						autoUpload : true,// 是否自动上传
						url : url,// 上传地址
						maxNumberOfFiles : 1, // 文件数量限制
						acceptFileTypes : /(\.|\/)(gif|jpe?g|png|pnx|pdf|tif|tip)$/i,
						dataType : 'text',
						done : function(e, data) {// 设置文件上传完毕事件的回调函数
							var retData = data.result.trim();
							if(retData.toLowerCase().startsWith('<!doctype')) {
								window.location = app.base + '/login';
								return false;
							}

						    var filelink_id = 'file-link' + '-' + fileinput_id;
				            var originalName = data.files[0].name;
				            
				            $('#' + fileinput_id).attr('title', originalName);
				            var showname = originalName;
				            if(showname.length>20){
				            	showname = originalName.substring(0,10)+"..."+originalName.substring(originalName.length-10);
				            }
				            $('#' + filelink_id).html('<a href="' + app.base + '/fileDownload/' + biztype + '/'+data.result+'" title="'+originalName+'">' +showname + '</a>' )
				              .css({}); 
						

							var idx = data.result.indexOf('.');
							if (idx == -1) {
								$('#' + fileinput_id + 'Id').val(data.result);
							} else {
								$('#' + 'error' + '-' + fileinput_id + 'Id')
										.html(''); // 清除错误提示
								$('#' + fileinput_id + 'Id').val(
										data.result.substring(0, idx)).change();
							}
						},
						progressall : function(e, data) {// 设置上传进度事件的回调函数
							var progress = parseInt(data.loaded / data.total
									* 100, 10);
							var progess_id = 'progress' + '-' + fileinput_id;

							$('#' + progess_id + ' .bar').css({
								'width' : 100 + '%',
								'background-color' : '#00FF00',
								'text-align' : 'center'
							}).text(100 + '%');
						}
					}).on('fileuploadprocessalways', function(e, data) {
				var currentFile = data.files[data.index];
				if (data.files.error && currentFile.error) {
					alert(currentFile.error);
				}
			});

	// 在Firefox环境下测试是，发现如果将文件数量限制为1，选择一次文件，
	// 刷新页面之后文件选择按钮会莫名其妙的被加上一个Disabled属性
	$('#' + fileinput_id).find("input:file").removeAttr('disabled');
}

function compareDate(comDate, nowDate) {
	if (comDate > nowDate) {
		var day = nowDate.DateDiff('d', comDate);
		$("#finRmngMatTerm").val(day);
	} else {
		$("#finRmngMatTerm").val("");
	}
}

function validtorIssDate() {
	var d1 = new Date($("#finInvIssDate").val().replace(/\-/g, "\/"));
	var d2 = new Date();
	if (d1 >= d2) {
		alert("Invoice issuance date must be before the current date!");
		$("#finInvIssDate").val("");
		return false;
	}
	return true;
}

function jump(count, msgTpl, redirectActionUrl) {
	window.setTimeout(function() {
		count--;
		if (count > 0) {
			var timeTipsMsg = msgTpl.replace('{timeCount}', count);
			$('#modal-timetips').html(timeTipsMsg);
			jump(count, msgTpl, redirectActionUrl);
		} else {
			location.href = redirectActionUrl;
		}
	}, 1000);
};
