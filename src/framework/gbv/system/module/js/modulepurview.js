var modulePurviewTree;

function showmodulePurviewTree(id, tlt) {
	if (!Ext.get('modulePurviewTreeWin')) {
		// tabs for the center
		// Panel for the west
		var nav1 = new Ext.Panel({
			title : grooveTranslator.getLangLabel('module-language',
					'purview-list-title'),
			region : 'center',
			split : true,
			collapsible : false,
			margins : '3 3 3 0',
			frame : false,
			items : [{
				border : true,
				autoScroll : true,
				html : '<div id="modulepurviewlist" style="overflow:auto;height:400px;border:0px #000 solid;"></div>'
			}]
		});

		// Panel for the west
		var nav = new Ext.Panel({
			title : grooveTranslator.getLangLabel('module-language', 'module')
					+ '&nbsp;{' + tlt + '}',
			region : 'west',
			split : true,
			width : 200,
			collapsible : false,
			margins : '3 0 3 3',
			items : [{
				border : false,
				html : '<div id="modulePurviewTree-div" style="overflow:auto;height:400px;border:0px #000 solid;"></div>'
			}]
		});

		var win = new Ext.Window({
					id : 'modulePurviewTreeWin',
					title : grooveTranslator.getLangLabel('module-language',
							'purview-window-title'),
					closable : true,
					resizable : false,
					// maximizable : true,
					width : 800,
					height : 465,
					border : false,
					plain : true,
					layout : 'border',
					modal : true,
					items : [nav, nav1]
				});

		win.show(this);

		initmodulePurviewTree(id, tlt);
	} else if (Ext.get('modulePurviewTreeWin').hidden()) {
		Ext.get('modulePurviewTreeWin').show();
	}
}

function initmodulePurviewTree(id, rootName) {
	var root = new Ext.tree.AsyncTreeNode({
				text : rootName,
				draggable : false,
				id : 'module_' + id
			});

	modulePurviewTree = new Ext.tree.TreePanel({
				layout : 'fit',
				renderTo : 'modulePurviewTree-div',
				useArrows : false,
				autoScroll : false,
				animate : false,
				enableDD : false,
				containerScroll : true,
				expandable : true,
				rootVisible : false,
				singleExpand : false,
				animate : true,
				border : false,
				frame : false,
				root : {
					nodeType : 'async'
				},
				// auto create TreeLoader
				dataUrl : context + '/system/module.do?method=moduletree&id='
						+ id,
				listeners : {
					'click' : function(node) {
						if (node.attributes.isroot != true) {
							var tp = node.attributes.type;
							var oid = node.attributes.realid;

							purviewlist(oid, node.text, tp, 'ISYS_MODULE_MENU',
									'modulepurviewlist', 'purview-visit');
						} else {
							var tp = 'module';
							var oid = id;

							purviewlist(oid, node.text, tp, 'ISYS_MODULE',
									'modulepurviewlist', 'purview-visit');
						}

					}
				}
			});

	modulePurviewTree.render();

	modulePurviewTree.expandAll();
};

/**
 * 模块访问权限控制
 * 
 * @param {}
 *            oid object-id
 * @param {}
 *            oname object-name
 * @param {}
 *            otype object-type
 */
function handleAccessModule(oid, oname, otype) {
	var treePanel = new Ext.tree.TreePanel({
		split : true,
		layout : 'fit',
		border : false,
		// tree-specific configs:
		rootVisible : false,
		lines : false,
		singleExpand : false,
		useArrows : true,
		dataUrl : context + '/system/module.do?method=allmoduletree',

		root : new Ext.tree.AsyncTreeNode(),
		listeners : {
			'click' : function(node) {
				var tp = node.attributes.type;
				var id = node.attributes.realid;
				var name = (tp == 'menu' ? node.attributes.mnname : node.text);
				var otname = (tp == 'menu' ? 'ISYS_MODULE_MENU' : 'ISYS_MODULE');

				if (tab.items.getCount() > 0) {
					tab.remove(0);
				}

				var form = new Ext.FormPanel({
					labelWidth : 75, // label settings here
					title : (tp == 'menu' ? grooveTranslator.getLangLabel(
							'module-language', 'menu')
							+ ': ' + node.attributes.mnname : grooveTranslator
							.getLangLabel('module-language', 'module')
							+ ': ' + node.text),
					frame : false,
					bodyStyle : 'border:0px; padding:5px;',
					autoWidth : true,
					auotHeight : true,
					defaults : {
						width : 300
					},
					border : false,
					defaultType : 'textfield',

					items : [
							getWBComboStore('purview-visit', '', 'purview_',
									grooveTranslator.getLangLabel(
											'frequence-language',
											'purview-title'), 'purview',
									null, '', false), {
								xtype : 'hidden',
								id : 'purview',
								name : 'purview'
							}, {
								xtype : 'hidden',
								name : 'rid',
								value : oid
							}, {
								xtype : 'hidden',
								name : 'rname',
								value : oname
							}, {
								xtype : 'hidden',
								name : 'rtype',
								value : otype
							}, {
								xtype : 'hidden',
								name : 'oid',
								value : id
							}, {
								xtype : 'hidden',
								name : 'oname',
								value : name
							}, {
								xtype : 'hidden',
								name : 'otype',
								value : tp
							}, {
								xtype : 'hidden',
								name : 'otname',
								value : otname
							}, {
								xtype : 'hidden',
								name : 'pid'
							}

					],
					buttons : [{
						text : grooveTranslator.getLangLabel('common-language',
								'submit'),
						type : 'submit',
						handler : function() {
							if (form.getForm().isValid()) {
								var but = this;
								but.setDisabled(true);
								Ext.MessageBox.wait(grooveTranslator
										.getLangLabel('common-language',
												'submit-loading'));

								form.getForm().submit({
									url : context
											+ '/system/purview.do?method=remix',
									method : 'POST',
									success : function(form, action) {
										var resultJson = action.result.resultCode;

										if (form.findField('pid').getValue() == '') {
											form.findField('pid')
													.setValue(resultJson);
										}

										Ext.MessageBox.hide();
										but.setDisabled(false);
										Ext.getCmp('delSpecialPurview')
												.setDisabled(false);
										Ext.Msg.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator.getLangLabel(
														'module-language',
														'purview-success'));
									},
									failure : function(form, action) {
										Ext.MessageBox.hide();
										but.setDisabled(false);
										Ext.Msg.alert(
												grooveTranslator.getLangLabel(
														'common-language',
														'prompt'),
												grooveTranslator.getLangLabel(
														'module-language',
														'purview-failure'));
									}
								});
							}
						}
					}, {
						id : 'delSpecialPurview',
						text : grooveTranslator.getLangLabel('common-language',
								'delete'),
						disabled : true,
						handler : function() {
							var but = this;

							Ext.MessageBox.confirm(grooveTranslator
											.getLangLabel('common-language',
													'prompt'), grooveTranslator
											.getLangLabel('module-language',
													'purview-delete-prompt'),
									function(e) {
										if (e == 'yes') {
											but.setDisabled(true);
											Ext.MessageBox
													.wait(grooveTranslator
															.getLangLabel(
																	'common-language',
																	'delete-loading'));

											form.getForm().submit({
												url : context
														+ '/system/purview.do?method=delete',
												method : 'POST',
												success : function(form, action) {
													Ext.MessageBox.hide();
													but.setDisabled(true);
													Ext.Msg
															.alert(
																	grooveTranslator
																			.getLangLabel(
																					'common-language',
																					'prompt'),
																	grooveTranslator
																			.getLangLabel(
																					'module-language',
																					'purview-delete-success'));

													form.findField('pid')
															.setValue('');
												},
												failure : function(form, action) {
													Ext.MessageBox.hide();
													but.setDisabled(false);
													Ext.Msg
															.alert(
																	grooveTranslator
																			.getLangLabel(
																					'common-language',
																					'prompt'),
																	grooveTranslator
																			.getLangLabel(
																					'module-language',
																					'purview-delete-failure'));
												}
											});
										}
									});
						}
					}]
				});

				tab.add(form).show();

				form.getForm().load({
					url : context + '/system/purview.do?method=givenPurview',
					params : {
						rid : oid,
						rtype : otype,
						oid : id,
						otype : tp
					},
					waitTitle : grooveTranslator.getLangLabel(
							'common-language', 'prompt'),
					waitMsg : grooveTranslator.getLangLabel('common-language',
							'list-loading'),
					animEl : 'loding',
					success : function(form, action) {
						var resultJson = action.result.data;

						if (resultJson.purviewList.length > 0) {
							Ext.getCmp('delSpecialPurview').enable();

							form.findField('pid')
									.setValue(resultJson.purviewList[0].ID);
							form
									.findField('purview')
									.setValue(resultJson.purviewList[0].PURVIEW);
							Ext
									.getCmp('purview_')
									.setValue(resultJson.purviewList[0].PURVIEW);
							Ext
									.getCmp('purview_')
									.setRawValue(resultJson.purviewList[0].PURVIEW == '-1'
											? grooveTranslator.getLangLabel(
													'frequence-language',
													'purview-no')
											: grooveTranslator.getLangLabel(
													'frequence-language',
													'purview-yes'));
						} else {
							Ext.getCmp('delSpecialPurview').disable();
						}
					},
					failure : function(form, action) {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
								'frequence-language', 'purview-load-error'));
					}
				});
			}
		}
	});

	treePanel.expandAll();

	var nav = new Ext.Panel({
				title : grooveTranslator.getLangLabel('module-language',
						'purview-nav-title'),
				region : 'west',
				margins : '3 0 3 3',
				width : 250,
				split : true,
				animCollapse : true,
				autoScroll : true,
				// animate: false,
				collapsed : false,
				collapsible : true,
				collapseMode : 'mini',
				cmargins : '3 3 3 3',

				items : [treePanel]
			});

	var tab = new Ext.TabPanel({
				region : 'center',
				margins : '3 3 3 0',
				defaults : {
					autoScroll : true,
					autoHeight : true,
					bodyStyle : 'padding:5px'
				},

				items : []
			});

	var win = new Ext.Window({
				title : '('
						+ oname
						+ ')'
						+ grooveTranslator.getLangLabel('module-language',
								'purview-used-title'),
				closable : true,
				resizable : false,
				// maximizable : true,
				width : 800,
				height : 465,
				border : false,
				plain : true,
				layout : 'border',
				modal : true,
				items : [nav, tab]
			});

	win.show(this);
}