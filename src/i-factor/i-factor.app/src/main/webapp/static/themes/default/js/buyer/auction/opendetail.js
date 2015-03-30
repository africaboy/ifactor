$(function() {
	$('#form-bid-info').validate();
	$('#buyeNow').click(
			function(e) {
				var formIds = ['form-invoice-info']
				var formData = MergeFormData(formIds);
				var url = app.base + '/buyer/auction?isCommit=true';
				AjaxPostRequest(url, formData, successSaveOrSubmit);
			});

	$('#makeOffer').click(function(e) {
				if(!checkForm()) {
					return false;
				}
				var formIds = ['form-bid-info']
				var formData = MergeFormData(formIds);
				var url = app.base + '/buyer/auction?isCommit=false';
				AjaxPostRequest(url, formData, successSaveOrSubmit);
			});

	$('#discout').on('change',function() {
        var bestAdv = parseFloat($('#bestBuyerAdv').val());
        var bestInt = parseFloat($('#bestBuyerInt').val());	
		var discount = parseFloat($('#discout').val());
		var interet = parseFloat($('#interet').val());
		var readyToSellAdv = parseFloat($('#readyToSellAdv').val());
		var readyToSellInt = parseFloat($('#readyToSellInt').val());
		
		if(isNaN(bestAdv)){
			if(discount>readyToSellAdv){
				alert("Advance must be less than or equal to desired minimum advance!");
				$("#discout").val("");
				$("#discout").focus();
				return false;
			}
		}else{
			
			if(discount>readyToSellAdv){
				alert("Advance must be less than or equal to desired minimum advance!");
				$("#discout").val("");
				$("#discout").focus();
				return false;
			}
			
			if(discount<bestAdv){
				alert("Advance must be greater than or equal to  the previous buyer's advance!");
				$("#discout").val("");
				$("#discout").focus();
				return false;
			}
			
			if(interet==bestInt){
		      if(discount==bestAdv){
			    alert("Advance must be greater than the previous buyer's advance!");
			    $("#discout").val("");
			    $("#discout").focus();
			    return false;
			  }
		    }
	    }
	});
	

	$('#interet').on('change',function() {
		var bestAdv = parseFloat($('#bestBuyerAdv').val());
		var bestInt = parseFloat($('#bestBuyerInt').val());
		var discount = parseFloat($('#discout').val());
		var interet = parseFloat($('#interet').val());
		var readyToSellAdv = parseFloat($('#readyToSellAdv').val());
		var readyToSellInt = parseFloat($('#readyToSellInt').val());
		
		if(isNaN(bestAdv)){
			if(interet<readyToSellInt){
				alert("Interest must be greater than or equal to desired maximum interest!");
				$("#interet").val("");
				$("#interet").focus();
				return false;
			}
		}else{
			
			if(interet<readyToSellInt){
				alert("Interest must be greater than or equal to desired maximum interest!");
				$("#interet").val("");
				$("#interet").focus();
				return false;
			}
			
			if(interet>bestInt){
				alert("Interest must be less than or equal to the previous buyer's interest!");
				$("#interet").val("");
				$("#interet").focus();
				return false;
			}
			
			if(discount==bestAdv){
			  if(interet==bestInt){
			    alert("Interest must be less than the previous buyer's interest!");
			    $("#interet").val("");
			    $("#interet").focus();
			    return false; 
			  }
		    }
	    }
	});
});

function checkForm() {
	if(!$('#form-bid-info').valid()) {
		//alert('form-terms-conditions is valid');
		return false;
	} else {
		//alert('form-terms-conditions is invalid');
	}
	return true;
}

function successSaveOrSubmit(result) {
	// location.href= app.base +
	// '/seller/account/message?message='+result.message;
	if (result.success) {
		$('#modal-success-body').html(result.message);
		$('#modal_success').modal('show');
	} else {
		$('#modal-failed-body').html(result.message);
		$('#modal_failed').modal('show');
	}
}
