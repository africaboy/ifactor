$(function (){
	$('#submitApplication').click(function(e){
		
		if(!checkForm()) {
			return false;
		}
		
		var formIds = ['form-personal-info','form-company-info','form-further-details','form-documents-hidden','form-terms-conditions']
		var formData = MergeFormData(formIds);
		var url = app.base + '/seller/account/apply?isCommit=true';
		
		AjaxPostRequest(url, formData,successSaveOrSubmit);
	}); 
	
	$('#saveApplication').click(function(e){
		
		if(!checkFormForInput()){
			return false;
		}
		
		var formIds = ['form-personal-info','form-company-info','form-further-details','form-documents-hidden','form-terms-conditions']
		var formData = MergeFormData(formIds);
		var url = app.base + '/seller/account/apply?isCommit=false';
		
		AjaxPostRequest(url, formData,successSaveOrSubmit);
	});
		
	// 初始化上传设置
	initUploadSettings('identificationFile');
	initUploadSettings('signedFile');
	initUploadSettings('licenseFile');
	initUploadSettings('taxCodeFile');
	initUploadSettings('fsFileLastYear');
	initUploadSettings('fsFileLast2Year');
	initUploadSettings('invoiceFile1');
	initUploadSettings('invoiceFile2');
	initUploadSettings('invoiceFile3');
		
	$('#form-personal-info').validate({
		errorPlacement: function (error, element) {
			var dateInputId = element.attr('id');
            if(dateInputId=='dob') {
            	$('#error'+'-' + dateInputId).html(error);
			} else {
                error.insertAfter(element);
            }
        }
	});
	$('#form-company-info').validate({
		errorPlacement: function (error, element) {
			var dateInputId = element.attr('id');
            if(dateInputId=='comEstablishmentDate') {
            	$('#error'+'-' + dateInputId).html(error);
			} else {
                error.insertAfter(element);
            }
        }
	});
	$('#form-further-details').validate();
	$('#form-documents-hidden').validate({
		ignore: '',// 需要验证隐藏域
        errorPlacement: function (error, element) {
            if (element.is(':radio')) {
                error.appendTo(element.parent());
            } else if (element.is(':checkbox')) {
                error.appendTo(element.parent());
            } else if (element.is(':hidden')) {
            	var hiddenName = element.attr('name');
            	var removeDigitName = hiddenName.replace(/\d/g,'');
            	var hiddenId = element.attr('id');
            	$('#error'+'-'+hiddenId).html('');
            	if(removeDigitName=='documents[].id') {         
                    $('#error'+'-'+hiddenId).html(error);
            	}
            }
             else {
                error.insertAfter(element);
            }
        }
	});
	$('#form-terms-conditions').validate();	
	
	$('.form-div input[type="checkbox"]').iCheck({
		  handle: 'checkbox'
	});
	
	$('.form-div input').iCheck({
		checkboxClass: 'icheckbox_flat-blue',
		radioClass: 'iradio_flat-blue',
		increaseArea: '20%'
	}).on('ifChecked', function(event){
		//alert(event.type + ' callback');
		$(this).attr("checked", true);
	}).on('ifUnchecked', function(event){
		//alert(event.type + ' callback');
		$(this).attr("checked", false);
	});
	
	
	$('#checkbox-accept').on('ifChecked',function() {
		$(this).attr("checked", true);
		if($('#checkbox-accept').is(':checked')) {
			$('#submitApplication').attr('disabled',false);
		} else {
			$('#submitApplication').attr('disabled',true);
		}
	}).on('ifUnchecked',function() {
		$(this).attr("checked", false);
		$('#submitApplication').attr('disabled',true);
	});
	
	

	$('#isComVietnam').on('change',function() {
		if($('#isComVietnam').val()=='No'){
			$('#comRegisteredCountryDiv').show();
		}else{
			$('#comRegisteredCountry').val('');
			$('#comRegisteredCountryDiv').hide();
		}
	});
	
	
    
	$('#workCountryCode').on('change',function() {
        var workCountryCode = $('#workCountryCode').val();
	      if(workCountryCode!='' && !workCountryCode.indexOf("+") == 0 ){
			$('#workCountryCode').val("+"+workCountryCode);
		  }if(workCountryCode=='') {
	        $('#workCountryCode').val("+84");
		  }
	});
     
	$('#mobileCountryCode').on('change',function() {
		var mobileCountryCode = $('#mobileCountryCode').val();
		  if(mobileCountryCode!='' && !mobileCountryCode.indexOf("+") == 0){
			$('#mobileCountryCode').val("+"+mobileCountryCode);
		  }if(mobileCountryCode=='') {
			  $('#mobileCountryCode').val("+84");
		  }
	});
    

	
	$('#isComAddress2').on('ifChecked',function() {
		$(this).attr("checked", true);
		
		$('#addressDiv').show();
		$('#address').rules('remove');
		$('#address').rules('add', {required: true, messages: {required: app.errorMsg.mailAddress}});
		
		$('#comDistrictDiv').show();
		$('#comDistrict2').rules('remove');
		$('#comDistrict2').rules('add', {required: true, messages: {required: app.errorMsg.comDistrict2}});
		
		$('#comRegionDiv').show();
	    $('#comRegion2').rules('remove');
		$('#comRegion2').rules('add', {required: false, messages: {required: app.errorMsg.comRegion2}});
	
		$('#comCityDiv').show();
		$('#comCity2').rules('remove');
		$('#comCity2').rules('add', {required: true, messages: {required: app.errorMsg.comCity2}});
		
		$('#comCountryDiv').show();
		$('#comCountry2').rules('remove');
		$('#comCountry2').rules('add', {required: true, messages: {required: app.errorMsg.comCountry2}});
		
		$('#comPostcodeDiv').show();
		$('#comPostcode2').rules('remove');
		$('#comPostcode2').rules('add', {required: false, messages: {required: app.errorMsg.comPostcode2}});
		
		$('#comAddress2').val('1');
		
	}).on('ifUnchecked',function() {
		$(this).attr("checked", false);
		$('#address').rules('remove');
		$('#address').val('');
		$('#addressDiv').hide();
		
		$('#comDistrict2').rules('remove');
		$('#comDistrict2').val('');
		$('#comDistrictDiv').hide();
		
		$('#comRegion2').rules('remove');
		$('#comRegion2').val('');
		$('#comRegionDiv').hide();
		
		$('#comCity2').rules('remove');
		$('#comCity2').val('');
		$('#comCityDiv').hide();
		
		$('#comCountry2').rules('remove');
		$('#comCountry2').val('');
		$('#comCountryDiv').hide();
	
		$('#comPostcode2').rules('remove');
		$('#comPostcode2').val('');
		$('#comPostcodeDiv').hide();
		
		$('#comAddress2').val('');
	});
	
   	$('#btnGoToHome').on('click', function () {
    	$('#modal_success').modal('hide');
    	location.href= app.base + '/';
    });
    $('#btnCloseWindow').on('click', function () {
        $('#modal_success').modal('hide');
        window.close();
    });
    $('#btnFailedClose').on('click', function () {
        $('#modal_failed').modal('hide');
    });
	
	$('#comEstablishmentDate,#dob').datepicker({
    	format: 'yyyy-mm-dd',
    	weekStart: 1,
        autoclose: true,
		showOtherMonths: true,
		selectOtherMonths: false
    }).css({
    	'background-color': '#fff',
    	'background-image': 'none',
    	'border': '1px solid #ccc'
    }).on('change',function(e){
    	return $(e.target).valid();
    });
		
	$(".form-content .form-group select").select2({
        containerCssClass: 'form-select-container',
        dropdownCssClass: 'form-select-dropdown',
        
    });
	
	$(".form-content .form-group select").on("change select2-blur", function(e) {
		var target = $(e.target);
		target.focusout();  // 失焦触发验证
	});
});

function checkForm() {
	$('#form-tab-header a[href="#tab-personal-info"]').tab('show');
	if(!$('#form-personal-info').valid()) {
		//alert('form-personal-info is valid');
		return false;
	} else {
		//alert('form-personal-info is invalid');
	}
	
	$('#form-tab-header a[href="#tab-company-info"]').tab('show');
	if(!$('#form-company-info').valid()) {
		//alert('form-company-info is valid');
		return false;
	} else {
		//alert('form-company-info is invalid');
	}
	
	$('#form-tab-header a[href="#tab-further-details"]').tab('show');
	if(!$('#form-further-details').valid()) {
		// alert('form-further-details is valid');
		return false;
	} else {
		// alert('form-further-details is invalid');
	}
	
	$('#form-tab-header a[href="#tab-documents"]').tab('show');
	if(!$('#form-documents-hidden').valid()) {
		//alert('form-documents-hidden is valid');
		return false;
	} else {
		//alert('form-documents-hidden is invalid');
	}
	
	$('#form-tab-header a[href="#tab-terms-conditions"]').tab('show');
	if(!$('#form-terms-conditions').valid()) {
		//alert('form-terms-conditions is valid');
		return false;
	} else {
		//alert('form-terms-conditions is invalid');
	}
	return true;
}



function checkFormForInput(){
	$('#form-tab-header a[href="#tab-personal-info"]').tab('show');
	if(!$('#dob').valid()) {
		// alert('form-further-details is valid');
		return false;
	} else {
		// alert('form-further-details is invalid');
	}
	
	if(!$('#idNumber').valid()) {
		// alert('form-further-details is valid');
		return false;
	} else {
		// alert('form-further-details is invalid');
	}
	
	
	if(!$('#workCountryCode').valid()) {
		// alert('form-further-details is valid');
		return false;
	} else {
		// alert('form-further-details is invalid');
	}
	
	
	if(!$('#workPhone').valid()) {
		// alert('form-further-details is valid');
		return false;
	} else {
		// alert('form-further-details is invalid');
	}
	
	
	if(!$('#mobileCountryCode').valid()) {
		// alert('form-further-details is valid');
		return false;
	} else {
		// alert('form-further-details is invalid');
	}
	
	if(!$('#mobilePhone').valid()) {
		// alert('form-further-details is valid');
		return false;
	} else {
		// alert('form-further-details is invalid');
	}
	
	return true;
	
}


function initUploadSettings(fileinput_id) {
	var biztype = $('#file-type-' + fileinput_id).val();
	var url = app.base + '/fileUpload/'+ biztype ;
	//alert(url);
	
	// 在jquery1.9后不支持　msie
	/*
    $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
	$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	*/
	
	var iframe = false; 
	//检查是否为 IE 6-8：
	if (!$.support.leadingWhitespace) {
		iframe = true;
	}

	//初始化，主要是设置上传参数，以及事件处理方法(回调函数)
    $('#' + fileinput_id).fileupload({
        autoUpload: true,//是否自动上传
        url: url,//上传地址
        //forceIframeTransport:iframe,
        maxNumberOfFiles: 1, //文件数量限制
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|pnx|pdf|tif|tip)$/i,
        dataType: 'text',
        done: function (e, data) {//设置文件上传完毕事件的回调函数
        	var retData = data.result.trim();
        	if(retData.startsWith('<!doctype')) {
        		window.location = app.base + '/login';
        		return false;
        	}
        	
            var filelink_id = 'file-link' + '-' + fileinput_id;
            var originalName = data.files[0].name;
            $('#' + filelink_id).html('<a href="' + app.base + '/fileDownload/' + biztype + '/'+data.result+'">' +originalName + '</a>' )
              .css({'width':'100%'}); 
            
            var idx = data.result.indexOf('.');
            if (idx == -1) {
              $('#' + fileinput_id + 'Id').val(data.result);
            } else {
              $('#' +'error' + '-' + fileinput_id+ 'Id').html(''); // 清除错误提示
              $('#' + fileinput_id + 'Id').val(data.result.substring(0, idx));
            }
        },
        fail: function(e,data) {
        	alert(data);
        },
        progressall: function (e, data) {//设置上传进度事件的回调函数
            var progress = parseInt(data.loaded / data.total * 100, 10);
           
            var progess_id = 'progress' + '-' + fileinput_id;
           
            $('#' + progess_id  +' .bar').css({
                'width':100 + '%',
                'background-color':'#00FF00',
                'text-align':'center'
            }).text(100 + '%');
        }
    }).on('fileuploadprocessalways', function (e, data) {
      var currentFile = data.files[data.index];
      if (data.files.error && currentFile.error) {
        alert(currentFile.error);
      }
    });
    
    
    // 在Firefox环境下测试是，发现如果将文件数量限制为1，选择一次文件，
    // 刷新页面之后文件选择按钮会莫名其妙的被加上一个Disabled属性
    $('#' + fileinput_id).find("input:file").removeAttr('disabled');
}

function successSaveOrSubmit(result) {
	//location.href= app.base + '/seller/account/message?message='+result.message;
	if(result.success) {
		if(result.message=='seller.apply.message.successSaved') {
		    $('#modal-success-body').html(app.successSavedMsg);
		} else if(result.message=='seller.apply.message.successUpdated'){
			$('#modal-success-body').html(app.successUpdatedMsg);
		} else if(result.message=='seller.apply.message.successSubmitted') {
		    $('#modal-success-body').html(app.successSubmittedMsg);
		} else {
			$('#modal-success-body').html(result.message);
		}
	    $('#modal_success').modal('show');
		var msgTpl = app.successRedirectMsg;// 'The page will redirect in {timeCount} seconds';
		var redUrl = app.base+'/';
		jump(5,msgTpl,redUrl);
	} else {
		$('#modal-failed-body').html(result.message);
		$('#modal_failed').modal('show');
	}
	
}

function validtorComTime() {
	var d1 = new Date($("#comEstablishmentDate").val().replace(/\-/g, "\/"));
	var d2 = new Date();
	if (d1 >= d2) {
		alert("company establishment date must be before the current date!");
		$("#comEstablishmentDate").val("");
		return false;
	}
	return true;
}

function validtorDob() {
	var d1 = new Date($("#dob").val().replace(/\-/g, "\/"));
	var d2 = new Date();
	if (d1 >= d2) {
		alert("date of birth must be before the current date!");
		$("#dob").val("");
		return false;
	}
	return true;
}

function jump(count, msgTpl, redirectActionUrl) {
	window.setTimeout(function(){  
		count--; 
		if(count > 0) {  
			var timeTipsMsg = msgTpl.replace('{timeCount}',count);
			$('#modal-timetips').html(timeTipsMsg);  
			jump(count, msgTpl, redirectActionUrl);  
		} else {  
			location.href= redirectActionUrl;  
		}  
	}, 1000);
};