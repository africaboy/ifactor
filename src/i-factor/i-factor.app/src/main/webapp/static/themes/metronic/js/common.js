function AjaxPostRequest(actionUrl, actionParameters, successFunction) {
    $.ajax({
        type: 'POST',
        url: actionUrl,
        success: successFunction,
        error: AjaxError,
        data: actionParameters,
        async: false
    });
 }

function AjaxError(e) {
  var i = 0;
   //ShowMessage(resouces.ErrorText);
}

function MergeFormData(formIdArray) {
	var formData = '';
	formData += $('#'+ formIdArray[0]).serialize();
	for(var i=1;i<formIdArray.length;i++) {
		formData += '&' + $('#'+ formIdArray[i]).serialize();
	}
	return formData;
}