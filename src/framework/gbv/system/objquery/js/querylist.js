var objectQueryListGrid;
var objectQueryListArea;
var objectQueryListTab;
var objectQueryListStore;
var pageSize = 20;

/**
 * 通用查询list
 * 
 * @param {}
 *            tabid
 * @param {}
 *            areaid
 */
function objectQueryList(tabid) {
	objectQueryListStore = new Ext.data.JsonStore({
				idProperty : 'key',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'queryList',
				fields : ['key', 'name', 'desc', 'purview', 'purviewName',
						'oname', 'object', 'sdate', 'edate', 'session'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/objectquery.do?method=list'
						})
			});

	objectQueryListGrid = new Ext.grid.GridPanel({
				id : tabid,
				store : objectQueryListStore,
				closable : true,
				columns : [{
							header : 'Theme',
							width : 100,
							sortable : true,
							dataIndex : 'name',
							renderer : renderqueryName
						}, {
							header : 'Uniquely Identifies',
							width : 50,
							sortable : true,
							dataIndex : 'key'
						}, {
							header : 'Related Objects',
							width : 50,
							sortable : false,
							dataIndex : 'oname'
						}, {
							header : 'Remarks',
							width : 100,
							sortable : false,
							dataIndex : 'desc'
						}, {
							header : 'Visit Range',
							width : 100,
							sortable : false,
							dataIndex : 'purviewName'
						}, {
							header : 'Session-Related',
							width : 50,
							sortable : false,
							dataIndex : 'session',
							renderer : renderquerySession
						}, {
							header : '',
							width : 50,
							sortable : false,
							dataIndex : 'key',
							renderer : renderqueryTest
						}],
				stripeRows : true,
				autoExpandColumn : 'name',
				title : 'General Query List',
				viewConfig : {
					forceFit : true
				},
				border : false,
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg : "Loading Data,Please Wait..."
				},
				tbar : new Ext.Toolbar({
							autoWidth : true,
							autoShow : true,
							items : [{
										iconCls : 'addquery',
										text : 'Query Definition',
										handler : neuobjquery
									}, '-', {
										id : 'delqueryButton',
										iconCls : 'delquery',
										text : 'Delete Query',
										disabled : true,
										handler : handleDelQuery
									}]
						}),
				bbar : new Ext.Toolbar([{
							iconCls : 'refresh',
							text : 'Refresh',
							handler : function() {
								objectQueryListGrid.getStore().reload();
							}
						}])
			});

	objectQueryListGrid.on('click', function(e) {
				if (objectQueryListGrid.getSelectionModel().hasSelection()) {
					Ext.getCmp('delqueryButton').enable();
				} else {
					Ext.getCmp('delqueryButton').disable();
				}
			});

	objectQueryListGrid.setIconClass('tabs');

	objectQueryListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return objectQueryListGrid;
}

/**
 * render 主题
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @return {}
 */
function renderqueryName(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:editquery(\'{1}\', \'{0}\');">{0}</a></b>',
					value, record.data.key);

	return resultString;
}

/**
 * render 查询会话
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @return {}
 */
function renderquerySession(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	var resultString = value == '0' ? 'Not Relevant' : 'Related';

	return resultString;
}

function renderqueryHandle(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	var resultString = String
			.format(
					'<b><a href="'
							+ context
							+ '/system/object/objectarglist.jsp?querykey={0}&key={1}" target="_blank">查询测试</a></b>',
					value, record.data.object);

	return resultString;
}

/**
 * render 查询测试
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @return {}
 */
function renderqueryTest(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<b><a href="javascript:void(0);" onclick="javascript:initObjectARGListInTab(\'{0}\', \'{1}\');">Query Test</a></b>',
					value, record.data.key);

	return resultString;
}

/**
 * 删除查询定义
 */
function handleDelQuery() {
	if (objectQueryListGrid.getSelectionModel().hasSelection()) {
		Ext.MessageBox.confirm('Hint', 'Confirm The Deletion Object Query Definition?', deletequery);
	} else {
		Ext.Msg.alert('Hint', 'Please Select The Form Object To Be Deleted!');
	}
}

/**
 * 重载查询列表store
 */
function reloadQueryListStore() {
	if (objectQueryListStore) {
		objectQueryListStore.reload();
	}
}

/**
 * 删除查询定义
 * 
 * @param {}
 *            btn
 */
function deletequery(btn) {
	if (btn == 'yes') {
		var ids = "";
		var selectedNodes = objectQueryListGrid.getSelectionModel()
				.getSelections();
		for (var i = 0; i < selectedNodes.length; i++) {
			if (i < selectedNodes.length - 1) {
				ids += selectedNodes[i].data.key + ",";
			} else {
				ids += selectedNodes[i].data.key;
			}
		}

		Ext.Ajax.request({
					url : context + "/system/objectquery.do?method=delete",
					method : 'POST',
					async : false,
					params : {
						ids : ids
					},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert('Hint', 'Delete The Generic Query Failed!');
						} else {
							Ext.Msg.alert('Hint', 'General Query Was Successfully Deleted!');
							reloadQueryListStore();
						}
					}
				})
	}
}