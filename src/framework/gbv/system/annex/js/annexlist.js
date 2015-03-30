var annexListTabId;

/**
 * 附件信息list
 * 
 * @param {}
 *            tabid
 * @param {}
 *            areaid
 */
function annexlist(tabid) {
	annexListTabId = tabid;

	var qname;
	var qtype;

	var menu = new Ext.menu.Menu({
				id : 'annexQuery',
				style : {
					overflow : 'visible' // For the Combo popup
				},
				items : [new Ext.FormPanel({
							id : 'annexQueryForm',
							labelWidth : 75, // label settings here cascade
							// unless
							// overridden
							frame : true,
							bodyStyle : 'padding:5px 5px 0',
							width : 350,
							defaults : {
								width : 230
							},
							defaultType : 'textfield',
							items : [{
										fieldLabel : grooveTranslator.getLangLabel('annex-language',
					'query-object'),
										id : 'qname',
										name : 'qname'
									}, {
										fieldLabel : grooveTranslator.getLangLabel('annex-language',
					'query-type'),
										id : 'qtype',
										name : 'qtype'
									}],
							buttons : [{
								id : 'annexQueryButton',
								text : grooveTranslator.getLangLabel('common-language',
					'query'),
								handler : function() {
									qname = Ext.getCmp('qname').getValue();
									qtype = Ext.getCmp('qtype').getValue();

									annexListStore.reload({
												params : {
													start : 0,
													limit : pageSize,
													qname : qname,
													qtype : qtype
												}
											});

									Ext.getCmp('annexQuery').hide.defer(0, Ext
													.getCmp('annexQuery'),
											[true]);
								}
							}, {
								id : 'annexResetButton',
								text : grooveTranslator.getLangLabel('common-language',
					'reset'),
								handler : function() {
									Ext.getCmp('annexQueryForm').form.reset();
								}
							}]
						})]
			});

	var toolbar = new Ext.Toolbar({
				id : 'toolbar',
				autoWidth : true,
				autoShow : true
			});

	toolbar.add({
		iconCls : 'query',
		text : grooveTranslator.getLangLabel('common-language',
					'query'),
		menu : menu
			// assign menu by instance
		});

	var annexListStore = new Ext.data.JsonStore({
				idProperty : 'XSYSTEM_ANNEX_ID',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'annexList',
				fields : ['XSYSTEM_ANNEX_ID', 'ANNEX_NAME', 'ANNEX_FOLDER',
						'ANNEX_PATH', 'ANNEX_STYLE', 'FK_ANNEX_ID',
						'ANNEX_OBJECT', 'ANNEX_OBJECT_FIELD', 'ANNEX_LOCATION',
						'VD'],

				// load using script tags for cross domain, if the data in on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context + '/system/annex.do?method=list'
						})
			});

	/* 设置自定义参数 */
	annexListStore.on('beforeload', function(thiz, options) {
				Ext.apply(thiz.baseParams, {
							qname : qname,
							qtype : qtype
						});
			});

	var annexListGrid = new Ext.grid.GridPanel({
		id : tabid,
		store : annexListStore,
		closable : true,
		columns : [{
			header : grooveTranslator.getLangLabel('annex-language', 'list-id'),
			width : 75,
			sortable : true,
			dataIndex : 'XSYSTEM_ANNEX_ID'
		}, {
			header : grooveTranslator.getLangLabel('annex-language',
					'list-name'),
			width : 75,
			sortable : true,
			dataIndex : 'ANNEX_NAME'
		}, {
			header : grooveTranslator.getLangLabel('annex-language',
					'list-type'),
			width : 75,
			sortable : false,
			dataIndex : 'ANNEX_STYLE'
		}, {
			header : grooveTranslator.getLangLabel('annex-language',
					'list-folder'),
			width : 75,
			sortable : false,
			dataIndex : 'ANNEX_FOLDER'
		}, {
			header : grooveTranslator.getLangLabel('annex-language',
					'list-path'),
			width : 75,
			sortable : true,
			dataIndex : 'ANNEX_PATH'
		}, {
			header : grooveTranslator
					.getLangLabel('annex-language', 'list-fid'),
			width : 75,
			sortable : true,
			dataIndex : 'FK_ANNEX_ID'
		}, {
			header : grooveTranslator.getLangLabel('annex-language',
					'list-fobject'),
			width : 75,
			sortable : true,
			dataIndex : 'ANNEX_OBJECT'
		}, {
			header : grooveTranslator.getLangLabel('annex-language',
					'list-input'),
			width : 75,
			sortable : true,
			dataIndex : 'ANNEX_OBJECT_FIELD'
		}, {
			header : grooveTranslator.getLangLabel('annex-language',
					'list-location'),
			width : 75,
			sortable : true,
			dataIndex : 'ANNEX_LOCATION'
		}, {
			header : grooveTranslator.getLangLabel('annex-language',
					'list-relation'),
			width : 75,
			sortable : false,
			dataIndex : 'VD',
			renderer : renderAnnexRow
		}],
		stripeRows : false,
		autoExpandColumn : 'ANNEX_NAME',
		title : grooveTranslator.getLangLabel('annex-language', 'list-title'),
		border : false,
		viewConfig : {
			forceFit : true,
			sortAscText : grooveTranslator.getLangLabel('common-language',
					'list-asc'),
			sortDescText : grooveTranslator.getLangLabel('common-language',
					'list-desc'),
			getRowClass : function(record, rowIndex, rowParams, store) {
				if (record.data.VD == '-1') {
					return 'row0';
				} else if (record.data.VD == '0') {
					return 'row1';
				}
			}
		},

		// config options for stateful behavior
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : grooveTranslator.getLangLabel('common-language',
					'list-loading')
		},
		tbar : toolbar,
		bbar : new Ext.PagingToolbar({
					pageSize : pageSize,// 每页显示的记录值
					store : annexListStore,
					displayInfo : true,
					displayMsg : grooveTranslator.getLangLabel(
							'common-language', 'list-displaymsg'),
					emptyMsg : grooveTranslator.getLangLabel('common-language',
							'list-emptymsg')
				})
	});

	annexListGrid.setIconClass('tabs');

	annexListStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	return annexListGrid;
}

function renderAnnexRow(value, cellmeta, record, rowIndex, columnIndex, store) {
	if (value == '-1') {
		return grooveTranslator.getLangLabel('annex-language',
				'annex-uncertain')
				+ ' <a href="javascript:void(0);" onclick="javascript:deleteAnnex(\''
				+ record.data.XSYSTEM_ANNEX_ID
				+ '\', reloadAnnexGrid);">'
				+ grooveTranslator.getLangLabel('common-language', 'delete')
				+ '</a>';
	} else if (value == '0') {
		return grooveTranslator.getLangLabel('annex-language', 'annex-missing')
				+ ' <a href="javascript:void(0);" onclick="javascript:deleteAnnex(\''
				+ record.data.XSYSTEM_ANNEX_ID + '\', reloadAnnexGrid);">'
				+ grooveTranslator.getLangLabel('common-language', 'delete')
				+ '</a>';
	} else if (value == '1') {
		return grooveTranslator
				.getLangLabel('annex-language', 'annex-complete');
	}
	return value;
}

function reloadAnnexGrid() {
	Ext.getCmp(annexListTabId).getStore().reload();
}