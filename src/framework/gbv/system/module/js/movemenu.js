// var srcMenuId;

/**
 * 移动菜单
 * 
 * @param {}
 *            id
 */
function moveMenu(id, name, type) {
	// srcMenuId = id;
	var targetId;
	var targetType;

	var root = new Ext.tree.AsyncTreeNode({
				text : grooveTranslator.getLangLabel('module-language',
						'tree-root'),
				draggable : false,
				id : '0'
			});

	var moduleTree = new Ext.tree.TreePanel({
				layout : 'fit',
				useArrows : false,
				autoScroll : true,
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
				dataUrl : context + '/system/module.do?method=allmoduletree'

			});

	moduleTree.on("click", function(node, event) {
				if (id == node.attributes.realid
						&& type == node.attributes.type) {
					Ext.getCmp('menuMoveButton').disable();
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('module-language',
									'move-failure-error1'));
				} else {
					var srcNode = moduleTree.getNodeById('menu_' + id);

					if (srcNode.parentNode.id == node.id) {
						Ext.getCmp('menuMoveButton').disable();
						Ext.Msg.alert(grooveTranslator.getLangLabel(
										'common-language', 'prompt'),
								grooveTranslator.getLangLabel(
										'module-language',
										'move-failure-error2'));
					} else {
						targetId = node.attributes.realid;
						targetType = node.attributes.type;
						Ext.getCmp('menuMoveButton').enable();
					}
				}
			});

	moduleTree.expandAll();

	var win = new Ext.Window({
		title : grooveTranslator.getLangLabel('module-language', 'menu')
				+ ' \''
				+ name
				+ '\' '
				+ grooveTranslator
						.getLangLabel('module-language', 'move-title'),
		renderTo : Ext.getBody(),
		closable : true,
		resizable : false,
		// maximizable : true,
		width : 350,
		height : 400,
		border : false,
		plain : true,
		layout : 'fit',
		modal : true,
		items : [moduleTree],
		buttons : [{
			id : 'menuMoveButton',
			disabled : true,
			text : grooveTranslator.getLangLabel('common-language', 'submit'),
			handler : function() {
				Ext.Ajax.request({
					url : context + "/system/module.do?method=move",
					method : 'POST',
					async : false,
					params : {
						id : id,
						targetId : targetId,
						targetType : targetType
					},
					success : function(response, options) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'module-language', 'move-failure'));
						} else {
							Ext.Msg
									.alert(	grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'module-language',
													'move-succcess'));
							moduleTreeReload();
							if (Ext.get("tab_menuedit")) {
								moduleTreeTabs.remove(0);
							}
							win.close();
							win = null;
						}
					}
				});
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