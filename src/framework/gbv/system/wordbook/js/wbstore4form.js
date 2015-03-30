/**
 * 获取数据字典combox
 * <p>用于将combox组件添加到自定义的form域中</p>
 * @param {} tp
 * @param {} defaultValue
 * @param {} comboid
 * @param {} combolabel
 * @param {} returnIdField
 * @param {} returnNameField
 * @param {} comValue
 * @param {} allowBlank
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
		        if(defaultValue != null && defaultValue != ""){
				    Ext.getCmp(comboid).setValue(defaultValue);
		        }else if(document.getElementById(returnIdField) && document.getElementById(returnIdField).value != comValue){
		        	Ext.getCmp(comboid).setValue(document.getElementById(returnIdField).value);
		        }
			});

	var combobox = new Ext.form.ComboBox({
				id : comboid,
				name : comboid,
				fieldLabel : combolabel,
				xtype : 'combo',
				selectOnFocus : true,
				emptyText : '请选择..',
				forceSelection : true,
				triggerAction : 'all',
				valueField : id, // 提交表单时，下拉框的值
				displayField : name, // 显示在页面上下拉框的值
				editable : false,
				allowBlank : (allowBlank == true),
				store : store,
				listeners : {
					select : function(combo, record, index) {
						// alert(record.data.id);
						// alert(record.data.name);
						/* 设置combo选择项真正对应的值 */
						if (document.getElementById(returnIdField)) {
							document.getElementById(returnIdField).value = eval("record.data." + id);
						}
						if (document.getElementById(returnNameField)) {
							document.getElementById(returnNameField).value = eval("record.data." + name);
						}

					}
				}
			});

	return combobox;
}