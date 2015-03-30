/**
 * 下载系统初始化配置
 */
function systemSetting() {
	Ext.form.editimg = Ext.extend(Ext.BoxComponent, {
		onRender : function(ct, position) {
			if (!this.el) {
				this.el = document.createElement('img');
				this.el.src = this.src;
				this.el.title = grooveTranslator.getLangLabel(
						'gapsetting-language', 'icon-label');
				this.el.setAttribute('formName', this.formName);
				this.el.onclick = function() {
					var imgName = this.getAttribute('formName') == null
							? 'file1'
							: this.getAttribute('formName');

					var imgFormPanel = new Ext.FormPanel({
								labelWidth : 100, // label settings here
								// cascade unless
								frame : false,
								bodyStyle : 'border:0px; padding:5px;',
								border : false,
								fileUpload : true,
								defaultType : 'textfield',
								defaults : {
									width : 300
								},
								items : [{
									fieldLabel : grooveTranslator.getLangLabel(
											'gapsetting-language', 'icon-now'),
									xtype : 'viewimg',
									src : this.src
								}, {
									name : imgName,
									fieldLabel : grooveTranslator.getLangLabel(
											'gapsetting-language', 'icon-new'),
									inputType : 'file',
									xtype : 'textfield',
									allowBlank : false
								}]
							});

					var win = new Ext.Window({
						renderTo : Ext.getBody(),
						layout : 'fit',
						width : 500,
						height : 400,
						title : grooveTranslator.getLangLabel(
								'gapsetting-language', 'icon-title'),
						resizable : true,
						plain : true,
						modal : true,

						items : [imgFormPanel],

						buttons : [{
							text : grooveTranslator.getLangLabel(
									'common-language', 'save'),
							handler : function() {
								if (imgFormPanel.getForm().isValid()) {
									Ext.MessageBox.confirm(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'gapsetting-language',
													'icon-edit-prompt"'),
											function(btn) {
												if (btn == 'yes') {
													Ext.MessageBox
															.wait(grooveTranslator
																	.getLangLabel(
																			'common-language',
																			'submit-loading'));
													imgFormPanel.getForm()
															.submit({
																url : context
																		+ '/system/system.do?method=configureimg',
																method : 'POST',
																params : {
																	imgName : imgName
																},
																success : function(
																		form,
																		action) {
																	Ext.Msg
																			.alert(
																					grooveTranslator
																							.getLangLabel(
																									'common-language',
																									'prompt'),
																					grooveTranslator
																							.getLangLabel(
																									'gapsetting-language',
																									'icon-edit-success"'));
																	win.close();
																	win = null;

																	Ext
																			.getCmp(imgName).el.dom.src = context
																			+ action.result.imgSrc;
																},
																failure : function(
																		form,
																		action) {
																	Ext.Msg
																			.alert(
																					grooveTranslator
																							.getLangLabel(
																									'common-language',
																									'prompt'),
																					grooveTranslator
																							.getLangLabel(
																									'gapsetting-language',
																									'icon-edit-failure"'));
																}
															});
												}
											});
								}
							}
						}, {
							text : grooveTranslator.getLangLabel(
									'common-language', 'delete'),
							handler : function() {
								Ext.MessageBox.confirm(grooveTranslator
												.getLangLabel(
														'common-language',
														'prompt'),
										grooveTranslator.getLangLabel(
												'gapsetting-language',
												'icon-delete-prompt"'),
										function(btn) {
											if (btn == 'yes') {
												Ext.MessageBox
														.wait(grooveTranslator
																.getLangLabel(
																		'common-language',
																		'delete-loading'));
												Ext.Ajax.request({
													url : context
															+ '/system/system.do?method=configureimg',
													method : 'POST',
													async : false,
													params : {
														imgName : imgName
													},
													success : function(
															response, options) {
														var o = Ext.util.JSON
																.decode(response.responseText);
														if (o.success) {
															Ext.MessageBox
																	.hide();

															win.close();
															win = null;
															Ext
																	.getCmp('systemConfigureForm')
																	.remove(Ext
																			.getCmp(imgName));

															Ext
																	.getCmp('systemConfigureForm')
																	.doLayout();

															if (imgName == 'icon') {
																Ext
																		.getCmp('systemConfigureForm')
																		.insert(
																				8,
																				{
																					name : 'icon',
																					fieldLabel : grooveTranslator
																							.getLangLabel(
																									'gapsetting-language',
																									'icon'),
																					inputType : 'file',
																					xtype : 'textfield'
																				});
															} else if (imgName == 'thumb') {
																Ext
																		.getCmp('systemConfigureForm')
																		.insert(
																				9,
																				{
																					name : 'thumb',
																					fieldLabel : grooveTranslator
																							.getLangLabel(
																									'gapsetting-language',
																									'thumb'),
																					inputType : 'file',
																					xtype : 'textfield'
																				});
															}

															Ext
																	.getCmp('systemConfigureForm')
																	.doLayout();
														} else {
															Ext.MessageBox
																	.alert(grooveTranslator
																			.getLangLabel(
																					'gapsetting-language',
																					'icon-delete-failure'));
														}
													}
												})
											}
										});

							}
						}, {
							text : grooveTranslator.getLangLabel(
									'common-language', 'close'),
							handler : function() {
								win.close();
								win = null;
							}
						}]
					});
					win.show(this);
				};
				if (this.forId) {
					this.el.setAttribute('htmlFor', this.forId);
				}
			}
			Ext.form.Label.superclass.onRender.call(this, ct, position);
		}
	});
	Ext.reg('editimg', Ext.form.editimg);

	Ext.form.viewimg = Ext.extend(Ext.BoxComponent, {
				onRender : function(ct, position) {
					if (!this.el) {
						this.el = document.createElement('img');
						this.el.src = this.src;
						if (this.forId) {
							this.el.setAttribute('htmlFor', this.forId);
						}
					}
					Ext.form.Label.superclass.onRender.call(this, ct, position);
				}
			});
	Ext.reg('viewimg', Ext.form.viewimg);

	var formPanel = new Ext.FormPanel({
				id : 'systemConfigureForm',
				labelWidth : 150, // label settings here
				// cascade unless
				frame : false,
				bodyStyle : 'border:0px; padding:5px;',
				border : false,
				defaultType : 'textfield',
				fileUpload : true,
				defaults : {
					width : 350
				},
				items : [{
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_name'),
					name : 'systemName',
					allowBlank : false
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_login'),
					name : 'systemLogin'
				}, {
					name : 'systemWelcome',
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_welcome')
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_index'),
					name : 'systemIndex'
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_desktop'),
					name : 'systemDesktop'
				}, {
					name : 'systemTitle',
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_title')
				}, {
					name : 'systemCopyright',
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_copyright')
				}, {
					name : 'systemVersion',
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_version')
				}, {
					name : 'systemProducer',
					fieldLabel : grooveTranslator.getLangLabel(
							'gapsetting-language', 'sys_producer')
				}]
			});

	formPanel.getForm().load({
		url : context + '/system/console/application.jsp',
		success : function(form, action) {
			if (action.result.data.systemIcon == '') {
				formPanel.add({
							name : 'icon',
							fieldLabel : grooveTranslator.getLangLabel(
									'gapsetting-language', 'icon'),
							inputType : 'file',
							xtype : 'textfield'
						})
			} else {
				formPanel.add({
							id : 'icon',
							fieldLabel : grooveTranslator.getLangLabel(
									'gapsetting-language', 'icon'),
							xtype : 'editimg',
							width : 16,
							height : 16,
							formName : 'icon',
							src : context + action.result.data.systemIcon
						})
			}
			if (action.result.data.systemThumb == '') {
				formPanel.add({
							name : 'thumb',
							fieldLabel : grooveTranslator.getLangLabel(
									'gapsetting-language', 'thumb'),
							inputType : 'file',
							xtype : 'textfield'
						})
			} else {
				formPanel.add({
							id : 'thumb',
							fieldLabel : grooveTranslator.getLangLabel(
									'gapsetting-language', 'thumb'),
							xtype : 'editimg',
							width : 400,
							height : 150,
							formName : 'thumb',
							src : context + action.result.data.systemThumb
						})
			}

			formPanel.doLayout();
		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
					'load-failure'));
		}
	});

	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 600,
		height : 500,
		title : grooveTranslator.getLangLabel('gapsetting-language',
				'setting-title'),
		resizable : false,
		plain : true,
		modal : true,

		items : [formPanel],

		buttons : [{
			text : grooveTranslator.getLangLabel('gapsetting-language',
					'setting-update'),
			handler : function() {
				if (formPanel.getForm().isValid()) {
					Ext.MessageBox.confirm(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel(
									'gapsetting-language', 'setting-prompt'),
							function(btn) {
								if (btn == 'yes') {
									Ext.MessageBox.wait(grooveTranslator
											.getLangLabel('common-language',
													'submit-loading'));
									formPanel.getForm().submit({
										url : context
												+ '/system/system.do?method=configure',
										method : 'POST',
										params : {},
										success : function(form, action) {
											Ext.Msg
													.alert(
															grooveTranslator
																	.getLangLabel(
																			'common-language',
																			'prompt'),
															grooveTranslator
																	.getLangLabel(
																			'gapsetting-language',
																			'setting-success'));
											win.close();
											win = null;
										},
										failure : function(response, options) {
											Ext.Msg
													.alert(
															grooveTranslator
																	.getLangLabel(
																			'common-language',
																			'prompt'),
															grooveTranslator
																	.getLangLabel(
																			'gapsetting-language',
																			'setting-failure'));
										}
									});
								}
							});
				}

			}
		}, {
			text : grooveTranslator.getLangLabel('gapsetting-language',
					'setting-upload'),
			handler : function() {
				document.getElementById('dldfrm').src = context
						+ '/system/system.do?method=loadInitFile';
			}

		}, {
			text : grooveTranslator.getLangLabel('common-language', 'close'),
			handler : function() {
				win.close();
				win = null;
			}
		}]
	});
	win.show(this);

}