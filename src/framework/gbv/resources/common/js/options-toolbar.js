

var globalParams = urlToObject(location.href);

var defaultLang = 'en.lang';

var lang = globalParams['lang'] || defaultLang;

Ext.ux.ThemeChange = Ext.extend(Ext.form.ComboBox, {
			editable : false,
			displayField : 'name',
			valueField : 'value',
			typeAhead : true,
			mode : 'local',
			value : lang,
			width : 150,
			readonly : true,
			triggerAction : 'all',
			selectOnFocus : true,
			initComponent : function() {
				var langs = [['中文', 'zh_CN.lang'], ['English', 'en.lang'], ['Vietnamese', 'vn.lang']];
				this.store = new Ext.data.SimpleStore({
							fields : ['name', 'value'],
							data : langs
						});
			},
			initEvents : function() {
				this.on('select', function() {
							var params = urlToObject(location.href);

							if (this.getValue() != params['lang']) {
								params['lang'] = this.getValue();

								var paramStr = jsonToParameters(params);

								location.href = location.href.indexOf('?') > -1
										? (location.href.substring(0,
												location.href.indexOf('?'))
												+ '?' + paramStr)
										: (location.href + '?' + paramStr);
							}
						});
			}
		});

Ext.reg('xthemeChange', Ext.ux.ThemeChange);

// ExtJS language
document.write('<script type="text/javascript" src="' + context + '/resources/ext3/locale/ext-lang-' + lang.substring(0, lang.indexOf('.')) + '.js"></script>');

var grooveTranslator = new GrooveTranslator();

grooveTranslator.load(lang);
