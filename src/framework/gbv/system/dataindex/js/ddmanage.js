var createNewCatWindow = function(config) {
	// 将字段加入到form中，以利用form进行样式排列
	this.createForm = new Ext.FormPanel({
				labelWidth : 120,
				labelAlign : 'left',
				bodyStyle : 'padding:10px 10px 0',
				autoScroll : false,
				items : [new Ext.form.TextField({
							fieldLabel : grooveTranslator.getLangLabel(
									'dataindex-language', 'form-name'),
							name : 'diname',
							allowBlank : false,
							width : 200,
							maxLength : 32
						}), new Ext.form.TextArea({
							fieldLabel : grooveTranslator.getLangLabel(
									'dataindex-language', 'form-desc'),
							name : 'didesc',
							allowBlank : true,
							width : 200
						}), new Ext.form.TextField({
							fieldLabel : grooveTranslator.getLangLabel(
									'dataindex-language', 'form-key'),
							name : 'dikey',
							width : 200,
							maxLength : 32
						}),/*
							 * new Ext.form.TextField({ fieldLabel : '索引类别内部编码',
							 * width : 150, name : 'dicode' }),
							 */new Ext.form.TextField({
							fieldLabel : grooveTranslator.getLangLabel(
									'dataindex-language', 'form-pycode'),
							width : 200,
							name : 'dipycode'
						}), new Ext.form.TextField({
							fieldLabel : grooveTranslator.getLangLabel(
									'dataindex-language', 'form-ywcode'),
							width : 200,
							name : 'diywcode'
						}), new Ext.form.NumberField({
							fieldLabel : grooveTranslator.getLangLabel(
									'dataindex-language', 'form-order'),
							allowBlank : false,
							width : 200,
							name : 'diorder'
						}), new Ext.form.RadioGroup({
							fieldLabel : grooveTranslator.getLangLabel(
									'dataindex-language', 'form-status'),
							items : [{
								boxLabel : grooveTranslator.getLangLabel(
										'dataindex-language',
										'form-status-valid'),
								name : 'divalid',
								inputValue : '1',
								checked : true
							}, {
								boxLabel : grooveTranslator.getLangLabel(
										'dataindex-language',
										'form-status-invalid'),
								name : 'divalid',
								inputValue : '0'
							}]
						})/*
							 * , new Ext.form.TextField({ hidden : true, width :
							 * 10, name : 'diparent' }), new
							 * Ext.form.TextField({ hidden : true, width : 10,
							 * name : 'dichildren' }), new Ext.form.TextField({
							 * hidden : true, width : 10, name : 'dilevel' })
							 */]
			});

	Ext.apply(this, config);
	createNewCatWindow.superclass.constructor.call(this, {
				id : 'createNewCatWindow',
				closeAction : 'hide',
				layout : 'fit',
				width : 500,
				height : 400,
				modal : true,
				title : grooveTranslator.getLangLabel('dataindex-language',
						'form-title'),
				items : this.createForm,
				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					handler : function(button, e) {
						this.doCreate(e);
					},
					scope : this
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'cancel'),
					handler : function(button, e) {
						this.resetInput();
						this.fireEvent('cancelClicked', this, e);
						if (this.cancelHandler) {
							this.cancelHandler
									.call(this.scope || this, this, e);
						} else {
							this.hide();
						}
					},
					scope : this
				}]
			});
};

Ext.extend(createNewCatWindow, Ext.Window, {
	/** 父级索引ID */
	diparent : null,
	/** 是否存在子节点 */
	dichildren : 1,
	/** 类别索引层级 */
	dilevel : null,
	/** 新建表单 */
	createForm : null,
	/** 确定按钮事件处理器 */
	okHandler : null,
	/** 取消按钮事件处理器 */
	cancelHandler : null,
	/** 事件触发时对象的工作域 */
	scope : null,

	/**
	 * 显示窗口
	 */
	showWindow : function(diparent, dilevel) {
		this.show();
		var form = this.createForm.getForm();
		form.reset();
		form.findField('dikey').setValue(Ext.getCmp('ddform').form
				.findField('DI_KEY').getValue()
				+ '_');
	},

	/**
	 * 将输入框清空
	 */
	resetInput : function() {
		var form = this.createForm.getForm();
		form.reset();
	},

	/**
	 * 添加分类
	 */
	doCreate : function(event) {
		var form = this.createForm.getForm();
		if (this.diparent == "" || this.diparent == null) {
			this.diparent = "-1";
		}
		if (form.isValid()) {
			form.submit({
				url : context + '/system/ddindex.do?method=insert',
				waitMsg : grooveTranslator.getLangLabel('common-language',
						'submit-loading'),
				method : 'POST',/**/
				params : {
					diparent : this.diparent,
					dichildren : this.dichildren,
					dilevel : this.dilevel
				},
				scope : this,
				success : function(form, action) {
					this.resetInput();
					// 执行确定处理
					this.fireEvent('okClicked', this);
					if (this.okHandler) {
						this.okHandler.call(this.scope || this, this, event);
					} else {
						this.hide();
					}

					form.responseText; // 返回的结果
				},
				failure : function(form, action) {
					if (action.failureType === Ext.form.Action.CONNECT_FAILURE) {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'), 'Status:'
										+ action.response.status + ': '
										+ action.response.statusText);
					}
					if (action.failureType === Ext.form.Action.SERVER_INVALID) {
						// server responded with success = false
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel(
										'dataindex-language', 'save-failure'));
					}

				}
			});

		}
	},

	// private
	initComponent : function() {
		createNewCatWindow.superclass.initComponent.call(this);
		this.addEvents(
				/**
				 * @event okClicked 当确定按钮被点击时触发
				 * @param {createNewCatWindow}
				 *            this
				 */
				'okClicked',
				/**
				 * @event okClicked 当取消按钮被点击时触发
				 * @param {createNewCatWindow}
				 *            this
				 */
				'cancelClicked');
	}

});
var ddIds;
var deleteManager = function(config) {
	Ext.apply(this, config);
	this.id = 'deletemanager';
	// this.ids = null;
	this.showConfirm = function() {
		Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
						'prompt'), grooveTranslator.getLangLabel(
						'dataindex-language', 'delete-prompt'), this.doDelete);

	};
	this.doDelete = function(btn) {

		if (btn == "yes") {
			Ext.Ajax.request({
						url : context + '/system/ddindex.do?method=delete',
						waitMsg : grooveTranslator.getLangLabel(
								'common-language', 'delete-loading'),
						method : 'POST',
						params : {
							'ids' : ddIds
						},
						success : function(rs, request) {
							var pNode = Ext.getCmp("dataIndexTree")
									.getSelectionModel().getSelectedNode().parentNode;
							pNode.reload();
							Ext.getCmp("ddform").getForm().reset();
							Ext.getCmp('ddtoolbar').items.items[0].disable();
							Ext.getCmp('ddtoolbar').items.items[2].disable();
							Ext.getCmp("btnSave").disable();
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'dataindex-language',
											'delete-success'));
						},
						failure : function(rs, request) {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'dataindex-language',
											'delete-failure'));
						}
					});

		}

	};
};

function ddtree(id, tlt) {

	var newCatWindow = new createNewCatWindow();
	var createNew = function(b, e) {
		newCatWindow.showWindow();

	};

	var deletemanager = new deleteManager();
	var deleteDD = function() {
		deletemanager.showConfirm(ddIds);
	};

	var panel = new Ext.Panel({
				id : 'ddtabs',
				region : 'center', // a center region is ALWAYS
				// required for border layout
				deferredRender : false,
				enableTabScroll : true,
				margins : '0 0 0 0',
				tbar : new Ext.Toolbar({
							id : 'ddtoolbar',
							autoWidth : true,
							autoShow : true,
							items : [{
								id : 'adddd',
								iconCls : 'adddd',
								disabled : true,
								text : grooveTranslator.getLangLabel(
										'dataindex-language', 'tbar-add'),
								handler : createNew,
								scope : this
							}, '-', {
								id : 'deldd',
								iconCls : 'deldd',
								text : grooveTranslator.getLangLabel(
										'dataindex-language', 'tbar-delete'),
								disabled : true,
								handler : deleteDD,
								scope : this
							}]
						}),
				items : []
			});

	var root = new Ext.tree.AsyncTreeNode({
		text : grooveTranslator.getLangLabel('dataindex-language', 'tree-root'),
		draggable : false,
		iconCls : 'root',
		id : '-1'
	});

	var loader = new Ext.tree.TreeLoader({
				url : context + '/system/ddindex.do?method=managetree'
			});

	var tree = new Ext.tree.TreePanel({
		id : 'dataIndexTree',
		region : 'west',
		title : grooveTranslator.getLangLabel('dataindex-language',
				'tree-title'),
		useArrows : true,
		autoScroll : true,
		animate : false,
		enableDD : false,
		containerScroll : true,
		rootVisible : true,
		singleExpand : false,
		animate : true,
		frame : false,
		split : true,
		width : 200,
		collapsible : true,
		root : root,
		// auto create TreeLoader
		loader : loader,
		listeners : {
			/*
			 * 'render' : function(tp) {
			 * tp.getSelectionModel().on('selectionchange', function(tree, node) {
			 * if (node && node.leaf) { //
			 * showMenuOnTab(node.text,node.attributes.url); showme(node.id,
			 * node.text, node.attributes.url); } else if (node && !node.leaf) {
			 * node.expand(true); } }) }
			 */
			click : function(node, event) {
				if (!node.isExpanded()) {
					node.expand();
				}

				if (Ext.getCmp('ddform')) {
					panel.remove(Ext.getCmp('ddform'), true);

				}

				newCatWindow.diparent = node.id;
				newCatWindow.dilevel = node.getDepth() + 1;
				ddIds = node.id;
				var ddform = new Ext.FormPanel({
							labelWidth : 120, // label settings here cascade
							id : 'ddform',
							frame : false,
							bodyStyle : 'border:0px; padding:5px;',
							width : 450,
							defaults : {
								width : 250
							},
							defaultType : 'textfield',

							items : [new Ext.form.TextField({
										fieldLabel : grooveTranslator
												.getLangLabel(
														'dataindex-language',
														'form-name'),
										name : 'DI_NAME',
										allowBlank : false,
										width : 150,
										maxLength : 32
									}), new Ext.form.TextArea({
										fieldLabel : grooveTranslator
												.getLangLabel(
														'dataindex-language',
														'form-desc'),
										name : 'DI_DESC',
										allowBlank : true
									}), new Ext.form.TextField({
										fieldLabel : grooveTranslator
												.getLangLabel(
														'dataindex-language',
														'form-key'),
										name : 'DI_KEY',
										width : 150,
										maxLength : 32
									}), new Ext.form.TextField({
										fieldLabel : grooveTranslator
												.getLangLabel(
														'dataindex-language',
														'form-code'),
										width : 150,
										readOnly : true,
										style : {
											background : '#eeeeee'
										},
										name : 'DI_CODE'
									}), new Ext.form.TextField({
										fieldLabel : grooveTranslator
												.getLangLabel(
														'dataindex-language',
														'form-pycode'),
										width : 150,
										name : 'DI_PYCODE'
									}), new Ext.form.TextField({
										fieldLabel : grooveTranslator
												.getLangLabel(
														'dataindex-language',
														'form-ywcode'),
										width : 150,
										name : 'DI_YWCODE'
									}), new Ext.form.NumberField({
										fieldLabel : grooveTranslator
												.getLangLabel(
														'dataindex-language',
														'form-order'),
										allowBlank : false,
										width : 150,
										name : 'DI_ORDER'
									}), new Ext.form.RadioGroup({
										fieldLabel : grooveTranslator
												.getLangLabel(
														'dataindex-language',
														'form-status'),
										items : [{
											boxLabel : grooveTranslator
													.getLangLabel(
															'dataindex-language',
															'form-status-valid'),
											name : 'DI_VALID',
											id : 'divalid0',
											inputValue : '1'
										}, {
											boxLabel : grooveTranslator
													.getLangLabel(
															'dataindex-language',
															'form-status-invalid'),
											id : 'divalid1',
											name : 'DI_VALID',
											inputValue : '0'
										}]
									}), new Ext.form.TextField({
										hidden : true,
										name : 'DI_ID'
									})],

							buttons : [{
								text : grooveTranslator.getLangLabel(
										'common-language', 'save'),
								id : 'btnSave',
								type : 'submit',
								handler : function() {
									if (ddform.getForm().isValid()) {
										var but = this;
										but.setDisabled(true);
										Ext.MessageBox.wait(grooveTranslator
												.getLangLabel(
														'common-language',
														'submit-loading'));

										ddform.getForm().submit({
											url : context
													+ '/system/ddindex.do?method=save',
											method : "POST",
											success : function(form, action) {
												Ext.Msg
														.alert(
																grooveTranslator
																		.getLangLabel(
																				'common-language',
																				'prompt'),
																grooveTranslator
																		.getLangLabel(
																				'dataindex-language',
																				'form-success'));
												but.setDisabled(false);
												var pNode = tree
														.getSelectionModel()
														.getSelectedNode().parentNode;
												pNode.reload();
											},
											failure : function(form, action) {
												Ext.MessageBox.hide();
												Ext.Msg
														.alert(
																grooveTranslator
																		.getLangLabel(
																				'common-language',
																				'prompt'),
																grooveTranslator
																		.getLangLabel(
																				'dataindex-language',
																				'form-failure'));
											}
										});
									}
								}
							}]
						});

				if (node.id == "-1") {
					panel.getTopToolbar().items.items[0].enable();
					panel.getTopToolbar().items.items[2].disable();
					Ext.getCmp("btnSave").disable();
				} else {
					panel.getTopToolbar().items.items[0].enable();
					panel.getTopToolbar().items.items[2].enable();
					Ext.getCmp("btnSave").enable();

				}

				ddform.getForm().load({
					url : context + '/system/ddindex.do?method=edit',
					params : {
						id : node.id
					},
					waitTitle : grooveTranslator.getLangLabel(
							'common-language', 'prompt'),
					waitMsg : grooveTranslator.getLangLabel('common-language',
							'submit-loading'),
					animEl : 'loding',
					success : function(form, action) {
						var resultInfo = action.result.data;

						var divalid = resultInfo.DI_VALID;

						if (divalid == '1') {
							Ext.get("divalid0").dom.checked = true;
						} else if (divalid == '0') {
							Ext.get("divalid1").dom.checked = true;
						}
					},
					failure : function(form, action) {
						Ext.Msg.alert(grooveTranslator.getLangLabel(
								'common-language', 'load-failure'));
					}
				});

				panel.add(ddform);
				panel.doLayout();
			}

		}
	});

	tree.getRootNode().expand();

	var win = new Ext.Window({
				id : "win_" + id,
				title : tlt,
				closable : true,
				resizable : false,
				// maximizable : true,
				width : 700,
				height : 500,
				border : false,
				plain : true,
				layout : 'border',
				modal : true,
				items : [tree, panel]
			});

	win.show(this);

	/*
	 * 树节点reload
	 */
	var reloadTree = function(t) {
		tree.getNodeById(t.diparent).reload();
	}

	newCatWindow.on('okClicked', reloadTree, this);

}