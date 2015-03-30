/*
 * ! Ext JS Library 3.1.1 Copyright(c) 2006-2010 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
SampleGrid = function(limitColumns) {

	var columns = [{
				header : "<font class='oaFont'>类别</font>",
				width : 75,
				sortable : true,
				renderer : renderFont,
				dataIndex : 'INS_OBJECT'
			}, {
				header : "<font class='oaFont'>办理环节</font>",
				width : 75,
				sortable : true,
				renderer : renderFont,
				dataIndex : 'S_NAME'
			}, {
				id : 'A_TITLE',
				header : "<font class='oaFont'>文件标题</font>",
				width : 100,
				sortable : true,
				renderer : renderTitle,
				dataIndex : 'A_TITLE'
			}, {
				header : "<font class='oaFont'>接收时间</font>",
				width : 100,
				sortable : true,
				renderer : renderTime,
				dataIndex : 'A_STIME'
			}, {
				header : "<font class='oaFont'>办理状态</font>",
				width : 75,
				sortable : true,
				renderer : renderState,
				dataIndex : 'A_STATE'
			}

	];

	var proxy = new Ext.data.HttpProxy({
				url : context + '/system/flowlist.do?method=pendinglist4Json'
			});
	// create the Data Store
	var store = new Ext.data.JsonStore({
				root : 'list',
				totalProperty : 'totalSize',
				idProperty : 'PAGINATION_NUMBER',
				remoteSort : false,
				fields : ['A_ID', 'A_TITLE', 'PAGINATION_NUMBER', 'A_STIME',
						'A_STATE', 'INS_OBJECT', 'S_NAME'],

				proxy : proxy
			});

	store.load({
				params : {
					start : 0,
					limit : 25
				}
			});

	proxy.on('beforeload', function(proxy, params) {
				params.folderid = this.catId;
			}, this);

	SampleGrid.superclass.constructor.call(this, {
				store : store,
				columns : columns,
				autoExpandColumn : 'A_TITLE',
				height : 480,
				width : 600
			});

}

Ext.extend(SampleGrid, Ext.grid.GridPanel);

function renderTitle(value, cellmeta, record, rowIndex, columnIndex, store) {
	return '<a href="' + context + '/system/flow.do?method=edit&id='
			+ record.data.A_ID + '" class="oaFont">' + value + '</a>';
}

function renderTime(value, cellmeta, record, rowIndex, columnIndex, store) {
	return '<font class="oaFont">' + formatDate(value) + '</font>';
}

function renderFont(value, cellmeta, record, rowIndex, columnIndex, store) {
	return '<font class="oaFont">' + value + '</font>';
}

function renderState(value, cellmeta, record, rowIndex, columnIndex, store) {
	if (value == '0') {
		return '<font class="oaFont">未办理</font>';
	} else if (value == '1') {
		return '<font class="oaFont">办理中</font>';
	}
	if (value == '-1') {
		return '<font class="oaFont">暂存</font>';
	}

	return '';
}