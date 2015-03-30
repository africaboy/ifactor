/**
 * 获取数据字典类别combo
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
function getWBTypeComboStore() {
	/* 组级别数据store */
	var store = new Ext.data.Store({
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/wb.do?method=storetype'
						}), // 数据源
				reader : new Ext.data.ArrayReader({}, [ // 如何解析
						{
									name : 'wbtypeid'
								}, {
									name : 'wbtypename'
								}])

			});

	store.on('load', function() {

			});

	var combobox = new Ext.form.ComboBox({
				id : 'wbtypecombo',
				name : 'wbtypecombo',
				fieldLabel : 'wbtypecomboLabel',
				xtype : 'combo',
				selectOnFocus : true,
				emptyText : '请选择字典类别..',
				forceSelection : true,
				triggerAction : 'all',
				valueField : 'wbtypeid', // 提交表单时，下拉框的值
				displayField : 'wbtypename', // 显示在页面上下拉框的值
				editable : false,
				store : store,
				listeners : {
					select : function(combo, record, index) {
						// alert(record.data.id);
						// alert(record.data.name);
						/* 设置combo选择项真正对应的值 */
						// /alert(record.data.wbtypeid);
					}
				}
			});

	return combobox;
}