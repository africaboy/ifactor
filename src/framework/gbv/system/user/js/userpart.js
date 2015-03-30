var grouptree;

function editUserPart(userId, userName) {
	var userPartTabs = new Ext.TabPanel({
				id : 'userPartTabs',
				region : 'center',
				margins : '3 3 3 0',
				activeTab : 0,
				defaults : {
					autoScroll : true,
					autoHeight : true,
					bodyStyle : 'padding:5px'
				},

				items : []
			});

	// Panel for the west
	var nav = new Ext.Panel({
		title : grooveTranslator.getLangLabel('group-language',
				'treepanel-title'),
		region : 'west',
		split : true,
		width : 200,
		collapsible : true,
		margins : '3 0 3 3',
		cmargins : '3 3 3 3',
		items : [{
			border : false,
			html : '<div id="editPartUserArea" style="overflow:auto;width:198px;height:400px;border:0px #000 solid;"></div>'
		}]
	});

	var win = new Ext.Window({
				id : 'editPartUserWin',
				title : userName,
				closable : true,
				resizable : false,
				// maximizable : true,
				width : 700,
				height : 465,
				border : false,
				plain : true,
				layout : 'border',
				modal : true,
				items : [nav, userPartTabs]
			});

	win.show(this);

	showPartUserTree(userId, userName);
}

function showPartUserTree(userId, userName) {
	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel('group-language',
						'tree-root'),
				draggable : false,
				id : '0'
			});

	grouptree = new Ext.tree.TreePanel({
				layout : 'fit',
				renderTo : 'editPartUserArea',
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
				dataUrl : context
						+ '/system/group/groupmapscript.jsp?type=ALL_GROUP',
				listeners : {
					'click' : function(node) {
						// alert(node.id);
						// alert(node.text);
						// alert(node.attributes.type);
						if (node.attributes.isroot != true) {
							showUserPartForm(userId, userName,
									node.attributes.realid, node.text);
						} else {
							/*
							 * Ext.Msg.show({ title : '提示信息', msg : '不能编辑根组节点',
							 * modal : true, scope : this, fn : this.onFlush,
							 * icon : Ext.Msg.INFO, buttons : Ext.Msg.OK });
							 */
						}
					}
				}
			});

	grouptree.render();

	grouptree.root.expand(true);
}

function showUserPartForm(userId, userName, groupId, groupName) {
	if (Ext.get("userPartTab")) {
		Ext.getCmp("userPartTabs").remove(0);
	}

	var userPartForm = getUserPartForm(userId, userName, groupId, groupName);

	Ext.getCmp("userPartTabs").add({
				id : "userPartTab",
				title : grooveTranslator
						.getLangLabel('common-language', 'edit'),
				layout : 'form',
				items : [userPartForm]
			}).show();
}

function getUserPartForm(userId, userName, groupId, groupName) {
	if (Ext.get("userPartForm")) {
		Ext.get("userPartForm") = null;
	}

	var userPartForm = new Ext.FormPanel({
				id : 'userPartForm',
				labelWidth : 75, // label settings here cascade unless
				frame : false,
				bodyStyle : 'border:0px; padding:5px;',
				width : 450,
				defaults : {
					width : 300
				},
				defaultType : 'textfield',

				items : [
						{
							xtype : 'hidden',
							name : 'tp',
							value : ''
						},
						{
							xtype : 'hidden',
							name : 'gid',
							value : groupId
						},
						{
							xtype : 'hidden',
							name : 'uid',
							value : userId
						},
						{
							xtype : 'hidden',
							name : 'upt',
							value : '0'
						},
						getWBComboStore('user-rating', '', 'grating_',
								grooveTranslator.getLangLabel('user-language',
										'form-rating'), 'upr', null, '0'),
						{
							xtype : 'hidden',
							name : 'upr',
							id : 'upr'
						},
						getWBComboStore('job', '', 'job_', grooveTranslator
										.getLangLabel('user-language',
												'form-job'), 'upj', null, ''),
						{
							xtype : 'hidden',
							name : 'upj',
							id : 'upj'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'user-language', 'form-idx'),
							regex : /^[1-9]\d*$/,
							regexText : grooveTranslator.getLangLabel(
									'user-language', 'form-idx-regextext'),
							name : 'upo',
							value : '99'
						}],

				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					type : 'submit',
					handler : function() {
						if (Ext.getCmp("userPartForm").getForm().isValid()) {
							var but = this;
							but.setDisabled(true);
							Ext.MessageBox.wait(grooveTranslator.getLangLabel(
									'common-language', 'submit-loading'));

							Ext.getCmp("userPartForm").getForm().submit({
								url : context
										+ '/system/user.do?method=updatepart',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									but.setDisabled(false);
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'common-language',
													'success'));
									Ext.getCmp("userPartForm").getForm()
											.findField("tp").setValue("update");
									if (Ext.getCmp("userPartForm").getForm()
											.findField("upt").getValue() == "1") {
										Ext.getCmp("userPartDelButton").show();
									}
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									but.setDisabled(false);
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'common-language',
													'failure'));
								}
							});
						}
					}
				}, {
					id : 'userPartDelButton',
					text : grooveTranslator.getLangLabel('common-language',
							'delete'),
					type : 'submit',
					hidden : true,
					handler : function() {
						Ext.MessageBox.confirm(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel(
										'common-language', 'delete-prompt'),
								deleteUserPart);
					}
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'reset'),
					handler : function() {
						Ext.getCmp("userPartForm").getForm().reset();
					}

				}]
			});

	Ext.getCmp("userPartForm").getForm().load({
		url : context + '/system/user.do?method=editpart',
		params : {
			userId : userId,
			groupId : groupId
		},
		waitTitle : grooveTranslator.getLangLabel('common-language', 'prompt'),
		waitMsg : grooveTranslator.getLangLabel('common-language',
				'list-loading'),
		animEl : "loding",
		success : function(form, action) {
			var resultInfo = listSimpleJson(action.result.data);
			var tp = resultInfo.get("tp");
			var upt = resultInfo.get("upt");
			if (upt == 1 && tp == "update") {
				Ext.getCmp("userPartDelButton").show();
			}
		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
					'load-failure'));
		}
	});
	return userPartForm;
};

function deleteUserPart(btn) {
	if (btn == 'yes') {
		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'delete-loading'));

		Ext.getCmp("userPartForm").getForm().submit({
			url : context + '/system/user.do?method=deletepart',
			method : "POST",
			params : {
				userId : Ext.getCmp("userPartForm").getForm().findField("uid")
						.getValue(),
				groupId : Ext.getCmp("userPartForm").getForm().findField("gid")
						.getValue()
			},
			success : function(form, action) {
				Ext.MessageBox.hide();
				Ext.getCmp("userPartDelButton").hide();
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'common-language', 'success'));
			},
			failure : function(form, action) {
				Ext.MessageBox.hide();
				Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
								'prompt'), grooveTranslator.getLangLabel(
								'common-language', 'failure'));
			}
		});
	}
}