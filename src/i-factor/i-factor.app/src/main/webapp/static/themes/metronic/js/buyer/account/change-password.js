
$(function (){
	$('#submitApplication').click(function(e){
		
		if (!checkForm()) {
			return false;
		}
		
		var formIds = ['myForm'];
		var formData = MergeFormData(formIds);
		var url = app.base + '/buyer/password/update';
		
		AjaxPostRequest(url, formData,successSaveOrSubmit);
	}); 
	
	$('#myForm').validate();
});



function checkForm() {
	if (!$('#myForm').valid()) {
		return false;
	}
	return true;
}


function successSaveOrSubmit(result) {
	
	 if(result.success) { 
		if(result.message=='change.password.message.success'){
		  $('#successdiv').show();
		  $('#errordiv').hide();
		  $('#error-pwd').hide();
		}else if(result.message=='change.password.message.currentpwd.incorrect'){
		  $('#error-pwd').show();
		  $('#errordiv').hide();
		  $('#successdiv').hide();
		}
		
	 }else { 
	  $('#errordiv').show();
	  $('#successdiv').hide();
	  $('#error-pwd').hide();
	}
	
}

