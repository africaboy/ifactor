var ddtreeJsonData = [];

dataIndexTreeWindow = function(config) {
	var contentroot = new Ext.tree.AsyncTreeNode({
							text : '数据字典',
							id : '-1',
							expanded : true,
							checked : false
						});
	this.dataIndexTree = new Ext.tree.TreePanel({
				height : 400,
				width : 300,
				useArrows : true,
				autoScroll : true,
				animate : true,
				enableDD : false,
				containerScroll : true,
				rootVisible : false,
				frame : true,
				root : contentroot,
				loader : new Ext.tree.TreeLoader({
					preloadChildren: true,
					baseAttrs : {
						uiProvider : Ext.tree.TreeCheckNodeUI
					} // 使用扩展，使其支持单选
						}),
				 listeners:{
		             'beforeload':function(node,e){
		                 this.getLoader().baseParams={'DI_KEY': this.di_key};
		             }
		         },
		        onlyLeafCheckable : true,
				checkModel : 'single'
			});
	this.dataIndexTree.expandAll();
	Ext.apply(this, config);
	dataIndexTreeWindow.superclass.constructor.call(this, {
				id : 'ddTreeWindow',
				title : '数据字典',
				closeAction : 'hide',
				layout : 'fit',
				width : 400,
				height : 400,
				resizable : true,
				modal : true,
				items : this.dataIndexTree,
				buttons : [{
							text : '确定',
							handler : function(button, e) {
								this.doSelect(e);
								this.hide();
							},
							scope : this
						}, {
							text : '取消',
							handler : function(button, e) {
								// this.resetInput();
								this.fireEvent('cancelClicked', this, e);
								if (this.cancelHandler) {
									this.cancelHandler.call(this.scope || this,
											this, e);
								} else {
									this.hide();
								}
							},
							scope : this
						}],
				listeners : {
					'hide' : function(node, checked) {
						var checkedArray = this.dataIndexTree.getChecked();
						if (checkedArray.length > 0) {
							checkedArray[0].getUI().checkbox.checked = false;

						}
						this.dataIndexTree.collapseAll();
						this.dataIndexTree.getRootNode().expand(true);

					}
				}
			});

};

Ext.extend(dataIndexTreeWindow, Ext.Window, {
			/** 确定按钮事件处理器 */
			okHandler : null,
			/** 取消按钮事件处理器 */
			cancelHandler : null,
			/** 事件触发时对象的工作域 */
			scope : null,
			/** 显示的数据类型key */
			di_key : null,
			/** 返回id保存域 */
			returnIdField : null,
			/** 返回name保存域 */
			returnNameField : null,
			/** 显示窗口 */
			showWindow : function(di_key,returnIdField, returnNameField) {
				this.di_key = di_key;
				this.returnIdField = returnIdField;
				this.returnNameField = returnNameField;
				this.show();
				var node ; 
				for(i   in   ddtreeJsonData){
				      if(ddtreeJsonData[i].key == di_key){
				      	node = ddtreeJsonData[i];
				      };
				      
				}
				
				while(this.dataIndexTree.root.firstChild) {
				  this.dataIndexTree.root.removeChild(this.dataIndexTree.root.firstChild);
				}
				if(node != null){
				this.dataIndexTree.root.appendChild(node);
				}
				 
				this.dataIndexTree.getRootNode().expandChildNodes();
			},

			/**
			 * 复制所选项
			 * 
			 * @param {}
			 *            event
			 */
			doSelect : function(event) {
				var selNodes = this.dataIndexTree.getChecked();
//				if (selNodes.length == 0) {
//					Ext.Msg.alert('提示', '请选择目标文件夹');
//					return false;
//				}
				var id = selNodes[0].id;
				var name = selNodes[0].text;
				var n = selNodes[0];
				while(n.parentNode && n.parentNode.attributes.parentId != '-1'){
					n= n.parentNode;
					name=n.text + "->" +name; 
				}
				if (document.getElementById(this.returnIdField)) {
					document.getElementById(this.returnIdField).value = (id);
				}
				if (document.getElementById(this.returnNameField)) {
					document.getElementById(this.returnNameField).value = (name);
				}

			},

			// private
			initComponent : function() {
				dataIndexTreeWindow.superclass.initComponent
						.call(this);
				this.addEvents(
						/**
						 * @event okClicked 当确定按钮被点击时触发
						 * @param {dataIndexTreeWindow}
						 *            this
						 */
						'okClicked',
						/**
						 * @event okClicked 当取消按钮被点击时触发
						 * @param {dataIndexTreeWindow}
						 *            this
						 */
						'cancelClicked');
			}

		});