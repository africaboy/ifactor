/*
 * {'action':true,'message':'error!','data':[ {'number':'1','text1':
 * '3','info1': '4','special1': '5'} ],'columModle':[ {'header':
 * '序号','dataIndex': 'number','width':40}, {'header': '编码','dataIndex':
 * 'text1'}, {'header': '名称','dataIndex': 'info1'}, {'header': '金额','dataIndex':
 * 'special1'} ],'fieldsNames':[{name: 'number'}, {name: 'text1'}, {name:
 * 'info1'}, {name: 'special1'}]}
 * 
 */

/**
 * 在页面中动态初始化查询结果
 * 
 * @param {}
 *            key
 */
function initObjectARGListInPage(key) {
	var url = context + '/system/objectarg.do?method=head';

	Ext.Ajax.request({
		url : url,
		params : {
			querykey : key
		},
		method : 'POST',
		success : function(rs, request) {
			var result = rs.responseText;// 拿到结果集，此时为字符串

			var json = Ext.util.JSON.decode(result);// 将字符串转换为json类型

			if (json.success) {
				var title = json.title;
				var cm = new Ext.grid.ColumnModel(json.columModle);
				var ds = new Ext.data.JsonStore({
							idProperty : 'PAGINATION_NUMBER',
							remoteSort : false,
							totalProperty : 'totalCount',
							root : 'queryList',
							fields : json.fieldsNames,
							proxy : new Ext.data.ScriptTagProxy({
										url : context
												+ '/system/objectarg.do?method=list'
									})
						});

				var grid = new Ext.grid.GridPanel({
							cm : cm,
							ds : ds,
							stripeRows : true,
							title : title,
							region : 'center',
							margins : '1 1 1 1',
							viewConfig : {
								forceFit : true
							},
							border : false,
							// config options for stateful behavior
							stateful : true,
							stateId : 'grid',
							loadMask : {
								msg : "数据加载中，请稍等..."
							},
							tbar : new Ext.Toolbar({
										autoWidth : true,
										autoShow : true,
										items : [{
													iconCls : 'queryobject',
													text : '数据查询'
												}]
									}),
							bbar : new Ext.PagingToolbar({
										pageSize : 20,// 每页显示的记录值
										store : ds,
										displayInfo : true,
										displayMsg : '总记录数 {0} - {1} of {2}',
										emptyMsg : "没有记录"
									})
						});

				ds.load({
							params : {
								start : 0,
								limit : 20
							}
						});

				// grid.render(document.body);

				new Ext.Viewport({
							layout : 'border',
							split : true,
							items : [grid]
						});

			} else {
				Ext.Msg.alert('提示', json.msg);
			}

		},
		failure : function(rs, request) {
			Ext.Msg.alert('提示', '未知的异常错误');
		}
	});
}

/**
 * 
 * @param {}
 *            key
 */
function initObjectARGListInTab(key) {
	var tabid = 'tab_' + key;

	if (!Ext.getCmp(tabid)) {
		var url = context + '/system/objectarg.do?method=head';

		Ext.Ajax.request({
			url : url,
			params : {
				querykey : key
			},
			method : 'POST',
			success : function(rs, request) {
				var result = rs.responseText;// 拿到结果集，此时为字符串

				var json = Ext.util.JSON.decode(result);// 将字符串转换为json类型

				if (json.success) {
					var title = json.title;
					var cm = new Ext.grid.ColumnModel(json.columModle);
					var ds = new Ext.data.JsonStore({
						idProperty : 'PAGINATION_NUMBER',
						remoteSort : false,
						totalProperty : 'totalCount',
						root : 'queryList',
						fields : json.fieldsNames,
						proxy : new Ext.data.ScriptTagProxy({
									url : context
											+ '/system/objectarg.do?method=list'
								})
					});

					var grid = new Ext.grid.GridPanel({
								id : tabid,
								cm : cm,
								ds : ds,
								stripeRows : true,
								title : title,
								region : 'center',
								margins : '1 1 1 1',
								viewConfig : {
									forceFit : true
								},
								border : false,
								// config options for stateful behavior
								stateful : true,
								stateId : 'grid',
								loadMask : {
									msg : "数据加载中，请稍等..."
								},
								tbar : new Ext.Toolbar({
											autoWidth : true,
											autoShow : true,
											items : [{
														iconCls : 'queryobject',
														text : '数据查询'
													}]
										}),
								bbar : new Ext.PagingToolbar({
											pageSize : 20,// 每页显示的记录值
											store : ds,
											displayInfo : true,
											displayMsg : '总记录数 {0} - {1} of {2}',
											emptyMsg : "没有记录"
										})
							});

					ds.load({
								params : {
									start : 0,
									limit : 20
								}
							});
					Ext.getCmp('consoletabs').add(grid);

				} else {
					Ext.Msg.alert('提示', json.msg);
				}

			},
			failure : function(rs, request) {
				Ext.Msg.alert('提示', '未知的异常错误');
			}
		});

	} else {
		Ext.getCmp('consoletabs').setActiveTab(tabid);
	}
}

function renderHeader() {

}
