	$(function (){
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
		
		
		
		
		$('#isComAddress2').on('ifChecked',function() {
			$(this).attr("checked", true);
			
			$('#addressDiv').show();
			$('#address').rules('remove');
			$('#address').rules('add', {required: true, messages: {required: 'Please enter mailing address'}});
			
			$('#districtDiv').show();
			$('#district2').rules('remove');
			$('#district2').rules('add', {required: true, messages: {required: 'Please enter district'}});
			
			$('#cityDiv').show();
			$('#city2').rules('remove');
			$('#city2').rules('add', {required: true, messages: {required: 'Please enter city'}});
			
			$('#regionDiv').show();
			$('#region2').rules('remove');
			$('#region2').rules('add', {required: false, messages: {required: 'Please enter Region'}});
			
			$('#countryDiv').show();
			$('#country2').rules('remove');
			$('#country2').rules('add', {required: true, messages: {required: 'Please enter country'}});
			
			$('#postcodeDiv').show();
			$('#postcode').rules('remove');
			$('#postcode').rules('add', {required: true, messages: {required: 'Please enter postcode'}});
			
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
			//alert(target.attr('id') + ' '  +e.val);
			target.focusout();  // 失焦触发验证
		});
	});

	
