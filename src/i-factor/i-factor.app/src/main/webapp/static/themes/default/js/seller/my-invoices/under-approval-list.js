$(function (){
    $('.form-div input[type="checkbox"]').iCheck({
    	handle: 'checkbox'
	});
	
	$('.form-div input').iCheck({
		checkboxClass: 'icheckbox_flat-blue',
		radioClass: 'iradio_flat-blue',
		increaseArea: '20%'
	});
	


	//设置偶数行和奇数行颜色
	$('.table').find('tr:even').css('background-color','#e3e3e3');
	$('.table').find('tr:odd').css('background-color', '#f4f4f4');

	//鼠标移动隔行变色hover用法关键
	$('.table').find('tr:not(:first)').hover(function () {
		$(this).attr('bColor', $(this).css('background-color')).css('background-color', '#e9e9e9').css('cursor', 'pointer');
	}, function () {
		$(this).css('background-color', $(this).attr('bColor'));
	});
	
	$('#th-cboi a').tooltip({});
	
    $(".form-content .form-group select").select2({
        containerCssClass: 'form-select-container',
        dropdownCssClass: 'form-select-dropdown',
        
    });
    
    $(".form-content .form-group select").on("change select2-blur", function(e) {
		var target = $(e.target);
		//alert(target.attr('id') + ' '  +e.val);
		target.focusout();  // 失焦触发验证
	});
	
	var formElem = $('#form-main');
	var listform = $('#formQuery');
	formElem.find('.pagination [data-page-number]').click(function() {
      listform.find('[name="pageNumber"]').val($(this).data('pageNumber'));
      listform.submit();
      return false;
    });
});