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
