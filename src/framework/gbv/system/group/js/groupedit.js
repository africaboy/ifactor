/**
 * 初始化表单编辑区域
 * <p>
 * 编辑窗口关闭后,原GEForm并没有清空,需=null置空,否则再次打开窗口时会很出现脚本异常
 * </p>
 */
function renewForm(id, tlt) {
	var GEForm = new Ext.FormPanel({
				labelWidth : 75, // label settings here cascade unless
				frame : false,
				title : grooveTranslator.getLangLabel('group-language',
						'form-title'),
				bodyStyle : 'border:0px; padding:5px;',
				width : 450,
				defaults : {
					width : 300
				},
				defaultType : 'textfield',

				items : [
						{
							xtype : 'hidden',
							name : 'gid',
							value : id
						},
						{
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-name'),
							name : 'gname',
							allowBlank : false
						},
						{
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-desc'),
							xtype : 'textarea',
							name : 'gintro'
						},
						getWBComboStore('group-rating', '', 'grating_',
								grooveTranslator.getLangLabel('group-language',
										'form-rating'), 'grating', null, '0'),
						{
							xtype : 'hidden',
							name : 'grating',
							id : 'grating'
						},
						getWBComboStore('area', '', 'garea_', grooveTranslator
										.getLangLabel('group-language',
												'form-area'), 'garea', null,
								'', true), {
							xtype : 'hidden',
							name : 'garea',
							id : 'garea'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-number'),
							name : 'gnumber',
							allowBlank : true
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-code'),
							name : 'gcode',
							allowBlank : true
						}, new Ext.form.RadioGroup({
									fieldLabel : grooveTranslator.getLangLabel(
											'group-language', 'form-branch'),
									// //RadioGroup.fieldLabel 标签与
									// Radio.boxLabel 标签区别
									// width : "200",
									// hideLabel : true, // 隐藏RadioGroup标签
									items : [new Ext.form.Radio({ // 三个必须项
										id : "branch0",
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : grooveTranslator
												.getLangLabel('group-language',
														'form-branch-no'), // Radio标签
										name : "gbranch", // 用于form提交时传送的参数名
										inputValue : "0", // 提交时传送的参数值
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										id : "branch1",
										boxLabel : grooveTranslator
												.getLangLabel('group-language',
														'form-branch-yes'),
										name : "gbranch",
										inputValue : "1",
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
								}), initDataindexCombo({
									'label' : grooveTranslator.getLangLabel(
											'group-language', 'form-province'),
									'returnIdField' : 'provNode',
									'returnNameField' : 'provName',
									'returnTypeField' : null,
									'root' : '00',
									'allowBlank' : true,
									'returnFunc' : function() {
										var treeId = 'dataindexComboTree_cityNode';
										reloadDataindexRoot(treeId);

										Ext.getCmp('cityNode_').setValue('');
										Ext.getCmp('cityNode').setValue('');
										Ext.getCmp('cityName').setValue('');
									},
									'showLevel' : 1
								}), initDataindexCombo({
									'label' : grooveTranslator.getLangLabel(
											'group-language', 'form-city'),
									'returnIdField' : 'cityNode',
									'returnNameField' : 'cityName',
									'returnTypeField' : null,
									'cascade' : 'provNode',
									'allowBlank' : true,
									'returnFunc' : function() {
									},
									'showLevel' : 1
								}), {
							xtype : 'hidden',
							name : 'cityName',
							id : 'cityName'
						}, {
							xtype : 'hidden',
							name : 'cityNode',
							id : 'cityNode'
						}, {
							xtype : 'hidden',
							name : 'provNode',
							id : 'provNode'
						}, {
							xtype : 'hidden',
							name : 'provName',
							id : 'provName'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-detail'),
							xtype : 'textfield',
							name : 'addDtl',
							id : 'addDtl'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-tel'),
							xtype : 'textfield',
							name : 'tel',
							id : 'tel'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-email'),
							xtype : 'textfield',
							name : 'email',
							id : 'email'
						}],

				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					type : 'submit',
					handler : function() {
						if (GEForm.getForm().isValid()) {
							var but = this;
							but.setDisabled(true);
							Ext.MessageBox.wait(grooveTranslator.getLangLabel(
									'common-language', 'submit-loading'));

							GEForm.getForm().submit({
								url : context
										+ '/system/group.do?method=update',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									but.setDisabled(false);
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'group-language',
													'form-success'));
									grouptree.getSelectionModel()
											.getSelectedNode()
											.setText(action.result.gname);
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									but.setDisabled(false);
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'group-language',
													'form-error'));
								}
							});
						}
					}
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'reset'),
					handler : function() {
						GEForm.getForm().reset();
					}

				}]
			});

	GEForm.getForm().load({
		url : context + '/system/group.do?method=edit',
		params : {
			id : id
		},
		waitTitle : grooveTranslator.getLangLabel('common-language', 'prompt'),
		waitMsg : grooveTranslator.getLangLabel('common-language',
				'list-loading'),
		animEl : "loding",
		success : function(form, action) {
			var resultInfo = listSimpleJson(action.result.data);

			var gbranch = resultInfo.get("gbranch");

			if (gbranch == "0") {
				Ext.get("branch0").dom.checked = true;
			} else if (gbranch == "1") {
				Ext.get("branch1").dom.checked = true;
			}

			Ext.getCmp('provNode_').setValue(resultInfo.get('provName'));
			Ext.getCmp('cityNode_').setValue(resultInfo.get('cityName'));

			// Ext.getCmp('garea_').setValue(resultInfo.get("garea"));
			// Ext.getCmp('grating_').setValue(resultInfo.get("grating"));
		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('group-language',
					'edit-load-error'));
		}
	});

	return GEForm;
};

/**
 * 初始化新建组/部门form
 * 
 * @param {}
 *            id 父组ID
 * @param {}
 *            tlt 父组名称
 */
function renewAddForm(id, tlt) {
	var GEForm = new Ext.FormPanel({
				labelWidth : 75, // label settings here cascade unless
				frame : false,
				bodyStyle : 'border:0px; padding:5px;',
				width : 400,
				defaults : {
					width : 300
				},
				defaultType : 'textfield',

				items : [
						{
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-pname'),
							readOnly : true,
							value : tlt
						},
						{
							xtype : 'hidden',
							name : 'pid',
							value : id
						},
						{
							xtype : 'hidden',
							name : 'gid',
							value : ''
						},
						{
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-name'),
							name : 'gname',
							allowBlank : false
						},
						{
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-desc'),
							xtype : 'textarea',
							name : 'gintro'
						},
						getWBComboStore('group-rating', '', 'grating0_',
								grooveTranslator.getLangLabel('group-language',
										'form-rating'), 'grating'),
						{
							xtype : 'hidden',
							name : 'grating',
							id : 'grating'
						},
						getWBComboStore('area', '', 'garea0_', grooveTranslator
										.getLangLabel('group-language',
												'form-area'), 'garea', null,
								'', true), {
							xtype : 'hidden',
							name : 'garea',
							id : 'garea'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-number'),
							name : 'gnumber'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-code'),
							name : 'gcode',
							allowBlank : true
						}, new Ext.form.RadioGroup({
									fieldLabel : grooveTranslator.getLangLabel(
											'group-language', 'form-branch'),
									// //RadioGroup.fieldLabel 标签与
									// Radio.boxLabel 标签区别
									// width : "200",
									// hideLabel : true, // 隐藏RadioGroup标签
									items : [new Ext.form.Radio({ // 三个必须项
										// checked : true, //
										// 设置当前为选中状态,仅且一个为选中.
										boxLabel : grooveTranslator
												.getLangLabel('group-language',
														'form-branch-no'), // Radio标签
										name : "gbranch", // 用于form提交时传送的参数名
										inputValue : "0", // 提交时传送的参数值
										listeners : {
											check : function(checkbox, checked) { // 选中时,调用的事件
												if (checked) {

												}
											}
										}
									}), new Ext.form.Radio({ // 以上相同
										boxLabel : grooveTranslator
												.getLangLabel('group-language',
														'form-branch-yes'),
										name : "gbranch",
										inputValue : "1",
										listeners : {
											check : function(checkbox, checked) {
												if (checked) {

												}
											}
										}
									})]
								}), initDataindexCombo({
									'label' : grooveTranslator.getLangLabel(
											'group-language', 'form-province'),
									'returnIdField' : 'provNode',
									'returnNameField' : 'provName',
									'returnTypeField' : null,
									'root' : '00',
									'allowBlank' : true,
									'returnFunc' : function() {
										var treeId = 'dataindexComboTree_cityNode';
										reloadDataindexRoot(treeId);

										Ext.getCmp('cityNode_').setValue('');
										Ext.getCmp('cityNode').setValue('');
										Ext.getCmp('cityName').setValue('');
									},
									'showLevel' : 1
								}), initDataindexCombo({
									'label' : grooveTranslator.getLangLabel(
											'group-language', 'form-city'),
									'returnIdField' : 'cityNode',
									'returnNameField' : 'cityName',
									'returnTypeField' : null,
									'cascade' : 'provNode',
									'allowBlank' : true,
									'returnFunc' : function() {
									},
									'showLevel' : 1
								}), {
							xtype : 'hidden',
							name : 'cityName',
							id : 'cityName'
						}, {
							xtype : 'hidden',
							name : 'cityNode',
							id : 'cityNode'
						}, {
							xtype : 'hidden',
							name : 'provNode',
							id : 'provNode'
						}, {
							xtype : 'hidden',
							name : 'provName',
							id : 'provName'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-detail'),
							xtype : 'textfield',
							name : 'addDtl',
							id : 'addDtl'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-tel'),
							xtype : 'textfield',
							name : 'tel',
							id : 'tel'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'group-language', 'form-email'),
							xtype : 'textfield',
							name : 'email',
							id : 'email'
						}

				]
			});

	var addGroupWin = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 600,
		height : 500,
		title : grooveTranslator.getLangLabel('group-language', 'form-title'),
		resizable : false,
		plain : true,
		modal : true,

		items : [GEForm],

		buttons : [{
			text : grooveTranslator.getLangLabel('common-language', 'submit'),
			type : 'submit',
			handler : function() {
				if (GEForm.getForm().isValid()) {
					var but = this;
					but.setDisabled(true);
					Ext.MessageBox.wait(grooveTranslator.getLangLabel(
							'common-language', 'submit-loading'));

					GEForm.getForm().submit({
						url : context + '/system/group.do?method=save',
						method : "POST",
						success : function(form, action) {
							Ext.MessageBox.hide();
							but.setDisabled(false);
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'group-language', 'form-success'));
							addGroupNode(action.result.id, GEForm.getForm()
											.findField("gname").getValue(), id);
							addGroupWin.close();
							addGroupWin = null;
						},
						failure : function(form, action) {
							Ext.MessageBox.hide();
							but.setDisabled(false);
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'group-language', 'form-error'));
						}
					});
				}
			}
		}, {
			text : grooveTranslator.getLangLabel('common-language', 'reset'),
			handler : function() {
				GEForm.getForm().reset();
			}

		}, {
			text : grooveTranslator.getLangLabel('common-language', 'close'),
			handler : function() {
				addGroupWin.close();
				addGroupWin = null;
			}
		}]
	});

	addGroupWin.show(this);
};

/**
 * 显示组编辑form
 * 
 * @param {}
 *            id 组ID
 * @param {}
 *            tlt 组名称
 */
function showEditForm(id, tlt) {
	if (groupEditTabs.items.getCount() > 0) {
		// GEForm.destroy();
		groupEditTabs.remove(0);
	}

	groupEditTabs.add(renewForm(id, tlt)).show();
}

/**
 * 显示新建组/部门form
 * 
 * @param {}
 *            id 父组ID
 * @param {}
 *            tlt
 */
function showAddForm(id, tlt) {
	if (groupEditTabs.items.getCount() > 0) {
		// GEForm.destroy();
		groupEditTabs.remove(0);
	}
	renewAddForm(id, tlt);
}

function delNode() {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel('group-language',
					'delete-prompt'), deleteGroup);
}

function deleteGroup(btn) {
	if (btn == 'yes') {
		Ext.MessageBox.wait(grooveTranslator.getLangLabel('common-language',
				'delete-loading'));

		Ext.Ajax.request({
			url : context + '/system/group.do?method=delete',
			method : 'POST',
			params : {
				gid : grouptree.getSelectionModel().getSelectedNode().attributes.realid
			},
			success : function(response, options) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (o.success) {
					Ext.MessageBox.hide();
					removeGEForm(grouptree.getSelectionModel()
							.getSelectedNode().attributes.realid);
					grouptree.getSelectionModel().getSelectedNode().remove();
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('group-language',
									'delete-success'));
				} else {
					Ext.MessageBox.hide();
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('group-language',
									'delete-error'));
				}
			}
		});
	}
}

/**
 * 删除组编辑form
 * 
 * @param {}
 *            id
 */
function removeGEForm(id) {
	if (groupEditTabs.items.itemAt(0).getForm().findField("gid").getValue() == id) {
		groupEditTabs.remove(0);
	}
}

function addGroupNode(id, name, pid) {
	var groupNode = new Ext.tree.TreeNode({
				id : 'g' + id,
				text : name,
				realid : id,
				type : 'group',
				isroot : false,
				leaf : false,
				parentId : 'g' + pid,
				haschildren : false,
				iconCls : 'icon-group'
			});

	grouptree.getNodeById('g' + pid).appendChild(groupNode);
}