Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';

Ext.onReady(function() {
	var tabs = new Ext.TabPanel({
				id : 'consoletabs',
				region : 'center', // a center region is ALWAYS
				// required for border layout
				closable : true,
				resizeTabs : true,
				minTabWidth : 135,
				tabWidth : 135,
				deferredRender : false,
				enableTabScroll : true,
				margins : '0 5 5 0',
				activeTab : 0, // first tab initially active
				items : []
			});

	// Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	var tree = new Ext.tree.TreePanel({
		region : 'center',
		useArrows : true,
		autoScroll : false,
		animate : false,
		enableDD : false,
		containerScroll : true,
		rootVisible : false,
		singleExpand : false,
		animate : true,
		border : false,
		frame : false,
		layout : 'fit',
		root : {
			nodeType : 'async'
		},
		// auto create TreeLoader
		dataUrl : context + '/system/console/menutree.json',
		listeners : {
			/*
			 * 'render' : function(tp) {
			 * tp.getSelectionModel().on('selectionchange', function(tree, node) {
			 * if (node && node.leaf) { //
			 * showMenuOnTab(node.text,node.attributes.url); showme(node.id,
			 * node.text, node.attributes.url); } else if (node && !node.leaf) {
			 * node.expand(true); } }) }
			 */
			'click' : function(node) {
				if (node && node.leaf) {
					if (node.attributes.openType
							&& node.attributes.openType == 'open') {
						showMenuOnOpen(node.id, node.text, node.attributes.func);
					} else {
						showMenuOnTab(node.id, node.text, node.attributes.func);
					}
				} else if (node && !node.leaf && !node.isExpanded()) {
					node.expand(true);
				} else if (node && !node.leaf && node.isExpanded()) {
					node.collapse(true);
				}
			}

		}
	});

	var viewport = new Ext.Viewport({
		layout : 'border',
		items : [
				// create instance immediately
				new Ext.BoxComponent({
							region : 'north',
							cls : 'docs-header',
							el : 'header',
							border : false,
							margins : '0 0 5 0'
						}), {
					region : 'west',
					id : 'west-panel', // see Ext.getCmp() below
					title : '控制台工具栏',
					split : true,
					width : 210,
					maxSize : 400,
					collapsible : true,
					autoScroll : true,
					autoHeight : false,
					// autoWidth: true,
					margins : '0 0 5 5',
					tbar : [' ', {
								iconCls : 'icon-expand-all',
								tooltip : '全部展开',
								handler : function() {
									tree.root.expand(true);
								},
								text : "展开",
								scope : this
							}, '-', {
								iconCls : 'icon-collapse-all',
								tooltip : '全部收缩',
								handler : function() {
									tree.root.collapse(true);
								},
								text : "收缩",
								scope : this
							}, '-', {
								text : '功能菜单',
								menu : [{
											iconCls : 'param',
											tooltip : '系统核心配置参数',
											handler : function() {
												showSystemParam();
											},
											text : "系统参数",
											scope : this
										}, {
											iconCls : 'cmd',
											tooltip : '将在Groove基础上开发的模块菜单及系统角色信息导出未可用于初始化配置的xml文件',
											handler : function() {
												downloadSystemInit();
											},
											text : "系统配置",
											scope : this
										}, {
											iconCls : 'pwd',
											tooltip : '密码管理',
											handler : function() {
												editPWD();
											},
											text : "密码管理",
											scope : this
										}, {
											iconCls : 'log',
											tooltip : '系统访问日志',
											handler : function() {
												initDesktopPortal();
											},
											text : "系统日志",
											scope : this
										}, {
											iconCls : 'icon-quit',
											tooltip : '退出控制台',
											handler : function() {
												Ext.MessageBox.confirm('确认',
														'确定要退出系统控制台吗？', logout);
											},
											text : "退出",
											scope : this
										}]
								// <-- Add the action directly to a menu
							}],
					items : [tree]
				}, tabs
		// in this instance the TabPanel is not wrapped by another panel
		// since no title is needed, this Panel is added directly
		// as a Container
		]
	});

	// tree.getNode().expand(true);
	tree.root.expand(true);

	initDesktopPortal('helptabs', 'desktopCenter');

	// tree.height = Ext.getCmp("west-panel").getHeight() + 80;

	// get a reference to the HTML element with id "hideit" and add a click
	// listener to it
	/*
	 * Ext.get("hideit").on('click', function() { // get a reference to the
	 * Panel that was created with id = // 'west-panel' var w =
	 * Ext.getCmp('west-panel'); // expand or collapse that Panel based on its
	 * collapsed property // state w.collapsed ? w.expand() : w.collapse(); });
	 */

	setTimeout(function() {
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({
							remove : true
						});
			}, 250);
	var index = 2;

	/* 退出系统 */
	function logout(e) {
		if (e == "yes") {
			document.location = context + '/system/console?method=logout';
		}
	}
});

/* tab 页中显示 */
function showMenuOnTab(id, tlt, func) {
	var tabid = 'tab_' + id;

	if (!Ext.getCmp(tabid)) {
		eval('var tabObj = ' + func + '("' + tabid + '");');
		Ext.getCmp('consoletabs').add(tabObj);
	}

	Ext.getCmp('consoletabs').setActiveTab(tabid);
}

/* 弹出窗口显示 */
function showMenuOnOpen(id, tlt, func) {
	eval(func + '("' + id + '", "' + tlt + '");');
}

function showSystemParam() {
	var runtimeParamsForm = new Ext.FormPanel({
				id : 'runtimeParamsForm',
				labelWidth : 100, // label settings here
				// cascade unless
				frame : false,
				bodyStyle : 'border:0px; padding:5px;',
				border : false,
				width : 400,
				defaultType : 'textfield',
				defaults : {
					width : 250
				},
				items : [{
							fieldLabel : '系统版本号',
							readOnly : true,
							value : GROOVE_VERSION
						}, {
							fieldLabel : '访问IP',
							readOnly : true,
							value : XSYSTEM_CONSOLE_IP
						}, {
							fieldLabel : '字符集',
							readOnly : true,
							value : XSYSTEM_CHARSETNAME
						}, {
							fieldLabel : '会话过滤',
							readOnly : true,
							value : XSYSTEM_SESSIONFILTER
						}, {
							fieldLabel : '浏览器过滤',
							readOnly : true,
							value : XSYSTEM_CHECKBROWSER
						}, {
							fieldLabel : '数据源',
							readOnly : true,
							value : XSYSTEM_DATASOURCE
						}, {
							fieldLabel : '数据库类型',
							readOnly : true,
							value : XSYSTEM_DB
						}, {
							fieldLabel : '附件处理器',
							readOnly : true,
							xtype : 'textarea',
							height : 40,
							value : XSYSTEM_ANNEX_TRANSACTOR
						}, {
							fieldLabel : '内存总量',
							readOnly : true,
							value : totalMemory
						}, {
							fieldLabel : '最大内存量',
							readOnly : true,
							value : maxMemory
						}, {
							fieldLabel : '空闲内存量',
							readOnly : true,
							value : freeMemory
						}]
			});

	var runtimeParamsWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 400,
				title : '系统运行期参数',
				resizable : false,
				plain : true,
				modal : true,

				items : [runtimeParamsForm],

				buttons : [{
							text : '关 闭',
							handler : function() {
								runtimeParamsWin.close();
								runtimeParamsWin = null;
							}
						}]
			});
	runtimeParamsWin.show(this);
}

/**
 * 下载系统初始化配置
 */
function downloadSystemInit() {
	Ext.form.editimg = Ext.extend(Ext.BoxComponent, {
		onRender : function(ct, position) {
			if (!this.el) {
				this.el = document.createElement('img');
				this.el.src = this.src;
				this.el.title = '点击可编辑该图片';
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
											fieldLabel : '原图',
											xtype : 'viewimg',
											src : this.src
										}, {
											name : imgName,
											fieldLabel : '新图',
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
						title : '图片编辑窗口',
						resizable : true,
						plain : true,
						modal : true,

						items : [imgFormPanel],

						buttons : [{
							text : ' 更 新 ',
							handler : function() {
								if (imgFormPanel.getForm().isValid()) {
									Ext.MessageBox.confirm('提示', '确定更新图片',
											function(btn) {
												if (btn == 'yes') {
													Ext.MessageBox
															.wait('更新过程中...');
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
																					'提示',
																					'更新图片成功');
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
																					'提示',
																					'更新图片失败');
																}
															});
												}
											});
								}
							}
						}, {
							text : ' 删 除 ',
							handler : function() {
								Ext.MessageBox.confirm('提示', '确定删除图片',
										function(btn) {
											if (btn == 'yes') {
												Ext.MessageBox.wait('删除过程中...');
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
																				9,
																				{
																					name : 'icon',
																					fieldLabel : '视窗ICON',
																					inputType : 'file',
																					xtype : 'textfield'
																				});
															} else if (imgName == 'thumb') {
																Ext
																		.getCmp('systemConfigureForm')
																		.insert(
																				10,
																				{
																					name : 'thumb',
																					fieldLabel : '系统缩略图',
																					inputType : 'file',
																					xtype : 'textfield'
																				});
															}

															Ext
																	.getCmp('systemConfigureForm')
																	.doLayout();
														} else {
															Ext.MessageBox
																	.alert('删除图片失败');
														}
													}
												})
											}
										});

							}
						}, {
							text : ' 关 闭 ',
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
							fieldLabel : 'System Name',
							name : 'systemName',
							allowBlank : false
						}, {
							fieldLabel : 'Login page',
							name : 'systemLogin'
						}, {
							name : 'systemWelcome',
							fieldLabel : 'Greeting'
						}, {
							fieldLabel : 'Home page',
							name : 'systemIndex'
						}, {
							fieldLabel : 'Desktop page',
							name : 'systemDesktop'
						}, {
							name : 'systemTitle',
							fieldLabel : 'Home title'
						}, {
							name : 'systemCopyright',
							fieldLabel : 'Copyright'
						}, {
							name : 'systemVersion',
							fieldLabel : 'Version'
						}, {
							name : 'systemProducer',
							fieldLabel : 'Vendor'
						}]
			});

	formPanel.getForm().load({
				url : context + '/system/console/application.jsp',
				success : function(form, action) {
					if (action.result.data.systemIcon == '') {
						formPanel.add({
									name : 'icon',
									fieldLabel : 'Windows ICON',
									inputType : 'file',
									xtype : 'textfield'
								})
					} else {
						formPanel.add({
									id : 'icon',
									fieldLabel : 'Windows ICON',
									xtype : 'editimg',
									width : 16,
									height : 16,
									formName : 'icon',
									src : context
											+ action.result.data.systemIcon
								})
					}
					if (action.result.data.systemThumb == '') {
						formPanel.add({
									name : 'thumb',
									fieldLabel : 'Thumbnail',
									inputType : 'file',
									xtype : 'textfield'
								})
					} else {
						formPanel.add({
									id : 'thumb',
									fieldLabel : 'Thumbnail',
									xtype : 'editimg',
									width : 400,
									height : 150,
									formName : 'thumb',
									src : context
											+ action.result.data.systemThumb
								})
					}

					formPanel.doLayout();
				},
				failure : function(form, action) {
					Ext.Msg.alert('获取系统配置信息失败');
				}
			});

	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 600,
		height : 500,
		title : 'Settings',
		resizable : false,
		plain : true,
		modal : true,

		items : [formPanel],

		buttons : [{
			text : ' Edit Settings ',
			handler : function() {
				if (formPanel.getForm().isValid()) {
					Ext.MessageBox.confirm('提示', '确定更新系统配置', function(btn) {
								if (btn == 'yes') {
									Ext.MessageBox.wait('提交处理过程中...');
									formPanel.getForm().submit({
										url : context
												+ '/system/system.do?method=configure',
										method : 'POST',
										params : {},
										success : function(form, action) {
											Ext.Msg.alert('提示', '系统配置成功');
											win.close();
											win = null;
										},
										failure : function(response, options) {
											Ext.Msg.alert('提示', '系统配置失败');
										}
									});
								}
							});
				}

			}
		}, {
			text : ' Download Module ',
			handler : function() {
				document.getElementById('dldfrm').src = context
						+ '/system/system.do?method=loadInitFile';
			}

		}, {
			text : ' Close ',
			handler : function() {
				win.close();
				win = null;
			}
		}]
	});
	win.show(this);

}