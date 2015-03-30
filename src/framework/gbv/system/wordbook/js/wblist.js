/**
 * 数据字典列表
 * 
 * @param {}
 *            key
 * @param {}
 *            name
 * @return {}
 */
function wbgridlist(key, ids) {
	// create the data store
	var gridStore = new Ext.data.Store({
				reader : new Ext.data.ArrayReader({}, [ // 如何解析
						{
									name : 'id'
								}, {
									name : 'name'
								}, {
									name : 'desc'
								}, {
									name : 'type'
								}])

			});
	gridStore.proxy = new Ext.data.ScriptTagProxy({
				url : context + '/system/wb.do?method=store&type=' + key
			});

	gridStore.load();

	var sm = new Ext.grid.CheckboxSelectionModel();

	gridStore.on('load', function(store, records, options) {
				var total = gridStore.getCount();// 数据行数

				var arr = [];
				for (var j = 0; j < total; j++) {
					var record = gridStore.getAt(j);
					
					if (ids && ids.indexOf(record.data.id + ',') > -1) {
						arr.push(record);
					}
				}
				sm.selectRecords(arr);
			}, this, {
				delay : 1000
			})

	// Column Model shortcut array
	var cols = [sm, {
				header : "权限描述",
				width : 150,
				sortable : true,
				dataIndex : 'name'
			}, {
				header : "键值",
				width : 100,
				sortable : true,
				dataIndex : 'id'
			}];

	// declare the source Grid
	var wblistgrid = new Ext.grid.GridPanel({
				id : 'wblistgrid',
				ddGroup : 'gridDDGroup',
				store : gridStore,
				border : false,
				columns : cols,
				enableDragDrop : false,
				stripeRows : true,
				autoExpandColumn : 'name',
				sm : sm,
				viewConfig : {
					forceFit : true
				}
			});

	return wblistgrid;
}