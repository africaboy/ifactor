// including all common workflow action

function newWorkflowInstance(flow, girdId, title, mode) {
	var workflowOptions = {
		key : flow,
		tabid : gridId + '_startwork',
		title : title,
		tabcontainerid : 'consoletabs',
		displayMode : mode,
		actionSrc : {
			gridId : gridId,
			type : 'tablequery'
		},
		size : {
			width : 1000,
			height : 500
		}
	};

	startWorkflow(workflowOptions);
}

/**
 * restart abandone-instance
 * 
 * @param {}
 *            title
 * @param {}
 *            insId
 * @param {}
 *            actId
 * @param {}
 *            gridId
 */
function restartWorkflowInstance(title, insId, actId, gridId) {
	var options = {
		tabid : gridId + '_' + insId + '_' + actId,
		actId : actId,
		insId : insId,
		title : '草稿' + '(' + formatTime(title) + ')',
		tabcontainerid : 'consoletabs',
		displayMode : 'window',
		actionSrc : {
			gridId : gridId,
			type : 'tablequery'
		},
		size : {
			width : 1000,
			height : 500
		}
	};
	doWorkflow(options);
}

/**
 * delete workflow-instance
 * 
 * @param {}
 *            insId
 * @param {}
 *            gridId
 */
function deleteWorkflowInstance(insId, gridId, msg, aftercall) {
	Ext.MessageBox.confirm('提示', (msg == null ? '确定删除此流程实例？' : msg),
			function(e) {
				if (e == 'yes') {
					Ext.MessageBox.wait('提交删除过程中...');

					Ext.Ajax.request({
						url : context
								+ '/system/flowservice.do?method=deleteInstance',
						params : {
							insId : insId
						},
						method : 'POST',
						success : function(rs, request) {
							// 获取响应的json字符串
							Ext.MessageBox.hide();

							var result = rs.responseText;// 拿到结果集，此时为字符串

							var resultJson = Ext.util.JSON.decode(result);// 将字符串转换为json类型

							if (resultJson.success) {
								reloadTQList(gridId);

								if (aftercall != null) {
									aftercall();
								}
							} else {
								Ext.Msg.alert('提示', resultJson.errorMsg);
							}
						},
						failure : function(rs, request) {
							Ext.MessageBox.show({
										title : '提交删除失败',
										msg : rs.responseText,
										icon : Ext.MessageBox.ERROR
									});
						}
					});

				}
			});
}

/**
 * todo workflow-instance
 * 
 * @param {}
 *            flowKey
 * @param {}
 *            pkId
 * @param {}
 *            gridId
 * @param {}
 *            actId
 * @param {}
 *            tabid
 * @param {}
 *            title
 */
function todoInstance(flowKey, pkId, gridId, actId, tabid, title, mode, width,
		height) {
	var options = {
		actId : actId,
		displayMode : (mode == null ? 'tab' : mode),
		tabid : tabid,
		tabcontainerid : 'consoletabs',
		title : title,
		size : {
			width : (width == null ? 1000 : width),
			height : (height == null ? 600 : height)
		},
		actionSrc : {
			type : 'tablequery',
			gridId : gridId
		}
	}

	if (actId == '' || actId == 0) {
		options.params = {
			key : flowKey,
			PK_ID : pkId
		}
	}

	doWorkflowFromList(options);
}

function renderList4WorkflowAction(dataIndex, value, record, gridId, title) {
	if (dataIndex == 'SP') {
		if (record.data['A_STATE'] == 0 || record.data['A_STATE'] == 1) {
			if (record.data['A_LOCKID'] != ''
					&& record.data['A_LOCKID'] != userId) {
				return '正在办理...';
			} else {
				var pkId = record.data['PK_ID'];
				var actId = record.data['A_ID'];
				var tabId = 'activity_' + record.data['A_ID'];//gridId + '_' + record.data['A_ID'];

				var str = '<a href="javascript:void(0);" onclick="javascript:todoInstance(\'creditflow\', \''
						+ pkId
						+ '\',\''
						+ gridId
						+ '\',\''
						+ actId
						+ '\', \''
						+ tabId + '\', \'' + title + '\');">办理</a>';

				return str;
			}
		} else if (record.data['A_STATE'] == 2) {
			var str = '<a href="javascript:void(0);" onclick="">查阅</a>'
			return str;
		} else {
			return '';
		}
	} else if (dataIndex == 'A_STATE') {
		var actId = record.data['A_ID'];

		if (actId == '' || actId == 0) {
			return '<font color="red">尚未进入流程</a>';
		}

		if (value == -1) {
			return '暂存';
		} else if (value == 0) {
			return '<font color="red">待办</font>';
		} else if (value == 1) {
			return '<font color="orange">办理中</a>';
		} else if (value == 2) {
			return '<font color="blue">已办</a>';
		}

		return value;
	}

	return value;
}

// common tablequery-param-RowClass for workflowlist, partner is
// workflowlist.css
function workflowlistRowClass(record, rowIndex, rowParams, store, gridId,
		options) {
	if (record.data.A_STATE == 0) {
		return 'workflow_activity_0';
	} else if (record.data.A_STATE == 1) {
		return 'workflow_activity_1';
	} else if (record.data.A_STATE == 2) {
		// return 'workflow_activity_2';
	} else if (record.data.INS_STATE == 0) {
		return 'workflow_instance_0';
	} else if (record.data.INS_STATE == 1) {
		return 'workflow_instance_1';
	}
}