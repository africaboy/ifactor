document.write('<script src="' + context
		+ '/resources/common/js/hashmap.js"></script>');

// user js & ss
document.write('<link rel="stylesheet" href="' + context
		+ '/system/user/css/usermanage.css"></script>');
document.write('<script src="' + context
		+ '/system/user/js/usermanage.js"></script>');
// group js & css
document.write('<link rel="stylesheet" href="' + context
		+ '/system/group/css/groupmanage.css"></script>');
document.write('<script src="' + context
		+ '/system/group/js/groupmanage.js"></script>');
// role js & css
document.write('<link rel="stylesheet" href="' + context
		+ '/system/role/css/rolemanage.css"></script>');
document.write('<script src="' + context
		+ '/system/role/js/rolemanage.js"></script>');
// log js & css
document.write('<link rel="stylesheet" href="' + context
		+ '/system/log/css/logmanage.css"></script>');
document.write('<script src="' + context
		+ '/system/log/js/logmanage.js"></script>');
// module js & css
document.write('<link rel="stylesheet" href="' + context
		+ '/system/module/css/modulemanage.css"></script>');
document.write('<script src="' + context
		+ '/system/module/js/modulemanage.js"></script>');
// purview js & css
document.write('<link rel="stylesheet" href="' + context
		+ '/system/purview/css/purviewmanage.css"></script>');
document.write('<script src="' + context
		+ '/system/purview/js/purviewmanage.js"></script>');
// object js & css
document.write('<link rel="stylesheet" href="' + context
		+ '/system/object/css/objectmanage.css"></script>');
document.write('<script src="' + context
		+ '/system/object/js/objectlist.js"></script>');
document.write('<script src="' + context
		+ '/system/object/js/objectlist.js"></script>');
document.write('<script src="' + context
		+ '/system/object/js/addobject.js"></script>');
document.write('<script src="' + context
		+ '/system/object/js/editobject.js"></script>');
document.write('<script src="' + context
		+ '/system/object/js/copyobject.js"></script>');
// wordbook js & css
document.write('<link rel="stylesheet" href="' + context
		+ '/system/wordbook/css/wbmanage.css"></script>');
document.write('<script src="' + context
		+ '/system/wordbook/js/wbmanage.js"></script>');
// tablequery js & css
document.write('<link rel="stylesheet" href="' + context
		+ '/system/tablequery/css/querymanage.css"></script>');
document.write('<script src="' + context
		+ '/system/tablequery/js/querymanage.js"></script>');

function getService(serviceType, panelid) {
	var store = Ext.create('Ext.data.TreeStore', {
				root : {
					expanded : true
				},
				proxy : {
					type : 'ajax',
					reader : 'json',
					url : context + '/GAP/treedata/' + serviceType
							+ '_TreeData.json'
				}
			});

	var treePanel = Ext.create('Ext.tree.Panel', {
				id : 'TreePanel_' + serviceType,
				split : false,
				border : false,
				frame : false,
				animate : true,
				useArrows : true,
				rootVisible : false,
				autoScroll : true,
				margins : '0 0 0 0',
				store : store,
				listeners : {
					'itemclick' : function(view, record) {
						if (record && record.data.leaf) {
							if (record.raw.openType == 'open') {
								showMenuOnOpen(record.data.id,
										record.data.text, record.raw.func);
							} else {
								showMenuOnTab(record.data.id, record.data.text,
										record.raw.func, Ext.getCmp(panelid));
							}
						} else if (!record.data.leaf && !record.data.expanded) {
							view.expand(record);
						} else if (!record.data.leaf && record.data.expanded) {
							view.collapse(record);
						}
					}

				}
			});

	return treePanel;
}

/* 弹出窗口显示 */
function showMenuOnOpen(id, tlt, func) {
	eval(func + '("' + id + '", "' + tlt + '");');
}

/* tab 页中显示 */
function showMenuOnTab(id, tlt, func, panel) {
	var cardid = 'card_' + id;

	if (!Ext.getCmp(cardid)) {
		// 当前正在显示的item
		var active = panel.items.indexOf(panel.getLayout().getActiveItem());

		eval('var tabObj = ' + func + '("' + cardid + '");');
		// 增加新item
		panel.add(tabObj);
		// 显示新item
		panel.getLayout().setActiveItem(cardid);
	} else {
		panel.getLayout().setActiveItem(cardid);
	}

	// Ext.getCmp('consoletabs').setActiveTab(tabid);
}