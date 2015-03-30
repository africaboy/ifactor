var UIAlertDialogApi = function () {
  //make an offer pages
    var handleDialogs = function() {
      $(".dialog_accept_offer").click(function () {
    	var title_make_an_offer_rts = app.titleOfferRts;
    	var str_make_an_offer_rts = app.strOfferRts;
    	var bestBuyerAdv = parseFloat($('#bestAdvance').val());
  		var bestBuyerInt = parseFloat($('#bestInterest').val());
    	var formIds = ['form-bid-info'];
    	var formData = MergeFormData(formIds);
  		var invoiceId = $('#invoiceId').val();
		var url = app.base + '/seller/acceptauction?isCommit=true&invoiceId='+invoiceId;
		if(isNaN(bestBuyerAdv)||isNaN(bestBuyerInt)){
  		 alert(app.noOffer);
  		}
        bootbox.dialog({
          message: str_make_an_offer_rts,
          title: title_make_an_offer_rts,
          buttons: {
            success: {
              label: app.boxBtn1,
              className: "if-btn",
              callback: function() {
            	AjaxPostRequest(url, formData, successSaveOrSubmit);
              }
            },
            danger: {
              label: app.boxBtn2,
              className: "if-btn",
              callback: function() {
                //alert("uh oh, look out!");
              }
            }
          }
        });
      });
      
      $(".dialog_reject_offer").click(function () {
      	var title_make_an_offer_rts = app.titleOfferRts;
      	var str_make_an_offer_rts = app.strOfferRts;
      	var formIds = ['form-bid-info'];
      	var formData = MergeFormData(formIds);
    		var invoiceId = $('#invoiceId').val();
  		var url = app.base + '/seller/rejectauction?invoiceId='+invoiceId;
          bootbox.dialog({
            message: str_make_an_offer_rts,
            title: title_make_an_offer_rts,
            buttons: {
              success: {
                label: app.boxBtn1,
                className: "if-btn",
                callback: function() {
              	AjaxPostRequest(url, formData, successSaveOrSubmit);
                }
              },
              danger: {
                label: app.boxBtn2,
                className: "if-btn",
                callback: function() {
                  //alert("uh oh, look out!");
                }
              }
            }
          });
        });
      
      $('#advanceSelect').on('change',function() {
      	var bestAdv = parseFloat($('#bestBuyerAdv').val());
  		var bestInt = parseFloat($('#bestBuyerInt').val());
  		var discount = parseFloat($('#advanceSelect').val());
  		var interet = parseFloat($('#interestSelect').val());
  		//var discount = parseFloat($('#discout').val());
  		//var interet = parseFloat($('#interet').val());
  		var readyToSellAdv = parseFloat($('#readyToSellAdv').val());
  		var readyToSellInt = parseFloat($('#readyToSellInt').val());
  		
  		if(isNaN(bestAdv)){
  			if(discount>readyToSellAdv){
  				alert(app.advanceTit1);
  				$("#advanceSelect").val("");
  				$("#advanceSelect").focus();
  				return false;
  			}
  		}else{
  			
  			if(discount>readyToSellAdv){
  				alert(app.advanceTit1);
  				$("#advanceSelect").val("");
  				$("#advanceSelect").focus();
  				return false;
  			}
  			
  			if(discount<bestAdv){
  				alert(app.advanceTit2);
  				$("#advanceSelect").val("");
  				$("#advanceSelect").focus();
  				return false;
  			}
  			
  			if(interet==bestInt){
  		      if(discount==bestAdv){
  			    alert(app.advanceTit3);
  			    $("#advanceSelect").val("");
  			    $("#advanceSelect").focus();
  			    return false;
  			  }
  		    }
  	    }
  	});
  	

  	$('#interestSelect').on('change',function() {
  		var bestAdv = parseFloat($('#bestBuyerAdv').val());
  		var bestInt = parseFloat($('#bestBuyerInt').val());
  		var discount = parseFloat($('#advanceSelect').val());
  		var interet = parseFloat($('#interestSelect').val());
  		//var discount = parseFloat($('#discout').val());
  		//var interet = parseFloat($('#interet').val());
  		var readyToSellAdv = parseFloat($('#readyToSellAdv').val());
  		var readyToSellInt = parseFloat($('#readyToSellInt').val());
  		if(isNaN(bestAdv)){
  			if(interet<readyToSellInt){
  				alert(app.interestTit1);
  				$("#interestSelect").val("");
  				$("#interestSelect").focus();
  				return false;
  			}
  		}else{
  			
  			if(interet<readyToSellInt){
  				alert(app.interestTit1);
  				$("#interestSelect").val("");
  				$("#interestSelect").focus();
  				return false;
  			}
  			
  			if(interet>bestInt){
  				alert(app.interestTit2);
  				$("#interestSelect").val("");
  				$("#interestSelect").focus();
  				return false;
  			}
  			
  			if(discount==bestAdv){
  			  if(interet==bestInt){
  			    alert(app.interestTit3);
  			    $("#interestSelect").val("");
  			    $("#interestSelect").focus();
  			    return false; 
  			  }
  		    }
  	    }
  	});
      
    }

    var handleAlerts = function() {
        
        $('#alert_show').click(function(){
            Metronic.alert({
                container: $('#alert_container').val(), // alerts parent container(by default placed after the page breadcrumbs)
                place: $('#alert_place').val(), // append or prepent in container 
                type: $('#alert_type').val(),  // alert's type
                message: $('#alert_message').val(),  // alert's message
                close: $('#alert_close').is(":checked"), // make alert closable
                reset: $('#alert_reset').is(":checked"), // close all previouse alerts first
                focus: $('#alert_focus').is(":checked"), // auto scroll to the alert after shown
                closeInSeconds: $('#alert_close_in_seconds').val(), // auto close after defined seconds
                icon: $('#alert_icon').val() // put icon before the message
            });

        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleDialogs();
            //handleAlerts();
        }
    };

}();

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
		bootbox.dialog({
	        message: app.submitMsg,
	        title: app.submitTitle1
	      });
	      var counter = 5;
	      var interval = setInterval(function() {
	        counter--;
	        $(".bootbox-body").text(app.submitTxt + ' ' + counter + ' '+ app.submitTxt1);
	        if (counter == 0) {
	          clearInterval(interval);
	          window.location.href ='/seller/invoice/dealed';
	        }
	      }, 1000);
	} else {
		/*bootbox.dialog({
	        message: app.failureMsg,
	        title: app.failureTit
	      });*/
		$('#errordiv').show();
	}
}