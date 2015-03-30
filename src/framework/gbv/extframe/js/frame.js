Ext.onReady(function() {	
	var tree = new Ext.tree.TreePanel({
				renderTo : 'side',
				title : '功能菜单导航',
				//height : Ext.get('side').dom.offsetHeight,
				height : 500,
				useArrows : true,
				autoScroll : true,
				animate : true,
				enableDD : true,
				containerScroll : true,
				rootVisible : false,
				frame : true,
				root : {
					nodeType : 'async'
				},

				// auto create TreeLoader
				dataUrl : context + '/extframe/js/check-nodes.json',

				listeners : {
					'checkchange' : function(node, checked) {
						if (checked) {
							node.getUI().addClass('complete');
						} else {
							node.getUI().removeClass('complete');
						}
					}
				}
			});

	tree.getRootNode().expand(true);
});