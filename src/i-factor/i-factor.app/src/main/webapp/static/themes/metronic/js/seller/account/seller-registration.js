$(function (){
	$('#submitApplication').click(function(e){
		
		if (!checkForm()) {
			return false;
		}
		var formIds = ['form-main-info'];
		var formData = MergeFormData(formIds);
		var url = app.base + '/seller/register';
		
		AjaxPostRequest(url, formData,successSaveOrSubmit);
	}); 
	
	  $('#form-main-info').validate();

	  $('#form-main-info').validate({
		  errorPlacement: function (error, element) {
			var dateInputId = element.attr('id');
            if(dateInputId=='workCountryCode' || dateInputId=='mobileCountryCode') {
            	$('#error'+'-' + dateInputId).html(error);
            } else {
                error.insertAfter(element);
            }
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
      
      
      $('#fromChannels').on('change',function() {
  		if($('#fromChannels').val()=='Others'){
  		    $('#otherFromChannelsField').show();
  		    $('#otherFromChannelsInput').show();
  		}else{
  		    $('#otherFromChannelsField').hide();
  		    $('#otherFromChannelsInput').hide();
  		}
  	  });
});


function checkForm() {
	if (!$('#form-main-info').valid()) {
		return false;
	}
	return true;
}

function successSaveOrSubmit(result) {
	
	if (result.success) {
		if(result.message=='jcaptcha.invalid') {
			$('#invaliddiv').show();
			$('#emaildiv').hide();
			$('#errordiv').hide();
		} else if(result.message=='buyer.register.message.emailRegistered'){
			$('#emaildiv').show();
			$('#invaliddiv').hide();
			$('#errordiv').hide();
		} else if(result.message=='buyer.register.message.success') {
			location.href=app.base+'/buyer/register/register-success';
		} 
		
	 }else { 
	   $('#errordiv').show();
	   $('#invaliddiv').hide();
	   $('#emaildiv').hide();
	}
	
}
