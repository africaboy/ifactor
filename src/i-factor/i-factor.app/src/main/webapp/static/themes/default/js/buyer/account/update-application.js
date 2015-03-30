$(function (){
	$('#submitApplication').click(function(e){
		
		if(!checkForm()){
			return false;
		}
		
		var formIds = ['form-personal-info','form-company-info','form-further-details','form-file-hidden','form-terms-conditions']
		var formData = MergeFormData(formIds);
		var url = app.base + '/buyer/account/update?isCommit=true';
				 
		AjaxPostRequest(url, formData,successSaveOrSubmit);
	}); 
	
	$('#saveApplication').click(function(e){
		
		if(!checkFormForInput()){
			return false;
		}
	
		var formIds = ['form-personal-info','form-company-info','form-further-details','form-file-hidden','form-terms-conditions']
		var formData = MergeFormData(formIds);
		var url = app.base + '/buyer/account/update?isCommit=false';
		
		AjaxPostRequest(url, formData,successSaveOrSubmit);
	});
		
		
	// 初始化上传设置
    initUploadSettings('applicatntFile');
    initUploadSettings('authorizedFile');
    initUploadSettings('signedLetterFile');
    initUploadSettings('taxCodeFile');
    initUploadSettings('companyLicenseFile');
    initUploadSettings('termsAndConditionsFile');
		
	$('#form-personal-info').validate({
		errorPlacement: function (error, element) {
			var dateInputId = element.attr('id');
            if(dateInputId=='dob'|| dateInputId=='workCountryCode' ||dateInputId=='mobileCountryCode') {
            	$('#error'+'-' + dateInputId).html(error);
			} else {
                error.insertAfter(element);
            }
        }
	});
	$('#form-further-details').validate({
		errorPlacement: function (error, element) {
			var dateInputId = element.attr('id');
            if(dateInputId=='comEstablishmentDate' || dateInputId=='authzDob' || dateInputId=='auPhCountryCode' ||  dateInputId=='auMoCountryCode') {
            	$('#error'+'-' + dateInputId).html(error);
			} else {
                error.insertAfter(element);
            }
        }
	});
	$('#form-terms-conditions').validate();	
	$('#form-file-hidden').validate({
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
	
	$('#form-file-hidden input[type=hidden]').bind('change input propertychange', function() {
	    alert($this.val());
	});
	
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
		if($('#checkbox-accept').is(':checked')) {
			$('#submitApplication').attr('disabled',false);
		} else {
			$('#submitApplication').attr('disabled',true);
		}
	}).on('ifUnchecked', function(event){
		//alert(event.type + ' callback');
		$(this).attr("checked", false);
		if($('#checkbox-accept').is(':checked')) {
			$('#submitApplication').attr('disabled',false);
		} else {
			$('#submitApplication').attr('disabled',true);
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
	      if(mobileCountryCode!='' && !mobileCountryCode.indexOf("+") == 0 ){
			$('#mobileCountryCode').val("+"+mobileCountryCode);
		  }if(mobileCountryCode=='') {
	        $('#mobileCountryCode').val("+84");
		  }
	});
     
	$('#auPhCountryCode').on('change',function() {
		var auPhCountryCode = $('#auPhCountryCode').val();
		  if(auPhCountryCode!='' && !auPhCountryCode.indexOf("+") == 0){
			$('#auPhCountryCode').val("+"+auPhCountryCode);
		  }if(auPhCountryCode=='') {
			  $('#auPhCountryCode').val("+84");
		  }
	});
	
	$('#auMoCountryCode').on('change',function() {
		var auMoCountryCode = $('#auMoCountryCode').val();
		  if(auMoCountryCode!='' && !auMoCountryCode.indexOf("+") == 0){
			$('#auMoCountryCode').val("+"+auMoCountryCode);
		  }if(auMoCountryCode=='') {
			  $('#auMoCountryCode').val("+84");
		  }
	});
    
	$('.questions1').each(function() {
	      $(this).rules('add', {required: true, messages: {required: app.errorMsg[this.id]}}); 
	    })
		
			
	$('.questions2').each(function() {
	  $(this).rules('add', {required: true, messages: {required: app.errorMsg[this.id]}});
	})

	

	$('#isComVietnam').on('change',function() {
		if($('#isComVietnam').val()=='No'){
			$('#comRegisteredCountryDiv').show();
		}else{
			$('#comRegisteredCountry').val('');
			$('#comRegisteredCountryDiv').hide();
		}
	});
	
	
	$('#haveEverTradingOther').on('change',function() {
		if($('#haveEverTradingOther').val()=='Yes'){
			$('#whatIsAssetDiv').show();
		}else{
			$('#whatIsAsset').val('');
			$('#whatIsAssetDiv').hide();
		}
	});
	

	$('#areAuthorizedPerson').on('change',function() {
		
		if($('#areAuthorizedPerson').val()=='No'){
			$('#authzTitleDiv').show();
			$('#authzFirstNameDiv').show();
			$('#authzLastNameDiv').show();
			$('#authzEmailDiv').show();
			$('#authzPositonDiv').show();
			$('#authzGenderDiv').show();
			$('#authzDobDiv').show();
			$('#authzNationalityDiv').show();
			$('#authzResidenceCountryDiv').show();
			$('#authzIdTypeDiv').show();
			$('#authzIdNumberDiv').show();
			$('#authzPhoneDiv').show();
			$('#authzMobilePhoneDiv').show();
			
		}else{
			$('#authzTitle').val('');
			$('#authzTitleDiv').hide();
			$('#authzFirstName').val('');
			$('#authzFirstNameDiv').hide();
			$('#authzLastName').val('');
			$('#authzLastNameDiv').hide();
			$('#authzEmail').val('');
			$('#authzEmailDiv').hide();
			$('#authzPositon').val('');
			$('#authzPositonDiv').hide();
			$('#authzGender').val('');
			$('#authzGenderDiv').hide();
			$('#authzDob').val('');
			$('#authzDobDiv').hide();
			$('#authzNationality').val('');
			$('#authzNationalityDiv').hide();
			$('#authzResidenceCountry').val('');
			$('#authzResidenceCountryDiv').hide();
			$('#authzIdType').val('');
			$('#authzIdTypeDiv').hide();
			$('#authzIdNumber').val('');
			$('#authzIdNumberDiv').hide();
			$('#authzPhone').val('');
			$('#authzPhoneDiv').hide();
			$('#authzMobilePhone').val('');
			$('#authzMobilePhoneDiv').hide();
	    }
	});
	
	
	$('#isComAddress2').on('ifChecked',function() {
		$(this).attr("checked", true);
		
		$('#addressDiv').show();
		$('#address').rules('remove');
		$('#address').rules('add', {required: true, messages: {required: app.errorMsg.mailAddress}});
		
		$('#districtDiv').show();
		$('#district2').rules('remove');
		$('#district2').rules('add', {required: true, messages: {required: app.errorMsg.comDistrict2}});
		
		$('#cityDiv').show();
		$('#city2').rules('remove');
		$('#city2').rules('add', {required: true, messages: {required: app.errorMsg.comCity2}});
		
		$('#regionDiv').show();
		$('#region2').rules('remove');
		$('#region2').rules('add', {required: false, messages: {required: app.errorMsg.comRegion2}});
		
		$('#countryDiv').show();
		$('#country2').rules('remove');
		$('#country2').rules('add', {required: true, messages: {required: app.errorMsg.comCountry2}});
		
		$('#postcodeDiv').show();
		$('#postcode').rules('remove');
		$('#postcode').rules('add', {required: false, messages: {required: app.errorMsg.comPostcode2}});
		
		$('#address2').val('1');
		
		
	}).on('ifUnchecked',function() {
		$(this).attr("checked", false);
		$('#address').rules('remove');
		$('#address').val('');
		$('#addressDiv').hide();
		
		$('#region2').rules('remove');
		$('#region2').val('');
		$('#regionDiv').hide();
		
		$('#district2').rules('remove');
		$('#district2').val('');
		$('#districtDiv').hide();
		
		$('#city2').rules('remove');
		$('#city2').val('');
		$('#cityDiv').hide();
		
		$('#country2').rules('remove');
		$('#country2').val('');
		$('#countryDiv').hide();
		
		$('#postcode').rules('remove');
		$('#postcode').val('');
		$('#postcodeDiv').hide();
		
		$('#address2').val('');
	});
	
	
	$(".form-content .form-group select").select2({
        containerCssClass: 'form-select-container',
        dropdownCssClass: 'form-select-dropdown',
        
    });
	
	$(".form-content .form-group select").on("change select2-blur", function(e) {
		var target = $(e.target);
		target.focusout();  // 失焦触发验证
	});
	
	$('#btnGoToHome').on('click', function () {
		$('#modal_success').modal('hide');
		location.href=app.base + '/';
	});
	
	$('#btnCloseWindow').on('click', function () {
		$('#modal_success').modal('hide');
		window.close();
	});
	
	$('#btnFailedClose').on('click', function () {
		$('#modal_failed').modal('hide');
	});
	
	$('#comEstablishmentDate,#dob,#authzDob').datepicker({
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
});


function checkForm(){
	$('#form-tab-header a[href="#tab-personal-info"]').tab('show');
	if(!$('#form-personal-info').valid()) {
		//alert('form-personal-info is valid');
		return false;
	} else {
		//alert('form-personal-info is invalid');
	}
		
	$('#form-tab-header a[href="#tab-further-details"]').tab('show');
	if(!$('#form-further-details').valid()) {
		// alert('form-further-details is valid');
		return false;
	} else {
		// alert('form-further-details is invalid');
	}
	
	$('#form-tab-header a[href="#tab-documents"]').tab('show');
	if(!$('#form-file-hidden').valid()) {
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
	
	
	if(!$('#phone').valid()) {
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
	
	//初始化，主要是设置上传参数，以及事件处理方法(回调函数)
    $('#' + fileinput_id).fileupload({
        autoUpload: true,//是否自动上传
        url: url,//上传地址
        maxNumberOfFiles : 1, //文件数量限制
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
    }).on('fileuploadprocessall', function(e,data) {
    	var progress = parseInt(data.loaded / data.total * 100, 10);
        
        var progess_id = 'progress' + '-' + fileinput_id;
       
        $('#' + progess_id  +' .bar').css({
            'width':100 + '%',
            'background-color':'#00FF00',
            'text-align':'center'
        }).text(100 + '%');
    });
}

function successSaveOrSubmit(result) {
	//location.href= app.base + '/seller/account/message?message='+result.message;
	if(result.success) {
		if(result.message=='buyer.apply.message.successSaved') {
		    $('#modal-success-body').html(app.successSavedMsg);
		} else if(result.message=='buyer.apply.message.successUpdated'){
			$('#modal-success-body').html(app.successUpdatedMsg);
		} else if(result.message=='buyer.apply.message.successSubmitted') {
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
		alert("Company establishment date must be before the current date!");
		$("#comEstablishmentDate").val("");
		return false;
	}
	return true;
}


function validtorDob() {
	var d1 = new Date($("#dob").val().replace(/\-/g, "\/"));
	var d2 = new Date();
	if (d1 >= d2) {
		alert("Date of birth must be before the current date!");
		$("#dob").val("");
		return false;
	}
	return true;
}

function validtorAuthzDob() {
	var d1 = new Date($("#authzDob").val().replace(/\-/g, "\/"));
	var d2 = new Date();
	if (d1 >= d2) {
		alert("Date of birth must be before the current date!");
		$("#authzDob").val("");
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