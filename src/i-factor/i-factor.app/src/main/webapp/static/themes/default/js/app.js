+function($, app) { "use strict";

  $.fn.appGrid = function(options) {

    options = $.extend({}, $.fn.appGrid.defaults, options);

    return this.each(function() {
      render($(this), options);
    });
  };

  $.fn.appGrid.defaults = {
    formSelector: 'form[name="listform"]',
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue'
  };

  function render(elem, options) {
    //
    // 选中
    //
    elem.find('input[type="checkbox"]').iCheck({
        checkboxClass: options.checkboxClass,
        radioClass: options.radioClass
    });
    elem.find('input[data-action="chk-all"]').on('ifUnchecked', function(event) {
        elem.find('input[type="checkbox"]').iCheck('uncheck');
    });
    elem.find('input[data-action="chk-all"]').on('ifChecked', function(event) {
        elem.find('input[type="checkbox"]').iCheck('check');
    });

    //
    // 翻页
    //
    var listform = elem.find(options.formSelector);
    elem.find('.pagination [data-page-number]').click(function() {
      listform.find('[name="pageNumber"]').val($(this).data('pageNumber'));
      listform.submit();
      return false;
    });
  }

}(window.jQuery, window.app);


function changeCss(str) { 	
    $('link').each(function(i) {
    	var cssHref=$(this).attr('href'); //取得skin的css链接
    	//cssHref=cssHref.replace(/theme[/S]*/g,str);   //把原来路径的替换成我们自己的str 
        cssHref = cssHref.replace(/themes\/[\w+]*/g, 'themes\/' + str  );
    	cssHref=$(this).attr('href',cssHref);      //改变href属性其实这里已经完成 
    });
    
    $.cookie('if_css_skin','', {expires:-1}); // 删除之前 cookie
    $.cookie("if_css_skin",str,{path:'/',expires:10}) ;  //记录cookie 10天,防止刷新就回到原来的css路径 
}

$(function(){
	//如果cookie不为空的时候就读取cookie的路径 
	if($.cookie("if_css_skin")!=null) { 
		changeCss($.cookie("if_css_skin")); 
	} 
	
	$('#defaultTheme').on('click', function(){
		changeCss('default');
	});
	
	$('#blueTheme').on('click', function(){
		changeCss('blue');
	});
});
