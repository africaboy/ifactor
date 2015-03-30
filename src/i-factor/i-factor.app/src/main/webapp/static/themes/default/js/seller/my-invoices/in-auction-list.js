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
	
	var formElem = $('#form-main');
	var listform = $('#formQuery');
	formElem.find('.pagination [data-page-number]').click(function() {
      listform.find('[name="pageNumber"]').val($(this).data('pageNumber'));
      listform.submit();
      return false;
    });
});