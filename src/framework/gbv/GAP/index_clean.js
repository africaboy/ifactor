document.write('<script src="' + context + '/GAP/js/GAPSetting.js"></script>');
document.write('<script src="' + context
		+ '/system/console/js/rightmenu.js"></script>');

Ext.onReady(function() {

	Ext.QuickTips.init();

	var contentPanel = {
		xtype : 'panel',
		title : '系统运行参数',
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
								fieldLabel : '系统版本号',
								readOnly : true,
								value : GROOVE_VERSION
							}, {
								fieldLabel : 'Console IP',
								readOnly : true,
								value : XSYSTEM_CONSOLE_IP
							}, {
								fieldLabel : '字符集',
								readOnly : true,
								value : XSYSTEM_CHARSETNAME
							}, {
								fieldLabel : '会话过滤器',
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
	store.load();

	var pwdButton = new Ext.Button({
				iconCls : 'icon-pwd',
				tooltip : '经常修改登录密码,加强安全防范管理',
				handler : function() {
					editPWD();
				},
				text : '密码管理',
				scope : this
			});
	// 系统设置
	var setButton = new Ext.Button({
				iconCls : 'icon-setting',
				tooltip : '系统全局参数设置',
				handler : function() {
					systemSetting();
				},
				text : '系统设置',
				scope : this
			});
	// 退出系统
	var quitButton = new Ext.Button({
				iconCls : 'icon-quit',
				tooltip : '注销当前会话,退出系统',
				handler : function() {
					Ext.MessageBox.confirm('确认', '确定退出系统？', function(e) {
								if (e == "yes") {
									/*
									 * document.location = context +
									 * '/system/console?method=logout';
									 */
									document.location = context
											+ '/system/console?method=logout';
								}
							});
				},
				text : '注销退出',
				scope : this
			});

	var tpl = new Ext.XTemplate(
			'<tpl for=".">',
			'<div class="thumb-wrap" id="{name}">',
			'<div class="thumb"><a href="javascript:void(0);" onclick="javascript:handleServiceTab(\'{name}\', \'{shortname}\');"><img src="{url}" width="96" height="96" title="{desc}"></a></div>',
			'<span class="x-editable">{shortname}</span></div>', '</tpl>',
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
				tbar : ['会话用户:&nbsp;' + userName, ' ', '->', pwdButton,
						setButton, quitButton],
				items : [{
							title : '应用支撑平台服务功能展区',
							closable : false,
							autoScroll : true,
							layout : 'border',
							iconCls : 'icon-star',
							items : [{

										id : 'layout-browser',
										region : 'west',
										iconCls : 'icon-online',
										title : '应用支撑服务组件',
										border : false,
										frame : true,
										split : false,
										margins : '2 2 2 2',
										width : 800,
										minSize : 700,
										maxSize : 720,
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
				html : ''
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