/**
 * 初始化工作流程待办列表
 * 
 * @param {}
 *            options
 */
function initTodoListTab(options) {
	initTodoList(options, 'tab');
}

/**
 * 初始化工作流程待办列表
 * 
 * @param {}
 *            options
 */
function initTodoListWindow(options) {

	initTodoList(options, 'window');
}

/**
 * 初始化工作流程待办列表
 * 
 * @param {}
 *            options
 */
function initTodoList(options, todoMode) {
	var pageSize = options.pageSize ? options.pageSize : 20;

	var store = new Ext.data.JsonStore({
				idProperty : 'PAGINATION_NUMBER',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'queryList',
				fields : ['A_ID', 'A_TITLE', 'PAGINATION_NUMBER', 'LS_NAME',
						'SENDER_NAME', 'SENDERGROUP_NAME', 'LS_ETIME',
						'A_STIME', 'A_STATE', 'INS_OBJECT', 'S_NAME', 'INS_ID'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/flowlist.do?method=pendinglist4Json'
						})
			});

	var grid = new Ext.grid.GridPanel({
				id : options.tabid,
				store : store,
				closable : true,
				columns : [new Ext.grid.RowNumberer(), {
					id : 'A_TITLE',
					header : 'The matters',
					width : 150,
					sortable : true,
					dataIndex : 'A_TITLE',
					renderer : function(value, cellmeta, record, rowIndex,
							columnIndex, store) {
						return '<a href="javascript:todoMyWork(\''
								+ record.data['INS_ID'] + '\',\''
								+ record.data['A_ID'] + '\', \'' + value
								+ '\', \'' + options.tabid + '\', \''
								+ options.tabcontainerid + '\', \'' + todoMode
								+ '\');" title="Click on to deal with">' + value + '</a>';
					}
				}, {
					header : 'receiving time',
					width : 100,
					sortable : true,
					dataIndex : 'A_STIME',
					renderer : function(value) {
						return formatTime(value);
					}
				}, {
					header : 'The current conduction link',
					width : 70,
					sortable : true,
					dataIndex : 'S_NAME'
				}, {
					header : 'To handle the state',
					width : 75,
					sortable : true,
					dataIndex : 'A_STATE',
					renderer : function(value) {
						if (value == '0') {
							return '<font color="red">To be handled</font>';
						} else if (value == '1') {
							return '<font color="blue">dealt with in</font>';
						} else if (value == '2') {
							return 'Already dealt with';
						}
					}
				}, {
					header : 'previous step',
					width : 70,
					sortable : true,
					dataIndex : 'LS_NAME'
				}, {
					header : 'deal with people',
					width : 70,
					sortable : true,
					dataIndex : 'SENDER_NAME'
				}, {
					header : 'department',
					width : 100,
					sortable : true,
					dataIndex : 'SENDERGROUP_NAME'
				}],
				stripeRows : true,
				autoExpandColumn : 'A_TITLE',
				title : options.title,
				tabTip : options.title,
				border : false,
				viewConfig : {
					forceFit : true
				},
				// config options for stateful behavior
				stateful : true,
				stateId : 'grid',
				loadMask : {
					msg: "data loading, please wait..."
				},
				bbar : new Ext.PagingToolbar({
							pageSize : pageSize,// 每页显示的记录值
							store : store,
							displayInfo : true,
							displayMsg : 'total number of records is {0} - {1} of {2}',
							EmptyMsg: "no record"
						})
			});

	grid.setIconClass('tabs');

	store.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	Ext.getCmp(options.tabcontainerid).add(grid);

	Ext.getCmp(options.tabcontainerid).setActiveTab(grid);
}

function reloadWorkflowList(gridId) {
	if (Ext.getCmp(gridId)) {
		var queryParams = {};

		Ext.getCmp(gridId).getStore().reload({
					params : queryParams
				});
	}
}

/**
 * 
 * @param {}
 *            actId
 * @param {}
 *            gridId
 */
function todoMyWork(insId, actId, actName, gridId, tabcontainerid, todoMode) {
	doWorkflow({
				insId : insId,
				actId : actId,
				grid : gridId,
				tabid : gridId + '_' + actId,
				tabcontainerid : tabcontainerid,
				title : actName,
				todoMode : todoMode
			});
}