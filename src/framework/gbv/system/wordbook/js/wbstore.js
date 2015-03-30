var idx = 0;

/**
 * 获取数据字典combo
 * 
 * @param {}
 *            tp 字典类型
 * @param {}
 *            defaultValue 字典项默认值
 * @param {}
 *            comboid combo组件id
 * @param {}
 *            combolabel combo组件label
 * @param {}
 *            returnField combo返回值表单
 * @param {}
 *            comValue 默认值无效比较参数
 * @return {}
 */
function getWBComboStore(tp, defaultValue, comboid, combolabel, returnIdField,
		returnNameField, comValue, allowBlank) {
	var id = comboid + "id";
	var name = comboid + "name";

	/* 组级别数据store */
	var store = new Ext.data.Store({
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/wb.do?method=store&type='
									+ tp + ''
						}), // 数据源
				reader : new Ext.data.ArrayReader({}, [ // 如何解析
						{
									name : id
								}, {
									name : name
								}])

			});

	store.on('load', function() {
				if (defaultValue != null && defaultValue != "") {
					Ext.getCmp(comboid).setValue(defaultValue);
				} else if (Ext.getCmp(returnIdField)
						&& Ext.getCmp(returnIdField).getValue() != comValue) {
					Ext.getCmp(comboid).setValue(Ext.getCmp(returnIdField)
							.getValue());
				}
			});

	var combobox = new Ext.form.ComboBox({
				id : comboid,
				name : comboid,
				fieldLabel : combolabel,
				xtype : 'combo',
				selectOnFocus : true,
				emptyText : grooveTranslator.getLangLabel('common-language',
						'select-emptytext'),
				forceSelection : true,
				triggerAction : 'all',
				valueField : id, // 提交表单时，下拉框的值
				displayField : name, // 显示在页面上下拉框的值
				editable : true,
				allowBlank : (allowBlank == true),
				store : store,
				listeners : {
					select : function(combo, record, index) {
						// alert(record.data.id);
						// alert(record.data.name);
						/* 设置combo选择项真正对应的值 */
						if (Ext.getCmp(returnIdField)) {
							Ext.getCmp(returnIdField)
									.setValue(eval("record.data." + id));
						}
						if (Ext.getCmp(returnNameField)) {
							Ext.getCmp(returnNameField)
									.setValue(eval("record.data." + name));
						}

					},
					blur : function(combo) {
						if (combo.getValue() == '') {
							if (Ext.getCmp(returnIdField)) {
								Ext.getCmp(returnIdField).setValue('');
							}
							if (Ext.getCmp(returnNameField)) {
								Ext.getCmp(returnNameField).setValue('');
							}
						}
					}
				}
			});

	idx++;

	return combobox;
}