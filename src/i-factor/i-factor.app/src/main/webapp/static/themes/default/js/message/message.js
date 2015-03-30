$(function (){
	var formElem = $('#form-main');
	var listform = $('#formQuery');
	formElem.find('.pagination [data-page-number]').click(function() {
      listform.find('[name="pageNumber"]').val($(this).data('pageNumber'));
      listform.submit();
      return false;
    });
});