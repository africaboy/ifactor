document.write('<script src="' + context + '/GAP/js/GAPSetting.js"></script>');
document.write('<script src="' + context
		+ '/system/console/js/rightmenu.js"></script>');

Ext.onReady(function() {
	Ext.get('loading-indicator').dom.appendChild(document.createTextNode(grooveTranslator.getLangLabel('console-language', 'loading')));

	Ext.QuickTips.init();

	var contentPanel = {
		xtype : 'panel',
		title : grooveTranslator.getLangLabel('console-language',
				'centerpanel-title'),
		region : 'center',
		margins : '2 2 2 0',
		frame : true,
		border : false,
		items : [new Ext.FormPanel({
					id : 'runtimeParamsForm',
					labelWidth : 100, // label settings
					labelAlign : 'left',
					// here
					// cascade unless
					frame : false,
					bodyStyle : 'border:0px; padding:5px;',
					border : false,
					defaultType : 'textfield',
					defaults : {
						width : 300
					},
					items : [{
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-version-label'),
						readOnly : true,
						value : GROOVE_VERSION
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-ip-label'),
						readOnly : true,
						value : XSYSTEM_CONSOLE_IP
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-charset-label'),
						readOnly : true,
						value : XSYSTEM_CHARSETNAME
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-sessonfilter-label'),
						readOnly : true,
						value : XSYSTEM_SESSIONFILTER
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-checkbrowser-label'),
						readOnly : true,
						value : XSYSTEM_CHECKBROWSER
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-datasource-label'),
						readOnly : true,
						value : XSYSTEM_DATASOURCE
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-database-label'),
						readOnly : true,
						value : XSYSTEM_DB
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-annex-label'),
						readOnly : true,
						xtype : 'textarea',
						height : 40,
						value : XSYSTEM_ANNEX_TRANSACTOR
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-totalmemory-label'),
						readOnly : true,
						value : totalMemory
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-maxmemory-label'),
						readOnly : true,
						value : maxMemory
					}, {
						fieldLabel : grooveTranslator.getLangLabel(
								'console-language', 'param-freememory-label'),
						readOnly : true,
						value : freeMemory
					}]
				})]
	}

	var store = new Ext.data.JsonStore({
				url : context + '/GAP/data-view.json',
				root : 'images',
				fields : ['name', 'url', {
							name : 'desc',
							type : 'string'
						}, {
							name : 'shortname',
							type : 'string'
						}]
			});
	store.load({
				callback : function(r, options, success) {
					if (success) {
						for (var i = 0; i < r.length; i++) {
							var record = r[i];
							var v = record.data.shortname;

							record.set('shortname',
									grooveTranslator.getLangLabel(
											'console-language', v));
						}
					}
				}
			});

	var pwdButton = new Ext.Button({
				iconCls : 'icon-pwd',
				tooltip : grooveTranslator.getLangLabel('console-language',
						'pwdbutton-tooltip'),
				handler : function() {
					editPWD();
				},
				text : grooveTranslator.getLangLabel('console-language',
						'pwdbutton-text'),
				scope : this
			});
	// 系统设置
	var setButton = new Ext.Button({
				iconCls : 'icon-setting',
				tooltip : grooveTranslator.getLangLabel('console-language',
						'settingbutton-tooltip'),
				handler : function() {
					systemSetting();
				},
				text : grooveTranslator.getLangLabel('console-language',
						'settingbutton-text'),
				scope : this
			});
	// 退出系统
	var quitButton = new Ext.Button({
				iconCls : 'icon-quit',
				tooltip : grooveTranslator.getLangLabel('console-language',
						'logoutbutton-tooltip'),
				handler : function() {
					Ext.MessageBox.confirm(grooveTranslator.getLangLabel(
									'console-language',
									'logoutbutton-confirm-title'),
							grooveTranslator.getLangLabel('console-language',
									'logoutbutton-confirm-msg'), function(e) {
								if (e == "yes") {
									/*
									 * document.location = context +
									 * '/system/console?method=logout';
									 */
									document.location = context
											+ '/system/console?method=logout&lang='
											+ grooveTranslator.language();
								}
							});
				},
				text : grooveTranslator.getLangLabel('console-language',
						'logoutbutton-text'),
				scope : this
			});

	/**var tpl = new Ext.XTemplate(
			'<tpl for=".">',
			'<div class="thumb-wrap" id="{name}">',
			'<div class="thumb"><a href="javascript:void(0);" onclick="javascript:handleServiceTab(\'{name}\', \'{shortname}\');"><img src="{url}" width="96" height="96" title="{desc}"></a></div>',
			'<span class="x-editable">{shortname}</span></div>', '</tpl>',
			'<div class="x-clear"></div>');**/
	var tpl = new Ext.XTemplate(
			'<tpl for=".">',
			'<div class="thumb-wrap" id="{name}">',
			'<a href="javascript:void(0);" onclick="javascript:handleServiceTab(\'{name}\', \'{shortname}\');">',
			'<div class="thumb"><img src="{url}" width="96" height="96" title="{desc}"></div></a>',
			'<span class="x-editable">',
			'<a href="javascript:void(0);" style="text-decoration:none;color:#000000;" onclick="javascript:handleServiceTab(\'{name}\', \'{shortname}\');">{shortname}</a>',
			//'{shortname}',
			'</span></div></tpl>',
			'<div class="x-clear"></div>');

	var panel = new Ext.Panel({
				id : 'images-view',
				frame : false,
				border : false,
				autoHeight : true,
				collapsible : false,
				layout : 'fit',
				items : [new Ext.DataView({
							store : store,
							tpl : tpl,
							autoHeight : true,
							multiSelect : true,
							overClass : 'x-view-over',
							itemSelector : 'div.thumb-wrap',
							emptyText : 'No images to display',

							prepareData : function(data) {
								return data;
								/*
								 * data.shortName = Ext.util.Format
								 * .ellipsis(data.name, 15); data.sizeString =
								 * Ext.util.Format.fileSize(data.size);
								 * data.dateString = data.lastmod.format("m/d/Y
								 * g:i a"); return data;
								 */
							}
						})]
			});

	var tabs = new Ext.TabPanel({
				id : 'consoletabs',
				region : 'center', // a center region is ALWAYS required for
				// border layout
				deferredRender : false,
				activeTab : 0, // first tab initially active
				tbar : [
						grooveTranslator.getLangLabel('console-language',
								'sessionuser-label')
								+ '&nbsp;' + userName, ' ', '->', new Ext.ux.ThemeChange(), '-', pwdButton,
						setButton, quitButton],
				items : [{
					title : grooveTranslator.getLangLabel('console-language',
							'consoletab-title'),
					closable : false,
					autoScroll : true,
					layout : 'border',
					iconCls : 'icon-star',
					items : [{

						id : 'layout-browser',
						region : 'west',
						iconCls : 'icon-online',
						title : grooveTranslator.getLangLabel(
								'console-language', 'westpanel-title'),
						border : false,
						frame : true,
						split : true,
						animCollapse : true,
						collapseMode : 'mini',
						collapsed : false,
						collapsible : false,
						margins : '2 0 2 2',
						width : 1000,
						minSize : 1000,
						maxSize : 1000,
						items : [panel]
					}, contentPanel]
				}]
			});

	new Ext.Viewport({
		layout : 'border',
		title : 'Ext Layout Browser',
		items : [{
			xtype : 'box',
			region : 'north',
			autoEl : {
				tag : 'div',
				html : '<a href="'
						+ ownerURL
						+ '" target="_blank" style="float:right;margin-top:7px;margin-right:7px"><img src="'
						+ context
						+ ownerLogo
						+ '" style="width:200px;height:30px;"/></a>'
						+ '<span style="float:left;margin-left:15px;"><img src="'
						+ context + '/GAP/welcome/img/jet.png"/></span>'
			},
			height : 45
		}, tabs],
		renderTo : Ext.getBody()
	});

	setTimeout(function() {
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({
							remove : true
						});
			}, 250);
});

function handleServiceTab(name, label) {
	if (name == 'User') {
		showMenuOnTab(name, label, 'userlist');
	} else if (name == 'Group') {
		showgrouptree(name, label);
	} else if (name == 'GroupS') {
		showadjuesttree(name, label);
	} else if (name == 'Role') {
		showMenuOnTab(name, label, 'rolelist');
	} else if (name == 'Module') {
		showMenuOnTab(name, label, 'modulelist');
	} else if (name == 'TableQuery') {
		showMenuOnTab(name, label, 'tableQueryList');
	} else if (name == 'ObjectQuery') {
		showMenuOnTab(name, label, 'objectQueryList');
	} else if (name == 'View') {
		showMenuOnTab(name, label, 'objectlist');
	} else if (name == 'Workflow') {
		showMenuOnTab(name, label, 'workflowlist');
	} else if (name == 'Dataindex') {
		ddtree();
	} else if (name == 'Wordbook') {
		showMenuOnTab(name, label, 'wordbookList');
	} else if (name == 'Syslog') {
		showMenuOnTab(name, label, 'initLogList');
	} else if (name == 'Table') {
		showMenuOnTab(name, label, 'tableList');
	} else if (name == 'TableBackup') {
		showMenuOnTab(name, label, 'databackup');
	} else if (name == 'TableRestore') {
		showMenuOnTab(name, label, 'datarestore');
	} else if (name == 'Annex') {
		showMenuOnTab(name, label, 'annexlist');
	}
}

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