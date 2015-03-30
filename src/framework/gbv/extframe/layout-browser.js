document.write("<script src=\"" + context
		+ "/system/user/js/editpwd.js\"></script>");

Ext.onReady(function() {
	Ext.get('loading-indicator').dom.appendChild(document.createTextNode(grooveTranslator.getLangLabel('console-language', 'loading')));

	Ext.QuickTips.init();
	Ext.apply(Ext.QuickTips.getQuickTip(), {
				dismissDelay : 0
			});
	Ext.form.Field.prototype.msgTarget = 'side';

	// Ext.Ajax.timeout = 9000; //90秒

	var scrollerMenu = new Ext.ux.TabScrollerMenu({
				maxText : 15,
				pageSize : 5
			});

	/*
	 * { iconCls : 'refresh', tooltip : '刷新工作区页面', handler : function() {
	 * refre(); }, text : '刷新选项卡', scope : this }
	 */

	var tbarItems = [{
				iconCls : 'pwd',
				handler : function() {
					editPWD();
				},
				text : grooveTranslator.getLangLabel('extframe-language',
						'editpwd'),
				scope : this
			}];

	if (roles.containsKey('admin')) {
		tbarItems.push('->', {
					iconCls : 'console',
					handler : function() {
						Ext.get('menuhref').dom.href = context
								+ '/system/console?lang=' + grooveTranslator.language();
						Ext.get('menuhref').dom.target = '_blank';
						Ext.get('menuhref').dom.click();
					},
					text : grooveTranslator.getLangLabel('extframe-language',
							'console'),
					scope : this
				});

		tbarItems.push('-', new Ext.ux.ThemeChange(), '-', {
			iconCls : 'logout',
			handler : function() {
				logout();
			},
			text : grooveTranslator.getLangLabel('extframe-language', 'logout'),
			scope : this
		});
	} else {
		tbarItems.push('->', new Ext.ux.ThemeChange(), '-', {
			iconCls : 'logout',
			handler : function() {
				logout();
			},
			text : grooveTranslator.getLangLabel('extframe-language', 'logout'),
			scope : this
		});
	}

	var tabs = new Ext.TabPanel({
				id : 'consoletabs',
				region : 'center', // a center region is ALWAYS
				// required for border layout
				closable : true,
				resizeTabs : true,
				minTabWidth : 150,
				tabWidth : 100,
				border : false,
				frame : false,
				deferredRender : false,
				enableTabScroll : true,
				activeTab : 0, // first tab initially active
				plugins : [scrollerMenu],
				items : []
			});

	tabs.on('afterrender', function(thiz) {
				if (methods.canFunction('consoleTabPanelRender')) {
					consoleTabPanelRender('consoletabs', 'consoleheader',
							'consoletcenter');
				} else {
					tabs.add({
						id : 'desktop',
						title : grooveTranslator.getLangLabel(
								'extframe-language', 'desktop'),
						tabWidth : 100,
						iconCls : 'desktop',
						closable : false,
						items : []
					}).show();
				}
			});

	// Go ahead and create the TreePanel now so that we can use it below
	var treePanel = new Ext.tree.TreePanel({
		id : 'tree-panel',
		title : grooveTranslator
				.getLangLabel('extframe-language', 'modulemenu'),
		split : true,
		layout : 'fit',
		region : 'west',
		width : 245,
		minWidth : 245,
		maxWidth : 300,
		animCollapse : true,
		collapseMode : 'mini',
		collapsed : false,
		collapsible : false,
		autoScroll : true,
		border : false,
		// tree-specific configs:
		rootVisible : false,
		lines : false,
		singleExpand : false,
		useArrows : true,
		dataUrl : context + '/system/module/menutreejson.jsp',

		root : new Ext.tree.AsyncTreeNode(),
		listeners : {
			'click' : function(node) {
				if (node && node.leaf) {
					if (node.attributes.mnblank == 1) {
						Ext.get('menuhref').dom.href = context
								+ node.attributes.mnurl;
						Ext.get('menuhref').dom.target = '_blank';
						Ext.get('menuhref').dom.click();
						// showWindow(node.attributes.mnurl, 800, 600);
					} else {
						var tabid = 'tab_' + node.attributes.realid;

						var url = node.attributes.mnurl;

						if (url.indexOf('javascript:') > -1) {
							var func = url.substring(url.indexOf('javascript:')
									+ 11);

							var m = null;

							if (func.indexOf('?') > -1) {
								m = urlToObject(func);

								func = func.substring(0, func.indexOf('?'));
							}

							if (func == null || func == '') {
								Ext.Msg.alert(grooveTranslator.getLangLabel(
												'common-language', 'prompt'),
										'<' + node.text + '> -> <pre>'
												+ node.attributes.mnurl
												+ '</pre> is invalid.');
								return;
							}

							if (!Ext.getCmp(tabid)) {
								showMenuOnTab(tabid, node.attributes.realid,
										node.text, func, m);

							} else {
								Ext.getCmp('consoletabs').setActiveTab(tabid);
								/*
								 * Ext.get(tabid + '_frm').dom.src = context +
								 * node.attributes.mnurl;
								 */
							}
						} else {
							var tabid = 'tab_' + node.attributes.realid;

							if (!Ext.getCmp(tabid)) {
								Ext.getCmp('consoletabs').add({
									id : tabid,
									title : node.text,
									tabTip : node.attributes.mnmemo == ''
											? (node.parentNode.text + '/' + node.text)
											: node.attributes.mnmemo,
									iconCls : 'tabs',
									html : '<iframe src="'
											+ context
											+ node.attributes.mnurl
											+ '" id="'
											+ tabid
											+ '_frm" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>',
									closable : true
								}).show();
							} else {
								Ext.getCmp('consoletabs').setActiveTab(tabid);
								/*
								 * Ext.get(tabid + '_frm').dom.src = context +
								 * node.attributes.mnurl;
								 */
							}
						}

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
				items : [{
							xtype : 'box',
							region : 'north',
							applyTo : 'header',
							id : 'consoleheader',
							height : 55
						}, {
							id : 'consoletcenter',
							region : 'center',
							layout : 'border',
							border : true,
							frame : false,
							tbar : new Ext.Toolbar({
										autoWidth : true,
										autoShow : true,
										items : tbarItems
									}),
							items : [treePanel, tabs]
						}],
				listeners : {
					'afterlayout' : function() {
						treePanel.expandAll();
					}
				}
			});
	$('userNameSpan').innerHTML = '<span class="left">'
			+ grooveTranslator.getLangLabel('extframe-language', 'user')
			+ '_</span> <span class="right">' + userName + '</span>';
	$('groupNameSpan').innerHTML = '<span class="left">'
			+ grooveTranslator.getLangLabel('extframe-language', 'group')
			+ '_</span> <span class="right">' + groupName + '</span>';

	setTimeout(function() {
				Ext.get('loading').remove();
				Ext.get('loading-mask').fadeOut({
							remove : true
						});
			}, 250);
});

/* 退出系统 */
function logout() {
	Ext.MessageBox.confirm(grooveTranslator.getLangLabel('common-language',
					'prompt'), grooveTranslator.getLangLabel(
					'extframe-language', 'logout-prompt'), function(e) {
				if (e == "yes") {
					document.location = context + '/system/logout.do?lang='
							+ grooveTranslator.language();
				}
			});

}

function refre() {
	var tab = Ext.getCmp('consoletabs').getActiveTab();
	var frm = Ext.get(tab.id + '_frm');
	if (frm != null) {
		frm.dom.src = frm.dom.src;
	}
}

/* tab 页中显示 */
// tabid
// id is menuId
// tlt is menuName
function showMenuOnTab(tabid, id, tlt, func, m) {
	if (!Ext.getCmp(tabid)) {
		var options = null;

		if (m != null) {
			options = fineDispersion(m);
			options['tabid'] = tabid;
			options['tabcontainerid'] = 'consoletabs';
			options['title'] = tlt;
		} else {
			options = {
				'tabid' : tabid,
				'tabcontainerid' : 'consoletabs',
				'title' : tlt
			};
		}

		eval('var tabObj = ' + func + '(' + Ext.util.JSON.encode(options)
				+ ');');
	}

	Ext.getCmp('consoletabs').setActiveTab(tabid);
}

/**
 * load wordbook menu
 * 
 * @param {}
 *            options
 */
function wordbookMenu(options) {
	var tabObj = initWordbookGrid(options);

	tabObj.setIconClass('tabs');

	Ext.getCmp(options.tabcontainerid).add(tabObj);
}

/**
 * load table query menu
 * 
 * @param {}
 *            options
 */
function tablequeryMenu(options) {
	initTQExtTabList(options);
}

/**
 * load table view menu
 * 
 * @param {}
 *            options
 */
function tableviewMenu(options) {
	initTableViewTab(options);
}

/**
 * load table view menu
 * <p>
 * pop window
 * </p>
 * 
 * @param {}
 *            options
 */
function tableviewMenu4Window(options) {
	initTableViewWindow(options);
}

/**
 * 
 * @param {}
 *            options
 */
function workflowMenuTab(options) {
	options.todoMode = 'tab';
	startWorkflow(options);
}

function workflowMenuWindow(options) {
	options.todoMode = 'window';
	startWorkflow(options);
}

function todoMenuTab(options) {
	initTodoListTab(options);
}

function todoMenuWindow(options) {
	initTodoListWindow(options);
}

/**
 * find menu parameters,notice reserved word
 * 
 * @param {}
 *            json
 * @return {}
 */
function fineDispersion(json) {
	var m = {
		params : {}
	};
	if (json != null) {
		for (var i in json) {
			var key = i;

			if (typeof json[i] == 'object') {
				fineDispersion(json[i]);
			} else {

				if (key != 'id' && key != 'querykey' && key != 'key'
						&& key != 'fileName') {
					m.params[key] = json[i];
				} else {
					m[key] = json[i];
				}
			}
		}
	}

	return m;
}

/**
 * 初始化快捷方式
 * 
 * @return {}
 */
function initShortcutPanel() {
	var menu_ds = new Ext.data.JsonStore({
				remoteSort : false,
				root : 'menuList',
				fields : ['realid', 'url', 'name', 'image', 'mname', 'mnicon'],
				proxy : new Ext.data.HttpProxy({
							url : context + '/system/guide.do?method=shortcut'
						})
			});
	var dataview = new Ext.DataView({
		store : menu_ds,
		tpl : new Ext.XTemplate(
				'<ul>',
				'<tpl for=".">',
				'<li title="{mname}/{name}" class="menu" onclick="javascript:doShortcutClick(\'{realid}\',\'{url}\',\'{name}\');">',
				'<img width="32" height="32" src="' + context + '{mnicon}" />',
				'<strong>{name}</strong>', '</li>', '</tpl>', '</ul>'),

		id : 'shortcutmenus',
		itemSelector : 'li.menu',
		overClass : 'menu-hover',
		singleSelect : true,
		autoScroll : true
	});

	menu_ds.load({
				callback : function(records, options, success) {
					if (records.length > 15) {
						// tree-panel in extfreme index.jsp
						Ext.getCmp('tree-panel').expand();
					}
				}
			});
	var menupanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				height : 300,
				width : 550,
				items : dataview
			});
	return menupanel;
}

/**
 * 快捷菜单项单击事件
 * 
 * @param {}
 *            realid
 * @param {}
 *            url
 * @param {}
 *            name
 */
function doShortcutClick(realid, url, name) {

	Ext.getCmp('shortcutmenu').hide
			.defer(0, Ext.getCmp('shortcutmenu'), [true]);

	var tabid = 'tab_' + realid;

	if (url.indexOf('javascript:') > -1) {
		var func = url.substring(url.indexOf('javascript:') + 11);

		var m = null;

		if (func.indexOf('?') > -1) {
			m = urlToObject(func);

			func = func.substring(0, func.indexOf('?'));
		}

		if (func == null || func == '') {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), '<' + node.text + '> -> <pre>'
							+ node.attributes.mnurl + '</pre> is invalid.');
			return;
		}

		if (!Ext.getCmp(tabid)) {
			showMenuOnTab(tabid, realid, name, func, m);

		} else {
			Ext.getCmp('consoletabs').setActiveTab(tabid);
		}
	} else {
		var tabid = 'tab_' + realid;

		if (!Ext.getCmp(tabid)) {
			Ext.getCmp('consoletabs').add({
				id : tabid,
				title : name,
				iconCls : 'tabs',
				html : '<iframe src="'
						+ context
						+ url
						+ '" id="'
						+ tabid
						+ '_frm" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>',
				closable : true
			}).show();
		} else {
			Ext.getCmp('consoletabs').setActiveTab(tabid);
		}
	}
}