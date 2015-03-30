$(function (){
    $('.form-div input[type="checkbox"]').iCheck({
		  handle: 'checkbox'
	});
	
	$('.form-div input').iCheck({
		checkboxClass: 'icheckbox_flat-blue',
		radioClass: 'iradio_flat-blue',
		increaseArea: '20%'
	});
	
  /*  $(".form-content .form-group select").select2({
        containerCssClass: 'form-select-container',
        dropdownCssClass: 'form-select-dropdown',
        
    });
    
    $(".form-content .form-group select").on("change select2-blur", function(e) {
		var target = $(e.target);
		//alert(target.attr('id') + ' '  +e.val);
		target.focusout();  // 失焦触发验证
	});*/
});