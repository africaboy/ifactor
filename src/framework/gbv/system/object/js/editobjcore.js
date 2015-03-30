/**
 * 编辑对象实体信息
 * 
 * @param {}
 *            id 对象ID
 */
function editobjcore(id) {
	var form = new Ext.FormPanel({
				labelWidth : 75, // label settings here cascade unless
				frame : false,
				bodyStyle : 'border:0px; padding:5px;',
				width : 400,
				defaults : {
					width : 300
				},
				defaultType : 'textfield',

				items : [{
							fieldLabel : '名称',
							name : 'oname',
							readOnly : true
						}, {
							xtype : 'hidden',
							name : 'okid',
							value : id
						}, {
							fieldLabel : '摘要',
							xtype : 'textarea',
							name : 'osummary'
						}, {
							fieldLabel : '关键字',
							xtype : 'textarea',
							name : 'okeyword'
						}, {
							fieldLabel : '备注',
							xtype : 'textarea',
							name : 'oremark'
						}]
			});

	form.getForm().load({
				url : context + '/system/objectcreator.do?method=editcore',
				params : {
					id : id
				},
				waitTitle : '提示',
				waitMsg : '正在加载数据,请稍候...',
				animEl : "loding",
				success : function(form, action) {
				},
				failure : function(form, action) {
					Ext.getCmp('updateobjcorebtn').disable();
					
					if (action.result.errCode && action.result.errCode == '-1') {
						Ext.Msg.alert('读取属性信息失败,未找到对象结构');
					} else if (action.result.errCode
							&& action.result.errCode == '-2') {
						Ext.Msg.alert('读取属性信息失败,权限不足');
					} else if (action.result.errCode
							&& action.result.errCode == '-3') {
						Ext.Msg.alert('读取属性信息失败');
					} else {
						Ext.Msg.alert('未知的异常错误');
					}
				}
			});

	var win = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 450,
				height : 330,
				title : '基本属性',
				resizable : false,
				plain : true,
				modal : true,

				items : [form],

				buttons : [{
					id : 'updateobjcorebtn',
					text : '保 存',
					type : 'submit',
					handler : function() {
						if (form.getForm().isValid()) {
							var but = this;
							but.setDisabled(true);
							Ext.MessageBox.wait('提交保存过程中...');

							form.getForm().submit({
								url : context
										+ '/system/objectcreator.do?method=updatecore',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									but.setDisabled(false);
									Ext.Msg.alert('提示', '已成功更新属性信息！');

									win.close();
									win = null;
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									but.setDisabled(false);
									if (action.result.errCode
											&& action.result.errCode == '-1') {
										Ext.Msg.alert('读取属性信息失败,未找到对象结构');
									} else if (action.result.errCode
											&& action.result.errCode == '-2') {
										Ext.Msg.alert('读取属性信息失败,权限不足');
									} else if (action.result.errCode
											&& action.result.errCode == '-3') {
										Ext.Msg.alert('读取属性信息失败');
									} else {
										Ext.Msg.alert('未知的异常错误');
									}
								}
							});
						}
					}
				}, {
					text : '关 闭',
					handler : function() {
						win.close();
						win = null;
					}
				}]
			});

	win.show(this);
}