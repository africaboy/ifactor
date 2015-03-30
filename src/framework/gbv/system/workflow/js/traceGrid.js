/**
 * 显示流程监控列表
 * 
 * @param {}
 *            activityId
 */
function getTraceGrid(activityId) {
	alert(activityId);
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : '环节',
				width : 100,
				dataIndex : 'activityName'
			}, {
				header : '状态',
				width : 40,
				dataIndex : 'activityState',
				renderer : renderTraceGridColumn
			}, {
				header : '接收时间',
				width : 80,
				dataIndex : 'startTime',
				renderer : renderTraceGridColumn
			}, {
				header : '完成时间',
				width : 80,
				dataIndex : 'endTime',
				renderer : renderTraceGridColumn
			}, {
				header : '办理人/部门',
				width : 100,
				dataIndex : 'userGroup'
			}, {
				header : 'IP地址',
				width : 60,
				dataIndex : 'ip'
			}]);
	var ds = new Ext.data.JsonStore({
				remoteSort : false,
				root : 'traceList',
				fields : ['activityName', 'activityState', 'startTime',
						'endTime', 'userGroup', 'ip'],
				proxy : new Ext.data.HttpProxy({
							url : context + '/system/flow.do?method=traceJson'
						})
			});

	var grid = new Ext.grid.GridPanel({
				id : 'traceGrid',
				cm : cm,
				ds : ds,
				autoHeight : true,
				autoScroll : true,
				stateful : true,
				stripeRows : true,
				viewConfig : {
					forceFit : true
				},
				border : false,
				frame : false,
				stateId : 'grid',
				loadMask : {
					msg : "数据加载中，请稍等..."
				}
			});

	ds.on('beforeload', function(thiz, options) {
				Ext.apply(thiz.baseParams, {
							id : activityId
						});
			});

	var gridMask = new Ext.LoadMask(Ext.getBody(), {
				msg : '数据加载中，请稍等...'
			});
	gridMask.show();

	ds.load({
				params : {
					id : activityId
				},
				callback : function(records, options, success) {
					gridMask.hide();
				}
			});

	return grid;
}

function renderTraceGridColumn(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	var dataIndex = Ext.getCmp('traceGrid').getColumnModel()
			.getDataIndex(columnIndex);

	if (dataIndex == 'activityState') {
		var state = value;
		if (value == 0) {
			state = "未办理";
		} else if (value == 1) {
			state = "办理中";
		} else if (value == 2) {
			state = "已办理";
		} else if (value == -2) {
			state = "取回";
		} else if (value == -3) {
			state = "退回";
		} else if (value == -4) {
			state = "撤销";
		} else if (value == -1) {
			state = "暂存";
		}

		return state;
	}

	if (dataIndex == 'startTime' || dataIndex == 'endTime') {
		if (value != null) {
			return formatTime(value);
		}
	}

	return value;

}