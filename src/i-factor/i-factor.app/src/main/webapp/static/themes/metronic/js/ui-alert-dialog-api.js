var UIAlertDialogApi = function () {

    var title1 = 'Total advance amount to be paid: 2,000,000 VND';
    var str1 = 'Invoice amount * Accepted advance (%)+ Transaction fees = 100,000,000 * 90% + 1,000,000 = 91,000,000';

    var title2 = 'Expected total receivable amount after settlement: 100,000,000 VND  *';
    var str2 = 'Invoice amount * Accepted advance (%) + interest fee** = 100,000,000 * 90% + 10,000,000 = 100,000,000<br/>Note:<br/>* This amount is calculated based on the assumption that the debtor will settle the invoice on time. Late payment interest and transaction fees will be applicable should late settlement occur.<br/>** This amount is caluclated based on the assumption that disbursement will take 2 days';

    var title3 = 'Expected net return after settlement: 9,000,000 VND *                                                                                         ';
    var str3 = '        Interest fee** - Transaction fee = 10,000,000 - 1,000,000 = 9,000,000<br/>Note:<br/>* This amount is calculated based on the assumption that the debtor will settle the invoice on time. Late payment interest and transaction fees will be applicable should late settlement occur.<br/>** This amount is caluclated based on the assumption that disbursement will take 2 days.';
    
    var title4 = 'Invoice ID 111111 has now been overdue for settlement.';
    var str4 = 'The Bank will provide you free collection service until 11/01/2014';

    var title5 = 'Total amount to be received:1,000,000 VND';
    var str5 = '    Invoice amount * Accepted advance (%) + Interest fee + Late payment interest<br/> - Late payment transaction fees = a * b + c + d - e= xxx';

    var title6 = 'Invoice ID xxxx has now been overdue for settlement for more than 30 days. This invoice is completely closed on the platform.';
    var str6 = '    The Seller\'s information has been sent to your registered email and online message for collection purpose.';

    var title7 = 'Exepcted net advance amount to be  received: 8,000,000 VND';
    var str7 = 'Invoice amount * Accepted advance (%)  - Transaction fees = 100,000,000 * 90% - 1,000,000 = 8,000,000';

    var title8 = 'Expected receivable amount after settlement: xxx VND';
    var str8 = 'Settled amount - Invoice amount * Accepted advance (%) - interest fee** = a - b *c - d= xxx <br/>Note:<br/>* This amount is calculated based on the assumption that the debtor will settle the invoice on time. Late payment interest and transaction fees will be applicable should late settlement occur. <br/>** This amount is caluclated based on the assumption that disbursement will take 2 days.';

    var title9 = 'Net advance amount received: 8,000,000 VND';
    var str9 = 'Invoice amount * Accepted advance (%)  - Transaction fees = 100,000,000 * 90% - 1,000,000 = 8,000,000';

    var title10 = 'Expected receivable amount after settlement: xxx VND';
    var str10 = 'Settled amount - Invoice amount * Accepted advance (%) - Interest fee** = x - y - z <br/>Note:<br/>* This amount is calculated based on the assumption that the debtor will settle the invoice on time. Late payment interest and transaction fees will be applicable should late settlement occur.<br/> ** This amount is caluclated based on the disbursement date and expected settlement date';

    var title11 = 'Amount to be received: xxx VND';
    var str11 = 'Settled amount - Invoice amount * Accepted advance (%) - Interest - Late payment interest - Late payment transaction fees = a - b - c - d - e';

    var title12 = 'Please contact your debtor to make the settlement of this invoice as soon as possible. ';
    var str12 = 'If your debtor has make settlement to your bank account or for any reasons, the debtor has settled an amount that is less than the invoice amount, <br/>please make the outstanding settlement as soon as possible. Deadline: mm/dd/yyyy';

    var title13 = ' ';
    var str13 = 'This record has now been closed. We will provide your information to the Buyer for collection purpose. ';

  //make an offer pages
    var title_make_an_offer_rts ='Please confirm that you would like to accept the ready-to-sell price of invoice ID 1234556:';
    var str_make_an_offer_rts='<ul><li>Invoice amount:  100,000,000 VND</li><li>Advance (%): 90%</li><li>Interest (%): 10%x</li></ul>';
    var title_make_an_offer ='Please confirm that you would like to make the following offer for the invoice ID 1234556:';
    var str_make_an_offer='<ul><li>Invoice amount:  100,000,000 VND</li><li>Advance (%): 90%</li><li>Interest (%): 14%x</li></ul>';

   // accept an offer page

  //new invoice upload
    var str_new_invoice_upload ='<ul><li>Invoice amount:  50,000,000 VND</li><li>Ready-to-sell Advance (%): 90%</li><li>Ready-to-sell Interest (%): 15%x</li></ul>';
    var title_new_invoice_upload ='Please confirm that you would like to submit the invoice';
  //submit application
    var  str_submit_application = 'Please confirm that you would like to submit your application.';
    var title_submit_application = 'Submit application';
    
    var handleDialogs = function() {

        $(".dialog_total").click(function () {
                bootbox.dialog({
                    message:str1,
                    title: title1
                });
        });

        $(".dialog_amount").click(function () {
            bootbox.dialog({
                message: str2,
                title: title2
            });
        });
        $(".dialog_settlement").click(function () {
            bootbox.dialog({
                message: str3,
                title: title3
            });
        });

        $(".dialogbuyersettlement").click(function () {
            bootbox.dialog({
                message: str4,
                title: title4
            });
        });
        $(".dialogbuyersettlementtotal").click(function () {
            bootbox.dialog({
                message: str5,
                title: title5
            });
        });

        $(".dialogbuyerfinal").click(function () {
            bootbox.dialog({
                message: str6,
                title: title6
            });
        });


        $(".dialog_exepctednet").click(function () {
            bootbox.dialog({
                message: str7,
                title: title7
            });
        });
        $(".dialog_exepcted_re").click(function () {
            bootbox.dialog({
                message: str8,
                title: title8
            });
        });

        $(".dialog_net_advance").click(function () {
            bootbox.dialog({
                message: str9,
                title: title9
            });
        });

        $(".dialog_10").click(function () {
            bootbox.dialog({
                message: str10,
                title: title10
            });
        });

        $(".dialog_11").click(function () {
            bootbox.dialog({
                message: str11,
                title: title11
            });
        });

        $(".dialog_12").click(function () {
            bootbox.dialog({
                message: str12,
                title: title12
            });
        });

        $(".dialog_13").click(function () {
            bootbox.dialog({
                message: str13,
                title: title13
            });
        });
      $(".dialog_make_offer_rts").click(function () {
        bootbox.dialog({
          message: str_make_an_offer_rts,
          title: title_make_an_offer_rts,
          buttons: {
            success: {
              label: "Confirm",
              className: "if-btn",
              callback: function() {
                bootbox.dialog({
                  message: 'System is driving you back to "Auction in the Market - Open Auctions" in 5 seconds',
                  title: 'You have made an "Buy now" offer successfully!'
                });
                var counter = 5;
                var interval = setInterval(function() {
                  counter--;
                  $(".bootbox-body").text('System is driving you back to "Auction in the Market - Open Auctions" in ' + counter + ' seconds');
                  if (counter == 0) {
                    clearInterval(interval);
                    window.location.href ='b_open_auction_market1.html';
                  }
                }, 1000);
              }
            },
            danger: {
              label: "Cancel",
              className: "if-btn",
              callback: function() {
                //alert("uh oh, look out!");
              }
            }
          }
        });
      });

      $(".dialog_make_offer").click(function () {
        bootbox.dialog({
          message: str_make_an_offer,
          title: title_make_an_offer,
          buttons: {
            success: {
              label: "Confirm",
              className: "if-btn",
              callback: function() {
                bootbox.dialog({
                  message: 'System is driving you back to "My Bid - Open Auctions" in 5 seconds',
                  title: 'You have made an offer successfully!'
                });
                var counter = 5;
                var interval = setInterval(function() {
                  counter--;
                  $(".bootbox-body").text('System is driving you back to "My Bid - Open Auctions" in ' + counter + ' seconds');
                  if (counter == 0) {
                    clearInterval(interval);
                    window.location.href ='b_mybid_open_auction.html';
                  }
                }, 1000);
              }
            },
            danger: {
              label: "Cancel",
              className: "if-btn",
              callback: function() {
                //alert("uh oh, look out!");
              }
            }
          }
        });
      });
      // accept offer
      $(".dialog_accept_offer").click(function () {
    	var title_accept_an_offer_rts =app.titleOfferRts;
    	var str_accept_an_offer_rts=app.strOfferRts;
    	var bestBuyerAdv = parseFloat($('#bestAdvance').val());
  		var bestBuyerInt = parseFloat($('#bestInterest').val());
    	var formIds = ['form-bid-info'];
    	var formData = MergeFormData(formIds);
  		var invoiceId = $('#invoiceId').val();
		var url = app.base + '/seller/acceptauction?isCommit=true&invoiceId='+invoiceId;
  		if(isNaN(bestBuyerAdv)||isNaN(bestBuyerInt)){
  			alert(app.noOffer);
  		}else{
        bootbox.dialog({
          message: str_accept_an_offer_rts,
          title: title_accept_an_offer_rts,
          buttons: {
            success: {
              label: "Confirm",
              className: "if-btn",
              callback: function() {
                AjaxPostRequest(url, formData, successSaveOrSubmit);
                bootbox.dialog({
                  message: 'System is driving you back to "My invoices - Dealed Auctions" in 5 seconds',
                  title: 'You have accepted an offer successfully!'
                });
                var counter = 5;
                var interval = setInterval(function() {
                  counter--;
                  $(".bootbox-body").text('System is driving you back to "My invoices - Dealed Auctions" in ' + counter + ' seconds');
                  if (counter == 0) {
                    clearInterval(interval);
                    window.location.href ='/seller/invoice/dealed';
                  }
                }, 1000);
              }
            },
            danger: {
              label: "Cancel",
              className: "if-btn",
              callback: function() {
                //alert("uh oh, look out!");
              }
            }
          }
        });
  	   }
      });
      // reject offer
      $(".dialog_reject_offer").click(function () {
    	var title_reject_an_offer = app.titleOfferRts;
        var str_reject_an_offer = app.strOfferRts;
        var bestBuyerAdv = parseFloat($('#bestAdvance').val());
   		var bestBuyerInt = parseFloat($('#bestInterest').val());
        var formIds = ['form-bid-info'];
      	var invoiceId = $('#invoiceId').val();
      	if(isNaN(bestBuyerAdv)||isNaN(bestBuyerInt)){
  			alert(app.noOffer);
  		}else{
        bootbox.dialog({
          message: str_reject_an_offer,
          title: title_reject_an_offer,
          buttons: {
            success: {
              label: "Confirm",
              className: "if-btn",
              callback: function() {
                bootbox.dialog({
                  message: 'System is driving you back to "My invoices - Invoices In Auction" in 5 seconds',
                  title: 'You have accepted an offer successfully!'
                });
                var counter = 5;
                var interval = setInterval(function() {
                  counter--;
                  $(".bootbox-body").text('System is driving you back to "My invoices -Invoices In Auction" in ' + counter + ' seconds');
                  if (counter == 0) {
                    clearInterval(interval);
                    window.location.href ='/seller/invoice/in-auction';
                  }
                }, 1000);
              }
            },
            danger: {
              label: "Cancel",
              className: "if-btn",
              callback: function() {
                //alert("uh oh, look out!");
              }
            }
          }
        });
  	   }
      });
      
      //new invoice upload
      $(".dialog_new_invoice").click(function () {
        bootbox.dialog({
          message: str_new_invoice_upload,
          title: title_new_invoice_upload,
          buttons: {
            success: {
              label: "Confirm",
              className: "if-btn",
              callback: function() {
                bootbox.dialog({
                  message: 'System is driving you back to "My Invoices - Invoice Approval Status" in 5 seconds',
                  title: 'Your invoice has been submitted successfully!'
                });
                var counter = 5;
                var interval = setInterval(function() {
                  counter--;
                  $(".bootbox-body").text('System is driving you back to "My Invoices - Invoice Approval Status" in ' + counter + ' seconds');
                  if (counter == 0) {
                    clearInterval(interval);
                    window.location.href ='s_myinvoice_approval_status.html';
                  }
                }, 1000);
              }
            },
            danger: {
              label: "Cancel",
              className: "if-btn",
              callback: function() {
                //alert("uh oh, look out!");
              }
            }
          }
        });
      });
      //submit application
      $(".seller-button-submit").click(function () {
        bootbox.dialog({
          message: str_submit_application,
          title: title_submit_application,
          buttons: {
            success: {
              label: "Confirm",
              className: "if-btn",
              callback: function() {
                bootbox.dialog({
                  message: 'System is driving you back to "View Application status" page in 5 seconds',
                  title: 'Thank you. Your application has been successfully submitted.'
                });
                var counter = 5;
                var interval = setInterval(function() {
                  counter--;
                  $(".bootbox-body").text('System is driving you back to "View Application status" page in ' + counter + ' seconds');
                  if (counter == 0) {
                    clearInterval(interval);
                    window.location.href ='s_vew_application.html';
                  }
                }, 1000);
              }
            },
            danger: {
              label: "Cancel",
              className: "if-btn",
              callback: function() {
                //alert("uh oh, look out!");
              }
            }
          }
        });
      });
        //    //end #demo_7

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
	          window.location.href ='/seller/invoice/in-auction';
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